class MODAL_CLASS extends AdminModal {
    /**
     * Constructor
     * Put your required dependencies in the constructor parameters list  
     */
    constructor(SERVICE_NAME) {
        super(SERVICE_NAME);
        this.itemName = 'ITEM_NAME';

        this.defaultData = {
            name: '',
            status: 'enabled',
            image: '',
        };
    }
}