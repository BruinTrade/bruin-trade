import React from 'react'
import { useState } from "react";

class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imgState: ''}
        //this.handleClick = this.handleClick.bind(this)
    }

    

    render() {
        return (
            <div className='w-1354px h-682px bg-white pt-52px pr-25px pl-51px flex-row flex justify-between rounded-25px'>
                <img src={this.props.src} className='w-600px h-500px border-gray-100 border-2'/>
                <div className='flex flex-col'>
                    <h1 className='w-638px h-81px text-32px font-roboto-reg leading-none line-clamp-2'>
                        {this.props.text}
                    </h1>
                    <div className='h-20px m-w-638px'>
                        {/*Tag component*/}
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col justify-between'>

                            <div className='h-52px w-105px flex flex-col'>
                                
                                <p className='text-12px text-gray-400 font-roboto-reg'>Price</p>
                                <p className='text-28px mb-20px font-avenir-reg text-gold'>
                                    {this.props.price}
                                </p>

                                <p className='text-12px text-gray-400 font-roboto-reg'>Condition</p>
                                <p className='text-14px mb-20px font-avenir-reg text-gray-500'>
                                    {this.props.cond}
                                </p>

                                <p className='text-12px text-gray-400 font-roboto-reg'>Location</p>
                                <p className='text-14px mb-20px font-avenir-reg text-gray-500'>
                                    {this.props.loc}
                                </p>

                                <p className="w-400px h-196px text-12px font-avenir-next text-gray-500 break-words leading-none truncate">
                                    {this.props.desc}
                                </p>
                            </div>

                        </div>
                        <div className='flex flex-col justify-between'>
                            

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ItemDetails.defaultProps = {
    // for testing purposes
    src: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640',
    text: 'Lorem ipsum dolor sit amet. Please don\'t overflow!!!!!!!!!!! PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASe',
    price: '$' + '999.99',
    cond: 'Great',
    loc: 'Westwood',
    desc: 'Some description.',
};

export default ItemDetails;