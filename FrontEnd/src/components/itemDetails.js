import React, { useContext, useEffect, useRef } from "react";
import CommentList from "../components/commentList.js"
import CreateComment from "../components/createComment.js"
import { useStateIfMounted } from "use-state-if-mounted"
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';


import UserProfile from "./userProfile.js";
import { AuthContext } from "../context/AuthContext.js";

// IMPORTANT: Limit the amount of words that can be submitted as an item's name and description. Otherwise the text
// will appear cutoff and may or may not overflow.

/* for testing purposes
//------------------------ -----------------------------------
// (!) .defaultProps is deprecated
ItemDetails.defaultProps = {
  images: [
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png",
    "https://target.scene7.com/is/image/Target/GUEST_de8bdd84-76da-442e-8d80-40f0e86eaefd?wid=488&hei=488&fmt=pjpeg",
    "https://cdn.shopify.com/s/files/1/0054/4371/5170/products/Spongebob_464pin.png?v=1627414161",
    "https://m.media-amazon.com/images/I/81NBnyMyDGL._AC_SL1500_.jpg",
    "https://paisano-online.com/wp-content/uploads/2020/02/File_001-900x733.jpg",
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
};*/

// Template for header (name of item)
// to avoid duplicate code
function header(label) {
  return (
    <h2 className="text-14px text-gray-400 font-roboto-reg mb-3px">{label}</h2>
  );
}

// const comments = [
//   {
//     createdTime: "Sun May 24 2020 09:59:56 GMT+0530 (India Standard Time)",
//     commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stanLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Isum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.dard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.Ï",
//     targetUser: "Shawn",
//     author: "bob"
//   },
//   {
//     createdTime: "Sun May 24 2020 09:59:56 GMT+0530 (India Standard Time)",
//     commentBody: "Lorem Ipsumto make a type specimen book. It has survived not only five centuries.Ï",
//     targetUser: "bob",
//     author: "Alex"
//   },
//   {
//     createdTime: "Sun May 24 2020 09:59:56 GMT+0530 (India Standard Time)",
//     commentBody: "Lorem Ipsumto Lorem make a type specimen m Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stanLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Isum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.dard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.Ï",
//     targetUser: "Bob",
//     author: "Shawn"
//   }
// ]

//------------------------------------------------------------

// DOCUMENTATION:
// ItemDetails props are
// name => name of item (string)
// price => price of item (type to be determined)
// cond => condition of the item (string)
// loc => location of item (string)
// desc => description of item (string)
// images => path to the image on a remote database

