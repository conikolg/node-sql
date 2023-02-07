import os

# pip install fastapi uvicorn pydantic mysql-connector-python
import uvicorn
from fastapi import FastAPI
from mysql.connector import connect, Error
from pydantic import BaseModel

db_config = {
    "host": os.environ.get("DB_HOSTNAME", "localhost"),
    "user": os.environ.get("DB_USERNAME", "USERNAME"),
    "password": os.environ.get("DB_PASSWORD", "PASSWORD"),
    "database": os.environ.get("DB_DATABASE", "patients"),
    "port": int(os.environ.get("DB_PORT", 3306)),
}

app = FastAPI()


class UserInfo(BaseModel):
    name: str
    age: int
    city: str


@app.get("/", status_code=200)
async def up():
    # See this to potentially disable logging on this endpoint
    # https://github.com/encode/starlette/issues/864#issuecomment-1254987630
    return 'Netnology Medical Application (Python) is up.'


@app.get("/api/getUsers", status_code=200)
async def get_users():
    try:
        with connect(**db_config) as connection:
            query = "SELECT * from Users"
            with connection.cursor() as cursor:
                cursor.execute(query)
                return [
                    {"ID": entry[0], "Name": entry[1], "Age": entry[2], "City": entry[3]}
                    for entry in cursor
                ]
    except Error as e:
        print(e)


@app.post("/api/addUser", status_code=200)
async def add_user(user: UserInfo):
    try:
        with connect(**db_config) as connection:
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO Users (Name, Age, City) VALUES (%s, %s, %s)",
                               (user.name, user.age, user.city))
                connection.commit()
    except Error as e:
        print(e)


@app.put("/api/updateUser/{id}", status_code=200)
async def update_user(id: int, user: UserInfo):
    try:
        with connect(**db_config) as connection:
            with connection.cursor() as cursor:
                cursor.execute("Update Users SET Name = %s, Age = %s, City = %s WHERE ID = %s",
                               (user.name, user.age, user.city, id))
                connection.commit()
    except Error as e:
        print(e)


@app.delete("/api/deleteUser/{id}", status_code=200)
async def delete_user(id: int):
    try:
        with connect(**db_config) as connection:
            with connection.cursor() as cursor:
                cursor.execute("Delete FROM Users WHERE ID = %s", (id,))
                connection.commit()
    except Error as e:
        print(e)


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8080)
