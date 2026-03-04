import time
import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import json

def fetch_zillow_profile(url):
    options = uc.ChromeOptions()
    options.add_argument('--headless')
    driver = uc.Chrome(options=options)
    
    try:
        print(f"Fetching {url}...")
        driver.get(url)
        time.sleep(5)  # give it time to load or solve captcha
        
        # Scroll down to trigger lazy loading if needed
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(3)
        
        html = driver.page_source
        
        if "px-captcha" in html or "Human Verification" in html:
            print("Detected Captcha/PerimeterX block.")
            return None
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # We don't know the exact review selector yet, let's dump a chunk of text or look for common words
        # Let's save the HTML to inspect
        with open("zillow_dump.html", "w", encoding="utf-8") as f:
            f.write(soup.prettify())
        print("Drafted HTML to zillow_dump.html")
        
        return html
    finally:
        driver.quit()

if __name__ == "__main__":
    fetch_zillow_profile("https://www.zillow.com/profile/AliBerry/#reviews")
