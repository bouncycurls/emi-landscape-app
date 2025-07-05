from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class LayoutRequest(BaseModel):
    projectName: str
    description: str
    requirements: str
    style: str

class LayoutResponse(BaseModel):
    title: str
    layout_plan: str
    project_name: str
    style: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/generate-layout", response_model=LayoutResponse)
async def generate_layout(layout_request: LayoutRequest):
    """
    Generate a layout plan based on the provided requirements
    """
    # Generate layout plan based on the input
    layout_plan = f"""
🏗️ Layout Plan for "{layout_request.projectName}"

📋 Project Overview:
{layout_request.description}

🎨 Style: {layout_request.style.title()}

📝 Requirements Analysis:
{layout_request.requirements}

🔧 Recommended Layout Structure:

1. **Entry/Welcome Area**
   - Clean, welcoming entrance
   - Clear navigation indicators
   - Brand/project identity display

2. **Main Content Zones**
   - Primary content area ({layout_request.style} styling)
   - Secondary content sections
   - Interactive elements placement

3. **Functional Areas**
   - Navigation menu (header/sidebar)
   - User interaction zones
   - Content display areas

4. **Visual Elements**
   - Color scheme: {layout_request.style} palette
   - Typography: Clean, readable fonts
   - Spacing: Optimal white space utilization

5. **User Experience Flow**
   - Intuitive navigation path
   - Clear call-to-action placement
   - Responsive design considerations

6. **Technical Considerations**
   - Mobile-first approach
   - Accessibility compliance
   - Performance optimization

💡 Key Recommendations:
- Maintain consistent {layout_request.style} theme throughout
- Ensure all requirements are addressed in the layout
- Consider user journey and interaction patterns
- Implement responsive design principles

🎯 Next Steps:
1. Review and approve this layout plan
2. Create detailed wireframes
3. Develop interactive prototypes
4. Implement responsive design
5. Test across different devices
"""

    # Store the layout request in database
    layout_data = {
        "id": str(uuid.uuid4()),
        "project_name": layout_request.projectName,
        "description": layout_request.description,
        "requirements": layout_request.requirements,
        "style": layout_request.style,
        "layout_plan": layout_plan,
        "created_at": datetime.utcnow()
    }
    
    await db.layout_requests.insert_one(layout_data)
    
    return LayoutResponse(
        title=f"Layout Plan: {layout_request.projectName}",
        layout_plan=layout_plan,
        project_name=layout_request.projectName,
        style=layout_request.style
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
