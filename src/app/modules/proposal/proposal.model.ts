import { Schema, model } from 'mongoose';
import { IProposal, ProposalModel } from './proposal.interface'; 

const proposalSchema = new Schema<IProposal, ProposalModel>({
  // Define schema fields here
});

export const Proposal = model<IProposal, ProposalModel>('Proposal', proposalSchema);
