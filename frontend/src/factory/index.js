import ApiConstants from '../adapter/ApiConstants';
import ApiOperation from '../adapter/ApiOperation';

export const factories = {
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
    ///admin
    getRequestHost: () => {
        return ApiOperation.request({
            url: ApiConstants.REQUESTS,
            method: 'GET',
        });
    },
    updateStatusRequest: (id, value) => {
        return ApiOperation.request({
            url: ApiConstants.REQUESTS + '/' + id,
            method: 'PATCH',
            data: {
                isApprove: value === 1
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
    getListBusesTrip: (params) => {
        return ApiOperation.request({
            url: ApiConstants.BUS_TRIP,
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
