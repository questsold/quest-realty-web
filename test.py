import urllib.request, re

req = urllib.request.Request("https://questsold.com/", headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req).read().decode("utf-8")
css_links = re.findall(r'href="([^"]+\.css[^"]*)"', html, re.IGNORECASE)

for link in css_links:
    if link.startswith("//"): link = "https:" + link
    elif link.startswith("/"): link = "https://questsold.com" + link
    try:
        content = urllib.request.urlopen(link).read().decode("utf-8")
        logos = set(re.findall(r"url\(['\"]?(https://assets\.thesparksite\.com[^'\")]*logo[^'\")]*)['\"]?\)", content, re.IGNORECASE))
        for logo in logos:
            print("FOUND LOGO IN CSS:", logo)
    except Exception as e:
        pass
