# fschat-app
A chat application that consists of 2 parts:
 - Backend server based on socket.io [fschat-server](https://github.com/ezisezis/fschat-server);
 - React-based frontend (this repo)

It also uses [prettier](https://prettier.io/) for code formatting and [ant design](https://ant.design/) for UI and reusable react components. It is based on [create-react-app](https://github.com/facebook/create-react-app/)
### Installation

First of all, you will need to install the necessary modules with yarn:
```
yarn install
```
or with npm:
```
npm install
```
To run the app, just do:
```
yarn start
```
Or if you want to build it instead, do:
```
yarn build
```
And to serve the built version, do:
```
yarn serve
```

There is also a configuration file where you can change the socket settings, it defaults to values so that it runs with the default values from the [fschat-server](https://github.com/ezisezis/fschat-server). You can also change the maximum length of messages being sent.

### Future work
 - Add password field for auth;
 - When user authenticated, show chat straight away after refresh;
 - Add feature "user is typing...";
 - Add a window displaying all active users;
 - Use secured socket connection (WSS);
 - Reduce bundle size;
 - Add tests;

