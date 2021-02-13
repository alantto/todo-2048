import React from "react";

const Tile = (props) => {
    const valueCssClass = `tile tile-value-${props.value}`;
    return (<span className={valueCssClass}>{props.value}</span>)
}

export default Tile;