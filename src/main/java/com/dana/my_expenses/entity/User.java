package com.dana.my_expenses.entity;

public class User {
    private String name;
    private String id;
    private Integer budget;

    public User(String name, String id, Integer budget) {
        this.name = name;
        this.id = id;
        this.budget = budget;
    }

    public User(String name, Integer budget) {
        this.name = name;
        this.budget = budget;
    }

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                ", budget=" + budget +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getBudget() {
        return budget;
    }

    public void setBudget(Integer budget) {
        this.budget = budget;
    }
}
