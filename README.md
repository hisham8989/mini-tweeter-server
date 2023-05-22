## Demo

https://hisham-mini-twitter.netlify.app/

Backend is hosted saperately




## API Reference

#### URL = https://mini-twitter-m7q8.onrender.com

#### Create User

```http
  POST /api/v1/users/create
```

| Body (application/json) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**. |
| `password`| `string` | **Required**. |


#### Login

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**.|
| `password`| `string` | **Required**.|

#### Get User By Id

```http
  GET /api/v1/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`| `ObjectId` | **Required**.|


#### create a tweet

```http
  POST /api/v1/tweets/create/:userId
```

| Body (application/json) | params | Type     | Description                       |
| :-------- | :-------| :------- | :-------------------------------- |
| `content`| `-` | `string` | **Required**.|
| `-` | `userId` | `ObjectId` | **Required**.|

#### fetch all tweets

```http
  GET /api/v1/tweets
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`| `ObjectId` | **Optional**.|


#### fetch all tweets by user's following

```http
  GET /api/v1/tweets/:userId/following
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`| `ObjectId` | **Required**.|


#### delete a tweet

```http
  DELETE /api/v1/tweets/:tweetId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tweetId`| `ObjectId` | **Required**.|


#### follow a user

```http
  POST /api/v1/users/follow/:toFollowId/user/:userId"
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `toFollowId`| `ObjectId` | **Required**.|
| `userId`| `ObjectId` | **Required**.|


#### unfollow a user

```http
  POST /api/v1/users/unfollow/:toUnFollowId/user/:userId"
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `toUnFollowId`| `ObjectId` | **Required**.|
| `userId`| `ObjectId` | **Required**.|
