
package com.rebelity.plugins.sunmiscreen.player;

import android.view.SurfaceHolder;
import android.view.View;

/**
 * Description:
 */
public interface IMDisplay extends IMPlayListener {

    View getDisplayView();
    SurfaceHolder getHolder();

}
