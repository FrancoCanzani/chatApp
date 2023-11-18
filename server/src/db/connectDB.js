import mongoose from 'mongoose';
import 'dotenv/config';

const DBUri = process.env.MONGO_URI;

connectDB().catch((err) => console.log(err));

export async function connectDB() {
  await mongoose.connect(DBUri);
}
