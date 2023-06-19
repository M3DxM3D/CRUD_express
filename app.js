const express = require("express")
const database = require ("./database")
const app = express()
const moviesHandlers = require("./moviesHandlers")
const usersHandlers = require("./usersHandlers")
const port= process.env.APP_PORT

app.use(express.json())


app.get("/",(req,res) => {
  res.send("coucou")
})

app.get("/movies",moviesHandlers.getMovies)
app.get("/movies/:id",moviesHandlers.getMovie)
app.post("/movies",moviesHandlers.postMovie)
app.put("/movies/:id",moviesHandlers.putMovie)
app.delete("/movies/:id",moviesHandlers.deleteMovie)

app.get("/users",usersHandlers.getUsers)
app.get("/users/:id",usersHandlers.getUser)
app.post("/users",usersHandlers.postUser)
app.put("/users/:id",usersHandlers.putUser)
app.delete("/users/:id",usersHandlers.deleteUser)














app.listen(port, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log(`server is running on port ${port}`)
    }
})