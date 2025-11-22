export const obligatoryFieldsSchema = {
  IsSuccess: { type: "boolean" },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const obligatoryRequredFields = ["IsSuccess", "ErrorMessage"];

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
