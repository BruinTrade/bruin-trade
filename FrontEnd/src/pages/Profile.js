import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import ProfileDetails from "../components/profileDetails";

export default function PageProfile() {
    const { state } = useLocation();

    return <Routes>
            <Route path="/" element={<PageUserProfile select={state ? state.page : null}/>}/>
            <Route path=":userId" element={<PageUserProfile />}/>
        </Routes>;
}

function PageUserProfile({ select }) {

    const { userId } = useParams()

    return (
        <div className="flex flex-row justify-center">
            <ProfileDetails preSelect={select} username={userId} />
        </div>
    );
}