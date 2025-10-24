 import { ICredentials } from "./credential.types.ts";

 export interface IUserData {
  title: string;
  credentials: ICredentials;
  successMessage: string;
}