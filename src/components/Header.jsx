import './Header.scss';
import logo from '../image/logo.svg';

function Header() {
  return (
    <header className="header bg-black">
      <div className="container-fluid">
        <div className="logo d-flex py-3 align-items-center justify-content-start">
          <div className='logo__container d-flex'>
            <img src={logo} alt="Logo Car Tracking" className='logo__img' />
          </div>
          <h1 className="logo__title ps-2 h5 text-white mb-0"><b>Car Tracking</b></h1>
        </div>
      </div>
    </header>
  )
}

export default Header;