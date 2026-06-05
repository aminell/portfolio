export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <p>Amine Larbi · BTS CIEL option A</p>
      <button className="back-to-top" type="button" onClick={handleBackToTop}>
        Retour en haut
      </button>
    </footer>
  );
}
