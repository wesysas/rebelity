package com.rebelity.plugins.sunmiscreen.utils;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.rebelity.plugins.sunmiscreen.capacitorpluginsunmiscreen.R;
import com.rebelity.plugins.sunmiscreen.model.LineItem;
import com.rebelity.plugins.sunmiscreen.model.LineItemOption;

import java.text.DecimalFormat;
import java.util.ArrayList;

public class RecyclerOptionsAdapter extends RecyclerView.Adapter<RecyclerOptionsAdapter.ViewHolder> {

    private ArrayList<LineItemOption> options;

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView txtOptionName;
        private final TextView txtOptionPrice;
        private final TextView txtOptionQty;
        private final TextView txtOptionTotal;

        public ViewHolder(View view) {
            super(view);

            txtOptionName = (TextView) view.findViewById(R.id.txtOptionName);
            txtOptionPrice = (TextView) view.findViewById(R.id.txtOptionPrice);
            txtOptionQty = (TextView) view.findViewById(R.id.txtOptionQty);
            txtOptionTotal = (TextView) view.findViewById(R.id.txtOptionTotal);
        }

        public TextView getTxtOptionName() {
            return txtOptionName;
        }
        public TextView getTxtOptionPrice() {
            return txtOptionPrice;
        }
        public TextView getTxtOptionQty() {
            return txtOptionQty;
        }
        public TextView getTxtOptionTotal() {
            return txtOptionTotal;
        }
    }

    /**
     * Initialize the dataset of the Adapter.
     *
     * @param dataSet String[] containing the data to populate views to be used
     * by RecyclerView.
     */
    public RecyclerOptionsAdapter(ArrayList<LineItemOption> dataSet) {
        options = dataSet;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        // Create a new view, which defines the UI of the list item
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.item_option_layout, viewGroup, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        LineItemOption option = options.get(position);
        viewHolder.getTxtOptionName().setText(option.name);
        viewHolder.getTxtOptionPrice().setText(decimalFormat.format(option.cost));
        viewHolder.getTxtOptionQty().setText(option.quantity + "");
        viewHolder.getTxtOptionTotal().setText(decimalFormat.format(option.cost * option.quantity));
    }

    @Override
    public int getItemCount() {
        return options.size();
    }
}
