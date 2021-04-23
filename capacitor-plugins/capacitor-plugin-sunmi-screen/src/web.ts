import { WebPlugin } from '@capacitor/core';
import { SunmiScreenPlugin } from './definitions';

export class SunmiScreenWeb extends WebPlugin implements SunmiScreenPlugin {
  constructor() {
    super({
      name: 'SunmiScreen',
      platforms: ['web'],
    });
  }

  async displayCart(options: {order: object, enableTouch: boolean}): Promise<{ result: boolean }> {
    console.log(options);
    return {
      result: true
    };
  }

  async getTip(options: {enableTouch: boolean}): Promise<{ result: number }> {
    console.log(options);
    return {
      result: 0
    };
  }

  async showImageByUrl(options: { url: string, enableTouch: boolean }): Promise<{ result: boolean }> {
    console.log(options);
    return {
      result: true
    };
  }

  async showVideoByUrl(options: { url: string, enableTouch: boolean }): Promise<{ result: boolean }> {
    console.log(options);
    return {
      result: true
    };
  }

  async showWebsiteByUrl(options: { url: string, enableTouch: boolean }): Promise<{ result: boolean }> {
    console.log(options);
    return {
      result: true
    };
  }
}

const SunmiScreen = new SunmiScreenWeb();

export { SunmiScreen };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(SunmiScreen);
