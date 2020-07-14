export interface CityWeather {

"lat": number,
"lon": number,
"timezone": string,
"timezone_offset": number,
"current": 
   {"dt": number,
    "sunrise": number,
    "sunset": number,
    "temp": number,
    "feels_like": number,
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "uvi": number,
    "clouds": number,
    "visibility": number,
    "wind_speed": number,
    "wind_deg": number,
    "weather": [{"id": number,
                 "main": string,
                 "description": string,
                 "icon": string
                }]
    },
"hourly": 
  [{"dt": number,
    "temp": number,
    "feels_like": number,
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "clouds": number,
    "visibility": number,
    "wind_speed": number,
    "wind_deg": number,
    "weather": [{"id": number,
                 "main": string,
                 "description": string,
                 "icon": string
                }]
    }],
"daily": 
  [{"dt": number,
    "temp": {
        "day": number,
        "min": number,
        "max": number,
        "night": number,
        "eve": number,
        "morn": number
    },
    "feels_like": {
        "day": number,
        "night": number,
        "eve": number,
        "morn": number
    },
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "wind_speed": number,
    "wind_deg": number,
    "weather": [{"id": number,
                 "main": string,
                 "description": string,
                 "icon": string
                }]
    }],
    "clouds": number,
    "rain": number,
    "uvi": number


}
