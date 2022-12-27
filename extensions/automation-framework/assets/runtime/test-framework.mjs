import{deflate as e}from"pako";import{PREVIEW as t,HTML5 as o}from"cc/env";var s,n,r,a,c;!function(e){let t,o;function s(e){return t!==e&&(t=e,o={name:void 0,scene:void 0,clazz:void 0,excludePlatforms:void 0,testCases:[],beforeClass:void 0,afterClass:void 0,beforeCase:void 0,afterCase:void 0}),o}e.allTestClasses=new Map,e.testClass=function(t,n,r){return a=>{s(a),o.name=t,o.clazz=a,n&&(o.scene=n),r&&(o.excludePlatforms=[...r]),e.allTestClasses.set(t,o)}},e.runScene=function(e){return t=>{s(t),o.scene=e}},e.testCase=function(e){if("object"!=typeof arguments[0]||!arguments[0].hasOwnProperty("constructor"))return(t,n)=>{s(t.constructor),o.testCases.push({caseName:n,excludePlatforms:e?[...e]:void 0})};s(arguments[0].constructor),o.testCases.push({caseName:arguments[1],excludePlatforms:void 0})},e.beforeClass=function(e,t){s(e.constructor),o.beforeClass=t},e.afterClass=function(e,t){s(e.constructor),o.afterClass=t},e.beforeCase=function(e,t){s(e.constructor),o.beforeCase=t},e.afterCase=function(e,t){s(e.constructor),o.afterCase=t}}(s||(s={})),function(e){var t,o;e.TEST_CONFIG_PATH="testConfig.json",e.WS_HEARTBEAT_TIMEOUT=285e3,(t=e.StateCode||(e.StateCode={})).START="Start",t.ERROR="Error",t.END="End",t.TEST="Test",t.IMAGEINIT="ImageInit",t.IMAGEEND="ImageEnd",(o=e.ResultCode||(e.ResultCode={})).PASS="PASS",o.FAIL="FAIL",o.NA="NA",function(e){e.ALL="all",e.ANDROID="android",e.IOS="ios",e.MAC="mac",e.WINDOWS="windows",e.HARMONY_OS="ohos",e.HUAWEI_AGC="huawei-agc",e.BYTEDANCE_MINI_GAME="bytedance-mini-game",e.OPPO_MINI_GAME="oppo-mini-game",e.HUAWEI_QUICK_GAME="huawei-quick-game",e.VIVO_MINI_GAME="vivo-mini-game",e.XIAOMI_QUICK_GAME="xiaomi-quick-game",e.BAIDU_MINI_GAME="baidu-mini-game",e.WECHATGAME="wechatgame",e.COCOS_PLAY="cocos-play",e.COCOS_RUNTIME="cocos-runtime",e.WEB_DESKTOP="web-desktop",e.WEB_MOBILE="web-mobile"}(e.PlatformEnum||(e.PlatformEnum={}))}(n||(n={})),function(e){let o,s,r,a,c=0,i=0;const l=new Map;let m="";function u(){s&&clearInterval(s),o&&(o.onopen=()=>{},o.onmessage=()=>{},o.onerror=()=>{},o.onclose=()=>{},f()&&o.close())}function f(){return null!==o&&o.readyState===WebSocket.OPEN}function g(){return++i}e.createWebsoket=async function(e="127.0.0.1",i=7345){return m=`http://${e}:${i}/`,new Promise((m=>{console.info("createWebsoket",`ws://${e}:${i}/ws/runtime`),o?m(!0):(a=()=>{o=new WebSocket(`ws://${e}:${i}/ws/runtime`),function(e){if(!o)return;o.onopen=()=>{console.info("WebSocket connected."),c=0,r=(new Date).getTime(),s=setInterval((()=>{const e=(new Date).getTime()-r;console.log("check ws timeout:",e),e>=n.WS_HEARTBEAT_TIMEOUT&&(console.log("因长时间无响应而导致超时，本次运行异常结束"),u(),t||cc.game.end())}),1e4),e(!0)},o.onmessage=async e=>{try{const{id:t,state:o,message:s}=JSON.parse(e.data);if(console.log(`ws.onmessage: id: ${t}, state: ${o}, message: ${s}`),r=(new Date).getTime(),["Image_Ok","Msg_Ok"].some((e=>e===o))&&t){const e=l.get(Number(t));clearTimeout(e.timeoutTimer),e.resolve(s),l.delete(t),console.log("msgQueue deleted: ",t)}}catch(e){console.error("WebSocket onmessage error",e)}},o.onerror=()=>{u(),++c<=5?(console.error(`WebSocket disconnect due to an error, retry connect (${c}) ...`),setTimeout(a,5e3)):console.error("WebSocket socket disconnect on error")},o.onclose=()=>{console.error("WebSocket closed."),u(),++c<=5?(console.error(`WebSocket disconnect, retry connect (${c}) ...`),setTimeout(a,5e3)):console.error("WebSocket socket closed.")}}(m)},a())}))},e.closeWebSocket=u,e.connected=f,e.getNowMsgId=g,e.postJson=async function(e){return new Promise(((t,s)=>{if(o){e.id||(e.id=g()),console.log("postJson:",JSON.stringify(e));const s=setTimeout((()=>{console.warn(`warn: postJson (message.id: ${e.id}) LocalServer respond timeout(30000)!`)}),3e4);l.set(e.id,{message:e,resolve:t,timeoutTimer:s}),o.send(JSON.stringify(e))}else s(new Error("WebSocket 尚未初始化"))}))},e.postBuffer=async function(e,t){return console.log(`postBuffer: msgId:${e} byteLength:${t.byteLength}`),new Promise(((s,n)=>{if(o){const n=setTimeout((()=>{console.warn(`warn: postBuffer (msgId: ${e}) LocalServer respond timeout(30000)!`)}),3e4);l.set(e,{message:t,resolve:s,timeoutTimer:n}),o.send(t)}else n(new Error("WebSocket 尚未初始化"))}))},e.httpRequest=async function(e,t,o){return new Promise(((s,n)=>{const r=new XMLHttpRequest;t.startsWith("http")||(t=m+t),r.open(e,t,!0),r.setRequestHeader("content-type","application/json"),r.send("POST"===e?JSON.stringify(o):null),r.onload=()=>{200!==r.status&&0!==r.status||s(r.response),400===r.status&&n(new Error(`request is bad,${r.responseText}`)),r.status>=500&&n(new Error(`server error,${r.responseText}`))},r.onerror=()=>{n(new Error(`post error,url= ${t}`))}}))}}(r||(r={})),function(e){let a,i;async function l(e){return console.log("loadScene:",e),new Promise(((t,o)=>{let s=1;const n=r=>{r?(console.error(`loadScene: ${e}, err: ${r}`),s<3?(console.log(`retry loadScene(${s}/3):`,e),cc.director.loadScene(e,n),s++):o(r)):(console.log(`loadScene: ${e} success`),t())};cc.director.loadScene(e,n)}))}function m(){return new Promise((e=>{cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH,(()=>{e()}))}))}e.run=async function(){try{const u=performance.now();cc.profiler.hideStats(),await m(),await async function(){if(console.log("loadTestConfig:",n.TEST_CONFIG_PATH),o){const t=await r.httpRequest("GET",`${n.TEST_CONFIG_PATH}?v=${(new Date).getTime()}`);e.testConfig=JSON.parse(t)}else e.testConfig=fsUtils.readJsonSync(n.TEST_CONFIG_PATH);a=e.testConfig.jobId,i=e.testConfig.platforms[0].platformIndex}(),await r.createWebsoket(e.testConfig.localServer.ip,e.testConfig.localServer.port),function(){const{log:e,error:t,timeEnd:o}=window.console;let s=0;const n=()=>s++;window.console.log=async(...o)=>{e(...o);const s=o.join(" ");await r.httpRequest("POST","runtime/log",{index:n(),type:"info",msg:s,platformIndex:i,jobId:a}).catch((e=>{t(e)}))},window.console.error=async(...e)=>{t(...e);const o=e.join(" ");await r.httpRequest("POST","runtime/log",{index:n(),type:"error",msg:o,platformIndex:i,jobId:a}).catch((e=>{t(e)}))},window.console.timeEnd=async e=>{o(e),e?.startsWith("LoadScene")&&await r.httpRequest("POST","runtime/log",{index:n(),type:"info",msg:e,platformIndex:i,jobId:a}).catch((e=>{t(e)}))},cc.debug._resetDebugSetting(2),window.addEventListener("error",(e=>{console.error(e.message)}))}(),console.log("▓▓▓▓▓▓▓▓ cctest-framework (ver:{packageJson.version}) runner start."),await async function(){const e={state:n.StateCode.START,jobId:a,platformIndex:i,logs:"Test Start"};return r.postJson(e)}(),await async function(){const t=e.testConfig.platforms[0].platformName,o=e.testConfig.platforms[0].testScripts;let n=0,m=0;o.forEach((e=>{n+=e.classNames.length})),console.log(`runAllTest: registered testClass: ${s.allTestClasses.size}, plan to run scripts: ${o.length}, testClass: ${n}`);for(const e of o)for(const o of e.classNames){m++;const u=s.allTestClasses.get(o);if(console.log(`■■■ run testClass (${m}/${n}) : {className: ${o}, scene: ${u?.scene}, testCases: [${u?.testCases.join(", ")}]}`),!u){console.warn(`‘${o}’ 并未通过 @testClass 注册，请检测查试配置是否正常`);continue}if(u.excludePlatforms&&u.excludePlatforms.includes(t)){console.warn(`${o} 排除 ${t} 平台，已跳过该 testClass`);continue}if(await r.httpRequest("POST","runtime/nowScript",{jobId:a,platformIndex:i,scriptName:e.scriptName,sceneName:u.scene,prevScriptImages:c.prevScriptImages}),c.prevScriptImages.length=0,u.scene)try{await l(u.scene)}catch(e){continue}const f=new u.clazz;if(u.beforeClass)try{await f[u.beforeClass].call(f)}catch(e){console.error(`call ${u.name}.beforeClass() failed: ${e}`);continue}for(const{caseName:s,excludePlatforms:n}of u.testCases)try{if(console.log("■ run testCase: ",s),n&&n.includes(t)){console.warn(`${o}.${s}() 排除 ${t} 平台，已跳过该 testCase`);continue}c.setNowInfo(e.scriptName,o,s),u.beforeCase&&await f[u.beforeCase].call(f),await f[s].call(f),u.afterCase&&await f[u.afterCase].call(f),console.log("run testCase finished: ",s)}catch(t){await r.httpRequest("POST","runtime/scriptRunError",{jobId:a,platformIndex:i,scriptName:e.scriptName,sceneName:u.scene}),console.error("run testCase failed: ",s,t)}if(u.afterClass)try{await f[u.afterClass].call(f)}catch(e){console.error(`call ${u.name}.afterClass() failed: ${e}`);continue}}await r.httpRequest("POST","runtime/nowScript",{jobId:a,platformIndex:i,scriptName:"",sceneName:"",prevScriptImages:c.prevScriptImages})}(),await async function(){const e={state:n.StateCode.END,jobId:a,platformIndex:i,logs:"Test End",imgList:c.imgList};return r.postJson(e)}(),console.log("cctest-framework runner finished. elapsed time:",performance.now()-u)}catch(e){console.error(e)}finally{S(10),r.closeWebSocket(),t||cc.game.end()}},e.ensureFirstSceneLaunched=m}(a||(a={})),function(t){let o;const s=new cc.RenderTexture,n=1280;async function c(){return new Promise((e=>{cc.director.once(cc.Director.EVENT_END_FRAME,(()=>{e()}))}))}s.reset({width:n,height:720}),t.imgList={},t.prevScriptImages=[],t.setNowInfo=function(e,t,s){o={testScript:e,className:t,caseName:s,imgIdx:0,imageName:"",width:0,height:0,imageData:new Uint8Array,originalBytes:0,testTimer:0}},t.waitForNextFrame=c,t.captureOneImage=async function(i){o.imgIdx++;const l=performance.now(),m=cc.director.getScene().getComponentsInChildren(cc.CameraComponent);await c(),m.forEach((e=>{e.targetTexture||(e.targetTexture=s)})),await c(),await c(),m.forEach((e=>{e.targetTexture===s&&(e.targetTexture=null)}));const u=s.readPixels();return 3686400!==u.byteLength?console.error("readPixels is not accord with width * height * 4"):(o.width=n,o.height=720,o.imageName=`${o.className}_${o.caseName}${i?`_${i}`:""}`,o.originalBytes=u.byteLength,o.imageData=e(u),o.testTimer=performance.now()-l,await async function(){const e=a.testConfig.jobId,s=a.testConfig.platforms[0].platformIndex,{testScript:n,className:c,caseName:i,imageName:l,testTimer:m,width:u,height:f,imgIdx:g,imageData:d}=o,p=[e,s,n,c,i,`${l}_${g}`,m,u,f,!0].join(","),w=new ArrayBuffer(2+p.length+o.imageData.length);t.imgList[c]||(t.imgList[c]={});t.imgList[c][i]||(t.imgList[c][i]=0);t.imgList[c][i]++,t.prevScriptImages.push(`${l}_${g}.png`);const C=new DataView(w);C.setUint8(0,p.length);for(let e=0;e<p.length;e++)C.setUint8(2+e,p[e].charCodeAt(0));new Uint8Array(w).set(d,2+p.length),await async function(e,t,s){const n=e.byteLength,c=1048576,i=r.getNowMsgId(),l=a.testConfig.jobId,m=Math.ceil(n/c);console.log(`saveImage: { imageName: ${s}, originalBytes: ${o.originalBytes}, deflated: ${n}, sliced: ${m} }`);for(let a=0;a<m;a++){const u=a*c,f=Math.min(n,u+c),g=[l,t,o.imgIdx,n,c,m,a,u,f,i,s].join(","),d=new Uint8Array(e,u,f-u),p=new ArrayBuffer(2+g.length+d.length),w=new DataView(p);w.setUint8(0,g.length);for(let e=0;e<g.length;e++)w.setUint8(2+e,g[e].charCodeAt(0));new Uint8Array(p).set(d,2+g.length),await r.postBuffer(i,p).catch((()=>console.error(`【automation error】 ${s}.png chunks ${a} not send seccess`)))}}(w,s,`${l}_${g}`)}()),o}}(c||(c={}));const{testClass:i,runScene:l,testCase:m,beforeClass:u,afterClass:f,beforeCase:g,afterCase:d}=s,{waitForNextFrame:p,captureOneImage:w}=c,{PlatformEnum:C}=n;async function S(e){return new Promise((t=>{setTimeout((()=>{t("延迟")}),1e3*e)}))}export{C as PlatformEnum,d as afterCase,f as afterClass,g as beforeCase,u as beforeClass,w as captureOneImage,l as runScene,a as runner,S as sleep,m as testCase,i as testClass,p as waitForNextFrame};
