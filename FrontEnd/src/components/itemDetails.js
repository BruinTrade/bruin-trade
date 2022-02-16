import React, { useState } from 'react'

// !!!IMPORTANT: Limit the amount of words that can be submitted as an item's name and description. Otherwise the text
// will appear cutoff and may or may not overflow.

// Template for header (name of item)
// to avoid duplicate code
function header(label) {
    return (
        <h2 className='text-12px text-gray-400 font-roboto-reg mb-3px'>{label}</h2>
    );
};

// for testing purposes /////////
ItemDetails.defaultProps = {
    // for testing purposes
    images: {total: 3, images: [
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png',
    'https://static.wikia.nocookie.net/fairlyoddparents/images/d/d7/SpongeBob_stock_art.png/revision/latest?cb=20210119031630&path-prefix=en',
    'https://cdn.shopify.com/s/files/1/0054/4371/5170/products/Spongebob_464pin.png?v=1627414161',
    ]},
    name: 'Warning: This text will not overflow but will appear cutoff if there are too many words.',
    price: '$999.99',
    cond: 'Great',
    loc: `[icon to be added] Westwood`,
    desc: 'Warning: This text will not overflow but will be truncated and appear cut off if there are too many words.',
    imgs: 3,
};

/////////////////////////////////

function ItemDetails(props) {
    const [imgState, setImgState] = useState(0);
    const totImgs = props.imgs

    function handleClick(e) {
        e.preventDefault();
        if (e.target.id === "contact"){
            /* contact the seller function*/
        } 
        else if (e.target.id === 'watch') {
            /* add to cart function */
        }
        else {

        }
    }

    // image state component
    function ImageTile(props) {
        return (
            <button onClick={handleClick} className='w-80px h-80px rounded-12px border-blue-400 mr-10px border'>
            <img src={props.img} alt='Oops, something went wrong.' />
            </button>
        )
    }

    // initialize all images into the tiles
    function init() {
        let out = [];
        for (let k = 0; k < totImgs; k++) {
            out.push(<ImageTile img={props.images.images[k]} key={k} />);
        }
        return (out)
    }

    return (
        <div className='w-1354px h-682px bg-white pt-52px pr-25px pl-51px flex flex-row justify-between rounded-25px drop-shadow-md'>
            <div className='flex-col'>
                <img src={props.images[imgState]} alt='Oops, something went wrong.' className='w-600px h-500px border-gray-100 border-2 mb-15px'/>
                <div className='flex flex-row'>
                    {init()}
                </div>
            </div>
            
            <div className='flex-col'>
                <h1 className='w-638px h-81px text-32px font-roboto-reg leading-none break-words overflow-hidden'>
                    {props.name}
                </h1>
                <div className='h-20px m-w-638px'>
                    {/* Tag components here */}
                </div>

                <div className='flex flex-row justify-between'>
                    <div className='flex-col justify-between'>
                        <div className='h-52px w-105px flex-col'>

                            {header('Price')}
                            <div className='text-28px mb-20px font-avenir-reg text-gold'>
                                {props.price}
                            </div>

                            {header('Condition')}
                            <div className='text-14px mb-20px font-avenir-reg text-gray-500'>
                                {props.cond}
                            </div>

                            {header('Location')}
                            <div className='text-14px mb-20px font-avenir-reg text-gray-500'>
                                {props.loc}
                            </div>

                            {header('Description')}
                            <p className="w-400px h-196px text-12px font-avenir-reg text-gray-500 leading-none overflow-hidden">
                                {props.desc}

                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <div className='w-163px h-128px mb-20px border-2'>
                            {/* Image is just there as a placeholder */}
                            <img className='h-full m-auto' alt='Oops, something went wrong.' src='https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'></img>
                            {/* Profile Component */}
                        </div>
                        <button onClick={handleClick} id='contact' className="w-160px h-50px rounded-full bg-blue-400 font-roboto-reg text-18px mb-10px text-white">
                            Contact Seller
                        </button>
                        <button onClick={handleClick} id='watch' className="w-160px h-50px rounded-full border-blue-400 border bg-white font-roboto-reg text-18px mb-10px text-blue-400">
                            Add to Watchlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;