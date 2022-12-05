
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import './styles/Search.css'


const Search = ({ setLocationInput, hasError }) => {
    const [data, setData] = useState()
    const [sgLocations, setSgLocations] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        let arrPages = []
        let oldArr = []
        let numberOfPages
        axios.get(`https://rickandmortyapi.com/api/location`)
            .then(res => {
                numberOfPages = res.data.info.pages
                if (arrPages.length !== numberOfPages) {
                    for (let u = 1; u <= numberOfPages; u++) {
                        arrPages.push(`https://rickandmortyapi.com/api/location?page=${u}`)
                    }
                }
                if (arrPages.length !== res.data.info.count) {
                    for (let i = 0; i < numberOfPages; i++) {
                        axios.get(arrPages[i])
                            .then(res => {
                                let newLocations = res.data.results
                                let newArr = oldArr.concat(newLocations)
                                oldArr = newArr
                                setData(oldArr)
                            })
                            .catch(err => console.log(err))
                    }
                }
            })
            .catch(err => console.log(err))
    }, [])

    const onSuggestionsFetchRequested = ({ value }) => {
        setSgLocations(filteringLocation(value))
    }

    const filteringLocation = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        let filterdData = data.filter(location => {
            let toFilterLocation = location.name
            if (toFilterLocation.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(inputValue)) {
                return location
            }
        })
        return inputLength === 0 ? [] : filterdData
    }

    const onSuggestionsClearRequested = () => setSgLocations([])

    const getSuggestionValue = suggestion => `${suggestion.name}`

    const renderSuggestion = suggestion => (
        <div className='suggestionBox' onClick={() => handleLocation(suggestion)}>
            {`${suggestion.name}`}
        </div>
    )

    const handleLocation = location => {
        setLocationInput(location.id)
    }

    const onChange = (e, { newValue }) => setValue(newValue)

    const inputProps = {
        placeholder: 'Location name or ID',
        value,
        onChange
    }

    const handleId = location => setLocationInput(location[0].id)

    const eventEnter = e => {
        if (e.key === 'Enter') {
            let actualLocation = data.filter(l => l.name == e.target.value.trim())
            handleId(actualLocation)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLocationInput(e.target.autosuggestId.value)
    }

    const renderInputComponent = inputProps => (
        <form onSubmit={handleSubmit}>
            <input id='autosuggestId' {...inputProps} />

        </form>
    )

    return (
        hasError ?
            <div className='search-container'>
                <span className='errorMessage'>You must enter a valid ID or select a location</span>
                <>
                    <Autosuggest
                        suggestions={sgLocations}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={eventEnter}
                        renderInputComponent={renderInputComponent}
                    />
                </>
            </div>
            :
            <Autosuggest
                suggestions={sgLocations}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={eventEnter}
                renderInputComponent={renderInputComponent}
            />
    )
}

export default Search