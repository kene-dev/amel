import ProductCatalogueCard from '@/components/ProductCatalogueCard'
import { productCatalogue } from '@/utils/storeLocationData';

const ProductCatalogue = () => {
  return (
    <div className='w-full lg:px-8'>
        <h1 className='my-4 mt-20 text-[24px] font-semibold'>Product Catalogue</h1>
        <div className='w-full flex flex-wrap items-center gap-20 my-10 lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto'>
            {productCatalogue.map((product) => (
            <ProductCatalogueCard id={product.id}  name={product.name} image={product.image} />
            ))}
        </div>
    </div>
  )
}

export default ProductCatalogue