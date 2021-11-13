import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

//try to join a room when button is clicked
//in production this is on the regular user side only
//auto-join the admin rather than going through a form
document.querySelector("#join").addEventListener("click", () => {
  //get room id from the input box
  let roomId = document.querySelector("#roomId").value;

  const options = {
    roomId: roomId,
  };
  //connect to the server
  var socket = io.connect("http://localhost:3000", { query: options });

  //runs if you can't connect to the socket server
  socket.on("connect_error", (error) => {
    console.log("Couldn't connect: ", error);
  });

  //runs when there is a server or validation error
  socket.on("errorMsg", (msg) => {
    console.log("error: ", msg);
    console.log(msg.ErrorMsg);
  });

  //runs when you first connect to the socket server
  socket.on("connect", (socket) => {
    console.log("connected");
  });

  //runs when a user joins the room
  socket.on("joinConfirm", (roomId) => {
    console.log("joined room " + roomId);
  });

  //runs when the user count is updated.
  socket.on("new-join", (count) => {
    document.getElementById("userCount").textContent = count;
  });

  //runs when you get a new restaurant
  socket.on("nextRestaurant", (restaurant) => {
    //load restaurant data for user to see
    console.log(restaurant);
    document.querySelector("#restaurant-name").textContent =
      restaurant.restaurant_name;

    //send a "like" to the server.
    document.querySelector("#like").addEventListener("click", (e) => {
      socket.emit("countResult", 1);
      // e.target.removeEventListener
    });

    //send a "dislike" to the server
    document.querySelector("#dislike").addEventListener("click", (e) => {
      socket.emit("countResult", 0);
      // e.target.removeEventListener
    });
  });

  //runs when all restaurants have been looped through
  socket.on("finish", () => { });
  
  //Runs when start session button is clicked
//in production, this is on the admin side only
  document.querySelector('#start').addEventListener('click', () => {
  //start a session with the given room id
  socket.emit("start-session", options.roomId)

  //runs when you first connect to the socket server
  socket.on("connect", (socket) => {
    console.log("connected");
  });

  //runs if you can't connect to the socket server
  socket.on("connect_error", (error) => {
    console.log("Couldn't connect: ", error);
  });

  //runs when there is a server or validation error
  socket.on("errorMsg", (msg) => {
    console.log("error: ", msg);
    console.log(msg.ErrorMsg);
  });

  //runs if the room has started successfully
  socket.on('room-start-success', msg => {
    console.log(msg)
  })


});
});


