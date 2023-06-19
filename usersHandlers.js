const database = require("./database")


const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if (req.query.city) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }
  if (req.query.language) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

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