# wsei-timetable

### Mobile app presenting timetable for WSEI students.

Due to lack of open API, all required data is being scraped in real time on demand from online timetable. This operation is controlled by simple python-based backend, which delivers proper .json file (.csv file is saved on server as well) as a response to user's request. Those informations are handled then by React Native front-end.
Backend is stored on Amazon's EC2 Instance of Ubuntu Server.

#### Tech stack:
  * Beautiful Soup 4 with Selenium (headless Chrome as webdriver)
  * Flask, Nginx, Gunicorn 
  * React Native + MobX
