import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
const RQsuperHero = () => {
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')
 
    const queryClient = useQueryClient()

    const fetchSuperHeroes = () => {
        return axios.get('http://localhost:4000/superheroes')
    }
    
    const mutation = useMutation(superHero => {
        return axios.post('http://localhost:4000/superheroes', superHero)
      })
    
    const { isLoading, data, isError, error, isFetching } =
        useQuery('super-heroes', fetchSuperHeroes, {
            staleTime: 3000,
        });

    console.log(isLoading, isFetching);
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
    }
    const handleAddHeroClick = () => {
        const hero = { name, alterEgo }
        mutation.mutate(hero, {
            onSuccess:(data, variables, context) => {
                console.log('SUCCESS : ', data)
                queryClient.invalidateQueries('super-heroes')
            }
        });
        
    }
    
    return (
        <>
            <h2>RQsuperHero</h2>
            <div>
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='text'
                    value={alterEgo}
                    onChange={e => setAlterEgo(e.target.value)}
                />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            {
                data?.data.map(item => (
                    <div key={item.name}>
                        {item.name}
                    </div>
                ))
            }
        </>
    )
}

export default RQsuperHero