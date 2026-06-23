package com.example.surveyrestapi.repositories;

import com.example.surveyrestapi.models.Survey;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class SurveyRepository {
    private Map<Long, Survey> surveys = new HashMap<>();
    private AtomicLong idCounter = new AtomicLong();

    public Survey save(Survey survey) {
        if (survey.getId() == null) {
            survey.setId(idCounter.incrementAndGet());
        }
        surveys.put(survey.getId(), survey);
        return survey;
    }

    public List<Survey> findAll() {
        return new ArrayList<>(surveys.values());
    }

    public Optional<Survey> findById(Long id) {
        return Optional.ofNullable(surveys.get(id));
    }

    public void delete(Long id) {
        surveys.remove(id);
    }
}
