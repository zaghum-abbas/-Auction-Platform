import { compare, genSalt, hash } from "bcrypt";
const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return await hash(password, salt);
};
const comparePassword = async (password, user) => {
  return compare(password, user.password);
};
export { hashPassword, comparePassword };
