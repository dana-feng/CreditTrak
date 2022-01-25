package com.dana.my_expenses.entity;
import java.util.Date;

public class Expense {
    private Date date;
    private String item;
    private Double price;
    private String id;
    private String card;
    private String owner;

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Expense() {

    }

    public String getCard() {
        return card;
    }

    public Expense(Date date, String item, Double price, String id, String card, String owner) {
        this.date = date;
        this.item = item;
        this.price = price;
        this.id = id;
        this.card = card;
        this.owner = owner;
    }

    public Expense(Date date, String item, Double price, String card, String owner) {
        this.date = date;
        this.item = item;
        this.price = price;
        this.card = card;
        this.owner = owner;
    }

    public void setCard(String creditCard) {
        card = creditCard;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "Date=" + date +
                ", Item='" + item + '\'' +
                ", Price=" + price +
                ", id='" + id + '\'' +
                ", CreditCard='" + card + '\'' +
                '}';
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date name) {
        this.date = name;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
