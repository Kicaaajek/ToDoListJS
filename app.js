const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const port=3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
  res.render('index', {actualDate: actualDate});
});

app.get('/list',(req,res)=>{

  res.render('list', {actualDate: actualDate, actualDay:actualDay, items:items});
});

app.post('/list',(req,res)=>{
  var toDo=req.body.item;
  items.push(toDo);
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
var items = new Array();
var workItems = new Array();
items.push("Umyj naczynia");
items.push("Zrób zakupy");
items.push("Zadzwoń do okulisty");
function addToItemsList(){
  var a=item.value;
  items.push(a);
}
function removeItem(){
  //var x=item.value;
  items.splice(i);
}
