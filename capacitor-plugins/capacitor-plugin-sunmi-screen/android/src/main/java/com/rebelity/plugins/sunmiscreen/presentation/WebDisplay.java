package com.rebelity.plugins.sunmiscreen.presentation;

import android.content.Context;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.Display;
import android.view.WindowManager;
import android.webkit.WebView;

import com.rebelity.plugins.sunmiscreen.capacitorpluginsunmiscreen.R;

public class WebDisplay extends BasePresentation {

    private WebView mWebView;
    private String url;

    public WebDisplay(Context context, Display display, String url, boolean enableTouch) {
        super(context, display);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        this.url = url;
        setTouchable(enableTouch);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.web_layout);
        mWebView = findViewById(R.id.mWebView);
        mWebView.loadUrl(url);
    }

    @Override
    public void onSelect(boolean isShow) {

    }
}

