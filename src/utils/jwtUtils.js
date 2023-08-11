import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function createAccessToken(user_id, expiration = '1h') {
    return jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiration });
}

export function createRefreshToken(refresh_uuid, expiration = '30d') {
    return jwt.sign({ refresh_uuid: refresh_uuid }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: expiration });
}

export function verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}