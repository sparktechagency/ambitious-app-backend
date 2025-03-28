import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Visitor } from '../visitor/visitor.model';
import { Transaction } from '../transaction/transaction.model';

const createAdminToDB = async (payload: IUser): Promise<IUser> => {
    const createAdmin: any = await User.create(payload);
    if (!createAdmin) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Admin');
    }
    if (createAdmin) {
        await User.findByIdAndUpdate(
        { _id: createAdmin?._id },
        { verified: true },
        { new: true }
        );
    }
    return createAdmin;
};

const deleteAdminFromDB = async (id: any): Promise<IUser | undefined> => {
    const isExistAdmin = await User.findByIdAndDelete(id);
    if (!isExistAdmin) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin');
    }
    return;
};

const getAdminFromDB = async (): Promise<IUser[]> => {
    const admins = await User.find({ role: 'ADMIN' })
        .select('name email profile contact location');
    return admins;
};

const summaryFromDB = async () => {

    const [ totalSeller, totalCustomer, TotalVisitor, TotalRevenue ] = await Promise.all([
        User.countDocuments({ role: 'SELLER' }),
        User.countDocuments({ role: 'CUSTOMER' }),
        Visitor.countDocuments(),
        Transaction.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$price', 0.1] } }
                }
            }
        ])
        
    ]);

    const admins = {
        totalSeller,
        totalCustomer,
        TotalVisitor,
        TotalRevenue: TotalRevenue[0]?.totalRevenue || 0
    };
    return admins;
};

export const AdminService = {
    createAdminToDB,
    deleteAdminFromDB,
    getAdminFromDB,
    summaryFromDB
};
