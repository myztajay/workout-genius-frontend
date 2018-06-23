import React from 'react';
import Typography from '@material-ui/core/Typography'

const HeroBanner = ({title='', justifyContent='center', subTitle='', backgroundImage, color, customHeight='80vh'}) => {
    const styles = {
        banner:{
            display: 'flex',
            justifyContent,
            alignItems: 'center',
            color,
            minHeight: customHeight,
            backgroundColor: '',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
        }
    }

    return(
        <div style={{...styles.banner,}}>
            <div>
            <Typography style={{textAlign: 'center'}} variant='display2' color="inherit" >  {title}</Typography>
            </div>          
        </div>
    )
}

export default HeroBanner