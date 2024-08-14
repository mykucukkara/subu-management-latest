import dbConnect from "../../../../../utils/db-connection";

import Form from "../../../../models/Form";
import AssignedForm from "../../../../models/AssignedForm";

export const GET = async (req, ctx) => {
  await dbConnect();
  const { id } = ctx.params;

  try {
    const findedStatisticsForms = await AssignedForm.find({ form: id })
      .populate("assignedTo", "name_surname email")
      .populate({
        path: "form",
        populate: {
          path: "createdBy",
          select: "name_surname email",
        },
      });

    return Response.json({ success: true, data: findedStatisticsForms });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
};
