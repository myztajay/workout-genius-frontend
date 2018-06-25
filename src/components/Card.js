import React, { Component } from 'react';
import Media from "react-media";
import MyIcon from "../components/MyIcon";
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IntensityRating from '../components/IntensityRating';
import PlayModal from '../components/PlayModal';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Paper from '@material-ui/core/Paper';

const styles = {
    card:{
        minHeight: 80,
        margin: 5,
        maxWidth: "100%"
    },
    desktopCard:{    
        minHeight:250,
        margin: 5,
        flex: '1 0 30%',
        minHeight:300,
        background: "#292828",
        flexDirection:'column',
    },
    userInfo:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        maxHeight: 60,
        padding: 10,
    },
    profileImg:{
        height: 50,
        borderRadius: '100%',
    },
    cardMain:{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        flexBasis:"50%",
        flexDirection: "column",
        padding: 10
    },
    cardSide:{
        display:"flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex:"1 1 25%",
        padding: 10
    },
    img:{
        width: 25,
        height:25,
        borderRadius: '100%',
        padding:10
    },
    creator:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width:'100%',
        background: '#3C3C3C'
    }
}

const Card = ({ paperElevation=0 ,width, title, sub, icon="directions_run", iconColor, minHeight }) => {
    // NEED TO WRITE MY OWN FUNCTION OR LIBRARY TO ASESS BROWSER WIDTH SO THAT I CAN JUST
    //DYNAMIC CSS using withMobileDialog for the width prop that it brings.

    width ==='xs' ? styles.desktopCard.flex='1 1 90%': styles.desktopCard.flex='1 0 30%'
    return(
            <Paper elevation={paperElevation} className="buttonHover" style={{...styles.desktopCard, width, minHeight}}>
                 <Link to={`/`} >
                    <div style={{...styles.cardSide, cursor:'pointer'}}>
                        <MyIcon icon={icon} bgColor={iconColor} fontSize="70" /> 
                    </div>
                    <div style={{...styles.cardMain, cursor:'pointer'}}>             
                        <Typography style={{color:'white'}} variant='display2' color="white"  >
                            {title}
                        </Typography >
                        <Typography style={{color:'white'}} variant='display1' color="white"  >
                            {sub}
                        </Typography >
                    </div>
                </Link>
            </Paper>       
    )
}

export default withMobileDialog()(Card)

