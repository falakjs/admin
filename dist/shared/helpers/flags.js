const ADMIN = {
    set(settings) {
        ADMIN._CALLBACKS.push({
            type: 'settings',
            callback: settings,
        });
    },
    addPermissions(permissions) {
        if (Is.callable(permissions)) {
            return ADMIN._CALLBACKS.push({
                type: 'PERMISSIONS_LIST',
                callback: permissions,
            });
        }

        for (let permissionName in permissions) {
            let permissionList = permissions[permissionName];
            if (permissionList.crud) {
                let singleName = permissionList.crud;
                delete permissionList.crud;

                // FOR EXAMPLE
                // usersGroups: {
                //     list: trans('itemsList', trans('usersGroups')),
                //     create: trans('createItem', trans('group')),
                //     update: trans('updateItem', trans('group')),
                //     delete: trans('deleteItem', trans('group')),
                // },
                permissions[permissionName].list = trans('itemsList', trans(permissionName));
                permissions[permissionName].create = trans('createItem', trans(singleName));
                permissions[permissionName].update = trans('updateItem', trans(singleName));
                permissions[permissionName].delete = trans('deleteItem', trans(singleName));
            }
        }

        ADMIN.PERMISSIONS_LIST = Object.merge(ADMIN.PERMISSIONS_LIST, permissions);
    },
    addSidebarLinks(links) {
        if (Is.callable(links)) {
            return ADMIN._CALLBACKS.push({
                type: 'SIDEBAR_LINKS',
                callback: links,
            });
        }

        ADMIN.SIDEBAR_LINKS = ADMIN.SIDEBAR_LINKS.concat(links).sort((linkA, linkB) => {
            let orderA = linkA.order || 0,
                orderB = linkB.order || 0;

            if (orderA > orderB) return -1;
            if (orderA < orderB) return 1;

            return 0;
        });
    },
    addSidebarCustomRoutes(customRoutes) {
        ADMIN.SIDEBAR_CUSTOM_ROUTES = Object.merge(ADMIN.SIDEBAR_CUSTOM_ROUTES, Is.callable(customRoutes) ? customRoutes() : customRoutes);
    }
};

ADMIN.DISABLE_PERMISSIONS = false;
ADMIN._CALLBACKS = [];
ADMIN.SIDEBAR_CUSTOM_ROUTES = [];
ADMIN.SIDEBAR_LINKS = [];
ADMIN.PERMISSIONS_LIST = {};



DI.resolve('events').on('app.ready', e => {
    for (let callbackData of ADMIN._CALLBACKS) {
        if (callbackData.type == 'settings') {
            let settings = callbackData.callback();
            if (settings.sidebarLinks) {
                ADMIN.addSidebarLinks(settings.sidebarLinks);
            }

            if (settings.permissions) {
                ADMIN.addPermissions(settings.permissions);
            }

            if (settings.sidebarCustomRoutes) {
                ADMIN.addSidebarCustomRoutes(settings.sidebarCustomRoutes);
            }

            continue;
        }

        ADMIN[callbackData.type](callbackData.callback());
    }
});