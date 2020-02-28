# Metro Transit Bus Tracker

Live version: buses.mpls.app

Built originally to display bus arrival times for a predefined set of locations. Subsequently added an authenticated state in which a user can enter and save their own bus stop locations as well as their own Metro Transit Go-To card number that is used to retrieve and display that card’s current balance. While Metro Transit does provide an API for arrival times by stop ID, Metro Transit does not provide an endpoint for a Go-To card balance or stop location information (such as the intersection of the stop) so instead the information is fetched programmatically by scraping the Metro Transit website.

Run `npm run server` in `./` directory and `npm run start` in `./client` to begin development environment.