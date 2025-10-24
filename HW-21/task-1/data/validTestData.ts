import { IUserData } from "./types/userData.types.ts";
import { NOTIFICATIONS } from "./notification/notifications.ts";

const validTestData: IUserData[] = [
  {
    credentials: { username: "Andrei12345678", password: "Andrei12345678" },
    successMessage: NOTIFICATIONS.SUCESFULL_REGISTER,
    title: "Register with smoke credentials",
  },
  {
    credentials: { username: "Emy", password: "123456Aa" },
    successMessage: NOTIFICATIONS.SUCESFULL_REGISTER,
    title: "Register with min valid credentials",
  },
  {
    credentials: { username: "Andrei12345678 !@#$aaaaaaaaaaaaaaaaaaaaa", password: "123456Aaaaaaaaaaaaaa" },
    successMessage: NOTIFICATIONS.SUCESFULL_REGISTER,
    title: "Register with max valid credentials",
  },
];

export default validTestData;