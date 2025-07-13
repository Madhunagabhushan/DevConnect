import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true, 
      useFindAndModify: false, 
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
      }
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
export default connectDB;
