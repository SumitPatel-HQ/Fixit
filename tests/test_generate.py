"""
Test actual generateContent API call to find the real issue
"""
import os
from dotenv import load_dotenv
import requests

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
model = os.getenv("GEMINI_MODEL_NAME", "gemini-2.5-flash")

print(f"Testing generateContent with model: {model}")
print(f"API Key: {api_key[:20]}...\n")

# Test actual content generation
url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

payload = {
    "contents": [{
        "parts": [{"text": "Say hello"}]
    }],
    "generationConfig": {
        "temperature": 0.5,
        "maxOutputTokens": 50
    }
}

try:
    print("Sending generateContent request...")
    response = requests.post(url, json=payload, timeout=15)
    
    print(f"Status Code: {response.status_code}\n")
    
    if response.status_code == 200:
        print("✅ SUCCESS! API key works perfectly")
        result = response.json()
        if 'candidates' in result:
            text = result['candidates'][0]['content']['parts'][0]['text']
            print(f"Response: {text}")
    elif response.status_code == 429:
        print("❌ 429 QUOTA EXCEEDED on generateContent")
        print(response.json())
        print("\n🔍 But token counting worked... This suggests:")
        print("   • Your daily generateContent quota (RPD) is exhausted")
        print("   • Token counting doesn't count against RPD quota")
        print("   • Wait until midnight Pacific Time for reset")
    elif response.status_code == 404:
        print(f"❌ 404 NOT FOUND - Model '{model}' doesn't exist")
        print("\n✅ Available free tier models:")
        print("   • gemini-1.5-flash")
        print("   • gemini-1.5-flash-8b")
        print("   • gemini-2.0-flash-exp")
        print("\n⚠️  Note: 'gemini-2.5-flash' might not exist or require paid plan")
    elif response.status_code == 400:
        print("❌ 400 BAD REQUEST")
        print(response.json())
    else:
        print(f"❌ Status {response.status_code}")
        print(response.text[:500])
        
except requests.exceptions.RequestException as e:
    print(f"❌ Network error: {e}")

print("\n" + "="*60)
print("Quick fix: Try changing model in .env to:")
print("GEMINI_MODEL_NAME=gemini-1.5-flash")
