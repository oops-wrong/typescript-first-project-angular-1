# Front-end part of shop with Angular 1.5, Typescript 2.0 and Webpack 1.13

This project was created with the aim to training of Typescript develop!

I faced many challenges during development by Webpack and Typescript. This project can be useful to you to solve the major problems if you decide to use a stack Typescript and Angular plus Webpack building.

Fork of [first-project-angular-1](https://github.com/oops-wrong/first-project-angular-1).

## Installation

1. Install dependencies `npm install`
2. Build project

## Building opportunities

* Run development server on port 9000 writing to memory `npm run serv`
* Run watcher writing to disc `npm run watch`
* Build production version `npm run production`

### Development with node server

Server works on [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html), writes to memory.
Building is fast with this opportunity due to memory writing and autoreloading.
NOTE: catalog /dist/ will be clean and not consistent after server working. You can use production building for writing to disc.

### Development with watcher

You can use any server for development with watcher opportunity. For example, simple NGINX configuration places in /config/. This configuration works with any simple SPA including Angular 1.
Browser autoreloading works with watcher as well.

### Production building

Production version is different from development the presence of compression and hash in naming and lack of sourcemaps.

License "MIT".