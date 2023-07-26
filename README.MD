Architecture of project:-
1. It is divided in two parts :- client and server

Client :- 
1. index.js is the root directory from which App component is rendering
2. In App, we have Home and Data.
3. Home is default component which will render on visiting the page- We are fetching the data from API and saving it in backend(MongoDB). Two API has been used onc for fetching the data for stocks and another for saving it in database.
4. Clicking on submit button will take us to Data component, where we can see the stocks results as per the criteria we put on Home componenet (form) using GET API

Server :- 
1. Starting point is app.js file, where we have set-up out server,routes,mongoDB and controller.
2. .env file contains the URL link for mongo Atlas.
3. In Models folder we have the Schema set-up.
4. app.js contaisn two endpoints :- to get the data and to post the data.

What can be done further to improve the application:-
1. We can use JWT token to authenticate the user.
2. Can add more fucntionalities such as, getting multiple data of stocks instead of one.
3. We can add middlewares.
