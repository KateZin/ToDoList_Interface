# todo_list_interface

# Application description
The application is an interface of TODO List application.  
My ToDo List is a simple way to keep all your task and notes in one place. 
You can keep notes, add task with specific tag and sort all tasks by date and tag.

## The manual for deploying and configuring the application locally

1. Clone the application from GitHub on your local machine
2. It is necessary that the backend applications is running (backend is running on the 8080 port and frontend on the 8081)
3. Enter "vue-cli-service serve"
4. Go to browser via link in terminal
5. All done! You are in can use your ToDO

## Languages and frameworks
The application is written on VueJs using framework Vuetify

## Current version
- I've added button for user authorization using Google account 
- Added tasks show mode: list and cards. To switch the mode, you can press switch button in the Show All Tasks page.
- Added dialog window to edit the task

## Plans 
- Make edit button clickable. At the moment it doesn't send a request (axios error)
- Make login/logout button more beautiful
- Arrange task layout in list of cards