# Argonaut UI

The react.js front-end for [Argonaut](https://github.com/qubbit/argonaut)

Throughout the rest of this documentation, the elixir app Argonaut is going to be referred as the *API* or *backend*.

### How to run:

First make sure the API is running, and then:

```
yarn install
npm start
```

### Read-only API:

You can access reservation and teams data by using an API access token. This token can be accessed through your user profile page. This permanent token lets you access JSON data using your favorite HTTP client. You may regenerate a new token if you think your current one is compromised. Example usage:

**Get teams (endpoint allows pagination):**

```
https://theargonaut-api.herokuapp.com/api/readonly/teams?token=5fa54ca12f3912990fd6e0a2e7ef587a2cda569a9cad0a5a1adb73b20007bb64
```

**Get all the reservations for a team with an id of 1:**

```
https://theargonaut-api.herokuapp.com/api/readonly/teams/1/reservations/?token=5fa54ca12f3912990fd6e0a2e7ef587a2cda569a9cad0a5a1adb73b20007bb64
```

Here is a complete Ruby script that consumes the JSON data from the above endpoints and prints some information:

```ruby
require 'uri'
require 'openssl'
require 'net/http'
require 'json'

# replace this token with your own
API_TOKEN = "5fa54ca12f3912990fd6e0a2e7ef587a2cda569a9cad0a5a1adb73b20007bb64".freeze

def api_data(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Get.new(uri)

  response = http.request(request)
  JSON(response.read_body)
end

# takes an array of hashes and pretty prints them
def pretty_print_table(data)
  data.each do |d|
    longest_key = d.keys.max_by(&:length)
    d.each do |key, value|
      printf "%-#{longest_key.length}s %s\n", key, value
    end
    puts
  end
  puts
end

teams_endpoint = URI("https://theargonaut-api.herokuapp.com/api/readonly/teams?token=#{API_TOKEN}")
reservations_endpoint = URI("https://theargonaut-api.herokuapp.com/api/readonly/teams/1/reservations?token=#{API_TOKEN}")

teams_data = api_data(teams_endpoint)["data"]

puts "Teams\n-----"

pretty_print_table(teams_data)

puts "Reservations\n------------"

reservation_data = api_data(reservations_endpoint)

puts "#{reservation_data["reservations"].count} reservations"
puts "#{reservation_data["applications"].count} applications"
puts "#{reservation_data["environments"].count} environments"
```

The output produced by the script above would look something like this:

```
Teams
-----
name        EPA
id          1
description "We make a damn fine plumbing." -Mike Lustig

name        Integrations
id          2
description EPA integrate all things!

Reservations
------------
2 reservations
15 applications
4 environments
```

### Deployment

In a production environment you need to whitelist your front-end app's URL so it can connect to the backend using websockets. Grep for `WS_ALLOWED_ORIGINS` in the backend app source.

#### Heroku
You can deploy the app to heroku by first adding the react-build-pack:

```
heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git
```

This will use the `static.json` file to set config parameters for the heroku nginx instance among other things. Please refer to the [heroku static build pack](https://github.com/heroku/heroku-buildpack-static) for more details on the features of `static.json` file.

#### Precompiled App
You can also deploy all the static compiled assets to a server and then connect to the API.

