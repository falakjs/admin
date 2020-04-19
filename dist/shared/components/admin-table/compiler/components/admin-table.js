const Component = require(COMPONENT_CLASS_PATH);

class AdminTableComponent extends Component {}

module.exports = {
    selector: 'admin-table',
    isChild: false,
    contentToString: false,
    parseContent: true,
    handler: AdminTableComponent,
    isUnique: false,
    component: 'AdminTable',
    htmlFile: __dirname + '/../../admin-table.component.html',
};