import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const WorkoutSelectField = ({ value, handleSelectChange, errorText }) => (
  <div>
    <SelectField
      floatingLabelText="Workout Type"
      floatingLabelStyle={{ fontSize: '16', color: 'black' }}
      value={value}
      onChange={handleSelectChange}
      errorText={errorText}
    >
      <MenuItem value={0} primaryText="Select Type" />
      <MenuItem value={1} primaryText="Crossfit" />
      <MenuItem value={2} primaryText="Hybrid" />
      <MenuItem value={3} primaryText="BodyBuilding" />
      <MenuItem value={4} primaryText="Calisthetics" />
      <MenuItem value={5} primaryText="Cardio" />
    </SelectField>
  </div>
)

export default WorkoutSelectField
