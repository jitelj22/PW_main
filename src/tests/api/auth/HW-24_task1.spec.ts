import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { loginSchema } from "data/schemas/auth/login.schema";

/*
Написать смоук API тест на логин
  - создать и проверить схему
  - проверить статус
  - проверить наличие токена в хедерах
*/

test.describe("[API] [Sales Portal] [Auth]", () => {
  test("HW-24 Task 1: Verify login with valid credentials", async ({ loginApiService, loginApi }) => {
    const token = await loginApiService.loginAsAdmin();
    const response = await loginApi.login({
      username: credentials.username,
      password: credentials.password,
    });

    // Assert
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
      schema: loginSchema,
    });
    const headers = response.headers;
    const authToken = headers["authorization"]!;
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(headers).toBeTruthy();
  });
});
