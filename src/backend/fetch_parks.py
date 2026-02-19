import os
import requests
from dotenv import load_dotenv

# Load the API key from your .env file
load_dotenv()
API_KEY = os.getenv("NPS_API_KEY")

def fetch_parks():
    # The endpoint for parks. We'll limit it to 3 just to see the structure.
    url = f"https://developer.nps.gov/api/v1/parks?limit=3&api_key={API_KEY}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        parks = data.get("data", [])
        
        for park in parks:
            print(f"Name: {park['fullName']}")
            print(f"Park Code: {park['parkCode']}")
            print(f"Coordinates: {park['latitude']}, {park['longitude']}")
            print(f"Designation: {park['designation']}")
            print("-" * 20)
    else:
        print(f"Error: {response.status_code}")

if __name__ == "__main__":
    fetch_parks()