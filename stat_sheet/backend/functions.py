from nba_api.stats.endpoints import playercareerstats
import pandas

def get_regular(player_id):
    career = playercareerstats.PlayerCareerStats(player_id,"PerGame")
    # Regular Season Stats
    reg = career.get_data_frames()[0]
    reg = reg.drop(columns=["PLAYER_ID","LEAGUE_ID","TEAM_ID"])
    reg= reg.to_dict(orient="records")
    return reg

def get_playoffs(player_id):
    career = playercareerstats.PlayerCareerStats(player_id,"PerGame")
    playoffs = career.get_data_frames()[2]
    playoffs = playoffs.drop(columns=["PLAYER_ID","LEAGUE_ID","TEAM_ID"])
    playoffs = playoffs.to_dict(orient="records")
    return playoffs