import React from 'react';
import Slider from 'material-ui/Slider';
import './intensityslider.css'

const renderSliderTips = (intensity)=>{

  var mystyles ={
    myGreen: {
      color:'#27ae60'
    },    
    myRed:{
      color:'#e74c3c' 
    },  
    myYellow:{
      color:'#e67e22'
    },
    divGreen:{
      backgroundColor: '#EAF7E7',
      padding: 10
    },
    divYellow:{
      backgroundColor: '#feffe5',
      padding: 10
    },
    divRed:{
      backgroundColor: '#ffe5e5',
      padding: 10
    }
    
  }
  switch (intensity){
    case 33:
      return(
        <div style={mystyles.divGreen}>
        <h4 style={mystyles.myGreen} className='my-green' >This so easy</h4>
        <p style={mystyles.myGreen}> a light workout that anyone can handle even your grandmother</p>
        </div>
      )
      
    case 66:
      return(
        <div style={mystyles.divYellow}>
        <h4 style={mystyles.myYellow}>The medium sauce</h4>
        <p style={mystyles.myYellow} > Most people can accomplish this workout</p>
        </div>
      )
    
    case 99:
      return(
        <div style={mystyles.divRed}>
        <h4 style={mystyles.myRed}>Some difficult stuff</h4>
        <p style={mystyles.myRed}> This is trainig for sports or the brolympics </p>
        </div>
      )  
    default:        
  }
}

export const IntensitySlider = (props) =>{
  return(
    <div>
    <Slider min={0.33} max={0.99}step={0.33} value={props.intensity} onChange={props.handleSliderChange} />
    {renderSliderTips(props.intensity)} 
    </div> 
  )
}