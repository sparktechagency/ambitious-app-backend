import express from 'express';
import { ProposalController } from './proposal.controller';

const router = express.Router();

router.get('/', ProposalController); 

export const ProposalRoutes = router;
