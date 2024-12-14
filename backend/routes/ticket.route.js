import express from 'express';
import Bus from '../models/bus.schema.js';
import BusTrip from '../models/busTrip.schema.js';
import Payment from '../models/payment.schema.js';
import Ticket from '../models/ticket.schema.js';
import User from '../models/user.schema.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {
            userId,
            name,
            email,
            phone,
            bus,
            driverId,
            status = 1,
            tripId,
            seats,
            price,
            paymentMethod,
            // origin,
            // destination,
            // departureTime,
            // arrivalTime,
        } = req.body;

        const existingBus = await Bus.findById(bus);
        if (!existingBus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ message: 'Tài khoản không tồn tại, vui lòng đăng nhập' });
        }
        if (user.balance < seats.length * price) {
            return res.status(400).json({
                message: 'Số dư không đủ, vui lòng nạp thêm tiền vào ví thanh toán',
            });
        }
        user.balance -= seats.length * price;
        await user.save();
        const bookedSeats = await Ticket.find({ tripId, seats: { $in: seats } });
        if (bookedSeats.length > 0) {
            return res.status(400).json({
                message: 'Chỗ ngồi đã được đặt, vui lòng chọn ghế mới',
            });
        }
        await BusTrip.findByIdAndUpdate(tripId, {
            $push: { ticketBooked: { $each: seats } },
        });
        const newPayment = new Payment({
            txnRef: Date.now().toString(),
            amount: seats.length * price,
            userId,
            status: 1,
            description: 'Thanh toán vé xe ' + existingBus.busNumber,
        });

        await newPayment.save();
        const newTicket = new Ticket({
            userId,
            name,
            email,
            phone,
            bus,
            driverId,
            status,
            tripId,
            seats,
            price,
            paymentMethod,
        });

        const saveTrip = await newTicket.save();
        res.status(201).json(saveTrip);
    } catch (error) {
        res.status(500).json({
            message: 'Có lỗi xảy ra khi tạo vé xe vui lòng thử lại',
            error: error.message,
        });
    }
});
router.get('/', async (req, res) => {
    try {
        const { userId, date, status, keyword, page = '1', limit = '10' } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        let query = {};
        if (date) {
            query.createdAt = { $gte: new Date(date) };
        }
        if (userId) {
            query.userId = userId;
        }
        if (status) {
            query.status = status;
        }
        if (keyword) {
            query.$or = [
                { 'user.phone': { $regex: `.*${keyword}.*`, $options: 'i' } },
                { 'user.fullName': { $regex: `.*${keyword}.*`, $options: 'i' } },
            ];
        }

        const tickets = await Ticket.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate('tripId')
            .populate({
                path: 'tripId',
                populate: {
                    path: 'origin',
                    select: 'name city coordinates',
                },
            })
            .populate({
                path: 'tripId',
                populate: {
                    path: 'destination',
                    select: 'name city coordinates',
                },
            })
            .populate('driverId')
            .populate('userId')
            .populate('bus');

        const total = await Ticket.countDocuments(query);

        const pagination = {
            total,
            pages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
            current: pageNumber,
        };

        res.status(200).json({
            tickets,
            pagination,
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Error fetching tickets', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;

        if (!status) {
            return res
                .status(400)
                .json({ message: 'Status and reason are required' });
        }

        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { status, review: reason },
            { new: true },
        );
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Error updating ticket', error: error.message });
    }
});
router.post('/review/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { star, review } = req.body;

        if (!star) {
            return res.status(400).json({ message: 'Vui lòng chọn số sao đánh giá' });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res
                .status(404)
                .json({ message: 'Không tìm thấy thông tin vé xe' });
        }
        ticket.star = star;
        ticket.review = review;
        await ticket.save();

        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Xảy ra lỗi hệ thông', error: error.message });
    }
});
router.get('/reviews', async (req, res) => {
    try {
        const { userId } = req.query;

        if (userId) {
            query.userId = userId;
        }
        const reviews = await Ticket.find(query);

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Error fetching reviews', error: error.message });
    }
});
export default router;
