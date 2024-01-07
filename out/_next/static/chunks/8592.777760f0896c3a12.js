(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8592],{18592:function(e,t,s){"use strict";s.r(t),s.d(t,{AlchemyWebSocketProvider:function(){return R}});var n=s(90512),i=s(54178),r=s(6731),o=s(45710),l=s(6881),c=s(68783),h=s(1581),a=s(34216);let u=null;try{if(u=WebSocket,null==u)throw Error("inject please")}catch(t){let e=new h.Yd(a.i);u=function(){e.throwError("WebSockets not supported in this environment",h.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new WebSocket()"})}}var d=function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{c(n.next(e))}catch(e){r(e)}}function l(e){try{c(n.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?i(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(o,l)}c((n=n.apply(e,t||[])).next())})};let f=new h.Yd(a.i),p=1;class b extends c.r{constructor(e,t){"any"===t&&f.throwError("WebSocketProvider does not support 'any' network yet",h.Yd.errors.UNSUPPORTED_OPERATION,{operation:"network:any"}),"string"==typeof e?super(e,t):super("_websocket",t),this._pollingInterval=-1,this._wsReady=!1,"string"==typeof e?(0,l.zG)(this,"_websocket",new u(this.connection.url)):(0,l.zG)(this,"_websocket",e),(0,l.zG)(this,"_requests",{}),(0,l.zG)(this,"_subs",{}),(0,l.zG)(this,"_subIds",{}),(0,l.zG)(this,"_detectNetwork",super.detectNetwork()),this.websocket.onopen=()=>{this._wsReady=!0,Object.keys(this._requests).forEach(e=>{this.websocket.send(this._requests[e].payload)})},this.websocket.onmessage=e=>{let t=e.data,s=JSON.parse(t);if(null!=s.id){let e=String(s.id),n=this._requests[e];if(delete this._requests[e],void 0!==s.result)n.callback(null,s.result),this.emit("debug",{action:"response",request:JSON.parse(n.payload),response:s.result,provider:this});else{let e=null;s.error?(e=Error(s.error.message||"unknown error"),(0,l.zG)(e,"code",s.error.code||null),(0,l.zG)(e,"response",t)):e=Error("unknown error"),n.callback(e,void 0),this.emit("debug",{action:"response",error:e,request:JSON.parse(n.payload),provider:this})}}else if("eth_subscription"===s.method){let e=this._subs[s.params.subscription];e&&e.processFunc(s.params.result)}else console.warn("this should not happen")};let s=setInterval(()=>{this.emit("poll")},1e3);s.unref&&s.unref()}get websocket(){return this._websocket}detectNetwork(){return this._detectNetwork}get pollingInterval(){return 0}resetEventsBlock(e){f.throwError("cannot reset events block on WebSocketProvider",h.Yd.errors.UNSUPPORTED_OPERATION,{operation:"resetEventBlock"})}set pollingInterval(e){f.throwError("cannot set polling interval on WebSocketProvider",h.Yd.errors.UNSUPPORTED_OPERATION,{operation:"setPollingInterval"})}poll(){return d(this,void 0,void 0,function*(){return null})}set polling(e){e&&f.throwError("cannot set polling on WebSocketProvider",h.Yd.errors.UNSUPPORTED_OPERATION,{operation:"setPolling"})}send(e,t){let s=p++;return new Promise((n,i)=>{let r=JSON.stringify({method:e,params:t,id:s,jsonrpc:"2.0"});this.emit("debug",{action:"request",request:JSON.parse(r),provider:this}),this._requests[String(s)]={callback:function(e,t){return e?i(e):n(t)},payload:r},this._wsReady&&this.websocket.send(r)})}static defaultUrl(){return"ws://localhost:8546"}_subscribe(e,t,s){return d(this,void 0,void 0,function*(){let n=this._subIds[e];null==n&&(n=Promise.all(t).then(e=>this.send("eth_subscribe",e)),this._subIds[e]=n);let i=yield n;this._subs[i]={tag:e,processFunc:s}})}_startEvent(e){switch(e.type){case"block":this._subscribe("block",["newHeads"],e=>{let t=r.O$.from(e.number).toNumber();this._emitted.block=t,this.emit("block",t)});break;case"pending":this._subscribe("pending",["newPendingTransactions"],e=>{this.emit("pending",e)});break;case"filter":this._subscribe(e.tag,["logs",this._getFilter(e.filter)],t=>{null==t.removed&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))});break;case"tx":{let t=e=>{let t=e.hash;this.getTransactionReceipt(t).then(e=>{e&&this.emit(t,e)})};t(e),this._subscribe("tx",["newHeads"],e=>{this._events.filter(e=>"tx"===e.type).forEach(t)});break}case"debug":case"poll":case"willPoll":case"didPoll":case"error":break;default:console.log("unhandled:",e)}}_stopEvent(e){let t=e.tag;if("tx"===e.type){if(this._events.filter(e=>"tx"===e.type).length)return;t="tx"}else if(this.listenerCount(e.event))return;let s=this._subIds[t];s&&(delete this._subIds[t],s.then(e=>{this._subs[e]&&(delete this._subs[e],this.send("eth_unsubscribe",[e]))}))}destroy(){return d(this,void 0,void 0,function*(){this.websocket.readyState===u.CONNECTING&&(yield new Promise(e=>{this.websocket.onopen=function(){e(!0)},this.websocket.onerror=function(){e(!1)}})),this.websocket.close(1e3)})}}var m=s(45316);s(9669);var v=s(34155);let g="alchemy-pending-transactions",y="alchemy-mined-transactions",k=[g,y];class w{constructor(e,t,s){this.listener=t,this.tag=e,this.once=s,this._lastBlockNumber=-2,this._inflight=!1}get event(){switch(this.type){case"tx":return this.hash;case"filter":return this.filter;default:return this.tag}}get type(){return this.tag.split(":")[0]}get hash(){let e=this.tag.split(":");if("tx"!==e[0])throw Error("Not a transaction event");return e[1]}get filter(){var e;let t=this.tag.split(":");if("filter"!==t[0])throw Error("Not a transaction event");let s=t[1],n=""===(e=t[2])?[]:e.split(/&/g).map(e=>{if(""===e)return[];let t=e.split("|").map(e=>"null"===e?null:e);return 1===t.length?t[0]:t}),i={};return n.length>0&&(i.topics=n),s&&"*"!==s&&(i.address=s),i}pollable(){return this.tag.indexOf(":")>=0||["block","network","pending","poll"].indexOf(this.tag)>=0}}class _ extends w{get fromAddress(){let e=this.tag.split(":");return e[0]!==g?void 0:e[1]&&"*"!==e[1]?O(e[1]):void 0}get toAddress(){let e=this.tag.split(":");return e[0]!==g?void 0:e[2]&&"*"!==e[2]?O(e[2]):void 0}get hashesOnly(){let e=this.tag.split(":");return k.includes(e[0])&&e[3]&&"*"!==e[3]?"true"===e[3]:void 0}get includeRemoved(){let e=this.tag.split(":");return e[0]!==y?void 0:e[2]&&"*"!==e[2]?"true"===e[2]:void 0}get addresses(){let e=this.tag.split(":");return e[0]!==y?void 0:e[1]&&"*"!==e[1]?function(e){if(""!==e)return e.split("|").map(e=>e.split(",")).map(e=>Object.assign(Object.assign({},"*"!==e[0]&&{to:e[0]}),"*"!==e[1]&&{from:e[1]}))}(e[1]):void 0}}function E(e){return"object"==typeof e&&"method"in e}function N(e){var t,s,i;if(!E(e))throw Error("Event tag requires AlchemyEventType");if(e.method===n.A.PENDING_TRANSACTIONS){return g+":"+I((t=e).fromAddress)+":"+I(t.toAddress)+":"+T(t.hashesOnly)}if(e.method===n.A.MINED_TRANSACTIONS){return y+":"+(void 0===(i=(s=e).addresses)?"*":i.map(e=>I(e.to)+","+I(e.from)).join("|"))+":"+T(s.includeRemoved)+":"+T(s.hashesOnly)}throw Error(`Unrecognized AlchemyFilterEvent: ${e}`)}function I(e){return void 0===e?"*":Array.isArray(e)?e.join("|"):e}function T(e){return void 0===e?"*":e.toString()}function O(e){if(""===e)return;let t=e.split("|");return 1===t.length?t[0]:t}class C{constructor(e){this.provider=e,this.maxBackfillBlocks=120}getNewHeadsBackfill(e,t,s){return(0,n._)(this,void 0,void 0,function*(){P(e);let i=yield this.getBlockNumber();if(P(e),0===t.length)return this.getHeadEventsInRange(Math.max(s,i-this.maxBackfillBlocks)+1,i+1);let r=(0,n.f)(t[t.length-1].number),o=i-this.maxBackfillBlocks+1;if(r<=o)return this.getHeadEventsInRange(o,i+1);let l=yield this.getReorgHeads(e,t);P(e);let c=yield this.getHeadEventsInRange(r+1,i+1);return P(e),[...l,...c]})}getLogsBackfill(e,t,s,i){return(0,n._)(this,void 0,void 0,function*(){P(e);let r=yield this.getBlockNumber();if(P(e),0===s.length)return this.getLogsInRange(t,Math.max(i,r-this.maxBackfillBlocks)+1,r+1);let o=(0,n.f)(s[s.length-1].blockNumber),l=r-this.maxBackfillBlocks+1;if(o<l)return this.getLogsInRange(t,l,r+1);let c=yield this.getCommonAncestor(e,s);P(e);let h=s.filter(e=>(0,n.f)(e.blockNumber)>c.blockNumber).map(e=>Object.assign(Object.assign({},e),{removed:!0})),a=c.blockNumber===Number.NEGATIVE_INFINITY?(0,n.f)(s[0].blockNumber):c.blockNumber,u=yield this.getLogsInRange(t,a,r+1);return u=u.filter(e=>e&&((0,n.f)(e.blockNumber)>c.blockNumber||(0,n.f)(e.logIndex)>c.logIndex)),P(e),[...h,...u]})}setMaxBackfillBlock(e){this.maxBackfillBlocks=e}getBlockNumber(){return(0,n._)(this,void 0,void 0,function*(){let e=yield this.provider.send("eth_blockNumber");return(0,n.f)(e)})}getHeadEventsInRange(e,t){return(0,n._)(this,void 0,void 0,function*(){if(e>=t)return[];let s=[];for(let i=e;i<t;i++)s.push({method:"eth_getBlockByNumber",params:[(0,n.t)(i),!1]});return(yield this.provider.sendBatch(s)).reduce((e,t)=>e.concat(t),[]).map(S)})}getReorgHeads(e,t){return(0,n._)(this,void 0,void 0,function*(){let s=[];for(let i=t.length-1;i>=0;i--){let r=t[i],o=yield this.getBlockByNumber((0,n.f)(r.number));if(P(e),r.hash===o.hash)break;s.push(S(o))}return s.reverse()})}getBlockByNumber(e){return(0,n._)(this,void 0,void 0,function*(){return this.provider.send("eth_getBlockByNumber",[(0,n.t)(e),!1])})}getCommonAncestor(e,t){return(0,n._)(this,void 0,void 0,function*(){let s=yield this.getBlockByNumber((0,n.f)(t[t.length-1].blockNumber));P(e);for(let e=t.length-1;e>=0;e--){let i=t[e];if(i.blockNumber!==s.number&&(s=yield this.getBlockByNumber((0,n.f)(i.blockNumber))),i.blockHash===s.hash)return{blockNumber:(0,n.f)(i.blockNumber),logIndex:(0,n.f)(i.logIndex)}}return{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY}})}getLogsInRange(e,t,s){return(0,n._)(this,void 0,void 0,function*(){if(t>=s)return[];let i=Object.assign(Object.assign({},e),{fromBlock:(0,n.t)(t),toBlock:(0,n.t)(s-1)});return this.provider.send("eth_getLogs",[i])})}}function S(e){let t=Object.assign({},e);return delete t.totalDifficulty,delete t.transactions,delete t.uncles,t}function A(e,t){let s=new Set,n=[];return e.forEach(e=>{let i=t(e);s.has(i)||(s.add(i),n.push(e))}),n}let B=Error("Cancelled");function P(e){if(e())throw B}class R extends b{constructor(e,t){var r;let o=m.AlchemyProvider.getApiKey(e.apiKey),l=m.AlchemyProvider.getAlchemyNetwork(e.network),c=m.AlchemyProvider.getAlchemyConnectionInfo(l,o,"wss");super(new i.Z(null!==(r=e.url)&&void 0!==r?r:c.url,`alchemy-sdk-${n.V}`,{wsConstructor:null!=t?t:void 0!==v&&null!=v&&null!=v.versions&&null!=v.versions.node?s(45840).w3cwebsocket:WebSocket}),n.E[l]),this._events=[],this.virtualSubscriptionsById=new Map,this.virtualIdsByPhysicalId=new Map,this.handleMessage=e=>{var t;let s=JSON.parse(e.data);if(Array.isArray(t=s)||"2.0"===t.jsonrpc&&void 0!==t.id)return;let n=s.params.subscription,i=this.virtualIdsByPhysicalId.get(n);if(!i)return;let r=this.virtualSubscriptionsById.get(i);if("eth_subscribe"===r.method)switch(r.params[0]){case"newHeads":{let{isBackfilling:e,backfillBuffer:t}=r,{result:o}=s.params;e?D(t,o,j):n!==i?this.emitAndRememberEvent(i,o,j):this.rememberEvent(i,o,j);break}case"logs":{let{isBackfilling:e,backfillBuffer:t}=r,{result:o}=s.params;e?D(t,o,W):i!==n?this.emitAndRememberEvent(i,o,W):this.rememberEvent(i,o,W)}}},this.handleReopen=()=>{let e;this.virtualIdsByPhysicalId.clear();let{cancel:t,isCancelled:s}=(e=!1,{cancel:()=>e=!0,isCancelled:()=>e});for(let e of(this.cancelBackfill=t,this.virtualSubscriptionsById.values()))(0,n._)(this,void 0,void 0,function*(){try{yield this.resubscribeAndBackfill(s,e)}catch(t){s()||console.error(`Error while backfilling "${e.params[0]}" subscription. Some events may be missing.`,t)}});this.startHeartbeat()},this.stopHeartbeatAndBackfill=()=>{null!=this.heartbeatIntervalId&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=void 0),this.cancelBackfill()},this.apiKey=o,this.backfiller=new C(this),this.addSocketListeners(),this.startHeartbeat(),this.cancelBackfill=n.n}static getNetwork(e){return"string"==typeof e&&e in n.C?n.C[e]:(0,o.H)(e)}on(e,t){return this._addEventListener(e,t,!1)}once(e,t){return this._addEventListener(e,t,!0)}off(e,t){return E(e)?this._off(e,t):super.off(e,t)}removeAllListeners(e){return void 0!==e&&E(e)?this._removeAllListeners(e):super.removeAllListeners(e)}listenerCount(e){return void 0!==e&&E(e)?this._listenerCount(e):super.listenerCount(e)}listeners(e){return void 0!==e&&E(e)?this._listeners(e):super.listeners(e)}_addEventListener(e,t,s){if(!E(e))return super._addEventListener(e,t,s);{!function(e){if(!Object.values(n.A).includes(e.method))throw Error(`Invalid method name ${e.method}. Accepted method names: ${Object.values(n.A)}`)}(e);let i=new _(N(e),t,s);return this._events.push(i),this._startEvent(i),this}}_startEvent(e){[...k,"block","filter"].includes(e.type)?this.customStartEvent(e):super._startEvent(e)}_subscribe(e,t,s,i){return(0,n._)(this,void 0,void 0,function*(){let n=this._subIds[e],r=yield this.getBlockNumber();null==n&&(n=Promise.all(t).then(e=>this.send("eth_subscribe",e)),this._subIds[e]=n);let o=yield n,l=yield Promise.all(t);this.virtualSubscriptionsById.set(o,{event:i,method:"eth_subscribe",params:l,startingBlockNumber:r,virtualId:o,physicalId:o,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(o,o),this._subs[o]={tag:e,processFunc:s}})}emit(e,...t){if(!E(e))return super.emit(e,...t);{let s=!1,n=[],i=N(e);return this._events=this._events.filter(e=>e.tag!==i||(setTimeout(()=>{e.listener.apply(this,t)},0),s=!0,!e.once||(n.push(e),!1))),n.forEach(e=>{this._stopEvent(e)}),s}}sendBatch(e){return(0,n._)(this,void 0,void 0,function*(){let t=0,s=e.map(({method:e,params:s})=>({method:e,params:s,jsonrpc:"2.0",id:`alchemy-sdk:${t++}`})),n=yield this.sendBatchConcurrently(s),i=n.find(e=>!!e.error);if(i)throw Error(i.error.message);return n.sort((e,t)=>e.id-t.id).map(e=>e.result)})}destroy(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),super.destroy()}isCommunityResource(){return this.apiKey===n.D}_stopEvent(e){let t=e.tag;if(k.includes(e.type)){if(this._events.filter(e=>k.includes(e.type)).length)return}else if("tx"===e.type){if(this._events.filter(e=>"tx"===e.type).length)return;t="tx"}else if(this.listenerCount(e.event))return;let s=this._subIds[t];s&&(delete this._subIds[t],s.then(e=>{this._subs[e]&&(delete this._subs[e],this.send("eth_unsubscribe",[e]))}))}addSocketListeners(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}removeSocketListeners(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}resubscribeAndBackfill(e,t){return(0,n._)(this,void 0,void 0,function*(){let{virtualId:s,method:n,params:i,sentEvents:r,backfillBuffer:o,startingBlockNumber:l}=t;t.isBackfilling=!0,o.length=0;try{var c,h;let a=yield this.send(n,i);switch(P(e),t.physicalId=a,this.virtualIdsByPhysicalId.set(a,s),i[0]){case"newHeads":{let t=yield L(()=>x(this.backfiller.getNewHeadsBackfill(e,r,l),6e4),5,()=>!e());P(e),(c=[...t,...o],A(c,e=>e.hash)).forEach(e=>this.emitNewHeadsEvent(s,e));break}case"logs":{let t=i[1]||{},n=yield L(()=>x(this.backfiller.getLogsBackfill(e,t,r,l),6e4),5,()=>!e());P(e),(h=[...n,...o],A(h,e=>`${e.blockHash}/${e.logIndex}`)).forEach(e=>this.emitLogsEvent(s,e))}}}finally{t.isBackfilling=!1,o.length=0}})}emitNewHeadsEvent(e,t){this.emitAndRememberEvent(e,t,j)}emitLogsEvent(e,t){this.emitAndRememberEvent(e,t,W)}emitAndRememberEvent(e,t,s){this.rememberEvent(e,t,s);let n=this.virtualSubscriptionsById.get(e);n&&this.emitGenericEvent(n,t)}rememberEvent(e,t,s){let n=this.virtualSubscriptionsById.get(e);n&&D(n.sentEvents,Object.assign({},t),s)}emitGenericEvent(e,t){this.emitProcessFn(e.event)(t)}startHeartbeat(){null==this.heartbeatIntervalId&&(this.heartbeatIntervalId=setInterval(()=>(0,n._)(this,void 0,void 0,function*(){try{yield x(this.send("net_version"),1e4)}catch(e){this._websocket.reconnect()}}),3e4))}sendBatchConcurrently(e){return(0,n._)(this,void 0,void 0,function*(){return Promise.all(e.map(e=>this.send(e.method,e.params)))})}customStartEvent(e){if(e.type===g){let{fromAddress:t,toAddress:s,hashesOnly:i}=e;this._subscribe(e.tag,[n.A.PENDING_TRANSACTIONS,{fromAddress:t,toAddress:s,hashesOnly:i}],this.emitProcessFn(e),e)}else if(e.type===y){let{addresses:t,includeRemoved:s,hashesOnly:i}=e;this._subscribe(e.tag,[n.A.MINED_TRANSACTIONS,{addresses:t,includeRemoved:s,hashesOnly:i}],this.emitProcessFn(e),e)}else"block"===e.type?this._subscribe("block",["newHeads"],this.emitProcessFn(e),e):"filter"===e.type&&this._subscribe(e.tag,["logs",this._getFilter(e.filter)],this.emitProcessFn(e),e)}emitProcessFn(e){switch(e.type){case g:return t=>this.emit({method:n.A.PENDING_TRANSACTIONS,fromAddress:e.fromAddress,toAddress:e.toAddress,hashesOnly:e.hashesOnly},t);case y:return t=>this.emit({method:n.A.MINED_TRANSACTIONS,addresses:e.addresses,includeRemoved:e.includeRemoved,hashesOnly:e.hashesOnly},t);case"block":return e=>{let t=r.O$.from(e.number).toNumber();this._emitted.block=t,this.emit("block",t)};case"filter":return t=>{null==t.removed&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))};default:throw Error("Invalid event type to `emitProcessFn()`")}}_off(e,t){if(null==t)return this.removeAllListeners(e);let s=[],n=!1,i=N(e);return this._events=this._events.filter(e=>e.tag!==i||e.listener!=t||!!n||(n=!0,s.push(e),!1)),s.forEach(e=>{this._stopEvent(e)}),this}_removeAllListeners(e){let t=[];if(null==e)t=this._events,this._events=[];else{let s=N(e);this._events=this._events.filter(e=>e.tag!==s||(t.push(e),!1))}return t.forEach(e=>{this._stopEvent(e)}),this}_listenerCount(e){if(!e)return this._events.length;let t=N(e);return this._events.filter(e=>e.tag===t).length}_listeners(e){if(null==e)return this._events.map(e=>e.listener);let t=N(e);return this._events.filter(e=>e.tag===t).map(e=>e.listener)}}function L(e,t,s=()=>!0){return(0,n._)(this,void 0,void 0,function*(){let n=0,i=0;for(;;)try{return yield e()}catch(e){if(++i>=t||!s(e)||(yield function(e){return new Promise(t=>setTimeout(t,e))}(n),!s(e)))throw e;n=0===n?1e3:Math.min(3e4,2*n)}})}function x(e,t){return Promise.race([e,new Promise((e,s)=>setTimeout(()=>s(Error("Timeout")),t))])}function j(e){return(0,n.f)(e.number)}function W(e){return(0,n.f)(e.blockNumber)}function D(e,t,s){let n=s(t),i=e.findIndex(e=>s(e)>n-10);-1===i?e.length=0:e.splice(0,i),e.push(t)}},284:function(e){var t=function(){if("object"==typeof self&&self)return self;if("object"==typeof window&&window)return window;throw Error("Unable to resolve global `this`")};e.exports=function(){if(this)return this;if("object"==typeof globalThis&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch(e){return t()}try{if(!__global__)return t();return __global__}finally{delete Object.prototype.__global__}}()},54178:function(e,t){"use strict";var s=function(){function e(t,n,i){var r,o;if(void 0===i&&(i={}),this.url=t,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=e.CONNECTING,this.OPEN=e.OPEN,this.CLOSING=e.CLOSING,this.CLOSED=e.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},null==n||"string"==typeof n||Array.isArray(n)?this.protocols=n:i=n,this.options=(r=i,o={},Object.keys(s.DEFAULT_OPTIONS).forEach(function(e){var t=r[e];o[e]=void 0===t?s.DEFAULT_OPTIONS[e]:t}),o),!this.options.wsConstructor){if("undefined"!=typeof WebSocket)this.options.wsConstructor=WebSocket;else throw Error("WebSocket not present in global scope and no wsConstructor option was provided.")}this.openNewWebSocket()}return Object.defineProperty(e.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach(function(s){var n="string"==typeof s?2*s.length:s instanceof ArrayBuffer?s.byteLength:s instanceof Blob?s.size:void 0;null!=n?e+=n:t=!0}),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"readyState",{get:function(){return this.isClosed?e.CLOSED:e.OPEN},enumerable:!0,configurable:!0}),e.prototype.close=function(e,t){this.disposeSocket(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},e.prototype.send=function(e){if(this.isClosed)throw Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e)},e.prototype.reconnect=function(){if(this.isClosed)throw Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},e.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},e.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},e.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(function(e){return e!==t}))},e.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,s=t.connectTimeout,n=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var i=new n(this.url,this.protocols);i.onclose=function(t){return e.handleClose(t)},i.onerror=function(t){return e.handleError(t)},i.onmessage=function(t){return e.handleMessage(t)},i.onopen=function(t){return e.handleOpen(t)},this.connectTimeoutId=setTimeout(function(){e.clearConnectTimeout(),e.disposeSocket(),e.handleClose(void 0)},s),this.ws=i}},e.prototype.handleOpen=function(e){var t=this;if(this.ws&&!this.isClosed){var s=this.options.allClearResetTime;this.debugLog("WebSocket opened."),null!=this.binaryTypeInternal?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(e){return t.send(e)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0,t.debugLog("WebSocket remained open for "+(s/1e3|0)+" seconds. Resetting retry time and count.")},s)}},e.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e)},e.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var s=this.options,n=s.maxReconnectAttempts,i=s.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",e),this.reconnectCount>=n){this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());return}var r=!e||i(e);"boolean"==typeof r?this.handleWillReconnect(r,e,"Provided shouldReconnect() returned false. Closing permanently."):r.then(function(s){t.isClosed||t.handleWillReconnect(s,e,"Provided shouldReconnect() resolved to false. Closing permanently.")})}},e.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.")},e.prototype.handleWillReconnect=function(e,t,s){e?this.reestablishConnection():this.stopReconnecting(t,s)},e.prototype.reestablishConnection=function(){var e=this,t=this.options,s=t.minReconnectDelay,n=t.maxReconnectDelay,i=t.reconnectBackoffFactor;this.reconnectCount++;var r=this.nextRetryTime;this.nextRetryTime=Math.max(s,Math.min(this.nextRetryTime*i,n)),setTimeout(function(){return e.openNewWebSocket()},r),this.debugLog("WebSocket was closed. Re-opening in "+(r/1e3|0)+" seconds.")},e.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),e&&this.dispatchEventOfType("close",e)},e.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},e.prototype.disposeSocket=function(e,t){this.ws&&(this.ws.onerror=n,this.ws.onclose=n,this.ws.onmessage=n,this.ws.onopen=n,this.ws.close(e,t),this.ws=void 0)},e.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},e.prototype.clearConnectTimeout=function(){null!=this.connectTimeoutId&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},e.prototype.clearAllClearTimeout=function(){null!=this.allClearTimeoutId&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},e.prototype.dispatchEventOfType=function(e,t){var s=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t)}return e in this.listeners&&this.listeners[e].slice().forEach(function(e){return s.callListener(e,t)}),!t||!t.defaultPrevented},e.prototype.callListener=function(e,t){"function"==typeof e?e.call(this,t):e.handleEvent.call(this,t)},e.prototype.debugLog=function(e){this.options.debug&&console.log(e)},e.prototype.getTooManyFailedReconnectsMessage=function(){var e,t=this.options.maxReconnectAttempts;return"Failed to reconnect after "+t+" "+(e="attempt",1===t?e:e+"s")+". Closing permanently."},e.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},e.CONNECTING=0,e.OPEN=1,e.CLOSING=2,e.CLOSED=3,e}();function n(){}t.Z=s},45840:function(e,t,s){if("object"==typeof globalThis)n=globalThis;else try{n=s(284)}catch(e){}finally{if(n||"undefined"==typeof window||(n=window),!n)throw Error("Could not determine global this")}var n,i=n.WebSocket||n.MozWebSocket,r=s(79387);function o(e,t){return t?new i(e,t):new i(e)}i&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(e){Object.defineProperty(o,e,{get:function(){return i[e]}})}),e.exports={w3cwebsocket:i?o:null,version:r}},79387:function(e,t,s){e.exports=s(19794).version},19794:function(e){"use strict";e.exports={version:"1.0.34"}}}]);