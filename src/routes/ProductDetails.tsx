import { productCatalogue } from "@/utils/storeLocationData"
import { Link, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
    const {id} = useParams()
    const product = productCatalogue.filter(item => item.id === id)

  return (
    <div className="w-full h-full lg:px-8 px-5">
        {/* BACK BUTTON  */}
        <Link to='/product-catalogue' className='flex items-center gap-3 my-20'>
            <FaArrowLeft  className='w-7 h-7'/>
            Go Back
        </Link>
        <div className="w-full flex flex-col gap-10 my-10">
            <div className="w-full h-[568px]">
                <img src={product[0].image} className="w-full h-full object-contain aspect-auto"/>
            </div>

            <div className="w-full">
            <h1 className="font-semibold my-4 text-xl">Product Description</h1>
                <p>{product[0].description}</p>
            </div>
            <div className="w-full">
                <h1 className="font-semibold text-xl underline">Key Features</h1>
                <p>{product[0].keyFeatures.split('.').map(item => (
                    <ul className="px-4">
                        <li className="list-disc my-2"> 
                            <span className="font-semibold">{item.split(':')[0]}:</span>
                            {item.split(':')[1]}
                        </li>
                    </ul>
                ))}</p>
            </div>
            {product[0].usageTips && (
            <div className="w-full">
                <h1 className="font-semibold text-xl underline">Useage Tips</h1>
                <p>{product[0].usageTips}</p>
            </div>
            )}
        </div>
    </div>
  )
}

export default ProductDetails