package com.rebelity.plugins.sunmiscreen.presentation;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Display;
import android.view.SurfaceView;

import com.rebelity.plugins.sunmiscreen.capacitorpluginsunmiscreen.R;
import com.rebelity.plugins.sunmiscreen.player.IMPlayListener;
import com.rebelity.plugins.sunmiscreen.player.IMPlayer;
import com.rebelity.plugins.sunmiscreen.player.MPlayer;
import com.rebelity.plugins.sunmiscreen.player.MPlayerException;
import com.rebelity.plugins.sunmiscreen.player.MinimalDisplay;

public class VideoDisplay extends BasePresentation {

    private SurfaceView mPlayerView;
    private MPlayer player;
    private String url;
    public static int positon = 0;
    private Handler myHandle = new Handler(Looper.getMainLooper());

    public VideoDisplay(Context context, Display display, String url, boolean enableTouch) {
        super(context, display);
        this.url = url;
        setTouchable(enableTouch);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.video_layout);
        mPlayerView = findViewById(R.id.mPlayerView);

        initPlayer();
    }

    private void initPlayer() {
        player = new MPlayer();
        player.setDisplay(new MinimalDisplay(mPlayerView));
        player.setPlayListener(new IMPlayListener() {
            @Override
            public void onStart(IMPlayer player) {

            }

            @Override
            public void onPause(IMPlayer player) {

            }

            @Override
            public void onResume(IMPlayer player) {

            }

            @Override
            public void onComplete(IMPlayer player) {
                try {
                    player.setSource(url, 0);
                } catch (MPlayerException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    public void onSelect(boolean isShow) {
        if (player != null) {
            if (isShow) {
                try {
                    player.setSource(url, positon);
                    player.onResume();
                } catch (MPlayerException e) {
                    e.printStackTrace();
                    myHandle.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                        try {
                            player.setSource(url, 0);
                            player.onResume();
                        } catch (MPlayerException e1) {
                            e1.printStackTrace();
                        }
                        }
                    }, 3000);
                }
            } else {
                if (player.getPosition() != 0)
                    positon = player.getPosition();
            }
        }
    }

    @Override
    public void onDisplayRemoved() {
        super.onDisplayRemoved();
    }
}

