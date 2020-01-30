// How do you?
const WEATHER_API = {
    'url': 'http://api.openweathermap.org/data/2.5/forecast?',
    'ending': '&APPID=5aa54741590ecf3bdd72cfb0b762cf43&units=metric',
    'icon': 'http://openweathermap.org/img/wn/__img__@2x.png',
}
function getForecast() {
    $.ajax({
        type: 'GET',
        url: WEATHER_API.url + 'kyiv' + WEATHER_API.ending,
        success: function(result) {
            $('.test').text(result);
        },
        error: function() {
            $('.error').html('city not found');
        }
    });
}
