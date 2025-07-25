export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 * 20, //20 minutes
    sameSite: 'Strict', // Adjust based on your requirements
}