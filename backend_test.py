import requests
import unittest
import json
import sys
from datetime import datetime

class LayoutGeneratorAPITest(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(LayoutGeneratorAPITest, self).__init__(*args, **kwargs)
        # Use the public endpoint from frontend/.env
        self.base_url = "https://0fb151b1-8abe-47cc-b4d8-afa1c2b39b37.preview.emergentagent.com/api"
        self.test_timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    def test_01_health_check(self):
        """Test the API health check endpoint"""
        print("\n🔍 Testing API health check...")
        try:
            response = requests.get(f"{self.base_url}/")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertEqual(data["message"], "Hello World")
            print("✅ API health check passed")
        except Exception as e:
            print(f"❌ API health check failed: {str(e)}")
            raise
    
    def test_02_status_endpoint(self):
        """Test the status endpoint"""
        print("\n🔍 Testing status endpoint...")
        try:
            # Create a status check
            client_name = f"test_client_{self.test_timestamp}"
            response = requests.post(
                f"{self.base_url}/status", 
                json={"client_name": client_name}
            )
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertEqual(data["client_name"], client_name)
            self.assertIn("id", data)
            print("✅ Status POST endpoint passed")
            
            # Get status checks
            response = requests.get(f"{self.base_url}/status")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            # Check if our test client is in the list
            found = False
            for status in data:
                if status["client_name"] == client_name:
                    found = True
                    break
            self.assertTrue(found, f"Could not find our test client {client_name} in status list")
            print("✅ Status GET endpoint passed")
        except Exception as e:
            print(f"❌ Status endpoint test failed: {str(e)}")
            raise
    
    def test_03_generate_layout(self):
        """Test the layout generation endpoint"""
        print("\n🔍 Testing layout generation endpoint...")
        try:
            # Test data
            layout_request = {
                "projectName": f"Test Project {self.test_timestamp}",
                "description": "A test project for API testing",
                "requirements": "Must be responsive, accessible, and user-friendly",
                "style": "modern"
            }
            
            # Send request
            response = requests.post(
                f"{self.base_url}/generate-layout", 
                json=layout_request
            )
            self.assertEqual(response.status_code, 200)
            data = response.json()
            
            # Validate response structure
            self.assertIn("title", data)
            self.assertIn("layout_plan", data)
            self.assertIn("project_name", data)
            self.assertIn("style", data)
            
            # Validate content
            self.assertEqual(data["project_name"], layout_request["projectName"])
            self.assertEqual(data["style"], layout_request["style"])
            self.assertIn(layout_request["projectName"], data["layout_plan"])
            
            print("✅ Layout generation endpoint passed")
        except Exception as e:
            print(f"❌ Layout generation test failed: {str(e)}")
            raise

def run_tests():
    """Run all tests and return success status"""
    test_suite = unittest.TestSuite()
    test_suite.addTest(LayoutGeneratorAPITest('test_01_health_check'))
    test_suite.addTest(LayoutGeneratorAPITest('test_02_status_endpoint'))
    test_suite.addTest(LayoutGeneratorAPITest('test_03_generate_layout'))
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    return result.wasSuccessful()

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)