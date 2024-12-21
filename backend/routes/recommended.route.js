import express from 'express';
import _ from 'lodash';
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

        //1. Tính giá vé trung bình cho ghế của mỗi chuyến đi
        const tripIds = userTickets.map(ticket => ticket.tripId);
        const busTripsCustomer = await BusTrip.find({ _id: { $in: tripIds } }).populate('origin destination');
        const totalPrice = busTripsCustomer.reduce((sum, trip) => sum + trip.price, 0);
        const avgPrice = totalPrice / busTripsCustomer.length;

        //2.  Tập hợp các địa điểm
        const locationIds = new Set(); // Sử dụng Set để loại bỏ trùng lặp
        busTripsCustomer.forEach(trip => {
            locationIds.add(trip.origin._id.toString());
            locationIds.add(trip.destination._id.toString());
        });

        // 3. Độ tương đồng về tiện ích: Lấy ra tiện ích xuất hiện nhiều nhất trong các chuyến đã đặt
        const allAmenities = busTripsCustomer.flatMap(trip => trip.amenity);
        const amenitiesCount = _.countBy(allAmenities);
        const sortedAmenities = Object.entries(amenitiesCount)
            .sort(([, countA], [, countB]) => countB - countA) // Sắp xếp theo số lượng tiện ích xuất hiện nhiều nhất
            .slice(0, 3) // Lấy 3 tiện ích phổ biến nhất
            .map(([amenity]) => amenity);

        // 4. Tìm kiếm các chuyến xe phù hợp và tính toán độ tương đồng
        const allTrips = await BusTrip.find(
            {
                departureTime: { $gt: new Date() },
            }
        )
            .populate({ path: 'bus', populate: { path: 'owner', select: 'branchName' } })
            .populate('origin destination')
            .exec(); // Đảm bảo sử dụng await để có kết quả

        const recommendations = allTrips
            .map(trip => {
                // Độ tương đồng về giá
                const priceSimilarity = 1 - Math.abs(trip.price - avgPrice) / avgPrice;

                // Độ tương đồng về tuyến đường (so sánh origin và destination)
                const routeSimilarity = locationIds.has(trip.origin._id.toString()) && locationIds.has(trip.destination._id.toString()) ? 1 : 0;

                // Độ tương đồng về tiện ích
                const amenitiesSimilarity = trip.amenity.filter(a => sortedAmenities.includes(a)).length / sortedAmenities.length;

                // Tổng hợp độ tương đồng
                const totalSimilarity = (priceSimilarity + routeSimilarity + amenitiesSimilarity) / 3;
                return { trip, similarity: totalSimilarity };
            })
            .filter(({ similarity }) => similarity > 0.5) // Lọc những chuyến có độ tương đồng thấp hơn 0.5
            .sort((a, b) => b.similarity - a.similarity) // Sắp xếp theo độ tương đồng
            .slice(0, 5); // Giới hạn 5 chuyến phù hợp nhất

        res.json({ recommendations: recommendations.map(r => r.trip) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hệ thống lỗi', error: error.message });
    }
});
export default router;
