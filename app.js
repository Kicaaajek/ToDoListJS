const express=require("express");
const bodyParser = require("body-parser");
const sql = require("mysql");
const app=express();
const port=3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ToDoList'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected");
});

app.get('/', (req, res) => {
    let sql = 'CREATE DATABASE ToDoList';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Database created");
    });
    let sql = 'CREATE TABLE tasks(id int AUTO_INCREMENT, ToDo VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created");
    });
  res.render('index', {actualDate: actualDate});
});

app.get('/list',(req,res)=>{
    var items = new Array();
    let sql = 'INSERT INTO persons SET ?';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        items.push(result);
        res.send("Uploaded");
    });
    res.render('list', {actualDate: actualDate, actualDay:actualDay, items:items});
});

app.post('/list',(req,res)=>{
    let post = { ToDo: req.body.item};
    let sql = 'INSERT INTO tasks SET ?';
    let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Uploaded");
    });
  //items.push(toDo);
  
  res.redirect('/list');
});

app.get('/about',(req,res)=>{
  res.render('about');
});

app.listen(port,()=>{
  console.log('Serwer działa na porcie 3000.')
});

let date = new Date();
const options={ year: "numeric",
                month: "long",
                day: "numeric"};
const opt={weekday: "long"};
var actualDate=date.toLocaleDateString(locales="pl-UK", options);
var actualDay = date.toLocaleDateString(locales="pl-UK", opt);
//var items = new Array();
//var workItems = new Array();
//items.push("Umyj naczynia");
//items.push("Zrób zakupy");
//items.push("Zadzwoń do okulisty");


