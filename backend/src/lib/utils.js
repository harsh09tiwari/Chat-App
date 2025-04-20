import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    //  jwt.sign({Payload}, secret, expiry)
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        { expiresIn : process.env.JWT_SECRET_EXPIRY }
    )

    res.cookie("jwt", token, {
        maxAge : 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        httpOnly : true, // The cookie is only accessible by the web server and not by JavaScript running in the browser.  OR   // The cookie is not accessible via JavaScript, which helps to prevent cross-site scripting (XSS) attacks.
        sameSite: "strict", // The cookie is only sent in a first-party context (i.e., not sent along with requests initiated by third-party websites). This helps to prevent cross-site request forgery (CSRF) attacks.
        secure: process.env.NODE_ENV !== "development" // it is for https.  // The cookie is only sent over HTTPS connections. In development, this should be set to true to ensure secure transmission of the cookie.
    });

    return token;
}