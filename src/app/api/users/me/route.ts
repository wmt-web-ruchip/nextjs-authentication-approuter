import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDataFromToekn";
import UserModel from "@/models/userModel"

export async function GET(request:NextRequest) {
    try{
        const userId = await getDataFromToken(request)
        const user = await UserModel.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message: "User Found successfully.",
            success: true,
            user:user
        })
    }catch(error:any){
        return NextResponse.json({ error: error?.message }, { status: 500 })

    }
}