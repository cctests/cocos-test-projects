
import { Component, find, Button } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames, beforeClass, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { NetworkDownload as NetworkDownloadObj } from '../../../cases/network/NetworkDownload';
import { screenshot_custom } from '../common/utils';

@testClass('NetworkDownload', 'network-download', [PlatformEnum.WEB_DESKTOP, PlatformEnum.WEB_MOBILE, PlatformEnum.WECHATGAME, PlatformEnum.BYTEDANCE_MINI_GAME, PlatformEnum.OPPO_MINI_GAME, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.VIVO_MINI_GAME])
export class NetworkDownload {
    tickTime: number = 60;
    networkDownloadButton!: Button | null;
    networkDownloadObject!: NetworkDownloadObj | null;

    @beforeClass
    async initData() {
        const buttonNode = find("Canvas/Button")!;
        this.networkDownloadButton = buttonNode.getComponent(Button) as Button;
        this.networkDownloadObject = buttonNode.getComponent("NetworkDownload") as NetworkDownloadObj;
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async clickButton() {
        let count = 0;
        let tickTimeout = 0;
        this.networkDownloadButton!.clickEvents[0].emit([]);
        do {
            tickTimeout += this.tickTime;
            await waitForFrames(this.tickTime);
            console.log('NetworkDownload:', this.networkDownloadObject?.text.string);
            if (this.networkDownloadObject!.status.string === "status: Success") {
                console.log('NetworkDownload status: Success');
                break;
            } else if (this.networkDownloadObject!.status.string === "status: Error") {
                count += 1;
                if (count >= 3) {
                    console.log('NetworkDownload exit after 3 failed attempts.');
                    break;
                } else {
                    tickTimeout = 0;
                    console.log('NetworkDownload status: Error, then retry:', count);
                    this.networkDownloadButton!.clickEvents[0].emit([]);
                }
            }
        } while (tickTimeout < 7200)
        await screenshot_custom();
    }
}