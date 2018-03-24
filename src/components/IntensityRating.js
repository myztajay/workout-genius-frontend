import React from 'react'

const renderIcons = (intensity) => {
  switch (intensity) {
    case 33:
      return (
        <div className="icon-container">
          <i className="material-icons material-iconz">fitness_center</i>
        </div>
      )

    case 66:
      return (
        <div className="icon-container">
          <i className="material-icons material-iconz">fitness_center</i>
          <i className="material-icons material-iconz">fitness_center</i>
        </div>
      )

    case 99:
      return (
        <div className="icon-container">
          <i className="material-icons material-iconz">fitness_center</i>
          <i className="material-icons material-iconz">fitness_center</i>
          <i className="material-icons material-iconz">fitness_center</i>
        </div>
      )
    default:
  }
}

const IntensityRating = ({ intensity }) => (
  <div>
    {renderIcons(intensity)}
  </div>
)

export default IntensityRating