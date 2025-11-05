import { getAllProductsSchema } from "data/schemas/products/getAll.schema";
import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import _ from "lodash";

/*
Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) 
со следующими шагами:
  - Залогиниться
  - Создать продукт и проверить 201й статус
  - Получить все продукты
  - создать и проверить схему
  - проверить статус
  - проверить, что в массиве тела респонса есть созданный продукт
  - Проверить поля IsSuccess и ErrorMessage
*/

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  //test.afterEach(async ({ productsApiService }) => {
  // await productsApiService.delete(token, id);
  //});

  test("HW-24_task2:Get All Product", async ({ loginApiService, productsApiService, productsApi }) => {
    //TODO: Preconditions
    token = await loginApiService.loginAsAdmin();
    const product = await productsApiService.create(token);
    id = product._id;

    //TODO: Action

    const getAllProductResponse = await productsApi.getAll(token);
    validateResponse(getAllProductResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const foundProduct = getAllProductResponse.body.Products.find((p: any) => p._id === id);
    expect(foundProduct, "Created product should be in products list").toBeTruthy();

    // Проверяем поля IsSuccess и ErrorMessage
    expect(getAllProductResponse.body.IsSuccess).toBe(true);
    expect(getAllProductResponse.body.ErrorMessage).toBeNull();
  });
});
