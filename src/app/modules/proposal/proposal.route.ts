import express from 'express';
import { ProposalController } from './proposal.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.CUSTOMER),
        ProposalController.makeProposal
    )
    .get(
        auth(USER_ROLES.SELLER),
        ProposalController.proposals
    )

router.get("/customer-proposal",
    auth(USER_ROLES.CUSTOMER),
    ProposalController.customerProposals
)

router.route('/:id')
    .patch(
        auth(USER_ROLES.SELLER),
        ProposalController.approvedProposal
    )

export const ProposalRoutes = router;
