import { NextResponse as res } from "next/server";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../utils/db-connection";

export const POST = async (req) => {
  await dbConnect();

  const { tc_number, password } = await req.json();

  try {
    const user = await User.findOne({ tc_number });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    const isCorrectPass = bcrypt.compareSync(password, user.password);

    if (!isCorrectPass) {
      return res.json({
        success: false,
        message: "Username or password incorrect",
        data: null,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        tc_number: user.tc_number,
        email: user.email,
        role: user.role,
      },
      "secretsubutoken",
      {
        expiresIn: 60 * 60 * 24 * 365,
      }
    );

    const { password: userPassword, __v, ...others } = user._doc;

    return res.json({
      success: true,
      message: "Sign-in successful",
      data: {
        ...others,
        token,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
