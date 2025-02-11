from pymongo import MongoClient

def get_db():
    client = MongoClient('mongodb+srv://admin:8882187203@website.pye3s.mongodb.net/Website?retryWrites=true&w=majority&ssl=true')
    db = client['Website']
    return db