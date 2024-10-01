'use client';

import React, { useState } from 'react';
import { fetchWeatherData, fetchWeatherForecast } from '@/lib/weather'; // Funções para buscar dados da API
import styles from './page.module.css'; // Importa o CSS Module
import Image from 'next/image'; // Importa o componente Image
import { Line } from 'react-chartjs-2'; // Importa o componente Line para o gráfico
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registra os componentes necessários para o gráfico
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeatherPage() {
    const [city, setCity] = useState(''); // Armazena a cidade digitada
    const [weatherData, setWeatherData] = useState(null); // Armazena os dados do clima
    const [forecastData, setForecastData] = useState(null); // Armazena os dados da previsão do clima
    const [loading, setLoading] = useState(false); // Indica carregamento
    const [error, setError] = useState(null); // Armazena erros

    // Mapeamento de condições climáticas para ícones
    const weatherIcons = {
        'few clouds': '/icons8-clouds-64.png',
        'clear sky': '/icons8-sky-50.png',
        'light snow': '/icons8-snow-50.png',
        'broken clouds': '/icons8-clouds-50.png',
        'overcast clouds': '/icons8-overcast-mist-24.png',
        'heavy intensity rain': '/icons8-heavy-rain-50.png',
        'smoke': '/icons8-smoke-heat-h-24.png',
        'light rain': '/icons8-light-rain-50.png',
        'moderate rain': '/icons8-moderate-rain-30.png',
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        const weatherDataResponse = await fetchWeatherData(city);
        if (weatherDataResponse) {
            setWeatherData(weatherDataResponse);
            const forecastDataResponse = await fetchWeatherForecast(city);
            if (forecastDataResponse) {
                setForecastData(forecastDataResponse);
            } else {
                setError('Erro ao buscar dados de previsão. Verifique a cidade e tente novamente.');
            }
        } else {
            setError('Erro ao buscar dados do clima. Verifique a cidade e tente novamente.');
        }

        setLoading(false);
    };

    const chartData = forecastData ? {
        labels: forecastData.list.map(item => item.dt_txt), // Pega as datas da previsão
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: forecastData.list.map(item => item.main.temp), // Pega as temperaturas
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    } : null;

    return (
        <div className={styles.weatherContainer}>
            <h1 className={styles.weatherTitle}>Busque a Previsão do Tempo</h1>
            <div className={styles.weatherInputContainer}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Digite o nome da cidade"
                    className={styles.weatherInput}
                />
                <button onClick={handleSearch} className={styles.weatherButton}>
                    Buscar
                </button>
            </div>

            {loading && <p>Carregando...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {weatherData && (
                <div className={styles.weatherInfo}>
                    <h2>Previsão do tempo para {weatherData.name}</h2>
                    <p>Temperatura: {weatherData.main.temp}°C</p>
                    <p>Condição: {weatherData.weather[0].description}</p>

                    {/* Exibe o ícone de acordo com a condição do clima */}
                    {weatherIcons[weatherData.weather[0].description.toLowerCase()] && (
                        <Image
                            src={weatherIcons[weatherData.weather[0].description.toLowerCase()]}
                            alt={weatherData.weather[0].description}
                            width={100} // ajuste o tamanho conforme necessário
                            height={100} // ajuste o tamanho conforme necessário
                            className={styles.weatherIcon}
                        />
                    )}
                </div>
            )}

            {forecastData && (
                <div className={styles.chartContainer}>
                    <h2>Previsão de Temperatura</h2>
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
}
