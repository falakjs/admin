class AdminModal {
    constructor(service) {
        this.service = service;
        this.defaultData = {};
    }

    /**
     * Initialize the component
     * This method is triggered before rendering the component
     */
    init() {
        this.isValidForm = true;
        this.submitForm = true;
        
        this.data = this.prop('record');
        this.close = this.event('close');

        if (!this.data) {
            this.data = Object.clone(this.defaultData);
            this.heading = 'addItem';
        } else {
            this.heading = 'editItem';
            this.data = Object.merge(this.defaultData, this.data);
        }
    }

    /**
     * Get the locales object of languages
     */
    multiLangInput() {
        let locales = {};

        for (let localeCode of LOCALE_CODES) {
            locales[localeCode] = '';
        }

        return locales;
    }

    /**
     * The component is ready to do any action after being rendered in dom
     */
    async submit(form) {
        if (this.isSending) return;
        this.isSending = true;

        let response;

        try {
            if (this.data.id) {
                let { record, records } = await this.service.update(this.data.id, form);

                response = record || records;

            } else {
                let { record, records } = await this.service.create(form);

                response = record || records;
            }

            this.event('save')(response);

            this.modal.close();
        } catch (error) {
            if (response.statusCode == 400 && response.errors) {
                form.formHandler.setErrors(response.errors);
            }
        } finally {            
            this.isSending = false;
        }
    }
}