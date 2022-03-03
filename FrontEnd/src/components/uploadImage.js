import React, { useState } from 'react'
import get_icon, { Icons } from "./icons_SVG.js"

export default function UploadImage(props) {

    return (
        <div className="relative w-24px h-24px">
            <input type="file" onChange={(event) => props.handleUploadImage(event)} multiple className="absolute block opacity-0 z-20 w-20px h-20px left-0 top-0" />
            <div className="absolute z-0 w-24px h-24px left-0 top-0">
                {get_icon(Icons.add)}
            </div>
        </div>
    )
}
