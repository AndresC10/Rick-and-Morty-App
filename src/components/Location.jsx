import React from 'react'
import './styles/Location.css'

const Location = ({ location }) => {
    return (
        <article className='location-container'>
            <h2 className='location__name'>Location: {location?.name}</h2>
            <ul className='location__list'>
                <li className='location__item'><span className='location__item-label'>Type: </span>{location?.type}</li>
                <li className='location__item'><span className='location__item-label'>Dimesion: </span>{location?.dimension}</li>
                <li className='location__item'><span className='location__item-label'>Population: </span>{location?.residents.length}</li>
            </ul>
        </article>
    )
}

export default Location