import express from "express";
import Bus from "../models/bus.schema.js";
import BusTrip from "../models/busTrip.schema.js";
import Location from "../models/location.schema.js";

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

        const busTrips = await BusTrip.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
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
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const existingBusTrip = await BusTrip.findById(id);
        if (!existingBusTrip) {
            return res.status(404).json({ message: "BusTrip not found" });
        }

        if (updates.bus && updates.bus !== existingBusTrip.bus.toString()) {
            const newBus = await Bus.findById(updates.bus);
            if (!newBus) {
                return res.status(404).json({ message: "New bus not found" });
            }

            const oldBus = await Bus.findById(existingBusTrip.bus);
            if (oldBus) {
                oldBus.trips = oldBus.trips.filter(
                    (tripId) => tripId.toString() !== id,
                );
                await oldBus.save();
            }

            newBus.trips.push(id);
            await newBus.save();
        }

        if (
            updates.departureTime &&
            updates.arrivalTime &&
            new Date(updates.departureTime) >= new Date(updates.arrivalTime)
        ) {
            return res
                .status(400)
                .json({ message: "Departure time must be before arrival time" });
        }

        if (updates.origin) {
            const originExists = await Location.findById(updates.origin);
            if (!originExists) {
                return res.status(404).json({ message: "Origin location not found" });
            }
        }

        if (updates.destination) {
            const destinationExists = await Location.findById(updates.destination);
            if (!destinationExists) {
                return res
                    .status(404)
                    .json({ message: "Destination location not found" });
            }
        }

        const updatedBusTrip = await BusTrip.findByIdAndUpdate(id, updates, {
            new: true,
        })
            .populate("origin", "name city")
            .populate("destination", "name city");

        if (!updatedBusTrip) {
            return res.status(404).json({ message: "BusTrip not found" });
        }

        res.status(200).json(updatedBusTrip);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error updating BusTrip", error: error.message });
    }
});

router.get("/admin/trip", async (req, res) => {
    try {
        const { keyword, ownerId, page = "1", limit = "10" } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        let query = {};
        if (ownerId) {
            query["bus.owner"] = ownerId;
        }
        if (keyword) {
            query["bus.busNumber"] = { $regex: `.*${keyword}.*`, $options: "i" };
        }
        const total = await BusTrip.countDocuments(query);
        const busTrips = await BusTrip.find(query)
            .populate({
                path: "bus",
                match: ownerId ? { owner: ownerId } : {},
            })
            .populate("driverId", "fullName")
            .populate("origin", "name")
            .populate("destination", "name")
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

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
