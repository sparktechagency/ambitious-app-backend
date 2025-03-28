import { Visitor } from "./visitor.model";

const visitorListFromDB = async (): Promise<{ visitors: any[] }> => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1); // Start of the current year
    const endDate = new Date(now.getFullYear() + 1, 0, 1); // Start of next year

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const visitors = months.map((month) => ({
        month,
        total: 0
    }));

    const visitorsAnalytics = await Visitor.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lt: endDate } // Get all visitors from the current year
            }
        },
        {
            $group: {
                _id: { month: { $month: "$createdAt" } }, // Group by month (1-12)
                total: { $sum: 1 }
            }
        }
    ]);

    // Update the `visitors` array with actual data
    visitorsAnalytics.forEach((stat: any) => {
        const monthIndex = stat._id.month - 1; // Convert MongoDB month (1-12) to array index (0-11)
        visitors[monthIndex].total = stat.total;
    });

    return { visitors };
};


export const VisitorService = { visitorListFromDB }