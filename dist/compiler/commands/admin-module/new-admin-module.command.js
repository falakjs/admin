const pluralize = require('pluralize');
const { fs } = require('@flk/fs');
const pretty = require('pretty-js');
const prettyHtml = require('pretty');
const path = require('path');

commander
    .command('am, new:admin-module <module>', 'Create new admin module.')
    .option('--app', 'Define the application name that will contain the installed module, default to baseApp value in config.json settings.')
    .option('--service', 'Define module service.')
    .option('--component', 'Define module component.')
    .option('-r, --route', 'Create route for component and service.')
    .option('--data', 'Works only with flk.json file')
    .then(createAdminModule);

function createHtmlFrmFile(data) {
    let htmlContent = '';

    for (let row of data.formOptions.rows) {
        htmlContent += `<div class="row">
        ${parseColumnsOfRow(row)}
        </div>`;
    }

    if (data.formOptions.withStatus) {
        htmlContent += `
            <div class="row">
                <div class="col">
                    <form-status></form-status>
                </div>
            </div>
        `;
    }

    return htmlContent;
}

function parseColumnsOfRow(row) {
    let html = ``;

    for (let column of row) {
        html += `<div class="${column.col}">`;
        let htmlAttributes = {
        };

        const attr = (attribute, newAttributeName = null) => {
            if (!newAttributeName) {
                newAttributeName = attribute;
            }

            if (column[attribute]) {
                htmlAttributes[newAttributeName] = column[attribute];
            }
        };

        if (column.multiLingual) {
            htmlAttributes['*for'] = `let localeCode of LOCALE_CODES`;
            htmlAttributes.name = `${column.name}.{{ localeCode }}`;
            htmlAttributes['[label]'] = `trans('${column.label}') + ' ( ' + trans(localeCode) + ' )'`;
            htmlAttributes['[placeholder]'] = `trans('${column.placeholder}') + ' ( ' + trans(localeCode) + ' )'`;
            if (column.slug) {
                htmlAttributes['(input,change)'] = `this.data.slug[localeCode] = seo($el.value)`;

                html += `
                    <input type="hidden" *for="let localeCode of LOCALE_CODES" name="slug[{{ localeCode }}]" [value]="this.data.slug[localeCode]" />            
                `;
            }

            if (column.value) {
                htmlAttributes['[value]'] = `this.data.${(column.value || column.name).replace(/\./g, '?.')}[localeCode]`;
            }
        } else {
            attr('name');
            attr('label');
            attr('placeholder');
            if (column.slug) {
                htmlAttributes['(input,change)'] = `this.data.slug = seo($el.value)`;

                html += `
                    <input type="hidden" name="slug" [value]="this.data.slug" />            
                `;
            }

            if (column.value) {
                htmlAttributes['[value]'] = `this.data.${(column.value || column.name).replace(/\./g, '?.')}`;
            }
        }

        attr('required', '[required]');

        const htmlAttributesToString = () => {
            let attrs = '';

            for (let key in htmlAttributes) {
                let value = htmlAttributes[key];

                attrs += ` ${key}="${value}"`;
            }

            return attrs;
        };

        switch (column.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
                htmlAttributes.class = 'form-control';
                htmlAttributes.type = column.type;
                html += `
                <form-input${htmlAttributesToString()}></form-input> 
                `;
                break;

            case 'image':
                html += `
                    <flk-image-input [src]="this.data.${column.value}"${htmlAttributesToString()}></flk-image-input>            
                `;

                break;
            case 'datepicker':
                htmlAttributes.class = 'form-control';
                html += `
                    <flk-datepicker${htmlAttributesToString()}></flk-datepicker>            
                `;
                break;
            case 'checkbox':
                html += `
                    <flk-mdb-checkbox${htmlAttributesToString()} [checked]="this.data.${column.name}" (change)="this.data.${column.name} = $el.checked"></flk-mdb-checkbox>                        
                `;
            case 'dropdown':
                attr('items', '[items]');
                attr('service', '[service]');
                attr('lazyLoading', '[lazy-loading]');
                attr('remoteSearch', '[remote-search]');
                attr('imageable', '[imageable]');
                attr('none', '[none]');

                if (column.placeholder) {
                    htmlAttributes.placeholder = htmlAttributes.heading = column.placeholder;
                }

                html += `
                    <flk-dropdown-list${htmlAttributesToString()}></flk-dropdown-list>                        
            `;
            default:
                break;
        }

        html += `</div>`;
    }

    return html;
}

