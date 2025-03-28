import { Model, Types } from 'mongoose';

export type IBusiness = {
  _id?: Types.ObjectId;
  category: Types.ObjectId;
  seller: Types.ObjectId;
  name: string;
  description: string;
  logo: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: string;
  ownership: string;
  revenue: number;
  price: number;
  employees: number;
  founded: string;
  image: string[];
  doc: string[];
  status: "Pending" | "Approved" | "Rejected" | "Deleted";
};

export type BusinessModel = Model<IBusiness>;