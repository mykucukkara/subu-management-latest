import dbConnect from "../../../../utils/db-connection";

import AssignedForm from "../../../models/AssignedForm";
import Form from "../../../models/Form";

export const GET = async (req) => {
  await dbConnect();

  try {
    const findedStatisticsForms = await Form.find().populate(
      "createdBy",
      "name_surname email"
    );

    return Response.json({ success: true, data: findedStatisticsForms });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
};
