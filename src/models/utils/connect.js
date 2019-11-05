import mongoose from 'mongoose';

const connectDb = async () => mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


export default connectDb;
