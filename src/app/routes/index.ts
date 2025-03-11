import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { InquiryRoutes } from '../modules/inquiry/inquiry.route';
import { ContactRoutes } from '../modules/contact/contact.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BusinessRoutes } from '../modules/business/business.route';
import { VisitorRoutes } from '../modules/visitor/visitor.routes';
import { FaqRoutes } from '../modules/faq/faq.route';
import { RuleRoutes } from '../modules/rule/rule.route';
import { ReviewRoutes } from '../modules/review/review.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/auth", route: AuthRoutes },
    { path: "/inquiry", route: InquiryRoutes },
    { path: "/contact", route: ContactRoutes },
    { path: "/blog", route: BlogRoutes },
    { path: "/business", route: BusinessRoutes },
    { path: "/visitor", route: VisitorRoutes },
    { path: "/faq", route: FaqRoutes },
    { path: "/rule", route: RuleRoutes },
    { path: "/review", route: ReviewRoutes },

]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;