import { Model, Types } from 'mongoose';
import { PROPOSAL } from '../../../enums/proposal';

export type IProposal = {
  _id?: Types.ObjectId;
  customer: Types.ObjectId;
  seller: Types.ObjectId;
  business: Types.ObjectId;
  price: number;
  status: PROPOSAL

};
export type ProposalModel = Model<IProposal>;