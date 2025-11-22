import { test, expect } from "fixtures/business.fixture";
import { generateMetricsResponse } from "data/salesPortal/products/generateMetricsResponce";
import numeral from "numeral";

test.describe("[Integration HW-26] [Sales Portal] [Home] Metrics", () => {
  const metricsMock = generateMetricsResponse({
    Metrics: {
      orders: {
        totalOrders: 25,
        totalRevenue: 125,
        averageOrderValue: 500,
        totalCanceledOrders: 3,
      },
      customers: {
        totalNewCustomers: 7,
      },
    },
  });

  const {
    orders: { totalOrders, totalRevenue, averageOrderValue, totalCanceledOrders },
    customers: { totalNewCustomers },
  } = metricsMock.Metrics;

  test.beforeEach(async ({ homePage, mock, loginAsAdmin }) => {
    await mock.homePageMetrics(metricsMock);
    await loginAsAdmin();
    await homePage.waitForOpened();
  });

  test("Orders This Year metric", async ({ homePage }) => {
    await expect(homePage.orderThisYearMetric).toHaveText(totalOrders.toString());
  });

  test("New Customers metric", async ({ homePage }) => {
    await expect(homePage.newCustomerMetric).toHaveText(totalNewCustomers.toString());
  });

  test("Canceled Orders metric", async ({ homePage }) => {
    await expect(homePage.canceledOrdersMetric).toHaveText(totalCanceledOrders.toString());
  });

  test("Total Revenue metric", async ({ homePage }) => {
    const formattedRevenue = "$" + numeral(totalRevenue).format("0.0a");
    await expect(homePage.totalRevenueMetric).toHaveText(formattedRevenue);
  });

  test("Avg Order Value metric", async ({ homePage }) => {
    const formattedAvgValue = "$" + numeral(averageOrderValue).format("0.0a");
    await expect(homePage.avgOrdersValue).toHaveText(formattedAvgValue);
  });
});
