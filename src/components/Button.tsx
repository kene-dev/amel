import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const buttonStyle = {
    red: 'bg-just-red text-white  hover:bg-red-700',
    yellow: 'bg-primary text-black  hover:bg-yellow-500'
};

function Button({width, theme, text, textStyle, type = 'button', disabled }: { theme: 'red' | 'yellow'; textStyle?: string; disabled?: boolean; width?: string; text?: string | ReactNode; type?: 'button' | 'submit' | 'reset' | undefined }) {
    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                transition: { type: 'spring', stiffness: 300, damping: 15, duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`py-2 md:py-3 px-4 md:px-6 rounded-xl font-medium ${width ? `w-[${width}]` : 'w-auto'} ${theme === 'red' ? buttonStyle.red : buttonStyle.yellow}`}
            disabled={disabled}
            type={type}>
            {text ? (<p className={textStyle && textStyle}>{text}</p>)  : 'Go to shop'}
        </motion.button>
    );
}

export default Button;
