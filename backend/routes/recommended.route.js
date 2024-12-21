import express from 'express';
import BusTrip from '../models/busTrip.schema.js';
import Ticket from '../models/ticket.schema.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const { id } = req.query;

        // Lấy lịch sử vé đã đặt của người dùng
        const userTickets = await Ticket.find({ userId: id });

        if (userTickets.length === 0) {
            return res.json({ recommendations: [], message: 'Người dùng chưa có lượt đặt vé nào.' });
        }
        // Tính toán các thông tin từ vé đã đặt
        const branchIds = userTickets.map(ticket => ticket.branchId);

        const avgPrice =
            userTickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0) /
            userTickets.length;
        const recommendedTrips = await BusTrip.find({
            branchId: { $in: branchIds }, // Chi nhánh tương tự
            price: { $gte: avgPrice * 0.8, $lte: avgPrice * 1.2 }, // Giá gần mức trung bình
        })
            .sort({ star: -1 }) // Ưu tiên chuyến duoc danh gia cao
            .limit(5);
        res.json({ recommendations: recommendedTrips });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hệ thống lỗi', error: error.message });
    }
});
export default router;
