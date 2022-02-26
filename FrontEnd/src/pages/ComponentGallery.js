import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"
import CategoryItem from "../components/categoryItem.js";
import ItemPreview from "../components/itemPreview";
import ConcisePreview from "../components/itemConcisePreview.js";
import UserProfile from "../components/userProfile.js";
import UploadImage from "../components/uploadImage.js";
import LongPreview from "../components/itemPreviewLong.js";

export default function PageComponentGallery() {
    return (
        <div className="flex flex-col space-y-10">
            <ItemPreview />
            <LongPreview />
            <ConcisePreview />
            <SignUp/>
            <SignIn/>
            <CategoryItem label="Books" imgUrl="https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_120" />
            <UserProfile userName="aaaaa"/>
            <UploadImage />
        </div>
    )
}