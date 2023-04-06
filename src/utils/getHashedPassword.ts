import bcrypt from 'bcrypt';

// Generate salt and password hash
async function getHashedPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export default getHashedPassword;
