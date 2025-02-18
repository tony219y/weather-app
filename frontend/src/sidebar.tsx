import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import provinces from "./assets/provinces.json";
import districts from "./assets/district.json";
import wretch from "wretch";
import {
  Select,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "./components/ui/button";

interface District {
  id: number;
  name_th: string;
  province_id: number;
}
interface WeatherData {
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

interface SidebarProps {
  onWeatherDataReceived: (data: WeatherData) => void;
}

function Sidebar({ onWeatherDataReceived }: SidebarProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>(
    provinces[0].name_th
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    districts[0].name_th
  );
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProvince) {
      const provinceId = provinces.find(
        (province) => province.name_th === selectedProvince
      )?.id;
      const districtsInProvince = districts.filter(
        (district) => district.province_id === provinceId
      );
      setFilteredDistricts(districtsInProvince);
      setSelectedDistrict(""); // Reset selected district when province changes
    } else {
      setFilteredDistricts([]);
      setSelectedDistrict(""); // Reset selected district when no province is selected
    }
  }, [selectedProvince]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    const banner = document.getElementById("banner");
    const btn = document.getElementById("btn");
    const title = document.getElementById("title");
    const form = document.getElementById("form");
    if (banner && btn && title && form) {
      requestAnimationFrame(() => {
        banner.style.transition = "width 0.3s ease";
        banner.style.width = isOpen ? "50px" : "300px";
        title.style.display = isOpen ? "none" : "block";
        form.style.display = isOpen ? "none" : "flex";
      });
    }
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await wretch(
        `https://api-weather-app.tony219y.com/api/v1/weather/current/test?province=${selectedProvince}&district=${selectedDistrict}`
      )
        .get()
        .json<WeatherData>();
      onWeatherDataReceived(response); // ส่งข้อมูลที่ได้รับกลับไปยัง CardWeather
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div
      id="banner"
      className="flex flex-col bg-[#1c1c1c] text-white h-screen w-[300px] relative transition-all duration-300"
    >
      <button
        id="btn"
        className="flex w-full transition-all duration-300 p-4 justify-between items-center"
        onClick={toggleSidebar}
      >
        <h1
          id="title"
          className="text-2xl font-thin overflow-hidden transition-all text-nowrap"
        >
          Weather App
        </h1>
        <Menu />
      </button>
      <hr className="w-full opacity-20" />
      <form id="form" className="flex flex-col gap-4 p-4">
        <Select onValueChange={setSelectedProvince}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={provinces[0].name_th} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Province</SelectLabel>
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.name_th}>
                  {province.name_th}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={setSelectedDistrict}
          disabled={!selectedProvince}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                selectedDistrict ? selectedDistrict : "Select District"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>District</SelectLabel>
              {filteredDistricts.map((district) => (
                <SelectItem key={district.id} value={district.name_th}>
                  {district.name_th}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="w-full hover:bg-[#2c2c2c20]"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default Sidebar;
