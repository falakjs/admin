class LayoutWrapper {
    constructor(cache) {
        this.cache =cache;
        this.isExpanded = this.cache.get('sidebarMode');
    }

    toggleSidebar() {
        this.isExpanded = ! this.isExpanded;
        this.cache.set('sidebarMode', this.isExpanded);
    }
}
