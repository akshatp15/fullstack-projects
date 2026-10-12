from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import insert, select, update, delete
from db import engine, users, games
import bcrypt
import jwt_auth

# Creating FastAPI object
app = FastAPI()

# Setting up middleware, allows requests to backend from any site 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "PUT", "POST", "DELETE"],
    allow_headers=["*"],
)

# User Class
class User(BaseModel):
    username: str
    password: str

# Endpoint: Create User
@app.post("/create-user")
def create_user(user:User):
    salt = bcrypt.gensalt(rounds=12)
    password_bytes = user.password.encode('utf-8')
    hashed = bcrypt.hashpw(password_bytes, salt)
    query = insert(users).values(
        username=user.username,
        password=hashed
    )

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()

        user_id = result.inserted_primary_key[0]

    return {
        "message": "User created successfully",
        "user_id": user_id,
        "username": user.username
    }

@app.post("/login")
def create_user(user:User):
    query = select(users).where(users.c.username == user.username)

    with engine.connect() as connection:
        result = connection.execute(query)
        db_user = result.fetchone()

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = jwt_auth.create_access_token(db_user.id)

    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "username": db_user.username,
        "access_token": token,
        "token_type": "bearer"
    }

# Games Routes and Models
class Game(BaseModel):
    name: str
    quantity: int
    platform: str

@app.get("/games")
def get_games(user_id: int = Depends(jwt_auth.get_current_user)):
    query = select(games)
    returned = []

    with engine.connect() as connection:
        result = connection.execute(query)
        for row in result:
            dictionary = {"id": row.id, "name": row.name, "quantity": row.quantity, "platform": row.platform}
            returned.append(dictionary)

    return returned
        
@app.post("/games/create")
def create_game(game:Game, user_id: int = Depends(jwt_auth.get_current_user)):
    query = insert(games).values(
        name=game.name,
        quantity=game.quantity,
        platform=game.platform
    )

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()
        inserted = result.inserted_primary_key[0]

    return {
        "game_id": inserted
    }

@app.put("/games/update/{id}")
def update_game(id: int, game:Game, user_id: int = Depends(jwt_auth.get_current_user)):
    query = update(games).where(games.c.id == id).values(
        name=game.name,
        quantity=game.quantity,
        platform=game.platform
    )

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Game Not Found"
            )

    return {
        "game_id": id
    }

@app.delete("/games/delete/{id}")
def delete_game(id: int, user_id: int = Depends(jwt_auth.get_current_user)):
    query = delete(games).where(games.c.id == id)

    with engine.connect() as connection:
        result = connection.execute(query)
        connection.commit()

        if result.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Game Not Found"
            )

    return {
        "game_id": "deleted"
    }
