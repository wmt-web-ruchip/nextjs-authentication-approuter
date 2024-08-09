import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        response.cookies.set("nextapprouter", "", { httpOnly: true, expires: new Date(0) })
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}