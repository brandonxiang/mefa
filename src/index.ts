export default class Mefa {
    frame: any;
    subSystems: object;
    currentApp: string;
    currentRoute: string;

    constructor(frame) {
      // 设置frame
      this.frame = frame
      this.subSystems = {}
      this.currentApp = ''
      this.currentRoute = ''
    }
  
    registerApplication({ app, route, link }): void {
      if(!app || !route || !link) return;
  
      if(!this.currentRoute) this.currentRoute = route
      if(!this.currentApp) {
        this.currentApp = app
        this.frame.src = link
      }
      // TODO: 去重复系统和路由
      if(!this.checkDuplicatedApp(app)) {
        this.subSystems[app] = {link, route: [route]}
      } else if(!this.checkDuplicatedRoute(app, route)) {
        const oldRoute = this.subSystems[app].route
        oldRoute.push(route)
      }
    }
  
    navigateTo({ app, route }) {
      if(this.isInSameSystem(app)) {
        if(!this.isInSamePage(app, route)){
          this.navigateInSystem(app, route)
          this.updateApp(app, route)
        }
      }else {
        this.navigateOutSystem(app)
        this.updateApp(app, route)
      }
    }
  
    checkDuplicatedApp(app) {
      // true 为重复app
      return this.subSystems.hasOwnProperty(app)
    }
  
    checkDuplicatedRoute(app, route) {
      // true 为重复route
      return (this.subSystems[app].route.indexOf(route) > -1)
    }
  
    navigateInSystem(system, name) {
      this.frame.contentWindow.postMessage({route: name}, '*')
    }
  
    navigateOutSystem(system) {
      const link = this.subSystems[system].link
      this.frame.src = link
    }
  
    isInSameSystem(system) {
      return this.currentApp && this.currentApp === system;
    }
  
    isInSamePage(system, page) {
      return this.isInSameSystem(system) && this.currentRoute && this.currentRoute === page
    }
  
    updateApp(system, page) {
      this.currentApp = system
      this.currentRoute = page
    }
  
    static onRouteUpdate(cb: Function) {
      window.addEventListener('message', (res) => {
        if(res.data) {
          cb(res.data.route)
        }
      })
    }
  } 