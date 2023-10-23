import { useCallback, useEffect } from 'react';
import { useLogin } from './hooks/useLogin';
import { useForm } from './hooks/useForm';
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png'



const LoginPage = () => {

    let navigate                                        = useNavigate();
    const [ formLoginValues, handleLoginInputChange ]   = useForm({ lEmail: '', lPassword: '' });
    const { lEmail, lPassword }                         = formLoginValues;
    const queryLogin                                    = useLogin(lEmail, lPassword)

    const handleLogin = useCallback( e => {
        e.preventDefault();
        queryLogin.logout()
        if ( lEmail && lPassword ) queryLogin.refetch()
    }, [lEmail, lPassword]);

    useEffect( () => {
      if ( localStorage.getItem('token') ) navigate("/")
    }, [queryLogin?.data?.logged])


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 mr-2" src={logo} alt="logo" />
              Gastos Extras Killer   
          </a>
          <div className="w-full bg-white rounded-xl border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
                      Ingresa a tu cuenta
                  </h1>
                  <form 
                    className="space-y-4 md:space-y-6" 
                    // action="/agenda" 
                    onSubmit={handleLogin}
                    >
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu email</label>
                          <input
                            type        ="email" 
                            name        ="lEmail" 
                            id          ="email" 
                            className   ="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder ="nombre@dominio.com" 
                            required    ="" 
                            onChange    ={ handleLoginInputChange }
                            value       ={ lEmail }
                            />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                          <input 
                            type        ="password"
                            name        ="lPassword" 
                            id          ="password" 
                            placeholder ="••••••••" 
                            className   ="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required    ="" 
                            onChange    ={ handleLoginInputChange }
                            value       ={ lPassword }
                            />
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Recordarme</label>
                              </div>
                          </div>
                          <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu Contraseña?</a>
                      </div>
                      <button 
                        type="submit"
                        className="w-full text-white bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                       >
                        Ingresar
                      </button>
                      {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          ¿No tienes una cuenta? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                      </p> */}
                  </form>
              </div>
          </div>
      </div>
    </section>
  );
};

export default LoginPage;
