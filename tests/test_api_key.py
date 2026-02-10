"""
Quick API key tester - checks if your Gemini API key has quota remaining
"""
import os
from dotenv import load_dotenv
import requests

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
model = os.getenv("GEMINI_MODEL_NAME", "gemini-2.5-flash")

print(f"Testing API Key: {api_key[:20]}...")
print(f"Model: {model}\n")

# Simple test: count tokens (cheapest operation, 0 RPD cost)
url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:countTokens?key={api_key}"

payload = {
    "contents": [{
        "parts": [{"text": "test"}]
    }]
}

try:
    response = requests.post(url, json=payload, timeout=10)
    
    if response.status_code == 200:
        print("✅ API Key is VALID and has quota remaining")
        print(f"Response: {response.json()}")
    elif response.status_code == 429:
        print("❌ API Key QUOTA EXHAUSTED")
        print("Error:", response.json())
        print("\nQuota resets at midnight Pacific Time")
        print("Get a new API key at: https://aistudio.google.com/apikey")
    elif response.status_code == 400:
        error_data = response.json()
        if "API key not valid" in str(error_data):
            print("❌ API Key is INVALID")
            print("Get a valid key at: https://aistudio.google.com/apikey")
        else:
            print("❌ Bad Request:", error_data)
    else:
        print(f"❌ Unexpected status: {response.status_code}")
        print("Response:", response.text)
        
except requests.exceptions.RequestException as e:
    print(f"❌ Network error: {e}")
