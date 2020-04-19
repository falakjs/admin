// run any operations here
// this file is loaded before the router is ready so you can subscribe to events or run initial operations here. 
// Please DO NOT write any instant executable code outside the ready method. 

detectDeviceSize();

function detectDeviceSize() {
    window.isMobile = window.innerWidth <= 780;

    if (isMobile) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
    }
}

window.addEventListener('resize', detectDeviceSize);

// once the application is ready, execute the given callback to 
// the event before the router scanner starts.
DI.resolve('events').on('app.ready', () => {
    // write your code here.
}).on('router.navigating', (route, router) => {
    let user = DI.resolve('user');

    if (route != '/login' && ! user.isLoggedIn()) {
        setTimeout(() => {
            router.navigateTo('/login');
        }, 0);
        return false;
    }
}).on('endpoint.done', response => {
    let user = DI.resolve('user');
    if (! user.isLoggedIn()) return;
    
    if (response.user) {
        // update user group for permissions
        user.update(response.user);            
        
        if (response.user.group != user.group) {
            layout.detectChanges();
        }
    }
});
