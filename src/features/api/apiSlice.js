import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:9000',

    }),
    tagTypes:['transactions'],
    endpoints: (builder)=>({
        addTransaction:builder.mutation({
            query:(data)=> ({
                url:'transactions',
                method:'POST',
                body:data
            }),
            invalidatesTags:['transactions']
        }),
        getTransactions:builder.query({
            query:()=>'/transactions',
            providesTags:['transactions']
        }),
        getTransaction:builder.query({
            query:(id)=>`/transactions?id=${id}`,
        }),
        deleteTransaction:builder.mutation({
            query:(id)=>({
                url:`transactions/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['transactions']
        }),
        UpdateTransaction:builder.mutation({
            query:({id,data})=>({
                url:`transactions/${id}`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags:['transactions']
        }),
    })
});

export const {useAddTransactionMutation,useGetTransactionsQuery,useDeleteTransactionMutation,useUpdateTransactionMutation,useGetTransactionQuery} =apiSlice;