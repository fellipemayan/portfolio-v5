'use client';
import { useEffect, useState } from 'react';

interface WeatherData {
  temp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
}

interface WeatherAPIState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(
  city: string = 'Quixadá',
  country: string = 'BR',
  lang: string = 'pt_br'
): WeatherAPIState {
  const [weatherData, setWeatherData] = useState<WeatherAPIState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

      if (!apiKey) {
        setWeatherData({
          data: null,
          loading: false,
          error: 'API não configurada',
        });
        return;
      }

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=${lang}&appid=${apiKey}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Erro ao buscar dados do clima');
        }

        const data = await res.json();

        const weatherInfo: WeatherData = {
          temp: Math.round(data.main.temp),
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          description: data.weather[0].description,
        };

        try {
          const cacheKey = `weather_${city}_${country}`;
          localStorage.setItem(cacheKey, JSON.stringify(weatherInfo));
          localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
        } catch {}

        setWeatherData({
          data: weatherInfo,
          loading: false,
          error: null,
        });
      } catch (err) {
        setWeatherData({
          data: null,
          loading: false,
          error: 'Erro ao buscar dados do clima',
        });
      }
    };

    fetchWeather();
  }, [city, country, lang]);

  return weatherData;
}
