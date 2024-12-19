// export default class Constants {
//     static optionsStatusBooking = [
//         { label: 'Chưa xác nhận', value: 1 },
//         { label: 'Đã xác nhận', value: 2 },
//         { label: 'Đã khám', value: 3 },
//         { label: 'BS Đã đánh giá', value: 4 },
//     ];
//     static vietnamProvinces = [
//         { label: 'Hà Nội', value: 1 },
//         { label: 'Hà Giang', value: 2 },
//         { label: 'Cao Bằng', value: 3 },
//         { label: 'Lào Cai', value: 4 },
//         { label: 'Điện Biên', value: 5 },
//         { label: 'Lai Châu', value: 6 },
//         { label: 'Sơn La', value: 7 },
//         { label: 'Yên Bái', value: 8 },
//         { label: 'Tuyên Quang', value: 9 },
//         { label: 'Lạng Sơn', value: 10 },
//         { label: 'Quảng Ninh', value: 11 },
//         { label: 'Hòa Bình', value: 12 },
//         { label: 'Ninh Bình', value: 13 },
//         { label: 'Thái Bình', value: 14 },
//         { label: 'Thanh Hóa', value: 15 },
//         { label: 'Nghệ An', value: 16 },
//         { label: 'Hà Tĩnh', value: 17 },
//         { label: 'Quảng Bình', value: 18 },
//         { label: 'Quảng Trị', value: 19 },
//         { label: 'Thừa Thiên-Huế', value: 20 },
//         { label: 'Đà Nẵng', value: 21 },
//         { label: 'Quảng Nam', value: 22 },
//         { label: 'Quảng Ngãi', value: 23 },
//         { label: 'Bình Định', value: 24 },
//         { label: 'Phú Yên', value: 25 },
//         { label: 'Khánh Hòa', value: 26 },
//         { label: 'Ninh Thuận', value: 27 },
//         { label: 'Bình Thuận', value: 28 },
//         { label: 'Kon Tum', value: 29 },
//         { label: 'Gia Lai', value: 30 },
//         { label: 'Đắk Lắk', value: 31 },
//         { label: 'Đắk Nông', value: 32 },
//         { label: 'Lâm Đồng', value: 33 },
//         { label: 'Bình Phước', value: 34 },
//         { label: 'Tây Ninh', value: 35 },
//         { label: 'Bình Dương', value: 36 },
//         { label: 'Đồng Nai', value: 37 },
//         { label: 'Bà Rịa-Vũng Tàu', value: 38 },
//         { label: 'Hồ Chí Minh', value: 39 },
//         { label: 'Long An', value: 40 },
//         { label: 'Tiền Giang', value: 41 },
//         { label: 'Bến Tre', value: 42 },
//         { label: 'Trà Vinh', value: 43 },
//         { label: 'Vĩnh Long', value: 44 },
//         { label: 'Đồng Tháp', value: 45 },
//         { label: 'An Giang', value: 46 },
//         { label: 'Kiên Giang', value: 47 },
//         { label: 'Cần Thơ', value: 48 },
//         { label: 'Hậu Giang', value: 49 },
//         { label: 'Sóc Trăng', value: 50 },
//         { label: 'Bạc Liêu', value: 51 },
//         { label: 'Cà Mau', value: 52 },
//         { label: 'Tây Ninh', value: 53 },
//         { label: 'Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam', value: 54 },
//         { label: 'Hà Giang', value: 55 },
//         { label: 'Cao Bằng', value: 56 },
//         { label: 'Lào Cai', value: 57 },
//         { label: 'Điện Biên', value: 58 },
//         { label: 'Lai Châu', value: 59 },
//         { label: 'Sơn La', value: 60 },
//         { label: 'Yên Bái', value: 61 },
//         { label: 'Tuyên Quang', value: 62 },
//         { label: 'Lạng Sơn', value: 63 },
//     ];
// }

export const PROVINCES = [
    { label: 'Đà Nẵng', value: '5' },
    { label: 'Sài Gòn', value: '1' },
    { label: 'Hà Nội', value: '2' },
    { label: 'Hải Phòng', value: '3' },
    { label: 'Đà Lạt', value: '4' },
    { label: 'Nha Trang', value: '6' },
    { label: 'Vũng Tàu', value: '7' },
    { label: 'Buôn Ma Thuột', value: '8' },
];
export const BUSES_LIST = [
    {
        id: 1,
        label: 'Xe Giường Nằm 40 giường',
        seats: 40,
        rowsPerLevel: 5, // Số hàng mỗi tầng
        seatsPerRow: 3,
        levels: 2, // Xe 2 tầng
        lastRowSeats: 5,
    },
    {
        id: 2,
        label: 'Xe Giường Nằm 41 giường',
        seats: 41,
        seatsPerRow: 3,
        levels: 2,
        rowsPerLevel: 6,
        lastRowSeats: 5,
    },
    {
        id: 4,
        label: 'Xe Limousine 34 Giường',
        seats: 34,
        rowsPerLevel: 6,
        seatsPerRow: 3,
        levels: 2,
        lastRowSeats: 2,
    },
    {
        id: 5,
        label: 'Xe Limousine 9 Chỗ',
        seats: 9,
        rowsPerLevel: 3,
        seatsPerRow: 3,
        levels: 1,
        lastRowSeats: 0,
    },
    {
        id: 6,
        label: 'Xe Limousine 27 chỗ',
        seats: 27,
        rowsPerLevel: 9,
        seatsPerRow: 3,
        levels: 1,
        lastRowSeats: 0,
    },
    {
        id: 7,
        label: 'Limousine phòng đơn 22 chỗ (WC)',
        seats: 22,
        rowsPerLevel: 5,
        seatsPerRow: 2,
        levels: 2,
        lastRowSeats: 1,
    },
];

