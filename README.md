# wsei-timetable

### Mobile app presenting timetable for WSEI students.

Due to lack of open API, all required data is scraped in real time on demand from harmonogramy.wsei.edu.pl. This operation is controlled by simple flask-based backend, which delivers proper json file as a response to user's request. Those informations are handled then by React Native front-end.
Backend is stored on Amazon's EC2 Instance of Ubuntu Server. Results of scraping are public and can be accessed via following endpoint schema: 
http://ec2-18-220-112-71.us-east-2.compute.amazonaws.com/api/<album_num>

#### Tech stack:
  * Beautiful Soup 4 with Selenium (headless Chrome as webdriver)
  * Flask, Nginx, Gunicorn 
  * React Native + MobX
