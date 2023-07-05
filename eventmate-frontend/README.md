# eventMate

The main goal of this project was to work as a team to create a full stack Mongo/Express/React/Node stack application. It was our third project on the course and our first time working collaboratively as a group.

See the deployed project here: eventmate.netlify.app/


## Timeframe & Working Team 
The group included Cezary Karwoski-Budd, Michela Bicocchi, Milles Morris and Catherine Nevin. The project gave us the opportunity to contribute as a group, in pairs and individually over the course of a week. 

## Technologies Used
Technologies user throughout the project were:
Trello
Excalidraw
Google Docs
VS Code
React JS
Mongoose
Heroku
MongoDB Atlas


## Brief
One of the aims of this project was to build a fully functioning full stack application against a set of technical requirements. However, the main aim of this project was to work as a team to build this app. We needed to set up a project repo in Github and make frequent commits, pulls and merges. In this way we simulated what it would be like to work in a real life company and hence learned how to work effectively with other people in publishing code and also fixing errors.

The first and most important purpose of this project was to work with peers to build an app. We were required to create a full stack application based on multiple technical requirements, including using React for the frontend and Mongoose, MongoDB and Express in the backend. The project needed to be documented well, using a project repo on Github and committing often, as well as pulling and merging. Working directly with others on the same piece of work, meeting often and fixing errors set us up with essential skills by imitating a real world working experience. 

## Planning

The project began with an essential part of the project: picking a team name. After lots of ideas being thrown around, we eventually decided upon The Full Stack Squad.

The group then went straight into discussions about what the application would include and what kind of user interactions we were hoping for. A document was created in which the team expectations were set. Each member offered up their strengths and shared personal challenges that they wanted to work on. It was agreed that planning, functional code and excellent communication were essential to working as a group for the project. 

We created a collaborative Excalidraw document which could be worked on together in real time and produced wireframes for each page of the application. The document also includes an Entity Relationship Diagram for the Schemas, a data flow diagram between the frontend and backend of the application,  the expected components and user stories.  

### Wireframe

https://excalidraw.com/#room=611b02b78e961aedf070,TQcjd_mak94UCROWp1RbpQ





















### ERD
This is what our Schema looked like before we started building anything.



However, this changed when we started connecting our front end APIs to our back end routes. We realised that the concept of a comment only exists as part of an event. Therefore we decided to get rid of the comments model but keep the schema and have it embedded as part of the Events model.



### Data Flow






### User Stories
AAU, I want to see a list of upcoming events
AAU, I want to see details about an events
AAU, I want to be able to view different amounts of event information based on if I'm logged in or not
AAU, I want to be able to sign up and log in
AAU, I want to be able to delete my account
AAU, I want to have a personal profile page
AAU, I want to access my upcoming events and past events
AAU, I want to be able to confirm if I am attending an event
AAU, I want to like an event
AAU, I want to be able to leave a comment on an event
AAU, I want to be able to delete a comment I have made
AAU, I want to create an event with specific details
AAU, I want to be able to update an event I have created
AAU, I want to see which other users are attending an event
As An App Owner, I want to prevent users not logged in from liking, commenting, creating or confirming if they are attending events

Trello was used as our project management tool and was fundamental in the success of the project. Tickets were initially created for larger tasks and broken down within them. As the project progressed, tasks were added to the ‘to do’ list as the team agreed on what features needed to be added and any bugs that needed fixing. If a team member wanted to focus on a specific task, they could allocate themselves to it. As and when each person completed a task, they would check the group Trello Board and select one of the outstanding tasks. 



Having discussed our strengths and what hurdles each person wanted to overcome, and keeping communication open throughout the week, meant each time a new task was due to be started, we were able to agree on who should take on what and whether it could be group or paired work between a person who was confident in the task, and one who wanted to improve in that area. 




## Build/Code Process

Once the planning was complete and we knew the direction we wanted the project to go in, the project repo was set up as well as individual branches, we could get to work on the code. 

The first thing we wanted to focus on was the basic setting up of the backend with Mongo. The boilerplate, models and seed file were established successfully on day one. Two models were created - user and event - which would be the basis of the database being created. We then split off into two pairs to work on the routes within the application so data could be accessed. KB and I worked together to set up the user routes, and then went on to create and test the user APIs. The events API uses full CRUD, the user API includes full CRUD, though we ended up not using the update route for this one, and the comments API uses CUD. 

From the beginning, the team was committing regularly and reviewing pull requests and merges together to ensure we didn’t face any issues. 

We then set up the frontend with React JS, created the components and their contents. This included forms to create a profile, an event and a comment and buttons which we would add functionality to later. I worked on creating the ProfilePage component, as well as the UserEvent component. I continued to add code to these components throughout the project. 

App.js
    Events
        Single Event
            Comments
                Create Comments
                (Comment)
    Create Event
    Profile
        Single Event
        Upcoming Events
        Past Events
    Login
    Sign In

Authentication was a new concept for all of us and we decided that it would be good practice to complete this piece of work as a group so we could all improve our understanding of the process. The code for creating tokens and local storage was produced which allows the user to create an account. A function retrieves the payload from the token in local storage and decrypts it to give access to the payload information, for example when the programme needs to access the user’s id or username. 

``` js
function getPayloadFromToken() {
  const loadedToken = loadToken()
  if (!loadedToken) {
    return false
  }
  const encryptedPayload = loadedToken.split('.')
  return JSON.parse(window.atob(encryptedPayload[1]))
}
```

Work on the comments took a lot of brain power and ended up being a lengthy process to include all the features we intended. The user can not only create a comment on an event page, but they can also edit and delete any comments they have made, but not other user’s comments. An additional feature that can be found on the application is for the user to choose to become anonymous when they leave a comment on an event. 

