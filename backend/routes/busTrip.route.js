import express from "express";
import moment from "moment";
import { BusTripStatusConstant } from "../constants/busTripStatus.constant.js";
import Bus from "../models/bus.schema.js";
import BusTrip from "../models/busTrip.schema.js";
import Location from "../models/location.schema.js";
import Payment from "../models/payment.schema.js";
import Ticket from "../models/ticket.schema.js";
import User from "../models/user.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            bus,
            driverId,
            status = "Scheduled",
            origin,
            destination,
            departureTime,
            arrivalTime,
            price,
            amenity,
            policy,
            paymentMethods,
        } = req.body;

        if (new Date(departureTime) >= new Date(arrivalTime)) {
            return res.status(400).json({
                message: "Departure time must be before arrival time",
            });
        }

        const existingBus = await Bus.findById(bus);
        if (!existingBus) {
            return res.status(404).json({ message: "Bus not found" });
        }

        const existingOrigin = await Location.findById(origin);
        if (!existingOrigin) {
            return res.status(404).json({ message: "Origin location not found" });
        }

        const existingDestination = await Location.findById(destination);
        if (!existingDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        const duplicateTrip = await BusTrip.findOne({
            bus,
            departureTime: { $lte: arrivalTime },
            arrivalTime: { $gte: departureTime },
        });

        if (duplicateTrip) {
            return res.status(400).json({ message: "Xe đã có chuyến trong thời gian này" });
        }

        const duplicateDriver = await BusTrip.findOne({
            driverId,
            departureTime: { $lte: arrivalTime },
            arrivalTime: { $gte: departureTime },
        });

        if (duplicateDriver) {
            return res.status(400).json({ message: "Tài xế đã có chuyến trong thời gian này" });
        }

        const newBusTrip = new BusTrip({
            bus,
            driverId,
            origin,
            status,
            destination,
            departureTime,
            arrivalTime,
            price,
            amenity,
            policy,
            paymentMethods,
        });

        const savedBusTrip = await newBusTrip.save();
        res.status(201).json(savedBusTrip);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating bus trip", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const {
            fromCity,
            toCity,
            busTripId,
            departureDateTime,
            amenities,
            price,
            sort,
            type,
            page = "1",
            limit = "10",
        } = req.query;

        if (!fromCity || !toCity || !departureDateTime) {
            return res.status(400).json({
                message: "fromCity, toCity, and departureDate are required",
            });
        }

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const originLocations = await Location.find({ city: fromCity.toString() });
        const destinationLocations = await Location.find({ city: toCity.toString() });

        if (!originLocations.length) {
            return res
                .status(404)
                .json({ message: `Origin location with city ${fromCity} not found` });
        }

        if (!destinationLocations.length) {
            return res.status(404).json({
                message: `Destination location with city ${toCity} not found`,
            });
        }

        const amenitiesArray = amenities
            ? amenities.split(",").map((a) => a.trim())
            : [];
        const typeBus = type
            ? type.split(",").map((a) => a.trim())
            : [];
        const priceRange = price
            .split(",")
            .map((price) => parseInt(price.trim(), 10));
        let query = {
            origin: { $in: originLocations.map((location) => location._id) },
            destination: {
                $in: destinationLocations.map((location) => location._id),
            },
        };
        if (busTripId) {
            query._id = busTripId;
        }

        if (amenitiesArray.length > 0) {
            query.amenity = { $all: amenitiesArray };
        }
        if (typeBus.length > 0) {
            const buses = await Bus.find({
                busModel: { $in: typeBus.map((model) => model.toLowerCase()) },
            });

            query.bus = { $in: buses.map((bus) => bus._id) };
        }
        query.departureTime = { $gte: new Date(departureDateTime) };

        if (price) {
            query.price = {
                $gte: priceRange[0],
                $lte: priceRange[1],
            };
        }

        let sortOption = {};
        if (sort === 'S2') {
            sortOption = { departureTime: 1 };
        } else if (sort === 'S3') {
            sortOption = { departureTime: -1 };
        } else if (sort === 'S4') {
            sortOption = { price: 1 };
        } else if (sort === 'S5') {
            sortOption = { price: -1 };
        }

        const busTrips = await BusTrip.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .sort(sortOption)
            .populate('bus')
            .populate('driverId', 'phone')
            .populate("origin", "name city coordinates")
            .populate("destination", "name city coordinates");

        const total = await BusTrip.countDocuments(query);

        const pagination = {
            total,
            pages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
            current: pageNumber,
        };

        res.status(200).json({
            busTrips,
            pagination,
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error fetching bus trips", error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Id không hợp lệ" });
        const existingBusTrip = await BusTrip.findById(id)
        const existingBus = await Bus.findById(existingBusTrip.bus).populate('owner');

        if (!existingBusTrip) {
            return res.status(404).json({ message: "Không tồn tại chuyến xe" });
        }
        const tickets = await Ticket.find({
            tripId: id,
            status: { $ne: 2 },
        });
        const totalPrice = tickets.reduce((acc, ticket) => acc + ticket.price, 0);

        const admin = await User.findOne({ roles: ['admin'] });
        let date = new Date();
        const orderId = moment(date).format('DDHHmmss')
        const newPaymentAdmin = new Payment({
            txnRef: orderId,
            amount: totalPrice * 0.8,
            userId: admin._id,
            status: 1,
            description: 'Thanh toán tiền cho chủ nhà xe ' + existingBus.owner.branchName + ' chuyến xe ' + existingBus.busNumber,
        });
        admin.balance -= totalPrice * 0.8;
        await admin.save();
        await newPaymentAdmin.save();

        const newPaymentBusOwner = new Payment({
            txnRef: "H" + orderId,
            amount: totalPrice * 0.8,
            userId: existingBus.owner._id,
            status: 1,
            description: 'Hệ thống thanh toán cho chuyến xe' + existingBus.busNumber,
        });
        const owner = await User.findById(existingBus.owner._id);
        if (!owner) {
            return res.status(404).json({ message: "Không tồn tại chủ xe" });
        }
        owner.balance += totalPrice * 0.8;
        await owner.save();

        await newPaymentBusOwner.save();

        const updatedBusTrip = await BusTrip.findByIdAndUpdate(id, {
            status: BusTripStatusConstant.COMPLETED,
        }, {
            new: true,
        })
        if (!updatedBusTrip) {
            return res.status(404).json({ message: "Không tồn tại chuyến xe" });
        }
        res.status(200).json(updatedBusTrip);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Lỗi xảy ra khi cập nhật", error: error.message });
    }
});

