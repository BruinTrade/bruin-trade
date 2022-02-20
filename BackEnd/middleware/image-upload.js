// import multer from "multer"
// import MulterGridfsStorage from "multer-gridfs-storage"

// const storage = new MulterGridfsStorage({
//     url: process.env.DB,
//     options: {
//         useNewUrlParser: true, useUnifiedTopology: true 
//     },
//     file: (req, res) => {
//         //const types = ["image/png", "image/jpeg"]

//         return {
//             bucketName: "images",
//             filename: file.orginalname

//         }
//     }

// })

// export default multer({storage})