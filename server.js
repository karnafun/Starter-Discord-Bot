const express = require("express")
const server = express()

server.all("/",(req,res)=>{
  res.send(`bot is running ${new Date().toISOString().split('T')[0]}`)
})


async function keepAlive(){
  server.listen(3000, ()=> {
    console.log("server is ready")
  })
}



module.exports = {
  keepAlive
}