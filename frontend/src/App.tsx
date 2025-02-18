import './index.css'
import Sidebar from './sidebar'
import CardWeather from './cardweather'
import { useState } from 'react';
import { WeatherData } from './cardweather';
function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleWeatherDataReceived = (data: WeatherData) => {
    setWeatherData(data);
  };

  return (
    <div className="flex min-h-screen bg-[#1e1e1e]">
      <Sidebar onWeatherDataReceived={handleWeatherDataReceived} />
      <div className="flex w-full justify-center items-center min-h-screen">
        <CardWeather weatherData={weatherData} />
      </div>
    </div>
  )
}

export default App
