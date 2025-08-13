# QuickNote
## Project Overiew
- This project is a note taking app which has the following features: fully responsive design, data storage in a MongoDB database, and rate limiting.
- Tech Stack
  - Frontend: React.js and Tailwind CSS
  - Backend: Express.js and MongoDB
## Setup
- For this project you will need to create a MongoDB database to store the notes created by the users.
- For the rate limiting you will need to use Upstash to create a rate limiter which will prevent the application from being overloading by users
  requests
  ### MongoDB
  1) First if you don't have a MongoDB account you will need to create one. You can do so at this link [MongoDB Sign Up/Sign In](https://www.mongodb.com/cloud/atlas/register)
  2) Once you create your account/login, create a new project by using the dropdown at the top left
  3) Then select the cluster option and create a new cluster. In the cluster options select the free tier and unselect the preload sample dataset option if autoselected
  4) On the Set up connection page press on the Create Database User button, then press on the Choose Connection Method button at the bottom right
  5) Then select on drivers and make sure Node.js is selected and at the bottom copy the connection string with the show password option enabled
     under the Add your connection string into your application code section
  6) Then open the project in VSCode and inside the backend folder create a .env file. Then inside the .env file copy the code below and replace the MONGO_URI
     with the string you copied in the previous step
      ```
      MONGO_URI= copied connection string
      PORT= 5001
      ```
  7) Finally go under the Network Access options on the options on the left and select the Add IP Address option and then select the Allow Access From Anywhere option
     and confirm
  ### Upstash
  1) First if you don't have a Upstash account you will need to create one. You can do so at this link [Upstash Sign Up/Sign In](https://console.upstash.com/auth/sign-in)
  2) Once you create your account/login, create a new project by using the dropdown at the top left
  3) Then select the create database option, and select the region closest to you for the Primary Region option and proceed by selecting the next option.
     Then select the free option and press next and then select the confirm option.
  4) Then select the database just created and under the scroll down to the Connection section and select JavaScript for the language and then select the Read from env variables option.
     Copy the variables in the .env section such as the ones below and paste them into the .env file that you created inside the backend folder in the project directory.
      ```
      UPSTASH_REDIS_REST_URL="https://improved-barnacle-xxxxx.upstash.io"
      UPSTASH_REDIS_REST_TOKEN="*******"
      ```
  
## Running the Program:
  1. First open a new terminal window after opening the project in VSCode
  2. Change from the root directory into the intro_project directory if necessary or stay in the quick_note directory
      ```
      cd quick_note // to change into the quick_note directory if necessary
      ```
  3. Installing the dependencies
     - To install all the dependencies which will allow the project to work correctly run the command below in the terminal
       ```
        npm run build
       ```
  4. Run the backend server
     - First change into the backend directory using the command below
       ```
        cd backend
       ```
      - Then to run the backend server run the command below
         ```
          npm run dev
         ```
   5. Run the frontend server
     - Open a new terminal window and change into the quick_note directory if necessary
     - Then change into the frontend directory using the command below
       ```
        cd backend
       ```
      - Then to run the frontend run the command below
         ```
          npm run dev
         ```
  7. To view the website and interact with it open a new browser window and type in localhost:5173
  8. To check the data is being saved you can check the MongoDB cluster you created and also can check the upstash database to make sure the rate limiter is working correctly.
