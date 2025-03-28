import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ContactRoutes } from '../modules/contact/contact.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BusinessRoutes } from '../modules/business/business.route';
import { VisitorRoutes } from '../modules/visitor/visitor.routes';
import { FaqRoutes } from '../modules/faq/faq.route';
import { RuleRoutes } from '../modules/rule/rule.route';
import { ReviewRoutes } from '../modules/review/review.routes';
import { ProposalRoutes } from '../modules/proposal/proposal.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { TransactionRoutes } from '../modules/transaction/transaction.routes';
import { ChatRoutes } from '../modules/chat/chat.routes';
import { MessageRoutes } from '../modules/message/message.routes';
import { NotificationRoutes } from '../modules/notification/notification.routes';
import { AdminRoutes } from '../modules/admin/admin.route';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/contact", route: ContactRoutes },
    { path: "/blog", route: BlogRoutes },
    { path: "/business", route: BusinessRoutes },
    { path: "/visitor", route: VisitorRoutes },
    { path: "/faq", route: FaqRoutes },
    { path: "/rule", route: RuleRoutes },
    { path: "/review", route: ReviewRoutes },
    { path: "/proposal", route: ProposalRoutes },
    { path: "/category", route: CategoryRoutes },
    { path: "/transaction", route: TransactionRoutes },
    { path: "/chat", route: ChatRoutes },
    { path: "/message", route: MessageRoutes },
    { path: "/notification", route: NotificationRoutes },
    { path: "/admin", route: AdminRoutes },

]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;