import { apiSlice } from "../apiSlice";

type CouponCheckResponse = {
    discountedAmount: number
}

const couponApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon:builder.mutation({
            query:(data) => ({
                url: '/coupon',
                method:'POST',
                body: {...data}
              })
        }),

        checkCoupon:builder.mutation<CouponCheckResponse, {code: string, orderCost:number}>({
            query:({code, orderCost}) => ({
                url: '/coupon/check/code',
                method:'PATCH',
                body: {code, orderCost}
              })
        })
    })
})

export const {useCheckCouponMutation} = couponApiSlice;

