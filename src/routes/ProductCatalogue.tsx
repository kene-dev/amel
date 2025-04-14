import ProductCatalogueCard from '@/components/ProductCatalogueCard'
import { productCatalogue } from '@/utils/storeLocationData';
import product8 from "../assets/webp/milk_custard_powder.webp";
import product4 from "../assets/webp/Icing_sugar.webp";
import banner from '../assets/png/productsBanner.jpeg'
import amel from '../assets/png/amel2.png'
import { useState } from 'react';


const ProductCatalogue = () => {
  const [activeTab, setActiveTab] = useState('breakfast');

  const bakingProducts = productCatalogue.filter(p => p.line === 'baking')
  const breakfastProducts = productCatalogue.filter(p => p.line === 'breakfast')

  const [displayProd, setDisplayProd] = useState(breakfastProducts)

  const handleTabChange = (item: string) => {
    if(item === 'breakfast'){
      setDisplayProd(breakfastProducts)
      setActiveTab(item)
    }else{
      setDisplayProd(bakingProducts)
      setActiveTab(item)
    }
  } 
  
  


  return (
    <div className='w-full lg:px-8 px-5'>

        <div style={{backgroundImage: `url(${banner})`}} className='lg:h-[227px] h-[250px] w-full rounded-[60px] bg-no-repeat bg-cover bg-center relative'>
            <div className='w-full h-full inset-0 bg-black/85 rounded-[60px]'></div>

              <div className='w-full h-full absolute top-0 left-0 flex flex-col lg:flex-row items-center justify-between px-12 py-5 lg:py-0'>

                  <div className='flex flex-col lg:flex-row items-center lg:gap-10'>
                    <img src={amel} className='lg:w-[170px] w-[100px]'/>

                    <div className='flex flex-col items-center lg:items-start gap-2 text-white'>
                      <p className='text-2xl'>Our Products</p>
                      <p className='text-white/80'>All our products in one place</p>
                      <button className='bg-[#E31E24] text-white w-max px-10 p-3 rounded-lg mt-4'>
                        Go to shop
                      </button>
                     </div>

                  </div>

                  <div className='hidden lg:flex flex-row items-center lg:gap-10 gap-3 text-white'>
                    <div className='flex flex-col lg:items-end items-center text-white/80'>
                      <p className='text-3xl text-primary'>{breakfastProducts.length}</p>
                      <p>Breakfast Products</p>
                    </div>

                    <div className='flex flex-col items-end text-white/80'>
                      <p className='text-3xl text-primary'>{bakingProducts.length}</p>
                      <p>Baking Products</p>
                    </div>
                  </div>

              </div>
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-between gap-10 xl:max-w-screen-2xl mx-auto my-4 mt-20'>
          {/* BREAKFAST PRODUCTS */}
          <div onClick={() => handleTabChange('breakfast')} className={`w-full h-[171px] flex items-center justify-center gap-2 ${activeTab === 'breakfast' && 'bg-[#FECC00]'} shadow-md rounded-2xl border-[1px] border-black/30`}>
            <div className='w-20 h-20 '>
                <img src={product8} className='w-full h-full object-contain' />
            </div>
              <p className='text-2xl font-semibold'>Breakfast <br/> Product</p>
          </div>


          {/* BAKING PRODUCTS */}
          <div onClick={() => handleTabChange('baking')} className={`w-full h-[171px] flex items-center justify-center gap-2 ${activeTab === 'baking' && 'bg-[#FECC00] '} shadow-md rounded-2xl border-[1px] border-black/30`}>
            <div className='w-20 h-20 '>
                <img src={product4} className='w-full h-full object-contain' />
            </div>
              <p className='text-2xl font-semibold'>Baking <br/> Product</p>
          </div>
        </div>


        <div className='w-full flex flex-wrap items-center gap-20 my-10 lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto'>
            {displayProd.map((product) => (
            <ProductCatalogueCard id={product.id}  name={product.name} image={product.image} />
            ))}
        </div>


    </div>
  )
}

export default ProductCatalogue