export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: Token;
  data: User;
  message: string;
};

export type AuthUserResponse = {
  data: User;
  message: string;
}

export type FindUserResponse = {
  data: User;
  message: string;
}

type Token = {
  expiresIn: number;
  token: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
