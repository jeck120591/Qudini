# Qudini Code Test

## The Simple Queue App

The structure of this application is based off directives acting as components handling their own data. The backend is a simple
NodeJS server serving in memory JSON objects.

## Requirements

The application works in the following way:

 - A queue consists of a list of customers.

 - User should be able to add a customer to the queue by entering their name and selecting a product (the reason for them queueing).

 - User should be able to see the list of the queueing customers and served customers.

 - User should be able to serve a customer in the queue.

 - When a customer is served they are displayed in a list of served customers. When the customer is in the served list it should not be possible to remove or serve them again.

 - User should be able to remove a customer from the queue.

 - The list of customers in queue and customers served should be updated to always show the correct status, without refreshing the browser.

Feel free to implement features in your own way, but the general structure of the app should stay the same.

## The API

This is a JSON api:

 - `GET /api/customers`: returns a list of customers

 - `GET /api/customers/served`: returns a list of customers served

 - `POST /api/customer/add`: adds a customer
    - example body: `{name: 'Roger Moore', product: {name: 'Gun repair'}}`

 - `PUT /api/customer/serve`: serves a customer
    - example body: `{id: '71a06844-eca5-46d3-98a0-4a6b8beb1440'}`

 - `DELETE /api/customer/remove`: removes a customer
    - example body: `{id: '71a06844-eca5-46d3-98a0-4a6b8beb1440'}`

## The Mission

 1. As you can see now the app fails horribly! Can you help find the bug and fix it for us?

 2. That ```<add-customer>``` component does not seem to actually do anything. Can you implement this feature? The user is supposed to add a customer with name and product. You can find the base in the Customer.js file.

 3. Have a look at the ```<customer>``` component it's missing an action to serve the customer. Can you do this?

 4. QA time! We'd want to make absolutely sure that all the requirements are implemented correctly, are they?

 5. Bonus: The look is... a bit too bare for our taste, can you add some styling please? Feel free to improvise here but we'd like it to be in SASS.

 6. Bonus: We'd love to really optimize the page load speed, ideally we'd only want to serve one js file. Is this something you can do?

## Ready, get set - GO!

 - Install the app: `npm install`

 - Start the server: `npm start`

App is at http://127.0.0.1:1337, good luck!
