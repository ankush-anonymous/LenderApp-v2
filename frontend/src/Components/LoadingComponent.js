import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';


const Loading = ({ message="Loading..." }) => {
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
            backdropFilter: 'blur(1px)', // Apply the blur effect
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the background color and opacity
            flexDirection: 'column'
        }}>
            <CircularProgress />
            <p>{message}</p>
        </div>
    )
}

export default Loading