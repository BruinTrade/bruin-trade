
import React from "react";
import get_icon, { Icons } from "./icons_SVG.js"


function NavBar(props) {
    //const [input, setInput] = useState("");

    const login = props.login ?? false

    return (
    <div className="flex flex-row justify-center items-center pt-50px">
        {/* Logo Icon */}
        <div className="mr-50px">
            {get_icon(Icons.logo)}
        </div>
        <div className="flex items-center justify-between rounded-25px bg-white h-50px w-800px text-gray-200">
            <input id="search term" className="w-full border-0 px-3 py-2 rounded-lg focus:outline-none text-blue-600"/>
            <button onClick={() => {}} className="flex justify-center items-center rounded-25px bg-gradient-to-r from-blue-400 to-blue-500 opacity-60 w-50px h-35px mr-10px ">
                <div className="w-20px h-20px">
                    {get_icon(Icons.search_icon)}
                </div>
            </button>
        </div>
       
        {
            true ? (
                <div id="logged in" className="flex flex-row justify-end space-x-30px h-full w-298px">

                    <NavbarLable label="Location">
                        <div className="flex flex-row justify-start p-0 m-0">
                            <div className="w-20px h-20px">
                                {get_icon(Icons.location)}
                            </div>
                            <div className="text-9px text-gray-400">Westwood</div>
                            
                        </div>
                        
                    </NavbarLable>

                    <NavbarLable label="Cart">

                    </NavbarLable>

                    <div id="profile">
                    
                    </div>

                </div>
            ) : (
                <div id="not logged in" className="h-full w-auto flex flex-row items-center justify-end">
                    <div>
                        <button className="ml-172px w-100px h-50px text-gray-400 border-solid border-2 border-gray-400 rounded-25px" onClick={() => {}} >Sign Up</button>
                    </div>
                    <div>
                        <button className="ml-25px space-x-4px bg-gradient-to-r from-blue-400 to-blue-500 opacity-60 rounded-25px w-100px h-50px" onClick={() => {}} >Login</button>
                    </div>
                </div>
            )
        }

    </div>
    );
}


function NavbarLable(props) {
    return (
        <div className="flex flex-col">
            <div className="text-12px text-gray-500 font-semibold">{props.label}</div>
            {props.children}
        </div>
    );
}
//<div id="input" className="pl-21px text-grey-200 text-14px leading-none border-0 w-full">
//</div>

export default NavBar;
