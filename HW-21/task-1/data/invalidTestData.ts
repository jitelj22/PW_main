import { IUserData } from "./types/userData.types.ts";
import { NOTIFICATIONS } from "./notification/notifications.ts";
import validCredentials from "./validTestData.ts";


const invalidTestData: IUserData[] = [

{
   
    credentials: { username: `${validCredentials[0].credentials.username}`, password: "" },
    successMessage: NOTIFICATIONS.PASSWORD_REQUAIRED,
    title: "Password is required",
  
},

{
    credentials: { username: "", password: `${validCredentials[0].credentials.password}` },
    successMessage: NOTIFICATIONS.LOGIN_REQUAIRED,
    title: "Username is required",

},
{
    credentials: { username: "", password: "" },
    successMessage: NOTIFICATIONS.CREDENTIALS_ARE_REQUAIRED,
    title: "Credentials are required",
},
{
    credentials: { username: "ab", password: `${validCredentials[0].credentials.password}` },
    successMessage: NOTIFICATIONS.SHORT_USERNAME,
    title: "Username should contain at least 3 characters",
},

{
    credentials: { username: "a".repeat(41), password: `${validCredentials[0].credentials.password}` },
    successMessage: NOTIFICATIONS.lONG_USERNAME,
    title: "Username should contain less than 40 characters",
},
{
    credentials: { username: ` ${validCredentials[0].credentials.username}`, password: `${validCredentials[0].credentials.password}` },   
    successMessage: NOTIFICATIONS.PREFIX_POSTFIX_SPACES,
    title: "Username has prefix space",
},
{
    credentials: { username: `${validCredentials[0].credentials.username} `, password: `${validCredentials[0].credentials.password}` },
    successMessage: NOTIFICATIONS.PREFIX_POSTFIX_SPACES,
    title: "Username has postfix space",
},
{
    credentials: { username: `     `, password: `${validCredentials[0].credentials.password}` },
    successMessage: NOTIFICATIONS.PLEASE_PROVIDE_VALID_DATA,
    title: "Username is only spaces",
},
{
    credentials: { username: `${validCredentials[0].credentials.username}`, password: "aaaaaaa" },     
    successMessage: NOTIFICATIONS.SHORT_PASSWORD,
    title: "Password is too short",

},
{
    credentials: { username: `${validCredentials[0].credentials.username}`, password: "a".repeat(21) },    
    successMessage: NOTIFICATIONS.SHORT_PASSWORD,
    title: "Password is too long",
},
{
    credentials: { username: `${validCredentials[0].credentials.username}`, password: `AAAAAAAA` },
    successMessage: NOTIFICATIONS.PASSWORD_WITHOUT_LOWERCASE,
    title: "Password without lowercase letter",
},
{
    credentials: { username: `${validCredentials[0].credentials.username}`, password: `aaaaaaaa` },    
    successMessage: NOTIFICATIONS.PASSWORD_WITHOUT_LOWERCASE,
    title: "Password without uppercase letter", 
},
{
    credentials: { username: `${validCredentials[0].credentials.username}`, password: "    " },    
    successMessage: NOTIFICATIONS.PLEASE_PROVIDE_VALID_DATA,
    title: "Password is only spaces",
}

];


export default invalidTestData;


