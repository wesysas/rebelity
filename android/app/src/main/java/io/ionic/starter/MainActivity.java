package io.ionic.starter;
import com.rebelity.plugins.sunmiprinter.SunmiPrinter;
import com.rebelity.plugins.sunmiscreen.SunmiScreen;
import android.os.Bundle;


import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      add(SunmiPrinter.class);
      add(SunmiScreen.class);
    }});
  }
}
