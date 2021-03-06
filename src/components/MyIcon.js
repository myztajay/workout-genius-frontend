import React from 'react';
import Icon from '@material-ui/core/Icon';
import { IconButton } from '@material-ui/core';

const MyIcon = ({bgColor, fontSize, icon, cb, onClick, cursor }) => {
    const styles={
        background: bgColor || 'linear-gradient(150deg,#2979FF 15%,#05d5ff 70%,#F4FF81 105%)', 
        fontSize: Number(fontSize),
        webkitBackgroundClip: "text",
        webkitTextFillColor: "transparent",
        cursor: cursor,
    }
    return(
            <Icon onClick={onClick}style={styles}>{icon}</Icon>   
    )
}

export default MyIcon 
