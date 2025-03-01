import { motion } from 'framer-motion';

const colors = {
    green: '#9FFA68',
    blue: '#64C1FD',
    yellow: '#FCF771'
};

function FlavorsContainer({ image, alt, text, color }: { image: string; alt: string; text: string; color: 'green' | 'blue' | 'yellow' }) {
    return (
        <motion.div initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: 1 }} className='flex gap-3 md:gap-5 xl:gap-8 items-center'>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className=' rounded-full size-8 md:size-10 xl:size-16 flex items-end  justify-center md:justify-end shadow-sm'
                style={{ backgroundColor: colors[color] }}>
                <img className='mr-[-16px] ' src={image} alt={alt} />
            </motion.div>
            <h1 className='capitalize font-inter tracking-tighter  md:text-2xl font-extrabold text-[#121212]'>{text}</h1>
        </motion.div>
    );
}
export default FlavorsContainer;
