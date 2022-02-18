import SignUp from "../components/signup.js"
import SignIn from "../components/signin.js"
import CategoryItem from "../components/categoryItem.js";
import ItemPreview from "../components/itemPreview";


export default function PageComponentGallery() {
    return (
        <div className="flex flex-col space-y-10">
            <ItemPreview />
            <SignUp/>
            <SignIn/>
            <CategoryItem label="Books" imgUrl="https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_120" />
        </div>
    )
}