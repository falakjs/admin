const ChildComponent = require(CHILD_COMPONENT_CLASS_PATH);

class FormButtonsComponent extends ChildComponent {}

module.exports = {
    selector: 'form-buttons',
    isChild: true,
    contentToString: false,
    parseContent: true,
    handler: FormButtonsComponent,
    isUnique: false,
    component: 'FormButtons',
    htmlFile: __dirname + '/../../form-buttons.component.html',
};