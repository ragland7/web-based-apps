package com.example.surveyrestapi.models;

public class SurveyItemInstance {
    private Long id;
    private SurveyItem surveyItem;
    private String userAnswer;
    private boolean correct;

    public SurveyItemInstance(Long id, SurveyItem surveyItem, String userAnswer, boolean correct) {
        this.id = id;
        this.surveyItem = surveyItem;
        this.userAnswer = userAnswer;
        this.correct = correct;
    }

    public SurveyItemInstance() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SurveyItem getSurveyItem() { return surveyItem; }
    public void setSurveyItem(SurveyItem surveyItem) { this.surveyItem = surveyItem; }

    public String getUserAnswer() { return userAnswer; }
    public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }

    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
}