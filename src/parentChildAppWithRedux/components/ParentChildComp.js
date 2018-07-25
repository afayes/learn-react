import React from "react";

export default function ParentComp(props) {
    const children = props.items.map((item) =>
        <ChildComp key={item.id} id={item.id} enabled={item.enabled} handleClick={props.handleClick}/>
    );
    return (
        <div>
            Parent component
            <ul>
                {children}
            </ul>
        </div>
    );
}

function ChildComp(props) {
    return (
        <li onClick={() => props.handleClick(props.id)}>Child component {props.id} -
            enabled: {props.enabled ? 'true' : 'false'}</li>
    );
}

