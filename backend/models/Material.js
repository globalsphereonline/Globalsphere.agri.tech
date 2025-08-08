import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, index: true },
    item: { type: String, required: true, index: true },
    unit: { type: String, required: true },
    grade: { type: String },
    purity: { type: String },
    description: { type: String },
    pricePerUnit: { type: Number },
    mediaUrls: [{ type: String }],
  },
  { timestamps: true }
);

materialSchema.index({ item: 'text', description: 'text' });

export const Material = mongoose.model('Material', materialSchema);