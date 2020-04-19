const Component = require(COMPONENT_CLASS_PATH);

class AccessDeniedPageComponent extends Component {}

module.exports = {
    selector: 'access-denied-page',
    isChild: false,
    contentToString: false,
    parseContent: true,
    handler: AccessDeniedPageComponent,
    isUnique: true,
    component: 'AccessDeniedPage',
    htmlFile: __dirname + '/../../access-denied-page.component.html',
};