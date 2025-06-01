import { User } from "@prisma/client";

export type ProfileDTO = {
  fullName: User["fullName"];
  email: User["email"];
  role: User["role"];
};
