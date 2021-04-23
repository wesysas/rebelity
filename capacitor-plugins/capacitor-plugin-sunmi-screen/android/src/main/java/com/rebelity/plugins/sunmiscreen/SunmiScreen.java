package com.rebelity.plugins.sunmiscreen;

import android.Manifest;
import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;

import androidx.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.rebelity.plugins.sunmiscreen.model.LineItem;
import com.rebelity.plugins.sunmiscreen.model.LineItemOption;
import com.rebelity.plugins.sunmiscreen.model.Order;
import com.rebelity.plugins.sunmiscreen.presentation.CartDisplay;
import com.rebelity.plugins.sunmiscreen.presentation.ImageDisplay;
import com.rebelity.plugins.sunmiscreen.presentation.VideoDisplay;
import com.rebelity.plugins.sunmiscreen.presentation.WebDisplay;
import com.rebelity.plugins.sunmiscreen.utils.ScreenManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@NativePlugin(
    requestCodes={
        SunmiScreen.REQUEST_INTERNET,
    }
)
public class SunmiScreen extends Plugin {
    protected static final int REQUEST_INTERNET = 1991;
    private final ScreenManager screenManager = ScreenManager.getInstance();
    private final Handler mHandler = new Handler();
    public static Order order = null;
    private CartDisplay cartDisplay = null;
    private ImageDisplay imageDisplay = null;
    private VideoDisplay videoDisplay = null;
    private WebDisplay webDisplay = null;

