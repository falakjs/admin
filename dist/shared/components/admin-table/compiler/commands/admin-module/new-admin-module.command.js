const pluralize = require('pluralize');
const { fs } = require('@flk/fs');

commander
    .command('am, new:admin-module <module>', 'Create new admin module.')
    .option('--app', 'Define the application name that will contain the installed module, default to baseApp value in config.json settings.')
    .option('--service', 'Define module service.')
    .option('-r, --route', 'Create route for component and service.')
    .then(createAdminModule);

function createAdminModule(command) {
    let moduleBuilder = require(FRAMEWORK_COMMANDS_DIRECTORY + '/new-module');
    let createComponent = require(FRAMEWORK_COMMANDS_DIRECTORY + '/new-component');

    if (! command.options.route) {
        command.options.route = '/' + command.module;
    }

    command.service = command.options.service || command.module;
    let { componentOptions, serviceOptions } = moduleBuilder(command);

    let componentModalOptions = {
        options: command.options,
    };

    let tableResourcePath = __dirname + '/resources/table';
    let modalResourcePath = __dirname + '/resources/modal';

    let singleName = pluralize(command.module, 1);

    let tableJsContent = fs.get(tableResourcePath + '/component.js');

    let componentContent = tableJsContent.replace('CLASS_NAME', componentOptions.component)
                                          .replaceAll('SERVICE_NAME', serviceOptions.alias)
                                          .replaceAll('PLURAL_NAME', pluralize(command.module))  
                                          .replace('SINGULAR_NAME', singleName)  

    const modalComponent = pluralize(command.module, 1) + '-modal';

    let tableHtmlContent = fs.get(tableResourcePath + '/component.html');

    let componentHtmlContent = tableHtmlContent.replaceAll('MODAL_NAME', modalComponent);

    echo(componentOptions.componentJsFilePath)

    fs.put(componentOptions.componentJsFilePath, componentContent);
    fs.put(componentOptions.componentHtmlFilePath, componentHtmlContent);

    delete componentModalOptions.options.route;

    let returnedComponentModalOptions = createComponent(modalComponent, componentModalOptions);

    
    let modalJsContent = fs.get(modalResourcePath + '/component.js');

    let modalComponentContent = modalJsContent.replace('MODAL_CLASS', returnedComponentModalOptions.component)
                                          .replaceAll('SERVICE_NAME', serviceOptions.alias)
                                          .replaceAll('ITEM_NAME', singleName);

    let modalHtmlContent = fs.get(modalResourcePath + '/component.html');

    fs.put(returnedComponentModalOptions.componentJsFilePath, modalComponentContent);
    fs.put(returnedComponentModalOptions.componentHtmlFilePath, modalHtmlContent);    
}