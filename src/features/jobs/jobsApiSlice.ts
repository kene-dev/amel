import { Jobs, JobsReponse } from "@/utils/types";
import { apiSlice } from "../apiSlice";


const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createJobs:builder.mutation({
            query:(data) => ({
                url: '/content/admin/jobs',
                method:'POST',
                body: {...data}
              })
        }),

        getAllJobs:builder.query<JobsReponse, {page?:number, limit?:number}>({
            query:() => '/content/jobs',
            providesTags:['Jobs']
        }),

        getSingleJob:builder.query<Jobs, {id:string}>({
            query:({id}) => `/content/single-job/${id}`
        }),

        editJob:builder.mutation({
            query:({data, id}) => ({
                url:`/content/admin/jobs/${id}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:['Jobs']
        }),

       
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/content/admin/jobs/${id}`,   // Endpoint with dynamic ID
                method: 'DELETE',      // Specify the HTTP method
            }),
            invalidatesTags: ['Jobs'],

            onQueryStarted: async (id, { dispatch, queryFulfilled}) => {
                // Optimistic update logic for paginated data

                const patchResult = dispatch(
                  apiSlice.util.updateQueryData('getAllJobs' as never, undefined as never, (draft:Jobs[]) => {
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


export const {useCreateJobsMutation, useGetAllJobsQuery, useGetSingleJobQuery, useDeleteJobMutation, useEditJobMutation} = jobsApiSlice;