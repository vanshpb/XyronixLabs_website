from pymongo import MongoClient

def get_db():
    client = MongoClient('mongodb+srv://admin:8882187203@website.pye3s.mongodb.net/?retryWrites=true&w=majority&appName=Website')
    db = client['Website']
    return db

def insert_data():
    db = get_db()

    # Insert data into sample_collection
    db.sample_collection.insert_one({
        "message": "Hello from Django with DRF!"
    })

    # Insert data into home_collection
    db.home_collection.insert_one({
        "message": "Welcome to the Home page"
    })

    # Insert data into about_us_collection
    db.about_us_collection.insert_one({
        "message": "About Us page"
    })

    # Insert data into products_collection
    db.products_collection.insert_one({
        "message": "Products page"
    })

    # Insert data into services_collection
    db.services_collection.insert_one({
        "message": "Services page"
    })

    # Insert data into research_collection
    db.research_collection.insert_one({
        "message": "Research page"
    })

    # Insert data into gallery_collection
    db.gallery_collection.insert_one({
        "message": "Gallery page"
    })

    # Insert data into contact_us_collection
    db.contact_us_collection.insert_one({
        "message": "Contact Us page"
    })

    # Insert data into signin_collection
    db.signin_collection.insert_one({
        "message": "Sign In page"
    })

    # Insert data into signup_collection
    db.signup_collection.insert_one({
        "message": "Sign Up page"
    })

if __name__ == "__main__":
    insert_data()
    print("Data inserted successfully!")