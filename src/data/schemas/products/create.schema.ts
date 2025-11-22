import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { productsSchema } from "./products.schema";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productsSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["Product", ...obligatoryRequredFields],
};
