import dbConnect from "../../../utils/db-connection";
import AssignedForm from "../../models/AssignedForm";
import Form from "../../models/Form";
import { NextResponse as res } from "next/server";

export const GET = async (req) => {
  // await dbConnect();

  const credentials = req.headers.get("x-user-info");

  try {
    const publishedForms = await Form.find({ published: true }).select("_id");
    const publishedFormIds = publishedForms.map((form) => form._id);

    const findedAssignedForm = await AssignedForm.find({
      assignedTo: JSON.parse(credentials)?.id,
      filled: false,
      form: { $in: publishedFormIds },
    })
      .populate("assignedTo", "name_surname email")
      .populate(
        "form",
        "fields title description storageName publishDates published"
      );

    if (!findedAssignedForm) {
      return res.json({ success: false, message: "Assigned form not found" });
    }

    return res.json({ success: true, data: findedAssignedForm });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
