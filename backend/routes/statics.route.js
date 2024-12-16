import express from 'express';
import Bus from '../models/bus.schema.js';
import BusTrip from '../models/busTrip.schema.js';
import Payment from '../models/payment.schema.js';
import Ticket from '../models/ticket.schema.js';
import User from '../models/user.schema.js';

const router = express.Router();
router.get('/month', async (req, res) => {
  try {
    const currentDate = new Date(req.query.date || Date.now());
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const [tickets, busTrips, totalMoney] = await Promise.all([
      Ticket.countDocuments({
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
        busTrips,
        totalMoney: totalMoney[0].totalMoney
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
    const topBusOwners = await Ticket.aggregate([
      {
        $lookup: {
          from: "buses", // Tên collection của `Bus`
          localField: "bus",
          foreignField: "_id",
          as: "busInfo",
        },
      },
      { $unwind: "$busInfo" }, // Giải nén mảng `busInfo`
      {
        $lookup: {
          from: "users", // Tên collection của `User`
          localField: "busInfo.owner",
          foreignField: "_id",
          as: "ownerInfo",
        },
      },
      { $unwind: "$ownerInfo" }, // Giải nén mảng `ownerInfo`
      {
        $group: {
          _id: "$busInfo.owner", // Nhóm theo `ownerId`
          totalRevenue: { $sum: "$price" }, // Tính tổng doanh thu
          branchName: { $first: "$ownerInfo.branchName" }, // Lấy `branchName`
          fullName: { $first: "$ownerInfo.fullName" }, // Lấy tên đầy đủ
        },
      },
      { $sort: { totalRevenue: -1 } }, // Sắp xếp giảm dần theo doanh thu
      { $limit: 10 }, // Giới hạn số lượng kết quả
    ]);

    return res.status(200).json(topBusOwners);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
