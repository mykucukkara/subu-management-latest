import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/db-connection";
import User from "../../models/User";

export const GET = async (req) => {

  const credentials = req.headers.get("x-user-info");

  const findedUser = await User.findOne({ email: JSON.parse(credentials)?.email });


  return NextResponse.json({
    success: true,
    message: "success",
    data: findedUser,
  });
};
