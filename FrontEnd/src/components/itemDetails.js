import React from 'react'
import { useState } from "react";

// IMPORTANT: Limit the amount of words that can be submitted as an item's name and description. Otherwise the text
// will be very ugly to look at.


class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imgState: ''}
        //this.handleClick = this.handleClick.bind(this)
    }

    header (label) {
        return (
            <h2 className='text-12px text-gray-400 font-roboto-reg mb-3px'>{label}</h2>
        );
    };

    render() {
        return (
            <div className='w-1354px h-682px bg-white pt-52px pr-25px pl-51px flex flex-row justify-between rounded-25px'>
                <div classname='flex-col'>
                    <img src={this.props.src} className='w-600px h-500px border-gray-100 border-2'/>
                    <div className='flex-row'>
                    {/* Item Image State */}
                    </div>
                </div>
                
                <div className='flex-col'>
                    <h1 className='w-638px h-81px text-32px font-roboto-reg leading-none break-words overflow-hidden'>
                        {this.props.text}
                    </h1>
                    <div className='h-20px m-w-638px'>
                        {/*Tag component*/}
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className='flex-col justify-between'>

                            <div className='h-52px w-105px flex-col'>
                                
                                {this.header('Price')}
                                <div className='text-28px mb-20px font-avenir-reg text-gold'>
                                    {this.props.price}
                                </div>

                                {this.header('Condition')}
                                <div className='text-14px mb-20px font-avenir-reg text-gray-500'>
                                    {this.props.cond}
                                </div>

                                {this.header('Location')}
                                <div className='text-14px mb-20px font-avenir-reg text-gray-500'>
                                    {this.props.loc}
                                </div>

                                {this.header('Description')}
                                <p className="w-400px h-196px text-12px font-avenir-reg text-gray-500 leading-none overflow-hidden">
                                    {this.props.desc}
                                </p>
                            </div>

                        </div>
                        <div className='flex flex-col'>
                            <div className='w-163px h-128px mb-20px border-2'>
                                <img className='h-full m-auto' src='https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'></img>
                                {/* Profile Component */}
                            </div>
                            <button className="w-160px h-50px rounded-full bg-blue-400 font-roboto-reg text-18px mb-10px text-white">
                                Contact Seller
                            </button>
                            <button className="w-160px h-50px rounded-full border-blue-400 border bg-white font-roboto-reg text-18px mb-10px text-blue-400">
                                Add to Cart
                            </button>
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
    text: 'Warning: This text will not overflow but will appear cutoff if there are too many words.',
    price: '$' + '999.99',
    cond: 'Great',
    loc: `[icon to be added] Westwood`,
    desc: 'Warning: This text will not overflow but will be truncated and appear cut off if there are too many words.'
};

export default ItemDetails;