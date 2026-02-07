import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

const serviceSchema = new mongoose.Schema(
  {
    provider:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:        { type: String, required: true, trim: true },
    description:  { type: String, default: '' },
    category:     { type: String, required: true, enum: ['Healthcare', 'Home Repairs', 'Technology', 'Construction', 'Barber', 'Tailor', 'Mechanic', 'Transport', 'Education'] },
    points:       { type: Number, required: true, min: 5 },
    location:     { type: String, default: '' },
    availability: { type: String, default: 'available', enum: ['available', 'busy', 'offline'] },
    tags:         [{ type: String }],
    isAvailable:  { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// --- Helper functions ---

export async function createService(data) {
  await dbConnect();
  return Service.create(data);
}

export async function findServices(query = {}) {
  await dbConnect();
  return Service.find({ isAvailable: true, ...query })
    .populate('provider', 'firstName lastName avatar rating location')
    .sort({ createdAt: -1 });
}

export async function findServiceById(id) {
  await dbConnect();
  return Service.findById(id)
    .populate('provider', 'firstName lastName avatar rating location phone email');
}

export async function findServicesByProvider(providerId) {
  await dbConnect();
  return Service.find({ provider: providerId }).sort({ createdAt: -1 });
}

export async function updateService(id, updates) {
  await dbConnect();
  return Service.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteService(id) {
  await dbConnect();
  return Service.findByIdAndDelete(id);
}

export default Service;
