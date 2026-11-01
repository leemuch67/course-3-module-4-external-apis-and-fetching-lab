# Lab: External APIs and Fetching — Weather Alerts

A browser app that fetches active National Weather Service alerts for a two-letter U.S. state abbreviation and displays the alert summary and headlines.

## Set up and run

1. Fork and clone this repository, then open the project folder.
2. Install dependencies with `npm install`.
3. Open `index.html` in a browser, or run it from a local web server.
4. Run `npm test` to execute the Jest suite.

## App behavior

- Requests `https://api.weather.gov/alerts/active?area={STATE}`.
- Trims and uppercases the input, requires a two-letter abbreviation, and clears the field when submitted.
- Shows the API response title and number of alerts, then lists each available `properties.headline`.
- Replaces previous results for each request and shows network/API errors in the error panel.
- Clears and hides the error panel after a successful request.

## Testing and maintenance

The Jest tests mock API responses and cover the request URL, rendered title/count/headlines, input clearing, failed requests, and recovery after an error. Run them before committing changes. Keep changes in focused commits and push the final passing code to your fork before submitting.

See the [National Weather Service API documentation](https://www.weather.gov/documentation/services-web-api) for endpoint details and service guidance.
