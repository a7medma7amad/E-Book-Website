var express = require('express');
var path = require('path');
var fs = require('fs');
const { ppid, traceDeprecation } = require('process');
const { match } = require('assert');
var app = express();
var cookieParser = require('cookie-parser');
const { render } = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

var c=fs.readFileSync("users_data.json");
var z=JSON.parse(c);
var e=fs.readFileSync("readlist_data.json");
var readlistarray=JSON.parse(e);
var lastlogin=null;
var d=fs.readFileSync("books_names.json");
var books=JSON.parse(d);

app.get('/',function(req,res){
  res.redirect('login');
})
app.get('/login',function(req,res){
  res.render('login',{er1:""});
})
app.get('/home',function(req,res){
  res.render('home');
});
app.get('/dune',function(req,res){
  res.render('dune',{error:""});
});
app.get('/registration', function(req,res){
  res.render('registration',{er:""});
});
app.get('/novel',function(req,res){
  res.render('novel');
})
app.get('/poetry',function(req,res){
  res.render('poetry');
})
app.get('/fiction',function(req,res){
  res.render('fiction');
})
app.get('/leaves',function(req,res){
  res.render('leaves',{error:""});
})
app.get('/grapes',function(req,res){
  res.render('grapes',{error:""});
})
app.get('/flies',function(req,res){
  res.render('flies',{error:""});
})
app.get('/mockingbird',function(req,res){
  res.render('mockingbird',{error:""});
})
app.get('/sun',function(req,res){
  res.render('sun',{error:""});
})
app.get('/readlist',function(req,res){
  res.render('readlist');
})
app.get('/searchresults',function(req,res){
  res.render('searchresults',{book:[],errorM:""});
})
app.post('/register',function(req,res){
  var x = req.body.username;
  var y = req.body.password;
  var i;
  var f=false;
  if(x == "" || y == ""){
    res.render('registration',{er:"please enter a username"});
  }
  else{
  for(i=0;i<z.length;i++){
    if(z[i].username==x){
     f=true;
     res.render('registration',{er:"this username is already used"});
    }
  };
  if(f==false){
  z.push({username: x, password: y});
  var w = JSON.stringify(z);
  fs.writeFileSync("users_data.json",w);
  res.redirect('login');
}}})
app.post('/login',function(req,res){
  var name=req.body.username;
  var pass=req.body.password;
  var i;
  
  for(i=0;i<z.length;i++){
    if(name==z[i].username && pass==z[i].password){
      res.cookie("usernameCookie",name);
      console.log(req.cookies.usernameCookie);
      res.redirect('/home');
      return;
    }
  }
  res.render('login',{er1:"please enter a valid username and password"});
})
/*app.post('/dune',function(req,res){
  */
app.post('/getMyReadList',function(req,res){
    var myReadList=[];
    if(req.cookies.usernameCookie != null){
      for(i=0;i<readlistarray.length;i++){
        if(readlistarray[i].username==req.cookies.usernameCookie){
          myReadList.push(readlistarray[i].bookName);
        }
      }
    }
    res.render('readlist',{readlist: myReadList});
 

} )




app.post('/search',function(req,res){
  var searchname=req.body.Search;
  var i;
  var matched=[];
  for(i=0;i<books.length;i++){
    var s=(JSON.stringify(books[i]).toString());
    if(s.toLowerCase().includes(searchname.toLowerCase())){
      matched.push(books[i]);
    }
  }
  if(matched.length==0){
    var errorM = "Book not found";
  }

  res.render('searchresults',{book:matched,errorM:errorM});
})
app.post('/dune',function(req,res){
  if(req.cookies.usernameCookie != null){
    var i;
    var flag=false;
    for(i=0;i<readlistarray.length;i++){
      if(readlistarray[i].bookName=="Dune" && readlistarray[i].username==req.cookies.usernameCookie){
        res.render('dune',{error:"this book is already added to your readlist"})
        return;
      }
    }
    readlistarray.push({username:req.cookies.usernameCookie,bookName:"Dune"})
    var b = JSON.stringify(readlistarray);
    fs.writeFileSync("readlist_data.json",b);
    
  }
})
app.post('/flies',function(req,res){
  if(req.cookies.usernameCookie != null){
    var i;
    var flag=false;
    for(i=0;i<readlistarray.length;i++){
      if(readlistarray[i].bookName=="Lord of the Flies" && readlistarray[i].username==req.cookies.usernameCookie){
        res.render('flies',{error:"this book is already added to your readlist"})
        return;
      }
    }
    readlistarray.push({username:req.cookies.usernameCookie,bookName:"Lord of the Flies"})
    var b = JSON.stringify(readlistarray);
    fs.writeFileSync("readlist_data.json",b);
    
  }
})
app.post('/grapes',function(req,res){
  if(req.cookies.usernameCookie != null){
    var i;
    var flag=false;
    for(i=0;i<readlistarray.length;i++){
      if(readlistarray[i].bookName=="The Grapes of Wrath" && readlistarray[i].username==req.cookies.usernameCookie){
        res.render('grapes',{error:"this book is already added to your readlist"})
        return;
      }
    }
    readlistarray.push({username:req.cookies.usernameCookie,bookName:"The Grapes of Wrath"})
    var b = JSON.stringify(readlistarray);
    fs.writeFileSync("readlist_data.json",b);
    
  }
})
app.post('/leaves',function(req,res){
  if(req.cookies.usernameCookie != null){
    var i;
    var flag=false;
    for(i=0;i<readlistarray.length;i++){
      if(readlistarray[i].bookName=="Leaves of Grass" && readlistarray[i].username==req.cookies.usernameCookie){
        res.render('leaves',{error:"this book is already added to your readlist"})
        return;
      }
    }
    readlistarray.push({username:req.cookies.usernameCookie,bookName:"Leaves of Grass"})
    var b = JSON.stringify(readlistarray);
    fs.writeFileSync("readlist_data.json",b);
    
  }
})
app.post('/mockingbird',function(req,res){
  if(req.cookies.usernameCookie != null){
    var i;
    var flag=false;
    for(i=0;i<readlistarray.length;i++){
      if(readlistarray[i].bookName=="To Kill a Mockingbird" && readlistarray[i].username==req.cookies.usernameCookie){
        res.render('mockingbird',{error:"this book is already added to your readlist"})
        return;
      }
    }
    readlistarray.push({username:req.cookies.usernameCookie,bookName:"To Kill a Mockingbird"})
    var b = JSON.stringify(readlistarray);
    fs.writeFileSync("readlist_data.json",b);
    
  }
})
app.post('/sun',function(req,res){
  if(req.cookies.usernameCookie != null){
    var i;
    var flag=false;
    for(i=0;i<readlistarray.length;i++){
      if(readlistarray[i].bookName=="The Sun and Her Flowers" && readlistarray[i].username==req.cookies.usernameCookie){
        res.render('sun',{error:"this book is already added to your readlist"})
        return;
      }
    }
    readlistarray.push({username:req.cookies.usernameCookie,bookName:"The Sun and Her Flowers"})
    var b = JSON.stringify(readlistarray);
    fs.writeFileSync("readlist_data.json",b);
    
  }
})



//app.listen(3000);
if(process.env.PORT){
    app.listen(process.env.PORT,function(){console.log('Server started')});
}
else{
  app.listen(3000,function(){console.log('Server started on port 3000')})
}

