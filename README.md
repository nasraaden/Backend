# WLJ-Backend API Documentation

### Backend Framework

- Node.js and Express 
- Postgres for database

## Endpoints

### Auth Routes

| Method | Endpoint         | Access Control | Description                      |
| ------ | ---------------- | -------------- | -------------------------------- |
| POST   | `/auth/register` | all users      | Register a new user account.     |
| POST   | `/auth/login`    | all users      | Login with a registered account. |


#### Users Routes

| Method | Endpoint                        | Access Control | Description                           |
| ------ | ------------------------------- | -------------- | ------------------------------------- |
| GET    | `/users`                        | all users      | Returns list of all users.            |
| GET    | `/users/:uid`                   | all users      | Returns info for a single user by id. |
| PUT    | `/users/::uid`                  | all users      | Update user's account info by id.     |
| DELETE | `/users/::uid`                  | all users      | Delete user's account by id.          |
| GET    | `/users/::uid/workouts`         | all users      | Returns a list of workouts by user.   |
| GET    | `/users/:uid/reviews/wid`       | all users      | Returns a single workout by user.     |
| POST   | `/users/:uid/add-workout`       | all users      | Post a workout.                       |
| PUT    | `/users/:uid/reviews/:wid`      | all users      | Update a workout by id.               |
| DELETE | `/users/:uid/reviews/:wid`      | all users      | Delete a workout by id.               |

## Data Model

### Users

#### Expects

```
{
    "username": "nasraaden",
    "password": "passwordstring",
}
```

#### Returns
```
{
    "id": 1,
    "username": "nasraaden",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuYXNyYSIsImlhdCI6MTU4NTA2ODAzMSwiZXhwIjoxNTg1MDk2ODMxfQ.szdbRq9uZzvoIw84ka4qelk6ozbIgO8RyQLqtrJ2bqc"
}
```

### Workouts

#### Expects

```
{
	"name":"Arm Cirlces",
	"region": "Biceps and Triceps",
	"reps": 5,
	"weight": 5,
	"date": "12252019",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
	
}
```

#### Returns

```
[
    {
      "id": 10,
      "user_id": 1,
      "name":"Arm Cirlces",
      "region": "Biceps and Triceps",
      "reps": 5,
      "weight": 5,
      "date": "12252019",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
    }
]
```
