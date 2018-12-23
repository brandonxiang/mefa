import * as constant from '../utils/constant';
import * as logger from '../utils/logger';

class Mefa {
  private frame: any;
  private subSystems: object = {};
  private currentApp: string = '';
  private currentRoute: string = '';

  constructor(frame: any) {
      // 设置frame
    this.frame = frame;
  }

  public registerApplication({ app, route, link }): void {
    if (!this.frame) logger.error('Initailization Error!');
    if (!app || !link) logger.error('Parameters "app" and "link" are required!');

    if (!this.currentApp) {
      if (!this.currentRoute) this.currentRoute = route;
      this.currentApp = app;
      this.frame.src = link;
    }

    // TODO: 去重复系统和路由
    if (!this.checkDuplicatedApp(app)) {

      this.subSystems[app] = route ?
                             { link, route: [route] } :
                             { link, route: [] };

    } else if (!this.checkDuplicatedRoute(app, route)) {

      const oldRoute = this.subSystems[app].route;
      oldRoute.push(route);

    }
  }

  public navigateTo({ app, route }) {
    if (!app) logger.error('Parameter "app" is required!');

    if (this.isInSameSystem(app)) {
      if (!this.isInSamePage(app, route)) {
        this.navigateInSystem(route);
        this.updateApp(app, route);
      }
    } else {
      this.navigateOutSystem(app, route);
      this.updateApp(app, route);
    }
  }

  public checkDuplicatedApp(app: string): boolean {
      // true 为重复app
    return this.subSystems.hasOwnProperty(app);
  }

  public checkDuplicatedRoute(app: string, route: string): boolean {
      // true 为重复route
    if (route) {
      return (this.subSystems[app].route.indexOf(route) > -1);
    }
    return true;
  }

  private navigateInSystem(route: string): void {
    const params = {
      message: constant.ROUTECHANGE,
      route,
    };
    this.frame.contentWindow.postMessage(params, '*');
  }

  private navigateOutSystem(system: string, route: string): void {
    // TODO：跳转指定路由
    const link = this.subSystems[system].link;
    this.frame.src = link;
  }

  private isInSameSystem(system: string): boolean {
    return this.currentApp && this.currentApp === system;
  }

  private isInSamePage(system: string, page: string): boolean {
    return this.isInSameSystem(system) && this.currentRoute && this.currentRoute === page;
  }

  private updateApp(system: string, page: string): void {
    this.currentApp = system;
    this.currentRoute = page;
  }
}

export default Mefa;
