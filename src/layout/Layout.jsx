import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;
    console.log(urlActual);
    
    return (
        <div className="md:flex md:min-h-screen">
            <div className="px-5 py-10 bg-blue-900 md:w-1/4">
                <h2 className="text-4xl font-black text-center text-white">CRM Para Clientes</h2>
                <nav className="mt-10">
                    <Link to="/clientes" className={`${urlActual === '/clientes' ? 'text-blue-700' : 'text-white' }  block mt-2 text-2xl hover:text-blue-300`}>Ver Clientes</Link>
                    <Link to="/clientes/nuevo" className={`${urlActual === '/clientes/nuevo' ? 'text-blue-700' : 'text-white' }  block mt-2 text-2xl hover:text-blue-300`}>Agregar Clientes</Link>
                </nav>
            </div>
            
            <div className="p-10 overflow-scroll md:w-3/4 md:h-screen">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout