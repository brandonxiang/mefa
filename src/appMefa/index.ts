import * as constant from '../utils/constant';

export const onRouteUpdate = (cb): void => {
  window.addEventListener('message', (res) => {
    if (res.data && res.data.message === constant.ROUTECHANGE) {
      cb(res.data.route);
    }
  });
};
