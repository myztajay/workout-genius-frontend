import React from 'react';


const renderIcons = (intensity)=>{
  switch (intensity){
    case 33:
      return(
        <div className="icon-container">
            <i class="material-icons material-iconz">fitness_center</i>
        </div>
      )
      
    case 66:
      return(
        <div className="icon-container">
            <i class="material-icons material-iconz">fitness_center</i>
            <i class="material-icons material-iconz">fitness_center</i>
        </div>
      )
    
    case 99:
      return(
        <div className="icon-container">
            <i class="material-icons material-iconz">fitness_center</i>
            <i class="material-icons material-iconz">fitness_center</i>
            <i class="material-icons material-iconz">fitness_center</i>
        </div>
      )  
    default:        
  }
}

export const IntensityRating = (props) =>{
  return(
    <div>
    {renderIcons(props.intensity)} 
    </div> 
  )
}