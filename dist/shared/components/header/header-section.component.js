class Header {
    /**
    * {@inheritDoc}
    */
    constructor(user, router, authService, sidebarSection) {
        this.user = user;
        this.router = router;
        this.authService = authService;
        this.sidebar = sidebarSection;
    }

    logout() {
        this.authService.logout();

        this.user.logout();

        this.router.navigateTo('/login');
    }
}