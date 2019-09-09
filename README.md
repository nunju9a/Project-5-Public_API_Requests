# Public API Requests
- Received grade of "Exceeds Expectations"

For this project, I built an app for a fictionalized Project Athena - a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

I used the Random User Generator API (https://randomuser.me/) to grab information for 24 random “employees,” and used that data to build a prototype for a Project Athena employee directory.

I requested a JSON object from the API (using jQuery) and parsed the data so that 24 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.

- Dynamically added search feature to filter through employees.  Employees can be searched by either name, email, city, or state.
- Modal toggle added to move between modal windows using prev and next buttons.
- Page automatically makes new API request on bottom scroll, adding on to existing list of employees


- Live Link: https://nunju9a.github.io/Project-5-Public_API_Requests/