function createAdminModule(command) {
    const { getAppName } = require(FRAMEWORK_ROOT_PATH + '/helpers/manager');
    let moduleBuilder = require(FRAMEWORK_COMMANDS_DIRECTORY + '/new-module');
    let createComponent = require(FRAMEWORK_COMMANDS_DIRECTORY + '/new-component');
    let createService = require(FRAMEWORK_COMMANDS_DIRECTORY + '/new-service');

    if (!command.options.route) {
        command.options.route = '/' + command.module;
    }

    command.service = command.options.service || command.module;

    let modulePath = SRC_DIR + `/${getAppName(command)}/modules/${command.module}`;

    let componentOptions, serviceOptions;

    const componentName = command.options.component || command.module;

    if (!fs.exists(modulePath)) {
        command.options.component = componentName;
        let { componentOptions: newComponentOptions, serviceOptions: newServiceOptions } = moduleBuilder(command);
        componentOptions = newComponentOptions;
        serviceOptions = newServiceOptions;
    } else {
        command.options.module = command.args.module;
        componentOptions = createComponent(componentName, {
            options: command.options,
        });

        serviceOptions = createService(command.options.service || command.args.module, command.options);
    }

    let componentFrmOptions = {
        options: command.options,
    };

    let tableResourcePath = __dirname + '/resources/table';
    let formResourcePath = __dirname + '/resources/form';

    let singleName = pluralize(command.module, 1);

    let tableJsContent = fs.get(tableResourcePath + '/component.js');

    let columnsList = [];
    let formDataList = {};

    let formHtmlRows = '';

    if (command.options.data) {
        let data = command.options.data;

        let columns = data.tableOptions.columns.map(column => {
            for (let key in column) {
                if (column[key] === '') {
                    delete column[key];
                }
            }
            return column;
        });

        columnsList = JSON.stringify(columns, null, 20);

        if (data.formOptions) {
            for (let row of data.formOptions.rows) {
                for (let column of row) {
                    let name = column.value;
                    let initialValue = '';

                    if (column.multiLingual) {
                        initialValue = {};

                        for (let locale of global.appConfig.locales) {
                            initialValue[locale] = '';
                        }
                    }

                    Object.set(formDataList, name, initialValue);
                }
            }
        }

        if (data.withStatus) {
            formDataList.status = 'enabled';
        }

        formHtmlRows = createHtmlFrmFile(data);
    }

    let componentContent = tableJsContent.replace('CLASS_NAME', componentOptions.component)
        .replaceAll('SERVICE_NAME', serviceOptions.alias)
        .replaceAll('PLURAL_NAME', pluralize(command.module))
        .replace('SINGULAR_NAME', singleName)
        .replace('columnsList', columnsList)

    const formComponent = pluralize(componentName, 1) + '-form';

    let tableHtmlContent = fs.get(tableResourcePath + '/component.html');

    let componentHtmlContent = tableHtmlContent.replaceAll('MODAL_NAME', formComponent);

    componentContent = pretty(componentContent);

    // copy the helpers directory if not exists
    let helpersDirectory = path.resolve(
        path.dirname(componentOptions.componentJsFilePath) + '/../../helpers'
    );

    if (!fs.isDir(helpersDirectory)) {
        fs.copy(__dirname + '/resources/helpers', helpersDirectory);
    }

    fs.put(componentOptions.componentJsFilePath, componentContent);
    fs.put(componentOptions.componentHtmlFilePath, componentHtmlContent);

    delete componentFrmOptions.options.route;
    delete componentFrmOptions.options.component;

    let returnedComponentFrmOptions = createComponent(formComponent, componentFrmOptions);

    let formJsContent = fs.get(formResourcePath + '/component.js');

    let formComponentContent = formJsContent.replace('MODAL_CLASS', returnedComponentFrmOptions.component)
        .replaceAll('SERVICE_NAME', serviceOptions.alias)
        .replaceAll('ITEM_NAME', singleName)
        .replace('dataList', JSON.stringify(formDataList));

    let formHtmlContent = fs.get(formResourcePath + '/component.html').replace('FORM_INPUTS', formHtmlRows);

    fs.put(returnedComponentFrmOptions.componentJsFilePath, pretty(formComponentContent));
    fs.put(returnedComponentFrmOptions.componentHtmlFilePath, prettyHtml(formHtmlContent));
}