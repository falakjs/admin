const ChildComponent = require(CHILD_COMPONENT_CLASS_PATH);

class TablePaginationComponent extends ChildComponent {}

module.exports = {
    selector: 'table-pagination',
    isChild: true,
    contentToString: false,
    parseContent: true,
    handler: TablePaginationComponent,
    isUnique: false,
    component: 'TablePagination',
    htmlFile: __dirname + '/../../table-pagination.component.html',
};