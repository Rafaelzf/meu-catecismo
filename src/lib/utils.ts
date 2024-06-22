import bcrypt from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(date?: string) {
  if (!date) return "";
  const data = new Date(date);

  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

export function hashUserPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function verifyUserPassword(
  storedPassword: string,
  suppliedPassword: string
) {
  return bcrypt.compareSync(suppliedPassword, storedPassword);
}
