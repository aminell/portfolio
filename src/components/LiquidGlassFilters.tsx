/**
 * Filtres SVG qui produisent la vraie réfraction « Liquid Glass ».
 *
 * Principe : une carte de déplacement (displacement map) où le centre est neutre
 * (gris 128 → aucun déplacement) et où seuls les bords poussent les pixels vers
 * l'extérieur — comme la courbure d'une lentille. Le canal Rouge encode le
 * déplacement horizontal, le canal Vert le déplacement vertical.
 *
 * `feDisplacementMap` applique cette carte au backdrop (ce qu'il y a DERRIÈRE
 * l'élément), via `backdrop-filter: url(#liquid-glass)`. Résultat : le contenu de
 * la page se courbe en passant sous le verre. La variante « strong » déplace
 * chaque canal RVB à une échelle légèrement différente pour recréer l'aberration
 * chromatique d'une vraie optique.
 *
 * La carte est dessinée pixel par pixel sur un <canvas> (déterministe), plutôt
 * que via des dégradés SVG : feImage ne rasterise pas mix-blend-mode de façon
 * fiable, ce qui aurait cassé la combinaison des deux axes.
 *
 * Supporté par Chromium. Safari/Firefox ignorent le filtre et conservent le
 * rendu « givré » de secours (cf. index.css, hors @supports).
 */

const MAP_SIZE = 128;
// Largeur (en fraction) de la zone de bord où le verre réfracte. Le centre reste net.
const EDGE = 0.3;

let cachedHref: string | null = null;

// Interpolation douce (smoothstep) : transition de bord plus organique qu'une rampe linéaire.
function smoothLerp(from: number, to: number, t: number): number {
  const clamped = t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  return from + (to - from) * clamped;
}

// Profil « plateau » sur un axe : 1 au bord bas, 0.5 (neutre) au centre, 0 au bord haut.
function edgeProfile(n: number): number {
  if (n < EDGE) return smoothLerp(1, 0.5, n / EDGE);
  if (n > 1 - EDGE) return smoothLerp(0.5, 0, (n - (1 - EDGE)) / EDGE);
  return 0.5;
}

function getDisplacementMapHref(): string {
  if (cachedHref) return cachedHref;
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = MAP_SIZE;
  canvas.height = MAP_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const image = ctx.createImageData(MAP_SIZE, MAP_SIZE);
  for (let y = 0; y < MAP_SIZE; y += 1) {
    const gy = edgeProfile(y / (MAP_SIZE - 1));
    for (let x = 0; x < MAP_SIZE; x += 1) {
      const gx = edgeProfile(x / (MAP_SIZE - 1));
      const i = (y * MAP_SIZE + x) * 4;
      image.data[i] = Math.round(gx * 255); // R → déplacement horizontal
      image.data[i + 1] = Math.round(gy * 255); // G → déplacement vertical
      image.data[i + 2] = 128; // B inutilisé
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  cachedHref = canvas.toDataURL();
  return cachedHref;
}

// Matrices qui isolent un seul canal (en conservant l'alpha) pour la recomposition.
const KEEP_R = '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0';
const KEEP_G = '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0';
const KEEP_B = '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0';

export default function LiquidGlassFilters() {
  const mapHref = getDisplacementMapHref();

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Réfraction standard : un seul déplacement, propre et léger. */}
        <filter
          id="liquid-glass"
          x="-12%"
          y="-12%"
          width="124%"
          height="124%"
          colorInterpolationFilters="sRGB"
        >
          <feImage href={mapHref} preserveAspectRatio="none" result="map" />
          <feGaussianBlur in="map" stdDeviation="0.4" result="smoothMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothMap"
            scale="24"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Réfraction renforcée + aberration chromatique (RVB déplacés séparément). */}
        <filter
          id="liquid-glass-strong"
          x="-12%"
          y="-12%"
          width="124%"
          height="124%"
          colorInterpolationFilters="sRGB"
        >
          <feImage href={mapHref} preserveAspectRatio="none" result="map" />
          <feGaussianBlur in="map" stdDeviation="0.4" result="smoothMap" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothMap"
            scale="38"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothMap"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothMap"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispB"
          />

          <feColorMatrix in="dispR" type="matrix" values={KEEP_R} result="onlyR" />
          <feColorMatrix in="dispG" type="matrix" values={KEEP_G} result="onlyG" />
          <feColorMatrix in="dispB" type="matrix" values={KEEP_B} result="onlyB" />

          <feBlend in="onlyR" in2="onlyG" mode="screen" result="blendRG" />
          <feBlend in="blendRG" in2="onlyB" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
