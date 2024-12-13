const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')


const server=express()
server.use(cors())
server.use(bodyParser.json())


mongoose.connect('mongodb+srv://pratiksha:BYa45V77RC02uRmU@recipe.ctle5.mongodb.net/?retryWrites=true&w=majority&appName=recipe',{
    useNewURLParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("BD connected")
}).catch((error)=>{
    console.log("error",error.message)
})

 const userRoutes=require('./routes/api')
 server.use('/api',userRoutes)

server.listen(8055,()=>{
    console.log("server started on 8055 ")
})