import "./index.css";
import Sidebar from "./sidebar";
import CardWeather from "./cardweather";
import { useState } from "react";
import { WeatherData } from "./cardweather";
function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleWeatherDataReceived = (data: WeatherData) => {
    setWeatherData(data);
  };

  return (
    <div className="flex min-h-screen bg-[#1e1e1e]">
      <div className="">
        <Sidebar onWeatherDataReceived={handleWeatherDataReceived} />
      </div>
      <div className="flex w-full justify-center items-center min-h-screen p-4">
        <CardWeather weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
