import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';

const userSchema = new mongoose.Schema(
  {
    firstName:         { type: String, required: true, trim: true },
    lastName:          { type: String, required: true, trim: true },
    email:             { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:          { type: String, required: true, minlength: 8 },
    phone:             { type: String, default: '' },
    location:          { type: String, default: '', enum: ['', 'Gaza City', 'Khan Younis', 'Rafah', 'Deir al-Balah', 'Jabalia', 'Beit Hanoun', 'Beit Lahia', 'Nuseirat', 'Other'] },
    authProvider:      { type: String, default: 'local' },
    avatar:            { type: String, default: '👤' },
    points:            { type: Number, default: 50 },
    rating:            { type: Number, default: 0 },
    completedServices: { type: Number, default: 0 },
    bio:               { type: String, default: '' },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

// --- Helper functions used by API routes ---

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(candidatePassword, hashedPassword) {
  return bcrypt.compare(candidatePassword, hashedPassword);
}

export function safeUser(user) {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : { ...user };
  obj.id = obj._id.toString();
  delete obj.password;
  delete obj.__v;
  return obj;
}

export async function findUser(query) {
  await dbConnect();
  return User.findOne(query);
}

export async function findUserById(id) {
  await dbConnect();
  return User.findById(id);
}

export async function createUser(data) {
  await dbConnect();
  return User.create(data);
}

export async function updateUser(id, updates) {
  await dbConnect();
  return User.findByIdAndUpdate(id, updates, { new: true });
}

export default User;
