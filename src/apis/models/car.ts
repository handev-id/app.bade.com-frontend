import { BaseModel } from "./base";
import { Driver } from "./driver";
import { Partner } from "./partner";

export interface Car extends BaseModel {
  name: string;
  destination: string;
  price: number;
  drivers: Driver[];
  partnerId: number;
  partner: Partner;
}
