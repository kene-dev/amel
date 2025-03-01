import { Link } from 'react-router-dom';
interface ProductCardProps {
    id: string;
    name: string;
    image: string;
}
function ProductCatalogueCard({ id, image, name, }: ProductCardProps) {
    return (
        <article className='w-[271px]'>
            <div className='relative w-[100%] lg:w-[270px] h-auto mb-3 rounded-2xl '>
                <div className='relative rounded-b-2xl flex justify-center items-center'>
                    <Link to={`/product-catalogue/${id}`}>
                        <div className='w-full lg:max-h-[250px] h-[400px] overflow-hidden'>
                            <img className='w-full h-full object-cover aspect-auto' src={image} />
                        </div>
                    </Link>
                    <button
                        className=' text-ellipsis text-nowrap overflow-hidden absolute rounded-b-2xl bottom-0 bg-black text-white font-medium text-lg w-full py-2'>
                        {name}
                    </button>
                </div>
            </div>
{/*            
            <h1 className='font-medium text-xl md:text-lg text-center lg:text-left text-ellipsis text-nowrap overflow-hidden'></h1> */}
           
        </article>
    );
}
export default ProductCatalogueCard;
