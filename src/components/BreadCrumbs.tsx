import { TbSlash } from 'react-icons/tb';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const formatPathname = (pathname: string) => {
        return pathname
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <nav className='py-4'>
            <ol className='flex items-center'>
                <li>
                    <Link to='/' className='text-gray-500 hover:text-gray-700 transition-colors'>
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={to} className='flex items-center'>
                            <TbSlash size={20} className='mx-1 text-gray-400' />
                            {isLast ? (
                                <span className='font-medium text-gray-900'>{formatPathname(value)}</span>
                            ) : (
                                <Link to={to} className='text-gray-500 hover:text-gray-700 transition-colors'>
                                    {formatPathname(value)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
