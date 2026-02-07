import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

const notificationSchema = new mongoose.Schema(
  {
    recipient:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type:        {
      type: String,
      required: true,
      enum: ['service_request', 'request_accepted', 'request_refused', 'service_completed', 'points_received'],
    },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
    message:     { type: String, required: true },
    isRead:      { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

// --- Helper functions ---

export async function createNotification(data) {
  await dbConnect();
  return Notification.create(data);
}

export async function findNotificationsByUser(userId) {
  await dbConnect();
  return Notification.find({ recipient: userId })
    .populate({
      path: 'transaction',
      populate: [
        { path: 'service', select: 'title category points' },
        { path: 'requester', select: 'firstName lastName avatar' },
        { path: 'provider', select: 'firstName lastName avatar' },
      ],
    })
    .sort({ createdAt: -1 });
}

export async function markNotificationRead(id) {
  await dbConnect();
  return Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
}

export async function markAllNotificationsRead(userId) {
  await dbConnect();
  return Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
}

export async function countUnreadNotifications(userId) {
  await dbConnect();
  return Notification.countDocuments({ recipient: userId, isRead: false });
}

export default Notification;
