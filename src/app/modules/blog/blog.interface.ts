import { Model } from 'mongoose';

export type IBlog = {
  title: string;
  content: string;
  image: string;
};

export type BlogModel = Model<IBlog>;