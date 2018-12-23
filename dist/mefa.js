(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Mefa = {})));
}(this, (function (exports) { 'use strict';

  var ROUTECHANGE = 'ROUTECHANGE';

  var onRouteUpdate = function (cb) {
      window.addEventListener('message', function (res) {
          if (res.data && res.data.message === ROUTECHANGE) {
              cb(res.data.route);
          }
      });
  };

  var index = /*#__PURE__*/Object.freeze({
    onRouteUpdate: onRouteUpdate
  });

  var error = function (message) {
      console.error(message);
      throw new Error(message);
  };
  // export const warn = (message: string) => {
  // };

  var Mefa = /** @class */ (function () {
      function Mefa(frame) {
          this.subSystems = {};
          this.currentApp = '';
          this.currentRoute = '';
          // 设置frame
          this.frame = frame;
      }
      Mefa.prototype.registerApplication = function (_a) {
          var app = _a.app, route = _a.route, link = _a.link;
          if (!this.frame)
              error('Initailization Error!');
          if (!app || !link)
              error('Parameters "app" and "link" are required!');
          if (!this.currentApp) {
              if (!this.currentRoute)
                  this.currentRoute = route;
              this.currentApp = app;
              this.frame.src = link;
          }
          // TODO: 去重复系统和路由
          if (!this.checkDuplicatedApp(app)) {
              this.subSystems[app] = route ?
                  { link: link, route: [route] } :
                  { link: link, route: [] };
          }
          else if (!this.checkDuplicatedRoute(app, route)) {
              var oldRoute = this.subSystems[app].route;
              oldRoute.push(route);
          }
      };
      Mefa.prototype.navigateTo = function (_a) {
          var app = _a.app, route = _a.route;
          if (!app)
              error('Parameter "app" is required!');
          if (this.isInSameSystem(app)) {
              if (!this.isInSamePage(app, route)) {
                  this.navigateInSystem(route);
                  this.updateApp(app, route);
              }
          }
          else {
              this.navigateOutSystem(app, route);
              this.updateApp(app, route);
          }
      };
      Mefa.prototype.checkDuplicatedApp = function (app) {
          // true 为重复app
          return this.subSystems.hasOwnProperty(app);
      };
      Mefa.prototype.checkDuplicatedRoute = function (app, route) {
          // true 为重复route
          if (route) {
              return (this.subSystems[app].route.indexOf(route) > -1);
          }
          return true;
      };
      Mefa.prototype.navigateInSystem = function (route) {
          var params = {
              message: ROUTECHANGE,
              route: route,
          };
          this.frame.contentWindow.postMessage(params, '*');
      };
      Mefa.prototype.navigateOutSystem = function (system, route) {
          // TODO：跳转指定路由
          var link = this.subSystems[system].link;
          this.frame.src = link;
      };
      Mefa.prototype.isInSameSystem = function (system) {
          return this.currentApp && this.currentApp === system;
      };
      Mefa.prototype.isInSamePage = function (system, page) {
          return this.isInSameSystem(system) && this.currentRoute && this.currentRoute === page;
      };
      Mefa.prototype.updateApp = function (system, page) {
          this.currentApp = system;
          this.currentRoute = page;
      };
      return Mefa;
  }());

  exports.Mefa = Mefa;
  exports.appMefa = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
