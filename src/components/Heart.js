import React from 'react';

export const Heart = ({hover}) =>{
  if(hover){
    return(
      <i class="material-icons material-iconz heart">fitness_center</i>
    )
  }
  else return ''
}