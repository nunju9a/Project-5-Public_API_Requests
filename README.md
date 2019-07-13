# Project-5_Public-API-Requests

For this project, I built an app for a fictional company called Awesome Startup - a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

I used the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees,” and used that data to build a prototype for an Awesome Startup employee directory.

I requested a JSON object from the API (using jQuery) and parsed the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.

Dynamically added search feature to filter through employees.  Employees can be searched by either name, email, city, or state.
