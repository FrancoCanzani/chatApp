import mongoose from 'mongoose';

const DBUri = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DBUri);
}
