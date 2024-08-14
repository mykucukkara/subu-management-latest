import dbConnect from "../../../utils/db-connection";
import Form from "../../../app/models/Form";
import { NextResponse as res } from "next/server";
import slugify from "slugify";

export const POST = async (req) => {
  await dbConnect();

  const { title, description, fields, createdBy, publishDates } =
    await req.json();

  try {
    const newForm = new Form({
      title,
      description,
      fields,
      createdBy,
      publishDates,
      storageName: slugify(title?.toLowerCase(), "_"),
    });

    const savedForm = await newForm.save();

    return Response.json({ success: true, data: savedForm });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
};

export const GET = async (req) => {
  await dbConnect();

  try {
    const forms = await Form.find()
      .populate("createdBy", "name_surname email")
      .exec();

    return Response.json({ success: true, data: forms });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
};
