import React, { Component } from 'react'
import Media from "react-media";
import { MyIcon } from "../components/MyIcon"
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
        minHeight: 130,
        background:"whi",
        margin: 5,
        flexBasis: '40%',
        flexGrow: 1,
        maxWidth: "49%",
        background: "white",
    },
    shared:{
        display: "flex",
        flexWrap: "wrap"
    },
    cardMain:{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
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


const WorkoutCard = ({name, subtitle, description, intensity}) => {
    return(
        <Media query="(min-width: 768px)">
        {matches =>
          matches ? (
            <div style={{...styles.desktopCard, ...styles.shared}}>
                <div style={styles.cardSide}>
                <IntensityRating intensity={intensity} />
                <MyIcon icon="favorite" fontSize="40" />
                </div>
                <div style={styles.cardMain}>
                    <Typography className='brand' variant='display2' color="inherit" >
                        {name}
                    </Typography >
                    {description}
                </div>
                <div style={styles.cardSide}>
                <MyIcon icon="play_circle_filled" fontSize="80" />
                </div>
            </div>
          ) : (
            <div style={styles.card}>jajaj</div>
          )
        }
      </Media>
    )
}

export { WorkoutCard }

