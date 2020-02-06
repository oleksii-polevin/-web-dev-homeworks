const WEATHER_API = {
    icon: 'http://openweathermap.org/img/wn/__img__@2x.png',
};
const DEFAULT = 'JSON';

const WEEK_DAY = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4:"Thursday",
    5: "Friday",
    6: "Saturday"
};

$(document).ready(function() {
    getForecast(DEFAULT);
});

$('.nav').click(function(e) {
    e.preventDefault();
    const chosen = e.target;
    $(chosen).addClass('active');
    $(chosen).siblings().removeClass('active');
    getForecast($(chosen).text());
});

const getForecast = (request) => {
    $.ajax({
        url: '../app/handler.php',
        method: 'GET',
        data: 'name=' + request,
        success: function(result) {
            showResults(result);
        }
    });
};

const showResults = (result) => {
    const res = JSON.parse(result);
    const forecast = getWeatherInfo(res);
    createCurrentWeather(forecast); // current weather
    $('.forecast').html('');        // 3-hourly forecast
    forecast.forEach((item) => {
        $('.container').append(createForecast(item));
    });
};

const getWeatherInfo = (forecast) => {
    const current = new Date(forecast.list[0].dt_txt);
    let info = [forecast.list[0]];
    for(let i = 1; i < forecast.list.length; i++) {
        if(selectWeather(forecast.list[i].dt_txt, current)) {
            info.push(forecast.list[i]);
        }
    }
    return info;
};

const selectWeather = (item, currentDate) => {
    const date = new Date(item);
    return currentDate.getDate() === date.getDate();
};

const createDiv = (className) => {
    return $('<div></div>').addClass(className);
};

const createDate = (item) => {
    const date = item['dt_txt'].split(' '); // y-m-d and time
    const normalDate = date[1].substr(0, 5);
    return createDiv('forecast-date').text(normalDate);
};

const createIcon = (item) => {
    return $('<img />', {
        src: WEATHER_API.icon.replace('__img__', item.weather[0].icon),
        alt: 'icon'
    });
};

const createForecast = (item) => {
    const date = createDate(item);
    const temperature = createDiv('forecast-temperature')
    .html(`${parseInt(item.main.temp)} &deg`);
    const img = createIcon(item).addClass('svg');
    const icon = createDiv('forecast-icon').html(img);
    const weather = createDiv('forecast-weather').append(temperature, icon);
    const hourForecast = createDiv('hourly-forecast clearfix').append(date, weather);
    return createDiv('forecast').append(hourForecast);
};

const createCurrentWeather = (item) => {
    const date = new Date(item[0].dt_txt);
    const day = insertNil(date.getDate());
    const month = insertNil(date.getMonth() + 1);
    const dayTitle = WEEK_DAY[date.getDay()];
    const currentDate = `${dayTitle} ${day}/${month}`;
    const temperature = parseInt(item[0].main.temp);
    $('.date').text(currentDate);
    $('.current-temperature').html(`${temperature} &deg`);
    const icon = createIcon(item[0]).addClass('weather-icon');
    $('.weather-icon').html(icon);
};

const insertNil = (number) => {
    parseInt(number) < 10 ? number = '0' + number : number;
    return number;
};
