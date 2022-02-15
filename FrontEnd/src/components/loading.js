import { useSelector } from "react-redux";

export default function Loading() {

    const loading = useSelector((state) => state.loading.loading)

    return (
        <div  id="loading-screen" className={`${loading ? "block" : "hidden"} w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50`}>
        <span class="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
            loading...
        </span>
        </div>
    );
}