import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { productsSchema } from "./products.schema";

export const getAllProductsSchema = {
  type: "object",
  properties: {
    Products: { type: "array", items: productsSchema },
    ...obligatoryFieldsSchema,
  },
  required: ["Products", ...obligatoryRequredFields],
};
