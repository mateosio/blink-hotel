import User from "../model/User.js";

export const logout = async (cookies)=>{
    if (!cookies?.refreshToken) {
        console.log("No hay refreshToken en las cookies");
        throw new Error("No content")
    };
    const refreshToken = cookies.refreshToken;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        throw new Error("User not found")
    };

    // Borro el refreshToken de la base de datos.
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    const result = await foundUser.save();
    console.log(result);
    return result;
}
