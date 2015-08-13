import requests
import xml.etree.ElementTree as ET
import json

url = "https://www.goodreads.com/review/list/45141963?format=xml&key=KEY&v=2"
key = "yFhXhuMkI2MvcepEd0ipMw"

r = requests.get(url.replace('KEY', key))
root = ET.fromstring(r.text.encode('utf-8'))

book_data = {}
book_data['currently-reading'] = []
book_data['read'] = []
book_data['to-read'] = []

for review in root.iter('review'):

    book_obj = {}
    book = review.find('book')
    book_obj['title'] = book.find('title').text
    book_obj['image_url'] = book.find('image_url').text
    book_obj['link'] = book.find('link').text

    shelf_type = review.find('shelves').find('shelf').get('name')

    book_data[shelf_type].append(book_obj)

#json_data = json.dumps(book_data, indent=4)
with open('book_data.json', 'w') as outfile:
    #json.dump(json_data, outfile)
    json.dump(book_data, outfile)
