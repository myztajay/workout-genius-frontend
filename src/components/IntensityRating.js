import React from 'react'
import MyIcon from './MyIcon'

const renderIcons = (intensity, fontSize) => {
  switch (intensity) {
    case 33:
      return (
        [<MyIcon onClick={this.onPlayOpen} icon="fitness_center" fontSize={fontSize} bgColor="lawngreen"/>]
      )

    case 66:
      return (
        [
        <MyIcon onClick={this.onPlayOpen} icon="fitness_center" fontSize={fontSize} bgColor="lawngreen"/>,
        <MyIcon onClick={this.onPlayOpen} icon="fitness_center" fontSize={fontSize} bgColor="lawngreen"/>,
        ]
      )

    case 99:
      return (
        [
          <MyIcon onClick={this.onPlayOpen} icon="fitness_center" fontSize={fontSize} bgColor="lawngreen"/>,
          <MyIcon onClick={this.onPlayOpen} icon="fitness_center" fontSize={fontSize} bgColor="lawngreen"/>,
          <MyIcon onClick={this.onPlayOpen} icon="fitness_center" fontSize={fontSize} bgColor="lawngreen"/>,

        ]
      )
    default:
  }
}

const IntensityRating = ({ intensity, fontSize=40}) => (
  <div style={{display: 'inline'}}>
    {renderIcons(intensity, fontSize)}
  </div>
)

export default IntensityRating