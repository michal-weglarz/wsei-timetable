
def scrap(album_num):

    from selenium import webdriver
    from selenium.common.exceptions import TimeoutException
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.support.wait import WebDriverWait
    from selenium.webdriver.chrome.options import Options
    import csv
    import re
    import requests
    import time
    import os
    from bs4 import BeautifulSoup

    URL = 'https://estudent.wsei.edu.pl/SG/PublicDesktop.aspx?fileShareToken=95-88-6B-EB-B0-75-96-FB-A9-7C-AE-D7-5C-DB-90-49'

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920x1080")
    driver_path = '/usr/lib/chromium-browser/chromedriver'
    driver = webdriver.Chrome(options=chrome_options,
                              executable_path=driver_path)

    driver.get(URL)
    time.sleep(6)
    driver.execute_script(
        "var p = document.createElement('p');p.id='albumNum';p.innerText=arguments[0];document.body.appendChild(p);", album_num)
    driver.execute_script(open('./simulateActions.js').read())
    time.sleep(6)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    grid_row = soup.find_all(class_='grid-row')
    grid_row_alternating = soup.find_all(class_='grid-row-alternating')

    grid_rows_combined = []
    for a, b in zip(grid_row_alternating, grid_row):
        grid_rows_combined.append(a)
        grid_rows_combined.append(b)

    classes = []
    for item in grid_rows_combined:
        tdTag = item.find_all('td')
        temp = []
        for tag in tdTag:
            temp.append(tag.text)

        date = temp[1]
        day = temp[2]
        start = temp[3]
        end = temp[4]
        hours = temp[5]
        subject = temp[6]
        classrom = temp[7]
        lecturer = temp[8]
        classID = temp[9]
        classes.append([date, day, start, end, hours,
                        subject, classrom, lecturer, classID])
        temp = []

    if not os.path.exists(f'../data/{album_num}'):
        os.makedirs(f'../data/{album_num}')

    with open(f'../data/{album_num}/Classes{album_num}.csv', 'w', newline='', encoding='UTF-8') as fp:
        a = csv.writer(fp, delimiter=',')
        data = [['Date', 'Day', 'Start', 'End', 'Hours',
                 'Subject', 'Classrom', 'Lecturer', 'ClassID'], *classes]
        a.writerows(data)
