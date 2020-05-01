class AdminTable {
    /**
     * Constructor
     * Put your required dependencies in the constructor parameters list  
     */
    constructor(router) {
        this.router = router;
    }

    init() {
        this.options = this.prop('options');
        this.parent = this.inputs.parent;
        this.currentPage = this.parent.paginationInfo ? this.parent.paginationInfo.currentPage : 1;
    }

    column(column, record) {
        return column.formatter && Is.function(column.formatter) ? column.formatter(record) : Object.get(record, column.key, column.default);
    }

    confirmDelete(record, index) {
        // to disable referencing to record, we'll clone it
        this.currentRecord = Object.clone(record);
        this.currentIndex = index;

        this.isDeleting = true;
    }

    deleteRecord() {
        this.parent.deleteRecord(this.currentRecord, this.currentIndex);

        this.currentIndex = null;
        this.currentRecord = null;
    }

    async filter(form) {
        // reset pagination to page one
        this.currentPage = 1;
        if (this.pageInput) {
            this.pageInput.value = 1;
        }

        this.isFiltering = true;
        this.tableIsLoading = true;
        let response = await this.options.table.filter.request(form);

        this.isFiltering = false;
        this.tableIsLoading = false;
        this.options.table.filter.response(response);
    }

    async goToPage(pageNumber) {
        let form = this.filterForm;
        this.currentPage = pageNumber;
        if (this.pageInput) {
            this.pageInput.value = pageNumber;
        }

        if (! form) {
            form = {
                page: pageNumber,
            };
        }
        // this.parent.isLoading = true;
        this.isFiltering = true;

        this.tableIsLoading = true;

        let response = await this.options.table.filter.request(form);

        this.options.table.filter.response(response);

        this.tableIsLoading = false;
        this.isFiltering = false;
        this.parent.isLoading = false;    
        scrollTop();
    }

    reset(resetButton) {
        resetButton.form.reset();
        this.router.refresh();
    }
}