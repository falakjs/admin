const Component = require(COMPONENT_CLASS_PATH);

class SidebarSectionComponent extends Component {}

module.exports = {
    selector: 'sidebar-section',
    isChild: false,
    contentToString: false,
    parseContent: true,
    handler: SidebarSectionComponent,
    isUnique: true,
    component: 'SidebarSection',
    htmlFile: __dirname + '/../../sidebar-section.component.html',
};