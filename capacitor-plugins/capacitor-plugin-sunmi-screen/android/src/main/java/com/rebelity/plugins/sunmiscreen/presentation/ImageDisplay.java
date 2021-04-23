package com.rebelity.plugins.sunmiscreen.presentation;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Display;
import android.widget.ImageView;

import com.rebelity.plugins.sunmiscreen.capacitorpluginsunmiscreen.R;

import java.io.InputStream;
import java.net.URL;

public class ImageDisplay extends BasePresentation {

    private ImageView mImageView;
    private String url;

    public ImageDisplay(Context context, Display display, String url, boolean enableTouch) {
        super(context, display);
        this.url = url;
        setTouchable(enableTouch);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.image_layout);
        mImageView = findViewById(R.id.mImageView);
        mImageView.setScaleType(ImageView.ScaleType.FIT_XY);

        try {
            InputStream is = (InputStream) new URL(url).getContent();
            Drawable d = Drawable.createFromStream(is, "src name");
            mImageView.setImageDrawable(d);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onSelect(boolean isShow) {

    }
}

