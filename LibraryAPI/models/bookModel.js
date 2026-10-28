const mongoose=require('mongoose')
const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    category:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Book=mongoose.model("Book",bookSchema)
module.exports=Book
