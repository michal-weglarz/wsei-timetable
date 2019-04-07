import json
import csv
import scraper
import pandas as pd
from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/')
def entry_point():
    return 'This is an entry point of wsei timetable api'


@app.route('/api/<int:album_num>')
def show_timetable(album_num):
    scraper.scrap(str(album_num))
    df = pd.read_csv(f'../data/{album_num}/Classes{album_num}.csv', encoding='utf-8')
    df.to_json(f'../data/{album_num}/classes{album_num}.json', orient='records')
    result = json.load(open(f'../data/{album_num}/classes{album_num}.json'))
    return jsonify(result)


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
