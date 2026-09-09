# Stat Sheet
## Project Overiew
- This project is a full stack NBA stats webpage that shows career stats for all active players
- Tech Stack
  - Frontend: React.js and Tailwind CSS
  - Backend: FastAPI and nba_api
## Setup
- For this project you will need to have Python and Node.js installed
  ### Node.js
  - To download Node.js please follow the instructions in the link below for your specific operating system.
    - [https://nodejs.org/en/download](https://nodejs.org/en/download)
  ### Python
  - To download Python please follow the instructions in the link below for your specific operating system.
    - [https://www.python.org/downloads/](https://www.python.org/downloads/)
  
## Running the Program:
  1. First open a new terminal window after opening the project in VSCode
  2. Change from the stat_sheet root directory into the frontend directory
      ```
      cd frontend // to change into the frontend directory
      ```
  3. Installing the frontend dependencies
     - To install all the dependencies for the frontend which will allow the project to work correctly, run the command below in the terminal
       ```
        npm install
       ```
  4. Installing the backend dependencies
     - Open a new terminal window and change to the backend directory located inside the stat_sheet directoru
       ```
        cd frontend // to change into the frontend directory
        ```
     - Create a virtual environment to install the required libraries
       ```
        python -m venv .venv
        ```
     - Activate the virtual environment
        - Windows
          ```
          .venv\Scripts\activate
          ```
        - Mac/Linux
          ```
          source venv/bin/activate
          ```
      - To install the required libraries, please run the command below
          ```
          pip install -r requirements.txt
          ```
  4. Run the backend server
     - Inside the terminal window where you have changed to the backend directory run the below command to start the backend server
         ```
          uvicorn routes:app --reload       
         ```
   5. Run the frontend
      - Inside the terminal window where you have changed to the frontend directory run the below command to start the frontend
         ```
          npm run dev
         ```
  7. To view the website and interact with it open a new browser window and type in localhost:5173
  
