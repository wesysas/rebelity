package com.rebelity.plugins.sunmiscreen.model;

import java.util.ArrayList;

public class LineItem {
    public String productId;
    public String productName;
    public int variantId;
    public String variantName;
    public String name;
    public int quantity;
    public double cost;
    public double taxRate;
    public ArrayList<LineItemOption> options;

    public LineItem() {
        productId = "";
        productName = "";
        variantId = 0;
        variantName = "";
        name = "";
        quantity = 0;
        cost = 0;
        taxRate = 0;
        options = new ArrayList<>();
    }
}
