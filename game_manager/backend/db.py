from sqlalchemy import MetaData, Table, Column, Integer, String, create_engine

DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/gameManager"

engine = create_engine(DATABASE_URL)

metadata = MetaData()

users = Table(
    "users", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("username", String(50)),
    Column("password", String(255))
)

games = Table(
    "games", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("name", String(50)),
    Column("quantity", Integer),
    Column("platform", String(255))
)

metadata.create_all(engine)