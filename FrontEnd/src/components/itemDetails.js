import React, { useState } from "react";

// TO-DO
// - implement tag component
// - align with backend

// !!! IMPORTANT: Limit the amount of words that can be submitted as an item's name and description. Otherwise the text
// will appear cutoff and may or may not overflow.

// !!! IMPORTANT: For now, images prop is an array that contains URLs to the images. It's probably not what the final implementation should be.
// this is only so I can test out the front end of things

// Template for header (name of item)
// to avoid duplicate code
// Q: Why does Home.js not require the header function to also be imported when ItemDetails uses it?
function header(label) {
  return (
    <h2 className="text-12px text-gray-400 font-roboto-reg mb-3px">{label}</h2>
  );
}

// for testing purposes
//------------------------ -----------------------------------

// (!) .defaultProps is deprecated
ItemDetails.defaultProps = {
  images: [
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png",
    "https://target.scene7.com/is/image/Target/GUEST_de8bdd84-76da-442e-8d80-40f0e86eaefd?wid=488&hei=488&fmt=pjpeg",
    "https://cdn.shopify.com/s/files/1/0054/4371/5170/products/Spongebob_464pin.png?v=1627414161",
    "https://m.media-amazon.com/images/I/81NBnyMyDGL._AC_SL1500_.jpg",
    "https://paisano-online.com/wp-content/uploads/2020/02/File_001-900x733.jpg",
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png",
  ],
  tags: [
    "spongebob",
    "funny",
    "comedy",
    "family",
    "fun",
  ],
  name: "Warning: This text will not overflow but will appear cutoff if there are too many words.",
  price: "$999.99",
  cond: "Great",
  loc: `[icon to be added] Westwood`,
  desc: "Warning: This text will not overflow but will be truncated and appear cut off if there are too many words.",
};

//------------------------------------------------------------

// DOCUMENTATION:
// ItemDetails props are
// name => name of item (string)
// price => price of item (type to be determined)
// cond => condition of the item (string)
// loc => location of item (string)
// desc => description of item (string)
// images => path to the image on a remote database

function ItemDetails(props) {
  // imgState keeps track of which image to show
  // on the big tile
  // default: 0
  // note: expects an array to be passed in as a prop (for now)
  const [imgState, setImgState] = useState(0);
  const totImgs = props.images.length;
  const totTags = props.tags.length;

  // initialization function for tags and images
  function init(what) {
    let out = [];
    let totItems = what === 'tags' ? totTags : totImgs;
    for (let k = 0; k < totItems; k++) {
      if (what === 'tags') {
        out.push(<Tag tag={props.tags[k]} key={k.toString()} id={k} />);
      }
      else {
        out.push(<ImageTile img={props.images[k]} key={k.toString()} id={k} />);
      }
    }
    return out;
  }

  // handles the two buttons being clicked
  function handleClick(e) {
    e.preventDefault();
    if (e.target.id === "contact") {
      /* contact seller function */
    } else if (e.target.id === "watch") {
      /* add to cart function */
    }
  }

  // image tile component
  // img => source of the image file to be rendered
  // id => unique id to set the img state to
  function ImageTile(props) {
    return (
      <button
        onClick={() => setImgState(props.id)}
        className="w-80px h-80px rounded-12px border-blue-400 mr-10px border hover:border-2 hover:shadow-lightBlue hover:shadow-inner overflow-hidden"
      >
        <img
          className="h-full w-auto m-auto"
          src={props.img}
          alt="Oops, something went wrong."
        />
      </button>
    );
  }

  function Tag(props) {
    return (
      <button onClick={() => console.log("WIP")} className='hover:bg-blue-500 w-auto px-9px py-4px mr-10px bg-blue-400 text-gray-100 font-avenir-med text-10px rounded-8px'>
        {props.tag}
      </button>
    )
  }

  return (
    <div className="w-1354px h-682px bg-white pt-52px pr-25px pl-51px flex flex-row justify-between rounded-25px drop-shadow-md">
      <div className="flex-col">
        <img
          src={props.images[imgState]}
          alt="Oops, something went wrong."
          className="w-600px h-500px border-gray-100 border-2 mb-15px overflow-hidden"
        />
        {/* Initialize the tiles*/}
        <div className="overflow-hidden flex justify-center w-600px">{init('imgTiles')}</div>
      </div>

      <div className="flex-col">
        <h1 className="w-638px h-81px text-32px font-roboto-reg leading-none break-words overflow-hidden">
          {props.name}
        </h1>
        <div className="h-20px m-w-638px mb-20px">{init('tags')}</div>

        <div className="flex flex-row justify-between">
          <div className="flex-col justify-between">
            <div className="h-52px w-105px flex-col">
              {header("Price")}
              <div className="text-28px mb-20px font-avenir-reg text-gold">
                {props.price}
              </div>

              {header("Condition")}
              <div className="text-14px mb-20px font-avenir-reg text-gray-500">
                {props.cond}
              </div>

              {header("Location")}
              <div className="text-14px mb-20px font-avenir-reg text-gray-500">
                {props.loc}
              </div>

              {header("Description")}
              <p className="w-400px h-196px text-12px font-avenir-reg text-gray-500 leading-none overflow-hidden">
                {props.desc}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="w-163px h-128px mb-20px border-2">
              {/* Image is just there as a placeholder */}
              <img
                className="h-full m-auto"
                alt="Oops, something went wrong."
                src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
              ></img>
              {/* Profile Component */}
            </div>
            <button
              onClick={handleClick}
              id="contact"
              className="w-160px h-50px rounded-full bg-blue-400 hover:bg-blue-500 font-roboto-reg text-18px mb-10px text-white"
            >
              Contact Seller
            </button>
            <button
              onClick={handleClick}
              id="watch"
              className="w-160px h-50px rounded-full border-blue-400 hover:bg-blue-100 border bg-white font-roboto-reg text-18px mb-10px text-blue-400"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
