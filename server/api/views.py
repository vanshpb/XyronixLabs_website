from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SampleSerializer
from server.mongodb import get_db

@api_view(['GET'])
def sample_api(request):
    data = {
        "message": "Hello from Django with DRF!"
    }
    serializer = SampleSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
def home(request):
    db = get_db()
    collection = db['home_collection']
    data = collection.find_one({}, {'_id': 0})  # Exclude the '_id' field from the response
    return Response(data)

#@api_view(['GET'])
#def home(request):
#    return Response({"message": "Welcome to the Home page"})

@api_view(['GET'])
def about_us(request):
    return Response({"message": "About Us page"})

@api_view(['GET'])
def products(request):
    return Response({"message": "Products page"})

@api_view(['GET'])
def services(request):
    return Response({"message": "Services page"})

@api_view(['GET'])
def research(request):
    return Response({"message": "Research page"})

@api_view(['GET'])
def gallery(request):
    return Response({"message": "Gallery page"})

@api_view(['GET'])
def contact_us(request):
    return Response({"message": "Contact Us page"})

@api_view(['GET'])
def signin(request):
    return Response({"message": "Sign In page"})

@api_view(['GET'])
def signup(request):
    return Response({"message": "Sign Up page"})