export const AMENITIES = [
    // {
    //     id: 'F1',
    //     name: 'Không cần thanh toán trước',
    //     icon: 'fa fa-credit-card text-green-500',
    // },
    {
        id: 'F3',
        name: 'Được chọn chỗ ngồi',
        icon: 'fa fa-chair text-purple-500',
    },
    {
        id: 'F4',
        name: 'Chăn đắp',
        icon: 'fa fa-bed text-yellow-500',
    },
    {
        id: 'F5',
        name: 'Wifi',
        icon: 'fa fa-wifi text-blue-500',
    },
    {
        id: 'F6',
        name: 'Điều hòa',
        icon: 'fa fa-snowflake text-cyan-500',
    },
    {
        id: 'F7',
        name: 'Phục vụ nước miễn phí',
        icon: 'fas  fa-tint text-blue-500',
    },
    {
        id: 'F8',
        name: 'Xuất ăn miễn phí',
        icon: 'fa fa-utensils text-red-500',
    },
    {
        id: 'F9',
        name: 'Nghỉ giữa chuyến',
        icon: 'fa fa-stopwatch text-orange-500',
    },
    {
        id: 'F10',
        name: 'Cho phép mang thú cưng',
        icon: 'fa fa-paw text-brown-500',
    },
    {
        id: 'F11',
        name: 'Búa phá kính',
        icon: 'fa fa-hammer text-gray-500',
    },
];

export const ROLES = Object.freeze({
    ADMIN: 'admin',
    BUS_OWNER: 'busOwner',
    TICKET_CONTROLLER: 'ticketController',
    USER: 'user',
});

export const sidebarItems = [
    {
        id: 'dashboardAll',
        icon: 'fa-th-large',
        label: 'Tổng quan',
        roles: [ROLES.ADMIN],
    },
    {
        id: 'usersAll',
        icon: 'fa-users',
        label: 'Danh sách tài khoản',
        active: true,
        roles: [ROLES.ADMIN],
    },
    {
        id: 'busAll',
        icon: 'fa-bus',
        label: 'Danh sách chuyến xe',
        roles: [ROLES.ADMIN],
    },
    {
        id: 'ticketAll',
        icon: 'fa-tasks',
        label: 'Danh sách vé xe',
        active: true,
        roles: [ROLES.ADMIN],
    },
    {
        id: 'request',
        icon: 'fa-clipboard-list',
        label: 'Đăng ký nhà xe mới',
        roles: [ROLES.ADMIN],
    },
    {
        id: 'dashboard',
        icon: 'fa-th-large',
        label: 'Tổng quan',
        roles: [ROLES.BUS_OWNER],
    },
    {
        id: 'users',
        icon: 'fa-users',
        label: 'Danh sách tài khoản',
        active: true,
        roles: [ROLES.BUS_OWNER],
    },
    {
        id: 'buses',
        icon: 'fa-bus',
        label: 'Danh sách xe',
        roles: [ROLES.BUS_OWNER, ROLES.TICKET_CONTROLLER],
    },
    {
        id: 'bus-trip',
        icon: 'fa-route',
        label: 'Danh sách chuyến xe',
        roles: [ROLES.BUS_OWNER, ROLES.TICKET_CONTROLLER],
    },
    {
        id: 'tickets',
        icon: 'fa-clipboard-list',
        label: 'Danh sách vé xe',
        roles: [ROLES.BUS_OWNER, ROLES.TICKET_CONTROLLER],
    },
    {
        id: 'review',
        icon: 'fa-star',
        label: 'Danh sách Đánh giá',
        roles: [ROLES.ADMIN],
    },
    {
        id: 'profile',
        icon: 'fa-smile',
        label: 'Thông tin tài khoản',
        roles: [ROLES.BUS_OWNER, ROLES.TICKET_CONTROLLER, ROLES.USER],
    },
];

export const GENDER = {
    1: 'Nam',
    2: 'Nữ',
    3: 'Khác',
};

export const STATUS = {
    true: 'Hoạt động',
    false: 'Vô hiệu hóa',
};

export const PAYMENT_METHODS = [
    {
        id: '1',
        label: 'Thanh toán khi lên xe',
        disable: true,
    },
    {
        id: '2',
        label: 'Thanh toán qua ví cá nhân',
        disable: false,
    },
    {
        id: '3',
        label: 'Thanh toán qua ví Momo',
        disable: true,
    },
];
export const BusTripStatusConstant = Object.freeze({
    SCHEDULED: 'Scheduled',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
});

export const WEEKDAYS = [
    'Chủ nhật ',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
];
export const TICKET_STATUS = [
    {
        value: 1,
        label: 'Đã thanh toán',
        color: 'success',
    },
    {
        value: 2,
        label: 'Đã huỷ vé',
        color: 'danger',
    },
    {
        value: 3,
        label: 'Đã hoàn thành',
        color: 'success',
    },
    {
        value: 4,
        label: 'Đã đánh giá',
        color: 'success',
    },
];

export const bgRamdom = [
    'bg-purple-700',
    'bg-red-dark',
    'bg-blue-600',
    'bg-yellow-600',
    'bg-teal-700',
    'bg-green-700',
    'bg-pink-600',
    'bg-orange-600',
    'bg-indigo-600',
]
export const SORT_TYPE = [
    { id: 'S2', label: 'Giờ đi sớm nhất' },
    { id: 'S3', label: 'Giờ đi muộn nhất' },
    { id: 'S4', label: 'Giá tăng dần' },
    { id: 'S5', label: 'Giá giảm dần' },
];
