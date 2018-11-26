export default class Mefa {
    frame: any;
    subSystems: object;
    currentApp: string;
    currentRoute: string;
    constructor(frame: any);
    registerApplication({ app, route, link }: {
        app: any;
        route: any;
        link: any;
    }): void;
    navigateTo({ app, route }: {
        app: any;
        route: any;
    }): void;
    checkDuplicatedApp(app: any): boolean;
    checkDuplicatedRoute(app: any, route: any): boolean;
    navigateInSystem(system: any, name: any): void;
    navigateOutSystem(system: any): void;
    isInSameSystem(system: any): boolean;
    isInSamePage(system: any, page: any): boolean;
    updateApp(system: any, page: any): void;
    static onRouteUpdate(cb: Function): void;
}
