import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"
import CategoryItem from "../components/categoryItem.js";
import ItemPreview from "../components/itemPreview";
import ConcisePreview from "../components/itemConcisePreview.js";
import UserProfile from "../components/userProfile.js";
import UploadImage from "../components/uploadImage.js";
import CreatePost from "../components/createPost.js";
import CreateComment from "../components/createComment.js";
import CommentList from "../components/commentList.js";
import { UserProfileSmall } from "../components/userProfile.js";

const comments = [
    {
        commentBody : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stanLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Isum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.dard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.Ï",
        targetUser : "Shawn",
        author : "bob"
    },
    {
        commentBody : "Lorem Ipsumto make a type specimen book. It has survived not only five centuries.Ï",
        targetUser : "bob",
        author : "Alex"
    },
    {
        commentBody : "Lorem Ipsumto Lorem make a type specimen m Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stanLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Isum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.dard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.Ï",
        targetUser : "Bob",
        author : "Shawn"
    }
]


export default function PageComponentGallery() {
    return (
        <div className="flex flex-col space-y-10">
            <UserProfileSmall />
            <ConcisePreview />
            <SignUp/>
            <SignIn/>
            <CategoryItem label="Books" imgUrl="https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_120" />
            <UserProfile userName="aaaaa"/>
            <UploadImage />
            <CreatePost />
            <CreateComment/>
            <CommentList comments={comments}/>
        </div>
    )
}