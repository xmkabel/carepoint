import jwt from "jsonwebtoken"

const maxage = 60 * 60 * 2;

export const createToken = (id : string, role : string) => {
    return jwt.sign({id,role}, process.env.JWT_SECRET as string, {expiresIn: maxage});
}