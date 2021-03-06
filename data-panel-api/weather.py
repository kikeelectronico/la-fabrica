import os
import requests
import json
import time

RELOAD_TIME = 60

class Weather:

  __api_key = ""
  _weather = {}
  _last_update = 0
  _query = ""
  _fail_to_update = True

  def __init__(self):
    self.__api_key = os.environ.get("WHEATHER_API_KEY")
    self._query = os.environ.get("WHEATHER_QUERY")

  def updateWeather(self):
    try:
      url = "https://api.weatherapi.com/v1/forecast.json?key=" + self.__api_key + "&q=" + self._query + "&days=2&aqi=yes&alerts=no"
      response = requests.request("GET", url, verify=False, timeout=5)
      if response.status_code == 200:
        self._weather = response.json()
        self._fail_to_update = False
      else:
        self._fail_to_update = True
    except (requests.ConnectionError, requests.Timeout) as exception:
      self._fail_to_update = False

  def getWeather(self):
    now = time.time()
    if now - self._last_update > RELOAD_TIME:
      self._last_update = now
      self.updateWeather()

    weather_flag = "location" in self._weather.keys()

    return (self._fail_to_update, weather_flag, self._weather)