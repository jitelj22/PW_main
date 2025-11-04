import { test, expect } from "fixtures/pages.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { credentials } from "config/env";

test.describe("[Sales Portal] [HW-23.Delete product]", () => {
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

  test("Task1", async ({ productsListPage, addNewProductPage }) => {
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await productsListPage.closeToastMessage();
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    const actual = await productsListPage.getProductData(productData.name);
    expect(_.omit(actual, ["createdOn"])).toEqual(_.omit(productData, ["notes", "amount"]));

    // 3. Delete Product
    await productsListPage.deleteButton(productData.name).click();
    const { deleteConfirmationModal } = productsListPage;
    await deleteConfirmationModal.waitForOpened();
    await deleteConfirmationModal.clickConfirm();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });
});
