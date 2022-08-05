import mongoose from "mongoose";

// Create Student Schema
const userSchema = mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    cell:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    age:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    photo:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false 
    },
    status:{
        type:Boolean,
        default:true
    },
    trash:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

// export Model
export default mongoose.model('User',userSchema);

