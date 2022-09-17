import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://react-redux-json-server.herokuapp.com',

    }),
    tagTypes:['transactions'],
    endpoints: (builder)=>({
        addTransaction:builder.mutation({
            query:(data)=> ({
                url:'db_expense_tracker',
                method:'POST',
                body:data
            }),
            invalidatesTags:['transactions']
        }),
        getTransactions:builder.query({
            query:(queryString)=> `/db_expense_tracker?${queryString !==undefined ? queryString :''}`,
            providesTags:['transactions']
        }),
        getTransaction:builder.query({
            query:(id)=>`/db_expense_tracker?id=${id}`,
        }),
        deleteTransaction:builder.mutation({
            query:(id)=>({
                url:`db_expense_tracker/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['transactions']
        }),
        UpdateTransaction:builder.mutation({
            query:({id,data})=>({
                url:`db_expense_tracker/${id}`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags:['transactions']
        }),
    })
});

export const {useAddTransactionMutation,useGetTransactionsQuery,useDeleteTransactionMutation,useUpdateTransactionMutation,useGetTransactionQuery} =apiSlice;