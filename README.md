# Pipedrive Activity Creator

This project allows you to create and manage activities (jobs) within the Pipedrive CRM using its API. It is designed to help users quickly create activities from a form on a webpage and submit them directly to their Pipedrive account.

## Features

- Create Pipedrive activities using a web form.
- Calculates job duration based on start and end times.
- Automatically clears the form after submission.
- Integrates with the Pipedrive API.

## Prerequisites

To run this project, you will need:

- A Pipedrive account.
- An API key from your Pipedrive account.
- A working web server to host the HTML/JavaScript files.

### How to Obtain Your API Key

1. Log in to your Pipedrive account.
2. Navigate to your account settings.
3. Select the **API** tab from the sidebar.
4. Copy your **API key**.

## Installation

1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your preferred text editor.
3. Insert your Pipedrive API key in the script.

```js
const API_KEY = "your_pipedrive_api_key_here";
