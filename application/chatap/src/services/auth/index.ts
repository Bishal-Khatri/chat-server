import { type LoginInput, type LoginResponse } from "./types";
import http from "../api";

async function login(input: LoginInput) {
  return await http.post<LoginResponse>("login", input);
}
