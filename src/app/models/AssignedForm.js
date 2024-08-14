const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Kullanıcıya Atanmış Formlar Şeması
const assignedFormSchema = new Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  filledAt: Date,
  // Kullanıcı tarafından doldurulan veriler
  responses: [
    {
      field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form.fields", // Referanslanan form alanı
        required: true,
      },

      value: Schema.Types.Mixed, // Her türlü veri tipini kabul eder
    },
    ,
  ],
});

module.exports =
  mongoose.models.AssignedForm ||
  mongoose.model("AssignedForm", assignedFormSchema);
