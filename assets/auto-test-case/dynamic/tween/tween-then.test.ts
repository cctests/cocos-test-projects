// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('tween-then')
@testClass('TweenThen')
export class TweenThen {
    _dt = 30;

    @testCase
    async index() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async end() {
<<<<<<< HEAD
        await screenshot_custom(this._dt + 100);
=======
        await screenshot_custom(this._dt * 100);
>>>>>>> 06e3e273 (添加 v0.4.3 版本提测的 148 个测试脚本 (#741))
    }

}

