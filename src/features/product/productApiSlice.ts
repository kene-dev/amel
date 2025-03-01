import { Product, ProductResponse } from "../../utils/types";
import { apiSlice } from "../apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       getProducts: builder.query<ProductResponse, { page: number, category?:string, search?:string, minPrice?:number, maxPrice?:number }>({
        query: ({ page, category, search, minPrice, maxPrice }) => {
            const queryParams: {page: number, category?:string, search?:string, minPrice?:number, maxPrice?:number} = {
                page: page,
                minPrice: minPrice,
                maxPrice:maxPrice,
                category:category,
                search: search,
            }

            if(category){
                queryParams['category'] = category
            }

            if(search){
                queryParams['search'] = search
            }
            if(minPrice){
                queryParams['minPrice'] = minPrice
            }
            if(maxPrice){
                queryParams['maxPrice'] = maxPrice
            }

            return {
                url:`/products?page=${page}`,
                params: queryParams
            }
           
        },
        providesTags: (result) =>
            result && result.products
        ? [
            ...result.products.map((product) => ({
              type: "Products" as const, // Explicitly define the type for TypeScript
              id: product._id, // Use `_id` to identify the product
            })),
            { type: "Products", id: "LIST" }, // Tag for the product list
          ]
        : [{ type: "Products", id: "LIST" }], // Default tag if no result
        }),

         // Fetch a single product by ID
        getProductById: builder.query<Product, string | undefined>({
            query: (id) => `/products/${id}`,
            // providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
    })
})

export const {useGetProductsQuery, useGetProductByIdQuery} = productApiSlice;