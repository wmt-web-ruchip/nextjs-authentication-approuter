import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
    try {
        await connect()
        const { username, password, email } = await request.json()

        const user = await UserModel.findOne({ email })
        if (user) {
            return NextResponse.json({
                message: "User already exist."
            }, {
                status: 400
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            email,
            username,
            password: hashPassword
        })
        const saveUser = await newUser.save()
        return NextResponse.json({
            message: "User created successfully",
            success:true,
            saveUser
        }, {
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}