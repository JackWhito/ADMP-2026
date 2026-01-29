export const AuthUserSchema = {
  name: "AuthUser",
  primaryKey: "_id",
  properties: {
    _id: "string",
    email: "string",
    fullName: "string",
    role: "string?",
  },
};
