export interface User {
  id?: number;
  profile_image: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  sign_in_method: number;
  google_id: string;
}
