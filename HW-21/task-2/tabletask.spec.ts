/*
Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables
*/
import { test, expect, Page } from "@playwright/test";
interface TableRow {
  "Last Name": string;
  "First Name": string;
  Email: string;
  Due: string;
  "Web Site": string;
}

export async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
  const table = page.locator("#table2");
  const headers = table.locator("thead th");
  const row = table.locator("tbody tr").filter({ hasText: email });
  const cells = row.locator("td");

  const headerCount = (await headers.count()) - 1;
  const result: Record<string, string> = {};

  for (let i = 0; i < headerCount; i++) {
    const key = (await headers.nth(i).innerText()).trim();
    const value = (await cells.nth(i).innerText()).trim();
    result[key] = value;
  }

  return result;
}

// Основные тесты
test.describe.parallel("[Tables] https://the-internet.herokuapp.com/tables", () => {
  const expectedTable: TableRow[] = [
    {
      "Last Name": "Smith",
      "First Name": "John",
      Email: "jsmith@gmail.com",
      Due: "$50.00",
      "Web Site": "http://www.jsmith.com",
    },
    {
      "Last Name": "Bach",
      "First Name": "Frank",
      Email: "fbach@yahoo.com",
      Due: "$51.00",
      "Web Site": "http://www.frank.com",
    },
    {
      "Last Name": "Doe",
      "First Name": "Jason",
      Email: "jdoe@hotmail.com",
      Due: "$100.00",
      "Web Site": "http://www.jdoe.com",
    },
    {
      "Last Name": "Conway",
      "First Name": "Tim",
      Email: "tconway@earthlink.net",
      Due: "$50.00",
      "Web Site": "http://www.timconway.com",
    },
  ];

  test.beforeEach(async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/tables";
    await test.step("Открываем страницу с таблицами", async () => {
      await page.goto(url);
      await expect(page).toHaveURL(url);
      await expect(page.locator("h3")).toHaveText("Data Tables");
    });
  });

  for (const expectedRow of expectedTable) {
    test(`Проверяем строку таблицы для ${expectedRow.Email}`, async ({ page }) => {
      const actualRow = await getTableRow(page, expectedRow.Email);
      expect(actualRow).toEqual(expectedRow);
    });
  }
});
