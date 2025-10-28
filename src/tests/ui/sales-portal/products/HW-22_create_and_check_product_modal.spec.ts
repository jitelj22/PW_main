//import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { test, expect } from "fixtures/pages.fixture";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", () => {
  test.beforeEach(async ({ homePage, signInPage, productsListPage, addNewProductPage }) => {
    await signInPage.open();
    await signInPage.emailInput.fill(credentials.username);
    await signInPage.passwordInput.fill(credentials.password);
    await signInPage.loginButton.click();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
  });
  test("Create product and check details in the product modal", async ({ productsListPage, addNewProductPage }) => {
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();

    expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  });
});
