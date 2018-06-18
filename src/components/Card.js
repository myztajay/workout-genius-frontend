import React from 'react';

const Card = ({children}) => {
    const styles={
        main:{
            backgroundColor: 'white',
            margin:'0 auto',
            display:'flex',
            justifyContent: 'spaceEvenly',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth:450,
            width:400
        }
    }
    return(
        <div style={styles.main}>
            {children}
        </div>
    )
}

export default Card