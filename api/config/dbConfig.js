import mongoose from "mongoose";

// create a MongoDB connection

const mongoDBConnect = async () => {

    try {

        const connection = await mongoose.connect(process.env.MONGO_STRING);
        console.log(`Mongo DB Connected is Successfully`.bgGreen.bgBlack);
        
    } catch (error) {

        console.log(error);
        
    }

}

// export default mongoDBConnect
export default mongoDBConnect;