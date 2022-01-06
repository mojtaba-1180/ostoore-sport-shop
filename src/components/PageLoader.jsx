import React from 'react'

const PageLoader = (props) => {
    return (
        <div className={`loader-page ${props.Loader && "disable-loader"} `}>
            <div className='loader-page-container'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default PageLoader
