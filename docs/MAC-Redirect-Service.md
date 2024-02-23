# MAC Redirect Service
## Overview
MAC Redirect Service is an innovative solution designed to facilitate payment to creators for their advertising efforts on our platform. This service integrates a fraud prevention mechanism by capturing the IP address of users who click on links, ensuring authenticity and transparency. Furthermore, it includes a redirect service to seamlessly guide users to their intended destination.

## Features
- IP Address Tracking: Captures the IP address of the user clicking the link to prevent fraud.
- Automated Payments: Pays creators automatically for their advertising contributions.
- Redirect Service: Efficiently redirects users to the appropriate destination upon link click.
- Fraud Prevention: Ensures genuine interactions by validating each click.

## API Endpoints
- Clicks API: https://mac-backend-six.vercel.app/clicks
- References API: https://mac-backend-six.vercel.app/references

## Usage
The service can be integrated into your platform by importing the required functions from the provided codebase. The main functionalities include:

- getLinkByReference(reference): Retrieves the link associated with a given reference.
-newIpClick(ip, reference): Checks if the IP has already clicked the reference.
- thousandClicks(reference): Determines if there are at least a thousand unpaid clicks.
- resetUnpaidCount(): Resets the count of unpaid clicks.
- PayPerClick(req): Processes payment per click after validating conditions.
- makePayment(): Handles the payment transaction process.
- addNewClick(ip, reference): Records a new click with the provided IP and reference.

## Dependencies
- starknet: For interacting with StarkNet contracts.
- fetch: For making HTTP requests to the API endpoints.
- PayPerClick.json: A JSON file located in the abis folder, containing the ABI for the PayPerClick contract.

