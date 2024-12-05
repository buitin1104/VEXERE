/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 * @property {string} fullName - User's full name.
 * @property {string} role - User's role in the system. Can be one of 'Admin', 'BusOwner', 'TicketController', 'User'.
 * @property {string} [profilePictureUrl] - URL to the user's profile picture.
 */

/**
 * @typedef {Object} Bus
 * @property {string} id - Unique identifier for the bus.
 * @property {string} busNumber - License plate or bus number.
 * @property {string} busModel - Model of the bus.
 * @property {number} capacity - Maximum number of passengers the bus can hold.
 * @property {string} ownerId - The ID of the bus owner (BusOwner).
 * @property {Array<string>} tripIds - List of trip IDs the bus is assigned to.
 * @property {Array<Comment>} comments - List of user comments and ratings for the trip.
 */

/**
 * @typedef {Object} BusTrip
 * @property {string} id - Unique identifier for the bus trip.
 * @property {string} [assignedToId] - ID of user assigned to manage the trip.
 * @property {string} busId - The bus ID that is assigned to this trip.
 * @property {Location} origin - Starting location of the trip.
 * @property {Location} destination - Destination of the trip.
 * @property {Date} departureTime - Departure time of the trip.
 * @property {Date} arrivalTime - Estimated arrival time of the trip.
 * @property {number} price - Ticket price for the trip.
 * @property {string} status - Status of the trip, can be 'Scheduled', 'Ongoing', 'Completed', or 'Cancelled'.
 * @property {Array<string>} bookedTicketIds - List of booked ticket IDs for the trip.
 */

/**
 * @typedef {Object} Location
 * @property {string} id - Unique identifier for the location.
 * @property {string} name - Name of the location.
 * @property {string} city - Name of city.
 * @property {string} coordinates - Geographic coordinates (latitude, longitude) for the location.
 */

/**
 * @typedef {Object} Comment
 * @property {string} userId - ID of the user who made the comment.
 * @property {string} text - Content of the comment.
 * @property {number} rating - Rating out of 5 stars for the trip.
 * @property {Date} createdAt - The date and time the comment was created.
 */

/**
 * @typedef {Object} Ticket
 * @property {string} id - Unique identifier for the ticket.
 * @property {string} userId - ID of the user who bought the ticket.
 * @property {string} tripId - ID of the bus trip the ticket is associated with.
 * @property {string} seatNumber - The seat number assigned to the ticket.
 * @property {boolean} isApproved - Whether the ticket has been approved by a TicketController.
 * @property {boolean} isCancelled - Whether the ticket has been cancelled.
 * @property {Date} bookingTime - The date and time the ticket was booked.
 * @property {Date} [cancellationTime] - The date and time the ticket was cancelled (if applicable).
 */

/**
 * @typedef {Object} BookingAction
 * @property {string} ticketId - ID of the ticket being affected.
 * @property {string} action - Action type, can be 'Book', 'Approve', 'Cancel'.
 * @property {string} userId - ID of the user performing the action.
 * @property {Date} timestamp - Timestamp when the action was performed.
 */
