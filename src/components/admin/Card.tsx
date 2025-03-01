import { ReactNode } from 'react';

function Card({ icon, label, figures }: { icon: ReactNode; label: string; figures: number | string }) {
    return (
        <article className='space-y-4 w-auto md:w-[30%] border  border-gray-50 bg-white rounded-2xl shadow-sm p-4'>
            <div className='bg-red-100 w-fit p-3 rounded'>{icon}</div>
            <p className='text-gray-500 text-xs md:text-base'>{label}</p>
            <p className='font-semibold text-sm md:text-2xl'>NGN{figures}</p>
        </article>
    );
}
export default Card;
