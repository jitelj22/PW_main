import test, { expect } from "@playwright/test";

/* Разработать тест со следующими шагами:
   - открыть https://anatoly-karpovich.github.io/demo-login-form/
   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
   - Залогиниться с данными что вы вставили в localStorage
   - Завалидировать успешный логи
   Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/

test.describe("[Login form]", () => {
  test("Login", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";

    const user = {
      username: "Bbadf@gmail.com",
      password: "Fdsdsfw123!@#",
    };

    await page.goto(url);
    await page.evaluate((user) => {
      localStorage.setItem(
        user.username,
        JSON.stringify({ name: user.username, password: user.password })
      );
    }, user);

    await page.reload();
    await page.locator("#userName").fill(user.username);
    await page.locator("#password").fill(user.password);
    await page.locator("#submit").click();
    await expect(page.locator("#successMessage")).toHaveText(
      `Hello, ${user.username}!`
    );
  });
});