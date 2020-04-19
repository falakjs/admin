class Table {
    constructor(service) {
        this.service = service;

        this.user = DI.resolve('user');
        this.router = DI.resolve('router');

        this.bulkLoads = null;

        this.defaultOptions = {
            permissionsKey: null,
            singleName: null,
            addable: true,
            table: {    
                filter: {                    
                    request: this.service.list.bind(this.service),
                    response: this.onFilterResponse.bind(this),
                },
                heading: 'table main heading',
                actions: true,
                pagination: {
                    active: true,
                    itemsPerPage: 10,
                    currentPage: 1
                },
                columns: [
                    // {
                    //     head: 'table-column-heading',
                    //     key: 'api-record-key-name',
                    //     name: 'for uniqueness',
                    //     default: '',
                    //     href: '',
                    //     target: '',
                    //     formatter: email|link|imageLink|image|status|boolean|translator|function
                    // }
                ],
                colspan() {
                    return this.columns.length + 1;
                },
                sort: {
                    order: 'asc',
                    key: 'id'
                }
            },
        };

    }

    /**
     * Initialize the component
     * This method is triggered before rendering the component
     */
    async init() {
        this.isLoading = true;

        if (! this.can('list')) {
            return this.router.navigateTo('/access-denied');
        }

        this.isPermitted = true;

        this.loadBulks();

        this.options = Object.merge(this.defaultOptions, this.options);

        let { records, paginationInfo } = await this.service.list(this.listOptions());

        this.records = records;
        this.paginationInfo = paginationInfo;

        this.onList();

        this.isLoading = false;
    }

    loadBulks() {
        if (!this.bulkLoads) return;

        if (!this.loaded) {
            this.loaded = {};
            this.queryParams = {};

            for (let value of this.bulkLoads) {
                this.loaded[value] = null;
                this.queryParams[value] = true;
            }
        }

        this.bulkService.list(this.queryParams).then(response => {
            let loaded = {};

            for (let value of this.bulkLoads) {
                loaded[value] = response[value];
            }

            this.loaded = loaded;

            this.events.trigger('bulk.collected');
        });


        this.load = type => {
            return new Promise(resolve => {
                if (this.loaded[type]) {
                    resolve(this.loaded[type]);
                }
                this.events.on('bulk.collected', () => {
                    resolve(this.loaded[type]);
                });
            })
        };

    }

    onFilterResponse(response) {
        this.records = response.records;
        this.paginationInfo = response.paginationInfo;
    }

    can(type) {
        if (window.dismissPermissions === true || ADMIN.DISABLE_PERMISSIONS === true) return true;
        
        return Object.get(this.user.group.permissions, `${this.options.permissionsKey}.${type}`);
    }

    onList() {
    }

    listOptions() {
        return {};
    }

    openModal(type, record, index) {
        if (type == 'add') {
            this.addModal = true;
        } else if (type == 'edit') {
            this.editModal = true;
            // to disable referencing to record, we'll clone it
            this.currentRecord = Object.clone(record);
            this.currentIndex = index;
        }
    }

    updateRecord(record) {
        this.records[this.currentIndex] = record;

        this.currentIndex = null;
        this.currentRecord = null;
    }

    deleteRecord(record, currentIndex) {
        delete this.records[currentIndex];

        this.records = Array.reset(this.records);

        this.service.delete(record.id);
    }
}