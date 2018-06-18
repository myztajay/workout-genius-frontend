import React from 'react';
import  SectionContainer  from './SectionContainer'
import Card from '../components/Card'
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const AuthContainer = ({logInWithFacebook}) =>{
    return(
        <SectionContainer center='true'>
            <Card>
                <form style={{display:'flex', flexDirection:'column', justifyContent: 'space-around'}}>
                    <Typography style={{fontSize: 25}} variant='display4' color="#57515E">Login in to your account</Typography>
                    <button>qweqwe</button>
                    <div></div>
                </form>
                
            </Card>
        </SectionContainer>
    )
}

export default AuthContainer