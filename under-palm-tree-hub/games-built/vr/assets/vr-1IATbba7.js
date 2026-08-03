(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();function cM(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Gh={exports:{}},el={};var I_;function fM(){if(I_)return el;I_=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(r,l,u){var f=null;if(u!==void 0&&(f=""+u),l.key!==void 0&&(f=""+l.key),"key"in l){u={};for(var p in l)p!=="key"&&(u[p]=l[p])}else u=l;return l=u.ref,{$$typeof:s,type:r,key:f,ref:l!==void 0?l:null,props:u}}return el.Fragment=e,el.jsx=i,el.jsxs=i,el}var B_;function hM(){return B_||(B_=1,Gh.exports=fM()),Gh.exports}var Mn=hM(),Vh={exports:{}},at={};var z_;function dM(){if(z_)return at;z_=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function M(B){return B===null||typeof B!="object"?null:(B=g&&B[g]||B["@@iterator"],typeof B=="function"?B:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,x={};function S(B,Q,Ee){this.props=B,this.context=Q,this.refs=x,this.updater=Ee||T}S.prototype.isReactComponent={},S.prototype.setState=function(B,Q){if(typeof B!="object"&&typeof B!="function"&&B!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,B,Q,"setState")},S.prototype.forceUpdate=function(B){this.updater.enqueueForceUpdate(this,B,"forceUpdate")};function L(){}L.prototype=S.prototype;function I(B,Q,Ee){this.props=B,this.context=Q,this.refs=x,this.updater=Ee||T}var C=I.prototype=new L;C.constructor=I,A(C,S.prototype),C.isPureReactComponent=!0;var N=Array.isArray;function U(){}var O={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function D(B,Q,Ee){var Ce=Ee.ref;return{$$typeof:s,type:B,key:Q,ref:Ce!==void 0?Ce:null,props:Ee}}function H(B,Q){return D(B.type,Q,B.props)}function F(B){return typeof B=="object"&&B!==null&&B.$$typeof===s}function k(B){var Q={"=":"=0",":":"=2"};return"$"+B.replace(/[=:]/g,function(Ee){return Q[Ee]})}var $=/\/+/g;function ue(B,Q){return typeof B=="object"&&B!==null&&B.key!=null?k(""+B.key):Q.toString(36)}function Y(B){switch(B.status){case"fulfilled":return B.value;case"rejected":throw B.reason;default:switch(typeof B.status=="string"?B.then(U,U):(B.status="pending",B.then(function(Q){B.status==="pending"&&(B.status="fulfilled",B.value=Q)},function(Q){B.status==="pending"&&(B.status="rejected",B.reason=Q)})),B.status){case"fulfilled":return B.value;case"rejected":throw B.reason}}throw B}function z(B,Q,Ee,Ce,Ie){var re=typeof B;(re==="undefined"||re==="boolean")&&(B=null);var Se=!1;if(B===null)Se=!0;else switch(re){case"bigint":case"string":case"number":Se=!0;break;case"object":switch(B.$$typeof){case s:case e:Se=!0;break;case _:return Se=B._init,z(Se(B._payload),Q,Ee,Ce,Ie)}}if(Se)return Ie=Ie(B),Se=Ce===""?"."+ue(B,0):Ce,N(Ie)?(Ee="",Se!=null&&(Ee=Se.replace($,"$&/")+"/"),z(Ie,Q,Ee,"",function(tt){return tt})):Ie!=null&&(F(Ie)&&(Ie=H(Ie,Ee+(Ie.key==null||B&&B.key===Ie.key?"":(""+Ie.key).replace($,"$&/")+"/")+Se)),Q.push(Ie)),1;Se=0;var Me=Ce===""?".":Ce+":";if(N(B))for(var He=0;He<B.length;He++)Ce=B[He],re=Me+ue(Ce,He),Se+=z(Ce,Q,Ee,re,Ie);else if(He=M(B),typeof He=="function")for(B=He.call(B),He=0;!(Ce=B.next()).done;)Ce=Ce.value,re=Me+ue(Ce,He++),Se+=z(Ce,Q,Ee,re,Ie);else if(re==="object"){if(typeof B.then=="function")return z(Y(B),Q,Ee,Ce,Ie);throw Q=String(B),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(B).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return Se}function V(B,Q,Ee){if(B==null)return B;var Ce=[],Ie=0;return z(B,Ce,"","",function(re){return Q.call(Ee,re,Ie++)}),Ce}function ne(B){if(B._status===-1){var Q=B._result;Q=Q(),Q.then(function(Ee){(B._status===0||B._status===-1)&&(B._status=1,B._result=Ee)},function(Ee){(B._status===0||B._status===-1)&&(B._status=2,B._result=Ee)}),B._status===-1&&(B._status=0,B._result=Q)}if(B._status===1)return B._result.default;throw B._result}var _e=typeof reportError=="function"?reportError:function(B){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof B=="object"&&B!==null&&typeof B.message=="string"?String(B.message):String(B),error:B});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",B);return}console.error(B)},be={map:V,forEach:function(B,Q,Ee){V(B,function(){Q.apply(this,arguments)},Ee)},count:function(B){var Q=0;return V(B,function(){Q++}),Q},toArray:function(B){return V(B,function(Q){return Q})||[]},only:function(B){if(!F(B))throw Error("React.Children.only expected to receive a single React element child.");return B}};return at.Activity=v,at.Children=be,at.Component=S,at.Fragment=i,at.Profiler=l,at.PureComponent=I,at.StrictMode=r,at.Suspense=m,at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,at.__COMPILER_RUNTIME={__proto__:null,c:function(B){return O.H.useMemoCache(B)}},at.cache=function(B){return function(){return B.apply(null,arguments)}},at.cacheSignal=function(){return null},at.cloneElement=function(B,Q,Ee){if(B==null)throw Error("The argument must be a React element, but you passed "+B+".");var Ce=A({},B.props),Ie=B.key;if(Q!=null)for(re in Q.key!==void 0&&(Ie=""+Q.key),Q)!b.call(Q,re)||re==="key"||re==="__self"||re==="__source"||re==="ref"&&Q.ref===void 0||(Ce[re]=Q[re]);var re=arguments.length-2;if(re===1)Ce.children=Ee;else if(1<re){for(var Se=Array(re),Me=0;Me<re;Me++)Se[Me]=arguments[Me+2];Ce.children=Se}return D(B.type,Ie,Ce)},at.createContext=function(B){return B={$$typeof:f,_currentValue:B,_currentValue2:B,_threadCount:0,Provider:null,Consumer:null},B.Provider=B,B.Consumer={$$typeof:u,_context:B},B},at.createElement=function(B,Q,Ee){var Ce,Ie={},re=null;if(Q!=null)for(Ce in Q.key!==void 0&&(re=""+Q.key),Q)b.call(Q,Ce)&&Ce!=="key"&&Ce!=="__self"&&Ce!=="__source"&&(Ie[Ce]=Q[Ce]);var Se=arguments.length-2;if(Se===1)Ie.children=Ee;else if(1<Se){for(var Me=Array(Se),He=0;He<Se;He++)Me[He]=arguments[He+2];Ie.children=Me}if(B&&B.defaultProps)for(Ce in Se=B.defaultProps,Se)Ie[Ce]===void 0&&(Ie[Ce]=Se[Ce]);return D(B,re,Ie)},at.createRef=function(){return{current:null}},at.forwardRef=function(B){return{$$typeof:p,render:B}},at.isValidElement=F,at.lazy=function(B){return{$$typeof:_,_payload:{_status:-1,_result:B},_init:ne}},at.memo=function(B,Q){return{$$typeof:d,type:B,compare:Q===void 0?null:Q}},at.startTransition=function(B){var Q=O.T,Ee={};O.T=Ee;try{var Ce=B(),Ie=O.S;Ie!==null&&Ie(Ee,Ce),typeof Ce=="object"&&Ce!==null&&typeof Ce.then=="function"&&Ce.then(U,_e)}catch(re){_e(re)}finally{Q!==null&&Ee.types!==null&&(Q.types=Ee.types),O.T=Q}},at.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},at.use=function(B){return O.H.use(B)},at.useActionState=function(B,Q,Ee){return O.H.useActionState(B,Q,Ee)},at.useCallback=function(B,Q){return O.H.useCallback(B,Q)},at.useContext=function(B){return O.H.useContext(B)},at.useDebugValue=function(){},at.useDeferredValue=function(B,Q){return O.H.useDeferredValue(B,Q)},at.useEffect=function(B,Q){return O.H.useEffect(B,Q)},at.useEffectEvent=function(B){return O.H.useEffectEvent(B)},at.useId=function(){return O.H.useId()},at.useImperativeHandle=function(B,Q,Ee){return O.H.useImperativeHandle(B,Q,Ee)},at.useInsertionEffect=function(B,Q){return O.H.useInsertionEffect(B,Q)},at.useLayoutEffect=function(B,Q){return O.H.useLayoutEffect(B,Q)},at.useMemo=function(B,Q){return O.H.useMemo(B,Q)},at.useOptimistic=function(B,Q){return O.H.useOptimistic(B,Q)},at.useReducer=function(B,Q,Ee){return O.H.useReducer(B,Q,Ee)},at.useRef=function(B){return O.H.useRef(B)},at.useState=function(B){return O.H.useState(B)},at.useSyncExternalStore=function(B,Q,Ee){return O.H.useSyncExternalStore(B,Q,Ee)},at.useTransition=function(){return O.H.useTransition()},at.version="19.2.3",at}var F_;function Rp(){return F_||(F_=1,Vh.exports=dM()),Vh.exports}var fe=Rp();const pl=cM(fe);var kh={exports:{}},tl={},Xh={exports:{}},Wh={};var H_;function pM(){return H_||(H_=1,(function(s){function e(z,V){var ne=z.length;z.push(V);e:for(;0<ne;){var _e=ne-1>>>1,be=z[_e];if(0<l(be,V))z[_e]=V,z[ne]=be,ne=_e;else break e}}function i(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var V=z[0],ne=z.pop();if(ne!==V){z[0]=ne;e:for(var _e=0,be=z.length,B=be>>>1;_e<B;){var Q=2*(_e+1)-1,Ee=z[Q],Ce=Q+1,Ie=z[Ce];if(0>l(Ee,ne))Ce<be&&0>l(Ie,Ee)?(z[_e]=Ie,z[Ce]=ne,_e=Ce):(z[_e]=Ee,z[Q]=ne,_e=Q);else if(Ce<be&&0>l(Ie,ne))z[_e]=Ie,z[Ce]=ne,_e=Ce;else break e}}return V}function l(z,V){var ne=z.sortIndex-V.sortIndex;return ne!==0?ne:z.id-V.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;s.unstable_now=function(){return u.now()}}else{var f=Date,p=f.now();s.unstable_now=function(){return f.now()-p}}var m=[],d=[],_=1,v=null,g=3,M=!1,T=!1,A=!1,x=!1,S=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function C(z){for(var V=i(d);V!==null;){if(V.callback===null)r(d);else if(V.startTime<=z)r(d),V.sortIndex=V.expirationTime,e(m,V);else break;V=i(d)}}function N(z){if(A=!1,C(z),!T)if(i(m)!==null)T=!0,U||(U=!0,k());else{var V=i(d);V!==null&&Y(N,V.startTime-z)}}var U=!1,O=-1,b=5,D=-1;function H(){return x?!0:!(s.unstable_now()-D<b)}function F(){if(x=!1,U){var z=s.unstable_now();D=z;var V=!0;try{e:{T=!1,A&&(A=!1,L(O),O=-1),M=!0;var ne=g;try{t:{for(C(z),v=i(m);v!==null&&!(v.expirationTime>z&&H());){var _e=v.callback;if(typeof _e=="function"){v.callback=null,g=v.priorityLevel;var be=_e(v.expirationTime<=z);if(z=s.unstable_now(),typeof be=="function"){v.callback=be,C(z),V=!0;break t}v===i(m)&&r(m),C(z)}else r(m);v=i(m)}if(v!==null)V=!0;else{var B=i(d);B!==null&&Y(N,B.startTime-z),V=!1}}break e}finally{v=null,g=ne,M=!1}V=void 0}}finally{V?k():U=!1}}}var k;if(typeof I=="function")k=function(){I(F)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,ue=$.port2;$.port1.onmessage=F,k=function(){ue.postMessage(null)}}else k=function(){S(F,0)};function Y(z,V){O=S(function(){z(s.unstable_now())},V)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_next=function(z){switch(g){case 1:case 2:case 3:var V=3;break;default:V=g}var ne=g;g=V;try{return z()}finally{g=ne}},s.unstable_requestPaint=function(){x=!0},s.unstable_runWithPriority=function(z,V){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var ne=g;g=z;try{return V()}finally{g=ne}},s.unstable_scheduleCallback=function(z,V,ne){var _e=s.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?_e+ne:_e):ne=_e,z){case 1:var be=-1;break;case 2:be=250;break;case 5:be=1073741823;break;case 4:be=1e4;break;default:be=5e3}return be=ne+be,z={id:_++,callback:V,priorityLevel:z,startTime:ne,expirationTime:be,sortIndex:-1},ne>_e?(z.sortIndex=ne,e(d,z),i(m)===null&&z===i(d)&&(A?(L(O),O=-1):A=!0,Y(N,ne-_e))):(z.sortIndex=be,e(m,z),T||M||(T=!0,U||(U=!0,k()))),z},s.unstable_shouldYield=H,s.unstable_wrapCallback=function(z){var V=g;return function(){var ne=g;g=V;try{return z.apply(this,arguments)}finally{g=ne}}}})(Wh)),Wh}var G_;function mM(){return G_||(G_=1,Xh.exports=pM()),Xh.exports}var qh={exports:{}},Bn={};var V_;function gM(){if(V_)return Bn;V_=1;var s=Rp();function e(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)d+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,d,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:d,implementation:_}}var f=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Bn.createPortal=function(m,d){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(e(299));return u(m,d,null,_)},Bn.flushSync=function(m){var d=f.T,_=r.p;try{if(f.T=null,r.p=2,m)return m()}finally{f.T=d,r.p=_,r.d.f()}},Bn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,r.d.C(m,d))},Bn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Bn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var _=d.as,v=p(_,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,M=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;_==="style"?r.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:M}):_==="script"&&r.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:M,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Bn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var _=p(d.as,d.crossOrigin);r.d.M(m,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&r.d.M(m)},Bn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var _=d.as,v=p(_,d.crossOrigin);r.d.L(m,_,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Bn.preloadModule=function(m,d){if(typeof m=="string")if(d){var _=p(d.as,d.crossOrigin);r.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else r.d.m(m)},Bn.requestFormReset=function(m){r.d.r(m)},Bn.unstable_batchedUpdates=function(m,d){return m(d)},Bn.useFormState=function(m,d,_){return f.H.useFormState(m,d,_)},Bn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Bn.version="19.2.3",Bn}var k_;function _M(){if(k_)return qh.exports;k_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),qh.exports=gM(),qh.exports}var X_;function vM(){if(X_)return tl;X_=1;var s=mM(),e=Rp(),i=_M();function r(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function u(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(u(t)!==t)throw Error(r(188))}function d(t){var n=t.alternate;if(!n){if(n=u(t),n===null)throw Error(r(188));return n!==t?null:t}for(var a=t,o=n;;){var c=a.return;if(c===null)break;var h=c.alternate;if(h===null){if(o=c.return,o!==null){a=o;continue}break}if(c.child===h.child){for(h=c.child;h;){if(h===a)return m(c),t;if(h===o)return m(c),n;h=h.sibling}throw Error(r(188))}if(a.return!==o.return)a=c,o=h;else{for(var y=!1,w=c.child;w;){if(w===a){y=!0,a=c,o=h;break}if(w===o){y=!0,o=c,a=h;break}w=w.sibling}if(!y){for(w=h.child;w;){if(w===a){y=!0,a=h,o=c;break}if(w===o){y=!0,o=h,a=c;break}w=w.sibling}if(!y)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),I=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),N=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),H=Symbol.for("react.memo_cache_sentinel"),F=Symbol.iterator;function k(t){return t===null||typeof t!="object"?null:(t=F&&t[F]||t["@@iterator"],typeof t=="function"?t:null)}var $=Symbol.for("react.client.reference");function ue(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===$?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case A:return"Fragment";case S:return"Profiler";case x:return"StrictMode";case N:return"Suspense";case U:return"SuspenseList";case D:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case T:return"Portal";case I:return t.displayName||"Context";case L:return(t._context.displayName||"Context")+".Consumer";case C:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case O:return n=t.displayName||null,n!==null?n:ue(t.type)||"Memo";case b:n=t._payload,t=t._init;try{return ue(t(n))}catch{}}return null}var Y=Array.isArray,z=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ne={pending:!1,data:null,method:null,action:null},_e=[],be=-1;function B(t){return{current:t}}function Q(t){0>be||(t.current=_e[be],_e[be]=null,be--)}function Ee(t,n){be++,_e[be]=t.current,t.current=n}var Ce=B(null),Ie=B(null),re=B(null),Se=B(null);function Me(t,n){switch(Ee(re,n),Ee(Ie,t),Ee(Ce,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?r_(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=r_(n),t=s_(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Q(Ce),Ee(Ce,t)}function He(){Q(Ce),Q(Ie),Q(re)}function tt(t){t.memoizedState!==null&&Ee(Se,t);var n=Ce.current,a=s_(n,t.type);n!==a&&(Ee(Ie,t),Ee(Ce,a))}function Qe(t){Ie.current===t&&(Q(Ce),Q(Ie)),Se.current===t&&(Q(Se),Qo._currentValue=ne)}var Yt,ft;function xt(t){if(Yt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Yt=n&&n[1]||"",ft=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yt+t+ft}var St=!1;function ht(t,n){if(!t||St)return"";St=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var xe=function(){throw Error()};if(Object.defineProperty(xe.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(xe,[])}catch(ce){var le=ce}Reflect.construct(t,[],xe)}else{try{xe.call()}catch(ce){le=ce}t.call(xe.prototype)}}else{try{throw Error()}catch(ce){le=ce}(xe=t())&&typeof xe.catch=="function"&&xe.catch(function(){})}}catch(ce){if(ce&&le&&typeof ce.stack=="string")return[ce.stack,le.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),y=h[0],w=h[1];if(y&&w){var G=y.split(`
`),te=w.split(`
`);for(c=o=0;o<G.length&&!G[o].includes("DetermineComponentFrameRoot");)o++;for(;c<te.length&&!te[c].includes("DetermineComponentFrameRoot");)c++;if(o===G.length||c===te.length)for(o=G.length-1,c=te.length-1;1<=o&&0<=c&&G[o]!==te[c];)c--;for(;1<=o&&0<=c;o--,c--)if(G[o]!==te[c]){if(o!==1||c!==1)do if(o--,c--,0>c||G[o]!==te[c]){var me=`
`+G[o].replace(" at new "," at ");return t.displayName&&me.includes("<anonymous>")&&(me=me.replace("<anonymous>",t.displayName)),me}while(1<=o&&0<=c);break}}}finally{St=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?xt(a):""}function rn(t,n){switch(t.tag){case 26:case 27:case 5:return xt(t.type);case 16:return xt("Lazy");case 13:return t.child!==n&&n!==null?xt("Suspense Fallback"):xt("Suspense");case 19:return xt("SuspenseList");case 0:case 15:return ht(t.type,!1);case 11:return ht(t.type.render,!1);case 1:return ht(t.type,!0);case 31:return xt("Activity");default:return""}}function sn(t){try{var n="",a=null;do n+=rn(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var on=Object.prototype.hasOwnProperty,hn=s.unstable_scheduleCallback,qt=s.unstable_cancelCallback,ln=s.unstable_shouldYield,Z=s.unstable_requestPaint,Ft=s.unstable_now,wt=s.unstable_getCurrentPriorityLevel,P=s.unstable_ImmediatePriority,E=s.unstable_UserBlockingPriority,J=s.unstable_NormalPriority,se=s.unstable_LowPriority,de=s.unstable_IdlePriority,Te=s.log,De=s.unstable_setDisableYieldValue,he=null,pe=null;function Re(t){if(typeof Te=="function"&&De(t),pe&&typeof pe.setStrictMode=="function")try{pe.setStrictMode(he,t)}catch{}}var ze=Math.clz32?Math.clz32:Ke,Ne=Math.log,Ue=Math.LN2;function Ke(t){return t>>>=0,t===0?32:31-(Ne(t)/Ue|0)|0}var Je=256,it=262144,W=4194304;function Ae(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ge(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var c=0,h=t.suspendedLanes,y=t.pingedLanes;t=t.warmLanes;var w=o&134217727;return w!==0?(o=w&~h,o!==0?c=Ae(o):(y&=w,y!==0?c=Ae(y):a||(a=w&~t,a!==0&&(c=Ae(a))))):(w=o&~h,w!==0?c=Ae(w):y!==0?c=Ae(y):a||(a=o&~t,a!==0&&(c=Ae(a)))),c===0?0:n!==0&&n!==c&&(n&h)===0&&(h=c&-c,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:c}function we(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Be(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ye(){var t=W;return W<<=1,(W&62914560)===0&&(W=4194304),t}function qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Ve(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Qt(t,n,a,o,c,h){var y=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var w=t.entanglements,G=t.expirationTimes,te=t.hiddenUpdates;for(a=y&~a;0<a;){var me=31-ze(a),xe=1<<me;w[me]=0,G[me]=-1;var le=te[me];if(le!==null)for(te[me]=null,me=0;me<le.length;me++){var ce=le[me];ce!==null&&(ce.lane&=-536870913)}a&=~xe}o!==0&&Lt(t,o,0),h!==0&&c===0&&t.tag!==0&&(t.suspendedLanes|=h&~(y&~n))}function Lt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function ei(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),c=1<<o;c&n|t[o]&n&&(t[o]|=n),a&=~c}}function ti(t,n){var a=n&-n;return a=(a&42)!==0?1:uo(a),(a&(t.suspendedLanes|n))!==0?0:a}function uo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function co(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function fo(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:w_(t.type))}function es(t,n){var a=V.p;try{return V.p=t,n()}finally{V.p=a}}var Gi=Math.random().toString(36).slice(2),mn="__reactFiber$"+Gi,Dn="__reactProps$"+Gi,qn="__reactContainer$"+Gi,Sr="__reactEvents$"+Gi,Cl="__reactListeners$"+Gi,wl="__reactHandles$"+Gi,yr="__reactResources$"+Gi,Ia="__reactMarker$"+Gi;function Ba(t){delete t[mn],delete t[Dn],delete t[Sr],delete t[Cl],delete t[wl]}function aa(t){var n=t[mn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[qn]||a[mn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=d_(t);t!==null;){if(a=t[mn])return a;t=d_(t)}return n}t=a,a=t.parentNode}return null}function ra(t){if(t=t[mn]||t[qn]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Mr(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(r(33))}function za(t){var n=t[yr];return n||(n=t[yr]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function gn(t){t[Ia]=!0}var Dl=new Set,R={};function q(t,n){oe(t,n),oe(t+"Capture",n)}function oe(t,n){for(R[t]=n,t=0;t<n.length;t++)Dl.add(n[t])}var ie=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ae={},Oe={};function Ge(t){return on.call(Oe,t)?!0:on.call(ae,t)?!1:ie.test(t)?Oe[t]=!0:(ae[t]=!0,!1)}function Le(t,n,a){if(Ge(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Xe(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function ke(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function je(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ot(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ze(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,h=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return c.call(this)},set:function(y){a=""+y,h.call(this,y)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Tt(t){if(!t._valueTracker){var n=ot(t)?"checked":"value";t._valueTracker=Ze(t,n,""+t[n])}}function Jt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=ot(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function Xt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Nt=/[\n"\\]/g;function Ot(t){return t.replace(Nt,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Fe(t,n,a,o,c,h,y,w){t.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.type=y:t.removeAttribute("type"),n!=null?y==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+je(n)):t.value!==""+je(n)&&(t.value=""+je(n)):y!=="submit"&&y!=="reset"||t.removeAttribute("value"),n!=null?dt(t,y,je(n)):a!=null?dt(t,y,je(a)):o!=null&&t.removeAttribute("value"),c==null&&h!=null&&(t.defaultChecked=!!h),c!=null&&(t.checked=c&&typeof c!="function"&&typeof c!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?t.name=""+je(w):t.removeAttribute("name")}function In(t,n,a,o,c,h,y,w){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(t.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Tt(t);return}a=a!=null?""+je(a):"",n=n!=null?""+je(n):a,w||n===t.value||(t.value=n),t.defaultValue=n}o=o??c,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=w?t.checked:!!o,t.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(t.name=y),Tt(t)}function dt(t,n,a){n==="number"&&Xt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function En(t,n,a,o){if(t=t.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<t.length;a++)c=n.hasOwnProperty("$"+t[a].value),t[a].selected!==c&&(t[a].selected=c),c&&o&&(t[a].defaultSelected=!0)}else{for(a=""+je(a),n=null,c=0;c<t.length;c++){if(t[c].value===a){t[c].selected=!0,o&&(t[c].defaultSelected=!0);return}n!==null||t[c].disabled||(n=t[c])}n!==null&&(n.selected=!0)}}function ni(t,n,a){if(n!=null&&(n=""+je(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+je(a):""}function Ci(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(Y(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=je(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Tt(t)}function ii(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Pt=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jt(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Pt.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function wi(t,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var c in n)o=n[c],n.hasOwnProperty(c)&&a[c]!==o&&jt(t,c,o)}else for(var h in n)n.hasOwnProperty(h)&&jt(t,h,n[h])}function Ut(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Vi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Fa=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Er(t){return Fa.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function sa(){}var Bc=null;function zc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ts=null,ns=null;function am(t){var n=ra(t);if(n&&(t=n.stateNode)){var a=t[Dn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Fe(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ot(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var c=o[Dn]||null;if(!c)throw Error(r(90));Fe(o,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Jt(o)}break e;case"textarea":ni(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&En(t,!!a.multiple,n,!1)}}}var Fc=!1;function rm(t,n,a){if(Fc)return t(n,a);Fc=!0;try{var o=t(n);return o}finally{if(Fc=!1,(ts!==null||ns!==null)&&(_u(),ts&&(n=ts,t=ns,ns=ts=null,am(n),t)))for(n=0;n<t.length;n++)am(t[n])}}function ho(t,n){var a=t.stateNode;if(a===null)return null;var o=a[Dn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var oa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hc=!1;if(oa)try{var po={};Object.defineProperty(po,"passive",{get:function(){Hc=!0}}),window.addEventListener("test",po,po),window.removeEventListener("test",po,po)}catch{Hc=!1}var Ha=null,Gc=null,Ul=null;function sm(){if(Ul)return Ul;var t,n=Gc,a=n.length,o,c="value"in Ha?Ha.value:Ha.textContent,h=c.length;for(t=0;t<a&&n[t]===c[t];t++);var y=a-t;for(o=1;o<=y&&n[a-o]===c[h-o];o++);return Ul=c.slice(t,1<o?1-o:void 0)}function Ll(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Nl(){return!0}function om(){return!1}function Yn(t){function n(a,o,c,h,y){this._reactName=a,this._targetInst=c,this.type=o,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var w in t)t.hasOwnProperty(w)&&(a=t[w],this[w]=a?a(h):h[w]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Nl:om,this.isPropagationStopped=om,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Nl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Nl)},persist:function(){},isPersistent:Nl}),n}var br={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ol=Yn(br),mo=v({},br,{view:0,detail:0}),lS=Yn(mo),Vc,kc,go,Pl=v({},mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==go&&(go&&t.type==="mousemove"?(Vc=t.screenX-go.screenX,kc=t.screenY-go.screenY):kc=Vc=0,go=t),Vc)},movementY:function(t){return"movementY"in t?t.movementY:kc}}),lm=Yn(Pl),uS=v({},Pl,{dataTransfer:0}),cS=Yn(uS),fS=v({},mo,{relatedTarget:0}),Xc=Yn(fS),hS=v({},br,{animationName:0,elapsedTime:0,pseudoElement:0}),dS=Yn(hS),pS=v({},br,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),mS=Yn(pS),gS=v({},br,{data:0}),um=Yn(gS),_S={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function SS(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=xS[t])?!!n[t]:!1}function Wc(){return SS}var yS=v({},mo,{key:function(t){if(t.key){var n=_S[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?vS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wc,charCode:function(t){return t.type==="keypress"?Ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),MS=Yn(yS),ES=v({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cm=Yn(ES),bS=v({},mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wc}),TS=Yn(bS),AS=v({},br,{propertyName:0,elapsedTime:0,pseudoElement:0}),RS=Yn(AS),CS=v({},Pl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),wS=Yn(CS),DS=v({},br,{newState:0,oldState:0}),US=Yn(DS),LS=[9,13,27,32],qc=oa&&"CompositionEvent"in window,_o=null;oa&&"documentMode"in document&&(_o=document.documentMode);var NS=oa&&"TextEvent"in window&&!_o,fm=oa&&(!qc||_o&&8<_o&&11>=_o),hm=" ",dm=!1;function pm(t,n){switch(t){case"keyup":return LS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function OS(t,n){switch(t){case"compositionend":return mm(n);case"keypress":return n.which!==32?null:(dm=!0,hm);case"textInput":return t=n.data,t===hm&&dm?null:t;default:return null}}function PS(t,n){if(is)return t==="compositionend"||!qc&&pm(t,n)?(t=sm(),Ul=Gc=Ha=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return fm&&n.locale!=="ko"?null:n.data;default:return null}}var IS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!IS[t.type]:n==="textarea"}function _m(t,n,a,o){ts?ns?ns.push(o):ns=[o]:ts=o,n=bu(n,"onChange"),0<n.length&&(a=new Ol("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var vo=null,xo=null;function BS(t){$0(t,0)}function Il(t){var n=Mr(t);if(Jt(n))return t}function vm(t,n){if(t==="change")return n}var xm=!1;if(oa){var Yc;if(oa){var Zc="oninput"in document;if(!Zc){var Sm=document.createElement("div");Sm.setAttribute("oninput","return;"),Zc=typeof Sm.oninput=="function"}Yc=Zc}else Yc=!1;xm=Yc&&(!document.documentMode||9<document.documentMode)}function ym(){vo&&(vo.detachEvent("onpropertychange",Mm),xo=vo=null)}function Mm(t){if(t.propertyName==="value"&&Il(xo)){var n=[];_m(n,xo,t,zc(t)),rm(BS,n)}}function zS(t,n,a){t==="focusin"?(ym(),vo=n,xo=a,vo.attachEvent("onpropertychange",Mm)):t==="focusout"&&ym()}function FS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Il(xo)}function HS(t,n){if(t==="click")return Il(n)}function GS(t,n){if(t==="input"||t==="change")return Il(n)}function VS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:VS;function So(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var c=a[o];if(!on.call(n,c)||!ai(t[c],n[c]))return!1}return!0}function Em(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function bm(t,n){var a=Em(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Em(a)}}function Tm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Tm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Am(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Xt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Xt(t.document)}return n}function Kc(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var kS=oa&&"documentMode"in document&&11>=document.documentMode,as=null,Qc=null,yo=null,Jc=!1;function Rm(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Jc||as==null||as!==Xt(o)||(o=as,"selectionStart"in o&&Kc(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),yo&&So(yo,o)||(yo=o,o=bu(Qc,"onSelect"),0<o.length&&(n=new Ol("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=as)))}function Tr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var rs={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionrun:Tr("Transition","TransitionRun"),transitionstart:Tr("Transition","TransitionStart"),transitioncancel:Tr("Transition","TransitionCancel"),transitionend:Tr("Transition","TransitionEnd")},jc={},Cm={};oa&&(Cm=document.createElement("div").style,"AnimationEvent"in window||(delete rs.animationend.animation,delete rs.animationiteration.animation,delete rs.animationstart.animation),"TransitionEvent"in window||delete rs.transitionend.transition);function Ar(t){if(jc[t])return jc[t];if(!rs[t])return t;var n=rs[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Cm)return jc[t]=n[a];return t}var wm=Ar("animationend"),Dm=Ar("animationiteration"),Um=Ar("animationstart"),XS=Ar("transitionrun"),WS=Ar("transitionstart"),qS=Ar("transitioncancel"),Lm=Ar("transitionend"),Nm=new Map,$c="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");$c.push("scrollEnd");function Di(t,n){Nm.set(t,n),q(n,[t])}var Bl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},mi=[],ss=0,ef=0;function zl(){for(var t=ss,n=ef=ss=0;n<t;){var a=mi[n];mi[n++]=null;var o=mi[n];mi[n++]=null;var c=mi[n];mi[n++]=null;var h=mi[n];if(mi[n++]=null,o!==null&&c!==null){var y=o.pending;y===null?c.next=c:(c.next=y.next,y.next=c),o.pending=c}h!==0&&Om(a,c,h)}}function Fl(t,n,a,o){mi[ss++]=t,mi[ss++]=n,mi[ss++]=a,mi[ss++]=o,ef|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function tf(t,n,a,o){return Fl(t,n,a,o),Hl(t)}function Rr(t,n){return Fl(t,null,null,n),Hl(t)}function Om(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var c=!1,h=t.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(t=h.stateNode,t===null||t._visibility&1||(c=!0)),t=h,h=h.return;return t.tag===3?(h=t.stateNode,c&&n!==null&&(c=31-ze(a),t=h.hiddenUpdates,o=t[c],o===null?t[c]=[n]:o.push(n),n.lane=a|536870912),h):null}function Hl(t){if(50<ko)throw ko=0,fh=null,Error(r(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var os={};function YS(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(t,n,a,o){return new YS(t,n,a,o)}function nf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function la(t,n){var a=t.alternate;return a===null?(a=ri(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Pm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Gl(t,n,a,o,c,h){var y=0;if(o=t,typeof t=="function")nf(t)&&(y=1);else if(typeof t=="string")y=jy(t,a,Ce.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case D:return t=ri(31,a,n,c),t.elementType=D,t.lanes=h,t;case A:return Cr(a.children,c,h,n);case x:y=8,c|=24;break;case S:return t=ri(12,a,n,c|2),t.elementType=S,t.lanes=h,t;case N:return t=ri(13,a,n,c),t.elementType=N,t.lanes=h,t;case U:return t=ri(19,a,n,c),t.elementType=U,t.lanes=h,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case I:y=10;break e;case L:y=9;break e;case C:y=11;break e;case O:y=14;break e;case b:y=16,o=null;break e}y=29,a=Error(r(130,t===null?"null":typeof t,"")),o=null}return n=ri(y,a,n,c),n.elementType=t,n.type=o,n.lanes=h,n}function Cr(t,n,a,o){return t=ri(7,t,o,n),t.lanes=a,t}function af(t,n,a){return t=ri(6,t,null,n),t.lanes=a,t}function Im(t){var n=ri(18,null,null,0);return n.stateNode=t,n}function rf(t,n,a){return n=ri(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Bm=new WeakMap;function gi(t,n){if(typeof t=="object"&&t!==null){var a=Bm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:sn(n)},Bm.set(t,n),n)}return{value:t,source:n,stack:sn(n)}}var ls=[],us=0,Vl=null,Mo=0,_i=[],vi=0,Ga=null,ki=1,Xi="";function ua(t,n){ls[us++]=Mo,ls[us++]=Vl,Vl=t,Mo=n}function zm(t,n,a){_i[vi++]=ki,_i[vi++]=Xi,_i[vi++]=Ga,Ga=t;var o=ki;t=Xi;var c=32-ze(o)-1;o&=~(1<<c),a+=1;var h=32-ze(n)+c;if(30<h){var y=c-c%5;h=(o&(1<<y)-1).toString(32),o>>=y,c-=y,ki=1<<32-ze(n)+c|a<<c|o,Xi=h+t}else ki=1<<h|a<<c|o,Xi=t}function sf(t){t.return!==null&&(ua(t,1),zm(t,1,0))}function of(t){for(;t===Vl;)Vl=ls[--us],ls[us]=null,Mo=ls[--us],ls[us]=null;for(;t===Ga;)Ga=_i[--vi],_i[vi]=null,Xi=_i[--vi],_i[vi]=null,ki=_i[--vi],_i[vi]=null}function Fm(t,n){_i[vi++]=ki,_i[vi++]=Xi,_i[vi++]=Ga,ki=n.id,Xi=n.overflow,Ga=t}var Un=null,Zt=null,yt=!1,Va=null,xi=!1,lf=Error(r(519));function ka(t){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Eo(gi(n,t)),lf}function Hm(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[mn]=t,n[Dn]=o,a){case"dialog":mt("cancel",n),mt("close",n);break;case"iframe":case"object":case"embed":mt("load",n);break;case"video":case"audio":for(a=0;a<Wo.length;a++)mt(Wo[a],n);break;case"source":mt("error",n);break;case"img":case"image":case"link":mt("error",n),mt("load",n);break;case"details":mt("toggle",n);break;case"input":mt("invalid",n),In(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":mt("invalid",n);break;case"textarea":mt("invalid",n),Ci(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||i_(n.textContent,a)?(o.popover!=null&&(mt("beforetoggle",n),mt("toggle",n)),o.onScroll!=null&&mt("scroll",n),o.onScrollEnd!=null&&mt("scrollend",n),o.onClick!=null&&(n.onclick=sa),n=!0):n=!1,n||ka(t,!0)}function Gm(t){for(Un=t.return;Un;)switch(Un.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:Un=Un.return}}function cs(t){if(t!==Un)return!1;if(!yt)return Gm(t),yt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Ah(t.type,t.memoizedProps)),a=!a),a&&Zt&&ka(t),Gm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Zt=h_(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Zt=h_(t)}else n===27?(n=Zt,ir(t.type)?(t=Uh,Uh=null,Zt=t):Zt=n):Zt=Un?yi(t.stateNode.nextSibling):null;return!0}function wr(){Zt=Un=null,yt=!1}function uf(){var t=Va;return t!==null&&(Jn===null?Jn=t:Jn.push.apply(Jn,t),Va=null),t}function Eo(t){Va===null?Va=[t]:Va.push(t)}var cf=B(null),Dr=null,ca=null;function Xa(t,n,a){Ee(cf,n._currentValue),n._currentValue=a}function fa(t){t._currentValue=cf.current,Q(cf)}function ff(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function hf(t,n,a,o){var c=t.child;for(c!==null&&(c.return=t);c!==null;){var h=c.dependencies;if(h!==null){var y=c.child;h=h.firstContext;e:for(;h!==null;){var w=h;h=c;for(var G=0;G<n.length;G++)if(w.context===n[G]){h.lanes|=a,w=h.alternate,w!==null&&(w.lanes|=a),ff(h.return,a,t),o||(y=null);break e}h=w.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(r(341));y.lanes|=a,h=y.alternate,h!==null&&(h.lanes|=a),ff(y,a,t),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===t){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function fs(t,n,a,o){t=null;for(var c=n,h=!1;c!==null;){if(!h){if((c.flags&524288)!==0)h=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(r(387));if(y=y.memoizedProps,y!==null){var w=c.type;ai(c.pendingProps.value,y.value)||(t!==null?t.push(w):t=[w])}}else if(c===Se.current){if(y=c.alternate,y===null)throw Error(r(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(t!==null?t.push(Qo):t=[Qo])}c=c.return}t!==null&&hf(n,t,a,o),n.flags|=262144}function kl(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ur(t){Dr=t,ca=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ln(t){return Vm(Dr,t)}function Xl(t,n){return Dr===null&&Ur(t),Vm(t,n)}function Vm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ca===null){if(t===null)throw Error(r(308));ca=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ca=ca.next=n;return a}var ZS=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},KS=s.unstable_scheduleCallback,QS=s.unstable_NormalPriority,_n={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function df(){return{controller:new ZS,data:new Map,refCount:0}}function bo(t){t.refCount--,t.refCount===0&&KS(QS,function(){t.controller.abort()})}var To=null,pf=0,hs=0,ds=null;function JS(t,n){if(To===null){var a=To=[];pf=0,hs=_h(),ds={status:"pending",value:void 0,then:function(o){a.push(o)}}}return pf++,n.then(km,km),n}function km(){if(--pf===0&&To!==null){ds!==null&&(ds.status="fulfilled");var t=To;To=null,hs=0,ds=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function jS(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(o.status="rejected",o.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),o}var Xm=z.S;z.S=function(t,n){R0=Ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&JS(t,n),Xm!==null&&Xm(t,n)};var Lr=B(null);function mf(){var t=Lr.current;return t!==null?t:Wt.pooledCache}function Wl(t,n){n===null?Ee(Lr,Lr.current):Ee(Lr,n.pool)}function Wm(){var t=mf();return t===null?null:{parent:_n._currentValue,pool:t}}var ps=Error(r(460)),gf=Error(r(474)),ql=Error(r(542)),Yl={then:function(){}};function qm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ym(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(sa,sa),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Km(t),t;default:if(typeof n.status=="string")n.then(sa,sa);else{if(t=Wt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=o}},function(o){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Km(t),t}throw Or=n,ps}}function Nr(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Or=a,ps):a}}var Or=null;function Zm(){if(Or===null)throw Error(r(459));var t=Or;return Or=null,t}function Km(t){if(t===ps||t===ql)throw Error(r(483))}var ms=null,Ao=0;function Zl(t){var n=Ao;return Ao+=1,ms===null&&(ms=[]),Ym(ms,t,n)}function Ro(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Kl(t,n){throw n.$$typeof===g?Error(r(525)):(t=Object.prototype.toString.call(n),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Qm(t){function n(K,X){if(t){var ee=K.deletions;ee===null?(K.deletions=[X],K.flags|=16):ee.push(X)}}function a(K,X){if(!t)return null;for(;X!==null;)n(K,X),X=X.sibling;return null}function o(K){for(var X=new Map;K!==null;)K.key!==null?X.set(K.key,K):X.set(K.index,K),K=K.sibling;return X}function c(K,X){return K=la(K,X),K.index=0,K.sibling=null,K}function h(K,X,ee){return K.index=ee,t?(ee=K.alternate,ee!==null?(ee=ee.index,ee<X?(K.flags|=67108866,X):ee):(K.flags|=67108866,X)):(K.flags|=1048576,X)}function y(K){return t&&K.alternate===null&&(K.flags|=67108866),K}function w(K,X,ee,ve){return X===null||X.tag!==6?(X=af(ee,K.mode,ve),X.return=K,X):(X=c(X,ee),X.return=K,X)}function G(K,X,ee,ve){var $e=ee.type;return $e===A?me(K,X,ee.props.children,ve,ee.key):X!==null&&(X.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===b&&Nr($e)===X.type)?(X=c(X,ee.props),Ro(X,ee),X.return=K,X):(X=Gl(ee.type,ee.key,ee.props,null,K.mode,ve),Ro(X,ee),X.return=K,X)}function te(K,X,ee,ve){return X===null||X.tag!==4||X.stateNode.containerInfo!==ee.containerInfo||X.stateNode.implementation!==ee.implementation?(X=rf(ee,K.mode,ve),X.return=K,X):(X=c(X,ee.children||[]),X.return=K,X)}function me(K,X,ee,ve,$e){return X===null||X.tag!==7?(X=Cr(ee,K.mode,ve,$e),X.return=K,X):(X=c(X,ee),X.return=K,X)}function xe(K,X,ee){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=af(""+X,K.mode,ee),X.return=K,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case M:return ee=Gl(X.type,X.key,X.props,null,K.mode,ee),Ro(ee,X),ee.return=K,ee;case T:return X=rf(X,K.mode,ee),X.return=K,X;case b:return X=Nr(X),xe(K,X,ee)}if(Y(X)||k(X))return X=Cr(X,K.mode,ee,null),X.return=K,X;if(typeof X.then=="function")return xe(K,Zl(X),ee);if(X.$$typeof===I)return xe(K,Xl(K,X),ee);Kl(K,X)}return null}function le(K,X,ee,ve){var $e=X!==null?X.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint")return $e!==null?null:w(K,X,""+ee,ve);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case M:return ee.key===$e?G(K,X,ee,ve):null;case T:return ee.key===$e?te(K,X,ee,ve):null;case b:return ee=Nr(ee),le(K,X,ee,ve)}if(Y(ee)||k(ee))return $e!==null?null:me(K,X,ee,ve,null);if(typeof ee.then=="function")return le(K,X,Zl(ee),ve);if(ee.$$typeof===I)return le(K,X,Xl(K,ee),ve);Kl(K,ee)}return null}function ce(K,X,ee,ve,$e){if(typeof ve=="string"&&ve!==""||typeof ve=="number"||typeof ve=="bigint")return K=K.get(ee)||null,w(X,K,""+ve,$e);if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case M:return K=K.get(ve.key===null?ee:ve.key)||null,G(X,K,ve,$e);case T:return K=K.get(ve.key===null?ee:ve.key)||null,te(X,K,ve,$e);case b:return ve=Nr(ve),ce(K,X,ee,ve,$e)}if(Y(ve)||k(ve))return K=K.get(ee)||null,me(X,K,ve,$e,null);if(typeof ve.then=="function")return ce(K,X,ee,Zl(ve),$e);if(ve.$$typeof===I)return ce(K,X,ee,Xl(X,ve),$e);Kl(X,ve)}return null}function We(K,X,ee,ve){for(var $e=null,At=null,Ye=X,ut=X=0,vt=null;Ye!==null&&ut<ee.length;ut++){Ye.index>ut?(vt=Ye,Ye=null):vt=Ye.sibling;var Rt=le(K,Ye,ee[ut],ve);if(Rt===null){Ye===null&&(Ye=vt);break}t&&Ye&&Rt.alternate===null&&n(K,Ye),X=h(Rt,X,ut),At===null?$e=Rt:At.sibling=Rt,At=Rt,Ye=vt}if(ut===ee.length)return a(K,Ye),yt&&ua(K,ut),$e;if(Ye===null){for(;ut<ee.length;ut++)Ye=xe(K,ee[ut],ve),Ye!==null&&(X=h(Ye,X,ut),At===null?$e=Ye:At.sibling=Ye,At=Ye);return yt&&ua(K,ut),$e}for(Ye=o(Ye);ut<ee.length;ut++)vt=ce(Ye,K,ut,ee[ut],ve),vt!==null&&(t&&vt.alternate!==null&&Ye.delete(vt.key===null?ut:vt.key),X=h(vt,X,ut),At===null?$e=vt:At.sibling=vt,At=vt);return t&&Ye.forEach(function(lr){return n(K,lr)}),yt&&ua(K,ut),$e}function et(K,X,ee,ve){if(ee==null)throw Error(r(151));for(var $e=null,At=null,Ye=X,ut=X=0,vt=null,Rt=ee.next();Ye!==null&&!Rt.done;ut++,Rt=ee.next()){Ye.index>ut?(vt=Ye,Ye=null):vt=Ye.sibling;var lr=le(K,Ye,Rt.value,ve);if(lr===null){Ye===null&&(Ye=vt);break}t&&Ye&&lr.alternate===null&&n(K,Ye),X=h(lr,X,ut),At===null?$e=lr:At.sibling=lr,At=lr,Ye=vt}if(Rt.done)return a(K,Ye),yt&&ua(K,ut),$e;if(Ye===null){for(;!Rt.done;ut++,Rt=ee.next())Rt=xe(K,Rt.value,ve),Rt!==null&&(X=h(Rt,X,ut),At===null?$e=Rt:At.sibling=Rt,At=Rt);return yt&&ua(K,ut),$e}for(Ye=o(Ye);!Rt.done;ut++,Rt=ee.next())Rt=ce(Ye,K,ut,Rt.value,ve),Rt!==null&&(t&&Rt.alternate!==null&&Ye.delete(Rt.key===null?ut:Rt.key),X=h(Rt,X,ut),At===null?$e=Rt:At.sibling=Rt,At=Rt);return t&&Ye.forEach(function(uM){return n(K,uM)}),yt&&ua(K,ut),$e}function Vt(K,X,ee,ve){if(typeof ee=="object"&&ee!==null&&ee.type===A&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case M:e:{for(var $e=ee.key;X!==null;){if(X.key===$e){if($e=ee.type,$e===A){if(X.tag===7){a(K,X.sibling),ve=c(X,ee.props.children),ve.return=K,K=ve;break e}}else if(X.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===b&&Nr($e)===X.type){a(K,X.sibling),ve=c(X,ee.props),Ro(ve,ee),ve.return=K,K=ve;break e}a(K,X);break}else n(K,X);X=X.sibling}ee.type===A?(ve=Cr(ee.props.children,K.mode,ve,ee.key),ve.return=K,K=ve):(ve=Gl(ee.type,ee.key,ee.props,null,K.mode,ve),Ro(ve,ee),ve.return=K,K=ve)}return y(K);case T:e:{for($e=ee.key;X!==null;){if(X.key===$e)if(X.tag===4&&X.stateNode.containerInfo===ee.containerInfo&&X.stateNode.implementation===ee.implementation){a(K,X.sibling),ve=c(X,ee.children||[]),ve.return=K,K=ve;break e}else{a(K,X);break}else n(K,X);X=X.sibling}ve=rf(ee,K.mode,ve),ve.return=K,K=ve}return y(K);case b:return ee=Nr(ee),Vt(K,X,ee,ve)}if(Y(ee))return We(K,X,ee,ve);if(k(ee)){if($e=k(ee),typeof $e!="function")throw Error(r(150));return ee=$e.call(ee),et(K,X,ee,ve)}if(typeof ee.then=="function")return Vt(K,X,Zl(ee),ve);if(ee.$$typeof===I)return Vt(K,X,Xl(K,ee),ve);Kl(K,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint"?(ee=""+ee,X!==null&&X.tag===6?(a(K,X.sibling),ve=c(X,ee),ve.return=K,K=ve):(a(K,X),ve=af(ee,K.mode,ve),ve.return=K,K=ve),y(K)):a(K,X)}return function(K,X,ee,ve){try{Ao=0;var $e=Vt(K,X,ee,ve);return ms=null,$e}catch(Ye){if(Ye===ps||Ye===ql)throw Ye;var At=ri(29,Ye,null,K.mode);return At.lanes=ve,At.return=K,At}}}var Pr=Qm(!0),Jm=Qm(!1),Wa=!1;function _f(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function vf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function qa(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ya(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Dt&2)!==0){var c=o.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),o.pending=n,n=Hl(t),Om(t,null,a),n}return Fl(t,o,n,a),Hl(t)}function Co(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}function xf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var c=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?c=h=y:h=h.next=y,a=a.next}while(a!==null);h===null?c=h=n:h=h.next=n}else c=h=n;a={baseState:o.baseState,firstBaseUpdate:c,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Sf=!1;function wo(){if(Sf){var t=ds;if(t!==null)throw t}}function Do(t,n,a,o){Sf=!1;var c=t.updateQueue;Wa=!1;var h=c.firstBaseUpdate,y=c.lastBaseUpdate,w=c.shared.pending;if(w!==null){c.shared.pending=null;var G=w,te=G.next;G.next=null,y===null?h=te:y.next=te,y=G;var me=t.alternate;me!==null&&(me=me.updateQueue,w=me.lastBaseUpdate,w!==y&&(w===null?me.firstBaseUpdate=te:w.next=te,me.lastBaseUpdate=G))}if(h!==null){var xe=c.baseState;y=0,me=te=G=null,w=h;do{var le=w.lane&-536870913,ce=le!==w.lane;if(ce?(_t&le)===le:(o&le)===le){le!==0&&le===hs&&(Sf=!0),me!==null&&(me=me.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var We=t,et=w;le=n;var Vt=a;switch(et.tag){case 1:if(We=et.payload,typeof We=="function"){xe=We.call(Vt,xe,le);break e}xe=We;break e;case 3:We.flags=We.flags&-65537|128;case 0:if(We=et.payload,le=typeof We=="function"?We.call(Vt,xe,le):We,le==null)break e;xe=v({},xe,le);break e;case 2:Wa=!0}}le=w.callback,le!==null&&(t.flags|=64,ce&&(t.flags|=8192),ce=c.callbacks,ce===null?c.callbacks=[le]:ce.push(le))}else ce={lane:le,tag:w.tag,payload:w.payload,callback:w.callback,next:null},me===null?(te=me=ce,G=xe):me=me.next=ce,y|=le;if(w=w.next,w===null){if(w=c.shared.pending,w===null)break;ce=w,w=ce.next,ce.next=null,c.lastBaseUpdate=ce,c.shared.pending=null}}while(!0);me===null&&(G=xe),c.baseState=G,c.firstBaseUpdate=te,c.lastBaseUpdate=me,h===null&&(c.shared.lanes=0),ja|=y,t.lanes=y,t.memoizedState=xe}}function jm(t,n){if(typeof t!="function")throw Error(r(191,t));t.call(n)}function $m(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)jm(a[t],n)}var gs=B(null),Ql=B(0);function eg(t,n){t=Sa,Ee(Ql,t),Ee(gs,n),Sa=t|n.baseLanes}function yf(){Ee(Ql,Sa),Ee(gs,gs.current)}function Mf(){Sa=Ql.current,Q(gs),Q(Ql)}var si=B(null),Si=null;function Za(t){var n=t.alternate;Ee(dn,dn.current&1),Ee(si,t),Si===null&&(n===null||gs.current!==null||n.memoizedState!==null)&&(Si=t)}function Ef(t){Ee(dn,dn.current),Ee(si,t),Si===null&&(Si=t)}function tg(t){t.tag===22?(Ee(dn,dn.current),Ee(si,t),Si===null&&(Si=t)):Ka()}function Ka(){Ee(dn,dn.current),Ee(si,si.current)}function oi(t){Q(si),Si===t&&(Si=null),Q(dn)}var dn=B(0);function Jl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||wh(a)||Dh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ha=0,lt=null,Ht=null,vn=null,jl=!1,_s=!1,Ir=!1,$l=0,Uo=0,vs=null,$S=0;function un(){throw Error(r(321))}function bf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function Tf(t,n,a,o,c,h){return ha=h,lt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=t===null||t.memoizedState===null?zg:Hf,Ir=!1,h=a(o,c),Ir=!1,_s&&(h=ig(n,a,o,c)),ng(t),h}function ng(t){z.H=Oo;var n=Ht!==null&&Ht.next!==null;if(ha=0,vn=Ht=lt=null,jl=!1,Uo=0,vs=null,n)throw Error(r(300));t===null||xn||(t=t.dependencies,t!==null&&kl(t)&&(xn=!0))}function ig(t,n,a,o){lt=t;var c=0;do{if(_s&&(vs=null),Uo=0,_s=!1,25<=c)throw Error(r(301));if(c+=1,vn=Ht=null,t.updateQueue!=null){var h=t.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}z.H=Fg,h=n(a,o)}while(_s);return h}function ey(){var t=z.H,n=t.useState()[0];return n=typeof n.then=="function"?Lo(n):n,t=t.useState()[0],(Ht!==null?Ht.memoizedState:null)!==t&&(lt.flags|=1024),n}function Af(){var t=$l!==0;return $l=0,t}function Rf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Cf(t){if(jl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}jl=!1}ha=0,vn=Ht=lt=null,_s=!1,Uo=$l=0,vs=null}function Vn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return vn===null?lt.memoizedState=vn=t:vn=vn.next=t,vn}function pn(){if(Ht===null){var t=lt.alternate;t=t!==null?t.memoizedState:null}else t=Ht.next;var n=vn===null?lt.memoizedState:vn.next;if(n!==null)vn=n,Ht=t;else{if(t===null)throw lt.alternate===null?Error(r(467)):Error(r(310));Ht=t,t={memoizedState:Ht.memoizedState,baseState:Ht.baseState,baseQueue:Ht.baseQueue,queue:Ht.queue,next:null},vn===null?lt.memoizedState=vn=t:vn=vn.next=t}return vn}function eu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lo(t){var n=Uo;return Uo+=1,vs===null&&(vs=[]),t=Ym(vs,t,n),n=lt,(vn===null?n.memoizedState:vn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?zg:Hf),t}function tu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Lo(t);if(t.$$typeof===I)return Ln(t)}throw Error(r(438,String(t)))}function wf(t){var n=null,a=lt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=lt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=eu(),lt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=H;return n.index++,a}function da(t,n){return typeof n=="function"?n(t):n}function nu(t){var n=pn();return Df(n,Ht,t)}function Df(t,n,a){var o=t.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var c=t.baseQueue,h=o.pending;if(h!==null){if(c!==null){var y=c.next;c.next=h.next,h.next=y}n.baseQueue=c=h,o.pending=null}if(h=t.baseState,c===null)t.memoizedState=h;else{n=c.next;var w=y=null,G=null,te=n,me=!1;do{var xe=te.lane&-536870913;if(xe!==te.lane?(_t&xe)===xe:(ha&xe)===xe){var le=te.revertLane;if(le===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:te.action,hasEagerState:te.hasEagerState,eagerState:te.eagerState,next:null}),xe===hs&&(me=!0);else if((ha&le)===le){te=te.next,le===hs&&(me=!0);continue}else xe={lane:0,revertLane:te.revertLane,gesture:null,action:te.action,hasEagerState:te.hasEagerState,eagerState:te.eagerState,next:null},G===null?(w=G=xe,y=h):G=G.next=xe,lt.lanes|=le,ja|=le;xe=te.action,Ir&&a(h,xe),h=te.hasEagerState?te.eagerState:a(h,xe)}else le={lane:xe,revertLane:te.revertLane,gesture:te.gesture,action:te.action,hasEagerState:te.hasEagerState,eagerState:te.eagerState,next:null},G===null?(w=G=le,y=h):G=G.next=le,lt.lanes|=xe,ja|=xe;te=te.next}while(te!==null&&te!==n);if(G===null?y=h:G.next=w,!ai(h,t.memoizedState)&&(xn=!0,me&&(a=ds,a!==null)))throw a;t.memoizedState=h,t.baseState=y,t.baseQueue=G,o.lastRenderedState=h}return c===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function Uf(t){var n=pn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=t;var o=a.dispatch,c=a.pending,h=n.memoizedState;if(c!==null){a.pending=null;var y=c=c.next;do h=t(h,y.action),y=y.next;while(y!==c);ai(h,n.memoizedState)||(xn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function ag(t,n,a){var o=lt,c=pn(),h=yt;if(h){if(a===void 0)throw Error(r(407));a=a()}else a=n();var y=!ai((Ht||c).memoizedState,a);if(y&&(c.memoizedState=a,xn=!0),c=c.queue,Of(og.bind(null,o,c,t),[t]),c.getSnapshot!==n||y||vn!==null&&vn.memoizedState.tag&1){if(o.flags|=2048,xs(9,{destroy:void 0},sg.bind(null,o,c,a,n),null),Wt===null)throw Error(r(349));h||(ha&127)!==0||rg(o,n,a)}return a}function rg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=lt.updateQueue,n===null?(n=eu(),lt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function sg(t,n,a,o){n.value=a,n.getSnapshot=o,lg(n)&&ug(t)}function og(t,n,a){return a(function(){lg(n)&&ug(t)})}function lg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function ug(t){var n=Rr(t,2);n!==null&&jn(n,t,2)}function Lf(t){var n=Vn();if(typeof t=="function"){var a=t;if(t=a(),Ir){Re(!0);try{a()}finally{Re(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:t},n}function cg(t,n,a,o){return t.baseState=a,Df(t,Ht,typeof o=="function"?o:da)}function ty(t,n,a,o,c){if(ru(t))throw Error(r(485));if(t=n.action,t!==null){var h={payload:c,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};z.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,fg(n,h)):(h.next=a.next,n.pending=a.next=h)}}function fg(t,n){var a=n.action,o=n.payload,c=t.state;if(n.isTransition){var h=z.T,y={};z.T=y;try{var w=a(c,o),G=z.S;G!==null&&G(y,w),hg(t,n,w)}catch(te){Nf(t,n,te)}finally{h!==null&&y.types!==null&&(h.types=y.types),z.T=h}}else try{h=a(c,o),hg(t,n,h)}catch(te){Nf(t,n,te)}}function hg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){dg(t,n,o)},function(o){return Nf(t,n,o)}):dg(t,n,a)}function dg(t,n,a){n.status="fulfilled",n.value=a,pg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,fg(t,a)))}function Nf(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,pg(n),n=n.next;while(n!==o)}t.action=null}function pg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function mg(t,n){return n}function gg(t,n){if(yt){var a=Wt.formState;if(a!==null){e:{var o=lt;if(yt){if(Zt){t:{for(var c=Zt,h=xi;c.nodeType!==8;){if(!h){c=null;break t}if(c=yi(c.nextSibling),c===null){c=null;break t}}h=c.data,c=h==="F!"||h==="F"?c:null}if(c){Zt=yi(c.nextSibling),o=c.data==="F!";break e}}ka(o)}o=!1}o&&(n=a[0])}}return a=Vn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mg,lastRenderedState:n},a.queue=o,a=Pg.bind(null,lt,o),o.dispatch=a,o=Lf(!1),h=Ff.bind(null,lt,!1,o.queue),o=Vn(),c={state:n,dispatch:null,action:t,pending:null},o.queue=c,a=ty.bind(null,lt,c,h,a),c.dispatch=a,o.memoizedState=t,[n,a,!1]}function _g(t){var n=pn();return vg(n,Ht,t)}function vg(t,n,a){if(n=Df(t,n,mg)[0],t=nu(da)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Lo(n)}catch(y){throw y===ps?ql:y}else o=n;n=pn();var c=n.queue,h=c.dispatch;return a!==n.memoizedState&&(lt.flags|=2048,xs(9,{destroy:void 0},ny.bind(null,c,a),null)),[o,h,t]}function ny(t,n){t.action=n}function xg(t){var n=pn(),a=Ht;if(a!==null)return vg(n,a,t);pn(),n=n.memoizedState,a=pn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function xs(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=lt.updateQueue,n===null&&(n=eu(),lt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Sg(){return pn().memoizedState}function iu(t,n,a,o){var c=Vn();lt.flags|=t,c.memoizedState=xs(1|n,{destroy:void 0},a,o===void 0?null:o)}function au(t,n,a,o){var c=pn();o=o===void 0?null:o;var h=c.memoizedState.inst;Ht!==null&&o!==null&&bf(o,Ht.memoizedState.deps)?c.memoizedState=xs(n,h,a,o):(lt.flags|=t,c.memoizedState=xs(1|n,h,a,o))}function yg(t,n){iu(8390656,8,t,n)}function Of(t,n){au(2048,8,t,n)}function iy(t){lt.flags|=4;var n=lt.updateQueue;if(n===null)n=eu(),lt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Mg(t){var n=pn().memoizedState;return iy({ref:n,nextImpl:t}),function(){if((Dt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Eg(t,n){return au(4,2,t,n)}function bg(t,n){return au(4,4,t,n)}function Tg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Ag(t,n,a){a=a!=null?a.concat([t]):null,au(4,4,Tg.bind(null,n,t),a)}function Pf(){}function Rg(t,n){var a=pn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&bf(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Cg(t,n){var a=pn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&bf(n,o[1]))return o[0];if(o=t(),Ir){Re(!0);try{t()}finally{Re(!1)}}return a.memoizedState=[o,n],o}function If(t,n,a){return a===void 0||(ha&1073741824)!==0&&(_t&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=w0(),lt.lanes|=t,ja|=t,a)}function wg(t,n,a,o){return ai(a,n)?a:gs.current!==null?(t=If(t,a,o),ai(t,n)||(xn=!0),t):(ha&42)===0||(ha&1073741824)!==0&&(_t&261930)===0?(xn=!0,t.memoizedState=a):(t=w0(),lt.lanes|=t,ja|=t,n)}function Dg(t,n,a,o,c){var h=V.p;V.p=h!==0&&8>h?h:8;var y=z.T,w={};z.T=w,Ff(t,!1,n,a);try{var G=c(),te=z.S;if(te!==null&&te(w,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var me=jS(G,o);No(t,n,me,ci(t))}else No(t,n,o,ci(t))}catch(xe){No(t,n,{then:function(){},status:"rejected",reason:xe},ci())}finally{V.p=h,y!==null&&w.types!==null&&(y.types=w.types),z.T=y}}function ay(){}function Bf(t,n,a,o){if(t.tag!==5)throw Error(r(476));var c=Ug(t).queue;Dg(t,c,n,ne,a===null?ay:function(){return Lg(t),a(o)})}function Ug(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ne,baseState:ne,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:ne},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Lg(t){var n=Ug(t);n.next===null&&(n=t.alternate.memoizedState),No(t,n.next.queue,{},ci())}function zf(){return Ln(Qo)}function Ng(){return pn().memoizedState}function Og(){return pn().memoizedState}function ry(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ci();t=qa(a);var o=Ya(n,t,a);o!==null&&(jn(o,n,a),Co(o,n,a)),n={cache:df()},t.payload=n;return}n=n.return}}function sy(t,n,a){var o=ci();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ru(t)?Ig(n,a):(a=tf(t,n,a,o),a!==null&&(jn(a,t,o),Bg(a,n,o)))}function Pg(t,n,a){var o=ci();No(t,n,a,o)}function No(t,n,a,o){var c={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(ru(t))Ig(n,c);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var y=n.lastRenderedState,w=h(y,a);if(c.hasEagerState=!0,c.eagerState=w,ai(w,y))return Fl(t,n,c,0),Wt===null&&zl(),!1}catch{}if(a=tf(t,n,c,o),a!==null)return jn(a,t,o),Bg(a,n,o),!0}return!1}function Ff(t,n,a,o){if(o={lane:2,revertLane:_h(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},ru(t)){if(n)throw Error(r(479))}else n=tf(t,a,o,2),n!==null&&jn(n,t,2)}function ru(t){var n=t.alternate;return t===lt||n!==null&&n===lt}function Ig(t,n){_s=jl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Bg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,ei(t,a)}}var Oo={readContext:Ln,use:tu,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un};Oo.useEffectEvent=un;var zg={readContext:Ln,use:tu,useCallback:function(t,n){return Vn().memoizedState=[t,n===void 0?null:n],t},useContext:Ln,useEffect:yg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,iu(4194308,4,Tg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return iu(4194308,4,t,n)},useInsertionEffect:function(t,n){iu(4,2,t,n)},useMemo:function(t,n){var a=Vn();n=n===void 0?null:n;var o=t();if(Ir){Re(!0);try{t()}finally{Re(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Vn();if(a!==void 0){var c=a(n);if(Ir){Re(!0);try{a(n)}finally{Re(!1)}}}else c=n;return o.memoizedState=o.baseState=c,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:c},o.queue=t,t=t.dispatch=sy.bind(null,lt,t),[o.memoizedState,t]},useRef:function(t){var n=Vn();return t={current:t},n.memoizedState=t},useState:function(t){t=Lf(t);var n=t.queue,a=Pg.bind(null,lt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Pf,useDeferredValue:function(t,n){var a=Vn();return If(a,t,n)},useTransition:function(){var t=Lf(!1);return t=Dg.bind(null,lt,t.queue,!0,!1),Vn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=lt,c=Vn();if(yt){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),Wt===null)throw Error(r(349));(_t&127)!==0||rg(o,n,a)}c.memoizedState=a;var h={value:a,getSnapshot:n};return c.queue=h,yg(og.bind(null,o,h,t),[t]),o.flags|=2048,xs(9,{destroy:void 0},sg.bind(null,o,h,a,n),null),a},useId:function(){var t=Vn(),n=Wt.identifierPrefix;if(yt){var a=Xi,o=ki;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=$l++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=$S++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:zf,useFormState:gg,useActionState:gg,useOptimistic:function(t){var n=Vn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Ff.bind(null,lt,!0,a),a.dispatch=n,[t,n]},useMemoCache:wf,useCacheRefresh:function(){return Vn().memoizedState=ry.bind(null,lt)},useEffectEvent:function(t){var n=Vn(),a={impl:t};return n.memoizedState=a,function(){if((Dt&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},Hf={readContext:Ln,use:tu,useCallback:Rg,useContext:Ln,useEffect:Of,useImperativeHandle:Ag,useInsertionEffect:Eg,useLayoutEffect:bg,useMemo:Cg,useReducer:nu,useRef:Sg,useState:function(){return nu(da)},useDebugValue:Pf,useDeferredValue:function(t,n){var a=pn();return wg(a,Ht.memoizedState,t,n)},useTransition:function(){var t=nu(da)[0],n=pn().memoizedState;return[typeof t=="boolean"?t:Lo(t),n]},useSyncExternalStore:ag,useId:Ng,useHostTransitionStatus:zf,useFormState:_g,useActionState:_g,useOptimistic:function(t,n){var a=pn();return cg(a,Ht,t,n)},useMemoCache:wf,useCacheRefresh:Og};Hf.useEffectEvent=Mg;var Fg={readContext:Ln,use:tu,useCallback:Rg,useContext:Ln,useEffect:Of,useImperativeHandle:Ag,useInsertionEffect:Eg,useLayoutEffect:bg,useMemo:Cg,useReducer:Uf,useRef:Sg,useState:function(){return Uf(da)},useDebugValue:Pf,useDeferredValue:function(t,n){var a=pn();return Ht===null?If(a,t,n):wg(a,Ht.memoizedState,t,n)},useTransition:function(){var t=Uf(da)[0],n=pn().memoizedState;return[typeof t=="boolean"?t:Lo(t),n]},useSyncExternalStore:ag,useId:Ng,useHostTransitionStatus:zf,useFormState:xg,useActionState:xg,useOptimistic:function(t,n){var a=pn();return Ht!==null?cg(a,Ht,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:wf,useCacheRefresh:Og};Fg.useEffectEvent=Mg;function Gf(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Vf={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ci(),c=qa(o);c.payload=n,a!=null&&(c.callback=a),n=Ya(t,c,o),n!==null&&(jn(n,t,o),Co(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ci(),c=qa(o);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Ya(t,c,o),n!==null&&(jn(n,t,o),Co(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ci(),o=qa(a);o.tag=2,n!=null&&(o.callback=n),n=Ya(t,o,a),n!==null&&(jn(n,t,a),Co(n,t,a))}};function Hg(t,n,a,o,c,h,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,h,y):n.prototype&&n.prototype.isPureReactComponent?!So(a,o)||!So(c,h):!0}function Gg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&Vf.enqueueReplaceState(n,n.state,null)}function Br(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=v({},a));for(var c in t)a[c]===void 0&&(a[c]=t[c])}return a}function Vg(t){Bl(t)}function kg(t){console.error(t)}function Xg(t){Bl(t)}function su(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Wg(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function kf(t,n,a){return a=qa(a),a.tag=3,a.payload={element:null},a.callback=function(){su(t,n)},a}function qg(t){return t=qa(t),t.tag=3,t}function Yg(t,n,a,o){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var h=o.value;t.payload=function(){return c(h)},t.callback=function(){Wg(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(t.callback=function(){Wg(n,a,o),typeof c!="function"&&($a===null?$a=new Set([this]):$a.add(this));var w=o.stack;this.componentDidCatch(o.value,{componentStack:w!==null?w:""})})}function oy(t,n,a,o,c){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&fs(n,a,c,!0),a=si.current,a!==null){switch(a.tag){case 31:case 13:return Si===null?vu():a.alternate===null&&cn===0&&(cn=3),a.flags&=-257,a.flags|=65536,a.lanes=c,o===Yl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),ph(t,o,c)),!1;case 22:return a.flags|=65536,o===Yl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),ph(t,o,c)),!1}throw Error(r(435,a.tag))}return ph(t,o,c),vu(),!1}if(yt)return n=si.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,o!==lf&&(t=Error(r(422),{cause:o}),Eo(gi(t,a)))):(o!==lf&&(n=Error(r(423),{cause:o}),Eo(gi(n,a))),t=t.current.alternate,t.flags|=65536,c&=-c,t.lanes|=c,o=gi(o,a),c=kf(t.stateNode,o,c),xf(t,c),cn!==4&&(cn=2)),!1;var h=Error(r(520),{cause:o});if(h=gi(h,a),Vo===null?Vo=[h]:Vo.push(h),cn!==4&&(cn=2),n===null)return!0;o=gi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=c&-c,a.lanes|=t,t=kf(a.stateNode,o,t),xf(a,t),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&($a===null||!$a.has(h))))return a.flags|=65536,c&=-c,a.lanes|=c,c=qg(c),Yg(c,t,a,o),xf(a,c),!1}a=a.return}while(a!==null);return!1}var Xf=Error(r(461)),xn=!1;function Nn(t,n,a,o){n.child=t===null?Jm(n,null,a,o):Pr(n,t.child,a,o)}function Zg(t,n,a,o,c){a=a.render;var h=n.ref;if("ref"in o){var y={};for(var w in o)w!=="ref"&&(y[w]=o[w])}else y=o;return Ur(n),o=Tf(t,n,a,y,h,c),w=Af(),t!==null&&!xn?(Rf(t,n,c),pa(t,n,c)):(yt&&w&&sf(n),n.flags|=1,Nn(t,n,o,c),n.child)}function Kg(t,n,a,o,c){if(t===null){var h=a.type;return typeof h=="function"&&!nf(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,Qg(t,n,h,o,c)):(t=Gl(a.type,null,o,n,n.mode,c),t.ref=n.ref,t.return=n,n.child=t)}if(h=t.child,!jf(t,c)){var y=h.memoizedProps;if(a=a.compare,a=a!==null?a:So,a(y,o)&&t.ref===n.ref)return pa(t,n,c)}return n.flags|=1,t=la(h,o),t.ref=n.ref,t.return=n,n.child=t}function Qg(t,n,a,o,c){if(t!==null){var h=t.memoizedProps;if(So(h,o)&&t.ref===n.ref)if(xn=!1,n.pendingProps=o=h,jf(t,c))(t.flags&131072)!==0&&(xn=!0);else return n.lanes=t.lanes,pa(t,n,c)}return Wf(t,n,a,o,c)}function Jg(t,n,a,o){var c=o.children,h=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,t!==null){for(o=n.child=t.child,c=0;o!==null;)c=c|o.lanes|o.childLanes,o=o.sibling;o=c&~h}else o=0,n.child=null;return jg(t,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Wl(n,h!==null?h.cachePool:null),h!==null?eg(n,h):yf(),tg(n);else return o=n.lanes=536870912,jg(t,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Wl(n,h.cachePool),eg(n,h),Ka(),n.memoizedState=null):(t!==null&&Wl(n,null),yf(),Ka());return Nn(t,n,c,a),n.child}function Po(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function jg(t,n,a,o,c){var h=mf();return h=h===null?null:{parent:_n._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},t!==null&&Wl(n,null),yf(),tg(n),t!==null&&fs(t,n,o,!0),n.childLanes=c,null}function ou(t,n){return n=uu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function $g(t,n,a){return Pr(n,t.child,null,a),t=ou(n,n.pendingProps),t.flags|=2,oi(n),n.memoizedState=null,t}function ly(t,n,a){var o=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(yt){if(o.mode==="hidden")return t=ou(n,o),n.lanes=536870912,Po(null,t);if(Ef(n),(t=Zt)?(t=f_(t,xi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ga!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=Im(t),a.return=n,n.child=a,Un=n,Zt=null)):t=null,t===null)throw ka(n);return n.lanes=536870912,null}return ou(n,o)}var h=t.memoizedState;if(h!==null){var y=h.dehydrated;if(Ef(n),c)if(n.flags&256)n.flags&=-257,n=$g(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(r(558));else if(xn||fs(t,n,a,!1),c=(a&t.childLanes)!==0,xn||c){if(o=Wt,o!==null&&(y=ti(o,a),y!==0&&y!==h.retryLane))throw h.retryLane=y,Rr(t,y),jn(o,t,y),Xf;vu(),n=$g(t,n,a)}else t=h.treeContext,Zt=yi(y.nextSibling),Un=n,yt=!0,Va=null,xi=!1,t!==null&&Fm(n,t),n=ou(n,o),n.flags|=4096;return n}return t=la(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function lu(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Wf(t,n,a,o,c){return Ur(n),a=Tf(t,n,a,o,void 0,c),o=Af(),t!==null&&!xn?(Rf(t,n,c),pa(t,n,c)):(yt&&o&&sf(n),n.flags|=1,Nn(t,n,a,c),n.child)}function e0(t,n,a,o,c,h){return Ur(n),n.updateQueue=null,a=ig(n,o,a,c),ng(t),o=Af(),t!==null&&!xn?(Rf(t,n,h),pa(t,n,h)):(yt&&o&&sf(n),n.flags|=1,Nn(t,n,a,h),n.child)}function t0(t,n,a,o,c){if(Ur(n),n.stateNode===null){var h=os,y=a.contextType;typeof y=="object"&&y!==null&&(h=Ln(y)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Vf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},_f(n),y=a.contextType,h.context=typeof y=="object"&&y!==null?Ln(y):os,h.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(Gf(n,a,y,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Vf.enqueueReplaceState(h,h.state,null),Do(n,o,h,c),wo(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){h=n.stateNode;var w=n.memoizedProps,G=Br(a,w);h.props=G;var te=h.context,me=a.contextType;y=os,typeof me=="object"&&me!==null&&(y=Ln(me));var xe=a.getDerivedStateFromProps;me=typeof xe=="function"||typeof h.getSnapshotBeforeUpdate=="function",w=n.pendingProps!==w,me||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(w||te!==y)&&Gg(n,h,o,y),Wa=!1;var le=n.memoizedState;h.state=le,Do(n,o,h,c),wo(),te=n.memoizedState,w||le!==te||Wa?(typeof xe=="function"&&(Gf(n,a,xe,o),te=n.memoizedState),(G=Wa||Hg(n,a,G,o,le,te,y))?(me||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=te),h.props=o,h.state=te,h.context=y,o=G):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,vf(t,n),y=n.memoizedProps,me=Br(a,y),h.props=me,xe=n.pendingProps,le=h.context,te=a.contextType,G=os,typeof te=="object"&&te!==null&&(G=Ln(te)),w=a.getDerivedStateFromProps,(te=typeof w=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==xe||le!==G)&&Gg(n,h,o,G),Wa=!1,le=n.memoizedState,h.state=le,Do(n,o,h,c),wo();var ce=n.memoizedState;y!==xe||le!==ce||Wa||t!==null&&t.dependencies!==null&&kl(t.dependencies)?(typeof w=="function"&&(Gf(n,a,w,o),ce=n.memoizedState),(me=Wa||Hg(n,a,me,o,le,ce,G)||t!==null&&t.dependencies!==null&&kl(t.dependencies))?(te||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ce,G),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ce,G)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ce),h.props=o,h.state=ce,h.context=G,o=me):(typeof h.componentDidUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),o=!1)}return h=o,lu(t,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,t!==null&&o?(n.child=Pr(n,t.child,null,c),n.child=Pr(n,null,a,c)):Nn(t,n,a,c),n.memoizedState=h.state,t=n.child):t=pa(t,n,c),t}function n0(t,n,a,o){return wr(),n.flags|=256,Nn(t,n,a,o),n.child}var qf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(t){return{baseLanes:t,cachePool:Wm()}}function Zf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ui),t}function i0(t,n,a){var o=n.pendingProps,c=!1,h=(n.flags&128)!==0,y;if((y=h)||(y=t!==null&&t.memoizedState===null?!1:(dn.current&2)!==0),y&&(c=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,t===null){if(yt){if(c?Za(n):Ka(),(t=Zt)?(t=f_(t,xi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ga!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=Im(t),a.return=n,n.child=a,Un=n,Zt=null)):t=null,t===null)throw ka(n);return Dh(t)?n.lanes=32:n.lanes=536870912,null}var w=o.children;return o=o.fallback,c?(Ka(),c=n.mode,w=uu({mode:"hidden",children:w},c),o=Cr(o,c,a,null),w.return=n,o.return=n,w.sibling=o,n.child=w,o=n.child,o.memoizedState=Yf(a),o.childLanes=Zf(t,y,a),n.memoizedState=qf,Po(null,o)):(Za(n),Kf(n,w))}var G=t.memoizedState;if(G!==null&&(w=G.dehydrated,w!==null)){if(h)n.flags&256?(Za(n),n.flags&=-257,n=Qf(t,n,a)):n.memoizedState!==null?(Ka(),n.child=t.child,n.flags|=128,n=null):(Ka(),w=o.fallback,c=n.mode,o=uu({mode:"visible",children:o.children},c),w=Cr(w,c,a,null),w.flags|=2,o.return=n,w.return=n,o.sibling=w,n.child=o,Pr(n,t.child,null,a),o=n.child,o.memoizedState=Yf(a),o.childLanes=Zf(t,y,a),n.memoizedState=qf,n=Po(null,o));else if(Za(n),Dh(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var te=y.dgst;y=te,o=Error(r(419)),o.stack="",o.digest=y,Eo({value:o,source:null,stack:null}),n=Qf(t,n,a)}else if(xn||fs(t,n,a,!1),y=(a&t.childLanes)!==0,xn||y){if(y=Wt,y!==null&&(o=ti(y,a),o!==0&&o!==G.retryLane))throw G.retryLane=o,Rr(t,o),jn(y,t,o),Xf;wh(w)||vu(),n=Qf(t,n,a)}else wh(w)?(n.flags|=192,n.child=t.child,n=null):(t=G.treeContext,Zt=yi(w.nextSibling),Un=n,yt=!0,Va=null,xi=!1,t!==null&&Fm(n,t),n=Kf(n,o.children),n.flags|=4096);return n}return c?(Ka(),w=o.fallback,c=n.mode,G=t.child,te=G.sibling,o=la(G,{mode:"hidden",children:o.children}),o.subtreeFlags=G.subtreeFlags&65011712,te!==null?w=la(te,w):(w=Cr(w,c,a,null),w.flags|=2),w.return=n,o.return=n,o.sibling=w,n.child=o,Po(null,o),o=n.child,w=t.child.memoizedState,w===null?w=Yf(a):(c=w.cachePool,c!==null?(G=_n._currentValue,c=c.parent!==G?{parent:G,pool:G}:c):c=Wm(),w={baseLanes:w.baseLanes|a,cachePool:c}),o.memoizedState=w,o.childLanes=Zf(t,y,a),n.memoizedState=qf,Po(t.child,o)):(Za(n),a=t.child,t=a.sibling,a=la(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(y=n.deletions,y===null?(n.deletions=[t],n.flags|=16):y.push(t)),n.child=a,n.memoizedState=null,a)}function Kf(t,n){return n=uu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function uu(t,n){return t=ri(22,t,null,n),t.lanes=0,t}function Qf(t,n,a){return Pr(n,t.child,null,a),t=Kf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function a0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),ff(t.return,n,a)}function Jf(t,n,a,o,c,h){var y=t.memoizedState;y===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:c,treeForkCount:h}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=c,y.treeForkCount=h)}function r0(t,n,a){var o=n.pendingProps,c=o.revealOrder,h=o.tail;o=o.children;var y=dn.current,w=(y&2)!==0;if(w?(y=y&1|2,n.flags|=128):y&=1,Ee(dn,y),Nn(t,n,o,a),o=yt?Mo:0,!w&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&a0(t,a,n);else if(t.tag===19)a0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)t=a.alternate,t!==null&&Jl(t)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),Jf(n,!1,c,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(t=c.alternate,t!==null&&Jl(t)===null){n.child=c;break}t=c.sibling,c.sibling=a,a=c,c=t}Jf(n,!0,a,null,h,o);break;case"together":Jf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function pa(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ja|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(fs(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(r(153));if(n.child!==null){for(t=n.child,a=la(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=la(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function jf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&kl(t)))}function uy(t,n,a){switch(n.tag){case 3:Me(n,n.stateNode.containerInfo),Xa(n,_n,t.memoizedState.cache),wr();break;case 27:case 5:tt(n);break;case 4:Me(n,n.stateNode.containerInfo);break;case 10:Xa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Ef(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Za(n),n.flags|=128,null):(a&n.child.childLanes)!==0?i0(t,n,a):(Za(n),t=pa(t,n,a),t!==null?t.sibling:null);Za(n);break;case 19:var c=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(fs(t,n,a,!1),o=(a&n.childLanes)!==0),c){if(o)return r0(t,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Ee(dn,dn.current),o)break;return null;case 22:return n.lanes=0,Jg(t,n,a,n.pendingProps);case 24:Xa(n,_n,t.memoizedState.cache)}return pa(t,n,a)}function s0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)xn=!0;else{if(!jf(t,a)&&(n.flags&128)===0)return xn=!1,uy(t,n,a);xn=(t.flags&131072)!==0}else xn=!1,yt&&(n.flags&1048576)!==0&&zm(n,Mo,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=Nr(n.elementType),n.type=t,typeof t=="function")nf(t)?(o=Br(t,o),n.tag=1,n=t0(null,n,t,o,a)):(n.tag=0,n=Wf(null,n,t,o,a));else{if(t!=null){var c=t.$$typeof;if(c===C){n.tag=11,n=Zg(null,n,t,o,a);break e}else if(c===O){n.tag=14,n=Kg(null,n,t,o,a);break e}}throw n=ue(t)||t,Error(r(306,n,""))}}return n;case 0:return Wf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,c=Br(o,n.pendingProps),t0(t,n,o,c,a);case 3:e:{if(Me(n,n.stateNode.containerInfo),t===null)throw Error(r(387));o=n.pendingProps;var h=n.memoizedState;c=h.element,vf(t,n),Do(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Xa(n,_n,o),o!==h.cache&&hf(n,[_n],a,!0),wo(),o=y.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=n0(t,n,o,a);break e}else if(o!==c){c=gi(Error(r(424)),n),Eo(c),n=n0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,Zt=yi(t.firstChild),Un=n,yt=!0,Va=null,xi=!0,a=Jm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(wr(),o===c){n=pa(t,n,a);break e}Nn(t,n,o,a)}n=n.child}return n;case 26:return lu(t,n),t===null?(a=__(n.type,null,n.pendingProps,null))?n.memoizedState=a:yt||(a=n.type,t=n.pendingProps,o=Tu(re.current).createElement(a),o[mn]=n,o[Dn]=t,On(o,a,t),gn(o),n.stateNode=o):n.memoizedState=__(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return tt(n),t===null&&yt&&(o=n.stateNode=p_(n.type,n.pendingProps,re.current),Un=n,xi=!0,c=Zt,ir(n.type)?(Uh=c,Zt=yi(o.firstChild)):Zt=c),Nn(t,n,n.pendingProps.children,a),lu(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&yt&&((c=o=Zt)&&(o=Fy(o,n.type,n.pendingProps,xi),o!==null?(n.stateNode=o,Un=n,Zt=yi(o.firstChild),xi=!1,c=!0):c=!1),c||ka(n)),tt(n),c=n.type,h=n.pendingProps,y=t!==null?t.memoizedProps:null,o=h.children,Ah(c,h)?o=null:y!==null&&Ah(c,y)&&(n.flags|=32),n.memoizedState!==null&&(c=Tf(t,n,ey,null,null,a),Qo._currentValue=c),lu(t,n),Nn(t,n,o,a),n.child;case 6:return t===null&&yt&&((t=a=Zt)&&(a=Hy(a,n.pendingProps,xi),a!==null?(n.stateNode=a,Un=n,Zt=null,t=!0):t=!1),t||ka(n)),null;case 13:return i0(t,n,a);case 4:return Me(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Pr(n,null,o,a):Nn(t,n,o,a),n.child;case 11:return Zg(t,n,n.type,n.pendingProps,a);case 7:return Nn(t,n,n.pendingProps,a),n.child;case 8:return Nn(t,n,n.pendingProps.children,a),n.child;case 12:return Nn(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Xa(n,n.type,o.value),Nn(t,n,o.children,a),n.child;case 9:return c=n.type._context,o=n.pendingProps.children,Ur(n),c=Ln(c),o=o(c),n.flags|=1,Nn(t,n,o,a),n.child;case 14:return Kg(t,n,n.type,n.pendingProps,a);case 15:return Qg(t,n,n.type,n.pendingProps,a);case 19:return r0(t,n,a);case 31:return ly(t,n,a);case 22:return Jg(t,n,a,n.pendingProps);case 24:return Ur(n),o=Ln(_n),t===null?(c=mf(),c===null&&(c=Wt,h=df(),c.pooledCache=h,h.refCount++,h!==null&&(c.pooledCacheLanes|=a),c=h),n.memoizedState={parent:o,cache:c},_f(n),Xa(n,_n,c)):((t.lanes&a)!==0&&(vf(t,n),Do(n,null,null,a),wo()),c=t.memoizedState,h=n.memoizedState,c.parent!==o?(c={parent:o,cache:o},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Xa(n,_n,o)):(o=h.cache,Xa(n,_n,o),o!==c.cache&&hf(n,[_n],a,!0))),Nn(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function ma(t){t.flags|=4}function $f(t,n,a,o,c){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(c&335544128)===c)if(t.stateNode.complete)t.flags|=8192;else if(N0())t.flags|=8192;else throw Or=Yl,gf}else t.flags&=-16777217}function o0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!M_(n))if(N0())t.flags|=8192;else throw Or=Yl,gf}function cu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?ye():536870912,t.lanes|=n,Es|=n)}function Io(t,n){if(!yt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Kt(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var c=t.child;c!==null;)a|=c.lanes|c.childLanes,o|=c.subtreeFlags&65011712,o|=c.flags&65011712,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)a|=c.lanes|c.childLanes,o|=c.subtreeFlags,o|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function cy(t,n,a){var o=n.pendingProps;switch(of(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(n),null;case 1:return Kt(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),fa(_n),He(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(cs(n)?ma(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,uf())),Kt(n),null;case 26:var c=n.type,h=n.memoizedState;return t===null?(ma(n),h!==null?(Kt(n),o0(n,h)):(Kt(n),$f(n,c,null,o,a))):h?h!==t.memoizedState?(ma(n),Kt(n),o0(n,h)):(Kt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&ma(n),Kt(n),$f(n,c,t,o,a)),null;case 27:if(Qe(n),a=re.current,c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ma(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Kt(n),null}t=Ce.current,cs(n)?Hm(n):(t=p_(c,o,a),n.stateNode=t,ma(n))}return Kt(n),null;case 5:if(Qe(n),c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ma(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Kt(n),null}if(h=Ce.current,cs(n))Hm(n);else{var y=Tu(re.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?y.createElement(c,{is:o.is}):y.createElement(c)}}h[mn]=n,h[Dn]=o;e:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break e;for(;y.sibling===null;){if(y.return===null||y.return===n)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=h;e:switch(On(h,c,o),c){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ma(n)}}return Kt(n),$f(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&ma(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(t=re.current,cs(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,c=Un,c!==null)switch(c.tag){case 27:case 5:o=c.memoizedProps}t[mn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||i_(t.nodeValue,a)),t||ka(n,!0)}else t=Tu(t).createTextNode(o),t[mn]=n,n.stateNode=t}return Kt(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=cs(n),a!==null){if(t===null){if(!o)throw Error(r(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[mn]=n}else wr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Kt(n),t=!1}else a=uf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(oi(n),n):(oi(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Kt(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(c=cs(n),o!==null&&o.dehydrated!==null){if(t===null){if(!c)throw Error(r(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(r(317));c[mn]=n}else wr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Kt(n),c=!1}else c=uf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(oi(n),n):(oi(n),null)}return oi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,c=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(c=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==c&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),cu(n,n.updateQueue),Kt(n),null);case 4:return He(),t===null&&yh(n.stateNode.containerInfo),Kt(n),null;case 10:return fa(n.type),Kt(n),null;case 19:if(Q(dn),o=n.memoizedState,o===null)return Kt(n),null;if(c=(n.flags&128)!==0,h=o.rendering,h===null)if(c)Io(o,!1);else{if(cn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(h=Jl(t),h!==null){for(n.flags|=128,Io(o,!1),t=h.updateQueue,n.updateQueue=t,cu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Pm(a,t),a=a.sibling;return Ee(dn,dn.current&1|2),yt&&ua(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ft()>mu&&(n.flags|=128,c=!0,Io(o,!1),n.lanes=4194304)}else{if(!c)if(t=Jl(h),t!==null){if(n.flags|=128,c=!0,t=t.updateQueue,n.updateQueue=t,cu(n,t),Io(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!yt)return Kt(n),null}else 2*Ft()-o.renderingStartTime>mu&&a!==536870912&&(n.flags|=128,c=!0,Io(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(t=o.last,t!==null?t.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ft(),t.sibling=null,a=dn.current,Ee(dn,c?a&1|2:a&1),yt&&ua(n,o.treeForkCount),t):(Kt(n),null);case 22:case 23:return oi(n),Mf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Kt(n),n.subtreeFlags&6&&(n.flags|=8192)):Kt(n),a=n.updateQueue,a!==null&&cu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Q(Lr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),fa(_n),Kt(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function fy(t,n){switch(of(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return fa(_n),He(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Qe(n),null;case 31:if(n.memoizedState!==null){if(oi(n),n.alternate===null)throw Error(r(340));wr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(oi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(r(340));wr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Q(dn),null;case 4:return He(),null;case 10:return fa(n.type),null;case 22:case 23:return oi(n),Mf(),t!==null&&Q(Lr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return fa(_n),null;case 25:return null;default:return null}}function l0(t,n){switch(of(n),n.tag){case 3:fa(_n),He();break;case 26:case 27:case 5:Qe(n);break;case 4:He();break;case 31:n.memoizedState!==null&&oi(n);break;case 13:oi(n);break;case 19:Q(dn);break;case 10:fa(n.type);break;case 22:case 23:oi(n),Mf(),t!==null&&Q(Lr);break;case 24:fa(_n)}}function Bo(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var c=o.next;a=c;do{if((a.tag&t)===t){o=void 0;var h=a.create,y=a.inst;o=h(),y.destroy=o}a=a.next}while(a!==c)}}catch(w){Bt(n,n.return,w)}}function Qa(t,n,a){try{var o=n.updateQueue,c=o!==null?o.lastEffect:null;if(c!==null){var h=c.next;o=h;do{if((o.tag&t)===t){var y=o.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,c=n;var G=a,te=w;try{te()}catch(me){Bt(c,G,me)}}}o=o.next}while(o!==h)}}catch(me){Bt(n,n.return,me)}}function u0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{$m(n,a)}catch(o){Bt(t,t.return,o)}}}function c0(t,n,a){a.props=Br(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Bt(t,n,o)}}function zo(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(c){Bt(t,n,c)}}function Wi(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(c){Bt(t,n,c)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){Bt(t,n,c)}else a.current=null}function f0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(c){Bt(t,t.return,c)}}function eh(t,n,a){try{var o=t.stateNode;Ny(o,t.type,a,n),o[Dn]=n}catch(c){Bt(t,t.return,c)}}function h0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ir(t.type)||t.tag===4}function th(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||h0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ir(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function nh(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=sa));else if(o!==4&&(o===27&&ir(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(nh(t,n,a),t=t.sibling;t!==null;)nh(t,n,a),t=t.sibling}function fu(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&ir(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(fu(t,n,a),t=t.sibling;t!==null;)fu(t,n,a),t=t.sibling}function d0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);On(n,o,a),n[mn]=t,n[Dn]=a}catch(h){Bt(t,t.return,h)}}var ga=!1,Sn=!1,ih=!1,p0=typeof WeakSet=="function"?WeakSet:Set,Rn=null;function hy(t,n){if(t=t.containerInfo,bh=Lu,t=Am(t),Kc(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var c=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break e}var y=0,w=-1,G=-1,te=0,me=0,xe=t,le=null;t:for(;;){for(var ce;xe!==a||c!==0&&xe.nodeType!==3||(w=y+c),xe!==h||o!==0&&xe.nodeType!==3||(G=y+o),xe.nodeType===3&&(y+=xe.nodeValue.length),(ce=xe.firstChild)!==null;)le=xe,xe=ce;for(;;){if(xe===t)break t;if(le===a&&++te===c&&(w=y),le===h&&++me===o&&(G=y),(ce=xe.nextSibling)!==null)break;xe=le,le=xe.parentNode}xe=ce}a=w===-1||G===-1?null:{start:w,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(Th={focusedElem:t,selectionRange:a},Lu=!1,Rn=n;Rn!==null;)if(n=Rn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Rn=t;else for(;Rn!==null;){switch(n=Rn,h=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)c=t[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&h!==null){t=void 0,a=n,c=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var We=Br(a.type,c);t=o.getSnapshotBeforeUpdate(We,h),o.__reactInternalSnapshotBeforeUpdate=t}catch(et){Bt(a,a.return,et)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Ch(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Ch(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=n.sibling,t!==null){t.return=n.return,Rn=t;break}Rn=n.return}}function m0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:va(t,a),o&4&&Bo(5,a);break;case 1:if(va(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(y){Bt(a,a.return,y)}else{var c=Br(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(c,n,t.__reactInternalSnapshotBeforeUpdate)}catch(y){Bt(a,a.return,y)}}o&64&&u0(a),o&512&&zo(a,a.return);break;case 3:if(va(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{$m(t,n)}catch(y){Bt(a,a.return,y)}}break;case 27:n===null&&o&4&&d0(a);case 26:case 5:va(t,a),n===null&&o&4&&f0(a),o&512&&zo(a,a.return);break;case 12:va(t,a);break;case 31:va(t,a),o&4&&v0(t,a);break;case 13:va(t,a),o&4&&x0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=yy.bind(null,a),Gy(t,a))));break;case 22:if(o=a.memoizedState!==null||ga,!o){n=n!==null&&n.memoizedState!==null||Sn,c=ga;var h=Sn;ga=o,(Sn=n)&&!h?xa(t,a,(a.subtreeFlags&8772)!==0):va(t,a),ga=c,Sn=h}break;case 30:break;default:va(t,a)}}function g0(t){var n=t.alternate;n!==null&&(t.alternate=null,g0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Ba(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var $t=null,Zn=!1;function _a(t,n,a){for(a=a.child;a!==null;)_0(t,n,a),a=a.sibling}function _0(t,n,a){if(pe&&typeof pe.onCommitFiberUnmount=="function")try{pe.onCommitFiberUnmount(he,a)}catch{}switch(a.tag){case 26:Sn||Wi(a,n),_a(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Sn||Wi(a,n);var o=$t,c=Zn;ir(a.type)&&($t=a.stateNode,Zn=!1),_a(t,n,a),Yo(a.stateNode),$t=o,Zn=c;break;case 5:Sn||Wi(a,n);case 6:if(o=$t,c=Zn,$t=null,_a(t,n,a),$t=o,Zn=c,$t!==null)if(Zn)try{($t.nodeType===9?$t.body:$t.nodeName==="HTML"?$t.ownerDocument.body:$t).removeChild(a.stateNode)}catch(h){Bt(a,n,h)}else try{$t.removeChild(a.stateNode)}catch(h){Bt(a,n,h)}break;case 18:$t!==null&&(Zn?(t=$t,u_(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Us(t)):u_($t,a.stateNode));break;case 4:o=$t,c=Zn,$t=a.stateNode.containerInfo,Zn=!0,_a(t,n,a),$t=o,Zn=c;break;case 0:case 11:case 14:case 15:Qa(2,a,n),Sn||Qa(4,a,n),_a(t,n,a);break;case 1:Sn||(Wi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&c0(a,n,o)),_a(t,n,a);break;case 21:_a(t,n,a);break;case 22:Sn=(o=Sn)||a.memoizedState!==null,_a(t,n,a),Sn=o;break;default:_a(t,n,a)}}function v0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Us(t)}catch(a){Bt(n,n.return,a)}}}function x0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Us(t)}catch(a){Bt(n,n.return,a)}}function dy(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new p0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new p0),n;default:throw Error(r(435,t.tag))}}function hu(t,n){var a=dy(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var c=My.bind(null,t,o);o.then(c,c)}})}function Kn(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var c=a[o],h=t,y=n,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(ir(w.type)){$t=w.stateNode,Zn=!1;break e}break;case 5:$t=w.stateNode,Zn=!1;break e;case 3:case 4:$t=w.stateNode.containerInfo,Zn=!0;break e}w=w.return}if($t===null)throw Error(r(160));_0(h,y,c),$t=null,Zn=!1,h=c.alternate,h!==null&&(h.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)S0(n,t),n=n.sibling}var Ui=null;function S0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Kn(n,t),Qn(t),o&4&&(Qa(3,t,t.return),Bo(3,t),Qa(5,t,t.return));break;case 1:Kn(n,t),Qn(t),o&512&&(Sn||a===null||Wi(a,a.return)),o&64&&ga&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var c=Ui;if(Kn(n,t),Qn(t),o&512&&(Sn||a===null||Wi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,c=c.ownerDocument||c;t:switch(o){case"title":h=c.getElementsByTagName("title")[0],(!h||h[Ia]||h[mn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=c.createElement(o),c.head.insertBefore(h,c.querySelector("head > title"))),On(h,o,a),h[mn]=t,gn(h),o=h;break e;case"link":var y=S_("link","href",c).get(o+(a.href||""));if(y){for(var w=0;w<y.length;w++)if(h=y[w],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(w,1);break t}}h=c.createElement(o),On(h,o,a),c.head.appendChild(h);break;case"meta":if(y=S_("meta","content",c).get(o+(a.content||""))){for(w=0;w<y.length;w++)if(h=y[w],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(w,1);break t}}h=c.createElement(o),On(h,o,a),c.head.appendChild(h);break;default:throw Error(r(468,o))}h[mn]=t,gn(h),o=h}t.stateNode=o}else y_(c,t.type,t.stateNode);else t.stateNode=x_(c,o,t.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?y_(c,t.type,t.stateNode):x_(c,o,t.memoizedProps)):o===null&&t.stateNode!==null&&eh(t,t.memoizedProps,a.memoizedProps)}break;case 27:Kn(n,t),Qn(t),o&512&&(Sn||a===null||Wi(a,a.return)),a!==null&&o&4&&eh(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Kn(n,t),Qn(t),o&512&&(Sn||a===null||Wi(a,a.return)),t.flags&32){c=t.stateNode;try{ii(c,"")}catch(We){Bt(t,t.return,We)}}o&4&&t.stateNode!=null&&(c=t.memoizedProps,eh(t,c,a!==null?a.memoizedProps:c)),o&1024&&(ih=!0);break;case 6:if(Kn(n,t),Qn(t),o&4){if(t.stateNode===null)throw Error(r(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(We){Bt(t,t.return,We)}}break;case 3:if(Cu=null,c=Ui,Ui=Au(n.containerInfo),Kn(n,t),Ui=c,Qn(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Us(n.containerInfo)}catch(We){Bt(t,t.return,We)}ih&&(ih=!1,y0(t));break;case 4:o=Ui,Ui=Au(t.stateNode.containerInfo),Kn(n,t),Qn(t),Ui=o;break;case 12:Kn(n,t),Qn(t);break;case 31:Kn(n,t),Qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,hu(t,o)));break;case 13:Kn(n,t),Qn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(pu=Ft()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,hu(t,o)));break;case 22:c=t.memoizedState!==null;var G=a!==null&&a.memoizedState!==null,te=ga,me=Sn;if(ga=te||c,Sn=me||G,Kn(n,t),Sn=me,ga=te,Qn(t),o&8192)e:for(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||G||ga||Sn||zr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){G=a=n;try{if(h=G.stateNode,c)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=G.stateNode;var xe=G.memoizedProps.style,le=xe!=null&&xe.hasOwnProperty("display")?xe.display:null;w.style.display=le==null||typeof le=="boolean"?"":(""+le).trim()}}catch(We){Bt(G,G.return,We)}}}else if(n.tag===6){if(a===null){G=n;try{G.stateNode.nodeValue=c?"":G.memoizedProps}catch(We){Bt(G,G.return,We)}}}else if(n.tag===18){if(a===null){G=n;try{var ce=G.stateNode;c?c_(ce,!0):c_(G.stateNode,!1)}catch(We){Bt(G,G.return,We)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,hu(t,a))));break;case 19:Kn(n,t),Qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,hu(t,o)));break;case 30:break;case 21:break;default:Kn(n,t),Qn(t)}}function Qn(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(h0(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var c=a.stateNode,h=th(t);fu(t,h,c);break;case 5:var y=a.stateNode;a.flags&32&&(ii(y,""),a.flags&=-33);var w=th(t);fu(t,w,y);break;case 3:case 4:var G=a.stateNode.containerInfo,te=th(t);nh(t,te,G);break;default:throw Error(r(161))}}catch(me){Bt(t,t.return,me)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function y0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;y0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function va(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)m0(t,n.alternate,n),n=n.sibling}function zr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Qa(4,n,n.return),zr(n);break;case 1:Wi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&c0(n,n.return,a),zr(n);break;case 27:Yo(n.stateNode);case 26:case 5:Wi(n,n.return),zr(n);break;case 22:n.memoizedState===null&&zr(n);break;case 30:zr(n);break;default:zr(n)}t=t.sibling}}function xa(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,c=t,h=n,y=h.flags;switch(h.tag){case 0:case 11:case 15:xa(c,h,a),Bo(4,h);break;case 1:if(xa(c,h,a),o=h,c=o.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(te){Bt(o,o.return,te)}if(o=h,c=o.updateQueue,c!==null){var w=o.stateNode;try{var G=c.shared.hiddenCallbacks;if(G!==null)for(c.shared.hiddenCallbacks=null,c=0;c<G.length;c++)jm(G[c],w)}catch(te){Bt(o,o.return,te)}}a&&y&64&&u0(h),zo(h,h.return);break;case 27:d0(h);case 26:case 5:xa(c,h,a),a&&o===null&&y&4&&f0(h),zo(h,h.return);break;case 12:xa(c,h,a);break;case 31:xa(c,h,a),a&&y&4&&v0(c,h);break;case 13:xa(c,h,a),a&&y&4&&x0(c,h);break;case 22:h.memoizedState===null&&xa(c,h,a),zo(h,h.return);break;case 30:break;default:xa(c,h,a)}n=n.sibling}}function ah(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&bo(a))}function rh(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&bo(t))}function Li(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)M0(t,n,a,o),n=n.sibling}function M0(t,n,a,o){var c=n.flags;switch(n.tag){case 0:case 11:case 15:Li(t,n,a,o),c&2048&&Bo(9,n);break;case 1:Li(t,n,a,o);break;case 3:Li(t,n,a,o),c&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&bo(t)));break;case 12:if(c&2048){Li(t,n,a,o),t=n.stateNode;try{var h=n.memoizedProps,y=h.id,w=h.onPostCommit;typeof w=="function"&&w(y,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(G){Bt(n,n.return,G)}}else Li(t,n,a,o);break;case 31:Li(t,n,a,o);break;case 13:Li(t,n,a,o);break;case 23:break;case 22:h=n.stateNode,y=n.alternate,n.memoizedState!==null?h._visibility&2?Li(t,n,a,o):Fo(t,n):h._visibility&2?Li(t,n,a,o):(h._visibility|=2,Ss(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),c&2048&&ah(y,n);break;case 24:Li(t,n,a,o),c&2048&&rh(n.alternate,n);break;default:Li(t,n,a,o)}}function Ss(t,n,a,o,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=t,y=n,w=a,G=o,te=y.flags;switch(y.tag){case 0:case 11:case 15:Ss(h,y,w,G,c),Bo(8,y);break;case 23:break;case 22:var me=y.stateNode;y.memoizedState!==null?me._visibility&2?Ss(h,y,w,G,c):Fo(h,y):(me._visibility|=2,Ss(h,y,w,G,c)),c&&te&2048&&ah(y.alternate,y);break;case 24:Ss(h,y,w,G,c),c&&te&2048&&rh(y.alternate,y);break;default:Ss(h,y,w,G,c)}n=n.sibling}}function Fo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,c=o.flags;switch(o.tag){case 22:Fo(a,o),c&2048&&ah(o.alternate,o);break;case 24:Fo(a,o),c&2048&&rh(o.alternate,o);break;default:Fo(a,o)}n=n.sibling}}var Ho=8192;function ys(t,n,a){if(t.subtreeFlags&Ho)for(t=t.child;t!==null;)E0(t,n,a),t=t.sibling}function E0(t,n,a){switch(t.tag){case 26:ys(t,n,a),t.flags&Ho&&t.memoizedState!==null&&$y(a,Ui,t.memoizedState,t.memoizedProps);break;case 5:ys(t,n,a);break;case 3:case 4:var o=Ui;Ui=Au(t.stateNode.containerInfo),ys(t,n,a),Ui=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Ho,Ho=16777216,ys(t,n,a),Ho=o):ys(t,n,a));break;default:ys(t,n,a)}}function b0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Go(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Rn=o,A0(o,t)}b0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)T0(t),t=t.sibling}function T0(t){switch(t.tag){case 0:case 11:case 15:Go(t),t.flags&2048&&Qa(9,t,t.return);break;case 3:Go(t);break;case 12:Go(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,du(t)):Go(t);break;default:Go(t)}}function du(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Rn=o,A0(o,t)}b0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Qa(8,n,n.return),du(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,du(n));break;default:du(n)}t=t.sibling}}function A0(t,n){for(;Rn!==null;){var a=Rn;switch(a.tag){case 0:case 11:case 15:Qa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:bo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Rn=o;else e:for(a=t;Rn!==null;){o=Rn;var c=o.sibling,h=o.return;if(g0(o),o===a){Rn=null;break e}if(c!==null){c.return=h,Rn=c;break e}Rn=h}}}var py={getCacheForType:function(t){var n=Ln(_n),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Ln(_n).controller.signal}},my=typeof WeakMap=="function"?WeakMap:Map,Dt=0,Wt=null,pt=null,_t=0,It=0,li=null,Ja=!1,Ms=!1,sh=!1,Sa=0,cn=0,ja=0,Fr=0,oh=0,ui=0,Es=0,Vo=null,Jn=null,lh=!1,pu=0,R0=0,mu=1/0,gu=null,$a=null,bn=0,er=null,bs=null,ya=0,uh=0,ch=null,C0=null,ko=0,fh=null;function ci(){return(Dt&2)!==0&&_t!==0?_t&-_t:z.T!==null?_h():fo()}function w0(){if(ui===0)if((_t&536870912)===0||yt){var t=it;it<<=1,(it&3932160)===0&&(it=262144),ui=t}else ui=536870912;return t=si.current,t!==null&&(t.flags|=32),ui}function jn(t,n,a){(t===Wt&&(It===2||It===9)||t.cancelPendingCommit!==null)&&(Ts(t,0),tr(t,_t,ui,!1)),Ve(t,a),((Dt&2)===0||t!==Wt)&&(t===Wt&&((Dt&2)===0&&(Fr|=a),cn===4&&tr(t,_t,ui,!1)),qi(t))}function D0(t,n,a){if((Dt&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||we(t,n),c=o?vy(t,n):dh(t,n,!0),h=o;do{if(c===0){Ms&&!o&&tr(t,n,0,!1);break}else{if(a=t.current.alternate,h&&!gy(a)){c=dh(t,n,!1),h=!1;continue}if(c===2){if(h=n,t.errorRecoveryDisabledLanes&h)var y=0;else y=t.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;e:{var w=t;c=Vo;var G=w.current.memoizedState.isDehydrated;if(G&&(Ts(w,y).flags|=256),y=dh(w,y,!1),y!==2){if(sh&&!G){w.errorRecoveryDisabledLanes|=h,Fr|=h,c=4;break e}h=Jn,Jn=c,h!==null&&(Jn===null?Jn=h:Jn.push.apply(Jn,h))}c=y}if(h=!1,c!==2)continue}}if(c===1){Ts(t,0),tr(t,n,0,!0);break}e:{switch(o=t,h=c,h){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:tr(o,n,ui,!Ja);break e;case 2:Jn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(c=pu+300-Ft(),10<c)){if(tr(o,n,ui,!Ja),ge(o,0,!0)!==0)break e;ya=n,o.timeoutHandle=o_(U0.bind(null,o,a,Jn,gu,lh,n,ui,Fr,Es,Ja,h,"Throttled",-0,0),c);break e}U0(o,a,Jn,gu,lh,n,ui,Fr,Es,Ja,h,null,-0,0)}}break}while(!0);qi(t)}function U0(t,n,a,o,c,h,y,w,G,te,me,xe,le,ce){if(t.timeoutHandle=-1,xe=n.subtreeFlags,xe&8192||(xe&16785408)===16785408){xe={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sa},E0(n,h,xe);var We=(h&62914560)===h?pu-Ft():(h&4194048)===h?R0-Ft():0;if(We=eM(xe,We),We!==null){ya=h,t.cancelPendingCommit=We(F0.bind(null,t,n,h,a,o,c,y,w,G,me,xe,null,le,ce)),tr(t,h,y,!te);return}}F0(t,n,h,a,o,c,y,w,G)}function gy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var c=a[o],h=c.getSnapshot;c=c.value;try{if(!ai(h(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function tr(t,n,a,o){n&=~oh,n&=~Fr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var c=n;0<c;){var h=31-ze(c),y=1<<h;o[h]=-1,c&=~y}a!==0&&Lt(t,a,n)}function _u(){return(Dt&6)===0?(Xo(0),!1):!0}function hh(){if(pt!==null){if(It===0)var t=pt.return;else t=pt,ca=Dr=null,Cf(t),ms=null,Ao=0,t=pt;for(;t!==null;)l0(t.alternate,t),t=t.return;pt=null}}function Ts(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Iy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ya=0,hh(),Wt=t,pt=a=la(t.current,null),_t=n,It=0,li=null,Ja=!1,Ms=we(t,n),sh=!1,Es=ui=oh=Fr=ja=cn=0,Jn=Vo=null,lh=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var c=31-ze(o),h=1<<c;n|=t[c],o&=~h}return Sa=n,zl(),a}function L0(t,n){lt=null,z.H=Oo,n===ps||n===ql?(n=Zm(),It=3):n===gf?(n=Zm(),It=4):It=n===Xf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,li=n,pt===null&&(cn=1,su(t,gi(n,t.current)))}function N0(){var t=si.current;return t===null?!0:(_t&4194048)===_t?Si===null:(_t&62914560)===_t||(_t&536870912)!==0?t===Si:!1}function O0(){var t=z.H;return z.H=Oo,t===null?Oo:t}function P0(){var t=z.A;return z.A=py,t}function vu(){cn=4,Ja||(_t&4194048)!==_t&&si.current!==null||(Ms=!0),(ja&134217727)===0&&(Fr&134217727)===0||Wt===null||tr(Wt,_t,ui,!1)}function dh(t,n,a){var o=Dt;Dt|=2;var c=O0(),h=P0();(Wt!==t||_t!==n)&&(gu=null,Ts(t,n)),n=!1;var y=cn;e:do try{if(It!==0&&pt!==null){var w=pt,G=li;switch(It){case 8:hh(),y=6;break e;case 3:case 2:case 9:case 6:si.current===null&&(n=!0);var te=It;if(It=0,li=null,As(t,w,G,te),a&&Ms){y=0;break e}break;default:te=It,It=0,li=null,As(t,w,G,te)}}_y(),y=cn;break}catch(me){L0(t,me)}while(!0);return n&&t.shellSuspendCounter++,ca=Dr=null,Dt=o,z.H=c,z.A=h,pt===null&&(Wt=null,_t=0,zl()),y}function _y(){for(;pt!==null;)I0(pt)}function vy(t,n){var a=Dt;Dt|=2;var o=O0(),c=P0();Wt!==t||_t!==n?(gu=null,mu=Ft()+500,Ts(t,n)):Ms=we(t,n);e:do try{if(It!==0&&pt!==null){n=pt;var h=li;t:switch(It){case 1:It=0,li=null,As(t,n,h,1);break;case 2:case 9:if(qm(h)){It=0,li=null,B0(n);break}n=function(){It!==2&&It!==9||Wt!==t||(It=7),qi(t)},h.then(n,n);break e;case 3:It=7;break e;case 4:It=5;break e;case 7:qm(h)?(It=0,li=null,B0(n)):(It=0,li=null,As(t,n,h,7));break;case 5:var y=null;switch(pt.tag){case 26:y=pt.memoizedState;case 5:case 27:var w=pt;if(y?M_(y):w.stateNode.complete){It=0,li=null;var G=w.sibling;if(G!==null)pt=G;else{var te=w.return;te!==null?(pt=te,xu(te)):pt=null}break t}}It=0,li=null,As(t,n,h,5);break;case 6:It=0,li=null,As(t,n,h,6);break;case 8:hh(),cn=6;break e;default:throw Error(r(462))}}xy();break}catch(me){L0(t,me)}while(!0);return ca=Dr=null,z.H=o,z.A=c,Dt=a,pt!==null?0:(Wt=null,_t=0,zl(),cn)}function xy(){for(;pt!==null&&!ln();)I0(pt)}function I0(t){var n=s0(t.alternate,t,Sa);t.memoizedProps=t.pendingProps,n===null?xu(t):pt=n}function B0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=e0(a,n,n.pendingProps,n.type,void 0,_t);break;case 11:n=e0(a,n,n.pendingProps,n.type.render,n.ref,_t);break;case 5:Cf(n);default:l0(a,n),n=pt=Pm(n,Sa),n=s0(a,n,Sa)}t.memoizedProps=t.pendingProps,n===null?xu(t):pt=n}function As(t,n,a,o){ca=Dr=null,Cf(n),ms=null,Ao=0;var c=n.return;try{if(oy(t,c,n,a,_t)){cn=1,su(t,gi(a,t.current)),pt=null;return}}catch(h){if(c!==null)throw pt=c,h;cn=1,su(t,gi(a,t.current)),pt=null;return}n.flags&32768?(yt||o===1?t=!0:Ms||(_t&536870912)!==0?t=!1:(Ja=t=!0,(o===2||o===9||o===3||o===6)&&(o=si.current,o!==null&&o.tag===13&&(o.flags|=16384))),z0(n,t)):xu(n)}function xu(t){var n=t;do{if((n.flags&32768)!==0){z0(n,Ja);return}t=n.return;var a=cy(n.alternate,n,Sa);if(a!==null){pt=a;return}if(n=n.sibling,n!==null){pt=n;return}pt=n=t}while(n!==null);cn===0&&(cn=5)}function z0(t,n){do{var a=fy(t.alternate,t);if(a!==null){a.flags&=32767,pt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){pt=t;return}pt=t=a}while(t!==null);cn=6,pt=null}function F0(t,n,a,o,c,h,y,w,G){t.cancelPendingCommit=null;do Su();while(bn!==0);if((Dt&6)!==0)throw Error(r(327));if(n!==null){if(n===t.current)throw Error(r(177));if(h=n.lanes|n.childLanes,h|=ef,Qt(t,a,h,y,w,G),t===Wt&&(pt=Wt=null,_t=0),bs=n,er=t,ya=a,uh=h,ch=c,C0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Ey(J,function(){return X0(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,c=V.p,V.p=2,y=Dt,Dt|=4;try{hy(t,n,a)}finally{Dt=y,V.p=c,z.T=o}}bn=1,H0(),G0(),V0()}}function H0(){if(bn===1){bn=0;var t=er,n=bs,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var o=V.p;V.p=2;var c=Dt;Dt|=4;try{S0(n,t);var h=Th,y=Am(t.containerInfo),w=h.focusedElem,G=h.selectionRange;if(y!==w&&w&&w.ownerDocument&&Tm(w.ownerDocument.documentElement,w)){if(G!==null&&Kc(w)){var te=G.start,me=G.end;if(me===void 0&&(me=te),"selectionStart"in w)w.selectionStart=te,w.selectionEnd=Math.min(me,w.value.length);else{var xe=w.ownerDocument||document,le=xe&&xe.defaultView||window;if(le.getSelection){var ce=le.getSelection(),We=w.textContent.length,et=Math.min(G.start,We),Vt=G.end===void 0?et:Math.min(G.end,We);!ce.extend&&et>Vt&&(y=Vt,Vt=et,et=y);var K=bm(w,et),X=bm(w,Vt);if(K&&X&&(ce.rangeCount!==1||ce.anchorNode!==K.node||ce.anchorOffset!==K.offset||ce.focusNode!==X.node||ce.focusOffset!==X.offset)){var ee=xe.createRange();ee.setStart(K.node,K.offset),ce.removeAllRanges(),et>Vt?(ce.addRange(ee),ce.extend(X.node,X.offset)):(ee.setEnd(X.node,X.offset),ce.addRange(ee))}}}}for(xe=[],ce=w;ce=ce.parentNode;)ce.nodeType===1&&xe.push({element:ce,left:ce.scrollLeft,top:ce.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<xe.length;w++){var ve=xe[w];ve.element.scrollLeft=ve.left,ve.element.scrollTop=ve.top}}Lu=!!bh,Th=bh=null}finally{Dt=c,V.p=o,z.T=a}}t.current=n,bn=2}}function G0(){if(bn===2){bn=0;var t=er,n=bs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var o=V.p;V.p=2;var c=Dt;Dt|=4;try{m0(t,n.alternate,n)}finally{Dt=c,V.p=o,z.T=a}}bn=3}}function V0(){if(bn===4||bn===3){bn=0,Z();var t=er,n=bs,a=ya,o=C0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?bn=5:(bn=0,bs=er=null,k0(t,t.pendingLanes));var c=t.pendingLanes;if(c===0&&($a=null),co(a),n=n.stateNode,pe&&typeof pe.onCommitFiberRoot=="function")try{pe.onCommitFiberRoot(he,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=z.T,c=V.p,V.p=2,z.T=null;try{for(var h=t.onRecoverableError,y=0;y<o.length;y++){var w=o[y];h(w.value,{componentStack:w.stack})}}finally{z.T=n,V.p=c}}(ya&3)!==0&&Su(),qi(t),c=t.pendingLanes,(a&261930)!==0&&(c&42)!==0?t===fh?ko++:(ko=0,fh=t):ko=0,Xo(0)}}function k0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,bo(n)))}function Su(){return H0(),G0(),V0(),X0()}function X0(){if(bn!==5)return!1;var t=er,n=uh;uh=0;var a=co(ya),o=z.T,c=V.p;try{V.p=32>a?32:a,z.T=null,a=ch,ch=null;var h=er,y=ya;if(bn=0,bs=er=null,ya=0,(Dt&6)!==0)throw Error(r(331));var w=Dt;if(Dt|=4,T0(h.current),M0(h,h.current,y,a),Dt=w,Xo(0,!1),pe&&typeof pe.onPostCommitFiberRoot=="function")try{pe.onPostCommitFiberRoot(he,h)}catch{}return!0}finally{V.p=c,z.T=o,k0(t,n)}}function W0(t,n,a){n=gi(a,n),n=kf(t.stateNode,n,2),t=Ya(t,n,2),t!==null&&(Ve(t,2),qi(t))}function Bt(t,n,a){if(t.tag===3)W0(t,t,a);else for(;n!==null;){if(n.tag===3){W0(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&($a===null||!$a.has(o))){t=gi(a,t),a=qg(2),o=Ya(n,a,2),o!==null&&(Yg(a,o,n,t),Ve(o,2),qi(o));break}}n=n.return}}function ph(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new my;var c=new Set;o.set(n,c)}else c=o.get(n),c===void 0&&(c=new Set,o.set(n,c));c.has(a)||(sh=!0,c.add(a),t=Sy.bind(null,t,n,a),n.then(t,t))}function Sy(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Wt===t&&(_t&a)===a&&(cn===4||cn===3&&(_t&62914560)===_t&&300>Ft()-pu?(Dt&2)===0&&Ts(t,0):oh|=a,Es===_t&&(Es=0)),qi(t)}function q0(t,n){n===0&&(n=ye()),t=Rr(t,n),t!==null&&(Ve(t,n),qi(t))}function yy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),q0(t,a)}function My(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,c=t.memoizedState;c!==null&&(a=c.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),q0(t,a)}function Ey(t,n){return hn(t,n)}var yu=null,Rs=null,mh=!1,Mu=!1,gh=!1,nr=0;function qi(t){t!==Rs&&t.next===null&&(Rs===null?yu=Rs=t:Rs=Rs.next=t),Mu=!0,mh||(mh=!0,Ty())}function Xo(t,n){if(!gh&&Mu){gh=!0;do for(var a=!1,o=yu;o!==null;){if(t!==0){var c=o.pendingLanes;if(c===0)var h=0;else{var y=o.suspendedLanes,w=o.pingedLanes;h=(1<<31-ze(42|t)+1)-1,h&=c&~(y&~w),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,Q0(o,h))}else h=_t,h=ge(o,o===Wt?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||we(o,h)||(a=!0,Q0(o,h));o=o.next}while(a);gh=!1}}function by(){Y0()}function Y0(){Mu=mh=!1;var t=0;nr!==0&&Py()&&(t=nr);for(var n=Ft(),a=null,o=yu;o!==null;){var c=o.next,h=Z0(o,n);h===0?(o.next=null,a===null?yu=c:a.next=c,c===null&&(Rs=a)):(a=o,(t!==0||(h&3)!==0)&&(Mu=!0)),o=c}bn!==0&&bn!==5||Xo(t),nr!==0&&(nr=0)}function Z0(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,c=t.expirationTimes,h=t.pendingLanes&-62914561;0<h;){var y=31-ze(h),w=1<<y,G=c[y];G===-1?((w&a)===0||(w&o)!==0)&&(c[y]=Be(w,n)):G<=n&&(t.expiredLanes|=w),h&=~w}if(n=Wt,a=_t,a=ge(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(It===2||It===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&qt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||we(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&qt(o),co(a)){case 2:case 8:a=E;break;case 32:a=J;break;case 268435456:a=de;break;default:a=J}return o=K0.bind(null,t),a=hn(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&qt(o),t.callbackPriority=2,t.callbackNode=null,2}function K0(t,n){if(bn!==0&&bn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Su()&&t.callbackNode!==a)return null;var o=_t;return o=ge(t,t===Wt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(D0(t,o,n),Z0(t,Ft()),t.callbackNode!=null&&t.callbackNode===a?K0.bind(null,t):null)}function Q0(t,n){if(Su())return null;D0(t,n,!0)}function Ty(){By(function(){(Dt&6)!==0?hn(P,by):Y0()})}function _h(){if(nr===0){var t=hs;t===0&&(t=Je,Je<<=1,(Je&261888)===0&&(Je=256)),nr=t}return nr}function J0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Er(""+t)}function j0(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Ay(t,n,a,o,c){if(n==="submit"&&a&&a.stateNode===c){var h=J0((c[Dn]||null).action),y=o.submitter;y&&(n=(n=y[Dn]||null)?J0(n.formAction):y.getAttribute("formAction"),n!==null&&(h=n,y=null));var w=new Ol("action","action",null,o,c);t.push({event:w,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(nr!==0){var G=y?j0(c,y):new FormData(c);Bf(a,{pending:!0,data:G,method:c.method,action:h},null,G)}}else typeof h=="function"&&(w.preventDefault(),G=y?j0(c,y):new FormData(c),Bf(a,{pending:!0,data:G,method:c.method,action:h},h,G))},currentTarget:c}]})}}for(var vh=0;vh<$c.length;vh++){var xh=$c[vh],Ry=xh.toLowerCase(),Cy=xh[0].toUpperCase()+xh.slice(1);Di(Ry,"on"+Cy)}Di(wm,"onAnimationEnd"),Di(Dm,"onAnimationIteration"),Di(Um,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(XS,"onTransitionRun"),Di(WS,"onTransitionStart"),Di(qS,"onTransitionCancel"),Di(Lm,"onTransitionEnd"),oe("onMouseEnter",["mouseout","mouseover"]),oe("onMouseLeave",["mouseout","mouseover"]),oe("onPointerEnter",["pointerout","pointerover"]),oe("onPointerLeave",["pointerout","pointerover"]),q("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),q("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),q("onBeforeInput",["compositionend","keypress","textInput","paste"]),q("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),q("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wo));function $0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],c=o.event;o=o.listeners;e:{var h=void 0;if(n)for(var y=o.length-1;0<=y;y--){var w=o[y],G=w.instance,te=w.currentTarget;if(w=w.listener,G!==h&&c.isPropagationStopped())break e;h=w,c.currentTarget=te;try{h(c)}catch(me){Bl(me)}c.currentTarget=null,h=G}else for(y=0;y<o.length;y++){if(w=o[y],G=w.instance,te=w.currentTarget,w=w.listener,G!==h&&c.isPropagationStopped())break e;h=w,c.currentTarget=te;try{h(c)}catch(me){Bl(me)}c.currentTarget=null,h=G}}}}function mt(t,n){var a=n[Sr];a===void 0&&(a=n[Sr]=new Set);var o=t+"__bubble";a.has(o)||(e_(n,t,2,!1),a.add(o))}function Sh(t,n,a){var o=0;n&&(o|=4),e_(a,t,o,n)}var Eu="_reactListening"+Math.random().toString(36).slice(2);function yh(t){if(!t[Eu]){t[Eu]=!0,Dl.forEach(function(a){a!=="selectionchange"&&(wy.has(a)||Sh(a,!1,t),Sh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Eu]||(n[Eu]=!0,Sh("selectionchange",!1,n))}}function e_(t,n,a,o){switch(w_(n)){case 2:var c=iM;break;case 8:c=aM;break;default:c=Ih}a=c.bind(null,n,a,t),c=void 0,!Hc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),o?c!==void 0?t.addEventListener(n,a,{capture:!0,passive:c}):t.addEventListener(n,a,!0):c!==void 0?t.addEventListener(n,a,{passive:c}):t.addEventListener(n,a,!1)}function Mh(t,n,a,o,c){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var w=o.stateNode.containerInfo;if(w===c)break;if(y===4)for(y=o.return;y!==null;){var G=y.tag;if((G===3||G===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;w!==null;){if(y=aa(w),y===null)return;if(G=y.tag,G===5||G===6||G===26||G===27){o=h=y;continue e}w=w.parentNode}}o=o.return}rm(function(){var te=h,me=zc(a),xe=[];e:{var le=Nm.get(t);if(le!==void 0){var ce=Ol,We=t;switch(t){case"keypress":if(Ll(a)===0)break e;case"keydown":case"keyup":ce=MS;break;case"focusin":We="focus",ce=Xc;break;case"focusout":We="blur",ce=Xc;break;case"beforeblur":case"afterblur":ce=Xc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ce=lm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ce=cS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ce=TS;break;case wm:case Dm:case Um:ce=dS;break;case Lm:ce=RS;break;case"scroll":case"scrollend":ce=lS;break;case"wheel":ce=wS;break;case"copy":case"cut":case"paste":ce=mS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ce=cm;break;case"toggle":case"beforetoggle":ce=US}var et=(n&4)!==0,Vt=!et&&(t==="scroll"||t==="scrollend"),K=et?le!==null?le+"Capture":null:le;et=[];for(var X=te,ee;X!==null;){var ve=X;if(ee=ve.stateNode,ve=ve.tag,ve!==5&&ve!==26&&ve!==27||ee===null||K===null||(ve=ho(X,K),ve!=null&&et.push(qo(X,ve,ee))),Vt)break;X=X.return}0<et.length&&(le=new ce(le,We,null,a,me),xe.push({event:le,listeners:et}))}}if((n&7)===0){e:{if(le=t==="mouseover"||t==="pointerover",ce=t==="mouseout"||t==="pointerout",le&&a!==Bc&&(We=a.relatedTarget||a.fromElement)&&(aa(We)||We[qn]))break e;if((ce||le)&&(le=me.window===me?me:(le=me.ownerDocument)?le.defaultView||le.parentWindow:window,ce?(We=a.relatedTarget||a.toElement,ce=te,We=We?aa(We):null,We!==null&&(Vt=u(We),et=We.tag,We!==Vt||et!==5&&et!==27&&et!==6)&&(We=null)):(ce=null,We=te),ce!==We)){if(et=lm,ve="onMouseLeave",K="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(et=cm,ve="onPointerLeave",K="onPointerEnter",X="pointer"),Vt=ce==null?le:Mr(ce),ee=We==null?le:Mr(We),le=new et(ve,X+"leave",ce,a,me),le.target=Vt,le.relatedTarget=ee,ve=null,aa(me)===te&&(et=new et(K,X+"enter",We,a,me),et.target=ee,et.relatedTarget=Vt,ve=et),Vt=ve,ce&&We)t:{for(et=Dy,K=ce,X=We,ee=0,ve=K;ve;ve=et(ve))ee++;ve=0;for(var $e=X;$e;$e=et($e))ve++;for(;0<ee-ve;)K=et(K),ee--;for(;0<ve-ee;)X=et(X),ve--;for(;ee--;){if(K===X||X!==null&&K===X.alternate){et=K;break t}K=et(K),X=et(X)}et=null}else et=null;ce!==null&&t_(xe,le,ce,et,!1),We!==null&&Vt!==null&&t_(xe,Vt,We,et,!0)}}e:{if(le=te?Mr(te):window,ce=le.nodeName&&le.nodeName.toLowerCase(),ce==="select"||ce==="input"&&le.type==="file")var At=vm;else if(gm(le))if(xm)At=GS;else{At=FS;var Ye=zS}else ce=le.nodeName,!ce||ce.toLowerCase()!=="input"||le.type!=="checkbox"&&le.type!=="radio"?te&&Ut(te.elementType)&&(At=vm):At=HS;if(At&&(At=At(t,te))){_m(xe,At,a,me);break e}Ye&&Ye(t,le,te),t==="focusout"&&te&&le.type==="number"&&te.memoizedProps.value!=null&&dt(le,"number",le.value)}switch(Ye=te?Mr(te):window,t){case"focusin":(gm(Ye)||Ye.contentEditable==="true")&&(as=Ye,Qc=te,yo=null);break;case"focusout":yo=Qc=as=null;break;case"mousedown":Jc=!0;break;case"contextmenu":case"mouseup":case"dragend":Jc=!1,Rm(xe,a,me);break;case"selectionchange":if(kS)break;case"keydown":case"keyup":Rm(xe,a,me)}var ut;if(qc)e:{switch(t){case"compositionstart":var vt="onCompositionStart";break e;case"compositionend":vt="onCompositionEnd";break e;case"compositionupdate":vt="onCompositionUpdate";break e}vt=void 0}else is?pm(t,a)&&(vt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(vt="onCompositionStart");vt&&(fm&&a.locale!=="ko"&&(is||vt!=="onCompositionStart"?vt==="onCompositionEnd"&&is&&(ut=sm()):(Ha=me,Gc="value"in Ha?Ha.value:Ha.textContent,is=!0)),Ye=bu(te,vt),0<Ye.length&&(vt=new um(vt,t,null,a,me),xe.push({event:vt,listeners:Ye}),ut?vt.data=ut:(ut=mm(a),ut!==null&&(vt.data=ut)))),(ut=NS?OS(t,a):PS(t,a))&&(vt=bu(te,"onBeforeInput"),0<vt.length&&(Ye=new um("onBeforeInput","beforeinput",null,a,me),xe.push({event:Ye,listeners:vt}),Ye.data=ut)),Ay(xe,t,te,a,me)}$0(xe,n)})}function qo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function bu(t,n){for(var a=n+"Capture",o=[];t!==null;){var c=t,h=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||h===null||(c=ho(t,a),c!=null&&o.unshift(qo(t,c,h)),c=ho(t,n),c!=null&&o.push(qo(t,c,h))),t.tag===3)return o;t=t.return}return[]}function Dy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function t_(t,n,a,o,c){for(var h=n._reactName,y=[];a!==null&&a!==o;){var w=a,G=w.alternate,te=w.stateNode;if(w=w.tag,G!==null&&G===o)break;w!==5&&w!==26&&w!==27||te===null||(G=te,c?(te=ho(a,h),te!=null&&y.unshift(qo(a,te,G))):c||(te=ho(a,h),te!=null&&y.push(qo(a,te,G)))),a=a.return}y.length!==0&&t.push({event:n,listeners:y})}var Uy=/\r\n?/g,Ly=/\u0000|\uFFFD/g;function n_(t){return(typeof t=="string"?t:""+t).replace(Uy,`
`).replace(Ly,"")}function i_(t,n){return n=n_(n),n_(t)===n}function Gt(t,n,a,o,c,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||ii(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&ii(t,""+o);break;case"className":Xe(t,"class",o);break;case"tabIndex":Xe(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xe(t,a,o);break;case"style":wi(t,o,h);break;case"data":if(n!=="object"){Xe(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Er(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&Gt(t,n,"name",c.name,c,null),Gt(t,n,"formEncType",c.formEncType,c,null),Gt(t,n,"formMethod",c.formMethod,c,null),Gt(t,n,"formTarget",c.formTarget,c,null)):(Gt(t,n,"encType",c.encType,c,null),Gt(t,n,"method",c.method,c,null),Gt(t,n,"target",c.target,c,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Er(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=sa);break;case"onScroll":o!=null&&mt("scroll",t);break;case"onScrollEnd":o!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(c.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=Er(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Le(t,"popover",o);break;case"xlinkActuate":ke(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ke(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ke(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ke(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ke(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ke(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ke(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ke(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ke(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Le(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Vi.get(a)||a,Le(t,a,o))}}function Eh(t,n,a,o,c,h){switch(a){case"style":wi(t,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(c.children!=null)throw Error(r(60));t.innerHTML=a}}break;case"children":typeof o=="string"?ii(t,o):(typeof o=="number"||typeof o=="bigint")&&ii(t,""+o);break;case"onScroll":o!=null&&mt("scroll",t);break;case"onScrollEnd":o!=null&&mt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=sa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!R.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),h=t[Dn]||null,h=h!=null?h[a]:null,typeof h=="function"&&t.removeEventListener(n,h,c),typeof o=="function")){typeof h!="function"&&h!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,c);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Le(t,a,o)}}}function On(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var o=!1,c=!1,h;for(h in a)if(a.hasOwnProperty(h)){var y=a[h];if(y!=null)switch(h){case"src":o=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Gt(t,n,h,y,a,null)}}c&&Gt(t,n,"srcSet",a.srcSet,a,null),o&&Gt(t,n,"src",a.src,a,null);return;case"input":mt("invalid",t);var w=h=y=c=null,G=null,te=null;for(o in a)if(a.hasOwnProperty(o)){var me=a[o];if(me!=null)switch(o){case"name":c=me;break;case"type":y=me;break;case"checked":G=me;break;case"defaultChecked":te=me;break;case"value":h=me;break;case"defaultValue":w=me;break;case"children":case"dangerouslySetInnerHTML":if(me!=null)throw Error(r(137,n));break;default:Gt(t,n,o,me,a,null)}}In(t,h,w,G,te,y,c,!1);return;case"select":mt("invalid",t),o=y=h=null;for(c in a)if(a.hasOwnProperty(c)&&(w=a[c],w!=null))switch(c){case"value":h=w;break;case"defaultValue":y=w;break;case"multiple":o=w;default:Gt(t,n,c,w,a,null)}n=h,a=y,t.multiple=!!o,n!=null?En(t,!!o,n,!1):a!=null&&En(t,!!o,a,!0);return;case"textarea":mt("invalid",t),h=c=o=null;for(y in a)if(a.hasOwnProperty(y)&&(w=a[y],w!=null))switch(y){case"value":o=w;break;case"defaultValue":c=w;break;case"children":h=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(r(91));break;default:Gt(t,n,y,w,a,null)}Ci(t,o,c,h);return;case"option":for(G in a)a.hasOwnProperty(G)&&(o=a[G],o!=null)&&(G==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":Gt(t,n,G,o,a,null));return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(o=0;o<Wo.length;o++)mt(Wo[o],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(te in a)if(a.hasOwnProperty(te)&&(o=a[te],o!=null))switch(te){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Gt(t,n,te,o,a,null)}return;default:if(Ut(n)){for(me in a)a.hasOwnProperty(me)&&(o=a[me],o!==void 0&&Eh(t,n,me,o,a,void 0));return}}for(w in a)a.hasOwnProperty(w)&&(o=a[w],o!=null&&Gt(t,n,w,o,a,null))}function Ny(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,h=null,y=null,w=null,G=null,te=null,me=null;for(ce in a){var xe=a[ce];if(a.hasOwnProperty(ce)&&xe!=null)switch(ce){case"checked":break;case"value":break;case"defaultValue":G=xe;default:o.hasOwnProperty(ce)||Gt(t,n,ce,null,o,xe)}}for(var le in o){var ce=o[le];if(xe=a[le],o.hasOwnProperty(le)&&(ce!=null||xe!=null))switch(le){case"type":h=ce;break;case"name":c=ce;break;case"checked":te=ce;break;case"defaultChecked":me=ce;break;case"value":y=ce;break;case"defaultValue":w=ce;break;case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(r(137,n));break;default:ce!==xe&&Gt(t,n,le,ce,o,xe)}}Fe(t,y,w,G,te,me,h,c);return;case"select":ce=y=w=le=null;for(h in a)if(G=a[h],a.hasOwnProperty(h)&&G!=null)switch(h){case"value":break;case"multiple":ce=G;default:o.hasOwnProperty(h)||Gt(t,n,h,null,o,G)}for(c in o)if(h=o[c],G=a[c],o.hasOwnProperty(c)&&(h!=null||G!=null))switch(c){case"value":le=h;break;case"defaultValue":w=h;break;case"multiple":y=h;default:h!==G&&Gt(t,n,c,h,o,G)}n=w,a=y,o=ce,le!=null?En(t,!!a,le,!1):!!o!=!!a&&(n!=null?En(t,!!a,n,!0):En(t,!!a,a?[]:"",!1));return;case"textarea":ce=le=null;for(w in a)if(c=a[w],a.hasOwnProperty(w)&&c!=null&&!o.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Gt(t,n,w,null,o,c)}for(y in o)if(c=o[y],h=a[y],o.hasOwnProperty(y)&&(c!=null||h!=null))switch(y){case"value":le=c;break;case"defaultValue":ce=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(r(91));break;default:c!==h&&Gt(t,n,y,c,o,h)}ni(t,le,ce);return;case"option":for(var We in a)le=a[We],a.hasOwnProperty(We)&&le!=null&&!o.hasOwnProperty(We)&&(We==="selected"?t.selected=!1:Gt(t,n,We,null,o,le));for(G in o)le=o[G],ce=a[G],o.hasOwnProperty(G)&&le!==ce&&(le!=null||ce!=null)&&(G==="selected"?t.selected=le&&typeof le!="function"&&typeof le!="symbol":Gt(t,n,G,le,o,ce));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var et in a)le=a[et],a.hasOwnProperty(et)&&le!=null&&!o.hasOwnProperty(et)&&Gt(t,n,et,null,o,le);for(te in o)if(le=o[te],ce=a[te],o.hasOwnProperty(te)&&le!==ce&&(le!=null||ce!=null))switch(te){case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(r(137,n));break;default:Gt(t,n,te,le,o,ce)}return;default:if(Ut(n)){for(var Vt in a)le=a[Vt],a.hasOwnProperty(Vt)&&le!==void 0&&!o.hasOwnProperty(Vt)&&Eh(t,n,Vt,void 0,o,le);for(me in o)le=o[me],ce=a[me],!o.hasOwnProperty(me)||le===ce||le===void 0&&ce===void 0||Eh(t,n,me,le,o,ce);return}}for(var K in a)le=a[K],a.hasOwnProperty(K)&&le!=null&&!o.hasOwnProperty(K)&&Gt(t,n,K,null,o,le);for(xe in o)le=o[xe],ce=a[xe],!o.hasOwnProperty(xe)||le===ce||le==null&&ce==null||Gt(t,n,xe,le,o,ce)}function a_(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Oy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var c=a[o],h=c.transferSize,y=c.initiatorType,w=c.duration;if(h&&w&&a_(y)){for(y=0,w=c.responseEnd,o+=1;o<a.length;o++){var G=a[o],te=G.startTime;if(te>w)break;var me=G.transferSize,xe=G.initiatorType;me&&a_(xe)&&(G=G.responseEnd,y+=me*(G<w?1:(w-te)/(G-te)))}if(--o,n+=8*(h+y)/(c.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var bh=null,Th=null;function Tu(t){return t.nodeType===9?t:t.ownerDocument}function r_(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function s_(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Ah(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Rh=null;function Py(){var t=window.event;return t&&t.type==="popstate"?t===Rh?!1:(Rh=t,!0):(Rh=null,!1)}var o_=typeof setTimeout=="function"?setTimeout:void 0,Iy=typeof clearTimeout=="function"?clearTimeout:void 0,l_=typeof Promise=="function"?Promise:void 0,By=typeof queueMicrotask=="function"?queueMicrotask:typeof l_<"u"?function(t){return l_.resolve(null).then(t).catch(zy)}:o_;function zy(t){setTimeout(function(){throw t})}function ir(t){return t==="head"}function u_(t,n){var a=n,o=0;do{var c=a.nextSibling;if(t.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(c),Us(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Yo(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Yo(a);for(var h=a.firstChild;h;){var y=h.nextSibling,w=h.nodeName;h[Ia]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=y}}else a==="body"&&Yo(t.ownerDocument.body);a=c}while(a);Us(n)}function c_(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function Ch(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Ch(a),Ba(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Fy(t,n,a,o){for(;t.nodeType===1;){var c=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Ia])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(h=t.getAttribute("rel"),h==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(h!==c.rel||t.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||t.getAttribute("title")!==(c.title==null?null:c.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(h=t.getAttribute("src"),(h!==(c.src==null?null:c.src)||t.getAttribute("type")!==(c.type==null?null:c.type)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&h&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var h=c.name==null?null:""+c.name;if(c.type==="hidden"&&t.getAttribute("name")===h)return t}else return t;if(t=yi(t.nextSibling),t===null)break}return null}function Hy(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=yi(t.nextSibling),t===null))return null;return t}function f_(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=yi(t.nextSibling),t===null))return null;return t}function wh(t){return t.data==="$?"||t.data==="$~"}function Dh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Gy(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function yi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Uh=null;function h_(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return yi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function d_(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function p_(t,n,a){switch(n=Tu(a),t){case"html":if(t=n.documentElement,!t)throw Error(r(452));return t;case"head":if(t=n.head,!t)throw Error(r(453));return t;case"body":if(t=n.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function Yo(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Ba(t)}var Mi=new Map,m_=new Set;function Au(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ma=V.d;V.d={f:Vy,r:ky,D:Xy,C:Wy,L:qy,m:Yy,X:Ky,S:Zy,M:Qy};function Vy(){var t=Ma.f(),n=_u();return t||n}function ky(t){var n=ra(t);n!==null&&n.tag===5&&n.type==="form"?Lg(n):Ma.r(t)}var Cs=typeof document>"u"?null:document;function g_(t,n,a){var o=Cs;if(o&&typeof n=="string"&&n){var c=Ot(n);c='link[rel="'+t+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),m_.has(c)||(m_.add(c),t={rel:t,crossOrigin:a,href:n},o.querySelector(c)===null&&(n=o.createElement("link"),On(n,"link",t),gn(n),o.head.appendChild(n)))}}function Xy(t){Ma.D(t),g_("dns-prefetch",t,null)}function Wy(t,n){Ma.C(t,n),g_("preconnect",t,n)}function qy(t,n,a){Ma.L(t,n,a);var o=Cs;if(o&&t&&n){var c='link[rel="preload"][as="'+Ot(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+Ot(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+Ot(a.imageSizes)+'"]')):c+='[href="'+Ot(t)+'"]';var h=c;switch(n){case"style":h=ws(t);break;case"script":h=Ds(t)}Mi.has(h)||(t=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Mi.set(h,t),o.querySelector(c)!==null||n==="style"&&o.querySelector(Zo(h))||n==="script"&&o.querySelector(Ko(h))||(n=o.createElement("link"),On(n,"link",t),gn(n),o.head.appendChild(n)))}}function Yy(t,n){Ma.m(t,n);var a=Cs;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+Ot(o)+'"][href="'+Ot(t)+'"]',h=c;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Ds(t)}if(!Mi.has(h)&&(t=v({rel:"modulepreload",href:t},n),Mi.set(h,t),a.querySelector(c)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ko(h)))return}o=a.createElement("link"),On(o,"link",t),gn(o),a.head.appendChild(o)}}}function Zy(t,n,a){Ma.S(t,n,a);var o=Cs;if(o&&t){var c=za(o).hoistableStyles,h=ws(t);n=n||"default";var y=c.get(h);if(!y){var w={loading:0,preload:null};if(y=o.querySelector(Zo(h)))w.loading=5;else{t=v({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Mi.get(h))&&Lh(t,a);var G=y=o.createElement("link");gn(G),On(G,"link",t),G._p=new Promise(function(te,me){G.onload=te,G.onerror=me}),G.addEventListener("load",function(){w.loading|=1}),G.addEventListener("error",function(){w.loading|=2}),w.loading|=4,Ru(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:w},c.set(h,y)}}}function Ky(t,n){Ma.X(t,n);var a=Cs;if(a&&t){var o=za(a).hoistableScripts,c=Ds(t),h=o.get(c);h||(h=a.querySelector(Ko(c)),h||(t=v({src:t,async:!0},n),(n=Mi.get(c))&&Nh(t,n),h=a.createElement("script"),gn(h),On(h,"link",t),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(c,h))}}function Qy(t,n){Ma.M(t,n);var a=Cs;if(a&&t){var o=za(a).hoistableScripts,c=Ds(t),h=o.get(c);h||(h=a.querySelector(Ko(c)),h||(t=v({src:t,async:!0,type:"module"},n),(n=Mi.get(c))&&Nh(t,n),h=a.createElement("script"),gn(h),On(h,"link",t),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(c,h))}}function __(t,n,a,o){var c=(c=re.current)?Au(c):null;if(!c)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=ws(a.href),a=za(c).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=ws(a.href);var h=za(c).hoistableStyles,y=h.get(t);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(t,y),(h=c.querySelector(Zo(t)))&&!h._p&&(y.instance=h,y.state.loading=5),Mi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Mi.set(t,a),h||Jy(c,t,a,y.state))),n&&o===null)throw Error(r(528,""));return y}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Ds(a),a=za(c).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function ws(t){return'href="'+Ot(t)+'"'}function Zo(t){return'link[rel="stylesheet"]['+t+"]"}function v_(t){return v({},t,{"data-precedence":t.precedence,precedence:null})}function Jy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),On(n,"link",a),gn(n),t.head.appendChild(n))}function Ds(t){return'[src="'+Ot(t)+'"]'}function Ko(t){return"script[async]"+t}function x_(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Ot(a.href)+'"]');if(o)return n.instance=o,gn(o),o;var c=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),gn(o),On(o,"style",c),Ru(o,a.precedence,t),n.instance=o;case"stylesheet":c=ws(a.href);var h=t.querySelector(Zo(c));if(h)return n.state.loading|=4,n.instance=h,gn(h),h;o=v_(a),(c=Mi.get(c))&&Lh(o,c),h=(t.ownerDocument||t).createElement("link"),gn(h);var y=h;return y._p=new Promise(function(w,G){y.onload=w,y.onerror=G}),On(h,"link",o),n.state.loading|=4,Ru(h,a.precedence,t),n.instance=h;case"script":return h=Ds(a.src),(c=t.querySelector(Ko(h)))?(n.instance=c,gn(c),c):(o=a,(c=Mi.get(h))&&(o=v({},a),Nh(o,c)),t=t.ownerDocument||t,c=t.createElement("script"),gn(c),On(c,"link",o),t.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Ru(o,a.precedence,t));return n.instance}function Ru(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=o.length?o[o.length-1]:null,h=c,y=0;y<o.length;y++){var w=o[y];if(w.dataset.precedence===n)h=w;else if(h!==c)break}h?h.parentNode.insertBefore(t,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Lh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Nh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Cu=null;function S_(t,n,a){if(Cu===null){var o=new Map,c=Cu=new Map;c.set(a,o)}else c=Cu,o=c.get(a),o||(o=new Map,c.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),c=0;c<a.length;c++){var h=a[c];if(!(h[Ia]||h[mn]||t==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(n)||"";y=t+y;var w=o.get(y);w?w.push(h):o.set(y,[h])}}return o}function y_(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function jy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function M_(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function $y(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=ws(o.href),h=n.querySelector(Zo(c));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=wu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=h,gn(h);return}h=n.ownerDocument||n,o=v_(o),(c=Mi.get(c))&&Lh(o,c),h=h.createElement("link"),gn(h);var y=h;y._p=new Promise(function(w,G){y.onload=w,y.onerror=G}),On(h,"link",o),a.instance=h}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=wu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Oh=0;function eM(t,n){return t.stylesheets&&t.count===0&&Uu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&Uu(t,t.stylesheets),t.unsuspend){var h=t.unsuspend;t.unsuspend=null,h()}},6e4+n);0<t.imgBytes&&Oh===0&&(Oh=62500*Oy());var c=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Uu(t,t.stylesheets),t.unsuspend)){var h=t.unsuspend;t.unsuspend=null,h()}},(t.imgBytes>Oh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(c)}}:null}function wu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Uu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Du=null;function Uu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Du=new Map,n.forEach(tM,t),Du=null,wu.call(t))}function tM(t,n){if(!(n.state.loading&4)){var a=Du.get(t);if(a)var o=a.get(null);else{a=new Map,Du.set(t,a);for(var c=t.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<c.length;h++){var y=c[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}c=n.instance,y=c.getAttribute("data-precedence"),h=a.get(y)||o,h===o&&a.set(null,c),a.set(y,c),this.count++,o=wu.bind(this),c.addEventListener("load",o),c.addEventListener("error",o),h?h.parentNode.insertBefore(c,h.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(c,t.firstChild)),n.state.loading|=4}}var Qo={$$typeof:I,Provider:null,Consumer:null,_currentValue:ne,_currentValue2:ne,_threadCount:0};function nM(t,n,a,o,c,h,y,w,G){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=c,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function E_(t,n,a,o,c,h,y,w,G,te,me,xe){return t=new nM(t,n,a,y,G,te,me,xe,w),n=1,h===!0&&(n|=24),h=ri(3,null,null,n),t.current=h,h.stateNode=t,n=df(),n.refCount++,t.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},_f(h),t}function b_(t){return t?(t=os,t):os}function T_(t,n,a,o,c,h){c=b_(c),o.context===null?o.context=c:o.pendingContext=c,o=qa(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Ya(t,o,n),a!==null&&(jn(a,t,n),Co(a,t,n))}function A_(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function Ph(t,n){A_(t,n),(t=t.alternate)&&A_(t,n)}function R_(t){if(t.tag===13||t.tag===31){var n=Rr(t,67108864);n!==null&&jn(n,t,67108864),Ph(t,67108864)}}function C_(t){if(t.tag===13||t.tag===31){var n=ci();n=uo(n);var a=Rr(t,n);a!==null&&jn(a,t,n),Ph(t,n)}}var Lu=!0;function iM(t,n,a,o){var c=z.T;z.T=null;var h=V.p;try{V.p=2,Ih(t,n,a,o)}finally{V.p=h,z.T=c}}function aM(t,n,a,o){var c=z.T;z.T=null;var h=V.p;try{V.p=8,Ih(t,n,a,o)}finally{V.p=h,z.T=c}}function Ih(t,n,a,o){if(Lu){var c=Bh(o);if(c===null)Mh(t,n,o,Nu,a),D_(t,o);else if(sM(c,t,n,a,o))o.stopPropagation();else if(D_(t,o),n&4&&-1<rM.indexOf(t)){for(;c!==null;){var h=ra(c);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=Ae(h.pendingLanes);if(y!==0){var w=h;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var G=1<<31-ze(y);w.entanglements[1]|=G,y&=~G}qi(h),(Dt&6)===0&&(mu=Ft()+500,Xo(0))}}break;case 31:case 13:w=Rr(h,2),w!==null&&jn(w,h,2),_u(),Ph(h,2)}if(h=Bh(o),h===null&&Mh(t,n,o,Nu,a),h===c)break;c=h}c!==null&&o.stopPropagation()}else Mh(t,n,o,null,a)}}function Bh(t){return t=zc(t),zh(t)}var Nu=null;function zh(t){if(Nu=null,t=aa(t),t!==null){var n=u(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=p(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Nu=t,null}function w_(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(wt()){case P:return 2;case E:return 8;case J:case se:return 32;case de:return 268435456;default:return 32}default:return 32}}var Fh=!1,ar=null,rr=null,sr=null,Jo=new Map,jo=new Map,or=[],rM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function D_(t,n){switch(t){case"focusin":case"focusout":ar=null;break;case"dragenter":case"dragleave":rr=null;break;case"mouseover":case"mouseout":sr=null;break;case"pointerover":case"pointerout":Jo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(n.pointerId)}}function $o(t,n,a,o,c,h){return t===null||t.nativeEvent!==h?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[c]},n!==null&&(n=ra(n),n!==null&&R_(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),t)}function sM(t,n,a,o,c){switch(n){case"focusin":return ar=$o(ar,t,n,a,o,c),!0;case"dragenter":return rr=$o(rr,t,n,a,o,c),!0;case"mouseover":return sr=$o(sr,t,n,a,o,c),!0;case"pointerover":var h=c.pointerId;return Jo.set(h,$o(Jo.get(h)||null,t,n,a,o,c)),!0;case"gotpointercapture":return h=c.pointerId,jo.set(h,$o(jo.get(h)||null,t,n,a,o,c)),!0}return!1}function U_(t){var n=aa(t.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,es(t.priority,function(){C_(a)});return}}else if(n===31){if(n=p(a),n!==null){t.blockedOn=n,es(t.priority,function(){C_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ou(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Bh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);Bc=o,a.target.dispatchEvent(o),Bc=null}else return n=ra(a),n!==null&&R_(n),t.blockedOn=a,!1;n.shift()}return!0}function L_(t,n,a){Ou(t)&&a.delete(n)}function oM(){Fh=!1,ar!==null&&Ou(ar)&&(ar=null),rr!==null&&Ou(rr)&&(rr=null),sr!==null&&Ou(sr)&&(sr=null),Jo.forEach(L_),jo.forEach(L_)}function Pu(t,n){t.blockedOn===n&&(t.blockedOn=null,Fh||(Fh=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,oM)))}var Iu=null;function N_(t){Iu!==t&&(Iu=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){Iu===t&&(Iu=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],c=t[n+2];if(typeof o!="function"){if(zh(o||a)===null)continue;break}var h=ra(a);h!==null&&(t.splice(n,3),n-=3,Bf(h,{pending:!0,data:c,method:a.method,action:o},o,c))}}))}function Us(t){function n(G){return Pu(G,t)}ar!==null&&Pu(ar,t),rr!==null&&Pu(rr,t),sr!==null&&Pu(sr,t),Jo.forEach(n),jo.forEach(n);for(var a=0;a<or.length;a++){var o=or[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<or.length&&(a=or[0],a.blockedOn===null);)U_(a),a.blockedOn===null&&or.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var c=a[o],h=a[o+1],y=c[Dn]||null;if(typeof h=="function")y||N_(a);else if(y){var w=null;if(h&&h.hasAttribute("formAction")){if(c=h,y=h[Dn]||null)w=y.formAction;else if(zh(c)!==null)continue}else w=y.action;typeof w=="function"?a[o+1]=w:(a.splice(o,3),o-=3),N_(a)}}}function O_(){function t(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,c=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Hh(t){this._internalRoot=t}Bu.prototype.render=Hh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ci();T_(a,o,t,n,null,null)},Bu.prototype.unmount=Hh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;T_(t.current,2,null,t,null,null),_u(),n[qn]=null}};function Bu(t){this._internalRoot=t}Bu.prototype.unstable_scheduleHydration=function(t){if(t){var n=fo();t={blockedOn:null,target:t,priority:n};for(var a=0;a<or.length&&n!==0&&n<or[a].priority;a++);or.splice(a,0,t),a===0&&U_(t)}};var P_=e.version;if(P_!=="19.2.3")throw Error(r(527,P_,"19.2.3"));V.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=d(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var lM={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zu.isDisabled&&zu.supportsFiber)try{he=zu.inject(lM),pe=zu}catch{}}return tl.createRoot=function(t,n){if(!l(t))throw Error(r(299));var a=!1,o="",c=Vg,h=kg,y=Xg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=E_(t,1,!1,null,null,a,o,null,c,h,y,O_),t[qn]=n.current,yh(t),new Hh(n)},tl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(r(299));var o=!1,c="",h=Vg,y=kg,w=Xg,G=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(w=a.onRecoverableError),a.formState!==void 0&&(G=a.formState)),n=E_(t,1,!0,n,a??null,o,c,G,h,y,w,O_),n.context=b_(null),a=n.current,o=ci(),o=uo(o),c=qa(o),c.callback=null,Ya(a,c,o),a=o,n.current.lanes=a,Ve(n,a),qi(n),t[qn]=n.current,yh(t),new Bu(n)},tl.version="19.2.3",tl}var W_;function xM(){if(W_)return kh.exports;W_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),kh.exports=vM(),kh.exports}var SM=xM();var Cp=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,tx=/^[\\/]{2}/;function yM(s,e){return e+s.replace(/\\/g,"/")}var q_="popstate";function Y_(s){return typeof s=="object"&&s!=null&&"pathname"in s&&"search"in s&&"hash"in s&&"state"in s&&"key"in s}function MM(s={}){function e(r,l){let u=l.state?.masked,{pathname:f,search:p,hash:m}=u||r.location;return Ld("",{pathname:f,search:p,hash:m},l.state&&l.state.usr||null,l.state&&l.state.key||"default",u?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function i(r,l){return typeof l=="string"?l:xl(l)}return bM(e,i,null,s)}function nn(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function ta(s,e){if(!s){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function EM(){return Math.random().toString(36).substring(2,10)}function Z_(s,e){return{usr:s.state,key:s.key,idx:e,masked:s.mask?{pathname:s.pathname,search:s.search,hash:s.hash}:void 0}}function Ld(s,e,i=null,r,l){return{pathname:typeof s=="string"?s:s.pathname,search:"",hash:"",...typeof e=="string"?ao(e):e,state:i,key:e&&e.key||r||EM(),mask:l}}function xl({pathname:s="/",search:e="",hash:i=""}){return e&&e!=="?"&&(s+=e.charAt(0)==="?"?e:"?"+e),i&&i!=="#"&&(s+=i.charAt(0)==="#"?i:"#"+i),s}function ao(s){let e={};if(s){let i=s.indexOf("#");i>=0&&(e.hash=s.substring(i),s=s.substring(0,i));let r=s.indexOf("?");r>=0&&(e.search=s.substring(r),s=s.substring(0,r)),s&&(e.pathname=s)}return e}function bM(s,e,i,r={}){let{window:l=document.defaultView,v5Compat:u=!1}=r,f=l.history,p="POP",m=null,d=_();d==null&&(d=0,f.replaceState({...f.state,idx:d},""));function _(){return(f.state||{idx:null}).idx}function v(){p="POP";let x=_(),S=x==null?null:x-d;d=x,m&&m({action:p,location:A.location,delta:S})}function g(x,S){p="PUSH";let L=Y_(x)?x:Ld(A.location,x,S);d=_()+1;let I=Z_(L,d),C=A.createHref(L.mask||L);try{f.pushState(I,"",C)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;l.location.assign(C)}u&&m&&m({action:p,location:A.location,delta:1})}function M(x,S){p="REPLACE";let L=Y_(x)?x:Ld(A.location,x,S);d=_();let I=Z_(L,d),C=A.createHref(L.mask||L);f.replaceState(I,"",C),u&&m&&m({action:p,location:A.location,delta:0})}function T(x){return TM(l,x)}let A={get action(){return p},get location(){return s(l,f)},listen(x){if(m)throw new Error("A history only accepts one active listener");return l.addEventListener(q_,v),m=x,()=>{l.removeEventListener(q_,v),m=null}},createHref(x){return e(l,x)},createURL:T,encodeLocation(x){let S=T(x);return{pathname:S.pathname,search:S.search,hash:S.hash}},push:g,replace:M,go(x){return f.go(x)}};return A}function TM(s,e,i=!1){let r="http://localhost";s&&(r=s.location.origin!=="null"?s.location.origin:s.location.href),nn(r,"No window.location.(origin|href) available to create URL");let l=typeof e=="string"?e:xl(e);return l=l.replace(/ $/,"%20"),!i&&tx.test(l)&&(l=r+l),new URL(l,r)}function nx(s,e,i="/"){return AM(s,e,i,!1)}function AM(s,e,i,r,l){let u=typeof e=="string"?ao(e):e,f=Ua(u.pathname||"/",i);if(f==null)return null;let p=RM(s),m=null,d=zM(f);for(let _=0;m==null&&_<p.length;++_)m=BM(p[_],d,r);return m}function RM(s){let e=ix(s);return CM(e),e}function ix(s,e=[],i=[],r="",l=!1){let u=(f,p,m=l,d)=>{let _={relativePath:d===void 0?f.path||"":d,caseSensitive:f.caseSensitive===!0,childrenIndex:p,route:f};if(_.relativePath.startsWith("/")){if(!_.relativePath.startsWith(r)&&m)return;nn(_.relativePath.startsWith(r),`Absolute route path "${_.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),_.relativePath=_.relativePath.slice(r.length)}let v=Fi([r,_.relativePath]),g=i.concat(_);f.children&&f.children.length>0&&(nn(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${v}".`),ix(f.children,e,g,v,m)),!(f.path==null&&!f.index)&&e.push({path:v,score:PM(v,f.index),routesMeta:g.map((M,T)=>{let[A,x]=sx(M.relativePath,M.caseSensitive,T===g.length-1);return{...M,matcher:A,compiledParams:x}})})};return s.forEach((f,p)=>{if(f.path===""||!f.path?.includes("?"))u(f,p);else for(let m of ax(f.path))u(f,p,!0,m)}),e}function ax(s){let e=s.split("/");if(e.length===0)return[];let[i,...r]=e,l=i.endsWith("?"),u=i.replace(/\?$/,"");if(r.length===0)return l?[u,""]:[u];let f=ax(r.join("/")),p=[];return p.push(...f.map(m=>m===""?u:[u,m].join("/"))),l&&p.push(...f),p.map(m=>s.startsWith("/")&&m===""?"/":m)}function CM(s){s.sort((e,i)=>e.score!==i.score?i.score-e.score:IM(e.routesMeta.map(r=>r.childrenIndex),i.routesMeta.map(r=>r.childrenIndex)))}var wM=/^:[\w-]+$/,DM=3,UM=2,LM=1,NM=10,OM=-2,K_=s=>s==="*";function PM(s,e){let i=s.split("/"),r=i.length;return i.some(K_)&&(r+=OM),e&&(r+=UM),i.filter(l=>!K_(l)).reduce((l,u)=>l+(wM.test(u)?DM:u===""?LM:NM),r)}function IM(s,e){return s.length===e.length&&s.slice(0,-1).every((r,l)=>r===e[l])?s[s.length-1]-e[e.length-1]:0}function BM(s,e,i=!1){let{routesMeta:r}=s,l={},u="/",f=[];for(let p=0;p<r.length;++p){let m=r[p],d=p===r.length-1,_=u==="/"?e:e.slice(u.length)||"/",v={path:m.relativePath,caseSensitive:m.caseSensitive,end:d},g=m.matcher&&m.compiledParams?rx(v,_,m.matcher,m.compiledParams):xc(v,_),M=m.route;if(!g&&d&&i&&!r[r.length-1].route.index&&(g=xc({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},_)),!g)return null;Object.assign(l,g.params),f.push({params:l,pathname:Fi([u,g.pathname]),pathnameBase:GM(Fi([u,g.pathnameBase])),route:M}),g.pathnameBase!=="/"&&(u=Fi([u,g.pathnameBase]))}return f}function xc(s,e){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[i,r]=sx(s.path,s.caseSensitive,s.end);return rx(s,e,i,r)}function rx(s,e,i,r){let l=e.match(i);if(!l)return null;let u=l[0],f=u.replace(/(.)\/+$/,"$1"),p=l.slice(1);return{params:r.reduce((d,{paramName:_,isOptional:v},g)=>{if(_==="*"){let T=p[g]||"";f=u.slice(0,u.length-T.length).replace(/(.)\/+$/,"$1")}const M=p[g];return v&&!M?d[_]=void 0:d[_]=(M||"").replace(/%2F/g,"/"),d},{}),pathname:u,pathnameBase:f,pattern:s}}function sx(s,e=!1,i=!0){ta(s==="*"||!s.endsWith("*")||s.endsWith("/*"),`Route path "${s}" will be treated as if it were "${s.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/,"/*")}".`);let r=[],l="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,p,m,d,_)=>{if(r.push({paramName:p,isOptional:m!=null}),m){let v=_.charAt(d+f.length);return v&&v!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return s.endsWith("*")?(r.push({paramName:"*"}),l+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?l+="\\/*$":s!==""&&s!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,e?void 0:"i"),r]}function zM(s){try{return s.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return ta(!1,`The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),s}}function Ua(s,e){if(e==="/")return s;if(!s.toLowerCase().startsWith(e.toLowerCase()))return null;let i=e.endsWith("/")?e.length-1:e.length,r=s.charAt(i);return r&&r!=="/"?null:s.slice(i)||"/"}function FM(s,e="/"){let{pathname:i,search:r="",hash:l=""}=typeof s=="string"?ao(s):s,u;return i?(i=lx(i),i.startsWith("/")?u=Q_(i.substring(1),"/"):u=Q_(i,e)):u=e,{pathname:u,search:VM(r),hash:kM(l)}}function Q_(s,e){let i=Sc(e).split("/");return s.split("/").forEach(l=>{l===".."?i.length>1&&i.pop():l!=="."&&i.push(l)}),i.length>1?i.join("/"):"/"}function Yh(s,e,i,r){return`Cannot include a '${s}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function HM(s){return s.filter((e,i)=>i===0||e.route.path&&e.route.path.length>0)}function ox(s){let e=HM(s);return e.map((i,r)=>r===e.length-1?i.pathname:i.pathnameBase)}function wp(s,e,i,r=!1){let l;typeof s=="string"?l=ao(s):(l={...s},nn(!l.pathname||!l.pathname.includes("?"),Yh("?","pathname","search",l)),nn(!l.pathname||!l.pathname.includes("#"),Yh("#","pathname","hash",l)),nn(!l.search||!l.search.includes("#"),Yh("#","search","hash",l)));let u=s===""||l.pathname==="",f=u?"/":l.pathname,p;if(f==null)p=i;else{let v=e.length-1;if(!r&&f.startsWith("..")){let g=f.split("/");for(;g[0]==="..";)g.shift(),v-=1;l.pathname=g.join("/")}p=v>=0?e[v]:"/"}let m=FM(l,p),d=f&&f!=="/"&&f.endsWith("/"),_=(u||f===".")&&i.endsWith("/");return!m.pathname.endsWith("/")&&(d||_)&&(m.pathname+="/"),m}var lx=s=>s.replace(/[\\/]{2,}/g,"/"),Fi=s=>lx(s.join("/")),Sc=s=>s.replace(/\/+$/,""),GM=s=>Sc(s).replace(/^\/*/,"/"),VM=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,kM=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s,XM=class{constructor(s,e,i,r=!1){this.status=s,this.statusText=e||"",this.internal=r,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}};function WM(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}function qM(s){let e=s.map(i=>i.route.path).filter(Boolean);return Fi(e)||"/"}var ux=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function cx(s,e){let i=s;if(typeof i!="string"||!Cp.test(i))return{absoluteURL:void 0,isExternal:!1,to:i};let r=i,l=!1;if(ux)try{let u=new URL(window.location.href),f=tx.test(i)?new URL(yM(i,u.protocol)):new URL(i),p=Ua(f.pathname,e);f.origin===u.origin&&p!=null?i=p+f.search+f.hash:l=!0}catch{ta(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:l,to:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var fx=["POST","PUT","PATCH","DELETE"];new Set(fx);var YM=["GET",...fx];new Set(YM);var ZM=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function KM(s){try{return ZM.includes(new URL(s).protocol)}catch{return!1}}var ro=fe.createContext(null);ro.displayName="DataRouter";var Dc=fe.createContext(null);Dc.displayName="DataRouterState";var hx=fe.createContext(!1);function QM(){return fe.useContext(hx)}var dx=fe.createContext({isTransitioning:!1});dx.displayName="ViewTransition";var JM=fe.createContext(new Map);JM.displayName="Fetchers";var jM=fe.createContext(null);jM.displayName="Await";var Ri=fe.createContext(null);Ri.displayName="Navigation";var El=fe.createContext(null);El.displayName="Location";var Oa=fe.createContext({outlet:null,matches:[],isDataRoute:!1});Oa.displayName="Route";var Dp=fe.createContext(null);Dp.displayName="RouteError";var px="REACT_ROUTER_ERROR",$M="REDIRECT",eE="ROUTE_ERROR_RESPONSE";function tE(s){if(s.startsWith(`${px}:${$M}:{`))try{let e=JSON.parse(s.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function nE(s){if(s.startsWith(`${px}:${eE}:{`))try{let e=JSON.parse(s.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new XM(e.status,e.statusText,e.data)}catch{}}function iE(s,{relative:e}={}){nn(bl(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:r}=fe.useContext(Ri),{hash:l,pathname:u,search:f}=Tl(s,{relative:e}),p=u;return i!=="/"&&(p=u==="/"?i:Fi([i,u])),r.createHref({pathname:p,search:f,hash:l})}function bl(){return fe.useContext(El)!=null}function Pa(){return nn(bl(),"useLocation() may be used only in the context of a <Router> component."),fe.useContext(El).location}var mx="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function gx(s){fe.useContext(Ri).static||fe.useLayoutEffect(s)}function aE(){let{isDataRoute:s}=fe.useContext(Oa);return s?_E():rE()}function rE(){nn(bl(),"useNavigate() may be used only in the context of a <Router> component.");let s=fe.useContext(ro),{basename:e,navigator:i}=fe.useContext(Ri),{matches:r}=fe.useContext(Oa),{pathname:l}=Pa(),u=JSON.stringify(ox(r)),f=fe.useRef(!1);return gx(()=>{f.current=!0}),fe.useCallback((m,d={})=>{if(ta(f.current,mx),!f.current)return;if(typeof m=="number"){i.go(m);return}let _=wp(m,JSON.parse(u),l,d.relative==="path");s==null&&e!=="/"&&(_.pathname=_.pathname==="/"?e:Fi([e,_.pathname])),(d.replace?i.replace:i.push)(_,d.state,d)},[e,i,u,l,s])}fe.createContext(null);function Tl(s,{relative:e}={}){let{matches:i}=fe.useContext(Oa),{pathname:r}=Pa(),l=JSON.stringify(ox(i));return fe.useMemo(()=>wp(s,JSON.parse(l),r,e==="path"),[s,l,r,e])}function sE(s,e){return _x(s,e)}function _x(s,e,i){nn(bl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=fe.useContext(Ri),{matches:l}=fe.useContext(Oa),u=l[l.length-1],f=u?u.params:{},p=u?u.pathname:"/",m=u?u.pathnameBase:"/",d=u&&u.route;{let x=d&&d.path||"";xx(p,!d||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let _=Pa(),v;if(e){let x=typeof e=="string"?ao(e):e;nn(m==="/"||x.pathname?.startsWith(m),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${x.pathname}" was given in the \`location\` prop.`),v=x}else v=_;let g=v.pathname||"/",M=g;if(m!=="/"){let x=m.replace(/^\//,"").split("/");M="/"+g.replace(/^\//,"").split("/").slice(x.length).join("/")}let T=i&&i.state.matches.length?i.state.matches.map(x=>Object.assign(x,{route:i.manifest[x.route.id]||x.route})):nx(s,{pathname:M});ta(d||T!=null,`No routes matched location "${v.pathname}${v.search}${v.hash}" `),ta(T==null||T[T.length-1].route.element!==void 0||T[T.length-1].route.Component!==void 0||T[T.length-1].route.lazy!==void 0,`Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let A=fE(T&&T.map(x=>Object.assign({},x,{params:Object.assign({},f,x.params),pathname:Fi([m,r.encodeLocation?r.encodeLocation(x.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?m:Fi([m,r.encodeLocation?r.encodeLocation(x.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathnameBase])})),l,i);return e&&A?fe.createElement(El.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...v},navigationType:"POP"}},A):A}function oE(){let s=gE(),e=WM(s)?`${s.status} ${s.statusText}`:s instanceof Error?s.message:JSON.stringify(s),i=s instanceof Error?s.stack:null,r="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:r},u={padding:"2px 4px",backgroundColor:r},f=null;return console.error("Error handled by React Router default ErrorBoundary:",s),f=fe.createElement(fe.Fragment,null,fe.createElement("p",null,"💿 Hey developer 👋"),fe.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",fe.createElement("code",{style:u},"ErrorBoundary")," or"," ",fe.createElement("code",{style:u},"errorElement")," prop on your route.")),fe.createElement(fe.Fragment,null,fe.createElement("h2",null,"Unexpected Application Error!"),fe.createElement("h3",{style:{fontStyle:"italic"}},e),i?fe.createElement("pre",{style:l},i):null,f)}var lE=fe.createElement(oE,null),vx=class extends fe.Component{constructor(s){super(s),this.state={location:s.location,revalidation:s.revalidation,error:s.error}}static getDerivedStateFromError(s){return{error:s}}static getDerivedStateFromProps(s,e){return e.location!==s.location||e.revalidation!=="idle"&&s.revalidation==="idle"?{error:s.error,location:s.location,revalidation:s.revalidation}:{error:s.error!==void 0?s.error:e.error,location:e.location,revalidation:s.revalidation||e.revalidation}}componentDidCatch(s,e){this.props.onError?this.props.onError(s,e):console.error("React Router caught the following error during render",s)}render(){let s=this.state.error;if(this.context&&typeof s=="object"&&s&&"digest"in s&&typeof s.digest=="string"){const i=nE(s.digest);i&&(s=i)}let e=s!==void 0?fe.createElement(Oa.Provider,{value:this.props.routeContext},fe.createElement(Dp.Provider,{value:s,children:this.props.component})):this.props.children;return this.context?fe.createElement(uE,{error:s},e):e}};vx.contextType=hx;var Zh=new WeakMap;function uE({children:s,error:e}){let{basename:i}=fe.useContext(Ri);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let r=tE(e.digest);if(r){let l=Zh.get(e);if(l)throw l;let u=cx(r.location,i),f=u.absoluteURL||u.to;if(KM(f))throw new Error("Invalid redirect location");if(ux&&!Zh.get(e))if(u.isExternal||r.reloadDocument)window.location.href=f;else{const p=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(u.to,{replace:r.replace}));throw Zh.set(e,p),p}return fe.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f}`})}}return s}function cE({routeContext:s,match:e,children:i}){let r=fe.useContext(ro);return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=e.route.id),fe.createElement(Oa.Provider,{value:s},i)}function fE(s,e=[],i){let r=i?.state;if(s==null){if(!r)return null;if(r.errors)s=r.matches;else if(e.length===0&&!r.initialized&&r.matches.length>0)s=r.matches;else return null}let l=s,u=r?.errors;if(u!=null){let _=l.findIndex(v=>v.route.id&&u?.[v.route.id]!==void 0);nn(_>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,_+1))}let f=!1,p=-1;if(i&&r){f=r.renderFallback;for(let _=0;_<l.length;_++){let v=l[_];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(p=_),v.route.id){let{loaderData:g,errors:M}=r,T=v.route.loader&&!g.hasOwnProperty(v.route.id)&&(!M||M[v.route.id]===void 0);if(v.route.lazy||T){i.isStatic&&(f=!0),p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}}let m=i?.onError,d=r&&m?(_,v)=>{m(_,{location:r.location,params:r.matches?.[0]?.params??{},pattern:qM(r.matches),errorInfo:v})}:void 0;return l.reduceRight((_,v,g)=>{let M,T=!1,A=null,x=null;r&&(M=u&&v.route.id?u[v.route.id]:void 0,A=v.route.errorElement||lE,f&&(p<0&&g===0?(xx("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),T=!0,x=null):p===g&&(T=!0,x=v.route.hydrateFallbackElement||null)));let S=e.concat(l.slice(0,g+1)),L=()=>{let I;return M?I=A:T?I=x:v.route.Component?I=fe.createElement(v.route.Component,null):v.route.element?I=v.route.element:I=_,fe.createElement(cE,{match:v,routeContext:{outlet:_,matches:S,isDataRoute:r!=null},children:I})};return r&&(v.route.ErrorBoundary||v.route.errorElement||g===0)?fe.createElement(vx,{location:r.location,revalidation:r.revalidation,component:A,error:M,children:L(),routeContext:{outlet:null,matches:S,isDataRoute:!0},onError:d}):L()},null)}function Up(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function hE(s){let e=fe.useContext(ro);return nn(e,Up(s)),e}function dE(s){let e=fe.useContext(Dc);return nn(e,Up(s)),e}function pE(s){let e=fe.useContext(Oa);return nn(e,Up(s)),e}function Lp(s){let e=pE(s),i=e.matches[e.matches.length-1];return nn(i.route.id,`${s} can only be used on routes that contain a unique "id"`),i.route.id}function mE(){return Lp("useRouteId")}function gE(){let s=fe.useContext(Dp),e=dE("useRouteError"),i=Lp("useRouteError");return s!==void 0?s:e.errors?.[i]}function _E(){let{router:s}=hE("useNavigate"),e=Lp("useNavigate"),i=fe.useRef(!1);return gx(()=>{i.current=!0}),fe.useCallback(async(l,u={})=>{ta(i.current,mx),i.current&&(typeof l=="number"?await s.navigate(l):await s.navigate(l,{fromRouteId:e,...u}))},[s,e])}var J_={};function xx(s,e,i){!e&&!J_[s]&&(J_[s]=!0,ta(!1,i))}fe.memo(vE);function vE({routes:s,manifest:e,future:i,state:r,isStatic:l,onError:u}){return _x(s,void 0,{manifest:e,state:r,isStatic:l,onError:u})}function Sx(s){nn(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function xE({basename:s="/",children:e=null,location:i,navigationType:r="POP",navigator:l,static:u=!1,useTransitions:f}){nn(!bl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let p=s.replace(/^\/*/,"/"),m=fe.useMemo(()=>({basename:p,navigator:l,static:u,useTransitions:f,future:{}}),[p,l,u,f]);typeof i=="string"&&(i=ao(i));let{pathname:d="/",search:_="",hash:v="",state:g=null,key:M="default",mask:T}=i,A=fe.useMemo(()=>{let x=Ua(d,p);return x==null?null:{location:{pathname:x,search:_,hash:v,state:g,key:M,mask:T},navigationType:r}},[p,d,_,v,g,M,r,T]);return ta(A!=null,`<Router basename="${p}"> is not able to match the URL "${d}${_}${v}" because it does not start with the basename, so the <Router> won't render anything.`),A==null?null:fe.createElement(Ri.Provider,{value:m},fe.createElement(El.Provider,{children:e,value:A}))}function SE({children:s,location:e}){return sE(Nd(s),e)}function Nd(s,e=[]){let i=[];return fe.Children.forEach(s,(r,l)=>{if(!fe.isValidElement(r))return;let u=[...e,l];if(r.type===fe.Fragment){i.push.apply(i,Nd(r.props.children,u));return}nn(r.type===Sx,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),nn(!r.props.index||!r.props.children,"An index route cannot have child routes.");let f={id:r.props.id||u.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(f.children=Nd(r.props.children,u)),i.push(f)}),i}var fc="get",hc="application/x-www-form-urlencoded";function Uc(s){return typeof HTMLElement<"u"&&s instanceof HTMLElement}function yE(s){return Uc(s)&&s.tagName.toLowerCase()==="button"}function ME(s){return Uc(s)&&s.tagName.toLowerCase()==="form"}function EE(s){return Uc(s)&&s.tagName.toLowerCase()==="input"}function bE(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function TE(s,e){return s.button===0&&(!e||e==="_self")&&!bE(s)}var Fu=null;function AE(){if(Fu===null)try{new FormData(document.createElement("form"),0),Fu=!1}catch{Fu=!0}return Fu}var RE=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Kh(s){return s!=null&&!RE.has(s)?(ta(!1,`"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${hc}"`),null):s}function CE(s,e){let i,r,l,u,f;if(ME(s)){let p=s.getAttribute("action");r=p?Ua(p,e):null,i=s.getAttribute("method")||fc,l=Kh(s.getAttribute("enctype"))||hc,u=new FormData(s)}else if(yE(s)||EE(s)&&(s.type==="submit"||s.type==="image")){let p=s.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=s.getAttribute("formaction")||p.getAttribute("action");if(r=m?Ua(m,e):null,i=s.getAttribute("formmethod")||p.getAttribute("method")||fc,l=Kh(s.getAttribute("formenctype"))||Kh(p.getAttribute("enctype"))||hc,u=new FormData(p,s),!AE()){let{name:d,type:_,value:v}=s;if(_==="image"){let g=d?`${d}.`:"";u.append(`${g}x`,"0"),u.append(`${g}y`,"0")}else d&&u.append(d,v)}}else{if(Uc(s))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=fc,r=null,l=hc,f=s}return u&&l==="text/plain"&&(f=u,u=void 0),{action:r,method:i.toLowerCase(),encType:l,formData:u,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Np(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function yx(s,e,i,r){let l=typeof s=="string"?new URL(s,typeof window>"u"?"server://singlefetch/":window.location.origin):s;return i?l.pathname.endsWith("/")?l.pathname=`${l.pathname}_.${r}`:l.pathname=`${l.pathname}.${r}`:l.pathname==="/"?l.pathname=`_root.${r}`:e&&Ua(l.pathname,e)==="/"?l.pathname=`${Sc(e)}/_root.${r}`:l.pathname=`${Sc(l.pathname)}.${r}`,l}async function wE(s,e){if(s.id in e)return e[s.id];try{let i=await import(s.module);return e[s.id]=i,i}catch(i){return console.error(`Error loading route module \`${s.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function DE(s){return s==null?!1:s.href==null?s.rel==="preload"&&typeof s.imageSrcSet=="string"&&typeof s.imageSizes=="string":typeof s.rel=="string"&&typeof s.href=="string"}async function UE(s,e,i){let r=await Promise.all(s.map(async l=>{let u=e.routes[l.route.id];if(u){let f=await wE(u,i);return f.links?f.links():[]}return[]}));return PE(r.flat(1).filter(DE).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function j_(s,e,i,r,l,u){let f=(m,d)=>i[d]?m.route.id!==i[d].route.id:!0,p=(m,d)=>i[d].pathname!==m.pathname||i[d].route.path?.endsWith("*")&&i[d].params["*"]!==m.params["*"];return u==="assets"?e.filter((m,d)=>f(m,d)||p(m,d)):u==="data"?e.filter((m,d)=>{let _=r.routes[m.route.id];if(!_||!_.hasLoader)return!1;if(f(m,d)||p(m,d))return!0;if(m.route.shouldRevalidate){let v=m.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:i[0]?.params||{},nextUrl:new URL(s,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof v=="boolean")return v}return!0}):[]}function LE(s,e,{includeHydrateFallback:i}={}){return NE(s.map(r=>{let l=e.routes[r.route.id];if(!l)return[];let u=[l.module];return l.clientActionModule&&(u=u.concat(l.clientActionModule)),l.clientLoaderModule&&(u=u.concat(l.clientLoaderModule)),i&&l.hydrateFallbackModule&&(u=u.concat(l.hydrateFallbackModule)),l.imports&&(u=u.concat(l.imports)),u}).flat(1))}function NE(s){return[...new Set(s)]}function OE(s){let e={},i=Object.keys(s).sort();for(let r of i)e[r]=s[r];return e}function PE(s,e){let i=new Set;return new Set(e),s.reduce((r,l)=>{let u=JSON.stringify(OE(l));return i.has(u)||(i.add(u),r.push({key:u,link:l})),r},[])}function Op(){let s=fe.useContext(ro);return Np(s,"You must render this element inside a <DataRouterContext.Provider> element"),s}function IE(){let s=fe.useContext(Dc);return Np(s,"You must render this element inside a <DataRouterStateContext.Provider> element"),s}var Pp=fe.createContext(void 0);Pp.displayName="FrameworkContext";function Lc(){let s=fe.useContext(Pp);return Np(s,"You must render this element inside a <HydratedRouter> element"),s}function BE(s,e){let i=fe.useContext(Pp),[r,l]=fe.useState(!1),[u,f]=fe.useState(!1),{onFocus:p,onBlur:m,onMouseEnter:d,onMouseLeave:_,onTouchStart:v}=e,g=fe.useRef(null);fe.useEffect(()=>{if(s==="render"&&f(!0),s==="viewport"){let A=S=>{S.forEach(L=>{f(L.isIntersecting)})},x=new IntersectionObserver(A,{threshold:.5});return g.current&&x.observe(g.current),()=>{x.disconnect()}}},[s]),fe.useEffect(()=>{if(r){let A=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(A)}}},[r]);let M=()=>{l(!0)},T=()=>{l(!1),f(!1)};return i?s!=="intent"?[u,g,{}]:[u,g,{onFocus:nl(p,M),onBlur:nl(m,T),onMouseEnter:nl(d,M),onMouseLeave:nl(_,T),onTouchStart:nl(v,M)}]:[!1,g,{}]}function nl(s,e){return i=>{s&&s(i),i.defaultPrevented||e(i)}}function zE({page:s,...e}){let i=QM(),{nonce:r}=Lc(),{router:l}=Op(),u=fe.useMemo(()=>nx(l.routes,s,l.basename),[l.routes,s,l.basename]);return u?(e.nonce==null&&r&&(e={...e,nonce:r}),i?fe.createElement(HE,{page:s,matches:u,...e}):fe.createElement(GE,{page:s,matches:u,...e})):null}function FE(s){let{manifest:e,routeModules:i}=Lc(),[r,l]=fe.useState([]);return fe.useEffect(()=>{let u=!1;return UE(s,e,i).then(f=>{u||l(f)}),()=>{u=!0}},[s,e,i]),r}function HE({page:s,matches:e,...i}){let r=Pa(),{future:l}=Lc(),{basename:u}=Op(),f=fe.useMemo(()=>{if(s===r.pathname+r.search+r.hash)return[];let p=yx(s,u,l.v8_trailingSlashAwareDataRequests,"rsc"),m=!1,d=[];for(let _ of e)typeof _.route.shouldRevalidate=="function"?m=!0:d.push(_.route.id);return m&&d.length>0&&p.searchParams.set("_routes",d.join(",")),[p.pathname+p.search]},[u,l.v8_trailingSlashAwareDataRequests,s,r,e]);return fe.createElement(fe.Fragment,null,f.map(p=>fe.createElement("link",{key:p,rel:"prefetch",as:"fetch",href:p,...i})))}function GE({page:s,matches:e,...i}){let r=Pa(),{future:l,manifest:u,routeModules:f}=Lc(),{basename:p}=Op(),{loaderData:m,matches:d}=IE(),_=fe.useMemo(()=>j_(s,e,d,u,r,"data"),[s,e,d,u,r]),v=fe.useMemo(()=>j_(s,e,d,u,r,"assets"),[s,e,d,u,r]),g=fe.useMemo(()=>{if(s===r.pathname+r.search+r.hash)return[];let A=new Set,x=!1;if(e.forEach(L=>{let I=u.routes[L.route.id];!I||!I.hasLoader||(!_.some(C=>C.route.id===L.route.id)&&L.route.id in m&&f[L.route.id]?.shouldRevalidate||I.hasClientLoader?x=!0:A.add(L.route.id))}),A.size===0)return[];let S=yx(s,p,l.v8_trailingSlashAwareDataRequests,"data");return x&&A.size>0&&S.searchParams.set("_routes",e.filter(L=>A.has(L.route.id)).map(L=>L.route.id).join(",")),[S.pathname+S.search]},[p,l.v8_trailingSlashAwareDataRequests,m,r,u,_,e,s,f]),M=fe.useMemo(()=>LE(v,u),[v,u]),T=FE(v);return fe.createElement(fe.Fragment,null,g.map(A=>fe.createElement("link",{key:A,rel:"prefetch",as:"fetch",href:A,...i})),M.map(A=>fe.createElement("link",{key:A,rel:"modulepreload",href:A,...i})),T.map(({key:A,link:x})=>fe.createElement("link",{key:A,nonce:i.nonce,...x,crossOrigin:x.crossOrigin??i.crossOrigin})))}function VE(...s){return e=>{s.forEach(i=>{typeof i=="function"?i(e):i!=null&&(i.current=e)})}}var kE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{kE&&(window.__reactRouterVersion="7.18.2")}catch{}function XE({basename:s,children:e,useTransitions:i,window:r}){let l=fe.useRef();l.current==null&&(l.current=MM({window:r,v5Compat:!0}));let u=l.current,[f,p]=fe.useState({action:u.action,location:u.location}),m=fe.useCallback(d=>{i===!1?p(d):fe.startTransition(()=>p(d))},[i]);return fe.useLayoutEffect(()=>u.listen(m),[u,m]),fe.createElement(xE,{basename:s,children:e,location:f.location,navigationType:f.action,navigator:u,useTransitions:i})}var Ip=fe.forwardRef(function({onClick:e,discover:i="render",prefetch:r="none",relative:l,reloadDocument:u,replace:f,mask:p,state:m,target:d,to:_,preventScrollReset:v,viewTransition:g,defaultShouldRevalidate:M,...T},A){let{basename:x,navigator:S,useTransitions:L}=fe.useContext(Ri),I=typeof _=="string"&&Cp.test(_),C=cx(_,x);_=C.to;let N=iE(_,{relative:l}),U=Pa(),O=null;if(p){let Y=wp(p,[],U.mask?U.mask.pathname:"/",!0);x!=="/"&&(Y.pathname=Y.pathname==="/"?x:Fi([x,Y.pathname])),O=S.createHref(Y)}let[b,D,H]=BE(r,T),F=ZE(_,{replace:f,mask:p,state:m,target:d,preventScrollReset:v,relative:l,viewTransition:g,defaultShouldRevalidate:M,useTransitions:L});function k(Y){e&&e(Y),Y.defaultPrevented||F(Y)}let $=!(C.isExternal||u),ue=fe.createElement("a",{...T,...H,href:($?O:void 0)||C.absoluteURL||N,onClick:$?k:e,ref:VE(A,D),target:d,"data-discover":!I&&i==="render"?"true":void 0});return b&&!I?fe.createElement(fe.Fragment,null,ue,fe.createElement(zE,{page:N})):ue});Ip.displayName="Link";var WE=fe.forwardRef(function({"aria-current":e="page",caseSensitive:i=!1,className:r="",end:l=!1,style:u,to:f,viewTransition:p,children:m,...d},_){let v=Tl(f,{relative:d.relative}),g=Pa(),M=fe.useContext(Dc),{navigator:T,basename:A}=fe.useContext(Ri),x=M!=null&&$E(v)&&p===!0,S=T.encodeLocation?T.encodeLocation(v).pathname:v.pathname,L=g.pathname,I=M&&M.navigation&&M.navigation.location?M.navigation.location.pathname:null;i||(L=L.toLowerCase(),I=I?I.toLowerCase():null,S=S.toLowerCase()),I&&A&&(I=Ua(I,A)||I);const C=S!=="/"&&S.endsWith("/")?S.length-1:S.length;let N=L===S||!l&&L.startsWith(S)&&L.charAt(C)==="/",U=I!=null&&(I===S||!l&&I.startsWith(S)&&I.charAt(S.length)==="/"),O={isActive:N,isPending:U,isTransitioning:x},b=N?e:void 0,D;typeof r=="function"?D=r(O):D=[r,N?"active":null,U?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let H=typeof u=="function"?u(O):u;return fe.createElement(Ip,{...d,"aria-current":b,className:D,ref:_,style:H,to:f,viewTransition:p},typeof m=="function"?m(O):m)});WE.displayName="NavLink";var qE=fe.forwardRef(({discover:s="render",fetcherKey:e,navigate:i,reloadDocument:r,replace:l,state:u,method:f=fc,action:p,onSubmit:m,relative:d,preventScrollReset:_,viewTransition:v,defaultShouldRevalidate:g,...M},T)=>{let{useTransitions:A}=fe.useContext(Ri),x=JE(),S=jE(p,{relative:d}),L=f.toLowerCase()==="get"?"get":"post",I=typeof p=="string"&&Cp.test(p),C=N=>{if(m&&m(N),N.defaultPrevented)return;N.preventDefault();let U=N.nativeEvent.submitter,O=U?.getAttribute("formmethod")||f,b=()=>x(U||N.currentTarget,{fetcherKey:e,method:O,navigate:i,replace:l,state:u,relative:d,preventScrollReset:_,viewTransition:v,defaultShouldRevalidate:g});A&&i!==!1?fe.startTransition(()=>b()):b()};return fe.createElement("form",{ref:T,method:L,action:S,onSubmit:r?m:C,...M,"data-discover":!I&&s==="render"?"true":void 0})});qE.displayName="Form";function YE(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Mx(s){let e=fe.useContext(ro);return nn(e,YE(s)),e}function ZE(s,{target:e,replace:i,mask:r,state:l,preventScrollReset:u,relative:f,viewTransition:p,defaultShouldRevalidate:m,useTransitions:d}={}){let _=aE(),v=Pa(),g=Tl(s,{relative:f});return fe.useCallback(M=>{if(TE(M,e)){M.preventDefault();let T=i!==void 0?i:xl(v)===xl(g),A=()=>_(s,{replace:T,mask:r,state:l,preventScrollReset:u,relative:f,viewTransition:p,defaultShouldRevalidate:m});d?fe.startTransition(()=>A()):A()}},[v,_,g,i,r,l,e,s,u,f,p,m,d])}var KE=0,QE=()=>`__${String(++KE)}__`;function JE(){let{router:s}=Mx("useSubmit"),{basename:e}=fe.useContext(Ri),i=mE(),r=s.fetch,l=s.navigate;return fe.useCallback(async(u,f={})=>{let{action:p,method:m,encType:d,formData:_,body:v}=CE(u,e);if(f.navigate===!1){let g=f.fetcherKey||QE();await r(g,i,f.action||p,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:_,body:v,formMethod:f.method||m,formEncType:f.encType||d,flushSync:f.flushSync})}else await l(f.action||p,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:_,body:v,formMethod:f.method||m,formEncType:f.encType||d,replace:f.replace,state:f.state,fromRouteId:i,flushSync:f.flushSync,viewTransition:f.viewTransition})},[r,l,e,i])}function jE(s,{relative:e}={}){let{basename:i}=fe.useContext(Ri),r=fe.useContext(Oa);nn(r,"useFormAction must be used inside a RouteContext");let[l]=r.matches.slice(-1),u={...Tl(s||".",{relative:e})},f=Pa();if(s==null){u.search=f.search;let p=new URLSearchParams(u.search),m=p.getAll("index");if(m.some(_=>_==="")){p.delete("index"),m.filter(v=>v).forEach(v=>p.append("index",v));let _=p.toString();u.search=_?`?${_}`:""}}return(!s||s===".")&&l.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(u.pathname=u.pathname==="/"?i:Fi([i,u.pathname])),xl(u)}function $E(s,{relative:e}={}){let i=fe.useContext(dx);nn(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Mx("useViewTransitionState"),l=Tl(s,{relative:e});if(!i.isTransitioning)return!1;let u=Ua(i.currentLocation.pathname,r)||i.currentLocation.pathname,f=Ua(i.nextLocation.pathname,r)||i.nextLocation.pathname;return xc(l.pathname,f)!=null||xc(l.pathname,u)!=null}const Bp="185",eb=0,$_=1,tb=2,dc=1,nb=2,ml=3,vr=0,$n=1,Bi=2,wa=0,Js=1,ev=2,tv=3,nv=4,ib=5,Yr=100,ab=101,rb=102,sb=103,ob=104,lb=200,ub=201,cb=202,fb=203,Od=204,Pd=205,hb=206,db=207,pb=208,mb=209,gb=210,_b=211,vb=212,xb=213,Sb=214,Id=0,Bd=1,zd=2,eo=3,Fd=4,Hd=5,Gd=6,Vd=7,Ex=0,yb=1,Mb=2,$i=0,bx=1,Tx=2,Ax=3,Rx=4,Cx=5,wx=6,Dx=7,Ux=300,Jr=301,to=302,Qh=303,Jh=304,Nc=306,kd=1e3,Ca=1001,Xd=1002,Pn=1003,Eb=1004,Hu=1005,Hn=1006,jh=1007,Kr=1008,pi=1009,Lx=1010,Nx=1011,Sl=1012,zp=1013,na=1014,Ji=1015,La=1016,Fp=1017,Hp=1018,yl=1020,Ox=35902,Px=35899,Ix=1021,Bx=1022,zi=1023,Na=1026,Qr=1027,zx=1028,Gp=1029,jr=1030,Vp=1031,kp=1033,pc=33776,mc=33777,gc=33778,_c=33779,Wd=35840,qd=35841,Yd=35842,Zd=35843,Kd=36196,Qd=37492,Jd=37496,jd=37488,$d=37489,yc=37490,ep=37491,tp=37808,np=37809,ip=37810,ap=37811,rp=37812,sp=37813,op=37814,lp=37815,up=37816,cp=37817,fp=37818,hp=37819,dp=37820,pp=37821,mp=36492,gp=36494,_p=36495,vp=36283,xp=36284,Mc=36285,Sp=36286,bb=3200,yp=0,Tb=1,mr="",di="srgb",Ec="srgb-linear",bc="linear",zt="srgb",Ls=7680,iv=519,Ab=512,Rb=513,Cb=514,Xp=515,wb=516,Db=517,Wp=518,Ub=519,Mp=35044,av="300 es",ji=2e3,Ml=2001;function Lb(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Tc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Nb(){const s=Tc("canvas");return s.style.display="block",s}const rv={};function Ac(...s){const e="THREE."+s.shift();console.log(e,...s)}function Fx(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=s[1];i&&i.isStackTrace?s[0]+=" "+i.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function nt(...s){s=Fx(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...s)}}function bt(...s){s=Fx(s);const e="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...s)}}function js(...s){const e=s.join(" ");e in rv||(rv[e]=!0,nt(...s))}function Ob(s,e,i){return new Promise(function(r,l){function u(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:r()}}setTimeout(u,i)})}const Pb={[Id]:Bd,[zd]:Gd,[Fd]:Vd,[eo]:Hd,[Bd]:Id,[Gd]:zd,[Vd]:Fd,[Hd]:eo};class $r{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(i)===-1&&r[e].push(i)}hasEventListener(e,i){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(i)!==-1}removeEventListener(e,i){const r=this._listeners;if(r===void 0)return;const l=r[e];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const r=i[e.type];if(r!==void 0){e.target=this;const l=r.slice(0);for(let u=0,f=l.length;u<f;u++)l[u].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$h=Math.PI/180,Ep=180/Math.PI;function _r(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]).toLowerCase()}function Et(s,e,i){return Math.max(e,Math.min(i,s))}function Ib(s,e){return(s%e+e)%e}function ed(s,e,i){return(1-i)*s+i*e}function Qi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const $p=class $p{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,r=this.y,l=e.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Et(this.x,e.x,i.x),this.y=Et(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Et(this.x,e,i),this.y=Et(this.y,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Et(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Et(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y;return i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const r=Math.cos(i),l=Math.sin(i),u=this.x-e.x,f=this.y-e.y;return this.x=u*r-f*l+e.x,this.y=u*l+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};$p.prototype.isVector2=!0;let st=$p;class so{constructor(e=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=r,this._w=l}static slerpFlat(e,i,r,l,u,f,p){let m=r[l+0],d=r[l+1],_=r[l+2],v=r[l+3],g=u[f+0],M=u[f+1],T=u[f+2],A=u[f+3];if(v!==A||m!==g||d!==M||_!==T){let x=m*g+d*M+_*T+v*A;x<0&&(g=-g,M=-M,T=-T,A=-A,x=-x);let S=1-p;if(x<.9995){const L=Math.acos(x),I=Math.sin(L);S=Math.sin(S*L)/I,p=Math.sin(p*L)/I,m=m*S+g*p,d=d*S+M*p,_=_*S+T*p,v=v*S+A*p}else{m=m*S+g*p,d=d*S+M*p,_=_*S+T*p,v=v*S+A*p;const L=1/Math.sqrt(m*m+d*d+_*_+v*v);m*=L,d*=L,_*=L,v*=L}}e[i]=m,e[i+1]=d,e[i+2]=_,e[i+3]=v}static multiplyQuaternionsFlat(e,i,r,l,u,f){const p=r[l],m=r[l+1],d=r[l+2],_=r[l+3],v=u[f],g=u[f+1],M=u[f+2],T=u[f+3];return e[i]=p*T+_*v+m*M-d*g,e[i+1]=m*T+_*g+d*v-p*M,e[i+2]=d*T+_*M+p*g-m*v,e[i+3]=_*T-p*v-m*g-d*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,r,l){return this._x=e,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const r=e._x,l=e._y,u=e._z,f=e._order,p=Math.cos,m=Math.sin,d=p(r/2),_=p(l/2),v=p(u/2),g=m(r/2),M=m(l/2),T=m(u/2);switch(f){case"XYZ":this._x=g*_*v+d*M*T,this._y=d*M*v-g*_*T,this._z=d*_*T+g*M*v,this._w=d*_*v-g*M*T;break;case"YXZ":this._x=g*_*v+d*M*T,this._y=d*M*v-g*_*T,this._z=d*_*T-g*M*v,this._w=d*_*v+g*M*T;break;case"ZXY":this._x=g*_*v-d*M*T,this._y=d*M*v+g*_*T,this._z=d*_*T+g*M*v,this._w=d*_*v-g*M*T;break;case"ZYX":this._x=g*_*v-d*M*T,this._y=d*M*v+g*_*T,this._z=d*_*T-g*M*v,this._w=d*_*v+g*M*T;break;case"YZX":this._x=g*_*v+d*M*T,this._y=d*M*v+g*_*T,this._z=d*_*T-g*M*v,this._w=d*_*v-g*M*T;break;case"XZY":this._x=g*_*v-d*M*T,this._y=d*M*v-g*_*T,this._z=d*_*T+g*M*v,this._w=d*_*v+g*M*T;break;default:nt("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const r=i/2,l=Math.sin(r);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,r=i[0],l=i[4],u=i[8],f=i[1],p=i[5],m=i[9],d=i[2],_=i[6],v=i[10],g=r+p+v;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(_-m)*M,this._y=(u-d)*M,this._z=(f-l)*M}else if(r>p&&r>v){const M=2*Math.sqrt(1+r-p-v);this._w=(_-m)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(u+d)/M}else if(p>v){const M=2*Math.sqrt(1+p-r-v);this._w=(u-d)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(m+_)/M}else{const M=2*Math.sqrt(1+v-r-p);this._w=(f-l)/M,this._x=(u+d)/M,this._y=(m+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let r=e.dot(i)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,i){const r=this.angleTo(e);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const r=e._x,l=e._y,u=e._z,f=e._w,p=i._x,m=i._y,d=i._z,_=i._w;return this._x=r*_+f*p+l*d-u*m,this._y=l*_+f*m+u*p-r*d,this._z=u*_+f*d+r*m-l*p,this._w=f*_-r*p-l*m-u*d,this._onChangeCallback(),this}slerp(e,i){let r=e._x,l=e._y,u=e._z,f=e._w,p=this.dot(e);p<0&&(r=-r,l=-l,u=-u,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),_=Math.sin(d);m=Math.sin(m*d)/_,i=Math.sin(i*d)/_,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+u*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+u*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,r){return this.copy(e).slerp(i,r)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(l*Math.sin(e),l*Math.cos(e),u*Math.sin(i),u*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const em=class em{constructor(e=0,i=0,r=0){this.x=e,this.y=i,this.z=r}set(e,i,r){return r===void 0&&(r=this.z),this.x=e,this.y=i,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(sv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(sv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,r=this.y,l=this.z,u=e.elements;return this.x=u[0]*i+u[3]*r+u[6]*l,this.y=u[1]*i+u[4]*r+u[7]*l,this.z=u[2]*i+u[5]*r+u[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,u=e.elements,f=1/(u[3]*i+u[7]*r+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*r+u[8]*l+u[12])*f,this.y=(u[1]*i+u[5]*r+u[9]*l+u[13])*f,this.z=(u[2]*i+u[6]*r+u[10]*l+u[14])*f,this}applyQuaternion(e){const i=this.x,r=this.y,l=this.z,u=e.x,f=e.y,p=e.z,m=e.w,d=2*(f*l-p*r),_=2*(p*i-u*l),v=2*(u*r-f*i);return this.x=i+m*d+f*v-p*_,this.y=r+m*_+p*d-u*v,this.z=l+m*v+u*_-f*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,r=this.y,l=this.z,u=e.elements;return this.x=u[0]*i+u[4]*r+u[8]*l,this.y=u[1]*i+u[5]*r+u[9]*l,this.z=u[2]*i+u[6]*r+u[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Et(this.x,e.x,i.x),this.y=Et(this.y,e.y,i.y),this.z=Et(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Et(this.x,e,i),this.y=Et(this.y,e,i),this.z=Et(this.z,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Et(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const r=e.x,l=e.y,u=e.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-u*p,this.y=u*f-r*m,this.z=r*p-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const r=e.dot(this)/i;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return td.copy(this).projectOnVector(e),this.sub(td)}reflect(e){return this.sub(td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(e)/i;return Math.acos(Et(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,r=this.y-e.y,l=this.z-e.z;return i*i+r*r+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,r){const l=Math.sin(i)*e;return this.x=l*Math.sin(r),this.y=Math.cos(i)*e,this.z=l*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,r){return this.x=e*Math.sin(i),this.y=r,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(e),this.y=i,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};em.prototype.isVector3=!0;let j=em;const td=new j,sv=new so,tm=class tm{constructor(e,i,r,l,u,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,r,l,u,f,p,m,d)}set(e,i,r,l,u,f,p,m,d){const _=this.elements;return _[0]=e,_[1]=l,_[2]=p,_[3]=i,_[4]=u,_[5]=m,_[6]=r,_[7]=f,_[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(e,i,r){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,u=this.elements,f=r[0],p=r[3],m=r[6],d=r[1],_=r[4],v=r[7],g=r[2],M=r[5],T=r[8],A=l[0],x=l[3],S=l[6],L=l[1],I=l[4],C=l[7],N=l[2],U=l[5],O=l[8];return u[0]=f*A+p*L+m*N,u[3]=f*x+p*I+m*U,u[6]=f*S+p*C+m*O,u[1]=d*A+_*L+v*N,u[4]=d*x+_*I+v*U,u[7]=d*S+_*C+v*O,u[2]=g*A+M*L+T*N,u[5]=g*x+M*I+T*U,u[8]=g*S+M*C+T*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[1],l=e[2],u=e[3],f=e[4],p=e[5],m=e[6],d=e[7],_=e[8];return i*f*_-i*p*d-r*u*_+r*p*m+l*u*d-l*f*m}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],u=e[3],f=e[4],p=e[5],m=e[6],d=e[7],_=e[8],v=_*f-p*d,g=p*m-_*u,M=d*u-f*m,T=i*v+r*g+l*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=v*A,e[1]=(l*d-_*r)*A,e[2]=(p*r-l*f)*A,e[3]=g*A,e[4]=(_*i-l*m)*A,e[5]=(l*u-p*i)*A,e[6]=M*A,e[7]=(r*m-d*i)*A,e[8]=(f*i-r*u)*A,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,r,l,u,f,p){const m=Math.cos(u),d=Math.sin(u);return this.set(r*m,r*d,-r*(m*f+d*p)+f+e,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(e,i){return js("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nd.makeScale(e,i)),this}rotate(e){return js("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nd.makeRotation(-e)),this}translate(e,i){return js("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<9;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};tm.prototype.isMatrix3=!0;let rt=tm;const nd=new rt,ov=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lv=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bb(){const s={enabled:!0,workingColorSpace:Ec,spaces:{},convert:function(l,u,f){return this.enabled===!1||u===f||!u||!f||(this.spaces[u].transfer===zt&&(l.r=Da(l.r),l.g=Da(l.g),l.b=Da(l.b)),this.spaces[u].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===zt&&(l.r=$s(l.r),l.g=$s(l.g),l.b=$s(l.b))),l},workingToColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},colorSpaceToWorking:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===mr?bc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,f){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,u){return js("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,u)},toWorkingColorSpace:function(l,u){return js("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,u)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Ec]:{primaries:e,whitePoint:r,transfer:bc,toXYZ:ov,fromXYZ:lv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:di},outputColorSpaceConfig:{drawingBufferColorSpace:di}},[di]:{primaries:e,whitePoint:r,transfer:zt,toXYZ:ov,fromXYZ:lv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:di}}}),s}const Mt=Bb();function Da(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function $s(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ns;class zb{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Ns===void 0&&(Ns=Tc("canvas")),Ns.width=e.width,Ns.height=e.height;const l=Ns.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),r=Ns}return r.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Tc("canvas");i.width=e.width,i.height=e.height;const r=i.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const l=r.getImageData(0,0,e.width,e.height),u=l.data;for(let f=0;f<u.length;f++)u[f]=Da(u[f]/255)*255;return r.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Da(i[r]/255)*255):i[r]=Da(i[r]);return{data:i,width:e.width,height:e.height}}else return nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fb=0;class qp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fb++}),this.uuid=_r(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?u.push(id(l[f].image)):u.push(id(l[f]))}else u=id(l);r.url=u}return i||(e.images[this.uuid]=r),r}}function id(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?zb.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(nt("Texture: Unable to serialize Texture."),{})}let Hb=0;const ad=new j;class Gn extends $r{constructor(e=Gn.DEFAULT_IMAGE,i=Gn.DEFAULT_MAPPING,r=Ca,l=Ca,u=Hn,f=Kr,p=zi,m=pi,d=Gn.DEFAULT_ANISOTROPY,_=mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hb++}),this.uuid=_r(),this.name="",this.source=new qp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=u,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ad).x}get height(){return this.source.getSize(ad).y}get depth(){return this.source.getSize(ad).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const r=e[i];if(r===void 0){nt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){nt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ux)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kd:e.x=e.x-Math.floor(e.x);break;case Ca:e.x=e.x<0?0:1;break;case Xd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kd:e.y=e.y-Math.floor(e.y);break;case Ca:e.y=e.y<0?0:1;break;case Xd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=Ux;Gn.DEFAULT_ANISOTROPY=1;const nm=class nm{constructor(e=0,i=0,r=0,l=1){this.x=e,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,r,l){return this.x=e,this.y=i,this.z=r,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,r=this.y,l=this.z,u=this.w,f=e.elements;return this.x=f[0]*i+f[4]*r+f[8]*l+f[12]*u,this.y=f[1]*i+f[5]*r+f[9]*l+f[13]*u,this.z=f[2]*i+f[6]*r+f[10]*l+f[14]*u,this.w=f[3]*i+f[7]*r+f[11]*l+f[15]*u,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,r,l,u;const m=e.elements,d=m[0],_=m[4],v=m[8],g=m[1],M=m[5],T=m[9],A=m[2],x=m[6],S=m[10];if(Math.abs(_-g)<.01&&Math.abs(v-A)<.01&&Math.abs(T-x)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+A)<.1&&Math.abs(T+x)<.1&&Math.abs(d+M+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(d+1)/2,C=(M+1)/2,N=(S+1)/2,U=(_+g)/4,O=(v+A)/4,b=(T+x)/4;return I>C&&I>N?I<.01?(r=0,l=.707106781,u=.707106781):(r=Math.sqrt(I),l=U/r,u=O/r):C>N?C<.01?(r=.707106781,l=0,u=.707106781):(l=Math.sqrt(C),r=U/l,u=b/l):N<.01?(r=.707106781,l=.707106781,u=0):(u=Math.sqrt(N),r=O/u,l=b/u),this.set(r,l,u,i),this}let L=Math.sqrt((x-T)*(x-T)+(v-A)*(v-A)+(g-_)*(g-_));return Math.abs(L)<.001&&(L=1),this.x=(x-T)/L,this.y=(v-A)/L,this.z=(g-_)/L,this.w=Math.acos((d+M+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Et(this.x,e.x,i.x),this.y=Et(this.y,e.y,i.y),this.z=Et(this.z,e.z,i.z),this.w=Et(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Et(this.x,e,i),this.y=Et(this.y,e,i),this.z=Et(this.z,e,i),this.w=Et(this.w,e,i),this}clampLength(e,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Et(r,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,r){return this.x=e.x+(i.x-e.x)*r,this.y=e.y+(i.y-e.y)*r,this.z=e.z+(i.z-e.z)*r,this.w=e.w+(i.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nm.prototype.isVector4=!0;let tn=nm;class Gb extends $r{constructor(e=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=r.depth,this.scissor=new tn(0,0,e,i),this.scissorTest=!1,this.viewport=new tn(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:r.depth},u=new Gn(l),f=r.count;for(let p=0;p<f;p++)this.textures[p]=u.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,r=1){if(this.width!==e||this.height!==i||this.depth!==r){this.width=e,this.height=i,this.depth=r;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new qp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ea extends Gb{constructor(e=1,i=1,r={}){super(e,i,r),this.isWebGLRenderTarget=!0}}class Hx extends Gn{constructor(e=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Ca,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vb extends Gn{constructor(e=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:r,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Ca,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wc=class wc{constructor(e,i,r,l,u,f,p,m,d,_,v,g,M,T,A,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,r,l,u,f,p,m,d,_,v,g,M,T,A,x)}set(e,i,r,l,u,f,p,m,d,_,v,g,M,T,A,x){const S=this.elements;return S[0]=e,S[4]=i,S[8]=r,S[12]=l,S[1]=u,S[5]=f,S[9]=p,S[13]=m,S[2]=d,S[6]=_,S[10]=v,S[14]=g,S[3]=M,S[7]=T,S[11]=A,S[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wc().fromArray(this.elements)}copy(e){const i=this.elements,r=e.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(e){const i=this.elements,r=e.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,r){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,i,r){return this.set(e.x,i.x,r.x,0,e.y,i.y,r.y,0,e.z,i.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,r=e.elements,l=1/Os.setFromMatrixColumn(e,0).length(),u=1/Os.setFromMatrixColumn(e,1).length(),f=1/Os.setFromMatrixColumn(e,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*u,i[5]=r[5]*u,i[6]=r[6]*u,i[7]=0,i[8]=r[8]*f,i[9]=r[9]*f,i[10]=r[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,r=e.x,l=e.y,u=e.z,f=Math.cos(r),p=Math.sin(r),m=Math.cos(l),d=Math.sin(l),_=Math.cos(u),v=Math.sin(u);if(e.order==="XYZ"){const g=f*_,M=f*v,T=p*_,A=p*v;i[0]=m*_,i[4]=-m*v,i[8]=d,i[1]=M+T*d,i[5]=g-A*d,i[9]=-p*m,i[2]=A-g*d,i[6]=T+M*d,i[10]=f*m}else if(e.order==="YXZ"){const g=m*_,M=m*v,T=d*_,A=d*v;i[0]=g+A*p,i[4]=T*p-M,i[8]=f*d,i[1]=f*v,i[5]=f*_,i[9]=-p,i[2]=M*p-T,i[6]=A+g*p,i[10]=f*m}else if(e.order==="ZXY"){const g=m*_,M=m*v,T=d*_,A=d*v;i[0]=g-A*p,i[4]=-f*v,i[8]=T+M*p,i[1]=M+T*p,i[5]=f*_,i[9]=A-g*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(e.order==="ZYX"){const g=f*_,M=f*v,T=p*_,A=p*v;i[0]=m*_,i[4]=T*d-M,i[8]=g*d+A,i[1]=m*v,i[5]=A*d+g,i[9]=M*d-T,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,M=f*d,T=p*m,A=p*d;i[0]=m*_,i[4]=A-g*v,i[8]=T*v+M,i[1]=v,i[5]=f*_,i[9]=-p*_,i[2]=-d*_,i[6]=M*v+T,i[10]=g-A*v}else if(e.order==="XZY"){const g=f*m,M=f*d,T=p*m,A=p*d;i[0]=m*_,i[4]=-v,i[8]=d*_,i[1]=g*v+A,i[5]=f*_,i[9]=M*v-T,i[2]=T*v-M,i[6]=p*_,i[10]=A*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kb,e,Xb)}lookAt(e,i,r){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),ur.crossVectors(r,fi),ur.lengthSq()===0&&(Math.abs(r.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),ur.crossVectors(r,fi)),ur.normalize(),Gu.crossVectors(fi,ur),l[0]=ur.x,l[4]=Gu.x,l[8]=fi.x,l[1]=ur.y,l[5]=Gu.y,l[9]=fi.y,l[2]=ur.z,l[6]=Gu.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const r=e.elements,l=i.elements,u=this.elements,f=r[0],p=r[4],m=r[8],d=r[12],_=r[1],v=r[5],g=r[9],M=r[13],T=r[2],A=r[6],x=r[10],S=r[14],L=r[3],I=r[7],C=r[11],N=r[15],U=l[0],O=l[4],b=l[8],D=l[12],H=l[1],F=l[5],k=l[9],$=l[13],ue=l[2],Y=l[6],z=l[10],V=l[14],ne=l[3],_e=l[7],be=l[11],B=l[15];return u[0]=f*U+p*H+m*ue+d*ne,u[4]=f*O+p*F+m*Y+d*_e,u[8]=f*b+p*k+m*z+d*be,u[12]=f*D+p*$+m*V+d*B,u[1]=_*U+v*H+g*ue+M*ne,u[5]=_*O+v*F+g*Y+M*_e,u[9]=_*b+v*k+g*z+M*be,u[13]=_*D+v*$+g*V+M*B,u[2]=T*U+A*H+x*ue+S*ne,u[6]=T*O+A*F+x*Y+S*_e,u[10]=T*b+A*k+x*z+S*be,u[14]=T*D+A*$+x*V+S*B,u[3]=L*U+I*H+C*ue+N*ne,u[7]=L*O+I*F+C*Y+N*_e,u[11]=L*b+I*k+C*z+N*be,u[15]=L*D+I*$+C*V+N*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],r=e[4],l=e[8],u=e[12],f=e[1],p=e[5],m=e[9],d=e[13],_=e[2],v=e[6],g=e[10],M=e[14],T=e[3],A=e[7],x=e[11],S=e[15],L=m*M-d*g,I=p*M-d*v,C=p*g-m*v,N=f*M-d*_,U=f*g-m*_,O=f*v-p*_;return i*(A*L-x*I+S*C)-r*(T*L-x*N+S*U)+l*(T*I-A*N+S*O)-u*(T*C-A*U+x*O)}determinantAffine(){const e=this.elements,i=e[0],r=e[4],l=e[8],u=e[1],f=e[5],p=e[9],m=e[2],d=e[6],_=e[10];return i*(f*_-p*d)-r*(u*_-p*m)+l*(u*d-f*m)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,r){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=r),this}invert(){const e=this.elements,i=e[0],r=e[1],l=e[2],u=e[3],f=e[4],p=e[5],m=e[6],d=e[7],_=e[8],v=e[9],g=e[10],M=e[11],T=e[12],A=e[13],x=e[14],S=e[15],L=i*p-r*f,I=i*m-l*f,C=i*d-u*f,N=r*m-l*p,U=r*d-u*p,O=l*d-u*m,b=_*A-v*T,D=_*x-g*T,H=_*S-M*T,F=v*x-g*A,k=v*S-M*A,$=g*S-M*x,ue=L*$-I*k+C*F+N*H-U*D+O*b;if(ue===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/ue;return e[0]=(p*$-m*k+d*F)*Y,e[1]=(l*k-r*$-u*F)*Y,e[2]=(A*O-x*U+S*N)*Y,e[3]=(g*U-v*O-M*N)*Y,e[4]=(m*H-f*$-d*D)*Y,e[5]=(i*$-l*H+u*D)*Y,e[6]=(x*C-T*O-S*I)*Y,e[7]=(_*O-g*C+M*I)*Y,e[8]=(f*k-p*H+d*b)*Y,e[9]=(r*H-i*k-u*b)*Y,e[10]=(T*U-A*C+S*L)*Y,e[11]=(v*C-_*U-M*L)*Y,e[12]=(p*D-f*F-m*b)*Y,e[13]=(i*F-r*D+l*b)*Y,e[14]=(A*I-T*N-x*L)*Y,e[15]=(_*N-v*I+g*L)*Y,this}scale(e){const i=this.elements,r=e.x,l=e.y,u=e.z;return i[0]*=r,i[4]*=l,i[8]*=u,i[1]*=r,i[5]*=l,i[9]*=u,i[2]*=r,i[6]*=l,i[10]*=u,i[3]*=r,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(e,i,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),r=Math.sin(e);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const r=Math.cos(i),l=Math.sin(i),u=1-r,f=e.x,p=e.y,m=e.z,d=u*f,_=u*p;return this.set(d*f+r,d*p-l*m,d*m+l*p,0,d*p+l*m,_*p+r,_*m-l*f,0,d*m-l*p,_*m+l*f,u*m*m+r,0,0,0,0,1),this}makeScale(e,i,r){return this.set(e,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,i,r,l,u,f){return this.set(1,r,u,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,r){const l=this.elements,u=i._x,f=i._y,p=i._z,m=i._w,d=u+u,_=f+f,v=p+p,g=u*d,M=u*_,T=u*v,A=f*_,x=f*v,S=p*v,L=m*d,I=m*_,C=m*v,N=r.x,U=r.y,O=r.z;return l[0]=(1-(A+S))*N,l[1]=(M+C)*N,l[2]=(T-I)*N,l[3]=0,l[4]=(M-C)*U,l[5]=(1-(g+S))*U,l[6]=(x+L)*U,l[7]=0,l[8]=(T+I)*O,l[9]=(x-L)*O,l[10]=(1-(g+A))*O,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,r){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const u=this.determinantAffine();if(u===0)return r.set(1,1,1),i.identity(),this;let f=Os.set(l[0],l[1],l[2]).length();const p=Os.set(l[4],l[5],l[6]).length(),m=Os.set(l[8],l[9],l[10]).length();u<0&&(f=-f),Ni.copy(this);const d=1/f,_=1/p,v=1/m;return Ni.elements[0]*=d,Ni.elements[1]*=d,Ni.elements[2]*=d,Ni.elements[4]*=_,Ni.elements[5]*=_,Ni.elements[6]*=_,Ni.elements[8]*=v,Ni.elements[9]*=v,Ni.elements[10]*=v,i.setFromRotationMatrix(Ni),r.x=f,r.y=p,r.z=m,this}makePerspective(e,i,r,l,u,f,p=ji,m=!1){const d=this.elements,_=2*u/(i-e),v=2*u/(r-l),g=(i+e)/(i-e),M=(r+l)/(r-l);let T,A;if(m)T=u/(f-u),A=f*u/(f-u);else if(p===ji)T=-(f+u)/(f-u),A=-2*f*u/(f-u);else if(p===Ml)T=-f/(f-u),A=-f*u/(f-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=_,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=v,d[9]=M,d[13]=0,d[2]=0,d[6]=0,d[10]=T,d[14]=A,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,i,r,l,u,f,p=ji,m=!1){const d=this.elements,_=2/(i-e),v=2/(r-l),g=-(i+e)/(i-e),M=-(r+l)/(r-l);let T,A;if(m)T=1/(f-u),A=f/(f-u);else if(p===ji)T=-2/(f-u),A=-(f+u)/(f-u);else if(p===Ml)T=-1/(f-u),A=-u/(f-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=_,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=v,d[9]=0,d[13]=M,d[2]=0,d[6]=0,d[10]=T,d[14]=A,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const i=this.elements,r=e.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(e,i=0){for(let r=0;r<16;r++)this.elements[r]=e[r+i];return this}toArray(e=[],i=0){const r=this.elements;return e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2],e[i+3]=r[3],e[i+4]=r[4],e[i+5]=r[5],e[i+6]=r[6],e[i+7]=r[7],e[i+8]=r[8],e[i+9]=r[9],e[i+10]=r[10],e[i+11]=r[11],e[i+12]=r[12],e[i+13]=r[13],e[i+14]=r[14],e[i+15]=r[15],e}};wc.prototype.isMatrix4=!0;let an=wc;const Os=new j,Ni=new an,kb=new j(0,0,0),Xb=new j(1,1,1),ur=new j,Gu=new j,fi=new j,uv=new an,cv=new so;class xr{constructor(e=0,i=0,r=0,l=xr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,r,l=this._order){return this._x=e,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,r=!0){const l=e.elements,u=l[0],f=l[4],p=l[8],m=l[1],d=l[5],_=l[9],v=l[2],g=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Et(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-f,u)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(p,M),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-v,u),this._z=0);break;case"ZXY":this._x=Math.asin(Et(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-Et(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(Et(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,d),this._y=Math.atan2(-v,u)):(this._x=0,this._y=Math.atan2(p,M));break;case"XZY":this._z=Math.asin(-Et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,u)):(this._x=Math.atan2(-_,M),this._y=0);break;default:nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,r){return uv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uv,i,r)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return cv.setFromEuler(this),this.setFromQuaternion(cv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xr.DEFAULT_ORDER="XYZ";class Gx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wb=0;const fv=new j,Ps=new so,Ea=new an,Vu=new j,il=new j,qb=new j,Yb=new so,hv=new j(1,0,0),dv=new j(0,1,0),pv=new j(0,0,1),mv={type:"added"},Zb={type:"removed"},Is={type:"childadded",child:null},rd={type:"childremoved",child:null};class wn extends $r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wb++}),this.uuid=_r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const e=new j,i=new xr,r=new so,l=new j(1,1,1);function u(){r.setFromEuler(i,!1)}function f(){i.setFromQuaternion(r,void 0,!1)}i._onChange(u),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new an},normalMatrix:{value:new rt}}),this.matrix=new an,this.matrixWorld=new an,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Ps.setFromAxisAngle(e,i),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,i){return Ps.setFromAxisAngle(e,i),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(hv,e)}rotateY(e){return this.rotateOnAxis(dv,e)}rotateZ(e){return this.rotateOnAxis(pv,e)}translateOnAxis(e,i){return fv.copy(e).applyQuaternion(this.quaternion),this.position.add(fv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(hv,e)}translateY(e){return this.translateOnAxis(dv,e)}translateZ(e){return this.translateOnAxis(pv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ea.copy(this.matrixWorld).invert())}lookAt(e,i,r){e.isVector3?Vu.copy(e):Vu.set(e,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),il.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ea.lookAt(il,Vu,this.up):Ea.lookAt(Vu,il,this.up),this.quaternion.setFromRotationMatrix(Ea),l&&(Ea.extractRotation(l.matrixWorld),Ps.setFromRotationMatrix(Ea),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(bt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mv),Is.child=e,this.dispatchEvent(Is),Is.child=null):bt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(Zb),rd.child=e,this.dispatchEvent(rd),rd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mv),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const f=this.children[r].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,r=[]){this[e]===i&&r.push(this);const l=this.children;for(let u=0,f=l.length;u<f;u++)l[u].getObjectsByProperty(e,i,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(il,e,qb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(il,Yb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,r=e.y,l=e.z,u=this.matrix.elements;u[12]+=i-u[0]*i-u[4]*r-u[8]*l,u[13]+=r-u[1]*i-u[5]*r-u[9]*l,u[14]+=l-u[2]*i-u[6]*r-u[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(e)}updateWorldMatrix(e,i,r=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){const u=this.children;for(let f=0,p=u.length;f<p;f++)u[f].updateWorldMatrix(!1,!0,r)}}toJSON(e){const i=e===void 0||typeof e=="string",r={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function u(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(e.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,_=m.length;d<_;d++){const v=m[d];u(e.shapes,v)}else u(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(u(e.materials,this.material[m]));l.material=p}else l.material=u(e.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(u(e.animations,m))}}if(i){const p=f(e.geometries),m=f(e.materials),d=f(e.textures),_=f(e.images),v=f(e.shapes),g=f(e.skeletons),M=f(e.animations),T=f(e.nodes);p.length>0&&(r.geometries=p),m.length>0&&(r.materials=m),d.length>0&&(r.textures=d),_.length>0&&(r.images=_),v.length>0&&(r.shapes=v),g.length>0&&(r.skeletons=g),M.length>0&&(r.animations=M),T.length>0&&(r.nodes=T)}return r.object=l,r;function f(p){const m=[];for(const d in p){const _=p[d];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let r=0;r<e.children.length;r++){const l=e.children[r];this.add(l.clone())}return this}}wn.DEFAULT_UP=new j(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ii extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Kb={type:"move"};class sd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const r of e.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,r){let l=null,u=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(d&&e.hand){f=!0;for(const A of e.hand.values()){const x=i.getJointPose(A,r),S=this._getHandJoint(d,A);x!==null&&(S.matrix.fromArray(x.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=x.radius),S.visible=x!==null}const _=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],g=_.position.distanceTo(v.position),M=.02,T=.005;d.inputState.pinching&&g>M+T?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=M-T&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(u=i.getPose(e.gripSpace,r),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));p!==null&&(l=i.getPose(e.targetRaySpace,r),l===null&&u!==null&&(l=u),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Kb)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=u!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const r=new Ii;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[i.jointName]=r,e.add(r)}return e.joints[i.jointName]}}const Vx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cr={h:0,s:0,l:0},ku={h:0,s:0,l:0};function od(s,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(e-s)*6*i:i<1/2?e:i<2/3?s+(e-s)*6*(2/3-i):s}class gt{constructor(e,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,r)}set(e,i,r){if(i===void 0&&r===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=di){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,i),this}setRGB(e,i,r,l=Mt.workingColorSpace){return this.r=e,this.g=i,this.b=r,Mt.colorSpaceToWorking(this,l),this}setHSL(e,i,r,l=Mt.workingColorSpace){if(e=Ib(e,1),i=Et(i,0,1),r=Et(r,0,1),i===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+i):r+i-r*i,f=2*r-u;this.r=od(f,u,e+1/3),this.g=od(f,u,e),this.b=od(f,u,e-1/3)}return Mt.colorSpaceToWorking(this,l),this}setStyle(e,i=di){function r(u){u!==void 0&&parseFloat(u)<1&&nt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let u;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:nt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const u=l[1],f=u.length;if(f===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(u,16),i);nt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=di){const r=Vx[e.toLowerCase()];return r!==void 0?this.setHex(r,i):nt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Da(e.r),this.g=Da(e.g),this.b=Da(e.b),this}copyLinearToSRGB(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=di){return Mt.workingToColorSpace(Fn.copy(this),e),Math.round(Et(Fn.r*255,0,255))*65536+Math.round(Et(Fn.g*255,0,255))*256+Math.round(Et(Fn.b*255,0,255))}getHexString(e=di){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Mt.workingColorSpace){Mt.workingToColorSpace(Fn.copy(this),i);const r=Fn.r,l=Fn.g,u=Fn.b,f=Math.max(r,l,u),p=Math.min(r,l,u);let m,d;const _=(p+f)/2;if(p===f)m=0,d=0;else{const v=f-p;switch(d=_<=.5?v/(f+p):v/(2-f-p),f){case r:m=(l-u)/v+(l<u?6:0);break;case l:m=(u-r)/v+2;break;case u:m=(r-l)/v+4;break}m/=6}return e.h=m,e.s=d,e.l=_,e}getRGB(e,i=Mt.workingColorSpace){return Mt.workingToColorSpace(Fn.copy(this),i),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=di){Mt.workingToColorSpace(Fn.copy(this),e);const i=Fn.r,r=Fn.g,l=Fn.b;return e!==di?`color(${e} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(e,i,r){return this.getHSL(cr),this.setHSL(cr.h+e,cr.s+i,cr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,r){return this.r=e.r+(i.r-e.r)*r,this.g=e.g+(i.g-e.g)*r,this.b=e.b+(i.b-e.b)*r,this}lerpHSL(e,i){this.getHSL(cr),e.getHSL(ku);const r=ed(cr.h,ku.h,i),l=ed(cr.s,ku.s,i),u=ed(cr.l,ku.l,i);return this.setHSL(r,l,u),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,r=this.g,l=this.b,u=e.elements;return this.r=u[0]*i+u[3]*r+u[6]*l,this.g=u[1]*i+u[4]*r+u[7]*l,this.b=u[2]*i+u[5]*r+u[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fn=new gt;gt.NAMES=Vx;class Yp{constructor(e,i=1,r=1e3){this.isFog=!0,this.name="",this.color=new gt(e),this.near=i,this.far=r}clone(){return new Yp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qb extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xr,this.environmentIntensity=1,this.environmentRotation=new xr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Oi=new j,ba=new j,ld=new j,Ta=new j,Bs=new j,zs=new j,gv=new j,ud=new j,cd=new j,fd=new j,hd=new tn,dd=new tn,pd=new tn;class Ai{constructor(e=new j,i=new j,r=new j){this.a=e,this.b=i,this.c=r}static getNormal(e,i,r,l){l.subVectors(r,i),Oi.subVectors(e,i),l.cross(Oi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(e,i,r,l,u){Oi.subVectors(l,i),ba.subVectors(r,i),ld.subVectors(e,i);const f=Oi.dot(Oi),p=Oi.dot(ba),m=Oi.dot(ld),d=ba.dot(ba),_=ba.dot(ld),v=f*d-p*p;if(v===0)return u.set(0,0,0),null;const g=1/v,M=(d*m-p*_)*g,T=(f*_-p*m)*g;return u.set(1-M-T,T,M)}static containsPoint(e,i,r,l){return this.getBarycoord(e,i,r,l,Ta)===null?!1:Ta.x>=0&&Ta.y>=0&&Ta.x+Ta.y<=1}static getInterpolation(e,i,r,l,u,f,p,m){return this.getBarycoord(e,i,r,l,Ta)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,Ta.x),m.addScaledVector(f,Ta.y),m.addScaledVector(p,Ta.z),m)}static getInterpolatedAttribute(e,i,r,l,u,f){return hd.setScalar(0),dd.setScalar(0),pd.setScalar(0),hd.fromBufferAttribute(e,i),dd.fromBufferAttribute(e,r),pd.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(hd,u.x),f.addScaledVector(dd,u.y),f.addScaledVector(pd,u.z),f}static isFrontFacing(e,i,r,l){return Oi.subVectors(r,i),ba.subVectors(e,i),Oi.cross(ba).dot(l)<0}set(e,i,r){return this.a.copy(e),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(e,i,r,l){return this.a.copy(e[i]),this.b.copy(e[r]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,r,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),ba.subVectors(this.a,this.b),Oi.cross(ba).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ai.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,r,l,u){return Ai.getInterpolation(e,this.a,this.b,this.c,i,r,l,u)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const r=this.a,l=this.b,u=this.c;let f,p;Bs.subVectors(l,r),zs.subVectors(u,r),ud.subVectors(e,r);const m=Bs.dot(ud),d=zs.dot(ud);if(m<=0&&d<=0)return i.copy(r);cd.subVectors(e,l);const _=Bs.dot(cd),v=zs.dot(cd);if(_>=0&&v<=_)return i.copy(l);const g=m*v-_*d;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(r).addScaledVector(Bs,f);fd.subVectors(e,u);const M=Bs.dot(fd),T=zs.dot(fd);if(T>=0&&M<=T)return i.copy(u);const A=M*d-m*T;if(A<=0&&d>=0&&T<=0)return p=d/(d-T),i.copy(r).addScaledVector(zs,p);const x=_*T-M*v;if(x<=0&&v-_>=0&&M-T>=0)return gv.subVectors(u,l),p=(v-_)/(v-_+(M-T)),i.copy(l).addScaledVector(gv,p);const S=1/(x+A+g);return f=A*S,p=g*S,i.copy(r).addScaledVector(Bs,f).addScaledVector(zs,p)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Al{constructor(e=new j(1/0,1/0,1/0),i=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i+=3)this.expandByPoint(Pi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,r=e.count;i<r;i++)this.expandByPoint(Pi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,r=e.length;i<r;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const r=Pi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const u=r.getAttribute("position");if(i===!0&&u!==void 0&&e.isInstancedMesh!==!0)for(let f=0,p=u.count;f<p;f++)e.isMesh===!0?e.getVertexPosition(f,Pi):Pi.fromBufferAttribute(u,f),Pi.applyMatrix4(e.matrixWorld),this.expandByPoint(Pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xu.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Xu.copy(r.boundingBox)),Xu.applyMatrix4(e.matrixWorld),this.union(Xu)}const l=e.children;for(let u=0,f=l.length;u<f;u++)this.expandByObject(l[u],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pi),Pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,r;return e.normal.x>0?(i=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),i<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(al),Wu.subVectors(this.max,al),Fs.subVectors(e.a,al),Hs.subVectors(e.b,al),Gs.subVectors(e.c,al),fr.subVectors(Hs,Fs),hr.subVectors(Gs,Hs),Hr.subVectors(Fs,Gs);let i=[0,-fr.z,fr.y,0,-hr.z,hr.y,0,-Hr.z,Hr.y,fr.z,0,-fr.x,hr.z,0,-hr.x,Hr.z,0,-Hr.x,-fr.y,fr.x,0,-hr.y,hr.x,0,-Hr.y,Hr.x,0];return!md(i,Fs,Hs,Gs,Wu)||(i=[1,0,0,0,1,0,0,0,1],!md(i,Fs,Hs,Gs,Wu))?!1:(qu.crossVectors(fr,hr),i=[qu.x,qu.y,qu.z],md(i,Fs,Hs,Gs,Wu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Aa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Aa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Aa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Aa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Aa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Aa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Aa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Aa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Aa),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Aa=[new j,new j,new j,new j,new j,new j,new j,new j],Pi=new j,Xu=new Al,Fs=new j,Hs=new j,Gs=new j,fr=new j,hr=new j,Hr=new j,al=new j,Wu=new j,qu=new j,Gr=new j;function md(s,e,i,r,l){for(let u=0,f=s.length-3;u<=f;u+=3){Gr.fromArray(s,u);const p=l.x*Math.abs(Gr.x)+l.y*Math.abs(Gr.y)+l.z*Math.abs(Gr.z),m=e.dot(Gr),d=i.dot(Gr),_=r.dot(Gr);if(Math.max(-Math.max(m,d,_),Math.min(m,d,_))>p)return!1}return!0}const yn=new j,Yu=new st;let Jb=0;class Hi extends $r{constructor(e,i,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jb++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=r,this.usage=Mp,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,r){e*=this.itemSize,r*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[e+l]=i.array[r+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)Yu.fromBufferAttribute(this,i),Yu.applyMatrix3(e),this.setXY(i,Yu.x,Yu.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)yn.fromBufferAttribute(this,i),yn.applyMatrix3(e),this.setXYZ(i,yn.x,yn.y,yn.z);return this}applyMatrix4(e){for(let i=0,r=this.count;i<r;i++)yn.fromBufferAttribute(this,i),yn.applyMatrix4(e),this.setXYZ(i,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)yn.fromBufferAttribute(this,i),yn.applyNormalMatrix(e),this.setXYZ(i,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)yn.fromBufferAttribute(this,i),yn.transformDirection(e),this.setXYZ(i,yn.x,yn.y,yn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let r=this.array[e*this.itemSize+i];return this.normalized&&(r=Qi(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=kt(r,this.array)),this.array[e*this.itemSize+i]=r,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Qi(i,this.array)),i}setX(e,i){return this.normalized&&(i=kt(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Qi(i,this.array)),i}setY(e,i){return this.normalized&&(i=kt(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Qi(i,this.array)),i}setZ(e,i){return this.normalized&&(i=kt(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Qi(i,this.array)),i}setW(e,i){return this.normalized&&(i=kt(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,r){return e*=this.itemSize,this.normalized&&(i=kt(i,this.array),r=kt(r,this.array)),this.array[e+0]=i,this.array[e+1]=r,this}setXYZ(e,i,r,l){return e*=this.itemSize,this.normalized&&(i=kt(i,this.array),r=kt(r,this.array),l=kt(l,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this}setXYZW(e,i,r,l,u){return e*=this.itemSize,this.normalized&&(i=kt(i,this.array),r=kt(r,this.array),l=kt(l,this.array),u=kt(u,this.array)),this.array[e+0]=i,this.array[e+1]=r,this.array[e+2]=l,this.array[e+3]=u,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mp&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class kx extends Hi{constructor(e,i,r){super(new Uint16Array(e),i,r)}}class Xx extends Hi{constructor(e,i,r){super(new Uint32Array(e),i,r)}}class en extends Hi{constructor(e,i,r){super(new Float32Array(e),i,r)}}const jb=new Al,rl=new j,gd=new j;class Zp{constructor(e=new j,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const r=this.center;i!==void 0?r.copy(i):jb.setFromPoints(e).getCenter(r);let l=0;for(let u=0,f=e.length;u<f;u++)l=Math.max(l,r.distanceToSquared(e[u]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const r=this.center.distanceToSquared(e);return i.copy(e),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rl.subVectors(e,this.center);const i=rl.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(rl,l/r),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rl.copy(e.center).add(gd)),this.expandByPoint(rl.copy(e.center).sub(gd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let $b=0;const Ei=new an,_d=new wn,Vs=new j,hi=new Al,sl=new Al,Cn=new j;class Wn extends $r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$b++}),this.uuid=_r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lb(e)?Xx:kx)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,r=0){this.groups.push({start:e,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new rt().getNormalMatrix(e);r.applyNormalMatrix(u),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,i,r){return Ei.makeTranslation(e,i,r),this.applyMatrix4(Ei),this}scale(e,i,r){return Ei.makeScale(e,i,r),this.applyMatrix4(Ei),this}lookAt(e){return _d.lookAt(e),_d.updateMatrix(),this.applyMatrix4(_d.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,u=e.length;l<u;l++){const f=e[l];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new en(r,3))}else{const r=Math.min(e.length,i.count);for(let l=0;l<r;l++){const u=e[l];i.setXYZ(l,u.x,u.y,u.z||0)}e.length>i.count&&nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Al);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let r=0,l=i.length;r<l;r++){const u=i[r];hi.setFromBufferAttribute(u),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zp);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const r=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),i)for(let u=0,f=i.length;u<f;u++){const p=i[u];sl.setFromBufferAttribute(p),this.morphTargetsRelative?(Cn.addVectors(hi.min,sl.min),hi.expandByPoint(Cn),Cn.addVectors(hi.max,sl.max),hi.expandByPoint(Cn)):(hi.expandByPoint(sl.min),hi.expandByPoint(sl.max))}hi.getCenter(r);let l=0;for(let u=0,f=e.count;u<f;u++)Cn.fromBufferAttribute(e,u),l=Math.max(l,r.distanceToSquared(Cn));if(i)for(let u=0,f=i.length;u<f;u++){const p=i[u],m=this.morphTargetsRelative;for(let d=0,_=p.count;d<_;d++)Cn.fromBufferAttribute(p,d),m&&(Vs.fromBufferAttribute(e,d),Cn.add(Vs)),l=Math.max(l,r.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,u=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==r.count)&&(f=new Hi(new Float32Array(4*r.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let b=0;b<r.count;b++)p[b]=new j,m[b]=new j;const d=new j,_=new j,v=new j,g=new st,M=new st,T=new st,A=new j,x=new j;function S(b,D,H){d.fromBufferAttribute(r,b),_.fromBufferAttribute(r,D),v.fromBufferAttribute(r,H),g.fromBufferAttribute(u,b),M.fromBufferAttribute(u,D),T.fromBufferAttribute(u,H),_.sub(d),v.sub(d),M.sub(g),T.sub(g);const F=1/(M.x*T.y-T.x*M.y);isFinite(F)&&(A.copy(_).multiplyScalar(T.y).addScaledVector(v,-M.y).multiplyScalar(F),x.copy(v).multiplyScalar(M.x).addScaledVector(_,-T.x).multiplyScalar(F),p[b].add(A),p[D].add(A),p[H].add(A),m[b].add(x),m[D].add(x),m[H].add(x))}let L=this.groups;L.length===0&&(L=[{start:0,count:e.count}]);for(let b=0,D=L.length;b<D;++b){const H=L[b],F=H.start,k=H.count;for(let $=F,ue=F+k;$<ue;$+=3)S(e.getX($+0),e.getX($+1),e.getX($+2))}const I=new j,C=new j,N=new j,U=new j;function O(b){N.fromBufferAttribute(l,b),U.copy(N);const D=p[b];I.copy(D),I.sub(N.multiplyScalar(N.dot(D))).normalize(),C.crossVectors(U,D);const F=C.dot(m[b])<0?-1:1;f.setXYZW(b,I.x,I.y,I.z,F)}for(let b=0,D=L.length;b<D;++b){const H=L[b],F=H.start,k=H.count;for(let $=F,ue=F+k;$<ue;$+=3)O(e.getX($+0)),O(e.getX($+1)),O(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new Hi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let g=0,M=r.count;g<M;g++)r.setXYZ(g,0,0,0);const l=new j,u=new j,f=new j,p=new j,m=new j,d=new j,_=new j,v=new j;if(e)for(let g=0,M=e.count;g<M;g+=3){const T=e.getX(g+0),A=e.getX(g+1),x=e.getX(g+2);l.fromBufferAttribute(i,T),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,x),_.subVectors(f,u),v.subVectors(l,u),_.cross(v),p.fromBufferAttribute(r,T),m.fromBufferAttribute(r,A),d.fromBufferAttribute(r,x),p.add(_),m.add(_),d.add(_),r.setXYZ(T,p.x,p.y,p.z),r.setXYZ(A,m.x,m.y,m.z),r.setXYZ(x,d.x,d.y,d.z)}else for(let g=0,M=i.count;g<M;g+=3)l.fromBufferAttribute(i,g+0),u.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,u),v.subVectors(l,u),_.cross(v),r.setXYZ(g+0,_.x,_.y,_.z),r.setXYZ(g+1,_.x,_.y,_.z),r.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,r=e.count;i<r;i++)Cn.fromBufferAttribute(e,i),Cn.normalize(),e.setXYZ(i,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function e(p,m){const d=p.array,_=p.itemSize,v=p.normalized,g=new d.constructor(m.length*_);let M=0,T=0;for(let A=0,x=m.length;A<x;A++){p.isInterleavedBufferAttribute?M=m[A]*p.data.stride+p.offset:M=m[A]*_;for(let S=0;S<_;S++)g[T++]=d[M++]}return new Hi(g,_,v)}if(this.index===null)return nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Wn,r=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=e(m,r);i.setAttribute(p,d)}const u=this.morphAttributes;for(const p in u){const m=[],d=u[p];for(let _=0,v=d.length;_<v;_++){const g=d[_],M=e(g,r);m.push(M)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(e[d]=m[d]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const d=r[m];e.data.attributes[m]=d.toJSON(e.data)}const l={};let u=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],_=[];for(let v=0,g=d.length;v<g;v++){const M=d[v];_.push(M.toJSON(e.data))}_.length>0&&(l[m]=_,u=!0)}u&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(e.data.boundingSphere=p.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const l=e.attributes;for(const d in l){const _=l[d];this.setAttribute(d,_.clone(i))}const u=e.morphAttributes;for(const d in u){const _=[],v=u[d];for(let g=0,M=v.length;g<M;g++)_.push(v[g].clone(i));this.morphAttributes[d]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let d=0,_=f.length;d<_;d++){const v=f[d];this.addGroup(v.start,v.count,v.materialIndex)}const p=e.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class eT{constructor(e,i){this.isInterleavedBuffer=!0,this.array=e,this.stride=i,this.count=e!==void 0?e.length/i:0,this.usage=Mp,this.updateRanges=[],this.version=0,this.uuid=_r()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,i,r){e*=this.stride,r*=i.stride;for(let l=0,u=this.stride;l<u;l++)this.array[e+l]=i.array[r+l];return this}set(e,i=0){return this.array.set(e,i),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_r()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const i=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(i,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_r()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kn=new j;class Rc{constructor(e,i,r,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=i,this.offset=r,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let i=0,r=this.data.count;i<r;i++)kn.fromBufferAttribute(this,i),kn.applyMatrix4(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}applyNormalMatrix(e){for(let i=0,r=this.count;i<r;i++)kn.fromBufferAttribute(this,i),kn.applyNormalMatrix(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}transformDirection(e){for(let i=0,r=this.count;i<r;i++)kn.fromBufferAttribute(this,i),kn.transformDirection(e),this.setXYZ(i,kn.x,kn.y,kn.z);return this}getComponent(e,i){let r=this.array[e*this.data.stride+this.offset+i];return this.normalized&&(r=Qi(r,this.array)),r}setComponent(e,i,r){return this.normalized&&(r=kt(r,this.array)),this.data.array[e*this.data.stride+this.offset+i]=r,this}setX(e,i){return this.normalized&&(i=kt(i,this.array)),this.data.array[e*this.data.stride+this.offset]=i,this}setY(e,i){return this.normalized&&(i=kt(i,this.array)),this.data.array[e*this.data.stride+this.offset+1]=i,this}setZ(e,i){return this.normalized&&(i=kt(i,this.array)),this.data.array[e*this.data.stride+this.offset+2]=i,this}setW(e,i){return this.normalized&&(i=kt(i,this.array)),this.data.array[e*this.data.stride+this.offset+3]=i,this}getX(e){let i=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(i=Qi(i,this.array)),i}getY(e){let i=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(i=Qi(i,this.array)),i}getZ(e){let i=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(i=Qi(i,this.array)),i}getW(e){let i=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(i=Qi(i,this.array)),i}setXY(e,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(i=kt(i,this.array),r=kt(r,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this}setXYZ(e,i,r,l){return e=e*this.data.stride+this.offset,this.normalized&&(i=kt(i,this.array),r=kt(r,this.array),l=kt(l,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this.data.array[e+2]=l,this}setXYZW(e,i,r,l,u){return e=e*this.data.stride+this.offset,this.normalized&&(i=kt(i,this.array),r=kt(r,this.array),l=kt(l,this.array),u=kt(u,this.array)),this.data.array[e+0]=i,this.data.array[e+1]=r,this.data.array[e+2]=l,this.data.array[e+3]=u,this}clone(e){if(e===void 0){Ac("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let r=0;r<this.count;r++){const l=r*this.data.stride+this.offset;for(let u=0;u<this.itemSize;u++)i.push(this.data.array[l+u])}return new Hi(new this.array.constructor(i),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Rc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ac("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let r=0;r<this.count;r++){const l=r*this.data.stride+this.offset;for(let u=0;u<this.itemSize;u++)i.push(this.data.array[l+u])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let tT=0;class oo extends $r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tT++}),this.uuid=_r(),this.name="",this.type="Material",this.blending=Js,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Od,this.blendDst=Pd,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=eo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=iv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ls,this.stencilZFail=Ls,this.stencilZPass=Ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const r=e[i];if(r===void 0){nt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){nt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector2&&r&&r.isVector2||l&&l.isEuler&&r&&r.isEuler||l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Js&&(r.blending=this.blending),this.side!==vr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Od&&(r.blendSrc=this.blendSrc),this.blendDst!==Pd&&(r.blendDst=this.blendDst),this.blendEquation!==Yr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==eo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==iv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ls&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ls&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ls&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(u){const f=[];for(const p in u){const m=u[p];delete m.metadata,f.push(m)}return f}if(i){const u=l(e.textures),f=l(e.images);u.length>0&&(r.textures=u),f.length>0&&(r.images=f)}return r}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new gt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new st().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new st().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let u=0;u!==l;++u)r[u]=i[u].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wx extends oo{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ks;const ol=new j,Xs=new j,Ws=new j,qs=new st,ll=new st,qx=new an,Zu=new j,ul=new j,Ku=new j,_v=new st,vd=new st,vv=new st;class Yx extends wn{constructor(e=new Wx){if(super(),this.isSprite=!0,this.type="Sprite",ks===void 0){ks=new Wn;const i=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),r=new eT(i,5);ks.setIndex([0,1,2,0,2,3]),ks.setAttribute("position",new Rc(r,3,0,!1)),ks.setAttribute("uv",new Rc(r,2,3,!1))}this.geometry=ks,this.material=e,this.center=new st(.5,.5),this.count=1}raycast(e,i){e.camera===null&&bt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xs.setFromMatrixScale(this.matrixWorld),qx.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xs.multiplyScalar(-Ws.z);const r=this.material.rotation;let l,u;r!==0&&(u=Math.cos(r),l=Math.sin(r));const f=this.center;Qu(Zu.set(-.5,-.5,0),Ws,f,Xs,l,u),Qu(ul.set(.5,-.5,0),Ws,f,Xs,l,u),Qu(Ku.set(.5,.5,0),Ws,f,Xs,l,u),_v.set(0,0),vd.set(1,0),vv.set(1,1);let p=e.ray.intersectTriangle(Zu,ul,Ku,!1,ol);if(p===null&&(Qu(ul.set(-.5,.5,0),Ws,f,Xs,l,u),vd.set(0,1),p=e.ray.intersectTriangle(Zu,Ku,ul,!1,ol),p===null))return;const m=e.ray.origin.distanceTo(ol);m<e.near||m>e.far||i.push({distance:m,point:ol.clone(),uv:Ai.getInterpolation(ol,Zu,ul,Ku,_v,vd,vv,new st),face:null,object:this})}copy(e,i){return super.copy(e,i),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Qu(s,e,i,r,l,u){qs.subVectors(s,i).addScalar(.5).multiply(r),l!==void 0?(ll.x=u*qs.x-l*qs.y,ll.y=l*qs.x+u*qs.y):ll.copy(qs),s.copy(e),s.x+=ll.x,s.y+=ll.y,s.applyMatrix4(qx)}const Ra=new j,xd=new j,Ju=new j,dr=new j,Sd=new j,ju=new j,yd=new j;class nT{constructor(e=new j,i=new j(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ra)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ra.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ra.copy(this.origin).addScaledVector(this.direction,i),Ra.distanceToSquared(e))}distanceSqToSegment(e,i,r,l){xd.copy(e).add(i).multiplyScalar(.5),Ju.copy(i).sub(e).normalize(),dr.copy(this.origin).sub(xd);const u=e.distanceTo(i)*.5,f=-this.direction.dot(Ju),p=dr.dot(this.direction),m=-dr.dot(Ju),d=dr.lengthSq(),_=Math.abs(1-f*f);let v,g,M,T;if(_>0)if(v=f*m-p,g=f*p-m,T=u*_,v>=0)if(g>=-T)if(g<=T){const A=1/_;v*=A,g*=A,M=v*(v+f*g+2*p)+g*(f*v+g+2*m)+d}else g=u,v=Math.max(0,-(f*g+p)),M=-v*v+g*(g+2*m)+d;else g=-u,v=Math.max(0,-(f*g+p)),M=-v*v+g*(g+2*m)+d;else g<=-T?(v=Math.max(0,-(-f*u+p)),g=v>0?-u:Math.min(Math.max(-u,-m),u),M=-v*v+g*(g+2*m)+d):g<=T?(v=0,g=Math.min(Math.max(-u,-m),u),M=g*(g+2*m)+d):(v=Math.max(0,-(f*u+p)),g=v>0?u:Math.min(Math.max(-u,-m),u),M=-v*v+g*(g+2*m)+d);else g=f>0?-u:u,v=Math.max(0,-(f*g+p)),M=-v*v+g*(g+2*m)+d;return r&&r.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(xd).addScaledVector(Ju,g),M}intersectSphere(e,i){Ra.subVectors(e.center,this.origin);const r=Ra.dot(this.direction),l=Ra.dot(Ra)-r*r,u=e.radius*e.radius;if(l>u)return null;const f=Math.sqrt(u-l),p=r-f,m=r+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/i;return r>=0?r:null}intersectPlane(e,i){const r=this.distanceToPlane(e);return r===null?null:this.at(r,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let r,l,u,f,p,m;const d=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return d>=0?(r=(e.min.x-g.x)*d,l=(e.max.x-g.x)*d):(r=(e.max.x-g.x)*d,l=(e.min.x-g.x)*d),_>=0?(u=(e.min.y-g.y)*_,f=(e.max.y-g.y)*_):(u=(e.max.y-g.y)*_,f=(e.min.y-g.y)*_),r>f||u>l||((u>r||isNaN(r))&&(r=u),(f<l||isNaN(l))&&(l=f),v>=0?(p=(e.min.z-g.z)*v,m=(e.max.z-g.z)*v):(p=(e.max.z-g.z)*v,m=(e.min.z-g.z)*v),r>m||p>l)||((p>r||r!==r)&&(r=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(e){return this.intersectBox(e,Ra)!==null}intersectTriangle(e,i,r,l,u){Sd.subVectors(i,e),ju.subVectors(r,e),yd.crossVectors(Sd,ju);let f=this.direction.dot(yd),p;if(f>0){if(l)return null;p=1}else if(f<0)p=-1,f=-f;else return null;dr.subVectors(this.origin,e);const m=p*this.direction.dot(ju.crossVectors(dr,ju));if(m<0)return null;const d=p*this.direction.dot(Sd.cross(dr));if(d<0||m+d>f)return null;const _=-p*dr.dot(yd);return _<0?null:this.at(_/f,u)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zx extends oo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xr,this.combine=Ex,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xv=new an,Vr=new nT,$u=new Zp,Sv=new j,ec=new j,tc=new j,nc=new j,Md=new j,ic=new j,yv=new j,ac=new j;class Ct extends wn{constructor(e=new Wn,i=new Zx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=l.length;u<f;u++){const p=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=u}}}}getVertexPosition(e,i){const r=this.geometry,l=r.attributes.position,u=r.morphAttributes.position,f=r.morphTargetsRelative;i.fromBufferAttribute(l,e);const p=this.morphTargetInfluences;if(u&&p){ic.set(0,0,0);for(let m=0,d=u.length;m<d;m++){const _=p[m],v=u[m];_!==0&&(Md.fromBufferAttribute(v,e),f?ic.addScaledVector(Md,_):ic.addScaledVector(Md.sub(i),_))}i.add(ic)}return i}raycast(e,i){const r=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),$u.copy(r.boundingSphere),$u.applyMatrix4(u),Vr.copy(e.ray).recast(e.near),!($u.containsPoint(Vr.origin)===!1&&(Vr.intersectSphere($u,Sv)===null||Vr.origin.distanceToSquared(Sv)>(e.far-e.near)**2))&&(xv.copy(u).invert(),Vr.copy(e.ray).applyMatrix4(xv),!(r.boundingBox!==null&&Vr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,i,Vr)))}_computeIntersections(e,i,r){let l;const u=this.geometry,f=this.material,p=u.index,m=u.attributes.position,d=u.attributes.uv,_=u.attributes.uv1,v=u.attributes.normal,g=u.groups,M=u.drawRange;if(p!==null)if(Array.isArray(f))for(let T=0,A=g.length;T<A;T++){const x=g[T],S=f[x.materialIndex],L=Math.max(x.start,M.start),I=Math.min(p.count,Math.min(x.start+x.count,M.start+M.count));for(let C=L,N=I;C<N;C+=3){const U=p.getX(C),O=p.getX(C+1),b=p.getX(C+2);l=rc(this,S,e,r,d,_,v,U,O,b),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const T=Math.max(0,M.start),A=Math.min(p.count,M.start+M.count);for(let x=T,S=A;x<S;x+=3){const L=p.getX(x),I=p.getX(x+1),C=p.getX(x+2);l=rc(this,f,e,r,d,_,v,L,I,C),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let T=0,A=g.length;T<A;T++){const x=g[T],S=f[x.materialIndex],L=Math.max(x.start,M.start),I=Math.min(m.count,Math.min(x.start+x.count,M.start+M.count));for(let C=L,N=I;C<N;C+=3){const U=C,O=C+1,b=C+2;l=rc(this,S,e,r,d,_,v,U,O,b),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const T=Math.max(0,M.start),A=Math.min(m.count,M.start+M.count);for(let x=T,S=A;x<S;x+=3){const L=x,I=x+1,C=x+2;l=rc(this,f,e,r,d,_,v,L,I,C),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function iT(s,e,i,r,l,u,f,p){let m;if(e.side===$n?m=r.intersectTriangle(f,u,l,!0,p):m=r.intersectTriangle(l,u,f,e.side===vr,p),m===null)return null;ac.copy(p),ac.applyMatrix4(s.matrixWorld);const d=i.ray.origin.distanceTo(ac);return d<i.near||d>i.far?null:{distance:d,point:ac.clone(),object:s}}function rc(s,e,i,r,l,u,f,p,m,d){s.getVertexPosition(p,ec),s.getVertexPosition(m,tc),s.getVertexPosition(d,nc);const _=iT(s,e,i,r,ec,tc,nc,yv);if(_){const v=new j;Ai.getBarycoord(yv,ec,tc,nc,v),l&&(_.uv=Ai.getInterpolatedAttribute(l,p,m,d,v,new st)),u&&(_.uv1=Ai.getInterpolatedAttribute(u,p,m,d,v,new st)),f&&(_.normal=Ai.getInterpolatedAttribute(f,p,m,d,v,new j),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new j,materialIndex:0};Ai.getNormal(ec,tc,nc,g.normal),_.face=g,_.barycoord=v}return _}class aT extends Gn{constructor(e=null,i=1,r=1,l,u,f,p,m,d=Pn,_=Pn,v,g){super(null,f,p,m,d,_,l,u,v,g),this.isDataTexture=!0,this.image={data:e,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ed=new j,rT=new j,sT=new rt;class qr{constructor(e=new j(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,r,l){return this.normal.set(e,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,r){const l=Ed.subVectors(r,i).cross(rT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,r=!0){const l=e.delta(Ed),u=this.normal.dot(l);if(u===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/u;return r===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return i<0&&r>0||r<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const r=i||sT.getNormalMatrix(e),l=this.coplanarPoint(Ed).applyMatrix4(e),u=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(u),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kr=new Zp,oT=new st(.5,.5),sc=new j;class Kp{constructor(e=new qr,i=new qr,r=new qr,l=new qr,u=new qr,f=new qr){this.planes=[e,i,r,l,u,f]}set(e,i,r,l,u,f){const p=this.planes;return p[0].copy(e),p[1].copy(i),p[2].copy(r),p[3].copy(l),p[4].copy(u),p[5].copy(f),this}copy(e){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,i=ji,r=!1){const l=this.planes,u=e.elements,f=u[0],p=u[1],m=u[2],d=u[3],_=u[4],v=u[5],g=u[6],M=u[7],T=u[8],A=u[9],x=u[10],S=u[11],L=u[12],I=u[13],C=u[14],N=u[15];if(l[0].setComponents(d-f,M-_,S-T,N-L).normalize(),l[1].setComponents(d+f,M+_,S+T,N+L).normalize(),l[2].setComponents(d+p,M+v,S+A,N+I).normalize(),l[3].setComponents(d-p,M-v,S-A,N-I).normalize(),r)l[4].setComponents(m,g,x,C).normalize(),l[5].setComponents(d-m,M-g,S-x,N-C).normalize();else if(l[4].setComponents(d-m,M-g,S-x,N-C).normalize(),i===ji)l[5].setComponents(d+m,M+g,S+x,N+C).normalize();else if(i===Ml)l[5].setComponents(m,g,x,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kr)}intersectsSprite(e){kr.center.set(0,0,0);const i=oT.distanceTo(e.center);return kr.radius=.7071067811865476+i,kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSphere(e){const i=this.planes,r=e.center,l=-e.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(r)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(sc.x=l.normal.x>0?e.max.x:e.min.x,sc.y=l.normal.y>0?e.max.y:e.min.y,sc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(sc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Kx extends Gn{constructor(e=[],i=Jr,r,l,u,f,p,m,d,_){super(e,i,r,l,u,f,p,m,d,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lT extends Gn{constructor(e,i,r,l,u,f,p,m,d){super(e,i,r,l,u,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class no extends Gn{constructor(e,i,r=na,l,u,f,p=Pn,m=Pn,d,_=Na,v=1){if(_!==Na&&_!==Qr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:v};super(g,l,u,f,p,m,_,r,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class uT extends no{constructor(e,i=na,r=Jr,l,u,f=Pn,p=Pn,m,d=Na){const _={width:e,height:e,depth:1},v=[_,_,_,_,_,_];super(e,e,i,r,l,u,f,p,m,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Qx extends Gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rl extends Wn{constructor(e=1,i=1,r=1,l=1,u=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:r,widthSegments:l,heightSegments:u,depthSegments:f};const p=this;l=Math.floor(l),u=Math.floor(u),f=Math.floor(f);const m=[],d=[],_=[],v=[];let g=0,M=0;T("z","y","x",-1,-1,r,i,e,f,u,0),T("z","y","x",1,-1,r,i,-e,f,u,1),T("x","z","y",1,1,e,r,i,l,f,2),T("x","z","y",1,-1,e,r,-i,l,f,3),T("x","y","z",1,-1,e,i,r,l,u,4),T("x","y","z",-1,-1,e,i,-r,l,u,5),this.setIndex(m),this.setAttribute("position",new en(d,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(v,2));function T(A,x,S,L,I,C,N,U,O,b,D){const H=C/O,F=N/b,k=C/2,$=N/2,ue=U/2,Y=O+1,z=b+1;let V=0,ne=0;const _e=new j;for(let be=0;be<z;be++){const B=be*F-$;for(let Q=0;Q<Y;Q++){const Ee=Q*H-k;_e[A]=Ee*L,_e[x]=B*I,_e[S]=ue,d.push(_e.x,_e.y,_e.z),_e[A]=0,_e[x]=0,_e[S]=U>0?1:-1,_.push(_e.x,_e.y,_e.z),v.push(Q/O),v.push(1-be/b),V+=1}}for(let be=0;be<b;be++)for(let B=0;B<O;B++){const Q=g+B+Y*be,Ee=g+B+Y*(be+1),Ce=g+(B+1)+Y*(be+1),Ie=g+(B+1)+Y*be;m.push(Q,Ee,Ie),m.push(Ee,Ce,Ie),ne+=6}p.addGroup(M,ne,D),M+=ne,g+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class _l extends Wn{constructor(e=1,i=1,r=4,l=8,u=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:i,capSegments:r,radialSegments:l,heightSegments:u},i=Math.max(0,i),r=Math.max(1,Math.floor(r)),l=Math.max(3,Math.floor(l)),u=Math.max(1,Math.floor(u));const f=[],p=[],m=[],d=[],_=i/2,v=Math.PI/2*e,g=i,M=2*v+g,T=r*2+u,A=l+1,x=new j,S=new j;for(let L=0;L<=T;L++){let I=0,C=0,N=0,U=0;if(L<=r){const D=L/r,H=D*Math.PI/2;C=-_-e*Math.cos(H),N=e*Math.sin(H),U=-e*Math.cos(H),I=D*v}else if(L<=r+u){const D=(L-r)/u;C=-_+D*i,N=e,U=0,I=v+D*g}else{const D=(L-r-u)/r,H=D*Math.PI/2;C=_+e*Math.sin(H),N=e*Math.cos(H),U=e*Math.sin(H),I=v+g+D*v}const O=Math.max(0,Math.min(1,I/M));let b=0;L===0?b=.5/l:L===T&&(b=-.5/l);for(let D=0;D<=l;D++){const H=D/l,F=H*Math.PI*2,k=Math.sin(F),$=Math.cos(F);S.x=-N*$,S.y=C,S.z=N*k,p.push(S.x,S.y,S.z),x.set(-N*$,U,N*k),x.normalize(),m.push(x.x,x.y,x.z),d.push(H+b,O)}if(L>0){const D=(L-1)*A;for(let H=0;H<l;H++){const F=D+H,k=D+H+1,$=L*A+H,ue=L*A+H+1;f.push(F,k,$),f.push(k,ue,$)}}}this.setIndex(f),this.setAttribute("position",new en(p,3)),this.setAttribute("normal",new en(m,3)),this.setAttribute("uv",new en(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _l(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Cc extends Wn{constructor(e=1,i=32,r=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:i,thetaStart:r,thetaLength:l},i=Math.max(3,i);const u=[],f=[],p=[],m=[],d=new j,_=new st;f.push(0,0,0),p.push(0,0,1),m.push(.5,.5);for(let v=0,g=3;v<=i;v++,g+=3){const M=r+v/i*l;d.x=e*Math.cos(M),d.y=e*Math.sin(M),f.push(d.x,d.y,d.z),p.push(0,0,1),_.x=(f[g]/e+1)/2,_.y=(f[g+1]/e+1)/2,m.push(_.x,_.y)}for(let v=1;v<=i;v++)u.push(v,v+1,0);this.setIndex(u),this.setAttribute("position",new en(f,3)),this.setAttribute("normal",new en(p,3)),this.setAttribute("uv",new en(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Qs extends Wn{constructor(e=1,i=1,r=1,l=32,u=1,f=!1,p=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:i,height:r,radialSegments:l,heightSegments:u,openEnded:f,thetaStart:p,thetaLength:m};const d=this;l=Math.floor(l),u=Math.floor(u);const _=[],v=[],g=[],M=[];let T=0;const A=[],x=r/2;let S=0;L(),f===!1&&(e>0&&I(!0),i>0&&I(!1)),this.setIndex(_),this.setAttribute("position",new en(v,3)),this.setAttribute("normal",new en(g,3)),this.setAttribute("uv",new en(M,2));function L(){const C=new j,N=new j;let U=0;const O=(i-e)/r;for(let b=0;b<=u;b++){const D=[],H=b/u,F=H*(i-e)+e;for(let k=0;k<=l;k++){const $=k/l,ue=$*m+p,Y=Math.sin(ue),z=Math.cos(ue);N.x=F*Y,N.y=-H*r+x,N.z=F*z,v.push(N.x,N.y,N.z),C.set(Y,O,z).normalize(),g.push(C.x,C.y,C.z),M.push($,1-H),D.push(T++)}A.push(D)}for(let b=0;b<l;b++)for(let D=0;D<u;D++){const H=A[D][b],F=A[D+1][b],k=A[D+1][b+1],$=A[D][b+1];(e>0||D!==0)&&(_.push(H,F,$),U+=3),(i>0||D!==u-1)&&(_.push(F,k,$),U+=3)}d.addGroup(S,U,0),S+=U}function I(C){const N=T,U=new st,O=new j;let b=0;const D=C===!0?e:i,H=C===!0?1:-1;for(let k=1;k<=l;k++)v.push(0,x*H,0),g.push(0,H,0),M.push(.5,.5),T++;const F=T;for(let k=0;k<=l;k++){const ue=k/l*m+p,Y=Math.cos(ue),z=Math.sin(ue);O.x=D*z,O.y=x*H,O.z=D*Y,v.push(O.x,O.y,O.z),g.push(0,H,0),U.x=Y*.5+.5,U.y=z*.5*H+.5,M.push(U.x,U.y),T++}for(let k=0;k<l;k++){const $=N+k,ue=F+k;C===!0?_.push(ue,ue+1,$):_.push(ue+1,ue,$),b+=3}d.addGroup(S,b,C===!0?1:2),S+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Oc extends Wn{constructor(e=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:r,heightSegments:l};const u=e/2,f=i/2,p=Math.floor(r),m=Math.floor(l),d=p+1,_=m+1,v=e/p,g=i/m,M=[],T=[],A=[],x=[];for(let S=0;S<_;S++){const L=S*g-f;for(let I=0;I<d;I++){const C=I*v-u;T.push(C,-L,0),A.push(0,0,1),x.push(I/p),x.push(1-S/m)}}for(let S=0;S<m;S++)for(let L=0;L<p;L++){const I=L+d*S,C=L+d*(S+1),N=L+1+d*(S+1),U=L+1+d*S;M.push(I,C,U),M.push(C,N,U)}this.setIndex(M),this.setAttribute("position",new en(T,3)),this.setAttribute("normal",new en(A,3)),this.setAttribute("uv",new en(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oc(e.width,e.height,e.widthSegments,e.heightSegments)}}class bi extends Wn{constructor(e=1,i=32,r=16,l=0,u=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:r,phiStart:l,phiLength:u,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));const m=Math.min(f+p,Math.PI);let d=0;const _=[],v=new j,g=new j,M=[],T=[],A=[],x=[];for(let S=0;S<=r;S++){const L=[],I=S/r,C=f+I*p,N=e*Math.cos(C),U=Math.sqrt(e*e-N*N);let O=0;S===0&&f===0?O=.5/i:S===r&&m===Math.PI&&(O=-.5/i);for(let b=0;b<=i;b++){const D=b/i,H=l+D*u;v.x=-U*Math.cos(H),v.y=N,v.z=U*Math.sin(H),T.push(v.x,v.y,v.z),g.copy(v).normalize(),A.push(g.x,g.y,g.z),x.push(D+O,1-I),L.push(d++)}_.push(L)}for(let S=0;S<r;S++)for(let L=0;L<i;L++){const I=_[S][L+1],C=_[S][L],N=_[S+1][L],U=_[S+1][L+1];(S!==0||f>0)&&M.push(I,C,U),(S!==r-1||m<Math.PI)&&M.push(C,N,U)}this.setIndex(M),this.setAttribute("position",new en(T,3)),this.setAttribute("normal",new en(A,3)),this.setAttribute("uv",new en(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class vl extends Wn{constructor(e=1,i=.4,r=12,l=48,u=Math.PI*2,f=0,p=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:i,radialSegments:r,tubularSegments:l,arc:u,thetaStart:f,thetaLength:p},r=Math.floor(r),l=Math.floor(l);const m=[],d=[],_=[],v=[],g=new j,M=new j,T=new j;for(let A=0;A<=r;A++){const x=f+A/r*p;for(let S=0;S<=l;S++){const L=S/l*u;M.x=(e+i*Math.cos(x))*Math.cos(L),M.y=(e+i*Math.cos(x))*Math.sin(L),M.z=i*Math.sin(x),d.push(M.x,M.y,M.z),g.x=e*Math.cos(L),g.y=e*Math.sin(L),T.subVectors(M,g).normalize(),_.push(T.x,T.y,T.z),v.push(S/l),v.push(A/r)}}for(let A=1;A<=r;A++)for(let x=1;x<=l;x++){const S=(l+1)*A+x-1,L=(l+1)*(A-1)+x-1,I=(l+1)*(A-1)+x,C=(l+1)*A+x;m.push(S,L,C),m.push(L,I,C)}this.setIndex(m),this.setAttribute("position",new en(d,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function io(s){const e={};for(const i in s){e[i]={};for(const r in s[i]){const l=s[i][r];if(Mv(l))l.isRenderTargetTexture?(nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][r]=null):e[i][r]=l.clone();else if(Array.isArray(l))if(Mv(l[0])){const u=[];for(let f=0,p=l.length;f<p;f++)u[f]=l[f].clone();e[i][r]=u}else e[i][r]=l.slice();else e[i][r]=l}}return e}function Xn(s){const e={};for(let i=0;i<s.length;i++){const r=io(s[i]);for(const l in r)e[l]=r[l]}return e}function Mv(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function cT(s){const e=[];for(let i=0;i<s.length;i++)e.push(s[i].clone());return e}function Jx(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}const fT={clone:io,merge:Xn};var hT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ia extends oo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hT,this.fragmentShader=dT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=io(e.uniforms),this.uniformsGroups=cT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const r in e.uniforms){const l=e.uniforms[r];switch(this.uniforms[r]={},l.type){case"t":this.uniforms[r].value=i[l.value]||null;break;case"c":this.uniforms[r].value=new gt().setHex(l.value);break;case"v2":this.uniforms[r].value=new st().fromArray(l.value);break;case"v3":this.uniforms[r].value=new j().fromArray(l.value);break;case"v4":this.uniforms[r].value=new tn().fromArray(l.value);break;case"m3":this.uniforms[r].value=new rt().fromArray(l.value);break;case"m4":this.uniforms[r].value=new an().fromArray(l.value);break;default:this.uniforms[r].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pT extends ia{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mT extends oo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yp,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gT extends oo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _T extends oo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Qp extends wn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(e),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}class vT extends Qp{constructor(e,i,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new gt(i)}copy(e,i){return super.copy(e,i),this.groundColor.copy(e.groundColor),this}toJSON(e){const i=super.toJSON(e);return i.object.groundColor=this.groundColor.getHex(),i}}const bd=new an,Ev=new j,bv=new j;class xT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new an,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kp,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new tn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,r=this.matrix;Ev.setFromMatrixPosition(e.matrixWorld),i.position.copy(Ev),bv.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(bv),i.updateMatrixWorld(),bd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bd,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===Ml||i.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(bd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const oc=new j,lc=new so,Yi=new j;class jx extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new an,this.projectionMatrix=new an,this.projectionMatrixInverse=new an,this.coordinateSystem=ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oc,lc,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oc,lc,Yi.set(1,1,1)).invert()}updateWorldMatrix(e,i,r=!1){super.updateWorldMatrix(e,i,r),this.matrixWorld.decompose(oc,lc,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oc,lc,Yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const pr=new j,Tv=new st,Av=new st;class Ti extends jx{constructor(e=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Ep*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($h*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ep*2*Math.atan(Math.tan($h*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,r){pr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pr.x,pr.y).multiplyScalar(-e/pr.z),pr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(pr.x,pr.y).multiplyScalar(-e/pr.z)}getViewSize(e,i){return this.getViewBounds(e,Tv,Av),i.subVectors(Av,Tv)}setViewOffset(e,i,r,l,u,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan($h*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,u=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;u+=f.offsetX*l/m,i-=f.offsetY*r/d,l*=f.width/m,r*=f.height/d}const p=this.filmOffset;p!==0&&(u+=e*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class Jp extends jx{constructor(e=-1,i=1,r=1,l=-1,u=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=r,this.bottom=l,this.near=u,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,r,l,u,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=r-e,f=r+e,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=d*this.view.offsetX,f=u+d*this.view.width,p-=_*this.view.offsetY,m=p-_*this.view.height}this.projectionMatrix.makeOrthographic(u,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class ST extends xT{constructor(){super(new Jp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yT extends Qp{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new ST}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class MT extends Qp{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ys=-90,Zs=1;class ET extends wn{constructor(e,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ti(Ys,Zs,e,i);l.layers=this.layers,this.add(l);const u=new Ti(Ys,Zs,e,i);u.layers=this.layers,this.add(u);const f=new Ti(Ys,Zs,e,i);f.layers=this.layers,this.add(f);const p=new Ti(Ys,Zs,e,i);p.layers=this.layers,this.add(p);const m=new Ti(Ys,Zs,e,i);m.layers=this.layers,this.add(m);const d=new Ti(Ys,Zs,e,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[r,l,u,f,p,m]=i;for(const d of i)this.remove(d);if(e===ji)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Ml)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of i)this.add(d),d.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[u,f,p,m,d,_]=this.children,v=e.getRenderTarget(),g=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(r,0,l),x&&e.autoClear===!1&&e.clearDepth(),e.render(i,u),e.setRenderTarget(r,1,l),x&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(r,2,l),x&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(r,3,l),x&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(r,4,l),x&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,l),x&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(v,g,M),e.xr.enabled=T,r.texture.needsPMREMUpdate=!0}}class bT extends Ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class TT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,nt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}const im=class im{constructor(e,i,r,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,r,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let r=0;r<4;r++)this.elements[r]=e[r+i];return this}set(e,i,r,l){const u=this.elements;return u[0]=e,u[2]=i,u[1]=r,u[3]=l,this}};im.prototype.isMatrix2=!0;let Rv=im;function Cv(s,e,i,r){const l=AT(r);switch(i){case Ix:return s*e;case zx:return s*e/l.components*l.byteLength;case Gp:return s*e/l.components*l.byteLength;case jr:return s*e*2/l.components*l.byteLength;case Vp:return s*e*2/l.components*l.byteLength;case Bx:return s*e*3/l.components*l.byteLength;case zi:return s*e*4/l.components*l.byteLength;case kp:return s*e*4/l.components*l.byteLength;case pc:case mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case gc:case _c:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case qd:case Zd:return Math.max(s,16)*Math.max(e,8)/4;case Wd:case Yd:return Math.max(s,8)*Math.max(e,8)/2;case Kd:case Qd:case jd:case $d:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Jd:case yc:case ep:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case tp:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case np:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ip:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case ap:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case rp:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case sp:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case op:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case lp:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case up:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case cp:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case fp:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case hp:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case dp:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case pp:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case mp:case gp:case _p:return Math.ceil(s/4)*Math.ceil(e/4)*16;case vp:case xp:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Mc:case Sp:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function AT(s){switch(s){case pi:case Lx:return{byteLength:1,components:1};case Sl:case Nx:case La:return{byteLength:2,components:1};case Fp:case Hp:return{byteLength:2,components:4};case na:case zp:case Ji:return{byteLength:4,components:1};case Ox:case Px:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bp}}));typeof window<"u"&&(window.__THREE__?nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bp);function $x(){let s=null,e=!1,i=null,r=null;function l(u,f){i(u,f),r=s.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&s!==null&&(r=s.requestAnimationFrame(l),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(u){i=u},setContext:function(u){s=u}}}function RT(s){const e=new WeakMap;function i(p,m){const d=p.array,_=p.usage,v=d.byteLength,g=s.createBuffer();s.bindBuffer(m,g),s.bufferData(m,d,_),p.onUploadCallback();let M;if(d instanceof Float32Array)M=s.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)M=s.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)M=s.SHORT;else if(d instanceof Uint32Array)M=s.UNSIGNED_INT;else if(d instanceof Int32Array)M=s.INT;else if(d instanceof Int8Array)M=s.BYTE;else if(d instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:M,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:v}}function r(p,m,d){const _=m.array,v=m.updateRanges;if(s.bindBuffer(d,p),v.length===0)s.bufferSubData(d,0,_);else{v.sort((M,T)=>M.start-T.start);let g=0;for(let M=1;M<v.length;M++){const T=v[g],A=v[M];A.start<=T.start+T.count+1?T.count=Math.max(T.count,A.start+A.count-T.start):(++g,v[g]=A)}v.length=g+1;for(let M=0,T=v.length;M<T;M++){const A=v[M];s.bufferSubData(d,A.start*_.BYTES_PER_ELEMENT,_,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),e.get(p)}function u(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=e.get(p);m&&(s.deleteBuffer(m.buffer),e.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const _=e.get(p);(!_||_.version<p.version)&&e.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=e.get(p);if(d===void 0)e.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,p,m),d.version=p.version}}return{get:l,remove:u,update:f}}var CT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wT=`#ifdef USE_ALPHAHASH
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
#endif`,DT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,UT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,LT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,NT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,OT=`#ifdef USE_AOMAP
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
#endif`,PT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,IT=`#ifdef USE_BATCHING
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
#endif`,BT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,HT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,GT=`#ifdef USE_IRIDESCENCE
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
#endif`,VT=`#ifdef USE_BUMPMAP
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
#endif`,kT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,XT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,YT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ZT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,KT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,QT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,JT=`#define PI 3.141592653589793
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
} // validated`,jT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$T=`vec3 transformedNormal = objectNormal;
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
#endif`,e1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,t1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,n1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,i1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,a1="gl_FragColor = linearToOutputTexel( gl_FragColor );",r1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s1=`#ifdef USE_ENVMAP
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
#endif`,o1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,l1=`#ifdef USE_ENVMAP
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
#endif`,u1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c1=`#ifdef USE_ENVMAP
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
#endif`,f1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,h1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,d1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,p1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,m1=`#ifdef USE_GRADIENTMAP
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
}`,g1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,v1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,x1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,S1=`#ifdef USE_ENVMAP
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
#endif`,y1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,T1=`PhysicalMaterial material;
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
#endif`,A1=`uniform sampler2D dfgLUT;
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
}`,R1=`
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
#endif`,C1=`#if defined( RE_IndirectDiffuse )
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
#endif`,w1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,U1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,P1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,I1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,z1=`#if defined( USE_POINTS_UV )
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
#endif`,F1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,H1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,V1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,k1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X1=`#ifdef USE_MORPHTARGETS
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
#endif`,W1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Y1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Z1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,J1=`#ifdef USE_NORMALMAP
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
#endif`,j1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,aA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dA=`float getShadowMask() {
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
}`,pA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mA=`#ifdef USE_SKINNING
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
#endif`,gA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_A=`#ifdef USE_SKINNING
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
#endif`,vA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,SA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,MA=`#ifdef USE_TRANSMISSION
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
#endif`,EA=`#ifdef USE_TRANSMISSION
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
#endif`,bA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,AA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const CA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wA=`uniform sampler2D t2D;
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
}`,DA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,LA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OA=`#include <common>
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
}`,PA=`#if DEPTH_PACKING == 3200
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
}`,IA=`#define DISTANCE
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
}`,BA=`#define DISTANCE
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
}`,zA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HA=`uniform float scale;
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
}`,GA=`uniform vec3 diffuse;
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
}`,VA=`#include <common>
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
}`,kA=`uniform vec3 diffuse;
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
}`,XA=`#define LAMBERT
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
}`,WA=`#define LAMBERT
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
}`,qA=`#define MATCAP
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
}`,YA=`#define MATCAP
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
}`,ZA=`#define NORMAL
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
}`,KA=`#define NORMAL
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
}`,QA=`#define PHONG
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
}`,JA=`#define PHONG
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
}`,jA=`#define STANDARD
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
}`,$A=`#define STANDARD
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
}`,eR=`#define TOON
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
}`,tR=`#define TOON
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
}`,nR=`uniform float size;
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
}`,iR=`uniform vec3 diffuse;
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
}`,aR=`#include <common>
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
}`,rR=`uniform vec3 color;
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
}`,sR=`uniform float rotation;
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
}`,oR=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:CT,alphahash_pars_fragment:wT,alphamap_fragment:DT,alphamap_pars_fragment:UT,alphatest_fragment:LT,alphatest_pars_fragment:NT,aomap_fragment:OT,aomap_pars_fragment:PT,batching_pars_vertex:IT,batching_vertex:BT,begin_vertex:zT,beginnormal_vertex:FT,bsdfs:HT,iridescence_fragment:GT,bumpmap_pars_fragment:VT,clipping_planes_fragment:kT,clipping_planes_pars_fragment:XT,clipping_planes_pars_vertex:WT,clipping_planes_vertex:qT,color_fragment:YT,color_pars_fragment:ZT,color_pars_vertex:KT,color_vertex:QT,common:JT,cube_uv_reflection_fragment:jT,defaultnormal_vertex:$T,displacementmap_pars_vertex:e1,displacementmap_vertex:t1,emissivemap_fragment:n1,emissivemap_pars_fragment:i1,colorspace_fragment:a1,colorspace_pars_fragment:r1,envmap_fragment:s1,envmap_common_pars_fragment:o1,envmap_pars_fragment:l1,envmap_pars_vertex:u1,envmap_physical_pars_fragment:S1,envmap_vertex:c1,fog_vertex:f1,fog_pars_vertex:h1,fog_fragment:d1,fog_pars_fragment:p1,gradientmap_pars_fragment:m1,lightmap_pars_fragment:g1,lights_lambert_fragment:_1,lights_lambert_pars_fragment:v1,lights_pars_begin:x1,lights_toon_fragment:y1,lights_toon_pars_fragment:M1,lights_phong_fragment:E1,lights_phong_pars_fragment:b1,lights_physical_fragment:T1,lights_physical_pars_fragment:A1,lights_fragment_begin:R1,lights_fragment_maps:C1,lights_fragment_end:w1,lightprobes_pars_fragment:D1,logdepthbuf_fragment:U1,logdepthbuf_pars_fragment:L1,logdepthbuf_pars_vertex:N1,logdepthbuf_vertex:O1,map_fragment:P1,map_pars_fragment:I1,map_particle_fragment:B1,map_particle_pars_fragment:z1,metalnessmap_fragment:F1,metalnessmap_pars_fragment:H1,morphinstance_vertex:G1,morphcolor_vertex:V1,morphnormal_vertex:k1,morphtarget_pars_vertex:X1,morphtarget_vertex:W1,normal_fragment_begin:q1,normal_fragment_maps:Y1,normal_pars_fragment:Z1,normal_pars_vertex:K1,normal_vertex:Q1,normalmap_pars_fragment:J1,clearcoat_normal_fragment_begin:j1,clearcoat_normal_fragment_maps:$1,clearcoat_pars_fragment:eA,iridescence_pars_fragment:tA,opaque_fragment:nA,packing:iA,premultiplied_alpha_fragment:aA,project_vertex:rA,dithering_fragment:sA,dithering_pars_fragment:oA,roughnessmap_fragment:lA,roughnessmap_pars_fragment:uA,shadowmap_pars_fragment:cA,shadowmap_pars_vertex:fA,shadowmap_vertex:hA,shadowmask_pars_fragment:dA,skinbase_vertex:pA,skinning_pars_vertex:mA,skinning_vertex:gA,skinnormal_vertex:_A,specularmap_fragment:vA,specularmap_pars_fragment:xA,tonemapping_fragment:SA,tonemapping_pars_fragment:yA,transmission_fragment:MA,transmission_pars_fragment:EA,uv_pars_fragment:bA,uv_pars_vertex:TA,uv_vertex:AA,worldpos_vertex:RA,background_vert:CA,background_frag:wA,backgroundCube_vert:DA,backgroundCube_frag:UA,cube_vert:LA,cube_frag:NA,depth_vert:OA,depth_frag:PA,distance_vert:IA,distance_frag:BA,equirect_vert:zA,equirect_frag:FA,linedashed_vert:HA,linedashed_frag:GA,meshbasic_vert:VA,meshbasic_frag:kA,meshlambert_vert:XA,meshlambert_frag:WA,meshmatcap_vert:qA,meshmatcap_frag:YA,meshnormal_vert:ZA,meshnormal_frag:KA,meshphong_vert:QA,meshphong_frag:JA,meshphysical_vert:jA,meshphysical_frag:$A,meshtoon_vert:eR,meshtoon_frag:tR,points_vert:nR,points_frag:iR,shadow_vert:aR,shadow_frag:rR,sprite_vert:sR,sprite_frag:oR},Pe={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Ki={basic:{uniforms:Xn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:Xn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new gt(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:Xn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:Xn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:Xn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new gt(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:Xn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:Xn([Pe.points,Pe.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:Xn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:Xn([Pe.common,Pe.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:Xn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:Xn([Pe.sprite,Pe.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:Xn([Pe.common,Pe.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:Xn([Pe.lights,Pe.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Ki.physical={uniforms:Xn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const uc={r:0,b:0,g:0},lR=new an,eS=new rt;eS.set(-1,0,0,0,1,0,0,0,1);function uR(s,e,i,r,l,u){const f=new gt(0);let p=l===!0?0:1,m,d,_=null,v=0,g=null;function M(L){let I=L.isScene===!0?L.background:null;if(I&&I.isTexture){const C=L.backgroundBlurriness>0;I=e.get(I,C)}return I}function T(L){let I=!1;const C=M(L);C===null?x(f,p):C&&C.isColor&&(x(C,1),I=!0);const N=s.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,u):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(s.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function A(L,I){const C=M(I);C&&(C.isCubeTexture||C.mapping===Nc)?(d===void 0&&(d=new Ct(new Rl(1,1,1),new ia({name:"BackgroundCubeMaterial",uniforms:io(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(N,U,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=C,d.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(lR.makeRotationFromEuler(I.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(eS),d.material.toneMapped=Mt.getTransfer(C.colorSpace)!==zt,(_!==C||v!==C.version||g!==s.toneMapping)&&(d.material.needsUpdate=!0,_=C,v=C.version,g=s.toneMapping),d.layers.enableAll(),L.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new Ct(new Oc(2,2),new ia({name:"BackgroundMaterial",uniforms:io(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=Mt.getTransfer(C.colorSpace)!==zt,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(_!==C||v!==C.version||g!==s.toneMapping)&&(m.material.needsUpdate=!0,_=C,v=C.version,g=s.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function x(L,I){L.getRGB(uc,Jx(s)),i.buffers.color.setClear(uc.r,uc.g,uc.b,I,u)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(L,I=1){f.set(L),p=I,x(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(L){p=L,x(f,p)},render:T,addToRenderList:A,dispose:S}}function cR(s,e){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=g(null);let u=l,f=!1;function p(F,k,$,ue,Y){let z=!1;const V=v(F,ue,$,k);u!==V&&(u=V,d(u.object)),z=M(F,ue,$,Y),z&&T(F,ue,$,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(z||f)&&(f=!1,C(F,k,$,ue),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function m(){return s.createVertexArray()}function d(F){return s.bindVertexArray(F)}function _(F){return s.deleteVertexArray(F)}function v(F,k,$,ue){const Y=ue.wireframe===!0;let z=r[k.id];z===void 0&&(z={},r[k.id]=z);const V=F.isInstancedMesh===!0?F.id:0;let ne=z[V];ne===void 0&&(ne={},z[V]=ne);let _e=ne[$.id];_e===void 0&&(_e={},ne[$.id]=_e);let be=_e[Y];return be===void 0&&(be=g(m()),_e[Y]=be),be}function g(F){const k=[],$=[],ue=[];for(let Y=0;Y<i;Y++)k[Y]=0,$[Y]=0,ue[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:$,attributeDivisors:ue,object:F,attributes:{},index:null}}function M(F,k,$,ue){const Y=u.attributes,z=k.attributes;let V=0;const ne=$.getAttributes();for(const _e in ne)if(ne[_e].location>=0){const B=Y[_e];let Q=z[_e];if(Q===void 0&&(_e==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),_e==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),B===void 0||B.attribute!==Q||Q&&B.data!==Q.data)return!0;V++}return u.attributesNum!==V||u.index!==ue}function T(F,k,$,ue){const Y={},z=k.attributes;let V=0;const ne=$.getAttributes();for(const _e in ne)if(ne[_e].location>=0){let B=z[_e];B===void 0&&(_e==="instanceMatrix"&&F.instanceMatrix&&(B=F.instanceMatrix),_e==="instanceColor"&&F.instanceColor&&(B=F.instanceColor));const Q={};Q.attribute=B,B&&B.data&&(Q.data=B.data),Y[_e]=Q,V++}u.attributes=Y,u.attributesNum=V,u.index=ue}function A(){const F=u.newAttributes;for(let k=0,$=F.length;k<$;k++)F[k]=0}function x(F){S(F,0)}function S(F,k){const $=u.newAttributes,ue=u.enabledAttributes,Y=u.attributeDivisors;$[F]=1,ue[F]===0&&(s.enableVertexAttribArray(F),ue[F]=1),Y[F]!==k&&(s.vertexAttribDivisor(F,k),Y[F]=k)}function L(){const F=u.newAttributes,k=u.enabledAttributes;for(let $=0,ue=k.length;$<ue;$++)k[$]!==F[$]&&(s.disableVertexAttribArray($),k[$]=0)}function I(F,k,$,ue,Y,z,V){V===!0?s.vertexAttribIPointer(F,k,$,Y,z):s.vertexAttribPointer(F,k,$,ue,Y,z)}function C(F,k,$,ue){A();const Y=ue.attributes,z=$.getAttributes(),V=k.defaultAttributeValues;for(const ne in z){const _e=z[ne];if(_e.location>=0){let be=Y[ne];if(be===void 0&&(ne==="instanceMatrix"&&F.instanceMatrix&&(be=F.instanceMatrix),ne==="instanceColor"&&F.instanceColor&&(be=F.instanceColor)),be!==void 0){const B=be.normalized,Q=be.itemSize,Ee=e.get(be);if(Ee===void 0)continue;const Ce=Ee.buffer,Ie=Ee.type,re=Ee.bytesPerElement,Se=Ie===s.INT||Ie===s.UNSIGNED_INT||be.gpuType===zp;if(be.isInterleavedBufferAttribute){const Me=be.data,He=Me.stride,tt=be.offset;if(Me.isInstancedInterleavedBuffer){for(let Qe=0;Qe<_e.locationSize;Qe++)S(_e.location+Qe,Me.meshPerAttribute);F.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let Qe=0;Qe<_e.locationSize;Qe++)x(_e.location+Qe);s.bindBuffer(s.ARRAY_BUFFER,Ce);for(let Qe=0;Qe<_e.locationSize;Qe++)I(_e.location+Qe,Q/_e.locationSize,Ie,B,He*re,(tt+Q/_e.locationSize*Qe)*re,Se)}else{if(be.isInstancedBufferAttribute){for(let Me=0;Me<_e.locationSize;Me++)S(_e.location+Me,be.meshPerAttribute);F.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let Me=0;Me<_e.locationSize;Me++)x(_e.location+Me);s.bindBuffer(s.ARRAY_BUFFER,Ce);for(let Me=0;Me<_e.locationSize;Me++)I(_e.location+Me,Q/_e.locationSize,Ie,B,Q*re,Q/_e.locationSize*Me*re,Se)}}else if(V!==void 0){const B=V[ne];if(B!==void 0)switch(B.length){case 2:s.vertexAttrib2fv(_e.location,B);break;case 3:s.vertexAttrib3fv(_e.location,B);break;case 4:s.vertexAttrib4fv(_e.location,B);break;default:s.vertexAttrib1fv(_e.location,B)}}}}L()}function N(){D();for(const F in r){const k=r[F];for(const $ in k){const ue=k[$];for(const Y in ue){const z=ue[Y];for(const V in z)_(z[V].object),delete z[V];delete ue[Y]}}delete r[F]}}function U(F){if(r[F.id]===void 0)return;const k=r[F.id];for(const $ in k){const ue=k[$];for(const Y in ue){const z=ue[Y];for(const V in z)_(z[V].object),delete z[V];delete ue[Y]}}delete r[F.id]}function O(F){for(const k in r){const $=r[k];for(const ue in $){const Y=$[ue];if(Y[F.id]===void 0)continue;const z=Y[F.id];for(const V in z)_(z[V].object),delete z[V];delete Y[F.id]}}}function b(F){for(const k in r){const $=r[k],ue=F.isInstancedMesh===!0?F.id:0,Y=$[ue];if(Y!==void 0){for(const z in Y){const V=Y[z];for(const ne in V)_(V[ne].object),delete V[ne];delete Y[z]}delete $[ue],Object.keys($).length===0&&delete r[k]}}}function D(){H(),f=!0,u!==l&&(u=l,d(u.object))}function H(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:D,resetDefaultState:H,dispose:N,releaseStatesOfGeometry:U,releaseStatesOfObject:b,releaseStatesOfProgram:O,initAttributes:A,enableAttribute:x,disableUnusedAttributes:L}}function fR(s,e,i){let r;function l(m){r=m}function u(m,d){s.drawArrays(r,m,d),i.update(d,r,1)}function f(m,d,_){_!==0&&(s.drawArraysInstanced(r,m,d,_),i.update(d,r,_))}function p(m,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,d,0,_);let g=0;for(let M=0;M<_;M++)g+=d[M];i.update(g,r,1)}this.setMode=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=p}function hR(s,e,i,r){let l;function u(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");l=s.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==zi&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(O){const b=O===La&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==pi&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==Ji&&!b)}function m(O){if(O==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const _=m(d);_!==d&&(nt("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),T=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),S=s.getParameter(s.MAX_VERTEX_ATTRIBS),L=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),I=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),N=s.getParameter(s.MAX_SAMPLES),U=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:M,maxVertexTextures:T,maxTextureSize:A,maxCubemapSize:x,maxAttributes:S,maxVertexUniforms:L,maxVaryings:I,maxFragmentUniforms:C,maxSamples:N,samples:U}}function dR(s){const e=this;let i=null,r=0,l=!1,u=!1;const f=new qr,p=new rt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const M=v.length!==0||g||r!==0||l;return l=g,r=v.length,M},this.beginShadows=function(){u=!0,_(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(v,g){i=_(v,g,0)},this.setState=function(v,g,M){const T=v.clippingPlanes,A=v.clipIntersection,x=v.clipShadows,S=s.get(v);if(!l||T===null||T.length===0||u&&!x)u?_(null):d();else{const L=u?0:r,I=L*4;let C=S.clippingState||null;m.value=C,C=_(T,g,I,M);for(let N=0;N!==I;++N)C[N]=i[N];S.clippingState=C,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=L}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(v,g,M,T){const A=v!==null?v.length:0;let x=null;if(A!==0){if(x=m.value,T!==!0||x===null){const S=M+A*4,L=g.matrixWorldInverse;p.getNormalMatrix(L),(x===null||x.length<S)&&(x=new Float32Array(S));for(let I=0,C=M;I!==A;++I,C+=4)f.copy(v[I]).applyMatrix4(L,p),f.normal.toArray(x,C),x[C+3]=f.constant}m.value=x,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,x}}const gr=4,wv=[.125,.215,.35,.446,.526,.582],Zr=20,pR=256,cl=new Jp,Dv=new gt;let Td=null,Ad=0,Rd=0,Cd=!1;const mR=new j;class Uv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,r=.1,l=100,u={}){const{size:f=256,position:p=mR}=u;Td=this._renderer.getRenderTarget(),Ad=this._renderer.getActiveCubeFace(),Rd=this._renderer.getActiveMipmapLevel(),Cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ov(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Td,Ad,Rd),this._renderer.xr.enabled=Cd,e.scissorTest=!1,Ks(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Jr||e.mapping===to?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Td=this._renderer.getRenderTarget(),Ad=this._renderer.getActiveCubeFace(),Rd=this._renderer.getActiveMipmapLevel(),Cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:La,format:zi,colorSpace:Ec,depthBuffer:!1},l=Lv(e,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lv(e,i,r);const{_lodMax:u}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gR(u)),this._blurMaterial=vR(u,e,i),this._ggxMaterial=_R(u,e,i)}return l}_compileMaterial(e){const i=new Ct(new Wn,e);this._renderer.compile(i,cl)}_sceneToCubeUV(e,i,r,l,u){const m=new Ti(90,1,i,r),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,M=v.toneMapping;v.getClearColor(Dv),v.toneMapping=$i,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ct(new Rl,new Zx({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,x=A.material;let S=!1;const L=e.background;L?L.isColor&&(x.color.copy(L),e.background=null,S=!0):(x.color.copy(Dv),S=!0);for(let I=0;I<6;I++){const C=I%3;C===0?(m.up.set(0,d[I],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x+_[I],u.y,u.z)):C===1?(m.up.set(0,0,d[I]),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y+_[I],u.z)):(m.up.set(0,d[I],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y,u.z+_[I]));const N=this._cubeSize;Ks(l,C*N,I>2?N:0,N,N),v.setRenderTarget(l),S&&v.render(A,m),v.render(e,m)}v.toneMapping=M,v.autoClear=g,e.background=L}_textureToCubeUV(e,i){const r=this._renderer,l=e.mapping===Jr||e.mapping===to;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ov()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nv());const u=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=u;const p=u.uniforms;p.envMap.value=e;const m=this._cubeSize;Ks(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(f,cl)}_applyPMREM(e){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let u=1;u<l;u++)this._applyGGXFilter(e,u-1,u);i.autoClear=r}_applyGGXFilter(e,i,r){const l=this._renderer,u=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[r];p.material=f;const m=f.uniforms,d=r/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),v=Math.sqrt(d*d-_*_),g=0+d*1.25,M=v*g,{_lodMax:T}=this,A=this._sizeLods[r],x=3*A*(r>T-gr?r-T+gr:0),S=4*(this._cubeSize-A);m.envMap.value=e.texture,m.roughness.value=M,m.mipInt.value=T-i,Ks(u,x,S,3*A,2*A),l.setRenderTarget(u),l.render(p,cl),m.envMap.value=u.texture,m.roughness.value=0,m.mipInt.value=T-r,Ks(e,x,S,3*A,2*A),l.setRenderTarget(e),l.render(p,cl)}_blur(e,i,r,l,u){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,r,l,"latitudinal",u),this._halfBlur(f,e,r,r,l,"longitudinal",u)}_halfBlur(e,i,r,l,u,f,p){const m=this._renderer,d=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&bt("blur direction must be either latitudinal or longitudinal!");const _=3,v=this._lodMeshes[l];v.material=d;const g=d.uniforms,M=this._sizeLods[r]-1,T=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*Zr-1),A=u/T,x=isFinite(u)?1+Math.floor(_*A):Zr;x>Zr&&nt(`sigmaRadians, ${u}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Zr}`);const S=[];let L=0;for(let O=0;O<Zr;++O){const b=O/A,D=Math.exp(-b*b/2);S.push(D),O===0?L+=D:O<x&&(L+=2*D)}for(let O=0;O<S.length;O++)S[O]=S[O]/L;g.envMap.value=e.texture,g.samples.value=x,g.weights.value=S,g.latitudinal.value=f==="latitudinal",p&&(g.poleAxis.value=p);const{_lodMax:I}=this;g.dTheta.value=T,g.mipInt.value=I-r;const C=this._sizeLods[l],N=3*C*(l>I-gr?l-I+gr:0),U=4*(this._cubeSize-C);Ks(i,N,U,3*C,2*C),m.setRenderTarget(i),m.render(v,cl)}}function gR(s){const e=[],i=[],r=[];let l=s;const u=s-gr+1+wv.length;for(let f=0;f<u;f++){const p=Math.pow(2,l);e.push(p);let m=1/p;f>s-gr?m=wv[f-s+gr-1]:f===0&&(m=0),i.push(m);const d=1/(p-2),_=-d,v=1+d,g=[_,_,v,_,v,v,_,_,v,v,_,v],M=6,T=6,A=3,x=2,S=1,L=new Float32Array(A*T*M),I=new Float32Array(x*T*M),C=new Float32Array(S*T*M);for(let U=0;U<M;U++){const O=U%3*2/3-1,b=U>2?0:-1,D=[O,b,0,O+2/3,b,0,O+2/3,b+1,0,O,b,0,O+2/3,b+1,0,O,b+1,0];L.set(D,A*T*U),I.set(g,x*T*U);const H=[U,U,U,U,U,U];C.set(H,S*T*U)}const N=new Wn;N.setAttribute("position",new Hi(L,A)),N.setAttribute("uv",new Hi(I,x)),N.setAttribute("faceIndex",new Hi(C,S)),r.push(new Ct(N,null)),l>gr&&l--}return{lodMeshes:r,sizeLods:e,sigmas:i}}function Lv(s,e,i){const r=new ea(s,e,i);return r.texture.mapping=Nc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ks(s,e,i,r,l){s.viewport.set(e,i,r,l),s.scissor.set(e,i,r,l)}function _R(s,e,i){return new ia({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pR,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function vR(s,e,i){const r=new Float32Array(Zr),l=new j(0,1,0);return new ia({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function Nv(){return new ia({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function Ov(){return new ia({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wa,depthTest:!1,depthWrite:!1})}function Pc(){return`

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
	`}class tS extends ea{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},l=[r,r,r,r,r,r];this.texture=new Kx(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Rl(5,5,5),u=new ia({name:"CubemapFromEquirect",uniforms:io(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:$n,blending:wa});u.uniforms.tEquirect.value=i;const f=new Ct(l,u),p=i.minFilter;return i.minFilter===Kr&&(i.minFilter=Hn),new ET(1,10,this).update(e,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,r=!0,l=!0){const u=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,r,l);e.setRenderTarget(u)}}function xR(s){let e=new WeakMap,i=new WeakMap,r=null;function l(g,M=!1){return g==null?null:M?f(g):u(g)}function u(g){if(g&&g.isTexture){const M=g.mapping;if(M===Qh||M===Jh)if(e.has(g)){const T=e.get(g).texture;return p(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const A=new tS(T.height);return A.fromEquirectangularTexture(s,g),e.set(g,A),g.addEventListener("dispose",d),p(A.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const M=g.mapping,T=M===Qh||M===Jh,A=M===Jr||M===to;if(T||A){let x=i.get(g);const S=x!==void 0?x.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return r===null&&(r=new Uv(s)),x=T?r.fromEquirectangular(g,x):r.fromCubemap(g,x),x.texture.pmremVersion=g.pmremVersion,i.set(g,x),x.texture;if(x!==void 0)return x.texture;{const L=g.image;return T&&L&&L.height>0||A&&L&&m(L)?(r===null&&(r=new Uv(s)),x=T?r.fromEquirectangular(g):r.fromCubemap(g),x.texture.pmremVersion=g.pmremVersion,i.set(g,x),g.addEventListener("dispose",_),x.texture):null}}}return g}function p(g,M){return M===Qh?g.mapping=Jr:M===Jh&&(g.mapping=to),g}function m(g){let M=0;const T=6;for(let A=0;A<T;A++)g[A]!==void 0&&M++;return M===T}function d(g){const M=g.target;M.removeEventListener("dispose",d);const T=e.get(M);T!==void 0&&(e.delete(M),T.dispose())}function _(g){const M=g.target;M.removeEventListener("dispose",_);const T=i.get(M);T!==void 0&&(i.delete(M),T.dispose())}function v(){e=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:l,dispose:v}}function SR(s){const e={};function i(r){if(e[r]!==void 0)return e[r];const l=s.getExtension(r);return e[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&js("WebGLRenderer: "+r+" extension not supported."),l}}}function yR(s,e,i,r){const l={},u=new WeakMap;function f(v){const g=v.target;g.index!==null&&e.remove(g.index);for(const T in g.attributes)e.remove(g.attributes[T]);g.removeEventListener("dispose",f),delete l[g.id];const M=u.get(g);M&&(e.remove(M),u.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(v,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const M in g)e.update(g[M],s.ARRAY_BUFFER)}function d(v){const g=[],M=v.index,T=v.attributes.position;let A=0;if(T===void 0)return;if(M!==null){const L=M.array;A=M.version;for(let I=0,C=L.length;I<C;I+=3){const N=L[I+0],U=L[I+1],O=L[I+2];g.push(N,U,U,O,O,N)}}else{const L=T.array;A=T.version;for(let I=0,C=L.length/3-1;I<C;I+=3){const N=I+0,U=I+1,O=I+2;g.push(N,U,U,O,O,N)}}const x=new(T.count>=65535?Xx:kx)(g,1);x.version=A;const S=u.get(v);S&&e.remove(S),u.set(v,x)}function _(v){const g=u.get(v);if(g){const M=v.index;M!==null&&g.version<M.version&&d(v)}else d(v);return u.get(v)}return{get:p,update:m,getWireframeAttribute:_}}function MR(s,e,i){let r;function l(v){r=v}let u,f;function p(v){u=v.type,f=v.bytesPerElement}function m(v,g){s.drawElements(r,g,u,v*f),i.update(g,r,1)}function d(v,g,M){M!==0&&(s.drawElementsInstanced(r,g,u,v*f,M),i.update(g,r,M))}function _(v,g,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,g,0,u,v,0,M);let A=0;for(let x=0;x<M;x++)A+=g[x];i.update(A,r,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=_}function ER(s){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,f,p){switch(i.calls++,f){case s.TRIANGLES:i.triangles+=p*(u/3);break;case s.LINES:i.lines+=p*(u/2);break;case s.LINE_STRIP:i.lines+=p*(u-1);break;case s.LINE_LOOP:i.lines+=p*u;break;case s.POINTS:i.points+=p*u;break;default:bt("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:r}}function bR(s,e,i){const r=new WeakMap,l=new tn;function u(f,p,m){const d=f.morphTargetInfluences,_=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=_!==void 0?_.length:0;let g=r.get(p);if(g===void 0||g.count!==v){let H=function(){b.dispose(),r.delete(p),p.removeEventListener("dispose",H)};var M=H;g!==void 0&&g.texture.dispose();const T=p.morphAttributes.position!==void 0,A=p.morphAttributes.normal!==void 0,x=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],L=p.morphAttributes.normal||[],I=p.morphAttributes.color||[];let C=0;T===!0&&(C=1),A===!0&&(C=2),x===!0&&(C=3);let N=p.attributes.position.count*C,U=1;N>e.maxTextureSize&&(U=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const O=new Float32Array(N*U*4*v),b=new Hx(O,N,U,v);b.type=Ji,b.needsUpdate=!0;const D=C*4;for(let F=0;F<v;F++){const k=S[F],$=L[F],ue=I[F],Y=N*U*4*F;for(let z=0;z<k.count;z++){const V=z*D;T===!0&&(l.fromBufferAttribute(k,z),O[Y+V+0]=l.x,O[Y+V+1]=l.y,O[Y+V+2]=l.z,O[Y+V+3]=0),A===!0&&(l.fromBufferAttribute($,z),O[Y+V+4]=l.x,O[Y+V+5]=l.y,O[Y+V+6]=l.z,O[Y+V+7]=0),x===!0&&(l.fromBufferAttribute(ue,z),O[Y+V+8]=l.x,O[Y+V+9]=l.y,O[Y+V+10]=l.z,O[Y+V+11]=ue.itemSize===4?l.w:1)}}g={count:v,texture:b,size:new st(N,U)},r.set(p,g),p.addEventListener("dispose",H)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",f.morphTexture,i);else{let T=0;for(let x=0;x<d.length;x++)T+=d[x];const A=p.morphTargetsRelative?1:1-T;m.getUniforms().setValue(s,"morphTargetBaseInfluence",A),m.getUniforms().setValue(s,"morphTargetInfluences",d)}m.getUniforms().setValue(s,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:u}}function TR(s,e,i,r,l){let u=new WeakMap;function f(d){const _=l.render.frame,v=d.geometry,g=e.get(d,v);if(u.get(g)!==_&&(e.update(g),u.set(g,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),u.get(d)!==_&&(i.update(d.instanceMatrix,s.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,s.ARRAY_BUFFER),u.set(d,_))),d.isSkinnedMesh){const M=d.skeleton;u.get(M)!==_&&(M.update(),u.set(M,_))}return g}function p(){u=new WeakMap}function m(d){const _=d.target;_.removeEventListener("dispose",m),r.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:p}}const AR={[bx]:"LINEAR_TONE_MAPPING",[Tx]:"REINHARD_TONE_MAPPING",[Ax]:"CINEON_TONE_MAPPING",[Rx]:"ACES_FILMIC_TONE_MAPPING",[wx]:"AGX_TONE_MAPPING",[Dx]:"NEUTRAL_TONE_MAPPING",[Cx]:"CUSTOM_TONE_MAPPING"};function RR(s,e,i,r,l,u){const f=new ea(e,i,{type:s,depthBuffer:l,stencilBuffer:u,samples:r?4:0,depthTexture:l?new no(e,i):void 0}),p=new ea(e,i,{type:La,depthBuffer:!1,stencilBuffer:!1}),m=new Wn;m.setAttribute("position",new en([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new en([0,2,0,0,2,0],2));const d=new pT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),_=new Ct(m,d),v=new Jp(-1,1,1,-1,0,1);let g=null,M=null,T=!1,A,x=null,S=[],L=!1;this.setSize=function(I,C){f.setSize(I,C),p.setSize(I,C);for(let N=0;N<S.length;N++){const U=S[N];U.setSize&&U.setSize(I,C)}},this.setEffects=function(I){S=I,L=S.length>0&&S[0].isRenderPass===!0;const C=f.width,N=f.height;for(let U=0;U<S.length;U++){const O=S[U];O.setSize&&O.setSize(C,N)}},this.begin=function(I,C){if(T||I.toneMapping===$i&&S.length===0)return!1;if(x=C,C!==null){const N=C.width,U=C.height;(f.width!==N||f.height!==U)&&this.setSize(N,U)}return L===!1&&I.setRenderTarget(f),A=I.toneMapping,I.toneMapping=$i,!0},this.hasRenderPass=function(){return L},this.end=function(I,C){I.toneMapping=A,T=!0;let N=f,U=p;for(let O=0;O<S.length;O++){const b=S[O];if(b.enabled!==!1&&(b.render(I,U,N,C),b.needsSwap!==!1)){const D=N;N=U,U=D}}if(g!==I.outputColorSpace||M!==I.toneMapping){g=I.outputColorSpace,M=I.toneMapping,d.defines={},Mt.getTransfer(g)===zt&&(d.defines.SRGB_TRANSFER="");const O=AR[M];O&&(d.defines[O]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=N.texture,I.setRenderTarget(x),I.render(_,v),x=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){f.depthTexture&&f.depthTexture.dispose(),f.dispose(),p.dispose(),m.dispose(),d.dispose()}}const nS=new Gn,bp=new no(1,1),iS=new Hx,aS=new Vb,rS=new Kx,Pv=[],Iv=[],Bv=new Float32Array(16),zv=new Float32Array(9),Fv=new Float32Array(4);function lo(s,e,i){const r=s[0];if(r<=0||r>0)return s;const l=e*i;let u=Pv[l];if(u===void 0&&(u=new Float32Array(l),Pv[l]=u),e!==0){r.toArray(u,0);for(let f=1,p=0;f!==e;++f)p+=i,s[f].toArray(u,p)}return u}function Tn(s,e){if(s.length!==e.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==e[i])return!1;return!0}function An(s,e){for(let i=0,r=e.length;i<r;i++)s[i]=e[i]}function Ic(s,e){let i=Iv[e];i===void 0&&(i=new Int32Array(e),Iv[e]=i);for(let r=0;r!==e;++r)i[r]=s.allocateTextureUnit();return i}function CR(s,e){const i=this.cache;i[0]!==e&&(s.uniform1f(this.addr,e),i[0]=e)}function wR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Tn(i,e))return;s.uniform2fv(this.addr,e),An(i,e)}}function DR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Tn(i,e))return;s.uniform3fv(this.addr,e),An(i,e)}}function UR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Tn(i,e))return;s.uniform4fv(this.addr,e),An(i,e)}}function LR(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(Tn(i,e))return;s.uniformMatrix2fv(this.addr,!1,e),An(i,e)}else{if(Tn(i,r))return;Fv.set(r),s.uniformMatrix2fv(this.addr,!1,Fv),An(i,r)}}function NR(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(Tn(i,e))return;s.uniformMatrix3fv(this.addr,!1,e),An(i,e)}else{if(Tn(i,r))return;zv.set(r),s.uniformMatrix3fv(this.addr,!1,zv),An(i,r)}}function OR(s,e){const i=this.cache,r=e.elements;if(r===void 0){if(Tn(i,e))return;s.uniformMatrix4fv(this.addr,!1,e),An(i,e)}else{if(Tn(i,r))return;Bv.set(r),s.uniformMatrix4fv(this.addr,!1,Bv),An(i,r)}}function PR(s,e){const i=this.cache;i[0]!==e&&(s.uniform1i(this.addr,e),i[0]=e)}function IR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Tn(i,e))return;s.uniform2iv(this.addr,e),An(i,e)}}function BR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Tn(i,e))return;s.uniform3iv(this.addr,e),An(i,e)}}function zR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Tn(i,e))return;s.uniform4iv(this.addr,e),An(i,e)}}function FR(s,e){const i=this.cache;i[0]!==e&&(s.uniform1ui(this.addr,e),i[0]=e)}function HR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Tn(i,e))return;s.uniform2uiv(this.addr,e),An(i,e)}}function GR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Tn(i,e))return;s.uniform3uiv(this.addr,e),An(i,e)}}function VR(s,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Tn(i,e))return;s.uniform4uiv(this.addr,e),An(i,e)}}function kR(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let u;this.type===s.SAMPLER_2D_SHADOW?(bp.compareFunction=i.isReversedDepthBuffer()?Wp:Xp,u=bp):u=nS,i.setTexture2D(e||u,l)}function XR(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(e||aS,l)}function WR(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(e||rS,l)}function qR(s,e,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(e||iS,l)}function YR(s){switch(s){case 5126:return CR;case 35664:return wR;case 35665:return DR;case 35666:return UR;case 35674:return LR;case 35675:return NR;case 35676:return OR;case 5124:case 35670:return PR;case 35667:case 35671:return IR;case 35668:case 35672:return BR;case 35669:case 35673:return zR;case 5125:return FR;case 36294:return HR;case 36295:return GR;case 36296:return VR;case 35678:case 36198:case 36298:case 36306:case 35682:return kR;case 35679:case 36299:case 36307:return XR;case 35680:case 36300:case 36308:case 36293:return WR;case 36289:case 36303:case 36311:case 36292:return qR}}function ZR(s,e){s.uniform1fv(this.addr,e)}function KR(s,e){const i=lo(e,this.size,2);s.uniform2fv(this.addr,i)}function QR(s,e){const i=lo(e,this.size,3);s.uniform3fv(this.addr,i)}function JR(s,e){const i=lo(e,this.size,4);s.uniform4fv(this.addr,i)}function jR(s,e){const i=lo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function $R(s,e){const i=lo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function eC(s,e){const i=lo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function tC(s,e){s.uniform1iv(this.addr,e)}function nC(s,e){s.uniform2iv(this.addr,e)}function iC(s,e){s.uniform3iv(this.addr,e)}function aC(s,e){s.uniform4iv(this.addr,e)}function rC(s,e){s.uniform1uiv(this.addr,e)}function sC(s,e){s.uniform2uiv(this.addr,e)}function oC(s,e){s.uniform3uiv(this.addr,e)}function lC(s,e){s.uniform4uiv(this.addr,e)}function uC(s,e,i){const r=this.cache,l=e.length,u=Ic(i,l);Tn(r,u)||(s.uniform1iv(this.addr,u),An(r,u));let f;this.type===s.SAMPLER_2D_SHADOW?f=bp:f=nS;for(let p=0;p!==l;++p)i.setTexture2D(e[p]||f,u[p])}function cC(s,e,i){const r=this.cache,l=e.length,u=Ic(i,l);Tn(r,u)||(s.uniform1iv(this.addr,u),An(r,u));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||aS,u[f])}function fC(s,e,i){const r=this.cache,l=e.length,u=Ic(i,l);Tn(r,u)||(s.uniform1iv(this.addr,u),An(r,u));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||rS,u[f])}function hC(s,e,i){const r=this.cache,l=e.length,u=Ic(i,l);Tn(r,u)||(s.uniform1iv(this.addr,u),An(r,u));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||iS,u[f])}function dC(s){switch(s){case 5126:return ZR;case 35664:return KR;case 35665:return QR;case 35666:return JR;case 35674:return jR;case 35675:return $R;case 35676:return eC;case 5124:case 35670:return tC;case 35667:case 35671:return nC;case 35668:case 35672:return iC;case 35669:case 35673:return aC;case 5125:return rC;case 36294:return sC;case 36295:return oC;case 36296:return lC;case 35678:case 36198:case 36298:case 36306:case 35682:return uC;case 35679:case 36299:case 36307:return cC;case 35680:case 36300:case 36308:case 36293:return fC;case 36289:case 36303:case 36311:case 36292:return hC}}class pC{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.setValue=YR(i.type)}}class mC{constructor(e,i,r){this.id=e,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=dC(i.type)}}class gC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,r){const l=this.seq;for(let u=0,f=l.length;u!==f;++u){const p=l[u];p.setValue(e,i[p.id],r)}}}const wd=/(\w+)(\])?(\[|\.)?/g;function Hv(s,e){s.seq.push(e),s.map[e.id]=e}function _C(s,e,i){const r=s.name,l=r.length;for(wd.lastIndex=0;;){const u=wd.exec(r),f=wd.lastIndex;let p=u[1];const m=u[2]==="]",d=u[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){Hv(i,d===void 0?new pC(p,s,e):new mC(p,s,e));break}else{let v=i.map[p];v===void 0&&(v=new gC(p),Hv(i,v)),i=v}}}class vc{constructor(e,i){this.seq=[],this.map={};const r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<r;++f){const p=e.getActiveUniform(i,f),m=e.getUniformLocation(i,p.name);_C(p,m,this)}const l=[],u=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):u.push(f);l.length>0&&(this.seq=l.concat(u))}setValue(e,i,r,l){const u=this.map[i];u!==void 0&&u.setValue(e,r,l)}setOptional(e,i,r){const l=i[r];l!==void 0&&this.setValue(e,r,l)}static upload(e,i,r,l){for(let u=0,f=i.length;u!==f;++u){const p=i[u],m=r[p.id];m.needsUpdate!==!1&&p.setValue(e,m.value,l)}}static seqWithValue(e,i){const r=[];for(let l=0,u=e.length;l!==u;++l){const f=e[l];f.id in i&&r.push(f)}return r}}function Gv(s,e,i){const r=s.createShader(e);return s.shaderSource(r,i),s.compileShader(r),r}const vC=37297;let xC=0;function SC(s,e){const i=s.split(`
`),r=[],l=Math.max(e-6,0),u=Math.min(e+6,i.length);for(let f=l;f<u;f++){const p=f+1;r.push(`${p===e?">":" "} ${p}: ${i[f]}`)}return r.join(`
`)}const Vv=new rt;function yC(s){Mt._getMatrix(Vv,Mt.workingColorSpace,s);const e=`mat3( ${Vv.elements.map(i=>i.toFixed(4))} )`;switch(Mt.getTransfer(s)){case bc:return[e,"LinearTransferOETF"];case zt:return[e,"sRGBTransferOETF"];default:return nt("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function kv(s,e,i){const r=s.getShaderParameter(e,s.COMPILE_STATUS),u=(s.getShaderInfoLog(e)||"").trim();if(r&&u==="")return"";const f=/ERROR: 0:(\d+)/.exec(u);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+u+`

`+SC(s.getShaderSource(e),p)}else return u}function MC(s,e){const i=yC(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const EC={[bx]:"Linear",[Tx]:"Reinhard",[Ax]:"Cineon",[Rx]:"ACESFilmic",[wx]:"AgX",[Dx]:"Neutral",[Cx]:"Custom"};function bC(s,e){const i=EC[e];return i===void 0?(nt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const cc=new j;function TC(){Mt.getLuminanceCoefficients(cc);const s=cc.x.toFixed(4),e=cc.y.toFixed(4),i=cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AC(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function RC(s){const e=[];for(const i in s){const r=s[i];r!==!1&&e.push("#define "+i+" "+r)}return e.join(`
`)}function CC(s,e){const i={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const u=s.getActiveAttrib(e,l),f=u.name;let p=1;u.type===s.FLOAT_MAT2&&(p=2),u.type===s.FLOAT_MAT3&&(p=3),u.type===s.FLOAT_MAT4&&(p=4),i[f]={type:u.type,location:s.getAttribLocation(e,f),locationSize:p}}return i}function gl(s){return s!==""}function Xv(s,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wv(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tp(s){return s.replace(wC,UC)}const DC=new Map;function UC(s,e){let i=ct[e];if(i===void 0){const r=DC.get(e);if(r!==void 0)i=ct[r],nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Tp(i)}const LC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qv(s){return s.replace(LC,NC)}function NC(s,e,i,r){let l="";for(let u=parseInt(e);u<parseInt(i);u++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function Yv(s){let e=`precision ${s.precision} float;
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
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const OC={[dc]:"SHADOWMAP_TYPE_PCF",[ml]:"SHADOWMAP_TYPE_VSM"};function PC(s){return OC[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const IC={[Jr]:"ENVMAP_TYPE_CUBE",[to]:"ENVMAP_TYPE_CUBE",[Nc]:"ENVMAP_TYPE_CUBE_UV"};function BC(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":IC[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const zC={[to]:"ENVMAP_MODE_REFRACTION"};function FC(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":zC[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const HC={[Ex]:"ENVMAP_BLENDING_MULTIPLY",[yb]:"ENVMAP_BLENDING_MIX",[Mb]:"ENVMAP_BLENDING_ADD"};function GC(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":HC[s.combine]||"ENVMAP_BLENDING_NONE"}function VC(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function kC(s,e,i,r){const l=s.getContext(),u=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=PC(i),d=BC(i),_=FC(i),v=GC(i),g=VC(i),M=AC(i),T=RC(u),A=l.createProgram();let x,S,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),x.length>0&&(x+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),S.length>0&&(S+=`
`)):(x=[Yv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),S=[Yv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==$i?"#define TONE_MAPPING":"",i.toneMapping!==$i?ct.tonemapping_pars_fragment:"",i.toneMapping!==$i?bC("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,MC("linearToOutputTexel",i.outputColorSpace),TC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(gl).join(`
`)),f=Tp(f),f=Xv(f,i),f=Wv(f,i),p=Tp(p),p=Xv(p,i),p=Wv(p,i),f=qv(f),p=qv(p),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,S=["#define varying in",i.glslVersion===av?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===av?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const I=L+x+f,C=L+S+p,N=Gv(l,l.VERTEX_SHADER,I),U=Gv(l,l.FRAGMENT_SHADER,C);l.attachShader(A,N),l.attachShader(A,U),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function O(F){if(s.debug.checkShaderErrors){const k=l.getProgramInfoLog(A)||"",$=l.getShaderInfoLog(N)||"",ue=l.getShaderInfoLog(U)||"",Y=k.trim(),z=$.trim(),V=ue.trim();let ne=!0,_e=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(ne=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,A,N,U);else{const be=kv(l,N,"vertex"),B=kv(l,U,"fragment");bt("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+Y+`
`+be+`
`+B)}else Y!==""?nt("WebGLProgram: Program Info Log:",Y):(z===""||V==="")&&(_e=!1);_e&&(F.diagnostics={runnable:ne,programLog:Y,vertexShader:{log:z,prefix:x},fragmentShader:{log:V,prefix:S}})}l.deleteShader(N),l.deleteShader(U),b=new vc(l,A),D=CC(l,A)}let b;this.getUniforms=function(){return b===void 0&&O(this),b};let D;this.getAttributes=function(){return D===void 0&&O(this),D};let H=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=l.getProgramParameter(A,vC)),H},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=xC++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=N,this.fragmentShader=U,this}let XC=0;class WC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,r){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(r)===!1&&(l.add(r),r.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let r=i.get(e);return r===void 0&&(r=new Set,i.set(e,r)),r}_getShaderStage(e){const i=this.shaderCache;let r=i.get(e);return r===void 0&&(r=new qC(e),i.set(e,r)),r}}class qC{constructor(e){this.id=XC++,this.code=e,this.usedTimes=0}}function YC(s){return s===jr||s===yc||s===Mc}function ZC(s,e,i,r,l,u){const f=new Gx,p=new WC,m=new Set,d=[],_=new Map,v=r.logarithmicDepthBuffer;let g=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(b){return m.add(b),b===0?"uv":`uv${b}`}function A(b,D,H,F,k,$){const ue=F.fog,Y=k.geometry,z=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ne=e.get(b.envMap||z,V),_e=ne&&ne.mapping===Nc?ne.image.height:null,be=M[b.type];b.precision!==null&&(g=r.getMaxPrecision(b.precision),g!==b.precision&&nt("WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const B=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Q=B!==void 0?B.length:0;let Ee=0;Y.morphAttributes.position!==void 0&&(Ee=1),Y.morphAttributes.normal!==void 0&&(Ee=2),Y.morphAttributes.color!==void 0&&(Ee=3);let Ce,Ie,re,Se;if(be){const Ve=Ki[be];Ce=Ve.vertexShader,Ie=Ve.fragmentShader}else{Ce=b.vertexShader,Ie=b.fragmentShader;const Ve=p.getVertexShaderStage(b),Qt=p.getFragmentShaderStage(b);p.update(b,Ve,Qt),re=Ve.id,Se=Qt.id}const Me=s.getRenderTarget(),He=s.state.buffers.depth.getReversed(),tt=k.isInstancedMesh===!0,Qe=k.isBatchedMesh===!0,Yt=!!b.map,ft=!!b.matcap,xt=!!ne,St=!!b.aoMap,ht=!!b.lightMap,rn=!!b.bumpMap&&b.wireframe===!1,sn=!!b.normalMap,on=!!b.displacementMap,hn=!!b.emissiveMap,qt=!!b.metalnessMap,ln=!!b.roughnessMap,Z=b.anisotropy>0,Ft=b.clearcoat>0,wt=b.dispersion>0,P=b.iridescence>0,E=b.sheen>0,J=b.transmission>0,se=Z&&!!b.anisotropyMap,de=Ft&&!!b.clearcoatMap,Te=Ft&&!!b.clearcoatNormalMap,De=Ft&&!!b.clearcoatRoughnessMap,he=P&&!!b.iridescenceMap,pe=P&&!!b.iridescenceThicknessMap,Re=E&&!!b.sheenColorMap,ze=E&&!!b.sheenRoughnessMap,Ne=!!b.specularMap,Ue=!!b.specularColorMap,Ke=!!b.specularIntensityMap,Je=J&&!!b.transmissionMap,it=J&&!!b.thicknessMap,W=!!b.gradientMap,Ae=!!b.alphaMap,ge=b.alphaTest>0,we=!!b.alphaHash,Be=!!b.extensions;let ye=$i;b.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(ye=s.toneMapping);const qe={shaderID:be,shaderType:b.type,shaderName:b.name,vertexShader:Ce,fragmentShader:Ie,defines:b.defines,customVertexShaderID:re,customFragmentShaderID:Se,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Qe,batchingColor:Qe&&k._colorsTexture!==null,instancing:tt,instancingColor:tt&&k.instanceColor!==null,instancingMorph:tt&&k.morphTexture!==null,outputColorSpace:Me===null?s.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Yt,matcap:ft,envMap:xt,envMapMode:xt&&ne.mapping,envMapCubeUVHeight:_e,aoMap:St,lightMap:ht,bumpMap:rn,normalMap:sn,displacementMap:on,emissiveMap:hn,normalMapObjectSpace:sn&&b.normalMapType===Tb,normalMapTangentSpace:sn&&b.normalMapType===yp,packedNormalMap:sn&&b.normalMapType===yp&&YC(b.normalMap.format),metalnessMap:qt,roughnessMap:ln,anisotropy:Z,anisotropyMap:se,clearcoat:Ft,clearcoatMap:de,clearcoatNormalMap:Te,clearcoatRoughnessMap:De,dispersion:wt,iridescence:P,iridescenceMap:he,iridescenceThicknessMap:pe,sheen:E,sheenColorMap:Re,sheenRoughnessMap:ze,specularMap:Ne,specularColorMap:Ue,specularIntensityMap:Ke,transmission:J,transmissionMap:Je,thicknessMap:it,gradientMap:W,opaque:b.transparent===!1&&b.blending===Js&&b.alphaToCoverage===!1,alphaMap:Ae,alphaTest:ge,alphaHash:we,combine:b.combine,mapUv:Yt&&T(b.map.channel),aoMapUv:St&&T(b.aoMap.channel),lightMapUv:ht&&T(b.lightMap.channel),bumpMapUv:rn&&T(b.bumpMap.channel),normalMapUv:sn&&T(b.normalMap.channel),displacementMapUv:on&&T(b.displacementMap.channel),emissiveMapUv:hn&&T(b.emissiveMap.channel),metalnessMapUv:qt&&T(b.metalnessMap.channel),roughnessMapUv:ln&&T(b.roughnessMap.channel),anisotropyMapUv:se&&T(b.anisotropyMap.channel),clearcoatMapUv:de&&T(b.clearcoatMap.channel),clearcoatNormalMapUv:Te&&T(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&T(b.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&T(b.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&T(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&T(b.sheenColorMap.channel),sheenRoughnessMapUv:ze&&T(b.sheenRoughnessMap.channel),specularMapUv:Ne&&T(b.specularMap.channel),specularColorMapUv:Ue&&T(b.specularColorMap.channel),specularIntensityMapUv:Ke&&T(b.specularIntensityMap.channel),transmissionMapUv:Je&&T(b.transmissionMap.channel),thicknessMapUv:it&&T(b.thicknessMap.channel),alphaMapUv:Ae&&T(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(sn||Z),vertexNormals:!!Y.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(Yt||Ae),fog:!!ue,useFog:b.fog===!0,fogExp2:!!ue&&ue.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||Y.attributes.normal===void 0&&sn===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:He,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:Y.attributes.position!==void 0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:Ee,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:ye,decodeVideoTexture:Yt&&b.map.isVideoTexture===!0&&Mt.getTransfer(b.map.colorSpace)===zt,decodeVideoTextureEmissive:hn&&b.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(b.emissiveMap.colorSpace)===zt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Bi,flipSided:b.side===$n,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Be&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&b.extensions.multiDraw===!0||Qe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return qe.vertexUv1s=m.has(1),qe.vertexUv2s=m.has(2),qe.vertexUv3s=m.has(3),m.clear(),qe}function x(b){const D=[];if(b.shaderID?D.push(b.shaderID):(D.push(b.customVertexShaderID),D.push(b.customFragmentShaderID)),b.defines!==void 0)for(const H in b.defines)D.push(H),D.push(b.defines[H]);return b.isRawShaderMaterial===!1&&(S(D,b),L(D,b),D.push(s.outputColorSpace)),D.push(b.customProgramCacheKey),D.join()}function S(b,D){b.push(D.precision),b.push(D.outputColorSpace),b.push(D.envMapMode),b.push(D.envMapCubeUVHeight),b.push(D.mapUv),b.push(D.alphaMapUv),b.push(D.lightMapUv),b.push(D.aoMapUv),b.push(D.bumpMapUv),b.push(D.normalMapUv),b.push(D.displacementMapUv),b.push(D.emissiveMapUv),b.push(D.metalnessMapUv),b.push(D.roughnessMapUv),b.push(D.anisotropyMapUv),b.push(D.clearcoatMapUv),b.push(D.clearcoatNormalMapUv),b.push(D.clearcoatRoughnessMapUv),b.push(D.iridescenceMapUv),b.push(D.iridescenceThicknessMapUv),b.push(D.sheenColorMapUv),b.push(D.sheenRoughnessMapUv),b.push(D.specularMapUv),b.push(D.specularColorMapUv),b.push(D.specularIntensityMapUv),b.push(D.transmissionMapUv),b.push(D.thicknessMapUv),b.push(D.combine),b.push(D.fogExp2),b.push(D.sizeAttenuation),b.push(D.morphTargetsCount),b.push(D.morphAttributeCount),b.push(D.numDirLights),b.push(D.numPointLights),b.push(D.numSpotLights),b.push(D.numSpotLightMaps),b.push(D.numHemiLights),b.push(D.numRectAreaLights),b.push(D.numDirLightShadows),b.push(D.numPointLightShadows),b.push(D.numSpotLightShadows),b.push(D.numSpotLightShadowsWithMaps),b.push(D.numLightProbes),b.push(D.shadowMapType),b.push(D.toneMapping),b.push(D.numClippingPlanes),b.push(D.numClipIntersection),b.push(D.depthPacking)}function L(b,D){f.disableAll(),D.instancing&&f.enable(0),D.instancingColor&&f.enable(1),D.instancingMorph&&f.enable(2),D.matcap&&f.enable(3),D.envMap&&f.enable(4),D.normalMapObjectSpace&&f.enable(5),D.normalMapTangentSpace&&f.enable(6),D.clearcoat&&f.enable(7),D.iridescence&&f.enable(8),D.alphaTest&&f.enable(9),D.vertexColors&&f.enable(10),D.vertexAlphas&&f.enable(11),D.vertexUv1s&&f.enable(12),D.vertexUv2s&&f.enable(13),D.vertexUv3s&&f.enable(14),D.vertexTangents&&f.enable(15),D.anisotropy&&f.enable(16),D.alphaHash&&f.enable(17),D.batching&&f.enable(18),D.dispersion&&f.enable(19),D.batchingColor&&f.enable(20),D.gradientMap&&f.enable(21),D.packedNormalMap&&f.enable(22),D.vertexNormals&&f.enable(23),b.push(f.mask),f.disableAll(),D.fog&&f.enable(0),D.useFog&&f.enable(1),D.flatShading&&f.enable(2),D.logarithmicDepthBuffer&&f.enable(3),D.reversedDepthBuffer&&f.enable(4),D.skinning&&f.enable(5),D.morphTargets&&f.enable(6),D.morphNormals&&f.enable(7),D.morphColors&&f.enable(8),D.premultipliedAlpha&&f.enable(9),D.shadowMapEnabled&&f.enable(10),D.doubleSided&&f.enable(11),D.flipSided&&f.enable(12),D.useDepthPacking&&f.enable(13),D.dithering&&f.enable(14),D.transmission&&f.enable(15),D.sheen&&f.enable(16),D.opaque&&f.enable(17),D.pointsUvs&&f.enable(18),D.decodeVideoTexture&&f.enable(19),D.decodeVideoTextureEmissive&&f.enable(20),D.alphaToCoverage&&f.enable(21),D.numLightProbeGrids>0&&f.enable(22),D.hasPositionAttribute&&f.enable(23),b.push(f.mask)}function I(b){const D=M[b.type];let H;if(D){const F=Ki[D];H=fT.clone(F.uniforms)}else H=b.uniforms;return H}function C(b,D){let H=_.get(D);return H!==void 0?++H.usedTimes:(H=new kC(s,D,b,l),d.push(H),_.set(D,H)),H}function N(b){if(--b.usedTimes===0){const D=d.indexOf(b);d[D]=d[d.length-1],d.pop(),_.delete(b.cacheKey),b.destroy()}}function U(b){p.remove(b)}function O(){p.dispose()}return{getParameters:A,getProgramCacheKey:x,getUniforms:I,acquireProgram:C,releaseProgram:N,releaseShaderCache:U,programs:d,dispose:O}}function KC(){let s=new WeakMap;function e(f){return s.has(f)}function i(f){let p=s.get(f);return p===void 0&&(p={},s.set(f,p)),p}function r(f){s.delete(f)}function l(f,p,m){s.get(f)[p]=m}function u(){s=new WeakMap}return{has:e,get:i,remove:r,update:l,dispose:u}}function QC(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Zv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Kv(){const s=[];let e=0;const i=[],r=[],l=[];function u(){e=0,i.length=0,r.length=0,l.length=0}function f(g){let M=0;return g.isInstancedMesh&&(M+=2),g.isSkinnedMesh&&(M+=1),M}function p(g,M,T,A,x,S){let L=s[e];return L===void 0?(L={id:g.id,object:g,geometry:M,material:T,materialVariant:f(g),groupOrder:A,renderOrder:g.renderOrder,z:x,group:S},s[e]=L):(L.id=g.id,L.object=g,L.geometry=M,L.material=T,L.materialVariant=f(g),L.groupOrder=A,L.renderOrder=g.renderOrder,L.z=x,L.group=S),e++,L}function m(g,M,T,A,x,S){const L=p(g,M,T,A,x,S);T.transmission>0?r.push(L):T.transparent===!0?l.push(L):i.push(L)}function d(g,M,T,A,x,S){const L=p(g,M,T,A,x,S);T.transmission>0?r.unshift(L):T.transparent===!0?l.unshift(L):i.unshift(L)}function _(g,M,T){i.length>1&&i.sort(g||QC),r.length>1&&r.sort(M||Zv),l.length>1&&l.sort(M||Zv),T&&(i.reverse(),r.reverse(),l.reverse())}function v(){for(let g=e,M=s.length;g<M;g++){const T=s[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:r,transparent:l,init:u,push:m,unshift:d,finish:v,sort:_}}function JC(){let s=new WeakMap;function e(r,l){const u=s.get(r);let f;return u===void 0?(f=new Kv,s.set(r,[f])):l>=u.length?(f=new Kv,u.push(f)):f=u[l],f}function i(){s=new WeakMap}return{get:e,dispose:i}}function jC(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new j,color:new gt};break;case"SpotLight":i={position:new j,direction:new j,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new j,color:new gt,distance:0,decay:0};break;case"HemisphereLight":i={direction:new j,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":i={color:new gt,position:new j,halfWidth:new j,halfHeight:new j};break}return s[e.id]=i,i}}}function $C(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=i,i}}}let e3=0;function t3(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function n3(s){const e=new jC,i=$C(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new j);const l=new j,u=new an,f=new an;function p(d){let _=0,v=0,g=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let M=0,T=0,A=0,x=0,S=0,L=0,I=0,C=0,N=0,U=0,O=0;d.sort(t3);for(let D=0,H=d.length;D<H;D++){const F=d[D],k=F.color,$=F.intensity,ue=F.distance;let Y=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===jr?Y=F.shadow.map.texture:Y=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)_+=k.r*$,v+=k.g*$,g+=k.b*$;else if(F.isLightProbe){for(let z=0;z<9;z++)r.probe[z].addScaledVector(F.sh.coefficients[z],$);O++}else if(F.isDirectionalLight){const z=e.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const V=F.shadow,ne=i.get(F);ne.shadowIntensity=V.intensity,ne.shadowBias=V.bias,ne.shadowNormalBias=V.normalBias,ne.shadowRadius=V.radius,ne.shadowMapSize=V.mapSize,r.directionalShadow[M]=ne,r.directionalShadowMap[M]=Y,r.directionalShadowMatrix[M]=F.shadow.matrix,L++}r.directional[M]=z,M++}else if(F.isSpotLight){const z=e.get(F);z.position.setFromMatrixPosition(F.matrixWorld),z.color.copy(k).multiplyScalar($),z.distance=ue,z.coneCos=Math.cos(F.angle),z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),z.decay=F.decay,r.spot[A]=z;const V=F.shadow;if(F.map&&(r.spotLightMap[N]=F.map,N++,V.updateMatrices(F),F.castShadow&&U++),r.spotLightMatrix[A]=V.matrix,F.castShadow){const ne=i.get(F);ne.shadowIntensity=V.intensity,ne.shadowBias=V.bias,ne.shadowNormalBias=V.normalBias,ne.shadowRadius=V.radius,ne.shadowMapSize=V.mapSize,r.spotShadow[A]=ne,r.spotShadowMap[A]=Y,C++}A++}else if(F.isRectAreaLight){const z=e.get(F);z.color.copy(k).multiplyScalar($),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),r.rectArea[x]=z,x++}else if(F.isPointLight){const z=e.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity),z.distance=F.distance,z.decay=F.decay,F.castShadow){const V=F.shadow,ne=i.get(F);ne.shadowIntensity=V.intensity,ne.shadowBias=V.bias,ne.shadowNormalBias=V.normalBias,ne.shadowRadius=V.radius,ne.shadowMapSize=V.mapSize,ne.shadowCameraNear=V.camera.near,ne.shadowCameraFar=V.camera.far,r.pointShadow[T]=ne,r.pointShadowMap[T]=Y,r.pointShadowMatrix[T]=F.shadow.matrix,I++}r.point[T]=z,T++}else if(F.isHemisphereLight){const z=e.get(F);z.skyColor.copy(F.color).multiplyScalar($),z.groundColor.copy(F.groundColor).multiplyScalar($),r.hemi[S]=z,S++}}x>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Pe.LTC_FLOAT_1,r.rectAreaLTC2=Pe.LTC_FLOAT_2):(r.rectAreaLTC1=Pe.LTC_HALF_1,r.rectAreaLTC2=Pe.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=v,r.ambient[2]=g;const b=r.hash;(b.directionalLength!==M||b.pointLength!==T||b.spotLength!==A||b.rectAreaLength!==x||b.hemiLength!==S||b.numDirectionalShadows!==L||b.numPointShadows!==I||b.numSpotShadows!==C||b.numSpotMaps!==N||b.numLightProbes!==O)&&(r.directional.length=M,r.spot.length=A,r.rectArea.length=x,r.point.length=T,r.hemi.length=S,r.directionalShadow.length=L,r.directionalShadowMap.length=L,r.pointShadow.length=I,r.pointShadowMap.length=I,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=L,r.pointShadowMatrix.length=I,r.spotLightMatrix.length=C+N-U,r.spotLightMap.length=N,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=O,b.directionalLength=M,b.pointLength=T,b.spotLength=A,b.rectAreaLength=x,b.hemiLength=S,b.numDirectionalShadows=L,b.numPointShadows=I,b.numSpotShadows=C,b.numSpotMaps=N,b.numLightProbes=O,r.version=e3++)}function m(d,_){let v=0,g=0,M=0,T=0,A=0;const x=_.matrixWorldInverse;for(let S=0,L=d.length;S<L;S++){const I=d[S];if(I.isDirectionalLight){const C=r.directional[v];C.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(x),v++}else if(I.isSpotLight){const C=r.spot[M];C.position.setFromMatrixPosition(I.matrixWorld),C.position.applyMatrix4(x),C.direction.setFromMatrixPosition(I.matrixWorld),l.setFromMatrixPosition(I.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(x),M++}else if(I.isRectAreaLight){const C=r.rectArea[T];C.position.setFromMatrixPosition(I.matrixWorld),C.position.applyMatrix4(x),f.identity(),u.copy(I.matrixWorld),u.premultiply(x),f.extractRotation(u),C.halfWidth.set(I.width*.5,0,0),C.halfHeight.set(0,I.height*.5,0),C.halfWidth.applyMatrix4(f),C.halfHeight.applyMatrix4(f),T++}else if(I.isPointLight){const C=r.point[g];C.position.setFromMatrixPosition(I.matrixWorld),C.position.applyMatrix4(x),g++}else if(I.isHemisphereLight){const C=r.hemi[A];C.direction.setFromMatrixPosition(I.matrixWorld),C.direction.transformDirection(x),A++}}}return{setup:p,setupView:m,state:r}}function Qv(s){const e=new n3(s),i=[],r=[],l=[];function u(g){v.camera=g,i.length=0,r.length=0,l.length=0}function f(g){i.push(g)}function p(g){r.push(g)}function m(g){l.push(g)}function d(){e.setup(i)}function _(g){e.setupView(i,g)}const v={lightsArray:i,shadowsArray:r,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:u,state:v,setupLights:d,setupLightsView:_,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function i3(s){let e=new WeakMap;function i(l,u=0){const f=e.get(l);let p;return f===void 0?(p=new Qv(s),e.set(l,[p])):u>=f.length?(p=new Qv(s),f.push(p)):p=f[u],p}function r(){e=new WeakMap}return{get:i,dispose:r}}const a3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r3=`uniform sampler2D shadow_pass;
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
}`,s3=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],o3=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],Jv=new an,fl=new j,Dd=new j;function l3(s,e,i){let r=new Kp;const l=new st,u=new st,f=new tn,p=new gT,m=new _T,d={},_=i.maxTextureSize,v={[vr]:$n,[$n]:vr,[Bi]:Bi},g=new ia({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:a3,fragmentShader:r3}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const T=new Wn;T.setAttribute("position",new Hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Ct(T,g),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dc;let S=this.type;this.render=function(U,O,b){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||U.length===0)return;this.type===nb&&(nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=dc);const D=s.getRenderTarget(),H=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),k=s.state;k.setBlending(wa),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const $=S!==this.type;$&&O.traverse(function(ue){ue.material&&(Array.isArray(ue.material)?ue.material.forEach(Y=>Y.needsUpdate=!0):ue.material.needsUpdate=!0)});for(let ue=0,Y=U.length;ue<Y;ue++){const z=U[ue],V=z.shadow;if(V===void 0){nt("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;l.copy(V.mapSize);const ne=V.getFrameExtents();l.multiply(ne),u.copy(V.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(u.x=Math.floor(_/ne.x),l.x=u.x*ne.x,V.mapSize.x=u.x),l.y>_&&(u.y=Math.floor(_/ne.y),l.y=u.y*ne.y,V.mapSize.y=u.y));const _e=s.state.buffers.depth.getReversed();if(V.camera._reversedDepth=_e,V.map===null||$===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===ml){if(z.isPointLight){nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new ea(l.x,l.y,{format:jr,type:La,minFilter:Hn,magFilter:Hn,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new no(l.x,l.y,Ji),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=Na,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Pn,V.map.depthTexture.magFilter=Pn}else z.isPointLight?(V.map=new tS(l.x),V.map.depthTexture=new uT(l.x,na)):(V.map=new ea(l.x,l.y),V.map.depthTexture=new no(l.x,l.y,na)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=Na,this.type===dc?(V.map.depthTexture.compareFunction=_e?Wp:Xp,V.map.depthTexture.minFilter=Hn,V.map.depthTexture.magFilter=Hn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Pn,V.map.depthTexture.magFilter=Pn);V.camera.updateProjectionMatrix()}const be=V.map.isWebGLCubeRenderTarget?6:1;for(let B=0;B<be;B++){if(V.map.isWebGLCubeRenderTarget)s.setRenderTarget(V.map,B),s.clear();else{B===0&&(s.setRenderTarget(V.map),s.clear());const Q=V.getViewport(B);f.set(u.x*Q.x,u.y*Q.y,u.x*Q.z,u.y*Q.w),k.viewport(f)}if(z.isPointLight){const Q=V.camera,Ee=V.matrix,Ce=z.distance||Q.far;Ce!==Q.far&&(Q.far=Ce,Q.updateProjectionMatrix()),fl.setFromMatrixPosition(z.matrixWorld),Q.position.copy(fl),Dd.copy(Q.position),Dd.add(s3[B]),Q.up.copy(o3[B]),Q.lookAt(Dd),Q.updateMatrixWorld(),Ee.makeTranslation(-fl.x,-fl.y,-fl.z),Jv.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Jv,Q.coordinateSystem,Q.reversedDepth)}else V.updateMatrices(z);r=V.getFrustum(),C(O,b,V.camera,z,this.type)}V.isPointLightShadow!==!0&&this.type===ml&&L(V,b),V.needsUpdate=!1}S=this.type,x.needsUpdate=!1,s.setRenderTarget(D,H,F)};function L(U,O){const b=e.update(A);g.defines.VSM_SAMPLES!==U.blurSamples&&(g.defines.VSM_SAMPLES=U.blurSamples,M.defines.VSM_SAMPLES=U.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new ea(l.x,l.y,{format:jr,type:La})),g.uniforms.shadow_pass.value=U.map.depthTexture,g.uniforms.resolution.value=U.mapSize,g.uniforms.radius.value=U.radius,s.setRenderTarget(U.mapPass),s.clear(),s.renderBufferDirect(O,null,b,g,A,null),M.uniforms.shadow_pass.value=U.mapPass.texture,M.uniforms.resolution.value=U.mapSize,M.uniforms.radius.value=U.radius,s.setRenderTarget(U.map),s.clear(),s.renderBufferDirect(O,null,b,M,A,null)}function I(U,O,b,D){let H=null;const F=b.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(F!==void 0)H=F;else if(H=b.isPointLight===!0?m:p,s.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const k=H.uuid,$=O.uuid;let ue=d[k];ue===void 0&&(ue={},d[k]=ue);let Y=ue[$];Y===void 0&&(Y=H.clone(),ue[$]=Y,O.addEventListener("dispose",N)),H=Y}if(H.visible=O.visible,H.wireframe=O.wireframe,D===ml?H.side=O.shadowSide!==null?O.shadowSide:O.side:H.side=O.shadowSide!==null?O.shadowSide:v[O.side],H.alphaMap=O.alphaMap,H.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,H.map=O.map,H.clipShadows=O.clipShadows,H.clippingPlanes=O.clippingPlanes,H.clipIntersection=O.clipIntersection,H.displacementMap=O.displacementMap,H.displacementScale=O.displacementScale,H.displacementBias=O.displacementBias,H.wireframeLinewidth=O.wireframeLinewidth,H.linewidth=O.linewidth,b.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const k=s.properties.get(H);k.light=b}return H}function C(U,O,b,D,H){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&H===ml)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,U.matrixWorld);const $=e.update(U),ue=U.material;if(Array.isArray(ue)){const Y=$.groups;for(let z=0,V=Y.length;z<V;z++){const ne=Y[z],_e=ue[ne.materialIndex];if(_e&&_e.visible){const be=I(U,_e,D,H);U.onBeforeShadow(s,U,O,b,$,be,ne),s.renderBufferDirect(b,null,$,be,U,ne),U.onAfterShadow(s,U,O,b,$,be,ne)}}}else if(ue.visible){const Y=I(U,ue,D,H);U.onBeforeShadow(s,U,O,b,$,Y,null),s.renderBufferDirect(b,null,$,Y,U,null),U.onAfterShadow(s,U,O,b,$,Y,null)}}const k=U.children;for(let $=0,ue=k.length;$<ue;$++)C(k[$],O,b,D,H)}function N(U){U.target.removeEventListener("dispose",N);for(const b in d){const D=d[b],H=U.target.uuid;H in D&&(D[H].dispose(),delete D[H])}}}function u3(s,e){function i(){let W=!1;const Ae=new tn;let ge=null;const we=new tn(0,0,0,0);return{setMask:function(Be){ge!==Be&&!W&&(s.colorMask(Be,Be,Be,Be),ge=Be)},setLocked:function(Be){W=Be},setClear:function(Be,ye,qe,Ve,Qt){Qt===!0&&(Be*=Ve,ye*=Ve,qe*=Ve),Ae.set(Be,ye,qe,Ve),we.equals(Ae)===!1&&(s.clearColor(Be,ye,qe,Ve),we.copy(Ae))},reset:function(){W=!1,ge=null,we.set(-1,0,0,0)}}}function r(){let W=!1,Ae=!1,ge=null,we=null,Be=null;return{setReversed:function(ye){if(Ae!==ye){const qe=e.get("EXT_clip_control");ye?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Ae=ye;const Ve=Be;Be=null,this.setClear(Ve)}},getReversed:function(){return Ae},setTest:function(ye){ye?Me(s.DEPTH_TEST):He(s.DEPTH_TEST)},setMask:function(ye){ge!==ye&&!W&&(s.depthMask(ye),ge=ye)},setFunc:function(ye){if(Ae&&(ye=Pb[ye]),we!==ye){switch(ye){case Id:s.depthFunc(s.NEVER);break;case Bd:s.depthFunc(s.ALWAYS);break;case zd:s.depthFunc(s.LESS);break;case eo:s.depthFunc(s.LEQUAL);break;case Fd:s.depthFunc(s.EQUAL);break;case Hd:s.depthFunc(s.GEQUAL);break;case Gd:s.depthFunc(s.GREATER);break;case Vd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}we=ye}},setLocked:function(ye){W=ye},setClear:function(ye){Be!==ye&&(Be=ye,Ae&&(ye=1-ye),s.clearDepth(ye))},reset:function(){W=!1,ge=null,we=null,Be=null,Ae=!1}}}function l(){let W=!1,Ae=null,ge=null,we=null,Be=null,ye=null,qe=null,Ve=null,Qt=null;return{setTest:function(Lt){W||(Lt?Me(s.STENCIL_TEST):He(s.STENCIL_TEST))},setMask:function(Lt){Ae!==Lt&&!W&&(s.stencilMask(Lt),Ae=Lt)},setFunc:function(Lt,ei,ti){(ge!==Lt||we!==ei||Be!==ti)&&(s.stencilFunc(Lt,ei,ti),ge=Lt,we=ei,Be=ti)},setOp:function(Lt,ei,ti){(ye!==Lt||qe!==ei||Ve!==ti)&&(s.stencilOp(Lt,ei,ti),ye=Lt,qe=ei,Ve=ti)},setLocked:function(Lt){W=Lt},setClear:function(Lt){Qt!==Lt&&(s.clearStencil(Lt),Qt=Lt)},reset:function(){W=!1,Ae=null,ge=null,we=null,Be=null,ye=null,qe=null,Ve=null,Qt=null}}}const u=new i,f=new r,p=new l,m=new WeakMap,d=new WeakMap;let _={},v={},g={},M=new WeakMap,T=[],A=null,x=!1,S=null,L=null,I=null,C=null,N=null,U=null,O=null,b=new gt(0,0,0),D=0,H=!1,F=null,k=null,$=null,ue=null,Y=null;const z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ne=0;const _e=s.getParameter(s.VERSION);_e.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(_e)[1]),V=ne>=1):_e.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(_e)[1]),V=ne>=2);let be=null,B={};const Q=s.getParameter(s.SCISSOR_BOX),Ee=s.getParameter(s.VIEWPORT),Ce=new tn().fromArray(Q),Ie=new tn().fromArray(Ee);function re(W,Ae,ge,we){const Be=new Uint8Array(4),ye=s.createTexture();s.bindTexture(W,ye),s.texParameteri(W,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(W,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let qe=0;qe<ge;qe++)W===s.TEXTURE_3D||W===s.TEXTURE_2D_ARRAY?s.texImage3D(Ae,0,s.RGBA,1,1,we,0,s.RGBA,s.UNSIGNED_BYTE,Be):s.texImage2D(Ae+qe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Be);return ye}const Se={};Se[s.TEXTURE_2D]=re(s.TEXTURE_2D,s.TEXTURE_2D,1),Se[s.TEXTURE_CUBE_MAP]=re(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[s.TEXTURE_2D_ARRAY]=re(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Se[s.TEXTURE_3D]=re(s.TEXTURE_3D,s.TEXTURE_3D,1,1),u.setClear(0,0,0,1),f.setClear(1),p.setClear(0),Me(s.DEPTH_TEST),f.setFunc(eo),rn(!1),sn($_),Me(s.CULL_FACE),St(wa);function Me(W){_[W]!==!0&&(s.enable(W),_[W]=!0)}function He(W){_[W]!==!1&&(s.disable(W),_[W]=!1)}function tt(W,Ae){return g[W]!==Ae?(s.bindFramebuffer(W,Ae),g[W]=Ae,W===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=Ae),W===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=Ae),!0):!1}function Qe(W,Ae){let ge=T,we=!1;if(W){ge=M.get(Ae),ge===void 0&&(ge=[],M.set(Ae,ge));const Be=W.textures;if(ge.length!==Be.length||ge[0]!==s.COLOR_ATTACHMENT0){for(let ye=0,qe=Be.length;ye<qe;ye++)ge[ye]=s.COLOR_ATTACHMENT0+ye;ge.length=Be.length,we=!0}}else ge[0]!==s.BACK&&(ge[0]=s.BACK,we=!0);we&&s.drawBuffers(ge)}function Yt(W){return A!==W?(s.useProgram(W),A=W,!0):!1}const ft={[Yr]:s.FUNC_ADD,[ab]:s.FUNC_SUBTRACT,[rb]:s.FUNC_REVERSE_SUBTRACT};ft[sb]=s.MIN,ft[ob]=s.MAX;const xt={[lb]:s.ZERO,[ub]:s.ONE,[cb]:s.SRC_COLOR,[Od]:s.SRC_ALPHA,[gb]:s.SRC_ALPHA_SATURATE,[pb]:s.DST_COLOR,[hb]:s.DST_ALPHA,[fb]:s.ONE_MINUS_SRC_COLOR,[Pd]:s.ONE_MINUS_SRC_ALPHA,[mb]:s.ONE_MINUS_DST_COLOR,[db]:s.ONE_MINUS_DST_ALPHA,[_b]:s.CONSTANT_COLOR,[vb]:s.ONE_MINUS_CONSTANT_COLOR,[xb]:s.CONSTANT_ALPHA,[Sb]:s.ONE_MINUS_CONSTANT_ALPHA};function St(W,Ae,ge,we,Be,ye,qe,Ve,Qt,Lt){if(W===wa){x===!0&&(He(s.BLEND),x=!1);return}if(x===!1&&(Me(s.BLEND),x=!0),W!==ib){if(W!==S||Lt!==H){if((L!==Yr||N!==Yr)&&(s.blendEquation(s.FUNC_ADD),L=Yr,N=Yr),Lt)switch(W){case Js:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ev:s.blendFunc(s.ONE,s.ONE);break;case tv:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nv:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:bt("WebGLState: Invalid blending: ",W);break}else switch(W){case Js:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ev:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case tv:bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nv:bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:bt("WebGLState: Invalid blending: ",W);break}I=null,C=null,U=null,O=null,b.set(0,0,0),D=0,S=W,H=Lt}return}Be=Be||Ae,ye=ye||ge,qe=qe||we,(Ae!==L||Be!==N)&&(s.blendEquationSeparate(ft[Ae],ft[Be]),L=Ae,N=Be),(ge!==I||we!==C||ye!==U||qe!==O)&&(s.blendFuncSeparate(xt[ge],xt[we],xt[ye],xt[qe]),I=ge,C=we,U=ye,O=qe),(Ve.equals(b)===!1||Qt!==D)&&(s.blendColor(Ve.r,Ve.g,Ve.b,Qt),b.copy(Ve),D=Qt),S=W,H=!1}function ht(W,Ae){W.side===Bi?He(s.CULL_FACE):Me(s.CULL_FACE);let ge=W.side===$n;Ae&&(ge=!ge),rn(ge),W.blending===Js&&W.transparent===!1?St(wa):St(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),f.setFunc(W.depthFunc),f.setTest(W.depthTest),f.setMask(W.depthWrite),u.setMask(W.colorWrite);const we=W.stencilWrite;p.setTest(we),we&&(p.setMask(W.stencilWriteMask),p.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),p.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),hn(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Me(s.SAMPLE_ALPHA_TO_COVERAGE):He(s.SAMPLE_ALPHA_TO_COVERAGE)}function rn(W){F!==W&&(W?s.frontFace(s.CW):s.frontFace(s.CCW),F=W)}function sn(W){W!==eb?(Me(s.CULL_FACE),W!==k&&(W===$_?s.cullFace(s.BACK):W===tb?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):He(s.CULL_FACE),k=W}function on(W){W!==$&&(V&&s.lineWidth(W),$=W)}function hn(W,Ae,ge){W?(Me(s.POLYGON_OFFSET_FILL),(ue!==Ae||Y!==ge)&&(ue=Ae,Y=ge,f.getReversed()&&(Ae=-Ae),s.polygonOffset(Ae,ge))):He(s.POLYGON_OFFSET_FILL)}function qt(W){W?Me(s.SCISSOR_TEST):He(s.SCISSOR_TEST)}function ln(W){W===void 0&&(W=s.TEXTURE0+z-1),be!==W&&(s.activeTexture(W),be=W)}function Z(W,Ae,ge){ge===void 0&&(be===null?ge=s.TEXTURE0+z-1:ge=be);let we=B[ge];we===void 0&&(we={type:void 0,texture:void 0},B[ge]=we),(we.type!==W||we.texture!==Ae)&&(be!==ge&&(s.activeTexture(ge),be=ge),s.bindTexture(W,Ae||Se[W]),we.type=W,we.texture=Ae)}function Ft(){const W=B[be];W!==void 0&&W.type!==void 0&&(s.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function wt(){try{s.compressedTexImage2D(...arguments)}catch(W){bt("WebGLState:",W)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(W){bt("WebGLState:",W)}}function E(){try{s.texSubImage2D(...arguments)}catch(W){bt("WebGLState:",W)}}function J(){try{s.texSubImage3D(...arguments)}catch(W){bt("WebGLState:",W)}}function se(){try{s.compressedTexSubImage2D(...arguments)}catch(W){bt("WebGLState:",W)}}function de(){try{s.compressedTexSubImage3D(...arguments)}catch(W){bt("WebGLState:",W)}}function Te(){try{s.texStorage2D(...arguments)}catch(W){bt("WebGLState:",W)}}function De(){try{s.texStorage3D(...arguments)}catch(W){bt("WebGLState:",W)}}function he(){try{s.texImage2D(...arguments)}catch(W){bt("WebGLState:",W)}}function pe(){try{s.texImage3D(...arguments)}catch(W){bt("WebGLState:",W)}}function Re(W){return v[W]!==void 0?v[W]:s.getParameter(W)}function ze(W,Ae){v[W]!==Ae&&(s.pixelStorei(W,Ae),v[W]=Ae)}function Ne(W){Ce.equals(W)===!1&&(s.scissor(W.x,W.y,W.z,W.w),Ce.copy(W))}function Ue(W){Ie.equals(W)===!1&&(s.viewport(W.x,W.y,W.z,W.w),Ie.copy(W))}function Ke(W,Ae){let ge=d.get(Ae);ge===void 0&&(ge=new WeakMap,d.set(Ae,ge));let we=ge.get(W);we===void 0&&(we=s.getUniformBlockIndex(Ae,W.name),ge.set(W,we))}function Je(W,Ae){const we=d.get(Ae).get(W);m.get(Ae)!==we&&(s.uniformBlockBinding(Ae,we,W.__bindingPointIndex),m.set(Ae,we))}function it(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),f.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),_={},v={},be=null,B={},g={},M=new WeakMap,T=[],A=null,x=!1,S=null,L=null,I=null,C=null,N=null,U=null,O=null,b=new gt(0,0,0),D=0,H=!1,F=null,k=null,$=null,ue=null,Y=null,Ce.set(0,0,s.canvas.width,s.canvas.height),Ie.set(0,0,s.canvas.width,s.canvas.height),u.reset(),f.reset(),p.reset()}return{buffers:{color:u,depth:f,stencil:p},enable:Me,disable:He,bindFramebuffer:tt,drawBuffers:Qe,useProgram:Yt,setBlending:St,setMaterial:ht,setFlipSided:rn,setCullFace:sn,setLineWidth:on,setPolygonOffset:hn,setScissorTest:qt,activeTexture:ln,bindTexture:Z,unbindTexture:Ft,compressedTexImage2D:wt,compressedTexImage3D:P,texImage2D:he,texImage3D:pe,pixelStorei:ze,getParameter:Re,updateUBOMapping:Ke,uniformBlockBinding:Je,texStorage2D:Te,texStorage3D:De,texSubImage2D:E,texSubImage3D:J,compressedTexSubImage2D:se,compressedTexSubImage3D:de,scissor:Ne,viewport:Ue,reset:it}}function c3(s,e,i,r,l,u,f){const p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new st,_=new WeakMap,v=new Set;let g;const M=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(P,E){return T?new OffscreenCanvas(P,E):Tc("canvas")}function x(P,E,J){let se=1;const de=wt(P);if((de.width>J||de.height>J)&&(se=J/Math.max(de.width,de.height)),se<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Te=Math.floor(se*de.width),De=Math.floor(se*de.height);g===void 0&&(g=A(Te,De));const he=E?A(Te,De):g;return he.width=Te,he.height=De,he.getContext("2d").drawImage(P,0,0,Te,De),nt("WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+Te+"x"+De+")."),he}else return"data"in P&&nt("WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),P;return P}function S(P){return P.generateMipmaps}function L(P){s.generateMipmap(P)}function I(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function C(P,E,J,se,de,Te=!1){if(P!==null){if(s[P]!==void 0)return s[P];nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let De;se&&(De=e.get("EXT_texture_norm16"),De||nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let he=E;if(E===s.RED&&(J===s.FLOAT&&(he=s.R32F),J===s.HALF_FLOAT&&(he=s.R16F),J===s.UNSIGNED_BYTE&&(he=s.R8),J===s.UNSIGNED_SHORT&&De&&(he=De.R16_EXT),J===s.SHORT&&De&&(he=De.R16_SNORM_EXT)),E===s.RED_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.R8UI),J===s.UNSIGNED_SHORT&&(he=s.R16UI),J===s.UNSIGNED_INT&&(he=s.R32UI),J===s.BYTE&&(he=s.R8I),J===s.SHORT&&(he=s.R16I),J===s.INT&&(he=s.R32I)),E===s.RG&&(J===s.FLOAT&&(he=s.RG32F),J===s.HALF_FLOAT&&(he=s.RG16F),J===s.UNSIGNED_BYTE&&(he=s.RG8),J===s.UNSIGNED_SHORT&&De&&(he=De.RG16_EXT),J===s.SHORT&&De&&(he=De.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.RG8UI),J===s.UNSIGNED_SHORT&&(he=s.RG16UI),J===s.UNSIGNED_INT&&(he=s.RG32UI),J===s.BYTE&&(he=s.RG8I),J===s.SHORT&&(he=s.RG16I),J===s.INT&&(he=s.RG32I)),E===s.RGB_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.RGB8UI),J===s.UNSIGNED_SHORT&&(he=s.RGB16UI),J===s.UNSIGNED_INT&&(he=s.RGB32UI),J===s.BYTE&&(he=s.RGB8I),J===s.SHORT&&(he=s.RGB16I),J===s.INT&&(he=s.RGB32I)),E===s.RGBA_INTEGER&&(J===s.UNSIGNED_BYTE&&(he=s.RGBA8UI),J===s.UNSIGNED_SHORT&&(he=s.RGBA16UI),J===s.UNSIGNED_INT&&(he=s.RGBA32UI),J===s.BYTE&&(he=s.RGBA8I),J===s.SHORT&&(he=s.RGBA16I),J===s.INT&&(he=s.RGBA32I)),E===s.RGB&&(J===s.UNSIGNED_SHORT&&De&&(he=De.RGB16_EXT),J===s.SHORT&&De&&(he=De.RGB16_SNORM_EXT),J===s.UNSIGNED_INT_5_9_9_9_REV&&(he=s.RGB9_E5),J===s.UNSIGNED_INT_10F_11F_11F_REV&&(he=s.R11F_G11F_B10F)),E===s.RGBA){const pe=Te?bc:Mt.getTransfer(de);J===s.FLOAT&&(he=s.RGBA32F),J===s.HALF_FLOAT&&(he=s.RGBA16F),J===s.UNSIGNED_BYTE&&(he=pe===zt?s.SRGB8_ALPHA8:s.RGBA8),J===s.UNSIGNED_SHORT&&De&&(he=De.RGBA16_EXT),J===s.SHORT&&De&&(he=De.RGBA16_SNORM_EXT),J===s.UNSIGNED_SHORT_4_4_4_4&&(he=s.RGBA4),J===s.UNSIGNED_SHORT_5_5_5_1&&(he=s.RGB5_A1)}return(he===s.R16F||he===s.R32F||he===s.RG16F||he===s.RG32F||he===s.RGBA16F||he===s.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function N(P,E){let J;return P?E===null||E===na||E===yl?J=s.DEPTH24_STENCIL8:E===Ji?J=s.DEPTH32F_STENCIL8:E===Sl&&(J=s.DEPTH24_STENCIL8,nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===na||E===yl?J=s.DEPTH_COMPONENT24:E===Ji?J=s.DEPTH_COMPONENT32F:E===Sl&&(J=s.DEPTH_COMPONENT16),J}function U(P,E){return S(P)===!0||P.isFramebufferTexture&&P.minFilter!==Pn&&P.minFilter!==Hn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function O(P){const E=P.target;E.removeEventListener("dispose",O),D(E),E.isVideoTexture&&_.delete(E),E.isHTMLTexture&&v.delete(E)}function b(P){const E=P.target;E.removeEventListener("dispose",b),F(E)}function D(P){const E=r.get(P);if(E.__webglInit===void 0)return;const J=P.source,se=M.get(J);if(se){const de=se[E.__cacheKey];de.usedTimes--,de.usedTimes===0&&H(P),Object.keys(se).length===0&&M.delete(J)}r.remove(P)}function H(P){const E=r.get(P);s.deleteTexture(E.__webglTexture);const J=P.source,se=M.get(J);delete se[E.__cacheKey],f.memory.textures--}function F(P){const E=r.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),r.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(E.__webglFramebuffer[se]))for(let de=0;de<E.__webglFramebuffer[se].length;de++)s.deleteFramebuffer(E.__webglFramebuffer[se][de]);else s.deleteFramebuffer(E.__webglFramebuffer[se]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[se])}else{if(Array.isArray(E.__webglFramebuffer))for(let se=0;se<E.__webglFramebuffer.length;se++)s.deleteFramebuffer(E.__webglFramebuffer[se]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let se=0;se<E.__webglColorRenderbuffer.length;se++)E.__webglColorRenderbuffer[se]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[se]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const J=P.textures;for(let se=0,de=J.length;se<de;se++){const Te=r.get(J[se]);Te.__webglTexture&&(s.deleteTexture(Te.__webglTexture),f.memory.textures--),r.remove(J[se])}r.remove(P)}let k=0;function $(){k=0}function ue(){return k}function Y(P){k=P}function z(){const P=k;return P>=l.maxTextures&&nt("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l.maxTextures),k+=1,P}function V(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function ne(P,E){const J=r.get(P);if(P.isVideoTexture&&Z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&J.__version!==P.version){const se=P.image;if(se===null)nt("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)nt("WebGLRenderer: Texture marked for update but image is incomplete");else{He(J,P,E);return}}else P.isExternalTexture&&(J.__webglTexture=P.sourceTexture?P.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,J.__webglTexture,s.TEXTURE0+E)}function _e(P,E){const J=r.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&J.__version!==P.version){He(J,P,E);return}else P.isExternalTexture&&(J.__webglTexture=P.sourceTexture?P.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,J.__webglTexture,s.TEXTURE0+E)}function be(P,E){const J=r.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&J.__version!==P.version){He(J,P,E);return}i.bindTexture(s.TEXTURE_3D,J.__webglTexture,s.TEXTURE0+E)}function B(P,E){const J=r.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&J.__version!==P.version){tt(J,P,E);return}i.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture,s.TEXTURE0+E)}const Q={[kd]:s.REPEAT,[Ca]:s.CLAMP_TO_EDGE,[Xd]:s.MIRRORED_REPEAT},Ee={[Pn]:s.NEAREST,[Eb]:s.NEAREST_MIPMAP_NEAREST,[Hu]:s.NEAREST_MIPMAP_LINEAR,[Hn]:s.LINEAR,[jh]:s.LINEAR_MIPMAP_NEAREST,[Kr]:s.LINEAR_MIPMAP_LINEAR},Ce={[Ab]:s.NEVER,[Ub]:s.ALWAYS,[Rb]:s.LESS,[Xp]:s.LEQUAL,[Cb]:s.EQUAL,[Wp]:s.GEQUAL,[wb]:s.GREATER,[Db]:s.NOTEQUAL};function Ie(P,E){if(E.type===Ji&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Hn||E.magFilter===jh||E.magFilter===Hu||E.magFilter===Kr||E.minFilter===Hn||E.minFilter===jh||E.minFilter===Hu||E.minFilter===Kr)&&nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,Q[E.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,Q[E.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,Q[E.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,Ee[E.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,Ee[E.minFilter]),E.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,Ce[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Pn||E.minFilter!==Hu&&E.minFilter!==Kr||E.type===Ji&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function re(P,E){let J=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",O));const se=E.source;let de=M.get(se);de===void 0&&(de={},M.set(se,de));const Te=V(E);if(Te!==P.__cacheKey){de[Te]===void 0&&(de[Te]={texture:s.createTexture(),usedTimes:0},f.memory.textures++,J=!0),de[Te].usedTimes++;const De=de[P.__cacheKey];De!==void 0&&(de[P.__cacheKey].usedTimes--,De.usedTimes===0&&H(E)),P.__cacheKey=Te,P.__webglTexture=de[Te].texture}return J}function Se(P,E,J){return Math.floor(Math.floor(P/J)/E)}function Me(P,E,J,se){const Te=P.updateRanges;if(Te.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,J,se,E.data);else{Te.sort((ze,Ne)=>ze.start-Ne.start);let De=0;for(let ze=1;ze<Te.length;ze++){const Ne=Te[De],Ue=Te[ze],Ke=Ne.start+Ne.count,Je=Se(Ue.start,E.width,4),it=Se(Ne.start,E.width,4);Ue.start<=Ke+1&&Je===it&&Se(Ue.start+Ue.count-1,E.width,4)===Je?Ne.count=Math.max(Ne.count,Ue.start+Ue.count-Ne.start):(++De,Te[De]=Ue)}Te.length=De+1;const he=i.getParameter(s.UNPACK_ROW_LENGTH),pe=i.getParameter(s.UNPACK_SKIP_PIXELS),Re=i.getParameter(s.UNPACK_SKIP_ROWS);i.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let ze=0,Ne=Te.length;ze<Ne;ze++){const Ue=Te[ze],Ke=Math.floor(Ue.start/4),Je=Math.ceil(Ue.count/4),it=Ke%E.width,W=Math.floor(Ke/E.width),Ae=Je,ge=1;i.pixelStorei(s.UNPACK_SKIP_PIXELS,it),i.pixelStorei(s.UNPACK_SKIP_ROWS,W),i.texSubImage2D(s.TEXTURE_2D,0,it,W,Ae,ge,J,se,E.data)}P.clearUpdateRanges(),i.pixelStorei(s.UNPACK_ROW_LENGTH,he),i.pixelStorei(s.UNPACK_SKIP_PIXELS,pe),i.pixelStorei(s.UNPACK_SKIP_ROWS,Re)}}function He(P,E,J){let se=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(se=s.TEXTURE_3D);const de=re(P,E),Te=E.source;i.bindTexture(se,P.__webglTexture,s.TEXTURE0+J);const De=r.get(Te);if(Te.version!==De.__version||de===!0){if(i.activeTexture(s.TEXTURE0+J),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const ge=Mt.getPrimaries(Mt.workingColorSpace),we=E.colorSpace===mr?null:Mt.getPrimaries(E.colorSpace),Be=E.colorSpace===mr||ge===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let pe=x(E.image,!1,l.maxTextureSize);pe=Ft(E,pe);const Re=u.convert(E.format,E.colorSpace),ze=u.convert(E.type);let Ne=C(E.internalFormat,Re,ze,E.normalized,E.colorSpace,E.isVideoTexture);Ie(se,E);let Ue;const Ke=E.mipmaps,Je=E.isVideoTexture!==!0,it=De.__version===void 0||de===!0,W=Te.dataReady,Ae=U(E,pe);if(E.isDepthTexture)Ne=N(E.format===Qr,E.type),it&&(Je?i.texStorage2D(s.TEXTURE_2D,1,Ne,pe.width,pe.height):i.texImage2D(s.TEXTURE_2D,0,Ne,pe.width,pe.height,0,Re,ze,null));else if(E.isDataTexture)if(Ke.length>0){Je&&it&&i.texStorage2D(s.TEXTURE_2D,Ae,Ne,Ke[0].width,Ke[0].height);for(let ge=0,we=Ke.length;ge<we;ge++)Ue=Ke[ge],Je?W&&i.texSubImage2D(s.TEXTURE_2D,ge,0,0,Ue.width,Ue.height,Re,ze,Ue.data):i.texImage2D(s.TEXTURE_2D,ge,Ne,Ue.width,Ue.height,0,Re,ze,Ue.data);E.generateMipmaps=!1}else Je?(it&&i.texStorage2D(s.TEXTURE_2D,Ae,Ne,pe.width,pe.height),W&&Me(E,pe,Re,ze)):i.texImage2D(s.TEXTURE_2D,0,Ne,pe.width,pe.height,0,Re,ze,pe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Je&&it&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Ae,Ne,Ke[0].width,Ke[0].height,pe.depth);for(let ge=0,we=Ke.length;ge<we;ge++)if(Ue=Ke[ge],E.format!==zi)if(Re!==null)if(Je){if(W)if(E.layerUpdates.size>0){const Be=Cv(Ue.width,Ue.height,E.format,E.type);for(const ye of E.layerUpdates){const qe=Ue.data.subarray(ye*Be/Ue.data.BYTES_PER_ELEMENT,(ye+1)*Be/Ue.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ge,0,0,ye,Ue.width,Ue.height,1,Re,qe)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ge,0,0,0,Ue.width,Ue.height,pe.depth,Re,Ue.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ge,Ne,Ue.width,Ue.height,pe.depth,0,Ue.data,0,0);else nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?W&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,ge,0,0,0,Ue.width,Ue.height,pe.depth,Re,ze,Ue.data):i.texImage3D(s.TEXTURE_2D_ARRAY,ge,Ne,Ue.width,Ue.height,pe.depth,0,Re,ze,Ue.data)}else{Je&&it&&i.texStorage2D(s.TEXTURE_2D,Ae,Ne,Ke[0].width,Ke[0].height);for(let ge=0,we=Ke.length;ge<we;ge++)Ue=Ke[ge],E.format!==zi?Re!==null?Je?W&&i.compressedTexSubImage2D(s.TEXTURE_2D,ge,0,0,Ue.width,Ue.height,Re,Ue.data):i.compressedTexImage2D(s.TEXTURE_2D,ge,Ne,Ue.width,Ue.height,0,Ue.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?W&&i.texSubImage2D(s.TEXTURE_2D,ge,0,0,Ue.width,Ue.height,Re,ze,Ue.data):i.texImage2D(s.TEXTURE_2D,ge,Ne,Ue.width,Ue.height,0,Re,ze,Ue.data)}else if(E.isDataArrayTexture)if(Je){if(it&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Ae,Ne,pe.width,pe.height,pe.depth),W)if(E.layerUpdates.size>0){const ge=Cv(pe.width,pe.height,E.format,E.type);for(const we of E.layerUpdates){const Be=pe.data.subarray(we*ge/pe.data.BYTES_PER_ELEMENT,(we+1)*ge/pe.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,we,pe.width,pe.height,1,Re,ze,Be)}E.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Re,ze,pe.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Ne,pe.width,pe.height,pe.depth,0,Re,ze,pe.data);else if(E.isData3DTexture)Je?(it&&i.texStorage3D(s.TEXTURE_3D,Ae,Ne,pe.width,pe.height,pe.depth),W&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Re,ze,pe.data)):i.texImage3D(s.TEXTURE_3D,0,Ne,pe.width,pe.height,pe.depth,0,Re,ze,pe.data);else if(E.isFramebufferTexture){if(it)if(Je)i.texStorage2D(s.TEXTURE_2D,Ae,Ne,pe.width,pe.height);else{let ge=pe.width,we=pe.height;for(let Be=0;Be<Ae;Be++)i.texImage2D(s.TEXTURE_2D,Be,Ne,ge,we,0,Re,ze,null),ge>>=1,we>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){const ge=s.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),pe.parentNode!==ge){ge.appendChild(pe),v.add(E),ge.onpaint=we=>{const Be=we.changedElements;for(const ye of v)Be.includes(ye.image)&&(ye.needsUpdate=!0)},ge.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,pe);else{const Be=s.RGBA,ye=s.RGBA,qe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Be,ye,qe,pe)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ke.length>0){if(Je&&it){const ge=wt(Ke[0]);i.texStorage2D(s.TEXTURE_2D,Ae,Ne,ge.width,ge.height)}for(let ge=0,we=Ke.length;ge<we;ge++)Ue=Ke[ge],Je?W&&i.texSubImage2D(s.TEXTURE_2D,ge,0,0,Re,ze,Ue):i.texImage2D(s.TEXTURE_2D,ge,Ne,Re,ze,Ue);E.generateMipmaps=!1}else if(Je){if(it){const ge=wt(pe);i.texStorage2D(s.TEXTURE_2D,Ae,Ne,ge.width,ge.height)}W&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Re,ze,pe)}else i.texImage2D(s.TEXTURE_2D,0,Ne,Re,ze,pe);S(E)&&L(se),De.__version=Te.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function tt(P,E,J){if(E.image.length!==6)return;const se=re(P,E),de=E.source;i.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+J);const Te=r.get(de);if(de.version!==Te.__version||se===!0){i.activeTexture(s.TEXTURE0+J);const De=Mt.getPrimaries(Mt.workingColorSpace),he=E.colorSpace===mr?null:Mt.getPrimaries(E.colorSpace),pe=E.colorSpace===mr||De===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;i.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Re=E.isCompressedTexture||E.image[0].isCompressedTexture,ze=E.image[0]&&E.image[0].isDataTexture,Ne=[];for(let ye=0;ye<6;ye++)!Re&&!ze?Ne[ye]=x(E.image[ye],!0,l.maxCubemapSize):Ne[ye]=ze?E.image[ye].image:E.image[ye],Ne[ye]=Ft(E,Ne[ye]);const Ue=Ne[0],Ke=u.convert(E.format,E.colorSpace),Je=u.convert(E.type),it=C(E.internalFormat,Ke,Je,E.normalized,E.colorSpace),W=E.isVideoTexture!==!0,Ae=Te.__version===void 0||se===!0,ge=de.dataReady;let we=U(E,Ue);Ie(s.TEXTURE_CUBE_MAP,E);let Be;if(Re){W&&Ae&&i.texStorage2D(s.TEXTURE_CUBE_MAP,we,it,Ue.width,Ue.height);for(let ye=0;ye<6;ye++){Be=Ne[ye].mipmaps;for(let qe=0;qe<Be.length;qe++){const Ve=Be[qe];E.format!==zi?Ke!==null?W?ge&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe,0,0,Ve.width,Ve.height,Ke,Ve.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe,it,Ve.width,Ve.height,0,Ve.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?ge&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe,0,0,Ve.width,Ve.height,Ke,Je,Ve.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe,it,Ve.width,Ve.height,0,Ke,Je,Ve.data)}}}else{if(Be=E.mipmaps,W&&Ae){Be.length>0&&we++;const ye=wt(Ne[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,we,it,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(ze){W?ge&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Ne[ye].width,Ne[ye].height,Ke,Je,Ne[ye].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,it,Ne[ye].width,Ne[ye].height,0,Ke,Je,Ne[ye].data);for(let qe=0;qe<Be.length;qe++){const Qt=Be[qe].image[ye].image;W?ge&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe+1,0,0,Qt.width,Qt.height,Ke,Je,Qt.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe+1,it,Qt.width,Qt.height,0,Ke,Je,Qt.data)}}else{W?ge&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Ke,Je,Ne[ye]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,it,Ke,Je,Ne[ye]);for(let qe=0;qe<Be.length;qe++){const Ve=Be[qe];W?ge&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe+1,0,0,Ke,Je,Ve.image[ye]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,qe+1,it,Ke,Je,Ve.image[ye])}}}S(E)&&L(s.TEXTURE_CUBE_MAP),Te.__version=de.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Qe(P,E,J,se,de,Te){const De=u.convert(J.format,J.colorSpace),he=u.convert(J.type),pe=C(J.internalFormat,De,he,J.normalized,J.colorSpace),Re=r.get(E),ze=r.get(J);if(ze.__renderTarget=E,!Re.__hasExternalTextures){const Ne=Math.max(1,E.width>>Te),Ue=Math.max(1,E.height>>Te);de===s.TEXTURE_3D||de===s.TEXTURE_2D_ARRAY?i.texImage3D(de,Te,pe,Ne,Ue,E.depth,0,De,he,null):i.texImage2D(de,Te,pe,Ne,Ue,0,De,he,null)}i.bindFramebuffer(s.FRAMEBUFFER,P),ln(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,de,ze.__webglTexture,0,qt(E)):(de===s.TEXTURE_2D||de>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,de,ze.__webglTexture,Te),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Yt(P,E,J){if(s.bindRenderbuffer(s.RENDERBUFFER,P),E.depthBuffer){const se=E.depthTexture,de=se&&se.isDepthTexture?se.type:null,Te=N(E.stencilBuffer,de),De=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ln(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qt(E),Te,E.width,E.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,qt(E),Te,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Te,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,De,s.RENDERBUFFER,P)}else{const se=E.textures;for(let de=0;de<se.length;de++){const Te=se[de],De=u.convert(Te.format,Te.colorSpace),he=u.convert(Te.type),pe=C(Te.internalFormat,De,he,Te.normalized,Te.colorSpace);ln(E)?p.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qt(E),pe,E.width,E.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,qt(E),pe,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,pe,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ft(P,E,J){const se=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(s.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const de=r.get(E.depthTexture);if(de.__renderTarget=E,(!de.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),se){if(de.__webglInit===void 0&&(de.__webglInit=!0,E.depthTexture.addEventListener("dispose",O)),de.__webglTexture===void 0){de.__webglTexture=s.createTexture(),i.bindTexture(s.TEXTURE_CUBE_MAP,de.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,E.depthTexture);const Re=u.convert(E.depthTexture.format),ze=u.convert(E.depthTexture.type);let Ne;E.depthTexture.format===Na?Ne=s.DEPTH_COMPONENT24:E.depthTexture.format===Qr&&(Ne=s.DEPTH24_STENCIL8);for(let Ue=0;Ue<6;Ue++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ue,0,Ne,E.width,E.height,0,Re,ze,null)}}else ne(E.depthTexture,0);const Te=de.__webglTexture,De=qt(E),he=se?s.TEXTURE_CUBE_MAP_POSITIVE_X+J:s.TEXTURE_2D,pe=E.depthTexture.format===Qr?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===Na)ln(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,he,Te,0,De):s.framebufferTexture2D(s.FRAMEBUFFER,pe,he,Te,0);else if(E.depthTexture.format===Qr)ln(E)?p.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,he,Te,0,De):s.framebufferTexture2D(s.FRAMEBUFFER,pe,he,Te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function xt(P){const E=r.get(P),J=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const se=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),se){const de=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,se.removeEventListener("dispose",de)};se.addEventListener("dispose",de),E.__depthDisposeCallback=de}E.__boundDepthTexture=se}if(P.depthTexture&&!E.__autoAllocateDepthBuffer)if(J)for(let se=0;se<6;se++)ft(E.__webglFramebuffer[se],P,se);else{const se=P.texture.mipmaps;se&&se.length>0?ft(E.__webglFramebuffer[0],P,0):ft(E.__webglFramebuffer,P,0)}else if(J){E.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[se]),E.__webglDepthbuffer[se]===void 0)E.__webglDepthbuffer[se]=s.createRenderbuffer(),Yt(E.__webglDepthbuffer[se],P,!1);else{const de=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Te=E.__webglDepthbuffer[se];s.bindRenderbuffer(s.RENDERBUFFER,Te),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,Te)}}else{const se=P.texture.mipmaps;if(se&&se.length>0?i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Yt(E.__webglDepthbuffer,P,!1);else{const de=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Te=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Te),s.framebufferRenderbuffer(s.FRAMEBUFFER,de,s.RENDERBUFFER,Te)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function St(P,E,J){const se=r.get(P);E!==void 0&&Qe(se.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),J!==void 0&&xt(P)}function ht(P){const E=P.texture,J=r.get(P),se=r.get(E);P.addEventListener("dispose",b);const de=P.textures,Te=P.isWebGLCubeRenderTarget===!0,De=de.length>1;if(De||(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=E.version,f.memory.textures++),Te){J.__webglFramebuffer=[];for(let he=0;he<6;he++)if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[he]=[];for(let pe=0;pe<E.mipmaps.length;pe++)J.__webglFramebuffer[he][pe]=s.createFramebuffer()}else J.__webglFramebuffer[he]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let he=0;he<E.mipmaps.length;he++)J.__webglFramebuffer[he]=s.createFramebuffer()}else J.__webglFramebuffer=s.createFramebuffer();if(De)for(let he=0,pe=de.length;he<pe;he++){const Re=r.get(de[he]);Re.__webglTexture===void 0&&(Re.__webglTexture=s.createTexture(),f.memory.textures++)}if(P.samples>0&&ln(P)===!1){J.__webglMultisampledFramebuffer=s.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let he=0;he<de.length;he++){const pe=de[he];J.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,J.__webglColorRenderbuffer[he]);const Re=u.convert(pe.format,pe.colorSpace),ze=u.convert(pe.type),Ne=C(pe.internalFormat,Re,ze,pe.normalized,pe.colorSpace,P.isXRRenderTarget===!0),Ue=qt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ue,Ne,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,J.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(J.__webglDepthRenderbuffer=s.createRenderbuffer(),Yt(J.__webglDepthRenderbuffer,P,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Te){i.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,E);for(let he=0;he<6;he++)if(E.mipmaps&&E.mipmaps.length>0)for(let pe=0;pe<E.mipmaps.length;pe++)Qe(J.__webglFramebuffer[he][pe],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,pe);else Qe(J.__webglFramebuffer[he],P,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);S(E)&&L(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(De){for(let he=0,pe=de.length;he<pe;he++){const Re=de[he],ze=r.get(Re);let Ne=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ne=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Ne,ze.__webglTexture),Ie(Ne,Re),Qe(J.__webglFramebuffer,P,Re,s.COLOR_ATTACHMENT0+he,Ne,0),S(Re)&&L(Ne)}i.unbindTexture()}else{let he=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(he=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(he,se.__webglTexture),Ie(he,E),E.mipmaps&&E.mipmaps.length>0)for(let pe=0;pe<E.mipmaps.length;pe++)Qe(J.__webglFramebuffer[pe],P,E,s.COLOR_ATTACHMENT0,he,pe);else Qe(J.__webglFramebuffer,P,E,s.COLOR_ATTACHMENT0,he,0);S(E)&&L(he),i.unbindTexture()}P.depthBuffer&&xt(P)}function rn(P){const E=P.textures;for(let J=0,se=E.length;J<se;J++){const de=E[J];if(S(de)){const Te=I(P),De=r.get(de).__webglTexture;i.bindTexture(Te,De),L(Te),i.unbindTexture()}}}const sn=[],on=[];function hn(P){if(P.samples>0){if(ln(P)===!1){const E=P.textures,J=P.width,se=P.height;let de=s.COLOR_BUFFER_BIT;const Te=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,De=r.get(P),he=E.length>1;if(he)for(let Re=0;Re<E.length;Re++)i.bindFramebuffer(s.FRAMEBUFFER,De.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,De.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const pe=P.texture.mipmaps;pe&&pe.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Re=0;Re<E.length;Re++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(de|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(de|=s.STENCIL_BUFFER_BIT)),he){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,De.__webglColorRenderbuffer[Re]);const ze=r.get(E[Re]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ze,0)}s.blitFramebuffer(0,0,J,se,0,0,J,se,de,s.NEAREST),m===!0&&(sn.length=0,on.length=0,sn.push(s.COLOR_ATTACHMENT0+Re),P.depthBuffer&&P.resolveDepthBuffer===!1&&(sn.push(Te),on.push(Te),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,on)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,sn))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let Re=0;Re<E.length;Re++){i.bindFramebuffer(s.FRAMEBUFFER,De.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,De.__webglColorRenderbuffer[Re]);const ze=r.get(E[Re]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,De.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,ze,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&m){const E=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function qt(P){return Math.min(l.maxSamples,P.samples)}function ln(P){const E=r.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Z(P){const E=f.render.frame;_.get(P)!==E&&(_.set(P,E),P.update())}function Ft(P,E){const J=P.colorSpace,se=P.format,de=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||J!==Ec&&J!==mr&&(Mt.getTransfer(J)===zt?(se!==zi||de!==pi)&&nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):bt("WebGLTextures: Unsupported texture color space:",J)),E}function wt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(d.width=P.naturalWidth||P.width,d.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(d.width=P.displayWidth,d.height=P.displayHeight):(d.width=P.width,d.height=P.height),d}this.allocateTextureUnit=z,this.resetTextureUnits=$,this.getTextureUnits=ue,this.setTextureUnits=Y,this.setTexture2D=ne,this.setTexture2DArray=_e,this.setTexture3D=be,this.setTextureCube=B,this.rebindTextures=St,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=rn,this.updateMultisampleRenderTarget=hn,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=ln,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function f3(s,e){function i(r,l=mr){let u;const f=Mt.getTransfer(l);if(r===pi)return s.UNSIGNED_BYTE;if(r===Fp)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Hp)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Ox)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Px)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===Lx)return s.BYTE;if(r===Nx)return s.SHORT;if(r===Sl)return s.UNSIGNED_SHORT;if(r===zp)return s.INT;if(r===na)return s.UNSIGNED_INT;if(r===Ji)return s.FLOAT;if(r===La)return s.HALF_FLOAT;if(r===Ix)return s.ALPHA;if(r===Bx)return s.RGB;if(r===zi)return s.RGBA;if(r===Na)return s.DEPTH_COMPONENT;if(r===Qr)return s.DEPTH_STENCIL;if(r===zx)return s.RED;if(r===Gp)return s.RED_INTEGER;if(r===jr)return s.RG;if(r===Vp)return s.RG_INTEGER;if(r===kp)return s.RGBA_INTEGER;if(r===pc||r===mc||r===gc||r===_c)if(f===zt)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===pc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===mc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===gc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===_c)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===pc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===mc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===gc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===_c)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Wd||r===qd||r===Yd||r===Zd)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===Wd)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===qd)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Yd)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Zd)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Kd||r===Qd||r===Jd||r===jd||r===$d||r===yc||r===ep)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(r===Kd||r===Qd)return f===zt?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===Jd)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC;if(r===jd)return u.COMPRESSED_R11_EAC;if(r===$d)return u.COMPRESSED_SIGNED_R11_EAC;if(r===yc)return u.COMPRESSED_RG11_EAC;if(r===ep)return u.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===tp||r===np||r===ip||r===ap||r===rp||r===sp||r===op||r===lp||r===up||r===cp||r===fp||r===hp||r===dp||r===pp)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(r===tp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===np)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ip)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ap)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===rp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===sp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===op)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===lp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===up)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===cp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===fp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===hp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===dp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===pp)return f===zt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===mp||r===gp||r===_p)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(r===mp)return f===zt?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===gp)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===_p)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===vp||r===xp||r===Mc||r===Sp)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(r===vp)return u.COMPRESSED_RED_RGTC1_EXT;if(r===xp)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Mc)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Sp)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===yl?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const h3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d3=`
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

}`;class p3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const r=new Qx(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,r=new ia({vertexShader:h3,fragmentShader:d3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ct(new Oc(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m3 extends $r{constructor(e,i){super();const r=this;let l=null,u=1,f=null,p="local-floor",m=1,d=null,_=null,v=null,g=null,M=null,T=null;const A=typeof XRWebGLBinding<"u",x=new p3,S={},L=i.getContextAttributes();let I=null,C=null;const N=[],U=[],O=new st;let b=null;const D=new Ti;D.viewport=new tn;const H=new Ti;H.viewport=new tn;const F=[D,H],k=new bT;let $=null,ue=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let Se=N[re];return Se===void 0&&(Se=new sd,N[re]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(re){let Se=N[re];return Se===void 0&&(Se=new sd,N[re]=Se),Se.getGripSpace()},this.getHand=function(re){let Se=N[re];return Se===void 0&&(Se=new sd,N[re]=Se),Se.getHandSpace()};function Y(re){const Se=U.indexOf(re.inputSource);if(Se===-1)return;const Me=N[Se];Me!==void 0&&(Me.update(re.inputSource,re.frame,d||f),Me.dispatchEvent({type:re.type,data:re.inputSource}))}function z(){l.removeEventListener("select",Y),l.removeEventListener("selectstart",Y),l.removeEventListener("selectend",Y),l.removeEventListener("squeeze",Y),l.removeEventListener("squeezestart",Y),l.removeEventListener("squeezeend",Y),l.removeEventListener("end",z),l.removeEventListener("inputsourceschange",V);for(let re=0;re<N.length;re++){const Se=U[re];Se!==null&&(U[re]=null,N[re].disconnect(Se))}$=null,ue=null,x.reset();for(const re in S)delete S[re];e.setRenderTarget(I),M=null,g=null,v=null,l=null,C=null,Ie.stop(),r.isPresenting=!1,e.setPixelRatio(b),e.setSize(O.width,O.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){u=re,r.isPresenting===!0&&nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){p=re,r.isPresenting===!0&&nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(re){d=re},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return v===null&&A&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(re){if(l=re,l!==null){if(I=e.getRenderTarget(),l.addEventListener("select",Y),l.addEventListener("selectstart",Y),l.addEventListener("selectend",Y),l.addEventListener("squeeze",Y),l.addEventListener("squeezestart",Y),l.addEventListener("squeezeend",Y),l.addEventListener("end",z),l.addEventListener("inputsourceschange",V),L.xrCompatible!==!0&&await i.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(O),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,He=null,tt=null;L.depth&&(tt=L.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Me=L.stencil?Qr:Na,He=L.stencil?yl:na);const Qe={colorFormat:i.RGBA8,depthFormat:tt,scaleFactor:u};v=this.getBinding(),g=v.createProjectionLayer(Qe),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),C=new ea(g.textureWidth,g.textureHeight,{format:zi,type:pi,depthTexture:new no(g.textureWidth,g.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:L.stencil,colorSpace:e.outputColorSpace,samples:L.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Me={antialias:L.antialias,alpha:!0,depth:L.depth,stencil:L.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,Me),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),C=new ea(M.framebufferWidth,M.framebufferHeight,{format:zi,type:pi,colorSpace:e.outputColorSpace,stencilBuffer:L.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),Ie.setContext(l),Ie.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function V(re){for(let Se=0;Se<re.removed.length;Se++){const Me=re.removed[Se],He=U.indexOf(Me);He>=0&&(U[He]=null,N[He].disconnect(Me))}for(let Se=0;Se<re.added.length;Se++){const Me=re.added[Se];let He=U.indexOf(Me);if(He===-1){for(let Qe=0;Qe<N.length;Qe++)if(Qe>=U.length){U.push(Me),He=Qe;break}else if(U[Qe]===null){U[Qe]=Me,He=Qe;break}if(He===-1)break}const tt=N[He];tt&&tt.connect(Me)}}const ne=new j,_e=new j;function be(re,Se,Me){ne.setFromMatrixPosition(Se.matrixWorld),_e.setFromMatrixPosition(Me.matrixWorld);const He=ne.distanceTo(_e),tt=Se.projectionMatrix.elements,Qe=Me.projectionMatrix.elements,Yt=tt[14]/(tt[10]-1),ft=tt[14]/(tt[10]+1),xt=(tt[9]+1)/tt[5],St=(tt[9]-1)/tt[5],ht=(tt[8]-1)/tt[0],rn=(Qe[8]+1)/Qe[0],sn=Yt*ht,on=Yt*rn,hn=He/(-ht+rn),qt=hn*-ht;if(Se.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(qt),re.translateZ(hn),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),tt[10]===-1)re.projectionMatrix.copy(Se.projectionMatrix),re.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{const ln=Yt+hn,Z=ft+hn,Ft=sn-qt,wt=on+(He-qt),P=xt*ft/Z*ln,E=St*ft/Z*ln;re.projectionMatrix.makePerspective(Ft,wt,P,E,ln,Z),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function B(re,Se){Se===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(Se.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(l===null)return;let Se=re.near,Me=re.far;x.texture!==null&&(x.depthNear>0&&(Se=x.depthNear),x.depthFar>0&&(Me=x.depthFar)),k.near=H.near=D.near=Se,k.far=H.far=D.far=Me,($!==k.near||ue!==k.far)&&(l.updateRenderState({depthNear:k.near,depthFar:k.far}),$=k.near,ue=k.far),k.layers.mask=re.layers.mask|6,D.layers.mask=k.layers.mask&-5,H.layers.mask=k.layers.mask&-3;const He=re.parent,tt=k.cameras;B(k,He);for(let Qe=0;Qe<tt.length;Qe++)B(tt[Qe],He);tt.length===2?be(k,D,H):k.projectionMatrix.copy(D.projectionMatrix),Q(re,k,He)};function Q(re,Se,Me){Me===null?re.matrix.copy(Se.matrixWorld):(re.matrix.copy(Me.matrixWorld),re.matrix.invert(),re.matrix.multiply(Se.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(Se.projectionMatrix),re.projectionMatrixInverse.copy(Se.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Ep*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(g===null&&M===null))return m},this.setFoveation=function(re){m=re,g!==null&&(g.fixedFoveation=re),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=re)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(k)},this.getCameraTexture=function(re){return S[re]};let Ee=null;function Ce(re,Se){if(_=Se.getViewerPose(d||f),T=Se,_!==null){const Me=_.views;M!==null&&(e.setRenderTargetFramebuffer(C,M.framebuffer),e.setRenderTarget(C));let He=!1;Me.length!==k.cameras.length&&(k.cameras.length=0,He=!0);for(let ft=0;ft<Me.length;ft++){const xt=Me[ft];let St=null;if(M!==null)St=M.getViewport(xt);else{const rn=v.getViewSubImage(g,xt);St=rn.viewport,ft===0&&(e.setRenderTargetTextures(C,rn.colorTexture,rn.depthStencilTexture),e.setRenderTarget(C))}let ht=F[ft];ht===void 0&&(ht=new Ti,ht.layers.enable(ft),ht.viewport=new tn,F[ft]=ht),ht.matrix.fromArray(xt.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(xt.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set(St.x,St.y,St.width,St.height),ft===0&&(k.matrix.copy(ht.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),He===!0&&k.cameras.push(ht)}const tt=l.enabledFeatures;if(tt&&tt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&A){v=r.getBinding();const ft=v.getDepthInformation(Me[0]);ft&&ft.isValid&&ft.texture&&x.init(ft,l.renderState)}if(tt&&tt.includes("camera-access")&&A){e.state.unbindTexture(),v=r.getBinding();for(let ft=0;ft<Me.length;ft++){const xt=Me[ft].camera;if(xt){let St=S[xt];St||(St=new Qx,S[xt]=St);const ht=v.getCameraImage(xt);St.sourceTexture=ht}}}}for(let Me=0;Me<N.length;Me++){const He=U[Me],tt=N[Me];He!==null&&tt!==void 0&&tt.update(He,Se,d||f)}Ee&&Ee(re,Se),Se.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:Se}),T=null}const Ie=new $x;Ie.setAnimationLoop(Ce),this.setAnimationLoop=function(re){Ee=re},this.dispose=function(){}}}const g3=new an,sS=new rt;sS.set(-1,0,0,0,1,0,0,0,1);function _3(s,e){function i(x,S){x.matrixAutoUpdate===!0&&x.updateMatrix(),S.value.copy(x.matrix)}function r(x,S){S.color.getRGB(x.fogColor.value,Jx(s)),S.isFog?(x.fogNear.value=S.near,x.fogFar.value=S.far):S.isFogExp2&&(x.fogDensity.value=S.density)}function l(x,S,L,I,C){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?u(x,S):S.isMeshLambertMaterial?(u(x,S),S.envMap&&(x.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(u(x,S),v(x,S)):S.isMeshPhongMaterial?(u(x,S),_(x,S),S.envMap&&(x.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(u(x,S),g(x,S),S.isMeshPhysicalMaterial&&M(x,S,C)):S.isMeshMatcapMaterial?(u(x,S),T(x,S)):S.isMeshDepthMaterial?u(x,S):S.isMeshDistanceMaterial?(u(x,S),A(x,S)):S.isMeshNormalMaterial?u(x,S):S.isLineBasicMaterial?(f(x,S),S.isLineDashedMaterial&&p(x,S)):S.isPointsMaterial?m(x,S,L,I):S.isSpriteMaterial?d(x,S):S.isShadowMaterial?(x.color.value.copy(S.color),x.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function u(x,S){x.opacity.value=S.opacity,S.color&&x.diffuse.value.copy(S.color),S.emissive&&x.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(x.map.value=S.map,i(S.map,x.mapTransform)),S.alphaMap&&(x.alphaMap.value=S.alphaMap,i(S.alphaMap,x.alphaMapTransform)),S.bumpMap&&(x.bumpMap.value=S.bumpMap,i(S.bumpMap,x.bumpMapTransform),x.bumpScale.value=S.bumpScale,S.side===$n&&(x.bumpScale.value*=-1)),S.normalMap&&(x.normalMap.value=S.normalMap,i(S.normalMap,x.normalMapTransform),x.normalScale.value.copy(S.normalScale),S.side===$n&&x.normalScale.value.negate()),S.displacementMap&&(x.displacementMap.value=S.displacementMap,i(S.displacementMap,x.displacementMapTransform),x.displacementScale.value=S.displacementScale,x.displacementBias.value=S.displacementBias),S.emissiveMap&&(x.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,x.emissiveMapTransform)),S.specularMap&&(x.specularMap.value=S.specularMap,i(S.specularMap,x.specularMapTransform)),S.alphaTest>0&&(x.alphaTest.value=S.alphaTest);const L=e.get(S),I=L.envMap,C=L.envMapRotation;I&&(x.envMap.value=I,x.envMapRotation.value.setFromMatrix4(g3.makeRotationFromEuler(C)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(sS),x.reflectivity.value=S.reflectivity,x.ior.value=S.ior,x.refractionRatio.value=S.refractionRatio),S.lightMap&&(x.lightMap.value=S.lightMap,x.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,x.lightMapTransform)),S.aoMap&&(x.aoMap.value=S.aoMap,x.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,x.aoMapTransform))}function f(x,S){x.diffuse.value.copy(S.color),x.opacity.value=S.opacity,S.map&&(x.map.value=S.map,i(S.map,x.mapTransform))}function p(x,S){x.dashSize.value=S.dashSize,x.totalSize.value=S.dashSize+S.gapSize,x.scale.value=S.scale}function m(x,S,L,I){x.diffuse.value.copy(S.color),x.opacity.value=S.opacity,x.size.value=S.size*L,x.scale.value=I*.5,S.map&&(x.map.value=S.map,i(S.map,x.uvTransform)),S.alphaMap&&(x.alphaMap.value=S.alphaMap,i(S.alphaMap,x.alphaMapTransform)),S.alphaTest>0&&(x.alphaTest.value=S.alphaTest)}function d(x,S){x.diffuse.value.copy(S.color),x.opacity.value=S.opacity,x.rotation.value=S.rotation,S.map&&(x.map.value=S.map,i(S.map,x.mapTransform)),S.alphaMap&&(x.alphaMap.value=S.alphaMap,i(S.alphaMap,x.alphaMapTransform)),S.alphaTest>0&&(x.alphaTest.value=S.alphaTest)}function _(x,S){x.specular.value.copy(S.specular),x.shininess.value=Math.max(S.shininess,1e-4)}function v(x,S){S.gradientMap&&(x.gradientMap.value=S.gradientMap)}function g(x,S){x.metalness.value=S.metalness,S.metalnessMap&&(x.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,x.metalnessMapTransform)),x.roughness.value=S.roughness,S.roughnessMap&&(x.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,x.roughnessMapTransform)),S.envMap&&(x.envMapIntensity.value=S.envMapIntensity)}function M(x,S,L){x.ior.value=S.ior,S.sheen>0&&(x.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),x.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(x.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,x.sheenColorMapTransform)),S.sheenRoughnessMap&&(x.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,x.sheenRoughnessMapTransform))),S.clearcoat>0&&(x.clearcoat.value=S.clearcoat,x.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(x.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,x.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(x.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===$n&&x.clearcoatNormalScale.value.negate())),S.dispersion>0&&(x.dispersion.value=S.dispersion),S.iridescence>0&&(x.iridescence.value=S.iridescence,x.iridescenceIOR.value=S.iridescenceIOR,x.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(x.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,x.iridescenceMapTransform)),S.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),S.transmission>0&&(x.transmission.value=S.transmission,x.transmissionSamplerMap.value=L.texture,x.transmissionSamplerSize.value.set(L.width,L.height),S.transmissionMap&&(x.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,x.transmissionMapTransform)),x.thickness.value=S.thickness,S.thicknessMap&&(x.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=S.attenuationDistance,x.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(x.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(x.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=S.specularIntensity,x.specularColor.value.copy(S.specularColor),S.specularColorMap&&(x.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,x.specularColorMapTransform)),S.specularIntensityMap&&(x.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,x.specularIntensityMapTransform))}function T(x,S){S.matcap&&(x.matcap.value=S.matcap)}function A(x,S){const L=e.get(S).light;x.referencePosition.value.setFromMatrixPosition(L.matrixWorld),x.nearDistance.value=L.shadow.camera.near,x.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function v3(s,e,i,r){let l={},u={},f=[];const p=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,N){const U=N.program;r.uniformBlockBinding(C,U)}function d(C,N){let U=l[C.id];U===void 0&&(x(C),U=_(C),l[C.id]=U,C.addEventListener("dispose",L));const O=N.program;r.updateUBOMapping(C,O);const b=e.render.frame;u[C.id]!==b&&(g(C),u[C.id]=b)}function _(C){const N=v();C.__bindingPointIndex=N;const U=s.createBuffer(),O=C.__size,b=C.usage;return s.bindBuffer(s.UNIFORM_BUFFER,U),s.bufferData(s.UNIFORM_BUFFER,O,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,N,U),U}function v(){for(let C=0;C<p;C++)if(f.indexOf(C)===-1)return f.push(C),C;return bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const N=l[C.id],U=C.uniforms,O=C.__cache;s.bindBuffer(s.UNIFORM_BUFFER,N);for(let b=0,D=U.length;b<D;b++){const H=U[b];if(Array.isArray(H))for(let F=0,k=H.length;F<k;F++)M(H[F],b,F,O);else M(H,b,0,O)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(C,N,U,O){if(A(C,N,U,O)===!0){const b=C.__offset,D=C.value;if(Array.isArray(D)){let H=0;for(let F=0;F<D.length;F++){const k=D[F],$=S(k);T(k,C.__data,H),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(H+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(D,C.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,C.__data)}}function T(C,N,U){typeof C=="number"||typeof C=="boolean"?N[0]=C:C.isMatrix3?(N[0]=C.elements[0],N[1]=C.elements[1],N[2]=C.elements[2],N[3]=0,N[4]=C.elements[3],N[5]=C.elements[4],N[6]=C.elements[5],N[7]=0,N[8]=C.elements[6],N[9]=C.elements[7],N[10]=C.elements[8],N[11]=0):ArrayBuffer.isView(C)?N.set(new C.constructor(C.buffer,C.byteOffset,N.length)):C.toArray(N,U)}function A(C,N,U,O){const b=C.value,D=N+"_"+U;if(O[D]===void 0)return typeof b=="number"||typeof b=="boolean"?O[D]=b:ArrayBuffer.isView(b)?O[D]=b.slice():O[D]=b.clone(),!0;{const H=O[D];if(typeof b=="number"||typeof b=="boolean"){if(H!==b)return O[D]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(H.equals(b)===!1)return H.copy(b),!0}}return!1}function x(C){const N=C.uniforms;let U=0;const O=16;for(let D=0,H=N.length;D<H;D++){const F=Array.isArray(N[D])?N[D]:[N[D]];for(let k=0,$=F.length;k<$;k++){const ue=F[k],Y=Array.isArray(ue.value)?ue.value:[ue.value];for(let z=0,V=Y.length;z<V;z++){const ne=Y[z],_e=S(ne),be=U%O,B=be%_e.boundary,Q=be+B;U+=B,Q!==0&&O-Q<_e.storage&&(U+=O-Q),ue.__data=new Float32Array(_e.storage/Float32Array.BYTES_PER_ELEMENT),ue.__offset=U,U+=_e.storage}}}const b=U%O;return b>0&&(U+=O-b),C.__size=U,C.__cache={},this}function S(C){const N={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(N.boundary=4,N.storage=4):C.isVector2?(N.boundary=8,N.storage=8):C.isVector3||C.isColor?(N.boundary=16,N.storage=12):C.isVector4?(N.boundary=16,N.storage=16):C.isMatrix3?(N.boundary=48,N.storage=48):C.isMatrix4?(N.boundary=64,N.storage=64):C.isTexture?nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(N.boundary=16,N.storage=C.byteLength):nt("WebGLRenderer: Unsupported uniform value type.",C),N}function L(C){const N=C.target;N.removeEventListener("dispose",L);const U=f.indexOf(N.__bindingPointIndex);f.splice(U,1),s.deleteBuffer(l[N.id]),delete l[N.id],delete u[N.id]}function I(){for(const C in l)s.deleteBuffer(l[C]);f=[],l={},u={}}return{bind:m,update:d,dispose:I}}const x3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zi=null;function S3(){return Zi===null&&(Zi=new aT(x3,16,16,jr,La),Zi.name="DFG_LUT",Zi.minFilter=Hn,Zi.magFilter=Hn,Zi.wrapS=Ca,Zi.wrapT=Ca,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}class y3{constructor(e={}){const{canvas:i=Nb(),context:r=null,depth:l=!0,stencil:u=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:M=pi}=e;this.isWebGLRenderer=!0;let T;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=r.getContextAttributes().alpha}else T=f;const A=M,x=new Set([kp,Vp,Gp]),S=new Set([pi,na,Sl,yl,Fp,Hp]),L=new Uint32Array(4),I=new Int32Array(4),C=new j;let N=null,U=null;const O=[],b=[];let D=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const H=this;let F=!1,k=null,$=null,ue=null,Y=null;this._outputColorSpace=di;let z=0,V=0,ne=null,_e=-1,be=null;const B=new tn,Q=new tn;let Ee=null;const Ce=new gt(0);let Ie=0,re=i.width,Se=i.height,Me=1,He=null,tt=null;const Qe=new tn(0,0,re,Se),Yt=new tn(0,0,re,Se);let ft=!1;const xt=new Kp;let St=!1,ht=!1;const rn=new an,sn=new j,on=new tn,hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function ln(){return ne===null?Me:1}let Z=r;function Ft(R,q){return i.getContext(R,q)}try{const R={alpha:!0,depth:l,stencil:u,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Bp}`),i.addEventListener("webglcontextlost",Qt,!1),i.addEventListener("webglcontextrestored",Lt,!1),i.addEventListener("webglcontextcreationerror",ei,!1),Z===null){const q="webgl2";if(Z=Ft(q,R),Z===null)throw Ft(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw bt("WebGLRenderer: "+R.message),R}let wt,P,E,J,se,de,Te,De,he,pe,Re,ze,Ne,Ue,Ke,Je,it,W,Ae,ge,we,Be,ye;function qe(){wt=new SR(Z),wt.init(),we=new f3(Z,wt),P=new hR(Z,wt,e,we),E=new u3(Z,wt),P.reversedDepthBuffer&&g&&E.buffers.depth.setReversed(!0),$=Z.createFramebuffer(),ue=Z.createFramebuffer(),Y=Z.createFramebuffer(),J=new ER(Z),se=new KC,de=new c3(Z,wt,E,se,P,we,J),Te=new xR(H),De=new RT(Z),Be=new cR(Z,De),he=new yR(Z,De,J,Be),pe=new TR(Z,he,De,Be,J),W=new bR(Z,P,de),Ke=new dR(se),Re=new ZC(H,Te,wt,P,Be,Ke),ze=new _3(H,se),Ne=new JC,Ue=new i3(wt),it=new uR(H,Te,E,pe,T,m),Je=new l3(H,pe,P),ye=new v3(Z,J,P,E),Ae=new fR(Z,wt,J),ge=new MR(Z,wt,J),J.programs=Re.programs,H.capabilities=P,H.extensions=wt,H.properties=se,H.renderLists=Ne,H.shadowMap=Je,H.state=E,H.info=J}qe(),A!==pi&&(D=new RR(A,i.width,i.height,p,l,u));const Ve=new m3(H,Z);this.xr=Ve,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const R=wt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=wt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(R){R!==void 0&&(Me=R,this.setSize(re,Se,!1))},this.getSize=function(R){return R.set(re,Se)},this.setSize=function(R,q,oe=!0){if(Ve.isPresenting){nt("WebGLRenderer: Can't change size while VR device is presenting.");return}re=R,Se=q,i.width=Math.floor(R*Me),i.height=Math.floor(q*Me),oe===!0&&(i.style.width=R+"px",i.style.height=q+"px"),D!==null&&D.setSize(i.width,i.height),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(re*Me,Se*Me).floor()},this.setDrawingBufferSize=function(R,q,oe){re=R,Se=q,Me=oe,i.width=Math.floor(R*oe),i.height=Math.floor(q*oe),this.setViewport(0,0,R,q)},this.setEffects=function(R){if(A===pi){bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let q=0;q<R.length;q++)if(R[q].isOutputPass===!0){nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(B)},this.getViewport=function(R){return R.copy(Qe)},this.setViewport=function(R,q,oe,ie){R.isVector4?Qe.set(R.x,R.y,R.z,R.w):Qe.set(R,q,oe,ie),E.viewport(B.copy(Qe).multiplyScalar(Me).round())},this.getScissor=function(R){return R.copy(Yt)},this.setScissor=function(R,q,oe,ie){R.isVector4?Yt.set(R.x,R.y,R.z,R.w):Yt.set(R,q,oe,ie),E.scissor(Q.copy(Yt).multiplyScalar(Me).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(R){E.setScissorTest(ft=R)},this.setOpaqueSort=function(R){He=R},this.setTransparentSort=function(R){tt=R},this.getClearColor=function(R){return R.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,oe=!0){let ie=0;if(R){let ae=!1;if(ne!==null){const Oe=ne.texture.format;ae=x.has(Oe)}if(ae){const Oe=ne.texture.type,Ge=S.has(Oe),Le=it.getClearColor(),Xe=it.getClearAlpha(),ke=Le.r,je=Le.g,ot=Le.b;Ge?(L[0]=ke,L[1]=je,L[2]=ot,L[3]=Xe,Z.clearBufferuiv(Z.COLOR,0,L)):(I[0]=ke,I[1]=je,I[2]=ot,I[3]=Xe,Z.clearBufferiv(Z.COLOR,0,I))}else ie|=Z.COLOR_BUFFER_BIT}q&&(ie|=Z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),oe&&(ie|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie!==0&&Z.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),k=R},this.dispose=function(){i.removeEventListener("webglcontextlost",Qt,!1),i.removeEventListener("webglcontextrestored",Lt,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),it.dispose(),Ne.dispose(),Ue.dispose(),se.dispose(),Te.dispose(),pe.dispose(),Be.dispose(),ye.dispose(),Re.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",mn),Ve.removeEventListener("sessionend",Dn),qn.stop()};function Qt(R){R.preventDefault(),Ac("WebGLRenderer: Context Lost."),F=!0}function Lt(){Ac("WebGLRenderer: Context Restored."),F=!1;const R=J.autoReset,q=Je.enabled,oe=Je.autoUpdate,ie=Je.needsUpdate,ae=Je.type;qe(),J.autoReset=R,Je.enabled=q,Je.autoUpdate=oe,Je.needsUpdate=ie,Je.type=ae}function ei(R){bt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ti(R){const q=R.target;q.removeEventListener("dispose",ti),uo(q)}function uo(R){co(R),se.remove(R)}function co(R){const q=se.get(R).programs;q!==void 0&&(q.forEach(function(oe){Re.releaseProgram(oe)}),R.isShaderMaterial&&Re.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,oe,ie,ae,Oe){q===null&&(q=hn);const Ge=ae.isMesh&&ae.matrixWorld.determinantAffine()<0,Le=za(R,q,oe,ie,ae);E.setMaterial(ie,Ge);let Xe=oe.index,ke=1;if(ie.wireframe===!0){if(Xe=he.getWireframeAttribute(oe),Xe===void 0)return;ke=2}const je=oe.drawRange,ot=oe.attributes.position;let Ze=je.start*ke,Tt=(je.start+je.count)*ke;Oe!==null&&(Ze=Math.max(Ze,Oe.start*ke),Tt=Math.min(Tt,(Oe.start+Oe.count)*ke)),Xe!==null?(Ze=Math.max(Ze,0),Tt=Math.min(Tt,Xe.count)):ot!=null&&(Ze=Math.max(Ze,0),Tt=Math.min(Tt,ot.count));const Jt=Tt-Ze;if(Jt<0||Jt===1/0)return;Be.setup(ae,ie,Le,oe,Xe);let Xt,Nt=Ae;if(Xe!==null&&(Xt=De.get(Xe),Nt=ge,Nt.setIndex(Xt)),ae.isMesh)ie.wireframe===!0?(E.setLineWidth(ie.wireframeLinewidth*ln()),Nt.setMode(Z.LINES)):Nt.setMode(Z.TRIANGLES);else if(ae.isLine){let Ot=ie.linewidth;Ot===void 0&&(Ot=1),E.setLineWidth(Ot*ln()),ae.isLineSegments?Nt.setMode(Z.LINES):ae.isLineLoop?Nt.setMode(Z.LINE_LOOP):Nt.setMode(Z.LINE_STRIP)}else ae.isPoints?Nt.setMode(Z.POINTS):ae.isSprite&&Nt.setMode(Z.TRIANGLES);if(ae.isBatchedMesh)if(wt.get("WEBGL_multi_draw"))Nt.renderMultiDraw(ae._multiDrawStarts,ae._multiDrawCounts,ae._multiDrawCount);else{const Ot=ae._multiDrawStarts,Fe=ae._multiDrawCounts,In=ae._multiDrawCount,dt=Xe?De.get(Xe).bytesPerElement:1,En=se.get(ie).currentProgram.getUniforms();for(let ni=0;ni<In;ni++)En.setValue(Z,"_gl_DrawID",ni),Nt.render(Ot[ni]/dt,Fe[ni])}else if(ae.isInstancedMesh)Nt.renderInstances(Ze,Jt,ae.count);else if(oe.isInstancedBufferGeometry){const Ot=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Fe=Math.min(oe.instanceCount,Ot);Nt.renderInstances(Ze,Jt,Fe)}else Nt.render(Ze,Jt)};function fo(R,q,oe){R.transparent===!0&&R.side===Bi&&R.forceSinglePass===!1?(R.side=$n,R.needsUpdate=!0,Ba(R,q,oe),R.side=vr,R.needsUpdate=!0,Ba(R,q,oe),R.side=Bi):Ba(R,q,oe)}this.compile=function(R,q,oe=null){oe===null&&(oe=R),U=Ue.get(oe),U.init(q),b.push(U),oe.traverseVisible(function(ae){ae.isLight&&ae.layers.test(q.layers)&&(U.pushLight(ae),ae.castShadow&&U.pushShadow(ae))}),R!==oe&&R.traverseVisible(function(ae){ae.isLight&&ae.layers.test(q.layers)&&(U.pushLight(ae),ae.castShadow&&U.pushShadow(ae))}),U.setupLights();const ie=new Set;return R.traverse(function(ae){if(!(ae.isMesh||ae.isPoints||ae.isLine||ae.isSprite))return;const Oe=ae.material;if(Oe)if(Array.isArray(Oe))for(let Ge=0;Ge<Oe.length;Ge++){const Le=Oe[Ge];fo(Le,oe,ae),ie.add(Le)}else fo(Oe,oe,ae),ie.add(Oe)}),U=b.pop(),ie},this.compileAsync=function(R,q,oe=null){const ie=this.compile(R,q,oe);return new Promise(ae=>{function Oe(){if(ie.forEach(function(Ge){se.get(Ge).currentProgram.isReady()&&ie.delete(Ge)}),ie.size===0){ae(R);return}setTimeout(Oe,10)}wt.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let es=null;function Gi(R){es&&es(R)}function mn(){qn.stop()}function Dn(){qn.start()}const qn=new $x;qn.setAnimationLoop(Gi),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(R){es=R,Ve.setAnimationLoop(R),R===null?qn.stop():qn.start()},Ve.addEventListener("sessionstart",mn),Ve.addEventListener("sessionend",Dn),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;k!==null&&k.renderStart(R,q);const oe=Ve.enabled===!0&&Ve.isPresenting===!0,ie=D!==null&&(ne===null||oe)&&D.begin(H,ne);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(q),q=Ve.getCamera()),R.isScene===!0&&R.onBeforeRender(H,R,q,ne),U=Ue.get(R,b.length),U.init(q),U.state.textureUnits=de.getTextureUnits(),b.push(U),rn.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),xt.setFromProjectionMatrix(rn,ji,q.reversedDepth),ht=this.localClippingEnabled,St=Ke.init(this.clippingPlanes,ht),N=Ne.get(R,O.length),N.init(),O.push(N),Ve.enabled===!0&&Ve.isPresenting===!0){const Ge=H.xr.getDepthSensingMesh();Ge!==null&&Sr(Ge,q,-1/0,H.sortObjects)}Sr(R,q,0,H.sortObjects),N.finish(),H.sortObjects===!0&&N.sort(He,tt,q.reversedDepth),qt=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,qt&&it.addToRenderList(N,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),St===!0&&Ke.beginShadows();const ae=U.state.shadowsArray;if(Je.render(ae,R,q),St===!0&&Ke.endShadows(),(ie&&D.hasRenderPass())===!1){const Ge=N.opaque,Le=N.transmissive;if(U.setupLights(),q.isArrayCamera){const Xe=q.cameras;if(Le.length>0)for(let ke=0,je=Xe.length;ke<je;ke++){const ot=Xe[ke];wl(Ge,Le,R,ot)}qt&&it.render(R);for(let ke=0,je=Xe.length;ke<je;ke++){const ot=Xe[ke];Cl(N,R,ot,ot.viewport)}}else Le.length>0&&wl(Ge,Le,R,q),qt&&it.render(R),Cl(N,R,q)}ne!==null&&V===0&&(de.updateMultisampleRenderTarget(ne),de.updateRenderTargetMipmap(ne)),ie&&D.end(H),R.isScene===!0&&R.onAfterRender(H,R,q),Be.resetDefaultState(),_e=-1,be=null,b.pop(),b.length>0?(U=b[b.length-1],de.setTextureUnits(U.state.textureUnits),St===!0&&Ke.setGlobalState(H.clippingPlanes,U.state.camera)):U=null,O.pop(),O.length>0?N=O[O.length-1]:N=null,k!==null&&k.renderEnd()};function Sr(R,q,oe,ie){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)oe=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLightProbeGrid)U.pushLightProbeGrid(R);else if(R.isLight)U.pushLight(R),R.castShadow&&U.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||xt.intersectsSprite(R)){ie&&on.setFromMatrixPosition(R.matrixWorld).applyMatrix4(rn);const Ge=pe.update(R),Le=R.material;Le.visible&&N.push(R,Ge,Le,oe,on.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||xt.intersectsObject(R))){const Ge=pe.update(R),Le=R.material;if(ie&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),on.copy(R.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),on.copy(Ge.boundingSphere.center)),on.applyMatrix4(R.matrixWorld).applyMatrix4(rn)),Array.isArray(Le)){const Xe=Ge.groups;for(let ke=0,je=Xe.length;ke<je;ke++){const ot=Xe[ke],Ze=Le[ot.materialIndex];Ze&&Ze.visible&&N.push(R,Ge,Ze,oe,on.z,ot)}}else Le.visible&&N.push(R,Ge,Le,oe,on.z,null)}}const Oe=R.children;for(let Ge=0,Le=Oe.length;Ge<Le;Ge++)Sr(Oe[Ge],q,oe,ie)}function Cl(R,q,oe,ie){const{opaque:ae,transmissive:Oe,transparent:Ge}=R;U.setupLightsView(oe),St===!0&&Ke.setGlobalState(H.clippingPlanes,oe),ie&&E.viewport(B.copy(ie)),ae.length>0&&yr(ae,q,oe),Oe.length>0&&yr(Oe,q,oe),Ge.length>0&&yr(Ge,q,oe),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function wl(R,q,oe,ie){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[ie.id]===void 0){const Ze=wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[ie.id]=new ea(1,1,{generateMipmaps:!0,type:Ze?La:pi,minFilter:Kr,samples:Math.max(4,P.samples),stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}const Oe=U.state.transmissionRenderTarget[ie.id],Ge=ie.viewport||B;Oe.setSize(Ge.z*H.transmissionResolutionScale,Ge.w*H.transmissionResolutionScale);const Le=H.getRenderTarget(),Xe=H.getActiveCubeFace(),ke=H.getActiveMipmapLevel();H.setRenderTarget(Oe),H.getClearColor(Ce),Ie=H.getClearAlpha(),Ie<1&&H.setClearColor(16777215,.5),H.clear(),qt&&it.render(oe);const je=H.toneMapping;H.toneMapping=$i;const ot=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),U.setupLightsView(ie),St===!0&&Ke.setGlobalState(H.clippingPlanes,ie),yr(R,oe,ie),de.updateMultisampleRenderTarget(Oe),de.updateRenderTargetMipmap(Oe),wt.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Tt=0,Jt=q.length;Tt<Jt;Tt++){const Xt=q[Tt],{object:Nt,geometry:Ot,material:Fe,group:In}=Xt;if(Fe.side===Bi&&Nt.layers.test(ie.layers)){const dt=Fe.side;Fe.side=$n,Fe.needsUpdate=!0,Ia(Nt,oe,ie,Ot,Fe,In),Fe.side=dt,Fe.needsUpdate=!0,Ze=!0}}Ze===!0&&(de.updateMultisampleRenderTarget(Oe),de.updateRenderTargetMipmap(Oe))}H.setRenderTarget(Le,Xe,ke),H.setClearColor(Ce,Ie),ot!==void 0&&(ie.viewport=ot),H.toneMapping=je}function yr(R,q,oe){const ie=q.isScene===!0?q.overrideMaterial:null;for(let ae=0,Oe=R.length;ae<Oe;ae++){const Ge=R[ae],{object:Le,geometry:Xe,group:ke}=Ge;let je=Ge.material;je.allowOverride===!0&&ie!==null&&(je=ie),Le.layers.test(oe.layers)&&Ia(Le,q,oe,Xe,je,ke)}}function Ia(R,q,oe,ie,ae,Oe){R.onBeforeRender(H,q,oe,ie,ae,Oe),R.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ae.onBeforeRender(H,q,oe,ie,R,Oe),ae.transparent===!0&&ae.side===Bi&&ae.forceSinglePass===!1?(ae.side=$n,ae.needsUpdate=!0,H.renderBufferDirect(oe,q,ie,ae,R,Oe),ae.side=vr,ae.needsUpdate=!0,H.renderBufferDirect(oe,q,ie,ae,R,Oe),ae.side=Bi):H.renderBufferDirect(oe,q,ie,ae,R,Oe),R.onAfterRender(H,q,oe,ie,ae,Oe)}function Ba(R,q,oe){q.isScene!==!0&&(q=hn);const ie=se.get(R),ae=U.state.lights,Oe=U.state.shadowsArray,Ge=ae.state.version,Le=Re.getParameters(R,ae.state,Oe,q,oe,U.state.lightProbeGridArray),Xe=Re.getProgramCacheKey(Le);let ke=ie.programs;ie.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?q.environment:null,ie.fog=q.fog;const je=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ie.envMap=Te.get(R.envMap||ie.environment,je),ie.envMapRotation=ie.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,ke===void 0&&(R.addEventListener("dispose",ti),ke=new Map,ie.programs=ke);let ot=ke.get(Xe);if(ot!==void 0){if(ie.currentProgram===ot&&ie.lightsStateVersion===Ge)return ra(R,Le),ot}else Le.uniforms=Re.getUniforms(R),k!==null&&R.isNodeMaterial&&k.build(R,oe,Le),R.onBeforeCompile(Le,H),ot=Re.acquireProgram(Le,Xe),ke.set(Xe,ot),ie.uniforms=Le.uniforms;const Ze=ie.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ze.clippingPlanes=Ke.uniform),ra(R,Le),ie.needsLights=Dl(R),ie.lightsStateVersion=Ge,ie.needsLights&&(Ze.ambientLightColor.value=ae.state.ambient,Ze.lightProbe.value=ae.state.probe,Ze.directionalLights.value=ae.state.directional,Ze.directionalLightShadows.value=ae.state.directionalShadow,Ze.spotLights.value=ae.state.spot,Ze.spotLightShadows.value=ae.state.spotShadow,Ze.rectAreaLights.value=ae.state.rectArea,Ze.ltc_1.value=ae.state.rectAreaLTC1,Ze.ltc_2.value=ae.state.rectAreaLTC2,Ze.pointLights.value=ae.state.point,Ze.pointLightShadows.value=ae.state.pointShadow,Ze.hemisphereLights.value=ae.state.hemi,Ze.directionalShadowMatrix.value=ae.state.directionalShadowMatrix,Ze.spotLightMatrix.value=ae.state.spotLightMatrix,Ze.spotLightMap.value=ae.state.spotLightMap,Ze.pointShadowMatrix.value=ae.state.pointShadowMatrix),ie.lightProbeGrid=U.state.lightProbeGridArray.length>0,ie.currentProgram=ot,ie.uniformsList=null,ot}function aa(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=vc.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function ra(R,q){const oe=se.get(R);oe.outputColorSpace=q.outputColorSpace,oe.batching=q.batching,oe.batchingColor=q.batchingColor,oe.instancing=q.instancing,oe.instancingColor=q.instancingColor,oe.instancingMorph=q.instancingMorph,oe.skinning=q.skinning,oe.morphTargets=q.morphTargets,oe.morphNormals=q.morphNormals,oe.morphColors=q.morphColors,oe.morphTargetsCount=q.morphTargetsCount,oe.numClippingPlanes=q.numClippingPlanes,oe.numIntersection=q.numClipIntersection,oe.vertexAlphas=q.vertexAlphas,oe.vertexTangents=q.vertexTangents,oe.toneMapping=q.toneMapping}function Mr(R,q){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;C.setFromMatrixPosition(q.matrixWorld);for(let oe=0,ie=R.length;oe<ie;oe++){const ae=R[oe];if(ae.texture!==null&&ae.boundingBox.containsPoint(C))return ae}return null}function za(R,q,oe,ie,ae){q.isScene!==!0&&(q=hn),de.resetTextureUnits();const Oe=q.fog,Ge=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial?q.environment:null,Le=ne===null?H.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Mt.workingColorSpace,Xe=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial&&!ie.envMap||ie.isMeshPhongMaterial&&!ie.envMap,ke=Te.get(ie.envMap||Ge,Xe),je=ie.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,ot=!!oe.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),Ze=!!oe.morphAttributes.position,Tt=!!oe.morphAttributes.normal,Jt=!!oe.morphAttributes.color;let Xt=$i;ie.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Xt=H.toneMapping);const Nt=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,Ot=Nt!==void 0?Nt.length:0,Fe=se.get(ie),In=U.state.lights;if(St===!0&&(ht===!0||R!==be)){const Ut=R===be&&ie.id===_e;Ke.setState(ie,R,Ut)}let dt=!1;ie.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==In.state.version||Fe.outputColorSpace!==Le||ae.isBatchedMesh&&Fe.batching===!1||!ae.isBatchedMesh&&Fe.batching===!0||ae.isBatchedMesh&&Fe.batchingColor===!0&&ae.colorTexture===null||ae.isBatchedMesh&&Fe.batchingColor===!1&&ae.colorTexture!==null||ae.isInstancedMesh&&Fe.instancing===!1||!ae.isInstancedMesh&&Fe.instancing===!0||ae.isSkinnedMesh&&Fe.skinning===!1||!ae.isSkinnedMesh&&Fe.skinning===!0||ae.isInstancedMesh&&Fe.instancingColor===!0&&ae.instanceColor===null||ae.isInstancedMesh&&Fe.instancingColor===!1&&ae.instanceColor!==null||ae.isInstancedMesh&&Fe.instancingMorph===!0&&ae.morphTexture===null||ae.isInstancedMesh&&Fe.instancingMorph===!1&&ae.morphTexture!==null||Fe.envMap!==ke||ie.fog===!0&&Fe.fog!==Oe||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Ke.numPlanes||Fe.numIntersection!==Ke.numIntersection)||Fe.vertexAlphas!==je||Fe.vertexTangents!==ot||Fe.morphTargets!==Ze||Fe.morphNormals!==Tt||Fe.morphColors!==Jt||Fe.toneMapping!==Xt||Fe.morphTargetsCount!==Ot||!!Fe.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,Fe.__version=ie.version);let En=Fe.currentProgram;dt===!0&&(En=Ba(ie,q,ae),k&&ie.isNodeMaterial&&k.onUpdateProgram(ie,En,Fe));let ni=!1,Ci=!1,ii=!1;const Pt=En.getUniforms(),jt=Fe.uniforms;if(E.useProgram(En.program)&&(ni=!0,Ci=!0,ii=!0),ie.id!==_e&&(_e=ie.id,Ci=!0),Fe.needsLights){const Ut=Mr(U.state.lightProbeGridArray,ae);Fe.lightProbeGrid!==Ut&&(Fe.lightProbeGrid=Ut,Ci=!0)}if(ni||be!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Pt.setValue(Z,"projectionMatrix",R.projectionMatrix),Pt.setValue(Z,"viewMatrix",R.matrixWorldInverse);const Vi=Pt.map.cameraPosition;Vi!==void 0&&Vi.setValue(Z,sn.setFromMatrixPosition(R.matrixWorld)),P.logarithmicDepthBuffer&&Pt.setValue(Z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Pt.setValue(Z,"isOrthographic",R.isOrthographicCamera===!0),be!==R&&(be=R,Ci=!0,ii=!0)}if(Fe.needsLights&&(In.state.directionalShadowMap.length>0&&Pt.setValue(Z,"directionalShadowMap",In.state.directionalShadowMap,de),In.state.spotShadowMap.length>0&&Pt.setValue(Z,"spotShadowMap",In.state.spotShadowMap,de),In.state.pointShadowMap.length>0&&Pt.setValue(Z,"pointShadowMap",In.state.pointShadowMap,de)),ae.isSkinnedMesh){Pt.setOptional(Z,ae,"bindMatrix"),Pt.setOptional(Z,ae,"bindMatrixInverse");const Ut=ae.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),Pt.setValue(Z,"boneTexture",Ut.boneTexture,de))}ae.isBatchedMesh&&(Pt.setOptional(Z,ae,"batchingTexture"),Pt.setValue(Z,"batchingTexture",ae._matricesTexture,de),Pt.setOptional(Z,ae,"batchingIdTexture"),Pt.setValue(Z,"batchingIdTexture",ae._indirectTexture,de),Pt.setOptional(Z,ae,"batchingColorTexture"),ae._colorsTexture!==null&&Pt.setValue(Z,"batchingColorTexture",ae._colorsTexture,de));const wi=oe.morphAttributes;if((wi.position!==void 0||wi.normal!==void 0||wi.color!==void 0)&&W.update(ae,oe,En),(Ci||Fe.receiveShadow!==ae.receiveShadow)&&(Fe.receiveShadow=ae.receiveShadow,Pt.setValue(Z,"receiveShadow",ae.receiveShadow)),(ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial)&&ie.envMap===null&&q.environment!==null&&(jt.envMapIntensity.value=q.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=S3()),Ci){if(Pt.setValue(Z,"toneMappingExposure",H.toneMappingExposure),Fe.needsLights&&gn(jt,ii),Oe&&ie.fog===!0&&ze.refreshFogUniforms(jt,Oe),ze.refreshMaterialUniforms(jt,ie,Me,Se,U.state.transmissionRenderTarget[R.id]),Fe.needsLights&&Fe.lightProbeGrid){const Ut=Fe.lightProbeGrid;jt.probesSH.value=Ut.texture,jt.probesMin.value.copy(Ut.boundingBox.min),jt.probesMax.value.copy(Ut.boundingBox.max),jt.probesResolution.value.copy(Ut.resolution)}vc.upload(Z,aa(Fe),jt,de)}if(ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(vc.upload(Z,aa(Fe),jt,de),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Pt.setValue(Z,"center",ae.center),Pt.setValue(Z,"modelViewMatrix",ae.modelViewMatrix),Pt.setValue(Z,"normalMatrix",ae.normalMatrix),Pt.setValue(Z,"modelMatrix",ae.matrixWorld),ie.uniformsGroups!==void 0){const Ut=ie.uniformsGroups;for(let Vi=0,Fa=Ut.length;Vi<Fa;Vi++){const Er=Ut[Vi];ye.update(Er,En),ye.bind(Er,En)}}return En}function gn(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function Dl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(R,q,oe){const ie=se.get(R);ie.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),se.get(R.texture).__webglTexture=q,se.get(R.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:oe,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){const oe=se.get(R);oe.__webglFramebuffer=q,oe.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(R,q=0,oe=0){ne=R,z=q,V=oe;let ie=null,ae=!1,Oe=!1;if(R){const Le=se.get(R);if(Le.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(Z.FRAMEBUFFER,Le.__webglFramebuffer),B.copy(R.viewport),Q.copy(R.scissor),Ee=R.scissorTest,E.viewport(B),E.scissor(Q),E.setScissorTest(Ee),_e=-1;return}else if(Le.__webglFramebuffer===void 0)de.setupRenderTarget(R);else if(Le.__hasExternalTextures)de.rebindTextures(R,se.get(R.texture).__webglTexture,se.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const je=R.depthTexture;if(Le.__boundDepthTexture!==je){if(je!==null&&se.has(je)&&(R.width!==je.image.width||R.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(R)}}const Xe=R.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Oe=!0);const ke=se.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ke[q])?ie=ke[q][oe]:ie=ke[q],ae=!0):R.samples>0&&de.useMultisampledRTT(R)===!1?ie=se.get(R).__webglMultisampledFramebuffer:Array.isArray(ke)?ie=ke[oe]:ie=ke,B.copy(R.viewport),Q.copy(R.scissor),Ee=R.scissorTest}else B.copy(Qe).multiplyScalar(Me).floor(),Q.copy(Yt).multiplyScalar(Me).floor(),Ee=ft;if(oe!==0&&(ie=$),E.bindFramebuffer(Z.FRAMEBUFFER,ie)&&E.drawBuffers(R,ie),E.viewport(B),E.scissor(Q),E.setScissorTest(Ee),ae){const Le=se.get(R.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+q,Le.__webglTexture,oe)}else if(Oe){const Le=q;for(let Xe=0;Xe<R.textures.length;Xe++){const ke=se.get(R.textures[Xe]);Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0+Xe,ke.__webglTexture,oe,Le)}}else if(R!==null&&oe!==0){const Le=se.get(R.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,Le.__webglTexture,oe)}_e=-1},this.readRenderTargetPixels=function(R,q,oe,ie,ae,Oe,Ge,Le=0){if(!(R&&R.isWebGLRenderTarget)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=se.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ge!==void 0&&(Xe=Xe[Ge]),Xe){E.bindFramebuffer(Z.FRAMEBUFFER,Xe);try{const ke=R.textures[Le],je=ke.format,ot=ke.type;if(R.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+Le),!P.textureFormatReadable(je)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(ot)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-ie&&oe>=0&&oe<=R.height-ae&&Z.readPixels(q,oe,ie,ae,we.convert(je),we.convert(ot),Oe)}finally{const ke=ne!==null?se.get(ne).__webglFramebuffer:null;E.bindFramebuffer(Z.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(R,q,oe,ie,ae,Oe,Ge,Le=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=se.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ge!==void 0&&(Xe=Xe[Ge]),Xe)if(q>=0&&q<=R.width-ie&&oe>=0&&oe<=R.height-ae){E.bindFramebuffer(Z.FRAMEBUFFER,Xe);const ke=R.textures[Le],je=ke.format,ot=ke.type;if(R.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+Le),!P.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=Z.createBuffer();Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Ze),Z.bufferData(Z.PIXEL_PACK_BUFFER,Oe.byteLength,Z.STREAM_READ),Z.readPixels(q,oe,ie,ae,we.convert(je),we.convert(ot),0);const Tt=ne!==null?se.get(ne).__webglFramebuffer:null;E.bindFramebuffer(Z.FRAMEBUFFER,Tt);const Jt=Z.fenceSync(Z.SYNC_GPU_COMMANDS_COMPLETE,0);return Z.flush(),await Ob(Z,Jt,4),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Ze),Z.getBufferSubData(Z.PIXEL_PACK_BUFFER,0,Oe),Z.deleteBuffer(Ze),Z.deleteSync(Jt),Oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,q=null,oe=0){const ie=Math.pow(2,-oe),ae=Math.floor(R.image.width*ie),Oe=Math.floor(R.image.height*ie),Ge=q!==null?q.x:0,Le=q!==null?q.y:0;de.setTexture2D(R,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,oe,0,0,Ge,Le,ae,Oe),E.unbindTexture()},this.copyTextureToTexture=function(R,q,oe=null,ie=null,ae=0,Oe=0){let Ge,Le,Xe,ke,je,ot,Ze,Tt,Jt;const Xt=R.isCompressedTexture?R.mipmaps[Oe]:R.image;if(oe!==null)Ge=oe.max.x-oe.min.x,Le=oe.max.y-oe.min.y,Xe=oe.isBox3?oe.max.z-oe.min.z:1,ke=oe.min.x,je=oe.min.y,ot=oe.isBox3?oe.min.z:0;else{const jt=Math.pow(2,-ae);Ge=Math.floor(Xt.width*jt),Le=Math.floor(Xt.height*jt),R.isDataArrayTexture?Xe=Xt.depth:R.isData3DTexture?Xe=Math.floor(Xt.depth*jt):Xe=1,ke=0,je=0,ot=0}ie!==null?(Ze=ie.x,Tt=ie.y,Jt=ie.z):(Ze=0,Tt=0,Jt=0);const Nt=we.convert(q.format),Ot=we.convert(q.type);let Fe;q.isData3DTexture?(de.setTexture3D(q,0),Fe=Z.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(de.setTexture2DArray(q,0),Fe=Z.TEXTURE_2D_ARRAY):(de.setTexture2D(q,0),Fe=Z.TEXTURE_2D),E.activeTexture(Z.TEXTURE0),E.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,q.flipY),E.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),E.pixelStorei(Z.UNPACK_ALIGNMENT,q.unpackAlignment);const In=E.getParameter(Z.UNPACK_ROW_LENGTH),dt=E.getParameter(Z.UNPACK_IMAGE_HEIGHT),En=E.getParameter(Z.UNPACK_SKIP_PIXELS),ni=E.getParameter(Z.UNPACK_SKIP_ROWS),Ci=E.getParameter(Z.UNPACK_SKIP_IMAGES);E.pixelStorei(Z.UNPACK_ROW_LENGTH,Xt.width),E.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Xt.height),E.pixelStorei(Z.UNPACK_SKIP_PIXELS,ke),E.pixelStorei(Z.UNPACK_SKIP_ROWS,je),E.pixelStorei(Z.UNPACK_SKIP_IMAGES,ot);const ii=R.isDataArrayTexture||R.isData3DTexture,Pt=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const jt=se.get(R),wi=se.get(q),Ut=se.get(jt.__renderTarget),Vi=se.get(wi.__renderTarget);E.bindFramebuffer(Z.READ_FRAMEBUFFER,Ut.__webglFramebuffer),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Fa=0;Fa<Xe;Fa++)ii&&(Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,se.get(R).__webglTexture,ae,ot+Fa),Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,se.get(q).__webglTexture,Oe,Jt+Fa)),Z.blitFramebuffer(ke,je,Ge,Le,Ze,Tt,Ge,Le,Z.DEPTH_BUFFER_BIT,Z.NEAREST);E.bindFramebuffer(Z.READ_FRAMEBUFFER,null),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else if(ae!==0||R.isRenderTargetTexture||se.has(R)){const jt=se.get(R),wi=se.get(q);E.bindFramebuffer(Z.READ_FRAMEBUFFER,ue),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,Y);for(let Ut=0;Ut<Xe;Ut++)ii?Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,jt.__webglTexture,ae,ot+Ut):Z.framebufferTexture2D(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,jt.__webglTexture,ae),Pt?Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,wi.__webglTexture,Oe,Jt+Ut):Z.framebufferTexture2D(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,wi.__webglTexture,Oe),ae!==0?Z.blitFramebuffer(ke,je,Ge,Le,Ze,Tt,Ge,Le,Z.COLOR_BUFFER_BIT,Z.NEAREST):Pt?Z.copyTexSubImage3D(Fe,Oe,Ze,Tt,Jt+Ut,ke,je,Ge,Le):Z.copyTexSubImage2D(Fe,Oe,Ze,Tt,ke,je,Ge,Le);E.bindFramebuffer(Z.READ_FRAMEBUFFER,null),E.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else Pt?R.isDataTexture||R.isData3DTexture?Z.texSubImage3D(Fe,Oe,Ze,Tt,Jt,Ge,Le,Xe,Nt,Ot,Xt.data):q.isCompressedArrayTexture?Z.compressedTexSubImage3D(Fe,Oe,Ze,Tt,Jt,Ge,Le,Xe,Nt,Xt.data):Z.texSubImage3D(Fe,Oe,Ze,Tt,Jt,Ge,Le,Xe,Nt,Ot,Xt):R.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,Oe,Ze,Tt,Ge,Le,Nt,Ot,Xt.data):R.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,Oe,Ze,Tt,Xt.width,Xt.height,Nt,Xt.data):Z.texSubImage2D(Z.TEXTURE_2D,Oe,Ze,Tt,Ge,Le,Nt,Ot,Xt);E.pixelStorei(Z.UNPACK_ROW_LENGTH,In),E.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,dt),E.pixelStorei(Z.UNPACK_SKIP_PIXELS,En),E.pixelStorei(Z.UNPACK_SKIP_ROWS,ni),E.pixelStorei(Z.UNPACK_SKIP_IMAGES,Ci),Oe===0&&q.generateMipmaps&&Z.generateMipmap(Fe),E.unbindTexture()},this.initRenderTarget=function(R){se.get(R).__webglFramebuffer===void 0&&de.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?de.setTextureCube(R,0):R.isData3DTexture?de.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?de.setTexture2DArray(R,0):de.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){z=0,V=0,ne=null,E.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Mt._getUnpackColorSpace()}}const M3=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),E3=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,r)=>r?r.toUpperCase():i.toLowerCase()),jv=s=>{const e=E3(s);return e.charAt(0).toUpperCase()+e.slice(1)},oS=(...s)=>s.filter((e,i,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===i).join(" ").trim(),b3=s=>{for(const e in s)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var T3={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const A3=fe.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:l="",children:u,iconNode:f,...p},m)=>fe.createElement("svg",{ref:m,...T3,width:e,height:e,stroke:s,strokeWidth:r?Number(i)*24/Number(e):i,className:oS("lucide",l),...!u&&!b3(p)&&{"aria-hidden":"true"},...p},[...f.map(([d,_])=>fe.createElement(d,_)),...Array.isArray(u)?u:[u]]));const jp=(s,e)=>{const i=fe.forwardRef(({className:r,...l},u)=>fe.createElement(A3,{ref:u,iconNode:e,className:oS(`lucide-${M3(jv(s))}`,`lucide-${s}`,r),...l}));return i.displayName=jv(s),i};const R3=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],C3=jp("arrow-left",R3);const w3=[["circle",{cx:"6",cy:"15",r:"4",key:"vux9w4"}],["circle",{cx:"18",cy:"15",r:"4",key:"18o8ve"}],["path",{d:"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2",key:"1ag4bs"}],["path",{d:"M2.5 13 5 7c.7-1.3 1.4-2 3-2",key:"1hm1gs"}],["path",{d:"M21.5 13 19 7c-.7-1.3-1.5-2-3-2",key:"1r31ai"}]],D3=jp("glasses",w3);const U3=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],L3=jp("log-out",U3),$v=s=>{let e;const i=new Set,r=(d,_)=>{const v=typeof d=="function"?d(e):d;if(!Object.is(v,e)){const g=e;e=_??(typeof v!="object"||v===null)?v:Object.assign({},e,v),i.forEach(M=>M(e,g))}},l=()=>e,p={setState:r,getState:l,getInitialState:()=>m,subscribe:d=>(i.add(d),()=>i.delete(d))},m=e=s(r,l,p);return p},N3=(s=>s?$v(s):$v),O3=s=>s;function P3(s,e=O3){const i=pl.useSyncExternalStore(s.subscribe,pl.useCallback(()=>e(s.getState()),[s,e]),pl.useCallback(()=>e(s.getInitialState()),[s,e]));return pl.useDebugValue(i),i}const I3=s=>{const e=N3(s),i=r=>P3(e,r);return Object.assign(i,e),i},B3=(s=>I3);function z3(s,e){let i;try{i=s()}catch{return}return{getItem:l=>{var u;const f=m=>m===null?null:JSON.parse(m,void 0),p=(u=i.getItem(l))!=null?u:null;return p instanceof Promise?p.then(f):f(p)},setItem:(l,u)=>i.setItem(l,JSON.stringify(u,void 0)),removeItem:l=>i.removeItem(l)}}const Ap=s=>e=>{try{const i=s(e);return i instanceof Promise?i:{then(r){return Ap(r)(i)},catch(r){return this}}}catch(i){return{then(r){return this},catch(r){return Ap(r)(i)}}}},F3=(s,e)=>(i,r,l)=>{let u={storage:z3(()=>window.localStorage),partialize:x=>x,version:0,merge:(x,S)=>({...S,...x}),...e},f=!1,p=0;const m=new Set,d=new Set;let _=u.storage;if(!_)return s((...x)=>{console.warn(`[zustand persist middleware] Unable to update item '${u.name}', the given storage is currently unavailable.`),i(...x)},r,l);const v=()=>{const x=u.partialize({...r()});return _.setItem(u.name,{state:x,version:u.version})},g=l.setState;l.setState=(x,S)=>(g(x,S),v());const M=s((...x)=>(i(...x),v()),r,l);l.getInitialState=()=>M;let T;const A=()=>{var x,S;if(!_)return;const L=++p;f=!1,m.forEach(C=>{var N;return C((N=r())!=null?N:M)});const I=((S=u.onRehydrateStorage)==null?void 0:S.call(u,(x=r())!=null?x:M))||void 0;return Ap(_.getItem.bind(_))(u.name).then(C=>{if(C)if(typeof C.version=="number"&&C.version!==u.version){if(u.migrate){const N=u.migrate(C.state,C.version);return N instanceof Promise?N.then(U=>[!0,U]):[!0,N]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,C.state];return[!1,void 0]}).then(C=>{var N;if(L!==p)return;const[U,O]=C;if(T=u.merge(O,(N=r())!=null?N:M),i(T,!0),U)return v()}).then(()=>{L===p&&(I?.(r(),void 0),T=r(),f=!0,d.forEach(C=>C(T)))}).catch(C=>{L===p&&I?.(void 0,C)})};return l.persist={setOptions:x=>{u={...u,...x},x.storage&&(_=x.storage)},clearStorage:()=>{_?.removeItem(u.name)},getOptions:()=>u,rehydrate:()=>A(),hasHydrated:()=>f,onHydrate:x=>(m.add(x),()=>{m.delete(x)}),onFinishHydration:x=>(d.add(x),()=>{d.delete(x)})},u.skipHydration||A(),T||M},H3=F3,Xr=()=>({stars:{},scores:{},unlockedLevel:1}),G3=["falaj","souq","dhow","bahla","cave","khareef"],ex=B3()(H3((s,e)=>({muted:!1,playerName:"Explorer",games:{falaj:Xr(),souq:Xr(),dhow:Xr(),bahla:Xr(),cave:Xr(),khareef:Xr()},toggleMute:()=>s(i=>({muted:!i.muted})),setPlayerName:i=>s({playerName:i}),recordResult:(i,r,l,u)=>s(f=>{const p=f.games[i]??Xr(),m=Math.max(p.stars[r]??0,u),d=Math.max(p.scores[r]??0,l);return{games:{...f.games,[i]:{stars:{...p.stars,[r]:m},scores:{...p.scores,[r]:d},unlockedLevel:Math.max(p.unlockedLevel,r+1)}}}}),totalStars:()=>G3.reduce((i,r)=>i+Object.values(e().games[r].stars).reduce((l,u)=>l+u,0),0)}),{name:"palm-tree-hub"}));let hl=null;function V3(){if(!hl){const s=window.AudioContext||window.webkitAudioContext;hl=new s}return hl.state==="suspended"&&hl.resume(),hl}function Wr(s,e){const{freq:i,time:r=0,dur:l=.15,type:u="sine",gain:f=.18,slideTo:p}=e,m=s.currentTime+r,d=s.createOscillator(),_=s.createGain();d.type=u,d.frequency.setValueAtTime(i,m),p&&d.frequency.exponentialRampToValueAtTime(p,m+l),_.gain.setValueAtTime(0,m),_.gain.linearRampToValueAtTime(f,m+.01),_.gain.exponentialRampToValueAtTime(1e-4,m+l),d.connect(_).connect(s.destination),d.start(m),d.stop(m+l+.05)}function Ud(s,e){const{time:i=0,dur:r=.3,gain:l=.12,freq:u=1200,q:f=1,slideTo:p}=e,m=s.currentTime+i,d=Math.max(1,Math.floor(s.sampleRate*r)),_=s.createBuffer(1,d,s.sampleRate),v=_.getChannelData(0);for(let A=0;A<d;A++)v[A]=Math.random()*2-1;const g=s.createBufferSource();g.buffer=_;const M=s.createBiquadFilter();M.type="bandpass",M.frequency.setValueAtTime(u,m),p&&M.frequency.exponentialRampToValueAtTime(p,m+r),M.Q.value=f;const T=s.createGain();T.gain.setValueAtTime(l,m),T.gain.exponentialRampToValueAtTime(1e-4,m+r),g.connect(M).connect(T).connect(s.destination),g.start(m)}const k3={click:s=>Wr(s,{freq:660,type:"triangle",dur:.08}),hover:s=>Wr(s,{freq:880,type:"sine",dur:.04,gain:.06}),success:s=>{[523.25,659.25,783.99,1046.5].forEach((e,i)=>Wr(s,{freq:e,time:i*.09,type:"triangle",dur:.22}))},error:s=>Wr(s,{freq:220,slideTo:160,type:"sine",dur:.25,gain:.14}),splash:s=>Ud(s,{dur:.35,freq:900,slideTo:300,gain:.15,q:.8}),wind:s=>Ud(s,{dur:.8,freq:400,slideTo:1400,gain:.08,q:.6}),magic:s=>{[1046.5,1318.5,1568,2093].forEach((e,i)=>Wr(s,{freq:e,time:i*.06,dur:.3,gain:.1})),Ud(s,{dur:.5,freq:4e3,gain:.03,q:2})},star:s=>{Wr(s,{freq:1568,dur:.18,gain:.12}),Wr(s,{freq:2093,time:.08,dur:.25,gain:.1})}};function X3(){const s=ex(l=>l.muted),e=ex(l=>l.toggleMute),i=fe.useRef(0);return{play:fe.useCallback(l=>{if(!s){if(l==="hover"){const u=performance.now();if(u-i.current<60)return;i.current=u}try{k3[l](V3())}catch{}}},[s]),muted:s,toggleMute:e}}function dl(s,e="rgba(21,154,173,0.92)"){const i=document.createElement("canvas");i.width=256,i.height=72;const r=i.getContext("2d");r.fillStyle=e,r.beginPath(),r.roundRect(4,4,248,64,20),r.fill(),r.strokeStyle="#ffffff",r.lineWidth=4,r.stroke(),r.fillStyle="#ffffff",r.font="bold 34px sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText(s,128,38);const l=new lT(i);l.colorSpace=di;const u=new Wx({map:l,transparent:!0}),f=new Yx(u);return f.scale.set(1.6,.45,1),f}function fn(s,e={}){return new mT({color:s,roughness:.7,metalness:.05,...e})}function W3(s){const e=new Ct(new Cc(30,64),fn(5817458));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,s.add(e);const i=new Ii,r=new Ct(new vl(10,.5,16,64,Math.PI*1.2),fn(4118213,{roughness:.25,metalness:.1,emissive:679768,emissiveIntensity:.25}));r.rotation.x=-Math.PI/2,r.rotation.z=.4,r.position.y=.06,i.add(r);const l=new Ct(new vl(10,.62,16,64,Math.PI*1.2),fn(13625560,{roughness:.9}));l.rotation.x=-Math.PI/2,l.rotation.z=.4,l.position.y=.03,i.add(l),s.add(i);const u=[16758093,4118213,16743014,9138152,16767293,5226343];[[-4,-4],[4,-3],[-3,4],[5,5],[-6,1],[3,-7]].forEach(([b,D],H)=>{const F=new Ii,k=new Ct(new _l(1.05,1.1,8,24),fn(u[H%u.length]));k.position.y=1.1,k.scale.y=.85,F.add(k);const $=new Ct(new bi(1.15,32,24),fn(16775662));$.scale.set(1,.55,1),$.position.y=2.05,F.add($);const ue=new Ct(new _l(.28,.6,6,16),fn(9133620));ue.position.set(0,.55,1.05),F.add(ue);const Y=new Ct(new bi(.18,16,16),fn(1415853,{emissive:1415853,emissiveIntensity:.4}));Y.position.set(-.6,1.2,.95),F.add(Y);const z=Y.clone();z.position.x=.6,F.add(z),F.position.set(b,0,D),s.add(F)});const p=new Ii,m=new Ct(new Qs(1.6,1.7,2.2,32),fn(16775662));m.position.y=1.1,p.add(m);const d=new Ct(new bi(1.5,32,24),fn(4118213));d.scale.y=.85,d.position.y=2.6,p.add(d);const _=new Ct(new bi(.18,16,16),fn(16767293,{emissive:16767293,emissiveIntensity:.4}));_.position.y=3.95,p.add(_);const v=new Ct(new Qs(.22,.3,5,20),fn(16775662));v.position.set(2.6,2.5,0),p.add(v);const g=new Ct(new bi(.34,20,16),fn(4118213));g.position.set(2.6,5.1,0),p.add(g),p.position.set(0,0,-8),s.add(p);const M=dl("مسجد القرية · Mosque");M.position.set(0,4.6,-8),s.add(M);const T=fn(3120719,{side:Bi}),A=fn(11104575);for(let b=0;b<12;b++){const D=new Ii,H=new Ct(new Qs(.12,.22,3,16),A);H.position.y=1.5,D.add(H);const F=new Ct(new bi(.28,16,16),fn(5226343));F.position.y=3.05,D.add(F);for(let $=0;$<7;$++){const ue=new Ct(new bi(1,16,12),T);ue.scale.set(1.1,.12,.35);const Y=$/7*Math.PI*2;ue.position.set(Math.sin(Y)*.9,3.05-.15,Math.cos(Y)*.9),ue.rotation.y=Y,ue.rotation.z=-.35,D.add(ue)}for(let $=0;$<3;$++){const ue=new Ct(new bi(.09,12,12),fn(9133620));ue.position.set(Math.sin($*2.1)*.2,2.9,Math.cos($*2.1)*.2),D.add(ue)}const k=b/12*Math.PI*2;D.position.set(Math.sin(k)*8.5,0,Math.cos(k)*8.5),D.rotation.y=k,s.add(D)}const x=new Ii,S=new Ct(new vl(1,.28,16,32),fn(13204298));S.rotation.x=-Math.PI/2,S.position.y=.35,x.add(S);const L=new Ct(new Qs(1,1.05,.35,32,1,!0),fn(13204298,{side:Bi}));L.position.y=.18,x.add(L);const I=new Ct(new Cc(.85,32),fn(4118213,{roughness:.15,emissive:679768,emissiveIntensity:.3}));I.rotation.x=-Math.PI/2,I.position.y=.22,x.add(I),x.position.set(0,0,2),s.add(x);const C=dl("بئر النخلة · Well","rgba(47,158,79,0.92)");C.position.set(0,1.6,2),s.add(C),[{name:"صوفيا · Sophia",color:16738740},{name:"ثريا · Thuria",color:3120719},{name:"جون · John",color:16747520},{name:"الإسكندر · Alexander",color:4286945}].forEach((b,D)=>{const H=new Ii,F=new Ct(new _l(.22,.55,8,20),fn(b.color));F.position.y=.55,H.add(F);const k=new Ct(new bi(.2,24,20),fn(16107168));k.position.y=1.15,H.add(k);const $=dl(b.name,"rgba(33,50,59,0.88)");$.position.y=1.75,H.add($),H.position.set(-2.4+D*1.6,0,.5),s.add(H)});const U=dl("بيت صوفيا","rgba(229,89,156,0.9)");U.position.set(-4,3.1,-4),s.add(U);const O=dl("بيت جون","rgba(255,179,77,0.95)");O.position.set(4,3.1,-3),s.add(O);for(let b=0;b<6;b++){const D=new Ii;for(let F=0;F<3;F++){const k=new Ct(new bi(.8-F*.15,20,16),fn(16777215,{roughness:1}));k.position.set(F*.9-.9,F===1?.25:0,0),D.add(k)}const H=b/6*Math.PI*2;D.position.set(Math.sin(H)*14,8+b%3,Math.cos(H)*14),s.add(D)}}function q3(){const s=fe.useRef(null),e=fe.useRef(null),i=fe.useRef(null),[r,l]=fe.useState(null),[u,f]=fe.useState(!1),[p,m]=fe.useState(null),{play:d}=X3();fe.useEffect(()=>{const g=s.current,M=new Qb;M.background=new gt(8900331),M.fog=new Yp(8900331,25,45);const T=new Ti(70,window.innerWidth/window.innerHeight,.1,100);T.position.set(0,1.6,5);const A=new y3({antialias:!0});A.setSize(window.innerWidth,window.innerHeight),A.setPixelRatio(Math.min(window.devicePixelRatio,2)),A.xr.enabled=!0,A.shadowMap.enabled=!1,g.appendChild(A.domElement),e.current=A,M.add(new MT(16777215,.75));const x=new vT(12578815,5817458,.5);M.add(x);const S=new yT(16773840,1.1);S.position.set(10,20,10),M.add(S),W3(M);const L=U=>{if(A.xr.isPresenting)return;const O=U.clientX/window.innerWidth*2-1,b=-(U.clientY/window.innerHeight)*2+1;T.rotation.order="YXZ",T.rotation.y=O*.5,T.rotation.x=b*.3};document.addEventListener("mousemove",L);const I=()=>{T.aspect=window.innerWidth/window.innerHeight,T.updateProjectionMatrix(),A.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",I);const C=new TT;A.setAnimationLoop(()=>{const U=C.getElapsedTime();A.xr.isPresenting||(T.position.y=1.6+Math.sin(U*.8)*.02),A.render(M,T)});const N=navigator;return N.xr?N.xr.isSessionSupported("immersive-vr").then(U=>l(U)).catch(()=>l(!1)):l(!1),()=>{document.removeEventListener("mousemove",L),window.removeEventListener("resize",I),A.setAnimationLoop(null),i.current?.end().catch(()=>{}),i.current=null,g.removeChild(A.domElement),M.traverse(U=>{if(U instanceof Ct||U instanceof Yx){const O=U;O.geometry?.dispose?.(),(Array.isArray(O.material)?O.material:[O.material]).forEach(D=>{D.map?.dispose?.(),D.dispose()})}}),A.dispose(),e.current=null}},[]);const _=async()=>{d("magic");const g=navigator;if(!(!g.xr||!e.current))try{const M=await g.xr.requestSession("immersive-vr",{requiredFeatures:["local-floor"]});i.current=M,await e.current.xr.setSession(M),f(!0),M.addEventListener("end",()=>{i.current=null,f(!1)})}catch{m("⚠️ لا يوجد جهاز VR متصل. لتجربة VR استخدم: Google Cardboard أو Oculus Quest")}},v=()=>{d("click"),i.current?.end().catch(()=>{})};return Mn.jsxs("div",{className:"fixed inset-0 z-[60] bg-foam",children:[Mn.jsx("div",{ref:s,style:{position:"fixed",inset:0}}),!u&&Mn.jsxs(Mn.Fragment,{children:[Mn.jsxs("div",{className:"absolute top-3 left-1/2 -translate-x-1/2 z-10 text-center bg-paper/90 border-2 border-turquoise/40 px-5 py-2.5 rounded-2xl shadow-md",children:[Mn.jsx("h1",{className:"font-display text-base font-extrabold text-ink",children:"🥽 جولة افتراضية في قرية النخلة"}),Mn.jsx("p",{className:"text-xs text-ink/60",children:"استخدم الماوس للنظر | اضغط VR للدخول للواقع الافتراضي"})]}),Mn.jsxs(Ip,{to:"/arcade",onClick:()=>d("click"),className:"absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 bg-paper/90 border-2 border-turquoise/40 rounded-full px-3.5 py-2 text-xs font-bold text-deepsea shadow-md hover:bg-turquoise/10 transition-colors",children:[Mn.jsx(C3,{className:"w-4 h-4"}),"عودة"]}),Mn.jsxs("div",{className:"absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2",children:[p&&Mn.jsx("div",{className:"bg-coral/15 border-2 border-coral/50 text-ink text-xs font-semibold rounded-xl px-4 py-2 max-w-xs text-center",children:p}),Mn.jsxs("button",{onClick:_,disabled:r===!1,className:"inline-flex items-center gap-2 bg-gradient-to-l from-turquoise to-deepsea text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-95 transition-transform",children:[Mn.jsx(D3,{className:"w-5 h-5"}),r===!1?"❌ المتصفح لا يدعم VR":"🥽 دخول VR"]})]})]}),u&&Mn.jsxs("button",{onClick:v,className:"absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 bg-coral text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg",children:[Mn.jsx(L3,{className:"w-4 h-4"}),"خروج"]})]})}SM.createRoot(document.getElementById("root")).render(Mn.jsx(pl.StrictMode,{children:Mn.jsx(XE,{children:Mn.jsx(SE,{children:Mn.jsx(Sx,{path:"*",element:Mn.jsx(q3,{})})})})}));
