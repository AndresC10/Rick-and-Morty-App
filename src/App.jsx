import { useState } from 'react'
import './App.css'
import Location from './components/Location'
import ResidentCard from './components/ResidentCard'
import Search from './components/Search'
import useFetch from './components/hooks/useFetch'
import { useEffect } from 'react'

function App() {
  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)

  useFetch(locationInput, setLocation, setHasError)


  return (
    <div className="App">
      <div className='home-container'>
        <Search
          setLocationInput={setLocationInput}
          hasError={hasError}
        />
      </div>
      <div>
        <Location location={location} />
      </div>
      <div className='residents-container'>
        {
          location?.residents.map(url => (
            <ResidentCard key={url} url={url} />
          ))
        }
      </div>
    </div>
  )
}

export default App
