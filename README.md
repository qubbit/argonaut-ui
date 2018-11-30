# ⎈ Argonaut UI

The react.js front-end for [Argonaut](https://github.com/qubbit/argonaut)

### Development

First make sure the [API](https://github.com/qubbit/argonaut) is running on http://localhost:4000, then:

```
yarn install
yarn start
```

### Deployment

`yarn build` to build the production assets and serve them using your favorite web server.

In a production environment you need to whitelist your front-end app's URL so it can connect to the backend using websockets. Search for `WS_ALLOWED_ORIGINS` in the backend app source.

### Contributors

Following contributors have helped in development of Argonaut:

* Gopal Adhikari (Lead Developer)
* Alan Baird (@abaird)
* Chris Doggett (@DoggettCK)
* Chris Hutchinson (@chutch1994)
* Matt Bramson (@mbramson)
* Mike Lustig (@Anachronomer)

