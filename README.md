# 💬 PK Chat — Real-Time MERN Chat Application (Server Side)

> ⚙️ Powerful backend service for PK Chat built with **Express, MongoDB, and Socket.IO**
> Handles authentication, messaging, and real-time events with high scalability and reliability.

🌐 **Live API Server:** [https://pk-chat-z13v.onrender.com/](https://pk-chat-z13v.onrender.com/)
💻 **Client Repository:** [pk-chat-client](https://github.com/akashpk41/pk-chat-client)

---

## ✨ Overview

The **server-side** of PK Chat powers all real-time communication, authentication, and message delivery.
It’s built with **Node.js (Express)**, uses **MongoDB** as a NoSQL database, and integrates **Socket.IO** for real-time chat functionality.
All routes, controllers, and models are modularly structured for scalability and clean maintainability. 🧱

---

## 🧠 Structure Breakdown

| Layer              | Responsibility                                                     |
| ------------------ | ------------------------------------------------------------------ |
| **Routes**         | Defines all API endpoints for authentication, users, and messaging |
| **Controllers**    | Handles business logic and database operations                     |
| **Models**         | Mongoose models for User, Message, etc.                            |
| **Middleware**     | JWT authentication, cookie parsing, error handling                 |
| **Socket Layer**   | Real-time bidirectional communication via WebSockets               |
| **Config / Utils** | Environment setup, Cloudinary, database connection, etc.           |

---

## 🔮 Core Features

| 🌟 Feature                      | 📄 Description                                      |
| ------------------------------- | --------------------------------------------------- |
| 🔐 **JWT Authentication**       | Secure token-based user authentication              |
| 💬 **Real-Time Messaging**      | Instant two-way chat powered by Socket.IO           |
| 👁️ **Seen & Delivered Status**  | Tracks message delivery and seen time               |
| ✍️ **Typing Indicators**        | Notifies when the other user is typing              |
| 🧩 **Chat Open Tracking**       | Marks all unseen messages as “seen” when chat opens |
| 🕒 **Last Seen Updates**        | Auto-updates user last seen on disconnect           |
| ☁️ **Cloudinary Integration**   | Handles profile and media uploads                   |
| 🧱 **Modular MVC Structure**    | Organized code structure for scalability            |
| ⚙️ **Environment-based Config** | Uses dotenv for secure variable management          |
| 🔔 **Real-Time Online Users**   | Broadcasts connected user list instantly            |

---

## 🛠️ Tech Stack

| Technology                | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| 🧠 **Node.js**            | Runtime environment for JavaScript backend |
| 🚀 **Express.js**         | Web framework for routing & middleware     |
| 💾 **MongoDB + Mongoose** | NoSQL database & ODM for data modeling     |
| 🔌 **Socket.IO**          | Real-time event-driven communication       |
| 🔑 **JWT (jsonwebtoken)** | Secure user authentication system          |
| 🔐 **bcrypt**             | Password hashing and encryption            |
| 🍪 **cookie-parser**      | Manages user cookies                       |
| ☁️ **Cloudinary SDK**     | Cloud image and file storage               |
| 🌐 **CORS**               | Enables secure cross-origin access         |
| ⚙️ **dotenv**             | Environment variable management            |

---

## ⚡ Real-Time Socket.IO Events

| Event            | Direction       | Description                                         |
| ---------------- | --------------- | --------------------------------------------------- |
| `connection`     | Client → Server | Establishes socket connection with userId           |
| `typing`         | Client → Server | Informs receiver that user is typing                |
| `stopTyping`     | Client → Server | Stops typing indicator                              |
| `messageSeen`    | Client ↔ Server | Marks messages as seen and updates sender UI        |
| `chatOpened`     | Client → Server | Marks all messages as seen in an active chat        |
| `disconnect`     | Client → Server | Updates user last seen and removes from online list |
| `getOnlineUsers` | Server → Client | Broadcasts currently active users                   |

---

## 🤖 AI Involvement (Project Notes)

> During the final stages of this project, I experimented with **Claude AI** to refine certain features and enhance parts of the design.
> However, while working with AI tools, I encountered several challenges — including inaccurate outputs and moments when I couldn’t fully grasp some implementations.
> In those cases, I revisited the results, explored the logic in depth, and learned from the AI explanations before applying them manually.
> This process not only improved the project’s overall quality but also deepened my understanding of **AI-assisted development** and practical backend design. 💡

---

## 📸 Preview / Screenshot Section

| Login Page                                                    | Main Chat Interface                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Login](https://via.placeholder.com/600x350?text=Login+Page) | ![Chat Interface](https://via.placeholder.com/600x350?text=Main+App+Interface) |

| Inbox                                                    | Settings                                                       | Profile                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| ![Inbox](https://via.placeholder.com/300x200?text=Inbox) | ![Settings](https://via.placeholder.com/300x200?text=Settings) | ![Profile](https://via.placeholder.com/300x200?text=Profile) |

---

## 👨‍💻 Developer Info

**Author:** Akash PK
**Role:** MERN Stack Developer
📧 **Email:** [akashpk741@gmail.com](mailto:akashpk741@gmail.com)
📘 **Facebook:** [facebook.com/atapk41](https://facebook.com/atapk41/)

> ❤️ Crafted with Node.js, Express, and a deep love for scalable architecture.
---