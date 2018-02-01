import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './exercisetable.css'

function renderExercises(exercises){
  // takes in exercises as a prop and makes table entry for each
  return exercises.map((exercise, i )=>{
    return (
      <TableRow>
        <TableRowColumn key={i}>{exercise.name}</TableRowColumn>
        <TableRowColumn>{exercise.sets}</TableRowColumn>
        <TableRowColumn>{exercise.reps}</TableRowColumn>
      </TableRow>
    )
  })
}

const customColumnStyle = { width: '20%'};
export const ExerciseTable = ({exercises}) => (
  <Table fixedHeader={false} style={{ tableLayout: 'auto', marginTop: '20px'}} className='exercise-table'>
  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
      <TableHeaderColumn style={customColumnStyle}>Exercise</TableHeaderColumn>
      <TableHeaderColumn style={customColumnStyle}>Sets</TableHeaderColumn>
      <TableHeaderColumn style={customColumnStyle}>Reps</TableHeaderColumn>
    </TableRow>
  </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {renderExercises(exercises)}
    </TableBody>
  </Table>
)


