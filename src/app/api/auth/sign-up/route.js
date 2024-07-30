import { NextResponse as res } from "next/server";

import dbConnect from "../../../../utils/db-connection";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  await dbConnect();

  const {
    user_type,
    tc_number,
    name_surname,
    email,
    phone,
    institution_registration_number,
    faculty,
    student_number,
    department,
    mission,
    orcid_number,
    yok_researcher_number,
    password,
  } = await req.json();

  // Check if user already exists
  const existUser = await User.findOne({ tc_number });
  if (existUser) {
    return res.json({
      success: false,
      message: "User exists",
      data: null,
    });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  console.log(password);

  // Create new user object
  const user = new User({
    user_type,
    tc_number,
    name_surname,
    email,
    phone,
    institution_registration_number:
      user_type === "academician" ? institution_registration_number : undefined,
    faculty,
    department,
    mission: user_type === "academician" ? mission : undefined,
    student_number: user_type === "graduate" ? student_number : undefined,
    orcid_number: user_type === "academician" ? orcid_number : undefined,
    yok_researcher_number:
      user_type === "academician" ? yok_researcher_number : undefined,
    password: hash,
  });

  // Validate and save the user
  try {
    await user.save();
    return res.json({
      success: true,
      message: "User created",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
