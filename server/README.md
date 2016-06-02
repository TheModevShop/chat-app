# Setup and Run

Install dependencies

```sh
$ npm install -g nodemon
$ npm install -g node-inspector
$ npm install
```

Start MongoDB

```sh
$ mongod
```

Add Fake Data
Use Robomongo and make sure all collections for tang have been dropped for first run

```sh
$ npm run setup
```

Start Server

```sh
$ npm run dev
```

# API

Routes requiring token can pass the token through headers x-access-token

## /authenticate

**POST** - Gets access token
* email - required
* password - required

## /gyms

**POST** - Creates new Gym (Needs admin auth)
* name - required
* description
* street - required
* state - required
* zipcode - required
* phone
* email

**GET** - Returns all Gyms
* limit
* offset

## /gyms/:id

**GET** - Returns Specific Gym

**PUT** - Update Specific Gym
* name
* description
* street
* state
* zipcode
* phone
* email

## /gyms/:id/sessions

**POST** - Add New Session to a Gym
* name - required
* date (YYYY-MM-DD) - required
* start (00:00) - required
* end (00:00) - required
* description
* capacity - default 1
* instructorId - required

**GET** - Get All Sessions for Gym
* limit
* offset
* startDate
* endDate

## /gyms/:id/instructors

**GET** - Gets all instructors for a Gym
* limit (defualt: 10)
* offset (default: 0)

## /gyms/:id/students

**GET** - Gets all students for a Gym
* limit (defualt: 10)
* offset (default: 0)

## /gyms/:GymId/instructors/:InstructorId

**GET** - Gets instructors sessions for Gym
* startDate (default: today)
* endDate (default: 3 months from today)

## /gyms/:GymId/sessions/:SessionId

**GET** - Get Gyms Session Details

**PUT** - Update Session (Note this does not add a User to the Session)
* name
* date (YYYY-MM-DD)
* start (00:00)
* end (00:00)
* description
* capacity
* instructorId

## /me

**GET** - Returns User (Token required)

**PUT** - Updates User (Token required)
* name
* email
* gym

## /me/sessions

**GET** - Gets a Users Sessions (Token required)
* limit
* offset

**PUT** - Add User to Session (Token required)
* sessionId

## /users

**POST** - Creates new User
* name - required
* email - required
* password - required
* gym (Use Gym ID) - optional
* roles - optional (default: user)

**GET** - Gets all Users (Needs admin auth)

## /users/:id

**GET** - Gets Specific User

## /roles

**POST** - Add Role
* name - required

**GET** - Get All Roles

## /forgot - Forgot Password

**POST** - Sends reset email
* email - required

1) In App present the user with a form for email
2) POST to /forgot with that email
3) Upon success tell them email has been sent
4) User receives email with token in URL that takes them to reset page
5) User puts in new password if token is still valid and it resets their password and says thank you.
