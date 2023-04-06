import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { UserDocument } from '../types/userType';

function generateJwtToken(user: UserDocument): string {
  return jwt.sign(
    {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      deviceId: uuid(),
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: '1h',
    }
  );
}

export default generateJwtToken;
