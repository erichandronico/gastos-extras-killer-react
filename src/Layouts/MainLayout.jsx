

import { Footer } from './Footer';
import { NavBar } from './NavBar';

const MainLayout = ( {className='', children=<div>Hola</div>} ) => {
  return (
    <>
        <NavBar />
            <div className={`container m-4 p-4 mx-auto overflow-auto ${className}`}>
                { children }
            </div>
        <Footer />
    </>
  );
}

export default MainLayout;
