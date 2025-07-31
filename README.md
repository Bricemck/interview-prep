// Hello! This is the take home practical for Brice McKeel.  
// Thank you for considering me for a position at SAS.  
// Installation & Setup will be at the top. An explanation of design choices will follow.

## 📦 Installation & Setup

### 1. Clone the Repo

##### git clone https://github.com/Bricemck/interview-prep.git
##### cd candidate-brice-mckeel

### 2. Install Dependencies

##### Run npm install to install all dependencies.
##### This should install express mongoose dotenv morgan & ejs


### 3. Configure Environment Variables

##### Designed to run with MongoDB. Create a .env file in your project root folder and add your variables.  See below sample.
##### MONGODB_URI=your-mongodb-connection-string



### 4. Start the application (no auto-reload)

##### npm start

### Optional

##### npm install --save-dev nodemon
##### npm run dev

##### Or use nodemon server.js

### 5. Useage & Endpoints

#### With the app running at [http://localhost:3000](http://localhost:3000):

- **Home:** `/`
- **Create new model:** `/models/new`
- **List all models:** `/models`
- **View a model:** `/models/:id`
- **Edit a model:** `/models/:id/edit`
- **Delete a model:** via “Delete” button on show/edit pages



## Explanation and Design Choices

# MEN Stack Project – Model Management App

This is a full-stack JavaScript application built using the **MEN Stack**: **MongoDB**, **Express.js**, and **Node.js**. It allows basic model registration with UUIDs and timestamps. I chose the MEN stack over a Python or Go-based stack, because while Go may offer advantages in terms of performance and scalability; my background in the technologies associated with Javascript allows me to develop more efficiently, implement features with greater depth, and better demonstrate my capabilities across frontend and backend within the project's timeframe.

---

## 🧰 Tech Stack

- **MongoDB** – NoSQL database
- **Express.js** – Web framework for Node
- **Node.js** – JavaScript runtime
- **Mongoose** – MongoDB object modeling
- **EJS** – Template rendering engine
- **Dotenv** – Environment variable management

---

## 📁 Project Structure


candidate-brice-mckeel/
├── models/
│ └── mlmodels.js
├── public/
│ └── socialShareImage.img.ece96782b7e5888ed6cf6b3caa530936.png
│ └── style.css
├── views/
│ └── index.ejs
│ └── models/
│ └── new.ejs
│ └── show.ejs
│ └── edit.ejs
├── .env
├── package.json
├── README.md
├── server.js
└── uUIDCode.js # Stored unused code for find by UUID.




