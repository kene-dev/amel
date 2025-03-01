
import { Order } from "../../utils/types";
import { apiSlice } from "../apiSlice";


const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder:builder.mutation({
            query:(data) => ({
                url: '/orders',
                method:'POST',
                body: {...data}
              })
        }), 
        getMyOrder:builder.query<Order[], void>({
            query:() => '/orders/my-orders'
        })
    })
})


export const {useCreateOrderMutation, useGetMyOrderQuery} = orderApiSlice;