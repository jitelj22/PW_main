/** 
 *   Разработайте смоук тест-сьют с тестами на REGISTER на странице 
 * https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно,
      запрещены префиксные/постфиксные пробелы, 
      как и имя состоящее из одних пробелов

      Password: обязательное, от 8 до 20 символов включительно, 
      необходима хотя бы одна буква в верхнем и нижнем регистрах, 
      пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное

 */
import test, { expect } from "@playwright/test";    
interface ICredentials {
  username: string;
  password: string;
}
enum NOTIFICATIONS {
  EMPTY_CREDS = "Please, provide valid data",
  EMPTY_PASSWORD = "Password is required",  
  EMPTY_USERNAME = "Username is required",
  REGISTER_SUCCESS_BACK_TO_LOGIN = "Successfully registered! Please, click Back to return on login page",
}
test.describe("[Registration]", () => { 
    const validCredentials: ICredentials = { 
        username: "Filipok",
        password: "Qrtyuiop",
};

test.beforeEach(async ({ page }) => {   
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);
    const registrationLink = page.locator('#registerOnLogin');
    await registrationLink.click();
    const pageTitle = page.locator('#registerForm');
    await expect(pageTitle).toHaveText("Registration");
  }
);  
    test("Registration page - valid credentials", async ({ page }) => {
        const usernameInput = page.locator('#userNameOnRegister');
        const passwordInput = page.locator('#passwordOnRegister');
        const submitButton = page.locator('#register');
        const successLoginMessage = page.locator('#errorMessageOnRegister');
        const backToLoginButton = page.locator('#backOnRegister');
        const loginPageTitle = page.locator('#loginForm');

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await submitButton.click();
        await expect(successLoginMessage).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS_BACK_TO_LOGIN);
        await backToLoginButton.click();
        await expect(loginPageTitle).toHaveText("Login");

    });

    test("Registration page - empty credentials", async ({ page }) => {
        const submitButton = page.locator('#register');
        const errorMessage = page.locator('#errorMessageOnRegister');
        await submitButton.click();
        await expect(errorMessage).toHaveText(NOTIFICATIONS.EMPTY_CREDS);
    });
    test("Registration page - empty username", async ({ page }) => {   
        const passwordInput = page.locator('#passwordOnRegister');
        const submitButton = page.locator('#register');
        const errorMessage = page.locator('#errorMessageOnRegister');
        await passwordInput.fill(validCredentials.password);
        await submitButton.click();
        await expect(errorMessage).toHaveText(NOTIFICATIONS.EMPTY_USERNAME);
    });
    test("Registration page - empty password", async ({ page }) => {   
        const usernameInput = page.locator('#userNameOnRegister');
        const submitButton = page.locator('#register');
        const errorMessage = page.locator('#errorMessageOnRegister');
        await usernameInput.fill(validCredentials.username);
        await submitButton.click();
        await expect(errorMessage).toHaveText(NOTIFICATIONS.EMPTY_PASSWORD);
    });
    
     
}); 