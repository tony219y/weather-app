export interface WeatherData {
  WeatherForecasts: [
    {
      location: {
        province: string;
        amphoe: string;
      };
      forecasts: [
        {
          time: string;
          data: {
            tc: number; // อุณหภูมิ
            rh: number; // ความชื้น
          };
        }
      ];
    }
  ];
}

const weatherIcon = {
  "clearDay": "/images/clear-day.png",
  "clearNight": "/images/clear-night.png",
  "cloudyDay": "/images/partly-cloudy-day.png",
  "cloudyNight": "/images/partly-cloudy-night.png",
  "rainyDay": "/images/rain-day.png",
  "rainyNight": "/images/rain-night.png",
  "thunderstormDay": "/images/thunderstorm-day.png",
  "thunderstormNight": "/images/thunderstorm-night.png",
}

interface CardWeatherProps {
  weatherData: WeatherData | null;
}

const CardWeather: React.FC<CardWeatherProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="flex justify-center items-center h-[600px] w-[350px] p-4 rounded-xl bg-gradient-to-b from-blue-500 to-indigo-700">
            <h1 className="text-white text-xl font-bold animate-bounce">Choose Province and District</h1>
        </div>
  }

  const getWeatherIcon = (tc: number, rh: number, time: string) => {
    if (rh > 80) {
      return time.includes("night") ? weatherIcon.thunderstormNight : weatherIcon.thunderstormDay; // ความชื้นสูง
    } else if (tc > 30) {
      return time.includes("night") ? weatherIcon.clearNight : weatherIcon.clearDay; // อุณหภูมิสูง
    } else if (tc < 20) {
      return time.includes("night") ? weatherIcon.cloudyNight : weatherIcon.cloudyDay; // อุณหภูมิต่ำ
    }
    return time.includes("night") ? weatherIcon.rainyNight : weatherIcon.rainyDay; // ค่าเริ่มต้น
  }
  const forecastsRain = (tc: number, rh: number)=>{
    const dewPoint =  tc-(100-rh)/5;
    if(dewPoint>25){
        return 'โอกาสฝนตกสูง 🌧';
    }else if(dewPoint >= 22 && dewPoint <= 25){
        return 'โอกาสฝนตกปานกลาง 🌦'
    }else{
        return 'โอกาสฝนตกต่ำ ☀️'
    }

  }

  return (
    <div className="flex justify-center items-center min-h-[600px] h-fit w-[350px] p-4 rounded-xl bg-gradient-to-b from-blue-500 to-indigo-700">
      <div className="flex flex-col h-full bg-white bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-3xl text-white mb-6 text-center">Weather</h1>
        <div className="flex flex-col items-center h-fit w-full p-4 gap-4">
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-white text-xl font-bold">
                {weatherData?.WeatherForecasts[0].location.province}
            </h1>
            <h1 className="text-white text-xl font-thin">
                {weatherData?.WeatherForecasts[0].location.amphoe}
            </h1>
        </div>
        {/* weather icon */}
          <img
            src={getWeatherIcon(
              Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.tc) || 0,
              weatherData?.WeatherForecasts[0].forecasts[0].data.rh || 0,
              new Date().getHours() < 18 ? "day" : "night"
            )}
            alt="weather-icon"
            className="object-contain"
          />
          <p className="text-white text-xl font-thin text-center">
            {forecastsRain(
                Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.tc) || 0,
                Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.rh) || 0
            )}
          </p>
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            {Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.tc) || "N/A"}°C
          </h1>
          <p className="text-white text-xl font-thin text-center">
            ความชื้น
          </p>
          <p className="text-white text-xl font-thin text-center">
            {weatherData?.WeatherForecasts[0].forecasts[0].data.rh || "N/A"}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardWeather;
