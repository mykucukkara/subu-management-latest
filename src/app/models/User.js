const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_type: {
    type: String,
    required: [true, "Lütfen kullanıcı tipini seçiniz."],
    enum: ["academician", "graduate"],
  },
  student_number: {
    type: String,
    required: function () {
      return this.user_type === "graduate";
    },
  },
  tc_number: {
    type: String,
    required: [true, "TC/Y. kimlik no zorunludur"],
    match: [
      /^([1-9])([0-9]{10})$/,
      "Lütfen geçerli bir TC/Y. kimlik no giriniz.",
    ],
    minlength: 11,
    maxlength: 11,
  },
  name_surname: {
    type: String,
    required: [true, "Ad Soyad alanı zorunludur."],
  },
  email: {
    type: String,
    required: [true, "E-posta alanı zorunludur."],
    match: [
      /^[\w.%+-]+@subu\.edu\.tr$/,
      "E-posta adresi @subu.edu.tr uzantılı olmalıdır.",
    ],
  },
  phone: {
    type: String,
    required: [true, "Cep telefonu alanı zorunludur."],
    match: [/^\d{12}$/, "Telefon +90 ile başlamalı ve 10 haneli olmalıdır."],
  },
  institution_registration_number: {
    type: String,
    required: function () {
      return this.user_type === "academician";
    },
  },
  faculty: {
    type: String,
    required: [true, "Fakülte alanı zorunludur."],
  },
  department: {
    type: String,
    required: [true, "Bölüm alanı zorunludur."],
  },
  mission: {
    type: String,
    required: function () {
      return this.user_type === "academician";
    },
  },
  orcid_number: {
    type: String,
    required: function () {
      return this.user_type === "academician";
    },
    match: [
      /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/,
      "Orcid numarası 16 haneli olmalıdır.",
    ],
  },
  yok_researcher_number: {
    type: String,
    required: function () {
      return this.user_type === "academician";
    },
    match: [/^\d{6}$/, "YÖK Araştırmacı no 6 haneli olmalıdır."],
  },
  password: {
    type: String,
    required: [true, "Şifre alanı zorunludur."],
  },
});

// Özel validasyon işlevi
UserSchema.pre("validate", function (next) {
  if (this.user_type === "academician") {
    if (!this.institution_registration_number) {
      this.invalidate(
        "institution_registration_number",
        "Kurum sicil no zorunludur."
      );
    }
    if (!this.mission) {
      this.invalidate("mission", "Görev alanı zorunludur.");
    }
    if (!this.orcid_number) {
      this.invalidate("orcid_number", "Orcid numarası zorunludur.");
    }
    if (!this.yok_researcher_number) {
      this.invalidate(
        "yok_researcher_number",
        "YÖK Araştırmacı no zorunludur."
      );
    }
  } else if (this.user_type === "graduate") {
    if (!this.student_number) {
      this.invalidate("student_number", "Öğrenci numarası alanı zorunludur.");
    }
  }
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
