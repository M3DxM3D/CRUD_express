const database = require("./database")


const getUsers = (req,res)=>{

  database

  .query("select * from users")

  .then(([users])=>{
    if(users.length>0) {
      res.json(users).status(200)
    }else{
      res.status(404).send("not found")
    }
  
  })
  .catch((error)=>{
    res.sendStatus(500).send("error")

  })
}

  const getUser = (req, res) => {
    const { id } = req.params;
  
    database
      .query("SELECT * FROM users WHERE id = ?", [id])
      .then(([users]) => {
        if (users) {
          res.status(200).json(users[0]);
        } else {
          res.status(404).send("Not found");
        }
      })
      .catch((error) => {
        res.status(500).send("Error");
      });
  };
  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then((result) => {
        
        if (result.insertId) {
          res.location(`/users/${result.insertId}`).sendStatus(201);
        } else {
          res.sendStatus(404).send("Not Found");
        }
      })
      .catch((error) => {
        res.sendStatus(500).send("Error");
      });
  };
  
  
  const putUser=(req,res)=>{
    const {id}=req.params
    const {firstname,lastname,email,city,language}=req.body
    database
    .query("UPDATE users SET firstname=?,lastname=?,email=?,city=?,language=? WHERE id=?",
    [firstname,lastname,email,city,language,id]
    )
    .then(([result])=>{
      if (result.insertId){
          res.location(`/users/${result.insertId}`).sendStatus(201)
      }else{
          res.sendStatus(404).send("Not Found")
      }
        })
    .catch((error)=>{
      console.error(error);
      res.sendStatus(500).send("error")
    })
  }
  
  const deleteUser=(req,res)=>{
    const {id}=req.params
    database
    .query("DELETE FROM users WHERE id=?",[id])
    .then(([result])=>{
      if (result.affectedRows>0){
          res.sendStatus(204)
      }else{
          res.sendStatus(404).send("Not Found")
      }
    })
    .catch((error)=>{
      console.error(error);
      res.sendStatus(500).send("error")
    })
  }
  
  
  


module.exports = {
    getUsers,getUser, postUser, putUser, deleteUser

}