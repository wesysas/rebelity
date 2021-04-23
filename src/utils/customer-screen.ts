import { Plugins } from '@capacitor/core';
import 'capacitor-plugin-sunmi-screen';
import { openAlert } from '../pages/AlertModal/actions';
import { Order } from '../pages/Pos/types';
const { SunmiScreen } = Plugins;

export const displayCart = (order: Order, enableTouch: boolean) => {
    SunmiScreen.displayCart({order, enableTouch}).then((res: any) => {
        if (!res.result) {
            openAlert({
                title: "Customer screen",
                text: "Connection failed"
            });
        }
    })
    .catch((err: any) => {
        openAlert({
            title: "Customer screen",
            text: "Unknown error"
        });
    });
}

export const getTip = (enableTouch: boolean) => {
    return SunmiScreen.getTip({enableTouch});
}

export const showImageByUrl = (url: string, enableTouch: boolean) => {
    SunmiScreen.showImageByUrl({url, enableTouch}).then((res: any) => {
        if (!res.result) {
            openAlert({
                title: "Customer screen",
                text: "Connection failed"
            });
        }
    })
    .catch((err: any) => {
        openAlert({
            title: "Customer screen",
            text: "Unknown error"
        });
    });
}

export const showVideoByUrl = (url: string, enableTouch: boolean) => {
    SunmiScreen.showVideoByUrl({url, enableTouch}).then((res: any) => {
        if (!res.result) {
            openAlert({
                title: "Customer screen",
                text: "Connection failed"
            });
        }
    })
    .catch((err: any) => {
        openAlert({
            title: "Customer screen",
            text: "Unknown error"
        });
    });
}

export const showWebsiteByUrl = (url: string, enableTouch: boolean) => {
    SunmiScreen.showWebsiteByUrl({url, enableTouch}).then((res: any) => {
        if (!res.result) {
            openAlert({
                title: "Customer screen",
                text: "Connection failed"
            })
        }
    })
    .catch((err: any) => {
        openAlert({
            title: "Customer screen",
            text: "Unknown error"
        })
    });
}