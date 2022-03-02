import { Routes, Route, useParams } from 'react-router-dom';
import ProfileDetails from "../components/profileDetails";

export default function PageProfile() {
    return <Routes>
            <Route path="/" element={<PageUserProfile />}/>
            <Route path=":userId" element={<PageOtherUserProfile />}/>
        </Routes>;
}

function PageUserProfile() {
    return (
        <div className="flex flex-row justify-center">
            <ProfileDetails/>
        </div>
    );
}

function PageOtherUserProfile() {
    let { userId } = useParams();
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                {userId}
            </div>
        </div>)
}