import React from 'react'

interface Props {
    data:any;
    orderLift:()=>void;
}

const style = {
    width:'19%',
    // textTransform: ,
}
export default function OrderLiftBtn({data,orderLift}:Props) {
    const onClickHandler = ()=>{
        if(data.status !=='call'){
            return;
        }
        orderLift();
    }
    return (
            <button style={style} onClick={onClickHandler}>
                {data&&data.status.charAt(0).toUpperCase()+data.status.slice(1)}
            </button>
    )
}
