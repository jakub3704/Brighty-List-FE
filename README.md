# Bright List - Front End
Bright List is a portfolio project that was made for learning purpose.
This project is for testing purpose only.

Front End API - used technologies:
    - java script, html , css,
    - nodejs 12.16.1,
    - angular - 9.0.5,
    - angular-material -  9.1.2,
    - ngx-translate - 12.1.2,
    - ngx-cookie-service - 3.0.3,
    - ngx-material-timepicker - 5.5.1.
  
App is running on http://localhost:4200/  

# Introduction
Bright list is a project that alows users to create list of their task and 
set reminders for those task. 
User can mark task for autocompletition on end date time or manual completion.

Reminders for tasks are send as simple e-Mails via SendGrid.

Additionaly users get e-mails when their tasks are overdue (when manual completition is selected).

# Implemented Functionality
1. Comunication with Back End,
2. Signing up new users,
3. Updating user informations such as: nickname, e-Mail adress, password,
4. Deleting account,
5. Reseting user password, sending password reset link to user,
6. User can create/delete/update tasks and reminders for those tasks,
7. Sorting, filtering viewed tasks,
8. Basic cookies, 
9. Language change.

# Set Up
install:
- nodejs https://nodejs.org/
- npm install -g @angular/cli

install in project folder:
- ng add @angular/material
- npm install @ngx-translate/core --save=
- npm install ngx-cookie-service
- npm install --save ngx-material-timepicker

to run in project directory:
- ng serve