const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
//collection name from given database
const college = mongoose.model('teachers',mongoose.Schema({
    name:{
        type:String
    },
      age:{
        type:String
    },
       gender:{
        type:String
    },
       mobile:{
        type:String
    }
}));
//database connection
mongoose.connect('mongodb://127.0.0.1:27017/college').then(()=>console.log('connection successfully'))
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cors());
let port =3000;
//ejs template 
app.set('view engine','ejs');

//route for read data
app.get('/', async (req,res)=>{
     let user = await college.find();
    res.render('index',{user});
})
//route for show single user
app.get('/show/:id', async (req,res)=>{
     let user = await college.findById(req.params.id);
    res.render('show',{user});
})
//route fir delete user
app.get('/delete/:id', async (req,res)=>{
   
     let user = await college.deleteOne({_id: req.params.id});
     res.redirect('/')
})
//route for add user
app.get('/add', async (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
   let details = await college.insertOne(
        {
             name: req.body.name,
            age: req.body.age,
            mobile: req.body.mobile,
            gender: req.body.gender
         }
    );
    res.redirect('/')
});

app.get('/update/:id', async (req, res) => {
     let user = await college.findById(req.params.id);
    res.render('update',{user});
});

app.post('/update/:id', async (req, res) => {
   await college.findByIdAndUpdate(req.params.id,req.body);
     res.redirect('/');
});


app.listen(port);