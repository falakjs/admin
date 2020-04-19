const ChildComponent = require(CHILD_COMPONENT_CLASS_PATH);

class FormStatusComponent extends ChildComponent {}

module.exports = {
    selector: 'form-status',
    isChild: true,
    contentToString: false,
    parseContent: true,
    handler: FormStatusComponent,
    isUnique: false,
    component: 'FormStatus',
    htmlFile: __dirname + '/../../form-status.component.html',
};