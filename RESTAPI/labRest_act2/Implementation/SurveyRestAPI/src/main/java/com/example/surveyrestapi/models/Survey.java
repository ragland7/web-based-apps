package com.example.surveyrestapi.models;

import java.util.ArrayList;
import java.util.List;

public class Survey {
    private Long id;
    private String title;
    private List<SurveyItem> surveyItems = new ArrayList<>();
    private String state = "Created"; // Created, Completed, Deleted

    public Survey(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Survey() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public List<SurveyItem> getSurveyItems() { return surveyItems; }
    public void setSurveyItems(List<SurveyItem> surveyItems) { this.surveyItems = surveyItems; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
}
