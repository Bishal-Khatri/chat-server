import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthService, createToken } from '@services/auth.service';
import axios from 'axios';
import { UserModel } from '@/models/user.model';
import { compare, hash } from 'bcrypt';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { SignInMethod } from '@/constants';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;

      const signUpUserData: User = await this.auth.signup(userData);

      const { tokenData, findUser } = await this.auth.login(userData);

      res.status(200).json({
        token: tokenData,
        data: findUser,
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;

      const { tokenData, findUser } = await this.auth.login(userData);

      res.status(200).json({
        token: tokenData,
        data: findUser,
        message: 'login success',
      });
    } catch (error) {
      next(error);
    }
  };

  public googleLogIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.body.code;

      const payload = {
        code,
        client_id: '198239904766-eijfbnkvcs5ni21o8ecncnt93feeklbv.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code',
      };

      const response = await axios.post('https://oauth2.googleapis.com/token', payload);

      const accessToken = response.data.access_token;

      const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { tokenData, findUser } = await this.auth.googleLogin(userResponse.data);

      res.status(200).json({
        token: tokenData,
        data: findUser,
        message: 'login',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  public authUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;

      res.status(200).json({
        data: userData,
        message: 'authUser',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
