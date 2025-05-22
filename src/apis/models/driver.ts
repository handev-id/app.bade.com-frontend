import { BaseModel } from "./base";
import { Partner } from "./partner";

export interface Driver extends BaseModel {
  code: string;
  name: string;
  password: string;
  phone?: string | null;
  qrcode?: string | null;
  income: number;
  partner?: Partner | null;
  partnerId?: number | null;
}
