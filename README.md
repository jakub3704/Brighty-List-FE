# Brighty List - Front End
### Introduction
Brighty List is a portfolio project that was made for learning purpose.  
This project is for testing purpose only.  

Brighty list is a project that allows users to create list of their task and set reminders for those task.  
User can mark task for auto completion on end date time or manual completion.  
 
Reminders for tasks are send as simple eMails via SendGrid.  
 
Additionally users get eMails when their tasks are overdue (when manual completion is selected).  

Front End API - used technologies:
- java script, html , css,
- nodejs 12.16.1,
- angular - 9.0.5,
- angular-material -  9.1.2,
- ngx-translate - 12.1.2,
- ngx-cookie-service - 3.0.3,
- ngx-material-timepicker - 5.5.1.

### Implemented Functionality
1. Communication with Back End,
2. Signing up new users,
3. Updating user informations such as: nickname, eMail address, password,
4. Deleting account,
5. Reseting user password, sending password reset link to user,
6. User can create/delete/update tasks and reminders for those tasks,
7. Sorting, filtering viewed tasks,
8. Basic cookies, 
9. Language change.

### Set Up
install:  
- nodejs https://nodejs.org/
- npm install -g @angular/cli@9.0.5

install in project folder:  
- ng add @angular/material@9.1.2
- npm clean install @ngx-translate/core@12.1.2 --save
- npm clean install ngx-cookie-service@3.0.3
- npm clean install ngx-material-timepicker@5.5.1 --save 
- npm clean install ng-recaptcha@5.0.0 --save

to run in project directory:  
- ng serve

App is running on http://localhost:4200/  