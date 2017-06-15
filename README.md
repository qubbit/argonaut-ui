# Argonaut UI

The react.js front-end for [Argonaut](https://github.com/qubbit/argonaut)

### How to run:

First make sure the API is running, and then:

```
yarn install
npm start
```
### Read-only API:

You can access reservation and teams data by using an API access token. This token can be accessed through your user profile page. This permanent token lets you access JSON data using your favorite HTTP client. You may regenerate a new token if you think your current one is compromised. Example usage:

Note: these examples use a fake domain name and an example token.

**Get teams (endpoint allows pagination):**

```
https://argonaut.io/api/readonly/teams?token=5fa54ca12f3912990fd6e0a2e7ef587a2cda569a9cad0a5a1adb73b20007bb64
```

**Get all the reservations for a team with an id of 1:**

```
https://argonaut.io/api/readonly/teams/1/reservations/?token=5fa54ca12f3912990fd6e0a2e7ef587a2cda569a9cad0a5a1adb73b20007bb64
```


### Deployment

#### Heroku
You can deploy the app to heroku by adding the react-build-pack:

```
heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git
```

This will use the `static.json` file to set config parameters for the heroku nginx instance among other thing. Please refer to the heroku static build pack for more details on the features of `static.json` file.

### Precompiled App
You can also deploy all the static compiled assets to server

