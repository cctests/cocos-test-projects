import { Button, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('SpineAttach')
//@testClass('SpineAttach')
export class SpineAttach {
    _delay = 2;
    _dt = 20;

    @testCase
    async cacheNodes1() {
        // 点击cache按钮
        find('Canvas/Node-001/toggle cache')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();// 马上截图
        for (let i = 0; i < 2; i++) { //每个20dt，再截一次图
            await screenshot_custom(this._dt); 
        };
    }

    @testCase
    async cacheNodes2() {
        // 点击cache按钮
        find('Canvas/Node-001/toggle cache')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();// 马上截图
        for (let i = 0; i < 2; i++) { //每个20dt，再截一次图
            await screenshot_custom(this._dt); 
        };
    }

    @testCase
    async attachNodes() {
        // 点击attach按钮
        find('Canvas/Node-001/toggle attach')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();// 马上截图
        for (let i = 0; i < 2; i++) { //每个20dt，再截一次图
            await screenshot_custom(this._dt); 
        };
    }

    /**
    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeMode_realtime() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeMode()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeMode_cache() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeMode()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeAttach_01() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeAttach()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeAttach_02() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeAttach()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }
     */

}