import React from 'react'
import './styles/Page.css'
const Page = ({ pages, setPageRequested }) => {
    const buttonArr = []

    for (let i = 0; i < pages; i++) {
        buttonArr.push(i)
    }

    const handleClick = e => {
        setPageRequested(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div className='btn-container'>
            {
                buttonArr?.map(i => (
                    <button value={i + 1} className='btn' onClick={handleClick} key={i}>{i + 1}</button>
                ))
            }
        </div>
    )
}

export default Page