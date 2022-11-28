# TO DO Calendar

This project contains either backend and frontend part

## Docker
Still in progress...

## Backend
Node JS, Typescript & SQLite as a database

Use these commands to run server:
### `npm run dev`, `tsc -> npm start`

### Implemented
- basic http server without additional frameworks or packages
- router to handle GET, POST, PUT, DELETE request and OPTIONS for CORS preflight
- two entity services: ProfileService and TaskService
- ProfileService: implemented GET and POST requests
- TaskService: implemented GET, POST, PUT, DELETE requests
- DB requests use SQL, not sql builder
- created a script to init a db if not exists
- REST endpoints (like `/task/:id`)

### Features in progress
- session (currently userId is hardcoded)
- transaction control
- db attachments

## Frontend
React JS (w/o Typescript)

Use this command to start react app:
### `npm start`

### Implemented
- based on CRA (create-react-app)
- calendar page
- holidays are marked according to isDayOff API
- tasks can be added on the calendar page
- tasks can be added, modified, deleted
- RequestService to fetch GET/POST/PUT/DELETE requests

### Features in progress
- home page (currently is empty)
- session
- tasks statuses (not handled yet)
- design improvements
- attachments
