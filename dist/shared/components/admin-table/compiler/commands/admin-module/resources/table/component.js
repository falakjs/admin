class CLASS_NAME extends Table {
    /**
     * Constructor
     * Put your required dependencies in the constructor parameters list  
     */
    constructor(SERVICE_NAME) {
        super(SERVICE_NAME);
        this.name = 'PLURAL_NAME';
        this.title = trans('PLURAL_NAME');

        this.options = {
            singleName: 'SINGULAR_NAME',
            table: {
                heading: 'PLURAL_NAME',
                columns: [{
                    name: 'id',
                    head: '#',
                    key: 'id',
                }, {
                    head: 'name',
                    key: 'name',
                }, {
                    head: 'image',
                    key: 'image',
                    formatter: 'image',
                }, {
                    head: 'status',
                    key: 'status',
                    formatter: 'status',
                }],
            },
        };
    }
}