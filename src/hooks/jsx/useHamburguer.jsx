import { useState } from 'react'

const botonSandwich = `
    inline-flex items-center 
    p-2 w-10 h-10 
    justify-center 
    text-sm text-gray-500 
    rounded-lg 
    md:hidden 
    hover:bg-gray-100 
    focus:outline-none 
    focus:ring-2 
    focus:ring-gray-200 
    dark:text-gray-400 
    dark:hover:bg-gray-700 
    dark:focus:ring-gray-600`;


export const useHamburguer = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

    const HamburguerComponent = () => (
        <button
            onClick={handleMenuToggle}
            type="button"
            className={botonSandwich}
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
    )
    
  return { isMenuOpen, HamburguerComponent }
}
