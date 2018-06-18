import React from 'react';
import Media from "react-media";

const SectionContainer = ({children, center=false, height='60vh'}) => {
    const styles = {
        main:{}
    }
    if(center){
       styles.main = { display:'flex',justifyContent: 'center'} 
    }
    if(height){
        styles.main.height = height
    }
    return (
        <Media query="(min-width: 768px)">
        {matches =>
          matches ?(
            <div style={{...styles.main, padding:40}}>{children}</div>
          ) : (
            <div style={{...styles.main, padding:0}}>{children}</div>
          )
        }
        </Media>
        
    )
}


export default SectionContainer