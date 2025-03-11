import { Visitor } from "./visitor.model";

const visitorListFromDB = async (query: Record<string, any>): Promise<{ visitors: any[] }> => {

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Start of the next month

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const visitors = Array.from(
        { length: 12 },
        (_, i) => ({
            month: months[i],
            total: 0
        })
    );

    const visitorsAnalytics = await Visitor.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lt: endDate }
            }
        },
        {
            $group: {
                _id: {
                    day: { $dayOfMonth: "$createdAt" }
                },
                total: { $sum: 1 }
            }
        }
    ]);

    // Update visitorsArray with the calculated statistics
    visitorsAnalytics.forEach((stat: any) => {
        const dayIndex = parseInt(stat._id.day) - 1;
        if (dayIndex < visitors.length) {
            visitors[dayIndex].total = stat.total;
        }
    });

    return {
        visitors: visitors as { month: string; total: number; }[]
    };
}

export const VisitorService = { visitorListFromDB }