import bcrypt from 'bcrypt';
import { UserDocument } from 'src/types/userType';

async function validatePassword(
  user: UserDocument,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}

export default validatePassword;
