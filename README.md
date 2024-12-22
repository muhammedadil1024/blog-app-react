# Blog Website using React Js and Firebase

![Demo App](/public/demo.png)

A Blog application using Frontend as React Js and Firebase Backend for Database and CRUD operations.

### Features

* Authentication Using Firebase Firestore Database.
* User Can Register new Account, Login and Logout.
* Authenticated User Can Create new Blog posts.
* All Users Can Read Blog posts and Authenticated User can see and read their own Blog posts.
* Authenticated User Can Update or Edit their own Blog posts.
* Authenticated User Can Delete their own Blog posts from Database Collection.

## Installation and Setup Locally

To install and run this project Locally: 

* Download Zip or Clone the repository
```shell
    gh repo clone muhammedadil1024/blog-app-react
```
```shell
    cd blog-app-react
```
* Install all dependencies:
```js
    npm install
```
* To work with firebase You need to Create a Project in Firebase Console.
* Setup .env file:
    - Create a .env file
 ```js
    REACT_APP_API_KEY=your_firebase_apiKey
    REACT_APP_AUTH_DOMAIN=your_firebase_authDomain
    REACT_APP_PROJECT_ID=your_firebase_projectId
    REACT_APP_STORAGE_BUCKET=your_firebase_storageBucket
    REACT_APP_MESSAGING_SENDER_ID=your_firebase_messagingSenderId
    REACT_APP_APP_ID=your_firebase_appId
```
*  Start the app"
```js
    npm start
```