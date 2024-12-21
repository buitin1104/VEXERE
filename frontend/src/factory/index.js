import ApiConstants from '../adapter/ApiConstants';
import ApiOperation from '../adapter/ApiOperation';

export const factories = {
    getStaticsMonth: (data) => {
        return ApiOperation.request({
            url: ApiConstants.STATICS + '/month',
            method: 'GET',
            params: data,
        });
    },
    cancelTicket: (id) => {
        return ApiOperation.request({
            url: ApiConstants.TICKET + '/' + id,
            method: 'PUT',
            data: {
                status: 2
            }
        });
    },
    getStaticsYearRevenue: () => {
        return ApiOperation.request({
            url: ApiConstants.STATICS + '/year/revenue',
            method: 'GET',
        });
    },
    getStaticsYearTopBusOwner: () => {
        return ApiOperation.request({
            url: ApiConstants.STATICS + '/top-bus-owners',
            method: 'GET',
        });
    },
    getStaticsYearTicket: () => {
        return ApiOperation.request({
            url: ApiConstants.STATICS + '/year/ticket',
            method: 'GET',
        });
    },
    getUserInfo: (id) => {
        return ApiOperation.request({
            url: ApiConstants.USERS + '/' + id,
            method: 'GET',
        });
    },
    updateUserInfo: (id, data) => {
        return ApiOperation.request({
            url: ApiConstants.USERS + '/' + id,
            method: 'PATCH',
            data: data,
        });
    },
    getLoginEmail: (email, pass) => {
        return ApiOperation.request({
            url: ApiConstants.AUTH + '/login',
            method: 'POST',
            data: {
                email: email,
                password: pass,
            },
        });
    },
    getSignUpEmail: (metadata) => {
        return ApiOperation.request({
            url: ApiConstants.AUTH + '/sign-up',
            method: 'POST',
            data: metadata,
        });
    },
    updatePassword: (data) => {
        return ApiOperation.request({
            url: ApiConstants.AUTH + '/change-password',
            method: 'POST',
            data,
        });
    },
    getBusTripSearch: (params) => {
        return ApiOperation.request({
            url: ApiConstants.BUS_TRIP,
            method: 'GET',
            params,
        });
    },
    getWalletInfo: (id) => {
        return ApiOperation.request({
            url: ApiConstants.PAYMENT + '/user/' + id,
            method: 'GET',
        });
    },
    getBusReview: (id) => {
        return ApiOperation.request({
            url: ApiConstants.BUSES + '/' + id + '/reviews',
            method: 'GET',
        });
    },
    ///admin
    getRequestHost: () => {
        return ApiOperation.request({
            url: ApiConstants.REQUESTS,
            method: 'GET',
        });
    },
    updatePayment: (data) => {
        return ApiOperation.request({
            url: ApiConstants.PAYMENT,
            method: 'PUT',
            data,
        });
    },
    updateStatusRequest: (id, value) => {
        return ApiOperation.request({
            url: ApiConstants.REQUESTS + '/' + id,
            method: 'PATCH',
            data: {
                isApprove: value === 1,
            },
        });
    },
    updatePinReview: (id, value) => {
        return ApiOperation.request({
            url: ApiConstants.TICKET + '/update-show/' + id,
            method: 'PATCH',
            data: {
                isShow: value,
            },
        });
    },
    getListUser: (params) => {
        return ApiOperation.request({
            url: ApiConstants.USERS,
            method: 'GET',
            params,
        });
    },
    getListBuses: (params) => {
        return ApiOperation.request({
            url: ApiConstants.LIST_BUSES,
            method: 'GET',
            params: params,
        });
    },
    getListTicket: (params) => {
        return ApiOperation.request({
            url: ApiConstants.TICKET,
            method: 'GET',
            params: params,
        });
    },
    getListBusesTrip: (params) => {
        return ApiOperation.request({
            url: ApiConstants.BUS_TRIP + '/admin/trip',
            method: 'GET',
            params: params,
        });
    },
    createNewBus: (data) => {
        return ApiOperation.request({
            url: ApiConstants.BUSES,
            method: 'POST',
            data: data,
        });
    },
    editBus: (data, id) => {
        return ApiOperation.request({
            url: ApiConstants.BUSES + '/' + id,
            method: 'PATCH',
            data: data,
        });
    },
    createReview: (data) => {
        return ApiOperation.request({
            url: ApiConstants.REVIEW + '/' + data.id,
            method: 'POST',
            data: data,
        });
    },
    getTopRouter: () => {
        return ApiOperation.request({
            url: ApiConstants.STATICS + '/popular-routes',
            method: 'GET',
        });
    },
    getRecommend: (data) => {
        return ApiOperation.request({
            url: ApiConstants.RECOMMEND,
            method: 'GET',
            params: data,
        });
    },
    getReviews: (params) => {
        return ApiOperation.request({
            url: ApiConstants.TICKET + '/reviews',
            method: 'GET',
            params,
        });
    },
    addMoneyToWallet: (data) => {
        return ApiOperation.request({
            url: ApiConstants.TICKET,
            method: 'POST',
            data: data,
        });
    },
    createPayment: (data) => {
        return ApiOperation.request({
            url: ApiConstants.PAYMENT + '/create_payment_url',
            method: 'POST',
            data: data,
        });
    },
    createNewBusTrip: (data) => {
        return ApiOperation.request({
            url: ApiConstants.BUS_TRIP,
            method: 'POST',
            data: data,
        });
    },
    editBusTrip: (data, id) => {
        return ApiOperation.request({
            url: ApiConstants.BUS_TRIP + '/' + id,
            method: 'PUT',
            data: data,
        });
    },
    createNewLocation: (data) => {
        return ApiOperation.request({
            url: ApiConstants.LOCATIONS,
            method: 'POST',
            data: data,
        });
    },
    getListLocation: (params) => {
        return ApiOperation.request({
            url: ApiConstants.LOCATIONS,
            method: 'GET',
            params: params,
        });
    },
    // getAccommodations: data => {
    // 	return ApiOperation.request({
    // 		url: ApiConstants.ACCOMMODATIONS,
    // 		method: 'GET',
    // 		params: data,
    // 	})
    // },
    // getDetailAccommodation: id => {
    // 	return ApiOperation.request({
    // 		url: ApiConstants.ACCOMMODATIONS + '/' + id,
    // 		method: 'GET',
    // 	})
    // },
};
