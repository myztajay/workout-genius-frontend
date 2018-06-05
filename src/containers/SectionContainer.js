import React from 'react';
import Media from "react-media";



const SectionContainer = ({children}) => {
    const styles = {
        main:{
            padding:40,
        }
    }
    return (
        <Media query="(min-width: 768px)">
        {matches =>
          matches ?(
            <div style={{padding:40}}>{children}</div>
          ) : (
            <div style={{padding:0}}>{children}</div>
          )
        }
        </Media>
        
    )
}


export default SectionContainer