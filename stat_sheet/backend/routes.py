from fastapi import FastAPI
from nba_api.stats.static import players
import functions
from fastapi.middleware.cors import CORSMiddleware

# Creating FastAPI object
app = FastAPI()

# Setting up middleware, allows only GET requests to backend from any site 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Endpoint: Returns all active players in the NBA
@app.get("/")
def get_players():
    active_players = players.get_active_players()
    cleaned = {}
    for i in active_players:
        cleaned[i['id']] = i['full_name']
    return cleaned

# Endpoint: Returns playoff and regular season stats for a certain player_id
@app.get("/{player_id}")
def get_playoffs(player_id:str):
    # Calls get_regular function from function.py file
    reg_season = functions.get_regular(player_id)
    # Calls get_playoffs function from function.py file
    playoffs = functions.get_playoffs(player_id)

    return {"regular season":reg_season, "playoffs": playoffs}