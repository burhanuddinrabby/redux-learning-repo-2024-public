// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
    //
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        getAllTodos: builder.query({
            query: (priority) => {
                const params = new URLSearchParams();
                if (priority) {
                    params.append("priority", priority);
                }
                return {
                    method: "GET",
                    url: `/tasks`,
                    params
                }
            },
            providesTags: ['todo']
        }),
        getSingleTodo: builder.query({
            query: (id) => {
                return {
                    method: "GET",
                    url: `/task/${id}`,
                }
            },
            providesTags: ['todo']
        }),
        addTodoIntoDB: builder.mutation({
            query: (data) => ({
                url: `/task`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['todo']
        }),
        deleteTodoFromDB: builder.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['todo']
        }),
        updateTodoIntoDB: builder.mutation({
            query: ({id, ...data}) => {
                return {
                    url: `/task/${id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['todo']
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTodosQuery, useGetSingleTodoQuery, useAddTodoIntoDBMutation, useDeleteTodoFromDBMutation, useUpdateTodoIntoDBMutation } = todoApi