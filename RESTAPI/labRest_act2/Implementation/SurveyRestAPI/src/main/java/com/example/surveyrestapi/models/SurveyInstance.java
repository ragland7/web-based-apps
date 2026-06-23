package com.example.surveyrestapi.models;

import java.util.ArrayList;
import java.util.List;

public class SurveyInstance {
    private Long id;
    private String userName;
    private List<SurveyItemInstance> itemInstances = new ArrayList<>();
    private String state = "Created"; // Created, InProgress, Completed

    public SurveyInstance(Long id, String userName) {
        this.id = id;
        this.userName = userName;
    }

    public SurveyInstance() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public List<SurveyItemInstance> getItemInstances() { return itemInstances; }
    public void setItemInstances(List<SurveyItemInstance> itemInstances) { this.itemInstances = itemInstances; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
}