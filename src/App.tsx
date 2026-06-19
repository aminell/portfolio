import { useEffect, useState } from 'react'

type Phase = 'countdown' | 'ready' | 'continued' | 'stopped'

type AppStats = {
  total: number
  continued: number
  stopped: number
}

const DEFAULT_APP_NAME = 'cette application'
const DEFAULT_SECONDS = 7
const MIN_SECONDS = 3
const MAX_SECONDS = 30

function getPageConfig() {
  const params = new URLSearchParams(window.location.search)
  const rawAppName = params.get('app')?.trim()
  const appName = rawAppName ? rawAppName.slice(0, 60) : DEFAULT_APP_NAME
  const parsedSeconds = Number.parseInt(params.get('seconds') ?? '', 10)
  const seconds = Number.isNaN(parsedSeconds)
    ? DEFAULT_SECONDS
    : Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, parsedSeconds))

  return { appName, seconds }
}

function getStorageKey(appName: string) {
  return `pause:stats:${appName.toLocaleLowerCase('fr-FR')}`
}

function readStats(storageKey: string): AppStats {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<AppStats>

    return {
      total: Number.isFinite(stored.total) ? Math.max(0, stored.total ?? 0) : 0,
      continued: Number.isFinite(stored.continued)
        ? Math.max(0, stored.continued ?? 0)
        : 0,
      stopped: Number.isFinite(stored.stopped) ? Math.max(0, stored.stopped ?? 0) : 0,
    }
  } catch {
    return { total: 0, continued: 0, stopped: 0 }
  }
}

function writeStats(storageKey: string, stats: AppStats) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(stats))
  } catch {
    // L'app reste utilisable lorsque le stockage local est indisponible.
  }
}

function initializeStats(storageKey: string) {
  const currentStats = readStats(storageKey)
  const nextStats = { ...currentStats, total: currentStats.total + 1 }
  writeStats(storageKey, nextStats)
  return nextStats
}

export default function App() {
  const [{ appName, seconds }] = useState(getPageConfig)
  const storageKey = getStorageKey(appName)
  const [phase, setPhase] = useState<Phase>('countdown')
  const [remaining, setRemaining] = useState(seconds)
  const [stats, setStats] = useState<AppStats>(() => initializeStats(storageKey))

  useEffect(() => {
    document.title = `Pause · ${appName}`
  }, [appName])

  useEffect(() => {
    if (phase !== 'countdown') {
      return
    }

    const deadline = Date.now() + seconds * 1000
    const timer = window.setInterval(() => {
      const nextRemaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      setRemaining(nextRemaining)

      if (nextRemaining === 0) {
        window.clearInterval(timer)
        setPhase('ready')

        if ('vibrate' in navigator) {
          navigator.vibrate(35)
        }
      }
    }, 200)

    return () => window.clearInterval(timer)
  }, [phase, seconds])

  const saveChoice = (choice: 'continued' | 'stopped') => {
    setStats((currentStats) => {
      const nextStats = {
        ...currentStats,
        [choice]: currentStats[choice] + 1,
      }
      writeStats(storageKey, nextStats)
      return nextStats
    })
  }

  const handleContinue = () => {
    saveChoice('continued')
    setPhase('continued')
  }

  const handleStop = () => {
    saveChoice('stopped')
    setPhase('stopped')
  }

  const liveMessage =
    phase === 'countdown'
      ? `Pause de ${seconds} secondes commencée.`
      : phase === 'ready'
        ? 'La pause est terminée. Tu peux maintenant choisir.'
        : ''

  return (
    <main className="pause-shell">
      <div className="ambient-glow" aria-hidden="true" />

      <section className="pause-card" aria-labelledby="pause-title">
        <header className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>Pause</span>
        </header>

        <div className="pause-content">
          {phase === 'countdown' || phase === 'ready' ? (
            <>
              <div
                className={`breathing-circle ${phase === 'ready' ? 'is-complete' : ''}`}
                aria-hidden="true"
              >
                <span className="breathing-orbit" />
                <strong>{phase === 'ready' ? '✓' : remaining}</strong>
                <small>{phase === 'ready' ? 'Prêt' : remaining > 1 ? 'secondes' : 'seconde'}</small>
              </div>

              <div className="message">
                <p className="eyebrow">{phase === 'ready' ? 'À toi de choisir' : 'Un instant pour toi'}</p>
                <h1 id="pause-title">Tu veux vraiment ouvrir {appName}&nbsp;?</h1>
                <p className="reflection">
                  Respire un instant. Qu’est-ce que tu venais chercher en ouvrant cette application&nbsp;?
                </p>
              </div>

              {phase === 'ready' && (
                <div className="actions">
                  <button className="button button-primary" type="button" onClick={handleContinue}>
                    Continuer
                  </button>
                  <button className="button button-secondary" type="button" onClick={handleStop}>
                    Finalement non
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="result" role="status">
              <span className="result-icon" aria-hidden="true">
                {phase === 'continued' ? '→' : '✓'}
              </span>
              <p className="eyebrow">{phase === 'continued' ? 'Choix confirmé' : 'Pause réussie'}</p>
              <h1 id="pause-title">
                {phase === 'continued'
                  ? `Tu peux retourner dans ${appName} depuis le sélecteur d’applications.`
                  : 'Bonne décision. Tu peux fermer cette page.'}
              </h1>
            </div>
          )}
        </div>

        <footer className="local-stat">
          Pause déclenchée {stats.total} fois pour {appName}.
        </footer>
      </section>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
    </main>
  )
}
