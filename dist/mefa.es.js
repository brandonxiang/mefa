var Mefa = /** @class */ (function () {
    function Mefa(frame) {
        // 设置frame
        this.frame = frame;
        this.subSystems = {};
        this.currentApp = '';
        this.currentRoute = '';
    }
    Mefa.prototype.registerApplication = function (_a) {
        var app = _a.app, route = _a.route, link = _a.link;
        if (!app || !route || !link)
            return;
        if (!this.currentRoute)
            this.currentRoute = route;
        if (!this.currentApp) {
            this.currentApp = app;
            this.frame.src = link;
        }
        // TODO: 去重复系统和路由
        if (!this.checkDuplicatedApp(app)) {
            this.subSystems[app] = { link: link, route: [route] };
        }
        else if (!this.checkDuplicatedRoute(app, route)) {
            var oldRoute = this.subSystems[app].route;
            oldRoute.push(route);
        }
    };
    Mefa.prototype.navigateTo = function (_a) {
        var app = _a.app, route = _a.route;
        if (this.isInSameSystem(app)) {
            if (!this.isInSamePage(app, route)) {
                this.navigateInSystem(app, route);
                this.updateApp(app, route);
            }
        }
        else {
            this.navigateOutSystem(app);
            this.updateApp(app, route);
        }
    };
    Mefa.prototype.checkDuplicatedApp = function (app) {
        // true 为重复app
        return this.subSystems.hasOwnProperty(app);
    };
    Mefa.prototype.checkDuplicatedRoute = function (app, route) {
        // true 为重复route
        return (this.subSystems[app].route.indexOf(route) > -1);
    };
    Mefa.prototype.navigateInSystem = function (system, name) {
        this.frame.contentWindow.postMessage({ route: name }, '*');
    };
    Mefa.prototype.navigateOutSystem = function (system) {
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
    Mefa.onRouteUpdate = function (cb) {
        window.addEventListener('message', function (res) {
            if (res.data) {
                cb(res.data.route);
            }
        });
    };
    return Mefa;
}());

export default Mefa;
