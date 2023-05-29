// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';
import { find } from 'cc';

@runScene('multi-canvas')
@testClass('MultiCanvas')
export class MultiCanvas {
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async clickLeftButton() {
        for (let i = 0; i < 5; i++) {
            //@ts-ignore
            find(`Canvas${i}/Button0-${i}`)!.getComponent('cc.Button')!.clickEvents[0].emit([]);
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async clickRightButton() {
        for (let i = 0; i < 5; i++) {
            //@ts-ignore
            find(`CanvasP${i}/Button1-${i}`)!.getComponent('ClickEvent')!.onButtonClick();
            await screenshot_custom(this._dt);
        }
    }

    // @testCase
    // async clickLeftButton() {
    //     for (let i = 0; i < 5; i++) {
    //         //@ts-ignore
    //         find(`Canvas${i}/Button0-${i}`).getComponent('cc.Button').clickEvents[0].emit([]);
    //         await screenshot_custom(this._dt)
    //     }
    // }

    // @testCase
    // async clickRightButton() {
    //     for (let i = 0; i < 5; i++) {
    //         //@ts-ignore
    //         find(`CanvasP${i}/Button1-${i}`).getComponent('ClickEvent').onButtonClick();
    //         await screenshot_custom(this._dt)
    //     }
    // }
}