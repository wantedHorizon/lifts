import React from 'react'

interface Props {
    data:any;
    onClick:()=>void;
}

const style = {
    width:'19%',
    // textTransform: ,
}
export default function OrderLiftBtn({data,onClick}:Props) {
    return (
            <button style={style} onClick={onClick}>
                {data&&data.status.charAt(0).toUpperCase()+data.status.slice(1)}
            </button>
    )
}
