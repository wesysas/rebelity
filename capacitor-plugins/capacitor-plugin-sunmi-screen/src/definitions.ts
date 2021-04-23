declare module '@capacitor/core' {
  interface PluginRegistry {
    SunmiScreen: SunmiScreenPlugin;
  }
}

export interface SunmiScreenPlugin {
  displayCart(options: {order: object, enableTouch: boolean}): Promise<{result: boolean}>;
  getTip(options: {enableTouch: boolean}): Promise<{result: number}>;
  showImageByUrl(options: {url: string, enableTouch: boolean}): Promise<{result: boolean}>;
  showVideoByUrl(options: {url: string, enableTouch: boolean}): Promise<{result: boolean}>;
  showWebsiteByUrl(options: {url: string, enableTouch: boolean}): Promise<{result: boolean}>;
}
