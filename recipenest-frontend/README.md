# RecipeNest Frontend

This is the React frontend for the RecipeNest recipe-sharing platform.

## Pages

| Route             | Page              | Description                                                          |
| ----------------- | ----------------- | -------------------------------------------------------------------- |
| `/`               | Home              | Landing page with welcome banner and links to the main areas.        |
| `/chefs`          | Chefs List        | Public list of every chef with a brief description and avatar.       |
| `/chefs/:id`      | Chef Profile      | Individual chef profile with picture, biography, and their recipes.  |
| `/recipes`        | All Recipes       | Public read-only list of every recipe on the platform.               |
| `/dashboard`      | Chef Dashboard    | Chef-only area to manage profile and recipes (chef-picker at top).   |

## Available Scripts

In the project directory you can run:

### `npm install`

Installs all the dependencies the first time you clone the project.

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
The page reloads automatically when you save.

### `npm run build`

Builds the app for production into the `build` folder.

### `npm test`

Launches the test runner.

## Backend

This frontend talks to the `RecipeNestAPI` ASP.NET Core project at
`http://localhost:5236/api`. Make sure that project is running before
opening the frontend.

The base URL is defined in a single place (`src/api.js`) so you can
change it if your backend uses a different port.
