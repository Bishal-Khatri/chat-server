import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import jwt from 'jsonwebtoken';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;
  const token = jwt.sign(dataStoredInToken, SECRET_KEY, { expiresIn: expiresIn });
  return {
    expiresIn,
    token: token,
  };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
@Service()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });

    if (findUser) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ tokenData: TokenData; findUser: User }> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });

    if (!findUser) {
      throw new HttpException(409, `This email ${userData.email} was not found`);
    }

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) {
      throw new HttpException(409, 'Password not matching');
    }

    const tokenData = createToken(findUser);
    // const cookie = createCookie(tokenData);

    return { tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
