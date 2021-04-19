import React from 'react'

interface Props {
    floorLevel:number,
    fromTheLeft: number,
    text: string,
}
export default function FloorCell(props:Props) {
    return (
        <div style={{
            width:'16%',
            height: '100%',
            backgroundColor:'white',
            border:'0.5px solid black',
        }}>
            {props.text}
        </div>
    )
}
