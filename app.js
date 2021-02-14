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
  res.render('index', {actualDate: actualDate});
});

app.get('/list', (req, res) => {

    let sql = 'SELECT * FROM tasks';
    var items = new Array();
    db.query(sql, (err, results) => {
        if (err) throw err;

        for (var prop in results) {
            items.push(results[prop].ToDo);
        }
        console.log("Wyniki po ", items);
        res.render('list', { actualDate: actualDate, actualDay: actualDay, items: items });
    });
});

app.post('/list',(req,res)=>{
    let ToDo = req.body.item;
    let sql = 'INSERT INTO tasks SET ?';
    db.query(sql, { ToDo: ToDo } , (err, result) => {
    if (err) throw err;
    console.log(result);
    });
  res.redirect('/list');
});

app.post('/list', (req, res) => {
    req.body.getElementById("list").addEventListener('change', function (e) {
        var toDoo = items[e.target.value];
    });
    let sql = 'DELETE FROM tasks WHERE ToDo = '+mysql.escape(toDoo);
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
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
var actualDay = date.toLocaleDateString(locales = "pl-UK", opt);
