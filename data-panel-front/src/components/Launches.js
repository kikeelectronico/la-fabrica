import React, { useState, useEffect } from "react";
  import "./launches.css"
  
  const API = "http://" + window.location.hostname + ":8000"
  
  export default function Launches() {
  
    const [data, setData] = useState({weather_flag: false, fail_to_update: true});
    const [uv_alert, setUvAlert] = useState("0, 0, 0");
  
    useEffect(() => {
      getData()
      const interval = setInterval(() => getData(), 10000)
  
      return()=>clearInterval(interval)
    }, [])
  
    const getData = () => {
        fetch(API + "/launches")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error))
    }
  
    useEffect(() => {
      evaluateAlerts()
    }, [data])
  
    const evaluateAlerts = () => {
      /*if (data.weather_flag) {
        var uv = data.weather.current.uv
        if (uv <= 2) setUvAlert("0,0,0")
        else if (uv <= 5) setUvAlert("255,255,0")
        else if (uv <= 7) setUvAlert("255,126,0")
        else if (uv <= 10) setUvAlert("255,0,0")
        else setUvAlert("126,0,35")
      }*/
    }
  
    return (
      <>
        {
          !data.fail_to_update && data.launches_flag ? 
            
              data.launches.map(launch => {

                const time = launch.net.split("T")[1].split(":")
                const mision_name = launch.mission.name.length > 30 ? launch.mission.name.substring(0, 30) + "..." : launch.mission.name

                return (
                  <div
                    className="launchesCard"
                    style={{
                      boxShadow: "0 0.1rem 1rem rgba(" + uv_alert  + ", 0.8)"
                    }}
                  >
                    <div className="launchesName">
                      {mision_name}
                    </div>
                    <hr className="launchDivider"/>
                    <div className="launchesNet">
                      {time[0]} : {time[1]}
                    </div>
                  </div>
                )
              })
            
          : <></>
        }
        {
          data.fail_to_update ? 
            <div className="weatherCard" >            
              <div className="launchesFail">
                Fallo al cargar datos de lanzamientos
              </div>
            </div>
          : <></>
            
        }
        
      </> 
    )
  }