import React from "react";
import { createEvent } from "../apis/EventApis";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {

  //create a state to hold the values from the input fields
  const [createdEvent, setCreatedEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    comments: [],
    attendees: []
  })
  const navigate = useNavigate()

  // function to call the post create event api with the new state which has just been set 
  function createOneEvent() {
    createEvent(createdEvent)
      .then((event) => event.json())
      .then((data => navigate(`../${data.event._id}`)))
      .catch((error) => console.log(error))
  }

  // function to get the values from the input fields and map those into the relevant state object fields
  function handleTextInput(e) {
    setCreatedEvent({ ...createdEvent, [e.target.name]: e.target.value });
  }


  return (
    <div>
      <h1>Create A New Event</h1>
      <form>
        <input name='title' onChange={handleTextInput} placeholder="Enter your Events Title"></input>
        <input name='location' onChange={handleTextInput} placeholder="Location"></input>
        <input name='date' onChange={handleTextInput} placeholder="Date"></input>
        <input name='description' onChange={handleTextInput} placeholder="Description"></input>
        <button onClick={(e) => {
          e.preventDefault();
          createOneEvent()

        }}>Create event</button>
      </form>
    </div>
  )
}