    private void formatOrder(JSObject orderData) {
        Order myOrder = new Order();

        try {
            myOrder.price = orderData.getDouble("price");
            myOrder.tax = orderData.getDouble("tax");
            myOrder.cardFee = orderData.getDouble("cardFee");
            myOrder.tip = orderData.getDouble("tip");
            myOrder.payAmount = orderData.getDouble("payAmount");

            JSONArray lineItems = orderData.getJSONArray("lineitems");
            for (int i = 0; i < lineItems.length(); i++) {
                JSONObject lineItem = lineItems.getJSONObject(i);

                LineItem item = new LineItem();
                item.productId = lineItem.getString("productId");
                item.productName = lineItem.getString("productName");
                item.variantId = lineItem.getInt("variantId");
                item.variantName = lineItem.getString("variantName");
                item.name = lineItem.getString("name");
                item.quantity = lineItem.getInt("quantity");
                item.cost = lineItem.getInt("cost");
                item.taxRate = lineItem.getInt("taxRate");

                JSONArray itemOptions = lineItem.getJSONArray("options");
                for (int j = 0; j < itemOptions.length(); j++) {
                    JSONObject itemOption = itemOptions.getJSONObject(j);

                    LineItemOption option = new LineItemOption();
                    option.optionId = itemOption.getInt("optionId");
                    option.cost = itemOption.getDouble("cost");
                    option.name = itemOption.getString("name");
                    option.quantity = itemOption.getInt("quantity");
                    item.options.add(option);
                }

                myOrder.lineitems.add(item);
            }

            SunmiScreen.order = myOrder;
        } catch (JSONException e) {
            Log.e("SunmiScreen Exception", e.getMessage());
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void displayCart(PluginCall call) {
        formatOrder(call.getObject("order"));

        screenManager.init(getContext());
        final Display customerScreen = screenManager.getPresentationDisplays();
        if (customerScreen != null) {
            dismissAllDisplays(false);
            final boolean allowTouch = call.getBoolean("enableTouch");
            if (Looper.myLooper() == mHandler.getLooper()) {
                if (cartDisplay != null) {
                    cartDisplay.updateSaleData();
                } else {
                    cartDisplay = new CartDisplay(getContext(), customerScreen, allowTouch);
                    cartDisplay.show();
                }
            } else {
                mHandler.post(new Runnable() {
                    @Override
                    public void run() {
                    if (cartDisplay != null) {
                        cartDisplay.updateSaleData();
                    } else {
                        cartDisplay = new CartDisplay(getContext(), customerScreen, allowTouch);
                        cartDisplay.show();
                    }
                    }
                });
            }
        }

        JSObject ret = new JSObject();
        ret.put("result", customerScreen != null);
        call.success(ret);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void getTip(PluginCall call) {
        screenManager.init(getContext());
        Display customerScreen = screenManager.getPresentationDisplays();
        if (customerScreen != null && cartDisplay != null) {
            cartDisplay.setTouchable(true);
            cartDisplay.showTipping();
            cartDisplay.call = call;
        } else {
            JSObject ret = new JSObject();
            ret.put("result", -1);
            call.success(ret);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void showImageByUrl(PluginCall call) {
        final String url = call.getString("url");
        final boolean allowTouch = call.getBoolean("enableTouch");
        pluginRequestPermission(Manifest.permission.INTERNET, REQUEST_INTERNET);

        screenManager.init(getContext());
        final Display customerScreen = screenManager.getPresentationDisplays();
        if (customerScreen != null) {
            dismissAllDisplays(true);
            if (Looper.myLooper() == mHandler.getLooper()) {
                imageDisplay = new ImageDisplay(getContext(), customerScreen, url, allowTouch);
                imageDisplay.show();
            } else {
                mHandler.post(new Runnable() {
                    @Override
                    public void run() {
                    imageDisplay = new ImageDisplay(getContext(), customerScreen, url, allowTouch);
                    imageDisplay.show();
                    }
                });
            }
        }

        JSObject ret = new JSObject();
        ret.put("result", customerScreen != null);
        call.success(ret);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void showVideoByUrl(PluginCall call) {
        final String url = call.getString("url");
        final boolean allowTouch = call.getBoolean("enableTouch");
        pluginRequestPermission(Manifest.permission.INTERNET, REQUEST_INTERNET);

        screenManager.init(getContext());
        final Display customerScreen = screenManager.getPresentationDisplays();
        if (customerScreen != null) {
            dismissAllDisplays(true);
            if (Looper.myLooper() == mHandler.getLooper()) {
                videoDisplay = new VideoDisplay(getContext(), customerScreen, url, allowTouch);
                videoDisplay.show();
            } else {
                mHandler.post(new Runnable() {
                    @Override
                    public void run() {
                    videoDisplay = new VideoDisplay(getContext(), customerScreen, url, allowTouch);
                    videoDisplay.show();
                    }
                });
            }
        }

        JSObject ret = new JSObject();
        ret.put("result", customerScreen != null);
        call.success(ret);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @PluginMethod
    public void showWebsiteByUrl(PluginCall call) {
        final String url = call.getString("url");
        final boolean allowTouch = call.getBoolean("enableTouch");
        pluginRequestPermission(Manifest.permission.INTERNET, REQUEST_INTERNET);

        screenManager.init(getContext());
        final Display customerScreen = screenManager.getPresentationDisplays();
        if (customerScreen != null) {
            dismissAllDisplays(true);
            if (Looper.myLooper() == mHandler.getLooper()) {
                webDisplay = new WebDisplay(getContext(), customerScreen, url, allowTouch);
                webDisplay.show();
            } else {
                mHandler.post(new Runnable() {
                    @Override
                    public void run() {
                    webDisplay = new WebDisplay(getContext(), customerScreen, url, allowTouch);
                    webDisplay.show();
                    }
                });
            }
        }

        JSObject ret = new JSObject();
        ret.put("result", customerScreen != null);
        call.success(ret);
    }

    private void dismissAllDisplays(boolean bDismissCart) {
        if (bDismissCart && cartDisplay != null) {
            cartDisplay.dismiss();
            cartDisplay = null;
        }
        if (imageDisplay != null) {
            imageDisplay.dismiss();
            imageDisplay = null;
        }
        if (videoDisplay != null) {
            videoDisplay.dismiss();
            videoDisplay = null;
        }
        if (webDisplay != null) {
            webDisplay.dismiss();
            webDisplay = null;
        }
    }
}
