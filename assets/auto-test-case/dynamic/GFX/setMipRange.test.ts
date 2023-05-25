import { director, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames, PlatformEnum } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('setMipRange', 'setMipRange', [PlatformEnum.WEB_MOBILE, PlatformEnum.HUAWEI_QUICK_GAME, PlatformEnum.OPPO_MINI_GAME])
export class setMipRange{
    _dt = 50;
    _totalFrames = 0;

    @testCase
    async startPlay() {
        let num = 1000; //Used for counting frames, up to 1000 frames
        let isReadyCubemap = find('control')!.getComponent('setMipRange_cubemap').ready;
        let isReadyQuad = find('control')!.getComponent('setMipRange_quad').ready;
        while(!isReadyCubemap && !isReadyQuad && num>0){
            isReadyCubemap = find('control')!.getComponent('setMipRange_cubemap').ready;
            isReadyQuad = find('control')!.getComponent('setMipRange_quad').ready;
            num -= 1;
            await waitForFrames(1); 
        }

        await screenshot_custom_by_wait();
        this._totalFrames = director.getTotalFrames();
        for (let i = 0; i < 7; i++) {
            await screenshot_custom_by_wait(this._dt * (i + 1) + this._totalFrames - director.getTotalFrames());
        }
    }
}
