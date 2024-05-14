package com.react.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WeatherController {

    @GetMapping("/weather")
    public String getWeatherData() {
        String apiKey = "f5cee2776b05720a81722527b6bf4a4e";
        String apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=33.360949&lon=126.529803" + "&appid=" + apiKey + "&lang=kr&units=metric";

        // REST 템플릿을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String weatherData = restTemplate.getForObject(apiUrl, String.class);

        return weatherData;
    }
}






//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//import org.json.JSONObject;
//
//@SpringBootApplication
//public class WeatherApi {
//    public static void main(String[] args) {
//        SpringApplication.run(WeatherApi.class, args);
//    }
//
//    @RestController
//    public static class WeatherController {
//
//        @GetMapping("/weather")
//        public String getWeather(@RequestParam double latitude, @RequestParam double longitude) {
//            String apiKey = "f5cee2776b05720a81722527b6bf4a4e";
//            String lang = "kr";
//            String apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&lang=" + lang + "&units=metric";
//
//            // RestTemplate 생성
//            RestTemplate restTemplate = new RestTemplate();
//
//            // API 호출 및 응답 받기
//            ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);
//
//            // 응답 바디를 JSON으로 파싱
//            JSONObject jsonResponse = new JSONObject(responseEntity.getBody());
//
//            // 필요한 데이터 추출
//            String cityName = jsonResponse.getString("name");
//            JSONObject main = jsonResponse.getJSONObject("main");
//            double temperature = main.getDouble("temp");
//            double feelsLike = main.getDouble("feels_like");
//            double tempMin = main.getDouble("temp_min");
//            double tempMax = main.getDouble("temp_max");
//            int humidity = main.getInt("humidity");
//            int pressure = main.getInt("pressure");
//            JSONObject wind = jsonResponse.getJSONObject("wind");
//            int windDeg = wind.getInt("deg");
//            double windSpeed = wind.getDouble("speed");
//            JSONObject weather = jsonResponse.getJSONArray("weather").getJSONObject(0);
//            String weatherDescription = weather.getString("description");
//
//            // 결과 반환
//            return cityName + "의 날씨입니다.\n" +
//                    "날씨는 " + weatherDescription + "입니다.\n" +
//                    "현재 온도는 " + temperature + "입니다.\n" +
//                    "하지만 체감 온도는 " + feelsLike + "입니다.\n" +
//                    "최저 기온은 " + tempMin + "입니다.\n" +
//                    "최고 기온은 " + tempMax + "입니다.\n" +
//                    "습도는 " + humidity + "입니다.\n" +
//                    "기압은 " + pressure + "입니다.\n" +
//                    "풍향은 " + windDeg + "입니다.\n" +
//                    "풍속은 " + windSpeed + "입니다.";
//        }
//    }
//}
