import { BreadCrumbs } from '../components';
import cards from '../assets/svgs/card_logos.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { motion } from 'framer-motion';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { PaymentConfig } from '../utils/types';
import { useGetSingleUserQuery, useUpdateUserMutation } from '../features/auth/authApiSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { shippingSchema } from '../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckCouponMutation } from '../features/coupons/coupons';
import { useEffect, useState } from 'react';
import { useCreateOrderMutation } from '../features/order/orderApiSlice';
import Loader from "../components/Loader"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';

const formInput = 'py-3 px-2 rounded bg-gray-100 mb-4';
const flwKey = import.meta.env.VITE_FLUTTERWAVE_PUBLICKEY;
type ShippingFormInputs = z.infer<typeof shippingSchema>;


function CheckOut() {
    const {data} = useGetSingleUserQuery()
    const [updateUser] = useUpdateUserMutation()
    const [createOrder, {isLoading, isSuccess}] = useCreateOrderMutation()
    const [checkCoupoon, {isLoading: loadingCoupon,}] = useCheckCouponMutation()
    const [couponCode, setCouponCode] = useState<string>('')
    const [discountedAmount, setDiscountedAmount] = useState<number>()
    const cartProducts = useSelector((state: RootState) => state.cart.cartItems);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const shippingFee = 500
    const cartTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const newTotal = discountedAmount ? cartTotal - discountedAmount + 500 : 0;
    const totalAmount = cartTotal + shippingFee;

    const orderItems = cartProducts.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }))

     const {
            register,
            handleSubmit,
            formState: { errors },
            watch
          } = useForm<ShippingFormInputs>({
            resolver: zodResolver(shippingSchema),
            defaultValues: {
                paymentMethod: "card",
              },
        });

    // Watch form values
    const saveShipping = watch("saveShipping");
    const selectedPayment = watch("paymentMethod");
    

    const config: PaymentConfig = {
        public_key: flwKey,
        tx_ref: Date.now().toString(),
        amount: 2000,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
          email: data?.email ?? '',
           phone_number: '',
          name: `${data?.firstName} ${data?.lastName}`,
        },
        customizations: {
          title: 'Amel Susan Payment',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const handleFlutterPayment = useFlutterwave(config);



    const handlePayment: SubmitHandler<ShippingFormInputs> = async (data) => {
        if(data.paymentMethod === 'cash'){
            // RUN THE CREATE ORDER FUNCTION
            const orderData = {
                items : orderItems,
                delivery: {
                    address: data.address,
                    city:data.city,
                    postalCode: data.postalCode,
                    country:data.country,
                    instructions:data.instructions
                }
            };

            createOrder(orderData);
            console.log("cash payment selected")
        }else{
            handleFlutterPayment({
                callback: (response) => {
                    closePaymentModal() // this will close the modal programmatically
                    if(response.status === 'successful'){
                        if(data.saveShipping){
                            updateUser({delivery: {
                                address: data.address,
                                apartmentFloor:"",
                                phoneNumber:"",
                                city:data.city,
                                postalCode: data.postalCode,
                                country:data.country,
                            }})
                        };

                        const orderData = {
                            items : orderItems,
                            delivery: {
                                address: data.address,
                                city:data.city,
                                postalCode: data.postalCode,
                                country:data.country,
                                instructions:data.instructions
                            }
                        };
                        createOrder(orderData);
                    }
                },
                onClose: () => {
                   console.log('payment failed')
                },
            });
        }
      }

      const handleCouponCheck = async () => {
        try {
           const res = await checkCoupoon({code:couponCode, orderCost: cartTotal})
           if(res){
            const result = res.data?.discountedAmount;
            setDiscountedAmount(result);
           }
        } catch (error) {
            console.log("Failed to check coupon" + error);
        }
      }

      useEffect(() => {
        if(isLoading){
            toast.success('Order created successfully')
        }

        // if(couponSuccess){
        //     toast.success('Coupon retrieved')
        // }

        if(isSuccess){
            dispatch(clearCart())
            navigate('/account')
        }

      },[isLoading, isSuccess])

    return (
        <motion.section
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 0.5 }}
            className='px-8 pb-6 space-y-6'>
            {isLoading && <Loader />}
            <BreadCrumbs />
            <h1 className='text-2xl md:text-3xl font-medium'>Delivery Details</h1>
            <form onSubmit={handleSubmit(handlePayment)}  className='grid grid-cols-1 gap-6 xl:gap-0 place-items-center xl:grid-cols-2'>
                <div className='flex flex-col md:w-[65%] xl:max-w-lg'> 
                    <div className='flex flex-col gap-3 my-3'>
                        <label className='text-lg text-gray-600 capitalize' htmlFor='address'>
                            Address <span className='text-red-400'>*</span>
                        </label>
                        <input {...register("address")} className={formInput} type='text' name='address' id='address' />
                        {errors.address && (<p className="text-red-500 text-sm -mt-7 p-1">{errors.address.message}</p>)}
                    </div>

                    <div className='flex flex-col gap-3 my-3'>
                        <label className='text-lg text-gray-600 capitalize' htmlFor='town'>
                            Town/city<span className='text-red-400'>*</span>
                        </label>
                        <input {...register("city")} className={formInput} type='text' name='city' id='town' />
                        {errors.city && (<p className="text-red-500 text-sm -mt-7 p-1">{errors.city.message}</p>)}
                    </div>


                    <label className='text-lg text-gray-600 capitalize' htmlFor='postal'>
                        Postal Code
                    </label>
                    <input {...register("postalCode")} className={`${formInput} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`} type='number' name='postalCode' id='postal' />
                   

                    <div className='flex flex-col gap-3 my-3'>
                        <label className='text-lg text-gray-600 capitalize' htmlFor='country'>
                            Country <span className='text-red-400'>*</span>
                        </label>
                        <input {...register("country")} className={formInput} type='text' name='country' id='country' />
                        {errors.country && (<p className="text-red-500 text-sm -mt-7 p-1">{errors.country.message}</p>)}
                    </div>

                    <label className='text-lg text-gray-600 capitalize' htmlFor='instructions'>
                        Instructions
                    </label>
                    <textarea cols={5} className={formInput} {...register("instructions")}  name='instructions' id='instructions' />

                    <span className='flex md:items-center space-x-1 md:space-x-2 w-full'>
                        <input className='accent-just-red size-4 cursor-pointer mt-[2px] md:mt-0' type='checkbox' checked={saveShipping} {...register("saveShipping")} name='saveShipping' />
                        <p className='text-sm md:text-base'>Save this information for faster check-out next time</p>
                    </span>
                </div>


                {/* summary */}
                <div className='md:max-w-lg space-y-6 w-full'>
                    {cartProducts.map((product) => (
                        <div className='flex justify-between items-center'>
                            <span className='flex items-center gap-2'>
                                <img className='size-16 object-contain' src={product.images[0]} alt='product_name' />
                                <p className='text-base md:text-lg'>{product.name}</p>
                            </span>
                            <span className='text-base md:text-lg'>NGN {(product.price * product.quantity).toLocaleString()}</span>
                        </div>
                    ))}

                    <div className='flex flex-col gap-3 divide-y divide-gray-600'>
                        <span className='flex justify-between items-center text-base md:text-lg'>
                            <p>Subtotal:</p>
                            <p>NGN {cartTotal.toLocaleString()}</p>
                        </span>
                       
                        {discountedAmount && (
                             <span className='pt-2 flex justify-between items-center text-base md:text-lg'>
                                <p>Discount:</p>
                                <p>{discountedAmount}</p>
                             </span>
                        )}
                         <span className='pt-2 flex justify-between items-center text-base md:text-lg'>
                            <p>Shipping:</p>
                            <p>{shippingFee}</p>
                        </span>
                        <span className='pt-2 flex justify-between items-center text-base md:text-lg'>
                            <p>Total:</p>
                            <p>NGN {discountedAmount ? newTotal.toLocaleString() : totalAmount.toLocaleString()}</p>
                        </span>
                    </div>

                    <div className='space-y-4 pt-2'>
                        <span className='flex md:items-center flex-col md:flex-row md:justify-between text-base md:text-lg'>
                            <span className='flex items-center gap-3'>
                                <input className='cursor-pointer size-5 accent-black' type='radio' value='card' id='card' checked={selectedPayment === 'card'} {...register("paymentMethod")} radioGroup='payment-method' />
                                <label htmlFor='card'>Debit/Credit Card</label>
                            </span>
                            <img className='w-1/2 mx-8 size-5 md:size-auto' src={cards} alt='card-logos' />
                        </span>
                        <span className='flex items-center gap-3 text-base md:text-lg'>
                            <input className='cursor-pointer size-5 accent-black' type='radio' value="cash" id='cash' checked={selectedPayment === 'cash'} {...register("paymentMethod")} radioGroup='payment-method' />
                            <label htmlFor='cash'>Cash on Delivery</label>
                        </span>
                    </div>

                    <div className='flex flex-wrap justify-between items-center gap-2'>
                        <input className=' px-4 py-2 rounded border outline-none focus:ring-1 ring-black border-gray-600'
                         type='text'
                         value={couponCode}
                         placeholder='Coupon Code' 
                         onChange={(e) => setCouponCode(e.target.value)}
                         />
                        <button
                            type='button'
                            onClick={handleCouponCheck}
                            className='md:px-4 px-3 py-2 border  text-sm md:text-base text-white font-medium  bg-just-red rounded hover:bg-red-600 hover:scale-105 transition-all ease-in-out duration-300'>
                                {loadingCoupon ? 'Checking' : 'Apply Coupon'}
                        </button>
                    </div>

                    <button type='submit'
                    className='md:px-6 px-4 md:py-3 py-2 text-sm md:text-base border text-white font-medium  bg-just-red rounded hover:bg-red-600 hover:scale-105 transition-all ease-in-out duration-300'>
                        Place Order
                    </button>
                </div>
            </form>
        </motion.section>
    );
}
export default CheckOut;
