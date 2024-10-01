// Arquivo: lib/weather.js

export async function fetchWeatherData(city) {
    const apiKey = 'e9e5806cf2c7f7647211772dace6ee13'; // Substitua pela sua chave da API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Falha ao buscar dados do clima');
        }

        const weatherData = await res.json();
        return weatherData;
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
        return null;
    }
}

export async function fetchWeatherForecast(city) {
    const apiKey = 'e9e5806cf2c7f7647211772dace6ee13'; // Substitua pela sua chave da API
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Falha ao buscar dados da previsão do clima');
        }

        const forecastData = await res.json();
        return forecastData;
    } catch (error) {
        console.error('Erro ao buscar dados da previsão do clima:', error);
        return null;
    }
}
