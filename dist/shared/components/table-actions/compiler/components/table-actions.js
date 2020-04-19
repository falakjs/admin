const ChildComponent = require(CHILD_COMPONENT_CLASS_PATH);

class TableActionsComponent extends ChildComponent {}

module.exports = {
    selector: 'table-actions',
    isChild: true,
    contentToString: false,
    parseContent: true,
    handler: TableActionsComponent,
    isUnique: false,
    component: 'TableActions',
    htmlFile: __dirname + '/../../table-actions.component.html',
};