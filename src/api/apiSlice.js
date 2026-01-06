
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Hero'],
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags:  ['Hero']

        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero,
            }),
            invalidatesTags: ['Hero'],
        }),
    }),
});

export const { useGetHeroesQuery, useCreateHeroMutation } = apiSlice;