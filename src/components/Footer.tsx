export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <p>Amine Larbi · Futur étudiant BTS CIEL IR · Cybersécurité &amp; réseaux</p>
      <button className="back-to-top" type="button" onClick={handleBackToTop}>
        Retour en haut
      </button>
    </footer>
  );
}
