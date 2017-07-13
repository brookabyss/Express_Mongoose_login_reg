var mongoose = require('mongoose');
var User = mongoose.model('User');
bcrypt = require('bcryptjs');
var user_errors;
module.exports ={
  // if errors ,send errors
  index: function(req,res){
    req.session.status=false
      res.render('index', {title: 'you have errors!', errors: user_errors})
    },
  show: function(req,res){
    if (req.session.status){
      res.render('show')
    }
    else{
      res.redirect('/')
    }
      
    },
  register: function(req,res){
    let first_name= req.body.first_name,last_name=req.body.last_name,password=req.body.password,c_password=req.body.confirm,dob= req.body.birthday,email=req.body.email
    // console.log(first_name,last_name,dob,password,email)
    var confirm_error=false;
    if (password!=c_password){
      console.log("confirm error")
      confirm_error=true
    }
    let user= new User ({password:password,dob: dob,email: email })
    user.name.first=first_name
    user.name.last=last_name
    user.validate(function(err){
      let errors;
      if(err){
        if (confirm_error){
          user.errors['confirm_error']={message: "Your passwords don't match"}
        }
        user_errors=user.errors
        res.redirect('/')
        // res.render('index',{title: 'You have errors',errors: user.errors})
      }
      else{
        user.save(function(err){
          if (err&&err.name==='MongoError'){
            console.log("Inside register error",err)
            user_errors={email_errors:{message: "Why don't you try a different email?"}}
            res.redirect('/')
            // res.render('index',{title: 'You have errors',errors: {user_errors:{message: "Why don't you try a different email?"}}})
          }
          else{
            req.session.status= true
            req.session.id=user.id
            res.redirect('/show')
          }
        })
      }
       
    })
  },
  login:function(req,res){
    let password=req.body.password,email=req.body.email
    User.findOne({email:email},function(err,user){
  
      if(!user || !bcrypt.compareSync(password, user.password)){
        user_errors=[{message: "Email or password incorrect"}]
        res.redirect('/')
      }
      else{
        req.session.id=user.id
        res.render('show')
      }

    })
  },
  }
