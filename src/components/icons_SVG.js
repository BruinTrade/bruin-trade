import React from 'react';
import { ReactSVG } from 'react-svg';

export function get_icon(icon) {
    //path here is strange
    const fileName = "icons/" + icon;
    return <ReactSVG src={fileName} />;
}


export const Icons = {
    logo: "Logo.svg",
    search_icon: "Search.svg",
    location: "Location.svg",
    cart: "Cart.svg"
}

export default get_icon;


export function LogoIcon() {
    return ;
    
}