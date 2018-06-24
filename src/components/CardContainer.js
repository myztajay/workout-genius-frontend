import React from 'react';

const CardContainer = ({children}) =>{
    const styles = {
        main:{
            flex: '1 1 80%',
            margin: 15,
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