const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        reuqired:true
    },
    weight:{
        type:Number,
        require:true
    }
})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password'))
    {
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err)
        {
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err)
            {
                return next(err)
            }
            user.password=hash;
            next();
        });

    })
})

userSchema.methods.comparePassword = function(candidatePassword,password){
    
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,password,(err,isMatch)=>{
           if(err)
           {
               return reject(err)
           }
           if(!isMatch){
            return reject(err)
           } 
           resolve(true)
        })
    })
}

mongoose.model('User',userSchema);