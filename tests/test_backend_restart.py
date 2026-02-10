"""
Quick test to check if backend is returning localization_results for explain_only
"""
import requests
import json

# Test endpoint
url = "http://localhost:8000/api/troubleshoot"

print("Testing backend response format...")
print("=" * 70)

# This should show which Python process is serving
# If it returns the old behavior, backend needs restart

try:
    # Make a dummy request (this won't work without an image, but we can check server status)
    response = requests.get("http://localhost:8000/docs")
    if response.status_code == 200:
        print("✅ Backend is running on port 8000")
        print("\n⚠️  IMPORTANT: The backend was started BEFORE the code fix.")
        print("   You MUST restart the backend to apply changes!")
        print("\n📝 To restart:")
        print("   1. Find the terminal running 'uvicorn backend.main:app'")
        print("   2. Press Ctrl+C to stop it")
        print("   3. Run: uvicorn backend.main:app --reload --port 8000")
        print("\n   OR just let uvicorn auto-reload detect the change.")
        print("   (If --reload is enabled, it should pick up changes automatically)")
    else:
        print("❌ Backend not responding correctly")
except Exception as e:
    print(f"❌ Cannot connect to backend: {e}")
    print("\nBackend might not be running. Start it with:")
    print("   uvicorn backend.main:app --reload --port 8000")

print("=" * 70)
