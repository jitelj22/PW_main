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


test.describe("[Login]", () => {

  const validCredentials: ICredentials = {
    username: "Filipok",
    password: "Qrtyuiop",
  };


  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);
    const pageTitle = page.locator('#loginForm');
    await expect(pageTitle).toHaveText("Login");
  }); 

  test("Login page - valid credentials", async ({ page }) => {
    const usernameInput = page.locator('#userName');
    const passwordInput = page.locator('#password');
    const submitButton = page.locator('#submit');   
    const successLoginMessage = page.locator('#successMessage');
    
    await expect(successLoginMessage).toHaveText(`Logged in!`);
    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await submitButton.click();

  });

});
