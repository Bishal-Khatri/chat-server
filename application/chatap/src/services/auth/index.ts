import { type LoginInput, type LoginResponse, type User , type AuthUserResponse} from "./types";
import instance from "../api";

export async function login(input: LoginInput) {
  return await instance.post<LoginResponse>("/login", input);
}

export async function getAuthUser(){
  return await instance.get<AuthUserResponse>("/user");
}
