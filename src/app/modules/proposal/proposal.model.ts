import { Schema, model } from 'mongoose';
import { IProposal, ProposalModel } from './proposal.interface';
import { PROPOSAL } from '../../../enums/proposal';

const proposalSchema = new Schema<IProposal>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(PROPOSAL),
      required: true
    }
  },
  { timestamps: true }
);

export const Proposal = model<IProposal, ProposalModel>('Proposal', proposalSchema);