import { BaseModel } from "./base";
import { Driver } from "./driver";

export interface Partner extends BaseModel {
  uuid: string;
  code: string;
  type: "OWNER" | "INDIVIDUAL" | string; // atau enum jika kamu punya enum Type
  name: string;
  password: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  driversCount?: number | null;
  balance: number;
  drivers: Driver[];
}
