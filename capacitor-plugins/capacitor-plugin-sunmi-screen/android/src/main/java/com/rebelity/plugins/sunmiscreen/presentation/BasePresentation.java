package com.rebelity.plugins.sunmiscreen.presentation;

import android.app.Presentation;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.WindowManager;

public abstract class BasePresentation extends Presentation implements View.OnClickListener {
    private static final String TAG = "BasePresentation";
    public boolean isShow;
    int index;
    public View.OnClickListener onClickListener;
    public BasePresentationHelper helper = BasePresentationHelper.getInstance();
    private final Handler mHandler = new Handler();

    public BasePresentation(Context outerContext, Display display) {
        super(outerContext, display);
        index = helper.add(this);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    public void setOnClickListener(View.OnClickListener l) {
        onClickListener = l;
    }

    @Override
    public void hide() {
        super.hide();
        helper.hide(this);
        isShow = false;
    }

    @Override
    public void show() {
        super.show();
        helper.show(index);
        isShow = true;
    }

    @Override
    public void dismiss() {
        isShow = false;
        super.dismiss();
    }

    @Override
    public void onClick(View v) {
        if (onClickListener != null) {
            onClickListener.onClick(v);
        }
    }

    public abstract void onSelect(boolean isShow);

    public void setTouchable(final boolean allow) {
        if (Looper.myLooper() == mHandler.getLooper()) {
            if (!allow) {
                getWindow().setFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                    WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
            } else {
                getWindow().clearFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
            }
        } else {
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                if (!allow) {
                    getWindow().setFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                        WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
                } else {
                    getWindow().clearFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE);
                }
                }
            });
        }
    }
}
