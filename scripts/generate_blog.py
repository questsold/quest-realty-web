import os
import json
import datetime
import google.generativeai as genai

# Configure the Gemini API
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY environment variable not set.")
    exit(1)

genai.configure(api_key=api_key)

# We use the recommended pro model
model = genai.GenerativeModel('gemini-2.5-pro')

prompt = """
You are an elite, highly-paid real estate copywriter and SEO expert working for Quest Realty, a luxury real estate brokerage in Metro Detroit.
We need a high-quality, extremely engaging blog post about the Metro Detroit real estate market. 
The post must be hyper-optimized for both traditional Google SEO and new AI Search Engines (like Perplexity, SearchGPT, and Gemini).
It should target high-net-worth individuals, buyers, sellers, or investors in areas like Birmingham, Bloomfield Hills, Troy, Rochester Hills, or Oakland/Macomb County.

You MUST format your response as a raw JSON object containing the exact following keys:
- "title": A catchy, SEO-optimized headline (string).
- "excerpt": A 2-3 sentence meta description summarizing the post (string).
- "content": The full body of the article in Markdown format. Use H3 (###) for sections, bullet points, and bold text for readability. (string).
- "category": Choose one of: "Market Updates", "Home Buying", "Home Selling", "Local Life". (string).
- "image": A relevant placeholder image URL from Unsplash. Pick a luxury real estate or lifestyle unspash image, e.g., "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80". (string).

DO NOT include backticks or markdown JSON formatting blocks around the response. Return raw parsable JSON.
"""

print("Requesting blog post from Gemini API...")
response = model.generate_content(prompt)
responseText = response.text.strip()

# Clean up possible markdown formatting from Gemini
if responseText.startswith("```json"):
    responseText = responseText[7:]
if responseText.endswith("```"):
    responseText = responseText[:-3]

try:
    new_blog = json.loads(responseText)
except json.JSONDecodeError as e:
    print("Failed to parse the Gemini response as JSON.")
    print("Response was:", responseText)
    raise e

# Load existing blogs
file_path = "data/blogs.json"
with open(file_path, "r") as f:
    blogs = json.load(f)

# Assign ID and current date
new_id = max([b.get("id", 0) for b in blogs]) + 1 if blogs else 1
new_blog["id"] = new_id
new_blog["date"] = datetime.datetime.now().strftime("%b %d, %Y")
new_blog["author"] = "Quest Realty Insights"
new_blog["featured"] = True

# Demote previous featured post
for blog in blogs:
    blog["featured"] = False

# Add new blog to the front
blogs.insert(0, new_blog)

with open(file_path, "w") as f:
    json.dump(blogs, f, indent=4)

print(f"Successfully generated and added new blog post: '{new_blog['title']}'")