//------------------------------------------------------------*/
function ItemDetails(props) {
  // imgState keeps track of which image to show
  // on the big tile
  // default: 0
  const { currentUser } = useContext(AuthContext);
  //const user_location = useSelector((state) => state.userInfo.location)
  const myRef = useRef(null)
  const executeScroll = () => {
    myRef.current.scrollIntoView();
  }
  const [loading, setLoading] = useStateIfMounted(true);
  const [name, setName] = useStateIfMounted("");
  const [price, setPrice] = useStateIfMounted(0);
  const [desc, setDesc] = useStateIfMounted("");
  const [images, setImages] = useStateIfMounted([])
  const [imgState, setImgState] = useStateIfMounted(0);
  const [tags, setTags] = useStateIfMounted([])
  const [itemOwner, setItemOwner] = useStateIfMounted("")
  const [itemOwnerId, setItemOwnerId] = useStateIfMounted("")
  const [loc, setLoc] = useStateIfMounted("")
  const [cond, setCond] = useStateIfMounted("")
  const [relatedComments, setRelatedComments] = useStateIfMounted([])
  const [cart, setCart] = useStateIfMounted([])
  const [changeFlag, setChangeFlag] = useStateIfMounted(true)
  const [ownerPhotoURL, setOwnerPhotoURL] = useStateIfMounted("")
  const totTags = tags.length;

  useEffect(() => {
    // Get Real-time Product Info
    const getProduct = () => {
      const unsub = onSnapshot(doc(db, "products", props.id), (doc) => {
        const data = doc.data();
        setName(data.title)
        setDesc(data.description)
        setPrice(data.price)
        setImages(data.images)
        setItemOwner(data.sellerName)
        setItemOwnerId(data.seller)
        setCond(data.condition)
        // setRelatedComments(data.relatedComments)
        setTags(data.categoryTag)
        setLoc(data.location)
        setLoading(false)
      });

      return () => {
        unsub();
      };
    };

    // Get Cart Information of Current User
    const getCart = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setCart(doc.data().cart);
      });

      return () => {
        unsub();
      };
    };

    getProduct();

    // Only call getCart if currentUser and currentUser.uid are available
    if (currentUser && currentUser.uid) {
      getCart();
    }
  }, [changeFlag, currentUser])


  useEffect(() => {
    // Get Seller's Profile by Seller's id
    const getSellerInfo = () => {
      const unsub = onSnapshot(doc(db, "users", itemOwnerId), (doc) => {
        const data = doc.data();
        setOwnerPhotoURL(data.photoURL);
      });

      return () => {
        unsub();
      };
    };

    itemOwner && getSellerInfo();
  }, [itemOwnerId])

  // initialization function for tags and images
  function init(what) {
    let out = [];
    const imgLen = images ? images.length : 0
    let totItems = what === 'tags' ? totTags : imgLen
    for (let k = 0; k < totItems; k++) {
      //console.log(tags)
      if (what === 'tags') {
        //out.push(<Tag tag={tags[k]} key={k.toString()} id={k} />);
      }
      else {
        out.push(<ImageTile img={images[k]} key={k.toString()} id={k} />);
      }
    }
    return out;
  }



  // // handles the two buttons being clicked
  // function handleClick(e) {
  //   e.preventDefault();
  //   if (e.target.id === "contact") {
  //     /* contact seller function */
  //   } else if (e.target.id === "watch") {
  //     /* add to cart function */
  //   }
  // }

  // image tile component
  // img => source of the image file to be rendered
  // id => unique id to set the img state to
  function ImageTile(props) {
    return (
      <button
        onClick={() => setImgState(props.id)}
        className={`w-80px h-84px rounded-12px mr-10px border-2 hover:border-blue-300 hover:shadow-inner overflow-hidden ${props.id === imgState ? "border-blue-400" : "border-transparent"}`}
      >
        <img
          className="h-full w-auto m-auto object-cover"
          src={props.img}
          alt="Oops, currently no image available for this item."
        />
      </button>
    );
  }

  // function Tag(props) {
  //   return 
  //     {/*
  //       <button className='hover:bg-blue-500 w-auto px-9px py-4px mr-10px bg-blue-400 text-gray-100 font-avenir-med text-10px rounded-8px'>
  //       {props.tag}
  //       </button>
  //     */}
  //     <div></div>
  // }


  async function handleAddToCart() {
    // UserServices.addItemToCart(token, props.id).then((res) => {
    //   if (res.status !== 200) {
    //     alert.show(res.data.errors)
    //   }
    //   dispatch(setCartChange())
    //   setChangeFlag(!changeFlag)
    // })
    await updateDoc(doc(db, "users", currentUser.uid), {
      cart: arrayUnion(props.id)
    });
    setChangeFlag(!changeFlag)
  }

  async function handleRemoveFromCart() {
    // UserServices.removeFromCart(token, props.id).then((res) => {
    //   if (res.status !== 200) {
    //     alert.show(res.data.errors)
    //   }
    //   dispatch(setCartChange())
    //   setChangeFlag(!changeFlag)
    // })
    await updateDoc(doc(db, "users", currentUser.uid), {
      cart: arrayRemove(props.id)
    });
    setChangeFlag(!changeFlag)
  }

  //console.log(cart)

  if (loading) {
    return <div />
  } else {
    return (
      <div className="flex flex-col space-y-30px">
        <div className="w-1354px h-max bg-white pt-52px pr-25px pl-51px pb-40px flex flex-row justify-between rounded-25px drop-shadow-md mt-40px">
          <div id="image" className="flex-col">
            <img
              src={images ? images[imgState] : null}
              alt="Oops, currently no image available for this item."
              className="w-600px h-500px rounded-12px border-gray-100 border-2 mb-15px overflow-hidden object-contain" />
            {/* Initialize the tiles*/}
            <div className="overflow-hidden flex justify-center w-600px">{init('imgTiles')}</div>
          </div>

          <div className="flex-col">
            <h1 className="w-638px h-max text-32px leading-none break-words _overflow-y-scroll">
              {name}
            </h1>
            <div className="h-20px m-w-638px mb-20px">{init('tags')}</div>

            <div className="flex flex-row justify-between">
              <div className="flex-col justify-between">
                <div className="h-max w-105px flex-col">
                  {header("Price")}
                  <div className="text-28px mb-20px font-avenir-reg text-gold overflow-y-scroll">
                    ${price}
                  </div>

                  {header("Condition")}
                  <div className="text-14px mb-20px font-avenir-reg text-gray-500 overflow-y-scroll">
                    {cond}
                  </div>

                  {header("Category")}
                  <div className="text-14px mb-20px font-avenir-reg text-gray-500 overflow-y-scroll">
                    {tags[0]}
                  </div>

                  {header("Location")}
                  <div className="text-14px mb-20px font-avenir-reg text-gray-500 overflow-y-scroll">
                    {loc}
                  </div>

                  {header("Description")}
                  <p className="w-450px h-196px text-14px font-avenir-reg text-gray-500 leading-none overflow-y-scroll">
                    {desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center w-160px">
                <div className="mb-20px">
                  <UserProfile username={itemOwner} photoURL={ownerPhotoURL} />
                </div>


                <button
                  onClick={executeScroll}
                  id="contact"
                  className="w-160px h-50px rounded-full bg-blue-400 hover:bg-blue-500 font-roboto-reg text-18px mb-10px text-white"
                >
                  Contact Seller
                </button>
                {/*
                <button
                  onClick={sellerProfile}
                  id="sellerProfile"
                  className="w-160px h-50px rounded-full bg-blue-300 hover:bg-blue-500 font-roboto-reg text-18px mb-10px text-white"
                >
                  Seller Profile
                </button>
                */}
                {

                  cart.includes(props.id) ? <button
                    onClick={handleRemoveFromCart}
                    id="watch"
                    className="w-160px h-50px rounded-full border-red-400 hover:bg-blue-100 border bg-white font-roboto-reg text-18px mb-10px text-red-400"
                  >
                    Remove From Cart
                  </button>
                    :
                    <button
                      onClick={handleAddToCart}
                      id="watch"
                      className="w-160px h-50px rounded-full border-blue-400 hover:bg-blue-100 border bg-white font-roboto-reg text-18px mb-10px text-blue-400"
                    >
                      Add to Watchlist
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
        <CommentList comments={relatedComments} updateState={() => setChangeFlag(!changeFlag)} />
        <div ref={myRef}>
          <CreateComment item_id={props.id} item_owner={itemOwner} updateState={() => setChangeFlag(!changeFlag)} />
        </div>
      </div>
    );
  }
}

export default ItemDetails;
