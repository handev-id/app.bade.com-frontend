import { BaseModel } from "./base";
import { Partner } from "./partner";

export interface Driver extends BaseModel {
  uuid: string;
  code: string;
  name: string;
  password: string;
  phone: string;
  qrcode?: string;
  income: number;
  partner: Partner;
  partnerId?: number | null;
}
