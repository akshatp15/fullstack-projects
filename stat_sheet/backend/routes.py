from fastapi import FastAPI
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats
import functions
import pandas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)
@app.get("/")
def get_players():
    active_players = players.get_active_players()
    cleaned = {}
    for i in active_players:
        cleaned[i['id']] = i['full_name']
    return cleaned

@app.get("/{player_id}")
def get_playoffs(player_id:str):
    reg_season = functions.get_regular(player_id)
    # Playoffs Per Game Stats
    playoffs = functions.get_playoffs(player_id)

    return {"regular season":reg_season, "playoffs": playoffs}