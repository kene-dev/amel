import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo';
import { links } from '../../utils/adminLinks';

function Sidebar() {
    return (
        <nav className='hidden xl:block py-8 h-[98%] bg-white w-[300px] px-10 mx-4 rounded shadow-sm'>
            <span className='flex justify-center items-center'>
                <Link to='/admin'>
                    <Logo />
                </Link>
            </span>
            <ul className='mt-8 mx-auto w-full flex flex-col gap-2 items-start'>
                {links.map((link) => {
                    const { path, icon, name } = link;
                    return (
                        <li key={path} className='relative w-full group'>
                            <NavLink
                                className={({ isActive }) =>
                                    `relative flex items-center gap-4 w-full px-6 py-3 rounded-md capitalize text-lg transition-all duration-300 ease-in-out ${
                                        isActive ? 'text-white bg-just-red' : 'text-black hover:bg-gray-100 hover:text-just-red'
                                    }`
                                }
                                to={path}
                                end>
                                <span className='transition-transform duration-300 ease-in-out group-hover:translate-x-1'>{icon}</span>
                                {name}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Sidebar;
