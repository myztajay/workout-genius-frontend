import React from 'react';

const HeroBanner = ({title, subTitle='', backgroundImage, color, customHeight='80vh'}) => {
    const styles = {
        banner:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: customHeight,
            backgroundColor: '#c93030'
        }
    }

    return(
        <div style={{...styles.banner,}}>
            <div>
                <h1>{title}</h1>
                <h4>{subTitle}</h4>
            </div>          
        </div>
    )
}

export default HeroBanner