// Shared module routes list
DI.resolve('events').subscribe('router.collecting', router => {
    router.group({
        prefix: '/access-denied',
        middleware: ['guardian'],
    }, routerGroup => {
        // Access Denied page
		routerGroup.add('/', AccessDeniedPage);
		// end of routes
    });
});