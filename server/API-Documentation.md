# E-Commerce Morgshop Server

- RESTful endpoint for E-Commerce Morgshop CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints for E-Commerce Morghsop

- POST /register
- POST /login
- POST /products
- GET /products
- GET /products/:id
- DELETE /products/:id
- PUT /products/:id
- GET /carts
- POST /carts/:productId
- DELETE /carts/:id
- PATCH /carts/:id
- PATCH /checkout
- GET /transaction/history

---

> ### POST /register

_Request Header_

```JSON
not needed
```

_Request Body_

```JSON
{
    "email": "<input your email>",
    "password": "<input your password>"
}
```

_Response (201 - Created)_

```JSON
{
    "id": "<given id by system>",
    "email": "<inputted email>"
}
```

_Response (400 - Bad Request)_

```JSON
{
    "message": [
        "Email address is already registered"
    ]
}

OR

{
    "message": [
        "Email is required",
        "Must be an email format",
        "Password is required"
    ]
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### POST /login

_Request Header_

```JSON
not needed
```

_Request Body_

```JSON
{
    "email": "<input your email>",
    "password": "<input your password>"
}
```

_Response (200 - Ok)_

```JSON
{
    "email": "<inputted email>",
    "role": "<given role by system>",
    "access_token": "<your access token>"
}
```

_Response (401 - Unathorized)_

```JSON
{
    "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### POST /products

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
{
    "name": "<input your name>",
    "image_url": "<input your image_url>",
    "price": "<input your price>",
    "stock": "<input your stock>",
    "category": "<input your category>",
}
```

_Response (201 - Created)_

```JSON
{
    "name": "<inputted title>",
    "image_url": "<inputted image_url>",
    "price": "<inputted price>",
    "stock": "<inputted stock>",
    "category": "<inputted category>",
}
```

_Response (400 - Bad Request)_

```JSON
{
    "message": "Your input is invalid"
}
```

OR

```JSON
{
    "message": [
        "Name is required",
        "Image URL is required",
        "Must be an URL format",
        "Price is required",
        "Price must be a number",
        "Stock is required",
        "Stock must be a number"
    ]
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

OR

```JSON
{
    "message":  "Cannot access this features, this is for admin only"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### GET /products

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Response (200 - Ok)_

```JSON
[
    {
        "id": 2,
        "name": "test 1",
        "image_url": "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
        "price": 50000,
        "stock": 12,
        "category": "asd",
        "createdAt": "2021-03-16T10:00:30.999Z",
        "updatedAt": "2021-03-16T10:00:30.999Z"
    },
    {
        "id": 3,
        "name": "test 2",
        "image_url": "https://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg",
        "price": 10000,
        "stock": 1,
        "category": "asd",
        "createdAt": "2021-03-16T10:06:39.814Z",
        "updatedAt": "2021-03-16T10:06:39.814Z"
    },
]
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### GET /products/:id

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request Params_

```JSON
{
    "id": "<inputted request params>"
}
```

_Response (200 - Ok)_

```JSON
{
    "id": 2,
    "name": "test 1",
    "image_url": "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
    "price": 50000,
    "stock": 12,
    "category": "asd",
    "createdAt": "2021-03-16T10:00:30.999Z",
    "updatedAt": "2021-03-16T10:00:30.999Z"
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (404 - Not Found)_

```JSON
{
    "message": "Cannot found product with this id"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### DELETE /products/:id

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request Params_

```JSON
{
    "id": "<inputted request params>"
}
```

_Response (200 - Ok)_

```JSON
{
    "message": "Successfully delete this product"
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

OR

```JSON
{
    "message":  "Cannot access this features, this is for admin only"
}
```

_Response (404 - Not Found)_

```JSON
{
    "message": "Cannot found product with this id"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### PUT /products/:id

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
{
    "name": "<input your name>",
    "image_url": "<input your image_url>",
    "price": "<input your price>",
    "stock": "<input your stock>",
    "category": "<input your category>",
}
```

_Request Params_

```JSON
{
    "id": "<inputted request params>"
}
```

_Response (200 - Ok)_

```JSON
{
    "id": 2,
    "name": "test update",
    "image_url": "https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg",
    "price": 100000,
    "stock": 12,
    "category": "test update",
    "createdAt": "2021-03-16T10:00:30.999Z",
    "updatedAt": "2021-03-16T10:00:30.999Z"
}
```

_Response (400 - Bad Request)_

```JSON
{
    "message": "Your input is invalid"
}

OR

{
    "message": [
        "Name is required",
        "Image URL is required",
        "Must be an URL format",
        "Price is required",
        "Price must be a number",
        "Stock is required",
        "Stock must be a number"
    ]
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

OR

```JSON
{
    "message":  "Cannot access this features, this is for admin only"
}
```

_Response (404 - Not Found)_

```JSON
{
    "message": "Cannot found product with this id"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### GET /carts

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request currentUser_

```JSON
{
    "id": "current user id",
    "email": "current user email",
    "role": "current user role"
}
```

_Response (200 - Ok)_

```JSON
[
    {
        "id": 1,
        "quantity": 1,
        "UserId": 8,
        "ProductId": 5,
        "isPaid": false,
        "Product": {
            "id": 5,
            "name": "COMME DES GARCONS ‘PLAY’ X CONVERSE CT ALL-STAR 70S HIGH BLACK”",
            "image_url": "https://807garage.com/wp-content/uploads/2020/02/3-Comme-des-Garcons-Play-x-Converse-CT-All-Star-70S-High-BLACK%E2%80%9D.jpg",
            "price": 3199000,
            "stock": 1,
            "category": "Shoes"
        }
    }
]
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### POST /carts/:productId

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request Params_

```JSON
{
    "productId": "<inputted request params>"
}
```

_Request currentUser_

```JSON
{
    "id": "current user id",
    "email": "current user email",
    "role": "current user role"
}
```

_Response (200 - Ok)_

```JSON
{
    "id": 25,
    "quantity": 2,
    "UserId": 8,
    "ProductId": 5,
    "isPaid": false
}
```

_Response (201 - Created)_

```JSON
{
    "id": 25,
    "quantity": 1,
    "UserId": 8,
    "ProductId": 5,
    "isPaid": false
}
```

_Response (400 - Bad Request)_

```JSON
{
    "message": "Cannot add product to your cart, this product is out of stock!"
}

OR

{
    "message": "Cannot add product to your cart, your quantity needs is higher than this product stock"
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (404 - Not Found)_

```JSON
{
    "message": "Cannot found product with this id"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### DELETE /carts/:id

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request Params_

```JSON
{
    "id": "<inputted request params>"
}
```

_Request currentUser_

```JSON
{
    "id": "current user id",
    "email": "current user email",
    "role": "current user role"
}
```

_Response (200 - Ok)_

```JSON
{
    "message": "Successfully delete product from your cart"
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}

OR

{
    "message": "Cannot delete cart with this id!"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### PATCH /carts/:id

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request Params_

```JSON
{
    "id": "<inputted request params>"
}
```

_Request currentUser_

```JSON
{
    "id": "current user id",
    "email": "current user email",
    "role": "current user role"
}
```

_Response (200 - Ok)_

```JSON
{
    "id": 25,
    "quantity": 1,
    "UserId": 8,
    "ProductId": 5,
    "isPaid": false
}

OR

{
    "message": "Successfully delete product from your cart"
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (404 - Not Found)_

```JSON
{
    "message": "Cannot found product with this id"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### PATCH /checkout

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request Params_

```JSON
not needed
```

_Request currentUser_

```JSON
{
    "id": "current user id",
    "email": "current user email",
    "role": "current user role"
}
```

_Response (200 - Ok)_

```JSON
{
    "message": "Successfully buy all product from your cart"
}
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---

> ### GET /transaction/history

_Request Header_

```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_

```JSON
not needed
```

_Request currentUser_

```JSON
{
    "id": "current user id",
    "email": "current user email",
    "role": "current user role"
}
```

_Response (200 - Ok)_

```JSON
[
    {
        "id": 1,
        "quantity": 1,
        "UserId": 8,
        "ProductId": 5,
        "isPaid": true,
        "Product": {
            "id": 5,
            "name": "COMME DES GARCONS ‘PLAY’ X CONVERSE CT ALL-STAR 70S HIGH BLACK”",
            "image_url": "https://807garage.com/wp-content/uploads/2020/02/3-Comme-des-Garcons-Play-x-Converse-CT-All-Star-70S-High-BLACK%E2%80%9D.jpg",
            "price": 3199000,
            "stock": 1,
            "category": "Shoes"
        }
    }
]
```

_Response (401 - Unauthorized)_

```JSON
{
    "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```

---
