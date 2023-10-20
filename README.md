# Cheerp messaging API 

## Overview

This messaging API allows users to chat and receive messages from other users. Users can

- Signup
- Signin with email 
- Signin with Google 
- Send a message 
- Get messages all messages sent and received
- Get the content of a specific message 
- Delete message 


## Getting Started 


### Installations

This application runs on Node Js version v18 ( to download, go to: [https://nodejs.org/en/download/current](https://nodejs.org/en/download/current)). 

This application also uses mongodb version 7. 

### Running the project locally 

#### **You can set up this project locally on your PC by running the following commands**:

1. Clone this project (`git clone https://github.com/Esavwede/Cheerp`)
2. Run npm install to download all dependencies
3. Create your .env file. ** Checkout the **sampleEnv.txt** file in the root directory to setup your .env file.
    The **sampleEnv.txt** file shows you how to fill your .env file 
4. Run the following command to start the application 
    > npm start 
5. To run the application in developer mode using nodemon, run the command
    > npm run start:dev 


## Contribution Guidelines

1. Fork this repository
2. Clone your forked repository
3. Create a branch and write your codes
4. Commit and push
5. Star this repository
6. Wait for the pull request to merge

### contributors

- [Oluwaseun Janet Odueso](https://github.com/oluwaseun-odueso)
- [Esavwede Ogagaoghene Emmanuel](https://github.com/Esavwede)

### License

This project is licensed under the MIT License.

## Using the API

##### To use the chat api, simply make requests to the specified endpoints below. 


## Endpoints 

### Create a new User 

#### **DESCRIPTION**: Creates a new user 

#### **ENDPOINT**: localhost:3000/api/v1/auth/signup

#### **METHOD**: Post 

#### **REQUEST BODY**

```javascript
{
"firstname":"firstname",
"lastname":"lastname",
"email":"email@gmail.com",
"password":"password"
}
```

#### **RESPONSE** 

```javascript 
{
	"success": true,
	"message": "user signedup successfully ",
	"user": {
		"userId": "670f442f-7c37-4885-bd54-20b935d86c87",
		"firstname": "firstname",
		"lastname": "lastname",
		"email": "email8@gmail.com"
	}
}
``` 


###  Signin
#### **DESCRIPTION**: Takes an email and a password to signin user 

#### **ENDPOINT**: localhost:3000/api/v1/auth/signin
### **METHOD**: Post 

#### **REQUEST BODY** 

```javascript
{
	"email":"email@gmail.com",
	"password":"password"
}
```

#### **Response** 

```javascript
{
	"success": true,
	"msg": "signin successful",
	"data": {
		"user": {
			"email": "email@gmail.com",
			"id": "e05f710f-ca1d-4cf6-9acb-427800d025e3",
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImlkIjoiZTA1ZjcxMGYtY2ExZC00Y2Y2LTlhY2ItNDI3ODAwZDAyNWUzIiwiaWF0IjoxNjk3NzkzNjk5LCJleHAiOjE2OTc3OTY2OTl9.WSB3pd0YS0rDBcI_domd_ixcX1aH3z0YWVZ9V0jgHAI"
		}
	}
}
```


### Signin with google
#### **DESCRIPTION**: Allows a user to signin with google profile 

#### **ENDPOINT**: localhost:3000/api/v1/auth/google
#### **METHOD**: Get 

####  **REQUEST BODY**
**none**

### **RESPONSE**
```javascript
{
    "success": true,
    "message": "signin successful",
    "user": {
        "_id": "65324ca123b8d07f2888e318"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNGNhMTIzYjhkMDdmMjg4OGUzMTgiLCJpYXQiOjE2OTc3OTUyMzMsImV4cCI6MTY5Nzc5ODIzM30.A-YdaoD8o6xc-sERGX8tNxTCMebjZerTfonpgK0qXF4"
}
```



### SEND MESSAGE 

#### **DESCRIPTION**: Sends a message to another user 

#### **ENDPOINT**: localhost:3000/api/v1/users/:senderId/messages
#### **METHOD**: Patch


### Headers 

- Authorization 

### Request Body 

```javascript
{
"messageId":"c49b711c-201c-4e64-9022-3863e994ef8d", // existing message Id or null ( not yet messaged )
"receiverId":"0910d789-f178-4bfe-852a-d6bc2c46afa3", // required
"textContent":"Another message to esavwede84@gmail.com" // required 
}
```


### Response 

```javascript
{
	"success": true,
	"message": " New Message Sent "
}
```


### GET ALL MESSAGES FOR A USER  

#### **DESCRIPTION**: Gets all the messages from and to a user

#### **ENDPOINT: localhost:3000/api/v1/users/:id/messages
### **METHOD**: Get  

#### **Headers** 
- Authorization - input jwt token here 


#### Response 
```javascript
{
	"userMessagesPreview": [
		{
			"_id": "653269e474032a386a7fd564",
			"messageId": "c49b711c-201c-4e64-9022-3863e994ef8d",
			"lastMessagePreview": "Another message to user@gmail.com"
		},
		{
			"_id": "65326cc474032a386a7fd6d1",
			"messageId": "427a5686-5b34-47ec-9515-266726065c1b",
			"lastMessagePreview": "Another message to user@gmail.com"
		}
	]
}
```



### GET SPECIFIC USER MESSAGE

#### **DESCRIPTION** : Returns the full content of a message between two users. 

#### **ENDPOINT**: localhost:3000/api/v1/users/:userId/messages/:messageId
#### **METHOD**: Get  

#### Headers 
- Authorization - input jwt token here 


#### Response 
```javascript
{
	"messages": {
		"_id": "653269e474032a386a7fd564",
		"messageId": "c49b711c-201c-4e64-9022-3863e994ef8d",
		"messages": [
			{
				"messageId": "c49b711c-201c-4e64-9022-3863e994ef8d",
				"textContent": "Debug message to esavwede84@gmail.com",
				"senderId": "670f442f-7c37-4885-bd54-20b935d86c87",
				"receiverId": "0910d789-f178-4bfe-852a-d6bc2c46afa3",
				"_id": "653269e457c4a8681d3e0fca"
			},
			{
				"messageId": "c49b711c-201c-4e64-9022-3863e994ef8d",
				"textContent": "Another message to esavwede84@gmail.com",
				"senderId": "670f442f-7c37-4885-bd54-20b935d86c87",
				"receiverId": "0910d789-f178-4bfe-852a-d6bc2c46afa3",
				"_id": "65326a2257c4a8681d3e0fcd"
			},
			{
				"messageId": "c49b711c-201c-4e64-9022-3863e994ef8d",
				"textContent": "Another message to esavwede84@gmail.com",
				"senderId": "670f442f-7c37-4885-bd54-20b935d86c87",
				"receiverId": "0910d789-f178-4bfe-852a-d6bc2c46afa3",
				"_id": "65326aa10fed37aac4ffdb86"
			}
		]
	}
}
```



### DELETE MESSAGE

#### **DESCRIPTION**: Deletes the a message sent by a user in a chat

#### **ENDPOINT**: localhost:3000/api/v1/users/:senderId/messages/:messageId/message/:_id
#### **METHOD**: Delete  

#### Headers 
- Authorization - input jwt here 

#### Request body 
**none** 


#### Response 

```javascript
{
	"message": " Message Deleted Successfully "
}
```