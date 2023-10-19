const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc } = require("firebase/firestore");
const Sentiment = require("sentiment");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4000;
const sentiment = new Sentiment();

const firebaseConfig = {
  apiKey: "AIzaSyBLF-niHPCsUF3gmSsCSq4OCU10WMVI7uI",
  authDomain: "my-chat-app-ae081.firebaseapp.com",
  projectId: "my-chat-app-ae081",
  storageBucket: "my-chat-app-ae081.appspot.com",
  messagingSenderId: "605903191360",
  appId: "1:605903191360:web:906d519c41e11400becea5",
  measurementId: "G-PQQLPK3V0T",
};

const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { app, db };
};

const server = express();

// Define an array of allowed origins
const allowedOrigins = ["https://thee-best.netlify.app", "http://localhost:4000"];  // Update the localhost URL without the protocol and port
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};


server.use(cors(corsOptions));  // Apply CORS middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
const { app, db } = initializeFirebase();

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  server.get("*", async (req, res) => {
    const { path } = parse(req.url, true);
    if (path === "/messages") {
      // Get chat messages from Firebase (Firestore)
      const chatMessages = [];
      const querySnapshot = await getDocs(collection(db, "chatMessages"));
      querySnapshot.forEach((doc) => {
        chatMessages.push(doc.data());
      });
      return res.json({ messages: chatMessages });
    } else {
      return handle(req, res);
    }
  });

  server.post("/message", async (req, res) => {
    const chat = req.body;
    chat.timestamp = +new Date();
    chat.sentiment = sentiment.analyze(chat.message).score;

    try {
      // Save chat message to Firebase (Firestore)
      const docRef = await addDoc(collection(db, "chatMessages"), chat);
      res.status(200).json({ message: "Message saved successfully!" });
    } catch (error) {
      console.error("Error saving chat message:", error);
      res.status(500).json({ error: "Failed to save the message." });
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
