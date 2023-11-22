const express = require("express")
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

dotenv.config()


const PORT = process.env.PORT || 5000

app.use(cors({origin:"*"}))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))

app.post('/forward_req',(req,res)=>{
    const {audiomessage,...rest} = req.body
    console.log(rest)
    fetch(req.body.forwardurl,{
        method:'POST',
                headers:{
                   'Accept':'application.json',
                   'Content-Type':'application/json'
        },
        body:JSON.stringify(req.body)
    })
    .then(resp=>{return resp.json()})
    .then(result=>res.send(JSON.stringify(result)))
    

})
app.listen(PORT,console.log(`app is listening on port ${PORT}`))