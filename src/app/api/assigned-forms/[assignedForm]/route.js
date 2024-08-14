import dbConnect from "../../../../utils/db-connection";
import AssignedForm from "../../../models/AssignedForm";
import { NextResponse as res } from "next/server";

export const PUT = async (req, ctx) => {
  // await dbConnect();

  const { assignedForm } = ctx.params;
  const { responses } = await req.json(); // responses, kullanıcı tarafından doldurulan verileri içeren bir dizi olmalıdır

  try {
    const findedAssignedForm = await AssignedForm.findById(assignedForm)
      .populate("assignedTo", "name_surname email")
      .populate("form", "fields title description storageName");

    if (!findedAssignedForm) {
      return res.json({ success: false, message: "Assigned form not found" });
    }

    findedAssignedForm.responses = responses;
    findedAssignedForm.filled = true;
    findedAssignedForm.filledAt = new Date();

    const updatedAssignedForm = await findedAssignedForm.save();

    return res.json({ success: true, data: updatedAssignedForm });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

export const GET = async (req, ctx) => {
  // await dbConnect();

  const { assignedForm } = ctx.params;

  try {
    const findedAssignedForm = await AssignedForm.findById(assignedForm)
      .populate("assignedTo", "name_surname email")
      .populate("form", "fields title description storageName publishDates");

    if (!findedAssignedForm) {
      return res.json({ success: false, message: "Assigned form not found" });
    }

    return res.json({ success: true, data: findedAssignedForm });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
