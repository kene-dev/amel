import { Link } from 'react-router-dom';
import Button from './Button';
import { ReactNode } from 'react';

const backgroundColor = {
    red: 'bg-just-red',
    black: 'bg-black'
};
function HeroContainer({
    theme,
    title,
    subHeading,
    content,
    buttonLabel,
    imageSrc,
    alt,
    linkTo,
    action
}: {
    theme: 'red' | 'black';
    title: string;
    subHeading?: string;
    content: string | ReactNode;
    buttonLabel?: string | ReactNode;
    imageSrc?: string;
    alt?: string;
    linkTo?:string;
    action?: (option: boolean) => void
}) {
    return (
        <div className=' w-[95%] md:w-[70%]  '>
            <h1 className='font-bold text-2xl md:text-4xl font-varela capitalize mb-6 mx-8'>{title}</h1>
            <div
                className={` rounded-[40px] ${imageSrc ? 'flex md:flex-row flex-col justify-between' : ''} text-white ${
                    theme === 'red' ? backgroundColor.red : backgroundColor.black
                }`}>
                <div className='order-2 md:order-1 p-8 space-y-6'>
                    <h1 className='font-bold text-xl'>{subHeading}</h1>
                    <p className='max-w-lg font-medium text-base'>{content}</p>
                    {buttonLabel && linkTo ?
                     (
                        <div className='mt-3'>
                            <Link to={linkTo} >
                                <Button theme={theme === 'red' ? 'yellow' : 'red'} text={buttonLabel}  /> 
                            </Link>
                        </div>
                     ): 
                     buttonLabel && action ? (<div onClick={() => action(true)}>
                     <Button theme={theme === 'red' ? 'yellow' : 'red'} text={buttonLabel} />
                     </div>)  : buttonLabel ? (<Button theme={theme === 'red' ? 'yellow' : 'red'} text={buttonLabel} />): null
                     }
                     
                     
                </div>
                <div className='order-1 md:order-2 px-8 flex items-end'>{imageSrc && <img src={imageSrc} alt={alt} />}</div>
            </div>
        </div>
    );
}
export default HeroContainer;
