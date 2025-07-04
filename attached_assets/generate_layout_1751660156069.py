from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create the blueprint
generate_layout = Blueprint('generate_layout', __name__)

@generate_layout.route('/generate-layout', methods=['POST'])
def layout():
    try:
        data = request.get_json()
        client_input = data.get("client_input", "")
        photos_info = data.get("photo_description", "")
        budget = data.get("budget", "")
        preferences = data.get("preferences", "")

        # System-level prompt (GPT behavior and rules)
        system_prompt = """
You are a professional landscape designer and sales agent for EMI in Columbus, Ohio. 
Use USDA Zone 6. Prioritize what the client cares about (cost, beauty, or function).
Design using zones like Z1, Z2, etc. Don't alter the house or visible structures. Use mature plant sizes. 
Ask clarifying questions if info is missing. Include dimensions, plant types, layout logic, and a cost estimate.
"""

        # User-level prompt (client data and design request)
        user_prompt = f"""
Client Input: {client_input}
Photos / Address Insight: {photos_info}
Budget: {budget}
Preferences: {preferences}

Please generate a zone-based layout using clear zone labels (Z1, Z2, etc.), estimated dimensions, recommended materials and plants, and a cost range.
"""

        # GPT-4 API call
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )

        gpt_output = response.choices[0].message.content
        return jsonify({"success": True, "layout": gpt_output})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
