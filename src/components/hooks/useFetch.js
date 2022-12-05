import axios from 'axios'
import { useEffect } from 'react'

const useFetch = (locationInput, setLocation, setHasError) => {
    useEffect(() => {
        let URL
        if (locationInput) {
            URL = `https://rickandmortyapi.com/api/location/${locationInput}`
        } else {
            const rdmLocation = Math.floor(Math.random() * 126) + 1
            URL = `https://rickandmortyapi.com/api/location/${rdmLocation}`
        }

        axios.get(URL)
            .then(res => {
                setLocation(res.data)
                setHasError(false)
            })
            .catch(err => {
                setHasError(true)
                console.log(err)
            })

    }, [locationInput])

}

export default useFetch