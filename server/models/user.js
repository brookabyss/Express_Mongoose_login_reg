var mongoose     = require('mongoose'),
bcrypt = require('bcryptjs');
  Schema    = mongoose.Schema,
  UserSchema    = new mongoose.Schema({
    name:{
        first: {
          type: String,
          required: [true,'First Name is empty'],
          minlength: [4, "First Name needs to be at least 4 characters in length."],
        },
       last: {
         type: String,
         required:[true,'Last name is empty'],
         minlength: [4, "Last Name needs to be at least 4 characters in length."],
      }
  },

  email: {
      type: String,
      unique: [true,"Email or password incorrect"],
      required: [true,'Email is empty'],
      validate: {
       validator: function(value){
         return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(value);
       },
       message: "Invalid email format" },
     },
  password:{
    type: String,
    required:[true,"Password can't be empty"],
    minlength: [8, "Password needs to be at least 8 characters in length."],
    validate: {
     validator: function(value){
       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
     },
     message: "Password failed validation, you must have at least 1 number, uppercase and special character" },
 },
 dob: {
   type: Date,
   required:[true,"Date of birth can't be empty"],
   validate: {
    validator: function(value){
     let current_date= new Date()
     let age=current_date.getFullYear()-value.getFullYear()
      return age >16
    },
    message: "You have to be at least sixteen years of age to register" },
 }
}
,{ timestamps: true } );
UserSchema.pre('save',function(done){
   if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(this.password)){
      console.log("password matcher error")
      user.errors['password_pattern']={message:"Password failed validation, you must have at least 1 number, uppercase and special character"}
      user_erros=user.errors
      res.redirect('/')
      // res.render('index', {title: 'you have errors!', errors: user.errors})
    }
    this.password=bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    done()
})
UserSchema.virtual( 'name.full' ).get( function () {
  return this.name.first + " " + this.name.last;
});

var User= mongoose.model('User', UserSchema);
