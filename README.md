# Falak Admin Manager

A Comprehensive Administration Panel Creator/Helper 

# Installation
`flk install @flk/admin`

> This Package is installed by default when creating new Falak   project

# Content

- Admin Module Builder
- Admin Table Manager
- Admin Modal Form Manager 
- Admin Sidebar
- Access Denied Page
- Services


# Admin Module Builder

## Table Builder

## Modal Builder

# Admin Table Manager

## Table Columns
## Table Filtration
## Table Pagination
## Table Actions

# Admin Modal Form
# Admin Modal Sidebar
# Access Denied Page


## Services

By default, the admin package is shipped with a `Bulk Service` 

which will allow you to `retrieve` multiple data in one request.

> This should be handled in the your backend end point with `/bulk` request

### Usage

Simply Inject the service in your component `bulkService` and make whatever requests you need.

Example:

```js
class reportsPage {
    constructor(bulkService) {
        this.bulkService = bulkService;
    }

    await init() {
        let {users, posts, categories} = await this.bulkService.list({
            users: true,
            posts: true,
            categories: true,
        });
    }
}
```

Of course the output of the request `let {users, posts, categories}` 
is the taken from the response of that request, so make sure you take
the proper values from your backend endpoint. 