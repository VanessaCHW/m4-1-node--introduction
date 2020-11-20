'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
   setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })

  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomIndex = Math.floor(Math.random()*6);
    const randomText = messages[randomIndex];
    const message = { author: 'monkey', text: randomText };
    const randomTime = Math.floor(Math.random() * 3000);
   setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })


  .get('/parrot-message', (req, res) => {
    const message = { author: 'parrot', text: req.query.text };
    const randomTime = Math.floor(Math.random() * 3000);
   setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);

   console.log(req.query.text);
  })

  .get('/bot-message', (req, res) => {

    let botMsg = getBotMessage(req.query.text);

    const message = { author: 'bot', text: botMsg };
    const randomTime = Math.floor(Math.random() * 3000);
   setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })


  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));

  const getBotMessage = (text) => {
    const commonGreetings = ["hi", "hello", "howdy","hey"];
    const commonGoodbyes = ["bye", "goodbye", "see you","ciao"];

    let botMsg = "Bzzt ";
    let isGreeting = false;
    let isGoodbye = false;

    commonGreetings.map((greeting)=>{
      if(text.toLowerCase().includes(greeting)){
        isGreeting = true;
      }
    });

    commonGoodbyes.map((goodbye)=>{
      if(text.toLowerCase().includes(goodbye)){
        isGoodbye = true;
      }
    });

    if (isGreeting) {
      botMsg += "Hello.";
    }else if(isGoodbye){
      botMsg += "Bye.";
    }
    else{
      botMsg += `"${text}"`;
    }
    return botMsg;
  };