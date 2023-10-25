import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNavStyles } from './useNavStyles';
import { useHamburguer } from '../hooks/jsx/useHamburguer';
import { useCallback } from 'react';
import logo from '../assets/logo.png';



export const NavBar = () => {

  const location                              = useLocation()
  let navigate                                = useNavigate()
  const {HamburguerComponent, isMenuOpen}     = useHamburguer()
  const { getItemStyle }                      = useNavStyles()

  const closeSession = useCallback(() => {
    localStorage.clear()
    navigate("/login")
  },[])


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Gastos Extras Killer" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gastos Extras Killer</span>
        </a>
        <HamburguerComponent />
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/load-excel" className={ getItemStyle('/load-excel', location) } aria-current="page">
                  Subir Cartola
              </Link>
            </li>
            <li>
              <Link to="/cartola-historica" className={ getItemStyle('/cartola-historica', location) } aria-current="page">
                  Cartola Histórica
              </Link>
            </li>
            <li>
              <Link to="/category-manager" className={ getItemStyle('/category-manager', location) } aria-current="page">
                  Categorías
              </Link>
            </li>
            {/* <li>
              <Link to="/" className={ getItemStyle('/', location) }aria-current="page">
                  Ingresar Cartola
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={ getItemStyle('/dashboard', location )}>
                  Dashboard
              </Link>
            </li>
            <li>
              <Link to="/settings" className={ getItemStyle('/settings', location) }>
                  Configuración
              </Link>
            </li>
            <li>
              <Link to="/dimmanager" className={ getItemStyle('/dimmanager', location) }>
                  Dimensiones
              </Link>
            </li>*/}
            <li>
              <div className={ `${getItemStyle('/HOLI', location )} cursor-pointer` } onClick={ closeSession } >
                  Cerrar Sesión
                </div>
            </li> 
          </ul>
        </div>
      </div>
    </nav>

  );
}
