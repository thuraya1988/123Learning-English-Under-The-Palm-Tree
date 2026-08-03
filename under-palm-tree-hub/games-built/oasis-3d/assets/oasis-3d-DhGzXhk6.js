(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const c of u.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerPolicy&&(u.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?u.credentials="include":o.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function a(o){if(o.ep)return;o.ep=!0;const u=n(o);fetch(o.href,u)}})();function kM(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Yh={exports:{}},al={};var Q_;function XM(){if(Q_)return al;Q_=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,u){var c=null;if(u!==void 0&&(c=""+u),o.key!==void 0&&(c=""+o.key),"key"in o){u={};for(var h in o)h!=="key"&&(u[h]=o[h])}else u=o;return o=u.ref,{$$typeof:s,type:a,key:c,ref:o!==void 0?o:null,props:u}}return al.Fragment=t,al.jsx=n,al.jsxs=n,al}var j_;function WM(){return j_||(j_=1,Yh.exports=XM()),Yh.exports}var Me=WM(),Zh={exports:{}},le={};var $_;function qM(){if($_)return le;$_=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),c=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function S(z){return z===null||typeof z!="object"?null:(z=v&&z[v]||z["@@iterator"],typeof z=="function"?z:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,x={};function y(z,j,bt){this.props=z,this.context=j,this.refs=x,this.updater=bt||E}y.prototype.isReactComponent={},y.prototype.setState=function(z,j){if(typeof z!="object"&&typeof z!="function"&&z!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,z,j,"setState")},y.prototype.forceUpdate=function(z){this.updater.enqueueForceUpdate(this,z,"forceUpdate")};function U(){}U.prototype=y.prototype;function D(z,j,bt){this.props=z,this.context=j,this.refs=x,this.updater=bt||E}var A=D.prototype=new U;A.constructor=D,w(A,y.prototype),A.isPureReactComponent=!0;var O=Array.isArray;function L(){}var I={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function N(z,j,bt){var ot=bt.ref;return{$$typeof:s,type:z,key:j,ref:ot!==void 0?ot:null,props:bt}}function W(z,j){return N(z.type,j,z.props)}function G(z){return typeof z=="object"&&z!==null&&z.$$typeof===s}function q(z){var j={"=":"=0",":":"=2"};return"$"+z.replace(/[=:]/g,function(bt){return j[bt]})}var ht=/\/+/g;function pt(z,j){return typeof z=="object"&&z!==null&&z.key!=null?q(""+z.key):j.toString(36)}function J(z){switch(z.status){case"fulfilled":return z.value;case"rejected":throw z.reason;default:switch(typeof z.status=="string"?z.then(L,L):(z.status="pending",z.then(function(j){z.status==="pending"&&(z.status="fulfilled",z.value=j)},function(j){z.status==="pending"&&(z.status="rejected",z.reason=j)})),z.status){case"fulfilled":return z.value;case"rejected":throw z.reason}}throw z}function F(z,j,bt,ot,_t){var V=typeof z;(V==="undefined"||V==="boolean")&&(z=null);var Q=!1;if(z===null)Q=!0;else switch(V){case"bigint":case"string":case"number":Q=!0;break;case"object":switch(z.$$typeof){case s:case t:Q=!0;break;case g:return Q=z._init,F(Q(z._payload),j,bt,ot,_t)}}if(Q)return _t=_t(z),Q=ot===""?"."+pt(z,0):ot,O(_t)?(bt="",Q!=null&&(bt=Q.replace(ht,"$&/")+"/"),F(_t,j,bt,"",function(Yt){return Yt})):_t!=null&&(G(_t)&&(_t=W(_t,bt+(_t.key==null||z&&z.key===_t.key?"":(""+_t.key).replace(ht,"$&/")+"/")+Q)),j.push(_t)),1;Q=0;var et=ot===""?".":ot+":";if(O(z))for(var Rt=0;Rt<z.length;Rt++)ot=z[Rt],V=et+pt(ot,Rt),Q+=F(ot,j,bt,V,_t);else if(Rt=S(z),typeof Rt=="function")for(z=Rt.call(z),Rt=0;!(ot=z.next()).done;)ot=ot.value,V=et+pt(ot,Rt++),Q+=F(ot,j,bt,V,_t);else if(V==="object"){if(typeof z.then=="function")return F(J(z),j,bt,ot,_t);throw j=String(z),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(z).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return Q}function H(z,j,bt){if(z==null)return z;var ot=[],_t=0;return F(z,ot,"","",function(V){return j.call(bt,V,_t++)}),ot}function nt(z){if(z._status===-1){var j=z._result;j=j(),j.then(function(bt){(z._status===0||z._status===-1)&&(z._status=1,z._result=bt)},function(bt){(z._status===0||z._status===-1)&&(z._status=2,z._result=bt)}),z._status===-1&&(z._status=0,z._result=j)}if(z._status===1)return z._result.default;throw z._result}var St=typeof reportError=="function"?reportError:function(z){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof z=="object"&&z!==null&&typeof z.message=="string"?String(z.message):String(z),error:z});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",z);return}console.error(z)},At={map:H,forEach:function(z,j,bt){H(z,function(){j.apply(this,arguments)},bt)},count:function(z){var j=0;return H(z,function(){j++}),j},toArray:function(z){return H(z,function(j){return j})||[]},only:function(z){if(!G(z))throw Error("React.Children.only expected to receive a single React element child.");return z}};return le.Activity=_,le.Children=At,le.Component=y,le.Fragment=n,le.Profiler=o,le.PureComponent=D,le.StrictMode=a,le.Suspense=m,le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,le.__COMPILER_RUNTIME={__proto__:null,c:function(z){return I.H.useMemoCache(z)}},le.cache=function(z){return function(){return z.apply(null,arguments)}},le.cacheSignal=function(){return null},le.cloneElement=function(z,j,bt){if(z==null)throw Error("The argument must be a React element, but you passed "+z+".");var ot=w({},z.props),_t=z.key;if(j!=null)for(V in j.key!==void 0&&(_t=""+j.key),j)!T.call(j,V)||V==="key"||V==="__self"||V==="__source"||V==="ref"&&j.ref===void 0||(ot[V]=j[V]);var V=arguments.length-2;if(V===1)ot.children=bt;else if(1<V){for(var Q=Array(V),et=0;et<V;et++)Q[et]=arguments[et+2];ot.children=Q}return N(z.type,_t,ot)},le.createContext=function(z){return z={$$typeof:c,_currentValue:z,_currentValue2:z,_threadCount:0,Provider:null,Consumer:null},z.Provider=z,z.Consumer={$$typeof:u,_context:z},z},le.createElement=function(z,j,bt){var ot,_t={},V=null;if(j!=null)for(ot in j.key!==void 0&&(V=""+j.key),j)T.call(j,ot)&&ot!=="key"&&ot!=="__self"&&ot!=="__source"&&(_t[ot]=j[ot]);var Q=arguments.length-2;if(Q===1)_t.children=bt;else if(1<Q){for(var et=Array(Q),Rt=0;Rt<Q;Rt++)et[Rt]=arguments[Rt+2];_t.children=et}if(z&&z.defaultProps)for(ot in Q=z.defaultProps,Q)_t[ot]===void 0&&(_t[ot]=Q[ot]);return N(z,V,_t)},le.createRef=function(){return{current:null}},le.forwardRef=function(z){return{$$typeof:h,render:z}},le.isValidElement=G,le.lazy=function(z){return{$$typeof:g,_payload:{_status:-1,_result:z},_init:nt}},le.memo=function(z,j){return{$$typeof:p,type:z,compare:j===void 0?null:j}},le.startTransition=function(z){var j=I.T,bt={};I.T=bt;try{var ot=z(),_t=I.S;_t!==null&&_t(bt,ot),typeof ot=="object"&&ot!==null&&typeof ot.then=="function"&&ot.then(L,St)}catch(V){St(V)}finally{j!==null&&bt.types!==null&&(j.types=bt.types),I.T=j}},le.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},le.use=function(z){return I.H.use(z)},le.useActionState=function(z,j,bt){return I.H.useActionState(z,j,bt)},le.useCallback=function(z,j){return I.H.useCallback(z,j)},le.useContext=function(z){return I.H.useContext(z)},le.useDebugValue=function(){},le.useDeferredValue=function(z,j){return I.H.useDeferredValue(z,j)},le.useEffect=function(z,j){return I.H.useEffect(z,j)},le.useEffectEvent=function(z){return I.H.useEffectEvent(z)},le.useId=function(){return I.H.useId()},le.useImperativeHandle=function(z,j,bt){return I.H.useImperativeHandle(z,j,bt)},le.useInsertionEffect=function(z,j){return I.H.useInsertionEffect(z,j)},le.useLayoutEffect=function(z,j){return I.H.useLayoutEffect(z,j)},le.useMemo=function(z,j){return I.H.useMemo(z,j)},le.useOptimistic=function(z,j){return I.H.useOptimistic(z,j)},le.useReducer=function(z,j,bt){return I.H.useReducer(z,j,bt)},le.useRef=function(z){return I.H.useRef(z)},le.useState=function(z){return I.H.useState(z)},le.useSyncExternalStore=function(z,j,bt){return I.H.useSyncExternalStore(z,j,bt)},le.useTransition=function(){return I.H.useTransition()},le.version="19.2.3",le}var tv;function Fp(){return tv||(tv=1,Zh.exports=qM()),Zh.exports}var xt=Fp();const YM=kM(xt);var Kh={exports:{}},sl={},Jh={exports:{}},Qh={};var ev;function ZM(){return ev||(ev=1,(function(s){function t(F,H){var nt=F.length;F.push(H);t:for(;0<nt;){var St=nt-1>>>1,At=F[St];if(0<o(At,H))F[St]=H,F[nt]=At,nt=St;else break t}}function n(F){return F.length===0?null:F[0]}function a(F){if(F.length===0)return null;var H=F[0],nt=F.pop();if(nt!==H){F[0]=nt;t:for(var St=0,At=F.length,z=At>>>1;St<z;){var j=2*(St+1)-1,bt=F[j],ot=j+1,_t=F[ot];if(0>o(bt,nt))ot<At&&0>o(_t,bt)?(F[St]=_t,F[ot]=nt,St=ot):(F[St]=bt,F[j]=nt,St=j);else if(ot<At&&0>o(_t,nt))F[St]=_t,F[ot]=nt,St=ot;else break t}}return H}function o(F,H){var nt=F.sortIndex-H.sortIndex;return nt!==0?nt:F.id-H.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;s.unstable_now=function(){return u.now()}}else{var c=Date,h=c.now();s.unstable_now=function(){return c.now()-h}}var m=[],p=[],g=1,_=null,v=3,S=!1,E=!1,w=!1,x=!1,y=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function A(F){for(var H=n(p);H!==null;){if(H.callback===null)a(p);else if(H.startTime<=F)a(p),H.sortIndex=H.expirationTime,t(m,H);else break;H=n(p)}}function O(F){if(w=!1,A(F),!E)if(n(m)!==null)E=!0,L||(L=!0,q());else{var H=n(p);H!==null&&J(O,H.startTime-F)}}var L=!1,I=-1,T=5,N=-1;function W(){return x?!0:!(s.unstable_now()-N<T)}function G(){if(x=!1,L){var F=s.unstable_now();N=F;var H=!0;try{t:{E=!1,w&&(w=!1,U(I),I=-1),S=!0;var nt=v;try{e:{for(A(F),_=n(m);_!==null&&!(_.expirationTime>F&&W());){var St=_.callback;if(typeof St=="function"){_.callback=null,v=_.priorityLevel;var At=St(_.expirationTime<=F);if(F=s.unstable_now(),typeof At=="function"){_.callback=At,A(F),H=!0;break e}_===n(m)&&a(m),A(F)}else a(m);_=n(m)}if(_!==null)H=!0;else{var z=n(p);z!==null&&J(O,z.startTime-F),H=!1}}break t}finally{_=null,v=nt,S=!1}H=void 0}}finally{H?q():L=!1}}}var q;if(typeof D=="function")q=function(){D(G)};else if(typeof MessageChannel<"u"){var ht=new MessageChannel,pt=ht.port2;ht.port1.onmessage=G,q=function(){pt.postMessage(null)}}else q=function(){y(G,0)};function J(F,H){I=y(function(){F(s.unstable_now())},H)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(F){F.callback=null},s.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<F?Math.floor(1e3/F):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_next=function(F){switch(v){case 1:case 2:case 3:var H=3;break;default:H=v}var nt=v;v=H;try{return F()}finally{v=nt}},s.unstable_requestPaint=function(){x=!0},s.unstable_runWithPriority=function(F,H){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var nt=v;v=F;try{return H()}finally{v=nt}},s.unstable_scheduleCallback=function(F,H,nt){var St=s.unstable_now();switch(typeof nt=="object"&&nt!==null?(nt=nt.delay,nt=typeof nt=="number"&&0<nt?St+nt:St):nt=St,F){case 1:var At=-1;break;case 2:At=250;break;case 5:At=1073741823;break;case 4:At=1e4;break;default:At=5e3}return At=nt+At,F={id:g++,callback:H,priorityLevel:F,startTime:nt,expirationTime:At,sortIndex:-1},nt>St?(F.sortIndex=nt,t(p,F),n(m)===null&&F===n(p)&&(w?(U(I),I=-1):w=!0,J(O,nt-St))):(F.sortIndex=At,t(m,F),E||S||(E=!0,L||(L=!0,q()))),F},s.unstable_shouldYield=W,s.unstable_wrapCallback=function(F){var H=v;return function(){var nt=v;v=H;try{return F.apply(this,arguments)}finally{v=nt}}}})(Qh)),Qh}var nv;function KM(){return nv||(nv=1,Jh.exports=ZM()),Jh.exports}var jh={exports:{}},Fn={};var iv;function JM(){if(iv)return Fn;iv=1;var s=Fp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function u(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var c=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Fn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return u(m,p,null,g)},Fn.flushSync=function(m){var p=c.T,g=a.p;try{if(c.T=null,a.p=2,m)return m()}finally{c.T=p,a.p=g,a.d.f()}},Fn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},Fn.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},Fn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=h(g,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:S}):g==="script"&&a.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Fn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=h(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},Fn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=h(g,p.crossOrigin);a.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Fn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=h(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},Fn.requestFormReset=function(m){a.d.r(m)},Fn.unstable_batchedUpdates=function(m,p){return m(p)},Fn.useFormState=function(m,p,g){return c.H.useFormState(m,p,g)},Fn.useFormStatus=function(){return c.H.useHostTransitionStatus()},Fn.version="19.2.3",Fn}var av;function QM(){if(av)return jh.exports;av=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),jh.exports=JM(),jh.exports}var sv;function jM(){if(sv)return sl;sv=1;var s=KM(),t=Fp(),n=QM();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)i+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){var i=e,r=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(r=i.return),e=i.return;while(e)}return i.tag===3?r:null}function c(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function h(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(u(e)!==e)throw Error(a(188))}function p(e){var i=e.alternate;if(!i){if(i=u(e),i===null)throw Error(a(188));return i!==e?null:e}for(var r=e,l=i;;){var f=r.return;if(f===null)break;var d=f.alternate;if(d===null){if(l=f.return,l!==null){r=l;continue}break}if(f.child===d.child){for(d=f.child;d;){if(d===r)return m(f),e;if(d===l)return m(f),i;d=d.sibling}throw Error(a(188))}if(r.return!==l.return)r=f,l=d;else{for(var M=!1,C=f.child;C;){if(C===r){M=!0,r=f,l=d;break}if(C===l){M=!0,l=f,r=d;break}C=C.sibling}if(!M){for(C=d.child;C;){if(C===r){M=!0,r=d,l=f;break}if(C===l){M=!0,l=d,r=f;break}C=C.sibling}if(!M)throw Error(a(189))}}if(r.alternate!==l)throw Error(a(190))}if(r.tag!==3)throw Error(a(188));return r.stateNode.current===r?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),U=Symbol.for("react.consumer"),D=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),N=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var ht=Symbol.for("react.client.reference");function pt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ht?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case y:return"Profiler";case x:return"StrictMode";case O:return"Suspense";case L:return"SuspenseList";case N:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case D:return e.displayName||"Context";case U:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return i=e.displayName||null,i!==null?i:pt(e.type)||"Memo";case T:i=e._payload,e=e._init;try{return pt(e(i))}catch{}}return null}var J=Array.isArray,F=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nt={pending:!1,data:null,method:null,action:null},St=[],At=-1;function z(e){return{current:e}}function j(e){0>At||(e.current=St[At],St[At]=null,At--)}function bt(e,i){At++,St[At]=e.current,e.current=i}var ot=z(null),_t=z(null),V=z(null),Q=z(null);function et(e,i){switch(bt(V,i),bt(_t,e),bt(ot,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?y_(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=y_(i),e=S_(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(ot),bt(ot,e)}function Rt(){j(ot),j(_t),j(V)}function Yt(e){e.memoizedState!==null&&bt(Q,e);var i=ot.current,r=S_(i,e.type);i!==r&&(bt(_t,e),bt(ot,r))}function Zt(e){_t.current===e&&(j(ot),j(_t)),Q.current===e&&(j(Q),tl._currentValue=nt)}var he,ne;function re(e){if(he===void 0)try{throw Error()}catch(r){var i=r.stack.trim().match(/\n( *(at )?)/);he=i&&i[1]||"",ne=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+ne}var pe=!1;function ae(e,i){if(!e||pe)return"";pe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var Et=function(){throw Error()};if(Object.defineProperty(Et.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Et,[])}catch(ft){var ct=ft}Reflect.construct(e,[],Et)}else{try{Et.call()}catch(ft){ct=ft}e.call(Et.prototype)}}else{try{throw Error()}catch(ft){ct=ft}(Et=e())&&typeof Et.catch=="function"&&Et.catch(function(){})}}catch(ft){if(ft&&ct&&typeof ft.stack=="string")return[ft.stack,ct.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=l.DetermineComponentFrameRoot(),M=d[0],C=d[1];if(M&&C){var B=M.split(`
`),at=C.split(`
`);for(f=l=0;l<B.length&&!B[l].includes("DetermineComponentFrameRoot");)l++;for(;f<at.length&&!at[f].includes("DetermineComponentFrameRoot");)f++;if(l===B.length||f===at.length)for(l=B.length-1,f=at.length-1;1<=l&&0<=f&&B[l]!==at[f];)f--;for(;1<=l&&0<=f;l--,f--)if(B[l]!==at[f]){if(l!==1||f!==1)do if(l--,f--,0>f||B[l]!==at[f]){var vt=`
`+B[l].replace(" at new "," at ");return e.displayName&&vt.includes("<anonymous>")&&(vt=vt.replace("<anonymous>",e.displayName)),vt}while(1<=l&&0<=f);break}}}finally{pe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?re(r):""}function rn(e,i){switch(e.tag){case 26:case 27:case 5:return re(e.type);case 16:return re("Lazy");case 13:return e.child!==i&&i!==null?re("Suspense Fallback"):re("Suspense");case 19:return re("SuspenseList");case 0:case 15:return ae(e.type,!1);case 11:return ae(e.type.render,!1);case 1:return ae(e.type,!0);case 31:return re("Activity");default:return""}}function on(e){try{var i="",r=null;do i+=rn(e,r),r=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var ln=Object.prototype.hasOwnProperty,hn=s.unstable_scheduleCallback,Ze=s.unstable_cancelCallback,un=s.unstable_shouldYield,K=s.unstable_requestPaint,Ge=s.unstable_now,Ue=s.unstable_getCurrentPriorityLevel,P=s.unstable_ImmediatePriority,b=s.unstable_UserBlockingPriority,tt=s.unstable_NormalPriority,lt=s.unstable_LowPriority,mt=s.unstable_IdlePriority,Ct=s.log,Lt=s.unstable_setDisableYieldValue,dt=null,gt=null;function Dt(e){if(typeof Ct=="function"&&Lt(e),gt&&typeof gt.setStrictMode=="function")try{gt.setStrictMode(dt,e)}catch{}}var Ht=Math.clz32?Math.clz32:jt,Ot=Math.log,Nt=Math.LN2;function jt(e){return e>>>=0,e===0?32:31-(Ot(e)/Nt|0)|0}var $t=256,oe=262144,Y=4194304;function wt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function yt(e,i,r){var l=e.pendingLanes;if(l===0)return 0;var f=0,d=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var C=l&134217727;return C!==0?(l=C&~d,l!==0?f=wt(l):(M&=C,M!==0?f=wt(M):r||(r=C&~e,r!==0&&(f=wt(r))))):(C=l&~d,C!==0?f=wt(C):M!==0?f=wt(M):r||(r=l&~e,r!==0&&(f=wt(r)))),f===0?0:i!==0&&i!==f&&(i&d)===0&&(d=f&-f,r=i&-i,d>=r||d===32&&(r&4194048)!==0)?i:f}function Ut(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Bt(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tt(){var e=Y;return Y<<=1,(Y&62914560)===0&&(Y=4194304),e}function Kt(e){for(var i=[],r=0;31>r;r++)i.push(e);return i}function kt(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function je(e,i,r,l,f,d){var M=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var C=e.entanglements,B=e.expirationTimes,at=e.hiddenUpdates;for(r=M&~r;0<r;){var vt=31-Ht(r),Et=1<<vt;C[vt]=0,B[vt]=-1;var ct=at[vt];if(ct!==null)for(at[vt]=null,vt=0;vt<ct.length;vt++){var ft=ct[vt];ft!==null&&(ft.lane&=-536870913)}r&=~Et}l!==0&&Pe(e,l,0),d!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=d&~(M&~i))}function Pe(e,i,r){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-Ht(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|r&261930}function ai(e,i){var r=e.entangledLanes|=i;for(e=e.entanglements;r;){var l=31-Ht(r),f=1<<l;f&i|e[l]&i&&(e[l]|=i),r&=~f}}function si(e,i){var r=i&-i;return r=(r&42)!==0?1:po(r),(r&(e.suspendedLanes|i))!==0?0:r}function po(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function mo(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function go(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:X_(e.type))}function ar(e,i){var r=H.p;try{return H.p=e,i()}finally{H.p=r}}var ki=Math.random().toString(36).slice(2),gn="__reactFiber$"+ki,Dn="__reactProps$"+ki,Zn="__reactContainer$"+ki,Rs="__reactEvents$"+ki,Ul="__reactListeners$"+ki,Ll="__reactHandles$"+ki,Cs="__reactResources$"+ki,Fa="__reactMarker$"+ki;function Ba(e){delete e[gn],delete e[Dn],delete e[Rs],delete e[Ul],delete e[Ll]}function ra(e){var i=e[gn];if(i)return i;for(var r=e.parentNode;r;){if(i=r[Zn]||r[gn]){if(r=i.alternate,i.child!==null||r!==null&&r.child!==null)for(e=C_(e);e!==null;){if(r=e[gn])return r;e=C_(e)}return i}e=r,r=e.parentNode}return null}function oa(e){if(e=e[gn]||e[Zn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function ws(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Ha(e){var i=e[Cs];return i||(i=e[Cs]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function _n(e){e[Fa]=!0}var Nl=new Set,R={};function Z(e,i){ut(e,i),ut(e+"Capture",i)}function ut(e,i){for(R[e]=i,e=0;e<i.length;e++)Nl.add(i[e])}var st=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),rt={},zt={};function Vt(e){return ln.call(zt,e)?!0:ln.call(rt,e)?!1:st.test(e)?zt[e]=!0:(rt[e]=!0,!1)}function Pt(e,i,r){if(Vt(i))if(r===null)e.removeAttribute(i);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+r)}}function Wt(e,i,r){if(r===null)e.removeAttribute(i);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+r)}}function Xt(e,i,r,l){if(l===null)e.removeAttribute(r);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(i,r,""+l)}}function te(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ce(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Qt(e,i,r){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,d=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(M){r=""+M,d.call(this,M)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return r},setValue:function(M){r=""+M},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Ce(e){if(!e._valueTracker){var i=ce(e)?"checked":"value";e._valueTracker=Qt(e,i,""+e[i])}}function $e(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var r=i.getValue(),l="";return e&&(l=ce(e)?e.checked?"true":"false":e.value),e=l,e!==r?(i.setValue(e),!0):!1}function qe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Oe=/[\n"\\]/g;function ze(e){return e.replace(Oe,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Gt(e,i,r,l,f,d,M,C){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),i!=null?M==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+te(i)):e.value!==""+te(i)&&(e.value=""+te(i)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),i!=null?_e(e,M,te(i)):r!=null?_e(e,M,te(r)):l!=null&&e.removeAttribute("value"),f==null&&d!=null&&(e.defaultChecked=!!d),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?e.name=""+te(C):e.removeAttribute("name")}function In(e,i,r,l,f,d,M,C){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){Ce(e);return}r=r!=null?""+te(r):"",i=i!=null?""+te(i):r,C||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=C?e.checked:!!l,e.defaultChecked=!!l,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Ce(e)}function _e(e,i,r){i==="number"&&qe(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function En(e,i,r,l){if(e=e.options,i){i={};for(var f=0;f<r.length;f++)i["$"+r[f]]=!0;for(r=0;r<e.length;r++)f=i.hasOwnProperty("$"+e[r].value),e[r].selected!==f&&(e[r].selected=f),f&&l&&(e[r].defaultSelected=!0)}else{for(r=""+te(r),i=null,f=0;f<e.length;f++){if(e[f].value===r){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function ri(e,i,r){if(i!=null&&(i=""+te(i),i!==e.value&&(e.value=i),r==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=r!=null?""+te(r):""}function Ui(e,i,r,l){if(i==null){if(l!=null){if(r!=null)throw Error(a(92));if(J(l)){if(1<l.length)throw Error(a(93));l=l[0]}r=l}r==null&&(r=""),i=r}r=te(i),e.defaultValue=r,l=e.textContent,l===r&&l!==""&&l!==null&&(e.value=l),Ce(e)}function oi(e,i){if(i){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=i;return}}e.textContent=i}var Ie=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function tn(e,i,r){var l=i.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,r):typeof r!="number"||r===0||Ie.has(i)?i==="float"?e.cssFloat=r:e[i]=(""+r).trim():e[i]=r+"px"}function Li(e,i,r){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,r!=null){for(var l in r)!r.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&r[f]!==l&&tn(e,f,l)}else for(var d in i)i.hasOwnProperty(d)&&tn(e,d,i[d])}function Ne(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ga=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ds(e){return Ga.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function la(){}var kc=null;function Xc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var sr=null,rr=null;function xm(e){var i=oa(e);if(i&&(e=i.stateNode)){var r=e[Dn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Gt(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),i=r.name,r.type==="radio"&&i!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+ze(""+i)+'"][type="radio"]'),i=0;i<r.length;i++){var l=r[i];if(l!==e&&l.form===e.form){var f=l[Dn]||null;if(!f)throw Error(a(90));Gt(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<r.length;i++)l=r[i],l.form===e.form&&$e(l)}break t;case"textarea":ri(e,r.value,r.defaultValue);break t;case"select":i=r.value,i!=null&&En(e,!!r.multiple,i,!1)}}}var Wc=!1;function ym(e,i,r){if(Wc)return e(i,r);Wc=!0;try{var l=e(i);return l}finally{if(Wc=!1,(sr!==null||rr!==null)&&(yu(),sr&&(i=sr,e=rr,rr=sr=null,xm(i),e)))for(i=0;i<e.length;i++)xm(e[i])}}function _o(e,i){var r=e.stateNode;if(r===null)return null;var l=r[Dn]||null;if(l===null)return null;r=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(a(231,i,typeof r));return r}var ua=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qc=!1;if(ua)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){qc=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{qc=!1}var Va=null,Yc=null,Pl=null;function Sm(){if(Pl)return Pl;var e,i=Yc,r=i.length,l,f="value"in Va?Va.value:Va.textContent,d=f.length;for(e=0;e<r&&i[e]===f[e];e++);var M=r-e;for(l=1;l<=M&&i[r-l]===f[d-l];l++);return Pl=f.slice(e,1<l?1-l:void 0)}function Ol(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function zl(){return!0}function Mm(){return!1}function Kn(e){function i(r,l,f,d,M){this._reactName=r,this._targetInst=f,this.type=l,this.nativeEvent=d,this.target=M,this.currentTarget=null;for(var C in e)e.hasOwnProperty(C)&&(r=e[C],this[C]=r?r(d):d[C]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?zl:Mm,this.isPropagationStopped=Mm,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=zl)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=zl)},persist:function(){},isPersistent:zl}),i}var Us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=Kn(Us),xo=_({},Us,{view:0,detail:0}),Gy=Kn(xo),Zc,Kc,yo,Fl=_({},xo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==yo&&(yo&&e.type==="mousemove"?(Zc=e.screenX-yo.screenX,Kc=e.screenY-yo.screenY):Kc=Zc=0,yo=e),Zc)},movementY:function(e){return"movementY"in e?e.movementY:Kc}}),Em=Kn(Fl),Vy=_({},Fl,{dataTransfer:0}),ky=Kn(Vy),Xy=_({},xo,{relatedTarget:0}),Jc=Kn(Xy),Wy=_({},Us,{animationName:0,elapsedTime:0,pseudoElement:0}),qy=Kn(Wy),Yy=_({},Us,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Zy=Kn(Yy),Ky=_({},Us,{data:0}),bm=Kn(Ky),Jy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Qy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $y(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=jy[e])?!!i[e]:!1}function Qc(){return $y}var tS=_({},xo,{key:function(e){if(e.key){var i=Jy[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Ol(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Qy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qc,charCode:function(e){return e.type==="keypress"?Ol(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ol(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),eS=Kn(tS),nS=_({},Fl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Tm=Kn(nS),iS=_({},xo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qc}),aS=Kn(iS),sS=_({},Us,{propertyName:0,elapsedTime:0,pseudoElement:0}),rS=Kn(sS),oS=_({},Fl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),lS=Kn(oS),uS=_({},Us,{newState:0,oldState:0}),cS=Kn(uS),fS=[9,13,27,32],jc=ua&&"CompositionEvent"in window,So=null;ua&&"documentMode"in document&&(So=document.documentMode);var hS=ua&&"TextEvent"in window&&!So,Am=ua&&(!jc||So&&8<So&&11>=So),Rm=" ",Cm=!1;function wm(e,i){switch(e){case"keyup":return fS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Dm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var or=!1;function dS(e,i){switch(e){case"compositionend":return Dm(i);case"keypress":return i.which!==32?null:(Cm=!0,Rm);case"textInput":return e=i.data,e===Rm&&Cm?null:e;default:return null}}function pS(e,i){if(or)return e==="compositionend"||!jc&&wm(e,i)?(e=Sm(),Pl=Yc=Va=null,or=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Am&&i.locale!=="ko"?null:i.data;default:return null}}var mS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Um(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!mS[e.type]:i==="textarea"}function Lm(e,i,r,l){sr?rr?rr.push(l):rr=[l]:sr=l,i=Ru(i,"onChange"),0<i.length&&(r=new Il("onChange","change",null,r,l),e.push({event:r,listeners:i}))}var Mo=null,Eo=null;function gS(e){p_(e,0)}function Bl(e){var i=ws(e);if($e(i))return e}function Nm(e,i){if(e==="change")return i}var Pm=!1;if(ua){var $c;if(ua){var tf="oninput"in document;if(!tf){var Om=document.createElement("div");Om.setAttribute("oninput","return;"),tf=typeof Om.oninput=="function"}$c=tf}else $c=!1;Pm=$c&&(!document.documentMode||9<document.documentMode)}function zm(){Mo&&(Mo.detachEvent("onpropertychange",Im),Eo=Mo=null)}function Im(e){if(e.propertyName==="value"&&Bl(Eo)){var i=[];Lm(i,Eo,e,Xc(e)),ym(gS,i)}}function _S(e,i,r){e==="focusin"?(zm(),Mo=i,Eo=r,Mo.attachEvent("onpropertychange",Im)):e==="focusout"&&zm()}function vS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Bl(Eo)}function xS(e,i){if(e==="click")return Bl(i)}function yS(e,i){if(e==="input"||e==="change")return Bl(i)}function SS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var li=typeof Object.is=="function"?Object.is:SS;function bo(e,i){if(li(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var r=Object.keys(e),l=Object.keys(i);if(r.length!==l.length)return!1;for(l=0;l<r.length;l++){var f=r[l];if(!ln.call(i,f)||!li(e[f],i[f]))return!1}return!0}function Fm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bm(e,i){var r=Fm(e);e=0;for(var l;r;){if(r.nodeType===3){if(l=e+r.textContent.length,e<=i&&l>=i)return{node:r,offset:i-e};e=l}t:{for(;r;){if(r.nextSibling){r=r.nextSibling;break t}r=r.parentNode}r=void 0}r=Fm(r)}}function Hm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?Hm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Gm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=qe(e.document);i instanceof e.HTMLIFrameElement;){try{var r=typeof i.contentWindow.location.href=="string"}catch{r=!1}if(r)e=i.contentWindow;else break;i=qe(e.document)}return i}function ef(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var MS=ua&&"documentMode"in document&&11>=document.documentMode,lr=null,nf=null,To=null,af=!1;function Vm(e,i,r){var l=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;af||lr==null||lr!==qe(l)||(l=lr,"selectionStart"in l&&ef(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),To&&bo(To,l)||(To=l,l=Ru(nf,"onSelect"),0<l.length&&(i=new Il("onSelect","select",null,i,r),e.push({event:i,listeners:l}),i.target=lr)))}function Ls(e,i){var r={};return r[e.toLowerCase()]=i.toLowerCase(),r["Webkit"+e]="webkit"+i,r["Moz"+e]="moz"+i,r}var ur={animationend:Ls("Animation","AnimationEnd"),animationiteration:Ls("Animation","AnimationIteration"),animationstart:Ls("Animation","AnimationStart"),transitionrun:Ls("Transition","TransitionRun"),transitionstart:Ls("Transition","TransitionStart"),transitioncancel:Ls("Transition","TransitionCancel"),transitionend:Ls("Transition","TransitionEnd")},sf={},km={};ua&&(km=document.createElement("div").style,"AnimationEvent"in window||(delete ur.animationend.animation,delete ur.animationiteration.animation,delete ur.animationstart.animation),"TransitionEvent"in window||delete ur.transitionend.transition);function Ns(e){if(sf[e])return sf[e];if(!ur[e])return e;var i=ur[e],r;for(r in i)if(i.hasOwnProperty(r)&&r in km)return sf[e]=i[r];return e}var Xm=Ns("animationend"),Wm=Ns("animationiteration"),qm=Ns("animationstart"),ES=Ns("transitionrun"),bS=Ns("transitionstart"),TS=Ns("transitioncancel"),Ym=Ns("transitionend"),Zm=new Map,rf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");rf.push("scrollEnd");function Ni(e,i){Zm.set(e,i),Z(i,[e])}var Hl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},yi=[],cr=0,of=0;function Gl(){for(var e=cr,i=of=cr=0;i<e;){var r=yi[i];yi[i++]=null;var l=yi[i];yi[i++]=null;var f=yi[i];yi[i++]=null;var d=yi[i];if(yi[i++]=null,l!==null&&f!==null){var M=l.pending;M===null?f.next=f:(f.next=M.next,M.next=f),l.pending=f}d!==0&&Km(r,f,d)}}function Vl(e,i,r,l){yi[cr++]=e,yi[cr++]=i,yi[cr++]=r,yi[cr++]=l,of|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function lf(e,i,r,l){return Vl(e,i,r,l),kl(e)}function Ps(e,i){return Vl(e,null,null,i),kl(e)}function Km(e,i,r){e.lanes|=r;var l=e.alternate;l!==null&&(l.lanes|=r);for(var f=!1,d=e.return;d!==null;)d.childLanes|=r,l=d.alternate,l!==null&&(l.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(f=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,f&&i!==null&&(f=31-Ht(r),e=d.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=r|536870912),d):null}function kl(e){if(50<Yo)throw Yo=0,_h=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var fr={};function AS(e,i,r,l){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,i,r,l){return new AS(e,i,r,l)}function uf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ca(e,i){var r=e.alternate;return r===null?(r=ui(e.tag,i,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=i,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,i=e.dependencies,r.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Jm(e,i){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,i=r.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Xl(e,i,r,l,f,d){var M=0;if(l=e,typeof e=="function")uf(e)&&(M=1);else if(typeof e=="string")M=UM(e,r,ot.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case N:return e=ui(31,r,i,f),e.elementType=N,e.lanes=d,e;case w:return Os(r.children,f,d,i);case x:M=8,f|=24;break;case y:return e=ui(12,r,i,f|2),e.elementType=y,e.lanes=d,e;case O:return e=ui(13,r,i,f),e.elementType=O,e.lanes=d,e;case L:return e=ui(19,r,i,f),e.elementType=L,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:M=10;break t;case U:M=9;break t;case A:M=11;break t;case I:M=14;break t;case T:M=16,l=null;break t}M=29,r=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=ui(M,r,i,f),i.elementType=e,i.type=l,i.lanes=d,i}function Os(e,i,r,l){return e=ui(7,e,l,i),e.lanes=r,e}function cf(e,i,r){return e=ui(6,e,null,i),e.lanes=r,e}function Qm(e){var i=ui(18,null,null,0);return i.stateNode=e,i}function ff(e,i,r){return i=ui(4,e.children!==null?e.children:[],e.key,i),i.lanes=r,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var jm=new WeakMap;function Si(e,i){if(typeof e=="object"&&e!==null){var r=jm.get(e);return r!==void 0?r:(i={value:e,source:i,stack:on(i)},jm.set(e,i),i)}return{value:e,source:i,stack:on(i)}}var hr=[],dr=0,Wl=null,Ao=0,Mi=[],Ei=0,ka=null,Wi=1,qi="";function fa(e,i){hr[dr++]=Ao,hr[dr++]=Wl,Wl=e,Ao=i}function $m(e,i,r){Mi[Ei++]=Wi,Mi[Ei++]=qi,Mi[Ei++]=ka,ka=e;var l=Wi;e=qi;var f=32-Ht(l)-1;l&=~(1<<f),r+=1;var d=32-Ht(i)+f;if(30<d){var M=f-f%5;d=(l&(1<<M)-1).toString(32),l>>=M,f-=M,Wi=1<<32-Ht(i)+f|r<<f|l,qi=d+e}else Wi=1<<d|r<<f|l,qi=e}function hf(e){e.return!==null&&(fa(e,1),$m(e,1,0))}function df(e){for(;e===Wl;)Wl=hr[--dr],hr[dr]=null,Ao=hr[--dr],hr[dr]=null;for(;e===ka;)ka=Mi[--Ei],Mi[Ei]=null,qi=Mi[--Ei],Mi[Ei]=null,Wi=Mi[--Ei],Mi[Ei]=null}function t0(e,i){Mi[Ei++]=Wi,Mi[Ei++]=qi,Mi[Ei++]=ka,Wi=i.id,qi=i.overflow,ka=e}var Un=null,Ke=null,Ee=!1,Xa=null,bi=!1,pf=Error(a(519));function Wa(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ro(Si(i,e)),pf}function e0(e){var i=e.stateNode,r=e.type,l=e.memoizedProps;switch(i[gn]=e,i[Dn]=l,r){case"dialog":xe("cancel",i),xe("close",i);break;case"iframe":case"object":case"embed":xe("load",i);break;case"video":case"audio":for(r=0;r<Ko.length;r++)xe(Ko[r],i);break;case"source":xe("error",i);break;case"img":case"image":case"link":xe("error",i),xe("load",i);break;case"details":xe("toggle",i);break;case"input":xe("invalid",i),In(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":xe("invalid",i);break;case"textarea":xe("invalid",i),Ui(i,l.value,l.defaultValue,l.children)}r=l.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||i.textContent===""+r||l.suppressHydrationWarning===!0||v_(i.textContent,r)?(l.popover!=null&&(xe("beforetoggle",i),xe("toggle",i)),l.onScroll!=null&&xe("scroll",i),l.onScrollEnd!=null&&xe("scrollend",i),l.onClick!=null&&(i.onclick=la),i=!0):i=!1,i||Wa(e,!0)}function n0(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:bi=!1;return;case 27:case 3:bi=!0;return;default:Un=Un.return}}function pr(e){if(e!==Un)return!1;if(!Ee)return n0(e),Ee=!0,!1;var i=e.tag,r;if((r=i!==3&&i!==27)&&((r=i===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Lh(e.type,e.memoizedProps)),r=!r),r&&Ke&&Wa(e),n0(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ke=R_(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ke=R_(e)}else i===27?(i=Ke,ss(e.type)?(e=Ih,Ih=null,Ke=e):Ke=i):Ke=Un?Ai(e.stateNode.nextSibling):null;return!0}function zs(){Ke=Un=null,Ee=!1}function mf(){var e=Xa;return e!==null&&($n===null?$n=e:$n.push.apply($n,e),Xa=null),e}function Ro(e){Xa===null?Xa=[e]:Xa.push(e)}var gf=z(null),Is=null,ha=null;function qa(e,i,r){bt(gf,i._currentValue),i._currentValue=r}function da(e){e._currentValue=gf.current,j(gf)}function _f(e,i,r){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===r)break;e=e.return}}function vf(e,i,r,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var d=f.dependencies;if(d!==null){var M=f.child;d=d.firstContext;t:for(;d!==null;){var C=d;d=f;for(var B=0;B<i.length;B++)if(C.context===i[B]){d.lanes|=r,C=d.alternate,C!==null&&(C.lanes|=r),_f(d.return,r,e),l||(M=null);break t}d=C.next}}else if(f.tag===18){if(M=f.return,M===null)throw Error(a(341));M.lanes|=r,d=M.alternate,d!==null&&(d.lanes|=r),_f(M,r,e),M=null}else M=f.child;if(M!==null)M.return=f;else for(M=f;M!==null;){if(M===e){M=null;break}if(f=M.sibling,f!==null){f.return=M.return,M=f;break}M=M.return}f=M}}function mr(e,i,r,l){e=null;for(var f=i,d=!1;f!==null;){if(!d){if((f.flags&524288)!==0)d=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var M=f.alternate;if(M===null)throw Error(a(387));if(M=M.memoizedProps,M!==null){var C=f.type;li(f.pendingProps.value,M.value)||(e!==null?e.push(C):e=[C])}}else if(f===Q.current){if(M=f.alternate,M===null)throw Error(a(387));M.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(tl):e=[tl])}f=f.return}e!==null&&vf(i,e,r,l),i.flags|=262144}function ql(e){for(e=e.firstContext;e!==null;){if(!li(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Fs(e){Is=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ln(e){return i0(Is,e)}function Yl(e,i){return Is===null&&Fs(e),i0(e,i)}function i0(e,i){var r=i._currentValue;if(i={context:i,memoizedValue:r,next:null},ha===null){if(e===null)throw Error(a(308));ha=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ha=ha.next=i;return r}var RS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(r,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(r){return r()})}},CS=s.unstable_scheduleCallback,wS=s.unstable_NormalPriority,vn={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function xf(){return{controller:new RS,data:new Map,refCount:0}}function Co(e){e.refCount--,e.refCount===0&&CS(wS,function(){e.controller.abort()})}var wo=null,yf=0,gr=0,_r=null;function DS(e,i){if(wo===null){var r=wo=[];yf=0,gr=Eh(),_r={status:"pending",value:void 0,then:function(l){r.push(l)}}}return yf++,i.then(a0,a0),i}function a0(){if(--yf===0&&wo!==null){_r!==null&&(_r.status="fulfilled");var e=wo;wo=null,gr=0,_r=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function US(e,i){var r=[],l={status:"pending",value:null,reason:null,then:function(f){r.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<r.length;f++)(0,r[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<r.length;f++)(0,r[f])(void 0)}),l}var s0=F.S;F.S=function(e,i){Vg=Ge(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&DS(e,i),s0!==null&&s0(e,i)};var Bs=z(null);function Sf(){var e=Bs.current;return e!==null?e:Ye.pooledCache}function Zl(e,i){i===null?bt(Bs,Bs.current):bt(Bs,i.pool)}function r0(){var e=Sf();return e===null?null:{parent:vn._currentValue,pool:e}}var vr=Error(a(460)),Mf=Error(a(474)),Kl=Error(a(542)),Jl={then:function(){}};function o0(e){return e=e.status,e==="fulfilled"||e==="rejected"}function l0(e,i,r){switch(r=e[r],r===void 0?e.push(i):r!==i&&(i.then(la,la),i=r),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,c0(e),e;default:if(typeof i.status=="string")i.then(la,la);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,c0(e),e}throw Gs=i,vr}}function Hs(e){try{var i=e._init;return i(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Gs=r,vr):r}}var Gs=null;function u0(){if(Gs===null)throw Error(a(459));var e=Gs;return Gs=null,e}function c0(e){if(e===vr||e===Kl)throw Error(a(483))}var xr=null,Do=0;function Ql(e){var i=Do;return Do+=1,xr===null&&(xr=[]),l0(xr,e,i)}function Uo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function jl(e,i){throw i.$$typeof===v?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function f0(e){function i($,X){if(e){var it=$.deletions;it===null?($.deletions=[X],$.flags|=16):it.push(X)}}function r($,X){if(!e)return null;for(;X!==null;)i($,X),X=X.sibling;return null}function l($){for(var X=new Map;$!==null;)$.key!==null?X.set($.key,$):X.set($.index,$),$=$.sibling;return X}function f($,X){return $=ca($,X),$.index=0,$.sibling=null,$}function d($,X,it){return $.index=it,e?(it=$.alternate,it!==null?(it=it.index,it<X?($.flags|=67108866,X):it):($.flags|=67108866,X)):($.flags|=1048576,X)}function M($){return e&&$.alternate===null&&($.flags|=67108866),$}function C($,X,it,Mt){return X===null||X.tag!==6?(X=cf(it,$.mode,Mt),X.return=$,X):(X=f(X,it),X.return=$,X)}function B($,X,it,Mt){var ee=it.type;return ee===w?vt($,X,it.props.children,Mt,it.key):X!==null&&(X.elementType===ee||typeof ee=="object"&&ee!==null&&ee.$$typeof===T&&Hs(ee)===X.type)?(X=f(X,it.props),Uo(X,it),X.return=$,X):(X=Xl(it.type,it.key,it.props,null,$.mode,Mt),Uo(X,it),X.return=$,X)}function at($,X,it,Mt){return X===null||X.tag!==4||X.stateNode.containerInfo!==it.containerInfo||X.stateNode.implementation!==it.implementation?(X=ff(it,$.mode,Mt),X.return=$,X):(X=f(X,it.children||[]),X.return=$,X)}function vt($,X,it,Mt,ee){return X===null||X.tag!==7?(X=Os(it,$.mode,Mt,ee),X.return=$,X):(X=f(X,it),X.return=$,X)}function Et($,X,it){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=cf(""+X,$.mode,it),X.return=$,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case S:return it=Xl(X.type,X.key,X.props,null,$.mode,it),Uo(it,X),it.return=$,it;case E:return X=ff(X,$.mode,it),X.return=$,X;case T:return X=Hs(X),Et($,X,it)}if(J(X)||q(X))return X=Os(X,$.mode,it,null),X.return=$,X;if(typeof X.then=="function")return Et($,Ql(X),it);if(X.$$typeof===D)return Et($,Yl($,X),it);jl($,X)}return null}function ct($,X,it,Mt){var ee=X!==null?X.key:null;if(typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint")return ee!==null?null:C($,X,""+it,Mt);if(typeof it=="object"&&it!==null){switch(it.$$typeof){case S:return it.key===ee?B($,X,it,Mt):null;case E:return it.key===ee?at($,X,it,Mt):null;case T:return it=Hs(it),ct($,X,it,Mt)}if(J(it)||q(it))return ee!==null?null:vt($,X,it,Mt,null);if(typeof it.then=="function")return ct($,X,Ql(it),Mt);if(it.$$typeof===D)return ct($,X,Yl($,it),Mt);jl($,it)}return null}function ft($,X,it,Mt,ee){if(typeof Mt=="string"&&Mt!==""||typeof Mt=="number"||typeof Mt=="bigint")return $=$.get(it)||null,C(X,$,""+Mt,ee);if(typeof Mt=="object"&&Mt!==null){switch(Mt.$$typeof){case S:return $=$.get(Mt.key===null?it:Mt.key)||null,B(X,$,Mt,ee);case E:return $=$.get(Mt.key===null?it:Mt.key)||null,at(X,$,Mt,ee);case T:return Mt=Hs(Mt),ft($,X,it,Mt,ee)}if(J(Mt)||q(Mt))return $=$.get(it)||null,vt(X,$,Mt,ee,null);if(typeof Mt.then=="function")return ft($,X,it,Ql(Mt),ee);if(Mt.$$typeof===D)return ft($,X,it,Yl(X,Mt),ee);jl(X,Mt)}return null}function qt($,X,it,Mt){for(var ee=null,we=null,Jt=X,de=X=0,Se=null;Jt!==null&&de<it.length;de++){Jt.index>de?(Se=Jt,Jt=null):Se=Jt.sibling;var De=ct($,Jt,it[de],Mt);if(De===null){Jt===null&&(Jt=Se);break}e&&Jt&&De.alternate===null&&i($,Jt),X=d(De,X,de),we===null?ee=De:we.sibling=De,we=De,Jt=Se}if(de===it.length)return r($,Jt),Ee&&fa($,de),ee;if(Jt===null){for(;de<it.length;de++)Jt=Et($,it[de],Mt),Jt!==null&&(X=d(Jt,X,de),we===null?ee=Jt:we.sibling=Jt,we=Jt);return Ee&&fa($,de),ee}for(Jt=l(Jt);de<it.length;de++)Se=ft(Jt,$,de,it[de],Mt),Se!==null&&(e&&Se.alternate!==null&&Jt.delete(Se.key===null?de:Se.key),X=d(Se,X,de),we===null?ee=Se:we.sibling=Se,we=Se);return e&&Jt.forEach(function(cs){return i($,cs)}),Ee&&fa($,de),ee}function ie($,X,it,Mt){if(it==null)throw Error(a(151));for(var ee=null,we=null,Jt=X,de=X=0,Se=null,De=it.next();Jt!==null&&!De.done;de++,De=it.next()){Jt.index>de?(Se=Jt,Jt=null):Se=Jt.sibling;var cs=ct($,Jt,De.value,Mt);if(cs===null){Jt===null&&(Jt=Se);break}e&&Jt&&cs.alternate===null&&i($,Jt),X=d(cs,X,de),we===null?ee=cs:we.sibling=cs,we=cs,Jt=Se}if(De.done)return r($,Jt),Ee&&fa($,de),ee;if(Jt===null){for(;!De.done;de++,De=it.next())De=Et($,De.value,Mt),De!==null&&(X=d(De,X,de),we===null?ee=De:we.sibling=De,we=De);return Ee&&fa($,de),ee}for(Jt=l(Jt);!De.done;de++,De=it.next())De=ft(Jt,$,de,De.value,Mt),De!==null&&(e&&De.alternate!==null&&Jt.delete(De.key===null?de:De.key),X=d(De,X,de),we===null?ee=De:we.sibling=De,we=De);return e&&Jt.forEach(function(VM){return i($,VM)}),Ee&&fa($,de),ee}function Xe($,X,it,Mt){if(typeof it=="object"&&it!==null&&it.type===w&&it.key===null&&(it=it.props.children),typeof it=="object"&&it!==null){switch(it.$$typeof){case S:t:{for(var ee=it.key;X!==null;){if(X.key===ee){if(ee=it.type,ee===w){if(X.tag===7){r($,X.sibling),Mt=f(X,it.props.children),Mt.return=$,$=Mt;break t}}else if(X.elementType===ee||typeof ee=="object"&&ee!==null&&ee.$$typeof===T&&Hs(ee)===X.type){r($,X.sibling),Mt=f(X,it.props),Uo(Mt,it),Mt.return=$,$=Mt;break t}r($,X);break}else i($,X);X=X.sibling}it.type===w?(Mt=Os(it.props.children,$.mode,Mt,it.key),Mt.return=$,$=Mt):(Mt=Xl(it.type,it.key,it.props,null,$.mode,Mt),Uo(Mt,it),Mt.return=$,$=Mt)}return M($);case E:t:{for(ee=it.key;X!==null;){if(X.key===ee)if(X.tag===4&&X.stateNode.containerInfo===it.containerInfo&&X.stateNode.implementation===it.implementation){r($,X.sibling),Mt=f(X,it.children||[]),Mt.return=$,$=Mt;break t}else{r($,X);break}else i($,X);X=X.sibling}Mt=ff(it,$.mode,Mt),Mt.return=$,$=Mt}return M($);case T:return it=Hs(it),Xe($,X,it,Mt)}if(J(it))return qt($,X,it,Mt);if(q(it)){if(ee=q(it),typeof ee!="function")throw Error(a(150));return it=ee.call(it),ie($,X,it,Mt)}if(typeof it.then=="function")return Xe($,X,Ql(it),Mt);if(it.$$typeof===D)return Xe($,X,Yl($,it),Mt);jl($,it)}return typeof it=="string"&&it!==""||typeof it=="number"||typeof it=="bigint"?(it=""+it,X!==null&&X.tag===6?(r($,X.sibling),Mt=f(X,it),Mt.return=$,$=Mt):(r($,X),Mt=cf(it,$.mode,Mt),Mt.return=$,$=Mt),M($)):r($,X)}return function($,X,it,Mt){try{Do=0;var ee=Xe($,X,it,Mt);return xr=null,ee}catch(Jt){if(Jt===vr||Jt===Kl)throw Jt;var we=ui(29,Jt,null,$.mode);return we.lanes=Mt,we.return=$,we}}}var Vs=f0(!0),h0=f0(!1),Ya=!1;function Ef(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function bf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Za(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ka(e,i,r){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(Le&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=kl(e),Km(e,null,r),i}return Vl(e,l,i,r),kl(e)}function Lo(e,i,r){if(i=i.updateQueue,i!==null&&(i=i.shared,(r&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,r|=l,i.lanes=r,ai(e,r)}}function Tf(e,i){var r=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,r===l)){var f=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var M={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?f=d=M:d=d.next=M,r=r.next}while(r!==null);d===null?f=d=i:d=d.next=i}else f=d=i;r={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:d,shared:l.shared,callbacks:l.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=i:e.next=i,r.lastBaseUpdate=i}var Af=!1;function No(){if(Af){var e=_r;if(e!==null)throw e}}function Po(e,i,r,l){Af=!1;var f=e.updateQueue;Ya=!1;var d=f.firstBaseUpdate,M=f.lastBaseUpdate,C=f.shared.pending;if(C!==null){f.shared.pending=null;var B=C,at=B.next;B.next=null,M===null?d=at:M.next=at,M=B;var vt=e.alternate;vt!==null&&(vt=vt.updateQueue,C=vt.lastBaseUpdate,C!==M&&(C===null?vt.firstBaseUpdate=at:C.next=at,vt.lastBaseUpdate=B))}if(d!==null){var Et=f.baseState;M=0,vt=at=B=null,C=d;do{var ct=C.lane&-536870913,ft=ct!==C.lane;if(ft?(ye&ct)===ct:(l&ct)===ct){ct!==0&&ct===gr&&(Af=!0),vt!==null&&(vt=vt.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var qt=e,ie=C;ct=i;var Xe=r;switch(ie.tag){case 1:if(qt=ie.payload,typeof qt=="function"){Et=qt.call(Xe,Et,ct);break t}Et=qt;break t;case 3:qt.flags=qt.flags&-65537|128;case 0:if(qt=ie.payload,ct=typeof qt=="function"?qt.call(Xe,Et,ct):qt,ct==null)break t;Et=_({},Et,ct);break t;case 2:Ya=!0}}ct=C.callback,ct!==null&&(e.flags|=64,ft&&(e.flags|=8192),ft=f.callbacks,ft===null?f.callbacks=[ct]:ft.push(ct))}else ft={lane:ct,tag:C.tag,payload:C.payload,callback:C.callback,next:null},vt===null?(at=vt=ft,B=Et):vt=vt.next=ft,M|=ct;if(C=C.next,C===null){if(C=f.shared.pending,C===null)break;ft=C,C=ft.next,ft.next=null,f.lastBaseUpdate=ft,f.shared.pending=null}}while(!0);vt===null&&(B=Et),f.baseState=B,f.firstBaseUpdate=at,f.lastBaseUpdate=vt,d===null&&(f.shared.lanes=0),ts|=M,e.lanes=M,e.memoizedState=Et}}function d0(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function p0(e,i){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)d0(r[e],i)}var yr=z(null),$l=z(0);function m0(e,i){e=Ma,bt($l,e),bt(yr,i),Ma=e|i.baseLanes}function Rf(){bt($l,Ma),bt(yr,yr.current)}function Cf(){Ma=$l.current,j(yr),j($l)}var ci=z(null),Ti=null;function Ja(e){var i=e.alternate;bt(dn,dn.current&1),bt(ci,e),Ti===null&&(i===null||yr.current!==null||i.memoizedState!==null)&&(Ti=e)}function wf(e){bt(dn,dn.current),bt(ci,e),Ti===null&&(Ti=e)}function g0(e){e.tag===22?(bt(dn,dn.current),bt(ci,e),Ti===null&&(Ti=e)):Qa()}function Qa(){bt(dn,dn.current),bt(ci,ci.current)}function fi(e){j(ci),Ti===e&&(Ti=null),j(dn)}var dn=z(0);function tu(e){for(var i=e;i!==null;){if(i.tag===13){var r=i.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Oh(r)||zh(r)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var pa=0,fe=null,Ve=null,xn=null,eu=!1,Sr=!1,ks=!1,nu=0,Oo=0,Mr=null,LS=0;function cn(){throw Error(a(321))}function Df(e,i){if(i===null)return!1;for(var r=0;r<i.length&&r<e.length;r++)if(!li(e[r],i[r]))return!1;return!0}function Uf(e,i,r,l,f,d){return pa=d,fe=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,F.H=e===null||e.memoizedState===null?$0:qf,ks=!1,d=r(l,f),ks=!1,Sr&&(d=v0(i,r,l,f)),_0(e),d}function _0(e){F.H=Fo;var i=Ve!==null&&Ve.next!==null;if(pa=0,xn=Ve=fe=null,eu=!1,Oo=0,Mr=null,i)throw Error(a(300));e===null||yn||(e=e.dependencies,e!==null&&ql(e)&&(yn=!0))}function v0(e,i,r,l){fe=e;var f=0;do{if(Sr&&(Mr=null),Oo=0,Sr=!1,25<=f)throw Error(a(301));if(f+=1,xn=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}F.H=tg,d=i(r,l)}while(Sr);return d}function NS(){var e=F.H,i=e.useState()[0];return i=typeof i.then=="function"?zo(i):i,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(fe.flags|=1024),i}function Lf(){var e=nu!==0;return nu=0,e}function Nf(e,i,r){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~r}function Pf(e){if(eu){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}eu=!1}pa=0,xn=Ve=fe=null,Sr=!1,Oo=nu=0,Mr=null}function Xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xn===null?fe.memoizedState=xn=e:xn=xn.next=e,xn}function pn(){if(Ve===null){var e=fe.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var i=xn===null?fe.memoizedState:xn.next;if(i!==null)xn=i,Ve=e;else{if(e===null)throw fe.alternate===null?Error(a(467)):Error(a(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},xn===null?fe.memoizedState=xn=e:xn=xn.next=e}return xn}function iu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function zo(e){var i=Oo;return Oo+=1,Mr===null&&(Mr=[]),e=l0(Mr,e,i),i=fe,(xn===null?i.memoizedState:xn.next)===null&&(i=i.alternate,F.H=i===null||i.memoizedState===null?$0:qf),e}function au(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return zo(e);if(e.$$typeof===D)return Ln(e)}throw Error(a(438,String(e)))}function Of(e){var i=null,r=fe.updateQueue;if(r!==null&&(i=r.memoCache),i==null){var l=fe.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),r===null&&(r=iu(),fe.updateQueue=r),r.memoCache=i,r=i.data[i.index],r===void 0)for(r=i.data[i.index]=Array(e),l=0;l<e;l++)r[l]=W;return i.index++,r}function ma(e,i){return typeof i=="function"?i(e):i}function su(e){var i=pn();return zf(i,Ve,e)}function zf(e,i,r){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=r;var f=e.baseQueue,d=l.pending;if(d!==null){if(f!==null){var M=f.next;f.next=d.next,d.next=M}i.baseQueue=f=d,l.pending=null}if(d=e.baseState,f===null)e.memoizedState=d;else{i=f.next;var C=M=null,B=null,at=i,vt=!1;do{var Et=at.lane&-536870913;if(Et!==at.lane?(ye&Et)===Et:(pa&Et)===Et){var ct=at.revertLane;if(ct===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null}),Et===gr&&(vt=!0);else if((pa&ct)===ct){at=at.next,ct===gr&&(vt=!0);continue}else Et={lane:0,revertLane:at.revertLane,gesture:null,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},B===null?(C=B=Et,M=d):B=B.next=Et,fe.lanes|=ct,ts|=ct;Et=at.action,ks&&r(d,Et),d=at.hasEagerState?at.eagerState:r(d,Et)}else ct={lane:Et,revertLane:at.revertLane,gesture:at.gesture,action:at.action,hasEagerState:at.hasEagerState,eagerState:at.eagerState,next:null},B===null?(C=B=ct,M=d):B=B.next=ct,fe.lanes|=Et,ts|=Et;at=at.next}while(at!==null&&at!==i);if(B===null?M=d:B.next=C,!li(d,e.memoizedState)&&(yn=!0,vt&&(r=_r,r!==null)))throw r;e.memoizedState=d,e.baseState=M,e.baseQueue=B,l.lastRenderedState=d}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function If(e){var i=pn(),r=i.queue;if(r===null)throw Error(a(311));r.lastRenderedReducer=e;var l=r.dispatch,f=r.pending,d=i.memoizedState;if(f!==null){r.pending=null;var M=f=f.next;do d=e(d,M.action),M=M.next;while(M!==f);li(d,i.memoizedState)||(yn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),r.lastRenderedState=d}return[d,l]}function x0(e,i,r){var l=fe,f=pn(),d=Ee;if(d){if(r===void 0)throw Error(a(407));r=r()}else r=i();var M=!li((Ve||f).memoizedState,r);if(M&&(f.memoizedState=r,yn=!0),f=f.queue,Hf(M0.bind(null,l,f,e),[e]),f.getSnapshot!==i||M||xn!==null&&xn.memoizedState.tag&1){if(l.flags|=2048,Er(9,{destroy:void 0},S0.bind(null,l,f,r,i),null),Ye===null)throw Error(a(349));d||(pa&127)!==0||y0(l,i,r)}return r}function y0(e,i,r){e.flags|=16384,e={getSnapshot:i,value:r},i=fe.updateQueue,i===null?(i=iu(),fe.updateQueue=i,i.stores=[e]):(r=i.stores,r===null?i.stores=[e]:r.push(e))}function S0(e,i,r,l){i.value=r,i.getSnapshot=l,E0(i)&&b0(e)}function M0(e,i,r){return r(function(){E0(i)&&b0(e)})}function E0(e){var i=e.getSnapshot;e=e.value;try{var r=i();return!li(e,r)}catch{return!0}}function b0(e){var i=Ps(e,2);i!==null&&ti(i,e,2)}function Ff(e){var i=Xn();if(typeof e=="function"){var r=e;if(e=r(),ks){Dt(!0);try{r()}finally{Dt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:e},i}function T0(e,i,r,l){return e.baseState=r,zf(e,Ve,typeof l=="function"?l:ma)}function PS(e,i,r,l,f){if(lu(e))throw Error(a(485));if(e=i.action,e!==null){var d={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){d.listeners.push(M)}};F.T!==null?r(!0):d.isTransition=!1,l(d),r=i.pending,r===null?(d.next=i.pending=d,A0(i,d)):(d.next=r.next,i.pending=r.next=d)}}function A0(e,i){var r=i.action,l=i.payload,f=e.state;if(i.isTransition){var d=F.T,M={};F.T=M;try{var C=r(f,l),B=F.S;B!==null&&B(M,C),R0(e,i,C)}catch(at){Bf(e,i,at)}finally{d!==null&&M.types!==null&&(d.types=M.types),F.T=d}}else try{d=r(f,l),R0(e,i,d)}catch(at){Bf(e,i,at)}}function R0(e,i,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(l){C0(e,i,l)},function(l){return Bf(e,i,l)}):C0(e,i,r)}function C0(e,i,r){i.status="fulfilled",i.value=r,w0(i),e.state=r,i=e.pending,i!==null&&(r=i.next,r===i?e.pending=null:(r=r.next,i.next=r,A0(e,r)))}function Bf(e,i,r){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=r,w0(i),i=i.next;while(i!==l)}e.action=null}function w0(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function D0(e,i){return i}function U0(e,i){if(Ee){var r=Ye.formState;if(r!==null){t:{var l=fe;if(Ee){if(Ke){e:{for(var f=Ke,d=bi;f.nodeType!==8;){if(!d){f=null;break e}if(f=Ai(f.nextSibling),f===null){f=null;break e}}d=f.data,f=d==="F!"||d==="F"?f:null}if(f){Ke=Ai(f.nextSibling),l=f.data==="F!";break t}}Wa(l)}l=!1}l&&(i=r[0])}}return r=Xn(),r.memoizedState=r.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:D0,lastRenderedState:i},r.queue=l,r=J0.bind(null,fe,l),l.dispatch=r,l=Ff(!1),d=Wf.bind(null,fe,!1,l.queue),l=Xn(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,r=PS.bind(null,fe,f,d,r),f.dispatch=r,l.memoizedState=e,[i,r,!1]}function L0(e){var i=pn();return N0(i,Ve,e)}function N0(e,i,r){if(i=zf(e,i,D0)[0],e=su(ma)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=zo(i)}catch(M){throw M===vr?Kl:M}else l=i;i=pn();var f=i.queue,d=f.dispatch;return r!==i.memoizedState&&(fe.flags|=2048,Er(9,{destroy:void 0},OS.bind(null,f,r),null)),[l,d,e]}function OS(e,i){e.action=i}function P0(e){var i=pn(),r=Ve;if(r!==null)return N0(i,r,e);pn(),i=i.memoizedState,r=pn();var l=r.queue.dispatch;return r.memoizedState=e,[i,l,!1]}function Er(e,i,r,l){return e={tag:e,create:r,deps:l,inst:i,next:null},i=fe.updateQueue,i===null&&(i=iu(),fe.updateQueue=i),r=i.lastEffect,r===null?i.lastEffect=e.next=e:(l=r.next,r.next=e,e.next=l,i.lastEffect=e),e}function O0(){return pn().memoizedState}function ru(e,i,r,l){var f=Xn();fe.flags|=e,f.memoizedState=Er(1|i,{destroy:void 0},r,l===void 0?null:l)}function ou(e,i,r,l){var f=pn();l=l===void 0?null:l;var d=f.memoizedState.inst;Ve!==null&&l!==null&&Df(l,Ve.memoizedState.deps)?f.memoizedState=Er(i,d,r,l):(fe.flags|=e,f.memoizedState=Er(1|i,d,r,l))}function z0(e,i){ru(8390656,8,e,i)}function Hf(e,i){ou(2048,8,e,i)}function zS(e){fe.flags|=4;var i=fe.updateQueue;if(i===null)i=iu(),fe.updateQueue=i,i.events=[e];else{var r=i.events;r===null?i.events=[e]:r.push(e)}}function I0(e){var i=pn().memoizedState;return zS({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function F0(e,i){return ou(4,2,e,i)}function B0(e,i){return ou(4,4,e,i)}function H0(e,i){if(typeof i=="function"){e=e();var r=i(e);return function(){typeof r=="function"?r():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function G0(e,i,r){r=r!=null?r.concat([e]):null,ou(4,4,H0.bind(null,i,e),r)}function Gf(){}function V0(e,i){var r=pn();i=i===void 0?null:i;var l=r.memoizedState;return i!==null&&Df(i,l[1])?l[0]:(r.memoizedState=[e,i],e)}function k0(e,i){var r=pn();i=i===void 0?null:i;var l=r.memoizedState;if(i!==null&&Df(i,l[1]))return l[0];if(l=e(),ks){Dt(!0);try{e()}finally{Dt(!1)}}return r.memoizedState=[l,i],l}function Vf(e,i,r){return r===void 0||(pa&1073741824)!==0&&(ye&261930)===0?e.memoizedState=i:(e.memoizedState=r,e=Xg(),fe.lanes|=e,ts|=e,r)}function X0(e,i,r,l){return li(r,i)?r:yr.current!==null?(e=Vf(e,r,l),li(e,i)||(yn=!0),e):(pa&42)===0||(pa&1073741824)!==0&&(ye&261930)===0?(yn=!0,e.memoizedState=r):(e=Xg(),fe.lanes|=e,ts|=e,i)}function W0(e,i,r,l,f){var d=H.p;H.p=d!==0&&8>d?d:8;var M=F.T,C={};F.T=C,Wf(e,!1,i,r);try{var B=f(),at=F.S;if(at!==null&&at(C,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var vt=US(B,l);Io(e,i,vt,pi(e))}else Io(e,i,l,pi(e))}catch(Et){Io(e,i,{then:function(){},status:"rejected",reason:Et},pi())}finally{H.p=d,M!==null&&C.types!==null&&(M.types=C.types),F.T=M}}function IS(){}function kf(e,i,r,l){if(e.tag!==5)throw Error(a(476));var f=q0(e).queue;W0(e,f,i,nt,r===null?IS:function(){return Y0(e),r(l)})}function q0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:nt,baseState:nt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:nt},next:null};var r={};return i.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:r},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Y0(e){var i=q0(e);i.next===null&&(i=e.alternate.memoizedState),Io(e,i.next.queue,{},pi())}function Xf(){return Ln(tl)}function Z0(){return pn().memoizedState}function K0(){return pn().memoizedState}function FS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var r=pi();e=Za(r);var l=Ka(i,e,r);l!==null&&(ti(l,i,r),Lo(l,i,r)),i={cache:xf()},e.payload=i;return}i=i.return}}function BS(e,i,r){var l=pi();r={lane:l,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lu(e)?Q0(i,r):(r=lf(e,i,r,l),r!==null&&(ti(r,e,l),j0(r,i,l)))}function J0(e,i,r){var l=pi();Io(e,i,r,l)}function Io(e,i,r,l){var f={lane:l,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(lu(e))Q0(i,f);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var M=i.lastRenderedState,C=d(M,r);if(f.hasEagerState=!0,f.eagerState=C,li(C,M))return Vl(e,i,f,0),Ye===null&&Gl(),!1}catch{}if(r=lf(e,i,f,l),r!==null)return ti(r,e,l),j0(r,i,l),!0}return!1}function Wf(e,i,r,l){if(l={lane:2,revertLane:Eh(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},lu(e)){if(i)throw Error(a(479))}else i=lf(e,r,l,2),i!==null&&ti(i,e,2)}function lu(e){var i=e.alternate;return e===fe||i!==null&&i===fe}function Q0(e,i){Sr=eu=!0;var r=e.pending;r===null?i.next=i:(i.next=r.next,r.next=i),e.pending=i}function j0(e,i,r){if((r&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,r|=l,i.lanes=r,ai(e,r)}}var Fo={readContext:Ln,use:au,useCallback:cn,useContext:cn,useEffect:cn,useImperativeHandle:cn,useLayoutEffect:cn,useInsertionEffect:cn,useMemo:cn,useReducer:cn,useRef:cn,useState:cn,useDebugValue:cn,useDeferredValue:cn,useTransition:cn,useSyncExternalStore:cn,useId:cn,useHostTransitionStatus:cn,useFormState:cn,useActionState:cn,useOptimistic:cn,useMemoCache:cn,useCacheRefresh:cn};Fo.useEffectEvent=cn;var $0={readContext:Ln,use:au,useCallback:function(e,i){return Xn().memoizedState=[e,i===void 0?null:i],e},useContext:Ln,useEffect:z0,useImperativeHandle:function(e,i,r){r=r!=null?r.concat([e]):null,ru(4194308,4,H0.bind(null,i,e),r)},useLayoutEffect:function(e,i){return ru(4194308,4,e,i)},useInsertionEffect:function(e,i){ru(4,2,e,i)},useMemo:function(e,i){var r=Xn();i=i===void 0?null:i;var l=e();if(ks){Dt(!0);try{e()}finally{Dt(!1)}}return r.memoizedState=[l,i],l},useReducer:function(e,i,r){var l=Xn();if(r!==void 0){var f=r(i);if(ks){Dt(!0);try{r(i)}finally{Dt(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=BS.bind(null,fe,e),[l.memoizedState,e]},useRef:function(e){var i=Xn();return e={current:e},i.memoizedState=e},useState:function(e){e=Ff(e);var i=e.queue,r=J0.bind(null,fe,i);return i.dispatch=r,[e.memoizedState,r]},useDebugValue:Gf,useDeferredValue:function(e,i){var r=Xn();return Vf(r,e,i)},useTransition:function(){var e=Ff(!1);return e=W0.bind(null,fe,e.queue,!0,!1),Xn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,r){var l=fe,f=Xn();if(Ee){if(r===void 0)throw Error(a(407));r=r()}else{if(r=i(),Ye===null)throw Error(a(349));(ye&127)!==0||y0(l,i,r)}f.memoizedState=r;var d={value:r,getSnapshot:i};return f.queue=d,z0(M0.bind(null,l,d,e),[e]),l.flags|=2048,Er(9,{destroy:void 0},S0.bind(null,l,d,r,i),null),r},useId:function(){var e=Xn(),i=Ye.identifierPrefix;if(Ee){var r=qi,l=Wi;r=(l&~(1<<32-Ht(l)-1)).toString(32)+r,i="_"+i+"R_"+r,r=nu++,0<r&&(i+="H"+r.toString(32)),i+="_"}else r=LS++,i="_"+i+"r_"+r.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Xf,useFormState:U0,useActionState:U0,useOptimistic:function(e){var i=Xn();i.memoizedState=i.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=r,i=Wf.bind(null,fe,!0,r),r.dispatch=i,[e,i]},useMemoCache:Of,useCacheRefresh:function(){return Xn().memoizedState=FS.bind(null,fe)},useEffectEvent:function(e){var i=Xn(),r={impl:e};return i.memoizedState=r,function(){if((Le&2)!==0)throw Error(a(440));return r.impl.apply(void 0,arguments)}}},qf={readContext:Ln,use:au,useCallback:V0,useContext:Ln,useEffect:Hf,useImperativeHandle:G0,useInsertionEffect:F0,useLayoutEffect:B0,useMemo:k0,useReducer:su,useRef:O0,useState:function(){return su(ma)},useDebugValue:Gf,useDeferredValue:function(e,i){var r=pn();return X0(r,Ve.memoizedState,e,i)},useTransition:function(){var e=su(ma)[0],i=pn().memoizedState;return[typeof e=="boolean"?e:zo(e),i]},useSyncExternalStore:x0,useId:Z0,useHostTransitionStatus:Xf,useFormState:L0,useActionState:L0,useOptimistic:function(e,i){var r=pn();return T0(r,Ve,e,i)},useMemoCache:Of,useCacheRefresh:K0};qf.useEffectEvent=I0;var tg={readContext:Ln,use:au,useCallback:V0,useContext:Ln,useEffect:Hf,useImperativeHandle:G0,useInsertionEffect:F0,useLayoutEffect:B0,useMemo:k0,useReducer:If,useRef:O0,useState:function(){return If(ma)},useDebugValue:Gf,useDeferredValue:function(e,i){var r=pn();return Ve===null?Vf(r,e,i):X0(r,Ve.memoizedState,e,i)},useTransition:function(){var e=If(ma)[0],i=pn().memoizedState;return[typeof e=="boolean"?e:zo(e),i]},useSyncExternalStore:x0,useId:Z0,useHostTransitionStatus:Xf,useFormState:P0,useActionState:P0,useOptimistic:function(e,i){var r=pn();return Ve!==null?T0(r,Ve,e,i):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Of,useCacheRefresh:K0};tg.useEffectEvent=I0;function Yf(e,i,r,l){i=e.memoizedState,r=r(l,i),r=r==null?i:_({},i,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Zf={enqueueSetState:function(e,i,r){e=e._reactInternals;var l=pi(),f=Za(l);f.payload=i,r!=null&&(f.callback=r),i=Ka(e,f,l),i!==null&&(ti(i,e,l),Lo(i,e,l))},enqueueReplaceState:function(e,i,r){e=e._reactInternals;var l=pi(),f=Za(l);f.tag=1,f.payload=i,r!=null&&(f.callback=r),i=Ka(e,f,l),i!==null&&(ti(i,e,l),Lo(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var r=pi(),l=Za(r);l.tag=2,i!=null&&(l.callback=i),i=Ka(e,l,r),i!==null&&(ti(i,e,r),Lo(i,e,r))}};function eg(e,i,r,l,f,d,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,d,M):i.prototype&&i.prototype.isPureReactComponent?!bo(r,l)||!bo(f,d):!0}function ng(e,i,r,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(r,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(r,l),i.state!==e&&Zf.enqueueReplaceState(i,i.state,null)}function Xs(e,i){var r=i;if("ref"in i){r={};for(var l in i)l!=="ref"&&(r[l]=i[l])}if(e=e.defaultProps){r===i&&(r=_({},r));for(var f in e)r[f]===void 0&&(r[f]=e[f])}return r}function ig(e){Hl(e)}function ag(e){console.error(e)}function sg(e){Hl(e)}function uu(e,i){try{var r=e.onUncaughtError;r(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function rg(e,i,r){try{var l=e.onCaughtError;l(r.value,{componentStack:r.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Kf(e,i,r){return r=Za(r),r.tag=3,r.payload={element:null},r.callback=function(){uu(e,i)},r}function og(e){return e=Za(e),e.tag=3,e}function lg(e,i,r,l){var f=r.type.getDerivedStateFromError;if(typeof f=="function"){var d=l.value;e.payload=function(){return f(d)},e.callback=function(){rg(i,r,l)}}var M=r.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){rg(i,r,l),typeof f!="function"&&(es===null?es=new Set([this]):es.add(this));var C=l.stack;this.componentDidCatch(l.value,{componentStack:C!==null?C:""})})}function HS(e,i,r,l,f){if(r.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=r.alternate,i!==null&&mr(i,r,f,!0),r=ci.current,r!==null){switch(r.tag){case 31:case 13:return Ti===null?Su():r.alternate===null&&fn===0&&(fn=3),r.flags&=-257,r.flags|=65536,r.lanes=f,l===Jl?r.flags|=16384:(i=r.updateQueue,i===null?r.updateQueue=new Set([l]):i.add(l),yh(e,l,f)),!1;case 22:return r.flags|=65536,l===Jl?r.flags|=16384:(i=r.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},r.updateQueue=i):(r=i.retryQueue,r===null?i.retryQueue=new Set([l]):r.add(l)),yh(e,l,f)),!1}throw Error(a(435,r.tag))}return yh(e,l,f),Su(),!1}if(Ee)return i=ci.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==pf&&(e=Error(a(422),{cause:l}),Ro(Si(e,r)))):(l!==pf&&(i=Error(a(423),{cause:l}),Ro(Si(i,r))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=Si(l,r),f=Kf(e.stateNode,l,f),Tf(e,f),fn!==4&&(fn=2)),!1;var d=Error(a(520),{cause:l});if(d=Si(d,r),qo===null?qo=[d]:qo.push(d),fn!==4&&(fn=2),i===null)return!0;l=Si(l,r),r=i;do{switch(r.tag){case 3:return r.flags|=65536,e=f&-f,r.lanes|=e,e=Kf(r.stateNode,l,e),Tf(r,e),!1;case 1:if(i=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(es===null||!es.has(d))))return r.flags|=65536,f&=-f,r.lanes|=f,f=og(f),lg(f,e,r,l),Tf(r,f),!1}r=r.return}while(r!==null);return!1}var Jf=Error(a(461)),yn=!1;function Nn(e,i,r,l){i.child=e===null?h0(i,null,r,l):Vs(i,e.child,r,l)}function ug(e,i,r,l,f){r=r.render;var d=i.ref;if("ref"in l){var M={};for(var C in l)C!=="ref"&&(M[C]=l[C])}else M=l;return Fs(i),l=Uf(e,i,r,M,d,f),C=Lf(),e!==null&&!yn?(Nf(e,i,f),ga(e,i,f)):(Ee&&C&&hf(i),i.flags|=1,Nn(e,i,l,f),i.child)}function cg(e,i,r,l,f){if(e===null){var d=r.type;return typeof d=="function"&&!uf(d)&&d.defaultProps===void 0&&r.compare===null?(i.tag=15,i.type=d,fg(e,i,d,l,f)):(e=Xl(r.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!ah(e,f)){var M=d.memoizedProps;if(r=r.compare,r=r!==null?r:bo,r(M,l)&&e.ref===i.ref)return ga(e,i,f)}return i.flags|=1,e=ca(d,l),e.ref=i.ref,e.return=i,i.child=e}function fg(e,i,r,l,f){if(e!==null){var d=e.memoizedProps;if(bo(d,l)&&e.ref===i.ref)if(yn=!1,i.pendingProps=l=d,ah(e,f))(e.flags&131072)!==0&&(yn=!0);else return i.lanes=e.lanes,ga(e,i,f)}return Qf(e,i,r,l,f)}function hg(e,i,r,l){var f=l.children,d=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~d}else l=0,i.child=null;return dg(e,i,d,r,l)}if((r&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Zl(i,d!==null?d.cachePool:null),d!==null?m0(i,d):Rf(),g0(i);else return l=i.lanes=536870912,dg(e,i,d!==null?d.baseLanes|r:r,r,l)}else d!==null?(Zl(i,d.cachePool),m0(i,d),Qa(),i.memoizedState=null):(e!==null&&Zl(i,null),Rf(),Qa());return Nn(e,i,f,r),i.child}function Bo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function dg(e,i,r,l,f){var d=Sf();return d=d===null?null:{parent:vn._currentValue,pool:d},i.memoizedState={baseLanes:r,cachePool:d},e!==null&&Zl(i,null),Rf(),g0(i),e!==null&&mr(e,i,l,!0),i.childLanes=f,null}function cu(e,i){return i=hu({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function pg(e,i,r){return Vs(i,e.child,null,r),e=cu(i,i.pendingProps),e.flags|=2,fi(i),i.memoizedState=null,e}function GS(e,i,r){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ee){if(l.mode==="hidden")return e=cu(i,l),i.lanes=536870912,Bo(null,e);if(wf(i),(e=Ke)?(e=A_(e,bi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:ka!==null?{id:Wi,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},r=Qm(e),r.return=i,i.child=r,Un=i,Ke=null)):e=null,e===null)throw Wa(i);return i.lanes=536870912,null}return cu(i,l)}var d=e.memoizedState;if(d!==null){var M=d.dehydrated;if(wf(i),f)if(i.flags&256)i.flags&=-257,i=pg(e,i,r);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(yn||mr(e,i,r,!1),f=(r&e.childLanes)!==0,yn||f){if(l=Ye,l!==null&&(M=si(l,r),M!==0&&M!==d.retryLane))throw d.retryLane=M,Ps(e,M),ti(l,e,M),Jf;Su(),i=pg(e,i,r)}else e=d.treeContext,Ke=Ai(M.nextSibling),Un=i,Ee=!0,Xa=null,bi=!1,e!==null&&t0(i,e),i=cu(i,l),i.flags|=4096;return i}return e=ca(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function fu(e,i){var r=i.ref;if(r===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(a(284));(e===null||e.ref!==r)&&(i.flags|=4194816)}}function Qf(e,i,r,l,f){return Fs(i),r=Uf(e,i,r,l,void 0,f),l=Lf(),e!==null&&!yn?(Nf(e,i,f),ga(e,i,f)):(Ee&&l&&hf(i),i.flags|=1,Nn(e,i,r,f),i.child)}function mg(e,i,r,l,f,d){return Fs(i),i.updateQueue=null,r=v0(i,l,r,f),_0(e),l=Lf(),e!==null&&!yn?(Nf(e,i,d),ga(e,i,d)):(Ee&&l&&hf(i),i.flags|=1,Nn(e,i,r,d),i.child)}function gg(e,i,r,l,f){if(Fs(i),i.stateNode===null){var d=fr,M=r.contextType;typeof M=="object"&&M!==null&&(d=Ln(M)),d=new r(l,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Zf,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=l,d.state=i.memoizedState,d.refs={},Ef(i),M=r.contextType,d.context=typeof M=="object"&&M!==null?Ln(M):fr,d.state=i.memoizedState,M=r.getDerivedStateFromProps,typeof M=="function"&&(Yf(i,r,M,l),d.state=i.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(M=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),M!==d.state&&Zf.enqueueReplaceState(d,d.state,null),Po(i,l,d,f),No(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){d=i.stateNode;var C=i.memoizedProps,B=Xs(r,C);d.props=B;var at=d.context,vt=r.contextType;M=fr,typeof vt=="object"&&vt!==null&&(M=Ln(vt));var Et=r.getDerivedStateFromProps;vt=typeof Et=="function"||typeof d.getSnapshotBeforeUpdate=="function",C=i.pendingProps!==C,vt||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(C||at!==M)&&ng(i,d,l,M),Ya=!1;var ct=i.memoizedState;d.state=ct,Po(i,l,d,f),No(),at=i.memoizedState,C||ct!==at||Ya?(typeof Et=="function"&&(Yf(i,r,Et,l),at=i.memoizedState),(B=Ya||eg(i,r,B,l,ct,at,M))?(vt||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=at),d.props=l,d.state=at,d.context=M,l=B):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{d=i.stateNode,bf(e,i),M=i.memoizedProps,vt=Xs(r,M),d.props=vt,Et=i.pendingProps,ct=d.context,at=r.contextType,B=fr,typeof at=="object"&&at!==null&&(B=Ln(at)),C=r.getDerivedStateFromProps,(at=typeof C=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(M!==Et||ct!==B)&&ng(i,d,l,B),Ya=!1,ct=i.memoizedState,d.state=ct,Po(i,l,d,f),No();var ft=i.memoizedState;M!==Et||ct!==ft||Ya||e!==null&&e.dependencies!==null&&ql(e.dependencies)?(typeof C=="function"&&(Yf(i,r,C,l),ft=i.memoizedState),(vt=Ya||eg(i,r,vt,l,ct,ft,B)||e!==null&&e.dependencies!==null&&ql(e.dependencies))?(at||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(l,ft,B),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(l,ft,B)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=ft),d.props=l,d.state=ft,d.context=B,l=vt):(typeof d.componentDidUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(i.flags|=1024),l=!1)}return d=l,fu(e,i),l=(i.flags&128)!==0,d||l?(d=i.stateNode,r=l&&typeof r.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&l?(i.child=Vs(i,e.child,null,f),i.child=Vs(i,null,r,f)):Nn(e,i,r,f),i.memoizedState=d.state,e=i.child):e=ga(e,i,f),e}function _g(e,i,r,l){return zs(),i.flags|=256,Nn(e,i,r,l),i.child}var jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $f(e){return{baseLanes:e,cachePool:r0()}}function th(e,i,r){return e=e!==null?e.childLanes&~r:0,i&&(e|=di),e}function vg(e,i,r){var l=i.pendingProps,f=!1,d=(i.flags&128)!==0,M;if((M=d)||(M=e!==null&&e.memoizedState===null?!1:(dn.current&2)!==0),M&&(f=!0,i.flags&=-129),M=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ee){if(f?Ja(i):Qa(),(e=Ke)?(e=A_(e,bi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:ka!==null?{id:Wi,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},r=Qm(e),r.return=i,i.child=r,Un=i,Ke=null)):e=null,e===null)throw Wa(i);return zh(e)?i.lanes=32:i.lanes=536870912,null}var C=l.children;return l=l.fallback,f?(Qa(),f=i.mode,C=hu({mode:"hidden",children:C},f),l=Os(l,f,r,null),C.return=i,l.return=i,C.sibling=l,i.child=C,l=i.child,l.memoizedState=$f(r),l.childLanes=th(e,M,r),i.memoizedState=jf,Bo(null,l)):(Ja(i),eh(i,C))}var B=e.memoizedState;if(B!==null&&(C=B.dehydrated,C!==null)){if(d)i.flags&256?(Ja(i),i.flags&=-257,i=nh(e,i,r)):i.memoizedState!==null?(Qa(),i.child=e.child,i.flags|=128,i=null):(Qa(),C=l.fallback,f=i.mode,l=hu({mode:"visible",children:l.children},f),C=Os(C,f,r,null),C.flags|=2,l.return=i,C.return=i,l.sibling=C,i.child=l,Vs(i,e.child,null,r),l=i.child,l.memoizedState=$f(r),l.childLanes=th(e,M,r),i.memoizedState=jf,i=Bo(null,l));else if(Ja(i),zh(C)){if(M=C.nextSibling&&C.nextSibling.dataset,M)var at=M.dgst;M=at,l=Error(a(419)),l.stack="",l.digest=M,Ro({value:l,source:null,stack:null}),i=nh(e,i,r)}else if(yn||mr(e,i,r,!1),M=(r&e.childLanes)!==0,yn||M){if(M=Ye,M!==null&&(l=si(M,r),l!==0&&l!==B.retryLane))throw B.retryLane=l,Ps(e,l),ti(M,e,l),Jf;Oh(C)||Su(),i=nh(e,i,r)}else Oh(C)?(i.flags|=192,i.child=e.child,i=null):(e=B.treeContext,Ke=Ai(C.nextSibling),Un=i,Ee=!0,Xa=null,bi=!1,e!==null&&t0(i,e),i=eh(i,l.children),i.flags|=4096);return i}return f?(Qa(),C=l.fallback,f=i.mode,B=e.child,at=B.sibling,l=ca(B,{mode:"hidden",children:l.children}),l.subtreeFlags=B.subtreeFlags&65011712,at!==null?C=ca(at,C):(C=Os(C,f,r,null),C.flags|=2),C.return=i,l.return=i,l.sibling=C,i.child=l,Bo(null,l),l=i.child,C=e.child.memoizedState,C===null?C=$f(r):(f=C.cachePool,f!==null?(B=vn._currentValue,f=f.parent!==B?{parent:B,pool:B}:f):f=r0(),C={baseLanes:C.baseLanes|r,cachePool:f}),l.memoizedState=C,l.childLanes=th(e,M,r),i.memoizedState=jf,Bo(e.child,l)):(Ja(i),r=e.child,e=r.sibling,r=ca(r,{mode:"visible",children:l.children}),r.return=i,r.sibling=null,e!==null&&(M=i.deletions,M===null?(i.deletions=[e],i.flags|=16):M.push(e)),i.child=r,i.memoizedState=null,r)}function eh(e,i){return i=hu({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function hu(e,i){return e=ui(22,e,null,i),e.lanes=0,e}function nh(e,i,r){return Vs(i,e.child,null,r),e=eh(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function xg(e,i,r){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),_f(e.return,i,r)}function ih(e,i,r,l,f,d){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:r,tailMode:f,treeForkCount:d}:(M.isBackwards=i,M.rendering=null,M.renderingStartTime=0,M.last=l,M.tail=r,M.tailMode=f,M.treeForkCount=d)}function yg(e,i,r){var l=i.pendingProps,f=l.revealOrder,d=l.tail;l=l.children;var M=dn.current,C=(M&2)!==0;if(C?(M=M&1|2,i.flags|=128):M&=1,bt(dn,M),Nn(e,i,l,r),l=Ee?Ao:0,!C&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xg(e,r,i);else if(e.tag===19)xg(e,r,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(r=i.child,f=null;r!==null;)e=r.alternate,e!==null&&tu(e)===null&&(f=r),r=r.sibling;r=f,r===null?(f=i.child,i.child=null):(f=r.sibling,r.sibling=null),ih(i,!1,f,r,d,l);break;case"backwards":case"unstable_legacy-backwards":for(r=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&tu(e)===null){i.child=f;break}e=f.sibling,f.sibling=r,r=f,f=e}ih(i,!0,r,null,d,l);break;case"together":ih(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function ga(e,i,r){if(e!==null&&(i.dependencies=e.dependencies),ts|=i.lanes,(r&i.childLanes)===0)if(e!==null){if(mr(e,i,r,!1),(r&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,r=ca(e,e.pendingProps),i.child=r,r.return=i;e.sibling!==null;)e=e.sibling,r=r.sibling=ca(e,e.pendingProps),r.return=i;r.sibling=null}return i.child}function ah(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&ql(e)))}function VS(e,i,r){switch(i.tag){case 3:et(i,i.stateNode.containerInfo),qa(i,vn,e.memoizedState.cache),zs();break;case 27:case 5:Yt(i);break;case 4:et(i,i.stateNode.containerInfo);break;case 10:qa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,wf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Ja(i),i.flags|=128,null):(r&i.child.childLanes)!==0?vg(e,i,r):(Ja(i),e=ga(e,i,r),e!==null?e.sibling:null);Ja(i);break;case 19:var f=(e.flags&128)!==0;if(l=(r&i.childLanes)!==0,l||(mr(e,i,r,!1),l=(r&i.childLanes)!==0),f){if(l)return yg(e,i,r);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),bt(dn,dn.current),l)break;return null;case 22:return i.lanes=0,hg(e,i,r,i.pendingProps);case 24:qa(i,vn,e.memoizedState.cache)}return ga(e,i,r)}function Sg(e,i,r){if(e!==null)if(e.memoizedProps!==i.pendingProps)yn=!0;else{if(!ah(e,r)&&(i.flags&128)===0)return yn=!1,VS(e,i,r);yn=(e.flags&131072)!==0}else yn=!1,Ee&&(i.flags&1048576)!==0&&$m(i,Ao,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Hs(i.elementType),i.type=e,typeof e=="function")uf(e)?(l=Xs(e,l),i.tag=1,i=gg(null,i,e,l,r)):(i.tag=0,i=Qf(null,i,e,l,r));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=ug(null,i,e,l,r);break t}else if(f===I){i.tag=14,i=cg(null,i,e,l,r);break t}}throw i=pt(e)||e,Error(a(306,i,""))}}return i;case 0:return Qf(e,i,i.type,i.pendingProps,r);case 1:return l=i.type,f=Xs(l,i.pendingProps),gg(e,i,l,f,r);case 3:t:{if(et(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var d=i.memoizedState;f=d.element,bf(e,i),Po(i,l,null,r);var M=i.memoizedState;if(l=M.cache,qa(i,vn,l),l!==d.cache&&vf(i,[vn],r,!0),No(),l=M.element,d.isDehydrated)if(d={element:l,isDehydrated:!1,cache:M.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=_g(e,i,l,r);break t}else if(l!==f){f=Si(Error(a(424)),i),Ro(f),i=_g(e,i,l,r);break t}else for(e=i.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Ke=Ai(e.firstChild),Un=i,Ee=!0,Xa=null,bi=!0,r=h0(i,null,l,r),i.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(zs(),l===f){i=ga(e,i,r);break t}Nn(e,i,l,r)}i=i.child}return i;case 26:return fu(e,i),e===null?(r=L_(i.type,null,i.pendingProps,null))?i.memoizedState=r:Ee||(r=i.type,e=i.pendingProps,l=Cu(V.current).createElement(r),l[gn]=i,l[Dn]=e,Pn(l,r,e),_n(l),i.stateNode=l):i.memoizedState=L_(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return Yt(i),e===null&&Ee&&(l=i.stateNode=w_(i.type,i.pendingProps,V.current),Un=i,bi=!0,f=Ke,ss(i.type)?(Ih=f,Ke=Ai(l.firstChild)):Ke=f),Nn(e,i,i.pendingProps.children,r),fu(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ee&&((f=l=Ke)&&(l=vM(l,i.type,i.pendingProps,bi),l!==null?(i.stateNode=l,Un=i,Ke=Ai(l.firstChild),bi=!1,f=!0):f=!1),f||Wa(i)),Yt(i),f=i.type,d=i.pendingProps,M=e!==null?e.memoizedProps:null,l=d.children,Lh(f,d)?l=null:M!==null&&Lh(f,M)&&(i.flags|=32),i.memoizedState!==null&&(f=Uf(e,i,NS,null,null,r),tl._currentValue=f),fu(e,i),Nn(e,i,l,r),i.child;case 6:return e===null&&Ee&&((e=r=Ke)&&(r=xM(r,i.pendingProps,bi),r!==null?(i.stateNode=r,Un=i,Ke=null,e=!0):e=!1),e||Wa(i)),null;case 13:return vg(e,i,r);case 4:return et(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Vs(i,null,l,r):Nn(e,i,l,r),i.child;case 11:return ug(e,i,i.type,i.pendingProps,r);case 7:return Nn(e,i,i.pendingProps,r),i.child;case 8:return Nn(e,i,i.pendingProps.children,r),i.child;case 12:return Nn(e,i,i.pendingProps.children,r),i.child;case 10:return l=i.pendingProps,qa(i,i.type,l.value),Nn(e,i,l.children,r),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,Fs(i),f=Ln(f),l=l(f),i.flags|=1,Nn(e,i,l,r),i.child;case 14:return cg(e,i,i.type,i.pendingProps,r);case 15:return fg(e,i,i.type,i.pendingProps,r);case 19:return yg(e,i,r);case 31:return GS(e,i,r);case 22:return hg(e,i,r,i.pendingProps);case 24:return Fs(i),l=Ln(vn),e===null?(f=Sf(),f===null&&(f=Ye,d=xf(),f.pooledCache=d,d.refCount++,d!==null&&(f.pooledCacheLanes|=r),f=d),i.memoizedState={parent:l,cache:f},Ef(i),qa(i,vn,f)):((e.lanes&r)!==0&&(bf(e,i),Po(i,null,null,r),No()),f=e.memoizedState,d=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),qa(i,vn,l)):(l=d.cache,qa(i,vn,l),l!==f.cache&&vf(i,[vn],r,!0))),Nn(e,i,i.pendingProps.children,r),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function _a(e){e.flags|=4}function sh(e,i,r,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(Zg())e.flags|=8192;else throw Gs=Jl,Mf}else e.flags&=-16777217}function Mg(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!I_(i))if(Zg())e.flags|=8192;else throw Gs=Jl,Mf}function du(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Tt():536870912,e.lanes|=i,Rr|=i)}function Ho(e,i){if(!Ee)switch(e.tailMode){case"hidden":i=e.tail;for(var r=null;i!==null;)i.alternate!==null&&(r=i),i=i.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var l=null;r!==null;)r.alternate!==null&&(l=r),r=r.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Je(e){var i=e.alternate!==null&&e.alternate.child===e.child,r=0,l=0;if(i)for(var f=e.child;f!==null;)r|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)r|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=r,i}function kS(e,i,r){var l=i.pendingProps;switch(df(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Je(i),null;case 1:return Je(i),null;case 3:return r=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),da(vn),Rt(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(pr(i)?_a(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,mf())),Je(i),null;case 26:var f=i.type,d=i.memoizedState;return e===null?(_a(i),d!==null?(Je(i),Mg(i,d)):(Je(i),sh(i,f,null,l,r))):d?d!==e.memoizedState?(_a(i),Je(i),Mg(i,d)):(Je(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&_a(i),Je(i),sh(i,f,e,l,r)),null;case 27:if(Zt(i),r=V.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&_a(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Je(i),null}e=ot.current,pr(i)?e0(i):(e=w_(f,l,r),i.stateNode=e,_a(i))}return Je(i),null;case 5:if(Zt(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&_a(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return Je(i),null}if(d=ot.current,pr(i))e0(i);else{var M=Cu(V.current);switch(d){case 1:d=M.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:d=M.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":d=M.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":d=M.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":d=M.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof l.is=="string"?M.createElement("select",{is:l.is}):M.createElement("select"),l.multiple?d.multiple=!0:l.size&&(d.size=l.size);break;default:d=typeof l.is=="string"?M.createElement(f,{is:l.is}):M.createElement(f)}}d[gn]=i,d[Dn]=l;t:for(M=i.child;M!==null;){if(M.tag===5||M.tag===6)d.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===i)break t;for(;M.sibling===null;){if(M.return===null||M.return===i)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}i.stateNode=d;t:switch(Pn(d,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&_a(i)}}return Je(i),sh(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,r),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&_a(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=V.current,pr(i)){if(e=i.stateNode,r=i.memoizedProps,l=null,f=Un,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[gn]=i,e=!!(e.nodeValue===r||l!==null&&l.suppressHydrationWarning===!0||v_(e.nodeValue,r)),e||Wa(i,!0)}else e=Cu(e).createTextNode(l),e[gn]=i,i.stateNode=e}return Je(i),null;case 31:if(r=i.memoizedState,e===null||e.memoizedState!==null){if(l=pr(i),r!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[gn]=i}else zs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Je(i),e=!1}else r=mf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return i.flags&256?(fi(i),i):(fi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Je(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=pr(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[gn]=i}else zs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Je(i),f=!1}else f=mf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(fi(i),i):(fi(i),null)}return fi(i),(i.flags&128)!==0?(i.lanes=r,i):(r=l!==null,e=e!==null&&e.memoizedState!==null,r&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),d=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(d=l.memoizedState.cachePool.pool),d!==f&&(l.flags|=2048)),r!==e&&r&&(i.child.flags|=8192),du(i,i.updateQueue),Je(i),null);case 4:return Rt(),e===null&&Rh(i.stateNode.containerInfo),Je(i),null;case 10:return da(i.type),Je(i),null;case 19:if(j(dn),l=i.memoizedState,l===null)return Je(i),null;if(f=(i.flags&128)!==0,d=l.rendering,d===null)if(f)Ho(l,!1);else{if(fn!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=tu(e),d!==null){for(i.flags|=128,Ho(l,!1),e=d.updateQueue,i.updateQueue=e,du(i,e),i.subtreeFlags=0,e=r,r=i.child;r!==null;)Jm(r,e),r=r.sibling;return bt(dn,dn.current&1|2),Ee&&fa(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&Ge()>vu&&(i.flags|=128,f=!0,Ho(l,!1),i.lanes=4194304)}else{if(!f)if(e=tu(d),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,du(i,e),Ho(l,!0),l.tail===null&&l.tailMode==="hidden"&&!d.alternate&&!Ee)return Je(i),null}else 2*Ge()-l.renderingStartTime>vu&&r!==536870912&&(i.flags|=128,f=!0,Ho(l,!1),i.lanes=4194304);l.isBackwards?(d.sibling=i.child,i.child=d):(e=l.last,e!==null?e.sibling=d:i.child=d,l.last=d)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=Ge(),e.sibling=null,r=dn.current,bt(dn,f?r&1|2:r&1),Ee&&fa(i,l.treeForkCount),e):(Je(i),null);case 22:case 23:return fi(i),Cf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(r&536870912)!==0&&(i.flags&128)===0&&(Je(i),i.subtreeFlags&6&&(i.flags|=8192)):Je(i),r=i.updateQueue,r!==null&&du(i,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==r&&(i.flags|=2048),e!==null&&j(Bs),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),i.memoizedState.cache!==r&&(i.flags|=2048),da(vn),Je(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function XS(e,i){switch(df(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return da(vn),Rt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Zt(i),null;case 31:if(i.memoizedState!==null){if(fi(i),i.alternate===null)throw Error(a(340));zs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(fi(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));zs()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return j(dn),null;case 4:return Rt(),null;case 10:return da(i.type),null;case 22:case 23:return fi(i),Cf(),e!==null&&j(Bs),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return da(vn),null;case 25:return null;default:return null}}function Eg(e,i){switch(df(i),i.tag){case 3:da(vn),Rt();break;case 26:case 27:case 5:Zt(i);break;case 4:Rt();break;case 31:i.memoizedState!==null&&fi(i);break;case 13:fi(i);break;case 19:j(dn);break;case 10:da(i.type);break;case 22:case 23:fi(i),Cf(),e!==null&&j(Bs);break;case 24:da(vn)}}function Go(e,i){try{var r=i.updateQueue,l=r!==null?r.lastEffect:null;if(l!==null){var f=l.next;r=f;do{if((r.tag&e)===e){l=void 0;var d=r.create,M=r.inst;l=d(),M.destroy=l}r=r.next}while(r!==f)}}catch(C){Be(i,i.return,C)}}function ja(e,i,r){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var d=f.next;l=d;do{if((l.tag&e)===e){var M=l.inst,C=M.destroy;if(C!==void 0){M.destroy=void 0,f=i;var B=r,at=C;try{at()}catch(vt){Be(f,B,vt)}}}l=l.next}while(l!==d)}}catch(vt){Be(i,i.return,vt)}}function bg(e){var i=e.updateQueue;if(i!==null){var r=e.stateNode;try{p0(i,r)}catch(l){Be(e,e.return,l)}}}function Tg(e,i,r){r.props=Xs(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(l){Be(e,i,l)}}function Vo(e,i){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof r=="function"?e.refCleanup=r(l):r.current=l}}catch(f){Be(e,i,f)}}function Yi(e,i){var r=e.ref,l=e.refCleanup;if(r!==null)if(typeof l=="function")try{l()}catch(f){Be(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(f){Be(e,i,f)}else r.current=null}function Ag(e){var i=e.type,r=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":r.autoFocus&&l.focus();break t;case"img":r.src?l.src=r.src:r.srcSet&&(l.srcset=r.srcSet)}}catch(f){Be(e,e.return,f)}}function rh(e,i,r){try{var l=e.stateNode;hM(l,e.type,r,i),l[Dn]=i}catch(f){Be(e,e.return,f)}}function Rg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ss(e.type)||e.tag===4}function oh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Rg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ss(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function lh(e,i,r){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,i):(i=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,i.appendChild(e),r=r._reactRootContainer,r!=null||i.onclick!==null||(i.onclick=la));else if(l!==4&&(l===27&&ss(e.type)&&(r=e.stateNode,i=null),e=e.child,e!==null))for(lh(e,i,r),e=e.sibling;e!==null;)lh(e,i,r),e=e.sibling}function pu(e,i,r){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?r.insertBefore(e,i):r.appendChild(e);else if(l!==4&&(l===27&&ss(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(pu(e,i,r),e=e.sibling;e!==null;)pu(e,i,r),e=e.sibling}function Cg(e){var i=e.stateNode,r=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Pn(i,l,r),i[gn]=e,i[Dn]=r}catch(d){Be(e,e.return,d)}}var va=!1,Sn=!1,uh=!1,wg=typeof WeakSet=="function"?WeakSet:Set,Cn=null;function WS(e,i){if(e=e.containerInfo,Dh=Ou,e=Gm(e),ef(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else t:{r=(r=e.ownerDocument)&&r.defaultView||window;var l=r.getSelection&&r.getSelection();if(l&&l.rangeCount!==0){r=l.anchorNode;var f=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break t}var M=0,C=-1,B=-1,at=0,vt=0,Et=e,ct=null;e:for(;;){for(var ft;Et!==r||f!==0&&Et.nodeType!==3||(C=M+f),Et!==d||l!==0&&Et.nodeType!==3||(B=M+l),Et.nodeType===3&&(M+=Et.nodeValue.length),(ft=Et.firstChild)!==null;)ct=Et,Et=ft;for(;;){if(Et===e)break e;if(ct===r&&++at===f&&(C=M),ct===d&&++vt===l&&(B=M),(ft=Et.nextSibling)!==null)break;Et=ct,ct=Et.parentNode}Et=ft}r=C===-1||B===-1?null:{start:C,end:B}}else r=null}r=r||{start:0,end:0}}else r=null;for(Uh={focusedElem:e,selectionRange:r},Ou=!1,Cn=i;Cn!==null;)if(i=Cn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Cn=e;else for(;Cn!==null;){switch(i=Cn,d=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)f=e[r],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=i,f=d.memoizedProps,d=d.memoizedState,l=r.stateNode;try{var qt=Xs(r.type,f);e=l.getSnapshotBeforeUpdate(qt,d),l.__reactInternalSnapshotBeforeUpdate=e}catch(ie){Be(r,r.return,ie)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,r=e.nodeType,r===9)Ph(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ph(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Cn=e;break}Cn=i.return}}function Dg(e,i,r){var l=r.flags;switch(r.tag){case 0:case 11:case 15:ya(e,r),l&4&&Go(5,r);break;case 1:if(ya(e,r),l&4)if(e=r.stateNode,i===null)try{e.componentDidMount()}catch(M){Be(r,r.return,M)}else{var f=Xs(r.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(M){Be(r,r.return,M)}}l&64&&bg(r),l&512&&Vo(r,r.return);break;case 3:if(ya(e,r),l&64&&(e=r.updateQueue,e!==null)){if(i=null,r.child!==null)switch(r.child.tag){case 27:case 5:i=r.child.stateNode;break;case 1:i=r.child.stateNode}try{p0(e,i)}catch(M){Be(r,r.return,M)}}break;case 27:i===null&&l&4&&Cg(r);case 26:case 5:ya(e,r),i===null&&l&4&&Ag(r),l&512&&Vo(r,r.return);break;case 12:ya(e,r);break;case 31:ya(e,r),l&4&&Ng(e,r);break;case 13:ya(e,r),l&4&&Pg(e,r),l&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=tM.bind(null,r),yM(e,r))));break;case 22:if(l=r.memoizedState!==null||va,!l){i=i!==null&&i.memoizedState!==null||Sn,f=va;var d=Sn;va=l,(Sn=i)&&!d?Sa(e,r,(r.subtreeFlags&8772)!==0):ya(e,r),va=f,Sn=d}break;case 30:break;default:ya(e,r)}}function Ug(e){var i=e.alternate;i!==null&&(e.alternate=null,Ug(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&Ba(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var en=null,Jn=!1;function xa(e,i,r){for(r=r.child;r!==null;)Lg(e,i,r),r=r.sibling}function Lg(e,i,r){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(dt,r)}catch{}switch(r.tag){case 26:Sn||Yi(r,i),xa(e,i,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:Sn||Yi(r,i);var l=en,f=Jn;ss(r.type)&&(en=r.stateNode,Jn=!1),xa(e,i,r),Qo(r.stateNode),en=l,Jn=f;break;case 5:Sn||Yi(r,i);case 6:if(l=en,f=Jn,en=null,xa(e,i,r),en=l,Jn=f,en!==null)if(Jn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(r.stateNode)}catch(d){Be(r,i,d)}else try{en.removeChild(r.stateNode)}catch(d){Be(r,i,d)}break;case 18:en!==null&&(Jn?(e=en,b_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Or(e)):b_(en,r.stateNode));break;case 4:l=en,f=Jn,en=r.stateNode.containerInfo,Jn=!0,xa(e,i,r),en=l,Jn=f;break;case 0:case 11:case 14:case 15:ja(2,r,i),Sn||ja(4,r,i),xa(e,i,r);break;case 1:Sn||(Yi(r,i),l=r.stateNode,typeof l.componentWillUnmount=="function"&&Tg(r,i,l)),xa(e,i,r);break;case 21:xa(e,i,r);break;case 22:Sn=(l=Sn)||r.memoizedState!==null,xa(e,i,r),Sn=l;break;default:xa(e,i,r)}}function Ng(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Or(e)}catch(r){Be(i,i.return,r)}}}function Pg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Or(e)}catch(r){Be(i,i.return,r)}}function qS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new wg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new wg),i;default:throw Error(a(435,e.tag))}}function mu(e,i){var r=qS(e);i.forEach(function(l){if(!r.has(l)){r.add(l);var f=eM.bind(null,e,l);l.then(f,f)}})}function Qn(e,i){var r=i.deletions;if(r!==null)for(var l=0;l<r.length;l++){var f=r[l],d=e,M=i,C=M;t:for(;C!==null;){switch(C.tag){case 27:if(ss(C.type)){en=C.stateNode,Jn=!1;break t}break;case 5:en=C.stateNode,Jn=!1;break t;case 3:case 4:en=C.stateNode.containerInfo,Jn=!0;break t}C=C.return}if(en===null)throw Error(a(160));Lg(d,M,f),en=null,Jn=!1,d=f.alternate,d!==null&&(d.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Og(i,e),i=i.sibling}var Pi=null;function Og(e,i){var r=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Qn(i,e),jn(e),l&4&&(ja(3,e,e.return),Go(3,e),ja(5,e,e.return));break;case 1:Qn(i,e),jn(e),l&512&&(Sn||r===null||Yi(r,r.return)),l&64&&va&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?l:r.concat(l))));break;case 26:var f=Pi;if(Qn(i,e),jn(e),l&512&&(Sn||r===null||Yi(r,r.return)),l&4){var d=r!==null?r.memoizedState:null;if(l=e.memoizedState,r===null)if(l===null)if(e.stateNode===null){t:{l=e.type,r=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":d=f.getElementsByTagName("title")[0],(!d||d[Fa]||d[gn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=f.createElement(l),f.head.insertBefore(d,f.querySelector("head > title"))),Pn(d,l,r),d[gn]=e,_n(d),l=d;break t;case"link":var M=O_("link","href",f).get(l+(r.href||""));if(M){for(var C=0;C<M.length;C++)if(d=M[C],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){M.splice(C,1);break e}}d=f.createElement(l),Pn(d,l,r),f.head.appendChild(d);break;case"meta":if(M=O_("meta","content",f).get(l+(r.content||""))){for(C=0;C<M.length;C++)if(d=M[C],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){M.splice(C,1);break e}}d=f.createElement(l),Pn(d,l,r),f.head.appendChild(d);break;default:throw Error(a(468,l))}d[gn]=e,_n(d),l=d}e.stateNode=l}else z_(f,e.type,e.stateNode);else e.stateNode=P_(f,l,e.memoizedProps);else d!==l?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,l===null?z_(f,e.type,e.stateNode):P_(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&rh(e,e.memoizedProps,r.memoizedProps)}break;case 27:Qn(i,e),jn(e),l&512&&(Sn||r===null||Yi(r,r.return)),r!==null&&l&4&&rh(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Qn(i,e),jn(e),l&512&&(Sn||r===null||Yi(r,r.return)),e.flags&32){f=e.stateNode;try{oi(f,"")}catch(qt){Be(e,e.return,qt)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,rh(e,f,r!==null?r.memoizedProps:f)),l&1024&&(uh=!0);break;case 6:if(Qn(i,e),jn(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,r=e.stateNode;try{r.nodeValue=l}catch(qt){Be(e,e.return,qt)}}break;case 3:if(Uu=null,f=Pi,Pi=wu(i.containerInfo),Qn(i,e),Pi=f,jn(e),l&4&&r!==null&&r.memoizedState.isDehydrated)try{Or(i.containerInfo)}catch(qt){Be(e,e.return,qt)}uh&&(uh=!1,zg(e));break;case 4:l=Pi,Pi=wu(e.stateNode.containerInfo),Qn(i,e),jn(e),Pi=l;break;case 12:Qn(i,e),jn(e);break;case 31:Qn(i,e),jn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,mu(e,l)));break;case 13:Qn(i,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(_u=Ge()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,mu(e,l)));break;case 22:f=e.memoizedState!==null;var B=r!==null&&r.memoizedState!==null,at=va,vt=Sn;if(va=at||f,Sn=vt||B,Qn(i,e),Sn=vt,va=at,jn(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(r===null||B||va||Sn||Ws(e)),r=null,i=e;;){if(i.tag===5||i.tag===26){if(r===null){B=r=i;try{if(d=B.stateNode,f)M=d.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{C=B.stateNode;var Et=B.memoizedProps.style,ct=Et!=null&&Et.hasOwnProperty("display")?Et.display:null;C.style.display=ct==null||typeof ct=="boolean"?"":(""+ct).trim()}}catch(qt){Be(B,B.return,qt)}}}else if(i.tag===6){if(r===null){B=i;try{B.stateNode.nodeValue=f?"":B.memoizedProps}catch(qt){Be(B,B.return,qt)}}}else if(i.tag===18){if(r===null){B=i;try{var ft=B.stateNode;f?T_(ft,!0):T_(B.stateNode,!1)}catch(qt){Be(B,B.return,qt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;r===i&&(r=null),i=i.return}r===i&&(r=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(r=l.retryQueue,r!==null&&(l.retryQueue=null,mu(e,r))));break;case 19:Qn(i,e),jn(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,mu(e,l)));break;case 30:break;case 21:break;default:Qn(i,e),jn(e)}}function jn(e){var i=e.flags;if(i&2){try{for(var r,l=e.return;l!==null;){if(Rg(l)){r=l;break}l=l.return}if(r==null)throw Error(a(160));switch(r.tag){case 27:var f=r.stateNode,d=oh(e);pu(e,d,f);break;case 5:var M=r.stateNode;r.flags&32&&(oi(M,""),r.flags&=-33);var C=oh(e);pu(e,C,M);break;case 3:case 4:var B=r.stateNode.containerInfo,at=oh(e);lh(e,at,B);break;default:throw Error(a(161))}}catch(vt){Be(e,e.return,vt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function zg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;zg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ya(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)Dg(e,i.alternate,i),i=i.sibling}function Ws(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:ja(4,i,i.return),Ws(i);break;case 1:Yi(i,i.return);var r=i.stateNode;typeof r.componentWillUnmount=="function"&&Tg(i,i.return,r),Ws(i);break;case 27:Qo(i.stateNode);case 26:case 5:Yi(i,i.return),Ws(i);break;case 22:i.memoizedState===null&&Ws(i);break;case 30:Ws(i);break;default:Ws(i)}e=e.sibling}}function Sa(e,i,r){for(r=r&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,d=i,M=d.flags;switch(d.tag){case 0:case 11:case 15:Sa(f,d,r),Go(4,d);break;case 1:if(Sa(f,d,r),l=d,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(at){Be(l,l.return,at)}if(l=d,f=l.updateQueue,f!==null){var C=l.stateNode;try{var B=f.shared.hiddenCallbacks;if(B!==null)for(f.shared.hiddenCallbacks=null,f=0;f<B.length;f++)d0(B[f],C)}catch(at){Be(l,l.return,at)}}r&&M&64&&bg(d),Vo(d,d.return);break;case 27:Cg(d);case 26:case 5:Sa(f,d,r),r&&l===null&&M&4&&Ag(d),Vo(d,d.return);break;case 12:Sa(f,d,r);break;case 31:Sa(f,d,r),r&&M&4&&Ng(f,d);break;case 13:Sa(f,d,r),r&&M&4&&Pg(f,d);break;case 22:d.memoizedState===null&&Sa(f,d,r),Vo(d,d.return);break;case 30:break;default:Sa(f,d,r)}i=i.sibling}}function ch(e,i){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&Co(r))}function fh(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&Co(e))}function Oi(e,i,r,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)Ig(e,i,r,l),i=i.sibling}function Ig(e,i,r,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Oi(e,i,r,l),f&2048&&Go(9,i);break;case 1:Oi(e,i,r,l);break;case 3:Oi(e,i,r,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&Co(e)));break;case 12:if(f&2048){Oi(e,i,r,l),e=i.stateNode;try{var d=i.memoizedProps,M=d.id,C=d.onPostCommit;typeof C=="function"&&C(M,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){Be(i,i.return,B)}}else Oi(e,i,r,l);break;case 31:Oi(e,i,r,l);break;case 13:Oi(e,i,r,l);break;case 23:break;case 22:d=i.stateNode,M=i.alternate,i.memoizedState!==null?d._visibility&2?Oi(e,i,r,l):ko(e,i):d._visibility&2?Oi(e,i,r,l):(d._visibility|=2,br(e,i,r,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&ch(M,i);break;case 24:Oi(e,i,r,l),f&2048&&fh(i.alternate,i);break;default:Oi(e,i,r,l)}}function br(e,i,r,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=e,M=i,C=r,B=l,at=M.flags;switch(M.tag){case 0:case 11:case 15:br(d,M,C,B,f),Go(8,M);break;case 23:break;case 22:var vt=M.stateNode;M.memoizedState!==null?vt._visibility&2?br(d,M,C,B,f):ko(d,M):(vt._visibility|=2,br(d,M,C,B,f)),f&&at&2048&&ch(M.alternate,M);break;case 24:br(d,M,C,B,f),f&&at&2048&&fh(M.alternate,M);break;default:br(d,M,C,B,f)}i=i.sibling}}function ko(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var r=e,l=i,f=l.flags;switch(l.tag){case 22:ko(r,l),f&2048&&ch(l.alternate,l);break;case 24:ko(r,l),f&2048&&fh(l.alternate,l);break;default:ko(r,l)}i=i.sibling}}var Xo=8192;function Tr(e,i,r){if(e.subtreeFlags&Xo)for(e=e.child;e!==null;)Fg(e,i,r),e=e.sibling}function Fg(e,i,r){switch(e.tag){case 26:Tr(e,i,r),e.flags&Xo&&e.memoizedState!==null&&LM(r,Pi,e.memoizedState,e.memoizedProps);break;case 5:Tr(e,i,r);break;case 3:case 4:var l=Pi;Pi=wu(e.stateNode.containerInfo),Tr(e,i,r),Pi=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Xo,Xo=16777216,Tr(e,i,r),Xo=l):Tr(e,i,r));break;default:Tr(e,i,r)}}function Bg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Wo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var r=0;r<i.length;r++){var l=i[r];Cn=l,Gg(l,e)}Bg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Hg(e),e=e.sibling}function Hg(e){switch(e.tag){case 0:case 11:case 15:Wo(e),e.flags&2048&&ja(9,e,e.return);break;case 3:Wo(e);break;case 12:Wo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,gu(e)):Wo(e);break;default:Wo(e)}}function gu(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var r=0;r<i.length;r++){var l=i[r];Cn=l,Gg(l,e)}Bg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:ja(8,i,i.return),gu(i);break;case 22:r=i.stateNode,r._visibility&2&&(r._visibility&=-3,gu(i));break;default:gu(i)}e=e.sibling}}function Gg(e,i){for(;Cn!==null;){var r=Cn;switch(r.tag){case 0:case 11:case 15:ja(8,r,i);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var l=r.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:Co(r.memoizedState.cache)}if(l=r.child,l!==null)l.return=r,Cn=l;else t:for(r=e;Cn!==null;){l=Cn;var f=l.sibling,d=l.return;if(Ug(l),l===r){Cn=null;break t}if(f!==null){f.return=d,Cn=f;break t}Cn=d}}}var YS={getCacheForType:function(e){var i=Ln(vn),r=i.data.get(e);return r===void 0&&(r=e(),i.data.set(e,r)),r},cacheSignal:function(){return Ln(vn).controller.signal}},ZS=typeof WeakMap=="function"?WeakMap:Map,Le=0,Ye=null,ve=null,ye=0,Fe=0,hi=null,$a=!1,Ar=!1,hh=!1,Ma=0,fn=0,ts=0,qs=0,dh=0,di=0,Rr=0,qo=null,$n=null,ph=!1,_u=0,Vg=0,vu=1/0,xu=null,es=null,bn=0,ns=null,Cr=null,Ea=0,mh=0,gh=null,kg=null,Yo=0,_h=null;function pi(){return(Le&2)!==0&&ye!==0?ye&-ye:F.T!==null?Eh():go()}function Xg(){if(di===0)if((ye&536870912)===0||Ee){var e=oe;oe<<=1,(oe&3932160)===0&&(oe=262144),di=e}else di=536870912;return e=ci.current,e!==null&&(e.flags|=32),di}function ti(e,i,r){(e===Ye&&(Fe===2||Fe===9)||e.cancelPendingCommit!==null)&&(wr(e,0),is(e,ye,di,!1)),kt(e,r),((Le&2)===0||e!==Ye)&&(e===Ye&&((Le&2)===0&&(qs|=r),fn===4&&is(e,ye,di,!1)),Zi(e))}function Wg(e,i,r){if((Le&6)!==0)throw Error(a(327));var l=!r&&(i&127)===0&&(i&e.expiredLanes)===0||Ut(e,i),f=l?QS(e,i):xh(e,i,!0),d=l;do{if(f===0){Ar&&!l&&is(e,i,0,!1);break}else{if(r=e.current.alternate,d&&!KS(r)){f=xh(e,i,!1),d=!1;continue}if(f===2){if(d=i,e.errorRecoveryDisabledLanes&d)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){i=M;t:{var C=e;f=qo;var B=C.current.memoizedState.isDehydrated;if(B&&(wr(C,M).flags|=256),M=xh(C,M,!1),M!==2){if(hh&&!B){C.errorRecoveryDisabledLanes|=d,qs|=d,f=4;break t}d=$n,$n=f,d!==null&&($n===null?$n=d:$n.push.apply($n,d))}f=M}if(d=!1,f!==2)continue}}if(f===1){wr(e,0),is(e,i,0,!0);break}t:{switch(l=e,d=f,d){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:is(l,i,di,!$a);break t;case 2:$n=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=_u+300-Ge(),10<f)){if(is(l,i,di,!$a),yt(l,0,!0)!==0)break t;Ea=i,l.timeoutHandle=M_(qg.bind(null,l,r,$n,xu,ph,i,di,qs,Rr,$a,d,"Throttled",-0,0),f);break t}qg(l,r,$n,xu,ph,i,di,qs,Rr,$a,d,null,-0,0)}}break}while(!0);Zi(e)}function qg(e,i,r,l,f,d,M,C,B,at,vt,Et,ct,ft){if(e.timeoutHandle=-1,Et=i.subtreeFlags,Et&8192||(Et&16785408)===16785408){Et={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:la},Fg(i,d,Et);var qt=(d&62914560)===d?_u-Ge():(d&4194048)===d?Vg-Ge():0;if(qt=NM(Et,qt),qt!==null){Ea=d,e.cancelPendingCommit=qt(t_.bind(null,e,i,d,r,l,f,M,C,B,vt,Et,null,ct,ft)),is(e,d,M,!at);return}}t_(e,i,d,r,l,f,M,C,B)}function KS(e){for(var i=e;;){var r=i.tag;if((r===0||r===11||r===15)&&i.flags&16384&&(r=i.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var l=0;l<r.length;l++){var f=r[l],d=f.getSnapshot;f=f.value;try{if(!li(d(),f))return!1}catch{return!1}}if(r=i.child,i.subtreeFlags&16384&&r!==null)r.return=i,i=r;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function is(e,i,r,l){i&=~dh,i&=~qs,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var d=31-Ht(f),M=1<<d;l[d]=-1,f&=~M}r!==0&&Pe(e,r,i)}function yu(){return(Le&6)===0?(Zo(0),!1):!0}function vh(){if(ve!==null){if(Fe===0)var e=ve.return;else e=ve,ha=Is=null,Pf(e),xr=null,Do=0,e=ve;for(;e!==null;)Eg(e.alternate,e),e=e.return;ve=null}}function wr(e,i){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,mM(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Ea=0,vh(),Ye=e,ve=r=ca(e.current,null),ye=i,Fe=0,hi=null,$a=!1,Ar=Ut(e,i),hh=!1,Rr=di=dh=qs=ts=fn=0,$n=qo=null,ph=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-Ht(l),d=1<<f;i|=e[f],l&=~d}return Ma=i,Gl(),r}function Yg(e,i){fe=null,F.H=Fo,i===vr||i===Kl?(i=u0(),Fe=3):i===Mf?(i=u0(),Fe=4):Fe=i===Jf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,hi=i,ve===null&&(fn=1,uu(e,Si(i,e.current)))}function Zg(){var e=ci.current;return e===null?!0:(ye&4194048)===ye?Ti===null:(ye&62914560)===ye||(ye&536870912)!==0?e===Ti:!1}function Kg(){var e=F.H;return F.H=Fo,e===null?Fo:e}function Jg(){var e=F.A;return F.A=YS,e}function Su(){fn=4,$a||(ye&4194048)!==ye&&ci.current!==null||(Ar=!0),(ts&134217727)===0&&(qs&134217727)===0||Ye===null||is(Ye,ye,di,!1)}function xh(e,i,r){var l=Le;Le|=2;var f=Kg(),d=Jg();(Ye!==e||ye!==i)&&(xu=null,wr(e,i)),i=!1;var M=fn;t:do try{if(Fe!==0&&ve!==null){var C=ve,B=hi;switch(Fe){case 8:vh(),M=6;break t;case 3:case 2:case 9:case 6:ci.current===null&&(i=!0);var at=Fe;if(Fe=0,hi=null,Dr(e,C,B,at),r&&Ar){M=0;break t}break;default:at=Fe,Fe=0,hi=null,Dr(e,C,B,at)}}JS(),M=fn;break}catch(vt){Yg(e,vt)}while(!0);return i&&e.shellSuspendCounter++,ha=Is=null,Le=l,F.H=f,F.A=d,ve===null&&(Ye=null,ye=0,Gl()),M}function JS(){for(;ve!==null;)Qg(ve)}function QS(e,i){var r=Le;Le|=2;var l=Kg(),f=Jg();Ye!==e||ye!==i?(xu=null,vu=Ge()+500,wr(e,i)):Ar=Ut(e,i);t:do try{if(Fe!==0&&ve!==null){i=ve;var d=hi;e:switch(Fe){case 1:Fe=0,hi=null,Dr(e,i,d,1);break;case 2:case 9:if(o0(d)){Fe=0,hi=null,jg(i);break}i=function(){Fe!==2&&Fe!==9||Ye!==e||(Fe=7),Zi(e)},d.then(i,i);break t;case 3:Fe=7;break t;case 4:Fe=5;break t;case 7:o0(d)?(Fe=0,hi=null,jg(i)):(Fe=0,hi=null,Dr(e,i,d,7));break;case 5:var M=null;switch(ve.tag){case 26:M=ve.memoizedState;case 5:case 27:var C=ve;if(M?I_(M):C.stateNode.complete){Fe=0,hi=null;var B=C.sibling;if(B!==null)ve=B;else{var at=C.return;at!==null?(ve=at,Mu(at)):ve=null}break e}}Fe=0,hi=null,Dr(e,i,d,5);break;case 6:Fe=0,hi=null,Dr(e,i,d,6);break;case 8:vh(),fn=6;break t;default:throw Error(a(462))}}jS();break}catch(vt){Yg(e,vt)}while(!0);return ha=Is=null,F.H=l,F.A=f,Le=r,ve!==null?0:(Ye=null,ye=0,Gl(),fn)}function jS(){for(;ve!==null&&!un();)Qg(ve)}function Qg(e){var i=Sg(e.alternate,e,Ma);e.memoizedProps=e.pendingProps,i===null?Mu(e):ve=i}function jg(e){var i=e,r=i.alternate;switch(i.tag){case 15:case 0:i=mg(r,i,i.pendingProps,i.type,void 0,ye);break;case 11:i=mg(r,i,i.pendingProps,i.type.render,i.ref,ye);break;case 5:Pf(i);default:Eg(r,i),i=ve=Jm(i,Ma),i=Sg(r,i,Ma)}e.memoizedProps=e.pendingProps,i===null?Mu(e):ve=i}function Dr(e,i,r,l){ha=Is=null,Pf(i),xr=null,Do=0;var f=i.return;try{if(HS(e,f,i,r,ye)){fn=1,uu(e,Si(r,e.current)),ve=null;return}}catch(d){if(f!==null)throw ve=f,d;fn=1,uu(e,Si(r,e.current)),ve=null;return}i.flags&32768?(Ee||l===1?e=!0:Ar||(ye&536870912)!==0?e=!1:($a=e=!0,(l===2||l===9||l===3||l===6)&&(l=ci.current,l!==null&&l.tag===13&&(l.flags|=16384))),$g(i,e)):Mu(i)}function Mu(e){var i=e;do{if((i.flags&32768)!==0){$g(i,$a);return}e=i.return;var r=kS(i.alternate,i,Ma);if(r!==null){ve=r;return}if(i=i.sibling,i!==null){ve=i;return}ve=i=e}while(i!==null);fn===0&&(fn=5)}function $g(e,i){do{var r=XS(e.alternate,e);if(r!==null){r.flags&=32767,ve=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!i&&(e=e.sibling,e!==null)){ve=e;return}ve=e=r}while(e!==null);fn=6,ve=null}function t_(e,i,r,l,f,d,M,C,B){e.cancelPendingCommit=null;do Eu();while(bn!==0);if((Le&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(d=i.lanes|i.childLanes,d|=of,je(e,r,d,M,C,B),e===Ye&&(ve=Ye=null,ye=0),Cr=i,ns=e,Ea=r,mh=d,gh=f,kg=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,nM(tt,function(){return s_(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=F.T,F.T=null,f=H.p,H.p=2,M=Le,Le|=4;try{WS(e,i,r)}finally{Le=M,H.p=f,F.T=l}}bn=1,e_(),n_(),i_()}}function e_(){if(bn===1){bn=0;var e=ns,i=Cr,r=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||r){r=F.T,F.T=null;var l=H.p;H.p=2;var f=Le;Le|=4;try{Og(i,e);var d=Uh,M=Gm(e.containerInfo),C=d.focusedElem,B=d.selectionRange;if(M!==C&&C&&C.ownerDocument&&Hm(C.ownerDocument.documentElement,C)){if(B!==null&&ef(C)){var at=B.start,vt=B.end;if(vt===void 0&&(vt=at),"selectionStart"in C)C.selectionStart=at,C.selectionEnd=Math.min(vt,C.value.length);else{var Et=C.ownerDocument||document,ct=Et&&Et.defaultView||window;if(ct.getSelection){var ft=ct.getSelection(),qt=C.textContent.length,ie=Math.min(B.start,qt),Xe=B.end===void 0?ie:Math.min(B.end,qt);!ft.extend&&ie>Xe&&(M=Xe,Xe=ie,ie=M);var $=Bm(C,ie),X=Bm(C,Xe);if($&&X&&(ft.rangeCount!==1||ft.anchorNode!==$.node||ft.anchorOffset!==$.offset||ft.focusNode!==X.node||ft.focusOffset!==X.offset)){var it=Et.createRange();it.setStart($.node,$.offset),ft.removeAllRanges(),ie>Xe?(ft.addRange(it),ft.extend(X.node,X.offset)):(it.setEnd(X.node,X.offset),ft.addRange(it))}}}}for(Et=[],ft=C;ft=ft.parentNode;)ft.nodeType===1&&Et.push({element:ft,left:ft.scrollLeft,top:ft.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<Et.length;C++){var Mt=Et[C];Mt.element.scrollLeft=Mt.left,Mt.element.scrollTop=Mt.top}}Ou=!!Dh,Uh=Dh=null}finally{Le=f,H.p=l,F.T=r}}e.current=i,bn=2}}function n_(){if(bn===2){bn=0;var e=ns,i=Cr,r=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||r){r=F.T,F.T=null;var l=H.p;H.p=2;var f=Le;Le|=4;try{Dg(e,i.alternate,i)}finally{Le=f,H.p=l,F.T=r}}bn=3}}function i_(){if(bn===4||bn===3){bn=0,K();var e=ns,i=Cr,r=Ea,l=kg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?bn=5:(bn=0,Cr=ns=null,a_(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(es=null),mo(r),i=i.stateNode,gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(dt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=F.T,f=H.p,H.p=2,F.T=null;try{for(var d=e.onRecoverableError,M=0;M<l.length;M++){var C=l[M];d(C.value,{componentStack:C.stack})}}finally{F.T=i,H.p=f}}(Ea&3)!==0&&Eu(),Zi(e),f=e.pendingLanes,(r&261930)!==0&&(f&42)!==0?e===_h?Yo++:(Yo=0,_h=e):Yo=0,Zo(0)}}function a_(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,Co(i)))}function Eu(){return e_(),n_(),i_(),s_()}function s_(){if(bn!==5)return!1;var e=ns,i=mh;mh=0;var r=mo(Ea),l=F.T,f=H.p;try{H.p=32>r?32:r,F.T=null,r=gh,gh=null;var d=ns,M=Ea;if(bn=0,Cr=ns=null,Ea=0,(Le&6)!==0)throw Error(a(331));var C=Le;if(Le|=4,Hg(d.current),Ig(d,d.current,M,r),Le=C,Zo(0,!1),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(dt,d)}catch{}return!0}finally{H.p=f,F.T=l,a_(e,i)}}function r_(e,i,r){i=Si(r,i),i=Kf(e.stateNode,i,2),e=Ka(e,i,2),e!==null&&(kt(e,2),Zi(e))}function Be(e,i,r){if(e.tag===3)r_(e,e,r);else for(;i!==null;){if(i.tag===3){r_(i,e,r);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(es===null||!es.has(l))){e=Si(r,e),r=og(2),l=Ka(i,r,2),l!==null&&(lg(r,l,i,e),kt(l,2),Zi(l));break}}i=i.return}}function yh(e,i,r){var l=e.pingCache;if(l===null){l=e.pingCache=new ZS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(r)||(hh=!0,f.add(r),e=$S.bind(null,e,i,r),i.then(e,e))}function $S(e,i,r){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Ye===e&&(ye&r)===r&&(fn===4||fn===3&&(ye&62914560)===ye&&300>Ge()-_u?(Le&2)===0&&wr(e,0):dh|=r,Rr===ye&&(Rr=0)),Zi(e)}function o_(e,i){i===0&&(i=Tt()),e=Ps(e,i),e!==null&&(kt(e,i),Zi(e))}function tM(e){var i=e.memoizedState,r=0;i!==null&&(r=i.retryLane),o_(e,r)}function eM(e,i){var r=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(r=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),o_(e,r)}function nM(e,i){return hn(e,i)}var bu=null,Ur=null,Sh=!1,Tu=!1,Mh=!1,as=0;function Zi(e){e!==Ur&&e.next===null&&(Ur===null?bu=Ur=e:Ur=Ur.next=e),Tu=!0,Sh||(Sh=!0,aM())}function Zo(e,i){if(!Mh&&Tu){Mh=!0;do for(var r=!1,l=bu;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var d=0;else{var M=l.suspendedLanes,C=l.pingedLanes;d=(1<<31-Ht(42|e)+1)-1,d&=f&~(M&~C),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,f_(l,d))}else d=ye,d=yt(l,l===Ye?d:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(d&3)===0||Ut(l,d)||(r=!0,f_(l,d));l=l.next}while(r);Mh=!1}}function iM(){l_()}function l_(){Tu=Sh=!1;var e=0;as!==0&&pM()&&(e=as);for(var i=Ge(),r=null,l=bu;l!==null;){var f=l.next,d=u_(l,i);d===0?(l.next=null,r===null?bu=f:r.next=f,f===null&&(Ur=r)):(r=l,(e!==0||(d&3)!==0)&&(Tu=!0)),l=f}bn!==0&&bn!==5||Zo(e),as!==0&&(as=0)}function u_(e,i){for(var r=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var M=31-Ht(d),C=1<<M,B=f[M];B===-1?((C&r)===0||(C&l)!==0)&&(f[M]=Bt(C,i)):B<=i&&(e.expiredLanes|=C),d&=~C}if(i=Ye,r=ye,r=yt(e,e===i?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,r===0||e===i&&(Fe===2||Fe===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Ze(l),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Ut(e,r)){if(i=r&-r,i===e.callbackPriority)return i;switch(l!==null&&Ze(l),mo(r)){case 2:case 8:r=b;break;case 32:r=tt;break;case 268435456:r=mt;break;default:r=tt}return l=c_.bind(null,e),r=hn(r,l),e.callbackPriority=i,e.callbackNode=r,i}return l!==null&&l!==null&&Ze(l),e.callbackPriority=2,e.callbackNode=null,2}function c_(e,i){if(bn!==0&&bn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(Eu()&&e.callbackNode!==r)return null;var l=ye;return l=yt(e,e===Ye?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Wg(e,l,i),u_(e,Ge()),e.callbackNode!=null&&e.callbackNode===r?c_.bind(null,e):null)}function f_(e,i){if(Eu())return null;Wg(e,i,!0)}function aM(){gM(function(){(Le&6)!==0?hn(P,iM):l_()})}function Eh(){if(as===0){var e=gr;e===0&&(e=$t,$t<<=1,($t&261888)===0&&($t=256)),as=e}return as}function h_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ds(""+e)}function d_(e,i){var r=i.ownerDocument.createElement("input");return r.name=i.name,r.value=i.value,e.id&&r.setAttribute("form",e.id),i.parentNode.insertBefore(r,i),e=new FormData(e),r.parentNode.removeChild(r),e}function sM(e,i,r,l,f){if(i==="submit"&&r&&r.stateNode===f){var d=h_((f[Dn]||null).action),M=l.submitter;M&&(i=(i=M[Dn]||null)?h_(i.formAction):M.getAttribute("formAction"),i!==null&&(d=i,M=null));var C=new Il("action","action",null,l,f);e.push({event:C,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(as!==0){var B=M?d_(f,M):new FormData(f);kf(r,{pending:!0,data:B,method:f.method,action:d},null,B)}}else typeof d=="function"&&(C.preventDefault(),B=M?d_(f,M):new FormData(f),kf(r,{pending:!0,data:B,method:f.method,action:d},d,B))},currentTarget:f}]})}}for(var bh=0;bh<rf.length;bh++){var Th=rf[bh],rM=Th.toLowerCase(),oM=Th[0].toUpperCase()+Th.slice(1);Ni(rM,"on"+oM)}Ni(Xm,"onAnimationEnd"),Ni(Wm,"onAnimationIteration"),Ni(qm,"onAnimationStart"),Ni("dblclick","onDoubleClick"),Ni("focusin","onFocus"),Ni("focusout","onBlur"),Ni(ES,"onTransitionRun"),Ni(bS,"onTransitionStart"),Ni(TS,"onTransitionCancel"),Ni(Ym,"onTransitionEnd"),ut("onMouseEnter",["mouseout","mouseover"]),ut("onMouseLeave",["mouseout","mouseover"]),ut("onPointerEnter",["pointerout","pointerover"]),ut("onPointerLeave",["pointerout","pointerover"]),Z("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Z("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Z("onBeforeInput",["compositionend","keypress","textInput","paste"]),Z("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Z("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Z("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ko="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ko));function p_(e,i){i=(i&4)!==0;for(var r=0;r<e.length;r++){var l=e[r],f=l.event;l=l.listeners;t:{var d=void 0;if(i)for(var M=l.length-1;0<=M;M--){var C=l[M],B=C.instance,at=C.currentTarget;if(C=C.listener,B!==d&&f.isPropagationStopped())break t;d=C,f.currentTarget=at;try{d(f)}catch(vt){Hl(vt)}f.currentTarget=null,d=B}else for(M=0;M<l.length;M++){if(C=l[M],B=C.instance,at=C.currentTarget,C=C.listener,B!==d&&f.isPropagationStopped())break t;d=C,f.currentTarget=at;try{d(f)}catch(vt){Hl(vt)}f.currentTarget=null,d=B}}}}function xe(e,i){var r=i[Rs];r===void 0&&(r=i[Rs]=new Set);var l=e+"__bubble";r.has(l)||(m_(i,e,2,!1),r.add(l))}function Ah(e,i,r){var l=0;i&&(l|=4),m_(r,e,l,i)}var Au="_reactListening"+Math.random().toString(36).slice(2);function Rh(e){if(!e[Au]){e[Au]=!0,Nl.forEach(function(r){r!=="selectionchange"&&(lM.has(r)||Ah(r,!1,e),Ah(r,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Au]||(i[Au]=!0,Ah("selectionchange",!1,i))}}function m_(e,i,r,l){switch(X_(i)){case 2:var f=zM;break;case 8:f=IM;break;default:f=Vh}r=f.bind(null,i,r,e),f=void 0,!qc||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,r,{capture:!0,passive:f}):e.addEventListener(i,r,!0):f!==void 0?e.addEventListener(i,r,{passive:f}):e.addEventListener(i,r,!1)}function Ch(e,i,r,l,f){var d=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var C=l.stateNode.containerInfo;if(C===f)break;if(M===4)for(M=l.return;M!==null;){var B=M.tag;if((B===3||B===4)&&M.stateNode.containerInfo===f)return;M=M.return}for(;C!==null;){if(M=ra(C),M===null)return;if(B=M.tag,B===5||B===6||B===26||B===27){l=d=M;continue t}C=C.parentNode}}l=l.return}ym(function(){var at=d,vt=Xc(r),Et=[];t:{var ct=Zm.get(e);if(ct!==void 0){var ft=Il,qt=e;switch(e){case"keypress":if(Ol(r)===0)break t;case"keydown":case"keyup":ft=eS;break;case"focusin":qt="focus",ft=Jc;break;case"focusout":qt="blur",ft=Jc;break;case"beforeblur":case"afterblur":ft=Jc;break;case"click":if(r.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ft=Em;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ft=ky;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ft=aS;break;case Xm:case Wm:case qm:ft=qy;break;case Ym:ft=rS;break;case"scroll":case"scrollend":ft=Gy;break;case"wheel":ft=lS;break;case"copy":case"cut":case"paste":ft=Zy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ft=Tm;break;case"toggle":case"beforetoggle":ft=cS}var ie=(i&4)!==0,Xe=!ie&&(e==="scroll"||e==="scrollend"),$=ie?ct!==null?ct+"Capture":null:ct;ie=[];for(var X=at,it;X!==null;){var Mt=X;if(it=Mt.stateNode,Mt=Mt.tag,Mt!==5&&Mt!==26&&Mt!==27||it===null||$===null||(Mt=_o(X,$),Mt!=null&&ie.push(Jo(X,Mt,it))),Xe)break;X=X.return}0<ie.length&&(ct=new ft(ct,qt,null,r,vt),Et.push({event:ct,listeners:ie}))}}if((i&7)===0){t:{if(ct=e==="mouseover"||e==="pointerover",ft=e==="mouseout"||e==="pointerout",ct&&r!==kc&&(qt=r.relatedTarget||r.fromElement)&&(ra(qt)||qt[Zn]))break t;if((ft||ct)&&(ct=vt.window===vt?vt:(ct=vt.ownerDocument)?ct.defaultView||ct.parentWindow:window,ft?(qt=r.relatedTarget||r.toElement,ft=at,qt=qt?ra(qt):null,qt!==null&&(Xe=u(qt),ie=qt.tag,qt!==Xe||ie!==5&&ie!==27&&ie!==6)&&(qt=null)):(ft=null,qt=at),ft!==qt)){if(ie=Em,Mt="onMouseLeave",$="onMouseEnter",X="mouse",(e==="pointerout"||e==="pointerover")&&(ie=Tm,Mt="onPointerLeave",$="onPointerEnter",X="pointer"),Xe=ft==null?ct:ws(ft),it=qt==null?ct:ws(qt),ct=new ie(Mt,X+"leave",ft,r,vt),ct.target=Xe,ct.relatedTarget=it,Mt=null,ra(vt)===at&&(ie=new ie($,X+"enter",qt,r,vt),ie.target=it,ie.relatedTarget=Xe,Mt=ie),Xe=Mt,ft&&qt)e:{for(ie=uM,$=ft,X=qt,it=0,Mt=$;Mt;Mt=ie(Mt))it++;Mt=0;for(var ee=X;ee;ee=ie(ee))Mt++;for(;0<it-Mt;)$=ie($),it--;for(;0<Mt-it;)X=ie(X),Mt--;for(;it--;){if($===X||X!==null&&$===X.alternate){ie=$;break e}$=ie($),X=ie(X)}ie=null}else ie=null;ft!==null&&g_(Et,ct,ft,ie,!1),qt!==null&&Xe!==null&&g_(Et,Xe,qt,ie,!0)}}t:{if(ct=at?ws(at):window,ft=ct.nodeName&&ct.nodeName.toLowerCase(),ft==="select"||ft==="input"&&ct.type==="file")var we=Nm;else if(Um(ct))if(Pm)we=yS;else{we=vS;var Jt=_S}else ft=ct.nodeName,!ft||ft.toLowerCase()!=="input"||ct.type!=="checkbox"&&ct.type!=="radio"?at&&Ne(at.elementType)&&(we=Nm):we=xS;if(we&&(we=we(e,at))){Lm(Et,we,r,vt);break t}Jt&&Jt(e,ct,at),e==="focusout"&&at&&ct.type==="number"&&at.memoizedProps.value!=null&&_e(ct,"number",ct.value)}switch(Jt=at?ws(at):window,e){case"focusin":(Um(Jt)||Jt.contentEditable==="true")&&(lr=Jt,nf=at,To=null);break;case"focusout":To=nf=lr=null;break;case"mousedown":af=!0;break;case"contextmenu":case"mouseup":case"dragend":af=!1,Vm(Et,r,vt);break;case"selectionchange":if(MS)break;case"keydown":case"keyup":Vm(Et,r,vt)}var de;if(jc)t:{switch(e){case"compositionstart":var Se="onCompositionStart";break t;case"compositionend":Se="onCompositionEnd";break t;case"compositionupdate":Se="onCompositionUpdate";break t}Se=void 0}else or?wm(e,r)&&(Se="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Se="onCompositionStart");Se&&(Am&&r.locale!=="ko"&&(or||Se!=="onCompositionStart"?Se==="onCompositionEnd"&&or&&(de=Sm()):(Va=vt,Yc="value"in Va?Va.value:Va.textContent,or=!0)),Jt=Ru(at,Se),0<Jt.length&&(Se=new bm(Se,e,null,r,vt),Et.push({event:Se,listeners:Jt}),de?Se.data=de:(de=Dm(r),de!==null&&(Se.data=de)))),(de=hS?dS(e,r):pS(e,r))&&(Se=Ru(at,"onBeforeInput"),0<Se.length&&(Jt=new bm("onBeforeInput","beforeinput",null,r,vt),Et.push({event:Jt,listeners:Se}),Jt.data=de)),sM(Et,e,at,r,vt)}p_(Et,i)})}function Jo(e,i,r){return{instance:e,listener:i,currentTarget:r}}function Ru(e,i){for(var r=i+"Capture",l=[];e!==null;){var f=e,d=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||d===null||(f=_o(e,r),f!=null&&l.unshift(Jo(e,f,d)),f=_o(e,i),f!=null&&l.push(Jo(e,f,d))),e.tag===3)return l;e=e.return}return[]}function uM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function g_(e,i,r,l,f){for(var d=i._reactName,M=[];r!==null&&r!==l;){var C=r,B=C.alternate,at=C.stateNode;if(C=C.tag,B!==null&&B===l)break;C!==5&&C!==26&&C!==27||at===null||(B=at,f?(at=_o(r,d),at!=null&&M.unshift(Jo(r,at,B))):f||(at=_o(r,d),at!=null&&M.push(Jo(r,at,B)))),r=r.return}M.length!==0&&e.push({event:i,listeners:M})}var cM=/\r\n?/g,fM=/\u0000|\uFFFD/g;function __(e){return(typeof e=="string"?e:""+e).replace(cM,`
`).replace(fM,"")}function v_(e,i){return i=__(i),__(e)===i}function ke(e,i,r,l,f,d){switch(r){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||oi(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&oi(e,""+l);break;case"className":Wt(e,"class",l);break;case"tabIndex":Wt(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Wt(e,r,l);break;case"style":Li(e,l,d);break;case"data":if(i!=="object"){Wt(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||r!=="href")){e.removeAttribute(r);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(r);break}l=Ds(""+l),e.setAttribute(r,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(i!=="input"&&ke(e,i,"name",f.name,f,null),ke(e,i,"formEncType",f.formEncType,f,null),ke(e,i,"formMethod",f.formMethod,f,null),ke(e,i,"formTarget",f.formTarget,f,null)):(ke(e,i,"encType",f.encType,f,null),ke(e,i,"method",f.method,f,null),ke(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(r);break}l=Ds(""+l),e.setAttribute(r,l);break;case"onClick":l!=null&&(e.onclick=la);break;case"onScroll":l!=null&&xe("scroll",e);break;case"onScrollEnd":l!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(r=l.__html,r!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=r}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}r=Ds(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(r,""+l):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":l===!0?e.setAttribute(r,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(r,l):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(r,l):e.removeAttribute(r);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(r):e.setAttribute(r,l);break;case"popover":xe("beforetoggle",e),xe("toggle",e),Pt(e,"popover",l);break;case"xlinkActuate":Xt(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Xt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Xt(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Xt(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Xt(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Xt(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Pt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=Xi.get(r)||r,Pt(e,r,l))}}function wh(e,i,r,l,f,d){switch(r){case"style":Li(e,l,d);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(r=l.__html,r!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=r}}break;case"children":typeof l=="string"?oi(e,l):(typeof l=="number"||typeof l=="bigint")&&oi(e,""+l);break;case"onScroll":l!=null&&xe("scroll",e);break;case"onScrollEnd":l!=null&&xe("scrollend",e);break;case"onClick":l!=null&&(e.onclick=la);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!R.hasOwnProperty(r))t:{if(r[0]==="o"&&r[1]==="n"&&(f=r.endsWith("Capture"),i=r.slice(2,f?r.length-7:void 0),d=e[Dn]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(i,d,f),typeof l=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(i,l,f);break t}r in e?e[r]=l:l===!0?e.setAttribute(r,""):Pt(e,r,l)}}}function Pn(e,i,r){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var l=!1,f=!1,d;for(d in r)if(r.hasOwnProperty(d)){var M=r[d];if(M!=null)switch(d){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:ke(e,i,d,M,r,null)}}f&&ke(e,i,"srcSet",r.srcSet,r,null),l&&ke(e,i,"src",r.src,r,null);return;case"input":xe("invalid",e);var C=d=M=f=null,B=null,at=null;for(l in r)if(r.hasOwnProperty(l)){var vt=r[l];if(vt!=null)switch(l){case"name":f=vt;break;case"type":M=vt;break;case"checked":B=vt;break;case"defaultChecked":at=vt;break;case"value":d=vt;break;case"defaultValue":C=vt;break;case"children":case"dangerouslySetInnerHTML":if(vt!=null)throw Error(a(137,i));break;default:ke(e,i,l,vt,r,null)}}In(e,d,C,B,at,M,f,!1);return;case"select":xe("invalid",e),l=M=d=null;for(f in r)if(r.hasOwnProperty(f)&&(C=r[f],C!=null))switch(f){case"value":d=C;break;case"defaultValue":M=C;break;case"multiple":l=C;default:ke(e,i,f,C,r,null)}i=d,r=M,e.multiple=!!l,i!=null?En(e,!!l,i,!1):r!=null&&En(e,!!l,r,!0);return;case"textarea":xe("invalid",e),d=f=l=null;for(M in r)if(r.hasOwnProperty(M)&&(C=r[M],C!=null))switch(M){case"value":l=C;break;case"defaultValue":f=C;break;case"children":d=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(a(91));break;default:ke(e,i,M,C,r,null)}Ui(e,l,f,d);return;case"option":for(B in r)r.hasOwnProperty(B)&&(l=r[B],l!=null)&&(B==="selected"?e.selected=l&&typeof l!="function"&&typeof l!="symbol":ke(e,i,B,l,r,null));return;case"dialog":xe("beforetoggle",e),xe("toggle",e),xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(l=0;l<Ko.length;l++)xe(Ko[l],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(at in r)if(r.hasOwnProperty(at)&&(l=r[at],l!=null))switch(at){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:ke(e,i,at,l,r,null)}return;default:if(Ne(i)){for(vt in r)r.hasOwnProperty(vt)&&(l=r[vt],l!==void 0&&wh(e,i,vt,l,r,void 0));return}}for(C in r)r.hasOwnProperty(C)&&(l=r[C],l!=null&&ke(e,i,C,l,r,null))}function hM(e,i,r,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,d=null,M=null,C=null,B=null,at=null,vt=null;for(ft in r){var Et=r[ft];if(r.hasOwnProperty(ft)&&Et!=null)switch(ft){case"checked":break;case"value":break;case"defaultValue":B=Et;default:l.hasOwnProperty(ft)||ke(e,i,ft,null,l,Et)}}for(var ct in l){var ft=l[ct];if(Et=r[ct],l.hasOwnProperty(ct)&&(ft!=null||Et!=null))switch(ct){case"type":d=ft;break;case"name":f=ft;break;case"checked":at=ft;break;case"defaultChecked":vt=ft;break;case"value":M=ft;break;case"defaultValue":C=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(a(137,i));break;default:ft!==Et&&ke(e,i,ct,ft,l,Et)}}Gt(e,M,C,B,at,vt,d,f);return;case"select":ft=M=C=ct=null;for(d in r)if(B=r[d],r.hasOwnProperty(d)&&B!=null)switch(d){case"value":break;case"multiple":ft=B;default:l.hasOwnProperty(d)||ke(e,i,d,null,l,B)}for(f in l)if(d=l[f],B=r[f],l.hasOwnProperty(f)&&(d!=null||B!=null))switch(f){case"value":ct=d;break;case"defaultValue":C=d;break;case"multiple":M=d;default:d!==B&&ke(e,i,f,d,l,B)}i=C,r=M,l=ft,ct!=null?En(e,!!r,ct,!1):!!l!=!!r&&(i!=null?En(e,!!r,i,!0):En(e,!!r,r?[]:"",!1));return;case"textarea":ft=ct=null;for(C in r)if(f=r[C],r.hasOwnProperty(C)&&f!=null&&!l.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:ke(e,i,C,null,l,f)}for(M in l)if(f=l[M],d=r[M],l.hasOwnProperty(M)&&(f!=null||d!=null))switch(M){case"value":ct=f;break;case"defaultValue":ft=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==d&&ke(e,i,M,f,l,d)}ri(e,ct,ft);return;case"option":for(var qt in r)ct=r[qt],r.hasOwnProperty(qt)&&ct!=null&&!l.hasOwnProperty(qt)&&(qt==="selected"?e.selected=!1:ke(e,i,qt,null,l,ct));for(B in l)ct=l[B],ft=r[B],l.hasOwnProperty(B)&&ct!==ft&&(ct!=null||ft!=null)&&(B==="selected"?e.selected=ct&&typeof ct!="function"&&typeof ct!="symbol":ke(e,i,B,ct,l,ft));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ie in r)ct=r[ie],r.hasOwnProperty(ie)&&ct!=null&&!l.hasOwnProperty(ie)&&ke(e,i,ie,null,l,ct);for(at in l)if(ct=l[at],ft=r[at],l.hasOwnProperty(at)&&ct!==ft&&(ct!=null||ft!=null))switch(at){case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(a(137,i));break;default:ke(e,i,at,ct,l,ft)}return;default:if(Ne(i)){for(var Xe in r)ct=r[Xe],r.hasOwnProperty(Xe)&&ct!==void 0&&!l.hasOwnProperty(Xe)&&wh(e,i,Xe,void 0,l,ct);for(vt in l)ct=l[vt],ft=r[vt],!l.hasOwnProperty(vt)||ct===ft||ct===void 0&&ft===void 0||wh(e,i,vt,ct,l,ft);return}}for(var $ in r)ct=r[$],r.hasOwnProperty($)&&ct!=null&&!l.hasOwnProperty($)&&ke(e,i,$,null,l,ct);for(Et in l)ct=l[Et],ft=r[Et],!l.hasOwnProperty(Et)||ct===ft||ct==null&&ft==null||ke(e,i,Et,ct,l,ft)}function x_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function dM(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,r=performance.getEntriesByType("resource"),l=0;l<r.length;l++){var f=r[l],d=f.transferSize,M=f.initiatorType,C=f.duration;if(d&&C&&x_(M)){for(M=0,C=f.responseEnd,l+=1;l<r.length;l++){var B=r[l],at=B.startTime;if(at>C)break;var vt=B.transferSize,Et=B.initiatorType;vt&&x_(Et)&&(B=B.responseEnd,M+=vt*(B<C?1:(C-at)/(B-at)))}if(--l,i+=8*(d+M)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Dh=null,Uh=null;function Cu(e){return e.nodeType===9?e:e.ownerDocument}function y_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function S_(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function Lh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Nh=null;function pM(){var e=window.event;return e&&e.type==="popstate"?e===Nh?!1:(Nh=e,!0):(Nh=null,!1)}var M_=typeof setTimeout=="function"?setTimeout:void 0,mM=typeof clearTimeout=="function"?clearTimeout:void 0,E_=typeof Promise=="function"?Promise:void 0,gM=typeof queueMicrotask=="function"?queueMicrotask:typeof E_<"u"?function(e){return E_.resolve(null).then(e).catch(_M)}:M_;function _M(e){setTimeout(function(){throw e})}function ss(e){return e==="head"}function b_(e,i){var r=i,l=0;do{var f=r.nextSibling;if(e.removeChild(r),f&&f.nodeType===8)if(r=f.data,r==="/$"||r==="/&"){if(l===0){e.removeChild(f),Or(i);return}l--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")l++;else if(r==="html")Qo(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,Qo(r);for(var d=r.firstChild;d;){var M=d.nextSibling,C=d.nodeName;d[Fa]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=M}}else r==="body"&&Qo(e.ownerDocument.body);r=f}while(r);Or(i)}function T_(e,i){var r=e;e=0;do{var l=r.nextSibling;if(r.nodeType===1?i?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(i?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),l&&l.nodeType===8)if(r=l.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=l}while(r)}function Ph(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var r=i;switch(i=i.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Ph(r),Ba(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function vM(e,i,r,l){for(;e.nodeType===1;){var f=r;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Fa])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Ai(e.nextSibling),e===null)break}return null}function xM(e,i,r){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Ai(e.nextSibling),e===null))return null;return e}function A_(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Ai(e.nextSibling),e===null))return null;return e}function Oh(e){return e.data==="$?"||e.data==="$~"}function zh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function yM(e,i){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||r.readyState!=="loading")i();else{var l=function(){i(),r.removeEventListener("DOMContentLoaded",l)};r.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Ai(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Ih=null;function R_(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(i===0)return Ai(e.nextSibling);i--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||i++}e=e.nextSibling}return null}function C_(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(i===0)return e;i--}else r!=="/$"&&r!=="/&"||i++}e=e.previousSibling}return null}function w_(e,i,r){switch(i=Cu(r),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Qo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);Ba(e)}var Ri=new Map,D_=new Set;function wu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ba=H.d;H.d={f:SM,r:MM,D:EM,C:bM,L:TM,m:AM,X:CM,S:RM,M:wM};function SM(){var e=ba.f(),i=yu();return e||i}function MM(e){var i=oa(e);i!==null&&i.tag===5&&i.type==="form"?Y0(i):ba.r(e)}var Lr=typeof document>"u"?null:document;function U_(e,i,r){var l=Lr;if(l&&typeof i=="string"&&i){var f=ze(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof r=="string"&&(f+='[crossorigin="'+r+'"]'),D_.has(f)||(D_.add(f),e={rel:e,crossOrigin:r,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Pn(i,"link",e),_n(i),l.head.appendChild(i)))}}function EM(e){ba.D(e),U_("dns-prefetch",e,null)}function bM(e,i){ba.C(e,i),U_("preconnect",e,i)}function TM(e,i,r){ba.L(e,i,r);var l=Lr;if(l&&e&&i){var f='link[rel="preload"][as="'+ze(i)+'"]';i==="image"&&r&&r.imageSrcSet?(f+='[imagesrcset="'+ze(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(f+='[imagesizes="'+ze(r.imageSizes)+'"]')):f+='[href="'+ze(e)+'"]';var d=f;switch(i){case"style":d=Nr(e);break;case"script":d=Pr(e)}Ri.has(d)||(e=_({rel:"preload",href:i==="image"&&r&&r.imageSrcSet?void 0:e,as:i},r),Ri.set(d,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(jo(d))||i==="script"&&l.querySelector($o(d))||(i=l.createElement("link"),Pn(i,"link",e),_n(i),l.head.appendChild(i)))}}function AM(e,i){ba.m(e,i);var r=Lr;if(r&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+ze(l)+'"][href="'+ze(e)+'"]',d=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Pr(e)}if(!Ri.has(d)&&(e=_({rel:"modulepreload",href:e},i),Ri.set(d,e),r.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector($o(d)))return}l=r.createElement("link"),Pn(l,"link",e),_n(l),r.head.appendChild(l)}}}function RM(e,i,r){ba.S(e,i,r);var l=Lr;if(l&&e){var f=Ha(l).hoistableStyles,d=Nr(e);i=i||"default";var M=f.get(d);if(!M){var C={loading:0,preload:null};if(M=l.querySelector(jo(d)))C.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},r),(r=Ri.get(d))&&Fh(e,r);var B=M=l.createElement("link");_n(B),Pn(B,"link",e),B._p=new Promise(function(at,vt){B.onload=at,B.onerror=vt}),B.addEventListener("load",function(){C.loading|=1}),B.addEventListener("error",function(){C.loading|=2}),C.loading|=4,Du(M,i,l)}M={type:"stylesheet",instance:M,count:1,state:C},f.set(d,M)}}}function CM(e,i){ba.X(e,i);var r=Lr;if(r&&e){var l=Ha(r).hoistableScripts,f=Pr(e),d=l.get(f);d||(d=r.querySelector($o(f)),d||(e=_({src:e,async:!0},i),(i=Ri.get(f))&&Bh(e,i),d=r.createElement("script"),_n(d),Pn(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(f,d))}}function wM(e,i){ba.M(e,i);var r=Lr;if(r&&e){var l=Ha(r).hoistableScripts,f=Pr(e),d=l.get(f);d||(d=r.querySelector($o(f)),d||(e=_({src:e,async:!0,type:"module"},i),(i=Ri.get(f))&&Bh(e,i),d=r.createElement("script"),_n(d),Pn(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(f,d))}}function L_(e,i,r,l){var f=(f=V.current)?wu(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(i=Nr(r.href),r=Ha(f).hoistableStyles,l=r.get(i),l||(l={type:"style",instance:null,count:0,state:null},r.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Nr(r.href);var d=Ha(f).hoistableStyles,M=d.get(e);if(M||(f=f.ownerDocument||f,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,M),(d=f.querySelector(jo(e)))&&!d._p&&(M.instance=d,M.state.loading=5),Ri.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Ri.set(e,r),d||DM(f,e,r,M.state))),i&&l===null)throw Error(a(528,""));return M}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=r.async,r=r.src,typeof r=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Pr(r),r=Ha(f).hoistableScripts,l=r.get(i),l||(l={type:"script",instance:null,count:0,state:null},r.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Nr(e){return'href="'+ze(e)+'"'}function jo(e){return'link[rel="stylesheet"]['+e+"]"}function N_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function DM(e,i,r,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Pn(i,"link",r),_n(i),e.head.appendChild(i))}function Pr(e){return'[src="'+ze(e)+'"]'}function $o(e){return"script[async]"+e}function P_(e,i,r){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+ze(r.href)+'"]');if(l)return i.instance=l,_n(l),l;var f=_({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),_n(l),Pn(l,"style",f),Du(l,r.precedence,e),i.instance=l;case"stylesheet":f=Nr(r.href);var d=e.querySelector(jo(f));if(d)return i.state.loading|=4,i.instance=d,_n(d),d;l=N_(r),(f=Ri.get(f))&&Fh(l,f),d=(e.ownerDocument||e).createElement("link"),_n(d);var M=d;return M._p=new Promise(function(C,B){M.onload=C,M.onerror=B}),Pn(d,"link",l),i.state.loading|=4,Du(d,r.precedence,e),i.instance=d;case"script":return d=Pr(r.src),(f=e.querySelector($o(d)))?(i.instance=f,_n(f),f):(l=r,(f=Ri.get(d))&&(l=_({},r),Bh(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),_n(f),Pn(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Du(l,r.precedence,e));return i.instance}function Du(e,i,r){for(var l=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,d=f,M=0;M<l.length;M++){var C=l[M];if(C.dataset.precedence===i)d=C;else if(d!==f)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=r.nodeType===9?r.head:r,i.insertBefore(e,i.firstChild))}function Fh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Bh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Uu=null;function O_(e,i,r){if(Uu===null){var l=new Map,f=Uu=new Map;f.set(r,l)}else f=Uu,l=f.get(r),l||(l=new Map,f.set(r,l));if(l.has(e))return l;for(l.set(e,null),r=r.getElementsByTagName(e),f=0;f<r.length;f++){var d=r[f];if(!(d[Fa]||d[gn]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var M=d.getAttribute(i)||"";M=e+M;var C=l.get(M);C?C.push(d):l.set(M,[d])}}return l}function z_(e,i,r){e=e.ownerDocument||e,e.head.insertBefore(r,i==="title"?e.querySelector("head > title"):null)}function UM(e,i,r){if(r===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;return i.rel==="stylesheet"?(e=i.disabled,typeof i.precedence=="string"&&e==null):!0;case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function I_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function LM(e,i,r,l){if(r.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var f=Nr(l.href),d=i.querySelector(jo(f));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Lu.bind(e),i.then(e,e)),r.state.loading|=4,r.instance=d,_n(d);return}d=i.ownerDocument||i,l=N_(l),(f=Ri.get(f))&&Fh(l,f),d=d.createElement("link"),_n(d);var M=d;M._p=new Promise(function(C,B){M.onload=C,M.onerror=B}),Pn(d,"link",l),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,i),(i=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=Lu.bind(e),i.addEventListener("load",r),i.addEventListener("error",r))}}var Hh=0;function NM(e,i){return e.stylesheets&&e.count===0&&Pu(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var l=setTimeout(function(){if(e.stylesheets&&Pu(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+i);0<e.imgBytes&&Hh===0&&(Hh=62500*dM());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Pu(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Hh?50:800)+i);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Lu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Pu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Nu=null;function Pu(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Nu=new Map,i.forEach(PM,e),Nu=null,Lu.call(e))}function PM(e,i){if(!(i.state.loading&4)){var r=Nu.get(e);if(r)var l=r.get(null);else{r=new Map,Nu.set(e,r);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<f.length;d++){var M=f[d];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(r.set(M.dataset.precedence,M),l=M)}l&&r.set(null,l)}f=i.instance,M=f.getAttribute("data-precedence"),d=r.get(M)||l,d===l&&r.set(null,f),r.set(M,f),this.count++,l=Lu.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),d?d.parentNode.insertBefore(f,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var tl={$$typeof:D,Provider:null,Consumer:null,_currentValue:nt,_currentValue2:nt,_threadCount:0};function OM(e,i,r,l,f,d,M,C,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kt(0),this.hiddenUpdates=Kt(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=d,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function F_(e,i,r,l,f,d,M,C,B,at,vt,Et){return e=new OM(e,i,r,M,B,at,vt,Et,C),i=1,d===!0&&(i|=24),d=ui(3,null,null,i),e.current=d,d.stateNode=e,i=xf(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:l,isDehydrated:r,cache:i},Ef(d),e}function B_(e){return e?(e=fr,e):fr}function H_(e,i,r,l,f,d){f=B_(f),l.context===null?l.context=f:l.pendingContext=f,l=Za(i),l.payload={element:r},d=d===void 0?null:d,d!==null&&(l.callback=d),r=Ka(e,l,i),r!==null&&(ti(r,e,i),Lo(r,e,i))}function G_(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<i?r:i}}function Gh(e,i){G_(e,i),(e=e.alternate)&&G_(e,i)}function V_(e){if(e.tag===13||e.tag===31){var i=Ps(e,67108864);i!==null&&ti(i,e,67108864),Gh(e,67108864)}}function k_(e){if(e.tag===13||e.tag===31){var i=pi();i=po(i);var r=Ps(e,i);r!==null&&ti(r,e,i),Gh(e,i)}}var Ou=!0;function zM(e,i,r,l){var f=F.T;F.T=null;var d=H.p;try{H.p=2,Vh(e,i,r,l)}finally{H.p=d,F.T=f}}function IM(e,i,r,l){var f=F.T;F.T=null;var d=H.p;try{H.p=8,Vh(e,i,r,l)}finally{H.p=d,F.T=f}}function Vh(e,i,r,l){if(Ou){var f=kh(l);if(f===null)Ch(e,i,l,zu,r),W_(e,l);else if(BM(f,e,i,r,l))l.stopPropagation();else if(W_(e,l),i&4&&-1<FM.indexOf(e)){for(;f!==null;){var d=oa(f);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var M=wt(d.pendingLanes);if(M!==0){var C=d;for(C.pendingLanes|=2,C.entangledLanes|=2;M;){var B=1<<31-Ht(M);C.entanglements[1]|=B,M&=~B}Zi(d),(Le&6)===0&&(vu=Ge()+500,Zo(0))}}break;case 31:case 13:C=Ps(d,2),C!==null&&ti(C,d,2),yu(),Gh(d,2)}if(d=kh(l),d===null&&Ch(e,i,l,zu,r),d===f)break;f=d}f!==null&&l.stopPropagation()}else Ch(e,i,l,null,r)}}function kh(e){return e=Xc(e),Xh(e)}var zu=null;function Xh(e){if(zu=null,e=ra(e),e!==null){var i=u(e);if(i===null)e=null;else{var r=i.tag;if(r===13){if(e=c(i),e!==null)return e;e=null}else if(r===31){if(e=h(i),e!==null)return e;e=null}else if(r===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return zu=e,null}function X_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ue()){case P:return 2;case b:return 8;case tt:case lt:return 32;case mt:return 268435456;default:return 32}default:return 32}}var Wh=!1,rs=null,os=null,ls=null,el=new Map,nl=new Map,us=[],FM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function W_(e,i){switch(e){case"focusin":case"focusout":rs=null;break;case"dragenter":case"dragleave":os=null;break;case"mouseover":case"mouseout":ls=null;break;case"pointerover":case"pointerout":el.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":nl.delete(i.pointerId)}}function il(e,i,r,l,f,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:r,eventSystemFlags:l,nativeEvent:d,targetContainers:[f]},i!==null&&(i=oa(i),i!==null&&V_(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function BM(e,i,r,l,f){switch(i){case"focusin":return rs=il(rs,e,i,r,l,f),!0;case"dragenter":return os=il(os,e,i,r,l,f),!0;case"mouseover":return ls=il(ls,e,i,r,l,f),!0;case"pointerover":var d=f.pointerId;return el.set(d,il(el.get(d)||null,e,i,r,l,f)),!0;case"gotpointercapture":return d=f.pointerId,nl.set(d,il(nl.get(d)||null,e,i,r,l,f)),!0}return!1}function q_(e){var i=ra(e.target);if(i!==null){var r=u(i);if(r!==null){if(i=r.tag,i===13){if(i=c(r),i!==null){e.blockedOn=i,ar(e.priority,function(){k_(r)});return}}else if(i===31){if(i=h(r),i!==null){e.blockedOn=i,ar(e.priority,function(){k_(r)});return}}else if(i===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Iu(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var r=kh(e.nativeEvent);if(r===null){r=e.nativeEvent;var l=new r.constructor(r.type,r);kc=l,r.target.dispatchEvent(l),kc=null}else return i=oa(r),i!==null&&V_(i),e.blockedOn=r,!1;i.shift()}return!0}function Y_(e,i,r){Iu(e)&&r.delete(i)}function HM(){Wh=!1,rs!==null&&Iu(rs)&&(rs=null),os!==null&&Iu(os)&&(os=null),ls!==null&&Iu(ls)&&(ls=null),el.forEach(Y_),nl.forEach(Y_)}function Fu(e,i){e.blockedOn===i&&(e.blockedOn=null,Wh||(Wh=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,HM)))}var Bu=null;function Z_(e){Bu!==e&&(Bu=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){Bu===e&&(Bu=null);for(var i=0;i<e.length;i+=3){var r=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(Xh(l||r)===null)continue;break}var d=oa(r);d!==null&&(e.splice(i,3),i-=3,kf(d,{pending:!0,data:f,method:r.method,action:l},l,f))}}))}function Or(e){function i(B){return Fu(B,e)}rs!==null&&Fu(rs,e),os!==null&&Fu(os,e),ls!==null&&Fu(ls,e),el.forEach(i),nl.forEach(i);for(var r=0;r<us.length;r++){var l=us[r];l.blockedOn===e&&(l.blockedOn=null)}for(;0<us.length&&(r=us[0],r.blockedOn===null);)q_(r),r.blockedOn===null&&us.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(l=0;l<r.length;l+=3){var f=r[l],d=r[l+1],M=f[Dn]||null;if(typeof d=="function")M||Z_(r);else if(M){var C=null;if(d&&d.hasAttribute("formAction")){if(f=d,M=d[Dn]||null)C=M.formAction;else if(Xh(f)!==null)continue}else C=M.action;typeof C=="function"?r[l+1]=C:(r.splice(l,3),l-=3),Z_(r)}}}function K_(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(M){return f=M})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(r,20)}function r(){if(!l&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(r,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function qh(e){this._internalRoot=e}Hu.prototype.render=qh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var r=i.current,l=pi();H_(r,l,e,i,null,null)},Hu.prototype.unmount=qh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;H_(e.current,2,null,e,null,null),yu(),i[Zn]=null}};function Hu(e){this._internalRoot=e}Hu.prototype.unstable_scheduleHydration=function(e){if(e){var i=go();e={blockedOn:null,target:e,priority:i};for(var r=0;r<us.length&&i!==0&&i<us[r].priority;r++);us.splice(r,0,e),r===0&&q_(e)}};var J_=t.version;if(J_!=="19.2.3")throw Error(a(527,J_,"19.2.3"));H.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var GM={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Gu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Gu.isDisabled&&Gu.supportsFiber)try{dt=Gu.inject(GM),gt=Gu}catch{}}return sl.createRoot=function(e,i){if(!o(e))throw Error(a(299));var r=!1,l="",f=ig,d=ag,M=sg;return i!=null&&(i.unstable_strictMode===!0&&(r=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(M=i.onRecoverableError)),i=F_(e,1,!1,null,null,r,l,null,f,d,M,K_),e[Zn]=i.current,Rh(e),new qh(i)},sl.hydrateRoot=function(e,i,r){if(!o(e))throw Error(a(299));var l=!1,f="",d=ig,M=ag,C=sg,B=null;return r!=null&&(r.unstable_strictMode===!0&&(l=!0),r.identifierPrefix!==void 0&&(f=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(M=r.onCaughtError),r.onRecoverableError!==void 0&&(C=r.onRecoverableError),r.formState!==void 0&&(B=r.formState)),i=F_(e,1,!0,i,r??null,l,f,B,d,M,C,K_),i.context=B_(null),r=i.current,l=pi(),l=po(l),f=Za(l),f.callback=null,Ka(r,f,l),r=l,i.current.lanes=r,kt(i,r),Zi(i),e[Zn]=i.current,Rh(e),new Hu(i)},sl.version="19.2.3",sl}var rv;function $M(){if(rv)return Kh.exports;rv=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),Kh.exports=jM(),Kh.exports}var tE=$M();var Bp=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Rx=/^[\\/]{2}/;function eE(s,t){return t+s.replace(/\\/g,"/")}var ov="popstate";function lv(s){return typeof s=="object"&&s!=null&&"pathname"in s&&"search"in s&&"hash"in s&&"state"in s&&"key"in s}function nE(s={}){function t(a,o){let u=o.state?.masked,{pathname:c,search:h,hash:m}=u||a.location;return Bd("",{pathname:c,search:h,hash:m},o.state&&o.state.usr||null,o.state&&o.state.key||"default",u?{pathname:a.location.pathname,search:a.location.search,hash:a.location.hash}:void 0)}function n(a,o){return typeof o=="string"?o:yl(o)}return aE(t,n,null,s)}function sn(s,t){if(s===!1||s===null||typeof s>"u")throw new Error(t)}function ia(s,t){if(!s){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function iE(){return Math.random().toString(36).substring(2,10)}function uv(s,t){return{usr:s.state,key:s.key,idx:t,masked:s.mask?{pathname:s.pathname,search:s.search,hash:s.hash}:void 0}}function Bd(s,t,n=null,a,o){return{pathname:typeof s=="string"?s:s.pathname,search:"",hash:"",...typeof t=="string"?lo(t):t,state:n,key:t&&t.key||a||iE(),mask:o}}function yl({pathname:s="/",search:t="",hash:n=""}){return t&&t!=="?"&&(s+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(s+=n.charAt(0)==="#"?n:"#"+n),s}function lo(s){let t={};if(s){let n=s.indexOf("#");n>=0&&(t.hash=s.substring(n),s=s.substring(0,n));let a=s.indexOf("?");a>=0&&(t.search=s.substring(a),s=s.substring(0,a)),s&&(t.pathname=s)}return t}function aE(s,t,n,a={}){let{window:o=document.defaultView,v5Compat:u=!1}=a,c=o.history,h="POP",m=null,p=g();p==null&&(p=0,c.replaceState({...c.state,idx:p},""));function g(){return(c.state||{idx:null}).idx}function _(){h="POP";let x=g(),y=x==null?null:x-p;p=x,m&&m({action:h,location:w.location,delta:y})}function v(x,y){h="PUSH";let U=lv(x)?x:Bd(w.location,x,y);p=g()+1;let D=uv(U,p),A=w.createHref(U.mask||U);try{c.pushState(D,"",A)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;o.location.assign(A)}u&&m&&m({action:h,location:w.location,delta:1})}function S(x,y){h="REPLACE";let U=lv(x)?x:Bd(w.location,x,y);p=g();let D=uv(U,p),A=w.createHref(U.mask||U);c.replaceState(D,"",A),u&&m&&m({action:h,location:w.location,delta:0})}function E(x){return sE(o,x)}let w={get action(){return h},get location(){return s(o,c)},listen(x){if(m)throw new Error("A history only accepts one active listener");return o.addEventListener(ov,_),m=x,()=>{o.removeEventListener(ov,_),m=null}},createHref(x){return t(o,x)},createURL:E,encodeLocation(x){let y=E(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:v,replace:S,go(x){return c.go(x)}};return w}function sE(s,t,n=!1){let a="http://localhost";s&&(a=s.location.origin!=="null"?s.location.origin:s.location.href),sn(a,"No window.location.(origin|href) available to create URL");let o=typeof t=="string"?t:yl(t);return o=o.replace(/ $/,"%20"),!n&&Rx.test(o)&&(o=a+o),new URL(o,a)}function Cx(s,t,n="/"){return rE(s,t,n,!1)}function rE(s,t,n,a,o){let u=typeof t=="string"?lo(t):t,c=Na(u.pathname||"/",n);if(c==null)return null;let h=oE(s),m=null,p=vE(c);for(let g=0;m==null&&g<h.length;++g)m=_E(h[g],p,a);return m}function oE(s){let t=wx(s);return lE(t),t}function wx(s,t=[],n=[],a="",o=!1){let u=(c,h,m=o,p)=>{let g={relativePath:p===void 0?c.path||"":p,caseSensitive:c.caseSensitive===!0,childrenIndex:h,route:c};if(g.relativePath.startsWith("/")){if(!g.relativePath.startsWith(a)&&m)return;sn(g.relativePath.startsWith(a),`Absolute route path "${g.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),g.relativePath=g.relativePath.slice(a.length)}let _=Vi([a,g.relativePath]),v=n.concat(g);c.children&&c.children.length>0&&(sn(c.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${_}".`),wx(c.children,t,v,_,m)),!(c.path==null&&!c.index)&&t.push({path:_,score:mE(_,c.index),routesMeta:v.map((S,E)=>{let[w,x]=Lx(S.relativePath,S.caseSensitive,E===v.length-1);return{...S,matcher:w,compiledParams:x}})})};return s.forEach((c,h)=>{if(c.path===""||!c.path?.includes("?"))u(c,h);else for(let m of Dx(c.path))u(c,h,!0,m)}),t}function Dx(s){let t=s.split("/");if(t.length===0)return[];let[n,...a]=t,o=n.endsWith("?"),u=n.replace(/\?$/,"");if(a.length===0)return o?[u,""]:[u];let c=Dx(a.join("/")),h=[];return h.push(...c.map(m=>m===""?u:[u,m].join("/"))),o&&h.push(...c),h.map(m=>s.startsWith("/")&&m===""?"/":m)}function lE(s){s.sort((t,n)=>t.score!==n.score?n.score-t.score:gE(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var uE=/^:[\w-]+$/,cE=3,fE=2,hE=1,dE=10,pE=-2,cv=s=>s==="*";function mE(s,t){let n=s.split("/"),a=n.length;return n.some(cv)&&(a+=pE),t&&(a+=fE),n.filter(o=>!cv(o)).reduce((o,u)=>o+(uE.test(u)?cE:u===""?hE:dE),a)}function gE(s,t){return s.length===t.length&&s.slice(0,-1).every((a,o)=>a===t[o])?s[s.length-1]-t[t.length-1]:0}function _E(s,t,n=!1){let{routesMeta:a}=s,o={},u="/",c=[];for(let h=0;h<a.length;++h){let m=a[h],p=h===a.length-1,g=u==="/"?t:t.slice(u.length)||"/",_={path:m.relativePath,caseSensitive:m.caseSensitive,end:p},v=m.matcher&&m.compiledParams?Ux(_,g,m.matcher,m.compiledParams):Tc(_,g),S=m.route;if(!v&&p&&n&&!a[a.length-1].route.index&&(v=Tc({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},g)),!v)return null;Object.assign(o,v.params),c.push({params:o,pathname:Vi([u,v.pathname]),pathnameBase:SE(Vi([u,v.pathnameBase])),route:S}),v.pathnameBase!=="/"&&(u=Vi([u,v.pathnameBase]))}return c}function Tc(s,t){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[n,a]=Lx(s.path,s.caseSensitive,s.end);return Ux(s,t,n,a)}function Ux(s,t,n,a){let o=t.match(n);if(!o)return null;let u=o[0],c=u.replace(/(.)\/+$/,"$1"),h=o.slice(1);return{params:a.reduce((p,{paramName:g,isOptional:_},v)=>{if(g==="*"){let E=h[v]||"";c=u.slice(0,u.length-E.length).replace(/(.)\/+$/,"$1")}const S=h[v];return _&&!S?p[g]=void 0:p[g]=(S||"").replace(/%2F/g,"/"),p},{}),pathname:u,pathnameBase:c,pattern:s}}function Lx(s,t=!1,n=!0){ia(s==="*"||!s.endsWith("*")||s.endsWith("/*"),`Route path "${s}" will be treated as if it were "${s.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/,"/*")}".`);let a=[],o="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(c,h,m,p,g)=>{if(a.push({paramName:h,isOptional:m!=null}),m){let _=g.charAt(p+c.length);return _&&_!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return s.endsWith("*")?(a.push({paramName:"*"}),o+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":s!==""&&s!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),a]}function vE(s){try{return s.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ia(!1,`The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),s}}function Na(s,t){if(t==="/")return s;if(!s.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=s.charAt(n);return a&&a!=="/"?null:s.slice(n)||"/"}function xE(s,t="/"){let{pathname:n,search:a="",hash:o=""}=typeof s=="string"?lo(s):s,u;return n?(n=Px(n),n.startsWith("/")?u=fv(n.substring(1),"/"):u=fv(n,t)):u=t,{pathname:u,search:ME(a),hash:EE(o)}}function fv(s,t){let n=Ac(t).split("/");return s.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function $h(s,t,n,a){return`Cannot include a '${s}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function yE(s){return s.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Nx(s){let t=yE(s);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function Hp(s,t,n,a=!1){let o;typeof s=="string"?o=lo(s):(o={...s},sn(!o.pathname||!o.pathname.includes("?"),$h("?","pathname","search",o)),sn(!o.pathname||!o.pathname.includes("#"),$h("#","pathname","hash",o)),sn(!o.search||!o.search.includes("#"),$h("#","search","hash",o)));let u=s===""||o.pathname==="",c=u?"/":o.pathname,h;if(c==null)h=n;else{let _=t.length-1;if(!a&&c.startsWith("..")){let v=c.split("/");for(;v[0]==="..";)v.shift(),_-=1;o.pathname=v.join("/")}h=_>=0?t[_]:"/"}let m=xE(o,h),p=c&&c!=="/"&&c.endsWith("/"),g=(u||c===".")&&n.endsWith("/");return!m.pathname.endsWith("/")&&(p||g)&&(m.pathname+="/"),m}var Px=s=>s.replace(/[\\/]{2,}/g,"/"),Vi=s=>Px(s.join("/")),Ac=s=>s.replace(/\/+$/,""),SE=s=>Ac(s).replace(/^\/*/,"/"),ME=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,EE=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s,bE=class{constructor(s,t,n,a=!1){this.status=s,this.statusText=t||"",this.internal=a,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function TE(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}function AE(s){let t=s.map(n=>n.route.path).filter(Boolean);return Vi(t)||"/"}var Ox=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function zx(s,t){let n=s;if(typeof n!="string"||!Bp.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let a=n,o=!1;if(Ox)try{let u=new URL(window.location.href),c=Rx.test(n)?new URL(eE(n,u.protocol)):new URL(n),h=Na(c.pathname,t);c.origin===u.origin&&h!=null?n=h+c.search+c.hash:o=!0}catch{ia(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:a,isExternal:o,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Ix=["POST","PUT","PATCH","DELETE"];new Set(Ix);var RE=["GET",...Ix];new Set(RE);var CE=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function wE(s){try{return CE.includes(new URL(s).protocol)}catch{return!1}}var uo=xt.createContext(null);uo.displayName="DataRouter";var Oc=xt.createContext(null);Oc.displayName="DataRouterState";var Fx=xt.createContext(!1);function DE(){return xt.useContext(Fx)}var Bx=xt.createContext({isTransitioning:!1});Bx.displayName="ViewTransition";var UE=xt.createContext(new Map);UE.displayName="Fetchers";var LE=xt.createContext(null);LE.displayName="Await";var Di=xt.createContext(null);Di.displayName="Navigation";var Rl=xt.createContext(null);Rl.displayName="Location";var za=xt.createContext({outlet:null,matches:[],isDataRoute:!1});za.displayName="Route";var Gp=xt.createContext(null);Gp.displayName="RouteError";var Hx="REACT_ROUTER_ERROR",NE="REDIRECT",PE="ROUTE_ERROR_RESPONSE";function OE(s){if(s.startsWith(`${Hx}:${NE}:{`))try{let t=JSON.parse(s.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function zE(s){if(s.startsWith(`${Hx}:${PE}:{`))try{let t=JSON.parse(s.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new bE(t.status,t.statusText,t.data)}catch{}}function IE(s,{relative:t}={}){sn(Cl(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=xt.useContext(Di),{hash:o,pathname:u,search:c}=wl(s,{relative:t}),h=u;return n!=="/"&&(h=u==="/"?n:Vi([n,u])),a.createHref({pathname:h,search:c,hash:o})}function Cl(){return xt.useContext(Rl)!=null}function Ia(){return sn(Cl(),"useLocation() may be used only in the context of a <Router> component."),xt.useContext(Rl).location}var Gx="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Vx(s){xt.useContext(Di).static||xt.useLayoutEffect(s)}function FE(){let{isDataRoute:s}=xt.useContext(za);return s?QE():BE()}function BE(){sn(Cl(),"useNavigate() may be used only in the context of a <Router> component.");let s=xt.useContext(uo),{basename:t,navigator:n}=xt.useContext(Di),{matches:a}=xt.useContext(za),{pathname:o}=Ia(),u=JSON.stringify(Nx(a)),c=xt.useRef(!1);return Vx(()=>{c.current=!0}),xt.useCallback((m,p={})=>{if(ia(c.current,Gx),!c.current)return;if(typeof m=="number"){n.go(m);return}let g=Hp(m,JSON.parse(u),o,p.relative==="path");s==null&&t!=="/"&&(g.pathname=g.pathname==="/"?t:Vi([t,g.pathname])),(p.replace?n.replace:n.push)(g,p.state,p)},[t,n,u,o,s])}xt.createContext(null);function wl(s,{relative:t}={}){let{matches:n}=xt.useContext(za),{pathname:a}=Ia(),o=JSON.stringify(Nx(n));return xt.useMemo(()=>Hp(s,JSON.parse(o),a,t==="path"),[s,o,a,t])}function HE(s,t){return kx(s,t)}function kx(s,t,n){sn(Cl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=xt.useContext(Di),{matches:o}=xt.useContext(za),u=o[o.length-1],c=u?u.params:{},h=u?u.pathname:"/",m=u?u.pathnameBase:"/",p=u&&u.route;{let x=p&&p.path||"";Wx(h,!p||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let g=Ia(),_;if(t){let x=typeof t=="string"?lo(t):t;sn(m==="/"||x.pathname?.startsWith(m),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${x.pathname}" was given in the \`location\` prop.`),_=x}else _=g;let v=_.pathname||"/",S=v;if(m!=="/"){let x=m.replace(/^\//,"").split("/");S="/"+v.replace(/^\//,"").split("/").slice(x.length).join("/")}let E=n&&n.state.matches.length?n.state.matches.map(x=>Object.assign(x,{route:n.manifest[x.route.id]||x.route})):Cx(s,{pathname:S});ia(p||E!=null,`No routes matched location "${_.pathname}${_.search}${_.hash}" `),ia(E==null||E[E.length-1].route.element!==void 0||E[E.length-1].route.Component!==void 0||E[E.length-1].route.lazy!==void 0,`Matched leaf route at location "${_.pathname}${_.search}${_.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let w=WE(E&&E.map(x=>Object.assign({},x,{params:Object.assign({},c,x.params),pathname:Vi([m,a.encodeLocation?a.encodeLocation(x.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?m:Vi([m,a.encodeLocation?a.encodeLocation(x.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathnameBase])})),o,n);return t&&w?xt.createElement(Rl.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,..._},navigationType:"POP"}},w):w}function GE(){let s=JE(),t=TE(s)?`${s.status} ${s.statusText}`:s instanceof Error?s.message:JSON.stringify(s),n=s instanceof Error?s.stack:null,a="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:a},u={padding:"2px 4px",backgroundColor:a},c=null;return console.error("Error handled by React Router default ErrorBoundary:",s),c=xt.createElement(xt.Fragment,null,xt.createElement("p",null,"💿 Hey developer 👋"),xt.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",xt.createElement("code",{style:u},"ErrorBoundary")," or"," ",xt.createElement("code",{style:u},"errorElement")," prop on your route.")),xt.createElement(xt.Fragment,null,xt.createElement("h2",null,"Unexpected Application Error!"),xt.createElement("h3",{style:{fontStyle:"italic"}},t),n?xt.createElement("pre",{style:o},n):null,c)}var VE=xt.createElement(GE,null),Xx=class extends xt.Component{constructor(s){super(s),this.state={location:s.location,revalidation:s.revalidation,error:s.error}}static getDerivedStateFromError(s){return{error:s}}static getDerivedStateFromProps(s,t){return t.location!==s.location||t.revalidation!=="idle"&&s.revalidation==="idle"?{error:s.error,location:s.location,revalidation:s.revalidation}:{error:s.error!==void 0?s.error:t.error,location:t.location,revalidation:s.revalidation||t.revalidation}}componentDidCatch(s,t){this.props.onError?this.props.onError(s,t):console.error("React Router caught the following error during render",s)}render(){let s=this.state.error;if(this.context&&typeof s=="object"&&s&&"digest"in s&&typeof s.digest=="string"){const n=zE(s.digest);n&&(s=n)}let t=s!==void 0?xt.createElement(za.Provider,{value:this.props.routeContext},xt.createElement(Gp.Provider,{value:s,children:this.props.component})):this.props.children;return this.context?xt.createElement(kE,{error:s},t):t}};Xx.contextType=Fx;var td=new WeakMap;function kE({children:s,error:t}){let{basename:n}=xt.useContext(Di);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let a=OE(t.digest);if(a){let o=td.get(t);if(o)throw o;let u=zx(a.location,n),c=u.absoluteURL||u.to;if(wE(c))throw new Error("Invalid redirect location");if(Ox&&!td.get(t))if(u.isExternal||a.reloadDocument)window.location.href=c;else{const h=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(u.to,{replace:a.replace}));throw td.set(t,h),h}return xt.createElement("meta",{httpEquiv:"refresh",content:`0;url=${c}`})}}return s}function XE({routeContext:s,match:t,children:n}){let a=xt.useContext(uo);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),xt.createElement(za.Provider,{value:s},n)}function WE(s,t=[],n){let a=n?.state;if(s==null){if(!a)return null;if(a.errors)s=a.matches;else if(t.length===0&&!a.initialized&&a.matches.length>0)s=a.matches;else return null}let o=s,u=a?.errors;if(u!=null){let g=o.findIndex(_=>_.route.id&&u?.[_.route.id]!==void 0);sn(g>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),o=o.slice(0,Math.min(o.length,g+1))}let c=!1,h=-1;if(n&&a){c=a.renderFallback;for(let g=0;g<o.length;g++){let _=o[g];if((_.route.HydrateFallback||_.route.hydrateFallbackElement)&&(h=g),_.route.id){let{loaderData:v,errors:S}=a,E=_.route.loader&&!v.hasOwnProperty(_.route.id)&&(!S||S[_.route.id]===void 0);if(_.route.lazy||E){n.isStatic&&(c=!0),h>=0?o=o.slice(0,h+1):o=[o[0]];break}}}}let m=n?.onError,p=a&&m?(g,_)=>{m(g,{location:a.location,params:a.matches?.[0]?.params??{},pattern:AE(a.matches),errorInfo:_})}:void 0;return o.reduceRight((g,_,v)=>{let S,E=!1,w=null,x=null;a&&(S=u&&_.route.id?u[_.route.id]:void 0,w=_.route.errorElement||VE,c&&(h<0&&v===0?(Wx("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),E=!0,x=null):h===v&&(E=!0,x=_.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,v+1)),U=()=>{let D;return S?D=w:E?D=x:_.route.Component?D=xt.createElement(_.route.Component,null):_.route.element?D=_.route.element:D=g,xt.createElement(XE,{match:_,routeContext:{outlet:g,matches:y,isDataRoute:a!=null},children:D})};return a&&(_.route.ErrorBoundary||_.route.errorElement||v===0)?xt.createElement(Xx,{location:a.location,revalidation:a.revalidation,component:w,error:S,children:U(),routeContext:{outlet:null,matches:y,isDataRoute:!0},onError:p}):U()},null)}function Vp(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function qE(s){let t=xt.useContext(uo);return sn(t,Vp(s)),t}function YE(s){let t=xt.useContext(Oc);return sn(t,Vp(s)),t}function ZE(s){let t=xt.useContext(za);return sn(t,Vp(s)),t}function kp(s){let t=ZE(s),n=t.matches[t.matches.length-1];return sn(n.route.id,`${s} can only be used on routes that contain a unique "id"`),n.route.id}function KE(){return kp("useRouteId")}function JE(){let s=xt.useContext(Gp),t=YE("useRouteError"),n=kp("useRouteError");return s!==void 0?s:t.errors?.[n]}function QE(){let{router:s}=qE("useNavigate"),t=kp("useNavigate"),n=xt.useRef(!1);return Vx(()=>{n.current=!0}),xt.useCallback(async(o,u={})=>{ia(n.current,Gx),n.current&&(typeof o=="number"?await s.navigate(o):await s.navigate(o,{fromRouteId:t,...u}))},[s,t])}var hv={};function Wx(s,t,n){!t&&!hv[s]&&(hv[s]=!0,ia(!1,n))}xt.memo(jE);function jE({routes:s,manifest:t,future:n,state:a,isStatic:o,onError:u}){return kx(s,void 0,{manifest:t,state:a,isStatic:o,onError:u})}function qx(s){sn(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function $E({basename:s="/",children:t=null,location:n,navigationType:a="POP",navigator:o,static:u=!1,useTransitions:c}){sn(!Cl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let h=s.replace(/^\/*/,"/"),m=xt.useMemo(()=>({basename:h,navigator:o,static:u,useTransitions:c,future:{}}),[h,o,u,c]);typeof n=="string"&&(n=lo(n));let{pathname:p="/",search:g="",hash:_="",state:v=null,key:S="default",mask:E}=n,w=xt.useMemo(()=>{let x=Na(p,h);return x==null?null:{location:{pathname:x,search:g,hash:_,state:v,key:S,mask:E},navigationType:a}},[h,p,g,_,v,S,a,E]);return ia(w!=null,`<Router basename="${h}"> is not able to match the URL "${p}${g}${_}" because it does not start with the basename, so the <Router> won't render anything.`),w==null?null:xt.createElement(Di.Provider,{value:m},xt.createElement(Rl.Provider,{children:t,value:w}))}function tb({children:s,location:t}){return HE(Hd(s),t)}function Hd(s,t=[]){let n=[];return xt.Children.forEach(s,(a,o)=>{if(!xt.isValidElement(a))return;let u=[...t,o];if(a.type===xt.Fragment){n.push.apply(n,Hd(a.props.children,u));return}sn(a.type===qx,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),sn(!a.props.index||!a.props.children,"An index route cannot have child routes.");let c={id:a.props.id||u.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(c.children=Hd(a.props.children,u)),n.push(c)}),n}var gc="get",_c="application/x-www-form-urlencoded";function zc(s){return typeof HTMLElement<"u"&&s instanceof HTMLElement}function eb(s){return zc(s)&&s.tagName.toLowerCase()==="button"}function nb(s){return zc(s)&&s.tagName.toLowerCase()==="form"}function ib(s){return zc(s)&&s.tagName.toLowerCase()==="input"}function ab(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function sb(s,t){return s.button===0&&(!t||t==="_self")&&!ab(s)}var Vu=null;function rb(){if(Vu===null)try{new FormData(document.createElement("form"),0),Vu=!1}catch{Vu=!0}return Vu}var ob=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ed(s){return s!=null&&!ob.has(s)?(ia(!1,`"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${_c}"`),null):s}function lb(s,t){let n,a,o,u,c;if(nb(s)){let h=s.getAttribute("action");a=h?Na(h,t):null,n=s.getAttribute("method")||gc,o=ed(s.getAttribute("enctype"))||_c,u=new FormData(s)}else if(eb(s)||ib(s)&&(s.type==="submit"||s.type==="image")){let h=s.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=s.getAttribute("formaction")||h.getAttribute("action");if(a=m?Na(m,t):null,n=s.getAttribute("formmethod")||h.getAttribute("method")||gc,o=ed(s.getAttribute("formenctype"))||ed(h.getAttribute("enctype"))||_c,u=new FormData(h,s),!rb()){let{name:p,type:g,value:_}=s;if(g==="image"){let v=p?`${p}.`:"";u.append(`${v}x`,"0"),u.append(`${v}y`,"0")}else p&&u.append(p,_)}}else{if(zc(s))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=gc,a=null,o=_c,c=s}return u&&o==="text/plain"&&(c=u,u=void 0),{action:a,method:n.toLowerCase(),encType:o,formData:u,body:c}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Xp(s,t){if(s===!1||s===null||typeof s>"u")throw new Error(t)}function Yx(s,t,n,a){let o=typeof s=="string"?new URL(s,typeof window>"u"?"server://singlefetch/":window.location.origin):s;return n?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${a}`:o.pathname=`${o.pathname}.${a}`:o.pathname==="/"?o.pathname=`_root.${a}`:t&&Na(o.pathname,t)==="/"?o.pathname=`${Ac(t)}/_root.${a}`:o.pathname=`${Ac(o.pathname)}.${a}`,o}async function ub(s,t){if(s.id in t)return t[s.id];try{let n=await import(s.module);return t[s.id]=n,n}catch(n){return console.error(`Error loading route module \`${s.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function cb(s){return s==null?!1:s.href==null?s.rel==="preload"&&typeof s.imageSrcSet=="string"&&typeof s.imageSizes=="string":typeof s.rel=="string"&&typeof s.href=="string"}async function fb(s,t,n){let a=await Promise.all(s.map(async o=>{let u=t.routes[o.route.id];if(u){let c=await ub(u,n);return c.links?c.links():[]}return[]}));return mb(a.flat(1).filter(cb).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function dv(s,t,n,a,o,u){let c=(m,p)=>n[p]?m.route.id!==n[p].route.id:!0,h=(m,p)=>n[p].pathname!==m.pathname||n[p].route.path?.endsWith("*")&&n[p].params["*"]!==m.params["*"];return u==="assets"?t.filter((m,p)=>c(m,p)||h(m,p)):u==="data"?t.filter((m,p)=>{let g=a.routes[m.route.id];if(!g||!g.hasLoader)return!1;if(c(m,p)||h(m,p))return!0;if(m.route.shouldRevalidate){let _=m.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(s,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof _=="boolean")return _}return!0}):[]}function hb(s,t,{includeHydrateFallback:n}={}){return db(s.map(a=>{let o=t.routes[a.route.id];if(!o)return[];let u=[o.module];return o.clientActionModule&&(u=u.concat(o.clientActionModule)),o.clientLoaderModule&&(u=u.concat(o.clientLoaderModule)),n&&o.hydrateFallbackModule&&(u=u.concat(o.hydrateFallbackModule)),o.imports&&(u=u.concat(o.imports)),u}).flat(1))}function db(s){return[...new Set(s)]}function pb(s){let t={},n=Object.keys(s).sort();for(let a of n)t[a]=s[a];return t}function mb(s,t){let n=new Set;return new Set(t),s.reduce((a,o)=>{let u=JSON.stringify(pb(o));return n.has(u)||(n.add(u),a.push({key:u,link:o})),a},[])}function Wp(){let s=xt.useContext(uo);return Xp(s,"You must render this element inside a <DataRouterContext.Provider> element"),s}function gb(){let s=xt.useContext(Oc);return Xp(s,"You must render this element inside a <DataRouterStateContext.Provider> element"),s}var qp=xt.createContext(void 0);qp.displayName="FrameworkContext";function Ic(){let s=xt.useContext(qp);return Xp(s,"You must render this element inside a <HydratedRouter> element"),s}function _b(s,t){let n=xt.useContext(qp),[a,o]=xt.useState(!1),[u,c]=xt.useState(!1),{onFocus:h,onBlur:m,onMouseEnter:p,onMouseLeave:g,onTouchStart:_}=t,v=xt.useRef(null);xt.useEffect(()=>{if(s==="render"&&c(!0),s==="viewport"){let w=y=>{y.forEach(U=>{c(U.isIntersecting)})},x=new IntersectionObserver(w,{threshold:.5});return v.current&&x.observe(v.current),()=>{x.disconnect()}}},[s]),xt.useEffect(()=>{if(a){let w=setTimeout(()=>{c(!0)},100);return()=>{clearTimeout(w)}}},[a]);let S=()=>{o(!0)},E=()=>{o(!1),c(!1)};return n?s!=="intent"?[u,v,{}]:[u,v,{onFocus:rl(h,S),onBlur:rl(m,E),onMouseEnter:rl(p,S),onMouseLeave:rl(g,E),onTouchStart:rl(_,S)}]:[!1,v,{}]}function rl(s,t){return n=>{s&&s(n),n.defaultPrevented||t(n)}}function vb({page:s,...t}){let n=DE(),{nonce:a}=Ic(),{router:o}=Wp(),u=xt.useMemo(()=>Cx(o.routes,s,o.basename),[o.routes,s,o.basename]);return u?(t.nonce==null&&a&&(t={...t,nonce:a}),n?xt.createElement(yb,{page:s,matches:u,...t}):xt.createElement(Sb,{page:s,matches:u,...t})):null}function xb(s){let{manifest:t,routeModules:n}=Ic(),[a,o]=xt.useState([]);return xt.useEffect(()=>{let u=!1;return fb(s,t,n).then(c=>{u||o(c)}),()=>{u=!0}},[s,t,n]),a}function yb({page:s,matches:t,...n}){let a=Ia(),{future:o}=Ic(),{basename:u}=Wp(),c=xt.useMemo(()=>{if(s===a.pathname+a.search+a.hash)return[];let h=Yx(s,u,o.v8_trailingSlashAwareDataRequests,"rsc"),m=!1,p=[];for(let g of t)typeof g.route.shouldRevalidate=="function"?m=!0:p.push(g.route.id);return m&&p.length>0&&h.searchParams.set("_routes",p.join(",")),[h.pathname+h.search]},[u,o.v8_trailingSlashAwareDataRequests,s,a,t]);return xt.createElement(xt.Fragment,null,c.map(h=>xt.createElement("link",{key:h,rel:"prefetch",as:"fetch",href:h,...n})))}function Sb({page:s,matches:t,...n}){let a=Ia(),{future:o,manifest:u,routeModules:c}=Ic(),{basename:h}=Wp(),{loaderData:m,matches:p}=gb(),g=xt.useMemo(()=>dv(s,t,p,u,a,"data"),[s,t,p,u,a]),_=xt.useMemo(()=>dv(s,t,p,u,a,"assets"),[s,t,p,u,a]),v=xt.useMemo(()=>{if(s===a.pathname+a.search+a.hash)return[];let w=new Set,x=!1;if(t.forEach(U=>{let D=u.routes[U.route.id];!D||!D.hasLoader||(!g.some(A=>A.route.id===U.route.id)&&U.route.id in m&&c[U.route.id]?.shouldRevalidate||D.hasClientLoader?x=!0:w.add(U.route.id))}),w.size===0)return[];let y=Yx(s,h,o.v8_trailingSlashAwareDataRequests,"data");return x&&w.size>0&&y.searchParams.set("_routes",t.filter(U=>w.has(U.route.id)).map(U=>U.route.id).join(",")),[y.pathname+y.search]},[h,o.v8_trailingSlashAwareDataRequests,m,a,u,g,t,s,c]),S=xt.useMemo(()=>hb(_,u),[_,u]),E=xb(_);return xt.createElement(xt.Fragment,null,v.map(w=>xt.createElement("link",{key:w,rel:"prefetch",as:"fetch",href:w,...n})),S.map(w=>xt.createElement("link",{key:w,rel:"modulepreload",href:w,...n})),E.map(({key:w,link:x})=>xt.createElement("link",{key:w,nonce:n.nonce,...x,crossOrigin:x.crossOrigin??n.crossOrigin})))}function Mb(...s){return t=>{s.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Eb=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Eb&&(window.__reactRouterVersion="7.18.2")}catch{}function bb({basename:s,children:t,useTransitions:n,window:a}){let o=xt.useRef();o.current==null&&(o.current=nE({window:a,v5Compat:!0}));let u=o.current,[c,h]=xt.useState({action:u.action,location:u.location}),m=xt.useCallback(p=>{n===!1?h(p):xt.startTransition(()=>h(p))},[n]);return xt.useLayoutEffect(()=>u.listen(m),[u,m]),xt.createElement($E,{basename:s,children:t,location:c.location,navigationType:c.action,navigator:u,useTransitions:n})}var Yp=xt.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:o,reloadDocument:u,replace:c,mask:h,state:m,target:p,to:g,preventScrollReset:_,viewTransition:v,defaultShouldRevalidate:S,...E},w){let{basename:x,navigator:y,useTransitions:U}=xt.useContext(Di),D=typeof g=="string"&&Bp.test(g),A=zx(g,x);g=A.to;let O=IE(g,{relative:o}),L=Ia(),I=null;if(h){let J=Hp(h,[],L.mask?L.mask.pathname:"/",!0);x!=="/"&&(J.pathname=J.pathname==="/"?x:Vi([x,J.pathname])),I=y.createHref(J)}let[T,N,W]=_b(a,E),G=Cb(g,{replace:c,mask:h,state:m,target:p,preventScrollReset:_,relative:o,viewTransition:v,defaultShouldRevalidate:S,useTransitions:U});function q(J){t&&t(J),J.defaultPrevented||G(J)}let ht=!(A.isExternal||u),pt=xt.createElement("a",{...E,...W,href:(ht?I:void 0)||A.absoluteURL||O,onClick:ht?q:t,ref:Mb(w,N),target:p,"data-discover":!D&&n==="render"?"true":void 0});return T&&!D?xt.createElement(xt.Fragment,null,pt,xt.createElement(vb,{page:O})):pt});Yp.displayName="Link";var Tb=xt.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:o=!1,style:u,to:c,viewTransition:h,children:m,...p},g){let _=wl(c,{relative:p.relative}),v=Ia(),S=xt.useContext(Oc),{navigator:E,basename:w}=xt.useContext(Di),x=S!=null&&Nb(_)&&h===!0,y=E.encodeLocation?E.encodeLocation(_).pathname:_.pathname,U=v.pathname,D=S&&S.navigation&&S.navigation.location?S.navigation.location.pathname:null;n||(U=U.toLowerCase(),D=D?D.toLowerCase():null,y=y.toLowerCase()),D&&w&&(D=Na(D,w)||D);const A=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let O=U===y||!o&&U.startsWith(y)&&U.charAt(A)==="/",L=D!=null&&(D===y||!o&&D.startsWith(y)&&D.charAt(y.length)==="/"),I={isActive:O,isPending:L,isTransitioning:x},T=O?t:void 0,N;typeof a=="function"?N=a(I):N=[a,O?"active":null,L?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let W=typeof u=="function"?u(I):u;return xt.createElement(Yp,{...p,"aria-current":T,className:N,ref:g,style:W,to:c,viewTransition:h},typeof m=="function"?m(I):m)});Tb.displayName="NavLink";var Ab=xt.forwardRef(({discover:s="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:o,state:u,method:c=gc,action:h,onSubmit:m,relative:p,preventScrollReset:g,viewTransition:_,defaultShouldRevalidate:v,...S},E)=>{let{useTransitions:w}=xt.useContext(Di),x=Ub(),y=Lb(h,{relative:p}),U=c.toLowerCase()==="get"?"get":"post",D=typeof h=="string"&&Bp.test(h),A=O=>{if(m&&m(O),O.defaultPrevented)return;O.preventDefault();let L=O.nativeEvent.submitter,I=L?.getAttribute("formmethod")||c,T=()=>x(L||O.currentTarget,{fetcherKey:t,method:I,navigate:n,replace:o,state:u,relative:p,preventScrollReset:g,viewTransition:_,defaultShouldRevalidate:v});w&&n!==!1?xt.startTransition(()=>T()):T()};return xt.createElement("form",{ref:E,method:U,action:y,onSubmit:a?m:A,...S,"data-discover":!D&&s==="render"?"true":void 0})});Ab.displayName="Form";function Rb(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Zx(s){let t=xt.useContext(uo);return sn(t,Rb(s)),t}function Cb(s,{target:t,replace:n,mask:a,state:o,preventScrollReset:u,relative:c,viewTransition:h,defaultShouldRevalidate:m,useTransitions:p}={}){let g=FE(),_=Ia(),v=wl(s,{relative:c});return xt.useCallback(S=>{if(sb(S,t)){S.preventDefault();let E=n!==void 0?n:yl(_)===yl(v),w=()=>g(s,{replace:E,mask:a,state:o,preventScrollReset:u,relative:c,viewTransition:h,defaultShouldRevalidate:m});p?xt.startTransition(()=>w()):w()}},[_,g,v,n,a,o,t,s,u,c,h,m,p])}var wb=0,Db=()=>`__${String(++wb)}__`;function Ub(){let{router:s}=Zx("useSubmit"),{basename:t}=xt.useContext(Di),n=KE(),a=s.fetch,o=s.navigate;return xt.useCallback(async(u,c={})=>{let{action:h,method:m,encType:p,formData:g,body:_}=lb(u,t);if(c.navigate===!1){let v=c.fetcherKey||Db();await a(v,n,c.action||h,{defaultShouldRevalidate:c.defaultShouldRevalidate,preventScrollReset:c.preventScrollReset,formData:g,body:_,formMethod:c.method||m,formEncType:c.encType||p,flushSync:c.flushSync})}else await o(c.action||h,{defaultShouldRevalidate:c.defaultShouldRevalidate,preventScrollReset:c.preventScrollReset,formData:g,body:_,formMethod:c.method||m,formEncType:c.encType||p,replace:c.replace,state:c.state,fromRouteId:n,flushSync:c.flushSync,viewTransition:c.viewTransition})},[a,o,t,n])}function Lb(s,{relative:t}={}){let{basename:n}=xt.useContext(Di),a=xt.useContext(za);sn(a,"useFormAction must be used inside a RouteContext");let[o]=a.matches.slice(-1),u={...wl(s||".",{relative:t})},c=Ia();if(s==null){u.search=c.search;let h=new URLSearchParams(u.search),m=h.getAll("index");if(m.some(g=>g==="")){h.delete("index"),m.filter(_=>_).forEach(_=>h.append("index",_));let g=h.toString();u.search=g?`?${g}`:""}}return(!s||s===".")&&o.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(u.pathname=u.pathname==="/"?n:Vi([n,u.pathname])),yl(u)}function Nb(s,{relative:t}={}){let n=xt.useContext(Bx);sn(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=Zx("useViewTransitionState"),o=wl(s,{relative:t});if(!n.isTransitioning)return!1;let u=Na(n.currentLocation.pathname,a)||n.currentLocation.pathname,c=Na(n.nextLocation.pathname,a)||n.nextLocation.pathname;return Tc(o.pathname,c)!=null||Tc(o.pathname,u)!=null}const Zp="185",jr={ROTATE:0,DOLLY:1,PAN:2},Jr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Pb=0,pv=1,Ob=2,vc=1,Kx=2,pl=3,Es=0,qn=1,Bi=2,Ua=0,$r=1,mv=2,gv=3,_v=4,zb=5,Qs=100,Ib=101,Fb=102,Bb=103,Hb=104,Gb=200,Vb=201,kb=202,Xb=203,Gd=204,Vd=205,Wb=206,qb=207,Yb=208,Zb=209,Kb=210,Jb=211,Qb=212,jb=213,$b=214,kd=0,Xd=1,Wd=2,io=3,qd=4,Yd=5,Zd=6,Kd=7,Jx=0,tT=1,eT=2,ea=0,Qx=1,jx=2,$x=3,Kp=4,ty=5,ey=6,ny=7,iy=300,er=301,ao=302,nd=303,id=304,Fc=306,Jd=1e3,Da=1001,Qd=1002,On=1003,nT=1004,ku=1005,Vn=1006,ad=1007,$s=1008,vi=1009,ay=1010,sy=1011,Sl=1012,Jp=1013,aa=1014,$i=1015,Pa=1016,Qp=1017,jp=1018,Ml=1020,ry=35902,oy=35899,ly=1021,uy=1022,Gi=1023,Oa=1026,tr=1027,cy=1028,$p=1029,nr=1030,tm=1031,em=1033,xc=33776,yc=33777,Sc=33778,Mc=33779,jd=35840,$d=35841,tp=35842,ep=35843,np=36196,ip=37492,ap=37496,sp=37488,rp=37489,Rc=37490,op=37491,lp=37808,up=37809,cp=37810,fp=37811,hp=37812,dp=37813,pp=37814,mp=37815,gp=37816,_p=37817,vp=37818,xp=37819,yp=37820,Sp=37821,Mp=36492,Ep=36494,bp=36495,Tp=36283,Ap=36284,Cc=36285,Rp=36286,iT=3200,Cp=0,aT=1,xs="",wi="srgb",wc="srgb-linear",Dc="linear",He="srgb",zr=7680,vv=519,sT=512,rT=513,oT=514,nm=515,lT=516,uT=517,im=518,cT=519,xv=35044,yv="300 es",ta=2e3,El=2001;function fT(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Uc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function hT(){const s=Uc("canvas");return s.style.display="block",s}const Sv={};function Mv(...s){const t="THREE."+s.shift();console.log(t,...s)}function fy(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=s[1];n&&n.isStackTrace?s[0]+=" "+n.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function se(...s){s=fy(s);const t="THREE."+s.shift();{const n=s[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...s)}}function Ae(...s){s=fy(s);const t="THREE."+s.shift();{const n=s[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...s)}}function to(...s){const t=s.join(" ");t in Sv||(Sv[t]=!0,se(...s))}function dT(s,t,n){return new Promise(function(a,o){function u(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(u,n);break;default:a()}}setTimeout(u,n)})}const pT={[kd]:Xd,[Wd]:Zd,[qd]:Kd,[io]:Yd,[Xd]:kd,[Zd]:Wd,[Kd]:qd,[Yd]:io};class As{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const u=o.indexOf(n);u!==-1&&o.splice(u,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let u=0,c=o.length;u<c;u++)o[u].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ec=Math.PI/180,wp=180/Math.PI;function co(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[n&63|128]+Bn[n>>8&255]+"-"+Bn[n>>16&255]+Bn[n>>24&255]+Bn[a&255]+Bn[a>>8&255]+Bn[a>>16&255]+Bn[a>>24&255]).toLowerCase()}function ge(s,t,n){return Math.max(t,Math.min(n,s))}function mT(s,t){return(s%t+t)%t}function sd(s,t,n){return(1-n)*s+n*t}function ol(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ei(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const gT={DEG2RAD:Ec},pm=class pm{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=ge(this.x,t.x,n.x),this.y=ge(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=ge(this.x,t,n),this.y=ge(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ge(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ge(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),u=this.x-t.x,c=this.y-t.y;return this.x=u*a-c*o+t.x,this.y=u*o+c*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};pm.prototype.isVector2=!0;let Ft=pm;class bs{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,u,c,h){let m=a[o+0],p=a[o+1],g=a[o+2],_=a[o+3],v=u[c+0],S=u[c+1],E=u[c+2],w=u[c+3];if(_!==w||m!==v||p!==S||g!==E){let x=m*v+p*S+g*E+_*w;x<0&&(v=-v,S=-S,E=-E,w=-w,x=-x);let y=1-h;if(x<.9995){const U=Math.acos(x),D=Math.sin(U);y=Math.sin(y*U)/D,h=Math.sin(h*U)/D,m=m*y+v*h,p=p*y+S*h,g=g*y+E*h,_=_*y+w*h}else{m=m*y+v*h,p=p*y+S*h,g=g*y+E*h,_=_*y+w*h;const U=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=U,p*=U,g*=U,_*=U}}t[n]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,a,o,u,c){const h=a[o],m=a[o+1],p=a[o+2],g=a[o+3],_=u[c],v=u[c+1],S=u[c+2],E=u[c+3];return t[n]=h*E+g*_+m*S-p*v,t[n+1]=m*E+g*v+p*_-h*S,t[n+2]=p*E+g*S+h*v-m*_,t[n+3]=g*E-h*_-m*v-p*S,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,u=t._z,c=t._order,h=Math.cos,m=Math.sin,p=h(a/2),g=h(o/2),_=h(u/2),v=m(a/2),S=m(o/2),E=m(u/2);switch(c){case"XYZ":this._x=v*g*_+p*S*E,this._y=p*S*_-v*g*E,this._z=p*g*E+v*S*_,this._w=p*g*_-v*S*E;break;case"YXZ":this._x=v*g*_+p*S*E,this._y=p*S*_-v*g*E,this._z=p*g*E-v*S*_,this._w=p*g*_+v*S*E;break;case"ZXY":this._x=v*g*_-p*S*E,this._y=p*S*_+v*g*E,this._z=p*g*E+v*S*_,this._w=p*g*_-v*S*E;break;case"ZYX":this._x=v*g*_-p*S*E,this._y=p*S*_+v*g*E,this._z=p*g*E-v*S*_,this._w=p*g*_+v*S*E;break;case"YZX":this._x=v*g*_+p*S*E,this._y=p*S*_+v*g*E,this._z=p*g*E-v*S*_,this._w=p*g*_-v*S*E;break;case"XZY":this._x=v*g*_-p*S*E,this._y=p*S*_-v*g*E,this._z=p*g*E+v*S*_,this._w=p*g*_+v*S*E;break;default:se("Quaternion: .setFromEuler() encountered an unknown order: "+c)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],u=n[8],c=n[1],h=n[5],m=n[9],p=n[2],g=n[6],_=n[10],v=a+h+_;if(v>0){const S=.5/Math.sqrt(v+1);this._w=.25/S,this._x=(g-m)*S,this._y=(u-p)*S,this._z=(c-o)*S}else if(a>h&&a>_){const S=2*Math.sqrt(1+a-h-_);this._w=(g-m)/S,this._x=.25*S,this._y=(o+c)/S,this._z=(u+p)/S}else if(h>_){const S=2*Math.sqrt(1+h-a-_);this._w=(u-p)/S,this._x=(o+c)/S,this._y=.25*S,this._z=(m+g)/S}else{const S=2*Math.sqrt(1+_-a-h);this._w=(c-o)/S,this._x=(u+p)/S,this._y=(m+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,u=t._z,c=t._w,h=n._x,m=n._y,p=n._z,g=n._w;return this._x=a*g+c*h+o*p-u*m,this._y=o*g+c*m+u*h-a*p,this._z=u*g+c*p+a*m-o*h,this._w=c*g-a*h-o*m-u*p,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,u=t._z,c=t._w,h=this.dot(t);h<0&&(a=-a,o=-o,u=-u,c=-c,h=-h);let m=1-n;if(h<.9995){const p=Math.acos(h),g=Math.sin(p);m=Math.sin(m*p)/g,n=Math.sin(n*p)/g,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+u*n,this._w=this._w*m+c*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+u*n,this._w=this._w*m+c*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),u=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),u*Math.sin(n),u*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const mm=class mm{constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Ev.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Ev.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,u=t.elements;return this.x=u[0]*n+u[3]*a+u[6]*o,this.y=u[1]*n+u[4]*a+u[7]*o,this.z=u[2]*n+u[5]*a+u[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,u=t.elements,c=1/(u[3]*n+u[7]*a+u[11]*o+u[15]);return this.x=(u[0]*n+u[4]*a+u[8]*o+u[12])*c,this.y=(u[1]*n+u[5]*a+u[9]*o+u[13])*c,this.z=(u[2]*n+u[6]*a+u[10]*o+u[14])*c,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,u=t.x,c=t.y,h=t.z,m=t.w,p=2*(c*o-h*a),g=2*(h*n-u*o),_=2*(u*a-c*n);return this.x=n+m*p+c*_-h*g,this.y=a+m*g+h*p-u*_,this.z=o+m*_+u*g-c*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o,this.y=u[1]*n+u[5]*a+u[9]*o,this.z=u[2]*n+u[6]*a+u[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=ge(this.x,t.x,n.x),this.y=ge(this.y,t.y,n.y),this.z=ge(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=ge(this.x,t,n),this.y=ge(this.y,t,n),this.z=ge(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ge(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,u=t.z,c=n.x,h=n.y,m=n.z;return this.x=o*m-u*h,this.y=u*c-a*m,this.z=a*h-o*c,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return rd.copy(this).projectOnVector(t),this.sub(rd)}reflect(t){return this.sub(rd.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ge(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mm.prototype.isVector3=!0;let k=mm;const rd=new k,Ev=new bs,gm=class gm{constructor(t,n,a,o,u,c,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,u,c,h,m,p)}set(t,n,a,o,u,c,h,m,p){const g=this.elements;return g[0]=t,g[1]=o,g[2]=h,g[3]=n,g[4]=u,g[5]=m,g[6]=a,g[7]=c,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,u=this.elements,c=a[0],h=a[3],m=a[6],p=a[1],g=a[4],_=a[7],v=a[2],S=a[5],E=a[8],w=o[0],x=o[3],y=o[6],U=o[1],D=o[4],A=o[7],O=o[2],L=o[5],I=o[8];return u[0]=c*w+h*U+m*O,u[3]=c*x+h*D+m*L,u[6]=c*y+h*A+m*I,u[1]=p*w+g*U+_*O,u[4]=p*x+g*D+_*L,u[7]=p*y+g*A+_*I,u[2]=v*w+S*U+E*O,u[5]=v*x+S*D+E*L,u[8]=v*y+S*A+E*I,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],u=t[3],c=t[4],h=t[5],m=t[6],p=t[7],g=t[8];return n*c*g-n*h*p-a*u*g+a*h*m+o*u*p-o*c*m}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],u=t[3],c=t[4],h=t[5],m=t[6],p=t[7],g=t[8],_=g*c-h*p,v=h*m-g*u,S=p*u-c*m,E=n*_+a*v+o*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=_*w,t[1]=(o*p-g*a)*w,t[2]=(h*a-o*c)*w,t[3]=v*w,t[4]=(g*n-o*m)*w,t[5]=(o*u-h*n)*w,t[6]=S*w,t[7]=(a*m-p*n)*w,t[8]=(c*n-a*u)*w,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,u,c,h){const m=Math.cos(u),p=Math.sin(u);return this.set(a*m,a*p,-a*(m*c+p*h)+c+t,-o*p,o*m,-o*(-p*c+m*h)+h+n,0,0,1),this}scale(t,n){return to("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(od.makeScale(t,n)),this}rotate(t){return to("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(od.makeRotation(-t)),this}translate(t,n){return to("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(od.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};gm.prototype.isMatrix3=!0;let ue=gm;const od=new ue,bv=new ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tv=new ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _T(){const s={enabled:!0,workingColorSpace:wc,spaces:{},convert:function(o,u,c){return this.enabled===!1||u===c||!u||!c||(this.spaces[u].transfer===He&&(o.r=La(o.r),o.g=La(o.g),o.b=La(o.b)),this.spaces[u].primaries!==this.spaces[c].primaries&&(o.applyMatrix3(this.spaces[u].toXYZ),o.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===He&&(o.r=eo(o.r),o.g=eo(o.g),o.b=eo(o.b))),o},workingToColorSpace:function(o,u){return this.convert(o,this.workingColorSpace,u)},colorSpaceToWorking:function(o,u){return this.convert(o,u,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===xs?Dc:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,u=this.workingColorSpace){return o.fromArray(this.spaces[u].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,u,c){return o.copy(this.spaces[u].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,u){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(o,u)},toWorkingColorSpace:function(o,u){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(o,u)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return s.define({[wc]:{primaries:t,whitePoint:a,transfer:Dc,toXYZ:bv,fromXYZ:Tv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:wi},outputColorSpaceConfig:{drawingBufferColorSpace:wi}},[wi]:{primaries:t,whitePoint:a,transfer:He,toXYZ:bv,fromXYZ:Tv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:wi}}}),s}const be=_T();function La(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function eo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ir;class vT{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Ir===void 0&&(Ir=Uc("canvas")),Ir.width=t.width,Ir.height=t.height;const o=Ir.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Ir}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Uc("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),u=o.data;for(let c=0;c<u.length;c++)u[c]=La(u[c]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(La(n[a]/255)*255):n[a]=La(n[a]);return{data:n,width:t.width,height:t.height}}else return se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xT=0;class am{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=co(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let u;if(Array.isArray(o)){u=[];for(let c=0,h=o.length;c<h;c++)o[c].isDataTexture?u.push(ld(o[c].image)):u.push(ld(o[c]))}else u=ld(o);a.url=u}return n||(t.images[this.uuid]=a),a}}function ld(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?vT.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(se("Texture: Unable to serialize Texture."),{})}let yT=0;const ud=new k;class Yn extends As{constructor(t=Yn.DEFAULT_IMAGE,n=Yn.DEFAULT_MAPPING,a=Da,o=Da,u=Vn,c=$s,h=Gi,m=vi,p=Yn.DEFAULT_ANISOTROPY,g=xs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yT++}),this.uuid=co(),this.name="",this.source=new am(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=u,this.minFilter=c,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ud).x}get height(){return this.source.getSize(ud).y}get depth(){return this.source.getSize(ud).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){se(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){se(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==iy)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Jd:t.x=t.x-Math.floor(t.x);break;case Da:t.x=t.x<0?0:1;break;case Qd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Jd:t.y=t.y-Math.floor(t.y);break;case Da:t.y=t.y<0?0:1;break;case Qd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=iy;Yn.DEFAULT_ANISOTROPY=1;const _m=class _m{constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,u=this.w,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o+c[12]*u,this.y=c[1]*n+c[5]*a+c[9]*o+c[13]*u,this.z=c[2]*n+c[6]*a+c[10]*o+c[14]*u,this.w=c[3]*n+c[7]*a+c[11]*o+c[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,u;const m=t.elements,p=m[0],g=m[4],_=m[8],v=m[1],S=m[5],E=m[9],w=m[2],x=m[6],y=m[10];if(Math.abs(g-v)<.01&&Math.abs(_-w)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+w)<.1&&Math.abs(E+x)<.1&&Math.abs(p+S+y-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const D=(p+1)/2,A=(S+1)/2,O=(y+1)/2,L=(g+v)/4,I=(_+w)/4,T=(E+x)/4;return D>A&&D>O?D<.01?(a=0,o=.707106781,u=.707106781):(a=Math.sqrt(D),o=L/a,u=I/a):A>O?A<.01?(a=.707106781,o=0,u=.707106781):(o=Math.sqrt(A),a=L/o,u=T/o):O<.01?(a=.707106781,o=.707106781,u=0):(u=Math.sqrt(O),a=I/u,o=T/u),this.set(a,o,u,n),this}let U=Math.sqrt((x-E)*(x-E)+(_-w)*(_-w)+(v-g)*(v-g));return Math.abs(U)<.001&&(U=1),this.x=(x-E)/U,this.y=(_-w)/U,this.z=(v-g)/U,this.w=Math.acos((p+S+y-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=ge(this.x,t.x,n.x),this.y=ge(this.y,t.y,n.y),this.z=ge(this.z,t.z,n.z),this.w=ge(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=ge(this.x,t,n),this.y=ge(this.y,t,n),this.z=ge(this.z,t,n),this.w=ge(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ge(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_m.prototype.isVector4=!0;let nn=_m;class ST extends As{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new nn(0,0,t,n),this.scissorTest=!1,this.viewport=new nn(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},u=new Yn(o),c=a.count;for(let h=0;h<c;h++)this.textures[h]=u.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,u=this.textures.length;o<u;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new am(o)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class na extends ST{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class hy extends Yn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=On,this.minFilter=On,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class MT extends Yn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=On,this.minFilter=On,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pc=class Pc{constructor(t,n,a,o,u,c,h,m,p,g,_,v,S,E,w,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,u,c,h,m,p,g,_,v,S,E,w,x)}set(t,n,a,o,u,c,h,m,p,g,_,v,S,E,w,x){const y=this.elements;return y[0]=t,y[4]=n,y[8]=a,y[12]=o,y[1]=u,y[5]=c,y[9]=h,y[13]=m,y[2]=p,y[6]=g,y[10]=_,y[14]=v,y[3]=S,y[7]=E,y[11]=w,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pc().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Fr.setFromMatrixColumn(t,0).length(),u=1/Fr.setFromMatrixColumn(t,1).length(),c=1/Fr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*u,n[5]=a[5]*u,n[6]=a[6]*u,n[7]=0,n[8]=a[8]*c,n[9]=a[9]*c,n[10]=a[10]*c,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,u=t.z,c=Math.cos(a),h=Math.sin(a),m=Math.cos(o),p=Math.sin(o),g=Math.cos(u),_=Math.sin(u);if(t.order==="XYZ"){const v=c*g,S=c*_,E=h*g,w=h*_;n[0]=m*g,n[4]=-m*_,n[8]=p,n[1]=S+E*p,n[5]=v-w*p,n[9]=-h*m,n[2]=w-v*p,n[6]=E+S*p,n[10]=c*m}else if(t.order==="YXZ"){const v=m*g,S=m*_,E=p*g,w=p*_;n[0]=v+w*h,n[4]=E*h-S,n[8]=c*p,n[1]=c*_,n[5]=c*g,n[9]=-h,n[2]=S*h-E,n[6]=w+v*h,n[10]=c*m}else if(t.order==="ZXY"){const v=m*g,S=m*_,E=p*g,w=p*_;n[0]=v-w*h,n[4]=-c*_,n[8]=E+S*h,n[1]=S+E*h,n[5]=c*g,n[9]=w-v*h,n[2]=-c*p,n[6]=h,n[10]=c*m}else if(t.order==="ZYX"){const v=c*g,S=c*_,E=h*g,w=h*_;n[0]=m*g,n[4]=E*p-S,n[8]=v*p+w,n[1]=m*_,n[5]=w*p+v,n[9]=S*p-E,n[2]=-p,n[6]=h*m,n[10]=c*m}else if(t.order==="YZX"){const v=c*m,S=c*p,E=h*m,w=h*p;n[0]=m*g,n[4]=w-v*_,n[8]=E*_+S,n[1]=_,n[5]=c*g,n[9]=-h*g,n[2]=-p*g,n[6]=S*_+E,n[10]=v-w*_}else if(t.order==="XZY"){const v=c*m,S=c*p,E=h*m,w=h*p;n[0]=m*g,n[4]=-_,n[8]=p*g,n[1]=v*_+w,n[5]=c*g,n[9]=S*_-E,n[2]=E*_-S,n[6]=h*g,n[10]=w*_+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ET,t,bT)}lookAt(t,n,a){const o=this.elements;return mi.subVectors(t,n),mi.lengthSq()===0&&(mi.z=1),mi.normalize(),fs.crossVectors(a,mi),fs.lengthSq()===0&&(Math.abs(a.z)===1?mi.x+=1e-4:mi.z+=1e-4,mi.normalize(),fs.crossVectors(a,mi)),fs.normalize(),Xu.crossVectors(mi,fs),o[0]=fs.x,o[4]=Xu.x,o[8]=mi.x,o[1]=fs.y,o[5]=Xu.y,o[9]=mi.y,o[2]=fs.z,o[6]=Xu.z,o[10]=mi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,u=this.elements,c=a[0],h=a[4],m=a[8],p=a[12],g=a[1],_=a[5],v=a[9],S=a[13],E=a[2],w=a[6],x=a[10],y=a[14],U=a[3],D=a[7],A=a[11],O=a[15],L=o[0],I=o[4],T=o[8],N=o[12],W=o[1],G=o[5],q=o[9],ht=o[13],pt=o[2],J=o[6],F=o[10],H=o[14],nt=o[3],St=o[7],At=o[11],z=o[15];return u[0]=c*L+h*W+m*pt+p*nt,u[4]=c*I+h*G+m*J+p*St,u[8]=c*T+h*q+m*F+p*At,u[12]=c*N+h*ht+m*H+p*z,u[1]=g*L+_*W+v*pt+S*nt,u[5]=g*I+_*G+v*J+S*St,u[9]=g*T+_*q+v*F+S*At,u[13]=g*N+_*ht+v*H+S*z,u[2]=E*L+w*W+x*pt+y*nt,u[6]=E*I+w*G+x*J+y*St,u[10]=E*T+w*q+x*F+y*At,u[14]=E*N+w*ht+x*H+y*z,u[3]=U*L+D*W+A*pt+O*nt,u[7]=U*I+D*G+A*J+O*St,u[11]=U*T+D*q+A*F+O*At,u[15]=U*N+D*ht+A*H+O*z,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],u=t[12],c=t[1],h=t[5],m=t[9],p=t[13],g=t[2],_=t[6],v=t[10],S=t[14],E=t[3],w=t[7],x=t[11],y=t[15],U=m*S-p*v,D=h*S-p*_,A=h*v-m*_,O=c*S-p*g,L=c*v-m*g,I=c*_-h*g;return n*(w*U-x*D+y*A)-a*(E*U-x*O+y*L)+o*(E*D-w*O+y*I)-u*(E*A-w*L+x*I)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],u=t[1],c=t[5],h=t[9],m=t[2],p=t[6],g=t[10];return n*(c*g-h*p)-a*(u*g-h*m)+o*(u*p-c*m)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],u=t[3],c=t[4],h=t[5],m=t[6],p=t[7],g=t[8],_=t[9],v=t[10],S=t[11],E=t[12],w=t[13],x=t[14],y=t[15],U=n*h-a*c,D=n*m-o*c,A=n*p-u*c,O=a*m-o*h,L=a*p-u*h,I=o*p-u*m,T=g*w-_*E,N=g*x-v*E,W=g*y-S*E,G=_*x-v*w,q=_*y-S*w,ht=v*y-S*x,pt=U*ht-D*q+A*G+O*W-L*N+I*T;if(pt===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const J=1/pt;return t[0]=(h*ht-m*q+p*G)*J,t[1]=(o*q-a*ht-u*G)*J,t[2]=(w*I-x*L+y*O)*J,t[3]=(v*L-_*I-S*O)*J,t[4]=(m*W-c*ht-p*N)*J,t[5]=(n*ht-o*W+u*N)*J,t[6]=(x*A-E*I-y*D)*J,t[7]=(g*I-v*A+S*D)*J,t[8]=(c*q-h*W+p*T)*J,t[9]=(a*W-n*q-u*T)*J,t[10]=(E*L-w*A+y*U)*J,t[11]=(_*A-g*L-S*U)*J,t[12]=(h*N-c*G-m*T)*J,t[13]=(n*G-a*N+o*T)*J,t[14]=(w*D-E*O-x*U)*J,t[15]=(g*O-_*D+v*U)*J,this}scale(t){const n=this.elements,a=t.x,o=t.y,u=t.z;return n[0]*=a,n[4]*=o,n[8]*=u,n[1]*=a,n[5]*=o,n[9]*=u,n[2]*=a,n[6]*=o,n[10]*=u,n[3]*=a,n[7]*=o,n[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),u=1-a,c=t.x,h=t.y,m=t.z,p=u*c,g=u*h;return this.set(p*c+a,p*h-o*m,p*m+o*h,0,p*h+o*m,g*h+a,g*m-o*c,0,p*m-o*h,g*m+o*c,u*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,u,c){return this.set(1,a,u,0,t,1,c,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,u=n._x,c=n._y,h=n._z,m=n._w,p=u+u,g=c+c,_=h+h,v=u*p,S=u*g,E=u*_,w=c*g,x=c*_,y=h*_,U=m*p,D=m*g,A=m*_,O=a.x,L=a.y,I=a.z;return o[0]=(1-(w+y))*O,o[1]=(S+A)*O,o[2]=(E-D)*O,o[3]=0,o[4]=(S-A)*L,o[5]=(1-(v+y))*L,o[6]=(x+U)*L,o[7]=0,o[8]=(E+D)*I,o[9]=(x-U)*I,o[10]=(1-(v+w))*I,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const u=this.determinantAffine();if(u===0)return a.set(1,1,1),n.identity(),this;let c=Fr.set(o[0],o[1],o[2]).length();const h=Fr.set(o[4],o[5],o[6]).length(),m=Fr.set(o[8],o[9],o[10]).length();u<0&&(c=-c),zi.copy(this);const p=1/c,g=1/h,_=1/m;return zi.elements[0]*=p,zi.elements[1]*=p,zi.elements[2]*=p,zi.elements[4]*=g,zi.elements[5]*=g,zi.elements[6]*=g,zi.elements[8]*=_,zi.elements[9]*=_,zi.elements[10]*=_,n.setFromRotationMatrix(zi),a.x=c,a.y=h,a.z=m,this}makePerspective(t,n,a,o,u,c,h=ta,m=!1){const p=this.elements,g=2*u/(n-t),_=2*u/(a-o),v=(n+t)/(n-t),S=(a+o)/(a-o);let E,w;if(m)E=u/(c-u),w=c*u/(c-u);else if(h===ta)E=-(c+u)/(c-u),w=-2*c*u/(c-u);else if(h===El)E=-c/(c-u),w=-c*u/(c-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=g,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=w,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,o,u,c,h=ta,m=!1){const p=this.elements,g=2/(n-t),_=2/(a-o),v=-(n+t)/(n-t),S=-(a+o)/(a-o);let E,w;if(m)E=1/(c-u),w=c/(c-u);else if(h===ta)E=-2/(c-u),w=-(c+u)/(c-u);else if(h===El)E=-1/(c-u),w=-u/(c-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=g,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=_,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=E,p[14]=w,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}};Pc.prototype.isMatrix4=!0;let Qe=Pc;const Fr=new k,zi=new Qe,ET=new k(0,0,0),bT=new k(1,1,1),fs=new k,Xu=new k,mi=new k,Av=new Qe,Rv=new bs;class Ts{constructor(t=0,n=0,a=0,o=Ts.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,u=o[0],c=o[4],h=o[8],m=o[1],p=o[5],g=o[9],_=o[2],v=o[6],S=o[10];switch(n){case"XYZ":this._y=Math.asin(ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-c,u)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,u),this._z=0);break;case"ZXY":this._x=Math.asin(ge(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-c,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-ge(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,S),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-c,p));break;case"YZX":this._z=Math.asin(ge(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,u)):(this._x=0,this._y=Math.atan2(h,S));break;case"XZY":this._z=Math.asin(-ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(h,u)):(this._x=Math.atan2(-g,S),this._y=0);break;default:se("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Av.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Av,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Rv.setFromEuler(this),this.setFromQuaternion(Rv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ts.DEFAULT_ORDER="XYZ";class sm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let TT=0;const Cv=new k,Br=new bs,Ta=new Qe,Wu=new k,ll=new k,AT=new k,RT=new bs,wv=new k(1,0,0),Dv=new k(0,1,0),Uv=new k(0,0,1),Lv={type:"added"},CT={type:"removed"},Hr={type:"childadded",child:null},cd={type:"childremoved",child:null};class zn extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:TT++}),this.uuid=co(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zn.DEFAULT_UP.clone();const t=new k,n=new Ts,a=new bs,o=new k(1,1,1);function u(){a.setFromEuler(n,!1)}function c(){n.setFromQuaternion(a,void 0,!1)}n._onChange(u),a._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Qe},normalMatrix:{value:new ue}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Br.setFromAxisAngle(t,n),this.quaternion.multiply(Br),this}rotateOnWorldAxis(t,n){return Br.setFromAxisAngle(t,n),this.quaternion.premultiply(Br),this}rotateX(t){return this.rotateOnAxis(wv,t)}rotateY(t){return this.rotateOnAxis(Dv,t)}rotateZ(t){return this.rotateOnAxis(Uv,t)}translateOnAxis(t,n){return Cv.copy(t).applyQuaternion(this.quaternion),this.position.add(Cv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(wv,t)}translateY(t){return this.translateOnAxis(Dv,t)}translateZ(t){return this.translateOnAxis(Uv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ta.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Wu.copy(t):Wu.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),ll.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ta.lookAt(ll,Wu,this.up):Ta.lookAt(Wu,ll,this.up),this.quaternion.setFromRotationMatrix(Ta),o&&(Ta.extractRotation(o.matrixWorld),Br.setFromRotationMatrix(Ta),this.quaternion.premultiply(Br.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lv),Hr.child=t,this.dispatchEvent(Hr),Hr.child=null):Ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(CT),cd.child=t,this.dispatchEvent(cd),cd.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ta.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ta.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ta),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lv),Hr.child=t,this.dispatchEvent(Hr),Hr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const c=this.children[a].getObjectByProperty(t,n);if(c!==void 0)return c}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let u=0,c=o.length;u<c;u++)o[u].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,t,AT),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,RT,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,u=this.matrix.elements;u[12]+=n-u[0]*n-u[4]*a-u[8]*o,u[13]+=a-u[1]*n-u[5]*a-u[9]*o,u[14]+=o-u[2]*n-u[6]*a-u[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const u=this.children;for(let c=0,h=u.length;c<h;c++)u[c].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),this.static!==!1&&(o.static=this.static),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function u(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=u(t.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];u(t.shapes,_)}else u(t.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(u(t.materials,this.material[m]));o.material=h}else o.material=u(t.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(u(t.animations,m))}}if(n){const h=c(t.geometries),m=c(t.materials),p=c(t.textures),g=c(t.images),_=c(t.shapes),v=c(t.skeletons),S=c(t.animations),E=c(t.nodes);h.length>0&&(a.geometries=h),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),v.length>0&&(a.skeletons=v),S.length>0&&(a.animations=S),E.length>0&&(a.nodes=E)}return a.object=o,a;function c(h){const m=[];for(const p in h){const g=h[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}}zn.DEFAULT_UP=new k(0,1,0);zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ys extends zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wT={type:"move"};class fd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ys,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ys,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ys,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,u=null,c=null;const h=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){c=!0;for(const w of t.hand.values()){const x=n.getJointPose(w,a),y=this._getHandJoint(p,w);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=g.position.distanceTo(_.position),S=.02,E=.005;p.inputState.pinching&&v>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&v<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(u=n.getPose(t.gripSpace,a),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));h!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&u!==null&&(o=u),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(wT)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=c!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new ys;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const dy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},qu={h:0,s:0,l:0};function hd(s,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(t-s)*6*n:n<1/2?t:n<2/3?s+(t-s)*6*(2/3-n):s}class Te{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=wi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,be.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=be.workingColorSpace){return this.r=t,this.g=n,this.b=a,be.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=be.workingColorSpace){if(t=mT(t,1),n=ge(n,0,1),a=ge(a,0,1),n===0)this.r=this.g=this.b=a;else{const u=a<=.5?a*(1+n):a+n-a*n,c=2*a-u;this.r=hd(c,u,t+1/3),this.g=hd(c,u,t),this.b=hd(c,u,t-1/3)}return be.colorSpaceToWorking(this,o),this}setStyle(t,n=wi){function a(u){u!==void 0&&parseFloat(u)<1&&se("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const c=o[1],h=o[2];switch(c){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,n);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,n);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return a(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,n);break;default:se("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=o[1],c=u.length;if(c===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,n);if(c===6)return this.setHex(parseInt(u,16),n);se("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=wi){const a=dy[t.toLowerCase()];return a!==void 0?this.setHex(a,n):se("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=La(t.r),this.g=La(t.g),this.b=La(t.b),this}copyLinearToSRGB(t){return this.r=eo(t.r),this.g=eo(t.g),this.b=eo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=wi){return be.workingToColorSpace(Hn.copy(this),t),Math.round(ge(Hn.r*255,0,255))*65536+Math.round(ge(Hn.g*255,0,255))*256+Math.round(ge(Hn.b*255,0,255))}getHexString(t=wi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=be.workingColorSpace){be.workingToColorSpace(Hn.copy(this),n);const a=Hn.r,o=Hn.g,u=Hn.b,c=Math.max(a,o,u),h=Math.min(a,o,u);let m,p;const g=(h+c)/2;if(h===c)m=0,p=0;else{const _=c-h;switch(p=g<=.5?_/(c+h):_/(2-c-h),c){case a:m=(o-u)/_+(o<u?6:0);break;case o:m=(u-a)/_+2;break;case u:m=(a-o)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,n=be.workingColorSpace){return be.workingToColorSpace(Hn.copy(this),n),t.r=Hn.r,t.g=Hn.g,t.b=Hn.b,t}getStyle(t=wi){be.workingToColorSpace(Hn.copy(this),t);const n=Hn.r,a=Hn.g,o=Hn.b;return t!==wi?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(hs),this.setHSL(hs.h+t,hs.s+n,hs.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(hs),t.getHSL(qu);const a=sd(hs.h,qu.h,n),o=sd(hs.s,qu.s,n),u=sd(hs.l,qu.l,n);return this.setHSL(a,o,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,u=t.elements;return this.r=u[0]*n+u[3]*a+u[6]*o,this.g=u[1]*n+u[4]*a+u[7]*o,this.b=u[2]*n+u[5]*a+u[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Hn=new Te;Te.NAMES=dy;class rm{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Te(t),this.density=n}clone(){return new rm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class DT extends zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ts,this.environmentIntensity=1,this.environmentRotation=new Ts,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ii=new k,Aa=new k,dd=new k,Ra=new k,Gr=new k,Vr=new k,Nv=new k,pd=new k,md=new k,gd=new k,_d=new nn,vd=new nn,xd=new nn;class Hi{constructor(t=new k,n=new k,a=new k){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),Ii.subVectors(t,n),o.cross(Ii);const u=o.lengthSq();return u>0?o.multiplyScalar(1/Math.sqrt(u)):o.set(0,0,0)}static getBarycoord(t,n,a,o,u){Ii.subVectors(o,n),Aa.subVectors(a,n),dd.subVectors(t,n);const c=Ii.dot(Ii),h=Ii.dot(Aa),m=Ii.dot(dd),p=Aa.dot(Aa),g=Aa.dot(dd),_=c*p-h*h;if(_===0)return u.set(0,0,0),null;const v=1/_,S=(p*m-h*g)*v,E=(c*g-h*m)*v;return u.set(1-S-E,E,S)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,Ra)===null?!1:Ra.x>=0&&Ra.y>=0&&Ra.x+Ra.y<=1}static getInterpolation(t,n,a,o,u,c,h,m){return this.getBarycoord(t,n,a,o,Ra)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,Ra.x),m.addScaledVector(c,Ra.y),m.addScaledVector(h,Ra.z),m)}static getInterpolatedAttribute(t,n,a,o,u,c){return _d.setScalar(0),vd.setScalar(0),xd.setScalar(0),_d.fromBufferAttribute(t,n),vd.fromBufferAttribute(t,a),xd.fromBufferAttribute(t,o),c.setScalar(0),c.addScaledVector(_d,u.x),c.addScaledVector(vd,u.y),c.addScaledVector(xd,u.z),c}static isFrontFacing(t,n,a,o){return Ii.subVectors(a,n),Aa.subVectors(t,n),Ii.cross(Aa).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ii.subVectors(this.c,this.b),Aa.subVectors(this.a,this.b),Ii.cross(Aa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Hi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Hi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,u){return Hi.getInterpolation(t,this.a,this.b,this.c,n,a,o,u)}containsPoint(t){return Hi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Hi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,u=this.c;let c,h;Gr.subVectors(o,a),Vr.subVectors(u,a),pd.subVectors(t,a);const m=Gr.dot(pd),p=Vr.dot(pd);if(m<=0&&p<=0)return n.copy(a);md.subVectors(t,o);const g=Gr.dot(md),_=Vr.dot(md);if(g>=0&&_<=g)return n.copy(o);const v=m*_-g*p;if(v<=0&&m>=0&&g<=0)return c=m/(m-g),n.copy(a).addScaledVector(Gr,c);gd.subVectors(t,u);const S=Gr.dot(gd),E=Vr.dot(gd);if(E>=0&&S<=E)return n.copy(u);const w=S*p-m*E;if(w<=0&&p>=0&&E<=0)return h=p/(p-E),n.copy(a).addScaledVector(Vr,h);const x=g*E-S*_;if(x<=0&&_-g>=0&&S-E>=0)return Nv.subVectors(u,o),h=(_-g)/(_-g+(S-E)),n.copy(o).addScaledVector(Nv,h);const y=1/(x+w+v);return c=w*y,h=v*y,n.copy(a).addScaledVector(Gr,c).addScaledVector(Vr,h)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Dl{constructor(t=new k(1/0,1/0,1/0),n=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Fi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Fi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Fi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const u=a.getAttribute("position");if(n===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let c=0,h=u.count;c<h;c++)t.isMesh===!0?t.getVertexPosition(c,Fi):Fi.fromBufferAttribute(u,c),Fi.applyMatrix4(t.matrixWorld),this.expandByPoint(Fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Yu.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Yu.copy(a.boundingBox)),Yu.applyMatrix4(t.matrixWorld),this.union(Yu)}const o=t.children;for(let u=0,c=o.length;u<c;u++)this.expandByObject(o[u],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Fi),Fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ul),Zu.subVectors(this.max,ul),kr.subVectors(t.a,ul),Xr.subVectors(t.b,ul),Wr.subVectors(t.c,ul),ds.subVectors(Xr,kr),ps.subVectors(Wr,Xr),Ys.subVectors(kr,Wr);let n=[0,-ds.z,ds.y,0,-ps.z,ps.y,0,-Ys.z,Ys.y,ds.z,0,-ds.x,ps.z,0,-ps.x,Ys.z,0,-Ys.x,-ds.y,ds.x,0,-ps.y,ps.x,0,-Ys.y,Ys.x,0];return!yd(n,kr,Xr,Wr,Zu)||(n=[1,0,0,0,1,0,0,0,1],!yd(n,kr,Xr,Wr,Zu))?!1:(Ku.crossVectors(ds,ps),n=[Ku.x,Ku.y,Ku.z],yd(n,kr,Xr,Wr,Zu))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ca),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ca=[new k,new k,new k,new k,new k,new k,new k,new k],Fi=new k,Yu=new Dl,kr=new k,Xr=new k,Wr=new k,ds=new k,ps=new k,Ys=new k,ul=new k,Zu=new k,Ku=new k,Zs=new k;function yd(s,t,n,a,o){for(let u=0,c=s.length-3;u<=c;u+=3){Zs.fromArray(s,u);const h=o.x*Math.abs(Zs.x)+o.y*Math.abs(Zs.y)+o.z*Math.abs(Zs.z),m=t.dot(Zs),p=n.dot(Zs),g=a.dot(Zs);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>h)return!1}return!0}const Mn=new k,Ju=new Ft;let UT=0;class xi extends As{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:UT++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=xv,this.updateRanges=[],this.gpuType=$i,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,u=this.itemSize;o<u;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Ju.fromBufferAttribute(this,n),Ju.applyMatrix3(t),this.setXY(n,Ju.x,Ju.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.applyMatrix3(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.applyMatrix4(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.applyNormalMatrix(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.transformDirection(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=ol(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=ei(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ol(n,this.array)),n}setX(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ol(n,this.array)),n}setY(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ol(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ol(n,this.array)),n}setW(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),a=ei(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),a=ei(a,this.array),o=ei(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,u){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),a=ei(a,this.array),o=ei(o,this.array),u=ei(u,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==xv&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class py extends xi{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class my extends xi{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class mn extends xi{constructor(t,n,a){super(new Float32Array(t),n,a)}}const LT=new Dl,cl=new k,Sd=new k;class Bc{constructor(t=new k,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):LT.setFromPoints(t).getCenter(a);let o=0;for(let u=0,c=t.length;u<c;u++)o=Math.max(o,a.distanceToSquared(t[u]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cl.subVectors(t,this.center);const n=cl.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(cl,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cl.copy(t.center).add(Sd)),this.expandByPoint(cl.copy(t.center).sub(Sd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let NT=0;const Ci=new Qe,Md=new zn,qr=new k,gi=new Dl,fl=new Dl,wn=new k;class kn extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:NT++}),this.uuid=co(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fT(t)?my:py)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const u=new ue().getNormalMatrix(t);a.applyNormalMatrix(u),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,n,a){return Ci.makeTranslation(t,n,a),this.applyMatrix4(Ci),this}scale(t,n,a){return Ci.makeScale(t,n,a),this.applyMatrix4(Ci),this}lookAt(t){return Md.lookAt(t),Md.updateMatrix(),this.applyMatrix4(Md.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qr).negate(),this.translate(qr.x,qr.y,qr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,u=t.length;o<u;o++){const c=t[o];a.push(c.x,c.y,c.z||0)}this.setAttribute("position",new mn(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const u=t[o];n.setXYZ(o,u.x,u.y,u.z||0)}t.length>n.count&&se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const u=n[a];gi.setFromBufferAttribute(u),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,gi.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,gi.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(gi.min),this.boundingBox.expandByPoint(gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bc);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const a=this.boundingSphere.center;if(gi.setFromBufferAttribute(t),n)for(let u=0,c=n.length;u<c;u++){const h=n[u];fl.setFromBufferAttribute(h),this.morphTargetsRelative?(wn.addVectors(gi.min,fl.min),gi.expandByPoint(wn),wn.addVectors(gi.max,fl.max),gi.expandByPoint(wn)):(gi.expandByPoint(fl.min),gi.expandByPoint(fl.max))}gi.getCenter(a);let o=0;for(let u=0,c=t.count;u<c;u++)wn.fromBufferAttribute(t,u),o=Math.max(o,a.distanceToSquared(wn));if(n)for(let u=0,c=n.length;u<c;u++){const h=n[u],m=this.morphTargetsRelative;for(let p=0,g=h.count;p<g;p++)wn.fromBufferAttribute(h,p),m&&(qr.fromBufferAttribute(t,p),wn.add(qr)),o=Math.max(o,a.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,u=n.uv;let c=this.getAttribute("tangent");(c===void 0||c.count!==a.count)&&(c=new xi(new Float32Array(4*a.count),4),this.setAttribute("tangent",c));const h=[],m=[];for(let T=0;T<a.count;T++)h[T]=new k,m[T]=new k;const p=new k,g=new k,_=new k,v=new Ft,S=new Ft,E=new Ft,w=new k,x=new k;function y(T,N,W){p.fromBufferAttribute(a,T),g.fromBufferAttribute(a,N),_.fromBufferAttribute(a,W),v.fromBufferAttribute(u,T),S.fromBufferAttribute(u,N),E.fromBufferAttribute(u,W),g.sub(p),_.sub(p),S.sub(v),E.sub(v);const G=1/(S.x*E.y-E.x*S.y);isFinite(G)&&(w.copy(g).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(G),x.copy(_).multiplyScalar(S.x).addScaledVector(g,-E.x).multiplyScalar(G),h[T].add(w),h[N].add(w),h[W].add(w),m[T].add(x),m[N].add(x),m[W].add(x))}let U=this.groups;U.length===0&&(U=[{start:0,count:t.count}]);for(let T=0,N=U.length;T<N;++T){const W=U[T],G=W.start,q=W.count;for(let ht=G,pt=G+q;ht<pt;ht+=3)y(t.getX(ht+0),t.getX(ht+1),t.getX(ht+2))}const D=new k,A=new k,O=new k,L=new k;function I(T){O.fromBufferAttribute(o,T),L.copy(O);const N=h[T];D.copy(N),D.sub(O.multiplyScalar(O.dot(N))).normalize(),A.crossVectors(L,N);const G=A.dot(m[T])<0?-1:1;c.setXYZW(T,D.x,D.y,D.z,G)}for(let T=0,N=U.length;T<N;++T){const W=U[T],G=W.start,q=W.count;for(let ht=G,pt=G+q;ht<pt;ht+=3)I(t.getX(ht+0)),I(t.getX(ht+1)),I(t.getX(ht+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new xi(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let v=0,S=a.count;v<S;v++)a.setXYZ(v,0,0,0);const o=new k,u=new k,c=new k,h=new k,m=new k,p=new k,g=new k,_=new k;if(t)for(let v=0,S=t.count;v<S;v+=3){const E=t.getX(v+0),w=t.getX(v+1),x=t.getX(v+2);o.fromBufferAttribute(n,E),u.fromBufferAttribute(n,w),c.fromBufferAttribute(n,x),g.subVectors(c,u),_.subVectors(o,u),g.cross(_),h.fromBufferAttribute(a,E),m.fromBufferAttribute(a,w),p.fromBufferAttribute(a,x),h.add(g),m.add(g),p.add(g),a.setXYZ(E,h.x,h.y,h.z),a.setXYZ(w,m.x,m.y,m.z),a.setXYZ(x,p.x,p.y,p.z)}else for(let v=0,S=n.count;v<S;v+=3)o.fromBufferAttribute(n,v+0),u.fromBufferAttribute(n,v+1),c.fromBufferAttribute(n,v+2),g.subVectors(c,u),_.subVectors(o,u),g.cross(_),a.setXYZ(v+0,g.x,g.y,g.z),a.setXYZ(v+1,g.x,g.y,g.z),a.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)wn.fromBufferAttribute(t,n),wn.normalize(),t.setXYZ(n,wn.x,wn.y,wn.z)}toNonIndexed(){function t(h,m){const p=h.array,g=h.itemSize,_=h.normalized,v=new p.constructor(m.length*g);let S=0,E=0;for(let w=0,x=m.length;w<x;w++){h.isInterleavedBufferAttribute?S=m[w]*h.data.stride+h.offset:S=m[w]*g;for(let y=0;y<g;y++)v[E++]=p[S++]}return new xi(v,g,_)}if(this.index===null)return se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new kn,a=this.index.array,o=this.attributes;for(const h in o){const m=o[h],p=t(m,a);n.setAttribute(h,p)}const u=this.morphAttributes;for(const h in u){const m=[],p=u[h];for(let g=0,_=p.length;g<_;g++){const v=p[g],S=t(v,a);m.push(S)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let h=0,m=c.length;h<m;h++){const p=c[h];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const p=a[m];t.data.attributes[m]=p.toJSON(t.data)}const o={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,v=p.length;_<v;_++){const S=p[_];g.push(S.toJSON(t.data))}g.length>0&&(o[m]=g,u=!0)}u&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(t.data.groups=JSON.parse(JSON.stringify(c)));const h=this.boundingSphere;return h!==null&&(t.data.boundingSphere=h.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const p in o){const g=o[p];this.setAttribute(p,g.clone(n))}const u=t.morphAttributes;for(const p in u){const g=[],_=u[p];for(let v=0,S=_.length;v<S;v++)g.push(_[v].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const c=t.groups;for(let p=0,g=c.length;p<g;p++){const _=c[p];this.addGroup(_.start,_.count,_.materialIndex)}const h=t.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let PT=0;class fo extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:PT++}),this.uuid=co(),this.name="",this.type="Material",this.blending=$r,this.side=Es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gd,this.blendDst=Vd,this.blendEquation=Qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=io,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zr,this.stencilZFail=zr,this.stencilZPass=zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){se(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){se(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==$r&&(a.blending=this.blending),this.side!==Es&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==Gd&&(a.blendSrc=this.blendSrc),this.blendDst!==Vd&&(a.blendDst=this.blendDst),this.blendEquation!==Qs&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==io&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vv&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zr&&(a.stencilFail=this.stencilFail),this.stencilZFail!==zr&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==zr&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.allowOverride===!1&&(a.allowOverride=!1),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(u){const c=[];for(const h in u){const m=u[h];delete m.metadata,c.push(m)}return c}if(n){const u=o(t.textures),c=o(t.images);u.length>0&&(a.textures=u),c.length>0&&(a.images=c)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Te().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Ft().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ft().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let u=0;u!==o;++u)a[u]=n[u].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const wa=new k,Ed=new k,Qu=new k,ms=new k,bd=new k,ju=new k,Td=new k;class Hc{constructor(t=new k,n=new k(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=wa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(wa.copy(this.origin).addScaledVector(this.direction,n),wa.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){Ed.copy(t).add(n).multiplyScalar(.5),Qu.copy(n).sub(t).normalize(),ms.copy(this.origin).sub(Ed);const u=t.distanceTo(n)*.5,c=-this.direction.dot(Qu),h=ms.dot(this.direction),m=-ms.dot(Qu),p=ms.lengthSq(),g=Math.abs(1-c*c);let _,v,S,E;if(g>0)if(_=c*m-h,v=c*h-m,E=u*g,_>=0)if(v>=-E)if(v<=E){const w=1/g;_*=w,v*=w,S=_*(_+c*v+2*h)+v*(c*_+v+2*m)+p}else v=u,_=Math.max(0,-(c*v+h)),S=-_*_+v*(v+2*m)+p;else v=-u,_=Math.max(0,-(c*v+h)),S=-_*_+v*(v+2*m)+p;else v<=-E?(_=Math.max(0,-(-c*u+h)),v=_>0?-u:Math.min(Math.max(-u,-m),u),S=-_*_+v*(v+2*m)+p):v<=E?(_=0,v=Math.min(Math.max(-u,-m),u),S=v*(v+2*m)+p):(_=Math.max(0,-(c*u+h)),v=_>0?u:Math.min(Math.max(-u,-m),u),S=-_*_+v*(v+2*m)+p);else v=c>0?-u:u,_=Math.max(0,-(c*v+h)),S=-_*_+v*(v+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(Ed).addScaledVector(Qu,v),S}intersectSphere(t,n){wa.subVectors(t.center,this.origin);const a=wa.dot(this.direction),o=wa.dot(wa)-a*a,u=t.radius*t.radius;if(o>u)return null;const c=Math.sqrt(u-o),h=a-c,m=a+c;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,u,c,h,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(a=(t.min.x-v.x)*p,o=(t.max.x-v.x)*p):(a=(t.max.x-v.x)*p,o=(t.min.x-v.x)*p),g>=0?(u=(t.min.y-v.y)*g,c=(t.max.y-v.y)*g):(u=(t.max.y-v.y)*g,c=(t.min.y-v.y)*g),a>c||u>o||((u>a||isNaN(a))&&(a=u),(c<o||isNaN(o))&&(o=c),_>=0?(h=(t.min.z-v.z)*_,m=(t.max.z-v.z)*_):(h=(t.max.z-v.z)*_,m=(t.min.z-v.z)*_),a>m||h>o)||((h>a||a!==a)&&(a=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,wa)!==null}intersectTriangle(t,n,a,o,u){bd.subVectors(n,t),ju.subVectors(a,t),Td.crossVectors(bd,ju);let c=this.direction.dot(Td),h;if(c>0){if(o)return null;h=1}else if(c<0)h=-1,c=-c;else return null;ms.subVectors(this.origin,t);const m=h*this.direction.dot(ju.crossVectors(ms,ju));if(m<0)return null;const p=h*this.direction.dot(bd.cross(ms));if(p<0||m+p>c)return null;const g=-h*ms.dot(Td);return g<0?null:this.at(g/c,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qr extends fo{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ts,this.combine=Jx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Pv=new Qe,Ks=new Hc,$u=new Bc,Ov=new k,tc=new k,ec=new k,nc=new k,Ad=new k,ic=new k,zv=new k,ac=new k;class Re extends zn{constructor(t=new kn,n=new Qr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,c=o.length;u<c;u++){const h=o[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,u=a.morphAttributes.position,c=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const h=this.morphTargetInfluences;if(u&&h){ic.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const g=h[m],_=u[m];g!==0&&(Ad.fromBufferAttribute(_,t),c?ic.addScaledVector(Ad,g):ic.addScaledVector(Ad.sub(n),g))}n.add(ic)}return n}raycast(t,n){const a=this.geometry,o=this.material,u=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),$u.copy(a.boundingSphere),$u.applyMatrix4(u),Ks.copy(t.ray).recast(t.near),!($u.containsPoint(Ks.origin)===!1&&(Ks.intersectSphere($u,Ov)===null||Ks.origin.distanceToSquared(Ov)>(t.far-t.near)**2))&&(Pv.copy(u).invert(),Ks.copy(t.ray).applyMatrix4(Pv),!(a.boundingBox!==null&&Ks.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ks)))}_computeIntersections(t,n,a){let o;const u=this.geometry,c=this.material,h=u.index,m=u.attributes.position,p=u.attributes.uv,g=u.attributes.uv1,_=u.attributes.normal,v=u.groups,S=u.drawRange;if(h!==null)if(Array.isArray(c))for(let E=0,w=v.length;E<w;E++){const x=v[E],y=c[x.materialIndex],U=Math.max(x.start,S.start),D=Math.min(h.count,Math.min(x.start+x.count,S.start+S.count));for(let A=U,O=D;A<O;A+=3){const L=h.getX(A),I=h.getX(A+1),T=h.getX(A+2);o=sc(this,y,t,a,p,g,_,L,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=x.materialIndex,n.push(o))}}else{const E=Math.max(0,S.start),w=Math.min(h.count,S.start+S.count);for(let x=E,y=w;x<y;x+=3){const U=h.getX(x),D=h.getX(x+1),A=h.getX(x+2);o=sc(this,c,t,a,p,g,_,U,D,A),o&&(o.faceIndex=Math.floor(x/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(c))for(let E=0,w=v.length;E<w;E++){const x=v[E],y=c[x.materialIndex],U=Math.max(x.start,S.start),D=Math.min(m.count,Math.min(x.start+x.count,S.start+S.count));for(let A=U,O=D;A<O;A+=3){const L=A,I=A+1,T=A+2;o=sc(this,y,t,a,p,g,_,L,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=x.materialIndex,n.push(o))}}else{const E=Math.max(0,S.start),w=Math.min(m.count,S.start+S.count);for(let x=E,y=w;x<y;x+=3){const U=x,D=x+1,A=x+2;o=sc(this,c,t,a,p,g,_,U,D,A),o&&(o.faceIndex=Math.floor(x/3),n.push(o))}}}}function OT(s,t,n,a,o,u,c,h){let m;if(t.side===qn?m=a.intersectTriangle(c,u,o,!0,h):m=a.intersectTriangle(o,u,c,t.side===Es,h),m===null)return null;ac.copy(h),ac.applyMatrix4(s.matrixWorld);const p=n.ray.origin.distanceTo(ac);return p<n.near||p>n.far?null:{distance:p,point:ac.clone(),object:s}}function sc(s,t,n,a,o,u,c,h,m,p){s.getVertexPosition(h,tc),s.getVertexPosition(m,ec),s.getVertexPosition(p,nc);const g=OT(s,t,n,a,tc,ec,nc,zv);if(g){const _=new k;Hi.getBarycoord(zv,tc,ec,nc,_),o&&(g.uv=Hi.getInterpolatedAttribute(o,h,m,p,_,new Ft)),u&&(g.uv1=Hi.getInterpolatedAttribute(u,h,m,p,_,new Ft)),c&&(g.normal=Hi.getInterpolatedAttribute(c,h,m,p,_,new k),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const v={a:h,b:m,c:p,normal:new k,materialIndex:0};Hi.getNormal(tc,ec,nc,v.normal),g.face=v,g.barycoord=_}return g}class zT extends Yn{constructor(t=null,n=1,a=1,o,u,c,h,m,p=On,g=On,_,v){super(null,c,h,m,p,g,o,u,_,v),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rd=new k,IT=new k,FT=new ue;class _s{constructor(t=new k(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=Rd.subVectors(a,n).cross(IT.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(Rd),u=this.normal.dot(o);if(u===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/u;return a===!0&&(c<0||c>1)?null:n.copy(t.start).addScaledVector(o,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||FT.getNormalMatrix(t),o=this.coplanarPoint(Rd).applyMatrix4(t),u=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Js=new Bc,BT=new Ft(.5,.5),rc=new k;class om{constructor(t=new _s,n=new _s,a=new _s,o=new _s,u=new _s,c=new _s){this.planes=[t,n,a,o,u,c]}set(t,n,a,o,u,c){const h=this.planes;return h[0].copy(t),h[1].copy(n),h[2].copy(a),h[3].copy(o),h[4].copy(u),h[5].copy(c),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=ta,a=!1){const o=this.planes,u=t.elements,c=u[0],h=u[1],m=u[2],p=u[3],g=u[4],_=u[5],v=u[6],S=u[7],E=u[8],w=u[9],x=u[10],y=u[11],U=u[12],D=u[13],A=u[14],O=u[15];if(o[0].setComponents(p-c,S-g,y-E,O-U).normalize(),o[1].setComponents(p+c,S+g,y+E,O+U).normalize(),o[2].setComponents(p+h,S+_,y+w,O+D).normalize(),o[3].setComponents(p-h,S-_,y-w,O-D).normalize(),a)o[4].setComponents(m,v,x,A).normalize(),o[5].setComponents(p-m,S-v,y-x,O-A).normalize();else if(o[4].setComponents(p-m,S-v,y-x,O-A).normalize(),n===ta)o[5].setComponents(p+m,S+v,y+x,O+A).normalize();else if(n===El)o[5].setComponents(m,v,x,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Js.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Js)}intersectsSprite(t){Js.center.set(0,0,0);const n=BT.distanceTo(t.center);return Js.radius=.7071067811865476+n,Js.applyMatrix4(t.matrixWorld),this.intersectsSphere(Js)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let u=0;u<6;u++)if(n[u].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(rc.x=o.normal.x>0?t.max.x:t.min.x,rc.y=o.normal.y>0?t.max.y:t.min.y,rc.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(rc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gy extends fo{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Iv=new Qe,Dp=new Hc,oc=new Bc,lc=new k;class HT extends zn{constructor(t=new kn,n=new gy){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const a=this.geometry,o=this.matrixWorld,u=t.params.Points.threshold,c=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),oc.copy(a.boundingSphere),oc.applyMatrix4(o),oc.radius+=u,t.ray.intersectsSphere(oc)===!1)return;Iv.copy(o).invert(),Dp.copy(t.ray).applyMatrix4(Iv);const h=u/((this.scale.x+this.scale.y+this.scale.z)/3),m=h*h,p=a.index,_=a.attributes.position;if(p!==null){const v=Math.max(0,c.start),S=Math.min(p.count,c.start+c.count);for(let E=v,w=S;E<w;E++){const x=p.getX(E);lc.fromBufferAttribute(_,x),Fv(lc,x,m,o,t,n,this)}}else{const v=Math.max(0,c.start),S=Math.min(_.count,c.start+c.count);for(let E=v,w=S;E<w;E++)lc.fromBufferAttribute(_,E),Fv(lc,E,m,o,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,c=o.length;u<c;u++){const h=o[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=u}}}}}function Fv(s,t,n,a,o,u,c){const h=Dp.distanceSqToPoint(s);if(h<n){const m=new k;Dp.closestPointToPoint(s,m),m.applyMatrix4(a);const p=o.ray.origin.distanceTo(m);if(p<o.near||p>o.far)return;u.push({distance:p,distanceToRay:Math.sqrt(h),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:c})}}class _y extends Yn{constructor(t=[],n=er,a,o,u,c,h,m,p,g){super(t,n,a,o,u,c,h,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class so extends Yn{constructor(t,n,a=aa,o,u,c,h=On,m=On,p,g=Oa,_=1){if(g!==Oa&&g!==tr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:t,height:n,depth:_};super(v,o,u,c,h,m,g,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new am(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class GT extends so{constructor(t,n=aa,a=er,o,u,c=On,h=On,m,p=Oa){const g={width:t,height:t,depth:1},_=[g,g,g,g,g,g];super(t,t,n,a,o,u,c,h,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class vy extends Yn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ji extends kn{constructor(t=1,n=1,a=1,o=1,u=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:u,depthSegments:c};const h=this;o=Math.floor(o),u=Math.floor(u),c=Math.floor(c);const m=[],p=[],g=[],_=[];let v=0,S=0;E("z","y","x",-1,-1,a,n,t,c,u,0),E("z","y","x",1,-1,a,n,-t,c,u,1),E("x","z","y",1,1,t,a,n,o,c,2),E("x","z","y",1,-1,t,a,-n,o,c,3),E("x","y","z",1,-1,t,n,a,o,u,4),E("x","y","z",-1,-1,t,n,-a,o,u,5),this.setIndex(m),this.setAttribute("position",new mn(p,3)),this.setAttribute("normal",new mn(g,3)),this.setAttribute("uv",new mn(_,2));function E(w,x,y,U,D,A,O,L,I,T,N){const W=A/I,G=O/T,q=A/2,ht=O/2,pt=L/2,J=I+1,F=T+1;let H=0,nt=0;const St=new k;for(let At=0;At<F;At++){const z=At*G-ht;for(let j=0;j<J;j++){const bt=j*W-q;St[w]=bt*U,St[x]=z*D,St[y]=pt,p.push(St.x,St.y,St.z),St[w]=0,St[x]=0,St[y]=L>0?1:-1,g.push(St.x,St.y,St.z),_.push(j/I),_.push(1-At/T),H+=1}}for(let At=0;At<T;At++)for(let z=0;z<I;z++){const j=v+z+J*At,bt=v+z+J*(At+1),ot=v+(z+1)+J*(At+1),_t=v+(z+1)+J*At;m.push(j,bt,_t),m.push(bt,ot,_t),nt+=6}h.addGroup(S,nt,N),S+=nt,v+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ji(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class no extends kn{constructor(t=1,n=1,a=1,o=32,u=1,c=!1,h=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:u,openEnded:c,thetaStart:h,thetaLength:m};const p=this;o=Math.floor(o),u=Math.floor(u);const g=[],_=[],v=[],S=[];let E=0;const w=[],x=a/2;let y=0;U(),c===!1&&(t>0&&D(!0),n>0&&D(!1)),this.setIndex(g),this.setAttribute("position",new mn(_,3)),this.setAttribute("normal",new mn(v,3)),this.setAttribute("uv",new mn(S,2));function U(){const A=new k,O=new k;let L=0;const I=(n-t)/a;for(let T=0;T<=u;T++){const N=[],W=T/u,G=W*(n-t)+t;for(let q=0;q<=o;q++){const ht=q/o,pt=ht*m+h,J=Math.sin(pt),F=Math.cos(pt);O.x=G*J,O.y=-W*a+x,O.z=G*F,_.push(O.x,O.y,O.z),A.set(J,I,F).normalize(),v.push(A.x,A.y,A.z),S.push(ht,1-W),N.push(E++)}w.push(N)}for(let T=0;T<o;T++)for(let N=0;N<u;N++){const W=w[N][T],G=w[N+1][T],q=w[N+1][T+1],ht=w[N][T+1];(t>0||N!==0)&&(g.push(W,G,ht),L+=3),(n>0||N!==u-1)&&(g.push(G,q,ht),L+=3)}p.addGroup(y,L,0),y+=L}function D(A){const O=E,L=new Ft,I=new k;let T=0;const N=A===!0?t:n,W=A===!0?1:-1;for(let q=1;q<=o;q++)_.push(0,x*W,0),v.push(0,W,0),S.push(.5,.5),E++;const G=E;for(let q=0;q<=o;q++){const pt=q/o*m+h,J=Math.cos(pt),F=Math.sin(pt);I.x=N*F,I.y=x*W,I.z=N*J,_.push(I.x,I.y,I.z),v.push(0,W,0),L.x=J*.5+.5,L.y=F*.5*W+.5,S.push(L.x,L.y),E++}for(let q=0;q<o;q++){const ht=O+q,pt=G+q;A===!0?g.push(pt,pt+1,ht):g.push(pt+1,pt,ht),T+=3}p.addGroup(y,T,A===!0?1:2),y+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new no(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Lc extends no{constructor(t=1,n=1,a=32,o=1,u=!1,c=0,h=Math.PI*2){super(0,t,n,a,o,u,c,h),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:o,openEnded:u,thetaStart:c,thetaLength:h}}static fromJSON(t){return new Lc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sa{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){se("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),u=0;n.push(0);for(let c=1;c<=t;c++)a=this.getPoint(c/t),u+=a.distanceTo(o),n.push(u),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const u=a.length;let c;n?c=n:c=t*a[u-1];let h=0,m=u-1,p;for(;h<=m;)if(o=Math.floor(h+(m-h)/2),p=a[o]-c,p<0)h=o+1;else if(p>0)m=o-1;else{m=o;break}if(o=m,a[o]===c)return o/(u-1);const g=a[o],v=a[o+1]-g,S=(c-g)/v;return(o+S)/(u-1)}getTangent(t,n){let o=t-1e-4,u=t+1e-4;o<0&&(o=0),u>1&&(u=1);const c=this.getPoint(o),h=this.getPoint(u),m=n||(c.isVector2?new Ft:new k);return m.copy(h).sub(c).normalize(),m}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new k,o=[],u=[],c=[],h=new k,m=new Qe;for(let S=0;S<=t;S++){const E=S/t;o[S]=this.getTangentAt(E,new k)}u[0]=new k,c[0]=new k;let p=Number.MAX_VALUE;const g=Math.abs(o[0].x),_=Math.abs(o[0].y),v=Math.abs(o[0].z);g<=p&&(p=g,a.set(1,0,0)),_<=p&&(p=_,a.set(0,1,0)),v<=p&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),u[0].crossVectors(o[0],h),c[0].crossVectors(o[0],u[0]);for(let S=1;S<=t;S++){if(u[S]=u[S-1].clone(),c[S]=c[S-1].clone(),h.crossVectors(o[S-1],o[S]),h.length()>Number.EPSILON){h.normalize();const E=Math.acos(ge(o[S-1].dot(o[S]),-1,1));u[S].applyMatrix4(m.makeRotationAxis(h,E))}c[S].crossVectors(o[S],u[S])}if(n===!0){let S=Math.acos(ge(u[0].dot(u[t]),-1,1));S/=t,o[0].dot(h.crossVectors(u[0],u[t]))>0&&(S=-S);for(let E=1;E<=t;E++)u[E].applyMatrix4(m.makeRotationAxis(o[E],S*E)),c[E].crossVectors(o[E],u[E])}return{tangents:o,normals:u,binormals:c}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class lm extends sa{constructor(t=0,n=0,a=1,o=1,u=0,c=Math.PI*2,h=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=u,this.aEndAngle=c,this.aClockwise=h,this.aRotation=m}getPoint(t,n=new Ft){const a=n,o=Math.PI*2;let u=this.aEndAngle-this.aStartAngle;const c=Math.abs(u)<Number.EPSILON;for(;u<0;)u+=o;for(;u>o;)u-=o;u<Number.EPSILON&&(c?u=0:u=o),this.aClockwise===!0&&!c&&(u===o?u=-o:u=u-o);const h=this.aStartAngle+t*u;let m=this.aX+this.xRadius*Math.cos(h),p=this.aY+this.yRadius*Math.sin(h);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),v=m-this.aX,S=p-this.aY;m=v*g-S*_+this.aX,p=v*_+S*g+this.aY}return a.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class VT extends lm{constructor(t,n,a,o,u,c){super(t,n,a,a,o,u,c),this.isArcCurve=!0,this.type="ArcCurve"}}function um(){let s=0,t=0,n=0,a=0;function o(u,c,h,m){s=u,t=h,n=-3*u+3*c-2*h-m,a=2*u-2*c+h+m}return{initCatmullRom:function(u,c,h,m,p){o(c,h,p*(h-u),p*(m-c))},initNonuniformCatmullRom:function(u,c,h,m,p,g,_){let v=(c-u)/p-(h-u)/(p+g)+(h-c)/g,S=(h-c)/g-(m-c)/(g+_)+(m-h)/_;v*=g,S*=g,o(c,h,v,S)},calc:function(u){const c=u*u,h=c*u;return s+t*u+n*c+a*h}}}const Bv=new k,Hv=new k,Cd=new um,wd=new um,Dd=new um;class kT extends sa{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new k){const a=n,o=this.points,u=o.length,c=(u-(this.closed?0:1))*t;let h=Math.floor(c),m=c-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/u)+1)*u:m===0&&h===u-1&&(h=u-2,m=1);let p,g;this.closed||h>0?p=o[(h-1)%u]:(Hv.subVectors(o[0],o[1]).add(o[0]),p=Hv);const _=o[h%u],v=o[(h+1)%u];if(this.closed||h+2<u?g=o[(h+2)%u]:(Bv.subVectors(o[u-1],o[u-2]).add(o[u-1]),g=Bv),this.curveType==="centripetal"||this.curveType==="chordal"){const S=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(_),S),w=Math.pow(_.distanceToSquared(v),S),x=Math.pow(v.distanceToSquared(g),S);w<1e-4&&(w=1),E<1e-4&&(E=w),x<1e-4&&(x=w),Cd.initNonuniformCatmullRom(p.x,_.x,v.x,g.x,E,w,x),wd.initNonuniformCatmullRom(p.y,_.y,v.y,g.y,E,w,x),Dd.initNonuniformCatmullRom(p.z,_.z,v.z,g.z,E,w,x)}else this.curveType==="catmullrom"&&(Cd.initCatmullRom(p.x,_.x,v.x,g.x,this.tension),wd.initCatmullRom(p.y,_.y,v.y,g.y,this.tension),Dd.initCatmullRom(p.z,_.z,v.z,g.z,this.tension));return a.set(Cd.calc(m),wd.calc(m),Dd.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new k().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Gv(s,t,n,a,o){const u=(a-t)*.5,c=(o-n)*.5,h=s*s,m=s*h;return(2*n-2*a+u+c)*m+(-3*n+3*a-2*u-c)*h+u*s+n}function XT(s,t){const n=1-s;return n*n*t}function WT(s,t){return 2*(1-s)*s*t}function qT(s,t){return s*s*t}function _l(s,t,n,a){return XT(s,t)+WT(s,n)+qT(s,a)}function YT(s,t){const n=1-s;return n*n*n*t}function ZT(s,t){const n=1-s;return 3*n*n*s*t}function KT(s,t){return 3*(1-s)*s*s*t}function JT(s,t){return s*s*s*t}function vl(s,t,n,a,o){return YT(s,t)+ZT(s,n)+KT(s,a)+JT(s,o)}class xy extends sa{constructor(t=new Ft,n=new Ft,a=new Ft,o=new Ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Ft){const a=n,o=this.v0,u=this.v1,c=this.v2,h=this.v3;return a.set(vl(t,o.x,u.x,c.x,h.x),vl(t,o.y,u.y,c.y,h.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Up extends sa{constructor(t=new k,n=new k,a=new k,o=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new k){const a=n,o=this.v0,u=this.v1,c=this.v2,h=this.v3;return a.set(vl(t,o.x,u.x,c.x,h.x),vl(t,o.y,u.y,c.y,h.y),vl(t,o.z,u.z,c.z,h.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class yy extends sa{constructor(t=new Ft,n=new Ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ft){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ft){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class QT extends sa{constructor(t=new k,n=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new k){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new k){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sy extends sa{constructor(t=new Ft,n=new Ft,a=new Ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Ft){const a=n,o=this.v0,u=this.v1,c=this.v2;return a.set(_l(t,o.x,u.x,c.x),_l(t,o.y,u.y,c.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class My extends sa{constructor(t=new k,n=new k,a=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new k){const a=n,o=this.v0,u=this.v1,c=this.v2;return a.set(_l(t,o.x,u.x,c.x),_l(t,o.y,u.y,c.y),_l(t,o.z,u.z,c.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ey extends sa{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ft){const a=n,o=this.points,u=(o.length-1)*t,c=Math.floor(u),h=u-c,m=o[c===0?c:c-1],p=o[c],g=o[c>o.length-2?o.length-1:c+1],_=o[c>o.length-3?o.length-1:c+2];return a.set(Gv(h,m.x,p.x,g.x,_.x),Gv(h,m.y,p.y,g.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Ft().fromArray(o))}return this}}var Lp=Object.freeze({__proto__:null,ArcCurve:VT,CatmullRomCurve3:kT,CubicBezierCurve:xy,CubicBezierCurve3:Up,EllipseCurve:lm,LineCurve:yy,LineCurve3:QT,QuadraticBezierCurve:Sy,QuadraticBezierCurve3:My,SplineCurve:Ey});class jT extends sa{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Lp[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let u=0;for(;u<o.length;){if(o[u]>=a){const c=o[u]-a,h=this.curves[u],m=h.getLength(),p=m===0?0:1-c/m;return h.getPointAt(p,n)}u++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,u=this.curves;o<u.length;o++){const c=u[o],h=c.isEllipseCurve?t*2:c.isLineCurve||c.isLineCurve3?1:c.isSplineCurve?t*c.points.length:t,m=c.getPoints(h);for(let p=0;p<m.length;p++){const g=m[p];a&&a.equals(g)||(n.push(g),a=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new Lp[o.type]().fromJSON(o))}return this}}class Vv extends jT{constructor(t){super(),this.type="Path",this.currentPoint=new Ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new yy(this.currentPoint.clone(),new Ft(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const u=new Sy(this.currentPoint.clone(),new Ft(t,n),new Ft(a,o));return this.curves.push(u),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,u,c){const h=new xy(this.currentPoint.clone(),new Ft(t,n),new Ft(a,o),new Ft(u,c));return this.curves.push(h),this.currentPoint.set(u,c),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new Ey(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,u,c){const h=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+h,n+m,a,o,u,c),this}absarc(t,n,a,o,u,c){return this.absellipse(t,n,a,a,o,u,c),this}ellipse(t,n,a,o,u,c,h,m){const p=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(t+p,n+g,a,o,u,c,h,m),this}absellipse(t,n,a,o,u,c,h,m){const p=new lm(t,n,a,o,u,c,h,m);if(this.curves.length>0){const _=p.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(p);const g=p.getPoint(1);return this.currentPoint.copy(g),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class by extends Vv{constructor(t){super(t),this.uuid=co(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new Vv().fromJSON(o))}return this}}function $T(s,t,n=2){const a=t&&t.length,o=a?t[0]*n:s.length;let u=Ty(s,0,o,n,!0);const c=[];if(!u||u.next===u.prev)return c;let h,m,p;if(a&&(u=a1(s,t,u,n)),s.length>80*n){h=s[0],m=s[1];let g=h,_=m;for(let v=n;v<o;v+=n){const S=s[v],E=s[v+1];S<h&&(h=S),E<m&&(m=E),S>g&&(g=S),E>_&&(_=E)}p=Math.max(g-h,_-m),p=p!==0?32767/p:0}return bl(u,c,n,h,m,p,0),c}function Ty(s,t,n,a,o){let u;if(o===m1(s,t,n,a)>0)for(let c=t;c<n;c+=a)u=kv(c/a|0,s[c],s[c+1],u);else for(let c=n-a;c>=t;c-=a)u=kv(c/a|0,s[c],s[c+1],u);return u&&ro(u,u.next)&&(Al(u),u=u.next),u}function ir(s,t){if(!s)return s;t||(t=s);let n=s,a;do if(a=!1,!n.steiner&&(ro(n,n.next)||an(n.prev,n,n.next)===0)){if(Al(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function bl(s,t,n,a,o,u,c){if(!s)return;!c&&u&&u1(s,a,o,u);let h=s;for(;s.prev!==s.next;){const m=s.prev,p=s.next;if(u?e1(s,a,o,u):t1(s)){t.push(m.i,s.i,p.i),Al(s),s=p.next,h=p.next;continue}if(s=p,s===h){c?c===1?(s=n1(ir(s),t),bl(s,t,n,a,o,u,2)):c===2&&i1(s,t,n,a,o,u):bl(ir(s),t,n,a,o,u,1);break}}}function t1(s){const t=s.prev,n=s,a=s.next;if(an(t,n,a)>=0)return!1;const o=t.x,u=n.x,c=a.x,h=t.y,m=n.y,p=a.y,g=Math.min(o,u,c),_=Math.min(h,m,p),v=Math.max(o,u,c),S=Math.max(h,m,p);let E=a.next;for(;E!==t;){if(E.x>=g&&E.x<=v&&E.y>=_&&E.y<=S&&ml(o,h,u,m,c,p,E.x,E.y)&&an(E.prev,E,E.next)>=0)return!1;E=E.next}return!0}function e1(s,t,n,a){const o=s.prev,u=s,c=s.next;if(an(o,u,c)>=0)return!1;const h=o.x,m=u.x,p=c.x,g=o.y,_=u.y,v=c.y,S=Math.min(h,m,p),E=Math.min(g,_,v),w=Math.max(h,m,p),x=Math.max(g,_,v),y=Np(S,E,t,n,a),U=Np(w,x,t,n,a);let D=s.prevZ,A=s.nextZ;for(;D&&D.z>=y&&A&&A.z<=U;){if(D.x>=S&&D.x<=w&&D.y>=E&&D.y<=x&&D!==o&&D!==c&&ml(h,g,m,_,p,v,D.x,D.y)&&an(D.prev,D,D.next)>=0||(D=D.prevZ,A.x>=S&&A.x<=w&&A.y>=E&&A.y<=x&&A!==o&&A!==c&&ml(h,g,m,_,p,v,A.x,A.y)&&an(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;D&&D.z>=y;){if(D.x>=S&&D.x<=w&&D.y>=E&&D.y<=x&&D!==o&&D!==c&&ml(h,g,m,_,p,v,D.x,D.y)&&an(D.prev,D,D.next)>=0)return!1;D=D.prevZ}for(;A&&A.z<=U;){if(A.x>=S&&A.x<=w&&A.y>=E&&A.y<=x&&A!==o&&A!==c&&ml(h,g,m,_,p,v,A.x,A.y)&&an(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function n1(s,t){let n=s;do{const a=n.prev,o=n.next.next;!ro(a,o)&&Ry(a,n,n.next,o)&&Tl(a,o)&&Tl(o,a)&&(t.push(a.i,n.i,o.i),Al(n),Al(n.next),n=s=o),n=n.next}while(n!==s);return ir(n)}function i1(s,t,n,a,o,u){let c=s;do{let h=c.next.next;for(;h!==c.prev;){if(c.i!==h.i&&h1(c,h)){let m=Cy(c,h);c=ir(c,c.next),m=ir(m,m.next),bl(c,t,n,a,o,u,0),bl(m,t,n,a,o,u,0);return}h=h.next}c=c.next}while(c!==s)}function a1(s,t,n,a){const o=[];for(let u=0,c=t.length;u<c;u++){const h=t[u]*a,m=u<c-1?t[u+1]*a:s.length,p=Ty(s,h,m,a,!1);p===p.next&&(p.steiner=!0),o.push(f1(p))}o.sort(s1);for(let u=0;u<o.length;u++)n=r1(o[u],n);return n}function s1(s,t){let n=s.x-t.x;if(n===0&&(n=s.y-t.y,n===0)){const a=(s.next.y-s.y)/(s.next.x-s.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function r1(s,t){const n=o1(s,t);if(!n)return t;const a=Cy(n,s);return ir(a,a.next),ir(n,n.next)}function o1(s,t){let n=t;const a=s.x,o=s.y;let u=-1/0,c;if(ro(s,n))return n;do{if(ro(s,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const _=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=a&&_>u&&(u=_,c=n.x<n.next.x?n:n.next,_===a))return c}n=n.next}while(n!==t);if(!c)return null;const h=c,m=c.x,p=c.y;let g=1/0;n=c;do{if(a>=n.x&&n.x>=m&&a!==n.x&&Ay(o<p?a:u,o,m,p,o<p?u:a,o,n.x,n.y)){const _=Math.abs(o-n.y)/(a-n.x);Tl(n,s)&&(_<g||_===g&&(n.x>c.x||n.x===c.x&&l1(c,n)))&&(c=n,g=_)}n=n.next}while(n!==h);return c}function l1(s,t){return an(s.prev,s,t.prev)<0&&an(t.next,s,s.next)<0}function u1(s,t,n,a){let o=s;do o.z===0&&(o.z=Np(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==s);o.prevZ.nextZ=null,o.prevZ=null,c1(o)}function c1(s){let t,n=1;do{let a=s,o;s=null;let u=null;for(t=0;a;){t++;let c=a,h=0;for(let p=0;p<n&&(h++,c=c.nextZ,!!c);p++);let m=n;for(;h>0||m>0&&c;)h!==0&&(m===0||!c||a.z<=c.z)?(o=a,a=a.nextZ,h--):(o=c,c=c.nextZ,m--),u?u.nextZ=o:s=o,o.prevZ=u,u=o;a=c}u.nextZ=null,n*=2}while(t>1);return s}function Np(s,t,n,a,o){return s=(s-n)*o|0,t=(t-a)*o|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function f1(s){let t=s,n=s;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==s);return n}function Ay(s,t,n,a,o,u,c,h){return(o-c)*(t-h)>=(s-c)*(u-h)&&(s-c)*(a-h)>=(n-c)*(t-h)&&(n-c)*(u-h)>=(o-c)*(a-h)}function ml(s,t,n,a,o,u,c,h){return!(s===c&&t===h)&&Ay(s,t,n,a,o,u,c,h)}function h1(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!d1(s,t)&&(Tl(s,t)&&Tl(t,s)&&p1(s,t)&&(an(s.prev,s,t.prev)||an(s,t.prev,t))||ro(s,t)&&an(s.prev,s,s.next)>0&&an(t.prev,t,t.next)>0)}function an(s,t,n){return(t.y-s.y)*(n.x-t.x)-(t.x-s.x)*(n.y-t.y)}function ro(s,t){return s.x===t.x&&s.y===t.y}function Ry(s,t,n,a){const o=cc(an(s,t,n)),u=cc(an(s,t,a)),c=cc(an(n,a,s)),h=cc(an(n,a,t));return!!(o!==u&&c!==h||o===0&&uc(s,n,t)||u===0&&uc(s,a,t)||c===0&&uc(n,s,a)||h===0&&uc(n,t,a))}function uc(s,t,n){return t.x<=Math.max(s.x,n.x)&&t.x>=Math.min(s.x,n.x)&&t.y<=Math.max(s.y,n.y)&&t.y>=Math.min(s.y,n.y)}function cc(s){return s>0?1:s<0?-1:0}function d1(s,t){let n=s;do{if(n.i!==s.i&&n.next.i!==s.i&&n.i!==t.i&&n.next.i!==t.i&&Ry(n,n.next,s,t))return!0;n=n.next}while(n!==s);return!1}function Tl(s,t){return an(s.prev,s,s.next)<0?an(s,t,s.next)>=0&&an(s,s.prev,t)>=0:an(s,t,s.prev)<0||an(s,s.next,t)<0}function p1(s,t){let n=s,a=!1;const o=(s.x+t.x)/2,u=(s.y+t.y)/2;do n.y>u!=n.next.y>u&&n.next.y!==n.y&&o<(n.next.x-n.x)*(u-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==s);return a}function Cy(s,t){const n=Pp(s.i,s.x,s.y),a=Pp(t.i,t.x,t.y),o=s.next,u=t.prev;return s.next=t,t.prev=s,n.next=o,o.prev=n,a.next=n,n.prev=a,u.next=a,a.prev=u,a}function kv(s,t,n,a){const o=Pp(s,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function Al(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pp(s,t,n){return{i:s,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function m1(s,t,n,a){let o=0;for(let u=t,c=n-a;u<n;u+=a)o+=(s[c]-s[u])*(s[u+1]+s[c+1]),c=u;return o}class g1{static triangulate(t,n,a=2){return $T(t,n,a)}}class xl{static area(t){const n=t.length;let a=0;for(let o=n-1,u=0;u<n;o=u++)a+=t[o].x*t[u].y-t[u].x*t[o].y;return a*.5}static isClockWise(t){return xl.area(t)<0}static triangulateShape(t,n){const a=[],o=[],u=[];Xv(t),Wv(a,t);let c=t.length;n.forEach(Xv);for(let m=0;m<n.length;m++)o.push(c),c+=n[m].length,Wv(a,n[m]);const h=g1.triangulate(a,o);for(let m=0;m<h.length;m+=3)u.push(h.slice(m,m+3));return u}}function Xv(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Wv(s,t){for(let n=0;n<t.length;n++)s.push(t[n].x),s.push(t[n].y)}class Ss extends kn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const u=t/2,c=n/2,h=Math.floor(a),m=Math.floor(o),p=h+1,g=m+1,_=t/h,v=n/m,S=[],E=[],w=[],x=[];for(let y=0;y<g;y++){const U=y*v-c;for(let D=0;D<p;D++){const A=D*_-u;E.push(A,-U,0),w.push(0,0,1),x.push(D/h),x.push(1-y/m)}}for(let y=0;y<m;y++)for(let U=0;U<h;U++){const D=U+p*y,A=U+p*(y+1),O=U+1+p*(y+1),L=U+1+p*y;S.push(D,A,L),S.push(A,O,L)}this.setIndex(S),this.setAttribute("position",new mn(E,3)),this.setAttribute("normal",new mn(w,3)),this.setAttribute("uv",new mn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ss(t.width,t.height,t.widthSegments,t.heightSegments)}}class cm extends kn{constructor(t=new by([new Ft(0,.5),new Ft(-.5,-.5),new Ft(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const a=[],o=[],u=[],c=[];let h=0,m=0;if(Array.isArray(t)===!1)p(t);else for(let g=0;g<t.length;g++)p(t[g]),this.addGroup(h,m,g),h+=m,m=0;this.setIndex(a),this.setAttribute("position",new mn(o,3)),this.setAttribute("normal",new mn(u,3)),this.setAttribute("uv",new mn(c,2));function p(g){const _=o.length/3,v=g.extractPoints(n);let S=v.shape;const E=v.holes;xl.isClockWise(S)===!1&&(S=S.reverse());for(let x=0,y=E.length;x<y;x++){const U=E[x];xl.isClockWise(U)===!0&&(E[x]=U.reverse())}const w=xl.triangulateShape(S,E);for(let x=0,y=E.length;x<y;x++){const U=E[x];S=S.concat(U)}for(let x=0,y=S.length;x<y;x++){const U=S[x];o.push(U.x,U.y,0),u.push(0,0,1),c.push(U.x,U.y)}for(let x=0,y=w.length;x<y;x++){const U=w[x],D=U[0]+_,A=U[1]+_,O=U[2]+_;a.push(D,A,O),m+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes;return _1(n,t)}static fromJSON(t,n){const a=[];for(let o=0,u=t.shapes.length;o<u;o++){const c=n[t.shapes[o]];a.push(c)}return new cm(a,t.curveSegments)}}function _1(s,t){if(t.shapes=[],Array.isArray(s))for(let n=0,a=s.length;n<a;n++){const o=s[n];t.shapes.push(o.uuid)}else t.shapes.push(s.uuid);return t}class vs extends kn{constructor(t=1,n=32,a=16,o=0,u=Math.PI*2,c=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:u,thetaStart:c,thetaLength:h},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(c+h,Math.PI);let p=0;const g=[],_=new k,v=new k,S=[],E=[],w=[],x=[];for(let y=0;y<=a;y++){const U=[],D=y/a,A=c+D*h,O=t*Math.cos(A),L=Math.sqrt(t*t-O*O);let I=0;y===0&&c===0?I=.5/n:y===a&&m===Math.PI&&(I=-.5/n);for(let T=0;T<=n;T++){const N=T/n,W=o+N*u;_.x=-L*Math.cos(W),_.y=O,_.z=L*Math.sin(W),E.push(_.x,_.y,_.z),v.copy(_).normalize(),w.push(v.x,v.y,v.z),x.push(N+I,1-D),U.push(p++)}g.push(U)}for(let y=0;y<a;y++)for(let U=0;U<n;U++){const D=g[y][U+1],A=g[y][U],O=g[y+1][U],L=g[y+1][U+1];(y!==0||c>0)&&S.push(D,A,L),(y!==a-1||m<Math.PI)&&S.push(A,O,L)}this.setIndex(S),this.setAttribute("position",new mn(E,3)),this.setAttribute("normal",new mn(w,3)),this.setAttribute("uv",new mn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Nc extends kn{constructor(t=new My(new k(-1,-1,0),new k(-1,1,0),new k(1,1,0)),n=64,a=1,o=8,u=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:a,radialSegments:o,closed:u};const c=t.computeFrenetFrames(n,u);this.tangents=c.tangents,this.normals=c.normals,this.binormals=c.binormals;const h=new k,m=new k,p=new Ft;let g=new k;const _=[],v=[],S=[],E=[];w(),this.setIndex(E),this.setAttribute("position",new mn(_,3)),this.setAttribute("normal",new mn(v,3)),this.setAttribute("uv",new mn(S,2));function w(){for(let D=0;D<n;D++)x(D);x(u===!1?n:0),U(),y()}function x(D){g=t.getPointAt(D/n,g);const A=c.normals[D],O=c.binormals[D];for(let L=0;L<=o;L++){const I=L/o*Math.PI*2,T=Math.sin(I),N=-Math.cos(I);m.x=N*A.x+T*O.x,m.y=N*A.y+T*O.y,m.z=N*A.z+T*O.z,m.normalize(),v.push(m.x,m.y,m.z),h.x=g.x+a*m.x,h.y=g.y+a*m.y,h.z=g.z+a*m.z,_.push(h.x,h.y,h.z)}}function y(){for(let D=1;D<=n;D++)for(let A=1;A<=o;A++){const O=(o+1)*(D-1)+(A-1),L=(o+1)*D+(A-1),I=(o+1)*D+A,T=(o+1)*(D-1)+A;E.push(O,L,T),E.push(L,I,T)}}function U(){for(let D=0;D<=n;D++)for(let A=0;A<=o;A++)p.x=D/n,p.y=A/o,S.push(p.x,p.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Nc(new Lp[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function oo(s){const t={};for(const n in s){t[n]={};for(const a in s[n]){const o=s[n][a];if(qv(o))o.isRenderTargetTexture?(se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(qv(o[0])){const u=[];for(let c=0,h=o.length;c<h;c++)u[c]=o[c].clone();t[n][a]=u}else t[n][a]=o.slice();else t[n][a]=o}}return t}function Wn(s){const t={};for(let n=0;n<s.length;n++){const a=oo(s[n]);for(const o in a)t[o]=a[o]}return t}function qv(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function v1(s){const t=[];for(let n=0;n<s.length;n++)t.push(s[n].clone());return t}function wy(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:be.workingColorSpace}const x1={clone:oo,merge:Wn};var y1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,S1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends fo{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=y1,this.fragmentShader=S1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=oo(t.uniforms),this.uniformsGroups=v1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const c=this.uniforms[o].value;c&&c.isTexture?n.uniforms[o]={type:"t",value:c.toJSON(t).uuid}:c&&c.isColor?n.uniforms[o]={type:"c",value:c.getHex()}:c&&c.isVector2?n.uniforms[o]={type:"v2",value:c.toArray()}:c&&c.isVector3?n.uniforms[o]={type:"v3",value:c.toArray()}:c&&c.isVector4?n.uniforms[o]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?n.uniforms[o]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?n.uniforms[o]={type:"m4",value:c.toArray()}:n.uniforms[o]={value:c}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new Te().setHex(o.value);break;case"v2":this.uniforms[a].value=new Ft().fromArray(o.value);break;case"v3":this.uniforms[a].value=new k().fromArray(o.value);break;case"v4":this.uniforms[a].value=new nn().fromArray(o.value);break;case"m3":this.uniforms[a].value=new ue().fromArray(o.value);break;case"m4":this.uniforms[a].value=new Qe().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class M1 extends ii{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gn extends fo{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cp,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ts,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class E1 extends fo{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class b1 extends fo{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class fm extends zn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Ud=new Qe,Yv=new k,Zv=new k;class Dy{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new om,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,a=this.matrix;Yv.setFromMatrixPosition(t.matrixWorld),n.position.copy(Yv),Zv.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Zv),n.updateMatrixWorld(),Ud.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ud,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===El||n.reversedDepth?a.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):a.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),a.multiply(Ud)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const fc=new k,hc=new bs,Ki=new k;class Uy extends zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=ta,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(fc,hc,Ki),Ki.x===1&&Ki.y===1&&Ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fc,hc,Ki.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(fc,hc,Ki),Ki.x===1&&Ki.y===1&&Ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fc,hc,Ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gs=new k,Kv=new Ft,Jv=new Ft;class _i extends Uy{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=wp*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ec*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wp*2*Math.atan(Math.tan(Ec*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gs.x,gs.y).multiplyScalar(-t/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(gs.x,gs.y).multiplyScalar(-t/gs.z)}getViewSize(t,n){return this.getViewBounds(t,Kv,Jv),n.subVectors(Jv,Kv)}setViewOffset(t,n,a,o,u,c){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=u,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Ec*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,u=-.5*o;const c=this.view;if(this.view!==null&&this.view.enabled){const m=c.fullWidth,p=c.fullHeight;u+=c.offsetX*o/m,n-=c.offsetY*a/p,o*=c.width/m,a*=c.height/p}const h=this.filmOffset;h!==0&&(u+=t*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class T1 extends Dy{constructor(){super(new _i(90,1,.5,500)),this.isPointLightShadow=!0}}class A1 extends fm{constructor(t,n,a=0,o=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=o,this.shadow=new T1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class hm extends Uy{constructor(t=-1,n=1,a=1,o=-1,u=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=u,this.far=c,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,u,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=u,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let u=a-t,c=a+t,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,c=u+p*this.view.width,h-=g*this.view.offsetY,m=h-g*this.view.height}this.projectionMatrix.makeOrthographic(u,c,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class R1 extends Dy{constructor(){super(new hm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class C1 extends fm{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zn.DEFAULT_UP),this.updateMatrix(),this.target=new zn,this.shadow=new R1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class w1 extends fm{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const Yr=-90,Zr=1;class D1 extends zn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new _i(Yr,Zr,t,n);o.layers=this.layers,this.add(o);const u=new _i(Yr,Zr,t,n);u.layers=this.layers,this.add(u);const c=new _i(Yr,Zr,t,n);c.layers=this.layers,this.add(c);const h=new _i(Yr,Zr,t,n);h.layers=this.layers,this.add(h);const m=new _i(Yr,Zr,t,n);m.layers=this.layers,this.add(m);const p=new _i(Yr,Zr,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,u,c,h,m]=n;for(const p of n)this.remove(p);if(t===ta)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===El)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,c,h,m,p,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),S=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let x=!1;t.isWebGLRenderer===!0?x=t.state.buffers.depth.getReversed():x=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),x&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,1,o),x&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,2,o),x&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(a,3,o),x&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,4,o),x&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,o),x&&t.autoClear===!1&&t.clearDepth(),t.render(n,g),t.setRenderTarget(_,v,S),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class U1 extends _i{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Qv=new Qe;class L1{constructor(t,n,a=0,o=1/0){this.ray=new Hc(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new sm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ae("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return Qv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qv),this}intersectObject(t,n=!0,a=[]){return Op(t,this,a,n),a.sort(jv),a}intersectObjects(t,n=!0,a=[]){for(let o=0,u=t.length;o<u;o++)Op(t[o],this,a,n);return a.sort(jv),a}}function jv(s,t){return s.distance-t.distance}function Op(s,t,n,a){let o=!0;if(s.layers.test(t.layers)&&s.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const u=s.children;for(let c=0,h=u.length;c<h;c++)Op(u[c],t,n,!0)}}class N1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,se("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}class $v{constructor(t=1,n=0,a=0){this.radius=t,this.phi=n,this.theta=a}set(t,n,a){return this.radius=t,this.phi=n,this.theta=a,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,a){return this.radius=Math.sqrt(t*t+n*n+a*a),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,a),this.phi=Math.acos(ge(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const vm=class vm{constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const u=this.elements;return u[0]=t,u[2]=n,u[1]=a,u[3]=o,this}};vm.prototype.isMatrix2=!0;let tx=vm;class P1 extends As{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){se("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function ex(s,t,n,a){const o=O1(a);switch(n){case ly:return s*t;case cy:return s*t/o.components*o.byteLength;case $p:return s*t/o.components*o.byteLength;case nr:return s*t*2/o.components*o.byteLength;case tm:return s*t*2/o.components*o.byteLength;case uy:return s*t*3/o.components*o.byteLength;case Gi:return s*t*4/o.components*o.byteLength;case em:return s*t*4/o.components*o.byteLength;case xc:case yc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Sc:case Mc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case $d:case ep:return Math.max(s,16)*Math.max(t,8)/4;case jd:case tp:return Math.max(s,8)*Math.max(t,8)/2;case np:case ip:case sp:case rp:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ap:case Rc:case op:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case lp:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case up:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case cp:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case fp:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case hp:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case dp:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case pp:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case mp:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case gp:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case _p:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case vp:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case xp:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case yp:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Sp:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Mp:case Ep:case bp:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Tp:case Ap:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Cc:case Rp:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function O1(s){switch(s){case vi:case ay:return{byteLength:1,components:1};case Sl:case sy:case Pa:return{byteLength:2,components:1};case Qp:case jp:return{byteLength:2,components:4};case aa:case Jp:case $i:return{byteLength:4,components:1};case ry:case oy:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zp}}));typeof window<"u"&&(window.__THREE__?se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zp);function Ly(){let s=null,t=!1,n=null,a=null;function o(u,c){n(u,c),a=s.requestAnimationFrame(o)}return{start:function(){t!==!0&&n!==null&&s!==null&&(a=s.requestAnimationFrame(o),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(u){n=u},setContext:function(u){s=u}}}function z1(s){const t=new WeakMap;function n(h,m){const p=h.array,g=h.usage,_=p.byteLength,v=s.createBuffer();s.bindBuffer(m,v),s.bufferData(m,p,g),h.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=s.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:_}}function a(h,m,p){const g=m.array,_=m.updateRanges;if(s.bindBuffer(p,h),_.length===0)s.bufferSubData(p,0,g);else{_.sort((S,E)=>S.start-E.start);let v=0;for(let S=1;S<_.length;S++){const E=_[v],w=_[S];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++v,_[v]=w)}_.length=v+1;for(let S=0,E=_.length;S<E;S++){const w=_[S];s.bufferSubData(p,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),t.get(h)}function u(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=t.get(h);m&&(s.deleteBuffer(m.buffer),t.delete(h))}function c(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=t.get(h);(!g||g.version<h.version)&&t.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=t.get(h);if(p===void 0)t.set(h,n(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,h,m),p.version=h.version}}return{get:o,remove:u,update:c}}var I1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,B1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,H1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,G1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,V1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,X1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,W1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,q1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Y1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Z1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,K1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,J1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Q1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,j1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,iA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,aA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,oA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,uA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dA="gl_FragColor = linearToOutputTexel( gl_FragColor );",pA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_A=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,MA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,EA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,TA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,RA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,wA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,DA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,LA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,NA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,OA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,IA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,FA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BA=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,HA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,GA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,XA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,WA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,YA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,KA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,JA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,QA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$A=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,oR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_R=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,yR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,SR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,MR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ER=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,TR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,AR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,RR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,DR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,UR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,LR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,NR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const IR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,FR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,XR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,WR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,YR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$R=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tC=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eC=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nC=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iC=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,aC=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sC=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rC=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oC=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lC=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uC=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cC=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fC=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dC=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pC=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mC=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,me={alphahash_fragment:I1,alphahash_pars_fragment:F1,alphamap_fragment:B1,alphamap_pars_fragment:H1,alphatest_fragment:G1,alphatest_pars_fragment:V1,aomap_fragment:k1,aomap_pars_fragment:X1,batching_pars_vertex:W1,batching_vertex:q1,begin_vertex:Y1,beginnormal_vertex:Z1,bsdfs:K1,iridescence_fragment:J1,bumpmap_pars_fragment:Q1,clipping_planes_fragment:j1,clipping_planes_pars_fragment:$1,clipping_planes_pars_vertex:tA,clipping_planes_vertex:eA,color_fragment:nA,color_pars_fragment:iA,color_pars_vertex:aA,color_vertex:sA,common:rA,cube_uv_reflection_fragment:oA,defaultnormal_vertex:lA,displacementmap_pars_vertex:uA,displacementmap_vertex:cA,emissivemap_fragment:fA,emissivemap_pars_fragment:hA,colorspace_fragment:dA,colorspace_pars_fragment:pA,envmap_fragment:mA,envmap_common_pars_fragment:gA,envmap_pars_fragment:_A,envmap_pars_vertex:vA,envmap_physical_pars_fragment:wA,envmap_vertex:xA,fog_vertex:yA,fog_pars_vertex:SA,fog_fragment:MA,fog_pars_fragment:EA,gradientmap_pars_fragment:bA,lightmap_pars_fragment:TA,lights_lambert_fragment:AA,lights_lambert_pars_fragment:RA,lights_pars_begin:CA,lights_toon_fragment:DA,lights_toon_pars_fragment:UA,lights_phong_fragment:LA,lights_phong_pars_fragment:NA,lights_physical_fragment:PA,lights_physical_pars_fragment:OA,lights_fragment_begin:zA,lights_fragment_maps:IA,lights_fragment_end:FA,lightprobes_pars_fragment:BA,logdepthbuf_fragment:HA,logdepthbuf_pars_fragment:GA,logdepthbuf_pars_vertex:VA,logdepthbuf_vertex:kA,map_fragment:XA,map_pars_fragment:WA,map_particle_fragment:qA,map_particle_pars_fragment:YA,metalnessmap_fragment:ZA,metalnessmap_pars_fragment:KA,morphinstance_vertex:JA,morphcolor_vertex:QA,morphnormal_vertex:jA,morphtarget_pars_vertex:$A,morphtarget_vertex:tR,normal_fragment_begin:eR,normal_fragment_maps:nR,normal_pars_fragment:iR,normal_pars_vertex:aR,normal_vertex:sR,normalmap_pars_fragment:rR,clearcoat_normal_fragment_begin:oR,clearcoat_normal_fragment_maps:lR,clearcoat_pars_fragment:uR,iridescence_pars_fragment:cR,opaque_fragment:fR,packing:hR,premultiplied_alpha_fragment:dR,project_vertex:pR,dithering_fragment:mR,dithering_pars_fragment:gR,roughnessmap_fragment:_R,roughnessmap_pars_fragment:vR,shadowmap_pars_fragment:xR,shadowmap_pars_vertex:yR,shadowmap_vertex:SR,shadowmask_pars_fragment:MR,skinbase_vertex:ER,skinning_pars_vertex:bR,skinning_vertex:TR,skinnormal_vertex:AR,specularmap_fragment:RR,specularmap_pars_fragment:CR,tonemapping_fragment:wR,tonemapping_pars_fragment:DR,transmission_fragment:UR,transmission_pars_fragment:LR,uv_pars_fragment:NR,uv_pars_vertex:PR,uv_vertex:OR,worldpos_vertex:zR,background_vert:IR,background_frag:FR,backgroundCube_vert:BR,backgroundCube_frag:HR,cube_vert:GR,cube_frag:VR,depth_vert:kR,depth_frag:XR,distance_vert:WR,distance_frag:qR,equirect_vert:YR,equirect_frag:ZR,linedashed_vert:KR,linedashed_frag:JR,meshbasic_vert:QR,meshbasic_frag:jR,meshlambert_vert:$R,meshlambert_frag:tC,meshmatcap_vert:eC,meshmatcap_frag:nC,meshnormal_vert:iC,meshnormal_frag:aC,meshphong_vert:sC,meshphong_frag:rC,meshphysical_vert:oC,meshphysical_frag:lC,meshtoon_vert:uC,meshtoon_frag:cC,points_vert:fC,points_frag:hC,shadow_vert:dC,shadow_frag:pC,sprite_vert:mC,sprite_frag:gC},It={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ue}},envmap:{envMap:{value:null},envMapRotation:{value:new ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ue},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0},uvTransform:{value:new ue}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}}},Qi={basic:{uniforms:Wn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Wn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Te(0)},envMapIntensity:{value:1}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Wn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Wn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Wn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new Te(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Wn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Wn([It.points,It.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Wn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Wn([It.common,It.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Wn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Wn([It.sprite,It.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ue}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distance:{uniforms:Wn([It.common,It.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distance_vert,fragmentShader:me.distance_frag},shadow:{uniforms:Wn([It.lights,It.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};Qi.physical={uniforms:Wn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ue},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ue},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ue},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ue},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ue},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ue}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};const dc={r:0,b:0,g:0},_C=new Qe,Ny=new ue;Ny.set(-1,0,0,0,1,0,0,0,1);function vC(s,t,n,a,o,u){const c=new Te(0);let h=o===!0?0:1,m,p,g=null,_=0,v=null;function S(U){let D=U.isScene===!0?U.background:null;if(D&&D.isTexture){const A=U.backgroundBlurriness>0;D=t.get(D,A)}return D}function E(U){let D=!1;const A=S(U);A===null?x(c,h):A&&A.isColor&&(x(A,1),D=!0);const O=s.xr.getEnvironmentBlendMode();O==="additive"?n.buffers.color.setClear(0,0,0,1,u):O==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,u),(s.autoClear||D)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function w(U,D){const A=S(D);A&&(A.isCubeTexture||A.mapping===Fc)?(p===void 0&&(p=new Re(new ji(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:oo(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(O,L,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(_C.makeRotationFromEuler(D.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Ny),p.material.toneMapped=be.getTransfer(A.colorSpace)!==He,(g!==A||_!==A.version||v!==s.toneMapping)&&(p.material.needsUpdate=!0,g=A,_=A.version,v=s.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new Re(new Ss(2,2),new ii({name:"BackgroundMaterial",uniforms:oo(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:Es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,m.material.toneMapped=be.getTransfer(A.colorSpace)!==He,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||_!==A.version||v!==s.toneMapping)&&(m.material.needsUpdate=!0,g=A,_=A.version,v=s.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null))}function x(U,D){U.getRGB(dc,wy(s)),n.buffers.color.setClear(dc.r,dc.g,dc.b,D,u)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return c},setClearColor:function(U,D=1){c.set(U),h=D,x(c,h)},getClearAlpha:function(){return h},setClearAlpha:function(U){h=U,x(c,h)},render:E,addToRenderList:w,dispose:y}}function xC(s,t){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),a={},o=v(null);let u=o,c=!1;function h(G,q,ht,pt,J){let F=!1;const H=_(G,pt,ht,q);u!==H&&(u=H,p(u.object)),F=S(G,pt,ht,J),F&&E(G,pt,ht,J),J!==null&&t.update(J,s.ELEMENT_ARRAY_BUFFER),(F||c)&&(c=!1,A(G,q,ht,pt),J!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function m(){return s.createVertexArray()}function p(G){return s.bindVertexArray(G)}function g(G){return s.deleteVertexArray(G)}function _(G,q,ht,pt){const J=pt.wireframe===!0;let F=a[q.id];F===void 0&&(F={},a[q.id]=F);const H=G.isInstancedMesh===!0?G.id:0;let nt=F[H];nt===void 0&&(nt={},F[H]=nt);let St=nt[ht.id];St===void 0&&(St={},nt[ht.id]=St);let At=St[J];return At===void 0&&(At=v(m()),St[J]=At),At}function v(G){const q=[],ht=[],pt=[];for(let J=0;J<n;J++)q[J]=0,ht[J]=0,pt[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ht,attributeDivisors:pt,object:G,attributes:{},index:null}}function S(G,q,ht,pt){const J=u.attributes,F=q.attributes;let H=0;const nt=ht.getAttributes();for(const St in nt)if(nt[St].location>=0){const z=J[St];let j=F[St];if(j===void 0&&(St==="instanceMatrix"&&G.instanceMatrix&&(j=G.instanceMatrix),St==="instanceColor"&&G.instanceColor&&(j=G.instanceColor)),z===void 0||z.attribute!==j||j&&z.data!==j.data)return!0;H++}return u.attributesNum!==H||u.index!==pt}function E(G,q,ht,pt){const J={},F=q.attributes;let H=0;const nt=ht.getAttributes();for(const St in nt)if(nt[St].location>=0){let z=F[St];z===void 0&&(St==="instanceMatrix"&&G.instanceMatrix&&(z=G.instanceMatrix),St==="instanceColor"&&G.instanceColor&&(z=G.instanceColor));const j={};j.attribute=z,z&&z.data&&(j.data=z.data),J[St]=j,H++}u.attributes=J,u.attributesNum=H,u.index=pt}function w(){const G=u.newAttributes;for(let q=0,ht=G.length;q<ht;q++)G[q]=0}function x(G){y(G,0)}function y(G,q){const ht=u.newAttributes,pt=u.enabledAttributes,J=u.attributeDivisors;ht[G]=1,pt[G]===0&&(s.enableVertexAttribArray(G),pt[G]=1),J[G]!==q&&(s.vertexAttribDivisor(G,q),J[G]=q)}function U(){const G=u.newAttributes,q=u.enabledAttributes;for(let ht=0,pt=q.length;ht<pt;ht++)q[ht]!==G[ht]&&(s.disableVertexAttribArray(ht),q[ht]=0)}function D(G,q,ht,pt,J,F,H){H===!0?s.vertexAttribIPointer(G,q,ht,J,F):s.vertexAttribPointer(G,q,ht,pt,J,F)}function A(G,q,ht,pt){w();const J=pt.attributes,F=ht.getAttributes(),H=q.defaultAttributeValues;for(const nt in F){const St=F[nt];if(St.location>=0){let At=J[nt];if(At===void 0&&(nt==="instanceMatrix"&&G.instanceMatrix&&(At=G.instanceMatrix),nt==="instanceColor"&&G.instanceColor&&(At=G.instanceColor)),At!==void 0){const z=At.normalized,j=At.itemSize,bt=t.get(At);if(bt===void 0)continue;const ot=bt.buffer,_t=bt.type,V=bt.bytesPerElement,Q=_t===s.INT||_t===s.UNSIGNED_INT||At.gpuType===Jp;if(At.isInterleavedBufferAttribute){const et=At.data,Rt=et.stride,Yt=At.offset;if(et.isInstancedInterleavedBuffer){for(let Zt=0;Zt<St.locationSize;Zt++)y(St.location+Zt,et.meshPerAttribute);G.isInstancedMesh!==!0&&pt._maxInstanceCount===void 0&&(pt._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Zt=0;Zt<St.locationSize;Zt++)x(St.location+Zt);s.bindBuffer(s.ARRAY_BUFFER,ot);for(let Zt=0;Zt<St.locationSize;Zt++)D(St.location+Zt,j/St.locationSize,_t,z,Rt*V,(Yt+j/St.locationSize*Zt)*V,Q)}else{if(At.isInstancedBufferAttribute){for(let et=0;et<St.locationSize;et++)y(St.location+et,At.meshPerAttribute);G.isInstancedMesh!==!0&&pt._maxInstanceCount===void 0&&(pt._maxInstanceCount=At.meshPerAttribute*At.count)}else for(let et=0;et<St.locationSize;et++)x(St.location+et);s.bindBuffer(s.ARRAY_BUFFER,ot);for(let et=0;et<St.locationSize;et++)D(St.location+et,j/St.locationSize,_t,z,j*V,j/St.locationSize*et*V,Q)}}else if(H!==void 0){const z=H[nt];if(z!==void 0)switch(z.length){case 2:s.vertexAttrib2fv(St.location,z);break;case 3:s.vertexAttrib3fv(St.location,z);break;case 4:s.vertexAttrib4fv(St.location,z);break;default:s.vertexAttrib1fv(St.location,z)}}}}U()}function O(){N();for(const G in a){const q=a[G];for(const ht in q){const pt=q[ht];for(const J in pt){const F=pt[J];for(const H in F)g(F[H].object),delete F[H];delete pt[J]}}delete a[G]}}function L(G){if(a[G.id]===void 0)return;const q=a[G.id];for(const ht in q){const pt=q[ht];for(const J in pt){const F=pt[J];for(const H in F)g(F[H].object),delete F[H];delete pt[J]}}delete a[G.id]}function I(G){for(const q in a){const ht=a[q];for(const pt in ht){const J=ht[pt];if(J[G.id]===void 0)continue;const F=J[G.id];for(const H in F)g(F[H].object),delete F[H];delete J[G.id]}}}function T(G){for(const q in a){const ht=a[q],pt=G.isInstancedMesh===!0?G.id:0,J=ht[pt];if(J!==void 0){for(const F in J){const H=J[F];for(const nt in H)g(H[nt].object),delete H[nt];delete J[F]}delete ht[pt],Object.keys(ht).length===0&&delete a[q]}}}function N(){W(),c=!0,u!==o&&(u=o,p(u.object))}function W(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:N,resetDefaultState:W,dispose:O,releaseStatesOfGeometry:L,releaseStatesOfObject:T,releaseStatesOfProgram:I,initAttributes:w,enableAttribute:x,disableUnusedAttributes:U}}function yC(s,t,n){let a;function o(m){a=m}function u(m,p){s.drawArrays(a,m,p),n.update(p,a,1)}function c(m,p,g){g!==0&&(s.drawArraysInstanced(a,m,p,g),n.update(p,a,g))}function h(m,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,p,0,g);let v=0;for(let S=0;S<g;S++)v+=p[S];n.update(v,a,1)}this.setMode=o,this.render=u,this.renderInstances=c,this.renderMultiDraw=h}function SC(s,t,n,a){let o;function u(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");o=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function c(I){return!(I!==Gi&&a.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(I){const T=I===Pa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==vi&&a.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==$i&&!T)}function m(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=m(p);g!==p&&(se("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=n.logarithmicDepthBuffer===!0,v=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&v===!1&&se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),U=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),D=s.getParameter(s.MAX_VARYING_VECTORS),A=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),O=s.getParameter(s.MAX_SAMPLES),L=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:c,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:S,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:x,maxAttributes:y,maxVertexUniforms:U,maxVaryings:D,maxFragmentUniforms:A,maxSamples:O,samples:L}}function MC(s){const t=this;let n=null,a=0,o=!1,u=!1;const c=new _s,h=new ue,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const S=_.length!==0||v||a!==0||o;return o=v,a=_.length,S},this.beginShadows=function(){u=!0,g(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(_,v){n=g(_,v,0)},this.setState=function(_,v,S){const E=_.clippingPlanes,w=_.clipIntersection,x=_.clipShadows,y=s.get(_);if(!o||E===null||E.length===0||u&&!x)u?g(null):p();else{const U=u?0:a,D=U*4;let A=y.clippingState||null;m.value=A,A=g(E,v,D,S);for(let O=0;O!==D;++O)A[O]=n[O];y.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=U}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,v,S,E){const w=_!==null?_.length:0;let x=null;if(w!==0){if(x=m.value,E!==!0||x===null){const y=S+w*4,U=v.matrixWorldInverse;h.getNormalMatrix(U),(x===null||x.length<y)&&(x=new Float32Array(y));for(let D=0,A=S;D!==w;++D,A+=4)c.copy(_[D]).applyMatrix4(U,h),c.normal.toArray(x,A),x[A+3]=c.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,x}}const Ms=4,nx=[.125,.215,.35,.446,.526,.582],js=20,EC=256,hl=new hm,ix=new Te;let Ld=null,Nd=0,Pd=0,Od=!1;const bC=new k;class ax{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,u={}){const{size:c=256,position:h=bC}=u;Ld=this._renderer.getRenderTarget(),Nd=this._renderer.getActiveCubeFace(),Pd=this._renderer.getActiveMipmapLevel(),Od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ox(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ld,Nd,Pd),this._renderer.xr.enabled=Od,t.scissorTest=!1,Kr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===er||t.mapping===ao?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ld=this._renderer.getRenderTarget(),Nd=this._renderer.getActiveCubeFace(),Pd=this._renderer.getActiveMipmapLevel(),Od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Pa,format:Gi,colorSpace:wc,depthBuffer:!1},o=sx(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sx(t,n,a);const{_lodMax:u}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=TC(u)),this._blurMaterial=RC(u,t,n),this._ggxMaterial=AC(u,t,n)}return o}_compileMaterial(t){const n=new Re(new kn,t);this._renderer.compile(n,hl)}_sceneToCubeUV(t,n,a,o,u){const m=new _i(90,1,n,a),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,S=_.toneMapping;_.getClearColor(ix),_.toneMapping=ea,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Re(new ji,new Qr({name:"PMREM.Background",side:qn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,x=w.material;let y=!1;const U=t.background;U?U.isColor&&(x.color.copy(U),t.background=null,y=!0):(x.color.copy(ix),y=!0);for(let D=0;D<6;D++){const A=D%3;A===0?(m.up.set(0,p[D],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x+g[D],u.y,u.z)):A===1?(m.up.set(0,0,p[D]),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y+g[D],u.z)):(m.up.set(0,p[D],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y,u.z+g[D]));const O=this._cubeSize;Kr(o,A*O,D>2?O:0,O,O),_.setRenderTarget(o),y&&_.render(w,m),_.render(t,m)}_.toneMapping=S,_.autoClear=v,t.background=U}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===er||t.mapping===ao;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=ox()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rx());const u=o?this._cubemapMaterial:this._equirectMaterial,c=this._lodMeshes[0];c.material=u;const h=u.uniforms;h.envMap.value=t;const m=this._cubeSize;Kr(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(c,hl)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let u=1;u<o;u++)this._applyGGXFilter(t,u-1,u);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,u=this._pingPongRenderTarget,c=this._ggxMaterial,h=this._lodMeshes[a];h.material=c;const m=c.uniforms,p=a/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),_=Math.sqrt(p*p-g*g),v=0+p*1.25,S=_*v,{_lodMax:E}=this,w=this._sizeLods[a],x=3*w*(a>E-Ms?a-E+Ms:0),y=4*(this._cubeSize-w);m.envMap.value=t.texture,m.roughness.value=S,m.mipInt.value=E-n,Kr(u,x,y,3*w,2*w),o.setRenderTarget(u),o.render(h,hl),m.envMap.value=u.texture,m.roughness.value=0,m.mipInt.value=E-a,Kr(t,x,y,3*w,2*w),o.setRenderTarget(t),o.render(h,hl)}_blur(t,n,a,o,u){const c=this._pingPongRenderTarget;this._halfBlur(t,c,n,a,o,"latitudinal",u),this._halfBlur(c,t,a,a,o,"longitudinal",u)}_halfBlur(t,n,a,o,u,c,h){const m=this._renderer,p=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&Ae("blur direction must be either latitudinal or longitudinal!");const g=3,_=this._lodMeshes[o];_.material=p;const v=p.uniforms,S=this._sizeLods[a]-1,E=isFinite(u)?Math.PI/(2*S):2*Math.PI/(2*js-1),w=u/E,x=isFinite(u)?1+Math.floor(g*w):js;x>js&&se(`sigmaRadians, ${u}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${js}`);const y=[];let U=0;for(let I=0;I<js;++I){const T=I/w,N=Math.exp(-T*T/2);y.push(N),I===0?U+=N:I<x&&(U+=2*N)}for(let I=0;I<y.length;I++)y[I]=y[I]/U;v.envMap.value=t.texture,v.samples.value=x,v.weights.value=y,v.latitudinal.value=c==="latitudinal",h&&(v.poleAxis.value=h);const{_lodMax:D}=this;v.dTheta.value=E,v.mipInt.value=D-a;const A=this._sizeLods[o],O=3*A*(o>D-Ms?o-D+Ms:0),L=4*(this._cubeSize-A);Kr(n,O,L,3*A,2*A),m.setRenderTarget(n),m.render(_,hl)}}function TC(s){const t=[],n=[],a=[];let o=s;const u=s-Ms+1+nx.length;for(let c=0;c<u;c++){const h=Math.pow(2,o);t.push(h);let m=1/h;c>s-Ms?m=nx[c-s+Ms-1]:c===0&&(m=0),n.push(m);const p=1/(h-2),g=-p,_=1+p,v=[g,g,_,g,_,_,g,g,_,_,g,_],S=6,E=6,w=3,x=2,y=1,U=new Float32Array(w*E*S),D=new Float32Array(x*E*S),A=new Float32Array(y*E*S);for(let L=0;L<S;L++){const I=L%3*2/3-1,T=L>2?0:-1,N=[I,T,0,I+2/3,T,0,I+2/3,T+1,0,I,T,0,I+2/3,T+1,0,I,T+1,0];U.set(N,w*E*L),D.set(v,x*E*L);const W=[L,L,L,L,L,L];A.set(W,y*E*L)}const O=new kn;O.setAttribute("position",new xi(U,w)),O.setAttribute("uv",new xi(D,x)),O.setAttribute("faceIndex",new xi(A,y)),a.push(new Re(O,null)),o>Ms&&o--}return{lodMeshes:a,sizeLods:t,sigmas:n}}function sx(s,t,n){const a=new na(s,t,n);return a.texture.mapping=Fc,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Kr(s,t,n,a,o){s.viewport.set(t,n,a,o),s.scissor.set(t,n,a,o)}function AC(s,t,n){return new ii({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:EC,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function RC(s,t,n){const a=new Float32Array(js),o=new k(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:js,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function rx(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function ox(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function Gc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Py extends na{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new _y(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new ji(5,5,5),u=new ii({name:"CubemapFromEquirect",uniforms:oo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:qn,blending:Ua});u.uniforms.tEquirect.value=n;const c=new Re(o,u),h=n.minFilter;return n.minFilter===$s&&(n.minFilter=Vn),new D1(1,10,this).update(t,c),n.minFilter=h,c.geometry.dispose(),c.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const u=t.getRenderTarget();for(let c=0;c<6;c++)t.setRenderTarget(this,c),t.clear(n,a,o);t.setRenderTarget(u)}}function CC(s){let t=new WeakMap,n=new WeakMap,a=null;function o(v,S=!1){return v==null?null:S?c(v):u(v)}function u(v){if(v&&v.isTexture){const S=v.mapping;if(S===nd||S===id)if(t.has(v)){const E=t.get(v).texture;return h(E,v.mapping)}else{const E=v.image;if(E&&E.height>0){const w=new Py(E.height);return w.fromEquirectangularTexture(s,v),t.set(v,w),v.addEventListener("dispose",p),h(w.texture,v.mapping)}else return null}}return v}function c(v){if(v&&v.isTexture){const S=v.mapping,E=S===nd||S===id,w=S===er||S===ao;if(E||w){let x=n.get(v);const y=x!==void 0?x.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==y)return a===null&&(a=new ax(s)),x=E?a.fromEquirectangular(v,x):a.fromCubemap(v,x),x.texture.pmremVersion=v.pmremVersion,n.set(v,x),x.texture;if(x!==void 0)return x.texture;{const U=v.image;return E&&U&&U.height>0||w&&U&&m(U)?(a===null&&(a=new ax(s)),x=E?a.fromEquirectangular(v):a.fromCubemap(v),x.texture.pmremVersion=v.pmremVersion,n.set(v,x),v.addEventListener("dispose",g),x.texture):null}}}return v}function h(v,S){return S===nd?v.mapping=er:S===id&&(v.mapping=ao),v}function m(v){let S=0;const E=6;for(let w=0;w<E;w++)v[w]!==void 0&&S++;return S===E}function p(v){const S=v.target;S.removeEventListener("dispose",p);const E=t.get(S);E!==void 0&&(t.delete(S),E.dispose())}function g(v){const S=v.target;S.removeEventListener("dispose",g);const E=n.get(S);E!==void 0&&(n.delete(S),E.dispose())}function _(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:_}}function wC(s){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=s.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&to("WebGLRenderer: "+a+" extension not supported."),o}}}function DC(s,t,n,a){const o={},u=new WeakMap;function c(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const E in v.attributes)t.remove(v.attributes[E]);v.removeEventListener("dispose",c),delete o[v.id];const S=u.get(v);S&&(t.remove(S),u.delete(v)),a.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function h(_,v){return o[v.id]===!0||(v.addEventListener("dispose",c),o[v.id]=!0,n.memory.geometries++),v}function m(_){const v=_.attributes;for(const S in v)t.update(v[S],s.ARRAY_BUFFER)}function p(_){const v=[],S=_.index,E=_.attributes.position;let w=0;if(E===void 0)return;if(S!==null){const U=S.array;w=S.version;for(let D=0,A=U.length;D<A;D+=3){const O=U[D+0],L=U[D+1],I=U[D+2];v.push(O,L,L,I,I,O)}}else{const U=E.array;w=E.version;for(let D=0,A=U.length/3-1;D<A;D+=3){const O=D+0,L=D+1,I=D+2;v.push(O,L,L,I,I,O)}}const x=new(E.count>=65535?my:py)(v,1);x.version=w;const y=u.get(_);y&&t.remove(y),u.set(_,x)}function g(_){const v=u.get(_);if(v){const S=_.index;S!==null&&v.version<S.version&&p(_)}else p(_);return u.get(_)}return{get:h,update:m,getWireframeAttribute:g}}function UC(s,t,n){let a;function o(_){a=_}let u,c;function h(_){u=_.type,c=_.bytesPerElement}function m(_,v){s.drawElements(a,v,u,_*c),n.update(v,a,1)}function p(_,v,S){S!==0&&(s.drawElementsInstanced(a,v,u,_*c,S),n.update(v,a,S))}function g(_,v,S){if(S===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,v,0,u,_,0,S);let w=0;for(let x=0;x<S;x++)w+=v[x];n.update(w,a,1)}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=g}function LC(s){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(u,c,h){switch(n.calls++,c){case s.TRIANGLES:n.triangles+=h*(u/3);break;case s.LINES:n.lines+=h*(u/2);break;case s.LINE_STRIP:n.lines+=h*(u-1);break;case s.LINE_LOOP:n.lines+=h*u;break;case s.POINTS:n.points+=h*u;break;default:Ae("WebGLInfo: Unknown draw mode:",c);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function NC(s,t,n){const a=new WeakMap,o=new nn;function u(c,h,m){const p=c.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let v=a.get(h);if(v===void 0||v.count!==_){let W=function(){T.dispose(),a.delete(h),h.removeEventListener("dispose",W)};var S=W;v!==void 0&&v.texture.dispose();const E=h.morphAttributes.position!==void 0,w=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,y=h.morphAttributes.position||[],U=h.morphAttributes.normal||[],D=h.morphAttributes.color||[];let A=0;E===!0&&(A=1),w===!0&&(A=2),x===!0&&(A=3);let O=h.attributes.position.count*A,L=1;O>t.maxTextureSize&&(L=Math.ceil(O/t.maxTextureSize),O=t.maxTextureSize);const I=new Float32Array(O*L*4*_),T=new hy(I,O,L,_);T.type=$i,T.needsUpdate=!0;const N=A*4;for(let G=0;G<_;G++){const q=y[G],ht=U[G],pt=D[G],J=O*L*4*G;for(let F=0;F<q.count;F++){const H=F*N;E===!0&&(o.fromBufferAttribute(q,F),I[J+H+0]=o.x,I[J+H+1]=o.y,I[J+H+2]=o.z,I[J+H+3]=0),w===!0&&(o.fromBufferAttribute(ht,F),I[J+H+4]=o.x,I[J+H+5]=o.y,I[J+H+6]=o.z,I[J+H+7]=0),x===!0&&(o.fromBufferAttribute(pt,F),I[J+H+8]=o.x,I[J+H+9]=o.y,I[J+H+10]=o.z,I[J+H+11]=pt.itemSize===4?o.w:1)}}v={count:_,texture:T,size:new Ft(O,L)},a.set(h,v),h.addEventListener("dispose",W)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",c.morphTexture,n);else{let E=0;for(let x=0;x<p.length;x++)E+=p[x];const w=h.morphTargetsRelative?1:1-E;m.getUniforms().setValue(s,"morphTargetBaseInfluence",w),m.getUniforms().setValue(s,"morphTargetInfluences",p)}m.getUniforms().setValue(s,"morphTargetsTexture",v.texture,n),m.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}return{update:u}}function PC(s,t,n,a,o){let u=new WeakMap;function c(p){const g=o.render.frame,_=p.geometry,v=t.get(p,_);if(u.get(v)!==g&&(t.update(v),u.set(v,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),u.get(p)!==g&&(n.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,s.ARRAY_BUFFER),u.set(p,g))),p.isSkinnedMesh){const S=p.skeleton;u.get(S)!==g&&(S.update(),u.set(S,g))}return v}function h(){u=new WeakMap}function m(p){const g=p.target;g.removeEventListener("dispose",m),a.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:c,dispose:h}}const OC={[Qx]:"LINEAR_TONE_MAPPING",[jx]:"REINHARD_TONE_MAPPING",[$x]:"CINEON_TONE_MAPPING",[Kp]:"ACES_FILMIC_TONE_MAPPING",[ey]:"AGX_TONE_MAPPING",[ny]:"NEUTRAL_TONE_MAPPING",[ty]:"CUSTOM_TONE_MAPPING"};function zC(s,t,n,a,o,u){const c=new na(t,n,{type:s,depthBuffer:o,stencilBuffer:u,samples:a?4:0,depthTexture:o?new so(t,n):void 0}),h=new na(t,n,{type:Pa,depthBuffer:!1,stencilBuffer:!1}),m=new kn;m.setAttribute("position",new mn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new mn([0,2,0,0,2,0],2));const p=new M1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),g=new Re(m,p),_=new hm(-1,1,1,-1,0,1);let v=null,S=null,E=!1,w,x=null,y=[],U=!1;this.setSize=function(D,A){c.setSize(D,A),h.setSize(D,A);for(let O=0;O<y.length;O++){const L=y[O];L.setSize&&L.setSize(D,A)}},this.setEffects=function(D){y=D,U=y.length>0&&y[0].isRenderPass===!0;const A=c.width,O=c.height;for(let L=0;L<y.length;L++){const I=y[L];I.setSize&&I.setSize(A,O)}},this.begin=function(D,A){if(E||D.toneMapping===ea&&y.length===0)return!1;if(x=A,A!==null){const O=A.width,L=A.height;(c.width!==O||c.height!==L)&&this.setSize(O,L)}return U===!1&&D.setRenderTarget(c),w=D.toneMapping,D.toneMapping=ea,!0},this.hasRenderPass=function(){return U},this.end=function(D,A){D.toneMapping=w,E=!0;let O=c,L=h;for(let I=0;I<y.length;I++){const T=y[I];if(T.enabled!==!1&&(T.render(D,L,O,A),T.needsSwap!==!1)){const N=O;O=L,L=N}}if(v!==D.outputColorSpace||S!==D.toneMapping){v=D.outputColorSpace,S=D.toneMapping,p.defines={},be.getTransfer(v)===He&&(p.defines.SRGB_TRANSFER="");const I=OC[S];I&&(p.defines[I]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=O.texture,D.setRenderTarget(x),D.render(g,_),x=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),h.dispose(),m.dispose(),p.dispose()}}const Oy=new Yn,zp=new so(1,1),zy=new hy,Iy=new MT,Fy=new _y,lx=[],ux=[],cx=new Float32Array(16),fx=new Float32Array(9),hx=new Float32Array(4);function ho(s,t,n){const a=s[0];if(a<=0||a>0)return s;const o=t*n;let u=lx[o];if(u===void 0&&(u=new Float32Array(o),lx[o]=u),t!==0){a.toArray(u,0);for(let c=1,h=0;c!==t;++c)h+=n,s[c].toArray(u,h)}return u}function An(s,t){if(s.length!==t.length)return!1;for(let n=0,a=s.length;n<a;n++)if(s[n]!==t[n])return!1;return!0}function Rn(s,t){for(let n=0,a=t.length;n<a;n++)s[n]=t[n]}function Vc(s,t){let n=ux[t];n===void 0&&(n=new Int32Array(t),ux[t]=n);for(let a=0;a!==t;++a)n[a]=s.allocateTextureUnit();return n}function IC(s,t){const n=this.cache;n[0]!==t&&(s.uniform1f(this.addr,t),n[0]=t)}function FC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;s.uniform2fv(this.addr,t),Rn(n,t)}}function BC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(An(n,t))return;s.uniform3fv(this.addr,t),Rn(n,t)}}function HC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;s.uniform4fv(this.addr,t),Rn(n,t)}}function GC(s,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;s.uniformMatrix2fv(this.addr,!1,t),Rn(n,t)}else{if(An(n,a))return;hx.set(a),s.uniformMatrix2fv(this.addr,!1,hx),Rn(n,a)}}function VC(s,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;s.uniformMatrix3fv(this.addr,!1,t),Rn(n,t)}else{if(An(n,a))return;fx.set(a),s.uniformMatrix3fv(this.addr,!1,fx),Rn(n,a)}}function kC(s,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;s.uniformMatrix4fv(this.addr,!1,t),Rn(n,t)}else{if(An(n,a))return;cx.set(a),s.uniformMatrix4fv(this.addr,!1,cx),Rn(n,a)}}function XC(s,t){const n=this.cache;n[0]!==t&&(s.uniform1i(this.addr,t),n[0]=t)}function WC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;s.uniform2iv(this.addr,t),Rn(n,t)}}function qC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;s.uniform3iv(this.addr,t),Rn(n,t)}}function YC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;s.uniform4iv(this.addr,t),Rn(n,t)}}function ZC(s,t){const n=this.cache;n[0]!==t&&(s.uniform1ui(this.addr,t),n[0]=t)}function KC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;s.uniform2uiv(this.addr,t),Rn(n,t)}}function JC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;s.uniform3uiv(this.addr,t),Rn(n,t)}}function QC(s,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;s.uniform4uiv(this.addr,t),Rn(n,t)}}function jC(s,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(s.uniform1i(this.addr,o),a[0]=o);let u;this.type===s.SAMPLER_2D_SHADOW?(zp.compareFunction=n.isReversedDepthBuffer()?im:nm,u=zp):u=Oy,n.setTexture2D(t||u,o)}function $C(s,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(s.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||Iy,o)}function tw(s,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(s.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||Fy,o)}function ew(s,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(s.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||zy,o)}function nw(s){switch(s){case 5126:return IC;case 35664:return FC;case 35665:return BC;case 35666:return HC;case 35674:return GC;case 35675:return VC;case 35676:return kC;case 5124:case 35670:return XC;case 35667:case 35671:return WC;case 35668:case 35672:return qC;case 35669:case 35673:return YC;case 5125:return ZC;case 36294:return KC;case 36295:return JC;case 36296:return QC;case 35678:case 36198:case 36298:case 36306:case 35682:return jC;case 35679:case 36299:case 36307:return $C;case 35680:case 36300:case 36308:case 36293:return tw;case 36289:case 36303:case 36311:case 36292:return ew}}function iw(s,t){s.uniform1fv(this.addr,t)}function aw(s,t){const n=ho(t,this.size,2);s.uniform2fv(this.addr,n)}function sw(s,t){const n=ho(t,this.size,3);s.uniform3fv(this.addr,n)}function rw(s,t){const n=ho(t,this.size,4);s.uniform4fv(this.addr,n)}function ow(s,t){const n=ho(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function lw(s,t){const n=ho(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function uw(s,t){const n=ho(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function cw(s,t){s.uniform1iv(this.addr,t)}function fw(s,t){s.uniform2iv(this.addr,t)}function hw(s,t){s.uniform3iv(this.addr,t)}function dw(s,t){s.uniform4iv(this.addr,t)}function pw(s,t){s.uniform1uiv(this.addr,t)}function mw(s,t){s.uniform2uiv(this.addr,t)}function gw(s,t){s.uniform3uiv(this.addr,t)}function _w(s,t){s.uniform4uiv(this.addr,t)}function vw(s,t,n){const a=this.cache,o=t.length,u=Vc(n,o);An(a,u)||(s.uniform1iv(this.addr,u),Rn(a,u));let c;this.type===s.SAMPLER_2D_SHADOW?c=zp:c=Oy;for(let h=0;h!==o;++h)n.setTexture2D(t[h]||c,u[h])}function xw(s,t,n){const a=this.cache,o=t.length,u=Vc(n,o);An(a,u)||(s.uniform1iv(this.addr,u),Rn(a,u));for(let c=0;c!==o;++c)n.setTexture3D(t[c]||Iy,u[c])}function yw(s,t,n){const a=this.cache,o=t.length,u=Vc(n,o);An(a,u)||(s.uniform1iv(this.addr,u),Rn(a,u));for(let c=0;c!==o;++c)n.setTextureCube(t[c]||Fy,u[c])}function Sw(s,t,n){const a=this.cache,o=t.length,u=Vc(n,o);An(a,u)||(s.uniform1iv(this.addr,u),Rn(a,u));for(let c=0;c!==o;++c)n.setTexture2DArray(t[c]||zy,u[c])}function Mw(s){switch(s){case 5126:return iw;case 35664:return aw;case 35665:return sw;case 35666:return rw;case 35674:return ow;case 35675:return lw;case 35676:return uw;case 5124:case 35670:return cw;case 35667:case 35671:return fw;case 35668:case 35672:return hw;case 35669:case 35673:return dw;case 5125:return pw;case 36294:return mw;case 36295:return gw;case 36296:return _w;case 35678:case 36198:case 36298:case 36306:case 35682:return vw;case 35679:case 36299:case 36307:return xw;case 35680:case 36300:case 36308:case 36293:return yw;case 36289:case 36303:case 36311:case 36292:return Sw}}class Ew{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=nw(n.type)}}class bw{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Mw(n.type)}}class Tw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let u=0,c=o.length;u!==c;++u){const h=o[u];h.setValue(t,n[h.id],a)}}}const zd=/(\w+)(\])?(\[|\.)?/g;function dx(s,t){s.seq.push(t),s.map[t.id]=t}function Aw(s,t,n){const a=s.name,o=a.length;for(zd.lastIndex=0;;){const u=zd.exec(a),c=zd.lastIndex;let h=u[1];const m=u[2]==="]",p=u[3];if(m&&(h=h|0),p===void 0||p==="["&&c+2===o){dx(n,p===void 0?new Ew(h,s,t):new bw(h,s,t));break}else{let _=n.map[h];_===void 0&&(_=new Tw(h),dx(n,_)),n=_}}}class bc{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let c=0;c<a;++c){const h=t.getActiveUniform(n,c),m=t.getUniformLocation(n,h.name);Aw(h,m,this)}const o=[],u=[];for(const c of this.seq)c.type===t.SAMPLER_2D_SHADOW||c.type===t.SAMPLER_CUBE_SHADOW||c.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(c):u.push(c);o.length>0&&(this.seq=o.concat(u))}setValue(t,n,a,o){const u=this.map[n];u!==void 0&&u.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let u=0,c=n.length;u!==c;++u){const h=n[u],m=a[h.id];m.needsUpdate!==!1&&h.setValue(t,m.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,u=t.length;o!==u;++o){const c=t[o];c.id in n&&a.push(c)}return a}}function px(s,t,n){const a=s.createShader(t);return s.shaderSource(a,n),s.compileShader(a),a}const Rw=37297;let Cw=0;function ww(s,t){const n=s.split(`
`),a=[],o=Math.max(t-6,0),u=Math.min(t+6,n.length);for(let c=o;c<u;c++){const h=c+1;a.push(`${h===t?">":" "} ${h}: ${n[c]}`)}return a.join(`
`)}const mx=new ue;function Dw(s){be._getMatrix(mx,be.workingColorSpace,s);const t=`mat3( ${mx.elements.map(n=>n.toFixed(4))} )`;switch(be.getTransfer(s)){case Dc:return[t,"LinearTransferOETF"];case He:return[t,"sRGBTransferOETF"];default:return se("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function gx(s,t,n){const a=s.getShaderParameter(t,s.COMPILE_STATUS),u=(s.getShaderInfoLog(t)||"").trim();if(a&&u==="")return"";const c=/ERROR: 0:(\d+)/.exec(u);if(c){const h=parseInt(c[1]);return n.toUpperCase()+`

`+u+`

`+ww(s.getShaderSource(t),h)}else return u}function Uw(s,t){const n=Dw(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Lw={[Qx]:"Linear",[jx]:"Reinhard",[$x]:"Cineon",[Kp]:"ACESFilmic",[ey]:"AgX",[ny]:"Neutral",[ty]:"Custom"};function Nw(s,t){const n=Lw[t];return n===void 0?(se("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const pc=new k;function Pw(){be.getLuminanceCoefficients(pc);const s=pc.x.toFixed(4),t=pc.y.toFixed(4),n=pc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ow(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function zw(s){const t=[];for(const n in s){const a=s[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function Iw(s,t){const n={},a=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const u=s.getActiveAttrib(t,o),c=u.name;let h=1;u.type===s.FLOAT_MAT2&&(h=2),u.type===s.FLOAT_MAT3&&(h=3),u.type===s.FLOAT_MAT4&&(h=4),n[c]={type:u.type,location:s.getAttribLocation(t,c),locationSize:h}}return n}function gl(s){return s!==""}function _x(s,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function vx(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Fw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ip(s){return s.replace(Fw,Hw)}const Bw=new Map;function Hw(s,t){let n=me[t];if(n===void 0){const a=Bw.get(t);if(a!==void 0)n=me[a],se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ip(n)}const Gw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xx(s){return s.replace(Gw,Vw)}function Vw(s,t,n,a){let o="";for(let u=parseInt(t);u<parseInt(n);u++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return o}function yx(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const kw={[vc]:"SHADOWMAP_TYPE_PCF",[pl]:"SHADOWMAP_TYPE_VSM"};function Xw(s){return kw[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ww={[er]:"ENVMAP_TYPE_CUBE",[ao]:"ENVMAP_TYPE_CUBE",[Fc]:"ENVMAP_TYPE_CUBE_UV"};function qw(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Ww[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const Yw={[ao]:"ENVMAP_MODE_REFRACTION"};function Zw(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Yw[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Kw={[Jx]:"ENVMAP_BLENDING_MULTIPLY",[tT]:"ENVMAP_BLENDING_MIX",[eT]:"ENVMAP_BLENDING_ADD"};function Jw(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Kw[s.combine]||"ENVMAP_BLENDING_NONE"}function Qw(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function jw(s,t,n,a){const o=s.getContext(),u=n.defines;let c=n.vertexShader,h=n.fragmentShader;const m=Xw(n),p=qw(n),g=Zw(n),_=Jw(n),v=Qw(n),S=Ow(n),E=zw(u),w=o.createProgram();let x,y,U=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(gl).join(`
`),x.length>0&&(x+=`
`),y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(gl).join(`
`),y.length>0&&(y+=`
`)):(x=[yx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),y=[yx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ea?"#define TONE_MAPPING":"",n.toneMapping!==ea?me.tonemapping_pars_fragment:"",n.toneMapping!==ea?Nw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",me.colorspace_pars_fragment,Uw("linearToOutputTexel",n.outputColorSpace),Pw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gl).join(`
`)),c=Ip(c),c=_x(c,n),c=vx(c,n),h=Ip(h),h=_x(h,n),h=vx(h,n),c=xx(c),h=xx(h),n.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,x=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,y=["#define varying in",n.glslVersion===yv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===yv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const D=U+x+c,A=U+y+h,O=px(o,o.VERTEX_SHADER,D),L=px(o,o.FRAGMENT_SHADER,A);o.attachShader(w,O),o.attachShader(w,L),n.index0AttributeName!==void 0?o.bindAttribLocation(w,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(w,0,"position"),o.linkProgram(w);function I(G){if(s.debug.checkShaderErrors){const q=o.getProgramInfoLog(w)||"",ht=o.getShaderInfoLog(O)||"",pt=o.getShaderInfoLog(L)||"",J=q.trim(),F=ht.trim(),H=pt.trim();let nt=!0,St=!0;if(o.getProgramParameter(w,o.LINK_STATUS)===!1)if(nt=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,w,O,L);else{const At=gx(o,O,"vertex"),z=gx(o,L,"fragment");Ae("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(w,o.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+J+`
`+At+`
`+z)}else J!==""?se("WebGLProgram: Program Info Log:",J):(F===""||H==="")&&(St=!1);St&&(G.diagnostics={runnable:nt,programLog:J,vertexShader:{log:F,prefix:x},fragmentShader:{log:H,prefix:y}})}o.deleteShader(O),o.deleteShader(L),T=new bc(o,w),N=Iw(o,w)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let N;this.getAttributes=function(){return N===void 0&&I(this),N};let W=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=o.getProgramParameter(w,Rw)),W},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Cw++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=O,this.fragmentShader=L,this}let $w=0;class t3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new e3(t),n.set(t,a)),a}}class e3{constructor(t){this.id=$w++,this.code=t,this.usedTimes=0}}function n3(s){return s===nr||s===Rc||s===Cc}function i3(s,t,n,a,o,u){const c=new sm,h=new t3,m=new Set,p=[],g=new Map,_=a.logarithmicDepthBuffer;let v=a.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function w(T,N,W,G,q,ht){const pt=G.fog,J=q.geometry,F=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,H=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,nt=t.get(T.envMap||F,H),St=nt&&nt.mapping===Fc?nt.image.height:null,At=S[T.type];T.precision!==null&&(v=a.getMaxPrecision(T.precision),v!==T.precision&&se("WebGLProgram.getParameters:",T.precision,"not supported, using",v,"instead."));const z=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,j=z!==void 0?z.length:0;let bt=0;J.morphAttributes.position!==void 0&&(bt=1),J.morphAttributes.normal!==void 0&&(bt=2),J.morphAttributes.color!==void 0&&(bt=3);let ot,_t,V,Q;if(At){const kt=Qi[At];ot=kt.vertexShader,_t=kt.fragmentShader}else{ot=T.vertexShader,_t=T.fragmentShader;const kt=h.getVertexShaderStage(T),je=h.getFragmentShaderStage(T);h.update(T,kt,je),V=kt.id,Q=je.id}const et=s.getRenderTarget(),Rt=s.state.buffers.depth.getReversed(),Yt=q.isInstancedMesh===!0,Zt=q.isBatchedMesh===!0,he=!!T.map,ne=!!T.matcap,re=!!nt,pe=!!T.aoMap,ae=!!T.lightMap,rn=!!T.bumpMap&&T.wireframe===!1,on=!!T.normalMap,ln=!!T.displacementMap,hn=!!T.emissiveMap,Ze=!!T.metalnessMap,un=!!T.roughnessMap,K=T.anisotropy>0,Ge=T.clearcoat>0,Ue=T.dispersion>0,P=T.iridescence>0,b=T.sheen>0,tt=T.transmission>0,lt=K&&!!T.anisotropyMap,mt=Ge&&!!T.clearcoatMap,Ct=Ge&&!!T.clearcoatNormalMap,Lt=Ge&&!!T.clearcoatRoughnessMap,dt=P&&!!T.iridescenceMap,gt=P&&!!T.iridescenceThicknessMap,Dt=b&&!!T.sheenColorMap,Ht=b&&!!T.sheenRoughnessMap,Ot=!!T.specularMap,Nt=!!T.specularColorMap,jt=!!T.specularIntensityMap,$t=tt&&!!T.transmissionMap,oe=tt&&!!T.thicknessMap,Y=!!T.gradientMap,wt=!!T.alphaMap,yt=T.alphaTest>0,Ut=!!T.alphaHash,Bt=!!T.extensions;let Tt=ea;T.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Tt=s.toneMapping);const Kt={shaderID:At,shaderType:T.type,shaderName:T.name,vertexShader:ot,fragmentShader:_t,defines:T.defines,customVertexShaderID:V,customFragmentShaderID:Q,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:v,batching:Zt,batchingColor:Zt&&q._colorsTexture!==null,instancing:Yt,instancingColor:Yt&&q.instanceColor!==null,instancingMorph:Yt&&q.morphTexture!==null,outputColorSpace:et===null?s.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:be.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:he,matcap:ne,envMap:re,envMapMode:re&&nt.mapping,envMapCubeUVHeight:St,aoMap:pe,lightMap:ae,bumpMap:rn,normalMap:on,displacementMap:ln,emissiveMap:hn,normalMapObjectSpace:on&&T.normalMapType===aT,normalMapTangentSpace:on&&T.normalMapType===Cp,packedNormalMap:on&&T.normalMapType===Cp&&n3(T.normalMap.format),metalnessMap:Ze,roughnessMap:un,anisotropy:K,anisotropyMap:lt,clearcoat:Ge,clearcoatMap:mt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:Lt,dispersion:Ue,iridescence:P,iridescenceMap:dt,iridescenceThicknessMap:gt,sheen:b,sheenColorMap:Dt,sheenRoughnessMap:Ht,specularMap:Ot,specularColorMap:Nt,specularIntensityMap:jt,transmission:tt,transmissionMap:$t,thicknessMap:oe,gradientMap:Y,opaque:T.transparent===!1&&T.blending===$r&&T.alphaToCoverage===!1,alphaMap:wt,alphaTest:yt,alphaHash:Ut,combine:T.combine,mapUv:he&&E(T.map.channel),aoMapUv:pe&&E(T.aoMap.channel),lightMapUv:ae&&E(T.lightMap.channel),bumpMapUv:rn&&E(T.bumpMap.channel),normalMapUv:on&&E(T.normalMap.channel),displacementMapUv:ln&&E(T.displacementMap.channel),emissiveMapUv:hn&&E(T.emissiveMap.channel),metalnessMapUv:Ze&&E(T.metalnessMap.channel),roughnessMapUv:un&&E(T.roughnessMap.channel),anisotropyMapUv:lt&&E(T.anisotropyMap.channel),clearcoatMapUv:mt&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Lt&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&E(T.sheenRoughnessMap.channel),specularMapUv:Ot&&E(T.specularMap.channel),specularColorMapUv:Nt&&E(T.specularColorMap.channel),specularIntensityMapUv:jt&&E(T.specularIntensityMap.channel),transmissionMapUv:$t&&E(T.transmissionMap.channel),thicknessMapUv:oe&&E(T.thicknessMap.channel),alphaMapUv:wt&&E(T.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(on||K),vertexNormals:!!J.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!J.attributes.uv&&(he||wt),fog:!!pt,useFog:T.fog===!0,fogExp2:!!pt&&pt.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||J.attributes.normal===void 0&&on===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Rt,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:J.attributes.position!==void 0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:bt,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:ht.length,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&W.length>0,shadowMapType:s.shadowMap.type,toneMapping:Tt,decodeVideoTexture:he&&T.map.isVideoTexture===!0&&be.getTransfer(T.map.colorSpace)===He,decodeVideoTextureEmissive:hn&&T.emissiveMap.isVideoTexture===!0&&be.getTransfer(T.emissiveMap.colorSpace)===He,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Bi,flipSided:T.side===qn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Bt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&T.extensions.multiDraw===!0||Zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Kt.vertexUv1s=m.has(1),Kt.vertexUv2s=m.has(2),Kt.vertexUv3s=m.has(3),m.clear(),Kt}function x(T){const N=[];if(T.shaderID?N.push(T.shaderID):(N.push(T.customVertexShaderID),N.push(T.customFragmentShaderID)),T.defines!==void 0)for(const W in T.defines)N.push(W),N.push(T.defines[W]);return T.isRawShaderMaterial===!1&&(y(N,T),U(N,T),N.push(s.outputColorSpace)),N.push(T.customProgramCacheKey),N.join()}function y(T,N){T.push(N.precision),T.push(N.outputColorSpace),T.push(N.envMapMode),T.push(N.envMapCubeUVHeight),T.push(N.mapUv),T.push(N.alphaMapUv),T.push(N.lightMapUv),T.push(N.aoMapUv),T.push(N.bumpMapUv),T.push(N.normalMapUv),T.push(N.displacementMapUv),T.push(N.emissiveMapUv),T.push(N.metalnessMapUv),T.push(N.roughnessMapUv),T.push(N.anisotropyMapUv),T.push(N.clearcoatMapUv),T.push(N.clearcoatNormalMapUv),T.push(N.clearcoatRoughnessMapUv),T.push(N.iridescenceMapUv),T.push(N.iridescenceThicknessMapUv),T.push(N.sheenColorMapUv),T.push(N.sheenRoughnessMapUv),T.push(N.specularMapUv),T.push(N.specularColorMapUv),T.push(N.specularIntensityMapUv),T.push(N.transmissionMapUv),T.push(N.thicknessMapUv),T.push(N.combine),T.push(N.fogExp2),T.push(N.sizeAttenuation),T.push(N.morphTargetsCount),T.push(N.morphAttributeCount),T.push(N.numDirLights),T.push(N.numPointLights),T.push(N.numSpotLights),T.push(N.numSpotLightMaps),T.push(N.numHemiLights),T.push(N.numRectAreaLights),T.push(N.numDirLightShadows),T.push(N.numPointLightShadows),T.push(N.numSpotLightShadows),T.push(N.numSpotLightShadowsWithMaps),T.push(N.numLightProbes),T.push(N.shadowMapType),T.push(N.toneMapping),T.push(N.numClippingPlanes),T.push(N.numClipIntersection),T.push(N.depthPacking)}function U(T,N){c.disableAll(),N.instancing&&c.enable(0),N.instancingColor&&c.enable(1),N.instancingMorph&&c.enable(2),N.matcap&&c.enable(3),N.envMap&&c.enable(4),N.normalMapObjectSpace&&c.enable(5),N.normalMapTangentSpace&&c.enable(6),N.clearcoat&&c.enable(7),N.iridescence&&c.enable(8),N.alphaTest&&c.enable(9),N.vertexColors&&c.enable(10),N.vertexAlphas&&c.enable(11),N.vertexUv1s&&c.enable(12),N.vertexUv2s&&c.enable(13),N.vertexUv3s&&c.enable(14),N.vertexTangents&&c.enable(15),N.anisotropy&&c.enable(16),N.alphaHash&&c.enable(17),N.batching&&c.enable(18),N.dispersion&&c.enable(19),N.batchingColor&&c.enable(20),N.gradientMap&&c.enable(21),N.packedNormalMap&&c.enable(22),N.vertexNormals&&c.enable(23),T.push(c.mask),c.disableAll(),N.fog&&c.enable(0),N.useFog&&c.enable(1),N.flatShading&&c.enable(2),N.logarithmicDepthBuffer&&c.enable(3),N.reversedDepthBuffer&&c.enable(4),N.skinning&&c.enable(5),N.morphTargets&&c.enable(6),N.morphNormals&&c.enable(7),N.morphColors&&c.enable(8),N.premultipliedAlpha&&c.enable(9),N.shadowMapEnabled&&c.enable(10),N.doubleSided&&c.enable(11),N.flipSided&&c.enable(12),N.useDepthPacking&&c.enable(13),N.dithering&&c.enable(14),N.transmission&&c.enable(15),N.sheen&&c.enable(16),N.opaque&&c.enable(17),N.pointsUvs&&c.enable(18),N.decodeVideoTexture&&c.enable(19),N.decodeVideoTextureEmissive&&c.enable(20),N.alphaToCoverage&&c.enable(21),N.numLightProbeGrids>0&&c.enable(22),N.hasPositionAttribute&&c.enable(23),T.push(c.mask)}function D(T){const N=S[T.type];let W;if(N){const G=Qi[N];W=x1.clone(G.uniforms)}else W=T.uniforms;return W}function A(T,N){let W=g.get(N);return W!==void 0?++W.usedTimes:(W=new jw(s,N,T,o),p.push(W),g.set(N,W)),W}function O(T){if(--T.usedTimes===0){const N=p.indexOf(T);p[N]=p[p.length-1],p.pop(),g.delete(T.cacheKey),T.destroy()}}function L(T){h.remove(T)}function I(){h.dispose()}return{getParameters:w,getProgramCacheKey:x,getUniforms:D,acquireProgram:A,releaseProgram:O,releaseShaderCache:L,programs:p,dispose:I}}function a3(){let s=new WeakMap;function t(c){return s.has(c)}function n(c){let h=s.get(c);return h===void 0&&(h={},s.set(c,h)),h}function a(c){s.delete(c)}function o(c,h,m){s.get(c)[h]=m}function u(){s=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:u}}function s3(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Sx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Mx(){const s=[];let t=0;const n=[],a=[],o=[];function u(){t=0,n.length=0,a.length=0,o.length=0}function c(v){let S=0;return v.isInstancedMesh&&(S+=2),v.isSkinnedMesh&&(S+=1),S}function h(v,S,E,w,x,y){let U=s[t];return U===void 0?(U={id:v.id,object:v,geometry:S,material:E,materialVariant:c(v),groupOrder:w,renderOrder:v.renderOrder,z:x,group:y},s[t]=U):(U.id=v.id,U.object=v,U.geometry=S,U.material=E,U.materialVariant=c(v),U.groupOrder=w,U.renderOrder=v.renderOrder,U.z=x,U.group=y),t++,U}function m(v,S,E,w,x,y){const U=h(v,S,E,w,x,y);E.transmission>0?a.push(U):E.transparent===!0?o.push(U):n.push(U)}function p(v,S,E,w,x,y){const U=h(v,S,E,w,x,y);E.transmission>0?a.unshift(U):E.transparent===!0?o.unshift(U):n.unshift(U)}function g(v,S,E){n.length>1&&n.sort(v||s3),a.length>1&&a.sort(S||Sx),o.length>1&&o.sort(S||Sx),E&&(n.reverse(),a.reverse(),o.reverse())}function _(){for(let v=t,S=s.length;v<S;v++){const E=s[v];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:a,transparent:o,init:u,push:m,unshift:p,finish:_,sort:g}}function r3(){let s=new WeakMap;function t(a,o){const u=s.get(a);let c;return u===void 0?(c=new Mx,s.set(a,[c])):o>=u.length?(c=new Mx,u.push(c)):c=u[o],c}function n(){s=new WeakMap}return{get:t,dispose:n}}function o3(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new k,color:new Te};break;case"SpotLight":n={position:new k,direction:new k,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new k,color:new Te,distance:0,decay:0};break;case"HemisphereLight":n={direction:new k,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":n={color:new Te,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=n,n}}}function l3(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=n,n}}}let u3=0;function c3(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function f3(s){const t=new o3,n=l3(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new k);const o=new k,u=new Qe,c=new Qe;function h(p){let g=0,_=0,v=0;for(let N=0;N<9;N++)a.probe[N].set(0,0,0);let S=0,E=0,w=0,x=0,y=0,U=0,D=0,A=0,O=0,L=0,I=0;p.sort(c3);for(let N=0,W=p.length;N<W;N++){const G=p[N],q=G.color,ht=G.intensity,pt=G.distance;let J=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===nr?J=G.shadow.map.texture:J=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)g+=q.r*ht,_+=q.g*ht,v+=q.b*ht;else if(G.isLightProbe){for(let F=0;F<9;F++)a.probe[F].addScaledVector(G.sh.coefficients[F],ht);I++}else if(G.isDirectionalLight){const F=t.get(G);if(F.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const H=G.shadow,nt=n.get(G);nt.shadowIntensity=H.intensity,nt.shadowBias=H.bias,nt.shadowNormalBias=H.normalBias,nt.shadowRadius=H.radius,nt.shadowMapSize=H.mapSize,a.directionalShadow[S]=nt,a.directionalShadowMap[S]=J,a.directionalShadowMatrix[S]=G.shadow.matrix,U++}a.directional[S]=F,S++}else if(G.isSpotLight){const F=t.get(G);F.position.setFromMatrixPosition(G.matrixWorld),F.color.copy(q).multiplyScalar(ht),F.distance=pt,F.coneCos=Math.cos(G.angle),F.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),F.decay=G.decay,a.spot[w]=F;const H=G.shadow;if(G.map&&(a.spotLightMap[O]=G.map,O++,H.updateMatrices(G),G.castShadow&&L++),a.spotLightMatrix[w]=H.matrix,G.castShadow){const nt=n.get(G);nt.shadowIntensity=H.intensity,nt.shadowBias=H.bias,nt.shadowNormalBias=H.normalBias,nt.shadowRadius=H.radius,nt.shadowMapSize=H.mapSize,a.spotShadow[w]=nt,a.spotShadowMap[w]=J,A++}w++}else if(G.isRectAreaLight){const F=t.get(G);F.color.copy(q).multiplyScalar(ht),F.halfWidth.set(G.width*.5,0,0),F.halfHeight.set(0,G.height*.5,0),a.rectArea[x]=F,x++}else if(G.isPointLight){const F=t.get(G);if(F.color.copy(G.color).multiplyScalar(G.intensity),F.distance=G.distance,F.decay=G.decay,G.castShadow){const H=G.shadow,nt=n.get(G);nt.shadowIntensity=H.intensity,nt.shadowBias=H.bias,nt.shadowNormalBias=H.normalBias,nt.shadowRadius=H.radius,nt.shadowMapSize=H.mapSize,nt.shadowCameraNear=H.camera.near,nt.shadowCameraFar=H.camera.far,a.pointShadow[E]=nt,a.pointShadowMap[E]=J,a.pointShadowMatrix[E]=G.shadow.matrix,D++}a.point[E]=F,E++}else if(G.isHemisphereLight){const F=t.get(G);F.skyColor.copy(G.color).multiplyScalar(ht),F.groundColor.copy(G.groundColor).multiplyScalar(ht),a.hemi[y]=F,y++}}x>0&&(s.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=It.LTC_FLOAT_1,a.rectAreaLTC2=It.LTC_FLOAT_2):(a.rectAreaLTC1=It.LTC_HALF_1,a.rectAreaLTC2=It.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=v;const T=a.hash;(T.directionalLength!==S||T.pointLength!==E||T.spotLength!==w||T.rectAreaLength!==x||T.hemiLength!==y||T.numDirectionalShadows!==U||T.numPointShadows!==D||T.numSpotShadows!==A||T.numSpotMaps!==O||T.numLightProbes!==I)&&(a.directional.length=S,a.spot.length=w,a.rectArea.length=x,a.point.length=E,a.hemi.length=y,a.directionalShadow.length=U,a.directionalShadowMap.length=U,a.pointShadow.length=D,a.pointShadowMap.length=D,a.spotShadow.length=A,a.spotShadowMap.length=A,a.directionalShadowMatrix.length=U,a.pointShadowMatrix.length=D,a.spotLightMatrix.length=A+O-L,a.spotLightMap.length=O,a.numSpotLightShadowsWithMaps=L,a.numLightProbes=I,T.directionalLength=S,T.pointLength=E,T.spotLength=w,T.rectAreaLength=x,T.hemiLength=y,T.numDirectionalShadows=U,T.numPointShadows=D,T.numSpotShadows=A,T.numSpotMaps=O,T.numLightProbes=I,a.version=u3++)}function m(p,g){let _=0,v=0,S=0,E=0,w=0;const x=g.matrixWorldInverse;for(let y=0,U=p.length;y<U;y++){const D=p[y];if(D.isDirectionalLight){const A=a.directional[_];A.direction.setFromMatrixPosition(D.matrixWorld),o.setFromMatrixPosition(D.target.matrixWorld),A.direction.sub(o),A.direction.transformDirection(x),_++}else if(D.isSpotLight){const A=a.spot[S];A.position.setFromMatrixPosition(D.matrixWorld),A.position.applyMatrix4(x),A.direction.setFromMatrixPosition(D.matrixWorld),o.setFromMatrixPosition(D.target.matrixWorld),A.direction.sub(o),A.direction.transformDirection(x),S++}else if(D.isRectAreaLight){const A=a.rectArea[E];A.position.setFromMatrixPosition(D.matrixWorld),A.position.applyMatrix4(x),c.identity(),u.copy(D.matrixWorld),u.premultiply(x),c.extractRotation(u),A.halfWidth.set(D.width*.5,0,0),A.halfHeight.set(0,D.height*.5,0),A.halfWidth.applyMatrix4(c),A.halfHeight.applyMatrix4(c),E++}else if(D.isPointLight){const A=a.point[v];A.position.setFromMatrixPosition(D.matrixWorld),A.position.applyMatrix4(x),v++}else if(D.isHemisphereLight){const A=a.hemi[w];A.direction.setFromMatrixPosition(D.matrixWorld),A.direction.transformDirection(x),w++}}}return{setup:h,setupView:m,state:a}}function Ex(s){const t=new f3(s),n=[],a=[],o=[];function u(v){_.camera=v,n.length=0,a.length=0,o.length=0}function c(v){n.push(v)}function h(v){a.push(v)}function m(v){o.push(v)}function p(){t.setup(n)}function g(v){t.setupView(n,v)}const _={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:u,state:_,setupLights:p,setupLightsView:g,pushLight:c,pushShadow:h,pushLightProbeGrid:m}}function h3(s){let t=new WeakMap;function n(o,u=0){const c=t.get(o);let h;return c===void 0?(h=new Ex(s),t.set(o,[h])):u>=c.length?(h=new Ex(s),c.push(h)):h=c[u],h}function a(){t=new WeakMap}return{get:n,dispose:a}}const d3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,p3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,m3=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],g3=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],bx=new Qe,dl=new k,Id=new k;function _3(s,t,n){let a=new om;const o=new Ft,u=new Ft,c=new nn,h=new E1,m=new b1,p={},g=n.maxTextureSize,_={[Es]:qn,[qn]:Es,[Bi]:Bi},v=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:d3,fragmentShader:p3}),S=v.clone();S.defines.HORIZONTAL_PASS=1;const E=new kn;E.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Re(E,v),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vc;let y=this.type;this.render=function(L,I,T){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||L.length===0)return;this.type===Kx&&(se("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=vc);const N=s.getRenderTarget(),W=s.getActiveCubeFace(),G=s.getActiveMipmapLevel(),q=s.state;q.setBlending(Ua),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const ht=y!==this.type;ht&&I.traverse(function(pt){pt.material&&(Array.isArray(pt.material)?pt.material.forEach(J=>J.needsUpdate=!0):pt.material.needsUpdate=!0)});for(let pt=0,J=L.length;pt<J;pt++){const F=L[pt],H=F.shadow;if(H===void 0){se("WebGLShadowMap:",F,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;o.copy(H.mapSize);const nt=H.getFrameExtents();o.multiply(nt),u.copy(H.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(u.x=Math.floor(g/nt.x),o.x=u.x*nt.x,H.mapSize.x=u.x),o.y>g&&(u.y=Math.floor(g/nt.y),o.y=u.y*nt.y,H.mapSize.y=u.y));const St=s.state.buffers.depth.getReversed();if(H.camera._reversedDepth=St,H.map===null||ht===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===pl){if(F.isPointLight){se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new na(o.x,o.y,{format:nr,type:Pa,minFilter:Vn,magFilter:Vn,generateMipmaps:!1}),H.map.texture.name=F.name+".shadowMap",H.map.depthTexture=new so(o.x,o.y,$i),H.map.depthTexture.name=F.name+".shadowMapDepth",H.map.depthTexture.format=Oa,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=On,H.map.depthTexture.magFilter=On}else F.isPointLight?(H.map=new Py(o.x),H.map.depthTexture=new GT(o.x,aa)):(H.map=new na(o.x,o.y),H.map.depthTexture=new so(o.x,o.y,aa)),H.map.depthTexture.name=F.name+".shadowMap",H.map.depthTexture.format=Oa,this.type===vc?(H.map.depthTexture.compareFunction=St?im:nm,H.map.depthTexture.minFilter=Vn,H.map.depthTexture.magFilter=Vn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=On,H.map.depthTexture.magFilter=On);H.camera.updateProjectionMatrix()}const At=H.map.isWebGLCubeRenderTarget?6:1;for(let z=0;z<At;z++){if(H.map.isWebGLCubeRenderTarget)s.setRenderTarget(H.map,z),s.clear();else{z===0&&(s.setRenderTarget(H.map),s.clear());const j=H.getViewport(z);c.set(u.x*j.x,u.y*j.y,u.x*j.z,u.y*j.w),q.viewport(c)}if(F.isPointLight){const j=H.camera,bt=H.matrix,ot=F.distance||j.far;ot!==j.far&&(j.far=ot,j.updateProjectionMatrix()),dl.setFromMatrixPosition(F.matrixWorld),j.position.copy(dl),Id.copy(j.position),Id.add(m3[z]),j.up.copy(g3[z]),j.lookAt(Id),j.updateMatrixWorld(),bt.makeTranslation(-dl.x,-dl.y,-dl.z),bx.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),H._frustum.setFromProjectionMatrix(bx,j.coordinateSystem,j.reversedDepth)}else H.updateMatrices(F);a=H.getFrustum(),A(I,T,H.camera,F,this.type)}H.isPointLightShadow!==!0&&this.type===pl&&U(H,T),H.needsUpdate=!1}y=this.type,x.needsUpdate=!1,s.setRenderTarget(N,W,G)};function U(L,I){const T=t.update(w);v.defines.VSM_SAMPLES!==L.blurSamples&&(v.defines.VSM_SAMPLES=L.blurSamples,S.defines.VSM_SAMPLES=L.blurSamples,v.needsUpdate=!0,S.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new na(o.x,o.y,{format:nr,type:Pa})),v.uniforms.shadow_pass.value=L.map.depthTexture,v.uniforms.resolution.value=L.mapSize,v.uniforms.radius.value=L.radius,s.setRenderTarget(L.mapPass),s.clear(),s.renderBufferDirect(I,null,T,v,w,null),S.uniforms.shadow_pass.value=L.mapPass.texture,S.uniforms.resolution.value=L.mapSize,S.uniforms.radius.value=L.radius,s.setRenderTarget(L.map),s.clear(),s.renderBufferDirect(I,null,T,S,w,null)}function D(L,I,T,N){let W=null;const G=T.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(G!==void 0)W=G;else if(W=T.isPointLight===!0?m:h,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const q=W.uuid,ht=I.uuid;let pt=p[q];pt===void 0&&(pt={},p[q]=pt);let J=pt[ht];J===void 0&&(J=W.clone(),pt[ht]=J,I.addEventListener("dispose",O)),W=J}if(W.visible=I.visible,W.wireframe=I.wireframe,N===pl?W.side=I.shadowSide!==null?I.shadowSide:I.side:W.side=I.shadowSide!==null?I.shadowSide:_[I.side],W.alphaMap=I.alphaMap,W.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,W.map=I.map,W.clipShadows=I.clipShadows,W.clippingPlanes=I.clippingPlanes,W.clipIntersection=I.clipIntersection,W.displacementMap=I.displacementMap,W.displacementScale=I.displacementScale,W.displacementBias=I.displacementBias,W.wireframeLinewidth=I.wireframeLinewidth,W.linewidth=I.linewidth,T.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const q=s.properties.get(W);q.light=T}return W}function A(L,I,T,N,W){if(L.visible===!1)return;if(L.layers.test(I.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&W===pl)&&(!L.frustumCulled||a.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,L.matrixWorld);const ht=t.update(L),pt=L.material;if(Array.isArray(pt)){const J=ht.groups;for(let F=0,H=J.length;F<H;F++){const nt=J[F],St=pt[nt.materialIndex];if(St&&St.visible){const At=D(L,St,N,W);L.onBeforeShadow(s,L,I,T,ht,At,nt),s.renderBufferDirect(T,null,ht,At,L,nt),L.onAfterShadow(s,L,I,T,ht,At,nt)}}}else if(pt.visible){const J=D(L,pt,N,W);L.onBeforeShadow(s,L,I,T,ht,J,null),s.renderBufferDirect(T,null,ht,J,L,null),L.onAfterShadow(s,L,I,T,ht,J,null)}}const q=L.children;for(let ht=0,pt=q.length;ht<pt;ht++)A(q[ht],I,T,N,W)}function O(L){L.target.removeEventListener("dispose",O);for(const T in p){const N=p[T],W=L.target.uuid;W in N&&(N[W].dispose(),delete N[W])}}}function v3(s,t){function n(){let Y=!1;const wt=new nn;let yt=null;const Ut=new nn(0,0,0,0);return{setMask:function(Bt){yt!==Bt&&!Y&&(s.colorMask(Bt,Bt,Bt,Bt),yt=Bt)},setLocked:function(Bt){Y=Bt},setClear:function(Bt,Tt,Kt,kt,je){je===!0&&(Bt*=kt,Tt*=kt,Kt*=kt),wt.set(Bt,Tt,Kt,kt),Ut.equals(wt)===!1&&(s.clearColor(Bt,Tt,Kt,kt),Ut.copy(wt))},reset:function(){Y=!1,yt=null,Ut.set(-1,0,0,0)}}}function a(){let Y=!1,wt=!1,yt=null,Ut=null,Bt=null;return{setReversed:function(Tt){if(wt!==Tt){const Kt=t.get("EXT_clip_control");Tt?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT),wt=Tt;const kt=Bt;Bt=null,this.setClear(kt)}},getReversed:function(){return wt},setTest:function(Tt){Tt?et(s.DEPTH_TEST):Rt(s.DEPTH_TEST)},setMask:function(Tt){yt!==Tt&&!Y&&(s.depthMask(Tt),yt=Tt)},setFunc:function(Tt){if(wt&&(Tt=pT[Tt]),Ut!==Tt){switch(Tt){case kd:s.depthFunc(s.NEVER);break;case Xd:s.depthFunc(s.ALWAYS);break;case Wd:s.depthFunc(s.LESS);break;case io:s.depthFunc(s.LEQUAL);break;case qd:s.depthFunc(s.EQUAL);break;case Yd:s.depthFunc(s.GEQUAL);break;case Zd:s.depthFunc(s.GREATER);break;case Kd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ut=Tt}},setLocked:function(Tt){Y=Tt},setClear:function(Tt){Bt!==Tt&&(Bt=Tt,wt&&(Tt=1-Tt),s.clearDepth(Tt))},reset:function(){Y=!1,yt=null,Ut=null,Bt=null,wt=!1}}}function o(){let Y=!1,wt=null,yt=null,Ut=null,Bt=null,Tt=null,Kt=null,kt=null,je=null;return{setTest:function(Pe){Y||(Pe?et(s.STENCIL_TEST):Rt(s.STENCIL_TEST))},setMask:function(Pe){wt!==Pe&&!Y&&(s.stencilMask(Pe),wt=Pe)},setFunc:function(Pe,ai,si){(yt!==Pe||Ut!==ai||Bt!==si)&&(s.stencilFunc(Pe,ai,si),yt=Pe,Ut=ai,Bt=si)},setOp:function(Pe,ai,si){(Tt!==Pe||Kt!==ai||kt!==si)&&(s.stencilOp(Pe,ai,si),Tt=Pe,Kt=ai,kt=si)},setLocked:function(Pe){Y=Pe},setClear:function(Pe){je!==Pe&&(s.clearStencil(Pe),je=Pe)},reset:function(){Y=!1,wt=null,yt=null,Ut=null,Bt=null,Tt=null,Kt=null,kt=null,je=null}}}const u=new n,c=new a,h=new o,m=new WeakMap,p=new WeakMap;let g={},_={},v={},S=new WeakMap,E=[],w=null,x=!1,y=null,U=null,D=null,A=null,O=null,L=null,I=null,T=new Te(0,0,0),N=0,W=!1,G=null,q=null,ht=null,pt=null,J=null;const F=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,nt=0;const St=s.getParameter(s.VERSION);St.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(St)[1]),H=nt>=1):St.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(St)[1]),H=nt>=2);let At=null,z={};const j=s.getParameter(s.SCISSOR_BOX),bt=s.getParameter(s.VIEWPORT),ot=new nn().fromArray(j),_t=new nn().fromArray(bt);function V(Y,wt,yt,Ut){const Bt=new Uint8Array(4),Tt=s.createTexture();s.bindTexture(Y,Tt),s.texParameteri(Y,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(Y,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Kt=0;Kt<yt;Kt++)Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?s.texImage3D(wt,0,s.RGBA,1,1,Ut,0,s.RGBA,s.UNSIGNED_BYTE,Bt):s.texImage2D(wt+Kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Bt);return Tt}const Q={};Q[s.TEXTURE_2D]=V(s.TEXTURE_2D,s.TEXTURE_2D,1),Q[s.TEXTURE_CUBE_MAP]=V(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[s.TEXTURE_2D_ARRAY]=V(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Q[s.TEXTURE_3D]=V(s.TEXTURE_3D,s.TEXTURE_3D,1,1),u.setClear(0,0,0,1),c.setClear(1),h.setClear(0),et(s.DEPTH_TEST),c.setFunc(io),rn(!1),on(pv),et(s.CULL_FACE),pe(Ua);function et(Y){g[Y]!==!0&&(s.enable(Y),g[Y]=!0)}function Rt(Y){g[Y]!==!1&&(s.disable(Y),g[Y]=!1)}function Yt(Y,wt){return v[Y]!==wt?(s.bindFramebuffer(Y,wt),v[Y]=wt,Y===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=wt),Y===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=wt),!0):!1}function Zt(Y,wt){let yt=E,Ut=!1;if(Y){yt=S.get(wt),yt===void 0&&(yt=[],S.set(wt,yt));const Bt=Y.textures;if(yt.length!==Bt.length||yt[0]!==s.COLOR_ATTACHMENT0){for(let Tt=0,Kt=Bt.length;Tt<Kt;Tt++)yt[Tt]=s.COLOR_ATTACHMENT0+Tt;yt.length=Bt.length,Ut=!0}}else yt[0]!==s.BACK&&(yt[0]=s.BACK,Ut=!0);Ut&&s.drawBuffers(yt)}function he(Y){return w!==Y?(s.useProgram(Y),w=Y,!0):!1}const ne={[Qs]:s.FUNC_ADD,[Ib]:s.FUNC_SUBTRACT,[Fb]:s.FUNC_REVERSE_SUBTRACT};ne[Bb]=s.MIN,ne[Hb]=s.MAX;const re={[Gb]:s.ZERO,[Vb]:s.ONE,[kb]:s.SRC_COLOR,[Gd]:s.SRC_ALPHA,[Kb]:s.SRC_ALPHA_SATURATE,[Yb]:s.DST_COLOR,[Wb]:s.DST_ALPHA,[Xb]:s.ONE_MINUS_SRC_COLOR,[Vd]:s.ONE_MINUS_SRC_ALPHA,[Zb]:s.ONE_MINUS_DST_COLOR,[qb]:s.ONE_MINUS_DST_ALPHA,[Jb]:s.CONSTANT_COLOR,[Qb]:s.ONE_MINUS_CONSTANT_COLOR,[jb]:s.CONSTANT_ALPHA,[$b]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(Y,wt,yt,Ut,Bt,Tt,Kt,kt,je,Pe){if(Y===Ua){x===!0&&(Rt(s.BLEND),x=!1);return}if(x===!1&&(et(s.BLEND),x=!0),Y!==zb){if(Y!==y||Pe!==W){if((U!==Qs||O!==Qs)&&(s.blendEquation(s.FUNC_ADD),U=Qs,O=Qs),Pe)switch(Y){case $r:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mv:s.blendFunc(s.ONE,s.ONE);break;case gv:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case _v:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ae("WebGLState: Invalid blending: ",Y);break}else switch(Y){case $r:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mv:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case gv:Ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _v:Ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ae("WebGLState: Invalid blending: ",Y);break}D=null,A=null,L=null,I=null,T.set(0,0,0),N=0,y=Y,W=Pe}return}Bt=Bt||wt,Tt=Tt||yt,Kt=Kt||Ut,(wt!==U||Bt!==O)&&(s.blendEquationSeparate(ne[wt],ne[Bt]),U=wt,O=Bt),(yt!==D||Ut!==A||Tt!==L||Kt!==I)&&(s.blendFuncSeparate(re[yt],re[Ut],re[Tt],re[Kt]),D=yt,A=Ut,L=Tt,I=Kt),(kt.equals(T)===!1||je!==N)&&(s.blendColor(kt.r,kt.g,kt.b,je),T.copy(kt),N=je),y=Y,W=!1}function ae(Y,wt){Y.side===Bi?Rt(s.CULL_FACE):et(s.CULL_FACE);let yt=Y.side===qn;wt&&(yt=!yt),rn(yt),Y.blending===$r&&Y.transparent===!1?pe(Ua):pe(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),c.setFunc(Y.depthFunc),c.setTest(Y.depthTest),c.setMask(Y.depthWrite),u.setMask(Y.colorWrite);const Ut=Y.stencilWrite;h.setTest(Ut),Ut&&(h.setMask(Y.stencilWriteMask),h.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),h.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),hn(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?et(s.SAMPLE_ALPHA_TO_COVERAGE):Rt(s.SAMPLE_ALPHA_TO_COVERAGE)}function rn(Y){G!==Y&&(Y?s.frontFace(s.CW):s.frontFace(s.CCW),G=Y)}function on(Y){Y!==Pb?(et(s.CULL_FACE),Y!==q&&(Y===pv?s.cullFace(s.BACK):Y===Ob?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Rt(s.CULL_FACE),q=Y}function ln(Y){Y!==ht&&(H&&s.lineWidth(Y),ht=Y)}function hn(Y,wt,yt){Y?(et(s.POLYGON_OFFSET_FILL),(pt!==wt||J!==yt)&&(pt=wt,J=yt,c.getReversed()&&(wt=-wt),s.polygonOffset(wt,yt))):Rt(s.POLYGON_OFFSET_FILL)}function Ze(Y){Y?et(s.SCISSOR_TEST):Rt(s.SCISSOR_TEST)}function un(Y){Y===void 0&&(Y=s.TEXTURE0+F-1),At!==Y&&(s.activeTexture(Y),At=Y)}function K(Y,wt,yt){yt===void 0&&(At===null?yt=s.TEXTURE0+F-1:yt=At);let Ut=z[yt];Ut===void 0&&(Ut={type:void 0,texture:void 0},z[yt]=Ut),(Ut.type!==Y||Ut.texture!==wt)&&(At!==yt&&(s.activeTexture(yt),At=yt),s.bindTexture(Y,wt||Q[Y]),Ut.type=Y,Ut.texture=wt)}function Ge(){const Y=z[At];Y!==void 0&&Y.type!==void 0&&(s.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ue(){try{s.compressedTexImage2D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function b(){try{s.texSubImage2D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function tt(){try{s.texSubImage3D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function lt(){try{s.compressedTexSubImage2D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function mt(){try{s.compressedTexSubImage3D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function Ct(){try{s.texStorage2D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function Lt(){try{s.texStorage3D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function dt(){try{s.texImage2D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function gt(){try{s.texImage3D(...arguments)}catch(Y){Ae("WebGLState:",Y)}}function Dt(Y){return _[Y]!==void 0?_[Y]:s.getParameter(Y)}function Ht(Y,wt){_[Y]!==wt&&(s.pixelStorei(Y,wt),_[Y]=wt)}function Ot(Y){ot.equals(Y)===!1&&(s.scissor(Y.x,Y.y,Y.z,Y.w),ot.copy(Y))}function Nt(Y){_t.equals(Y)===!1&&(s.viewport(Y.x,Y.y,Y.z,Y.w),_t.copy(Y))}function jt(Y,wt){let yt=p.get(wt);yt===void 0&&(yt=new WeakMap,p.set(wt,yt));let Ut=yt.get(Y);Ut===void 0&&(Ut=s.getUniformBlockIndex(wt,Y.name),yt.set(Y,Ut))}function $t(Y,wt){const Ut=p.get(wt).get(Y);m.get(wt)!==Ut&&(s.uniformBlockBinding(wt,Ut,Y.__bindingPointIndex),m.set(wt,Ut))}function oe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),c.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),g={},_={},At=null,z={},v={},S=new WeakMap,E=[],w=null,x=!1,y=null,U=null,D=null,A=null,O=null,L=null,I=null,T=new Te(0,0,0),N=0,W=!1,G=null,q=null,ht=null,pt=null,J=null,ot.set(0,0,s.canvas.width,s.canvas.height),_t.set(0,0,s.canvas.width,s.canvas.height),u.reset(),c.reset(),h.reset()}return{buffers:{color:u,depth:c,stencil:h},enable:et,disable:Rt,bindFramebuffer:Yt,drawBuffers:Zt,useProgram:he,setBlending:pe,setMaterial:ae,setFlipSided:rn,setCullFace:on,setLineWidth:ln,setPolygonOffset:hn,setScissorTest:Ze,activeTexture:un,bindTexture:K,unbindTexture:Ge,compressedTexImage2D:Ue,compressedTexImage3D:P,texImage2D:dt,texImage3D:gt,pixelStorei:Ht,getParameter:Dt,updateUBOMapping:jt,uniformBlockBinding:$t,texStorage2D:Ct,texStorage3D:Lt,texSubImage2D:b,texSubImage3D:tt,compressedTexSubImage2D:lt,compressedTexSubImage3D:mt,scissor:Ot,viewport:Nt,reset:oe}}function x3(s,t,n,a,o,u,c){const h=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ft,g=new WeakMap,_=new Set;let v;const S=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(P,b){return E?new OffscreenCanvas(P,b):Uc("canvas")}function x(P,b,tt){let lt=1;const mt=Ue(P);if((mt.width>tt||mt.height>tt)&&(lt=tt/Math.max(mt.width,mt.height)),lt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Ct=Math.floor(lt*mt.width),Lt=Math.floor(lt*mt.height);v===void 0&&(v=w(Ct,Lt));const dt=b?w(Ct,Lt):v;return dt.width=Ct,dt.height=Lt,dt.getContext("2d").drawImage(P,0,0,Ct,Lt),se("WebGLRenderer: Texture has been resized from ("+mt.width+"x"+mt.height+") to ("+Ct+"x"+Lt+")."),dt}else return"data"in P&&se("WebGLRenderer: Image in DataTexture is too big ("+mt.width+"x"+mt.height+")."),P;return P}function y(P){return P.generateMipmaps}function U(P){s.generateMipmap(P)}function D(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function A(P,b,tt,lt,mt,Ct=!1){if(P!==null){if(s[P]!==void 0)return s[P];se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Lt;lt&&(Lt=t.get("EXT_texture_norm16"),Lt||se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let dt=b;if(b===s.RED&&(tt===s.FLOAT&&(dt=s.R32F),tt===s.HALF_FLOAT&&(dt=s.R16F),tt===s.UNSIGNED_BYTE&&(dt=s.R8),tt===s.UNSIGNED_SHORT&&Lt&&(dt=Lt.R16_EXT),tt===s.SHORT&&Lt&&(dt=Lt.R16_SNORM_EXT)),b===s.RED_INTEGER&&(tt===s.UNSIGNED_BYTE&&(dt=s.R8UI),tt===s.UNSIGNED_SHORT&&(dt=s.R16UI),tt===s.UNSIGNED_INT&&(dt=s.R32UI),tt===s.BYTE&&(dt=s.R8I),tt===s.SHORT&&(dt=s.R16I),tt===s.INT&&(dt=s.R32I)),b===s.RG&&(tt===s.FLOAT&&(dt=s.RG32F),tt===s.HALF_FLOAT&&(dt=s.RG16F),tt===s.UNSIGNED_BYTE&&(dt=s.RG8),tt===s.UNSIGNED_SHORT&&Lt&&(dt=Lt.RG16_EXT),tt===s.SHORT&&Lt&&(dt=Lt.RG16_SNORM_EXT)),b===s.RG_INTEGER&&(tt===s.UNSIGNED_BYTE&&(dt=s.RG8UI),tt===s.UNSIGNED_SHORT&&(dt=s.RG16UI),tt===s.UNSIGNED_INT&&(dt=s.RG32UI),tt===s.BYTE&&(dt=s.RG8I),tt===s.SHORT&&(dt=s.RG16I),tt===s.INT&&(dt=s.RG32I)),b===s.RGB_INTEGER&&(tt===s.UNSIGNED_BYTE&&(dt=s.RGB8UI),tt===s.UNSIGNED_SHORT&&(dt=s.RGB16UI),tt===s.UNSIGNED_INT&&(dt=s.RGB32UI),tt===s.BYTE&&(dt=s.RGB8I),tt===s.SHORT&&(dt=s.RGB16I),tt===s.INT&&(dt=s.RGB32I)),b===s.RGBA_INTEGER&&(tt===s.UNSIGNED_BYTE&&(dt=s.RGBA8UI),tt===s.UNSIGNED_SHORT&&(dt=s.RGBA16UI),tt===s.UNSIGNED_INT&&(dt=s.RGBA32UI),tt===s.BYTE&&(dt=s.RGBA8I),tt===s.SHORT&&(dt=s.RGBA16I),tt===s.INT&&(dt=s.RGBA32I)),b===s.RGB&&(tt===s.UNSIGNED_SHORT&&Lt&&(dt=Lt.RGB16_EXT),tt===s.SHORT&&Lt&&(dt=Lt.RGB16_SNORM_EXT),tt===s.UNSIGNED_INT_5_9_9_9_REV&&(dt=s.RGB9_E5),tt===s.UNSIGNED_INT_10F_11F_11F_REV&&(dt=s.R11F_G11F_B10F)),b===s.RGBA){const gt=Ct?Dc:be.getTransfer(mt);tt===s.FLOAT&&(dt=s.RGBA32F),tt===s.HALF_FLOAT&&(dt=s.RGBA16F),tt===s.UNSIGNED_BYTE&&(dt=gt===He?s.SRGB8_ALPHA8:s.RGBA8),tt===s.UNSIGNED_SHORT&&Lt&&(dt=Lt.RGBA16_EXT),tt===s.SHORT&&Lt&&(dt=Lt.RGBA16_SNORM_EXT),tt===s.UNSIGNED_SHORT_4_4_4_4&&(dt=s.RGBA4),tt===s.UNSIGNED_SHORT_5_5_5_1&&(dt=s.RGB5_A1)}return(dt===s.R16F||dt===s.R32F||dt===s.RG16F||dt===s.RG32F||dt===s.RGBA16F||dt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),dt}function O(P,b){let tt;return P?b===null||b===aa||b===Ml?tt=s.DEPTH24_STENCIL8:b===$i?tt=s.DEPTH32F_STENCIL8:b===Sl&&(tt=s.DEPTH24_STENCIL8,se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===aa||b===Ml?tt=s.DEPTH_COMPONENT24:b===$i?tt=s.DEPTH_COMPONENT32F:b===Sl&&(tt=s.DEPTH_COMPONENT16),tt}function L(P,b){return y(P)===!0||P.isFramebufferTexture&&P.minFilter!==On&&P.minFilter!==Vn?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function I(P){const b=P.target;b.removeEventListener("dispose",I),N(b),b.isVideoTexture&&g.delete(b),b.isHTMLTexture&&_.delete(b)}function T(P){const b=P.target;b.removeEventListener("dispose",T),G(b)}function N(P){const b=a.get(P);if(b.__webglInit===void 0)return;const tt=P.source,lt=S.get(tt);if(lt){const mt=lt[b.__cacheKey];mt.usedTimes--,mt.usedTimes===0&&W(P),Object.keys(lt).length===0&&S.delete(tt)}a.remove(P)}function W(P){const b=a.get(P);s.deleteTexture(b.__webglTexture);const tt=P.source,lt=S.get(tt);delete lt[b.__cacheKey],c.memory.textures--}function G(P){const b=a.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),a.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(b.__webglFramebuffer[lt]))for(let mt=0;mt<b.__webglFramebuffer[lt].length;mt++)s.deleteFramebuffer(b.__webglFramebuffer[lt][mt]);else s.deleteFramebuffer(b.__webglFramebuffer[lt]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[lt])}else{if(Array.isArray(b.__webglFramebuffer))for(let lt=0;lt<b.__webglFramebuffer.length;lt++)s.deleteFramebuffer(b.__webglFramebuffer[lt]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let lt=0;lt<b.__webglColorRenderbuffer.length;lt++)b.__webglColorRenderbuffer[lt]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[lt]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const tt=P.textures;for(let lt=0,mt=tt.length;lt<mt;lt++){const Ct=a.get(tt[lt]);Ct.__webglTexture&&(s.deleteTexture(Ct.__webglTexture),c.memory.textures--),a.remove(tt[lt])}a.remove(P)}let q=0;function ht(){q=0}function pt(){return q}function J(P){q=P}function F(){const P=q;return P>=o.maxTextures&&se("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+o.maxTextures),q+=1,P}function H(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function nt(P,b){const tt=a.get(P);if(P.isVideoTexture&&K(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&tt.__version!==P.version){const lt=P.image;if(lt===null)se("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)se("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(tt,P,b);return}}else P.isExternalTexture&&(tt.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(s.TEXTURE_2D,tt.__webglTexture,s.TEXTURE0+b)}function St(P,b){const tt=a.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&tt.__version!==P.version){Rt(tt,P,b);return}else P.isExternalTexture&&(tt.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(s.TEXTURE_2D_ARRAY,tt.__webglTexture,s.TEXTURE0+b)}function At(P,b){const tt=a.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&tt.__version!==P.version){Rt(tt,P,b);return}n.bindTexture(s.TEXTURE_3D,tt.__webglTexture,s.TEXTURE0+b)}function z(P,b){const tt=a.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&tt.__version!==P.version){Yt(tt,P,b);return}n.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture,s.TEXTURE0+b)}const j={[Jd]:s.REPEAT,[Da]:s.CLAMP_TO_EDGE,[Qd]:s.MIRRORED_REPEAT},bt={[On]:s.NEAREST,[nT]:s.NEAREST_MIPMAP_NEAREST,[ku]:s.NEAREST_MIPMAP_LINEAR,[Vn]:s.LINEAR,[ad]:s.LINEAR_MIPMAP_NEAREST,[$s]:s.LINEAR_MIPMAP_LINEAR},ot={[sT]:s.NEVER,[cT]:s.ALWAYS,[rT]:s.LESS,[nm]:s.LEQUAL,[oT]:s.EQUAL,[im]:s.GEQUAL,[lT]:s.GREATER,[uT]:s.NOTEQUAL};function _t(P,b){if(b.type===$i&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Vn||b.magFilter===ad||b.magFilter===ku||b.magFilter===$s||b.minFilter===Vn||b.minFilter===ad||b.minFilter===ku||b.minFilter===$s)&&se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,j[b.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,j[b.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,j[b.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,bt[b.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,bt[b.minFilter]),b.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,ot[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===On||b.minFilter!==ku&&b.minFilter!==$s||b.type===$i&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||a.get(b).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,o.getMaxAnisotropy())),a.get(b).__currentAnisotropy=b.anisotropy}}}function V(P,b){let tt=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",I));const lt=b.source;let mt=S.get(lt);mt===void 0&&(mt={},S.set(lt,mt));const Ct=H(b);if(Ct!==P.__cacheKey){mt[Ct]===void 0&&(mt[Ct]={texture:s.createTexture(),usedTimes:0},c.memory.textures++,tt=!0),mt[Ct].usedTimes++;const Lt=mt[P.__cacheKey];Lt!==void 0&&(mt[P.__cacheKey].usedTimes--,Lt.usedTimes===0&&W(b)),P.__cacheKey=Ct,P.__webglTexture=mt[Ct].texture}return tt}function Q(P,b,tt){return Math.floor(Math.floor(P/tt)/b)}function et(P,b,tt,lt){const Ct=P.updateRanges;if(Ct.length===0)n.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,tt,lt,b.data);else{Ct.sort((Ht,Ot)=>Ht.start-Ot.start);let Lt=0;for(let Ht=1;Ht<Ct.length;Ht++){const Ot=Ct[Lt],Nt=Ct[Ht],jt=Ot.start+Ot.count,$t=Q(Nt.start,b.width,4),oe=Q(Ot.start,b.width,4);Nt.start<=jt+1&&$t===oe&&Q(Nt.start+Nt.count-1,b.width,4)===$t?Ot.count=Math.max(Ot.count,Nt.start+Nt.count-Ot.start):(++Lt,Ct[Lt]=Nt)}Ct.length=Lt+1;const dt=n.getParameter(s.UNPACK_ROW_LENGTH),gt=n.getParameter(s.UNPACK_SKIP_PIXELS),Dt=n.getParameter(s.UNPACK_SKIP_ROWS);n.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let Ht=0,Ot=Ct.length;Ht<Ot;Ht++){const Nt=Ct[Ht],jt=Math.floor(Nt.start/4),$t=Math.ceil(Nt.count/4),oe=jt%b.width,Y=Math.floor(jt/b.width),wt=$t,yt=1;n.pixelStorei(s.UNPACK_SKIP_PIXELS,oe),n.pixelStorei(s.UNPACK_SKIP_ROWS,Y),n.texSubImage2D(s.TEXTURE_2D,0,oe,Y,wt,yt,tt,lt,b.data)}P.clearUpdateRanges(),n.pixelStorei(s.UNPACK_ROW_LENGTH,dt),n.pixelStorei(s.UNPACK_SKIP_PIXELS,gt),n.pixelStorei(s.UNPACK_SKIP_ROWS,Dt)}}function Rt(P,b,tt){let lt=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(lt=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(lt=s.TEXTURE_3D);const mt=V(P,b),Ct=b.source;n.bindTexture(lt,P.__webglTexture,s.TEXTURE0+tt);const Lt=a.get(Ct);if(Ct.version!==Lt.__version||mt===!0){if(n.activeTexture(s.TEXTURE0+tt),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const yt=be.getPrimaries(be.workingColorSpace),Ut=b.colorSpace===xs?null:be.getPrimaries(b.colorSpace),Bt=b.colorSpace===xs||yt===Ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;n.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}n.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment);let gt=x(b.image,!1,o.maxTextureSize);gt=Ge(b,gt);const Dt=u.convert(b.format,b.colorSpace),Ht=u.convert(b.type);let Ot=A(b.internalFormat,Dt,Ht,b.normalized,b.colorSpace,b.isVideoTexture);_t(lt,b);let Nt;const jt=b.mipmaps,$t=b.isVideoTexture!==!0,oe=Lt.__version===void 0||mt===!0,Y=Ct.dataReady,wt=L(b,gt);if(b.isDepthTexture)Ot=O(b.format===tr,b.type),oe&&($t?n.texStorage2D(s.TEXTURE_2D,1,Ot,gt.width,gt.height):n.texImage2D(s.TEXTURE_2D,0,Ot,gt.width,gt.height,0,Dt,Ht,null));else if(b.isDataTexture)if(jt.length>0){$t&&oe&&n.texStorage2D(s.TEXTURE_2D,wt,Ot,jt[0].width,jt[0].height);for(let yt=0,Ut=jt.length;yt<Ut;yt++)Nt=jt[yt],$t?Y&&n.texSubImage2D(s.TEXTURE_2D,yt,0,0,Nt.width,Nt.height,Dt,Ht,Nt.data):n.texImage2D(s.TEXTURE_2D,yt,Ot,Nt.width,Nt.height,0,Dt,Ht,Nt.data);b.generateMipmaps=!1}else $t?(oe&&n.texStorage2D(s.TEXTURE_2D,wt,Ot,gt.width,gt.height),Y&&et(b,gt,Dt,Ht)):n.texImage2D(s.TEXTURE_2D,0,Ot,gt.width,gt.height,0,Dt,Ht,gt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){$t&&oe&&n.texStorage3D(s.TEXTURE_2D_ARRAY,wt,Ot,jt[0].width,jt[0].height,gt.depth);for(let yt=0,Ut=jt.length;yt<Ut;yt++)if(Nt=jt[yt],b.format!==Gi)if(Dt!==null)if($t){if(Y)if(b.layerUpdates.size>0){const Bt=ex(Nt.width,Nt.height,b.format,b.type);for(const Tt of b.layerUpdates){const Kt=Nt.data.subarray(Tt*Bt/Nt.data.BYTES_PER_ELEMENT,(Tt+1)*Bt/Nt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,Tt,Nt.width,Nt.height,1,Dt,Kt)}b.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,0,Nt.width,Nt.height,gt.depth,Dt,Nt.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,yt,Ot,Nt.width,Nt.height,gt.depth,0,Nt.data,0,0);else se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $t?Y&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,0,Nt.width,Nt.height,gt.depth,Dt,Ht,Nt.data):n.texImage3D(s.TEXTURE_2D_ARRAY,yt,Ot,Nt.width,Nt.height,gt.depth,0,Dt,Ht,Nt.data)}else{$t&&oe&&n.texStorage2D(s.TEXTURE_2D,wt,Ot,jt[0].width,jt[0].height);for(let yt=0,Ut=jt.length;yt<Ut;yt++)Nt=jt[yt],b.format!==Gi?Dt!==null?$t?Y&&n.compressedTexSubImage2D(s.TEXTURE_2D,yt,0,0,Nt.width,Nt.height,Dt,Nt.data):n.compressedTexImage2D(s.TEXTURE_2D,yt,Ot,Nt.width,Nt.height,0,Nt.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?Y&&n.texSubImage2D(s.TEXTURE_2D,yt,0,0,Nt.width,Nt.height,Dt,Ht,Nt.data):n.texImage2D(s.TEXTURE_2D,yt,Ot,Nt.width,Nt.height,0,Dt,Ht,Nt.data)}else if(b.isDataArrayTexture)if($t){if(oe&&n.texStorage3D(s.TEXTURE_2D_ARRAY,wt,Ot,gt.width,gt.height,gt.depth),Y)if(b.layerUpdates.size>0){const yt=ex(gt.width,gt.height,b.format,b.type);for(const Ut of b.layerUpdates){const Bt=gt.data.subarray(Ut*yt/gt.data.BYTES_PER_ELEMENT,(Ut+1)*yt/gt.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ut,gt.width,gt.height,1,Dt,Ht,Bt)}b.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Dt,Ht,gt.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,Ot,gt.width,gt.height,gt.depth,0,Dt,Ht,gt.data);else if(b.isData3DTexture)$t?(oe&&n.texStorage3D(s.TEXTURE_3D,wt,Ot,gt.width,gt.height,gt.depth),Y&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Dt,Ht,gt.data)):n.texImage3D(s.TEXTURE_3D,0,Ot,gt.width,gt.height,gt.depth,0,Dt,Ht,gt.data);else if(b.isFramebufferTexture){if(oe)if($t)n.texStorage2D(s.TEXTURE_2D,wt,Ot,gt.width,gt.height);else{let yt=gt.width,Ut=gt.height;for(let Bt=0;Bt<wt;Bt++)n.texImage2D(s.TEXTURE_2D,Bt,Ot,yt,Ut,0,Dt,Ht,null),yt>>=1,Ut>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in s){const yt=s.canvas;if(yt.hasAttribute("layoutsubtree")||yt.setAttribute("layoutsubtree","true"),gt.parentNode!==yt){yt.appendChild(gt),_.add(b),yt.onpaint=Ut=>{const Bt=Ut.changedElements;for(const Tt of _)Bt.includes(Tt.image)&&(Tt.needsUpdate=!0)},yt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,gt);else{const Bt=s.RGBA,Tt=s.RGBA,Kt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Bt,Tt,Kt,gt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(jt.length>0){if($t&&oe){const yt=Ue(jt[0]);n.texStorage2D(s.TEXTURE_2D,wt,Ot,yt.width,yt.height)}for(let yt=0,Ut=jt.length;yt<Ut;yt++)Nt=jt[yt],$t?Y&&n.texSubImage2D(s.TEXTURE_2D,yt,0,0,Dt,Ht,Nt):n.texImage2D(s.TEXTURE_2D,yt,Ot,Dt,Ht,Nt);b.generateMipmaps=!1}else if($t){if(oe){const yt=Ue(gt);n.texStorage2D(s.TEXTURE_2D,wt,Ot,yt.width,yt.height)}Y&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,Dt,Ht,gt)}else n.texImage2D(s.TEXTURE_2D,0,Ot,Dt,Ht,gt);y(b)&&U(lt),Lt.__version=Ct.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Yt(P,b,tt){if(b.image.length!==6)return;const lt=V(P,b),mt=b.source;n.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+tt);const Ct=a.get(mt);if(mt.version!==Ct.__version||lt===!0){n.activeTexture(s.TEXTURE0+tt);const Lt=be.getPrimaries(be.workingColorSpace),dt=b.colorSpace===xs?null:be.getPrimaries(b.colorSpace),gt=b.colorSpace===xs||Lt===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;n.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Dt=b.isCompressedTexture||b.image[0].isCompressedTexture,Ht=b.image[0]&&b.image[0].isDataTexture,Ot=[];for(let Tt=0;Tt<6;Tt++)!Dt&&!Ht?Ot[Tt]=x(b.image[Tt],!0,o.maxCubemapSize):Ot[Tt]=Ht?b.image[Tt].image:b.image[Tt],Ot[Tt]=Ge(b,Ot[Tt]);const Nt=Ot[0],jt=u.convert(b.format,b.colorSpace),$t=u.convert(b.type),oe=A(b.internalFormat,jt,$t,b.normalized,b.colorSpace),Y=b.isVideoTexture!==!0,wt=Ct.__version===void 0||lt===!0,yt=mt.dataReady;let Ut=L(b,Nt);_t(s.TEXTURE_CUBE_MAP,b);let Bt;if(Dt){Y&&wt&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Ut,oe,Nt.width,Nt.height);for(let Tt=0;Tt<6;Tt++){Bt=Ot[Tt].mipmaps;for(let Kt=0;Kt<Bt.length;Kt++){const kt=Bt[Kt];b.format!==Gi?jt!==null?Y?yt&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt,0,0,kt.width,kt.height,jt,kt.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt,oe,kt.width,kt.height,0,kt.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?yt&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt,0,0,kt.width,kt.height,jt,$t,kt.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt,oe,kt.width,kt.height,0,jt,$t,kt.data)}}}else{if(Bt=b.mipmaps,Y&&wt){Bt.length>0&&Ut++;const Tt=Ue(Ot[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Ut,oe,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(Ht){Y?yt&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,Ot[Tt].width,Ot[Tt].height,jt,$t,Ot[Tt].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,oe,Ot[Tt].width,Ot[Tt].height,0,jt,$t,Ot[Tt].data);for(let Kt=0;Kt<Bt.length;Kt++){const je=Bt[Kt].image[Tt].image;Y?yt&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt+1,0,0,je.width,je.height,jt,$t,je.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt+1,oe,je.width,je.height,0,jt,$t,je.data)}}else{Y?yt&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,jt,$t,Ot[Tt]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,oe,jt,$t,Ot[Tt]);for(let Kt=0;Kt<Bt.length;Kt++){const kt=Bt[Kt];Y?yt&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt+1,0,0,jt,$t,kt.image[Tt]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Kt+1,oe,jt,$t,kt.image[Tt])}}}y(b)&&U(s.TEXTURE_CUBE_MAP),Ct.__version=mt.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Zt(P,b,tt,lt,mt,Ct){const Lt=u.convert(tt.format,tt.colorSpace),dt=u.convert(tt.type),gt=A(tt.internalFormat,Lt,dt,tt.normalized,tt.colorSpace),Dt=a.get(b),Ht=a.get(tt);if(Ht.__renderTarget=b,!Dt.__hasExternalTextures){const Ot=Math.max(1,b.width>>Ct),Nt=Math.max(1,b.height>>Ct);mt===s.TEXTURE_3D||mt===s.TEXTURE_2D_ARRAY?n.texImage3D(mt,Ct,gt,Ot,Nt,b.depth,0,Lt,dt,null):n.texImage2D(mt,Ct,gt,Ot,Nt,0,Lt,dt,null)}n.bindFramebuffer(s.FRAMEBUFFER,P),un(b)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,lt,mt,Ht.__webglTexture,0,Ze(b)):(mt===s.TEXTURE_2D||mt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&mt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,lt,mt,Ht.__webglTexture,Ct),n.bindFramebuffer(s.FRAMEBUFFER,null)}function he(P,b,tt){if(s.bindRenderbuffer(s.RENDERBUFFER,P),b.depthBuffer){const lt=b.depthTexture,mt=lt&&lt.isDepthTexture?lt.type:null,Ct=O(b.stencilBuffer,mt),Lt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;un(b)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ze(b),Ct,b.width,b.height):tt?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ze(b),Ct,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Ct,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Lt,s.RENDERBUFFER,P)}else{const lt=b.textures;for(let mt=0;mt<lt.length;mt++){const Ct=lt[mt],Lt=u.convert(Ct.format,Ct.colorSpace),dt=u.convert(Ct.type),gt=A(Ct.internalFormat,Lt,dt,Ct.normalized,Ct.colorSpace);un(b)?h.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ze(b),gt,b.width,b.height):tt?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ze(b),gt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,gt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ne(P,b,tt){const lt=b.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(s.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const mt=a.get(b.depthTexture);if(mt.__renderTarget=b,(!mt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),lt){if(mt.__webglInit===void 0&&(mt.__webglInit=!0,b.depthTexture.addEventListener("dispose",I)),mt.__webglTexture===void 0){mt.__webglTexture=s.createTexture(),n.bindTexture(s.TEXTURE_CUBE_MAP,mt.__webglTexture),_t(s.TEXTURE_CUBE_MAP,b.depthTexture);const Dt=u.convert(b.depthTexture.format),Ht=u.convert(b.depthTexture.type);let Ot;b.depthTexture.format===Oa?Ot=s.DEPTH_COMPONENT24:b.depthTexture.format===tr&&(Ot=s.DEPTH24_STENCIL8);for(let Nt=0;Nt<6;Nt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,Ot,b.width,b.height,0,Dt,Ht,null)}}else nt(b.depthTexture,0);const Ct=mt.__webglTexture,Lt=Ze(b),dt=lt?s.TEXTURE_CUBE_MAP_POSITIVE_X+tt:s.TEXTURE_2D,gt=b.depthTexture.format===tr?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(b.depthTexture.format===Oa)un(b)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,gt,dt,Ct,0,Lt):s.framebufferTexture2D(s.FRAMEBUFFER,gt,dt,Ct,0);else if(b.depthTexture.format===tr)un(b)?h.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,gt,dt,Ct,0,Lt):s.framebufferTexture2D(s.FRAMEBUFFER,gt,dt,Ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(P){const b=a.get(P),tt=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){const lt=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),lt){const mt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,lt.removeEventListener("dispose",mt)};lt.addEventListener("dispose",mt),b.__depthDisposeCallback=mt}b.__boundDepthTexture=lt}if(P.depthTexture&&!b.__autoAllocateDepthBuffer)if(tt)for(let lt=0;lt<6;lt++)ne(b.__webglFramebuffer[lt],P,lt);else{const lt=P.texture.mipmaps;lt&&lt.length>0?ne(b.__webglFramebuffer[0],P,0):ne(b.__webglFramebuffer,P,0)}else if(tt){b.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(n.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[lt]),b.__webglDepthbuffer[lt]===void 0)b.__webglDepthbuffer[lt]=s.createRenderbuffer(),he(b.__webglDepthbuffer[lt],P,!1);else{const mt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=b.__webglDepthbuffer[lt];s.bindRenderbuffer(s.RENDERBUFFER,Ct),s.framebufferRenderbuffer(s.FRAMEBUFFER,mt,s.RENDERBUFFER,Ct)}}else{const lt=P.texture.mipmaps;if(lt&&lt.length>0?n.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):n.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),he(b.__webglDepthbuffer,P,!1);else{const mt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Ct),s.framebufferRenderbuffer(s.FRAMEBUFFER,mt,s.RENDERBUFFER,Ct)}}n.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(P,b,tt){const lt=a.get(P);b!==void 0&&Zt(lt.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),tt!==void 0&&re(P)}function ae(P){const b=P.texture,tt=a.get(P),lt=a.get(b);P.addEventListener("dispose",T);const mt=P.textures,Ct=P.isWebGLCubeRenderTarget===!0,Lt=mt.length>1;if(Lt||(lt.__webglTexture===void 0&&(lt.__webglTexture=s.createTexture()),lt.__version=b.version,c.memory.textures++),Ct){tt.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0){tt.__webglFramebuffer[dt]=[];for(let gt=0;gt<b.mipmaps.length;gt++)tt.__webglFramebuffer[dt][gt]=s.createFramebuffer()}else tt.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){tt.__webglFramebuffer=[];for(let dt=0;dt<b.mipmaps.length;dt++)tt.__webglFramebuffer[dt]=s.createFramebuffer()}else tt.__webglFramebuffer=s.createFramebuffer();if(Lt)for(let dt=0,gt=mt.length;dt<gt;dt++){const Dt=a.get(mt[dt]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=s.createTexture(),c.memory.textures++)}if(P.samples>0&&un(P)===!1){tt.__webglMultisampledFramebuffer=s.createFramebuffer(),tt.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let dt=0;dt<mt.length;dt++){const gt=mt[dt];tt.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,tt.__webglColorRenderbuffer[dt]);const Dt=u.convert(gt.format,gt.colorSpace),Ht=u.convert(gt.type),Ot=A(gt.internalFormat,Dt,Ht,gt.normalized,gt.colorSpace,P.isXRRenderTarget===!0),Nt=Ze(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,Ot,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,tt.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(tt.__webglDepthRenderbuffer=s.createRenderbuffer(),he(tt.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Ct){n.bindTexture(s.TEXTURE_CUBE_MAP,lt.__webglTexture),_t(s.TEXTURE_CUBE_MAP,b);for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)Zt(tt.__webglFramebuffer[dt][gt],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,gt);else Zt(tt.__webglFramebuffer[dt],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);y(b)&&U(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Lt){for(let dt=0,gt=mt.length;dt<gt;dt++){const Dt=mt[dt],Ht=a.get(Dt);let Ot=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ot=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Ot,Ht.__webglTexture),_t(Ot,Dt),Zt(tt.__webglFramebuffer,P,Dt,s.COLOR_ATTACHMENT0+dt,Ot,0),y(Dt)&&U(Ot)}n.unbindTexture()}else{let dt=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(dt=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(dt,lt.__webglTexture),_t(dt,b),b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)Zt(tt.__webglFramebuffer[gt],P,b,s.COLOR_ATTACHMENT0,dt,gt);else Zt(tt.__webglFramebuffer,P,b,s.COLOR_ATTACHMENT0,dt,0);y(b)&&U(dt),n.unbindTexture()}P.depthBuffer&&re(P)}function rn(P){const b=P.textures;for(let tt=0,lt=b.length;tt<lt;tt++){const mt=b[tt];if(y(mt)){const Ct=D(P),Lt=a.get(mt).__webglTexture;n.bindTexture(Ct,Lt),U(Ct),n.unbindTexture()}}}const on=[],ln=[];function hn(P){if(P.samples>0){if(un(P)===!1){const b=P.textures,tt=P.width,lt=P.height;let mt=s.COLOR_BUFFER_BIT;const Ct=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Lt=a.get(P),dt=b.length>1;if(dt)for(let Dt=0;Dt<b.length;Dt++)n.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const gt=P.texture.mipmaps;gt&&gt.length>0?n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Dt=0;Dt<b.length;Dt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(mt|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(mt|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[Dt]);const Ht=a.get(b[Dt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ht,0)}s.blitFramebuffer(0,0,tt,lt,0,0,tt,lt,mt,s.NEAREST),m===!0&&(on.length=0,ln.length=0,on.push(s.COLOR_ATTACHMENT0+Dt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(on.push(Ct),ln.push(Ct),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ln)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,on))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let Dt=0;Dt<b.length;Dt++){n.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[Dt]);const Ht=a.get(b[Dt]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,Ht,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&m){const b=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function Ze(P){return Math.min(o.maxSamples,P.samples)}function un(P){const b=a.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function K(P){const b=c.render.frame;g.get(P)!==b&&(g.set(P,b),P.update())}function Ge(P,b){const tt=P.colorSpace,lt=P.format,mt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||tt!==wc&&tt!==xs&&(be.getTransfer(tt)===He?(lt!==Gi||mt!==vi)&&se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ae("WebGLTextures: Unsupported texture color space:",tt)),b}function Ue(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(p.width=P.naturalWidth||P.width,p.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(p.width=P.displayWidth,p.height=P.displayHeight):(p.width=P.width,p.height=P.height),p}this.allocateTextureUnit=F,this.resetTextureUnits=ht,this.getTextureUnits=pt,this.setTextureUnits=J,this.setTexture2D=nt,this.setTexture2DArray=St,this.setTexture3D=At,this.setTextureCube=z,this.rebindTextures=pe,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=rn,this.updateMultisampleRenderTarget=hn,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Zt,this.useMultisampledRTT=un,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function y3(s,t){function n(a,o=xs){let u;const c=be.getTransfer(o);if(a===vi)return s.UNSIGNED_BYTE;if(a===Qp)return s.UNSIGNED_SHORT_4_4_4_4;if(a===jp)return s.UNSIGNED_SHORT_5_5_5_1;if(a===ry)return s.UNSIGNED_INT_5_9_9_9_REV;if(a===oy)return s.UNSIGNED_INT_10F_11F_11F_REV;if(a===ay)return s.BYTE;if(a===sy)return s.SHORT;if(a===Sl)return s.UNSIGNED_SHORT;if(a===Jp)return s.INT;if(a===aa)return s.UNSIGNED_INT;if(a===$i)return s.FLOAT;if(a===Pa)return s.HALF_FLOAT;if(a===ly)return s.ALPHA;if(a===uy)return s.RGB;if(a===Gi)return s.RGBA;if(a===Oa)return s.DEPTH_COMPONENT;if(a===tr)return s.DEPTH_STENCIL;if(a===cy)return s.RED;if(a===$p)return s.RED_INTEGER;if(a===nr)return s.RG;if(a===tm)return s.RG_INTEGER;if(a===em)return s.RGBA_INTEGER;if(a===xc||a===yc||a===Sc||a===Mc)if(c===He)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(a===xc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===yc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===Sc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Mc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(a===xc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===yc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===Sc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Mc)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===jd||a===$d||a===tp||a===ep)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(a===jd)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===$d)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===tp)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===ep)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===np||a===ip||a===ap||a===sp||a===rp||a===Rc||a===op)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(a===np||a===ip)return c===He?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(a===ap)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC;if(a===sp)return u.COMPRESSED_R11_EAC;if(a===rp)return u.COMPRESSED_SIGNED_R11_EAC;if(a===Rc)return u.COMPRESSED_RG11_EAC;if(a===op)return u.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===lp||a===up||a===cp||a===fp||a===hp||a===dp||a===pp||a===mp||a===gp||a===_p||a===vp||a===xp||a===yp||a===Sp)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(a===lp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===up)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===cp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===fp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===hp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===dp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===pp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===mp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===gp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===_p)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===vp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===xp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===yp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Sp)return c===He?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Mp||a===Ep||a===bp)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(a===Mp)return c===He?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Ep)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===bp)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Tp||a===Ap||a===Cc||a===Rp)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(a===Tp)return u.COMPRESSED_RED_RGTC1_EXT;if(a===Ap)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Cc)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Rp)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Ml?s.UNSIGNED_INT_24_8:s[a]!==void 0?s[a]:null}return{convert:n}}const S3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class E3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new vy(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new ii({vertexShader:S3,fragmentShader:M3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Re(new Ss(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class b3 extends As{constructor(t,n){super();const a=this;let o=null,u=1,c=null,h="local-floor",m=1,p=null,g=null,_=null,v=null,S=null,E=null;const w=typeof XRWebGLBinding<"u",x=new E3,y={},U=n.getContextAttributes();let D=null,A=null;const O=[],L=[],I=new Ft;let T=null;const N=new _i;N.viewport=new nn;const W=new _i;W.viewport=new nn;const G=[N,W],q=new U1;let ht=null,pt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Q=O[V];return Q===void 0&&(Q=new fd,O[V]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(V){let Q=O[V];return Q===void 0&&(Q=new fd,O[V]=Q),Q.getGripSpace()},this.getHand=function(V){let Q=O[V];return Q===void 0&&(Q=new fd,O[V]=Q),Q.getHandSpace()};function J(V){const Q=L.indexOf(V.inputSource);if(Q===-1)return;const et=O[Q];et!==void 0&&(et.update(V.inputSource,V.frame,p||c),et.dispatchEvent({type:V.type,data:V.inputSource}))}function F(){o.removeEventListener("select",J),o.removeEventListener("selectstart",J),o.removeEventListener("selectend",J),o.removeEventListener("squeeze",J),o.removeEventListener("squeezestart",J),o.removeEventListener("squeezeend",J),o.removeEventListener("end",F),o.removeEventListener("inputsourceschange",H);for(let V=0;V<O.length;V++){const Q=L[V];Q!==null&&(L[V]=null,O[V].disconnect(Q))}ht=null,pt=null,x.reset();for(const V in y)delete y[V];t.setRenderTarget(D),S=null,v=null,_=null,o=null,A=null,_t.stop(),a.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){u=V,a.isPresenting===!0&&se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){h=V,a.isPresenting===!0&&se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||c},this.setReferenceSpace=function(V){p=V},this.getBaseLayer=function(){return v!==null?v:S},this.getBinding=function(){return _===null&&w&&(_=new XRWebGLBinding(o,n)),_},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(V){if(o=V,o!==null){if(D=t.getRenderTarget(),o.addEventListener("select",J),o.addEventListener("selectstart",J),o.addEventListener("selectend",J),o.addEventListener("squeeze",J),o.addEventListener("squeezestart",J),o.addEventListener("squeezeend",J),o.addEventListener("end",F),o.addEventListener("inputsourceschange",H),U.xrCompatible!==!0&&await n.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,Rt=null,Yt=null;U.depth&&(Yt=U.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,et=U.stencil?tr:Oa,Rt=U.stencil?Ml:aa);const Zt={colorFormat:n.RGBA8,depthFormat:Yt,scaleFactor:u};_=this.getBinding(),v=_.createProjectionLayer(Zt),o.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),A=new na(v.textureWidth,v.textureHeight,{format:Gi,type:vi,depthTexture:new so(v.textureWidth,v.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:U.stencil,colorSpace:t.outputColorSpace,samples:U.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const et={antialias:U.antialias,alpha:!0,depth:U.depth,stencil:U.stencil,framebufferScaleFactor:u};S=new XRWebGLLayer(o,n,et),o.updateRenderState({baseLayer:S}),t.setPixelRatio(1),t.setSize(S.framebufferWidth,S.framebufferHeight,!1),A=new na(S.framebufferWidth,S.framebufferHeight,{format:Gi,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:U.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),p=null,c=await o.requestReferenceSpace(h),_t.setContext(o),_t.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function H(V){for(let Q=0;Q<V.removed.length;Q++){const et=V.removed[Q],Rt=L.indexOf(et);Rt>=0&&(L[Rt]=null,O[Rt].disconnect(et))}for(let Q=0;Q<V.added.length;Q++){const et=V.added[Q];let Rt=L.indexOf(et);if(Rt===-1){for(let Zt=0;Zt<O.length;Zt++)if(Zt>=L.length){L.push(et),Rt=Zt;break}else if(L[Zt]===null){L[Zt]=et,Rt=Zt;break}if(Rt===-1)break}const Yt=O[Rt];Yt&&Yt.connect(et)}}const nt=new k,St=new k;function At(V,Q,et){nt.setFromMatrixPosition(Q.matrixWorld),St.setFromMatrixPosition(et.matrixWorld);const Rt=nt.distanceTo(St),Yt=Q.projectionMatrix.elements,Zt=et.projectionMatrix.elements,he=Yt[14]/(Yt[10]-1),ne=Yt[14]/(Yt[10]+1),re=(Yt[9]+1)/Yt[5],pe=(Yt[9]-1)/Yt[5],ae=(Yt[8]-1)/Yt[0],rn=(Zt[8]+1)/Zt[0],on=he*ae,ln=he*rn,hn=Rt/(-ae+rn),Ze=hn*-ae;if(Q.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ze),V.translateZ(hn),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Yt[10]===-1)V.projectionMatrix.copy(Q.projectionMatrix),V.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const un=he+hn,K=ne+hn,Ge=on-Ze,Ue=ln+(Rt-Ze),P=re*ne/K*un,b=pe*ne/K*un;V.projectionMatrix.makePerspective(Ge,Ue,P,b,un,K),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function z(V,Q){Q===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Q.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(o===null)return;let Q=V.near,et=V.far;x.texture!==null&&(x.depthNear>0&&(Q=x.depthNear),x.depthFar>0&&(et=x.depthFar)),q.near=W.near=N.near=Q,q.far=W.far=N.far=et,(ht!==q.near||pt!==q.far)&&(o.updateRenderState({depthNear:q.near,depthFar:q.far}),ht=q.near,pt=q.far),q.layers.mask=V.layers.mask|6,N.layers.mask=q.layers.mask&-5,W.layers.mask=q.layers.mask&-3;const Rt=V.parent,Yt=q.cameras;z(q,Rt);for(let Zt=0;Zt<Yt.length;Zt++)z(Yt[Zt],Rt);Yt.length===2?At(q,N,W):q.projectionMatrix.copy(N.projectionMatrix),j(V,q,Rt)};function j(V,Q,et){et===null?V.matrix.copy(Q.matrixWorld):(V.matrix.copy(et.matrixWorld),V.matrix.invert(),V.matrix.multiply(Q.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Q.projectionMatrix),V.projectionMatrixInverse.copy(Q.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=wp*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(v===null&&S===null))return m},this.setFoveation=function(V){m=V,v!==null&&(v.fixedFoveation=V),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=V)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(q)},this.getCameraTexture=function(V){return y[V]};let bt=null;function ot(V,Q){if(g=Q.getViewerPose(p||c),E=Q,g!==null){const et=g.views;S!==null&&(t.setRenderTargetFramebuffer(A,S.framebuffer),t.setRenderTarget(A));let Rt=!1;et.length!==q.cameras.length&&(q.cameras.length=0,Rt=!0);for(let ne=0;ne<et.length;ne++){const re=et[ne];let pe=null;if(S!==null)pe=S.getViewport(re);else{const rn=_.getViewSubImage(v,re);pe=rn.viewport,ne===0&&(t.setRenderTargetTextures(A,rn.colorTexture,rn.depthStencilTexture),t.setRenderTarget(A))}let ae=G[ne];ae===void 0&&(ae=new _i,ae.layers.enable(ne),ae.viewport=new nn,G[ne]=ae),ae.matrix.fromArray(re.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(re.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(pe.x,pe.y,pe.width,pe.height),ne===0&&(q.matrix.copy(ae.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Rt===!0&&q.cameras.push(ae)}const Yt=o.enabledFeatures;if(Yt&&Yt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&w){_=a.getBinding();const ne=_.getDepthInformation(et[0]);ne&&ne.isValid&&ne.texture&&x.init(ne,o.renderState)}if(Yt&&Yt.includes("camera-access")&&w){t.state.unbindTexture(),_=a.getBinding();for(let ne=0;ne<et.length;ne++){const re=et[ne].camera;if(re){let pe=y[re];pe||(pe=new vy,y[re]=pe);const ae=_.getCameraImage(re);pe.sourceTexture=ae}}}}for(let et=0;et<O.length;et++){const Rt=L[et],Yt=O[et];Rt!==null&&Yt!==void 0&&Yt.update(Rt,Q,p||c)}bt&&bt(V,Q),Q.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:Q}),E=null}const _t=new Ly;_t.setAnimationLoop(ot),this.setAnimationLoop=function(V){bt=V},this.dispose=function(){}}}const T3=new Qe,By=new ue;By.set(-1,0,0,0,1,0,0,0,1);function A3(s,t){function n(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function a(x,y){y.color.getRGB(x.fogColor.value,wy(s)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function o(x,y,U,D,A){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?u(x,y):y.isMeshLambertMaterial?(u(x,y),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(u(x,y),_(x,y)):y.isMeshPhongMaterial?(u(x,y),g(x,y),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(u(x,y),v(x,y),y.isMeshPhysicalMaterial&&S(x,y,A)):y.isMeshMatcapMaterial?(u(x,y),E(x,y)):y.isMeshDepthMaterial?u(x,y):y.isMeshDistanceMaterial?(u(x,y),w(x,y)):y.isMeshNormalMaterial?u(x,y):y.isLineBasicMaterial?(c(x,y),y.isLineDashedMaterial&&h(x,y)):y.isPointsMaterial?m(x,y,U,D):y.isSpriteMaterial?p(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function u(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,n(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,n(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,n(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===qn&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,n(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===qn&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,n(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,n(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,n(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const U=t.get(y),D=U.envMap,A=U.envMapRotation;D&&(x.envMap.value=D,x.envMapRotation.value.setFromMatrix4(T3.makeRotationFromEuler(A)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(By),x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap&&(x.lightMap.value=y.lightMap,x.lightMapIntensity.value=y.lightMapIntensity,n(y.lightMap,x.lightMapTransform)),y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,n(y.aoMap,x.aoMapTransform))}function c(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,n(y.map,x.mapTransform))}function h(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function m(x,y,U,D){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*U,x.scale.value=D*.5,y.map&&(x.map.value=y.map,n(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,n(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function p(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,n(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,n(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function _(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function v(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,n(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,n(y.roughnessMap,x.roughnessMapTransform)),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function S(x,y,U){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,n(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,n(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,n(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,n(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,n(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===qn&&x.clearcoatNormalScale.value.negate())),y.dispersion>0&&(x.dispersion.value=y.dispersion),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,n(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,n(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=U.texture,x.transmissionSamplerSize.value.set(U.width,U.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,n(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,n(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,n(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,n(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,n(y.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,y){y.matcap&&(x.matcap.value=y.matcap)}function w(x,y){const U=t.get(y).light;x.referencePosition.value.setFromMatrixPosition(U.matrixWorld),x.nearDistance.value=U.shadow.camera.near,x.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function R3(s,t,n,a){let o={},u={},c=[];const h=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,O){const L=O.program;a.uniformBlockBinding(A,L)}function p(A,O){let L=o[A.id];L===void 0&&(x(A),L=g(A),o[A.id]=L,A.addEventListener("dispose",U));const I=O.program;a.updateUBOMapping(A,I);const T=t.render.frame;u[A.id]!==T&&(v(A),u[A.id]=T)}function g(A){const O=_();A.__bindingPointIndex=O;const L=s.createBuffer(),I=A.__size,T=A.usage;return s.bindBuffer(s.UNIFORM_BUFFER,L),s.bufferData(s.UNIFORM_BUFFER,I,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,O,L),L}function _(){for(let A=0;A<h;A++)if(c.indexOf(A)===-1)return c.push(A),A;return Ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(A){const O=o[A.id],L=A.uniforms,I=A.__cache;s.bindBuffer(s.UNIFORM_BUFFER,O);for(let T=0,N=L.length;T<N;T++){const W=L[T];if(Array.isArray(W))for(let G=0,q=W.length;G<q;G++)S(W[G],T,G,I);else S(W,T,0,I)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(A,O,L,I){if(w(A,O,L,I)===!0){const T=A.__offset,N=A.value;if(Array.isArray(N)){let W=0;for(let G=0;G<N.length;G++){const q=N[G],ht=y(q);E(q,A.__data,W),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(W+=ht.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(N,A.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,A.__data)}}function E(A,O,L){typeof A=="number"||typeof A=="boolean"?O[0]=A:A.isMatrix3?(O[0]=A.elements[0],O[1]=A.elements[1],O[2]=A.elements[2],O[3]=0,O[4]=A.elements[3],O[5]=A.elements[4],O[6]=A.elements[5],O[7]=0,O[8]=A.elements[6],O[9]=A.elements[7],O[10]=A.elements[8],O[11]=0):ArrayBuffer.isView(A)?O.set(new A.constructor(A.buffer,A.byteOffset,O.length)):A.toArray(O,L)}function w(A,O,L,I){const T=A.value,N=O+"_"+L;if(I[N]===void 0)return typeof T=="number"||typeof T=="boolean"?I[N]=T:ArrayBuffer.isView(T)?I[N]=T.slice():I[N]=T.clone(),!0;{const W=I[N];if(typeof T=="number"||typeof T=="boolean"){if(W!==T)return I[N]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(W.equals(T)===!1)return W.copy(T),!0}}return!1}function x(A){const O=A.uniforms;let L=0;const I=16;for(let N=0,W=O.length;N<W;N++){const G=Array.isArray(O[N])?O[N]:[O[N]];for(let q=0,ht=G.length;q<ht;q++){const pt=G[q],J=Array.isArray(pt.value)?pt.value:[pt.value];for(let F=0,H=J.length;F<H;F++){const nt=J[F],St=y(nt),At=L%I,z=At%St.boundary,j=At+z;L+=z,j!==0&&I-j<St.storage&&(L+=I-j),pt.__data=new Float32Array(St.storage/Float32Array.BYTES_PER_ELEMENT),pt.__offset=L,L+=St.storage}}}const T=L%I;return T>0&&(L+=I-T),A.__size=L,A.__cache={},this}function y(A){const O={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(O.boundary=4,O.storage=4):A.isVector2?(O.boundary=8,O.storage=8):A.isVector3||A.isColor?(O.boundary=16,O.storage=12):A.isVector4?(O.boundary=16,O.storage=16):A.isMatrix3?(O.boundary=48,O.storage=48):A.isMatrix4?(O.boundary=64,O.storage=64):A.isTexture?se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(O.boundary=16,O.storage=A.byteLength):se("WebGLRenderer: Unsupported uniform value type.",A),O}function U(A){const O=A.target;O.removeEventListener("dispose",U);const L=c.indexOf(O.__bindingPointIndex);c.splice(L,1),s.deleteBuffer(o[O.id]),delete o[O.id],delete u[O.id]}function D(){for(const A in o)s.deleteBuffer(o[A]);c=[],o={},u={}}return{bind:m,update:p,dispose:D}}const C3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ji=null;function w3(){return Ji===null&&(Ji=new zT(C3,16,16,nr,Pa),Ji.name="DFG_LUT",Ji.minFilter=Vn,Ji.magFilter=Vn,Ji.wrapS=Da,Ji.wrapT=Da,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}class D3{constructor(t={}){const{canvas:n=hT(),context:a=null,depth:o=!0,stencil:u=!1,alpha:c=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:S=vi}=t;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=c;const w=S,x=new Set([em,tm,$p]),y=new Set([vi,aa,Sl,Ml,Qp,jp]),U=new Uint32Array(4),D=new Int32Array(4),A=new k;let O=null,L=null;const I=[],T=[];let N=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ea,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const W=this;let G=!1,q=null,ht=null,pt=null,J=null;this._outputColorSpace=wi;let F=0,H=0,nt=null,St=-1,At=null;const z=new nn,j=new nn;let bt=null;const ot=new Te(0);let _t=0,V=n.width,Q=n.height,et=1,Rt=null,Yt=null;const Zt=new nn(0,0,V,Q),he=new nn(0,0,V,Q);let ne=!1;const re=new om;let pe=!1,ae=!1;const rn=new Qe,on=new k,ln=new nn,hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function un(){return nt===null?et:1}let K=a;function Ge(R,Z){return n.getContext(R,Z)}try{const R={alpha:!0,depth:o,stencil:u,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Zp}`),n.addEventListener("webglcontextlost",je,!1),n.addEventListener("webglcontextrestored",Pe,!1),n.addEventListener("webglcontextcreationerror",ai,!1),K===null){const Z="webgl2";if(K=Ge(Z,R),K===null)throw Ge(Z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw Ae("WebGLRenderer: "+R.message),R}let Ue,P,b,tt,lt,mt,Ct,Lt,dt,gt,Dt,Ht,Ot,Nt,jt,$t,oe,Y,wt,yt,Ut,Bt,Tt;function Kt(){Ue=new wC(K),Ue.init(),Ut=new y3(K,Ue),P=new SC(K,Ue,t,Ut),b=new v3(K,Ue),P.reversedDepthBuffer&&v&&b.buffers.depth.setReversed(!0),ht=K.createFramebuffer(),pt=K.createFramebuffer(),J=K.createFramebuffer(),tt=new LC(K),lt=new a3,mt=new x3(K,Ue,b,lt,P,Ut,tt),Ct=new CC(W),Lt=new z1(K),Bt=new xC(K,Lt),dt=new DC(K,Lt,tt,Bt),gt=new PC(K,dt,Lt,Bt,tt),Y=new NC(K,P,mt),jt=new MC(lt),Dt=new i3(W,Ct,Ue,P,Bt,jt),Ht=new A3(W,lt),Ot=new r3,Nt=new h3(Ue),oe=new vC(W,Ct,b,gt,E,m),$t=new _3(W,gt,P),Tt=new R3(K,tt,P,b),wt=new yC(K,Ue,tt),yt=new UC(K,Ue,tt),tt.programs=Dt.programs,W.capabilities=P,W.extensions=Ue,W.properties=lt,W.renderLists=Ot,W.shadowMap=$t,W.state=b,W.info=tt}Kt(),w!==vi&&(N=new zC(w,n.width,n.height,h,o,u));const kt=new b3(W,K);this.xr=kt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const R=Ue.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ue.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(R){R!==void 0&&(et=R,this.setSize(V,Q,!1))},this.getSize=function(R){return R.set(V,Q)},this.setSize=function(R,Z,ut=!0){if(kt.isPresenting){se("WebGLRenderer: Can't change size while VR device is presenting.");return}V=R,Q=Z,n.width=Math.floor(R*et),n.height=Math.floor(Z*et),ut===!0&&(n.style.width=R+"px",n.style.height=Z+"px"),N!==null&&N.setSize(n.width,n.height),this.setViewport(0,0,R,Z)},this.getDrawingBufferSize=function(R){return R.set(V*et,Q*et).floor()},this.setDrawingBufferSize=function(R,Z,ut){V=R,Q=Z,et=ut,n.width=Math.floor(R*ut),n.height=Math.floor(Z*ut),this.setViewport(0,0,R,Z)},this.setEffects=function(R){if(w===vi){Ae("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let Z=0;Z<R.length;Z++)if(R[Z].isOutputPass===!0){se("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy(Zt)},this.setViewport=function(R,Z,ut,st){R.isVector4?Zt.set(R.x,R.y,R.z,R.w):Zt.set(R,Z,ut,st),b.viewport(z.copy(Zt).multiplyScalar(et).round())},this.getScissor=function(R){return R.copy(he)},this.setScissor=function(R,Z,ut,st){R.isVector4?he.set(R.x,R.y,R.z,R.w):he.set(R,Z,ut,st),b.scissor(j.copy(he).multiplyScalar(et).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(R){b.setScissorTest(ne=R)},this.setOpaqueSort=function(R){Rt=R},this.setTransparentSort=function(R){Yt=R},this.getClearColor=function(R){return R.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(R=!0,Z=!0,ut=!0){let st=0;if(R){let rt=!1;if(nt!==null){const zt=nt.texture.format;rt=x.has(zt)}if(rt){const zt=nt.texture.type,Vt=y.has(zt),Pt=oe.getClearColor(),Wt=oe.getClearAlpha(),Xt=Pt.r,te=Pt.g,ce=Pt.b;Vt?(U[0]=Xt,U[1]=te,U[2]=ce,U[3]=Wt,K.clearBufferuiv(K.COLOR,0,U)):(D[0]=Xt,D[1]=te,D[2]=ce,D[3]=Wt,K.clearBufferiv(K.COLOR,0,D))}else st|=K.COLOR_BUFFER_BIT}Z&&(st|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(st|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),st!==0&&K.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),q=R},this.dispose=function(){n.removeEventListener("webglcontextlost",je,!1),n.removeEventListener("webglcontextrestored",Pe,!1),n.removeEventListener("webglcontextcreationerror",ai,!1),oe.dispose(),Ot.dispose(),Nt.dispose(),lt.dispose(),Ct.dispose(),gt.dispose(),Bt.dispose(),Tt.dispose(),Dt.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",gn),kt.removeEventListener("sessionend",Dn),Zn.stop()};function je(R){R.preventDefault(),Mv("WebGLRenderer: Context Lost."),G=!0}function Pe(){Mv("WebGLRenderer: Context Restored."),G=!1;const R=tt.autoReset,Z=$t.enabled,ut=$t.autoUpdate,st=$t.needsUpdate,rt=$t.type;Kt(),tt.autoReset=R,$t.enabled=Z,$t.autoUpdate=ut,$t.needsUpdate=st,$t.type=rt}function ai(R){Ae("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function si(R){const Z=R.target;Z.removeEventListener("dispose",si),po(Z)}function po(R){mo(R),lt.remove(R)}function mo(R){const Z=lt.get(R).programs;Z!==void 0&&(Z.forEach(function(ut){Dt.releaseProgram(ut)}),R.isShaderMaterial&&Dt.releaseShaderCache(R))}this.renderBufferDirect=function(R,Z,ut,st,rt,zt){Z===null&&(Z=hn);const Vt=rt.isMesh&&rt.matrixWorld.determinantAffine()<0,Pt=Ha(R,Z,ut,st,rt);b.setMaterial(st,Vt);let Wt=ut.index,Xt=1;if(st.wireframe===!0){if(Wt=dt.getWireframeAttribute(ut),Wt===void 0)return;Xt=2}const te=ut.drawRange,ce=ut.attributes.position;let Qt=te.start*Xt,Ce=(te.start+te.count)*Xt;zt!==null&&(Qt=Math.max(Qt,zt.start*Xt),Ce=Math.min(Ce,(zt.start+zt.count)*Xt)),Wt!==null?(Qt=Math.max(Qt,0),Ce=Math.min(Ce,Wt.count)):ce!=null&&(Qt=Math.max(Qt,0),Ce=Math.min(Ce,ce.count));const $e=Ce-Qt;if($e<0||$e===1/0)return;Bt.setup(rt,st,Pt,ut,Wt);let qe,Oe=wt;if(Wt!==null&&(qe=Lt.get(Wt),Oe=yt,Oe.setIndex(qe)),rt.isMesh)st.wireframe===!0?(b.setLineWidth(st.wireframeLinewidth*un()),Oe.setMode(K.LINES)):Oe.setMode(K.TRIANGLES);else if(rt.isLine){let ze=st.linewidth;ze===void 0&&(ze=1),b.setLineWidth(ze*un()),rt.isLineSegments?Oe.setMode(K.LINES):rt.isLineLoop?Oe.setMode(K.LINE_LOOP):Oe.setMode(K.LINE_STRIP)}else rt.isPoints?Oe.setMode(K.POINTS):rt.isSprite&&Oe.setMode(K.TRIANGLES);if(rt.isBatchedMesh)if(Ue.get("WEBGL_multi_draw"))Oe.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{const ze=rt._multiDrawStarts,Gt=rt._multiDrawCounts,In=rt._multiDrawCount,_e=Wt?Lt.get(Wt).bytesPerElement:1,En=lt.get(st).currentProgram.getUniforms();for(let ri=0;ri<In;ri++)En.setValue(K,"_gl_DrawID",ri),Oe.render(ze[ri]/_e,Gt[ri])}else if(rt.isInstancedMesh)Oe.renderInstances(Qt,$e,rt.count);else if(ut.isInstancedBufferGeometry){const ze=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Gt=Math.min(ut.instanceCount,ze);Oe.renderInstances(Qt,$e,Gt)}else Oe.render(Qt,$e)};function go(R,Z,ut){R.transparent===!0&&R.side===Bi&&R.forceSinglePass===!1?(R.side=qn,R.needsUpdate=!0,Ba(R,Z,ut),R.side=Es,R.needsUpdate=!0,Ba(R,Z,ut),R.side=Bi):Ba(R,Z,ut)}this.compile=function(R,Z,ut=null){ut===null&&(ut=R),L=Nt.get(ut),L.init(Z),T.push(L),ut.traverseVisible(function(rt){rt.isLight&&rt.layers.test(Z.layers)&&(L.pushLight(rt),rt.castShadow&&L.pushShadow(rt))}),R!==ut&&R.traverseVisible(function(rt){rt.isLight&&rt.layers.test(Z.layers)&&(L.pushLight(rt),rt.castShadow&&L.pushShadow(rt))}),L.setupLights();const st=new Set;return R.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;const zt=rt.material;if(zt)if(Array.isArray(zt))for(let Vt=0;Vt<zt.length;Vt++){const Pt=zt[Vt];go(Pt,ut,rt),st.add(Pt)}else go(zt,ut,rt),st.add(zt)}),L=T.pop(),st},this.compileAsync=function(R,Z,ut=null){const st=this.compile(R,Z,ut);return new Promise(rt=>{function zt(){if(st.forEach(function(Vt){lt.get(Vt).currentProgram.isReady()&&st.delete(Vt)}),st.size===0){rt(R);return}setTimeout(zt,10)}Ue.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let ar=null;function ki(R){ar&&ar(R)}function gn(){Zn.stop()}function Dn(){Zn.start()}const Zn=new Ly;Zn.setAnimationLoop(ki),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(R){ar=R,kt.setAnimationLoop(R),R===null?Zn.stop():Zn.start()},kt.addEventListener("sessionstart",gn),kt.addEventListener("sessionend",Dn),this.render=function(R,Z){if(Z!==void 0&&Z.isCamera!==!0){Ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;q!==null&&q.renderStart(R,Z);const ut=kt.enabled===!0&&kt.isPresenting===!0,st=N!==null&&(nt===null||ut)&&N.begin(W,nt);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(Z),Z=kt.getCamera()),R.isScene===!0&&R.onBeforeRender(W,R,Z,nt),L=Nt.get(R,T.length),L.init(Z),L.state.textureUnits=mt.getTextureUnits(),T.push(L),rn.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),re.setFromProjectionMatrix(rn,ta,Z.reversedDepth),ae=this.localClippingEnabled,pe=jt.init(this.clippingPlanes,ae),O=Ot.get(R,I.length),O.init(),I.push(O),kt.enabled===!0&&kt.isPresenting===!0){const Vt=W.xr.getDepthSensingMesh();Vt!==null&&Rs(Vt,Z,-1/0,W.sortObjects)}Rs(R,Z,0,W.sortObjects),O.finish(),W.sortObjects===!0&&O.sort(Rt,Yt,Z.reversedDepth),Ze=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,Ze&&oe.addToRenderList(O,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&jt.beginShadows();const rt=L.state.shadowsArray;if($t.render(rt,R,Z),pe===!0&&jt.endShadows(),(st&&N.hasRenderPass())===!1){const Vt=O.opaque,Pt=O.transmissive;if(L.setupLights(),Z.isArrayCamera){const Wt=Z.cameras;if(Pt.length>0)for(let Xt=0,te=Wt.length;Xt<te;Xt++){const ce=Wt[Xt];Ll(Vt,Pt,R,ce)}Ze&&oe.render(R);for(let Xt=0,te=Wt.length;Xt<te;Xt++){const ce=Wt[Xt];Ul(O,R,ce,ce.viewport)}}else Pt.length>0&&Ll(Vt,Pt,R,Z),Ze&&oe.render(R),Ul(O,R,Z)}nt!==null&&H===0&&(mt.updateMultisampleRenderTarget(nt),mt.updateRenderTargetMipmap(nt)),st&&N.end(W),R.isScene===!0&&R.onAfterRender(W,R,Z),Bt.resetDefaultState(),St=-1,At=null,T.pop(),T.length>0?(L=T[T.length-1],mt.setTextureUnits(L.state.textureUnits),pe===!0&&jt.setGlobalState(W.clippingPlanes,L.state.camera)):L=null,I.pop(),I.length>0?O=I[I.length-1]:O=null,q!==null&&q.renderEnd()};function Rs(R,Z,ut,st){if(R.visible===!1)return;if(R.layers.test(Z.layers)){if(R.isGroup)ut=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Z);else if(R.isLightProbeGrid)L.pushLightProbeGrid(R);else if(R.isLight)L.pushLight(R),R.castShadow&&L.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||re.intersectsSprite(R)){st&&ln.setFromMatrixPosition(R.matrixWorld).applyMatrix4(rn);const Vt=gt.update(R),Pt=R.material;Pt.visible&&O.push(R,Vt,Pt,ut,ln.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||re.intersectsObject(R))){const Vt=gt.update(R),Pt=R.material;if(st&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ln.copy(R.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),ln.copy(Vt.boundingSphere.center)),ln.applyMatrix4(R.matrixWorld).applyMatrix4(rn)),Array.isArray(Pt)){const Wt=Vt.groups;for(let Xt=0,te=Wt.length;Xt<te;Xt++){const ce=Wt[Xt],Qt=Pt[ce.materialIndex];Qt&&Qt.visible&&O.push(R,Vt,Qt,ut,ln.z,ce)}}else Pt.visible&&O.push(R,Vt,Pt,ut,ln.z,null)}}const zt=R.children;for(let Vt=0,Pt=zt.length;Vt<Pt;Vt++)Rs(zt[Vt],Z,ut,st)}function Ul(R,Z,ut,st){const{opaque:rt,transmissive:zt,transparent:Vt}=R;L.setupLightsView(ut),pe===!0&&jt.setGlobalState(W.clippingPlanes,ut),st&&b.viewport(z.copy(st)),rt.length>0&&Cs(rt,Z,ut),zt.length>0&&Cs(zt,Z,ut),Vt.length>0&&Cs(Vt,Z,ut),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Ll(R,Z,ut,st){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[st.id]===void 0){const Qt=Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[st.id]=new na(1,1,{generateMipmaps:!0,type:Qt?Pa:vi,minFilter:$s,samples:Math.max(4,P.samples),stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:be.workingColorSpace})}const zt=L.state.transmissionRenderTarget[st.id],Vt=st.viewport||z;zt.setSize(Vt.z*W.transmissionResolutionScale,Vt.w*W.transmissionResolutionScale);const Pt=W.getRenderTarget(),Wt=W.getActiveCubeFace(),Xt=W.getActiveMipmapLevel();W.setRenderTarget(zt),W.getClearColor(ot),_t=W.getClearAlpha(),_t<1&&W.setClearColor(16777215,.5),W.clear(),Ze&&oe.render(ut);const te=W.toneMapping;W.toneMapping=ea;const ce=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),L.setupLightsView(st),pe===!0&&jt.setGlobalState(W.clippingPlanes,st),Cs(R,ut,st),mt.updateMultisampleRenderTarget(zt),mt.updateRenderTargetMipmap(zt),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Ce=0,$e=Z.length;Ce<$e;Ce++){const qe=Z[Ce],{object:Oe,geometry:ze,material:Gt,group:In}=qe;if(Gt.side===Bi&&Oe.layers.test(st.layers)){const _e=Gt.side;Gt.side=qn,Gt.needsUpdate=!0,Fa(Oe,ut,st,ze,Gt,In),Gt.side=_e,Gt.needsUpdate=!0,Qt=!0}}Qt===!0&&(mt.updateMultisampleRenderTarget(zt),mt.updateRenderTargetMipmap(zt))}W.setRenderTarget(Pt,Wt,Xt),W.setClearColor(ot,_t),ce!==void 0&&(st.viewport=ce),W.toneMapping=te}function Cs(R,Z,ut){const st=Z.isScene===!0?Z.overrideMaterial:null;for(let rt=0,zt=R.length;rt<zt;rt++){const Vt=R[rt],{object:Pt,geometry:Wt,group:Xt}=Vt;let te=Vt.material;te.allowOverride===!0&&st!==null&&(te=st),Pt.layers.test(ut.layers)&&Fa(Pt,Z,ut,Wt,te,Xt)}}function Fa(R,Z,ut,st,rt,zt){R.onBeforeRender(W,Z,ut,st,rt,zt),R.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),rt.onBeforeRender(W,Z,ut,st,R,zt),rt.transparent===!0&&rt.side===Bi&&rt.forceSinglePass===!1?(rt.side=qn,rt.needsUpdate=!0,W.renderBufferDirect(ut,Z,st,rt,R,zt),rt.side=Es,rt.needsUpdate=!0,W.renderBufferDirect(ut,Z,st,rt,R,zt),rt.side=Bi):W.renderBufferDirect(ut,Z,st,rt,R,zt),R.onAfterRender(W,Z,ut,st,rt,zt)}function Ba(R,Z,ut){Z.isScene!==!0&&(Z=hn);const st=lt.get(R),rt=L.state.lights,zt=L.state.shadowsArray,Vt=rt.state.version,Pt=Dt.getParameters(R,rt.state,zt,Z,ut,L.state.lightProbeGridArray),Wt=Dt.getProgramCacheKey(Pt);let Xt=st.programs;st.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Z.environment:null,st.fog=Z.fog;const te=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;st.envMap=Ct.get(R.envMap||st.environment,te),st.envMapRotation=st.environment!==null&&R.envMap===null?Z.environmentRotation:R.envMapRotation,Xt===void 0&&(R.addEventListener("dispose",si),Xt=new Map,st.programs=Xt);let ce=Xt.get(Wt);if(ce!==void 0){if(st.currentProgram===ce&&st.lightsStateVersion===Vt)return oa(R,Pt),ce}else Pt.uniforms=Dt.getUniforms(R),q!==null&&R.isNodeMaterial&&q.build(R,ut,Pt),R.onBeforeCompile(Pt,W),ce=Dt.acquireProgram(Pt,Wt),Xt.set(Wt,ce),st.uniforms=Pt.uniforms;const Qt=st.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Qt.clippingPlanes=jt.uniform),oa(R,Pt),st.needsLights=Nl(R),st.lightsStateVersion=Vt,st.needsLights&&(Qt.ambientLightColor.value=rt.state.ambient,Qt.lightProbe.value=rt.state.probe,Qt.directionalLights.value=rt.state.directional,Qt.directionalLightShadows.value=rt.state.directionalShadow,Qt.spotLights.value=rt.state.spot,Qt.spotLightShadows.value=rt.state.spotShadow,Qt.rectAreaLights.value=rt.state.rectArea,Qt.ltc_1.value=rt.state.rectAreaLTC1,Qt.ltc_2.value=rt.state.rectAreaLTC2,Qt.pointLights.value=rt.state.point,Qt.pointLightShadows.value=rt.state.pointShadow,Qt.hemisphereLights.value=rt.state.hemi,Qt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Qt.spotLightMatrix.value=rt.state.spotLightMatrix,Qt.spotLightMap.value=rt.state.spotLightMap,Qt.pointShadowMatrix.value=rt.state.pointShadowMatrix),st.lightProbeGrid=L.state.lightProbeGridArray.length>0,st.currentProgram=ce,st.uniformsList=null,ce}function ra(R){if(R.uniformsList===null){const Z=R.currentProgram.getUniforms();R.uniformsList=bc.seqWithValue(Z.seq,R.uniforms)}return R.uniformsList}function oa(R,Z){const ut=lt.get(R);ut.outputColorSpace=Z.outputColorSpace,ut.batching=Z.batching,ut.batchingColor=Z.batchingColor,ut.instancing=Z.instancing,ut.instancingColor=Z.instancingColor,ut.instancingMorph=Z.instancingMorph,ut.skinning=Z.skinning,ut.morphTargets=Z.morphTargets,ut.morphNormals=Z.morphNormals,ut.morphColors=Z.morphColors,ut.morphTargetsCount=Z.morphTargetsCount,ut.numClippingPlanes=Z.numClippingPlanes,ut.numIntersection=Z.numClipIntersection,ut.vertexAlphas=Z.vertexAlphas,ut.vertexTangents=Z.vertexTangents,ut.toneMapping=Z.toneMapping}function ws(R,Z){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;A.setFromMatrixPosition(Z.matrixWorld);for(let ut=0,st=R.length;ut<st;ut++){const rt=R[ut];if(rt.texture!==null&&rt.boundingBox.containsPoint(A))return rt}return null}function Ha(R,Z,ut,st,rt){Z.isScene!==!0&&(Z=hn),mt.resetTextureUnits();const zt=Z.fog,Vt=st.isMeshStandardMaterial||st.isMeshLambertMaterial||st.isMeshPhongMaterial?Z.environment:null,Pt=nt===null?W.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:be.workingColorSpace,Wt=st.isMeshStandardMaterial||st.isMeshLambertMaterial&&!st.envMap||st.isMeshPhongMaterial&&!st.envMap,Xt=Ct.get(st.envMap||Vt,Wt),te=st.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,ce=!!ut.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),Qt=!!ut.morphAttributes.position,Ce=!!ut.morphAttributes.normal,$e=!!ut.morphAttributes.color;let qe=ea;st.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(qe=W.toneMapping);const Oe=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,ze=Oe!==void 0?Oe.length:0,Gt=lt.get(st),In=L.state.lights;if(pe===!0&&(ae===!0||R!==At)){const Ne=R===At&&st.id===St;jt.setState(st,R,Ne)}let _e=!1;st.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==In.state.version||Gt.outputColorSpace!==Pt||rt.isBatchedMesh&&Gt.batching===!1||!rt.isBatchedMesh&&Gt.batching===!0||rt.isBatchedMesh&&Gt.batchingColor===!0&&rt.colorTexture===null||rt.isBatchedMesh&&Gt.batchingColor===!1&&rt.colorTexture!==null||rt.isInstancedMesh&&Gt.instancing===!1||!rt.isInstancedMesh&&Gt.instancing===!0||rt.isSkinnedMesh&&Gt.skinning===!1||!rt.isSkinnedMesh&&Gt.skinning===!0||rt.isInstancedMesh&&Gt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&Gt.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&Gt.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&Gt.instancingMorph===!1&&rt.morphTexture!==null||Gt.envMap!==Xt||st.fog===!0&&Gt.fog!==zt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==jt.numPlanes||Gt.numIntersection!==jt.numIntersection)||Gt.vertexAlphas!==te||Gt.vertexTangents!==ce||Gt.morphTargets!==Qt||Gt.morphNormals!==Ce||Gt.morphColors!==$e||Gt.toneMapping!==qe||Gt.morphTargetsCount!==ze||!!Gt.lightProbeGrid!=L.state.lightProbeGridArray.length>0)&&(_e=!0):(_e=!0,Gt.__version=st.version);let En=Gt.currentProgram;_e===!0&&(En=Ba(st,Z,rt),q&&st.isNodeMaterial&&q.onUpdateProgram(st,En,Gt));let ri=!1,Ui=!1,oi=!1;const Ie=En.getUniforms(),tn=Gt.uniforms;if(b.useProgram(En.program)&&(ri=!0,Ui=!0,oi=!0),st.id!==St&&(St=st.id,Ui=!0),Gt.needsLights){const Ne=ws(L.state.lightProbeGridArray,rt);Gt.lightProbeGrid!==Ne&&(Gt.lightProbeGrid=Ne,Ui=!0)}if(ri||At!==R){b.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ie.setValue(K,"projectionMatrix",R.projectionMatrix),Ie.setValue(K,"viewMatrix",R.matrixWorldInverse);const Xi=Ie.map.cameraPosition;Xi!==void 0&&Xi.setValue(K,on.setFromMatrixPosition(R.matrixWorld)),P.logarithmicDepthBuffer&&Ie.setValue(K,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&Ie.setValue(K,"isOrthographic",R.isOrthographicCamera===!0),At!==R&&(At=R,Ui=!0,oi=!0)}if(Gt.needsLights&&(In.state.directionalShadowMap.length>0&&Ie.setValue(K,"directionalShadowMap",In.state.directionalShadowMap,mt),In.state.spotShadowMap.length>0&&Ie.setValue(K,"spotShadowMap",In.state.spotShadowMap,mt),In.state.pointShadowMap.length>0&&Ie.setValue(K,"pointShadowMap",In.state.pointShadowMap,mt)),rt.isSkinnedMesh){Ie.setOptional(K,rt,"bindMatrix"),Ie.setOptional(K,rt,"bindMatrixInverse");const Ne=rt.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),Ie.setValue(K,"boneTexture",Ne.boneTexture,mt))}rt.isBatchedMesh&&(Ie.setOptional(K,rt,"batchingTexture"),Ie.setValue(K,"batchingTexture",rt._matricesTexture,mt),Ie.setOptional(K,rt,"batchingIdTexture"),Ie.setValue(K,"batchingIdTexture",rt._indirectTexture,mt),Ie.setOptional(K,rt,"batchingColorTexture"),rt._colorsTexture!==null&&Ie.setValue(K,"batchingColorTexture",rt._colorsTexture,mt));const Li=ut.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&Y.update(rt,ut,En),(Ui||Gt.receiveShadow!==rt.receiveShadow)&&(Gt.receiveShadow=rt.receiveShadow,Ie.setValue(K,"receiveShadow",rt.receiveShadow)),(st.isMeshStandardMaterial||st.isMeshLambertMaterial||st.isMeshPhongMaterial)&&st.envMap===null&&Z.environment!==null&&(tn.envMapIntensity.value=Z.environmentIntensity),tn.dfgLUT!==void 0&&(tn.dfgLUT.value=w3()),Ui){if(Ie.setValue(K,"toneMappingExposure",W.toneMappingExposure),Gt.needsLights&&_n(tn,oi),zt&&st.fog===!0&&Ht.refreshFogUniforms(tn,zt),Ht.refreshMaterialUniforms(tn,st,et,Q,L.state.transmissionRenderTarget[R.id]),Gt.needsLights&&Gt.lightProbeGrid){const Ne=Gt.lightProbeGrid;tn.probesSH.value=Ne.texture,tn.probesMin.value.copy(Ne.boundingBox.min),tn.probesMax.value.copy(Ne.boundingBox.max),tn.probesResolution.value.copy(Ne.resolution)}bc.upload(K,ra(Gt),tn,mt)}if(st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(bc.upload(K,ra(Gt),tn,mt),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&Ie.setValue(K,"center",rt.center),Ie.setValue(K,"modelViewMatrix",rt.modelViewMatrix),Ie.setValue(K,"normalMatrix",rt.normalMatrix),Ie.setValue(K,"modelMatrix",rt.matrixWorld),st.uniformsGroups!==void 0){const Ne=st.uniformsGroups;for(let Xi=0,Ga=Ne.length;Xi<Ga;Xi++){const Ds=Ne[Xi];Tt.update(Ds,En),Tt.bind(Ds,En)}}return En}function _n(R,Z){R.ambientLightColor.needsUpdate=Z,R.lightProbe.needsUpdate=Z,R.directionalLights.needsUpdate=Z,R.directionalLightShadows.needsUpdate=Z,R.pointLights.needsUpdate=Z,R.pointLightShadows.needsUpdate=Z,R.spotLights.needsUpdate=Z,R.spotLightShadows.needsUpdate=Z,R.rectAreaLights.needsUpdate=Z,R.hemisphereLights.needsUpdate=Z}function Nl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(R,Z,ut){const st=lt.get(R);st.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,st.__autoAllocateDepthBuffer===!1&&(st.__useRenderToTexture=!1),lt.get(R.texture).__webglTexture=Z,lt.get(R.depthTexture).__webglTexture=st.__autoAllocateDepthBuffer?void 0:ut,st.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Z){const ut=lt.get(R);ut.__webglFramebuffer=Z,ut.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(R,Z=0,ut=0){nt=R,F=Z,H=ut;let st=null,rt=!1,zt=!1;if(R){const Pt=lt.get(R);if(Pt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(K.FRAMEBUFFER,Pt.__webglFramebuffer),z.copy(R.viewport),j.copy(R.scissor),bt=R.scissorTest,b.viewport(z),b.scissor(j),b.setScissorTest(bt),St=-1;return}else if(Pt.__webglFramebuffer===void 0)mt.setupRenderTarget(R);else if(Pt.__hasExternalTextures)mt.rebindTextures(R,lt.get(R.texture).__webglTexture,lt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const te=R.depthTexture;if(Pt.__boundDepthTexture!==te){if(te!==null&&lt.has(te)&&(R.width!==te.image.width||R.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(R)}}const Wt=R.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(zt=!0);const Xt=lt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Xt[Z])?st=Xt[Z][ut]:st=Xt[Z],rt=!0):R.samples>0&&mt.useMultisampledRTT(R)===!1?st=lt.get(R).__webglMultisampledFramebuffer:Array.isArray(Xt)?st=Xt[ut]:st=Xt,z.copy(R.viewport),j.copy(R.scissor),bt=R.scissorTest}else z.copy(Zt).multiplyScalar(et).floor(),j.copy(he).multiplyScalar(et).floor(),bt=ne;if(ut!==0&&(st=ht),b.bindFramebuffer(K.FRAMEBUFFER,st)&&b.drawBuffers(R,st),b.viewport(z),b.scissor(j),b.setScissorTest(bt),rt){const Pt=lt.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Pt.__webglTexture,ut)}else if(zt){const Pt=Z;for(let Wt=0;Wt<R.textures.length;Wt++){const Xt=lt.get(R.textures[Wt]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Wt,Xt.__webglTexture,ut,Pt)}}else if(R!==null&&ut!==0){const Pt=lt.get(R.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Pt.__webglTexture,ut)}St=-1},this.readRenderTargetPixels=function(R,Z,ut,st,rt,zt,Vt,Pt=0){if(!(R&&R.isWebGLRenderTarget)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Wt=lt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Vt!==void 0&&(Wt=Wt[Vt]),Wt){b.bindFramebuffer(K.FRAMEBUFFER,Wt);try{const Xt=R.textures[Pt],te=Xt.format,ce=Xt.type;if(R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Pt),!P.textureFormatReadable(te)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(ce)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=R.width-st&&ut>=0&&ut<=R.height-rt&&K.readPixels(Z,ut,st,rt,Ut.convert(te),Ut.convert(ce),zt)}finally{const Xt=nt!==null?lt.get(nt).__webglFramebuffer:null;b.bindFramebuffer(K.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(R,Z,ut,st,rt,zt,Vt,Pt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Wt=lt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Vt!==void 0&&(Wt=Wt[Vt]),Wt)if(Z>=0&&Z<=R.width-st&&ut>=0&&ut<=R.height-rt){b.bindFramebuffer(K.FRAMEBUFFER,Wt);const Xt=R.textures[Pt],te=Xt.format,ce=Xt.type;if(R.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+Pt),!P.textureFormatReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qt=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,Qt),K.bufferData(K.PIXEL_PACK_BUFFER,zt.byteLength,K.STREAM_READ),K.readPixels(Z,ut,st,rt,Ut.convert(te),Ut.convert(ce),0);const Ce=nt!==null?lt.get(nt).__webglFramebuffer:null;b.bindFramebuffer(K.FRAMEBUFFER,Ce);const $e=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await dT(K,$e,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,Qt),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,zt),K.deleteBuffer(Qt),K.deleteSync($e),zt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,Z=null,ut=0){const st=Math.pow(2,-ut),rt=Math.floor(R.image.width*st),zt=Math.floor(R.image.height*st),Vt=Z!==null?Z.x:0,Pt=Z!==null?Z.y:0;mt.setTexture2D(R,0),K.copyTexSubImage2D(K.TEXTURE_2D,ut,0,0,Vt,Pt,rt,zt),b.unbindTexture()},this.copyTextureToTexture=function(R,Z,ut=null,st=null,rt=0,zt=0){let Vt,Pt,Wt,Xt,te,ce,Qt,Ce,$e;const qe=R.isCompressedTexture?R.mipmaps[zt]:R.image;if(ut!==null)Vt=ut.max.x-ut.min.x,Pt=ut.max.y-ut.min.y,Wt=ut.isBox3?ut.max.z-ut.min.z:1,Xt=ut.min.x,te=ut.min.y,ce=ut.isBox3?ut.min.z:0;else{const tn=Math.pow(2,-rt);Vt=Math.floor(qe.width*tn),Pt=Math.floor(qe.height*tn),R.isDataArrayTexture?Wt=qe.depth:R.isData3DTexture?Wt=Math.floor(qe.depth*tn):Wt=1,Xt=0,te=0,ce=0}st!==null?(Qt=st.x,Ce=st.y,$e=st.z):(Qt=0,Ce=0,$e=0);const Oe=Ut.convert(Z.format),ze=Ut.convert(Z.type);let Gt;Z.isData3DTexture?(mt.setTexture3D(Z,0),Gt=K.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(mt.setTexture2DArray(Z,0),Gt=K.TEXTURE_2D_ARRAY):(mt.setTexture2D(Z,0),Gt=K.TEXTURE_2D),b.activeTexture(K.TEXTURE0),b.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,Z.flipY),b.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),b.pixelStorei(K.UNPACK_ALIGNMENT,Z.unpackAlignment);const In=b.getParameter(K.UNPACK_ROW_LENGTH),_e=b.getParameter(K.UNPACK_IMAGE_HEIGHT),En=b.getParameter(K.UNPACK_SKIP_PIXELS),ri=b.getParameter(K.UNPACK_SKIP_ROWS),Ui=b.getParameter(K.UNPACK_SKIP_IMAGES);b.pixelStorei(K.UNPACK_ROW_LENGTH,qe.width),b.pixelStorei(K.UNPACK_IMAGE_HEIGHT,qe.height),b.pixelStorei(K.UNPACK_SKIP_PIXELS,Xt),b.pixelStorei(K.UNPACK_SKIP_ROWS,te),b.pixelStorei(K.UNPACK_SKIP_IMAGES,ce);const oi=R.isDataArrayTexture||R.isData3DTexture,Ie=Z.isDataArrayTexture||Z.isData3DTexture;if(R.isDepthTexture){const tn=lt.get(R),Li=lt.get(Z),Ne=lt.get(tn.__renderTarget),Xi=lt.get(Li.__renderTarget);b.bindFramebuffer(K.READ_FRAMEBUFFER,Ne.__webglFramebuffer),b.bindFramebuffer(K.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let Ga=0;Ga<Wt;Ga++)oi&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,lt.get(R).__webglTexture,rt,ce+Ga),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,lt.get(Z).__webglTexture,zt,$e+Ga)),K.blitFramebuffer(Xt,te,Vt,Pt,Qt,Ce,Vt,Pt,K.DEPTH_BUFFER_BIT,K.NEAREST);b.bindFramebuffer(K.READ_FRAMEBUFFER,null),b.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(rt!==0||R.isRenderTargetTexture||lt.has(R)){const tn=lt.get(R),Li=lt.get(Z);b.bindFramebuffer(K.READ_FRAMEBUFFER,pt),b.bindFramebuffer(K.DRAW_FRAMEBUFFER,J);for(let Ne=0;Ne<Wt;Ne++)oi?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,tn.__webglTexture,rt,ce+Ne):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,tn.__webglTexture,rt),Ie?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Li.__webglTexture,zt,$e+Ne):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Li.__webglTexture,zt),rt!==0?K.blitFramebuffer(Xt,te,Vt,Pt,Qt,Ce,Vt,Pt,K.COLOR_BUFFER_BIT,K.NEAREST):Ie?K.copyTexSubImage3D(Gt,zt,Qt,Ce,$e+Ne,Xt,te,Vt,Pt):K.copyTexSubImage2D(Gt,zt,Qt,Ce,Xt,te,Vt,Pt);b.bindFramebuffer(K.READ_FRAMEBUFFER,null),b.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Ie?R.isDataTexture||R.isData3DTexture?K.texSubImage3D(Gt,zt,Qt,Ce,$e,Vt,Pt,Wt,Oe,ze,qe.data):Z.isCompressedArrayTexture?K.compressedTexSubImage3D(Gt,zt,Qt,Ce,$e,Vt,Pt,Wt,Oe,qe.data):K.texSubImage3D(Gt,zt,Qt,Ce,$e,Vt,Pt,Wt,Oe,ze,qe):R.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,zt,Qt,Ce,Vt,Pt,Oe,ze,qe.data):R.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,zt,Qt,Ce,qe.width,qe.height,Oe,qe.data):K.texSubImage2D(K.TEXTURE_2D,zt,Qt,Ce,Vt,Pt,Oe,ze,qe);b.pixelStorei(K.UNPACK_ROW_LENGTH,In),b.pixelStorei(K.UNPACK_IMAGE_HEIGHT,_e),b.pixelStorei(K.UNPACK_SKIP_PIXELS,En),b.pixelStorei(K.UNPACK_SKIP_ROWS,ri),b.pixelStorei(K.UNPACK_SKIP_IMAGES,Ui),zt===0&&Z.generateMipmaps&&K.generateMipmap(Gt),b.unbindTexture()},this.initRenderTarget=function(R){lt.get(R).__webglFramebuffer===void 0&&mt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?mt.setTextureCube(R,0):R.isData3DTexture?mt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?mt.setTexture2DArray(R,0):mt.setTexture2D(R,0),b.unbindTexture()},this.resetState=function(){F=0,H=0,nt=null,b.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ta}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=be._getDrawingBufferColorSpace(t),n.unpackColorSpace=be._getUnpackColorSpace()}}const Tx={type:"change"},dm={type:"start"},Hy={type:"end"},mc=new Hc,Ax=new _s,U3=Math.cos(70*gT.DEG2RAD),Tn=new k,ni=2*Math.PI,We={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fd=1e-6;class L3 extends P1{constructor(t,n=null){super(t,n),this.state=We.NONE,this.target=new k,this.cursor=new k,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:jr.ROTATE,MIDDLE:jr.DOLLY,RIGHT:jr.PAN},this.touches={ONE:Jr.ROTATE,TWO:Jr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new k,this._lastQuaternion=new bs,this._lastTargetPosition=new k,this._quat=new bs().setFromUnitVectors(t.up,new k(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $v,this._sphericalDelta=new $v,this._scale=1,this._panOffset=new k,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new k,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=P3.bind(this),this._onPointerDown=N3.bind(this),this._onPointerUp=O3.bind(this),this._onContextMenu=V3.bind(this),this._onMouseWheel=F3.bind(this),this._onKeyDown=B3.bind(this),this._onTouchStart=H3.bind(this),this._onTouchMove=G3.bind(this),this._onMouseDown=z3.bind(this),this._onMouseMove=I3.bind(this),this._interceptControlDown=k3.bind(this),this._interceptControlUp=X3.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Tx),this.update(),this.state=We.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;Tn.copy(n).sub(this.target),Tn.applyQuaternion(this._quat),this._spherical.setFromVector3(Tn),this.autoRotate&&this.state===We.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(a)&&isFinite(o)&&(a<-Math.PI?a+=ni:a>Math.PI&&(a-=ni),o<-Math.PI?o+=ni:o>Math.PI&&(o-=ni),a<=o?this._spherical.theta=Math.max(a,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+o)/2?Math.max(a,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const c=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=c!=this._spherical.radius}if(Tn.setFromSpherical(this._spherical),Tn.applyQuaternion(this._quatInverse),n.copy(this.target).add(Tn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let c=null;if(this.object.isPerspectiveCamera){const h=Tn.length();c=this._clampDistance(h*this._scale);const m=h-c;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),u=!!m}else if(this.object.isOrthographicCamera){const h=new k(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=m!==this.object.zoom;const p=new k(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),c=Tn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;c!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(c).add(this.object.position):(mc.origin.copy(this.object.position),mc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(mc.direction))<U3?this.object.lookAt(this.target):(Ax.setFromNormalAndCoplanarPoint(this.object.up,this.target),mc.intersectPlane(Ax,this.target))))}else if(this.object.isOrthographicCamera){const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),c!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>Fd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fd||this._lastTargetPosition.distanceToSquared(this.target)>Fd?(this.dispatchEvent(Tx),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ni/60*this.autoRotateSpeed*t:ni/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Tn.setFromMatrixColumn(n,0),Tn.multiplyScalar(-t),this._panOffset.add(Tn)}_panUp(t,n){this.screenSpacePanning===!0?Tn.setFromMatrixColumn(n,1):(Tn.setFromMatrixColumn(n,0),Tn.crossVectors(this.object.up,Tn)),Tn.multiplyScalar(t),this._panOffset.add(Tn)}_pan(t,n){const a=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;Tn.copy(o).sub(this.target);let u=Tn.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*u/a.clientHeight,this.object.matrix),this._panUp(2*n*u/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),o=t-a.left,u=n-a.top,c=a.width,h=a.height;this._mouse.x=o/c*2-1,this._mouse.y=-(u/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/n.clientHeight),this._rotateUp(ni*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._rotateStart.set(a,o)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._panStart.set(a,o)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),a=t.pageX-n.x,o=t.pageY-n.y,u=Math.sqrt(a*a+o*o);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),o=.5*(t.pageX+a.x),u=.5*(t.pageY+a.y);this._rotateEnd.set(o,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/n.clientHeight),this._rotateUp(ni*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._panEnd.set(a,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),a=t.pageX-n.x,o=t.pageY-n.y,u=Math.sqrt(a*a+o*o);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const c=(t.pageX+n.x)*.5,h=(t.pageY+n.y)*.5;this._updateZoomParameters(c,h)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Ft,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,a={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function N3(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function P3(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function O3(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hy),this.state=We.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function z3(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case jr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=We.DOLLY;break;case jr.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=We.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=We.ROTATE}break;case jr.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=We.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=We.PAN}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(dm)}function I3(s){switch(this.state){case We.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case We.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function F3(s){this.enabled===!1||this.enableZoom===!1||this.state!==We.NONE||(s.preventDefault(),this.dispatchEvent(dm),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Hy))}function B3(s){this.enabled!==!1&&this._handleKeyDown(s)}function H3(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Jr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=We.TOUCH_ROTATE;break;case Jr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=We.TOUCH_PAN;break;default:this.state=We.NONE}break;case 2:switch(this.touches.TWO){case Jr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=We.TOUCH_DOLLY_PAN;break;case Jr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=We.TOUCH_DOLLY_ROTATE;break;default:this.state=We.NONE}break;default:this.state=We.NONE}this.state!==We.NONE&&this.dispatchEvent(dm)}function G3(s){switch(this._trackPointer(s),this.state){case We.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case We.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case We.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case We.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=We.NONE}}function V3(s){this.enabled!==!1&&s.preventDefault()}function k3(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function X3(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const W3={bustan:{title:"🌳 Samail Grove",text:"Samail oasis is one of the largest oases in Oman, with thousands of date palms spread along Wadi Samail. These groves are irrigated by the ancient Omani falaj system that is centuries old. Green stretches between the Hajar mountains make Samail a true oasis in the heart of the desert."},falaj:{title:"💧 Falaj Samail",text:"Falaj Samail is part of the ancient Omani aflaj network listed as UNESCO World Heritage. It carries water from deep in the mountains through underground channels to the groves and fields. The falaj system is one of the oldest irrigation systems in the world — a feat of Omani engineering."},bayt:{title:"🏠 Omani Mud House",text:"Samail houses feature traditional Omani architecture: mud and gypsum walls, square ventilation towers, and carved wooden doors. These homes were designed to withstand extreme heat and keep interiors cool. Every house tells the story of families who lived here for generations."},jibal:{title:"⛰️ Hajar Mountains",text:"Samail is embraced by the Hajar mountain range, formed millions of years ago. They act as a natural fortress protecting the oasis from sandstorms and provide a source of groundwater. These mountains hold caves and rock inscriptions thousands of years old, witnesses to civilizations that passed through."}},q3=["Midnight","Dawn","Sunrise","Morning","Noon","Afternoon","Sunset","Evening"],Y3=["North","North-East","East","South-East","South","South-West","West","North-West"];function Z3(){const s=xt.useRef(null),[t,n]=xt.useState(null),[a,o]=xt.useState({time:"Dawn",temp:"28°C",hum:"45%",dir:"North",compassDeg:0});xt.useEffect(()=>{const c=s.current;if(!c)return;const h=new DT;h.fog=new rm(1709344,.008);const m=new _i(55,c.clientWidth/c.clientHeight,.1,500);m.position.set(35,25,45);const p=new D3({antialias:!0,alpha:!0});p.setSize(c.clientWidth,c.clientHeight),p.setPixelRatio(Math.min(window.devicePixelRatio,2)),p.shadowMap.enabled=!0,p.shadowMap.type=Kx,p.toneMapping=Kp,p.toneMappingExposure=1.2,c.appendChild(p.domElement);const g=new L3(m,p.domElement);g.enableDamping=!0,g.dampingFactor=.05,g.maxPolarAngle=Math.PI/2.1,g.minDistance=15,g.maxDistance=80,g.target.set(0,2,0),h.add(new w1(4482730,.4));const _=new C1(16772829,1.8);_.position.set(30,40,20),_.castShadow=!0,_.shadow.mapSize.set(2048,2048),_.shadow.camera.near=.5,_.shadow.camera.far=100,_.shadow.camera.left=-40,_.shadow.camera.right=40,_.shadow.camera.top=40,_.shadow.camera.bottom=-40,h.add(_);const v=new A1(16045453,.6,30);v.position.set(0,8,0),h.add(v);const S=new ii({uniforms:{uTime:{value:0},uSunPos:{value:new k(30,40,20)}},vertexShader:`
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uSunPos;
        varying vec3 vWorldPos;
        void main() {
          vec3 dir = normalize(vWorldPos);
          float sunDot = max(dot(dir, normalize(uSunPos)), 0.0);
          vec3 dawn = vec3(0.15, 0.1, 0.25);
          vec3 day = vec3(0.35, 0.55, 0.85);
          vec3 horizon = vec3(0.85, 0.6, 0.35);
          float h = dir.y;
          vec3 col = mix(horizon, day, smoothstep(0.0, 0.4, h));
          col = mix(dawn, col, smoothstep(-0.1, 0.2, h));
          col += vec3(1.0, 0.85, 0.5) * pow(sunDot, 128.0) * 2.0;
          col += vec3(1.0, 0.7, 0.3) * pow(sunDot, 8.0) * 0.4;
          float stars = step(0.997, fract(sin(dot(dir.xz * 400.0, vec2(12.9898,78.233))) * 43758.5453));
          col += stars * smoothstep(0.3, -0.1, h) * 0.3;
          gl_FragColor = vec4(col, 1.0);
        }
      `,side:qn});h.add(new Re(new vs(200,48,48),S));const E=new Ss(120,120,128,128);{const ot=E.attributes.position;for(let _t=0;_t<ot.count;_t++){const V=ot.getX(_t),Q=ot.getY(_t);let et=0;const Rt=Math.abs(V)*.08;et-=Math.max(0,2-Rt)*1.5,et+=Math.sin(V*.15)*Math.cos(Q*.12)*1.5,et+=Math.sin(V*.3+1)*Math.cos(Q*.25)*.8,et+=(Math.random()-.5)*.15;const Yt=Math.max(Math.abs(V),Math.abs(Q))/60;et+=Math.pow(Yt,2)*8,ot.setZ(_t,et)}E.computeVertexNormals()}const w=new ii({uniforms:{uTime:{value:0}},vertexShader:`
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vHeight;
        void main() {
          vNormal = normalMatrix * normal;
          vPos = (modelMatrix * vec4(position, 1.0)).xyz;
          vHeight = position.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vHeight;
        void main() {
          vec3 lightDir = normalize(vec3(30, 40, 20));
          float diff = max(dot(normalize(vNormal), lightDir), 0.0);
          float amb = 0.3;
          vec3 sand = vec3(0.76, 0.65, 0.42);
          vec3 rock = vec3(0.45, 0.38, 0.32);
          vec3 darkRock = vec3(0.25, 0.2, 0.18);
          vec3 wadi = vec3(0.55, 0.48, 0.35);
          float slope = 1.0 - normalize(vNormal).z;
          vec3 col = mix(sand, rock, smoothstep(0.3, 0.7, slope));
          col = mix(col, darkRock, smoothstep(5.0, 12.0, vHeight));
          col = mix(col, wadi, smoothstep(-1.0, 0.5, vHeight) * (1.0 - smoothstep(0.5, 2.0, vHeight)));
          col *= (amb + diff * 0.7);
          col += vec3(0.08, 0.04, 0.0) * (1.0 - smoothstep(0.0, 60.0, length(vPos.xz)));
          gl_FragColor = vec4(col, 1.0);
        }
      `}),x=new Re(E,w);x.rotation.x=-Math.PI/2,x.receiveShadow=!0,h.add(x);function y(ot,_t,V,Q,et){const Rt=new Lc(Q,V,32,8),Yt=Rt.attributes.position;for(let ae=0;ae<Yt.count;ae++)Yt.setX(ae,Yt.getX(ae)+(Math.random()-.5)*Q*.12),Yt.setY(ae,Yt.getY(ae)+(Math.random()-.5)*V*.03),Yt.setZ(ae,Yt.getZ(ae)+(Math.random()-.5)*Q*.12);Rt.computeVertexNormals();const Zt=new Gn({color:et,roughness:.9,metalness:.05,flatShading:!1}),he=new Re(Rt,Zt);he.position.set(ot,V/2,_t),he.castShadow=!0,he.receiveShadow=!0,h.add(he);const ne=new Lc(Q*.3,V*.15,24),re=new Gn({color:15654348,roughness:.5}),pe=new Re(ne,re);return pe.position.set(ot,V*.92,_t),h.add(pe),he}const U=[7035727,8022878,6049346,9075309];[[-45,-30,22,12,U[0]],[-35,-40,18,10,U[1]],[40,-35,25,14,U[2]],[50,-20,16,9,U[3]],[-30,40,20,11,U[0]],[35,45,19,10,U[2]],[-50,5,15,8,U[1]],[55,10,17,9,U[3]]].forEach(([ot,_t,V,Q,et])=>y(ot,_t,V,Q,et));{const ot=new by;ot.moveTo(-30,-3),ot.quadraticCurveTo(-15,-2,0,-1.5),ot.quadraticCurveTo(15,-1,30,-2.5),ot.lineTo(30,2.5),ot.quadraticCurveTo(15,1,0,1.5),ot.quadraticCurveTo(-15,2,-30,3),ot.closePath();const _t=new Re(new cm(ot,32),new Gn({color:9141611,roughness:.95,metalness:0}));_t.rotation.x=-Math.PI/2,_t.position.y=.05,_t.receiveShadow=!0,h.add(_t);const V=new Re(new Ss(28,.8,20,1),new Gn({color:7048091,roughness:.7,metalness:.1,transparent:!0,opacity:.6}));V.rotation.x=-Math.PI/2,V.position.set(0,.08,0),h.add(V)}const D=[];function A(ot,_t){const V=new Re(new ji(6,.15,.5),new Gn({color:5929578,roughness:.8}));V.position.set(ot,.12,_t),V.castShadow=!0,h.add(V);const Q=new ii({uniforms:{uTime:{value:0}},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float wave = sin(vUv.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
            vec3 col = mix(vec3(0.2, 0.45, 0.55), vec3(0.35, 0.65, 0.75), wave);
            float edge = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
            gl_FragColor = vec4(col, 0.7 * edge);
          }
        `,transparent:!0}),et=new Re(new Ss(5.8,.4),Q);et.rotation.x=-Math.PI/2,et.position.set(ot,.2,_t),h.add(et);const Rt=new Re(new vs(.15,16,16),new Qr({color:8969727,transparent:!0}));Rt.position.set(ot,.5,_t),h.add(Rt),D.push({mesh:Rt,baseY:.5})}A(-8,-2),A(5,-1),A(12,-2.5);function O(ot,_t,V=!1){const Q=new ys,et=V?6+Math.random()*2:4+Math.random()*1.5,Rt=new Up(new k(0,0,0),new k(.3,et*.3,.2),new k(-.2,et*.7,-.1),new k(.1,et,.1)),Yt=new Re(new Nc(Rt,20,.2,12,!1),new Gn({color:7035706,roughness:.95,metalness:0}));Yt.castShadow=!0,Q.add(Yt);const Zt=V?10:7;for(let he=0;he<Zt;he++){const ne=he/Zt*Math.PI*2,re=V?3.5:2.5,pe=new Up(new k(0,0,0),new k(Math.cos(ne)*re*.4,-.3,Math.sin(ne)*re*.4),new k(Math.cos(ne)*re*.8,-1.2,Math.sin(ne)*re*.8),new k(Math.cos(ne)*re,-2,Math.sin(ne)*re)),ae=new Re(new Nc(pe,14,.08,8,!1),new Gn({color:2976542,roughness:.8,metalness:0,side:Bi}));ae.position.y=et,ae.castShadow=!0,Q.add(ae)}if(V)for(let he=0;he<4;he++){const ne=he/4*Math.PI*2,re=new Re(new vs(.3,16,16),new Gn({color:9136404,roughness:.7}));re.position.set(Math.cos(ne)*.8,et-1.5,Math.sin(ne)*.8),Q.add(re)}return Q.position.set(ot,0,_t),h.add(Q),Q}const L=[];[[-6,-5,!1],[-4,-6,!0],[-2,-4,!1],[0,-5.5,!0],[3,-4.5,!1],[6,-6,!0],[8,-4,!1],[10,-5.5,!1],[-8,3,!0],[-5,4,!1],[-3,2.5,!0],[0,3.5,!1],[4,3,!0],[7,4.5,!1],[9,2,!0],[11,3.5,!1],[-7,-1,!1],[5,-2,!0],[13,-1,!1]].forEach(([ot,_t,V])=>L.push(O(ot,_t,V)));function T(ot,_t,V=0){const Q=new ys,et=new Re(new ji(3,2.5,3.5,2,2,2),new Gn({color:12888178,roughness:.95,metalness:0}));et.position.y=1.25,et.castShadow=!0,et.receiveShadow=!0,Q.add(et);const Rt=new Re(new no(.6,.7,3.5,24),new Gn({color:12098149,roughness:.9}));Rt.position.set(1.2,1.75,1.4),Rt.castShadow=!0,Q.add(Rt);const Yt=new Re(new ji(3.4,.2,3.9),new Gn({color:11047008,roughness:.9}));Yt.position.y=2.6,Q.add(Yt);const Zt=new Re(new ji(.6,1.4,.1),new Gn({color:4863264,roughness:.9}));Zt.position.set(0,.7,1.76),Q.add(Zt);for(const he of[-.8,.8]){const ne=new Re(new ji(.4,.4,.1),new Gn({color:9356758,roughness:.3,metalness:.2,emissive:3359829,emissiveIntensity:.3}));ne.position.set(he,1.6,1.76),Q.add(ne)}return Q.position.set(ot,0,_t),Q.rotation.y=V,h.add(Q),Q}T(-10,6,.3),T(-6,8,-.2),T(8,7,.5);const N=[];for(let ot=0;ot<6;ot++){const _t=new ys,V=new kn,Q=new Float32Array([0,0,0,-1.5,.3,-.3,-.5,.1,0,0,0,0,1.5,.3,-.3,.5,.1,0]);V.setAttribute("position",new xi(Q,3)),V.computeVertexNormals(),_t.add(new Re(V,new Qr({color:2236962,side:Bi})));const et={speed:3+Math.random()*2,wingPhase:Math.random()*Math.PI*2,radius:15+Math.random()*20,center:new k((Math.random()-.5)*30,12+Math.random()*8,(Math.random()-.5)*30)};_t.userData=et,h.add(_t),N.push(_t)}const W=new kn;{const _t=new Float32Array(600),V=new Float32Array(200);for(let Q=0;Q<200;Q++)_t[Q*3]=(Math.random()-.5)*80,_t[Q*3+1]=Math.random()*15,_t[Q*3+2]=(Math.random()-.5)*80,V[Q]=.05+Math.random()*.15;W.setAttribute("position",new xi(_t,3)),W.setAttribute("size",new xi(V,1))}const G=new HT(W,new gy({color:13940886,size:.12,transparent:!0,opacity:.35,sizeAttenuation:!0}));h.add(G);const q=new ys;{const ot=new Re(new no(.25,.3,1.4,24),new Gn({color:16117992,roughness:.8}));ot.position.y=1,q.add(ot);const _t=new Re(new vs(.22,24,24),new Gn({color:13935988,roughness:.7}));_t.position.y=1.85,q.add(_t);const V=new Re(new vs(.28,24,18),new Gn({color:16446952,roughness:.6}));V.position.y=1.95,V.scale.set(1,.7,1),q.add(V),q.position.set(0,0,5),h.add(q)}[{x:15,z:-10,label:"Samail Fort"},{x:-12,z:12,label:"Old Well"},{x:5,z:15,label:"Palm Souq"},{x:-20,z:-5,label:"Rock Inscriptions"}].forEach(ot=>{const _t=new Re(new vs(.3,16,16),new Qr({color:16045453,transparent:!0,opacity:.7}));_t.position.set(ot.x,1.5,ot.z),_t.userData={label:ot.label},h.add(_t);const V=new Re(new no(.02,.15,3,12),new Qr({color:16045453,transparent:!0,opacity:.2}));V.position.set(ot.x,1.5,ot.z),h.add(V)});const pt=new ii({uniforms:{uTime:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float n = sin(vUv.x * 5.0 + uTime * 0.3) * cos(vUv.y * 4.0 + uTime * 0.2);
          float alpha = smoothstep(0.3, 0.8, n) * 0.08;
          gl_FragColor = vec4(0.8, 0.7, 0.5, alpha);
        }
      `,transparent:!0,depthWrite:!1}),J=new Re(new Ss(100,100),pt);J.rotation.x=-Math.PI/2,J.position.y=.5,h.add(J);const F=new L1,H=new Ft,nt=ot=>{const _t=p.domElement.getBoundingClientRect();H.x=(ot.clientX-_t.left)/_t.width*2-1,H.y=-((ot.clientY-_t.top)/_t.height)*2+1,F.setFromCamera(H,m);const V=F.intersectObjects(h.children,!0);for(const Q of V){const et=Q.object.userData?.label;if(et){n({title:"📍 "+et,text:`Exploration point in Samail — ${et}`});break}}};p.domElement.addEventListener("click",nt);const St=new N1;let At=0,z=0;function j(){At=requestAnimationFrame(j);const ot=St.getElapsedTime();S.uniforms.uTime.value=ot,pt.uniforms.uTime.value=ot,h.traverse(Q=>{const Rt=Q.material;Rt?.uniforms?.uTime&&(Rt.uniforms.uTime.value=ot)}),L.forEach((Q,et)=>{Q.rotation.z=Math.sin(ot*.8+et*.5)*.03,Q.rotation.x=Math.cos(ot*.6+et*.3)*.02}),D.forEach((Q,et)=>{Q.mesh.position.y=Q.baseY+Math.sin(ot*2+et)*.1,Q.mesh.material.opacity=.5+Math.sin(ot*3+et*2)*.3}),N.forEach(Q=>{const et=Q.userData,Rt=ot*et.speed*.1;Q.position.x=et.center.x+Math.cos(Rt)*et.radius,Q.position.z=et.center.z+Math.sin(Rt)*et.radius,Q.position.y=et.center.y+Math.sin(ot*.5+et.wingPhase)*1.5,Q.rotation.y=-Rt+Math.PI/2,Q.children[0]&&(Q.children[0].rotation.z=Math.sin(ot*8+et.wingPhase)*.4)});{const Q=G.geometry.attributes.position;for(let et=0;et<Q.count;et++)Q.setX(et,Q.getX(et)+Math.sin(ot*.2+et)*.01),Q.setY(et,Q.getY(et)+Math.cos(ot*.15+et*.5)*.005),Q.getY(et)>15&&Q.setY(et,0);Q.needsUpdate=!0}const _t=Math.sin(ot*.15)*8;q.position.x=_t,q.position.z=5+Math.cos(ot*.1)*3,q.rotation.y=Math.atan2(Math.cos(ot*.15)*8*.15,-Math.sin(ot*.1)*3*.1),q.position.y=Math.abs(Math.sin(ot*3))*.08;const V=ot*.05;if(_.position.x=Math.cos(V)*40,_.position.y=20+Math.sin(V)*20,_.intensity=1+Math.sin(V)*.8,z+=1,z%15===0){const Q=Math.floor(ot*.5%24),et=Math.atan2(m.position.x,m.position.z),Rt=Math.floor((et+Math.PI)/(Math.PI*2)*8)%8;o({time:q3[Math.floor(Q/3)],temp:Math.floor(28+Math.sin(ot*.3)*8)+"°C",hum:Math.floor(45+Math.cos(ot*.2)*15)+"%",dir:Y3[Rt],compassDeg:-et*(180/Math.PI)})}g.update(),p.render(h,m)}j();const bt=()=>{m.aspect=c.clientWidth/c.clientHeight,m.updateProjectionMatrix(),p.setSize(c.clientWidth,c.clientHeight)};return window.addEventListener("resize",bt),()=>{cancelAnimationFrame(At),window.removeEventListener("resize",bt),p.domElement.removeEventListener("click",nt),g.dispose(),h.traverse(ot=>{const _t=ot;_t.geometry&&_t.geometry.dispose();const V=_t.material;Array.isArray(V)?V.forEach(Q=>Q.dispose()):V&&V.dispose()}),p.dispose(),c.removeChild(p.domElement)}},[]);const u=[{key:"bustan",icon:"🌳",title:"Samail Grove",desc:"A green oasis of thousands of palms"},{key:"falaj",icon:"💧",title:"Falaj Samail",desc:"Ancient irrigation feeding the land"},{key:"bayt",icon:"🏠",title:"Mud House",desc:"Omani architecture defying time"},{key:"jibal",icon:"⛰️",title:"Hajar Mountains",desc:"A natural fortress guarding the oasis"}];return Me.jsxs("div",{className:"relative w-full h-[100dvh] overflow-hidden bg-[#0a0a1a] font-sans",children:[Me.jsx("div",{ref:s,className:"absolute inset-0"}),Me.jsxs("div",{className:"pointer-events-none absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#0a0a1a]/90 to-transparent px-8 py-4",children:[Me.jsx("h1",{className:"text-2xl tracking-widest text-[#f4d58d] [text-shadow:0_0_20px_rgba(244,213,141,0.4)]",children:"🌴 Samail"}),Me.jsx("p",{className:"mt-1 text-xs text-[#8a9bb5]",children:"An oasis nestled between the Hajar mountains — palms, falaj, and history"})]}),Me.jsx(Yp,{to:"/arcade",className:"absolute top-4 right-8 z-30 rounded-lg border border-[#f4d58d]/30 bg-[#0f1220]/80 px-4 py-2 text-xs text-[#f4d58d] backdrop-blur transition hover:bg-[#f4d58d]/15",children:"← Back to Arcade"}),Me.jsx("div",{className:"absolute top-24 right-8 z-20 flex flex-col gap-2",children:[["🕐 Time",a.time],["🌡️ Temp",a.temp],["💧 Humidity",a.hum],["🧭 Heading",a.dir]].map(([c,h])=>Me.jsxs("div",{className:"rounded-lg border border-white/5 bg-[#0f1220]/70 px-3 py-2 text-xs text-[#6a7b95]",children:[c,": ",Me.jsx("span",{className:"font-semibold text-[#f4d58d]",children:h})]},c))}),Me.jsx("div",{className:"absolute bottom-28 right-8 z-20 h-16 w-16",children:Me.jsxs("svg",{viewBox:"0 0 60 60",className:"h-full w-full drop-shadow-[0_0_8px_rgba(244,213,141,0.3)]",style:{transform:`rotate(${a.compassDeg}deg)`},children:[Me.jsx("circle",{cx:"30",cy:"30",r:"28",fill:"none",stroke:"rgba(244,213,141,0.2)",strokeWidth:"1"}),Me.jsx("polygon",{points:"30,6 27,28 30,24 33,28",fill:"#e74c3c",opacity:"0.8"}),Me.jsx("polygon",{points:"30,54 27,32 30,36 33,32",fill:"#f4d58d",opacity:"0.6"}),Me.jsx("text",{x:"30",y:"4",textAnchor:"middle",fill:"#e74c3c",fontSize:"7",fontWeight:"bold",children:"N"}),Me.jsx("text",{x:"30",y:"59",textAnchor:"middle",fill:"#6a7b95",fontSize:"7",children:"S"}),Me.jsx("text",{x:"57",y:"33",textAnchor:"middle",fill:"#6a7b95",fontSize:"7",children:"E"}),Me.jsx("text",{x:"3",y:"33",textAnchor:"middle",fill:"#6a7b95",fontSize:"7",children:"W"})]})}),Me.jsxs("div",{className:"absolute bottom-28 left-8 z-20 text-[11px] leading-6 text-[#4a5a75]",children:["🖱️ Drag to orbit",Me.jsx("br",{}),"🔍 Scroll to zoom",Me.jsx("br",{}),"📍 Click the glowing dots to explore",Me.jsx("br",{}),"📖 Click the cards for stories"]}),Me.jsxs("div",{className:`absolute top-1/2 right-8 z-30 w-72 -translate-y-1/2 rounded-2xl border border-[#f4d58d]/15 bg-[#0f1220]/90 p-6 backdrop-blur-xl transition-opacity duration-500 ${t?"opacity-100":"pointer-events-none opacity-0"}`,children:[Me.jsx("button",{onClick:()=>n(null),className:"absolute top-3 right-4 text-[#6a7b95] hover:text-[#f4d58d]","aria-label":"Close",children:"✕"}),Me.jsx("h3",{className:"mb-2 text-lg text-[#f4d58d]",children:t?.title}),Me.jsx("p",{className:"text-[13px] leading-7 text-[#8a9bb5]",children:t?.text})]}),Me.jsx("div",{className:"absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3",children:u.map(c=>Me.jsxs("button",{onClick:()=>n(W3[c.key]),className:"min-w-40 rounded-xl border border-[#f4d58d]/20 bg-[#141928]/85 px-4 py-3 text-left backdrop-blur transition hover:-translate-y-1 hover:border-[#f4d58d]/60 hover:shadow-[0_8px_25px_rgba(244,213,141,0.15)]",children:[Me.jsx("div",{className:"mb-1 text-2xl",children:c.icon}),Me.jsx("div",{className:"text-sm font-semibold text-[#f4d58d]",children:c.title}),Me.jsx("div",{className:"mt-1 text-[11px] leading-5 text-[#6a7b95]",children:c.desc})]},c.key))})]})}tE.createRoot(document.getElementById("root")).render(Me.jsx(YM.StrictMode,{children:Me.jsx(bb,{children:Me.jsx(tb,{children:Me.jsx(qx,{path:"*",element:Me.jsx(Z3,{})})})})}));
