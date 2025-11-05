import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";

export const errorSchema = {
  type: "object",
  properties: {
    ...obligatoryFieldsSchema,
    IsSuccess: { type: "boolean", enum: [false] },
    ErrorMessage: { type: "string" },
    ErrorCode: { type: ["number", "null"] },
  },
  required: [...obligatoryRequredFields, "IsSuccess", "ErrorMessage"],
};
