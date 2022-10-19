import React, {useState, useEffect} from 'react'
import axios from 'axios';

const SuperHero = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([])
  const [error, seterror] = useState('')
  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then(res => {
        setdata(res.data)
        setloading(false)
    } ).catch(err => {
        seterror(err.message);
        setloading(false);
    })
  }, [])
  
  if(loading) {
    return <h2>loading...</h2>
  }
  if(error){
    return <h2>Error...</h2>
  }
    return (
    <>
        <h2>SuperHero</h2>
        {
            data.map(item => (
                <div key={item.name}>
                    {item.name}
                </div>
            ))
        }
    </>
  )
}

export default SuperHero