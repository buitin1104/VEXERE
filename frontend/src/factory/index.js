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
  createReview: (data) => {
    return ApiOperation.request({
      url: ApiConstants.REVIEW + '/' + data.id,
      method: 'POST',
      data: data,
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
