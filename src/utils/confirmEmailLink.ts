import { redis } from '../redis';
import { v4 } from 'uuid';

const { FRONT_URL } = process.env;

export const confirmEmailLink = async (userId: string) => {
    const id = v4();
    await redis.set(id, userId, 'ex', 60 * 60 * 15);
    return `${FRONT_URL}/verifyEmail/${id}`;
};