import type { LoginInput, LoginResponse, FindUserResponse , AuthUserResponse} from "./types";
import instance from "../api";

export async function login(input: LoginInput) {
  return await instance.post<LoginResponse>("/login", input);
}

export async function googleLogin(payload: any) {
  console.log({payload})
  return await instance.post<LoginResponse>("/login/google", payload);
}

export async function getAuthUser(){
  return await instance.get<AuthUserResponse>("/user");
}

export async function getUserByEmail(payload: {email: string}){
  return await instance.post<FindUserResponse>("/users/find/email", payload);
}
