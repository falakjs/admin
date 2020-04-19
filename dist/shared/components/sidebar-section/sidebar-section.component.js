class SidebarSection {
    /**
     * Constructor
     * Put your required dependencies in the constructor parameters list  
     */
    constructor(user, router, events, cache, authService) {
        this.user = user;
        this.router = router;
        this.events = events;
        this.cache = cache;
        this.authService = authService;

        this.keywords = '';

        this.dropdownIcon = `angle-${Config.get('app.direction') == 'ltr' ? 'right' : 'left'}`;

        this.openedDropdownIcon = 'angle-down';

        this.events.on('router.navigating', e => {
            if (window.isMobile) {
                this.jqueryElement.fadeOut();
            }
        });
    }

    toggleTree(link) {
        $(link.tree).slideToggle();

        $(link.parent).toggleClass('active');

        $(link.dropdownIconElement).toggleClass(fas(this.dropdownIcon)).toggleClass(fas(this.openedDropdownIcon));
    }

    toggle() {
        if (Is.mobile.any()) {        
            this.jqueryElement.fadeToggle();
        } else {
            this.inputs.parent.toggleSidebar(); 
        }
    }

    ready() {
        if (!this.jqueryElement) {
            this.jqueryElement = $(this.element);
        }

        // fix the bloody max height issue in the sidebar content in firefox
        if (Is.browser('firefox')) {
            // this.sidebarContent.style.maxHeight = `calc(100vh - ${this.sidebarFooter.style.offsetHeight}px)`;
            // echo(`calc(100vh - ${this.sidebarFooter.offsetHeight})`)
        }
    }

    /**
     * Initialize the component
     * This method is triggered before rendering the component
     */
    init() {
        this.customRoutes = ADMIN.SIDEBAR_CUSTOM_ROUTES;

        this.links = ADMIN.SIDEBAR_LINKS;

        this.links = this.links.map(linksList => {
            if (ADMIN.DISABLE_PERMISSIONS === true) return linksList;
            if (linksList.items) {
                linksList.items = linksList.items.filter(link => {
                    return !Is.undefined(link.permissionsKey) ? Object.get(this.user.group.permissions, link.permissionsKey) : true;
                });
            } else if (!Is.undefined(linksList.permissionsKey) && linksList.permissionsKey && !Object.get(this.user.group.permissions, linksList.permissionsKey)) {
                return false;
            }

            return linksList;
        }).filter(linksList => {
            if (!linksList) return false;

            if (linksList.items && Is.empty(linksList.items)) return false;

            return true;
        });

        this.filter(this.keywords);

        this.currentRoute = this.router.route();

        if (this.customRoutes[this.router.current.route]) {
            this.currentRoute = this.customRoutes[this.router.current.route];
        }

        for (let link of this.links) {
            if (!link.group) continue;

            let group = link;

            group.opened = false;

            for (let subLink of group.items) {
                if (subLink.route == this.currentRoute) {
                    group.opened = true;
                    group.dropdownIcon = this.openedDropdownIcon;
                }
            }
        }
    }

    filter(keywords) {
        this.keywords = keywords;
        if (!keywords) {
            this.displayedLinks = this.links;
        } else {
            let regex = new RegExp(keywords, 'i');
            this.displayedLinks = this.links.filter(link => {
                let match = link.group ? trans(link.group.text).match(regex) : trans(link.text).match(regex);

                if (!match && link.items) {
                    match = link.items.find(subLink => trans(subLink.text).match(regex));
                }

                return match;
            });
        }
    }
}

DI.register({
    class: SidebarSection,
    alias: 'sidebarSection',
});