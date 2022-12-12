// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-texture-animation')
@testClass('ParticleTextureAnimation')
export class ParticleTextureAnimation {
    _delay = 0.2;
    _dt = 30;

    @testCase
    async startPlay() {
        await screenshot_custom();
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt);
        };
    }
}