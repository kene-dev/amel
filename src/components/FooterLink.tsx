import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

function FooterLink({ path, name }: { path: string; name: string }) {
    return (
        <div className='flex items-center gap-1 capitalize hover:text-just-gray'>
            <MdArrowForwardIos fill='#E31E24' />
            <Link className='font-medium' to={path}>
                {name}
            </Link>
        </div>
    );
}
export default FooterLink;
