import { NextResponse as res } from "next/server";
import User from "../../../../models/User";
import Form from "../../../../models/Form";
import AssignedForm from "../../../../models/AssignedForm";

export const POST = async (req) => {
  const formId = req.nextUrl.pathname.split("/api/forms/")[1].split("/")[0];

  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res.json({ success: false, message: "Form not found" });
    }

    form.published = true;
    await form.save();

    const userIds = await User.aggregate([
      {
        $match: {
          mission: "Öğretim Üyesi/Elemanı",
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const isFormAssigned = await AssignedForm.findOne({ form: formId });

    if (!isFormAssigned)
      await Promise.all(
        userIds.map(async (userId) => {
          const assignedForm = new AssignedForm({
            form: formId,
            assignedTo: userId,
          });

          return assignedForm.save();
        })
      );

    return res.json({ success: true, message: "Form status published" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
export const PUT = async (req) => {
  const formId = req.nextUrl.pathname.split("/api/forms/")[1].split("/")[0];

  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res.json({ success: false, message: "Form not found" });
    }

    form.published = false;
    await form.save();

    const userIds = await User.aggregate([
      {
        $match: {
          mission: "Öğretim Üyesi/Elemanı",
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    await Promise.all(
      userIds.map(async (userId) => {
        AssignedForm.findByIdAndDelete(userId);
      })
    );

    return res.json({
      success: true,
      message: "Form status unpublished, removed assigned users.",
    });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};
