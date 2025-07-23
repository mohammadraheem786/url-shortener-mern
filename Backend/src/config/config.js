export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 * 5, //5 minutes
    sameSite: 'Strict', // Adjust based on your requirements
}