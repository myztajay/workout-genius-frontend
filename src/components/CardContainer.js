import React from 'react';

const CardContainer = ({children}) =>{
    const styles = {
        main:{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flexStart',
            justifyContent: 'center',
        }
    }
    
    return(
        <div style={styles.main}>
            {children}
        </div>
    )
}

export default CardContainer