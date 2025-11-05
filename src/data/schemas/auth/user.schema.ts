import { USER_ROLES } from "data/salesPortal/products/userRoles";

export const userSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    username: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    roles: { type: "array", items: { type: "string", enum: Object.values(USER_ROLES) } },
    createdOn: { type: "string" },
  },
  required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
  additionalProperties: false,
};
