import React from 'react'

export default function CreatePost(props) {

    return (
        <div className='flex flex-row'>
            <div className='mt-61px ml-235px'>
                <div className='pl-25px avenir-med text-gray-500 text-16px'>Create your listing</div>
                <div className='w-800px h-960px bg-white pt-35px pr-25px pl-25px rounded-25px'>
                    <form className='w-full grid gap-y-50px flex flex-col'>
                        <div>
                            <label className='avenir-med text-14px'>
                                Title:
                                <input type={"text"} name="title" className='bg-gray-100 rounded-25px w-full h-40px px-3 py-2' required />
                            </label>
                        </div>

                        <div className='flex flex-row justify-between w-full'>
                            <div className='grid gap-y-50px w-300px' mr-60px>
                                <label className='avenir-med text-14px'>
                                    Location:
                                    <input type={"text"} name="location" className='bg-gray-100 rounded-25px w-full h-40px px-3 py-2' />
                                </label>
                                <label className='avenir-med text-14px'>
                                    Price Tag:
                                    <input type={"text"} name="price" className='bg-gray-100 rounded-25px w-full h-40px px-3 py-2' />
                                </label>
                                <label className='avenir-med text-14px'>
                                    Category Tag:
                                    <input type={"text"} name="category" className='bg-gray-100 rounded-25px w-full h-40px px-3 py-2' />
                                </label>
                                <label className='avenir-med text-14px'>
                                    Condition:
                                    <select className='bg-gray-100 rounded-25px w-full h-40px text-center px-3 py-2'>
                                        <option value="Great">Great</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                </label>
                            </div>

                            <div className='flex flex-col justify-start item-start ml-60px w-full'>

                                <label className='avenir-med text-14px text-left'>
                                    Photos:
                                </label>
                                <div className='bg-blue-100 w-10 h-10 rounded-12px'></div>
                            </div>
                        </div>

                        <div>
                            <label className='avenir-med text-14px'>
                                Description:
                                <textarea type={"text"} name="description" className='bg-gray-100 rounded-25px w-full h-221px px-3 py-2' />
                            </label>
                        </div>

                    </form>
                    <div className='flex flex-row justify-end mt-30px'>
                        <button className="w-150px h-50px rounded-full bg-blue-400 font-roboto-reg text-18px text-white bottom-0 right-0 mb-30px"> Post </button>
                    </div>
                </div>
            </div>

            <div className='w-357px h-817px mt-21px ml-40px mr-80px bg-white pt-35px pr-25px pl-25px flex flex-row justify-between rounded-25px'>
                photo
            </div>
        </div>
    );
}