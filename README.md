# back_end_assessment

This is a backend assessment/task for SG made using NodeJS, Express, and SQLite for database. It features:

- authorization
- authentication
- routers
- error handling
- static db class
- constants
- validation
- regex
- data pagination
- data creation
- data reading
- data updating
- data deleting
- RESTful api's
- encrypted passwords
- environment variables
- JSON Web Tokens
- slightly enhanced security
- and a bit more...

---

## Endpoints

### /register

The `/register` endpoint is handled with a router that accepts a `POST` method with 2 body fields: `email` and `password`

_example_

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

**PS:** `/register` endpoint is handled with a router to allow further customization for that route. _eg: accepting a GET method and serving an HTML_

---

### /login

The `/login` endpoint is handled with a router that accepts a `POST` method with 2 body fields: `email` and `password`

_example_

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

**PS:** `/login` endpoint is handled with a router to allow further customization for that route. _eg: accepting a GET method and serving an HTML_

---

### /products

The `/products` endpoint is first handled with a router that reads the `authorization` header for the **JWT**

_example_

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJpYXQiOjE2NjYxMDI2NzIsImV4cCI6MTY2NzMxMjI3Mn0.ROmbb0IjLUoB1WIaghNZVZUdgFTWxd80Eqojzu3x670
```

**IF** authorization fails, the process is terminated and user is denied access to the route requested. **OTHERWISE** next middleware in line is called to handle the request.

**PS:** `/products` endpoint is unreachable, but it is a parent route and handled with an **AUTHORIZATION** router to allow further customization for that route, **THEN** it it calls `next()` to pass the request to the next middleware. _eg: accepting a GET method and serving an HTML_

| Method   | Route     | Example                                 |
| -------- | --------- | --------------------------------------- |
| `POST`   | `/create` | `http://localhost:8000/products/create` |
| `GET`    | `/read`   | `http://localhost:8000/products/read`   |
| `PUT`    | `/update` | `http://localhost:8000/products/update` |
| `DELETE` | `/delete` | `http://localhost:8000/products/delete` |

- Template for `/create`

  ```json
  {
    "name": "Bulb",
    "description": "Electric utility that emits light"
  }
  ```

- Template for `/read`

  ```http
  URL: http://localhost:8000/products/read
  or
  URL: http://localhost:8000/products/read?page=0
  or
  URL: http://localhost:8000/products/read?limit=10
  or
  URL: http://localhost:8000/products/read?limit=2&page=5
  ```

- Template for `/update`

  ```json
  {
    "id": 2,
    "name": "Bulb",
    "description": "Electric utility that emits light"
  }
  ```

- Template for `/delete`

  ```json
  {
    "id": 3
  }
  ```
