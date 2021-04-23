package com.rebelity.plugins.sunmiscreen.presentation;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Display;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import com.rebelity.plugins.sunmiscreen.SunmiScreen;
import com.rebelity.plugins.sunmiscreen.capacitorpluginsunmiscreen.R;
import com.rebelity.plugins.sunmiscreen.utils.RecyclerItemsAdapter;

import java.text.DecimalFormat;

public class CartDisplay extends BasePresentation {

    private Context context;
    private final Handler mHandler = new Handler();
    public PluginCall call = null;
    private RecyclerView recItemList = null;
    private RecyclerItemsAdapter viewAdapterItemList = null;

    public CartDisplay(Context context, Display display, boolean enableTouch) {
        super(context, display);
        this.context = context;
        setTouchable(enableTouch);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.cart_layout);
        initView();
        updateSaleData();
    }

    @Override
    public void onSelect(boolean isShow) {

    }

    protected void initView() {
        Button btnNone = findViewById(R.id.btnNone);
        btnNone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(0f, "percent");
            }
        });

        Button btnPerc5 = findViewById(R.id.btnPerc5);
        btnPerc5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(5f, "percent");
            }
        });

        Button btnPerc10 = findViewById(R.id.btnPerc10);
        btnPerc10.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(10f, "percent");
            }
        });

        Button btnPerc15 = findViewById(R.id.btnPerc15);
        btnPerc15.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(15f, "percent");
            }
        });

        Button btnPerc20 = findViewById(R.id.btnPerc20);
        btnPerc20.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(20f, "percent");
            }
        });

        Button btnPerc25 = findViewById(R.id.btnPerc25);
        btnPerc25.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(25f, "percent");
            }
        });

        Button btnPerc30 = findViewById(R.id.btnPerc30);
        btnPerc30.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTip(30f, "percent");
            }
        });

        final EditText txtCustomTip = findViewById(R.id.txtCustomTip);

        Button btnClear = findViewById(R.id.btnClear);
        btnClear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                txtCustomTip.setText("");
            }
        });

        Button btnContinue = findViewById(R.id.btnContinue);
        btnContinue.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String customTip = txtCustomTip.getText().toString();
                if (customTip.isEmpty()) {
                    Toast.makeText(context, "Please input custom tip",
                            Toast.LENGTH_LONG).show();
                } else {
                    sendTip(Float.valueOf(customTip), "amount");
                }
            }
        });
    }

    public void updateSaleData() {
        if (Looper.myLooper() == mHandler.getLooper()) {
            LinearLayout tippingLayout = findViewById(R.id.tippingPanel);
            tippingLayout.setVisibility(View.INVISIBLE);
            updateSaleValues();
        } else {
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                LinearLayout tippingLayout = findViewById(R.id.tippingPanel);
                tippingLayout.setVisibility(View.INVISIBLE);
                updateSaleValues();
                }
            });
        }
    }

    protected void updateSaleValues() {
        // Update item list
        viewAdapterItemList = new RecyclerItemsAdapter(SunmiScreen.order.lineitems, context);
        recItemList = findViewById(R.id.recItemList);
        recItemList.setHasFixedSize(true);
        recItemList.setLayoutManager(new LinearLayoutManager(context));
        recItemList.setAdapter(viewAdapterItemList);

        // Update sale values
        DecimalFormat decimalFormat = new DecimalFormat("0.##");
        TextView txtSubTotal = findViewById(R.id.txtSubTotal);
        txtSubTotal.setText(decimalFormat.format(SunmiScreen.order.price));
        TextView txtCardFee = findViewById(R.id.txtCardFee);
        txtCardFee.setText(decimalFormat.format(SunmiScreen.order.cardFee));
        TextView txtTax = findViewById(R.id.txtTax);
        txtTax.setText(decimalFormat.format(SunmiScreen.order.tax));
        TextView txtTip = findViewById(R.id.txtTip);
        txtTip.setText(decimalFormat.format(SunmiScreen.order.tip));
        TextView txtTotal = findViewById(R.id.txtTotal);
        txtTotal.setText(decimalFormat.format(SunmiScreen.order.payAmount));
    }

    public void showTipping() {
        if (Looper.myLooper() == mHandler.getLooper()) {
            LinearLayout tippingLayout = findViewById(R.id.tippingPanel);
            tippingLayout.setVisibility(View.VISIBLE);
        } else {
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                LinearLayout tippingLayout = findViewById(R.id.tippingPanel);
                tippingLayout.setVisibility(View.VISIBLE);
                }
            });
        }
    }

    protected void sendTip(Float tip, String type) {
        LinearLayout tippingLayout = findViewById(R.id.tippingPanel);
        tippingLayout.setVisibility(View.INVISIBLE);

        boolean allowTouch = call.getBoolean("enableTouch");
        setTouchable(allowTouch);

        JSObject ret = new JSObject();
        ret.put("tip", tip);
        ret.put("type", type);
        call.success(ret);
    }
}

