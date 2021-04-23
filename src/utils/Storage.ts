import { Plugins } from '@capacitor/core';
import { isConstructorDeclaration } from 'typescript';

const { Storage } = Plugins;

class AStorage {
  public static async getItem(key: string) {
    try {
      const res: any = await Storage.get({ key: key });
      
      return res.value;//JSON.parse(res || 'null') as any;
    } catch (e) {
      console.error('Failed to get item from localStorage:', e);
      return null;
    }
  }

  public static async setItem(key: string, value: any) {
    try {
      await Storage.set({ key: key, value: JSON.stringify(value) });
    } catch (e) {
      console.error('Failed to set item to localStorage:', e);
      return null;
    }
  }

  public static async clear(key: string) {
    try {
      if (!key) {
        return await Storage.clear();
      }

      return await Storage.remove({ key: key });
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
      return null;
    }
  }
}

export default AStorage;
