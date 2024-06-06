import User from "../model/User.js";

export const logout = async (cookies)=>{
    if (!cookies?.refreshToken) throw new Error("No content");
    const refreshToken = cookies.refreshToken;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        throw new Error("No content")
    };

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    const result = await foundUser.save();
    console.log(result);
    return result;
}
