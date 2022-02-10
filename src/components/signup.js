import React from "react";

function SignUp(props) {
    return(
        <div className='w-350px h-494px bg-white rounded-25px item-center flex flex-col justify-between px-25px pt-29px font-avenir text-14px text-gray-500 font-medium'>
            <div>
                Username
                <form className='font-regular text-gray-300 rounded-12px bg-gray-100'>
                    No more than 20 characters
                </form>
            </div>
            <div>
                Email
                <form className='font-regular text-gray-300 rounded-12px bg-gray-100'>
                    No more than 20 characters
                </form>
            </div>
            <div>
                Password
                <form className='font-regular text-gray-300 rounded-12px bg-gray-100'>
                    No more than 20 characters
                </form>
            </div>
            <div>
                Location
                <form className='font-regular text-gray-300 rounded-12px bg-gray-100'>
                    No more than 20 characters
                </form>
            </div>
            <button>
                Sign Up
            </button>
        </div>
    )
}

export default SignUp;