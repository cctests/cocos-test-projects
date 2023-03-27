//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { IntersectRayTest } from '../../../cases/scene/raycast/IntersectRayTest';
import { screenshot_custom } from '../common/utils'
import { simulateTouchStart } from "../common/SimulateEvent"
import { Camera, Component, find } from 'cc';

@runScene('raycast-mesh&model')
@testClass('RaycastMeshModel')
export class RaycastMeshModel {
    intersecttraytest!: IntersectRayTest;
    camera!: Camera | Component;
    testData!: TestData;
    tickTime: number = 3;

    @beforeClass
    async initData() {
        //@ts-ignore
        this.intersecttraytest = find("Node")!.getComponent("IntersectRayTest")!;
        this.camera = find("Camera")?.getComponent("cc.Camera")!;
        await waitForFrames(1);
        this.testData = {
            CubeNonUniformScaled: {
                x: 932.5,
                y: 94.2500114440918
            },
            Cube: {
                x: 946.25,
                y: 366.7500114440918
            },
            BrainStem: {
                Right: {
                    x: 676.25,
                    y: 561.7500114440918
                },
                Left: {
                    x: 597.5,
                    y: 563.0000114440918
                },
                Up: {
                    x: 626.25,
                    y: 633.0000114440918
                },
                Down: {
                    x: 660,
                    y: 380.5000114440918
                }
            },
            Torus: {
                x: 161.25,
                y: 261.7500114440918
            }
        }
    }

    @testCase
    async startPage(){
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCubeNonUniformScaled() {
        const event = this.getEvent(this.testData.CubeNonUniformScaled.x, this.testData.CubeNonUniformScaled.y);
        this.intersecttraytest.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCube() {
        const event = this.getEvent(this.testData.Cube.x, this.testData.Cube.y);
        this.intersecttraytest.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickBrainStem() {
        const eventOne = this.getEvent(this.testData.BrainStem.Left!.x, this.testData.BrainStem.Left!.y);
        this.intersecttraytest.onTouchStart(eventOne);
        await screenshot_custom(this.tickTime);

        const eventTwo = this.getEvent(this.testData.BrainStem.Right!.x, this.testData.BrainStem.Right!.y);
        this.intersecttraytest.onTouchStart(eventTwo);
        await screenshot_custom(this.tickTime);

        const eventThree = this.getEvent(this.testData.BrainStem.Up!.x, this.testData.BrainStem.Up!.y);
        this.intersecttraytest.onTouchStart(eventThree);
        await screenshot_custom(this.tickTime);

        const eventFour = this.getEvent(this.testData.BrainStem.Down!.x, this.testData.BrainStem.Down!.y);
        this.intersecttraytest.onTouchStart(eventFour);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickTorus() {
        const eventFour = this.getEvent(this.testData.Torus.x, this.testData.Torus.y);
        this.intersecttraytest.onTouchStart(eventFour);
        await screenshot_custom(this.tickTime);
    }

    getEvent(x: number, y: number) {
        const event = simulateTouchStart(x, y);
        event.bubbles = false;
        event.touch!.setPrevPoint(x, y);
        return event;
    }
}

export type TestData = {
    CubeNonUniformScaled: XY,
    Cube: XY,
    BrainStem: {
        Left?: XY,
        Right?: XY,
        Up?: XY,
        Down?: XY
    },
    Torus: XY
}


export type XY = {
    x: number,
    y: number
}