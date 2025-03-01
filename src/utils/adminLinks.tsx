import { BiSolidDiscount } from 'react-icons/bi';
import { FaMoneyBills } from 'react-icons/fa6';
import { GiShoppingBag } from 'react-icons/gi';
import { TiHome } from 'react-icons/ti';

export const links = [
    {
        path: '/admin',
        icon: <TiHome />,
        name: 'dashboard'
    },
    {
        path: 'products',
        icon: <GiShoppingBag />,
        name: 'products'
    },
    {
        path: 'orders',
        icon: <FaMoneyBills />,
        name: 'orders'
    },
    {
        path: 'coupons',
        icon: <BiSolidDiscount />,
        name: 'coupons'
    }
];
