const express = require("express"); //include express in this app
const cors = require('cors');
const { MongoClient } = require("mongodb");

const app = express(); //create an Express app
const port = process.env.PORT || "8888";

//DB values
const dbUrl = "mongodb+srv://admin:FJW99VW9tmm65QJf@cluster0.wxujdwc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl);

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//allow requests from all servers
app.use(cors({
  origin: "*"
}));

// Get all the project list
app.get("/api/Projects", async (request, response) => {
  let projects = await getprojects();
  let projectListJSON = JSON.stringify(projects);
    response.status(200).send(projectListJSON);
})

// Get details of a projects
app.get("/api/About", async (request, response) => {
  let about = await getAboutDetails();
  let aboutListJSON = JSON.stringify(about);
  response.status(200).send(aboutListJSON);
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});

//MONGODB FUNCTIONS
async function connection() {
  await client.connect();
  db = client.db("Portfolio"); //if you have a default db in the connection, you can leave this blank
  return db;
}

async function getprojects(){
  db = await connection();
  let results = db.collection("Projects").find({});
  let res = await results.toArray();
  
  console.log('Hwllo')
  console.log(res);
  return res;
}

async function getAboutDetails(){
  db = await connection();
  const result = await db.collection("About").find({});
  let res = await result.toArray();
  return res;
}

