import { FilterType} from "../../utils/types";
import { apiSlice } from "../apiSlice";


const filterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories:builder.query<FilterType[], void>({
            query:() => '/category'
        })
    })
})


export const {useGetCategoriesQuery} = filterApiSlice;