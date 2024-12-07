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
      method: 'PUT',
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
  getSignUpEmail: (email, pass, metadata) => {
    return ApiOperation.request({
      url: ApiConstants.AUTH + '/signup',
      method: 'POST',
      data: {
        email: email,
        password: pass,
        metadata: metadata,
      },
    });
  },
  updatePassword: (data) => {
    return ApiOperation.request({
      url: ApiConstants.AUTH + '/change-password',
      method: 'POST',
      data,
    });
  },
  ///

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
