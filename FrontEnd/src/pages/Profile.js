import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import ProfileDetails from "../components/profileDetails";
import { Navigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useEffect, useContext } from 'react'

import { AuthContext } from '../context/AuthContext'



export default function PageProfile() {
    const {currentUser} = useContext(AuthContext)
    const login = currentUser? true : false
    const { state } = useLocation();
    const alert = useAlert()

    if (!login)
    {
      alert.show("You must login first to view this page")
      return <Navigate to="/login" />;
    }


    return <Routes>
            <Route path="/" element={<PageUserProfile select={state ? state.page : null}/>}/>
            <Route path=":userId" element={<PageUserProfile/>}/>
        </Routes>;
}

function PageUserProfile({ select }) {

    const { userId } = useParams()

    // console.log(select)
    console.log("userI: ", userId)
    console.log("select: ", select)

    return (
        <div className="flex flex-row justify-center">
            <ProfileDetails preSelect={select} userId={userId} />
        </div>
    );
}
