import { useEffect, useState } from 'react'
import './App.css'
import Location from './components/Location'
import ResidentCard from './components/ResidentCard'
import Search from './components/Search'
import useFetch from './components/hooks/useFetch'
import Page from './components/Page'

function App() {
  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)
  const [pageRequested, setPageRequested] = useState(1)
  const [residentsArr, setResidentsArr] = useState([])
  const [pages, setPages] = useState(0)

  useFetch(locationInput, setLocation, setHasError)

  useEffect(() => {
    setPageRequested(1)
  }, [locationInput])

  useEffect(() => {
    if ((location?.residents.length / 20) > 1) {
      if (location?.residents.length % 20 !== 0) {
        setPages(Math.floor(((location?.residents.length / 20) + 1)))
      } else {
        setPages(Math.floor(((location?.residents.length / 20))))
      }
    } else {
      setPages(0)
    }
  }, [location])

  useEffect(() => {
    let firstValue = (pageRequested - 1) * 20
    let lastValue = (pageRequested * 20)
    setResidentsArr(location?.residents.slice(firstValue, lastValue))
  }, [location, pageRequested, locationInput])

  return (
    <div className="App">
      <div className='home-container'>
        <Search
          setLocationInput={setLocationInput}
          hasError={hasError}
          setPageRequested={setPageRequested}
        />
      </div>
      <div>
        <Location location={location} />
      </div>
      <div className='residents-container'>
        {
          residentsArr?.map(url => (
            <ResidentCard key={url} url={url} />
          ))
        }
      </div>
      {
        pages ?
          <div className='page-container'>
            <Page
              pages={pages}
              setPageRequested={setPageRequested}
            />
          </div> :
          <></>
      }

    </div>
  )
}

export default App
