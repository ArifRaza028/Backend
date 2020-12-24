import urllib.request, json 
with urllib.request.urlopen("http://localhost:3000/display") as url:
    data = json.loads(url.read().decode())
    for i in data:
        print("name:", i['name'])
        print("img:", i['img'])
        print("summary:", i['summary'], "\n")
