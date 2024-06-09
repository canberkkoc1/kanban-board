//! We use this pattern because serverless functions can be invoked multiple times in parallel, and we want to reuse the database connection across invocations.

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

//! Global is a Node.js global object that provides variables that are available anywhere in the code.
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  ('Connected to database')

  return cached.conn;
}