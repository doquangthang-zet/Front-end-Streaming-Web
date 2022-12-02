import React, {useRef} from "react";
// import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function SideBarOptions(props) {
    const Icon = props.Icon;
    const title = props.title;
    const className = props.className;
    const sideBarRef = useRef();
    const href = props.href;
    return (
        <p onClick={()=>{sideBarRef.current.click();}} className={className} startIcon={Icon && <Icon/>}>
            <Link ref={sideBarRef} to={href}/>
            {title}
        </p>
    );
}

export default SideBarOptions;