``` js
{tokenExp() && <p id="author"> {singleComment.author === `${payload.username}` ?
              (singleComment.hideAuthor ?
                `Anonymous (You)` : `${singleComment.author} (You)`
              ) : (singleComment.hideAuthor ?
                `Anonymous` : singleComment.author
              )
            } </p>}
```

When a user signs up to the webpage, they are prompted to provide a username and password. A section of code which I implemented was ensuring new user account names did not already exist in the database. Initially I had written a longer piece of code which spanned across the SignUp component to the User API, checking for existing names within the database when a user completed the SignUp form. I soon discovered the Mongoose plugin `unique validator` which allowed me to refactor and remove the lengthy piece of code I had written, to replace it with this plugin, in the User Schema. A check for the new username is automatically carried out when the Create User route is called.

The password that is provided is hashed to protect the user’s account. When the user is created, the password is stored in its hashed form. When the user logs in, the password they provide is hashed and compared to the stored hashed password. An additional plug called mongo-hidden in was incorporated for additional security. This means that whenever a user’s data is sent from the backend, the password isn’t included with the data. 

Once an account is created, the user is redirected to the login page, and once logged in, they are redirected to the home page. When the user logs out of their account, the token is cleared from local storage and the user is redirected to the home page. 

The profile page includes a list of events that the current user has attended in the past and their future events. To do this, the code needed to find all events associated with a user ID and fill the state `setUserEvents`.

``` js
function findEventsByUserId() {
    const payload = getPayloadFromToken()
    getAllEventsWithUserId(payload.userId)
      .then((response) => response.json())
      .then((data) => setUserEvents(data.events))
  }
```

The array of events that are now stored in the state are arranged into upcoming and past events, based on the current date. 

``` js
 function upcomingOrPastEvents(array) {
    const now = new Date();
    const upcoming = array.filter((event) => new Date(event.date) >= now);
    const past = array.filter((event) => new Date(event.date) < now);
    return { upcoming, past };
  }
```
The sorted events are assigned to `upcoming` and `past` variables which are used later to style the user profile page. 

Another piece of code I was tasked with was the functionality of the delete account button. This meant linking up the button to the User Route whereby the user would be deleted from the database, as well as clearing local storage and navigating to the homepage on deletion. 

``` js
 function deleteUserProfile() {
    const payload = getPayloadFromToken()
    deleteUser(payload.userId)
      .then(deletedUser => deletedUser.json())
    removeToken()
    navigate('/')
  }
```
A function was needed which adds a user’s ID to an event’s attendees array. It retrieves the user’s ID from a JSON Web Token and checks if that ID is already in the attendees list. If not, it updates the attendees list and the backend with the new event data. This function was created via pair programming. 

``` js
function addUserIdToAttendees() {
    const payloadFromToken = getPayloadFromToken()
    const userId = payloadFromToken.userId
    if (singleEvent.attendees.includes(userId)) {
      return
    } else {
      const attendees = [...singleEvent.attendees, userId]
      const eventData = { ...singleEvent, attendees: attendees }
      updateOneEvent(eventData._id, eventData)
    }
  }
  ```

The final day of the project saw the team finishing up on the styling of the application, tidying up the code and working on deploying the project to Netlify and Heroku.



## Challenges

### Team challenges
Getting used to the Github process was difficult and initially we made mistakes such as swapping branches with uncommitted changes.
Setting up Passport was difficult as we didn’t have any hands-on experience before this project started.
Deployment proved very difficult. We had both our frontend and backend in the same Github repo which made it very difficult to deploy the two independently. 
Getting used to working on code that other people had written and building on top of it so that it maintained the original functionality plus the extra parts added on by you.

### Personal challenges:
Grasping authentication and setting up of local storage. Luckily I had a great team who were always happy to pair programme and share their knowledge which I could learn from. 
Technical issues on the final day with pulling and merging from GitHub. 
The initial piece of code written to ensure a unique username initially worked. However I soon noticed that it only worked the first time an attempt was made, if the user tried a second time, an undefined username was created. This meant that the discovery of the `unique validator` was particularly welcome. 


## Wins

### Team wins
Getting passport to work. We created an object that we stored locally that contained a users ID, username and token. This allowed us to make a lot of conditional styling elements in the frontend based on if the user was a logged in user or not and if the user was the author of a comment.
Deploying the backend. This took a whole day as there were multiple issues but going through the process and debugging it made us learn much more than if it all went smoothly.
Being able to effectively work as a team together and utilise tools such as Github to help this process. We would meet at the beginning and end of the day to do group pull requests and merges, and would work through merge conflicts as a group.

### Personal wins
Working with the team was an especially rewarding experience. I had the opportunity to learn from and support team mates when any of us faced any challenges, as well as celebrate together when challenges were overcome or a particular task was complete.  
Getting to work on the backend side of the project. At the beginning of the week I wasn’t feeling confident in this, however working on it during this project gave me a better understanding and an opportunity to work well with something that I may have tried to avoid for a little longer had I been working solo. 


## Takeaways

### Team takeaways
The biggest takeaway was being able to work with other people on the same codebase. We developed our own processes to ensure that people didn’t step on each other's toes and also to collaboratively solve merge conflicts.
If you want to deploy a full stack application have your backend and frontend hosted in two separate Github repos.

### Personal takeaways
Project management tools such as Trello are essential to effective collaboration. 


## Future Improvements

Use the update route to give the users the ability to edit their profile
Give users the option to add a picture to an event they created
Integrate with a third party event API such as Resident Advisor or Google Calendar


