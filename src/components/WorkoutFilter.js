import React from 'react'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


export const WorkoutFilter = ({name, abrev, onFilterToggle, type, active})=> {
  return(
    <Chip
      style={{margin: "10px"}}
      
      onClick={() => onFilterToggle(type)}
     >
      <Avatar size={32} color={'white'} backgroundColor={'#2979FF'}>
       {abrev}
      </Avatar>
      {name}
    </Chip>
  )
}