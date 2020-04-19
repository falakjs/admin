const ChildComponent = require(CHILD_COMPONENT_CLASS_PATH);

class TableFilterComponent extends ChildComponent {}

module.exports = {
    selector: 'table-filter',
    isChild: true,
    contentToString: false,
    parseContent: true,
    handler: TableFilterComponent,
    isUnique: false,
    component: 'TableFilter',
    htmlFile: __dirname + '/../../table-filter.component.html',
};