package com.rebelity.plugins.sunmiscreen.utils;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.rebelity.plugins.sunmiscreen.capacitorpluginsunmiscreen.R;
import com.rebelity.plugins.sunmiscreen.model.LineItem;

import java.text.DecimalFormat;
import java.util.ArrayList;

public class RecyclerItemsAdapter extends RecyclerView.Adapter<RecyclerItemsAdapter.ViewHolder> {

    private ArrayList<LineItem> items;
    private RecyclerView.LayoutManager viewManagerOptionList = null;
    private RecyclerOptionsAdapter viewAdapterOptionList = null;
    private Context context = null;

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView txtItemName;
        private final TextView txtItemPrice;
        private final TextView txtItemQty;
        private final TextView txtItemTotal;
        private final RecyclerView recOptionList;

        public ViewHolder(View view) {
            super(view);

            txtItemName = (TextView) view.findViewById(R.id.txtItemName);
            txtItemPrice = (TextView) view.findViewById(R.id.txtItemPrice);
            txtItemQty = (TextView) view.findViewById(R.id.txtItemQty);
            txtItemTotal = (TextView) view.findViewById(R.id.txtItemTotal);
            recOptionList = (RecyclerView) view.findViewById(R.id.recOptionList);
        }

        public TextView getTxtItemName() {
            return txtItemName;
        }
        public TextView getTxtItemPrice() {
            return txtItemPrice;
        }
        public TextView getTxtItemQty() {
            return txtItemQty;
        }
        public TextView getTxtItemTotal() {
            return txtItemTotal;
        }
        public RecyclerView getRecOptionList() {
            return recOptionList;
        }
    }

    /**
     * Initialize the dataset of the Adapter.
     *
     * @param dataSet String[] containing the data to populate views to be used
     * by RecyclerView.
     */
    public RecyclerItemsAdapter(ArrayList<LineItem> dataSet, Context context) {
        this.context = context;
        items = dataSet;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.sale_item_layout, viewGroup, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        LineItem item = items.get(position);
        viewHolder.getTxtItemName().setText(item.name);
        viewHolder.getTxtItemPrice().setText(decimalFormat.format(item.cost));
        viewHolder.getTxtItemQty().setText(item.quantity + "");
        viewHolder.getTxtItemTotal().setText(decimalFormat.format(item.cost * item.quantity));

        viewAdapterOptionList = new RecyclerOptionsAdapter(item.options);
        RecyclerView recOptionList = viewHolder.getRecOptionList();
        recOptionList.setHasFixedSize(true);
        recOptionList.setLayoutManager(new LinearLayoutManager(context));
        recOptionList.setAdapter(viewAdapterOptionList);
    }

    @Override
    public int getItemCount() {
        return items.size();
    }
}
