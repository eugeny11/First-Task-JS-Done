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

Save the changes and host the index.html file on a local or remote web server.

## Usage
1. Navigate to the form in your browser (wherever you've hosted it).
2. Fill out the required details:
- First Name and Last Name
- Phone and Email
- Job Type (Select from dropdown)
- Start Date and Start/End Time
- Address
3 Click Submit to send the job data to Pipedrive.
4. The form will automatically clear after submission, and you'll see a confirmation message.
5. You can check the newly created job in your Pipedrive account under Activities.

## Field Details

- Job Type: Select the type of job from the dropdown.
- Start Date/Time: Choose the date and time when the job starts.
- End Time: Specify when the job ends (used to calculate the duration).
- Address: The location where the job will take place.

## API Parameters

- subject: The title of the activity, which is built using the First and Last Name.
- due_date: The start date of the activity (YYYY-MM-DD).
- duration: Automatically calculated from the start and end times.
- location: The address provided in the form.
- type: Selected job type.
- note: The email address is included as a note in the activity.

## Error Handling

- If there are any issues while sending the data to Pipedrive (e.g., invalid fields), an error message will be displayed.
- Check the browser console for detailed error information.

## Troubleshooting

- 400 Bad Request: Ensure all required fields are filled and that you have a valid Pipedrive API key.
- Success but not visible in Pipedrive: Double-check the Activities section in your Pipedrive dashboard.

## Contributing

1. Fork this repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add your feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new Pull Request.
