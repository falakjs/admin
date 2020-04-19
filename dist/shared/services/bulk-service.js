class BulkService extends Endpoint.Service {
    /**
     * {@inheritDoc} 
     */
    boot() {
        this.setRoute('/bulk');
    }
}

DI.register({
    class: BulkService,
    alias: 'bulkService',
});