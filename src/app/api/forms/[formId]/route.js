import dbConnect from "../../../../utils/db-connection";
import Form from "../../../models/Form";
import { NextResponse as res } from "next/server";

export const PUT = async (req) => {
  await dbConnect();

  const formId = req.nextUrl.pathname.split("/api/forms/")[1];
  const { title, description, fields, publishDates } = await req.json();

  try {
    const form = await Form.findById(formId);

    if (!form) return res.json({ success: false, message: "Form not found" });

    form.title = title || form.title;
    form.description = description || form.description;

    // Mevcut ve yeni alanları karşılaştırarak güncelle
    const existingFields = form.fields;

    const updatedFields = fields.map((newField) => {
      const existingField = existingFields.find(
        (field) => field.label === newField.label
      );

      if (existingField) {
        return {
          ...existingField,
          ...newField,
          _id: existingField._id,
        };
      } else {
        return newField;
      }
    });

    form.fields = updatedFields;
    form.publishDates = publishDates || form.publishDates;
    form.updatedAt = new Date();

    const updatedForm = await form.save();

    return res.json({ success: true, data: updatedForm });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

export const GET = async (req) => {
  await dbConnect();

  const formId = req.nextUrl.pathname.split("/api/forms/")[1];

  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res.json({ success: false, message: "Form not found" });
    }

    return res.json({ success: true, data: form });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
