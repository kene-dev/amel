import { Blogs, BlogsReponse } from "@/utils/types";
import { apiSlice } from "../apiSlice";


const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBlogs:builder.mutation({
            query:(data) => ({
                url: '/content/admin/blog',
                method:'POST',
                body: {...data}
              })
        }),

        getAllBlogs:builder.query<BlogsReponse, {page?:number, limit?:number}>({
            query:({page, limit}) => `/content/blog?page=${page}&limit=${limit}`,
            providesTags:['Blogs']
        }),

        getSingleBlog:builder.query<Blogs, {id:string | undefined}>({
            query:({id}) => `/content/single-blog/${id}`
        }),

        editBlog:builder.mutation({
            query:({data, id}) => ({
                url:`/content/admin/blog/${id}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:['Blogs']
        }),

       
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/content/admin/blog/${id}`,   // Endpoint with dynamic ID
                method: 'DELETE',      // Specify the HTTP method
            }),
            invalidatesTags: ['Blogs'],

            onQueryStarted: async (id, { dispatch, queryFulfilled}) => {
                // Optimistic update logic for paginated data

                const patchResult = dispatch(
                  apiSlice.util.updateQueryData('getAllBlogs' as never, undefined as never, (draft:Blogs[]) => {
                    const index = draft.findIndex(p => p._id === id);
                    if (index !== -1) {
                      draft.splice(index, 1);
                    }
                  })
                );
                try {
                    await queryFulfilled;
                  } catch {
                    patchResult.undo();
                  }
            }
            }),
            
   
    })
})


export const {useCreateBlogsMutation, useGetAllBlogsQuery, useGetSingleBlogQuery, useDeleteBlogMutation, useEditBlogMutation} = blogsApiSlice;