export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string; //No estara en frontend
  role: string;
  createdAt?: string; //No estara en frontend
  updatedAt?: string; //No estara en frontend
}
