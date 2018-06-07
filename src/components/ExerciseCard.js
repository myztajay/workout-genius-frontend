import React from 'react';
import Media from "react-media";
import Typography from '@material-ui/core/Typography';


const ExerciseCard = ({name, sets, reps}) => {
    const styles = {
        desktopCard:{    
            minHeight:250,
            margin: 5,
            display: 'flex',
            flex: '0 1 90%',
            background: "white",
            justifyContent: 'center'
        },
        cardMain:{
            display:"flex",
            justifyContent: "center",
            alignItems: 'start',
            flexBasis:"50%",
            flexDirection: "column",
        },
        cardSide:{
            display:"flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexBasis:"25%",
            flexDirection: "column",
        },
        circle:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:'center',
            color:'white',
            width: 100,
            height: 100,
            backgroundColor: '#2979FF',
            borderRadius: 100,
            margin: 10,
        },
        muted:{
            color: '#4b4a4a'
        },
        imgStyle:{
            maxHeight:250
        }
    }
    return(
        <Media query="(min-width: 768px)">
            { matches=>
                matches ? (
            <div style={styles.desktopCard}>
                <div style={styles.cardSide}>
                    <img style={styles.imgStyle} src="/j.jpg" /> 
                </div>
                <div style={styles.cardMain}>  <Typography className='brand' variant='display2' color="inherit" >Exercise Name: {name}</Typography><p style={styles.muted}>DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nec mauris sed porta. Fusce luctus risus ac hendrerit bibendum. Pellentesque nec pharetra ipsum. Nullam vestibulum posuere molestie. Nullam fermentum placerat est vitae rutrum. Suspendisse nec turpis varius dui fermentum facilisis a id lectus. Maecenas sed orci eget enim lacinia viverra. Morbi velit sem, ullamcorper eu risus vitae, cursus dapibus sapien.</p></div>
                <div style={styles.cardSide}>
                    <div style={styles.circle}><h4 style={{margin:10}}>SETS</h4> <p>{sets}</p></div>
                    <div style={styles.circle}><h4 style={{margin:10}}>REPS</h4> <p>{reps}</p></div> 
                </div>
            </div>  
                ) : (
                <div style={{...styles.desktopCard, flexDirection:'column', flex:'1 1 100%', padding:10}} >                       
                    <div style={styles.cardMain}>  <Typography className='brand' variant='display2' color="inherit" >Exercise Name: {name}</Typography><p style={styles.muted}>DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim nec mauris sed porta. Fusce luctus risus ac hendrerit bibendum. Pellentesque nec pharetra ipsum. Nullam vestibulum posuere molestie. Nullam fermentum placerat est vitae rutrum. Suspendisse nec turpis varius dui fermentum facilisis a id lectus. Maecenas sed orci eget enim lacinia viverra. Morbi velit sem, ullamcorper eu risus vitae, cursus dapibus sapien.</p></div>
                    <div style={{...styles.cardSide, flexDirection:'row'}}>
                    <img style={{...styles.imgStyle, maxHeight:100}} src="/j.jpg" /> 
                        <div style={styles.circle}><h4 style={{margin:10}}>SETS</h4> <p>{sets}</p></div>
                        <div style={styles.circle}><h4 style={{margin:10}}>REPS</h4> <p>{reps}</p></div> 
                    </div>
                </div>        
                )
            }
        </Media>
    )
}

export default ExerciseCard