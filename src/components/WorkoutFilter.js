import React from 'react'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

const WorkoutFilter = ({ name, abrev, onFilterToggle, type, active }) => (
  <Chip
    style={{ margin: '10px' }}
    onClick={() => onFilterToggle(type)}
  >
    <Avatar size={32} color="white" backgroundColor="#2979FF">
      {abrev}
    </Avatar>
    {name}
  </Chip>
)

export default WorkoutFilter
