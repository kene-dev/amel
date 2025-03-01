import { NavLink } from 'react-router-dom';
import { links } from '../../utils/adminLinks';

function MobileNav() {
    return (
        <nav className='fixed bottom-0 left-0 right-0 z-50 xl:hidden '>
            <div className='absolute inset-0 bg-white/80 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'></div>
            <div className='relative z-10 flex items-center  py-2 px-2'>
                {links.map((link) => {
                    const { path, icon, name } = link;
                    return (
                        <NavLink
                            key={path}
                            to={path}
                            end
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center w-full py-2 rounded-lg transition-all duration-300 ease-in-out ${
                                    isActive ? 'text-just-red' : 'text-gray-600 hover:text-just-red'
                                } group`
                            }>
                            {({ isActive }) => (
                                <>
                                    <span className={`text-2xl transition-all duration-300 ease-in-out ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
                                    <span
                                        className={`capitalize text-xs mt-1 transition-all duration-300 ease-in-out ${
                                            isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-95 group-hover:opacity-100 group-hover:scale-100'
                                        }`}>
                                        {name}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}

export default MobileNav;
