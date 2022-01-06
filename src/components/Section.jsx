import React from 'react'
import PropTypes from 'prop-types'
const Section = props => {
    return (
        <div className="section">
            {props.children}
        </div>
    )
}

export const SectionTitle = props => {
    return (
        <div className="section__title">
            <span className={`section__title_hr ${props.color}`} >
            </span>
            {props.children}
        </div>
    )
}

export const SectionBody = props => {
    return (
        <div className="section__body">
            {props.children}
        </div>
    )
}
SectionTitle.proptype={
    color: PropTypes.string
}
export default Section
