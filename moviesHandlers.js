const database = require("./database")

const getMovies = (req, res) => {
  const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
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
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovie = (req, res) => {
  const { id } = req.params;

  database
    .query("SELECT * FROM movies WHERE id = ?", [id])
    .then(([movie]) => {
      if (movie) {
        res.status(200).json(movie[0]);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error");
    });
};

const postMovie = (req,res)=>{
  const {title,director,year,color,duration}=req.body

  database
  .query("INSERT INTO movies (title,director,year,color,duration) VALUES (?,?,?,?,?)",
  [title,director,year,color, duration]
  )
  .then(([result])=>{
    if (result.insertId){
        res.location(`/movies/${result.insertId}`).sendStatus(201)
    }else{
        res.sendStatus(404).send("Not Found")
    }
      })
  .catch((error)=>{
    console.error(error);
    res.sendStatus(500).send("error")
  })
}

const putMovie = (req,res)=>{
  const {id}=req.params
  const {title,director,year,color,duration}=req.body
  database
  .query("UPDATE movies SET title=?,director=?,year=?,color=?,duration=? WHERE id=?",
  [title,director,year,color,duration,id]
  )
  .then(([result])=>{
        if (result.affectedRows>0){
        res.sendStatus(204)
    }else{
        res.sendStatus(404).send("Not Found")
    }
      })
  }

const deleteMovie = (req,res)=>{
  const {id}=req.params
  database
  .query("DELETE FROM movies WHERE id=?",
  [id]
  )
  .then(([result])=>{
        if (result.affectedRows>0){
        res.sendStatus(204)
    }else{
        res.sendStatus(404).send("Not Found")
    }
      })
}






module.exports = {
    getMovies,getMovie, postMovie, putMovie, deleteMovie

}