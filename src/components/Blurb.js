import React from 'react';
import Typography from '@material-ui/core/Typography'

const Blurb = ({ children, grow, shrink, basis, title, sub }) =>{
    const styles ={
        main:{
            display: 'flex',
            justifyContent: 'flexStart',
            flexWrap: 'wrap',
            padding:20,
            flex: `${grow} ${shrink} ${basis}`,
        },
    }
    return(
        <div style={styles.main}>
            <Typography style={{fontWeight: 600}}gutterBottom variant="display2" color="inherit">{title}</Typography>
            <Typography variant="display1" color="inherit" gutterBottom>{sub}</Typography>
            {children}
        </div>
    )

}

export default Blurb 