var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
module.exports ={
  status: false,
  index: function(req,res){
      res.render('index')
    },
  register: function(req,res){
    let first_name= req.body.first_name,last_name=req.body.last_name,password=req.body.password,c_password=req.body.confirm,dob= req.body.birthday,email=req.body.email
    // console.log(first_name,last_name,dob,password,email)
    let confirm_error={message:""}
    if (password!=c_password){
      confirm_error['message']= "Password confirmation doesn't match"
      res.render('index', {title: 'you have errors!', errors: [confirm_error]})
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(password)){
      console.log("password matcher error")
      confirm_error['message']=  "Password failed validation, you must have at least 1 number, uppercase and special character"
      res.render('index', {title: 'you have errors!', errors: [confirm_error]})
    }
    password=bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    let user= new User ({password:password,dob: dob,email: email })
    user.name.first=first_name
    user.name.last=last_name
    user.save(function(err){
      if(err){
        console.log("error name ++=",err)
        let errors;
        // console.log(err.name)
        // console.log(user.errors)
        if( user.errors==undefined&&err.name=="MongoError"){
          errors=[{message: "User already exists"}]
        }else{
          errors=user.errors
        }
          res.render('index', {title: 'you have errors!', errors: errors })
      }
      else {
          User.findOne({email:email},function(err,user){req.session.id=user.id})
          this.status=true
          res.render('show');
      }
    })
  },
  login:function(req,res){
    let password=req.body.password,email=req.body.email
    User.findOne({email:email},function(err,user){
      console.log("USERRRRRRRRR_______",user);
      req.session.id=user.id

      if (err){
        res.render('index', {title: 'you have errors!', errors: user.errors})
      }else if(!user || !bcrypt.compareSync(password, user.password)){
        res.render('index', {title: 'you have errors!', errors: [{message: "Email or password incorrect"}]})
      }
      else{
        res.render('show')
        console.log('success')
      }
      

    })
  },
  }
