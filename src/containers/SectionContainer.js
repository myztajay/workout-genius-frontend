import React from 'react';

const SectionContainer = ({ children, justifyContent='center',  backgroundImage, color, customHeight='80vh'}) => {
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
                {children}       
        </div>
    )
}

export default SectionContainer