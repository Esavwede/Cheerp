

Create User 

Endpoint: localhost:3000/api/v1/signup
Method: POST 
Body 

{email, phone_number, password }

response 
{
    "success": true,
    "message": "Your account has been created successfully",
    "user": {
        "userId": "2eab020b-5e31-433b-b278-978905a21fb0",
        "messagesIds": [],
        "email": "ussss22ssdsss@gmail.com",
        "phone_number": "0s2ssssss393",
        "_id": "64a6ed5a55ecb0e06b252930",
        "createdAt": "2023-07-06T16:35:38.611Z",
        "updatedAt": "2023-07-06T16:35:38.611Z",
        "__v": 0
    }
}



SIGNIN 

Endpoint: localhost:3000/api/v1/signin
Method: POST 
Body 

{ phone_number, password }

response 
{
    "success": true,
    "message": "You have successfully logged in",
    "user": {
        "userId": "02a035b5-d9fa-439b-b4d8-43f5f98caeb8",
        "messagesIds": [],
        "email": "user101@gmail.com",
        "phone_number": "123"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmEwMzViNS1kOWZhLTQzOWItYjRkOC00M2Y1Zjk4Y2FlYjgiLCJtZXNzYWdlc0lkcyI6W10sImVtYWlsIjoidXNlcjEwMUBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIxMjMiLCJpYXQiOjE2ODg2NjMwMjYsImV4cCI6MTY4ODY2MzYyNn0.GWxHWrXhSwPyFjhNGQGq9lE_EsOYOnn1GWHZe8MevwQ"
}




Send Message 

EndPoint: localhost:3000/api/v1/users/id/messages 
Method: PATCH 

Request Body If initial message 
{
    "receiverId":"2eab020b-5e31-433b-b278-978905a21fb0",
    "textContent":"new chat with two users ",
    "messageId":"null"
}


Request Body If not initial message 
{
    "receiverId":"2eab020b-5e31-433b-b278-978905a21fb0",
    "textContent":"new chat with two users ",
    "messageId":"messageIdhere"
}


Response 

{
    "success": true,
    "message": " New Message Sent "
}



Get messages Preview

Endpoint: http://localhost:3000/api/v1/users/id/messages/
Method: Get 



Response 
{
	"userMessagesPreview": [
		{
			"_id": "64a7093421d7f6676fbaf406",
			"messageId": "07cd3c21-374e-4e81-a1cd-d94a3d4f1092",
			"lastMessagePreview": "new chat with two users "
		}
	]
}



Get Messsage 

Endpoint: http://localhost:3000/api/v1/users/id/messages/messageId

Method: GET 

Response 

{
	"userMessagesPreview": {
		"_id": "64a7093421d7f6676fbaf406",
		"messages": [
			{
				"messageId": "null",
				"textContent": "new chat with two users ",
				"senderId": "02a035b5-d9fa-439b-b4d8-43f5f98caeb8",
				"receiverId": "2eab020b-5e31-433b-b278-978905a21fb0",
				"_id": "64a709348359873a17ca165c"
			},
			{
				"messageId": "07cd3c21-374e-4e81-a1cd-d94a3d4f1092",
				"textContent": "new chat with two users ",
				"senderId": "02a035b5-d9fa-439b-b4d8-43f5f98caeb8",
				"receiverId": "2eab020b-5e31-433b-b278-978905a21fb0",
				"_id": "64a71718004e8f3eecc4f333"
			}
		]
	}
}

Delete Message 

Endpoint: http://localhost:3000/api/v1/users/:id/messages/:usersMessageId/message/:messageId

Method: DELETE 

Response 

{
	"message": " Message Deleted Successfully "
}



User Profile 


Get User Profile 

Endpoint: http://localhost:3000/api/v1/users/:id/profiles

Method: GET 

Response 

{
	"message": "User profile fetched ",
	"userProfile": {
		"displayName": "User",
		"_id": "64a5086a3cd6ab5e2ca6fea8",
		"bio": "refreshed",
		"userId": "64a49a0f8076a4dfb4f06fb1"
	}
}


Update User Profile 

ENDPOINT: Endpoint: http://localhost:3000/api/v1/users/:id/profiles
Method: PATCH

Response 

{
	"message": " user profile edited "
}
