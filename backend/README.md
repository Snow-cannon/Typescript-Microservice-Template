# Typescript Express.js Template

This is a template for a typescript express.js server using ES6 modules, and webpack for bundling.

## Docker

The template has Docker capabilities build in. Run ```docker-compose up --build``` to run and build the containers. The template also has a mongodb instance in the docker-compose file.

## Mongodb

There is a demo instance of mongodb in the docker-compose and in the index.ts file. This is for making it easier to start working with mongodb in the backend.

## Scripts

Below are the scripts from the project.json

```json
"scripts": {
    "build": "webpack",
    "start": "tsx dist/bundle.js",
    "dev": "tsx watch src/index.ts"
},
```

Dev backend is run with `npm run dev`. Updates as you save using tsx watch.

To build the project, run `npm run build`. This uses webpack to bundle it into a single .js file called `bundle.js` which you can run in the start script.

To test the build, run `npm start`.

## Editing

To add to the template, `src/index.ts` is the entrypoint for the backend. Use that to start creating your application!

## Formatters

This template currently supports prettier using the `.prettierrc` configuration file

## TODO

A short list of things to continue adding:

- Add a testing framework

- Add husky for improved github hook options

- Automatic document generation for API endpoints