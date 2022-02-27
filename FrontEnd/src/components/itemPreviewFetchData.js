import React from "react";


// function FetchItemData() {
//     let cond = "Great";
//     let loc = "UCLA";
  
//     const [loading, setLoading] = useState(true);
  
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState(0);
//     const [desc, setDesc] = useState("");
//     const [images, setImages] = useState([])
//     const [tags, setTags] = useState([])
//     const [itemOwner, setItemOwner] = useState("")
//     const totTags = tags.length;
  
//     const token = useSelector((state) => state.loginStatus.token)
  
  
//     useEffect(async () => {
//       const res = await ItemServices.getItemDetailsById(props.id, token);
//       const data = res.data
//       console.log(data)
//       setName(data.title)
//       setDesc(data.description)
//       setPrice(data.price)
//       setImages(data.images)
//       setItemOwner(data.owner)
//       setRelatedComments(data.relatedComments)
//       setLoading(false)
//     }, [relatedComments])

//     return (

//     )
// }

