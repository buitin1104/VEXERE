import express from 'express';
import mongoose from 'mongoose';
import BusTrip from '../models/busTrip.schema.js';
import Ticket from '../models/ticket.schema.js';

const router = express.Router();
router.get('/month', async (req, res) => {
    try {
        const { branchId } = req.query;
        const currentDate = new Date(req.query.date || Date.now());
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const objectIdBranchId = new mongoose.Types.ObjectId(branchId);
        const resultCountBus = await Ticket.aggregate([
            {
                $lookup: {
                    from: "bustrips", // Tên collection BusTrip
                    localField: "tripId",
                    foreignField: "_id",
                    as: "busTripInfo",
                },
            },
            {
                $lookup: {
                    from: "buses", // Tên collection Bus
                    localField: "busTripInfo.bus",
                    foreignField: "_id",
                    as: "busInfo",
                },
            },
            {
                $match: {
                    "busInfo.owner": objectIdBranchId, // Lọc theo branchId
                    createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }, // Lọc theo tháng
                },
            },
            {
                $group: {
                    _id: null,
                    tripCount: { $sum: 1 }, // Đếm số lượng chuyến
                },
            },
        ]);

        const [tickets, bustrips, totalMoney] = await Promise.all([
            Ticket.countDocuments({
                ...(branchId && { branchId }),
                createdAt: {
                    $gte: firstDayOfMonth,
                    $lte: lastDayOfMonth
                }
            }),
            BusTrip.countDocuments({
                $or: [
                    {
                        departureTime: {
                            $gte: firstDayOfMonth,
                            $lte: lastDayOfMonth
                        }
                    },
                    {
                        arrivalTime: {
                            $gte: firstDayOfMonth,
                            $lte: lastDayOfMonth
                        }
                    }
                ]
            }),
            Ticket.aggregate([
                {
                    $match: {
                        ...branchId && { branchId: objectIdBranchId },
                        createdAt: {
                            $gte: firstDayOfMonth,
                            $lte: lastDayOfMonth
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalMoney: {
                            $sum: "$price"
                        }
                    }
                }
            ])
        ]);

        res.status(200).json({
            data: {
                tickets,
                busTrips: !branchId ? bustrips : resultCountBus?.[0]?.tripCount || 0,
                totalMoney: totalMoney.length > 0 && totalMoney[0].totalMoney
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error get statics of month', error: error.message });
    }
});
router.get('/year/revenue', async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);

        const data = await Ticket.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDayOfYear,
                        $lte: lastDayOfYear
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalMoney: { $sum: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalMoney: 1
                }
            },
            {
                $sort: {
                    month: 1
                }
            }
        ]);

        const result = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            totalMoney: 0
        }))
            .map(item => {
                const findItem = data.find(element => element.month === item.month);
                if (findItem) {
                    return findItem;
                }

                return item;
            });

        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error get statics of year', error: error.message });
    }
});
router.get('/year/ticket', async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);

        const data = await Ticket.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDayOfYear,
                        $lte: lastDayOfYear
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalTicket: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalTicket: 1
                }
            },
            {
                $sort: {
                    month: 1
                }
            }
        ]);

        const result = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            totalTicket: 0
        }))
            .map(item => {
                const findItem = data.find(element => element.month === item.month);
                if (findItem) {
                    return findItem;
                }

                return item;
            });

        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error get statics of year', error: error.message });
    }
});

// API: Get top bus owners by revenue
router.get("/top-bus-owners", async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const firstDayOfYear = new Date(year, 0, 1);
        const lastDayOfYear = new Date(year, 11, 31);

        const topBranches = await Ticket.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDayOfYear,
                        $lte: lastDayOfYear
                    }
                }
            },
            {
                $group: {
                    _id: "$branchId",
                    totalRevenue: { $sum: "$price" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "branchInfo"
                }
            },
            { $unwind: "$branchInfo" },
            {
                $project: {
                    _id: 0,
                    branchId: "$_id",
                    branchName: "$branchInfo.branchName",
                    totalRevenue: 1
                }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 10 }
        ]);

        return res.status(200).json(topBranches);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

router.get('/popular-routes', async (req, res) => {
    try {
        const popularRoutes = await BusTrip.aggregate([
            {
                $lookup: {
                    from: "locations",
                    localField: "origin",
                    foreignField: "_id",
                    as: "originInfo"
                }
            },
            { $unwind: "$originInfo" },
            {
                $lookup: {
                    from: "locations",
                    localField: "destination",
                    foreignField: "_id",
                    as: "destinationInfo"
                }
            },
            { $unwind: "$destinationInfo" },
            {
                $group: {
                    _id: { origin: "$origin", destination: "$destination" },
                    count: { $sum: 1 },
                    originCity: { $first: "$originInfo.city" },
                    destinationCity: { $first: "$destinationInfo.city" },
                    firstBusTrip: { $first: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "buses",
                    localField: "firstBusTrip.bus",
                    foreignField: "_id",
                    as: "busInfo"
                }
            },
            { $unwind: "$busInfo" },
            {
                $project: {
                    _id: 0,
                    origin: "$originCity",
                    destination: "$destinationCity",
                    count: 1,
                    gallery: "$busInfo.gallery",
                    price: "$firstBusTrip.price"
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        return res.status(200).json(popularRoutes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
export default router;
