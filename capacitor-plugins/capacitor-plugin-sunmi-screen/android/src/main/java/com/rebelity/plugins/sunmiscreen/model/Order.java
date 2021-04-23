package com.rebelity.plugins.sunmiscreen.model;

import java.util.ArrayList;

public class Order {
    public ArrayList<LineItem> lineitems;
    public double price;
    public double tax;
    public double cardFee;
    public double tip;
    public double payAmount;

    public Order() {
        lineitems = new ArrayList<>();
        price = 0;
        tax = 0;
        cardFee = 0;
        tip = 0;
        payAmount = 0;
    }
}
