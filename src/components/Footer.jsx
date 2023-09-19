function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer w-100 position-absolute bottom-0 left-0">
      <div className="container-fluid">
        <p className="text-center small mb-0 py-1 text-black">
          © {currentYear} - Todos direitos reservados
        </p>
      </div>
    </footer>
  )
}

export default Footer;
