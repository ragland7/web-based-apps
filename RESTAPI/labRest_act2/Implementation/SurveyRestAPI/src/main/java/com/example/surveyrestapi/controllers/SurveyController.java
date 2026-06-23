package com.example.surveyrestapi.controllers;

import com.example.surveyrestapi.models.Survey;
import com.example.surveyrestapi.models.SurveyItem;
import com.example.surveyrestapi.repositories.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/surveys")
public class SurveyController {

    @Autowired
    private SurveyRepository repository;

    // Create a new survey
    @PostMapping
    public Survey createSurvey(@RequestBody Survey survey) {
        return repository.save(survey);
    }

    // Get all surveys
    @GetMapping
    public List<Survey> getAllSurveys() {
        return repository.findAll();
    }

    // Get a specific survey by ID
    @GetMapping("/{id}")
    public Survey getSurveyById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survey not found"));
    }

    // Add a survey item to a specific survey
    @PostMapping("/{id}/items")
    public Survey addSurveyItem(@PathVariable Long id, @RequestBody SurveyItem surveyItem) {
        Survey survey = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survey not found"));

        survey.getSurveyItems().add(surveyItem);
        return repository.save(survey);
    }

    // Delete a survey by ID
    @DeleteMapping("/{id}")
    public void deleteSurvey(@PathVariable Long id) {
        repository.delete(id);
    }
}