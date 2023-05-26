import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { db } from '.';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null; //Credentials are invalid
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null; //Credentials are invalid
  }

  const { role, name, _id } = user;
  return {
    _id,
    email: email.toLocaleLowerCase(),
    name,
    role,
  };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });
  if (user) {
    await db.disconnect();
    const { role, name, email, _id } = user;
    return { role, name, email, _id };
  }

  const newUser = new User({
    name: oAuthName,
    email: oAuthEmail,
    password: '@',
    role: 'client',
  });
  await newUser.save();
  await db.disconnect();
  const { role, name, email, _id } = newUser;
  return { role, name, email, _id };
};
