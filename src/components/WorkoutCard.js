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

const WorkoutCard = ({ iconBg, paperElevation=0 ,width, name, subtitle, description, intensity, _id, creator, exercises}) => {
    // NEED TO WRITE MY OWN FUNCTION OR LIBRARY TO ASESS BROWSER WIDTH SO THAT I CAN JUST
    //DYNAMIC CSS using withMobileDialog for the width prop that it brings.

    width ==='xs' ? styles.desktopCard.flex='1 1 90%': styles.desktopCard.flex='1 0 30%'
    return(
            <Paper elevation={paperElevation} className="buttonHover" style={{...styles.desktopCard, width}}>
                 <Link key={_id} to={`/workout/${_id}`} >
                    <div style={{...styles.cardSide, cursor:'pointer'}}>
                        <MyIcon icon="directions_run" bgColor={iconBg} fontSize="70" /> 
                    </div>
                    <div style={{...styles.cardMain, cursor:'pointer'}}>             
                        <Typography style={{color:'white'}} variant='display2' color="white"  >
                            {name}
                        </Typography >
                    </div>
                </Link>
                <div style={styles.cardSide}>
                    <PlayModal  
                        name={name}
                        exercises={exercises}
                    /> 
                </div>
                    <div style={styles.creator}>
                        {/* <img style={styles.img} src={`https://scontent.fbos1-2.fna.fbcdn.net/v/t1.0-1/p160x160/29177715_10215099656714430_8425042051333358499_n.jpg?_nc_cat=0&oh=61aae8a0dbda4c0dd6110b4356742305&oe=5BB10F6E`}/> */}
                        <div style={{color:'white', flex:'1 1 100%', fontSize:20}} >
                            by {creator[0].display_name}
                        </div > 
                        <div style={{color:'white', fontSize:20, alignItems:'center'}} >
                            Exercises: {exercises.length} /
                            intensity: <IntensityRating intensity={intensity} fontSize={15} />
                        </div>
                   
                    </div>  
            
            </Paper>       
    )
}

export default withMobileDialog()(WorkoutCard)

