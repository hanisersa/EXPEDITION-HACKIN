import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    nameAr: { type: String, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema);
export default ServiceCategory;