router.get("/admin/trip", async (req, res) => {
    try {
        const { fromCity, toCity, departureDateTime, ownerId, page = "1", limit = "100" } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        let query = {};
        if (fromCity) {
            const originLocations = await Location.find({ city: fromCity.toString() });
            query.origin = { $in: originLocations.map((location) => location._id) };
        }
        if (toCity) {
            const destinationLocations = await Location.find({ city: toCity.toString() });
            query.destination = {
                $in: destinationLocations.map((location) => location._id),
            };
        }
        if (departureDateTime) {
            query.departureTime = {
                $gte: new Date(departureDateTime),
                $lt: new Date(new Date(departureDateTime).setDate(new Date(departureDateTime).getDate() + 1)),
            };
        }

        if (ownerId) {
            const buses = await Bus.find({ owner: ownerId });
            query.bus = { $in: buses.map((bus) => bus._id) };
        }
        const total = await BusTrip.countDocuments(query);
        const busTrips = await BusTrip.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate("bus")
            .populate("driverId")
            .populate("origin")
            .populate("destination");

        const pagination = {
            total,
            pages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
            current: pageNumber,
        };

        res.status(200).json({ busTrips, pagination });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving bus trips for owner",
            error: error.message,
        });
    }
});

// router.patch("/admin/trip/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;

//         if (!updates) {
//             return res.status(400).json({ message: "No fields to update" });
//         }

//         const busTrip = await BusTrip.findByIdAndUpdate(id, updates, {
//             new: true,
//         })
//         if (!busTrip) {
//             return res.status(404).json({ message: "BusTrip not found" });
//         }
//         res.status(200).json(busTrip);
//     } catch (error) {
//         console.error(error);
//         res
//             .status(500)
//             .json({ message: "Error updating BusTrip info", error: error.message });
//     }
// });
export default router;
