package com.example.surveyrestapi;

import com.example.surveyrestapi.models.Survey;
import com.example.surveyrestapi.models.SurveyItem;
import com.example.surveyrestapi.repositories.SurveyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class SurveyRestApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SurveyRestApiApplication.class, args);
    }

    @Bean
    CommandLineRunner preloadData(SurveyRepository repository) {
        return args -> {
            SurveyItem question1 = new SurveyItem(null, "6 * 7 =", Arrays.asList("0", "1", "13", "33", "42"), "42");
            SurveyItem question2 = new SurveyItem(null, "23 + 10 =", Arrays.asList("0", "1", "13", "33", "42"), "33");
            SurveyItem question3 = new SurveyItem(null, "The answer to everything is", Arrays.asList("0", "1", "13", "33", "42"), "42");

            Survey survey = new Survey(null, "Math Quiz");
            survey.getSurveyItems().add(question1);
            survey.getSurveyItems().add(question2);
            survey.getSurveyItems().add(question3);

            repository.save(survey);
        };
    }
}
