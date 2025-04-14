import { Link } from 'react-router-dom';
import star from '../assets/svgs/star.svg';
interface ProductCardProps {
    id: string;
    name: string;
    image: string;
}
function ProductCatalogueCard({ id, image, name, }: ProductCardProps) {
    return (
        <article className='lg:w-[271px] w-full'>
            <div className='relative w-[100%] lg:w-[270px] h-auto mb-3 rounded-2xl '>
                <div className='relative rounded-b-2xl flex flex-col justify-center items-center'>
                    <Link to={`/product-catalogue/${id}`}>
                        <div className='w-full lg:max-h-[250px] h-[400px] overflow-hidden'>
                            <img className='w-full h-full object-cover aspect-auto' src={image} />
                        </div>
                    </Link>
                    <p className=' text-left text-black font-medium text-base w-full py-2'>{name}</p>
                    <img src={star} className='place-self-start' />
                </div>
            </div>
{/*            
            <h1 className='font-medium text-xl md:text-lg text-center lg:text-left text-ellipsis text-nowrap overflow-hidden'></h1> */}
           
        </article>
    );
}
export default ProductCatalogueCard;
