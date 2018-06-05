import React, { Component } from 'react';
import Media from "react-media";
import { MyIcon } from "../components/MyIcon";
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IntensityRating from '../components/IntensityRating';

const styles = {
    card:{
        minHeight: 80,
        background:"white",
        margin: 5,
        maxWidth: "100%"
    },
    desktopCard:{    
        minHeight:250,
        margin: 5,
        flex: '1 1 30%',
        background: "white",
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
    shared:{
        display: "flex",
        flexWrap: "wrap"
    },
    cardMain:{
        display:"flex",
        justifyContent: "center",
        alignItems: "flexStart",
        flexBasis:"50%",
        flexDirection: "column",
    },
    cardSide:{
        display:"flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexBasis:"25%",
        flexDirection: "column",
    }
}

const WorkoutCard = ({name, subtitle, description, intensity, _id, creator}) => {
    // NEED TO WRITE MY OWN FUNCTION OR LIBRARY TO ASESS BROWSER WIDTH SO THAT I CAN JUST
    //DYNAMIC CSS <Media> has to render children components so I have duplicate do with just one
    // css prop different
    return(
        <Media query="(min-width: 768px)">
            {matches=>
                matches ? (
                <div style={{...styles.desktopCard, ...styles.shared}}>
                    <div style={styles.cardSide}>
                    <IntensityRating intensity={intensity} />
                    <MyIcon icon="favorite" bgColor="black" fontSize="40" />
                    </div>
                    <div style={styles.cardMain}>
                    <Link key={_id} to={`/workout/${_id}`} >
                        <Typography className='brand' variant='display2' color="inherit" >
                            {name}
                        </Typography >
                        {description}
                    </Link>
                    </div>
                    <div style={styles.cardSide}>
                    <MyIcon icon="play_circle_filled" fontSize="40" />
                    </div>
                </div>       
                ) : (
                    <div style={{...styles.desktopCard, flex:'1 1 90%', ...styles.shared}}>
                    <div style={styles.cardSide}>
                    <IntensityRating intensity={intensity} />
                    <MyIcon icon="favorite" bgColor="black" fontSize="40" />
                    </div>
                    <div style={styles.cardMain}>
                    <Link key={_id} to={`/workout/${_id}`} >
                        <Typography className='brand' variant='display2' color="inherit" >
                            {name}
                        </Typography >
                        {description}
                    </Link>
                    </div>
                    <div style={styles.cardSide}>
                    <MyIcon icon="play_circle_filled" fontSize="40" />
                    </div>
                </div>  
            )}
        </Media>
      
    )
}

export { WorkoutCard }

