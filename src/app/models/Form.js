const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Form Alanı Şeması
const formFieldSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  fieldType: {
    type: String,
    enum: ["text", "textarea", "number", "date", "checkbox", "radio", "select"],
    required: true,
  },
  options: [String],
  required: {
    type: Boolean,
    default: false,
  },
});

// Form Şeması
const formSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  fields: [formFieldSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishDates: {
    start: Date,
    end: Date,
  },
  storageName: String,
});

module.exports = mongoose.models.Form || mongoose.model("Form", formSchema);
