import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export async function POST(request: NextRequest) {
    try {
        await connect()
        const { password, email } = await request.json()

        const user = await UserModel.findOne({ email })
        if (!user) {
            return NextResponse.json({
                message: "User does not exist."
            }, {
                status: 400
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid password"
            }, {
                status: 400
            })
        }

        //create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Successfully.",
            success: true,
        })

        response.cookies.set("nextapprouter", token, { httpOnly: true })

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}