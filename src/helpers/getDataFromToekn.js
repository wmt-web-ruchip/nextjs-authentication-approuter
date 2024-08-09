import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("nextapprouter")?.value || "";
        const data = jwt.verify(token, process.env.TOKEN_SECRET || "")
        return data.id
    } catch (error) {
        throw new Error(error)
    }
}