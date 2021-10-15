# Node JS Starter with Typescript

Backend boilerplate with sample controller. Currently without test examples.

## Pre-start

Before doing anything, make sure to install all necessary dependencies and clone environment example file.
To do this run in terminal `yarn` followed by `cp example.env .env`. Now you are ready to get started.

## Available scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode. Default port is 3000 if not stated in `.env` otherwise. 

### `yarn start`

Build and runs the app in the production mode. Default port is 3000 if not stated in `.env` otherwise. 

### `yarn build`

Builds the app for production to the `build` folder. Note: it doesn't run the app. Use some kind of node process runner to run it.

## Predefined services: 

- App (main Application service)
- Auth (with basic encrypting and hashing functionality)
- Email (standalone basic email service using nodemailer)
