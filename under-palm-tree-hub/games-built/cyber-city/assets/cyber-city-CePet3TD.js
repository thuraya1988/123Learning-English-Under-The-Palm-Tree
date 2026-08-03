(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();function fy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Vh={exports:{}},tl={};var H_;function hy(){if(H_)return tl;H_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,u){var f=null;if(u!==void 0&&(f=""+u),l.key!==void 0&&(f=""+l.key),"key"in l){u={};for(var p in l)p!=="key"&&(u[p]=l[p])}else u=l;return l=u.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:u}}return tl.Fragment=t,tl.jsx=i,tl.jsxs=i,tl}var G_;function dy(){return G_||(G_=1,Vh.exports=hy()),Vh.exports}var xn=dy(),kh={exports:{}},ue={};var V_;function py(){if(V_)return ue;V_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),_=Symbol.iterator;function y(P){return P===null||typeof P!="object"?null:(P=_&&P[_]||P["@@iterator"],typeof P=="function"?P:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,x={};function S(P,K,Mt){this.props=P,this.context=K,this.refs=x,this.updater=Mt||b}S.prototype.isReactComponent={},S.prototype.setState=function(P,K){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,K,"setState")},S.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function D(){}D.prototype=S.prototype;function O(P,K,Mt){this.props=P,this.context=K,this.refs=x,this.updater=Mt||b}var w=O.prototype=new D;w.constructor=O,C(w,S.prototype),w.isPureReactComponent=!0;var I=Array.isArray;function U(){}var F={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function N(P,K,Mt){var Tt=Mt.ref;return{$$typeof:r,type:P,key:K,ref:Tt!==void 0?Tt:null,props:Mt}}function k(P,K){return N(P.type,K,P.props)}function G(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function W(P){var K={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(Mt){return K[Mt]})}var ut=/\/+/g;function ct(P,K){return typeof P=="object"&&P!==null&&P.key!=null?W(""+P.key):K.toString(36)}function Z(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(U,U):(P.status="pending",P.then(function(K){P.status==="pending"&&(P.status="fulfilled",P.value=K)},function(K){P.status==="pending"&&(P.status="rejected",P.reason=K)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function B(P,K,Mt,Tt,Ut){var at=typeof P;(at==="undefined"||at==="boolean")&&(P=null);var yt=!1;if(P===null)yt=!0;else switch(at){case"bigint":case"string":case"number":yt=!0;break;case"object":switch(P.$$typeof){case r:case t:yt=!0;break;case g:return yt=P._init,B(yt(P._payload),K,Mt,Tt,Ut)}}if(yt)return Ut=Ut(P),yt=Tt===""?"."+ct(P,0):Tt,I(Ut)?(Mt="",yt!=null&&(Mt=yt.replace(ut,"$&/")+"/"),B(Ut,K,Mt,"",function(se){return se})):Ut!=null&&(G(Ut)&&(Ut=k(Ut,Mt+(Ut.key==null||P&&P.key===Ut.key?"":(""+Ut.key).replace(ut,"$&/")+"/")+yt)),K.push(Ut)),1;yt=0;var St=Tt===""?".":Tt+":";if(I(P))for(var Gt=0;Gt<P.length;Gt++)Tt=P[Gt],at=St+ct(Tt,Gt),yt+=B(Tt,K,Mt,at,Ut);else if(Gt=y(P),typeof Gt=="function")for(P=Gt.call(P),Gt=0;!(Tt=P.next()).done;)Tt=Tt.value,at=St+ct(Tt,Gt++),yt+=B(Tt,K,Mt,at,Ut);else if(at==="object"){if(typeof P.then=="function")return B(Z(P),K,Mt,Tt,Ut);throw K=String(P),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.")}return yt}function H(P,K,Mt){if(P==null)return P;var Tt=[],Ut=0;return B(P,Tt,"","",function(at){return K.call(Mt,at,Ut++)}),Tt}function $(P){if(P._status===-1){var K=P._result;K=K(),K.then(function(Mt){(P._status===0||P._status===-1)&&(P._status=1,P._result=Mt)},function(Mt){(P._status===0||P._status===-1)&&(P._status=2,P._result=Mt)}),P._status===-1&&(P._status=0,P._result=K)}if(P._status===1)return P._result.default;throw P._result}var _t=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var K=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(K))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Et={map:H,forEach:function(P,K,Mt){H(P,function(){K.apply(this,arguments)},Mt)},count:function(P){var K=0;return H(P,function(){K++}),K},toArray:function(P){return H(P,function(K){return K})||[]},only:function(P){if(!G(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return ue.Activity=v,ue.Children=Et,ue.Component=S,ue.Fragment=i,ue.Profiler=l,ue.PureComponent=O,ue.StrictMode=s,ue.Suspense=m,ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=F,ue.__COMPILER_RUNTIME={__proto__:null,c:function(P){return F.H.useMemoCache(P)}},ue.cache=function(P){return function(){return P.apply(null,arguments)}},ue.cacheSignal=function(){return null},ue.cloneElement=function(P,K,Mt){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Tt=C({},P.props),Ut=P.key;if(K!=null)for(at in K.key!==void 0&&(Ut=""+K.key),K)!T.call(K,at)||at==="key"||at==="__self"||at==="__source"||at==="ref"&&K.ref===void 0||(Tt[at]=K[at]);var at=arguments.length-2;if(at===1)Tt.children=Mt;else if(1<at){for(var yt=Array(at),St=0;St<at;St++)yt[St]=arguments[St+2];Tt.children=yt}return N(P.type,Ut,Tt)},ue.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:u,_context:P},P},ue.createElement=function(P,K,Mt){var Tt,Ut={},at=null;if(K!=null)for(Tt in K.key!==void 0&&(at=""+K.key),K)T.call(K,Tt)&&Tt!=="key"&&Tt!=="__self"&&Tt!=="__source"&&(Ut[Tt]=K[Tt]);var yt=arguments.length-2;if(yt===1)Ut.children=Mt;else if(1<yt){for(var St=Array(yt),Gt=0;Gt<yt;Gt++)St[Gt]=arguments[Gt+2];Ut.children=St}if(P&&P.defaultProps)for(Tt in yt=P.defaultProps,yt)Ut[Tt]===void 0&&(Ut[Tt]=yt[Tt]);return N(P,at,Ut)},ue.createRef=function(){return{current:null}},ue.forwardRef=function(P){return{$$typeof:p,render:P}},ue.isValidElement=G,ue.lazy=function(P){return{$$typeof:g,_payload:{_status:-1,_result:P},_init:$}},ue.memo=function(P,K){return{$$typeof:d,type:P,compare:K===void 0?null:K}},ue.startTransition=function(P){var K=F.T,Mt={};F.T=Mt;try{var Tt=P(),Ut=F.S;Ut!==null&&Ut(Mt,Tt),typeof Tt=="object"&&Tt!==null&&typeof Tt.then=="function"&&Tt.then(U,_t)}catch(at){_t(at)}finally{K!==null&&Mt.types!==null&&(K.types=Mt.types),F.T=K}},ue.unstable_useCacheRefresh=function(){return F.H.useCacheRefresh()},ue.use=function(P){return F.H.use(P)},ue.useActionState=function(P,K,Mt){return F.H.useActionState(P,K,Mt)},ue.useCallback=function(P,K){return F.H.useCallback(P,K)},ue.useContext=function(P){return F.H.useContext(P)},ue.useDebugValue=function(){},ue.useDeferredValue=function(P,K){return F.H.useDeferredValue(P,K)},ue.useEffect=function(P,K){return F.H.useEffect(P,K)},ue.useEffectEvent=function(P){return F.H.useEffectEvent(P)},ue.useId=function(){return F.H.useId()},ue.useImperativeHandle=function(P,K,Mt){return F.H.useImperativeHandle(P,K,Mt)},ue.useInsertionEffect=function(P,K){return F.H.useInsertionEffect(P,K)},ue.useLayoutEffect=function(P,K){return F.H.useLayoutEffect(P,K)},ue.useMemo=function(P,K){return F.H.useMemo(P,K)},ue.useOptimistic=function(P,K){return F.H.useOptimistic(P,K)},ue.useReducer=function(P,K,Mt){return F.H.useReducer(P,K,Mt)},ue.useRef=function(P){return F.H.useRef(P)},ue.useState=function(P){return F.H.useState(P)},ue.useSyncExternalStore=function(P,K,Mt){return F.H.useSyncExternalStore(P,K,Mt)},ue.useTransition=function(){return F.H.useTransition()},ue.version="19.2.3",ue}var k_;function bp(){return k_||(k_=1,kh.exports=py()),kh.exports}var mt=bp();const my=fy(mt);var Xh={exports:{}},el={},Wh={exports:{}},qh={};var X_;function gy(){return X_||(X_=1,(function(r){function t(B,H){var $=B.length;B.push(H);t:for(;0<$;){var _t=$-1>>>1,Et=B[_t];if(0<l(Et,H))B[_t]=H,B[$]=Et,$=_t;else break t}}function i(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var H=B[0],$=B.pop();if($!==H){B[0]=$;t:for(var _t=0,Et=B.length,P=Et>>>1;_t<P;){var K=2*(_t+1)-1,Mt=B[K],Tt=K+1,Ut=B[Tt];if(0>l(Mt,$))Tt<Et&&0>l(Ut,Mt)?(B[_t]=Ut,B[Tt]=$,_t=Tt):(B[_t]=Mt,B[K]=$,_t=K);else if(Tt<Et&&0>l(Ut,$))B[_t]=Ut,B[Tt]=$,_t=Tt;else break t}}return H}function l(B,H){var $=B.sortIndex-H.sortIndex;return $!==0?$:B.id-H.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;r.unstable_now=function(){return u.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],d=[],g=1,v=null,_=3,y=!1,b=!1,C=!1,x=!1,S=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function w(B){for(var H=i(d);H!==null;){if(H.callback===null)s(d);else if(H.startTime<=B)s(d),H.sortIndex=H.expirationTime,t(m,H);else break;H=i(d)}}function I(B){if(C=!1,w(B),!b)if(i(m)!==null)b=!0,U||(U=!0,W());else{var H=i(d);H!==null&&Z(I,H.startTime-B)}}var U=!1,F=-1,T=5,N=-1;function k(){return x?!0:!(r.unstable_now()-N<T)}function G(){if(x=!1,U){var B=r.unstable_now();N=B;var H=!0;try{t:{b=!1,C&&(C=!1,D(F),F=-1),y=!0;var $=_;try{e:{for(w(B),v=i(m);v!==null&&!(v.expirationTime>B&&k());){var _t=v.callback;if(typeof _t=="function"){v.callback=null,_=v.priorityLevel;var Et=_t(v.expirationTime<=B);if(B=r.unstable_now(),typeof Et=="function"){v.callback=Et,w(B),H=!0;break e}v===i(m)&&s(m),w(B)}else s(m);v=i(m)}if(v!==null)H=!0;else{var P=i(d);P!==null&&Z(I,P.startTime-B),H=!1}}break t}finally{v=null,_=$,y=!1}H=void 0}}finally{H?W():U=!1}}}var W;if(typeof O=="function")W=function(){O(G)};else if(typeof MessageChannel<"u"){var ut=new MessageChannel,ct=ut.port2;ut.port1.onmessage=G,W=function(){ct.postMessage(null)}}else W=function(){S(G,0)};function Z(B,H){F=S(function(){B(r.unstable_now())},H)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_next=function(B){switch(_){case 1:case 2:case 3:var H=3;break;default:H=_}var $=_;_=H;try{return B()}finally{_=$}},r.unstable_requestPaint=function(){x=!0},r.unstable_runWithPriority=function(B,H){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var $=_;_=B;try{return H()}finally{_=$}},r.unstable_scheduleCallback=function(B,H,$){var _t=r.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?_t+$:_t):$=_t,B){case 1:var Et=-1;break;case 2:Et=250;break;case 5:Et=1073741823;break;case 4:Et=1e4;break;default:Et=5e3}return Et=$+Et,B={id:g++,callback:H,priorityLevel:B,startTime:$,expirationTime:Et,sortIndex:-1},$>_t?(B.sortIndex=$,t(d,B),i(m)===null&&B===i(d)&&(C?(D(F),F=-1):C=!0,Z(I,$-_t))):(B.sortIndex=Et,t(m,B),b||y||(b=!0,U||(U=!0,W()))),B},r.unstable_shouldYield=k,r.unstable_wrapCallback=function(B){var H=_;return function(){var $=_;_=H;try{return B.apply(this,arguments)}finally{_=$}}}})(qh)),qh}var W_;function _y(){return W_||(W_=1,Wh.exports=gy()),Wh.exports}var Yh={exports:{}},Fn={};var q_;function vy(){if(q_)return Fn;q_=1;var r=bp();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)d+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,d,g){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:d,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Fn.createPortal=function(m,d){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return u(m,d,null,g)},Fn.flushSync=function(m){var d=f.T,g=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=d,s.p=g,s.d.f()}},Fn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,s.d.C(m,d))},Fn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Fn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var g=d.as,v=p(g,d.crossOrigin),_=typeof d.integrity=="string"?d.integrity:void 0,y=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;g==="style"?s.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:_,fetchPriority:y}):g==="script"&&s.d.X(m,{crossOrigin:v,integrity:_,fetchPriority:y,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Fn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var g=p(d.as,d.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&s.d.M(m)},Fn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var g=d.as,v=p(g,d.crossOrigin);s.d.L(m,g,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Fn.preloadModule=function(m,d){if(typeof m=="string")if(d){var g=p(d.as,d.crossOrigin);s.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else s.d.m(m)},Fn.requestFormReset=function(m){s.d.r(m)},Fn.unstable_batchedUpdates=function(m,d){return m(d)},Fn.useFormState=function(m,d,g){return f.H.useFormState(m,d,g)},Fn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Fn.version="19.2.3",Fn}var Y_;function xy(){if(Y_)return Yh.exports;Y_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Yh.exports=vy(),Yh.exports}var Z_;function Sy(){if(Z_)return el;Z_=1;var r=_y(),t=bp(),i=xy();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(u(e)!==e)throw Error(s(188))}function d(e){var n=e.alternate;if(!n){if(n=u(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var c=a.return;if(c===null)break;var h=c.alternate;if(h===null){if(o=c.return,o!==null){a=o;continue}break}if(c.child===h.child){for(h=c.child;h;){if(h===a)return m(c),e;if(h===o)return m(c),n;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=c,o=h;else{for(var M=!1,R=c.child;R;){if(R===a){M=!0,a=c,o=h;break}if(R===o){M=!0,o=c,a=h;break}R=R.sibling}if(!M){for(R=h.child;R;){if(R===a){M=!0,a=h,o=c;break}if(R===o){M=!0,o=h,a=c;break}R=R.sibling}if(!M)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,_=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),O=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),I=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),F=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),N=Symbol.for("react.activity"),k=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var ut=Symbol.for("react.client.reference");function ct(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ut?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case C:return"Fragment";case S:return"Profiler";case x:return"StrictMode";case I:return"Suspense";case U:return"SuspenseList";case N:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case O:return e.displayName||"Context";case D:return(e._context.displayName||"Context")+".Consumer";case w:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case F:return n=e.displayName||null,n!==null?n:ct(e.type)||"Memo";case T:n=e._payload,e=e._init;try{return ct(e(n))}catch{}}return null}var Z=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$={pending:!1,data:null,method:null,action:null},_t=[],Et=-1;function P(e){return{current:e}}function K(e){0>Et||(e.current=_t[Et],_t[Et]=null,Et--)}function Mt(e,n){Et++,_t[Et]=e.current,e.current=n}var Tt=P(null),Ut=P(null),at=P(null),yt=P(null);function St(e,n){switch(Mt(at,n),Mt(Ut,e),Mt(Tt,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?u_(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=u_(n),e=c_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}K(Tt),Mt(Tt,e)}function Gt(){K(Tt),K(Ut),K(at)}function se(e){e.memoizedState!==null&&Mt(yt,e);var n=Tt.current,a=c_(n,e.type);n!==a&&(Mt(Ut,e),Mt(Tt,a))}function $t(e){Ut.current===e&&(K(Tt),K(Ut)),yt.current===e&&(K(yt),Qo._currentValue=$)}var Ge,fe;function Pt(e){if(Ge===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Ge=n&&n[1]||"",fe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ge+e+fe}var Yt=!1;function Kt(e,n){if(!e||Yt)return"";Yt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var xt=function(){throw Error()};if(Object.defineProperty(xt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(xt,[])}catch(lt){var ot=lt}Reflect.construct(e,[],xt)}else{try{xt.call()}catch(lt){ot=lt}e.call(xt.prototype)}}else{try{throw Error()}catch(lt){ot=lt}(xt=e())&&typeof xt.catch=="function"&&xt.catch(function(){})}}catch(lt){if(lt&&ot&&typeof lt.stack=="string")return[lt.stack,ot.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),M=h[0],R=h[1];if(M&&R){var z=M.split(`
`),et=R.split(`
`);for(c=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;c<et.length&&!et[c].includes("DetermineComponentFrameRoot");)c++;if(o===z.length||c===et.length)for(o=z.length-1,c=et.length-1;1<=o&&0<=c&&z[o]!==et[c];)c--;for(;1<=o&&0<=c;o--,c--)if(z[o]!==et[c]){if(o!==1||c!==1)do if(o--,c--,0>c||z[o]!==et[c]){var pt=`
`+z[o].replace(" at new "," at ");return e.displayName&&pt.includes("<anonymous>")&&(pt=pt.replace("<anonymous>",e.displayName)),pt}while(1<=o&&0<=c);break}}}finally{Yt=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Pt(a):""}function Te(e,n){switch(e.tag){case 26:case 27:case 5:return Pt(e.type);case 16:return Pt("Lazy");case 13:return e.child!==n&&n!==null?Pt("Suspense Fallback"):Pt("Suspense");case 19:return Pt("SuspenseList");case 0:case 15:return Kt(e.type,!1);case 11:return Kt(e.type.render,!1);case 1:return Kt(e.type,!0);case 31:return Pt("Activity");default:return""}}function Ve(e){try{var n="",a=null;do n+=Te(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Qe=Object.prototype.hasOwnProperty,ke=r.unstable_scheduleCallback,Ue=r.unstable_cancelCallback,$e=r.unstable_shouldYield,q=r.unstable_requestPaint,Le=r.unstable_now,be=r.unstable_getCurrentPriorityLevel,L=r.unstable_ImmediatePriority,E=r.unstable_UserBlockingPriority,j=r.unstable_NormalPriority,st=r.unstable_LowPriority,ht=r.unstable_IdlePriority,At=r.log,Dt=r.unstable_setDisableYieldValue,ft=null,dt=null;function Ct(e){if(typeof At=="function"&&Dt(e),dt&&typeof dt.setStrictMode=="function")try{dt.setStrictMode(ft,e)}catch{}}var zt=Math.clz32?Math.clz32:te,Ot=Math.log,Lt=Math.LN2;function te(e){return e>>>=0,e===0?32:31-(Ot(e)/Lt|0)|0}var ee=256,oe=262144,X=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var c=0,h=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var R=o&134217727;return R!==0?(o=R&~h,o!==0?c=Rt(o):(M&=R,M!==0?c=Rt(M):a||(a=R&~e,a!==0&&(c=Rt(a))))):(R=o&~h,R!==0?c=Rt(R):M!==0?c=Rt(M):a||(a=o&~e,a!==0&&(c=Rt(a)))),c===0?0:n!==0&&n!==c&&(n&h)===0&&(h=c&-c,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:c}function wt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Bt(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bt(){var e=X;return X<<=1,(X&62914560)===0&&(X=4194304),e}function Zt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function kt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function tn(e,n,a,o,c,h){var M=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var R=e.entanglements,z=e.expirationTimes,et=e.hiddenUpdates;for(a=M&~a;0<a;){var pt=31-zt(a),xt=1<<pt;R[pt]=0,z[pt]=-1;var ot=et[pt];if(ot!==null)for(et[pt]=null,pt=0;pt<ot.length;pt++){var lt=ot[pt];lt!==null&&(lt.lane&=-536870913)}a&=~xt}o!==0&&Oe(e,o,0),h!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=h&~(M&~n))}function Oe(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-zt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function ii(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-zt(a),c=1<<o;c&n|e[o]&n&&(e[o]|=n),a&=~c}}function ai(e,n){var a=n&-n;return a=(a&42)!==0?1:uo(a),(a&(e.suspendedLanes|n))!==0?0:a}function uo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function co(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function fo(){var e=H.p;return e!==0?e:(e=window.event,e===void 0?32:N_(e.type))}function $s(e,n){var a=H.p;try{return H.p=e,n()}finally{H.p=a}}var Vi=Math.random().toString(36).slice(2),hn="__reactFiber$"+Vi,wn="__reactProps$"+Vi,qn="__reactContainer$"+Vi,Ss="__reactEvents$"+Vi,yl="__reactListeners$"+Vi,El="__reactHandles$"+Vi,Ms="__reactResources$"+Vi,Pa="__reactMarker$"+Vi;function Oa(e){delete e[hn],delete e[wn],delete e[Ss],delete e[yl],delete e[El]}function ia(e){var n=e[hn];if(n)return n;for(var a=e.parentNode;a;){if(n=a[qn]||a[hn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=__(e);e!==null;){if(a=e[hn])return a;e=__(e)}return n}e=a,a=e.parentNode}return null}function aa(e){if(e=e[hn]||e[qn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function ys(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Ia(e){var n=e[Ms];return n||(n=e[Ms]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function dn(e){e[Pa]=!0}var bl=new Set,A={};function Y(e,n){rt(e,n),rt(e+"Capture",n)}function rt(e,n){for(A[e]=n,e=0;e<n.length;e++)bl.add(n[e])}var nt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),it={},It={};function Vt(e){return Qe.call(It,e)?!0:Qe.call(it,e)?!1:nt.test(e)?It[e]=!0:(it[e]=!0,!1)}function Nt(e,n,a){if(Vt(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Wt(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Xt(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function ne(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function he(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Jt(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(M){a=""+M,h.call(this,M)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(M){a=""+M},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Re(e){if(!e._valueTracker){var n=he(e)?"checked":"value";e._valueTracker=Jt(e,n,""+e[n])}}function en(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=he(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Ze(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ie=/[\n"\\]/g;function Fe(e){return e.replace(Ie,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ht(e,n,a,o,c,h,M,R){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),n!=null?M==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+ne(n)):e.value!==""+ne(n)&&(e.value=""+ne(n)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),n!=null?_e(e,M,ne(n)):a!=null?_e(e,M,ne(a)):o!=null&&e.removeAttribute("value"),c==null&&h!=null&&(e.defaultChecked=!!h),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?e.name=""+ne(R):e.removeAttribute("name")}function In(e,n,a,o,c,h,M,R){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Re(e);return}a=a!=null?""+ne(a):"",n=n!=null?""+ne(n):a,R||n===e.value||(e.value=n),e.defaultValue=n}o=o??c,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=R?e.checked:!!o,e.defaultChecked=!!o,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Re(e)}function _e(e,n,a){n==="number"&&Ze(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function yn(e,n,a,o){if(e=e.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<e.length;a++)c=n.hasOwnProperty("$"+e[a].value),e[a].selected!==c&&(e[a].selected=c),c&&o&&(e[a].defaultSelected=!0)}else{for(a=""+ne(a),n=null,c=0;c<e.length;c++){if(e[c].value===a){e[c].selected=!0,o&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function si(e,n,a){if(n!=null&&(n=""+ne(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+ne(a):""}function Ui(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(Z(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=ne(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Re(e)}function ri(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Be=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function nn(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||Be.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Li(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var c in n)o=n[c],n.hasOwnProperty(c)&&a[c]!==o&&nn(e,c,o)}else for(var h in n)n.hasOwnProperty(h)&&nn(e,h,n[h])}function Ne(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ki=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Fa=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Es(e){return Fa.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function sa(){}var Bc=null;function zc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var tr=null,er=null;function lm(e){var n=aa(e);if(n&&(e=n.stateNode)){var a=e[wn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Ht(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Fe(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var c=o[wn]||null;if(!c)throw Error(s(90));Ht(o,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&en(o)}break t;case"textarea":si(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&yn(e,!!a.multiple,n,!1)}}}var Hc=!1;function um(e,n,a){if(Hc)return e(n,a);Hc=!0;try{var o=e(n);return o}finally{if(Hc=!1,(tr!==null||er!==null)&&(fu(),tr&&(n=tr,e=er,er=tr=null,lm(n),e)))for(n=0;n<e.length;n++)lm(e[n])}}function ho(e,n){var a=e.stateNode;if(a===null)return null;var o=a[wn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ra=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Gc=!1;if(ra)try{var po={};Object.defineProperty(po,"passive",{get:function(){Gc=!0}}),window.addEventListener("test",po,po),window.removeEventListener("test",po,po)}catch{Gc=!1}var Ba=null,Vc=null,Tl=null;function cm(){if(Tl)return Tl;var e,n=Vc,a=n.length,o,c="value"in Ba?Ba.value:Ba.textContent,h=c.length;for(e=0;e<a&&n[e]===c[e];e++);var M=a-e;for(o=1;o<=M&&n[a-o]===c[h-o];o++);return Tl=c.slice(e,1<o?1-o:void 0)}function Al(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Rl(){return!0}function fm(){return!1}function Yn(e){function n(a,o,c,h,M){this._reactName=a,this._targetInst=c,this.type=o,this.nativeEvent=h,this.target=M,this.currentTarget=null;for(var R in e)e.hasOwnProperty(R)&&(a=e[R],this[R]=a?a(h):h[R]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Rl:fm,this.isPropagationStopped=fm,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Rl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Rl)},persist:function(){},isPersistent:Rl}),n}var bs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cl=Yn(bs),mo=v({},bs,{view:0,detail:0}),uS=Yn(mo),kc,Xc,go,wl=v({},mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==go&&(go&&e.type==="mousemove"?(kc=e.screenX-go.screenX,Xc=e.screenY-go.screenY):Xc=kc=0,go=e),kc)},movementY:function(e){return"movementY"in e?e.movementY:Xc}}),hm=Yn(wl),cS=v({},wl,{dataTransfer:0}),fS=Yn(cS),hS=v({},mo,{relatedTarget:0}),Wc=Yn(hS),dS=v({},bs,{animationName:0,elapsedTime:0,pseudoElement:0}),pS=Yn(dS),mS=v({},bs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gS=Yn(mS),_S=v({},bs,{data:0}),dm=Yn(_S),vS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},SS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function MS(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=SS[e])?!!n[e]:!1}function qc(){return MS}var yS=v({},mo,{key:function(e){if(e.key){var n=vS[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Al(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qc,charCode:function(e){return e.type==="keypress"?Al(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Al(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ES=Yn(yS),bS=v({},wl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),pm=Yn(bS),TS=v({},mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qc}),AS=Yn(TS),RS=v({},bs,{propertyName:0,elapsedTime:0,pseudoElement:0}),CS=Yn(RS),wS=v({},wl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),DS=Yn(wS),US=v({},bs,{newState:0,oldState:0}),LS=Yn(US),NS=[9,13,27,32],Yc=ra&&"CompositionEvent"in window,_o=null;ra&&"documentMode"in document&&(_o=document.documentMode);var PS=ra&&"TextEvent"in window&&!_o,mm=ra&&(!Yc||_o&&8<_o&&11>=_o),gm=" ",_m=!1;function vm(e,n){switch(e){case"keyup":return NS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var nr=!1;function OS(e,n){switch(e){case"compositionend":return xm(n);case"keypress":return n.which!==32?null:(_m=!0,gm);case"textInput":return e=n.data,e===gm&&_m?null:e;default:return null}}function IS(e,n){if(nr)return e==="compositionend"||!Yc&&vm(e,n)?(e=cm(),Tl=Vc=Ba=null,nr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return mm&&n.locale!=="ko"?null:n.data;default:return null}}var FS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sm(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!FS[e.type]:n==="textarea"}function Mm(e,n,a,o){tr?er?er.push(o):er=[o]:tr=o,n=vu(n,"onChange"),0<n.length&&(a=new Cl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var vo=null,xo=null;function BS(e){i_(e,0)}function Dl(e){var n=ys(e);if(en(n))return e}function ym(e,n){if(e==="change")return n}var Em=!1;if(ra){var Zc;if(ra){var Kc="oninput"in document;if(!Kc){var bm=document.createElement("div");bm.setAttribute("oninput","return;"),Kc=typeof bm.oninput=="function"}Zc=Kc}else Zc=!1;Em=Zc&&(!document.documentMode||9<document.documentMode)}function Tm(){vo&&(vo.detachEvent("onpropertychange",Am),xo=vo=null)}function Am(e){if(e.propertyName==="value"&&Dl(xo)){var n=[];Mm(n,xo,e,zc(e)),um(BS,n)}}function zS(e,n,a){e==="focusin"?(Tm(),vo=n,xo=a,vo.attachEvent("onpropertychange",Am)):e==="focusout"&&Tm()}function HS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Dl(xo)}function GS(e,n){if(e==="click")return Dl(n)}function VS(e,n){if(e==="input"||e==="change")return Dl(n)}function kS(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var oi=typeof Object.is=="function"?Object.is:kS;function So(e,n){if(oi(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var c=a[o];if(!Qe.call(n,c)||!oi(e[c],n[c]))return!1}return!0}function Rm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Cm(e,n){var a=Rm(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Rm(a)}}function wm(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?wm(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Dm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ze(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Ze(e.document)}return n}function Qc(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var XS=ra&&"documentMode"in document&&11>=document.documentMode,ir=null,Jc=null,Mo=null,jc=!1;function Um(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;jc||ir==null||ir!==Ze(o)||(o=ir,"selectionStart"in o&&Qc(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Mo&&So(Mo,o)||(Mo=o,o=vu(Jc,"onSelect"),0<o.length&&(n=new Cl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=ir)))}function Ts(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var ar={animationend:Ts("Animation","AnimationEnd"),animationiteration:Ts("Animation","AnimationIteration"),animationstart:Ts("Animation","AnimationStart"),transitionrun:Ts("Transition","TransitionRun"),transitionstart:Ts("Transition","TransitionStart"),transitioncancel:Ts("Transition","TransitionCancel"),transitionend:Ts("Transition","TransitionEnd")},$c={},Lm={};ra&&(Lm=document.createElement("div").style,"AnimationEvent"in window||(delete ar.animationend.animation,delete ar.animationiteration.animation,delete ar.animationstart.animation),"TransitionEvent"in window||delete ar.transitionend.transition);function As(e){if($c[e])return $c[e];if(!ar[e])return e;var n=ar[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Lm)return $c[e]=n[a];return e}var Nm=As("animationend"),Pm=As("animationiteration"),Om=As("animationstart"),WS=As("transitionrun"),qS=As("transitionstart"),YS=As("transitioncancel"),Im=As("transitionend"),Fm=new Map,tf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");tf.push("scrollEnd");function Ni(e,n){Fm.set(e,n),Y(n,[e])}var Ul=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Si=[],sr=0,ef=0;function Ll(){for(var e=sr,n=ef=sr=0;n<e;){var a=Si[n];Si[n++]=null;var o=Si[n];Si[n++]=null;var c=Si[n];Si[n++]=null;var h=Si[n];if(Si[n++]=null,o!==null&&c!==null){var M=o.pending;M===null?c.next=c:(c.next=M.next,M.next=c),o.pending=c}h!==0&&Bm(a,c,h)}}function Nl(e,n,a,o){Si[sr++]=e,Si[sr++]=n,Si[sr++]=a,Si[sr++]=o,ef|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function nf(e,n,a,o){return Nl(e,n,a,o),Pl(e)}function Rs(e,n){return Nl(e,null,null,n),Pl(e)}function Bm(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var c=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(c=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,c&&n!==null&&(c=31-zt(a),e=h.hiddenUpdates,o=e[c],o===null?e[c]=[n]:o.push(n),n.lane=a|536870912),h):null}function Pl(e){if(50<ko)throw ko=0,hh=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var rr={};function ZS(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function li(e,n,a,o){return new ZS(e,n,a,o)}function af(e){return e=e.prototype,!(!e||!e.isReactComponent)}function oa(e,n){var a=e.alternate;return a===null?(a=li(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function zm(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Ol(e,n,a,o,c,h){var M=0;if(o=e,typeof e=="function")af(e)&&(M=1);else if(typeof e=="string")M=$M(e,a,Tt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case N:return e=li(31,a,n,c),e.elementType=N,e.lanes=h,e;case C:return Cs(a.children,c,h,n);case x:M=8,c|=24;break;case S:return e=li(12,a,n,c|2),e.elementType=S,e.lanes=h,e;case I:return e=li(13,a,n,c),e.elementType=I,e.lanes=h,e;case U:return e=li(19,a,n,c),e.elementType=U,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case O:M=10;break t;case D:M=9;break t;case w:M=11;break t;case F:M=14;break t;case T:M=16,o=null;break t}M=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=li(M,a,n,c),n.elementType=e,n.type=o,n.lanes=h,n}function Cs(e,n,a,o){return e=li(7,e,o,n),e.lanes=a,e}function sf(e,n,a){return e=li(6,e,null,n),e.lanes=a,e}function Hm(e){var n=li(18,null,null,0);return n.stateNode=e,n}function rf(e,n,a){return n=li(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Gm=new WeakMap;function Mi(e,n){if(typeof e=="object"&&e!==null){var a=Gm.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Ve(n)},Gm.set(e,n),n)}return{value:e,source:n,stack:Ve(n)}}var or=[],lr=0,Il=null,yo=0,yi=[],Ei=0,za=null,Xi=1,Wi="";function la(e,n){or[lr++]=yo,or[lr++]=Il,Il=e,yo=n}function Vm(e,n,a){yi[Ei++]=Xi,yi[Ei++]=Wi,yi[Ei++]=za,za=e;var o=Xi;e=Wi;var c=32-zt(o)-1;o&=~(1<<c),a+=1;var h=32-zt(n)+c;if(30<h){var M=c-c%5;h=(o&(1<<M)-1).toString(32),o>>=M,c-=M,Xi=1<<32-zt(n)+c|a<<c|o,Wi=h+e}else Xi=1<<h|a<<c|o,Wi=e}function of(e){e.return!==null&&(la(e,1),Vm(e,1,0))}function lf(e){for(;e===Il;)Il=or[--lr],or[lr]=null,yo=or[--lr],or[lr]=null;for(;e===za;)za=yi[--Ei],yi[Ei]=null,Wi=yi[--Ei],yi[Ei]=null,Xi=yi[--Ei],yi[Ei]=null}function km(e,n){yi[Ei++]=Xi,yi[Ei++]=Wi,yi[Ei++]=za,Xi=n.id,Wi=n.overflow,za=e}var Dn=null,Je=null,Ee=!1,Ha=null,bi=!1,uf=Error(s(519));function Ga(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Eo(Mi(n,e)),uf}function Xm(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[hn]=e,n[wn]=o,a){case"dialog":xe("cancel",n),xe("close",n);break;case"iframe":case"object":case"embed":xe("load",n);break;case"video":case"audio":for(a=0;a<Wo.length;a++)xe(Wo[a],n);break;case"source":xe("error",n);break;case"img":case"image":case"link":xe("error",n),xe("load",n);break;case"details":xe("toggle",n);break;case"input":xe("invalid",n),In(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":xe("invalid",n);break;case"textarea":xe("invalid",n),Ui(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||o_(n.textContent,a)?(o.popover!=null&&(xe("beforetoggle",n),xe("toggle",n)),o.onScroll!=null&&xe("scroll",n),o.onScrollEnd!=null&&xe("scrollend",n),o.onClick!=null&&(n.onclick=sa),n=!0):n=!1,n||Ga(e,!0)}function Wm(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:bi=!1;return;case 27:case 3:bi=!0;return;default:Dn=Dn.return}}function ur(e){if(e!==Dn)return!1;if(!Ee)return Wm(e),Ee=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Rh(e.type,e.memoizedProps)),a=!a),a&&Je&&Ga(e),Wm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Je=g_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Je=g_(e)}else n===27?(n=Je,es(e.type)?(e=Lh,Lh=null,Je=e):Je=n):Je=Dn?Ai(e.stateNode.nextSibling):null;return!0}function ws(){Je=Dn=null,Ee=!1}function cf(){var e=Ha;return e!==null&&(Jn===null?Jn=e:Jn.push.apply(Jn,e),Ha=null),e}function Eo(e){Ha===null?Ha=[e]:Ha.push(e)}var ff=P(null),Ds=null,ua=null;function Va(e,n,a){Mt(ff,n._currentValue),n._currentValue=a}function ca(e){e._currentValue=ff.current,K(ff)}function hf(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function df(e,n,a,o){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var h=c.dependencies;if(h!==null){var M=c.child;h=h.firstContext;t:for(;h!==null;){var R=h;h=c;for(var z=0;z<n.length;z++)if(R.context===n[z]){h.lanes|=a,R=h.alternate,R!==null&&(R.lanes|=a),hf(h.return,a,e),o||(M=null);break t}h=R.next}}else if(c.tag===18){if(M=c.return,M===null)throw Error(s(341));M.lanes|=a,h=M.alternate,h!==null&&(h.lanes|=a),hf(M,a,e),M=null}else M=c.child;if(M!==null)M.return=c;else for(M=c;M!==null;){if(M===e){M=null;break}if(c=M.sibling,c!==null){c.return=M.return,M=c;break}M=M.return}c=M}}function cr(e,n,a,o){e=null;for(var c=n,h=!1;c!==null;){if(!h){if((c.flags&524288)!==0)h=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var M=c.alternate;if(M===null)throw Error(s(387));if(M=M.memoizedProps,M!==null){var R=c.type;oi(c.pendingProps.value,M.value)||(e!==null?e.push(R):e=[R])}}else if(c===yt.current){if(M=c.alternate,M===null)throw Error(s(387));M.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Qo):e=[Qo])}c=c.return}e!==null&&df(n,e,a,o),n.flags|=262144}function Fl(e){for(e=e.firstContext;e!==null;){if(!oi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Us(e){Ds=e,ua=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return qm(Ds,e)}function Bl(e,n){return Ds===null&&Us(e),qm(e,n)}function qm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ua===null){if(e===null)throw Error(s(308));ua=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else ua=ua.next=n;return a}var KS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},QS=r.unstable_scheduleCallback,JS=r.unstable_NormalPriority,pn={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pf(){return{controller:new KS,data:new Map,refCount:0}}function bo(e){e.refCount--,e.refCount===0&&QS(JS,function(){e.controller.abort()})}var To=null,mf=0,fr=0,hr=null;function jS(e,n){if(To===null){var a=To=[];mf=0,fr=vh(),hr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return mf++,n.then(Ym,Ym),n}function Ym(){if(--mf===0&&To!==null){hr!==null&&(hr.status="fulfilled");var e=To;To=null,fr=0,hr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function $S(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(o.status="rejected",o.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),o}var Zm=B.S;B.S=function(e,n){U0=Le(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&jS(e,n),Zm!==null&&Zm(e,n)};var Ls=P(null);function gf(){var e=Ls.current;return e!==null?e:Ke.pooledCache}function zl(e,n){n===null?Mt(Ls,Ls.current):Mt(Ls,n.pool)}function Km(){var e=gf();return e===null?null:{parent:pn._currentValue,pool:e}}var dr=Error(s(460)),_f=Error(s(474)),Hl=Error(s(542)),Gl={then:function(){}};function Qm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Jm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(sa,sa),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,$m(e),e;default:if(typeof n.status=="string")n.then(sa,sa);else{if(e=Ke,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=o}},function(o){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,$m(e),e}throw Ps=n,dr}}function Ns(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ps=a,dr):a}}var Ps=null;function jm(){if(Ps===null)throw Error(s(459));var e=Ps;return Ps=null,e}function $m(e){if(e===dr||e===Hl)throw Error(s(483))}var pr=null,Ao=0;function Vl(e){var n=Ao;return Ao+=1,pr===null&&(pr=[]),Jm(pr,e,n)}function Ro(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function kl(e,n){throw n.$$typeof===_?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function tg(e){function n(Q,V){if(e){var tt=Q.deletions;tt===null?(Q.deletions=[V],Q.flags|=16):tt.push(V)}}function a(Q,V){if(!e)return null;for(;V!==null;)n(Q,V),V=V.sibling;return null}function o(Q){for(var V=new Map;Q!==null;)Q.key!==null?V.set(Q.key,Q):V.set(Q.index,Q),Q=Q.sibling;return V}function c(Q,V){return Q=oa(Q,V),Q.index=0,Q.sibling=null,Q}function h(Q,V,tt){return Q.index=tt,e?(tt=Q.alternate,tt!==null?(tt=tt.index,tt<V?(Q.flags|=67108866,V):tt):(Q.flags|=67108866,V)):(Q.flags|=1048576,V)}function M(Q){return e&&Q.alternate===null&&(Q.flags|=67108866),Q}function R(Q,V,tt,vt){return V===null||V.tag!==6?(V=sf(tt,Q.mode,vt),V.return=Q,V):(V=c(V,tt),V.return=Q,V)}function z(Q,V,tt,vt){var ie=tt.type;return ie===C?pt(Q,V,tt.props.children,vt,tt.key):V!==null&&(V.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===T&&Ns(ie)===V.type)?(V=c(V,tt.props),Ro(V,tt),V.return=Q,V):(V=Ol(tt.type,tt.key,tt.props,null,Q.mode,vt),Ro(V,tt),V.return=Q,V)}function et(Q,V,tt,vt){return V===null||V.tag!==4||V.stateNode.containerInfo!==tt.containerInfo||V.stateNode.implementation!==tt.implementation?(V=rf(tt,Q.mode,vt),V.return=Q,V):(V=c(V,tt.children||[]),V.return=Q,V)}function pt(Q,V,tt,vt,ie){return V===null||V.tag!==7?(V=Cs(tt,Q.mode,vt,ie),V.return=Q,V):(V=c(V,tt),V.return=Q,V)}function xt(Q,V,tt){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=sf(""+V,Q.mode,tt),V.return=Q,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case y:return tt=Ol(V.type,V.key,V.props,null,Q.mode,tt),Ro(tt,V),tt.return=Q,tt;case b:return V=rf(V,Q.mode,tt),V.return=Q,V;case T:return V=Ns(V),xt(Q,V,tt)}if(Z(V)||W(V))return V=Cs(V,Q.mode,tt,null),V.return=Q,V;if(typeof V.then=="function")return xt(Q,Vl(V),tt);if(V.$$typeof===O)return xt(Q,Bl(Q,V),tt);kl(Q,V)}return null}function ot(Q,V,tt,vt){var ie=V!==null?V.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return ie!==null?null:R(Q,V,""+tt,vt);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case y:return tt.key===ie?z(Q,V,tt,vt):null;case b:return tt.key===ie?et(Q,V,tt,vt):null;case T:return tt=Ns(tt),ot(Q,V,tt,vt)}if(Z(tt)||W(tt))return ie!==null?null:pt(Q,V,tt,vt,null);if(typeof tt.then=="function")return ot(Q,V,Vl(tt),vt);if(tt.$$typeof===O)return ot(Q,V,Bl(Q,tt),vt);kl(Q,tt)}return null}function lt(Q,V,tt,vt,ie){if(typeof vt=="string"&&vt!==""||typeof vt=="number"||typeof vt=="bigint")return Q=Q.get(tt)||null,R(V,Q,""+vt,ie);if(typeof vt=="object"&&vt!==null){switch(vt.$$typeof){case y:return Q=Q.get(vt.key===null?tt:vt.key)||null,z(V,Q,vt,ie);case b:return Q=Q.get(vt.key===null?tt:vt.key)||null,et(V,Q,vt,ie);case T:return vt=Ns(vt),lt(Q,V,tt,vt,ie)}if(Z(vt)||W(vt))return Q=Q.get(tt)||null,pt(V,Q,vt,ie,null);if(typeof vt.then=="function")return lt(Q,V,tt,Vl(vt),ie);if(vt.$$typeof===O)return lt(Q,V,tt,Bl(V,vt),ie);kl(V,vt)}return null}function qt(Q,V,tt,vt){for(var ie=null,Ce=null,Qt=V,pe=V=0,Me=null;Qt!==null&&pe<tt.length;pe++){Qt.index>pe?(Me=Qt,Qt=null):Me=Qt.sibling;var we=ot(Q,Qt,tt[pe],vt);if(we===null){Qt===null&&(Qt=Me);break}e&&Qt&&we.alternate===null&&n(Q,Qt),V=h(we,V,pe),Ce===null?ie=we:Ce.sibling=we,Ce=we,Qt=Me}if(pe===tt.length)return a(Q,Qt),Ee&&la(Q,pe),ie;if(Qt===null){for(;pe<tt.length;pe++)Qt=xt(Q,tt[pe],vt),Qt!==null&&(V=h(Qt,V,pe),Ce===null?ie=Qt:Ce.sibling=Qt,Ce=Qt);return Ee&&la(Q,pe),ie}for(Qt=o(Qt);pe<tt.length;pe++)Me=lt(Qt,Q,pe,tt[pe],vt),Me!==null&&(e&&Me.alternate!==null&&Qt.delete(Me.key===null?pe:Me.key),V=h(Me,V,pe),Ce===null?ie=Me:Ce.sibling=Me,Ce=Me);return e&&Qt.forEach(function(rs){return n(Q,rs)}),Ee&&la(Q,pe),ie}function ae(Q,V,tt,vt){if(tt==null)throw Error(s(151));for(var ie=null,Ce=null,Qt=V,pe=V=0,Me=null,we=tt.next();Qt!==null&&!we.done;pe++,we=tt.next()){Qt.index>pe?(Me=Qt,Qt=null):Me=Qt.sibling;var rs=ot(Q,Qt,we.value,vt);if(rs===null){Qt===null&&(Qt=Me);break}e&&Qt&&rs.alternate===null&&n(Q,Qt),V=h(rs,V,pe),Ce===null?ie=rs:Ce.sibling=rs,Ce=rs,Qt=Me}if(we.done)return a(Q,Qt),Ee&&la(Q,pe),ie;if(Qt===null){for(;!we.done;pe++,we=tt.next())we=xt(Q,we.value,vt),we!==null&&(V=h(we,V,pe),Ce===null?ie=we:Ce.sibling=we,Ce=we);return Ee&&la(Q,pe),ie}for(Qt=o(Qt);!we.done;pe++,we=tt.next())we=lt(Qt,Q,pe,we.value,vt),we!==null&&(e&&we.alternate!==null&&Qt.delete(we.key===null?pe:we.key),V=h(we,V,pe),Ce===null?ie=we:Ce.sibling=we,Ce=we);return e&&Qt.forEach(function(cy){return n(Q,cy)}),Ee&&la(Q,pe),ie}function qe(Q,V,tt,vt){if(typeof tt=="object"&&tt!==null&&tt.type===C&&tt.key===null&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case y:t:{for(var ie=tt.key;V!==null;){if(V.key===ie){if(ie=tt.type,ie===C){if(V.tag===7){a(Q,V.sibling),vt=c(V,tt.props.children),vt.return=Q,Q=vt;break t}}else if(V.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===T&&Ns(ie)===V.type){a(Q,V.sibling),vt=c(V,tt.props),Ro(vt,tt),vt.return=Q,Q=vt;break t}a(Q,V);break}else n(Q,V);V=V.sibling}tt.type===C?(vt=Cs(tt.props.children,Q.mode,vt,tt.key),vt.return=Q,Q=vt):(vt=Ol(tt.type,tt.key,tt.props,null,Q.mode,vt),Ro(vt,tt),vt.return=Q,Q=vt)}return M(Q);case b:t:{for(ie=tt.key;V!==null;){if(V.key===ie)if(V.tag===4&&V.stateNode.containerInfo===tt.containerInfo&&V.stateNode.implementation===tt.implementation){a(Q,V.sibling),vt=c(V,tt.children||[]),vt.return=Q,Q=vt;break t}else{a(Q,V);break}else n(Q,V);V=V.sibling}vt=rf(tt,Q.mode,vt),vt.return=Q,Q=vt}return M(Q);case T:return tt=Ns(tt),qe(Q,V,tt,vt)}if(Z(tt))return qt(Q,V,tt,vt);if(W(tt)){if(ie=W(tt),typeof ie!="function")throw Error(s(150));return tt=ie.call(tt),ae(Q,V,tt,vt)}if(typeof tt.then=="function")return qe(Q,V,Vl(tt),vt);if(tt.$$typeof===O)return qe(Q,V,Bl(Q,tt),vt);kl(Q,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,V!==null&&V.tag===6?(a(Q,V.sibling),vt=c(V,tt),vt.return=Q,Q=vt):(a(Q,V),vt=sf(tt,Q.mode,vt),vt.return=Q,Q=vt),M(Q)):a(Q,V)}return function(Q,V,tt,vt){try{Ao=0;var ie=qe(Q,V,tt,vt);return pr=null,ie}catch(Qt){if(Qt===dr||Qt===Hl)throw Qt;var Ce=li(29,Qt,null,Q.mode);return Ce.lanes=vt,Ce.return=Q,Ce}}}var Os=tg(!0),eg=tg(!1),ka=!1;function vf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xf(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Xa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Wa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(De&2)!==0){var c=o.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),o.pending=n,n=Pl(e),Bm(e,null,a),n}return Nl(e,o,n,a),Pl(e)}function Co(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,ii(e,a)}}function Sf(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var c=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var M={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?c=h=M:h=h.next=M,a=a.next}while(a!==null);h===null?c=h=n:h=h.next=n}else c=h=n;a={baseState:o.baseState,firstBaseUpdate:c,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Mf=!1;function wo(){if(Mf){var e=hr;if(e!==null)throw e}}function Do(e,n,a,o){Mf=!1;var c=e.updateQueue;ka=!1;var h=c.firstBaseUpdate,M=c.lastBaseUpdate,R=c.shared.pending;if(R!==null){c.shared.pending=null;var z=R,et=z.next;z.next=null,M===null?h=et:M.next=et,M=z;var pt=e.alternate;pt!==null&&(pt=pt.updateQueue,R=pt.lastBaseUpdate,R!==M&&(R===null?pt.firstBaseUpdate=et:R.next=et,pt.lastBaseUpdate=z))}if(h!==null){var xt=c.baseState;M=0,pt=et=z=null,R=h;do{var ot=R.lane&-536870913,lt=ot!==R.lane;if(lt?(Se&ot)===ot:(o&ot)===ot){ot!==0&&ot===fr&&(Mf=!0),pt!==null&&(pt=pt.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});t:{var qt=e,ae=R;ot=n;var qe=a;switch(ae.tag){case 1:if(qt=ae.payload,typeof qt=="function"){xt=qt.call(qe,xt,ot);break t}xt=qt;break t;case 3:qt.flags=qt.flags&-65537|128;case 0:if(qt=ae.payload,ot=typeof qt=="function"?qt.call(qe,xt,ot):qt,ot==null)break t;xt=v({},xt,ot);break t;case 2:ka=!0}}ot=R.callback,ot!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=c.callbacks,lt===null?c.callbacks=[ot]:lt.push(ot))}else lt={lane:ot,tag:R.tag,payload:R.payload,callback:R.callback,next:null},pt===null?(et=pt=lt,z=xt):pt=pt.next=lt,M|=ot;if(R=R.next,R===null){if(R=c.shared.pending,R===null)break;lt=R,R=lt.next,lt.next=null,c.lastBaseUpdate=lt,c.shared.pending=null}}while(!0);pt===null&&(z=xt),c.baseState=z,c.firstBaseUpdate=et,c.lastBaseUpdate=pt,h===null&&(c.shared.lanes=0),Qa|=M,e.lanes=M,e.memoizedState=xt}}function ng(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function ig(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)ng(a[e],n)}var mr=P(null),Xl=P(0);function ag(e,n){e=xa,Mt(Xl,e),Mt(mr,n),xa=e|n.baseLanes}function yf(){Mt(Xl,xa),Mt(mr,mr.current)}function Ef(){xa=Xl.current,K(mr),K(Xl)}var ui=P(null),Ti=null;function qa(e){var n=e.alternate;Mt(cn,cn.current&1),Mt(ui,e),Ti===null&&(n===null||mr.current!==null||n.memoizedState!==null)&&(Ti=e)}function bf(e){Mt(cn,cn.current),Mt(ui,e),Ti===null&&(Ti=e)}function sg(e){e.tag===22?(Mt(cn,cn.current),Mt(ui,e),Ti===null&&(Ti=e)):Ya()}function Ya(){Mt(cn,cn.current),Mt(ui,ui.current)}function ci(e){K(ui),Ti===e&&(Ti=null),K(cn)}var cn=P(0);function Wl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Dh(a)||Uh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var fa=0,de=null,Xe=null,mn=null,ql=!1,gr=!1,Is=!1,Yl=0,Uo=0,_r=null,tM=0;function ln(){throw Error(s(321))}function Tf(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!oi(e[a],n[a]))return!1;return!0}function Af(e,n,a,o,c,h){return fa=h,de=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=e===null||e.memoizedState===null?Vg:Gf,Is=!1,h=a(o,c),Is=!1,gr&&(h=og(n,a,o,c)),rg(e),h}function rg(e){B.H=Po;var n=Xe!==null&&Xe.next!==null;if(fa=0,mn=Xe=de=null,ql=!1,Uo=0,_r=null,n)throw Error(s(300));e===null||gn||(e=e.dependencies,e!==null&&Fl(e)&&(gn=!0))}function og(e,n,a,o){de=e;var c=0;do{if(gr&&(_r=null),Uo=0,gr=!1,25<=c)throw Error(s(301));if(c+=1,mn=Xe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}B.H=kg,h=n(a,o)}while(gr);return h}function eM(){var e=B.H,n=e.useState()[0];return n=typeof n.then=="function"?Lo(n):n,e=e.useState()[0],(Xe!==null?Xe.memoizedState:null)!==e&&(de.flags|=1024),n}function Rf(){var e=Yl!==0;return Yl=0,e}function Cf(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function wf(e){if(ql){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}ql=!1}fa=0,mn=Xe=de=null,gr=!1,Uo=Yl=0,_r=null}function kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return mn===null?de.memoizedState=mn=e:mn=mn.next=e,mn}function fn(){if(Xe===null){var e=de.alternate;e=e!==null?e.memoizedState:null}else e=Xe.next;var n=mn===null?de.memoizedState:mn.next;if(n!==null)mn=n,Xe=e;else{if(e===null)throw de.alternate===null?Error(s(467)):Error(s(310));Xe=e,e={memoizedState:Xe.memoizedState,baseState:Xe.baseState,baseQueue:Xe.baseQueue,queue:Xe.queue,next:null},mn===null?de.memoizedState=mn=e:mn=mn.next=e}return mn}function Zl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lo(e){var n=Uo;return Uo+=1,_r===null&&(_r=[]),e=Jm(_r,e,n),n=de,(mn===null?n.memoizedState:mn.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?Vg:Gf),e}function Kl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Lo(e);if(e.$$typeof===O)return Un(e)}throw Error(s(438,String(e)))}function Df(e){var n=null,a=de.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=de.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Zl(),de.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=k;return n.index++,a}function ha(e,n){return typeof n=="function"?n(e):n}function Ql(e){var n=fn();return Uf(n,Xe,e)}function Uf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var c=e.baseQueue,h=o.pending;if(h!==null){if(c!==null){var M=c.next;c.next=h.next,h.next=M}n.baseQueue=c=h,o.pending=null}if(h=e.baseState,c===null)e.memoizedState=h;else{n=c.next;var R=M=null,z=null,et=n,pt=!1;do{var xt=et.lane&-536870913;if(xt!==et.lane?(Se&xt)===xt:(fa&xt)===xt){var ot=et.revertLane;if(ot===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null}),xt===fr&&(pt=!0);else if((fa&ot)===ot){et=et.next,ot===fr&&(pt=!0);continue}else xt={lane:0,revertLane:et.revertLane,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},z===null?(R=z=xt,M=h):z=z.next=xt,de.lanes|=ot,Qa|=ot;xt=et.action,Is&&a(h,xt),h=et.hasEagerState?et.eagerState:a(h,xt)}else ot={lane:xt,revertLane:et.revertLane,gesture:et.gesture,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},z===null?(R=z=ot,M=h):z=z.next=ot,de.lanes|=xt,Qa|=xt;et=et.next}while(et!==null&&et!==n);if(z===null?M=h:z.next=R,!oi(h,e.memoizedState)&&(gn=!0,pt&&(a=hr,a!==null)))throw a;e.memoizedState=h,e.baseState=M,e.baseQueue=z,o.lastRenderedState=h}return c===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Lf(e){var n=fn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,c=a.pending,h=n.memoizedState;if(c!==null){a.pending=null;var M=c=c.next;do h=e(h,M.action),M=M.next;while(M!==c);oi(h,n.memoizedState)||(gn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function lg(e,n,a){var o=de,c=fn(),h=Ee;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=n();var M=!oi((Xe||c).memoizedState,a);if(M&&(c.memoizedState=a,gn=!0),c=c.queue,Of(fg.bind(null,o,c,e),[e]),c.getSnapshot!==n||M||mn!==null&&mn.memoizedState.tag&1){if(o.flags|=2048,vr(9,{destroy:void 0},cg.bind(null,o,c,a,n),null),Ke===null)throw Error(s(349));h||(fa&127)!==0||ug(o,n,a)}return a}function ug(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=de.updateQueue,n===null?(n=Zl(),de.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function cg(e,n,a,o){n.value=a,n.getSnapshot=o,hg(n)&&dg(e)}function fg(e,n,a){return a(function(){hg(n)&&dg(e)})}function hg(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!oi(e,a)}catch{return!0}}function dg(e){var n=Rs(e,2);n!==null&&jn(n,e,2)}function Nf(e){var n=kn();if(typeof e=="function"){var a=e;if(e=a(),Is){Ct(!0);try{a()}finally{Ct(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:e},n}function pg(e,n,a,o){return e.baseState=a,Uf(e,Xe,typeof o=="function"?o:ha)}function nM(e,n,a,o,c){if($l(e))throw Error(s(485));if(e=n.action,e!==null){var h={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){h.listeners.push(M)}};B.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,mg(n,h)):(h.next=a.next,n.pending=a.next=h)}}function mg(e,n){var a=n.action,o=n.payload,c=e.state;if(n.isTransition){var h=B.T,M={};B.T=M;try{var R=a(c,o),z=B.S;z!==null&&z(M,R),gg(e,n,R)}catch(et){Pf(e,n,et)}finally{h!==null&&M.types!==null&&(h.types=M.types),B.T=h}}else try{h=a(c,o),gg(e,n,h)}catch(et){Pf(e,n,et)}}function gg(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){_g(e,n,o)},function(o){return Pf(e,n,o)}):_g(e,n,a)}function _g(e,n,a){n.status="fulfilled",n.value=a,vg(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,mg(e,a)))}function Pf(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,vg(n),n=n.next;while(n!==o)}e.action=null}function vg(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function xg(e,n){return n}function Sg(e,n){if(Ee){var a=Ke.formState;if(a!==null){t:{var o=de;if(Ee){if(Je){e:{for(var c=Je,h=bi;c.nodeType!==8;){if(!h){c=null;break e}if(c=Ai(c.nextSibling),c===null){c=null;break e}}h=c.data,c=h==="F!"||h==="F"?c:null}if(c){Je=Ai(c.nextSibling),o=c.data==="F!";break t}}Ga(o)}o=!1}o&&(n=a[0])}}return a=kn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:xg,lastRenderedState:n},a.queue=o,a=zg.bind(null,de,o),o.dispatch=a,o=Nf(!1),h=Hf.bind(null,de,!1,o.queue),o=kn(),c={state:n,dispatch:null,action:e,pending:null},o.queue=c,a=nM.bind(null,de,c,h,a),c.dispatch=a,o.memoizedState=e,[n,a,!1]}function Mg(e){var n=fn();return yg(n,Xe,e)}function yg(e,n,a){if(n=Uf(e,n,xg)[0],e=Ql(ha)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Lo(n)}catch(M){throw M===dr?Hl:M}else o=n;n=fn();var c=n.queue,h=c.dispatch;return a!==n.memoizedState&&(de.flags|=2048,vr(9,{destroy:void 0},iM.bind(null,c,a),null)),[o,h,e]}function iM(e,n){e.action=n}function Eg(e){var n=fn(),a=Xe;if(a!==null)return yg(n,a,e);fn(),n=n.memoizedState,a=fn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function vr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=de.updateQueue,n===null&&(n=Zl(),de.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function bg(){return fn().memoizedState}function Jl(e,n,a,o){var c=kn();de.flags|=e,c.memoizedState=vr(1|n,{destroy:void 0},a,o===void 0?null:o)}function jl(e,n,a,o){var c=fn();o=o===void 0?null:o;var h=c.memoizedState.inst;Xe!==null&&o!==null&&Tf(o,Xe.memoizedState.deps)?c.memoizedState=vr(n,h,a,o):(de.flags|=e,c.memoizedState=vr(1|n,h,a,o))}function Tg(e,n){Jl(8390656,8,e,n)}function Of(e,n){jl(2048,8,e,n)}function aM(e){de.flags|=4;var n=de.updateQueue;if(n===null)n=Zl(),de.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Ag(e){var n=fn().memoizedState;return aM({ref:n,nextImpl:e}),function(){if((De&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Rg(e,n){return jl(4,2,e,n)}function Cg(e,n){return jl(4,4,e,n)}function wg(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Dg(e,n,a){a=a!=null?a.concat([e]):null,jl(4,4,wg.bind(null,n,e),a)}function If(){}function Ug(e,n){var a=fn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Tf(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Lg(e,n){var a=fn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Tf(n,o[1]))return o[0];if(o=e(),Is){Ct(!0);try{e()}finally{Ct(!1)}}return a.memoizedState=[o,n],o}function Ff(e,n,a){return a===void 0||(fa&1073741824)!==0&&(Se&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=N0(),de.lanes|=e,Qa|=e,a)}function Ng(e,n,a,o){return oi(a,n)?a:mr.current!==null?(e=Ff(e,a,o),oi(e,n)||(gn=!0),e):(fa&42)===0||(fa&1073741824)!==0&&(Se&261930)===0?(gn=!0,e.memoizedState=a):(e=N0(),de.lanes|=e,Qa|=e,n)}function Pg(e,n,a,o,c){var h=H.p;H.p=h!==0&&8>h?h:8;var M=B.T,R={};B.T=R,Hf(e,!1,n,a);try{var z=c(),et=B.S;if(et!==null&&et(R,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var pt=$S(z,o);No(e,n,pt,di(e))}else No(e,n,o,di(e))}catch(xt){No(e,n,{then:function(){},status:"rejected",reason:xt},di())}finally{H.p=h,M!==null&&R.types!==null&&(M.types=R.types),B.T=M}}function sM(){}function Bf(e,n,a,o){if(e.tag!==5)throw Error(s(476));var c=Og(e).queue;Pg(e,c,n,$,a===null?sM:function(){return Ig(e),a(o)})}function Og(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:$,baseState:$,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:$},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ha,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Ig(e){var n=Og(e);n.next===null&&(n=e.alternate.memoizedState),No(e,n.next.queue,{},di())}function zf(){return Un(Qo)}function Fg(){return fn().memoizedState}function Bg(){return fn().memoizedState}function rM(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=di();e=Xa(a);var o=Wa(n,e,a);o!==null&&(jn(o,n,a),Co(o,n,a)),n={cache:pf()},e.payload=n;return}n=n.return}}function oM(e,n,a){var o=di();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},$l(e)?Hg(n,a):(a=nf(e,n,a,o),a!==null&&(jn(a,e,o),Gg(a,n,o)))}function zg(e,n,a){var o=di();No(e,n,a,o)}function No(e,n,a,o){var c={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if($l(e))Hg(n,c);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var M=n.lastRenderedState,R=h(M,a);if(c.hasEagerState=!0,c.eagerState=R,oi(R,M))return Nl(e,n,c,0),Ke===null&&Ll(),!1}catch{}if(a=nf(e,n,c,o),a!==null)return jn(a,e,o),Gg(a,n,o),!0}return!1}function Hf(e,n,a,o){if(o={lane:2,revertLane:vh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},$l(e)){if(n)throw Error(s(479))}else n=nf(e,a,o,2),n!==null&&jn(n,e,2)}function $l(e){var n=e.alternate;return e===de||n!==null&&n===de}function Hg(e,n){gr=ql=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Gg(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,ii(e,a)}}var Po={readContext:Un,use:Kl,useCallback:ln,useContext:ln,useEffect:ln,useImperativeHandle:ln,useLayoutEffect:ln,useInsertionEffect:ln,useMemo:ln,useReducer:ln,useRef:ln,useState:ln,useDebugValue:ln,useDeferredValue:ln,useTransition:ln,useSyncExternalStore:ln,useId:ln,useHostTransitionStatus:ln,useFormState:ln,useActionState:ln,useOptimistic:ln,useMemoCache:ln,useCacheRefresh:ln};Po.useEffectEvent=ln;var Vg={readContext:Un,use:Kl,useCallback:function(e,n){return kn().memoizedState=[e,n===void 0?null:n],e},useContext:Un,useEffect:Tg,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Jl(4194308,4,wg.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Jl(4194308,4,e,n)},useInsertionEffect:function(e,n){Jl(4,2,e,n)},useMemo:function(e,n){var a=kn();n=n===void 0?null:n;var o=e();if(Is){Ct(!0);try{e()}finally{Ct(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=kn();if(a!==void 0){var c=a(n);if(Is){Ct(!0);try{a(n)}finally{Ct(!1)}}}else c=n;return o.memoizedState=o.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},o.queue=e,e=e.dispatch=oM.bind(null,de,e),[o.memoizedState,e]},useRef:function(e){var n=kn();return e={current:e},n.memoizedState=e},useState:function(e){e=Nf(e);var n=e.queue,a=zg.bind(null,de,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:If,useDeferredValue:function(e,n){var a=kn();return Ff(a,e,n)},useTransition:function(){var e=Nf(!1);return e=Pg.bind(null,de,e.queue,!0,!1),kn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=de,c=kn();if(Ee){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Ke===null)throw Error(s(349));(Se&127)!==0||ug(o,n,a)}c.memoizedState=a;var h={value:a,getSnapshot:n};return c.queue=h,Tg(fg.bind(null,o,h,e),[e]),o.flags|=2048,vr(9,{destroy:void 0},cg.bind(null,o,h,a,n),null),a},useId:function(){var e=kn(),n=Ke.identifierPrefix;if(Ee){var a=Wi,o=Xi;a=(o&~(1<<32-zt(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Yl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=tM++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:zf,useFormState:Sg,useActionState:Sg,useOptimistic:function(e){var n=kn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Hf.bind(null,de,!0,a),a.dispatch=n,[e,n]},useMemoCache:Df,useCacheRefresh:function(){return kn().memoizedState=rM.bind(null,de)},useEffectEvent:function(e){var n=kn(),a={impl:e};return n.memoizedState=a,function(){if((De&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Gf={readContext:Un,use:Kl,useCallback:Ug,useContext:Un,useEffect:Of,useImperativeHandle:Dg,useInsertionEffect:Rg,useLayoutEffect:Cg,useMemo:Lg,useReducer:Ql,useRef:bg,useState:function(){return Ql(ha)},useDebugValue:If,useDeferredValue:function(e,n){var a=fn();return Ng(a,Xe.memoizedState,e,n)},useTransition:function(){var e=Ql(ha)[0],n=fn().memoizedState;return[typeof e=="boolean"?e:Lo(e),n]},useSyncExternalStore:lg,useId:Fg,useHostTransitionStatus:zf,useFormState:Mg,useActionState:Mg,useOptimistic:function(e,n){var a=fn();return pg(a,Xe,e,n)},useMemoCache:Df,useCacheRefresh:Bg};Gf.useEffectEvent=Ag;var kg={readContext:Un,use:Kl,useCallback:Ug,useContext:Un,useEffect:Of,useImperativeHandle:Dg,useInsertionEffect:Rg,useLayoutEffect:Cg,useMemo:Lg,useReducer:Lf,useRef:bg,useState:function(){return Lf(ha)},useDebugValue:If,useDeferredValue:function(e,n){var a=fn();return Xe===null?Ff(a,e,n):Ng(a,Xe.memoizedState,e,n)},useTransition:function(){var e=Lf(ha)[0],n=fn().memoizedState;return[typeof e=="boolean"?e:Lo(e),n]},useSyncExternalStore:lg,useId:Fg,useHostTransitionStatus:zf,useFormState:Eg,useActionState:Eg,useOptimistic:function(e,n){var a=fn();return Xe!==null?pg(a,Xe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Df,useCacheRefresh:Bg};kg.useEffectEvent=Ag;function Vf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var kf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=di(),c=Xa(o);c.payload=n,a!=null&&(c.callback=a),n=Wa(e,c,o),n!==null&&(jn(n,e,o),Co(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=di(),c=Xa(o);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Wa(e,c,o),n!==null&&(jn(n,e,o),Co(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=di(),o=Xa(a);o.tag=2,n!=null&&(o.callback=n),n=Wa(e,o,a),n!==null&&(jn(n,e,a),Co(n,e,a))}};function Xg(e,n,a,o,c,h,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,M):n.prototype&&n.prototype.isPureReactComponent?!So(a,o)||!So(c,h):!0}function Wg(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&kf.enqueueReplaceState(n,n.state,null)}function Fs(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var c in e)a[c]===void 0&&(a[c]=e[c])}return a}function qg(e){Ul(e)}function Yg(e){console.error(e)}function Zg(e){Ul(e)}function tu(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Kg(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Xf(e,n,a){return a=Xa(a),a.tag=3,a.payload={element:null},a.callback=function(){tu(e,n)},a}function Qg(e){return e=Xa(e),e.tag=3,e}function Jg(e,n,a,o){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var h=o.value;e.payload=function(){return c(h)},e.callback=function(){Kg(n,a,o)}}var M=a.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){Kg(n,a,o),typeof c!="function"&&(Ja===null?Ja=new Set([this]):Ja.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function lM(e,n,a,o,c){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&cr(n,a,c,!0),a=ui.current,a!==null){switch(a.tag){case 31:case 13:return Ti===null?hu():a.alternate===null&&un===0&&(un=3),a.flags&=-257,a.flags|=65536,a.lanes=c,o===Gl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),mh(e,o,c)),!1;case 22:return a.flags|=65536,o===Gl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),mh(e,o,c)),!1}throw Error(s(435,a.tag))}return mh(e,o,c),hu(),!1}if(Ee)return n=ui.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,o!==uf&&(e=Error(s(422),{cause:o}),Eo(Mi(e,a)))):(o!==uf&&(n=Error(s(423),{cause:o}),Eo(Mi(n,a))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,o=Mi(o,a),c=Xf(e.stateNode,o,c),Sf(e,c),un!==4&&(un=2)),!1;var h=Error(s(520),{cause:o});if(h=Mi(h,a),Vo===null?Vo=[h]:Vo.push(h),un!==4&&(un=2),n===null)return!0;o=Mi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=c&-c,a.lanes|=e,e=Xf(a.stateNode,o,e),Sf(a,e),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Ja===null||!Ja.has(h))))return a.flags|=65536,c&=-c,a.lanes|=c,c=Qg(c),Jg(c,e,a,o),Sf(a,c),!1}a=a.return}while(a!==null);return!1}var Wf=Error(s(461)),gn=!1;function Ln(e,n,a,o){n.child=e===null?eg(n,null,a,o):Os(n,e.child,a,o)}function jg(e,n,a,o,c){a=a.render;var h=n.ref;if("ref"in o){var M={};for(var R in o)R!=="ref"&&(M[R]=o[R])}else M=o;return Us(n),o=Af(e,n,a,M,h,c),R=Rf(),e!==null&&!gn?(Cf(e,n,c),da(e,n,c)):(Ee&&R&&of(n),n.flags|=1,Ln(e,n,o,c),n.child)}function $g(e,n,a,o,c){if(e===null){var h=a.type;return typeof h=="function"&&!af(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,t0(e,n,h,o,c)):(e=Ol(a.type,null,o,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!$f(e,c)){var M=h.memoizedProps;if(a=a.compare,a=a!==null?a:So,a(M,o)&&e.ref===n.ref)return da(e,n,c)}return n.flags|=1,e=oa(h,o),e.ref=n.ref,e.return=n,n.child=e}function t0(e,n,a,o,c){if(e!==null){var h=e.memoizedProps;if(So(h,o)&&e.ref===n.ref)if(gn=!1,n.pendingProps=o=h,$f(e,c))(e.flags&131072)!==0&&(gn=!0);else return n.lanes=e.lanes,da(e,n,c)}return qf(e,n,a,o,c)}function e0(e,n,a,o){var c=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=n.child=e.child,c=0;o!==null;)c=c|o.lanes|o.childLanes,o=o.sibling;o=c&~h}else o=0,n.child=null;return n0(e,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&zl(n,h!==null?h.cachePool:null),h!==null?ag(n,h):yf(),sg(n);else return o=n.lanes=536870912,n0(e,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(zl(n,h.cachePool),ag(n,h),Ya(),n.memoizedState=null):(e!==null&&zl(n,null),yf(),Ya());return Ln(e,n,c,a),n.child}function Oo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function n0(e,n,a,o,c){var h=gf();return h=h===null?null:{parent:pn._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},e!==null&&zl(n,null),yf(),sg(n),e!==null&&cr(e,n,o,!0),n.childLanes=c,null}function eu(e,n){return n=iu({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function i0(e,n,a){return Os(n,e.child,null,a),e=eu(n,n.pendingProps),e.flags|=2,ci(n),n.memoizedState=null,e}function uM(e,n,a){var o=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ee){if(o.mode==="hidden")return e=eu(n,o),n.lanes=536870912,Oo(null,e);if(bf(n),(e=Je)?(e=m_(e,bi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:za!==null?{id:Xi,overflow:Wi}:null,retryLane:536870912,hydrationErrors:null},a=Hm(e),a.return=n,n.child=a,Dn=n,Je=null)):e=null,e===null)throw Ga(n);return n.lanes=536870912,null}return eu(n,o)}var h=e.memoizedState;if(h!==null){var M=h.dehydrated;if(bf(n),c)if(n.flags&256)n.flags&=-257,n=i0(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(gn||cr(e,n,a,!1),c=(a&e.childLanes)!==0,gn||c){if(o=Ke,o!==null&&(M=ai(o,a),M!==0&&M!==h.retryLane))throw h.retryLane=M,Rs(e,M),jn(o,e,M),Wf;hu(),n=i0(e,n,a)}else e=h.treeContext,Je=Ai(M.nextSibling),Dn=n,Ee=!0,Ha=null,bi=!1,e!==null&&km(n,e),n=eu(n,o),n.flags|=4096;return n}return e=oa(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function nu(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function qf(e,n,a,o,c){return Us(n),a=Af(e,n,a,o,void 0,c),o=Rf(),e!==null&&!gn?(Cf(e,n,c),da(e,n,c)):(Ee&&o&&of(n),n.flags|=1,Ln(e,n,a,c),n.child)}function a0(e,n,a,o,c,h){return Us(n),n.updateQueue=null,a=og(n,o,a,c),rg(e),o=Rf(),e!==null&&!gn?(Cf(e,n,h),da(e,n,h)):(Ee&&o&&of(n),n.flags|=1,Ln(e,n,a,h),n.child)}function s0(e,n,a,o,c){if(Us(n),n.stateNode===null){var h=rr,M=a.contextType;typeof M=="object"&&M!==null&&(h=Un(M)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=kf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},vf(n),M=a.contextType,h.context=typeof M=="object"&&M!==null?Un(M):rr,h.state=n.memoizedState,M=a.getDerivedStateFromProps,typeof M=="function"&&(Vf(n,a,M,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(M=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),M!==h.state&&kf.enqueueReplaceState(h,h.state,null),Do(n,o,h,c),wo(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var R=n.memoizedProps,z=Fs(a,R);h.props=z;var et=h.context,pt=a.contextType;M=rr,typeof pt=="object"&&pt!==null&&(M=Un(pt));var xt=a.getDerivedStateFromProps;pt=typeof xt=="function"||typeof h.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,pt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(R||et!==M)&&Wg(n,h,o,M),ka=!1;var ot=n.memoizedState;h.state=ot,Do(n,o,h,c),wo(),et=n.memoizedState,R||ot!==et||ka?(typeof xt=="function"&&(Vf(n,a,xt,o),et=n.memoizedState),(z=ka||Xg(n,a,z,o,ot,et,M))?(pt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=et),h.props=o,h.state=et,h.context=M,o=z):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,xf(e,n),M=n.memoizedProps,pt=Fs(a,M),h.props=pt,xt=n.pendingProps,ot=h.context,et=a.contextType,z=rr,typeof et=="object"&&et!==null&&(z=Un(et)),R=a.getDerivedStateFromProps,(et=typeof R=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(M!==xt||ot!==z)&&Wg(n,h,o,z),ka=!1,ot=n.memoizedState,h.state=ot,Do(n,o,h,c),wo();var lt=n.memoizedState;M!==xt||ot!==lt||ka||e!==null&&e.dependencies!==null&&Fl(e.dependencies)?(typeof R=="function"&&(Vf(n,a,R,o),lt=n.memoizedState),(pt=ka||Xg(n,a,pt,o,ot,lt,z)||e!==null&&e.dependencies!==null&&Fl(e.dependencies))?(et||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,lt,z),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,lt,z)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||M===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=lt),h.props=o,h.state=lt,h.context=z,o=pt):(typeof h.componentDidUpdate!="function"||M===e.memoizedProps&&ot===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ot===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,nu(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=Os(n,e.child,null,c),n.child=Os(n,null,a,c)):Ln(e,n,a,c),n.memoizedState=h.state,e=n.child):e=da(e,n,c),e}function r0(e,n,a,o){return ws(),n.flags|=256,Ln(e,n,a,o),n.child}var Yf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Zf(e){return{baseLanes:e,cachePool:Km()}}function Kf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=hi),e}function o0(e,n,a){var o=n.pendingProps,c=!1,h=(n.flags&128)!==0,M;if((M=h)||(M=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),M&&(c=!0,n.flags&=-129),M=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ee){if(c?qa(n):Ya(),(e=Je)?(e=m_(e,bi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:za!==null?{id:Xi,overflow:Wi}:null,retryLane:536870912,hydrationErrors:null},a=Hm(e),a.return=n,n.child=a,Dn=n,Je=null)):e=null,e===null)throw Ga(n);return Uh(e)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,c?(Ya(),c=n.mode,R=iu({mode:"hidden",children:R},c),o=Cs(o,c,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=Zf(a),o.childLanes=Kf(e,M,a),n.memoizedState=Yf,Oo(null,o)):(qa(n),Qf(n,R))}var z=e.memoizedState;if(z!==null&&(R=z.dehydrated,R!==null)){if(h)n.flags&256?(qa(n),n.flags&=-257,n=Jf(e,n,a)):n.memoizedState!==null?(Ya(),n.child=e.child,n.flags|=128,n=null):(Ya(),R=o.fallback,c=n.mode,o=iu({mode:"visible",children:o.children},c),R=Cs(R,c,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,Os(n,e.child,null,a),o=n.child,o.memoizedState=Zf(a),o.childLanes=Kf(e,M,a),n.memoizedState=Yf,n=Oo(null,o));else if(qa(n),Uh(R)){if(M=R.nextSibling&&R.nextSibling.dataset,M)var et=M.dgst;M=et,o=Error(s(419)),o.stack="",o.digest=M,Eo({value:o,source:null,stack:null}),n=Jf(e,n,a)}else if(gn||cr(e,n,a,!1),M=(a&e.childLanes)!==0,gn||M){if(M=Ke,M!==null&&(o=ai(M,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,Rs(e,o),jn(M,e,o),Wf;Dh(R)||hu(),n=Jf(e,n,a)}else Dh(R)?(n.flags|=192,n.child=e.child,n=null):(e=z.treeContext,Je=Ai(R.nextSibling),Dn=n,Ee=!0,Ha=null,bi=!1,e!==null&&km(n,e),n=Qf(n,o.children),n.flags|=4096);return n}return c?(Ya(),R=o.fallback,c=n.mode,z=e.child,et=z.sibling,o=oa(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,et!==null?R=oa(et,R):(R=Cs(R,c,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Oo(null,o),o=n.child,R=e.child.memoizedState,R===null?R=Zf(a):(c=R.cachePool,c!==null?(z=pn._currentValue,c=c.parent!==z?{parent:z,pool:z}:c):c=Km(),R={baseLanes:R.baseLanes|a,cachePool:c}),o.memoizedState=R,o.childLanes=Kf(e,M,a),n.memoizedState=Yf,Oo(e.child,o)):(qa(n),a=e.child,e=a.sibling,a=oa(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(M=n.deletions,M===null?(n.deletions=[e],n.flags|=16):M.push(e)),n.child=a,n.memoizedState=null,a)}function Qf(e,n){return n=iu({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function iu(e,n){return e=li(22,e,null,n),e.lanes=0,e}function Jf(e,n,a){return Os(n,e.child,null,a),e=Qf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function l0(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),hf(e.return,n,a)}function jf(e,n,a,o,c,h){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:c,treeForkCount:h}:(M.isBackwards=n,M.rendering=null,M.renderingStartTime=0,M.last=o,M.tail=a,M.tailMode=c,M.treeForkCount=h)}function u0(e,n,a){var o=n.pendingProps,c=o.revealOrder,h=o.tail;o=o.children;var M=cn.current,R=(M&2)!==0;if(R?(M=M&1|2,n.flags|=128):M&=1,Mt(cn,M),Ln(e,n,o,a),o=Ee?yo:0,!R&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&l0(e,a,n);else if(e.tag===19)l0(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)e=a.alternate,e!==null&&Wl(e)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),jf(n,!1,c,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&Wl(e)===null){n.child=c;break}e=c.sibling,c.sibling=a,a=c,c=e}jf(n,!0,a,null,h,o);break;case"together":jf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function da(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Qa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(cr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=oa(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=oa(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function $f(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Fl(e)))}function cM(e,n,a){switch(n.tag){case 3:St(n,n.stateNode.containerInfo),Va(n,pn,e.memoizedState.cache),ws();break;case 27:case 5:se(n);break;case 4:St(n,n.stateNode.containerInfo);break;case 10:Va(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,bf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(qa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?o0(e,n,a):(qa(n),e=da(e,n,a),e!==null?e.sibling:null);qa(n);break;case 19:var c=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(cr(e,n,a,!1),o=(a&n.childLanes)!==0),c){if(o)return u0(e,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Mt(cn,cn.current),o)break;return null;case 22:return n.lanes=0,e0(e,n,a,n.pendingProps);case 24:Va(n,pn,e.memoizedState.cache)}return da(e,n,a)}function c0(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)gn=!0;else{if(!$f(e,a)&&(n.flags&128)===0)return gn=!1,cM(e,n,a);gn=(e.flags&131072)!==0}else gn=!1,Ee&&(n.flags&1048576)!==0&&Vm(n,yo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Ns(n.elementType),n.type=e,typeof e=="function")af(e)?(o=Fs(e,o),n.tag=1,n=s0(null,n,e,o,a)):(n.tag=0,n=qf(null,n,e,o,a));else{if(e!=null){var c=e.$$typeof;if(c===w){n.tag=11,n=jg(null,n,e,o,a);break t}else if(c===F){n.tag=14,n=$g(null,n,e,o,a);break t}}throw n=ct(e)||e,Error(s(306,n,""))}}return n;case 0:return qf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,c=Fs(o,n.pendingProps),s0(e,n,o,c,a);case 3:t:{if(St(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var h=n.memoizedState;c=h.element,xf(e,n),Do(n,o,null,a);var M=n.memoizedState;if(o=M.cache,Va(n,pn,o),o!==h.cache&&df(n,[pn],a,!0),wo(),o=M.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:M.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=r0(e,n,o,a);break t}else if(o!==c){c=Mi(Error(s(424)),n),Eo(c),n=r0(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Je=Ai(e.firstChild),Dn=n,Ee=!0,Ha=null,bi=!0,a=eg(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ws(),o===c){n=da(e,n,a);break t}Ln(e,n,o,a)}n=n.child}return n;case 26:return nu(e,n),e===null?(a=M_(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ee||(a=n.type,e=n.pendingProps,o=xu(at.current).createElement(a),o[hn]=n,o[wn]=e,Nn(o,a,e),dn(o),n.stateNode=o):n.memoizedState=M_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return se(n),e===null&&Ee&&(o=n.stateNode=v_(n.type,n.pendingProps,at.current),Dn=n,bi=!0,c=Je,es(n.type)?(Lh=c,Je=Ai(o.firstChild)):Je=c),Ln(e,n,n.pendingProps.children,a),nu(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ee&&((c=o=Je)&&(o=HM(o,n.type,n.pendingProps,bi),o!==null?(n.stateNode=o,Dn=n,Je=Ai(o.firstChild),bi=!1,c=!0):c=!1),c||Ga(n)),se(n),c=n.type,h=n.pendingProps,M=e!==null?e.memoizedProps:null,o=h.children,Rh(c,h)?o=null:M!==null&&Rh(c,M)&&(n.flags|=32),n.memoizedState!==null&&(c=Af(e,n,eM,null,null,a),Qo._currentValue=c),nu(e,n),Ln(e,n,o,a),n.child;case 6:return e===null&&Ee&&((e=a=Je)&&(a=GM(a,n.pendingProps,bi),a!==null?(n.stateNode=a,Dn=n,Je=null,e=!0):e=!1),e||Ga(n)),null;case 13:return o0(e,n,a);case 4:return St(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Os(n,null,o,a):Ln(e,n,o,a),n.child;case 11:return jg(e,n,n.type,n.pendingProps,a);case 7:return Ln(e,n,n.pendingProps,a),n.child;case 8:return Ln(e,n,n.pendingProps.children,a),n.child;case 12:return Ln(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Va(n,n.type,o.value),Ln(e,n,o.children,a),n.child;case 9:return c=n.type._context,o=n.pendingProps.children,Us(n),c=Un(c),o=o(c),n.flags|=1,Ln(e,n,o,a),n.child;case 14:return $g(e,n,n.type,n.pendingProps,a);case 15:return t0(e,n,n.type,n.pendingProps,a);case 19:return u0(e,n,a);case 31:return uM(e,n,a);case 22:return e0(e,n,a,n.pendingProps);case 24:return Us(n),o=Un(pn),e===null?(c=gf(),c===null&&(c=Ke,h=pf(),c.pooledCache=h,h.refCount++,h!==null&&(c.pooledCacheLanes|=a),c=h),n.memoizedState={parent:o,cache:c},vf(n),Va(n,pn,c)):((e.lanes&a)!==0&&(xf(e,n),Do(n,null,null,a),wo()),c=e.memoizedState,h=n.memoizedState,c.parent!==o?(c={parent:o,cache:o},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Va(n,pn,o)):(o=h.cache,Va(n,pn,o),o!==c.cache&&df(n,[pn],a,!0))),Ln(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function pa(e){e.flags|=4}function th(e,n,a,o,c){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(F0())e.flags|=8192;else throw Ps=Gl,_f}else e.flags&=-16777217}function f0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!A_(n))if(F0())e.flags|=8192;else throw Ps=Gl,_f}function au(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?bt():536870912,e.lanes|=n,yr|=n)}function Io(e,n){if(!Ee)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function je(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var c=e.child;c!==null;)a|=c.lanes|c.childLanes,o|=c.subtreeFlags&65011712,o|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)a|=c.lanes|c.childLanes,o|=c.subtreeFlags,o|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function fM(e,n,a){var o=n.pendingProps;switch(lf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(n),null;case 1:return je(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ca(pn),Gt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ur(n)?pa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,cf())),je(n),null;case 26:var c=n.type,h=n.memoizedState;return e===null?(pa(n),h!==null?(je(n),f0(n,h)):(je(n),th(n,c,null,o,a))):h?h!==e.memoizedState?(pa(n),je(n),f0(n,h)):(je(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&pa(n),je(n),th(n,c,e,o,a)),null;case 27:if($t(n),a=at.current,c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&pa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return je(n),null}e=Tt.current,ur(n)?Xm(n):(e=v_(c,o,a),n.stateNode=e,pa(n))}return je(n),null;case 5:if($t(n),c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&pa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return je(n),null}if(h=Tt.current,ur(n))Xm(n);else{var M=xu(at.current);switch(h){case 1:h=M.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:h=M.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":h=M.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":h=M.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":h=M.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?M.createElement("select",{is:o.is}):M.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?M.createElement(c,{is:o.is}):M.createElement(c)}}h[hn]=n,h[wn]=o;t:for(M=n.child;M!==null;){if(M.tag===5||M.tag===6)h.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===n)break t;for(;M.sibling===null;){if(M.return===null||M.return===n)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}n.stateNode=h;t:switch(Nn(h,c,o),c){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&pa(n)}}return je(n),th(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&pa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=at.current,ur(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,c=Dn,c!==null)switch(c.tag){case 27:case 5:o=c.memoizedProps}e[hn]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||o_(e.nodeValue,a)),e||Ga(n,!0)}else e=xu(e).createTextNode(o),e[hn]=n,n.stateNode=e}return je(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=ur(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[hn]=n}else ws(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;je(n),e=!1}else a=cf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ci(n),n):(ci(n),null);if((n.flags&128)!==0)throw Error(s(558))}return je(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ur(n),o!==null&&o.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[hn]=n}else ws(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;je(n),c=!1}else c=cf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(ci(n),n):(ci(n),null)}return ci(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,c=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(c=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==c&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),au(n,n.updateQueue),je(n),null);case 4:return Gt(),e===null&&yh(n.stateNode.containerInfo),je(n),null;case 10:return ca(n.type),je(n),null;case 19:if(K(cn),o=n.memoizedState,o===null)return je(n),null;if(c=(n.flags&128)!==0,h=o.rendering,h===null)if(c)Io(o,!1);else{if(un!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Wl(e),h!==null){for(n.flags|=128,Io(o,!1),e=h.updateQueue,n.updateQueue=e,au(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)zm(a,e),a=a.sibling;return Mt(cn,cn.current&1|2),Ee&&la(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Le()>uu&&(n.flags|=128,c=!0,Io(o,!1),n.lanes=4194304)}else{if(!c)if(e=Wl(h),e!==null){if(n.flags|=128,c=!0,e=e.updateQueue,n.updateQueue=e,au(n,e),Io(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ee)return je(n),null}else 2*Le()-o.renderingStartTime>uu&&a!==536870912&&(n.flags|=128,c=!0,Io(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Le(),e.sibling=null,a=cn.current,Mt(cn,c?a&1|2:a&1),Ee&&la(n,o.treeForkCount),e):(je(n),null);case 22:case 23:return ci(n),Ef(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(je(n),n.subtreeFlags&6&&(n.flags|=8192)):je(n),a=n.updateQueue,a!==null&&au(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&K(Ls),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ca(pn),je(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function hM(e,n){switch(lf(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ca(pn),Gt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return $t(n),null;case 31:if(n.memoizedState!==null){if(ci(n),n.alternate===null)throw Error(s(340));ws()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ci(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));ws()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return K(cn),null;case 4:return Gt(),null;case 10:return ca(n.type),null;case 22:case 23:return ci(n),Ef(),e!==null&&K(Ls),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ca(pn),null;case 25:return null;default:return null}}function h0(e,n){switch(lf(n),n.tag){case 3:ca(pn),Gt();break;case 26:case 27:case 5:$t(n);break;case 4:Gt();break;case 31:n.memoizedState!==null&&ci(n);break;case 13:ci(n);break;case 19:K(cn);break;case 10:ca(n.type);break;case 22:case 23:ci(n),Ef(),e!==null&&K(Ls);break;case 24:ca(pn)}}function Fo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var c=o.next;a=c;do{if((a.tag&e)===e){o=void 0;var h=a.create,M=a.inst;o=h(),M.destroy=o}a=a.next}while(a!==c)}}catch(R){He(n,n.return,R)}}function Za(e,n,a){try{var o=n.updateQueue,c=o!==null?o.lastEffect:null;if(c!==null){var h=c.next;o=h;do{if((o.tag&e)===e){var M=o.inst,R=M.destroy;if(R!==void 0){M.destroy=void 0,c=n;var z=a,et=R;try{et()}catch(pt){He(c,z,pt)}}}o=o.next}while(o!==h)}}catch(pt){He(n,n.return,pt)}}function d0(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{ig(n,a)}catch(o){He(e,e.return,o)}}}function p0(e,n,a){a.props=Fs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){He(e,n,o)}}function Bo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(c){He(e,n,c)}}function qi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(c){He(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){He(e,n,c)}else a.current=null}function m0(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(c){He(e,e.return,c)}}function eh(e,n,a){try{var o=e.stateNode;PM(o,e.type,a,n),o[wn]=n}catch(c){He(e,e.return,c)}}function g0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&es(e.type)||e.tag===4}function nh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||g0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&es(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ih(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=sa));else if(o!==4&&(o===27&&es(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(ih(e,n,a),e=e.sibling;e!==null;)ih(e,n,a),e=e.sibling}function su(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&es(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(su(e,n,a),e=e.sibling;e!==null;)su(e,n,a),e=e.sibling}function _0(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Nn(n,o,a),n[hn]=e,n[wn]=a}catch(h){He(e,e.return,h)}}var ma=!1,_n=!1,ah=!1,v0=typeof WeakSet=="function"?WeakSet:Set,Rn=null;function dM(e,n){if(e=e.containerInfo,Th=Au,e=Dm(e),Qc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var c=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var M=0,R=-1,z=-1,et=0,pt=0,xt=e,ot=null;e:for(;;){for(var lt;xt!==a||c!==0&&xt.nodeType!==3||(R=M+c),xt!==h||o!==0&&xt.nodeType!==3||(z=M+o),xt.nodeType===3&&(M+=xt.nodeValue.length),(lt=xt.firstChild)!==null;)ot=xt,xt=lt;for(;;){if(xt===e)break e;if(ot===a&&++et===c&&(R=M),ot===h&&++pt===o&&(z=M),(lt=xt.nextSibling)!==null)break;xt=ot,ot=xt.parentNode}xt=lt}a=R===-1||z===-1?null:{start:R,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ah={focusedElem:e,selectionRange:a},Au=!1,Rn=n;Rn!==null;)if(n=Rn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Rn=e;else for(;Rn!==null;){switch(n=Rn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)c=e[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=n,c=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var qt=Fs(a.type,c);e=o.getSnapshotBeforeUpdate(qt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(ae){He(a,a.return,ae)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)wh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":wh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Rn=e;break}Rn=n.return}}function x0(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:_a(e,a),o&4&&Fo(5,a);break;case 1:if(_a(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(M){He(a,a.return,M)}else{var c=Fs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(M){He(a,a.return,M)}}o&64&&d0(a),o&512&&Bo(a,a.return);break;case 3:if(_a(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{ig(e,n)}catch(M){He(a,a.return,M)}}break;case 27:n===null&&o&4&&_0(a);case 26:case 5:_a(e,a),n===null&&o&4&&m0(a),o&512&&Bo(a,a.return);break;case 12:_a(e,a);break;case 31:_a(e,a),o&4&&y0(e,a);break;case 13:_a(e,a),o&4&&E0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=yM.bind(null,a),VM(e,a))));break;case 22:if(o=a.memoizedState!==null||ma,!o){n=n!==null&&n.memoizedState!==null||_n,c=ma;var h=_n;ma=o,(_n=n)&&!h?va(e,a,(a.subtreeFlags&8772)!==0):_a(e,a),ma=c,_n=h}break;case 30:break;default:_a(e,a)}}function S0(e){var n=e.alternate;n!==null&&(e.alternate=null,S0(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Oa(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var an=null,Zn=!1;function ga(e,n,a){for(a=a.child;a!==null;)M0(e,n,a),a=a.sibling}function M0(e,n,a){if(dt&&typeof dt.onCommitFiberUnmount=="function")try{dt.onCommitFiberUnmount(ft,a)}catch{}switch(a.tag){case 26:_n||qi(a,n),ga(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:_n||qi(a,n);var o=an,c=Zn;es(a.type)&&(an=a.stateNode,Zn=!1),ga(e,n,a),Yo(a.stateNode),an=o,Zn=c;break;case 5:_n||qi(a,n);case 6:if(o=an,c=Zn,an=null,ga(e,n,a),an=o,Zn=c,an!==null)if(Zn)try{(an.nodeType===9?an.body:an.nodeName==="HTML"?an.ownerDocument.body:an).removeChild(a.stateNode)}catch(h){He(a,n,h)}else try{an.removeChild(a.stateNode)}catch(h){He(a,n,h)}break;case 18:an!==null&&(Zn?(e=an,d_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Dr(e)):d_(an,a.stateNode));break;case 4:o=an,c=Zn,an=a.stateNode.containerInfo,Zn=!0,ga(e,n,a),an=o,Zn=c;break;case 0:case 11:case 14:case 15:Za(2,a,n),_n||Za(4,a,n),ga(e,n,a);break;case 1:_n||(qi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&p0(a,n,o)),ga(e,n,a);break;case 21:ga(e,n,a);break;case 22:_n=(o=_n)||a.memoizedState!==null,ga(e,n,a),_n=o;break;default:ga(e,n,a)}}function y0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Dr(e)}catch(a){He(n,n.return,a)}}}function E0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Dr(e)}catch(a){He(n,n.return,a)}}function pM(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new v0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new v0),n;default:throw Error(s(435,e.tag))}}function ru(e,n){var a=pM(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var c=EM.bind(null,e,o);o.then(c,c)}})}function Kn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var c=a[o],h=e,M=n,R=M;t:for(;R!==null;){switch(R.tag){case 27:if(es(R.type)){an=R.stateNode,Zn=!1;break t}break;case 5:an=R.stateNode,Zn=!1;break t;case 3:case 4:an=R.stateNode.containerInfo,Zn=!0;break t}R=R.return}if(an===null)throw Error(s(160));M0(h,M,c),an=null,Zn=!1,h=c.alternate,h!==null&&(h.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)b0(n,e),n=n.sibling}var Pi=null;function b0(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Kn(n,e),Qn(e),o&4&&(Za(3,e,e.return),Fo(3,e),Za(5,e,e.return));break;case 1:Kn(n,e),Qn(e),o&512&&(_n||a===null||qi(a,a.return)),o&64&&ma&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var c=Pi;if(Kn(n,e),Qn(e),o&512&&(_n||a===null||qi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,c=c.ownerDocument||c;e:switch(o){case"title":h=c.getElementsByTagName("title")[0],(!h||h[Pa]||h[hn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=c.createElement(o),c.head.insertBefore(h,c.querySelector("head > title"))),Nn(h,o,a),h[hn]=e,dn(h),o=h;break t;case"link":var M=b_("link","href",c).get(o+(a.href||""));if(M){for(var R=0;R<M.length;R++)if(h=M[R],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){M.splice(R,1);break e}}h=c.createElement(o),Nn(h,o,a),c.head.appendChild(h);break;case"meta":if(M=b_("meta","content",c).get(o+(a.content||""))){for(R=0;R<M.length;R++)if(h=M[R],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){M.splice(R,1);break e}}h=c.createElement(o),Nn(h,o,a),c.head.appendChild(h);break;default:throw Error(s(468,o))}h[hn]=e,dn(h),o=h}e.stateNode=o}else T_(c,e.type,e.stateNode);else e.stateNode=E_(c,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?T_(c,e.type,e.stateNode):E_(c,o,e.memoizedProps)):o===null&&e.stateNode!==null&&eh(e,e.memoizedProps,a.memoizedProps)}break;case 27:Kn(n,e),Qn(e),o&512&&(_n||a===null||qi(a,a.return)),a!==null&&o&4&&eh(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Kn(n,e),Qn(e),o&512&&(_n||a===null||qi(a,a.return)),e.flags&32){c=e.stateNode;try{ri(c,"")}catch(qt){He(e,e.return,qt)}}o&4&&e.stateNode!=null&&(c=e.memoizedProps,eh(e,c,a!==null?a.memoizedProps:c)),o&1024&&(ah=!0);break;case 6:if(Kn(n,e),Qn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(qt){He(e,e.return,qt)}}break;case 3:if(yu=null,c=Pi,Pi=Su(n.containerInfo),Kn(n,e),Pi=c,Qn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Dr(n.containerInfo)}catch(qt){He(e,e.return,qt)}ah&&(ah=!1,T0(e));break;case 4:o=Pi,Pi=Su(e.stateNode.containerInfo),Kn(n,e),Qn(e),Pi=o;break;case 12:Kn(n,e),Qn(e);break;case 31:Kn(n,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ru(e,o)));break;case 13:Kn(n,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(lu=Le()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ru(e,o)));break;case 22:c=e.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,et=ma,pt=_n;if(ma=et||c,_n=pt||z,Kn(n,e),_n=pt,ma=et,Qn(e),o&8192)t:for(n=e.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||z||ma||_n||Bs(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(h=z.stateNode,c)M=h.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{R=z.stateNode;var xt=z.memoizedProps.style,ot=xt!=null&&xt.hasOwnProperty("display")?xt.display:null;R.style.display=ot==null||typeof ot=="boolean"?"":(""+ot).trim()}}catch(qt){He(z,z.return,qt)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=c?"":z.memoizedProps}catch(qt){He(z,z.return,qt)}}}else if(n.tag===18){if(a===null){z=n;try{var lt=z.stateNode;c?p_(lt,!0):p_(z.stateNode,!1)}catch(qt){He(z,z.return,qt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,ru(e,a))));break;case 19:Kn(n,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ru(e,o)));break;case 30:break;case 21:break;default:Kn(n,e),Qn(e)}}function Qn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(g0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var c=a.stateNode,h=nh(e);su(e,h,c);break;case 5:var M=a.stateNode;a.flags&32&&(ri(M,""),a.flags&=-33);var R=nh(e);su(e,R,M);break;case 3:case 4:var z=a.stateNode.containerInfo,et=nh(e);ih(e,et,z);break;default:throw Error(s(161))}}catch(pt){He(e,e.return,pt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function T0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;T0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function _a(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)x0(e,n.alternate,n),n=n.sibling}function Bs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Za(4,n,n.return),Bs(n);break;case 1:qi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&p0(n,n.return,a),Bs(n);break;case 27:Yo(n.stateNode);case 26:case 5:qi(n,n.return),Bs(n);break;case 22:n.memoizedState===null&&Bs(n);break;case 30:Bs(n);break;default:Bs(n)}e=e.sibling}}function va(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,c=e,h=n,M=h.flags;switch(h.tag){case 0:case 11:case 15:va(c,h,a),Fo(4,h);break;case 1:if(va(c,h,a),o=h,c=o.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(et){He(o,o.return,et)}if(o=h,c=o.updateQueue,c!==null){var R=o.stateNode;try{var z=c.shared.hiddenCallbacks;if(z!==null)for(c.shared.hiddenCallbacks=null,c=0;c<z.length;c++)ng(z[c],R)}catch(et){He(o,o.return,et)}}a&&M&64&&d0(h),Bo(h,h.return);break;case 27:_0(h);case 26:case 5:va(c,h,a),a&&o===null&&M&4&&m0(h),Bo(h,h.return);break;case 12:va(c,h,a);break;case 31:va(c,h,a),a&&M&4&&y0(c,h);break;case 13:va(c,h,a),a&&M&4&&E0(c,h);break;case 22:h.memoizedState===null&&va(c,h,a),Bo(h,h.return);break;case 30:break;default:va(c,h,a)}n=n.sibling}}function sh(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&bo(a))}function rh(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&bo(e))}function Oi(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)A0(e,n,a,o),n=n.sibling}function A0(e,n,a,o){var c=n.flags;switch(n.tag){case 0:case 11:case 15:Oi(e,n,a,o),c&2048&&Fo(9,n);break;case 1:Oi(e,n,a,o);break;case 3:Oi(e,n,a,o),c&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&bo(e)));break;case 12:if(c&2048){Oi(e,n,a,o),e=n.stateNode;try{var h=n.memoizedProps,M=h.id,R=h.onPostCommit;typeof R=="function"&&R(M,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(z){He(n,n.return,z)}}else Oi(e,n,a,o);break;case 31:Oi(e,n,a,o);break;case 13:Oi(e,n,a,o);break;case 23:break;case 22:h=n.stateNode,M=n.alternate,n.memoizedState!==null?h._visibility&2?Oi(e,n,a,o):zo(e,n):h._visibility&2?Oi(e,n,a,o):(h._visibility|=2,xr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),c&2048&&sh(M,n);break;case 24:Oi(e,n,a,o),c&2048&&rh(n.alternate,n);break;default:Oi(e,n,a,o)}}function xr(e,n,a,o,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,M=n,R=a,z=o,et=M.flags;switch(M.tag){case 0:case 11:case 15:xr(h,M,R,z,c),Fo(8,M);break;case 23:break;case 22:var pt=M.stateNode;M.memoizedState!==null?pt._visibility&2?xr(h,M,R,z,c):zo(h,M):(pt._visibility|=2,xr(h,M,R,z,c)),c&&et&2048&&sh(M.alternate,M);break;case 24:xr(h,M,R,z,c),c&&et&2048&&rh(M.alternate,M);break;default:xr(h,M,R,z,c)}n=n.sibling}}function zo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,c=o.flags;switch(o.tag){case 22:zo(a,o),c&2048&&sh(o.alternate,o);break;case 24:zo(a,o),c&2048&&rh(o.alternate,o);break;default:zo(a,o)}n=n.sibling}}var Ho=8192;function Sr(e,n,a){if(e.subtreeFlags&Ho)for(e=e.child;e!==null;)R0(e,n,a),e=e.sibling}function R0(e,n,a){switch(e.tag){case 26:Sr(e,n,a),e.flags&Ho&&e.memoizedState!==null&&ty(a,Pi,e.memoizedState,e.memoizedProps);break;case 5:Sr(e,n,a);break;case 3:case 4:var o=Pi;Pi=Su(e.stateNode.containerInfo),Sr(e,n,a),Pi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Ho,Ho=16777216,Sr(e,n,a),Ho=o):Sr(e,n,a));break;default:Sr(e,n,a)}}function C0(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Go(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Rn=o,D0(o,e)}C0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)w0(e),e=e.sibling}function w0(e){switch(e.tag){case 0:case 11:case 15:Go(e),e.flags&2048&&Za(9,e,e.return);break;case 3:Go(e);break;case 12:Go(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,ou(e)):Go(e);break;default:Go(e)}}function ou(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Rn=o,D0(o,e)}C0(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Za(8,n,n.return),ou(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,ou(n));break;default:ou(n)}e=e.sibling}}function D0(e,n){for(;Rn!==null;){var a=Rn;switch(a.tag){case 0:case 11:case 15:Za(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:bo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Rn=o;else t:for(a=e;Rn!==null;){o=Rn;var c=o.sibling,h=o.return;if(S0(o),o===a){Rn=null;break t}if(c!==null){c.return=h,Rn=c;break t}Rn=h}}}var mM={getCacheForType:function(e){var n=Un(pn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Un(pn).controller.signal}},gM=typeof WeakMap=="function"?WeakMap:Map,De=0,Ke=null,ve=null,Se=0,ze=0,fi=null,Ka=!1,Mr=!1,oh=!1,xa=0,un=0,Qa=0,zs=0,lh=0,hi=0,yr=0,Vo=null,Jn=null,uh=!1,lu=0,U0=0,uu=1/0,cu=null,Ja=null,En=0,ja=null,Er=null,Sa=0,ch=0,fh=null,L0=null,ko=0,hh=null;function di(){return(De&2)!==0&&Se!==0?Se&-Se:B.T!==null?vh():fo()}function N0(){if(hi===0)if((Se&536870912)===0||Ee){var e=oe;oe<<=1,(oe&3932160)===0&&(oe=262144),hi=e}else hi=536870912;return e=ui.current,e!==null&&(e.flags|=32),hi}function jn(e,n,a){(e===Ke&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(br(e,0),$a(e,Se,hi,!1)),kt(e,a),((De&2)===0||e!==Ke)&&(e===Ke&&((De&2)===0&&(zs|=a),un===4&&$a(e,Se,hi,!1)),Yi(e))}function P0(e,n,a){if((De&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||wt(e,n),c=o?xM(e,n):ph(e,n,!0),h=o;do{if(c===0){Mr&&!o&&$a(e,n,0,!1);break}else{if(a=e.current.alternate,h&&!_M(a)){c=ph(e,n,!1),h=!1;continue}if(c===2){if(h=n,e.errorRecoveryDisabledLanes&h)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){n=M;t:{var R=e;c=Vo;var z=R.current.memoizedState.isDehydrated;if(z&&(br(R,M).flags|=256),M=ph(R,M,!1),M!==2){if(oh&&!z){R.errorRecoveryDisabledLanes|=h,zs|=h,c=4;break t}h=Jn,Jn=c,h!==null&&(Jn===null?Jn=h:Jn.push.apply(Jn,h))}c=M}if(h=!1,c!==2)continue}}if(c===1){br(e,0),$a(e,n,0,!0);break}t:{switch(o=e,h=c,h){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:$a(o,n,hi,!Ka);break t;case 2:Jn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=lu+300-Le(),10<c)){if($a(o,n,hi,!Ka),gt(o,0,!0)!==0)break t;Sa=n,o.timeoutHandle=f_(O0.bind(null,o,a,Jn,cu,uh,n,hi,zs,yr,Ka,h,"Throttled",-0,0),c);break t}O0(o,a,Jn,cu,uh,n,hi,zs,yr,Ka,h,null,-0,0)}}break}while(!0);Yi(e)}function O0(e,n,a,o,c,h,M,R,z,et,pt,xt,ot,lt){if(e.timeoutHandle=-1,xt=n.subtreeFlags,xt&8192||(xt&16785408)===16785408){xt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sa},R0(n,h,xt);var qt=(h&62914560)===h?lu-Le():(h&4194048)===h?U0-Le():0;if(qt=ey(xt,qt),qt!==null){Sa=h,e.cancelPendingCommit=qt(k0.bind(null,e,n,h,a,o,c,M,R,z,pt,xt,null,ot,lt)),$a(e,h,M,!et);return}}k0(e,n,h,a,o,c,M,R,z)}function _M(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var c=a[o],h=c.getSnapshot;c=c.value;try{if(!oi(h(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function $a(e,n,a,o){n&=~lh,n&=~zs,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var c=n;0<c;){var h=31-zt(c),M=1<<h;o[h]=-1,c&=~M}a!==0&&Oe(e,a,n)}function fu(){return(De&6)===0?(Xo(0),!1):!0}function dh(){if(ve!==null){if(ze===0)var e=ve.return;else e=ve,ua=Ds=null,wf(e),pr=null,Ao=0,e=ve;for(;e!==null;)h0(e.alternate,e),e=e.return;ve=null}}function br(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,FM(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Sa=0,dh(),Ke=e,ve=a=oa(e.current,null),Se=n,ze=0,fi=null,Ka=!1,Mr=wt(e,n),oh=!1,yr=hi=lh=zs=Qa=un=0,Jn=Vo=null,uh=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var c=31-zt(o),h=1<<c;n|=e[c],o&=~h}return xa=n,Ll(),a}function I0(e,n){de=null,B.H=Po,n===dr||n===Hl?(n=jm(),ze=3):n===_f?(n=jm(),ze=4):ze=n===Wf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,fi=n,ve===null&&(un=1,tu(e,Mi(n,e.current)))}function F0(){var e=ui.current;return e===null?!0:(Se&4194048)===Se?Ti===null:(Se&62914560)===Se||(Se&536870912)!==0?e===Ti:!1}function B0(){var e=B.H;return B.H=Po,e===null?Po:e}function z0(){var e=B.A;return B.A=mM,e}function hu(){un=4,Ka||(Se&4194048)!==Se&&ui.current!==null||(Mr=!0),(Qa&134217727)===0&&(zs&134217727)===0||Ke===null||$a(Ke,Se,hi,!1)}function ph(e,n,a){var o=De;De|=2;var c=B0(),h=z0();(Ke!==e||Se!==n)&&(cu=null,br(e,n)),n=!1;var M=un;t:do try{if(ze!==0&&ve!==null){var R=ve,z=fi;switch(ze){case 8:dh(),M=6;break t;case 3:case 2:case 9:case 6:ui.current===null&&(n=!0);var et=ze;if(ze=0,fi=null,Tr(e,R,z,et),a&&Mr){M=0;break t}break;default:et=ze,ze=0,fi=null,Tr(e,R,z,et)}}vM(),M=un;break}catch(pt){I0(e,pt)}while(!0);return n&&e.shellSuspendCounter++,ua=Ds=null,De=o,B.H=c,B.A=h,ve===null&&(Ke=null,Se=0,Ll()),M}function vM(){for(;ve!==null;)H0(ve)}function xM(e,n){var a=De;De|=2;var o=B0(),c=z0();Ke!==e||Se!==n?(cu=null,uu=Le()+500,br(e,n)):Mr=wt(e,n);t:do try{if(ze!==0&&ve!==null){n=ve;var h=fi;e:switch(ze){case 1:ze=0,fi=null,Tr(e,n,h,1);break;case 2:case 9:if(Qm(h)){ze=0,fi=null,G0(n);break}n=function(){ze!==2&&ze!==9||Ke!==e||(ze=7),Yi(e)},h.then(n,n);break t;case 3:ze=7;break t;case 4:ze=5;break t;case 7:Qm(h)?(ze=0,fi=null,G0(n)):(ze=0,fi=null,Tr(e,n,h,7));break;case 5:var M=null;switch(ve.tag){case 26:M=ve.memoizedState;case 5:case 27:var R=ve;if(M?A_(M):R.stateNode.complete){ze=0,fi=null;var z=R.sibling;if(z!==null)ve=z;else{var et=R.return;et!==null?(ve=et,du(et)):ve=null}break e}}ze=0,fi=null,Tr(e,n,h,5);break;case 6:ze=0,fi=null,Tr(e,n,h,6);break;case 8:dh(),un=6;break t;default:throw Error(s(462))}}SM();break}catch(pt){I0(e,pt)}while(!0);return ua=Ds=null,B.H=o,B.A=c,De=a,ve!==null?0:(Ke=null,Se=0,Ll(),un)}function SM(){for(;ve!==null&&!$e();)H0(ve)}function H0(e){var n=c0(e.alternate,e,xa);e.memoizedProps=e.pendingProps,n===null?du(e):ve=n}function G0(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=a0(a,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=a0(a,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:wf(n);default:h0(a,n),n=ve=zm(n,xa),n=c0(a,n,xa)}e.memoizedProps=e.pendingProps,n===null?du(e):ve=n}function Tr(e,n,a,o){ua=Ds=null,wf(n),pr=null,Ao=0;var c=n.return;try{if(lM(e,c,n,a,Se)){un=1,tu(e,Mi(a,e.current)),ve=null;return}}catch(h){if(c!==null)throw ve=c,h;un=1,tu(e,Mi(a,e.current)),ve=null;return}n.flags&32768?(Ee||o===1?e=!0:Mr||(Se&536870912)!==0?e=!1:(Ka=e=!0,(o===2||o===9||o===3||o===6)&&(o=ui.current,o!==null&&o.tag===13&&(o.flags|=16384))),V0(n,e)):du(n)}function du(e){var n=e;do{if((n.flags&32768)!==0){V0(n,Ka);return}e=n.return;var a=fM(n.alternate,n,xa);if(a!==null){ve=a;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=e}while(n!==null);un===0&&(un=5)}function V0(e,n){do{var a=hM(e.alternate,e);if(a!==null){a.flags&=32767,ve=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ve=e;return}ve=e=a}while(e!==null);un=6,ve=null}function k0(e,n,a,o,c,h,M,R,z){e.cancelPendingCommit=null;do pu();while(En!==0);if((De&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(h=n.lanes|n.childLanes,h|=ef,tn(e,a,h,M,R,z),e===Ke&&(ve=Ke=null,Se=0),Er=n,ja=e,Sa=a,ch=h,fh=c,L0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,bM(j,function(){return Z0(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,c=H.p,H.p=2,M=De,De|=4;try{dM(e,n,a)}finally{De=M,H.p=c,B.T=o}}En=1,X0(),W0(),q0()}}function X0(){if(En===1){En=0;var e=ja,n=Er,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var o=H.p;H.p=2;var c=De;De|=4;try{b0(n,e);var h=Ah,M=Dm(e.containerInfo),R=h.focusedElem,z=h.selectionRange;if(M!==R&&R&&R.ownerDocument&&wm(R.ownerDocument.documentElement,R)){if(z!==null&&Qc(R)){var et=z.start,pt=z.end;if(pt===void 0&&(pt=et),"selectionStart"in R)R.selectionStart=et,R.selectionEnd=Math.min(pt,R.value.length);else{var xt=R.ownerDocument||document,ot=xt&&xt.defaultView||window;if(ot.getSelection){var lt=ot.getSelection(),qt=R.textContent.length,ae=Math.min(z.start,qt),qe=z.end===void 0?ae:Math.min(z.end,qt);!lt.extend&&ae>qe&&(M=qe,qe=ae,ae=M);var Q=Cm(R,ae),V=Cm(R,qe);if(Q&&V&&(lt.rangeCount!==1||lt.anchorNode!==Q.node||lt.anchorOffset!==Q.offset||lt.focusNode!==V.node||lt.focusOffset!==V.offset)){var tt=xt.createRange();tt.setStart(Q.node,Q.offset),lt.removeAllRanges(),ae>qe?(lt.addRange(tt),lt.extend(V.node,V.offset)):(tt.setEnd(V.node,V.offset),lt.addRange(tt))}}}}for(xt=[],lt=R;lt=lt.parentNode;)lt.nodeType===1&&xt.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<xt.length;R++){var vt=xt[R];vt.element.scrollLeft=vt.left,vt.element.scrollTop=vt.top}}Au=!!Th,Ah=Th=null}finally{De=c,H.p=o,B.T=a}}e.current=n,En=2}}function W0(){if(En===2){En=0;var e=ja,n=Er,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var o=H.p;H.p=2;var c=De;De|=4;try{x0(e,n.alternate,n)}finally{De=c,H.p=o,B.T=a}}En=3}}function q0(){if(En===4||En===3){En=0,q();var e=ja,n=Er,a=Sa,o=L0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?En=5:(En=0,Er=ja=null,Y0(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(Ja=null),co(a),n=n.stateNode,dt&&typeof dt.onCommitFiberRoot=="function")try{dt.onCommitFiberRoot(ft,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=B.T,c=H.p,H.p=2,B.T=null;try{for(var h=e.onRecoverableError,M=0;M<o.length;M++){var R=o[M];h(R.value,{componentStack:R.stack})}}finally{B.T=n,H.p=c}}(Sa&3)!==0&&pu(),Yi(e),c=e.pendingLanes,(a&261930)!==0&&(c&42)!==0?e===hh?ko++:(ko=0,hh=e):ko=0,Xo(0)}}function Y0(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,bo(n)))}function pu(){return X0(),W0(),q0(),Z0()}function Z0(){if(En!==5)return!1;var e=ja,n=ch;ch=0;var a=co(Sa),o=B.T,c=H.p;try{H.p=32>a?32:a,B.T=null,a=fh,fh=null;var h=ja,M=Sa;if(En=0,Er=ja=null,Sa=0,(De&6)!==0)throw Error(s(331));var R=De;if(De|=4,w0(h.current),A0(h,h.current,M,a),De=R,Xo(0,!1),dt&&typeof dt.onPostCommitFiberRoot=="function")try{dt.onPostCommitFiberRoot(ft,h)}catch{}return!0}finally{H.p=c,B.T=o,Y0(e,n)}}function K0(e,n,a){n=Mi(a,n),n=Xf(e.stateNode,n,2),e=Wa(e,n,2),e!==null&&(kt(e,2),Yi(e))}function He(e,n,a){if(e.tag===3)K0(e,e,a);else for(;n!==null;){if(n.tag===3){K0(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ja===null||!Ja.has(o))){e=Mi(a,e),a=Qg(2),o=Wa(n,a,2),o!==null&&(Jg(a,o,n,e),kt(o,2),Yi(o));break}}n=n.return}}function mh(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new gM;var c=new Set;o.set(n,c)}else c=o.get(n),c===void 0&&(c=new Set,o.set(n,c));c.has(a)||(oh=!0,c.add(a),e=MM.bind(null,e,n,a),n.then(e,e))}function MM(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ke===e&&(Se&a)===a&&(un===4||un===3&&(Se&62914560)===Se&&300>Le()-lu?(De&2)===0&&br(e,0):lh|=a,yr===Se&&(yr=0)),Yi(e)}function Q0(e,n){n===0&&(n=bt()),e=Rs(e,n),e!==null&&(kt(e,n),Yi(e))}function yM(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Q0(e,a)}function EM(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,c=e.memoizedState;c!==null&&(a=c.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Q0(e,a)}function bM(e,n){return ke(e,n)}var mu=null,Ar=null,gh=!1,gu=!1,_h=!1,ts=0;function Yi(e){e!==Ar&&e.next===null&&(Ar===null?mu=Ar=e:Ar=Ar.next=e),gu=!0,gh||(gh=!0,AM())}function Xo(e,n){if(!_h&&gu){_h=!0;do for(var a=!1,o=mu;o!==null;){if(e!==0){var c=o.pendingLanes;if(c===0)var h=0;else{var M=o.suspendedLanes,R=o.pingedLanes;h=(1<<31-zt(42|e)+1)-1,h&=c&~(M&~R),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,t_(o,h))}else h=Se,h=gt(o,o===Ke?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||wt(o,h)||(a=!0,t_(o,h));o=o.next}while(a);_h=!1}}function TM(){J0()}function J0(){gu=gh=!1;var e=0;ts!==0&&IM()&&(e=ts);for(var n=Le(),a=null,o=mu;o!==null;){var c=o.next,h=j0(o,n);h===0?(o.next=null,a===null?mu=c:a.next=c,c===null&&(Ar=a)):(a=o,(e!==0||(h&3)!==0)&&(gu=!0)),o=c}En!==0&&En!==5||Xo(e),ts!==0&&(ts=0)}function j0(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,c=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var M=31-zt(h),R=1<<M,z=c[M];z===-1?((R&a)===0||(R&o)!==0)&&(c[M]=Bt(R,n)):z<=n&&(e.expiredLanes|=R),h&=~R}if(n=Ke,a=Se,a=gt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Ue(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||wt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&Ue(o),co(a)){case 2:case 8:a=E;break;case 32:a=j;break;case 268435456:a=ht;break;default:a=j}return o=$0.bind(null,e),a=ke(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&Ue(o),e.callbackPriority=2,e.callbackNode=null,2}function $0(e,n){if(En!==0&&En!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(pu()&&e.callbackNode!==a)return null;var o=Se;return o=gt(e,e===Ke?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(P0(e,o,n),j0(e,Le()),e.callbackNode!=null&&e.callbackNode===a?$0.bind(null,e):null)}function t_(e,n){if(pu())return null;P0(e,n,!0)}function AM(){BM(function(){(De&6)!==0?ke(L,TM):J0()})}function vh(){if(ts===0){var e=fr;e===0&&(e=ee,ee<<=1,(ee&261888)===0&&(ee=256)),ts=e}return ts}function e_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Es(""+e)}function n_(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function RM(e,n,a,o,c){if(n==="submit"&&a&&a.stateNode===c){var h=e_((c[wn]||null).action),M=o.submitter;M&&(n=(n=M[wn]||null)?e_(n.formAction):M.getAttribute("formAction"),n!==null&&(h=n,M=null));var R=new Cl("action","action",null,o,c);e.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(ts!==0){var z=M?n_(c,M):new FormData(c);Bf(a,{pending:!0,data:z,method:c.method,action:h},null,z)}}else typeof h=="function"&&(R.preventDefault(),z=M?n_(c,M):new FormData(c),Bf(a,{pending:!0,data:z,method:c.method,action:h},h,z))},currentTarget:c}]})}}for(var xh=0;xh<tf.length;xh++){var Sh=tf[xh],CM=Sh.toLowerCase(),wM=Sh[0].toUpperCase()+Sh.slice(1);Ni(CM,"on"+wM)}Ni(Nm,"onAnimationEnd"),Ni(Pm,"onAnimationIteration"),Ni(Om,"onAnimationStart"),Ni("dblclick","onDoubleClick"),Ni("focusin","onFocus"),Ni("focusout","onBlur"),Ni(WS,"onTransitionRun"),Ni(qS,"onTransitionStart"),Ni(YS,"onTransitionCancel"),Ni(Im,"onTransitionEnd"),rt("onMouseEnter",["mouseout","mouseover"]),rt("onMouseLeave",["mouseout","mouseover"]),rt("onPointerEnter",["pointerout","pointerover"]),rt("onPointerLeave",["pointerout","pointerover"]),Y("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Y("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Y("onBeforeInput",["compositionend","keypress","textInput","paste"]),Y("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Y("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Y("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),DM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wo));function i_(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],c=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var M=o.length-1;0<=M;M--){var R=o[M],z=R.instance,et=R.currentTarget;if(R=R.listener,z!==h&&c.isPropagationStopped())break t;h=R,c.currentTarget=et;try{h(c)}catch(pt){Ul(pt)}c.currentTarget=null,h=z}else for(M=0;M<o.length;M++){if(R=o[M],z=R.instance,et=R.currentTarget,R=R.listener,z!==h&&c.isPropagationStopped())break t;h=R,c.currentTarget=et;try{h(c)}catch(pt){Ul(pt)}c.currentTarget=null,h=z}}}}function xe(e,n){var a=n[Ss];a===void 0&&(a=n[Ss]=new Set);var o=e+"__bubble";a.has(o)||(a_(n,e,2,!1),a.add(o))}function Mh(e,n,a){var o=0;n&&(o|=4),a_(a,e,o,n)}var _u="_reactListening"+Math.random().toString(36).slice(2);function yh(e){if(!e[_u]){e[_u]=!0,bl.forEach(function(a){a!=="selectionchange"&&(DM.has(a)||Mh(a,!1,e),Mh(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[_u]||(n[_u]=!0,Mh("selectionchange",!1,n))}}function a_(e,n,a,o){switch(N_(n)){case 2:var c=ay;break;case 8:c=sy;break;default:c=Fh}a=c.bind(null,n,a,e),c=void 0,!Gc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),o?c!==void 0?e.addEventListener(n,a,{capture:!0,passive:c}):e.addEventListener(n,a,!0):c!==void 0?e.addEventListener(n,a,{passive:c}):e.addEventListener(n,a,!1)}function Eh(e,n,a,o,c){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var M=o.tag;if(M===3||M===4){var R=o.stateNode.containerInfo;if(R===c)break;if(M===4)for(M=o.return;M!==null;){var z=M.tag;if((z===3||z===4)&&M.stateNode.containerInfo===c)return;M=M.return}for(;R!==null;){if(M=ia(R),M===null)return;if(z=M.tag,z===5||z===6||z===26||z===27){o=h=M;continue t}R=R.parentNode}}o=o.return}um(function(){var et=h,pt=zc(a),xt=[];t:{var ot=Fm.get(e);if(ot!==void 0){var lt=Cl,qt=e;switch(e){case"keypress":if(Al(a)===0)break t;case"keydown":case"keyup":lt=ES;break;case"focusin":qt="focus",lt=Wc;break;case"focusout":qt="blur",lt=Wc;break;case"beforeblur":case"afterblur":lt=Wc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=hm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=fS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=AS;break;case Nm:case Pm:case Om:lt=pS;break;case Im:lt=CS;break;case"scroll":case"scrollend":lt=uS;break;case"wheel":lt=DS;break;case"copy":case"cut":case"paste":lt=gS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=pm;break;case"toggle":case"beforetoggle":lt=LS}var ae=(n&4)!==0,qe=!ae&&(e==="scroll"||e==="scrollend"),Q=ae?ot!==null?ot+"Capture":null:ot;ae=[];for(var V=et,tt;V!==null;){var vt=V;if(tt=vt.stateNode,vt=vt.tag,vt!==5&&vt!==26&&vt!==27||tt===null||Q===null||(vt=ho(V,Q),vt!=null&&ae.push(qo(V,vt,tt))),qe)break;V=V.return}0<ae.length&&(ot=new lt(ot,qt,null,a,pt),xt.push({event:ot,listeners:ae}))}}if((n&7)===0){t:{if(ot=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",ot&&a!==Bc&&(qt=a.relatedTarget||a.fromElement)&&(ia(qt)||qt[qn]))break t;if((lt||ot)&&(ot=pt.window===pt?pt:(ot=pt.ownerDocument)?ot.defaultView||ot.parentWindow:window,lt?(qt=a.relatedTarget||a.toElement,lt=et,qt=qt?ia(qt):null,qt!==null&&(qe=u(qt),ae=qt.tag,qt!==qe||ae!==5&&ae!==27&&ae!==6)&&(qt=null)):(lt=null,qt=et),lt!==qt)){if(ae=hm,vt="onMouseLeave",Q="onMouseEnter",V="mouse",(e==="pointerout"||e==="pointerover")&&(ae=pm,vt="onPointerLeave",Q="onPointerEnter",V="pointer"),qe=lt==null?ot:ys(lt),tt=qt==null?ot:ys(qt),ot=new ae(vt,V+"leave",lt,a,pt),ot.target=qe,ot.relatedTarget=tt,vt=null,ia(pt)===et&&(ae=new ae(Q,V+"enter",qt,a,pt),ae.target=tt,ae.relatedTarget=qe,vt=ae),qe=vt,lt&&qt)e:{for(ae=UM,Q=lt,V=qt,tt=0,vt=Q;vt;vt=ae(vt))tt++;vt=0;for(var ie=V;ie;ie=ae(ie))vt++;for(;0<tt-vt;)Q=ae(Q),tt--;for(;0<vt-tt;)V=ae(V),vt--;for(;tt--;){if(Q===V||V!==null&&Q===V.alternate){ae=Q;break e}Q=ae(Q),V=ae(V)}ae=null}else ae=null;lt!==null&&s_(xt,ot,lt,ae,!1),qt!==null&&qe!==null&&s_(xt,qe,qt,ae,!0)}}t:{if(ot=et?ys(et):window,lt=ot.nodeName&&ot.nodeName.toLowerCase(),lt==="select"||lt==="input"&&ot.type==="file")var Ce=ym;else if(Sm(ot))if(Em)Ce=VS;else{Ce=HS;var Qt=zS}else lt=ot.nodeName,!lt||lt.toLowerCase()!=="input"||ot.type!=="checkbox"&&ot.type!=="radio"?et&&Ne(et.elementType)&&(Ce=ym):Ce=GS;if(Ce&&(Ce=Ce(e,et))){Mm(xt,Ce,a,pt);break t}Qt&&Qt(e,ot,et),e==="focusout"&&et&&ot.type==="number"&&et.memoizedProps.value!=null&&_e(ot,"number",ot.value)}switch(Qt=et?ys(et):window,e){case"focusin":(Sm(Qt)||Qt.contentEditable==="true")&&(ir=Qt,Jc=et,Mo=null);break;case"focusout":Mo=Jc=ir=null;break;case"mousedown":jc=!0;break;case"contextmenu":case"mouseup":case"dragend":jc=!1,Um(xt,a,pt);break;case"selectionchange":if(XS)break;case"keydown":case"keyup":Um(xt,a,pt)}var pe;if(Yc)t:{switch(e){case"compositionstart":var Me="onCompositionStart";break t;case"compositionend":Me="onCompositionEnd";break t;case"compositionupdate":Me="onCompositionUpdate";break t}Me=void 0}else nr?vm(e,a)&&(Me="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Me="onCompositionStart");Me&&(mm&&a.locale!=="ko"&&(nr||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&nr&&(pe=cm()):(Ba=pt,Vc="value"in Ba?Ba.value:Ba.textContent,nr=!0)),Qt=vu(et,Me),0<Qt.length&&(Me=new dm(Me,e,null,a,pt),xt.push({event:Me,listeners:Qt}),pe?Me.data=pe:(pe=xm(a),pe!==null&&(Me.data=pe)))),(pe=PS?OS(e,a):IS(e,a))&&(Me=vu(et,"onBeforeInput"),0<Me.length&&(Qt=new dm("onBeforeInput","beforeinput",null,a,pt),xt.push({event:Qt,listeners:Me}),Qt.data=pe)),RM(xt,e,et,a,pt)}i_(xt,n)})}function qo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function vu(e,n){for(var a=n+"Capture",o=[];e!==null;){var c=e,h=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||h===null||(c=ho(e,a),c!=null&&o.unshift(qo(e,c,h)),c=ho(e,n),c!=null&&o.push(qo(e,c,h))),e.tag===3)return o;e=e.return}return[]}function UM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function s_(e,n,a,o,c){for(var h=n._reactName,M=[];a!==null&&a!==o;){var R=a,z=R.alternate,et=R.stateNode;if(R=R.tag,z!==null&&z===o)break;R!==5&&R!==26&&R!==27||et===null||(z=et,c?(et=ho(a,h),et!=null&&M.unshift(qo(a,et,z))):c||(et=ho(a,h),et!=null&&M.push(qo(a,et,z)))),a=a.return}M.length!==0&&e.push({event:n,listeners:M})}var LM=/\r\n?/g,NM=/\u0000|\uFFFD/g;function r_(e){return(typeof e=="string"?e:""+e).replace(LM,`
`).replace(NM,"")}function o_(e,n){return n=r_(n),r_(e)===n}function We(e,n,a,o,c,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||ri(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&ri(e,""+o);break;case"className":Wt(e,"class",o);break;case"tabIndex":Wt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Wt(e,a,o);break;case"style":Li(e,o,h);break;case"data":if(n!=="object"){Wt(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Es(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&We(e,n,"name",c.name,c,null),We(e,n,"formEncType",c.formEncType,c,null),We(e,n,"formMethod",c.formMethod,c,null),We(e,n,"formTarget",c.formTarget,c,null)):(We(e,n,"encType",c.encType,c,null),We(e,n,"method",c.method,c,null),We(e,n,"target",c.target,c,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Es(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=sa);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Es(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":xe("beforetoggle",e),xe("toggle",e),Nt(e,"popover",o);break;case"xlinkActuate":Xt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Xt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Xt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Xt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Xt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Xt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Nt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ki.get(a)||a,Nt(e,a,o))}}function bh(e,n,a,o,c,h){switch(a){case"style":Li(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?ri(e,o):(typeof o=="number"||typeof o=="bigint")&&ri(e,""+o);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"onClick":o!=null&&(e.onclick=sa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),h=e[wn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(n,h,c),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,c);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Nt(e,a,o)}}}function Nn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var o=!1,c=!1,h;for(h in a)if(a.hasOwnProperty(h)){var M=a[h];if(M!=null)switch(h){case"src":o=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:We(e,n,h,M,a,null)}}c&&We(e,n,"srcSet",a.srcSet,a,null),o&&We(e,n,"src",a.src,a,null);return;case"input":xe("invalid",e);var R=h=M=c=null,z=null,et=null;for(o in a)if(a.hasOwnProperty(o)){var pt=a[o];if(pt!=null)switch(o){case"name":c=pt;break;case"type":M=pt;break;case"checked":z=pt;break;case"defaultChecked":et=pt;break;case"value":h=pt;break;case"defaultValue":R=pt;break;case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(s(137,n));break;default:We(e,n,o,pt,a,null)}}In(e,h,R,z,et,M,c,!1);return;case"select":xe("invalid",e),o=M=h=null;for(c in a)if(a.hasOwnProperty(c)&&(R=a[c],R!=null))switch(c){case"value":h=R;break;case"defaultValue":M=R;break;case"multiple":o=R;default:We(e,n,c,R,a,null)}n=h,a=M,e.multiple=!!o,n!=null?yn(e,!!o,n,!1):a!=null&&yn(e,!!o,a,!0);return;case"textarea":xe("invalid",e),h=c=o=null;for(M in a)if(a.hasOwnProperty(M)&&(R=a[M],R!=null))switch(M){case"value":o=R;break;case"defaultValue":c=R;break;case"children":h=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:We(e,n,M,R,a,null)}Ui(e,o,c,h);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":We(e,n,z,o,a,null));return;case"dialog":xe("beforetoggle",e),xe("toggle",e),xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(o=0;o<Wo.length;o++)xe(Wo[o],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(et in a)if(a.hasOwnProperty(et)&&(o=a[et],o!=null))switch(et){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:We(e,n,et,o,a,null)}return;default:if(Ne(n)){for(pt in a)a.hasOwnProperty(pt)&&(o=a[pt],o!==void 0&&bh(e,n,pt,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&We(e,n,R,o,a,null))}function PM(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,h=null,M=null,R=null,z=null,et=null,pt=null;for(lt in a){var xt=a[lt];if(a.hasOwnProperty(lt)&&xt!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":z=xt;default:o.hasOwnProperty(lt)||We(e,n,lt,null,o,xt)}}for(var ot in o){var lt=o[ot];if(xt=a[ot],o.hasOwnProperty(ot)&&(lt!=null||xt!=null))switch(ot){case"type":h=lt;break;case"name":c=lt;break;case"checked":et=lt;break;case"defaultChecked":pt=lt;break;case"value":M=lt;break;case"defaultValue":R=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,n));break;default:lt!==xt&&We(e,n,ot,lt,o,xt)}}Ht(e,M,R,z,et,pt,h,c);return;case"select":lt=M=R=ot=null;for(h in a)if(z=a[h],a.hasOwnProperty(h)&&z!=null)switch(h){case"value":break;case"multiple":lt=z;default:o.hasOwnProperty(h)||We(e,n,h,null,o,z)}for(c in o)if(h=o[c],z=a[c],o.hasOwnProperty(c)&&(h!=null||z!=null))switch(c){case"value":ot=h;break;case"defaultValue":R=h;break;case"multiple":M=h;default:h!==z&&We(e,n,c,h,o,z)}n=R,a=M,o=lt,ot!=null?yn(e,!!a,ot,!1):!!o!=!!a&&(n!=null?yn(e,!!a,n,!0):yn(e,!!a,a?[]:"",!1));return;case"textarea":lt=ot=null;for(R in a)if(c=a[R],a.hasOwnProperty(R)&&c!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:We(e,n,R,null,o,c)}for(M in o)if(c=o[M],h=a[M],o.hasOwnProperty(M)&&(c!=null||h!=null))switch(M){case"value":ot=c;break;case"defaultValue":lt=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==h&&We(e,n,M,c,o,h)}si(e,ot,lt);return;case"option":for(var qt in a)ot=a[qt],a.hasOwnProperty(qt)&&ot!=null&&!o.hasOwnProperty(qt)&&(qt==="selected"?e.selected=!1:We(e,n,qt,null,o,ot));for(z in o)ot=o[z],lt=a[z],o.hasOwnProperty(z)&&ot!==lt&&(ot!=null||lt!=null)&&(z==="selected"?e.selected=ot&&typeof ot!="function"&&typeof ot!="symbol":We(e,n,z,ot,o,lt));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ae in a)ot=a[ae],a.hasOwnProperty(ae)&&ot!=null&&!o.hasOwnProperty(ae)&&We(e,n,ae,null,o,ot);for(et in o)if(ot=o[et],lt=a[et],o.hasOwnProperty(et)&&ot!==lt&&(ot!=null||lt!=null))switch(et){case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,n));break;default:We(e,n,et,ot,o,lt)}return;default:if(Ne(n)){for(var qe in a)ot=a[qe],a.hasOwnProperty(qe)&&ot!==void 0&&!o.hasOwnProperty(qe)&&bh(e,n,qe,void 0,o,ot);for(pt in o)ot=o[pt],lt=a[pt],!o.hasOwnProperty(pt)||ot===lt||ot===void 0&&lt===void 0||bh(e,n,pt,ot,o,lt);return}}for(var Q in a)ot=a[Q],a.hasOwnProperty(Q)&&ot!=null&&!o.hasOwnProperty(Q)&&We(e,n,Q,null,o,ot);for(xt in o)ot=o[xt],lt=a[xt],!o.hasOwnProperty(xt)||ot===lt||ot==null&&lt==null||We(e,n,xt,ot,o,lt)}function l_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function OM(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var c=a[o],h=c.transferSize,M=c.initiatorType,R=c.duration;if(h&&R&&l_(M)){for(M=0,R=c.responseEnd,o+=1;o<a.length;o++){var z=a[o],et=z.startTime;if(et>R)break;var pt=z.transferSize,xt=z.initiatorType;pt&&l_(xt)&&(z=z.responseEnd,M+=pt*(z<R?1:(R-et)/(z-et)))}if(--o,n+=8*(h+M)/(c.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Th=null,Ah=null;function xu(e){return e.nodeType===9?e:e.ownerDocument}function u_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function c_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Rh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ch=null;function IM(){var e=window.event;return e&&e.type==="popstate"?e===Ch?!1:(Ch=e,!0):(Ch=null,!1)}var f_=typeof setTimeout=="function"?setTimeout:void 0,FM=typeof clearTimeout=="function"?clearTimeout:void 0,h_=typeof Promise=="function"?Promise:void 0,BM=typeof queueMicrotask=="function"?queueMicrotask:typeof h_<"u"?function(e){return h_.resolve(null).then(e).catch(zM)}:f_;function zM(e){setTimeout(function(){throw e})}function es(e){return e==="head"}function d_(e,n){var a=n,o=0;do{var c=a.nextSibling;if(e.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(c),Dr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Yo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Yo(a);for(var h=a.firstChild;h;){var M=h.nextSibling,R=h.nodeName;h[Pa]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=M}}else a==="body"&&Yo(e.ownerDocument.body);a=c}while(a);Dr(n)}function p_(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function wh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":wh(a),Oa(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function HM(e,n,a,o){for(;e.nodeType===1;){var c=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Pa])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ai(e.nextSibling),e===null)break}return null}function GM(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Ai(e.nextSibling),e===null))return null;return e}function m_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ai(e.nextSibling),e===null))return null;return e}function Dh(e){return e.data==="$?"||e.data==="$~"}function Uh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function VM(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Ai(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Lh=null;function g_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return Ai(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function __(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function v_(e,n,a){switch(n=xu(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Yo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Oa(e)}var Ri=new Map,x_=new Set;function Su(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ma=H.d;H.d={f:kM,r:XM,D:WM,C:qM,L:YM,m:ZM,X:QM,S:KM,M:JM};function kM(){var e=Ma.f(),n=fu();return e||n}function XM(e){var n=aa(e);n!==null&&n.tag===5&&n.type==="form"?Ig(n):Ma.r(e)}var Rr=typeof document>"u"?null:document;function S_(e,n,a){var o=Rr;if(o&&typeof n=="string"&&n){var c=Fe(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),x_.has(c)||(x_.add(c),e={rel:e,crossOrigin:a,href:n},o.querySelector(c)===null&&(n=o.createElement("link"),Nn(n,"link",e),dn(n),o.head.appendChild(n)))}}function WM(e){Ma.D(e),S_("dns-prefetch",e,null)}function qM(e,n){Ma.C(e,n),S_("preconnect",e,n)}function YM(e,n,a){Ma.L(e,n,a);var o=Rr;if(o&&e&&n){var c='link[rel="preload"][as="'+Fe(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+Fe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+Fe(a.imageSizes)+'"]')):c+='[href="'+Fe(e)+'"]';var h=c;switch(n){case"style":h=Cr(e);break;case"script":h=wr(e)}Ri.has(h)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Ri.set(h,e),o.querySelector(c)!==null||n==="style"&&o.querySelector(Zo(h))||n==="script"&&o.querySelector(Ko(h))||(n=o.createElement("link"),Nn(n,"link",e),dn(n),o.head.appendChild(n)))}}function ZM(e,n){Ma.m(e,n);var a=Rr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+Fe(o)+'"][href="'+Fe(e)+'"]',h=c;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=wr(e)}if(!Ri.has(h)&&(e=v({rel:"modulepreload",href:e},n),Ri.set(h,e),a.querySelector(c)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ko(h)))return}o=a.createElement("link"),Nn(o,"link",e),dn(o),a.head.appendChild(o)}}}function KM(e,n,a){Ma.S(e,n,a);var o=Rr;if(o&&e){var c=Ia(o).hoistableStyles,h=Cr(e);n=n||"default";var M=c.get(h);if(!M){var R={loading:0,preload:null};if(M=o.querySelector(Zo(h)))R.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Ri.get(h))&&Nh(e,a);var z=M=o.createElement("link");dn(z),Nn(z,"link",e),z._p=new Promise(function(et,pt){z.onload=et,z.onerror=pt}),z.addEventListener("load",function(){R.loading|=1}),z.addEventListener("error",function(){R.loading|=2}),R.loading|=4,Mu(M,n,o)}M={type:"stylesheet",instance:M,count:1,state:R},c.set(h,M)}}}function QM(e,n){Ma.X(e,n);var a=Rr;if(a&&e){var o=Ia(a).hoistableScripts,c=wr(e),h=o.get(c);h||(h=a.querySelector(Ko(c)),h||(e=v({src:e,async:!0},n),(n=Ri.get(c))&&Ph(e,n),h=a.createElement("script"),dn(h),Nn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(c,h))}}function JM(e,n){Ma.M(e,n);var a=Rr;if(a&&e){var o=Ia(a).hoistableScripts,c=wr(e),h=o.get(c);h||(h=a.querySelector(Ko(c)),h||(e=v({src:e,async:!0,type:"module"},n),(n=Ri.get(c))&&Ph(e,n),h=a.createElement("script"),dn(h),Nn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(c,h))}}function M_(e,n,a,o){var c=(c=at.current)?Su(c):null;if(!c)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Cr(a.href),a=Ia(c).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Cr(a.href);var h=Ia(c).hoistableStyles,M=h.get(e);if(M||(c=c.ownerDocument||c,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,M),(h=c.querySelector(Zo(e)))&&!h._p&&(M.instance=h,M.state.loading=5),Ri.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ri.set(e,a),h||jM(c,e,a,M.state))),n&&o===null)throw Error(s(528,""));return M}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=wr(a),a=Ia(c).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Cr(e){return'href="'+Fe(e)+'"'}function Zo(e){return'link[rel="stylesheet"]['+e+"]"}function y_(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function jM(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Nn(n,"link",a),dn(n),e.head.appendChild(n))}function wr(e){return'[src="'+Fe(e)+'"]'}function Ko(e){return"script[async]"+e}function E_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+Fe(a.href)+'"]');if(o)return n.instance=o,dn(o),o;var c=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),dn(o),Nn(o,"style",c),Mu(o,a.precedence,e),n.instance=o;case"stylesheet":c=Cr(a.href);var h=e.querySelector(Zo(c));if(h)return n.state.loading|=4,n.instance=h,dn(h),h;o=y_(a),(c=Ri.get(c))&&Nh(o,c),h=(e.ownerDocument||e).createElement("link"),dn(h);var M=h;return M._p=new Promise(function(R,z){M.onload=R,M.onerror=z}),Nn(h,"link",o),n.state.loading|=4,Mu(h,a.precedence,e),n.instance=h;case"script":return h=wr(a.src),(c=e.querySelector(Ko(h)))?(n.instance=c,dn(c),c):(o=a,(c=Ri.get(h))&&(o=v({},a),Ph(o,c)),e=e.ownerDocument||e,c=e.createElement("script"),dn(c),Nn(c,"link",o),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,Mu(o,a.precedence,e));return n.instance}function Mu(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=o.length?o[o.length-1]:null,h=c,M=0;M<o.length;M++){var R=o[M];if(R.dataset.precedence===n)h=R;else if(h!==c)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Nh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Ph(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var yu=null;function b_(e,n,a){if(yu===null){var o=new Map,c=yu=new Map;c.set(a,o)}else c=yu,o=c.get(a),o||(o=new Map,c.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),c=0;c<a.length;c++){var h=a[c];if(!(h[Pa]||h[hn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var M=h.getAttribute(n)||"";M=e+M;var R=o.get(M);R?R.push(h):o.set(M,[h])}}return o}function T_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function $M(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function A_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ty(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=Cr(o.href),h=n.querySelector(Zo(c));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Eu.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=h,dn(h);return}h=n.ownerDocument||n,o=y_(o),(c=Ri.get(c))&&Nh(o,c),h=h.createElement("link"),dn(h);var M=h;M._p=new Promise(function(R,z){M.onload=R,M.onerror=z}),Nn(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Eu.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var Oh=0;function ey(e,n){return e.stylesheets&&e.count===0&&Tu(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&Tu(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&Oh===0&&(Oh=62500*OM());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Tu(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Oh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(c)}}:null}function Eu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Tu(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bu=null;function Tu(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bu=new Map,n.forEach(ny,e),bu=null,Eu.call(e))}function ny(e,n){if(!(n.state.loading&4)){var a=bu.get(e);if(a)var o=a.get(null);else{a=new Map,bu.set(e,a);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<c.length;h++){var M=c[h];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(a.set(M.dataset.precedence,M),o=M)}o&&a.set(null,o)}c=n.instance,M=c.getAttribute("data-precedence"),h=a.get(M)||o,h===o&&a.set(null,c),a.set(M,c),this.count++,o=Eu.bind(this),c.addEventListener("load",o),c.addEventListener("error",o),h?h.parentNode.insertBefore(c,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var Qo={$$typeof:O,Provider:null,Consumer:null,_currentValue:$,_currentValue2:$,_threadCount:0};function iy(e,n,a,o,c,h,M,R,z){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zt(0),this.hiddenUpdates=Zt(null),this.identifierPrefix=o,this.onUncaughtError=c,this.onCaughtError=h,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function R_(e,n,a,o,c,h,M,R,z,et,pt,xt){return e=new iy(e,n,a,M,z,et,pt,xt,R),n=1,h===!0&&(n|=24),h=li(3,null,null,n),e.current=h,h.stateNode=e,n=pf(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},vf(h),e}function C_(e){return e?(e=rr,e):rr}function w_(e,n,a,o,c,h){c=C_(c),o.context===null?o.context=c:o.pendingContext=c,o=Xa(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Wa(e,o,n),a!==null&&(jn(a,e,n),Co(a,e,n))}function D_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Ih(e,n){D_(e,n),(e=e.alternate)&&D_(e,n)}function U_(e){if(e.tag===13||e.tag===31){var n=Rs(e,67108864);n!==null&&jn(n,e,67108864),Ih(e,67108864)}}function L_(e){if(e.tag===13||e.tag===31){var n=di();n=uo(n);var a=Rs(e,n);a!==null&&jn(a,e,n),Ih(e,n)}}var Au=!0;function ay(e,n,a,o){var c=B.T;B.T=null;var h=H.p;try{H.p=2,Fh(e,n,a,o)}finally{H.p=h,B.T=c}}function sy(e,n,a,o){var c=B.T;B.T=null;var h=H.p;try{H.p=8,Fh(e,n,a,o)}finally{H.p=h,B.T=c}}function Fh(e,n,a,o){if(Au){var c=Bh(o);if(c===null)Eh(e,n,o,Ru,a),P_(e,o);else if(oy(c,e,n,a,o))o.stopPropagation();else if(P_(e,o),n&4&&-1<ry.indexOf(e)){for(;c!==null;){var h=aa(c);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var M=Rt(h.pendingLanes);if(M!==0){var R=h;for(R.pendingLanes|=2,R.entangledLanes|=2;M;){var z=1<<31-zt(M);R.entanglements[1]|=z,M&=~z}Yi(h),(De&6)===0&&(uu=Le()+500,Xo(0))}}break;case 31:case 13:R=Rs(h,2),R!==null&&jn(R,h,2),fu(),Ih(h,2)}if(h=Bh(o),h===null&&Eh(e,n,o,Ru,a),h===c)break;c=h}c!==null&&o.stopPropagation()}else Eh(e,n,o,null,a)}}function Bh(e){return e=zc(e),zh(e)}var Ru=null;function zh(e){if(Ru=null,e=ia(e),e!==null){var n=u(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Ru=e,null}function N_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(be()){case L:return 2;case E:return 8;case j:case st:return 32;case ht:return 268435456;default:return 32}default:return 32}}var Hh=!1,ns=null,is=null,as=null,Jo=new Map,jo=new Map,ss=[],ry="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function P_(e,n){switch(e){case"focusin":case"focusout":ns=null;break;case"dragenter":case"dragleave":is=null;break;case"mouseover":case"mouseout":as=null;break;case"pointerover":case"pointerout":Jo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(n.pointerId)}}function $o(e,n,a,o,c,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[c]},n!==null&&(n=aa(n),n!==null&&U_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function oy(e,n,a,o,c){switch(n){case"focusin":return ns=$o(ns,e,n,a,o,c),!0;case"dragenter":return is=$o(is,e,n,a,o,c),!0;case"mouseover":return as=$o(as,e,n,a,o,c),!0;case"pointerover":var h=c.pointerId;return Jo.set(h,$o(Jo.get(h)||null,e,n,a,o,c)),!0;case"gotpointercapture":return h=c.pointerId,jo.set(h,$o(jo.get(h)||null,e,n,a,o,c)),!0}return!1}function O_(e){var n=ia(e.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,$s(e.priority,function(){L_(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,$s(e.priority,function(){L_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Cu(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Bh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Bc=o,a.target.dispatchEvent(o),Bc=null}else return n=aa(a),n!==null&&U_(n),e.blockedOn=a,!1;n.shift()}return!0}function I_(e,n,a){Cu(e)&&a.delete(n)}function ly(){Hh=!1,ns!==null&&Cu(ns)&&(ns=null),is!==null&&Cu(is)&&(is=null),as!==null&&Cu(as)&&(as=null),Jo.forEach(I_),jo.forEach(I_)}function wu(e,n){e.blockedOn===n&&(e.blockedOn=null,Hh||(Hh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,ly)))}var Du=null;function F_(e){Du!==e&&(Du=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Du===e&&(Du=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],c=e[n+2];if(typeof o!="function"){if(zh(o||a)===null)continue;break}var h=aa(a);h!==null&&(e.splice(n,3),n-=3,Bf(h,{pending:!0,data:c,method:a.method,action:o},o,c))}}))}function Dr(e){function n(z){return wu(z,e)}ns!==null&&wu(ns,e),is!==null&&wu(is,e),as!==null&&wu(as,e),Jo.forEach(n),jo.forEach(n);for(var a=0;a<ss.length;a++){var o=ss[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ss.length&&(a=ss[0],a.blockedOn===null);)O_(a),a.blockedOn===null&&ss.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var c=a[o],h=a[o+1],M=c[wn]||null;if(typeof h=="function")M||F_(a);else if(M){var R=null;if(h&&h.hasAttribute("formAction")){if(c=h,M=h[wn]||null)R=M.formAction;else if(zh(c)!==null)continue}else R=M.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),F_(a)}}}function B_(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(M){return c=M})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Gh(e){this._internalRoot=e}Uu.prototype.render=Gh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=di();w_(a,o,e,n,null,null)},Uu.prototype.unmount=Gh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;w_(e.current,2,null,e,null,null),fu(),n[qn]=null}};function Uu(e){this._internalRoot=e}Uu.prototype.unstable_scheduleHydration=function(e){if(e){var n=fo();e={blockedOn:null,target:e,priority:n};for(var a=0;a<ss.length&&n!==0&&n<ss[a].priority;a++);ss.splice(a,0,e),a===0&&O_(e)}};var z_=t.version;if(z_!=="19.2.3")throw Error(s(527,z_,"19.2.3"));H.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=d(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var uy={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Lu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Lu.isDisabled&&Lu.supportsFiber)try{ft=Lu.inject(uy),dt=Lu}catch{}}return el.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",c=qg,h=Yg,M=Zg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(M=n.onRecoverableError)),n=R_(e,1,!1,null,null,a,o,null,c,h,M,B_),e[qn]=n.current,yh(e),new Gh(n)},el.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,c="",h=qg,M=Yg,R=Zg,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(M=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=R_(e,1,!0,n,a??null,o,c,z,h,M,R,B_),n.context=C_(null),a=n.current,o=di(),o=uo(o),c=Xa(o),c.callback=null,Wa(a,c,o),a=o,n.current.lanes=a,kt(n,a),Yi(n),e[qn]=n.current,yh(e),new Uu(n)},el.version="19.2.3",el}var K_;function My(){if(K_)return Xh.exports;K_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Xh.exports=Sy(),Xh.exports}var yy=My();var Tp=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,ux=/^[\\/]{2}/;function Ey(r,t){return t+r.replace(/\\/g,"/")}var Q_="popstate";function J_(r){return typeof r=="object"&&r!=null&&"pathname"in r&&"search"in r&&"hash"in r&&"state"in r&&"key"in r}function by(r={}){function t(s,l){let u=l.state?.masked,{pathname:f,search:p,hash:m}=u||s.location;return Dd("",{pathname:f,search:p,hash:m},l.state&&l.state.usr||null,l.state&&l.state.key||"default",u?{pathname:s.location.pathname,search:s.location.search,hash:s.location.hash}:void 0)}function i(s,l){return typeof l=="string"?l:hl(l)}return Ay(t,i,null,r)}function rn(r,t){if(r===!1||r===null||typeof r>"u")throw new Error(t)}function ea(r,t){if(!r){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ty(){return Math.random().toString(36).substring(2,10)}function j_(r,t){return{usr:r.state,key:r.key,idx:t,masked:r.mask?{pathname:r.pathname,search:r.search,hash:r.hash}:void 0}}function Dd(r,t,i=null,s,l){return{pathname:typeof r=="string"?r:r.pathname,search:"",hash:"",...typeof t=="string"?ao(t):t,state:i,key:t&&t.key||s||Ty(),mask:l}}function hl({pathname:r="/",search:t="",hash:i=""}){return t&&t!=="?"&&(r+=t.charAt(0)==="?"?t:"?"+t),i&&i!=="#"&&(r+=i.charAt(0)==="#"?i:"#"+i),r}function ao(r){let t={};if(r){let i=r.indexOf("#");i>=0&&(t.hash=r.substring(i),r=r.substring(0,i));let s=r.indexOf("?");s>=0&&(t.search=r.substring(s),r=r.substring(0,s)),r&&(t.pathname=r)}return t}function Ay(r,t,i,s={}){let{window:l=document.defaultView,v5Compat:u=!1}=s,f=l.history,p="POP",m=null,d=g();d==null&&(d=0,f.replaceState({...f.state,idx:d},""));function g(){return(f.state||{idx:null}).idx}function v(){p="POP";let x=g(),S=x==null?null:x-d;d=x,m&&m({action:p,location:C.location,delta:S})}function _(x,S){p="PUSH";let D=J_(x)?x:Dd(C.location,x,S);d=g()+1;let O=j_(D,d),w=C.createHref(D.mask||D);try{f.pushState(O,"",w)}catch(I){if(I instanceof DOMException&&I.name==="DataCloneError")throw I;l.location.assign(w)}u&&m&&m({action:p,location:C.location,delta:1})}function y(x,S){p="REPLACE";let D=J_(x)?x:Dd(C.location,x,S);d=g();let O=j_(D,d),w=C.createHref(D.mask||D);f.replaceState(O,"",w),u&&m&&m({action:p,location:C.location,delta:0})}function b(x){return Ry(l,x)}let C={get action(){return p},get location(){return r(l,f)},listen(x){if(m)throw new Error("A history only accepts one active listener");return l.addEventListener(Q_,v),m=x,()=>{l.removeEventListener(Q_,v),m=null}},createHref(x){return t(l,x)},createURL:b,encodeLocation(x){let S=b(x);return{pathname:S.pathname,search:S.search,hash:S.hash}},push:_,replace:y,go(x){return f.go(x)}};return C}function Ry(r,t,i=!1){let s="http://localhost";r&&(s=r.location.origin!=="null"?r.location.origin:r.location.href),rn(s,"No window.location.(origin|href) available to create URL");let l=typeof t=="string"?t:hl(t);return l=l.replace(/ $/,"%20"),!i&&ux.test(l)&&(l=s+l),new URL(l,s)}function cx(r,t,i="/"){return Cy(r,t,i,!1)}function Cy(r,t,i,s,l){let u=typeof t=="string"?ao(t):t,f=Da(u.pathname||"/",i);if(f==null)return null;let p=wy(r),m=null,d=Hy(f);for(let g=0;m==null&&g<p.length;++g)m=zy(p[g],d,s);return m}function wy(r){let t=fx(r);return Dy(t),t}function fx(r,t=[],i=[],s="",l=!1){let u=(f,p,m=l,d)=>{let g={relativePath:d===void 0?f.path||"":d,caseSensitive:f.caseSensitive===!0,childrenIndex:p,route:f};if(g.relativePath.startsWith("/")){if(!g.relativePath.startsWith(s)&&m)return;rn(g.relativePath.startsWith(s),`Absolute route path "${g.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),g.relativePath=g.relativePath.slice(s.length)}let v=Gi([s,g.relativePath]),_=i.concat(g);f.children&&f.children.length>0&&(rn(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${v}".`),fx(f.children,t,_,v,m)),!(f.path==null&&!f.index)&&t.push({path:v,score:Fy(v,f.index),routesMeta:_.map((y,b)=>{let[C,x]=px(y.relativePath,y.caseSensitive,b===_.length-1);return{...y,matcher:C,compiledParams:x}})})};return r.forEach((f,p)=>{if(f.path===""||!f.path?.includes("?"))u(f,p);else for(let m of hx(f.path))u(f,p,!0,m)}),t}function hx(r){let t=r.split("/");if(t.length===0)return[];let[i,...s]=t,l=i.endsWith("?"),u=i.replace(/\?$/,"");if(s.length===0)return l?[u,""]:[u];let f=hx(s.join("/")),p=[];return p.push(...f.map(m=>m===""?u:[u,m].join("/"))),l&&p.push(...f),p.map(m=>r.startsWith("/")&&m===""?"/":m)}function Dy(r){r.sort((t,i)=>t.score!==i.score?i.score-t.score:By(t.routesMeta.map(s=>s.childrenIndex),i.routesMeta.map(s=>s.childrenIndex)))}var Uy=/^:[\w-]+$/,Ly=3,Ny=2,Py=1,Oy=10,Iy=-2,$_=r=>r==="*";function Fy(r,t){let i=r.split("/"),s=i.length;return i.some($_)&&(s+=Iy),t&&(s+=Ny),i.filter(l=>!$_(l)).reduce((l,u)=>l+(Uy.test(u)?Ly:u===""?Py:Oy),s)}function By(r,t){return r.length===t.length&&r.slice(0,-1).every((s,l)=>s===t[l])?r[r.length-1]-t[t.length-1]:0}function zy(r,t,i=!1){let{routesMeta:s}=r,l={},u="/",f=[];for(let p=0;p<s.length;++p){let m=s[p],d=p===s.length-1,g=u==="/"?t:t.slice(u.length)||"/",v={path:m.relativePath,caseSensitive:m.caseSensitive,end:d},_=m.matcher&&m.compiledParams?dx(v,g,m.matcher,m.compiledParams):vc(v,g),y=m.route;if(!_&&d&&i&&!s[s.length-1].route.index&&(_=vc({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},g)),!_)return null;Object.assign(l,_.params),f.push({params:l,pathname:Gi([u,_.pathname]),pathnameBase:ky(Gi([u,_.pathnameBase])),route:y}),_.pathnameBase!=="/"&&(u=Gi([u,_.pathnameBase]))}return f}function vc(r,t){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[i,s]=px(r.path,r.caseSensitive,r.end);return dx(r,t,i,s)}function dx(r,t,i,s){let l=t.match(i);if(!l)return null;let u=l[0],f=u.replace(/(.)\/+$/,"$1"),p=l.slice(1);return{params:s.reduce((d,{paramName:g,isOptional:v},_)=>{if(g==="*"){let b=p[_]||"";f=u.slice(0,u.length-b.length).replace(/(.)\/+$/,"$1")}const y=p[_];return v&&!y?d[g]=void 0:d[g]=(y||"").replace(/%2F/g,"/"),d},{}),pathname:u,pathnameBase:f,pattern:r}}function px(r,t=!1,i=!0){ea(r==="*"||!r.endsWith("*")||r.endsWith("/*"),`Route path "${r}" will be treated as if it were "${r.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/,"/*")}".`);let s=[],l="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,p,m,d,g)=>{if(s.push({paramName:p,isOptional:m!=null}),m){let v=g.charAt(d+f.length);return v&&v!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return r.endsWith("*")?(s.push({paramName:"*"}),l+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?l+="\\/*$":r!==""&&r!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,t?void 0:"i"),s]}function Hy(r){try{return r.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ea(!1,`The URL path "${r}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),r}}function Da(r,t){if(t==="/")return r;if(!r.toLowerCase().startsWith(t.toLowerCase()))return null;let i=t.endsWith("/")?t.length-1:t.length,s=r.charAt(i);return s&&s!=="/"?null:r.slice(i)||"/"}function Gy(r,t="/"){let{pathname:i,search:s="",hash:l=""}=typeof r=="string"?ao(r):r,u;return i?(i=gx(i),i.startsWith("/")?u=tv(i.substring(1),"/"):u=tv(i,t)):u=t,{pathname:u,search:Xy(s),hash:Wy(l)}}function tv(r,t){let i=xc(t).split("/");return r.split("/").forEach(l=>{l===".."?i.length>1&&i.pop():l!=="."&&i.push(l)}),i.length>1?i.join("/"):"/"}function Zh(r,t,i,s){return`Cannot include a '${r}' character in a manually specified \`to.${t}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Vy(r){return r.filter((t,i)=>i===0||t.route.path&&t.route.path.length>0)}function mx(r){let t=Vy(r);return t.map((i,s)=>s===t.length-1?i.pathname:i.pathnameBase)}function Ap(r,t,i,s=!1){let l;typeof r=="string"?l=ao(r):(l={...r},rn(!l.pathname||!l.pathname.includes("?"),Zh("?","pathname","search",l)),rn(!l.pathname||!l.pathname.includes("#"),Zh("#","pathname","hash",l)),rn(!l.search||!l.search.includes("#"),Zh("#","search","hash",l)));let u=r===""||l.pathname==="",f=u?"/":l.pathname,p;if(f==null)p=i;else{let v=t.length-1;if(!s&&f.startsWith("..")){let _=f.split("/");for(;_[0]==="..";)_.shift(),v-=1;l.pathname=_.join("/")}p=v>=0?t[v]:"/"}let m=Gy(l,p),d=f&&f!=="/"&&f.endsWith("/"),g=(u||f===".")&&i.endsWith("/");return!m.pathname.endsWith("/")&&(d||g)&&(m.pathname+="/"),m}var gx=r=>r.replace(/[\\/]{2,}/g,"/"),Gi=r=>gx(r.join("/")),xc=r=>r.replace(/\/+$/,""),ky=r=>xc(r).replace(/^\/*/,"/"),Xy=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,Wy=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r,qy=class{constructor(r,t,i,s=!1){this.status=r,this.statusText=t||"",this.internal=s,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}};function Yy(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}function Zy(r){let t=r.map(i=>i.route.path).filter(Boolean);return Gi(t)||"/"}var _x=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function vx(r,t){let i=r;if(typeof i!="string"||!Tp.test(i))return{absoluteURL:void 0,isExternal:!1,to:i};let s=i,l=!1;if(_x)try{let u=new URL(window.location.href),f=ux.test(i)?new URL(Ey(i,u.protocol)):new URL(i),p=Da(f.pathname,t);f.origin===u.origin&&p!=null?i=p+f.search+f.hash:l=!0}catch{ea(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:s,isExternal:l,to:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var xx=["POST","PUT","PATCH","DELETE"];new Set(xx);var Ky=["GET",...xx];new Set(Ky);var Qy=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function Jy(r){try{return Qy.includes(new URL(r).protocol)}catch{return!1}}var so=mt.createContext(null);so.displayName="DataRouter";var wc=mt.createContext(null);wc.displayName="DataRouterState";var Sx=mt.createContext(!1);function jy(){return mt.useContext(Sx)}var Mx=mt.createContext({isTransitioning:!1});Mx.displayName="ViewTransition";var $y=mt.createContext(new Map);$y.displayName="Fetchers";var tE=mt.createContext(null);tE.displayName="Await";var Di=mt.createContext(null);Di.displayName="Navigation";var _l=mt.createContext(null);_l.displayName="Location";var La=mt.createContext({outlet:null,matches:[],isDataRoute:!1});La.displayName="Route";var Rp=mt.createContext(null);Rp.displayName="RouteError";var yx="REACT_ROUTER_ERROR",eE="REDIRECT",nE="ROUTE_ERROR_RESPONSE";function iE(r){if(r.startsWith(`${yx}:${eE}:{`))try{let t=JSON.parse(r.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function aE(r){if(r.startsWith(`${yx}:${nE}:{`))try{let t=JSON.parse(r.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new qy(t.status,t.statusText,t.data)}catch{}}function sE(r,{relative:t}={}){rn(vl(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:s}=mt.useContext(Di),{hash:l,pathname:u,search:f}=xl(r,{relative:t}),p=u;return i!=="/"&&(p=u==="/"?i:Gi([i,u])),s.createHref({pathname:p,search:f,hash:l})}function vl(){return mt.useContext(_l)!=null}function Na(){return rn(vl(),"useLocation() may be used only in the context of a <Router> component."),mt.useContext(_l).location}var Ex="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function bx(r){mt.useContext(Di).static||mt.useLayoutEffect(r)}function rE(){let{isDataRoute:r}=mt.useContext(La);return r?xE():oE()}function oE(){rn(vl(),"useNavigate() may be used only in the context of a <Router> component.");let r=mt.useContext(so),{basename:t,navigator:i}=mt.useContext(Di),{matches:s}=mt.useContext(La),{pathname:l}=Na(),u=JSON.stringify(mx(s)),f=mt.useRef(!1);return bx(()=>{f.current=!0}),mt.useCallback((m,d={})=>{if(ea(f.current,Ex),!f.current)return;if(typeof m=="number"){i.go(m);return}let g=Ap(m,JSON.parse(u),l,d.relative==="path");r==null&&t!=="/"&&(g.pathname=g.pathname==="/"?t:Gi([t,g.pathname])),(d.replace?i.replace:i.push)(g,d.state,d)},[t,i,u,l,r])}mt.createContext(null);function xl(r,{relative:t}={}){let{matches:i}=mt.useContext(La),{pathname:s}=Na(),l=JSON.stringify(mx(i));return mt.useMemo(()=>Ap(r,JSON.parse(l),s,t==="path"),[r,l,s,t])}function lE(r,t){return Tx(r,t)}function Tx(r,t,i){rn(vl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=mt.useContext(Di),{matches:l}=mt.useContext(La),u=l[l.length-1],f=u?u.params:{},p=u?u.pathname:"/",m=u?u.pathnameBase:"/",d=u&&u.route;{let x=d&&d.path||"";Rx(p,!d||x.endsWith("*")||x.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x==="/"?"*":`${x}/*`}">.`)}let g=Na(),v;if(t){let x=typeof t=="string"?ao(t):t;rn(m==="/"||x.pathname?.startsWith(m),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${x.pathname}" was given in the \`location\` prop.`),v=x}else v=g;let _=v.pathname||"/",y=_;if(m!=="/"){let x=m.replace(/^\//,"").split("/");y="/"+_.replace(/^\//,"").split("/").slice(x.length).join("/")}let b=i&&i.state.matches.length?i.state.matches.map(x=>Object.assign(x,{route:i.manifest[x.route.id]||x.route})):cx(r,{pathname:y});ea(d||b!=null,`No routes matched location "${v.pathname}${v.search}${v.hash}" `),ea(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let C=dE(b&&b.map(x=>Object.assign({},x,{params:Object.assign({},f,x.params),pathname:Gi([m,s.encodeLocation?s.encodeLocation(x.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?m:Gi([m,s.encodeLocation?s.encodeLocation(x.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:x.pathnameBase])})),l,i);return t&&C?mt.createElement(_l.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...v},navigationType:"POP"}},C):C}function uE(){let r=vE(),t=Yy(r)?`${r.status} ${r.statusText}`:r instanceof Error?r.message:JSON.stringify(r),i=r instanceof Error?r.stack:null,s="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:s},u={padding:"2px 4px",backgroundColor:s},f=null;return console.error("Error handled by React Router default ErrorBoundary:",r),f=mt.createElement(mt.Fragment,null,mt.createElement("p",null,"💿 Hey developer 👋"),mt.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",mt.createElement("code",{style:u},"ErrorBoundary")," or"," ",mt.createElement("code",{style:u},"errorElement")," prop on your route.")),mt.createElement(mt.Fragment,null,mt.createElement("h2",null,"Unexpected Application Error!"),mt.createElement("h3",{style:{fontStyle:"italic"}},t),i?mt.createElement("pre",{style:l},i):null,f)}var cE=mt.createElement(uE,null),Ax=class extends mt.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,t){return t.location!==r.location||t.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:t.error,location:t.location,revalidation:r.revalidation||t.revalidation}}componentDidCatch(r,t){this.props.onError?this.props.onError(r,t):console.error("React Router caught the following error during render",r)}render(){let r=this.state.error;if(this.context&&typeof r=="object"&&r&&"digest"in r&&typeof r.digest=="string"){const i=aE(r.digest);i&&(r=i)}let t=r!==void 0?mt.createElement(La.Provider,{value:this.props.routeContext},mt.createElement(Rp.Provider,{value:r,children:this.props.component})):this.props.children;return this.context?mt.createElement(fE,{error:r},t):t}};Ax.contextType=Sx;var Kh=new WeakMap;function fE({children:r,error:t}){let{basename:i}=mt.useContext(Di);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let s=iE(t.digest);if(s){let l=Kh.get(t);if(l)throw l;let u=vx(s.location,i),f=u.absoluteURL||u.to;if(Jy(f))throw new Error("Invalid redirect location");if(_x&&!Kh.get(t))if(u.isExternal||s.reloadDocument)window.location.href=f;else{const p=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(u.to,{replace:s.replace}));throw Kh.set(t,p),p}return mt.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f}`})}}return r}function hE({routeContext:r,match:t,children:i}){let s=mt.useContext(so);return s&&s.static&&s.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=t.route.id),mt.createElement(La.Provider,{value:r},i)}function dE(r,t=[],i){let s=i?.state;if(r==null){if(!s)return null;if(s.errors)r=s.matches;else if(t.length===0&&!s.initialized&&s.matches.length>0)r=s.matches;else return null}let l=r,u=s?.errors;if(u!=null){let g=l.findIndex(v=>v.route.id&&u?.[v.route.id]!==void 0);rn(g>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,g+1))}let f=!1,p=-1;if(i&&s){f=s.renderFallback;for(let g=0;g<l.length;g++){let v=l[g];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(p=g),v.route.id){let{loaderData:_,errors:y}=s,b=v.route.loader&&!_.hasOwnProperty(v.route.id)&&(!y||y[v.route.id]===void 0);if(v.route.lazy||b){i.isStatic&&(f=!0),p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}}let m=i?.onError,d=s&&m?(g,v)=>{m(g,{location:s.location,params:s.matches?.[0]?.params??{},pattern:Zy(s.matches),errorInfo:v})}:void 0;return l.reduceRight((g,v,_)=>{let y,b=!1,C=null,x=null;s&&(y=u&&v.route.id?u[v.route.id]:void 0,C=v.route.errorElement||cE,f&&(p<0&&_===0?(Rx("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),b=!0,x=null):p===_&&(b=!0,x=v.route.hydrateFallbackElement||null)));let S=t.concat(l.slice(0,_+1)),D=()=>{let O;return y?O=C:b?O=x:v.route.Component?O=mt.createElement(v.route.Component,null):v.route.element?O=v.route.element:O=g,mt.createElement(hE,{match:v,routeContext:{outlet:g,matches:S,isDataRoute:s!=null},children:O})};return s&&(v.route.ErrorBoundary||v.route.errorElement||_===0)?mt.createElement(Ax,{location:s.location,revalidation:s.revalidation,component:C,error:y,children:D(),routeContext:{outlet:null,matches:S,isDataRoute:!0},onError:d}):D()},null)}function Cp(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function pE(r){let t=mt.useContext(so);return rn(t,Cp(r)),t}function mE(r){let t=mt.useContext(wc);return rn(t,Cp(r)),t}function gE(r){let t=mt.useContext(La);return rn(t,Cp(r)),t}function wp(r){let t=gE(r),i=t.matches[t.matches.length-1];return rn(i.route.id,`${r} can only be used on routes that contain a unique "id"`),i.route.id}function _E(){return wp("useRouteId")}function vE(){let r=mt.useContext(Rp),t=mE("useRouteError"),i=wp("useRouteError");return r!==void 0?r:t.errors?.[i]}function xE(){let{router:r}=pE("useNavigate"),t=wp("useNavigate"),i=mt.useRef(!1);return bx(()=>{i.current=!0}),mt.useCallback(async(l,u={})=>{ea(i.current,Ex),i.current&&(typeof l=="number"?await r.navigate(l):await r.navigate(l,{fromRouteId:t,...u}))},[r,t])}var ev={};function Rx(r,t,i){!t&&!ev[r]&&(ev[r]=!0,ea(!1,i))}mt.memo(SE);function SE({routes:r,manifest:t,future:i,state:s,isStatic:l,onError:u}){return Tx(r,void 0,{manifest:t,state:s,isStatic:l,onError:u})}function Cx(r){rn(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function ME({basename:r="/",children:t=null,location:i,navigationType:s="POP",navigator:l,static:u=!1,useTransitions:f}){rn(!vl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let p=r.replace(/^\/*/,"/"),m=mt.useMemo(()=>({basename:p,navigator:l,static:u,useTransitions:f,future:{}}),[p,l,u,f]);typeof i=="string"&&(i=ao(i));let{pathname:d="/",search:g="",hash:v="",state:_=null,key:y="default",mask:b}=i,C=mt.useMemo(()=>{let x=Da(d,p);return x==null?null:{location:{pathname:x,search:g,hash:v,state:_,key:y,mask:b},navigationType:s}},[p,d,g,v,_,y,s,b]);return ea(C!=null,`<Router basename="${p}"> is not able to match the URL "${d}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`),C==null?null:mt.createElement(Di.Provider,{value:m},mt.createElement(_l.Provider,{children:t,value:C}))}function yE({children:r,location:t}){return lE(Ud(r),t)}function Ud(r,t=[]){let i=[];return mt.Children.forEach(r,(s,l)=>{if(!mt.isValidElement(s))return;let u=[...t,l];if(s.type===mt.Fragment){i.push.apply(i,Ud(s.props.children,u));return}rn(s.type===Cx,`[${typeof s.type=="string"?s.type:s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),rn(!s.props.index||!s.props.children,"An index route cannot have child routes.");let f={id:s.props.id||u.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,middleware:s.props.middleware,loader:s.props.loader,action:s.props.action,hydrateFallbackElement:s.props.hydrateFallbackElement,HydrateFallback:s.props.HydrateFallback,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.hasErrorBoundary===!0||s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(f.children=Ud(s.props.children,u)),i.push(f)}),i}var oc="get",lc="application/x-www-form-urlencoded";function Dc(r){return typeof HTMLElement<"u"&&r instanceof HTMLElement}function EE(r){return Dc(r)&&r.tagName.toLowerCase()==="button"}function bE(r){return Dc(r)&&r.tagName.toLowerCase()==="form"}function TE(r){return Dc(r)&&r.tagName.toLowerCase()==="input"}function AE(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function RE(r,t){return r.button===0&&(!t||t==="_self")&&!AE(r)}var Nu=null;function CE(){if(Nu===null)try{new FormData(document.createElement("form"),0),Nu=!1}catch{Nu=!0}return Nu}var wE=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Qh(r){return r!=null&&!wE.has(r)?(ea(!1,`"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${lc}"`),null):r}function DE(r,t){let i,s,l,u,f;if(bE(r)){let p=r.getAttribute("action");s=p?Da(p,t):null,i=r.getAttribute("method")||oc,l=Qh(r.getAttribute("enctype"))||lc,u=new FormData(r)}else if(EE(r)||TE(r)&&(r.type==="submit"||r.type==="image")){let p=r.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=r.getAttribute("formaction")||p.getAttribute("action");if(s=m?Da(m,t):null,i=r.getAttribute("formmethod")||p.getAttribute("method")||oc,l=Qh(r.getAttribute("formenctype"))||Qh(p.getAttribute("enctype"))||lc,u=new FormData(p,r),!CE()){let{name:d,type:g,value:v}=r;if(g==="image"){let _=d?`${d}.`:"";u.append(`${_}x`,"0"),u.append(`${_}y`,"0")}else d&&u.append(d,v)}}else{if(Dc(r))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=oc,s=null,l=lc,f=r}return u&&l==="text/plain"&&(f=u,u=void 0),{action:s,method:i.toLowerCase(),encType:l,formData:u,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Dp(r,t){if(r===!1||r===null||typeof r>"u")throw new Error(t)}function wx(r,t,i,s){let l=typeof r=="string"?new URL(r,typeof window>"u"?"server://singlefetch/":window.location.origin):r;return i?l.pathname.endsWith("/")?l.pathname=`${l.pathname}_.${s}`:l.pathname=`${l.pathname}.${s}`:l.pathname==="/"?l.pathname=`_root.${s}`:t&&Da(l.pathname,t)==="/"?l.pathname=`${xc(t)}/_root.${s}`:l.pathname=`${xc(l.pathname)}.${s}`,l}async function UE(r,t){if(r.id in t)return t[r.id];try{let i=await import(r.module);return t[r.id]=i,i}catch(i){return console.error(`Error loading route module \`${r.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function LE(r){return r==null?!1:r.href==null?r.rel==="preload"&&typeof r.imageSrcSet=="string"&&typeof r.imageSizes=="string":typeof r.rel=="string"&&typeof r.href=="string"}async function NE(r,t,i){let s=await Promise.all(r.map(async l=>{let u=t.routes[l.route.id];if(u){let f=await UE(u,i);return f.links?f.links():[]}return[]}));return FE(s.flat(1).filter(LE).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function nv(r,t,i,s,l,u){let f=(m,d)=>i[d]?m.route.id!==i[d].route.id:!0,p=(m,d)=>i[d].pathname!==m.pathname||i[d].route.path?.endsWith("*")&&i[d].params["*"]!==m.params["*"];return u==="assets"?t.filter((m,d)=>f(m,d)||p(m,d)):u==="data"?t.filter((m,d)=>{let g=s.routes[m.route.id];if(!g||!g.hasLoader)return!1;if(f(m,d)||p(m,d))return!0;if(m.route.shouldRevalidate){let v=m.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:i[0]?.params||{},nextUrl:new URL(r,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof v=="boolean")return v}return!0}):[]}function PE(r,t,{includeHydrateFallback:i}={}){return OE(r.map(s=>{let l=t.routes[s.route.id];if(!l)return[];let u=[l.module];return l.clientActionModule&&(u=u.concat(l.clientActionModule)),l.clientLoaderModule&&(u=u.concat(l.clientLoaderModule)),i&&l.hydrateFallbackModule&&(u=u.concat(l.hydrateFallbackModule)),l.imports&&(u=u.concat(l.imports)),u}).flat(1))}function OE(r){return[...new Set(r)]}function IE(r){let t={},i=Object.keys(r).sort();for(let s of i)t[s]=r[s];return t}function FE(r,t){let i=new Set;return new Set(t),r.reduce((s,l)=>{let u=JSON.stringify(IE(l));return i.has(u)||(i.add(u),s.push({key:u,link:l})),s},[])}function Up(){let r=mt.useContext(so);return Dp(r,"You must render this element inside a <DataRouterContext.Provider> element"),r}function BE(){let r=mt.useContext(wc);return Dp(r,"You must render this element inside a <DataRouterStateContext.Provider> element"),r}var Lp=mt.createContext(void 0);Lp.displayName="FrameworkContext";function Uc(){let r=mt.useContext(Lp);return Dp(r,"You must render this element inside a <HydratedRouter> element"),r}function zE(r,t){let i=mt.useContext(Lp),[s,l]=mt.useState(!1),[u,f]=mt.useState(!1),{onFocus:p,onBlur:m,onMouseEnter:d,onMouseLeave:g,onTouchStart:v}=t,_=mt.useRef(null);mt.useEffect(()=>{if(r==="render"&&f(!0),r==="viewport"){let C=S=>{S.forEach(D=>{f(D.isIntersecting)})},x=new IntersectionObserver(C,{threshold:.5});return _.current&&x.observe(_.current),()=>{x.disconnect()}}},[r]),mt.useEffect(()=>{if(s){let C=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(C)}}},[s]);let y=()=>{l(!0)},b=()=>{l(!1),f(!1)};return i?r!=="intent"?[u,_,{}]:[u,_,{onFocus:nl(p,y),onBlur:nl(m,b),onMouseEnter:nl(d,y),onMouseLeave:nl(g,b),onTouchStart:nl(v,y)}]:[!1,_,{}]}function nl(r,t){return i=>{r&&r(i),i.defaultPrevented||t(i)}}function HE({page:r,...t}){let i=jy(),{nonce:s}=Uc(),{router:l}=Up(),u=mt.useMemo(()=>cx(l.routes,r,l.basename),[l.routes,r,l.basename]);return u?(t.nonce==null&&s&&(t={...t,nonce:s}),i?mt.createElement(VE,{page:r,matches:u,...t}):mt.createElement(kE,{page:r,matches:u,...t})):null}function GE(r){let{manifest:t,routeModules:i}=Uc(),[s,l]=mt.useState([]);return mt.useEffect(()=>{let u=!1;return NE(r,t,i).then(f=>{u||l(f)}),()=>{u=!0}},[r,t,i]),s}function VE({page:r,matches:t,...i}){let s=Na(),{future:l}=Uc(),{basename:u}=Up(),f=mt.useMemo(()=>{if(r===s.pathname+s.search+s.hash)return[];let p=wx(r,u,l.v8_trailingSlashAwareDataRequests,"rsc"),m=!1,d=[];for(let g of t)typeof g.route.shouldRevalidate=="function"?m=!0:d.push(g.route.id);return m&&d.length>0&&p.searchParams.set("_routes",d.join(",")),[p.pathname+p.search]},[u,l.v8_trailingSlashAwareDataRequests,r,s,t]);return mt.createElement(mt.Fragment,null,f.map(p=>mt.createElement("link",{key:p,rel:"prefetch",as:"fetch",href:p,...i})))}function kE({page:r,matches:t,...i}){let s=Na(),{future:l,manifest:u,routeModules:f}=Uc(),{basename:p}=Up(),{loaderData:m,matches:d}=BE(),g=mt.useMemo(()=>nv(r,t,d,u,s,"data"),[r,t,d,u,s]),v=mt.useMemo(()=>nv(r,t,d,u,s,"assets"),[r,t,d,u,s]),_=mt.useMemo(()=>{if(r===s.pathname+s.search+s.hash)return[];let C=new Set,x=!1;if(t.forEach(D=>{let O=u.routes[D.route.id];!O||!O.hasLoader||(!g.some(w=>w.route.id===D.route.id)&&D.route.id in m&&f[D.route.id]?.shouldRevalidate||O.hasClientLoader?x=!0:C.add(D.route.id))}),C.size===0)return[];let S=wx(r,p,l.v8_trailingSlashAwareDataRequests,"data");return x&&C.size>0&&S.searchParams.set("_routes",t.filter(D=>C.has(D.route.id)).map(D=>D.route.id).join(",")),[S.pathname+S.search]},[p,l.v8_trailingSlashAwareDataRequests,m,s,u,g,t,r,f]),y=mt.useMemo(()=>PE(v,u),[v,u]),b=GE(v);return mt.createElement(mt.Fragment,null,_.map(C=>mt.createElement("link",{key:C,rel:"prefetch",as:"fetch",href:C,...i})),y.map(C=>mt.createElement("link",{key:C,rel:"modulepreload",href:C,...i})),b.map(({key:C,link:x})=>mt.createElement("link",{key:C,nonce:i.nonce,...x,crossOrigin:x.crossOrigin??i.crossOrigin})))}function XE(...r){return t=>{r.forEach(i=>{typeof i=="function"?i(t):i!=null&&(i.current=t)})}}var WE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{WE&&(window.__reactRouterVersion="7.18.2")}catch{}function qE({basename:r,children:t,useTransitions:i,window:s}){let l=mt.useRef();l.current==null&&(l.current=by({window:s,v5Compat:!0}));let u=l.current,[f,p]=mt.useState({action:u.action,location:u.location}),m=mt.useCallback(d=>{i===!1?p(d):mt.startTransition(()=>p(d))},[i]);return mt.useLayoutEffect(()=>u.listen(m),[u,m]),mt.createElement(ME,{basename:r,children:t,location:f.location,navigationType:f.action,navigator:u,useTransitions:i})}var Np=mt.forwardRef(function({onClick:t,discover:i="render",prefetch:s="none",relative:l,reloadDocument:u,replace:f,mask:p,state:m,target:d,to:g,preventScrollReset:v,viewTransition:_,defaultShouldRevalidate:y,...b},C){let{basename:x,navigator:S,useTransitions:D}=mt.useContext(Di),O=typeof g=="string"&&Tp.test(g),w=vx(g,x);g=w.to;let I=sE(g,{relative:l}),U=Na(),F=null;if(p){let Z=Ap(p,[],U.mask?U.mask.pathname:"/",!0);x!=="/"&&(Z.pathname=Z.pathname==="/"?x:Gi([x,Z.pathname])),F=S.createHref(Z)}let[T,N,k]=zE(s,b),G=QE(g,{replace:f,mask:p,state:m,target:d,preventScrollReset:v,relative:l,viewTransition:_,defaultShouldRevalidate:y,useTransitions:D});function W(Z){t&&t(Z),Z.defaultPrevented||G(Z)}let ut=!(w.isExternal||u),ct=mt.createElement("a",{...b,...k,href:(ut?F:void 0)||w.absoluteURL||I,onClick:ut?W:t,ref:XE(C,N),target:d,"data-discover":!O&&i==="render"?"true":void 0});return T&&!O?mt.createElement(mt.Fragment,null,ct,mt.createElement(HE,{page:I})):ct});Np.displayName="Link";var YE=mt.forwardRef(function({"aria-current":t="page",caseSensitive:i=!1,className:s="",end:l=!1,style:u,to:f,viewTransition:p,children:m,...d},g){let v=xl(f,{relative:d.relative}),_=Na(),y=mt.useContext(wc),{navigator:b,basename:C}=mt.useContext(Di),x=y!=null&&eb(v)&&p===!0,S=b.encodeLocation?b.encodeLocation(v).pathname:v.pathname,D=_.pathname,O=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;i||(D=D.toLowerCase(),O=O?O.toLowerCase():null,S=S.toLowerCase()),O&&C&&(O=Da(O,C)||O);const w=S!=="/"&&S.endsWith("/")?S.length-1:S.length;let I=D===S||!l&&D.startsWith(S)&&D.charAt(w)==="/",U=O!=null&&(O===S||!l&&O.startsWith(S)&&O.charAt(S.length)==="/"),F={isActive:I,isPending:U,isTransitioning:x},T=I?t:void 0,N;typeof s=="function"?N=s(F):N=[s,I?"active":null,U?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let k=typeof u=="function"?u(F):u;return mt.createElement(Np,{...d,"aria-current":T,className:N,ref:g,style:k,to:f,viewTransition:p},typeof m=="function"?m(F):m)});YE.displayName="NavLink";var ZE=mt.forwardRef(({discover:r="render",fetcherKey:t,navigate:i,reloadDocument:s,replace:l,state:u,method:f=oc,action:p,onSubmit:m,relative:d,preventScrollReset:g,viewTransition:v,defaultShouldRevalidate:_,...y},b)=>{let{useTransitions:C}=mt.useContext(Di),x=$E(),S=tb(p,{relative:d}),D=f.toLowerCase()==="get"?"get":"post",O=typeof p=="string"&&Tp.test(p),w=I=>{if(m&&m(I),I.defaultPrevented)return;I.preventDefault();let U=I.nativeEvent.submitter,F=U?.getAttribute("formmethod")||f,T=()=>x(U||I.currentTarget,{fetcherKey:t,method:F,navigate:i,replace:l,state:u,relative:d,preventScrollReset:g,viewTransition:v,defaultShouldRevalidate:_});C&&i!==!1?mt.startTransition(()=>T()):T()};return mt.createElement("form",{ref:b,method:D,action:S,onSubmit:s?m:w,...y,"data-discover":!O&&r==="render"?"true":void 0})});ZE.displayName="Form";function KE(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dx(r){let t=mt.useContext(so);return rn(t,KE(r)),t}function QE(r,{target:t,replace:i,mask:s,state:l,preventScrollReset:u,relative:f,viewTransition:p,defaultShouldRevalidate:m,useTransitions:d}={}){let g=rE(),v=Na(),_=xl(r,{relative:f});return mt.useCallback(y=>{if(RE(y,t)){y.preventDefault();let b=i!==void 0?i:hl(v)===hl(_),C=()=>g(r,{replace:b,mask:s,state:l,preventScrollReset:u,relative:f,viewTransition:p,defaultShouldRevalidate:m});d?mt.startTransition(()=>C()):C()}},[v,g,_,i,s,l,t,r,u,f,p,m,d])}var JE=0,jE=()=>`__${String(++JE)}__`;function $E(){let{router:r}=Dx("useSubmit"),{basename:t}=mt.useContext(Di),i=_E(),s=r.fetch,l=r.navigate;return mt.useCallback(async(u,f={})=>{let{action:p,method:m,encType:d,formData:g,body:v}=DE(u,t);if(f.navigate===!1){let _=f.fetcherKey||jE();await s(_,i,f.action||p,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:g,body:v,formMethod:f.method||m,formEncType:f.encType||d,flushSync:f.flushSync})}else await l(f.action||p,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:g,body:v,formMethod:f.method||m,formEncType:f.encType||d,replace:f.replace,state:f.state,fromRouteId:i,flushSync:f.flushSync,viewTransition:f.viewTransition})},[s,l,t,i])}function tb(r,{relative:t}={}){let{basename:i}=mt.useContext(Di),s=mt.useContext(La);rn(s,"useFormAction must be used inside a RouteContext");let[l]=s.matches.slice(-1),u={...xl(r||".",{relative:t})},f=Na();if(r==null){u.search=f.search;let p=new URLSearchParams(u.search),m=p.getAll("index");if(m.some(g=>g==="")){p.delete("index"),m.filter(v=>v).forEach(v=>p.append("index",v));let g=p.toString();u.search=g?`?${g}`:""}}return(!r||r===".")&&l.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(u.pathname=u.pathname==="/"?i:Gi([i,u.pathname])),hl(u)}function eb(r,{relative:t}={}){let i=mt.useContext(Mx);rn(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=Dx("useViewTransitionState"),l=xl(r,{relative:t});if(!i.isTransitioning)return!1;let u=Da(i.currentLocation.pathname,s)||i.currentLocation.pathname,f=Da(i.nextLocation.pathname,s)||i.nextLocation.pathname;return vc(l.pathname,f)!=null||vc(l.pathname,u)!=null}const Pp="185",Yr={ROTATE:0,DOLLY:1,PAN:2},Wr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nb=0,iv=1,ib=2,uc=1,Ux=2,cl=3,gs=0,ei=1,Ra=2,$i=0,Zr=1,Sc=2,av=3,sv=4,ab=5,Ws=100,sb=101,rb=102,ob=103,lb=104,ub=200,cb=201,fb=202,hb=203,Ld=204,Nd=205,db=206,pb=207,mb=208,gb=209,_b=210,vb=211,xb=212,Sb=213,Mb=214,Pd=0,Od=1,Id=2,jr=3,Fd=4,Bd=5,zd=6,Hd=7,Lx=0,yb=1,Eb=2,ta=0,Op=1,Ip=2,Fp=3,Lc=4,Bp=5,zp=6,Hp=7,Nx=300,Qs=301,$r=302,cc=303,Jh=304,Nc=306,Kr=1e3,Ca=1001,Gd=1002,Pn=1003,bb=1004,Pu=1005,Hn=1006,jh=1007,Ys=1008,vi=1009,Px=1010,Ox=1011,dl=1012,Gp=1013,na=1014,Ji=1015,xi=1016,Vp=1017,kp=1018,pl=1020,Ix=35902,Fx=35899,Bx=1021,zx=1022,Hi=1023,Ua=1026,Zs=1027,Hx=1028,Xp=1029,Js=1030,Wp=1031,qp=1033,fc=33776,hc=33777,dc=33778,pc=33779,Vd=35840,kd=35841,Xd=35842,Wd=35843,qd=36196,Yd=37492,Zd=37496,Kd=37488,Qd=37489,Mc=37490,Jd=37491,jd=37808,$d=37809,tp=37810,ep=37811,np=37812,ip=37813,ap=37814,sp=37815,rp=37816,op=37817,lp=37818,up=37819,cp=37820,fp=37821,hp=36492,dp=36494,pp=36495,mp=36283,gp=36284,yc=36285,_p=36286,Tb=3200,vp=0,Ab=1,ps="",gi="srgb",Ec="srgb-linear",bc="linear",Pe="srgb",Ur=7680,rv=519,Rb=512,Cb=513,wb=514,Yp=515,Db=516,Ub=517,Zp=518,Lb=519,ov=35044,lv="300 es",ji=2e3,ml=2001;function Nb(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Tc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Pb(){const r=Tc("canvas");return r.style.display="block",r}const uv={};function cv(...r){const t="THREE."+r.shift();console.log(t,...r)}function Gx(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function re(...r){r=Gx(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function Ae(...r){r=Gx(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function Qr(...r){const t=r.join(" ");t in uv||(uv[t]=!0,re(...r))}function Ob(r,t,i){return new Promise(function(s,l){function u(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:s()}}setTimeout(u,i)})}const Ib={[Pd]:Od,[Id]:zd,[Fd]:Hd,[jr]:Bd,[Od]:Pd,[zd]:Id,[Hd]:Fd,[Bd]:jr};class xs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let u=0,f=l.length;u<f;u++)l[u].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mc=Math.PI/180,xp=180/Math.PI;function Sl(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]).toLowerCase()}function ge(r,t,i){return Math.max(t,Math.min(i,r))}function Fb(r,t){return(r%t+t)%t}function $h(r,t,i){return(1-i)*r+i*t}function il(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Bb={DEG2RAD:mc},im=class im{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ge(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),u=this.x-t.x,f=this.y-t.y;return this.x=u*s-f*l+t.x,this.y=u*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};im.prototype.isVector2=!0;let jt=im;class _s{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,u,f,p){let m=s[l+0],d=s[l+1],g=s[l+2],v=s[l+3],_=u[f+0],y=u[f+1],b=u[f+2],C=u[f+3];if(v!==C||m!==_||d!==y||g!==b){let x=m*_+d*y+g*b+v*C;x<0&&(_=-_,y=-y,b=-b,C=-C,x=-x);let S=1-p;if(x<.9995){const D=Math.acos(x),O=Math.sin(D);S=Math.sin(S*D)/O,p=Math.sin(p*D)/O,m=m*S+_*p,d=d*S+y*p,g=g*S+b*p,v=v*S+C*p}else{m=m*S+_*p,d=d*S+y*p,g=g*S+b*p,v=v*S+C*p;const D=1/Math.sqrt(m*m+d*d+g*g+v*v);m*=D,d*=D,g*=D,v*=D}}t[i]=m,t[i+1]=d,t[i+2]=g,t[i+3]=v}static multiplyQuaternionsFlat(t,i,s,l,u,f){const p=s[l],m=s[l+1],d=s[l+2],g=s[l+3],v=u[f],_=u[f+1],y=u[f+2],b=u[f+3];return t[i]=p*b+g*v+m*y-d*_,t[i+1]=m*b+g*_+d*v-p*y,t[i+2]=d*b+g*y+p*_-m*v,t[i+3]=g*b-p*v-m*_-d*y,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,u=t._z,f=t._order,p=Math.cos,m=Math.sin,d=p(s/2),g=p(l/2),v=p(u/2),_=m(s/2),y=m(l/2),b=m(u/2);switch(f){case"XYZ":this._x=_*g*v+d*y*b,this._y=d*y*v-_*g*b,this._z=d*g*b+_*y*v,this._w=d*g*v-_*y*b;break;case"YXZ":this._x=_*g*v+d*y*b,this._y=d*y*v-_*g*b,this._z=d*g*b-_*y*v,this._w=d*g*v+_*y*b;break;case"ZXY":this._x=_*g*v-d*y*b,this._y=d*y*v+_*g*b,this._z=d*g*b+_*y*v,this._w=d*g*v-_*y*b;break;case"ZYX":this._x=_*g*v-d*y*b,this._y=d*y*v+_*g*b,this._z=d*g*b-_*y*v,this._w=d*g*v+_*y*b;break;case"YZX":this._x=_*g*v+d*y*b,this._y=d*y*v+_*g*b,this._z=d*g*b-_*y*v,this._w=d*g*v-_*y*b;break;case"XZY":this._x=_*g*v-d*y*b,this._y=d*y*v-_*g*b,this._z=d*g*b+_*y*v,this._w=d*g*v+_*y*b;break;default:re("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],u=i[8],f=i[1],p=i[5],m=i[9],d=i[2],g=i[6],v=i[10],_=s+p+v;if(_>0){const y=.5/Math.sqrt(_+1);this._w=.25/y,this._x=(g-m)*y,this._y=(u-d)*y,this._z=(f-l)*y}else if(s>p&&s>v){const y=2*Math.sqrt(1+s-p-v);this._w=(g-m)/y,this._x=.25*y,this._y=(l+f)/y,this._z=(u+d)/y}else if(p>v){const y=2*Math.sqrt(1+p-s-v);this._w=(u-d)/y,this._x=(l+f)/y,this._y=.25*y,this._z=(m+g)/y}else{const y=2*Math.sqrt(1+v-s-p);this._w=(f-l)/y,this._x=(u+d)/y,this._y=(m+g)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,u=t._z,f=t._w,p=i._x,m=i._y,d=i._z,g=i._w;return this._x=s*g+f*p+l*d-u*m,this._y=l*g+f*m+u*p-s*d,this._z=u*g+f*d+s*m-l*p,this._w=f*g-s*p-l*m-u*d,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,u=t._z,f=t._w,p=this.dot(t);p<0&&(s=-s,l=-l,u=-u,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),g=Math.sin(d);m=Math.sin(m*d)/g,i=Math.sin(i*d)/g,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+u*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+u*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),u=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const am=class am{constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(fv.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(fv.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*s+u[6]*l,this.y=u[1]*i+u[4]*s+u[7]*l,this.z=u[2]*i+u[5]*s+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=t.elements,f=1/(u[3]*i+u[7]*s+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*s+u[8]*l+u[12])*f,this.y=(u[1]*i+u[5]*s+u[9]*l+u[13])*f,this.z=(u[2]*i+u[6]*s+u[10]*l+u[14])*f,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,u=t.x,f=t.y,p=t.z,m=t.w,d=2*(f*l-p*s),g=2*(p*i-u*l),v=2*(u*s-f*i);return this.x=i+m*d+f*v-p*g,this.y=s+m*g+p*d-u*v,this.z=l+m*v+u*g-f*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*s+u[8]*l,this.y=u[1]*i+u[5]*s+u[9]*l,this.z=u[2]*i+u[6]*s+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,u=t.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-u*p,this.y=u*f-s*m,this.z=s*p-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return td.copy(this).projectOnVector(t),this.sub(td)}reflect(t){return this.sub(td.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ge(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};am.prototype.isVector3=!0;let J=am;const td=new J,fv=new _s,sm=class sm{constructor(t,i,s,l,u,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,f,p,m,d)}set(t,i,s,l,u,f,p,m,d){const g=this.elements;return g[0]=t,g[1]=l,g[2]=p,g[3]=i,g[4]=u,g[5]=m,g[6]=s,g[7]=f,g[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,f=s[0],p=s[3],m=s[6],d=s[1],g=s[4],v=s[7],_=s[2],y=s[5],b=s[8],C=l[0],x=l[3],S=l[6],D=l[1],O=l[4],w=l[7],I=l[2],U=l[5],F=l[8];return u[0]=f*C+p*D+m*I,u[3]=f*x+p*O+m*U,u[6]=f*S+p*w+m*F,u[1]=d*C+g*D+v*I,u[4]=d*x+g*O+v*U,u[7]=d*S+g*w+v*F,u[2]=_*C+y*D+b*I,u[5]=_*x+y*O+b*U,u[8]=_*S+y*w+b*F,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],f=t[4],p=t[5],m=t[6],d=t[7],g=t[8];return i*f*g-i*p*d-s*u*g+s*p*m+l*u*d-l*f*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],f=t[4],p=t[5],m=t[6],d=t[7],g=t[8],v=g*f-p*d,_=p*m-g*u,y=d*u-f*m,b=i*v+s*_+l*y;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/b;return t[0]=v*C,t[1]=(l*d-g*s)*C,t[2]=(p*s-l*f)*C,t[3]=_*C,t[4]=(g*i-l*m)*C,t[5]=(l*u-p*i)*C,t[6]=y*C,t[7]=(s*m-d*i)*C,t[8]=(f*i-s*u)*C,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,u,f,p){const m=Math.cos(u),d=Math.sin(u);return this.set(s*m,s*d,-s*(m*f+d*p)+f+t,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(t,i){return Qr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ed.makeScale(t,i)),this}rotate(t){return Qr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ed.makeRotation(-t)),this}translate(t,i){return Qr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ed.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}};sm.prototype.isMatrix3=!0;let ce=sm;const ed=new ce,hv=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dv=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zb(){const r={enabled:!0,workingColorSpace:Ec,spaces:{},convert:function(l,u,f){return this.enabled===!1||u===f||!u||!f||(this.spaces[u].transfer===Pe&&(l.r=wa(l.r),l.g=wa(l.g),l.b=wa(l.b)),this.spaces[u].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Pe&&(l.r=Jr(l.r),l.g=Jr(l.g),l.b=Jr(l.b))),l},workingToColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},colorSpaceToWorking:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ps?bc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,f){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,u){return Qr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,u)},toWorkingColorSpace:function(l,u){return Qr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,u)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Ec]:{primaries:t,whitePoint:s,transfer:bc,toXYZ:hv,fromXYZ:dv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:gi},outputColorSpaceConfig:{drawingBufferColorSpace:gi}},[gi]:{primaries:t,whitePoint:s,transfer:Pe,toXYZ:hv,fromXYZ:dv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:gi}}}),r}const ye=zb();function wa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Jr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Lr;class Hb{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Lr===void 0&&(Lr=Tc("canvas")),Lr.width=t.width,Lr.height=t.height;const l=Lr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Lr}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Tc("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),u=l.data;for(let f=0;f<u.length;f++)u[f]=wa(u[f]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(wa(i[s]/255)*255):i[s]=wa(i[s]);return{data:i,width:t.width,height:t.height}}else return re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gb=0;class Kp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gb++}),this.uuid=Sl(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?u.push(nd(l[f].image)):u.push(nd(l[f]))}else u=nd(l);s.url=u}return i||(t.images[this.uuid]=s),s}}function nd(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Hb.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(re("Texture: Unable to serialize Texture."),{})}let Vb=0;const id=new J;class Vn extends xs{constructor(t=Vn.DEFAULT_IMAGE,i=Vn.DEFAULT_MAPPING,s=Ca,l=Ca,u=Hn,f=Ys,p=Hi,m=vi,d=Vn.DEFAULT_ANISOTROPY,g=ps){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vb++}),this.uuid=Sl(),this.name="",this.source=new Kp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=u,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(id).x}get height(){return this.source.getSize(id).y}get depth(){return this.source.getSize(id).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){re(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){re(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Kr:t.x=t.x-Math.floor(t.x);break;case Ca:t.x=t.x<0?0:1;break;case Gd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Kr:t.y=t.y-Math.floor(t.y);break;case Ca:t.y=t.y<0?0:1;break;case Gd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=Nx;Vn.DEFAULT_ANISOTROPY=1;const rm=class rm{constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=this.w,f=t.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*u,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*u,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*u,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,u;const m=t.elements,d=m[0],g=m[4],v=m[8],_=m[1],y=m[5],b=m[9],C=m[2],x=m[6],S=m[10];if(Math.abs(g-_)<.01&&Math.abs(v-C)<.01&&Math.abs(b-x)<.01){if(Math.abs(g+_)<.1&&Math.abs(v+C)<.1&&Math.abs(b+x)<.1&&Math.abs(d+y+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(d+1)/2,w=(y+1)/2,I=(S+1)/2,U=(g+_)/4,F=(v+C)/4,T=(b+x)/4;return O>w&&O>I?O<.01?(s=0,l=.707106781,u=.707106781):(s=Math.sqrt(O),l=U/s,u=F/s):w>I?w<.01?(s=.707106781,l=0,u=.707106781):(l=Math.sqrt(w),s=U/l,u=T/l):I<.01?(s=.707106781,l=.707106781,u=0):(u=Math.sqrt(I),s=F/u,l=T/u),this.set(s,l,u,i),this}let D=Math.sqrt((x-b)*(x-b)+(v-C)*(v-C)+(_-g)*(_-g));return Math.abs(D)<.001&&(D=1),this.x=(x-b)/D,this.y=(v-C)/D,this.z=(_-g)/D,this.w=Math.acos((d+y+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this.w=ge(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this.w=ge(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rm.prototype.isVector4=!0;let sn=rm;class kb extends xs{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new sn(0,0,t,i),this.scissorTest=!1,this.viewport=new sn(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},u=new Vn(l),f=s.count;for(let p=0;p<f;p++)this.textures[p]=u.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Kp(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends kb{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class Vx extends Vn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Ca,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xb extends Vn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Ca,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cc=class Cc{constructor(t,i,s,l,u,f,p,m,d,g,v,_,y,b,C,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,f,p,m,d,g,v,_,y,b,C,x)}set(t,i,s,l,u,f,p,m,d,g,v,_,y,b,C,x){const S=this.elements;return S[0]=t,S[4]=i,S[8]=s,S[12]=l,S[1]=u,S[5]=f,S[9]=p,S[13]=m,S[2]=d,S[6]=g,S[10]=v,S[14]=_,S[3]=y,S[7]=b,S[11]=C,S[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Cc().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Nr.setFromMatrixColumn(t,0).length(),u=1/Nr.setFromMatrixColumn(t,1).length(),f=1/Nr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*u,i[5]=s[5]*u,i[6]=s[6]*u,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,u=t.z,f=Math.cos(s),p=Math.sin(s),m=Math.cos(l),d=Math.sin(l),g=Math.cos(u),v=Math.sin(u);if(t.order==="XYZ"){const _=f*g,y=f*v,b=p*g,C=p*v;i[0]=m*g,i[4]=-m*v,i[8]=d,i[1]=y+b*d,i[5]=_-C*d,i[9]=-p*m,i[2]=C-_*d,i[6]=b+y*d,i[10]=f*m}else if(t.order==="YXZ"){const _=m*g,y=m*v,b=d*g,C=d*v;i[0]=_+C*p,i[4]=b*p-y,i[8]=f*d,i[1]=f*v,i[5]=f*g,i[9]=-p,i[2]=y*p-b,i[6]=C+_*p,i[10]=f*m}else if(t.order==="ZXY"){const _=m*g,y=m*v,b=d*g,C=d*v;i[0]=_-C*p,i[4]=-f*v,i[8]=b+y*p,i[1]=y+b*p,i[5]=f*g,i[9]=C-_*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(t.order==="ZYX"){const _=f*g,y=f*v,b=p*g,C=p*v;i[0]=m*g,i[4]=b*d-y,i[8]=_*d+C,i[1]=m*v,i[5]=C*d+_,i[9]=y*d-b,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(t.order==="YZX"){const _=f*m,y=f*d,b=p*m,C=p*d;i[0]=m*g,i[4]=C-_*v,i[8]=b*v+y,i[1]=v,i[5]=f*g,i[9]=-p*g,i[2]=-d*g,i[6]=y*v+b,i[10]=_-C*v}else if(t.order==="XZY"){const _=f*m,y=f*d,b=p*m,C=p*d;i[0]=m*g,i[4]=-v,i[8]=d*g,i[1]=_*v+C,i[5]=f*g,i[9]=y*v-b,i[2]=b*v-y,i[6]=p*g,i[10]=C*v+_}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wb,t,qb)}lookAt(t,i,s){const l=this.elements;return pi.subVectors(t,i),pi.lengthSq()===0&&(pi.z=1),pi.normalize(),os.crossVectors(s,pi),os.lengthSq()===0&&(Math.abs(s.z)===1?pi.x+=1e-4:pi.z+=1e-4,pi.normalize(),os.crossVectors(s,pi)),os.normalize(),Ou.crossVectors(pi,os),l[0]=os.x,l[4]=Ou.x,l[8]=pi.x,l[1]=os.y,l[5]=Ou.y,l[9]=pi.y,l[2]=os.z,l[6]=Ou.z,l[10]=pi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,f=s[0],p=s[4],m=s[8],d=s[12],g=s[1],v=s[5],_=s[9],y=s[13],b=s[2],C=s[6],x=s[10],S=s[14],D=s[3],O=s[7],w=s[11],I=s[15],U=l[0],F=l[4],T=l[8],N=l[12],k=l[1],G=l[5],W=l[9],ut=l[13],ct=l[2],Z=l[6],B=l[10],H=l[14],$=l[3],_t=l[7],Et=l[11],P=l[15];return u[0]=f*U+p*k+m*ct+d*$,u[4]=f*F+p*G+m*Z+d*_t,u[8]=f*T+p*W+m*B+d*Et,u[12]=f*N+p*ut+m*H+d*P,u[1]=g*U+v*k+_*ct+y*$,u[5]=g*F+v*G+_*Z+y*_t,u[9]=g*T+v*W+_*B+y*Et,u[13]=g*N+v*ut+_*H+y*P,u[2]=b*U+C*k+x*ct+S*$,u[6]=b*F+C*G+x*Z+S*_t,u[10]=b*T+C*W+x*B+S*Et,u[14]=b*N+C*ut+x*H+S*P,u[3]=D*U+O*k+w*ct+I*$,u[7]=D*F+O*G+w*Z+I*_t,u[11]=D*T+O*W+w*B+I*Et,u[15]=D*N+O*ut+w*H+I*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[12],f=t[1],p=t[5],m=t[9],d=t[13],g=t[2],v=t[6],_=t[10],y=t[14],b=t[3],C=t[7],x=t[11],S=t[15],D=m*y-d*_,O=p*y-d*v,w=p*_-m*v,I=f*y-d*g,U=f*_-m*g,F=f*v-p*g;return i*(C*D-x*O+S*w)-s*(b*D-x*I+S*U)+l*(b*O-C*I+S*F)-u*(b*w-C*U+x*F)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[1],f=t[5],p=t[9],m=t[2],d=t[6],g=t[10];return i*(f*g-p*d)-s*(u*g-p*m)+l*(u*d-f*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],f=t[4],p=t[5],m=t[6],d=t[7],g=t[8],v=t[9],_=t[10],y=t[11],b=t[12],C=t[13],x=t[14],S=t[15],D=i*p-s*f,O=i*m-l*f,w=i*d-u*f,I=s*m-l*p,U=s*d-u*p,F=l*d-u*m,T=g*C-v*b,N=g*x-_*b,k=g*S-y*b,G=v*x-_*C,W=v*S-y*C,ut=_*S-y*x,ct=D*ut-O*W+w*G+I*k-U*N+F*T;if(ct===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Z=1/ct;return t[0]=(p*ut-m*W+d*G)*Z,t[1]=(l*W-s*ut-u*G)*Z,t[2]=(C*F-x*U+S*I)*Z,t[3]=(_*U-v*F-y*I)*Z,t[4]=(m*k-f*ut-d*N)*Z,t[5]=(i*ut-l*k+u*N)*Z,t[6]=(x*w-b*F-S*O)*Z,t[7]=(g*F-_*w+y*O)*Z,t[8]=(f*W-p*k+d*T)*Z,t[9]=(s*k-i*W-u*T)*Z,t[10]=(b*U-C*w+S*D)*Z,t[11]=(v*w-g*U-y*D)*Z,t[12]=(p*N-f*G-m*T)*Z,t[13]=(i*G-s*N+l*T)*Z,t[14]=(C*O-b*I-x*D)*Z,t[15]=(g*I-v*O+_*D)*Z,this}scale(t){const i=this.elements,s=t.x,l=t.y,u=t.z;return i[0]*=s,i[4]*=l,i[8]*=u,i[1]*=s,i[5]*=l,i[9]*=u,i[2]*=s,i[6]*=l,i[10]*=u,i[3]*=s,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),u=1-s,f=t.x,p=t.y,m=t.z,d=u*f,g=u*p;return this.set(d*f+s,d*p-l*m,d*m+l*p,0,d*p+l*m,g*p+s,g*m-l*f,0,d*m-l*p,g*m+l*f,u*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,u,f){return this.set(1,s,u,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,u=i._x,f=i._y,p=i._z,m=i._w,d=u+u,g=f+f,v=p+p,_=u*d,y=u*g,b=u*v,C=f*g,x=f*v,S=p*v,D=m*d,O=m*g,w=m*v,I=s.x,U=s.y,F=s.z;return l[0]=(1-(C+S))*I,l[1]=(y+w)*I,l[2]=(b-O)*I,l[3]=0,l[4]=(y-w)*U,l[5]=(1-(_+S))*U,l[6]=(x+D)*U,l[7]=0,l[8]=(b+O)*F,l[9]=(x-D)*F,l[10]=(1-(_+C))*F,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const u=this.determinantAffine();if(u===0)return s.set(1,1,1),i.identity(),this;let f=Nr.set(l[0],l[1],l[2]).length();const p=Nr.set(l[4],l[5],l[6]).length(),m=Nr.set(l[8],l[9],l[10]).length();u<0&&(f=-f),Ii.copy(this);const d=1/f,g=1/p,v=1/m;return Ii.elements[0]*=d,Ii.elements[1]*=d,Ii.elements[2]*=d,Ii.elements[4]*=g,Ii.elements[5]*=g,Ii.elements[6]*=g,Ii.elements[8]*=v,Ii.elements[9]*=v,Ii.elements[10]*=v,i.setFromRotationMatrix(Ii),s.x=f,s.y=p,s.z=m,this}makePerspective(t,i,s,l,u,f,p=ji,m=!1){const d=this.elements,g=2*u/(i-t),v=2*u/(s-l),_=(i+t)/(i-t),y=(s+l)/(s-l);let b,C;if(m)b=u/(f-u),C=f*u/(f-u);else if(p===ji)b=-(f+u)/(f-u),C=-2*f*u/(f-u);else if(p===ml)b=-f/(f-u),C=-f*u/(f-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=g,d[4]=0,d[8]=_,d[12]=0,d[1]=0,d[5]=v,d[9]=y,d[13]=0,d[2]=0,d[6]=0,d[10]=b,d[14]=C,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,s,l,u,f,p=ji,m=!1){const d=this.elements,g=2/(i-t),v=2/(s-l),_=-(i+t)/(i-t),y=-(s+l)/(s-l);let b,C;if(m)b=1/(f-u),C=f/(f-u);else if(p===ji)b=-2/(f-u),C=-(f+u)/(f-u);else if(p===ml)b=-1/(f-u),C=-u/(f-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=g,d[4]=0,d[8]=0,d[12]=_,d[1]=0,d[5]=v,d[9]=0,d[13]=y,d[2]=0,d[6]=0,d[10]=b,d[14]=C,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}};Cc.prototype.isMatrix4=!0;let on=Cc;const Nr=new J,Ii=new on,Wb=new J(0,0,0),qb=new J(1,1,1),os=new J,Ou=new J,pi=new J,pv=new on,mv=new _s;class vs{constructor(t=0,i=0,s=0,l=vs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,u=l[0],f=l[4],p=l[8],m=l[1],d=l[5],g=l[9],v=l[2],_=l[6],y=l[10];switch(i){case"XYZ":this._y=Math.asin(ge(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,y),this._z=Math.atan2(-f,u)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(p,y),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-v,u),this._z=0);break;case"ZXY":this._x=Math.asin(ge(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-v,y),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-ge(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(_,y),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(ge(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,d),this._y=Math.atan2(-v,u)):(this._x=0,this._y=Math.atan2(p,y));break;case"XZY":this._z=Math.asin(-ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(p,u)):(this._x=Math.atan2(-g,y),this._y=0);break;default:re("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return pv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(pv,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return mv.setFromEuler(this),this.setFromQuaternion(mv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vs.DEFAULT_ORDER="XYZ";class kx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yb=0;const gv=new J,Pr=new _s,ya=new on,Iu=new J,al=new J,Zb=new J,Kb=new _s,_v=new J(1,0,0),vv=new J(0,1,0),xv=new J(0,0,1),Sv={type:"added"},Qb={type:"removed"},Or={type:"childadded",child:null},ad={type:"childremoved",child:null};class On extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=Sl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=On.DEFAULT_UP.clone();const t=new J,i=new vs,s=new _s,l=new J(1,1,1);function u(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(u),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new on},normalMatrix:{value:new ce}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=On.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Pr.setFromAxisAngle(t,i),this.quaternion.multiply(Pr),this}rotateOnWorldAxis(t,i){return Pr.setFromAxisAngle(t,i),this.quaternion.premultiply(Pr),this}rotateX(t){return this.rotateOnAxis(_v,t)}rotateY(t){return this.rotateOnAxis(vv,t)}rotateZ(t){return this.rotateOnAxis(xv,t)}translateOnAxis(t,i){return gv.copy(t).applyQuaternion(this.quaternion),this.position.add(gv.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(_v,t)}translateY(t){return this.translateOnAxis(vv,t)}translateZ(t){return this.translateOnAxis(xv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ya.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Iu.copy(t):Iu.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),al.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ya.lookAt(al,Iu,this.up):ya.lookAt(Iu,al,this.up),this.quaternion.setFromRotationMatrix(ya),l&&(ya.extractRotation(l.matrixWorld),Pr.setFromRotationMatrix(ya),this.quaternion.premultiply(Pr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sv),Or.child=t,this.dispatchEvent(Or),Or.child=null):Ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Qb),ad.child=t,this.dispatchEvent(ad),ad.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ya.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ya.multiply(t.parent.matrixWorld)),t.applyMatrix4(ya),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sv),Or.child=t,this.dispatchEvent(Or),Or.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let u=0,f=l.length;u<f;u++)l[u].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(al,t,Zb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(al,Kb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,u=this.matrix.elements;u[12]+=i-u[0]*i-u[4]*s-u[8]*l,u[13]+=s-u[1]*i-u[5]*s-u[9]*l,u[14]+=l-u[2]*i-u[6]*s-u[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const u=this.children;for(let f=0,p=u.length;f<p;f++)u[f].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function u(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,g=m.length;d<g;d++){const v=m[d];u(t.shapes,v)}else u(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(u(t.materials,this.material[m]));l.material=p}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(u(t.animations,m))}}if(i){const p=f(t.geometries),m=f(t.materials),d=f(t.textures),g=f(t.images),v=f(t.shapes),_=f(t.skeletons),y=f(t.animations),b=f(t.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),d.length>0&&(s.textures=d),g.length>0&&(s.images=g),v.length>0&&(s.shapes=v),_.length>0&&(s.skeletons=_),y.length>0&&(s.animations=y),b.length>0&&(s.nodes=b)}return s.object=l,s;function f(p){const m=[];for(const d in p){const g=p[d];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}On.DEFAULT_UP=new J(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class qr extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jb={type:"move"};class sd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,u=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){f=!0;for(const C of t.hand.values()){const x=i.getJointPose(C,s),S=this._getHandJoint(d,C);x!==null&&(S.matrix.fromArray(x.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=x.radius),S.visible=x!==null}const g=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],_=g.position.distanceTo(v.position),y=.02,b=.005;d.inputState.pinching&&_>y+b?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&_<=y-b&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,s),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&u!==null&&(l=u),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Jb)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=u!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new qr;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const Xx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},Fu={h:0,s:0,l:0};function rd(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class le{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=gi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ye.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=ye.workingColorSpace){return this.r=t,this.g=i,this.b=s,ye.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=ye.workingColorSpace){if(t=Fb(t,1),i=ge(i,0,1),s=ge(s,0,1),i===0)this.r=this.g=this.b=s;else{const u=s<=.5?s*(1+i):s+i-s*i,f=2*s-u;this.r=rd(f,u,t+1/3),this.g=rd(f,u,t),this.b=rd(f,u,t-1/3)}return ye.colorSpaceToWorking(this,l),this}setStyle(t,i=gi){function s(u){u!==void 0&&parseFloat(u)<1&&re("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:re("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],f=u.length;if(f===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(u,16),i);re("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=gi){const s=Xx[t.toLowerCase()];return s!==void 0?this.setHex(s,i):re("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wa(t.r),this.g=wa(t.g),this.b=wa(t.b),this}copyLinearToSRGB(t){return this.r=Jr(t.r),this.g=Jr(t.g),this.b=Jr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=gi){return ye.workingToColorSpace(zn.copy(this),t),Math.round(ge(zn.r*255,0,255))*65536+Math.round(ge(zn.g*255,0,255))*256+Math.round(ge(zn.b*255,0,255))}getHexString(t=gi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=ye.workingColorSpace){ye.workingToColorSpace(zn.copy(this),i);const s=zn.r,l=zn.g,u=zn.b,f=Math.max(s,l,u),p=Math.min(s,l,u);let m,d;const g=(p+f)/2;if(p===f)m=0,d=0;else{const v=f-p;switch(d=g<=.5?v/(f+p):v/(2-f-p),f){case s:m=(l-u)/v+(l<u?6:0);break;case l:m=(u-s)/v+2;break;case u:m=(s-l)/v+4;break}m/=6}return t.h=m,t.s=d,t.l=g,t}getRGB(t,i=ye.workingColorSpace){return ye.workingToColorSpace(zn.copy(this),i),t.r=zn.r,t.g=zn.g,t.b=zn.b,t}getStyle(t=gi){ye.workingToColorSpace(zn.copy(this),t);const i=zn.r,s=zn.g,l=zn.b;return t!==gi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(ls),this.setHSL(ls.h+t,ls.s+i,ls.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(ls),t.getHSL(Fu);const s=$h(ls.h,Fu.h,i),l=$h(ls.s,Fu.s,i),u=$h(ls.l,Fu.l,i);return this.setHSL(s,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*s+u[6]*l,this.g=u[1]*i+u[4]*s+u[7]*l,this.b=u[2]*i+u[5]*s+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new le;le.NAMES=Xx;class Qp{constructor(t,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new le(t),this.density=i}clone(){return new Qp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jb extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vs,this.environmentIntensity=1,this.environmentRotation=new vs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Fi=new J,Ea=new J,od=new J,ba=new J,Ir=new J,Fr=new J,Mv=new J,ld=new J,ud=new J,cd=new J,fd=new sn,hd=new sn,dd=new sn;class zi{constructor(t=new J,i=new J,s=new J){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Fi.subVectors(t,i),l.cross(Fi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,s,l,u){Fi.subVectors(l,i),Ea.subVectors(s,i),od.subVectors(t,i);const f=Fi.dot(Fi),p=Fi.dot(Ea),m=Fi.dot(od),d=Ea.dot(Ea),g=Ea.dot(od),v=f*d-p*p;if(v===0)return u.set(0,0,0),null;const _=1/v,y=(d*m-p*g)*_,b=(f*g-p*m)*_;return u.set(1-y-b,b,y)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ba)===null?!1:ba.x>=0&&ba.y>=0&&ba.x+ba.y<=1}static getInterpolation(t,i,s,l,u,f,p,m){return this.getBarycoord(t,i,s,l,ba)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,ba.x),m.addScaledVector(f,ba.y),m.addScaledVector(p,ba.z),m)}static getInterpolatedAttribute(t,i,s,l,u,f){return fd.setScalar(0),hd.setScalar(0),dd.setScalar(0),fd.fromBufferAttribute(t,i),hd.fromBufferAttribute(t,s),dd.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(fd,u.x),f.addScaledVector(hd,u.y),f.addScaledVector(dd,u.z),f}static isFrontFacing(t,i,s,l){return Fi.subVectors(s,i),Ea.subVectors(t,i),Fi.cross(Ea).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fi.subVectors(this.c,this.b),Ea.subVectors(this.a,this.b),Fi.cross(Ea).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return zi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return zi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,u){return zi.getInterpolation(t,this.a,this.b,this.c,i,s,l,u)}containsPoint(t){return zi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return zi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,u=this.c;let f,p;Ir.subVectors(l,s),Fr.subVectors(u,s),ld.subVectors(t,s);const m=Ir.dot(ld),d=Fr.dot(ld);if(m<=0&&d<=0)return i.copy(s);ud.subVectors(t,l);const g=Ir.dot(ud),v=Fr.dot(ud);if(g>=0&&v<=g)return i.copy(l);const _=m*v-g*d;if(_<=0&&m>=0&&g<=0)return f=m/(m-g),i.copy(s).addScaledVector(Ir,f);cd.subVectors(t,u);const y=Ir.dot(cd),b=Fr.dot(cd);if(b>=0&&y<=b)return i.copy(u);const C=y*d-m*b;if(C<=0&&d>=0&&b<=0)return p=d/(d-b),i.copy(s).addScaledVector(Fr,p);const x=g*b-y*v;if(x<=0&&v-g>=0&&y-b>=0)return Mv.subVectors(u,l),p=(v-g)/(v-g+(y-b)),i.copy(l).addScaledVector(Mv,p);const S=1/(x+C+_);return f=C*S,p=_*S,i.copy(s).addScaledVector(Ir,f).addScaledVector(Fr,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ml{constructor(t=new J(1/0,1/0,1/0),i=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Bi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Bi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Bi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const u=s.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let f=0,p=u.count;f<p;f++)t.isMesh===!0?t.getVertexPosition(f,Bi):Bi.fromBufferAttribute(u,f),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bu.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Bu.copy(s.boundingBox)),Bu.applyMatrix4(t.matrixWorld),this.union(Bu)}const l=t.children;for(let u=0,f=l.length;u<f;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(sl),zu.subVectors(this.max,sl),Br.subVectors(t.a,sl),zr.subVectors(t.b,sl),Hr.subVectors(t.c,sl),us.subVectors(zr,Br),cs.subVectors(Hr,zr),Hs.subVectors(Br,Hr);let i=[0,-us.z,us.y,0,-cs.z,cs.y,0,-Hs.z,Hs.y,us.z,0,-us.x,cs.z,0,-cs.x,Hs.z,0,-Hs.x,-us.y,us.x,0,-cs.y,cs.x,0,-Hs.y,Hs.x,0];return!pd(i,Br,zr,Hr,zu)||(i=[1,0,0,0,1,0,0,0,1],!pd(i,Br,zr,Hr,zu))?!1:(Hu.crossVectors(us,cs),i=[Hu.x,Hu.y,Hu.z],pd(i,Br,zr,Hr,zu))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ta[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ta[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ta[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ta[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ta[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ta[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ta[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ta[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ta),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ta=[new J,new J,new J,new J,new J,new J,new J,new J],Bi=new J,Bu=new Ml,Br=new J,zr=new J,Hr=new J,us=new J,cs=new J,Hs=new J,sl=new J,zu=new J,Hu=new J,Gs=new J;function pd(r,t,i,s,l){for(let u=0,f=r.length-3;u<=f;u+=3){Gs.fromArray(r,u);const p=l.x*Math.abs(Gs.x)+l.y*Math.abs(Gs.y)+l.z*Math.abs(Gs.z),m=t.dot(Gs),d=i.dot(Gs),g=s.dot(Gs);if(Math.max(-Math.max(m,d,g),Math.min(m,d,g))>p)return!1}return!0}const vn=new J,Gu=new jt;let $b=0;class wi extends xs{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$b++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=ov,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Gu.fromBufferAttribute(this,i),Gu.applyMatrix3(t),this.setXY(i,Gu.x,Gu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.applyMatrix3(t),this.setXYZ(i,vn.x,vn.y,vn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.applyMatrix4(t),this.setXYZ(i,vn.x,vn.y,vn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.applyNormalMatrix(t),this.setXYZ(i,vn.x,vn.y,vn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.transformDirection(t),this.setXYZ(i,vn.x,vn.y,vn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=il(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=$n(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=il(i,this.array)),i}setX(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=il(i,this.array)),i}setY(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=il(i,this.array)),i}setZ(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=il(i,this.array)),i}setW(t,i){return this.normalized&&(i=$n(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,u){return t*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array),u=$n(u,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ov&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Wx extends wi{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class qx extends wi{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Mn extends wi{constructor(t,i,s){super(new Float32Array(t),i,s)}}const tT=new Ml,rl=new J,md=new J;class Pc{constructor(t=new J,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):tT.setFromPoints(t).getCenter(s);let l=0;for(let u=0,f=t.length;u<f;u++)l=Math.max(l,s.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rl.subVectors(t,this.center);const i=rl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(rl,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(md.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rl.copy(t.center).add(md)),this.expandByPoint(rl.copy(t.center).sub(md))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let eT=0;const Ci=new on,gd=new On,Gr=new J,mi=new Ml,ol=new Ml,Cn=new J;class Wn extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eT++}),this.uuid=Sl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nb(t)?qx:Wx)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const u=new ce().getNormalMatrix(t);s.applyNormalMatrix(u),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,i,s){return Ci.makeTranslation(t,i,s),this.applyMatrix4(Ci),this}scale(t,i,s){return Ci.makeScale(t,i,s),this.applyMatrix4(Ci),this}lookAt(t){return gd.lookAt(t),gd.updateMatrix(),this.applyMatrix4(gd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gr).negate(),this.translate(Gr.x,Gr.y,Gr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,u=t.length;l<u;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Mn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ml);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const u=i[s];mi.setFromBufferAttribute(u),this.morphTargetsRelative?(Cn.addVectors(this.boundingBox.min,mi.min),this.boundingBox.expandByPoint(Cn),Cn.addVectors(this.boundingBox.max,mi.max),this.boundingBox.expandByPoint(Cn)):(this.boundingBox.expandByPoint(mi.min),this.boundingBox.expandByPoint(mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pc);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const s=this.boundingSphere.center;if(mi.setFromBufferAttribute(t),i)for(let u=0,f=i.length;u<f;u++){const p=i[u];ol.setFromBufferAttribute(p),this.morphTargetsRelative?(Cn.addVectors(mi.min,ol.min),mi.expandByPoint(Cn),Cn.addVectors(mi.max,ol.max),mi.expandByPoint(Cn)):(mi.expandByPoint(ol.min),mi.expandByPoint(ol.max))}mi.getCenter(s);let l=0;for(let u=0,f=t.count;u<f;u++)Cn.fromBufferAttribute(t,u),l=Math.max(l,s.distanceToSquared(Cn));if(i)for(let u=0,f=i.length;u<f;u++){const p=i[u],m=this.morphTargetsRelative;for(let d=0,g=p.count;d<g;d++)Cn.fromBufferAttribute(p,d),m&&(Gr.fromBufferAttribute(t,d),Cn.add(Gr)),l=Math.max(l,s.distanceToSquared(Cn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,u=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==s.count)&&(f=new wi(new Float32Array(4*s.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let T=0;T<s.count;T++)p[T]=new J,m[T]=new J;const d=new J,g=new J,v=new J,_=new jt,y=new jt,b=new jt,C=new J,x=new J;function S(T,N,k){d.fromBufferAttribute(s,T),g.fromBufferAttribute(s,N),v.fromBufferAttribute(s,k),_.fromBufferAttribute(u,T),y.fromBufferAttribute(u,N),b.fromBufferAttribute(u,k),g.sub(d),v.sub(d),y.sub(_),b.sub(_);const G=1/(y.x*b.y-b.x*y.y);isFinite(G)&&(C.copy(g).multiplyScalar(b.y).addScaledVector(v,-y.y).multiplyScalar(G),x.copy(v).multiplyScalar(y.x).addScaledVector(g,-b.x).multiplyScalar(G),p[T].add(C),p[N].add(C),p[k].add(C),m[T].add(x),m[N].add(x),m[k].add(x))}let D=this.groups;D.length===0&&(D=[{start:0,count:t.count}]);for(let T=0,N=D.length;T<N;++T){const k=D[T],G=k.start,W=k.count;for(let ut=G,ct=G+W;ut<ct;ut+=3)S(t.getX(ut+0),t.getX(ut+1),t.getX(ut+2))}const O=new J,w=new J,I=new J,U=new J;function F(T){I.fromBufferAttribute(l,T),U.copy(I);const N=p[T];O.copy(N),O.sub(I.multiplyScalar(I.dot(N))).normalize(),w.crossVectors(U,N);const G=w.dot(m[T])<0?-1:1;f.setXYZW(T,O.x,O.y,O.z,G)}for(let T=0,N=D.length;T<N;++T){const k=D[T],G=k.start,W=k.count;for(let ut=G,ct=G+W;ut<ct;ut+=3)F(t.getX(ut+0)),F(t.getX(ut+1)),F(t.getX(ut+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new wi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let _=0,y=s.count;_<y;_++)s.setXYZ(_,0,0,0);const l=new J,u=new J,f=new J,p=new J,m=new J,d=new J,g=new J,v=new J;if(t)for(let _=0,y=t.count;_<y;_+=3){const b=t.getX(_+0),C=t.getX(_+1),x=t.getX(_+2);l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,C),f.fromBufferAttribute(i,x),g.subVectors(f,u),v.subVectors(l,u),g.cross(v),p.fromBufferAttribute(s,b),m.fromBufferAttribute(s,C),d.fromBufferAttribute(s,x),p.add(g),m.add(g),d.add(g),s.setXYZ(b,p.x,p.y,p.z),s.setXYZ(C,m.x,m.y,m.z),s.setXYZ(x,d.x,d.y,d.z)}else for(let _=0,y=i.count;_<y;_+=3)l.fromBufferAttribute(i,_+0),u.fromBufferAttribute(i,_+1),f.fromBufferAttribute(i,_+2),g.subVectors(f,u),v.subVectors(l,u),g.cross(v),s.setXYZ(_+0,g.x,g.y,g.z),s.setXYZ(_+1,g.x,g.y,g.z),s.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Cn.fromBufferAttribute(t,i),Cn.normalize(),t.setXYZ(i,Cn.x,Cn.y,Cn.z)}toNonIndexed(){function t(p,m){const d=p.array,g=p.itemSize,v=p.normalized,_=new d.constructor(m.length*g);let y=0,b=0;for(let C=0,x=m.length;C<x;C++){p.isInterleavedBufferAttribute?y=m[C]*p.data.stride+p.offset:y=m[C]*g;for(let S=0;S<g;S++)_[b++]=d[y++]}return new wi(_,g,v)}if(this.index===null)return re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Wn,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,s);i.setAttribute(p,d)}const u=this.morphAttributes;for(const p in u){const m=[],d=u[p];for(let g=0,v=d.length;g<v;g++){const _=d[g],y=t(_,s);m.push(y)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const d=s[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let u=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],g=[];for(let v=0,_=d.length;v<_;v++){const y=d[v];g.push(y.toJSON(t.data))}g.length>0&&(l[m]=g,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const d in l){const g=l[d];this.setAttribute(d,g.clone(i))}const u=t.morphAttributes;for(const d in u){const g=[],v=u[d];for(let _=0,y=v.length;_<y;_++)g.push(v[_].clone(i));this.morphAttributes[d]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let d=0,g=f.length;d<g;d++){const v=f[d];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let nT=0;class ro extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nT++}),this.uuid=Sl(),this.name="",this.type="Material",this.blending=Zr,this.side=gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ld,this.blendDst=Nd,this.blendEquation=Ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new le(0,0,0),this.blendAlpha=0,this.depthFunc=jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ur,this.stencilZFail=Ur,this.stencilZPass=Ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){re(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){re(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Zr&&(s.blending=this.blending),this.side!==gs&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Ld&&(s.blendSrc=this.blendSrc),this.blendDst!==Nd&&(s.blendDst=this.blendDst),this.blendEquation!==Ws&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==jr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rv&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ur&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ur&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ur&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(u){const f=[];for(const p in u){const m=u[p];delete m.metadata,f.push(m)}return f}if(i){const u=l(t.textures),f=l(t.images);u.length>0&&(s.textures=u),f.length>0&&(s.images=f)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new le().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new jt().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new jt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let u=0;u!==l;++u)s[u]=i[u].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Aa=new J,_d=new J,Vu=new J,fs=new J,vd=new J,ku=new J,xd=new J;class Jp{constructor(t=new J,i=new J(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Aa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Aa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Aa.copy(this.origin).addScaledVector(this.direction,i),Aa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){_d.copy(t).add(i).multiplyScalar(.5),Vu.copy(i).sub(t).normalize(),fs.copy(this.origin).sub(_d);const u=t.distanceTo(i)*.5,f=-this.direction.dot(Vu),p=fs.dot(this.direction),m=-fs.dot(Vu),d=fs.lengthSq(),g=Math.abs(1-f*f);let v,_,y,b;if(g>0)if(v=f*m-p,_=f*p-m,b=u*g,v>=0)if(_>=-b)if(_<=b){const C=1/g;v*=C,_*=C,y=v*(v+f*_+2*p)+_*(f*v+_+2*m)+d}else _=u,v=Math.max(0,-(f*_+p)),y=-v*v+_*(_+2*m)+d;else _=-u,v=Math.max(0,-(f*_+p)),y=-v*v+_*(_+2*m)+d;else _<=-b?(v=Math.max(0,-(-f*u+p)),_=v>0?-u:Math.min(Math.max(-u,-m),u),y=-v*v+_*(_+2*m)+d):_<=b?(v=0,_=Math.min(Math.max(-u,-m),u),y=_*(_+2*m)+d):(v=Math.max(0,-(f*u+p)),_=v>0?u:Math.min(Math.max(-u,-m),u),y=-v*v+_*(_+2*m)+d);else _=f>0?-u:u,v=Math.max(0,-(f*_+p)),y=-v*v+_*(_+2*m)+d;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(_d).addScaledVector(Vu,_),y}intersectSphere(t,i){Aa.subVectors(t.center,this.origin);const s=Aa.dot(this.direction),l=Aa.dot(Aa)-s*s,u=t.radius*t.radius;if(l>u)return null;const f=Math.sqrt(u-l),p=s-f,m=s+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,u,f,p,m;const d=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,_=this.origin;return d>=0?(s=(t.min.x-_.x)*d,l=(t.max.x-_.x)*d):(s=(t.max.x-_.x)*d,l=(t.min.x-_.x)*d),g>=0?(u=(t.min.y-_.y)*g,f=(t.max.y-_.y)*g):(u=(t.max.y-_.y)*g,f=(t.min.y-_.y)*g),s>f||u>l||((u>s||isNaN(s))&&(s=u),(f<l||isNaN(l))&&(l=f),v>=0?(p=(t.min.z-_.z)*v,m=(t.max.z-_.z)*v):(p=(t.max.z-_.z)*v,m=(t.min.z-_.z)*v),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,Aa)!==null}intersectTriangle(t,i,s,l,u){vd.subVectors(i,t),ku.subVectors(s,t),xd.crossVectors(vd,ku);let f=this.direction.dot(xd),p;if(f>0){if(l)return null;p=1}else if(f<0)p=-1,f=-f;else return null;fs.subVectors(this.origin,t);const m=p*this.direction.dot(ku.crossVectors(fs,ku));if(m<0)return null;const d=p*this.direction.dot(vd.cross(fs));if(d<0||m+d>f)return null;const g=-p*fs.dot(xd);return g<0?null:this.at(g/f,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ks extends ro{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vs,this.combine=Lx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const yv=new on,Vs=new Jp,Xu=new Pc,Ev=new J,Wu=new J,qu=new J,Yu=new J,Sd=new J,Zu=new J,bv=new J,Ku=new J;class Sn extends On{constructor(t=new Wn,i=new Ks){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=l.length;u<f;u++){const p=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=u}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,u=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(u&&p){Zu.set(0,0,0);for(let m=0,d=u.length;m<d;m++){const g=p[m],v=u[m];g!==0&&(Sd.fromBufferAttribute(v,t),f?Zu.addScaledVector(Sd,g):Zu.addScaledVector(Sd.sub(i),g))}i.add(Zu)}return i}raycast(t,i){const s=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Xu.copy(s.boundingSphere),Xu.applyMatrix4(u),Vs.copy(t.ray).recast(t.near),!(Xu.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(Xu,Ev)===null||Vs.origin.distanceToSquared(Ev)>(t.far-t.near)**2))&&(yv.copy(u).invert(),Vs.copy(t.ray).applyMatrix4(yv),!(s.boundingBox!==null&&Vs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Vs)))}_computeIntersections(t,i,s){let l;const u=this.geometry,f=this.material,p=u.index,m=u.attributes.position,d=u.attributes.uv,g=u.attributes.uv1,v=u.attributes.normal,_=u.groups,y=u.drawRange;if(p!==null)if(Array.isArray(f))for(let b=0,C=_.length;b<C;b++){const x=_[b],S=f[x.materialIndex],D=Math.max(x.start,y.start),O=Math.min(p.count,Math.min(x.start+x.count,y.start+y.count));for(let w=D,I=O;w<I;w+=3){const U=p.getX(w),F=p.getX(w+1),T=p.getX(w+2);l=Qu(this,S,t,s,d,g,v,U,F,T),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const b=Math.max(0,y.start),C=Math.min(p.count,y.start+y.count);for(let x=b,S=C;x<S;x+=3){const D=p.getX(x),O=p.getX(x+1),w=p.getX(x+2);l=Qu(this,f,t,s,d,g,v,D,O,w),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let b=0,C=_.length;b<C;b++){const x=_[b],S=f[x.materialIndex],D=Math.max(x.start,y.start),O=Math.min(m.count,Math.min(x.start+x.count,y.start+y.count));for(let w=D,I=O;w<I;w+=3){const U=w,F=w+1,T=w+2;l=Qu(this,S,t,s,d,g,v,U,F,T),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const b=Math.max(0,y.start),C=Math.min(m.count,y.start+y.count);for(let x=b,S=C;x<S;x+=3){const D=x,O=x+1,w=x+2;l=Qu(this,f,t,s,d,g,v,D,O,w),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function iT(r,t,i,s,l,u,f,p){let m;if(t.side===ei?m=s.intersectTriangle(f,u,l,!0,p):m=s.intersectTriangle(l,u,f,t.side===gs,p),m===null)return null;Ku.copy(p),Ku.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(Ku);return d<i.near||d>i.far?null:{distance:d,point:Ku.clone(),object:r}}function Qu(r,t,i,s,l,u,f,p,m,d){r.getVertexPosition(p,Wu),r.getVertexPosition(m,qu),r.getVertexPosition(d,Yu);const g=iT(r,t,i,s,Wu,qu,Yu,bv);if(g){const v=new J;zi.getBarycoord(bv,Wu,qu,Yu,v),l&&(g.uv=zi.getInterpolatedAttribute(l,p,m,d,v,new jt)),u&&(g.uv1=zi.getInterpolatedAttribute(u,p,m,d,v,new jt)),f&&(g.normal=zi.getInterpolatedAttribute(f,p,m,d,v,new J),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const _={a:p,b:m,c:d,normal:new J,materialIndex:0};zi.getNormal(Wu,qu,Yu,_.normal),g.face=_,g.barycoord=v}return g}class aT extends Vn{constructor(t=null,i=1,s=1,l,u,f,p,m,d=Pn,g=Pn,v,_){super(null,f,p,m,d,g,l,u,v,_),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Md=new J,sT=new J,rT=new ce;class ds{constructor(t=new J(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Md.subVectors(s,i).cross(sT.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(Md),u=this.normal.dot(l);if(u===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/u;return s===!0&&(f<0||f>1)?null:i.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||rT.getNormalMatrix(t),l=this.coplanarPoint(Md).applyMatrix4(t),u=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ks=new Pc,oT=new jt(.5,.5),Ju=new J;class jp{constructor(t=new ds,i=new ds,s=new ds,l=new ds,u=new ds,f=new ds){this.planes=[t,i,s,l,u,f]}set(t,i,s,l,u,f){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(u),p[5].copy(f),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ji,s=!1){const l=this.planes,u=t.elements,f=u[0],p=u[1],m=u[2],d=u[3],g=u[4],v=u[5],_=u[6],y=u[7],b=u[8],C=u[9],x=u[10],S=u[11],D=u[12],O=u[13],w=u[14],I=u[15];if(l[0].setComponents(d-f,y-g,S-b,I-D).normalize(),l[1].setComponents(d+f,y+g,S+b,I+D).normalize(),l[2].setComponents(d+p,y+v,S+C,I+O).normalize(),l[3].setComponents(d-p,y-v,S-C,I-O).normalize(),s)l[4].setComponents(m,_,x,w).normalize(),l[5].setComponents(d-m,y-_,S-x,I-w).normalize();else if(l[4].setComponents(d-m,y-_,S-x,I-w).normalize(),i===ji)l[5].setComponents(d+m,y+_,S+x,I+w).normalize();else if(i===ml)l[5].setComponents(m,_,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ks.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ks)}intersectsSprite(t){ks.center.set(0,0,0);const i=oT.distanceTo(t.center);return ks.radius=.7071067811865476+i,ks.applyMatrix4(t.matrixWorld),this.intersectsSphere(ks)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Ju.x=l.normal.x>0?t.max.x:t.min.x,Ju.y=l.normal.y>0?t.max.y:t.min.y,Ju.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Ju)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yx extends ro{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Tv=new on,Sp=new Jp,ju=new Pc,$u=new J;class Av extends On{constructor(t=new Wn,i=new Yx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,u=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),ju.copy(s.boundingSphere),ju.applyMatrix4(l),ju.radius+=u,t.ray.intersectsSphere(ju)===!1)return;Tv.copy(l).invert(),Sp.copy(t.ray).applyMatrix4(Tv);const p=u/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=s.index,v=s.attributes.position;if(d!==null){const _=Math.max(0,f.start),y=Math.min(d.count,f.start+f.count);for(let b=_,C=y;b<C;b++){const x=d.getX(b);$u.fromBufferAttribute(v,x),Rv($u,x,m,l,t,i,this)}}else{const _=Math.max(0,f.start),y=Math.min(v.count,f.start+f.count);for(let b=_,C=y;b<C;b++)$u.fromBufferAttribute(v,b),Rv($u,b,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,f=l.length;u<f;u++){const p=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=u}}}}}function Rv(r,t,i,s,l,u,f){const p=Sp.distanceSqToPoint(r);if(p<i){const m=new J;Sp.closestPointToPoint(r,m),m.applyMatrix4(s);const d=l.ray.origin.distanceTo(m);if(d<l.near||d>l.far)return;u.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class Zx extends Vn{constructor(t=[],i=Qs,s,l,u,f,p,m,d,g){super(t,i,s,l,u,f,p,m,d,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tc extends Vn{constructor(t,i,s,l,u,f,p,m,d){super(t,i,s,l,u,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class to extends Vn{constructor(t,i,s=na,l,u,f,p=Pn,m=Pn,d,g=Ua,v=1){if(g!==Ua&&g!==Zs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:t,height:i,depth:v};super(_,l,u,f,p,m,g,s,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Kp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class lT extends to{constructor(t,i=na,s=Qs,l,u,f=Pn,p=Pn,m,d=Ua){const g={width:t,height:t,depth:1},v=[g,g,g,g,g,g];super(t,t,i,s,l,u,f,p,m,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Kx extends Vn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class js extends Wn{constructor(t=1,i=1,s=1,l=1,u=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:u,depthSegments:f};const p=this;l=Math.floor(l),u=Math.floor(u),f=Math.floor(f);const m=[],d=[],g=[],v=[];let _=0,y=0;b("z","y","x",-1,-1,s,i,t,f,u,0),b("z","y","x",1,-1,s,i,-t,f,u,1),b("x","z","y",1,1,t,s,i,l,f,2),b("x","z","y",1,-1,t,s,-i,l,f,3),b("x","y","z",1,-1,t,i,s,l,u,4),b("x","y","z",-1,-1,t,i,-s,l,u,5),this.setIndex(m),this.setAttribute("position",new Mn(d,3)),this.setAttribute("normal",new Mn(g,3)),this.setAttribute("uv",new Mn(v,2));function b(C,x,S,D,O,w,I,U,F,T,N){const k=w/F,G=I/T,W=w/2,ut=I/2,ct=U/2,Z=F+1,B=T+1;let H=0,$=0;const _t=new J;for(let Et=0;Et<B;Et++){const P=Et*G-ut;for(let K=0;K<Z;K++){const Mt=K*k-W;_t[C]=Mt*D,_t[x]=P*O,_t[S]=ct,d.push(_t.x,_t.y,_t.z),_t[C]=0,_t[x]=0,_t[S]=U>0?1:-1,g.push(_t.x,_t.y,_t.z),v.push(K/F),v.push(1-Et/T),H+=1}}for(let Et=0;Et<T;Et++)for(let P=0;P<F;P++){const K=_+P+Z*Et,Mt=_+P+Z*(Et+1),Tt=_+(P+1)+Z*(Et+1),Ut=_+(P+1)+Z*Et;m.push(K,Mt,Ut),m.push(Mt,Tt,Ut),$+=6}p.addGroup(y,$,N),y+=$,_+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new js(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Ac extends Wn{constructor(t=1,i=1,s=1,l=32,u=1,f=!1,p=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:s,radialSegments:l,heightSegments:u,openEnded:f,thetaStart:p,thetaLength:m};const d=this;l=Math.floor(l),u=Math.floor(u);const g=[],v=[],_=[],y=[];let b=0;const C=[],x=s/2;let S=0;D(),f===!1&&(t>0&&O(!0),i>0&&O(!1)),this.setIndex(g),this.setAttribute("position",new Mn(v,3)),this.setAttribute("normal",new Mn(_,3)),this.setAttribute("uv",new Mn(y,2));function D(){const w=new J,I=new J;let U=0;const F=(i-t)/s;for(let T=0;T<=u;T++){const N=[],k=T/u,G=k*(i-t)+t;for(let W=0;W<=l;W++){const ut=W/l,ct=ut*m+p,Z=Math.sin(ct),B=Math.cos(ct);I.x=G*Z,I.y=-k*s+x,I.z=G*B,v.push(I.x,I.y,I.z),w.set(Z,F,B).normalize(),_.push(w.x,w.y,w.z),y.push(ut,1-k),N.push(b++)}C.push(N)}for(let T=0;T<l;T++)for(let N=0;N<u;N++){const k=C[N][T],G=C[N+1][T],W=C[N+1][T+1],ut=C[N][T+1];(t>0||N!==0)&&(g.push(k,G,ut),U+=3),(i>0||N!==u-1)&&(g.push(G,W,ut),U+=3)}d.addGroup(S,U,0),S+=U}function O(w){const I=b,U=new jt,F=new J;let T=0;const N=w===!0?t:i,k=w===!0?1:-1;for(let W=1;W<=l;W++)v.push(0,x*k,0),_.push(0,k,0),y.push(.5,.5),b++;const G=b;for(let W=0;W<=l;W++){const ct=W/l*m+p,Z=Math.cos(ct),B=Math.sin(ct);F.x=N*B,F.y=x*k,F.z=N*Z,v.push(F.x,F.y,F.z),_.push(0,k,0),U.x=Z*.5+.5,U.y=B*.5*k+.5,y.push(U.x,U.y),b++}for(let W=0;W<l;W++){const ut=I+W,ct=G+W;w===!0?g.push(ct,ct+1,ut):g.push(ct+1,ct,ut),T+=3}d.addGroup(S,T,w===!0?1:2),S+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ac(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class eo extends Wn{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const u=t/2,f=i/2,p=Math.floor(s),m=Math.floor(l),d=p+1,g=m+1,v=t/p,_=i/m,y=[],b=[],C=[],x=[];for(let S=0;S<g;S++){const D=S*_-f;for(let O=0;O<d;O++){const w=O*v-u;b.push(w,-D,0),C.push(0,0,1),x.push(O/p),x.push(1-S/m)}}for(let S=0;S<m;S++)for(let D=0;D<p;D++){const O=D+d*S,w=D+d*(S+1),I=D+1+d*(S+1),U=D+1+d*S;y.push(O,w,U),y.push(w,I,U)}this.setIndex(y),this.setAttribute("position",new Mn(b,3)),this.setAttribute("normal",new Mn(C,3)),this.setAttribute("uv",new Mn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eo(t.width,t.height,t.widthSegments,t.heightSegments)}}class Rc extends Wn{constructor(t=1,i=32,s=16,l=0,u=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:u,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+p,Math.PI);let d=0;const g=[],v=new J,_=new J,y=[],b=[],C=[],x=[];for(let S=0;S<=s;S++){const D=[],O=S/s,w=f+O*p,I=t*Math.cos(w),U=Math.sqrt(t*t-I*I);let F=0;S===0&&f===0?F=.5/i:S===s&&m===Math.PI&&(F=-.5/i);for(let T=0;T<=i;T++){const N=T/i,k=l+N*u;v.x=-U*Math.cos(k),v.y=I,v.z=U*Math.sin(k),b.push(v.x,v.y,v.z),_.copy(v).normalize(),C.push(_.x,_.y,_.z),x.push(N+F,1-O),D.push(d++)}g.push(D)}for(let S=0;S<s;S++)for(let D=0;D<i;D++){const O=g[S][D+1],w=g[S][D],I=g[S+1][D],U=g[S+1][D+1];(S!==0||f>0)&&y.push(O,w,U),(S!==s-1||m<Math.PI)&&y.push(w,I,U)}this.setIndex(y),this.setAttribute("position",new Mn(b,3)),this.setAttribute("normal",new Mn(C,3)),this.setAttribute("uv",new Mn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class $p extends Wn{constructor(t=1,i=.4,s=12,l=48,u=Math.PI*2,f=0,p=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:i,radialSegments:s,tubularSegments:l,arc:u,thetaStart:f,thetaLength:p},s=Math.floor(s),l=Math.floor(l);const m=[],d=[],g=[],v=[],_=new J,y=new J,b=new J;for(let C=0;C<=s;C++){const x=f+C/s*p;for(let S=0;S<=l;S++){const D=S/l*u;y.x=(t+i*Math.cos(x))*Math.cos(D),y.y=(t+i*Math.cos(x))*Math.sin(D),y.z=i*Math.sin(x),d.push(y.x,y.y,y.z),_.x=t*Math.cos(D),_.y=t*Math.sin(D),b.subVectors(y,_).normalize(),g.push(b.x,b.y,b.z),v.push(S/l),v.push(C/s)}}for(let C=1;C<=s;C++)for(let x=1;x<=l;x++){const S=(l+1)*C+x-1,D=(l+1)*(C-1)+x-1,O=(l+1)*(C-1)+x,w=(l+1)*C+x;m.push(S,D,w),m.push(D,O,w)}this.setIndex(m),this.setAttribute("position",new Mn(d,3)),this.setAttribute("normal",new Mn(g,3)),this.setAttribute("uv",new Mn(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $p(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function no(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];if(Cv(l))l.isRenderTargetTexture?(re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(Cv(l[0])){const u=[];for(let f=0,p=l.length;f<p;f++)u[f]=l[f].clone();t[i][s]=u}else t[i][s]=l.slice();else t[i][s]=l}}return t}function Xn(r){const t={};for(let i=0;i<r.length;i++){const s=no(r[i]);for(const l in s)t[l]=s[l]}return t}function Cv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function uT(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function Qx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ye.workingColorSpace}const gl={clone:no,merge:Xn};var cT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends ro{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cT,this.fragmentShader=fT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=no(t.uniforms),this.uniformsGroups=uT(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new le().setHex(l.value);break;case"v2":this.uniforms[s].value=new jt().fromArray(l.value);break;case"v3":this.uniforms[s].value=new J().fromArray(l.value);break;case"v4":this.uniforms[s].value=new sn().fromArray(l.value);break;case"m3":this.uniforms[s].value=new ce().fromArray(l.value);break;case"m4":this.uniforms[s].value=new on().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Jx extends Gn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xs extends ro{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vp,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hT extends Xs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new jt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class dT extends ro{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class pT extends ro{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class tm extends On{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new le(t),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const yd=new on,wv=new J,Dv=new J;class jx{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new jt(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new on,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jp,this._frameExtents=new jt(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;wv.setFromMatrixPosition(t.matrixWorld),i.position.copy(wv),Dv.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(Dv),i.updateMatrixWorld(),yd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yd,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===ml||i.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(yd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ec=new J,nc=new _s,Zi=new J;class $x extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ec,nc,Zi),Zi.x===1&&Zi.y===1&&Zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ec,nc,Zi.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(ec,nc,Zi),Zi.x===1&&Zi.y===1&&Zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ec,nc,Zi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const hs=new J,Uv=new jt,Lv=new jt;class _i extends $x{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=xp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(mc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xp*2*Math.atan(Math.tan(mc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hs.x,hs.y).multiplyScalar(-t/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(hs.x,hs.y).multiplyScalar(-t/hs.z)}getViewSize(t,i){return this.getViewBounds(t,Uv,Lv),i.subVectors(Lv,Uv)}setViewOffset(t,i,s,l,u,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(mc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,u=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;u+=f.offsetX*l/m,i-=f.offsetY*s/d,l*=f.width/m,s*=f.height/d}const p=this.filmOffset;p!==0&&(u+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class mT extends jx{constructor(){super(new _i(90,1,.5,500)),this.isPointLightShadow=!0}}class gT extends tm{constructor(t,i,s=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new mT}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class Oc extends $x{constructor(t=-1,i=1,s=1,l=-1,u=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=u,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,u,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=s-t,f=s+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=d*this.view.offsetX,f=u+d*this.view.width,p-=g*this.view.offsetY,m=p-g*this.view.height}this.projectionMatrix.makeOrthographic(u,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class _T extends jx{constructor(){super(new Oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nv extends tm{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.shadow=new _T}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class vT extends tm{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Vr=-90,kr=1;class xT extends On{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new _i(Vr,kr,t,i);l.layers=this.layers,this.add(l);const u=new _i(Vr,kr,t,i);u.layers=this.layers,this.add(u);const f=new _i(Vr,kr,t,i);f.layers=this.layers,this.add(f);const p=new _i(Vr,kr,t,i);p.layers=this.layers,this.add(p);const m=new _i(Vr,kr,t,i);m.layers=this.layers,this.add(m);const d=new _i(Vr,kr,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,u,f,p,m]=i;for(const d of i)this.remove(d);if(t===ji)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===ml)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,f,p,m,d,g]=this.children,v=t.getRenderTarget(),_=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let x=!1;t.isWebGLRenderer===!0?x=t.state.buffers.depth.getReversed():x=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,u),t.setRenderTarget(s,1,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(s,2,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(s,3,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),s.texture.generateMipmaps=C,t.setRenderTarget(s,5,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,g),t.setRenderTarget(v,_,y),t.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class ST extends _i{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class MT{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=yT.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function yT(){this._document.hidden===!1&&this.reset()}class ET{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,re("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();t=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=t}return t}}class Pv{constructor(t=1,i=0,s=0){this.radius=t,this.phi=i,this.theta=s}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(ge(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const om=class om{constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const u=this.elements;return u[0]=t,u[2]=i,u[1]=s,u[3]=l,this}};om.prototype.isMatrix2=!0;let Ov=om;class bT extends xs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){re("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Iv(r,t,i,s){const l=TT(s);switch(i){case Bx:return r*t;case Hx:return r*t/l.components*l.byteLength;case Xp:return r*t/l.components*l.byteLength;case Js:return r*t*2/l.components*l.byteLength;case Wp:return r*t*2/l.components*l.byteLength;case zx:return r*t*3/l.components*l.byteLength;case Hi:return r*t*4/l.components*l.byteLength;case qp:return r*t*4/l.components*l.byteLength;case fc:case hc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case dc:case pc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case kd:case Wd:return Math.max(r,16)*Math.max(t,8)/4;case Vd:case Xd:return Math.max(r,8)*Math.max(t,8)/2;case qd:case Yd:case Kd:case Qd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Zd:case Mc:case Jd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case jd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case $d:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case tp:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case ep:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case np:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ip:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ap:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case sp:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case rp:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case op:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case lp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case up:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case cp:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case fp:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case hp:case dp:case pp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case mp:case gp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case yc:case _p:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function TT(r){switch(r){case vi:case Px:return{byteLength:1,components:1};case dl:case Ox:case xi:return{byteLength:2,components:1};case Vp:case kp:return{byteLength:2,components:4};case na:case Gp:case Ji:return{byteLength:4,components:1};case Ix:case Fx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pp}}));typeof window<"u"&&(window.__THREE__?re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pp);function tS(){let r=null,t=!1,i=null,s=null;function l(u,f){i(u,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){r=u}}}function AT(r){const t=new WeakMap;function i(p,m){const d=p.array,g=p.usage,v=d.byteLength,_=r.createBuffer();r.bindBuffer(m,_),r.bufferData(m,d,g),p.onUploadCallback();let y;if(d instanceof Float32Array)y=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)y=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?y=r.HALF_FLOAT:y=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)y=r.SHORT;else if(d instanceof Uint32Array)y=r.UNSIGNED_INT;else if(d instanceof Int32Array)y=r.INT;else if(d instanceof Int8Array)y=r.BYTE;else if(d instanceof Uint8Array)y=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)y=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:y,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:v}}function s(p,m,d){const g=m.array,v=m.updateRanges;if(r.bindBuffer(d,p),v.length===0)r.bufferSubData(d,0,g);else{v.sort((y,b)=>y.start-b.start);let _=0;for(let y=1;y<v.length;y++){const b=v[_],C=v[y];C.start<=b.start+b.count+1?b.count=Math.max(b.count,C.start+C.count-b.start):(++_,v[_]=C)}v.length=_+1;for(let y=0,b=v.length;y<b;y++){const C=v[y];r.bufferSubData(d,C.start*g.BYTES_PER_ELEMENT,g,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function u(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const g=t.get(p);(!g||g.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,p,m),d.version=p.version}}return{get:l,remove:u,update:f}}var RT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,CT=`#ifdef USE_ALPHAHASH
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
#endif`,wT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,DT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,UT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,LT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,NT=`#ifdef USE_AOMAP
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
#endif`,OT=`#ifdef USE_BATCHING
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
#endif`,IT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,FT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,BT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,HT=`#ifdef USE_IRIDESCENCE
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
#endif`,GT=`#ifdef USE_BUMPMAP
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
#endif`,VT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,XT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,WT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,YT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ZT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,KT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,QT=`#define PI 3.141592653589793
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
} // validated`,JT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jT=`vec3 transformedNormal = objectNormal;
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
#endif`,$T=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,t1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,n1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,i1="gl_FragColor = linearToOutputTexel( gl_FragColor );",a1=`vec4 LinearTransferOETF( in vec4 value ) {
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
#endif`,r1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,o1=`#ifdef USE_ENVMAP
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
#endif`,l1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u1=`#ifdef USE_ENVMAP
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
#endif`,c1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,p1=`#ifdef USE_GRADIENTMAP
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
}`,m1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,g1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,v1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,x1=`#ifdef USE_ENVMAP
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
#endif`,S1=`ToonMaterial material;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,y1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,b1=`PhysicalMaterial material;
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
#endif`,T1=`uniform sampler2D dfgLUT;
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
}`,A1=`
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
#endif`,R1=`#if defined( RE_IndirectDiffuse )
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
#endif`,C1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,D1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,U1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,P1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,O1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,F1=`#if defined( USE_POINTS_UV )
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
#endif`,B1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,H1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k1=`#ifdef USE_MORPHTARGETS
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
#endif`,X1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,q1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Y1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Q1=`#ifdef USE_NORMALMAP
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
#endif`,J1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$1=`#ifdef USE_CLEARCOATMAP
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
#endif`,eA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,iA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,aA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hA=`float getShadowMask() {
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
}`,dA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pA=`#ifdef USE_SKINNING
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
#endif`,mA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gA=`#ifdef USE_SKINNING
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
#endif`,_A=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,SA=`#ifndef saturate
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
#endif`,yA=`#ifdef USE_TRANSMISSION
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
#endif`,EA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,AA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const RA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,CA=`uniform sampler2D t2D;
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
}`,wA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,UA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NA=`#include <common>
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
}`,OA=`#define DISTANCE
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
}`,IA=`#define DISTANCE
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
}`,FA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,BA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zA=`uniform float scale;
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
}`,HA=`uniform vec3 diffuse;
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
}`,GA=`#include <common>
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
}`,VA=`uniform vec3 diffuse;
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
}`,kA=`#define LAMBERT
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
}`,XA=`#define LAMBERT
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
}`,WA=`#define MATCAP
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
}`,qA=`#define MATCAP
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
}`,YA=`#define NORMAL
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
}`,ZA=`#define NORMAL
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
}`,KA=`#define PHONG
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
}`,QA=`#define PHONG
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
}`,JA=`#define STANDARD
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
}`,jA=`#define STANDARD
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
}`,$A=`#define TOON
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
}`,eR=`uniform float size;
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
}`,nR=`uniform vec3 diffuse;
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
}`,iR=`#include <common>
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
}`,aR=`uniform vec3 color;
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
}`,rR=`uniform vec3 diffuse;
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
}`,me={alphahash_fragment:RT,alphahash_pars_fragment:CT,alphamap_fragment:wT,alphamap_pars_fragment:DT,alphatest_fragment:UT,alphatest_pars_fragment:LT,aomap_fragment:NT,aomap_pars_fragment:PT,batching_pars_vertex:OT,batching_vertex:IT,begin_vertex:FT,beginnormal_vertex:BT,bsdfs:zT,iridescence_fragment:HT,bumpmap_pars_fragment:GT,clipping_planes_fragment:VT,clipping_planes_pars_fragment:kT,clipping_planes_pars_vertex:XT,clipping_planes_vertex:WT,color_fragment:qT,color_pars_fragment:YT,color_pars_vertex:ZT,color_vertex:KT,common:QT,cube_uv_reflection_fragment:JT,defaultnormal_vertex:jT,displacementmap_pars_vertex:$T,displacementmap_vertex:t1,emissivemap_fragment:e1,emissivemap_pars_fragment:n1,colorspace_fragment:i1,colorspace_pars_fragment:a1,envmap_fragment:s1,envmap_common_pars_fragment:r1,envmap_pars_fragment:o1,envmap_pars_vertex:l1,envmap_physical_pars_fragment:x1,envmap_vertex:u1,fog_vertex:c1,fog_pars_vertex:f1,fog_fragment:h1,fog_pars_fragment:d1,gradientmap_pars_fragment:p1,lightmap_pars_fragment:m1,lights_lambert_fragment:g1,lights_lambert_pars_fragment:_1,lights_pars_begin:v1,lights_toon_fragment:S1,lights_toon_pars_fragment:M1,lights_phong_fragment:y1,lights_phong_pars_fragment:E1,lights_physical_fragment:b1,lights_physical_pars_fragment:T1,lights_fragment_begin:A1,lights_fragment_maps:R1,lights_fragment_end:C1,lightprobes_pars_fragment:w1,logdepthbuf_fragment:D1,logdepthbuf_pars_fragment:U1,logdepthbuf_pars_vertex:L1,logdepthbuf_vertex:N1,map_fragment:P1,map_pars_fragment:O1,map_particle_fragment:I1,map_particle_pars_fragment:F1,metalnessmap_fragment:B1,metalnessmap_pars_fragment:z1,morphinstance_vertex:H1,morphcolor_vertex:G1,morphnormal_vertex:V1,morphtarget_pars_vertex:k1,morphtarget_vertex:X1,normal_fragment_begin:W1,normal_fragment_maps:q1,normal_pars_fragment:Y1,normal_pars_vertex:Z1,normal_vertex:K1,normalmap_pars_fragment:Q1,clearcoat_normal_fragment_begin:J1,clearcoat_normal_fragment_maps:j1,clearcoat_pars_fragment:$1,iridescence_pars_fragment:tA,opaque_fragment:eA,packing:nA,premultiplied_alpha_fragment:iA,project_vertex:aA,dithering_fragment:sA,dithering_pars_fragment:rA,roughnessmap_fragment:oA,roughnessmap_pars_fragment:lA,shadowmap_pars_fragment:uA,shadowmap_pars_vertex:cA,shadowmap_vertex:fA,shadowmask_pars_fragment:hA,skinbase_vertex:dA,skinning_pars_vertex:pA,skinning_vertex:mA,skinnormal_vertex:gA,specularmap_fragment:_A,specularmap_pars_fragment:vA,tonemapping_fragment:xA,tonemapping_pars_fragment:SA,transmission_fragment:MA,transmission_pars_fragment:yA,uv_pars_fragment:EA,uv_pars_vertex:bA,uv_vertex:TA,worldpos_vertex:AA,background_vert:RA,background_frag:CA,backgroundCube_vert:wA,backgroundCube_frag:DA,cube_vert:UA,cube_frag:LA,depth_vert:NA,depth_frag:PA,distance_vert:OA,distance_frag:IA,equirect_vert:FA,equirect_frag:BA,linedashed_vert:zA,linedashed_frag:HA,meshbasic_vert:GA,meshbasic_frag:VA,meshlambert_vert:kA,meshlambert_frag:XA,meshmatcap_vert:WA,meshmatcap_frag:qA,meshnormal_vert:YA,meshnormal_frag:ZA,meshphong_vert:KA,meshphong_frag:QA,meshphysical_vert:JA,meshphysical_frag:jA,meshtoon_vert:$A,meshtoon_frag:tR,points_vert:eR,points_frag:nR,shadow_vert:iR,shadow_frag:aR,sprite_vert:sR,sprite_frag:rR},Ft={common:{diffuse:{value:new le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new le(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Qi={basic:{uniforms:Xn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Xn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)},envMapIntensity:{value:1}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Xn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Xn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Xn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Xn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Xn([Ft.points,Ft.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Xn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Xn([Ft.common,Ft.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Xn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Xn([Ft.sprite,Ft.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distance:{uniforms:Xn([Ft.common,Ft.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distance_vert,fragmentShader:me.distance_frag},shadow:{uniforms:Xn([Ft.lights,Ft.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};Qi.physical={uniforms:Xn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new le(0)},specularColor:{value:new le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};const ic={r:0,b:0,g:0},oR=new on,eS=new ce;eS.set(-1,0,0,0,1,0,0,0,1);function lR(r,t,i,s,l,u){const f=new le(0);let p=l===!0?0:1,m,d,g=null,v=0,_=null;function y(D){let O=D.isScene===!0?D.background:null;if(O&&O.isTexture){const w=D.backgroundBlurriness>0;O=t.get(O,w)}return O}function b(D){let O=!1;const w=y(D);w===null?x(f,p):w&&w.isColor&&(x(w,1),O=!0);const I=r.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,u):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,u),(r.autoClear||O)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(D,O){const w=y(O);w&&(w.isCubeTexture||w.mapping===Nc)?(d===void 0&&(d=new Sn(new js(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:no(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,U,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=w,d.material.uniforms.backgroundBlurriness.value=O.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(oR.makeRotationFromEuler(O.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(eS),d.material.toneMapped=ye.getTransfer(w.colorSpace)!==Pe,(g!==w||v!==w.version||_!==r.toneMapping)&&(d.material.needsUpdate=!0,g=w,v=w.version,_=r.toneMapping),d.layers.enableAll(),D.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(m===void 0&&(m=new Sn(new eo(2,2),new Gn({name:"BackgroundMaterial",uniforms:no(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=w,m.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,m.material.toneMapped=ye.getTransfer(w.colorSpace)!==Pe,w.matrixAutoUpdate===!0&&w.updateMatrix(),m.material.uniforms.uvTransform.value.copy(w.matrix),(g!==w||v!==w.version||_!==r.toneMapping)&&(m.material.needsUpdate=!0,g=w,v=w.version,_=r.toneMapping),m.layers.enableAll(),D.unshift(m,m.geometry,m.material,0,0,null))}function x(D,O){D.getRGB(ic,Qx(r)),i.buffers.color.setClear(ic.r,ic.g,ic.b,O,u)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(D,O=1){f.set(D),p=O,x(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(D){p=D,x(f,p)},render:b,addToRenderList:C,dispose:S}}function uR(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=_(null);let u=l,f=!1;function p(G,W,ut,ct,Z){let B=!1;const H=v(G,ct,ut,W);u!==H&&(u=H,d(u.object)),B=y(G,ct,ut,Z),B&&b(G,ct,ut,Z),Z!==null&&t.update(Z,r.ELEMENT_ARRAY_BUFFER),(B||f)&&(f=!1,w(G,W,ut,ct),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function m(){return r.createVertexArray()}function d(G){return r.bindVertexArray(G)}function g(G){return r.deleteVertexArray(G)}function v(G,W,ut,ct){const Z=ct.wireframe===!0;let B=s[W.id];B===void 0&&(B={},s[W.id]=B);const H=G.isInstancedMesh===!0?G.id:0;let $=B[H];$===void 0&&($={},B[H]=$);let _t=$[ut.id];_t===void 0&&(_t={},$[ut.id]=_t);let Et=_t[Z];return Et===void 0&&(Et=_(m()),_t[Z]=Et),Et}function _(G){const W=[],ut=[],ct=[];for(let Z=0;Z<i;Z++)W[Z]=0,ut[Z]=0,ct[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:ut,attributeDivisors:ct,object:G,attributes:{},index:null}}function y(G,W,ut,ct){const Z=u.attributes,B=W.attributes;let H=0;const $=ut.getAttributes();for(const _t in $)if($[_t].location>=0){const P=Z[_t];let K=B[_t];if(K===void 0&&(_t==="instanceMatrix"&&G.instanceMatrix&&(K=G.instanceMatrix),_t==="instanceColor"&&G.instanceColor&&(K=G.instanceColor)),P===void 0||P.attribute!==K||K&&P.data!==K.data)return!0;H++}return u.attributesNum!==H||u.index!==ct}function b(G,W,ut,ct){const Z={},B=W.attributes;let H=0;const $=ut.getAttributes();for(const _t in $)if($[_t].location>=0){let P=B[_t];P===void 0&&(_t==="instanceMatrix"&&G.instanceMatrix&&(P=G.instanceMatrix),_t==="instanceColor"&&G.instanceColor&&(P=G.instanceColor));const K={};K.attribute=P,P&&P.data&&(K.data=P.data),Z[_t]=K,H++}u.attributes=Z,u.attributesNum=H,u.index=ct}function C(){const G=u.newAttributes;for(let W=0,ut=G.length;W<ut;W++)G[W]=0}function x(G){S(G,0)}function S(G,W){const ut=u.newAttributes,ct=u.enabledAttributes,Z=u.attributeDivisors;ut[G]=1,ct[G]===0&&(r.enableVertexAttribArray(G),ct[G]=1),Z[G]!==W&&(r.vertexAttribDivisor(G,W),Z[G]=W)}function D(){const G=u.newAttributes,W=u.enabledAttributes;for(let ut=0,ct=W.length;ut<ct;ut++)W[ut]!==G[ut]&&(r.disableVertexAttribArray(ut),W[ut]=0)}function O(G,W,ut,ct,Z,B,H){H===!0?r.vertexAttribIPointer(G,W,ut,Z,B):r.vertexAttribPointer(G,W,ut,ct,Z,B)}function w(G,W,ut,ct){C();const Z=ct.attributes,B=ut.getAttributes(),H=W.defaultAttributeValues;for(const $ in B){const _t=B[$];if(_t.location>=0){let Et=Z[$];if(Et===void 0&&($==="instanceMatrix"&&G.instanceMatrix&&(Et=G.instanceMatrix),$==="instanceColor"&&G.instanceColor&&(Et=G.instanceColor)),Et!==void 0){const P=Et.normalized,K=Et.itemSize,Mt=t.get(Et);if(Mt===void 0)continue;const Tt=Mt.buffer,Ut=Mt.type,at=Mt.bytesPerElement,yt=Ut===r.INT||Ut===r.UNSIGNED_INT||Et.gpuType===Gp;if(Et.isInterleavedBufferAttribute){const St=Et.data,Gt=St.stride,se=Et.offset;if(St.isInstancedInterleavedBuffer){for(let $t=0;$t<_t.locationSize;$t++)S(_t.location+$t,St.meshPerAttribute);G.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let $t=0;$t<_t.locationSize;$t++)x(_t.location+$t);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let $t=0;$t<_t.locationSize;$t++)O(_t.location+$t,K/_t.locationSize,Ut,P,Gt*at,(se+K/_t.locationSize*$t)*at,yt)}else{if(Et.isInstancedBufferAttribute){for(let St=0;St<_t.locationSize;St++)S(_t.location+St,Et.meshPerAttribute);G.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=Et.meshPerAttribute*Et.count)}else for(let St=0;St<_t.locationSize;St++)x(_t.location+St);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let St=0;St<_t.locationSize;St++)O(_t.location+St,K/_t.locationSize,Ut,P,K*at,K/_t.locationSize*St*at,yt)}}else if(H!==void 0){const P=H[$];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(_t.location,P);break;case 3:r.vertexAttrib3fv(_t.location,P);break;case 4:r.vertexAttrib4fv(_t.location,P);break;default:r.vertexAttrib1fv(_t.location,P)}}}}D()}function I(){N();for(const G in s){const W=s[G];for(const ut in W){const ct=W[ut];for(const Z in ct){const B=ct[Z];for(const H in B)g(B[H].object),delete B[H];delete ct[Z]}}delete s[G]}}function U(G){if(s[G.id]===void 0)return;const W=s[G.id];for(const ut in W){const ct=W[ut];for(const Z in ct){const B=ct[Z];for(const H in B)g(B[H].object),delete B[H];delete ct[Z]}}delete s[G.id]}function F(G){for(const W in s){const ut=s[W];for(const ct in ut){const Z=ut[ct];if(Z[G.id]===void 0)continue;const B=Z[G.id];for(const H in B)g(B[H].object),delete B[H];delete Z[G.id]}}}function T(G){for(const W in s){const ut=s[W],ct=G.isInstancedMesh===!0?G.id:0,Z=ut[ct];if(Z!==void 0){for(const B in Z){const H=Z[B];for(const $ in H)g(H[$].object),delete H[$];delete Z[B]}delete ut[ct],Object.keys(ut).length===0&&delete s[W]}}}function N(){k(),f=!0,u!==l&&(u=l,d(u.object))}function k(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:N,resetDefaultState:k,dispose:I,releaseStatesOfGeometry:U,releaseStatesOfObject:T,releaseStatesOfProgram:F,initAttributes:C,enableAttribute:x,disableUnusedAttributes:D}}function cR(r,t,i){let s;function l(m){s=m}function u(m,d){r.drawArrays(s,m,d),i.update(d,s,1)}function f(m,d,g){g!==0&&(r.drawArraysInstanced(s,m,d,g),i.update(d,s,g))}function p(m,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,d,0,g);let _=0;for(let y=0;y<g;y++)_+=d[y];i.update(_,s,1)}this.setMode=l,this.render=u,this.renderInstances=f,this.renderMultiDraw=p}function fR(r,t,i,s){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const F=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(F){return!(F!==Hi&&s.convert(F)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(F){const T=F===xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(F!==vi&&s.convert(F)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==Ji&&!T)}function m(F){if(F==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const g=m(d);g!==d&&(re("WebGLRenderer:",d,"not supported, using",g,"instead."),d=g);const v=i.logarithmicDepthBuffer===!0,_=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&_===!1&&re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),x=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),D=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),I=r.getParameter(r.MAX_SAMPLES),U=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:_,maxTextures:y,maxVertexTextures:b,maxTextureSize:C,maxCubemapSize:x,maxAttributes:S,maxVertexUniforms:D,maxVaryings:O,maxFragmentUniforms:w,maxSamples:I,samples:U}}function hR(r){const t=this;let i=null,s=0,l=!1,u=!1;const f=new ds,p=new ce,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,_){const y=v.length!==0||_||s!==0||l;return l=_,s=v.length,y},this.beginShadows=function(){u=!0,g(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(v,_){i=g(v,_,0)},this.setState=function(v,_,y){const b=v.clippingPlanes,C=v.clipIntersection,x=v.clipShadows,S=r.get(v);if(!l||b===null||b.length===0||u&&!x)u?g(null):d();else{const D=u?0:s,O=D*4;let w=S.clippingState||null;m.value=w,w=g(b,_,O,y);for(let I=0;I!==O;++I)w[I]=i[I];S.clippingState=w,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=D}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(v,_,y,b){const C=v!==null?v.length:0;let x=null;if(C!==0){if(x=m.value,b!==!0||x===null){const S=y+C*4,D=_.matrixWorldInverse;p.getNormalMatrix(D),(x===null||x.length<S)&&(x=new Float32Array(S));for(let O=0,w=y;O!==C;++O,w+=4)f.copy(v[O]).applyMatrix4(D,p),f.normal.toArray(x,w),x[w+3]=f.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=C,t.numIntersection=0,x}}const ms=4,Fv=[.125,.215,.35,.446,.526,.582],qs=20,dR=256,ll=new Oc,Bv=new le;let Ed=null,bd=0,Td=0,Ad=!1;const pR=new J;class Mp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,u={}){const{size:f=256,position:p=pR}=u;Ed=this._renderer.getRenderTarget(),bd=this._renderer.getActiveCubeFace(),Td=this._renderer.getActiveMipmapLevel(),Ad=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ed,bd,Td),this._renderer.xr.enabled=Ad,t.scissorTest=!1,Xr(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Qs||t.mapping===$r?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ed=this._renderer.getRenderTarget(),bd=this._renderer.getActiveCubeFace(),Td=this._renderer.getActiveMipmapLevel(),Ad=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:xi,format:Hi,colorSpace:Ec,depthBuffer:!1},l=zv(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zv(t,i,s);const{_lodMax:u}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=mR(u)),this._blurMaterial=_R(u,t,i),this._ggxMaterial=gR(u,t,i)}return l}_compileMaterial(t){const i=new Sn(new Wn,t);this._renderer.compile(i,ll)}_sceneToCubeUV(t,i,s,l,u){const m=new _i(90,1,i,s),d=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],v=this._renderer,_=v.autoClear,y=v.toneMapping;v.getClearColor(Bv),v.toneMapping=ta,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Sn(new js,new Ks({name:"PMREM.Background",side:ei,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,x=C.material;let S=!1;const D=t.background;D?D.isColor&&(x.color.copy(D),t.background=null,S=!0):(x.color.copy(Bv),S=!0);for(let O=0;O<6;O++){const w=O%3;w===0?(m.up.set(0,d[O],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x+g[O],u.y,u.z)):w===1?(m.up.set(0,0,d[O]),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y+g[O],u.z)):(m.up.set(0,d[O],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y,u.z+g[O]));const I=this._cubeSize;Xr(l,w*I,O>2?I:0,I,I),v.setRenderTarget(l),S&&v.render(C,m),v.render(t,m)}v.toneMapping=y,v.autoClear=_,t.background=D}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Qs||t.mapping===$r;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hv());const u=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=u;const p=u.uniforms;p.envMap.value=t;const m=this._cubeSize;Xr(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,ll)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let u=1;u<l;u++)this._applyGGXFilter(t,u-1,u);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,u=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[s];p.material=f;const m=f.uniforms,d=s/(this._lodMeshes.length-1),g=i/(this._lodMeshes.length-1),v=Math.sqrt(d*d-g*g),_=0+d*1.25,y=v*_,{_lodMax:b}=this,C=this._sizeLods[s],x=3*C*(s>b-ms?s-b+ms:0),S=4*(this._cubeSize-C);m.envMap.value=t.texture,m.roughness.value=y,m.mipInt.value=b-i,Xr(u,x,S,3*C,2*C),l.setRenderTarget(u),l.render(p,ll),m.envMap.value=u.texture,m.roughness.value=0,m.mipInt.value=b-s,Xr(t,x,S,3*C,2*C),l.setRenderTarget(t),l.render(p,ll)}_blur(t,i,s,l,u){const f=this._pingPongRenderTarget;this._halfBlur(t,f,i,s,l,"latitudinal",u),this._halfBlur(f,t,s,s,l,"longitudinal",u)}_halfBlur(t,i,s,l,u,f,p){const m=this._renderer,d=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&Ae("blur direction must be either latitudinal or longitudinal!");const g=3,v=this._lodMeshes[l];v.material=d;const _=d.uniforms,y=this._sizeLods[s]-1,b=isFinite(u)?Math.PI/(2*y):2*Math.PI/(2*qs-1),C=u/b,x=isFinite(u)?1+Math.floor(g*C):qs;x>qs&&re(`sigmaRadians, ${u}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${qs}`);const S=[];let D=0;for(let F=0;F<qs;++F){const T=F/C,N=Math.exp(-T*T/2);S.push(N),F===0?D+=N:F<x&&(D+=2*N)}for(let F=0;F<S.length;F++)S[F]=S[F]/D;_.envMap.value=t.texture,_.samples.value=x,_.weights.value=S,_.latitudinal.value=f==="latitudinal",p&&(_.poleAxis.value=p);const{_lodMax:O}=this;_.dTheta.value=b,_.mipInt.value=O-s;const w=this._sizeLods[l],I=3*w*(l>O-ms?l-O+ms:0),U=4*(this._cubeSize-w);Xr(i,I,U,3*w,2*w),m.setRenderTarget(i),m.render(v,ll)}}function mR(r){const t=[],i=[],s=[];let l=r;const u=r-ms+1+Fv.length;for(let f=0;f<u;f++){const p=Math.pow(2,l);t.push(p);let m=1/p;f>r-ms?m=Fv[f-r+ms-1]:f===0&&(m=0),i.push(m);const d=1/(p-2),g=-d,v=1+d,_=[g,g,v,g,v,v,g,g,v,v,g,v],y=6,b=6,C=3,x=2,S=1,D=new Float32Array(C*b*y),O=new Float32Array(x*b*y),w=new Float32Array(S*b*y);for(let U=0;U<y;U++){const F=U%3*2/3-1,T=U>2?0:-1,N=[F,T,0,F+2/3,T,0,F+2/3,T+1,0,F,T,0,F+2/3,T+1,0,F,T+1,0];D.set(N,C*b*U),O.set(_,x*b*U);const k=[U,U,U,U,U,U];w.set(k,S*b*U)}const I=new Wn;I.setAttribute("position",new wi(D,C)),I.setAttribute("uv",new wi(O,x)),I.setAttribute("faceIndex",new wi(w,S)),s.push(new Sn(I,null)),l>ms&&l--}return{lodMeshes:s,sizeLods:t,sigmas:i}}function zv(r,t,i){const s=new ni(r,t,i);return s.texture.mapping=Nc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Xr(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function gR(r,t,i){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dR,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ic(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function _R(r,t,i){const s=new Float32Array(qs),l=new J(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:qs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Ic(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Hv(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ic(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Gv(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Ic(){return`

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
	`}class nS extends ni{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Zx(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new js(5,5,5),u=new Gn({name:"CubemapFromEquirect",uniforms:no(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ei,blending:$i});u.uniforms.tEquirect.value=i;const f=new Sn(l,u),p=i.minFilter;return i.minFilter===Ys&&(i.minFilter=Hn),new xT(1,10,this).update(t,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const u=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,s,l);t.setRenderTarget(u)}}function vR(r){let t=new WeakMap,i=new WeakMap,s=null;function l(_,y=!1){return _==null?null:y?f(_):u(_)}function u(_){if(_&&_.isTexture){const y=_.mapping;if(y===cc||y===Jh)if(t.has(_)){const b=t.get(_).texture;return p(b,_.mapping)}else{const b=_.image;if(b&&b.height>0){const C=new nS(b.height);return C.fromEquirectangularTexture(r,_),t.set(_,C),_.addEventListener("dispose",d),p(C.texture,_.mapping)}else return null}}return _}function f(_){if(_&&_.isTexture){const y=_.mapping,b=y===cc||y===Jh,C=y===Qs||y===$r;if(b||C){let x=i.get(_);const S=x!==void 0?x.texture.pmremVersion:0;if(_.isRenderTargetTexture&&_.pmremVersion!==S)return s===null&&(s=new Mp(r)),x=b?s.fromEquirectangular(_,x):s.fromCubemap(_,x),x.texture.pmremVersion=_.pmremVersion,i.set(_,x),x.texture;if(x!==void 0)return x.texture;{const D=_.image;return b&&D&&D.height>0||C&&D&&m(D)?(s===null&&(s=new Mp(r)),x=b?s.fromEquirectangular(_):s.fromCubemap(_),x.texture.pmremVersion=_.pmremVersion,i.set(_,x),_.addEventListener("dispose",g),x.texture):null}}}return _}function p(_,y){return y===cc?_.mapping=Qs:y===Jh&&(_.mapping=$r),_}function m(_){let y=0;const b=6;for(let C=0;C<b;C++)_[C]!==void 0&&y++;return y===b}function d(_){const y=_.target;y.removeEventListener("dispose",d);const b=t.get(y);b!==void 0&&(t.delete(y),b.dispose())}function g(_){const y=_.target;y.removeEventListener("dispose",g);const b=i.get(y);b!==void 0&&(i.delete(y),b.dispose())}function v(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function xR(r){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Qr("WebGLRenderer: "+s+" extension not supported."),l}}}function SR(r,t,i,s){const l={},u=new WeakMap;function f(v){const _=v.target;_.index!==null&&t.remove(_.index);for(const b in _.attributes)t.remove(_.attributes[b]);_.removeEventListener("dispose",f),delete l[_.id];const y=u.get(_);y&&(t.remove(y),u.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,i.memory.geometries--}function p(v,_){return l[_.id]===!0||(_.addEventListener("dispose",f),l[_.id]=!0,i.memory.geometries++),_}function m(v){const _=v.attributes;for(const y in _)t.update(_[y],r.ARRAY_BUFFER)}function d(v){const _=[],y=v.index,b=v.attributes.position;let C=0;if(b===void 0)return;if(y!==null){const D=y.array;C=y.version;for(let O=0,w=D.length;O<w;O+=3){const I=D[O+0],U=D[O+1],F=D[O+2];_.push(I,U,U,F,F,I)}}else{const D=b.array;C=b.version;for(let O=0,w=D.length/3-1;O<w;O+=3){const I=O+0,U=O+1,F=O+2;_.push(I,U,U,F,F,I)}}const x=new(b.count>=65535?qx:Wx)(_,1);x.version=C;const S=u.get(v);S&&t.remove(S),u.set(v,x)}function g(v){const _=u.get(v);if(_){const y=v.index;y!==null&&_.version<y.version&&d(v)}else d(v);return u.get(v)}return{get:p,update:m,getWireframeAttribute:g}}function MR(r,t,i){let s;function l(v){s=v}let u,f;function p(v){u=v.type,f=v.bytesPerElement}function m(v,_){r.drawElements(s,_,u,v*f),i.update(_,s,1)}function d(v,_,y){y!==0&&(r.drawElementsInstanced(s,_,u,v*f,y),i.update(_,s,y))}function g(v,_,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,_,0,u,v,0,y);let C=0;for(let x=0;x<y;x++)C+=_[x];i.update(C,s,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=g}function yR(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(u,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(u/3);break;case r.LINES:i.lines+=p*(u/2);break;case r.LINE_STRIP:i.lines+=p*(u-1);break;case r.LINE_LOOP:i.lines+=p*u;break;case r.POINTS:i.points+=p*u;break;default:Ae("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function ER(r,t,i){const s=new WeakMap,l=new sn;function u(f,p,m){const d=f.morphTargetInfluences,g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=g!==void 0?g.length:0;let _=s.get(p);if(_===void 0||_.count!==v){let k=function(){T.dispose(),s.delete(p),p.removeEventListener("dispose",k)};var y=k;_!==void 0&&_.texture.dispose();const b=p.morphAttributes.position!==void 0,C=p.morphAttributes.normal!==void 0,x=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],D=p.morphAttributes.normal||[],O=p.morphAttributes.color||[];let w=0;b===!0&&(w=1),C===!0&&(w=2),x===!0&&(w=3);let I=p.attributes.position.count*w,U=1;I>t.maxTextureSize&&(U=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const F=new Float32Array(I*U*4*v),T=new Vx(F,I,U,v);T.type=Ji,T.needsUpdate=!0;const N=w*4;for(let G=0;G<v;G++){const W=S[G],ut=D[G],ct=O[G],Z=I*U*4*G;for(let B=0;B<W.count;B++){const H=B*N;b===!0&&(l.fromBufferAttribute(W,B),F[Z+H+0]=l.x,F[Z+H+1]=l.y,F[Z+H+2]=l.z,F[Z+H+3]=0),C===!0&&(l.fromBufferAttribute(ut,B),F[Z+H+4]=l.x,F[Z+H+5]=l.y,F[Z+H+6]=l.z,F[Z+H+7]=0),x===!0&&(l.fromBufferAttribute(ct,B),F[Z+H+8]=l.x,F[Z+H+9]=l.y,F[Z+H+10]=l.z,F[Z+H+11]=ct.itemSize===4?l.w:1)}}_={count:v,texture:T,size:new jt(I,U)},s.set(p,_),p.addEventListener("dispose",k)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let b=0;for(let x=0;x<d.length;x++)b+=d[x];const C=p.morphTargetsRelative?1:1-b;m.getUniforms().setValue(r,"morphTargetBaseInfluence",C),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",_.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:u}}function bR(r,t,i,s,l){let u=new WeakMap;function f(d){const g=l.render.frame,v=d.geometry,_=t.get(d,v);if(u.get(_)!==g&&(t.update(_),u.set(_,g)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),u.get(d)!==g&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),u.set(d,g))),d.isSkinnedMesh){const y=d.skeleton;u.get(y)!==g&&(y.update(),u.set(y,g))}return _}function p(){u=new WeakMap}function m(d){const g=d.target;g.removeEventListener("dispose",m),s.releaseStatesOfObject(g),i.remove(g.instanceMatrix),g.instanceColor!==null&&i.remove(g.instanceColor)}return{update:f,dispose:p}}const TR={[Op]:"LINEAR_TONE_MAPPING",[Ip]:"REINHARD_TONE_MAPPING",[Fp]:"CINEON_TONE_MAPPING",[Lc]:"ACES_FILMIC_TONE_MAPPING",[zp]:"AGX_TONE_MAPPING",[Hp]:"NEUTRAL_TONE_MAPPING",[Bp]:"CUSTOM_TONE_MAPPING"};function AR(r,t,i,s,l,u){const f=new ni(t,i,{type:r,depthBuffer:l,stencilBuffer:u,samples:s?4:0,depthTexture:l?new to(t,i):void 0}),p=new ni(t,i,{type:xi,depthBuffer:!1,stencilBuffer:!1}),m=new Wn;m.setAttribute("position",new Mn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Mn([0,2,0,0,2,0],2));const d=new Jx({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),g=new Sn(m,d),v=new Oc(-1,1,1,-1,0,1);let _=null,y=null,b=!1,C,x=null,S=[],D=!1;this.setSize=function(O,w){f.setSize(O,w),p.setSize(O,w);for(let I=0;I<S.length;I++){const U=S[I];U.setSize&&U.setSize(O,w)}},this.setEffects=function(O){S=O,D=S.length>0&&S[0].isRenderPass===!0;const w=f.width,I=f.height;for(let U=0;U<S.length;U++){const F=S[U];F.setSize&&F.setSize(w,I)}},this.begin=function(O,w){if(b||O.toneMapping===ta&&S.length===0)return!1;if(x=w,w!==null){const I=w.width,U=w.height;(f.width!==I||f.height!==U)&&this.setSize(I,U)}return D===!1&&O.setRenderTarget(f),C=O.toneMapping,O.toneMapping=ta,!0},this.hasRenderPass=function(){return D},this.end=function(O,w){O.toneMapping=C,b=!0;let I=f,U=p;for(let F=0;F<S.length;F++){const T=S[F];if(T.enabled!==!1&&(T.render(O,U,I,w),T.needsSwap!==!1)){const N=I;I=U,U=N}}if(_!==O.outputColorSpace||y!==O.toneMapping){_=O.outputColorSpace,y=O.toneMapping,d.defines={},ye.getTransfer(_)===Pe&&(d.defines.SRGB_TRANSFER="");const F=TR[y];F&&(d.defines[F]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=I.texture,O.setRenderTarget(x),O.render(g,v),x=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){f.depthTexture&&f.depthTexture.dispose(),f.dispose(),p.dispose(),m.dispose(),d.dispose()}}const iS=new Vn,yp=new to(1,1),aS=new Vx,sS=new Xb,rS=new Zx,Vv=[],kv=[],Xv=new Float32Array(16),Wv=new Float32Array(9),qv=new Float32Array(4);function oo(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let u=Vv[l];if(u===void 0&&(u=new Float32Array(l),Vv[l]=u),t!==0){s.toArray(u,0);for(let f=1,p=0;f!==t;++f)p+=i,r[f].toArray(u,p)}return u}function Tn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function An(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function Fc(r,t){let i=kv[t];i===void 0&&(i=new Int32Array(t),kv[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function RR(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function CR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Tn(i,t))return;r.uniform2fv(this.addr,t),An(i,t)}}function wR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Tn(i,t))return;r.uniform3fv(this.addr,t),An(i,t)}}function DR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Tn(i,t))return;r.uniform4fv(this.addr,t),An(i,t)}}function UR(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Tn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),An(i,t)}else{if(Tn(i,s))return;qv.set(s),r.uniformMatrix2fv(this.addr,!1,qv),An(i,s)}}function LR(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Tn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),An(i,t)}else{if(Tn(i,s))return;Wv.set(s),r.uniformMatrix3fv(this.addr,!1,Wv),An(i,s)}}function NR(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Tn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),An(i,t)}else{if(Tn(i,s))return;Xv.set(s),r.uniformMatrix4fv(this.addr,!1,Xv),An(i,s)}}function PR(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function OR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Tn(i,t))return;r.uniform2iv(this.addr,t),An(i,t)}}function IR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Tn(i,t))return;r.uniform3iv(this.addr,t),An(i,t)}}function FR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Tn(i,t))return;r.uniform4iv(this.addr,t),An(i,t)}}function BR(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function zR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Tn(i,t))return;r.uniform2uiv(this.addr,t),An(i,t)}}function HR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Tn(i,t))return;r.uniform3uiv(this.addr,t),An(i,t)}}function GR(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Tn(i,t))return;r.uniform4uiv(this.addr,t),An(i,t)}}function VR(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let u;this.type===r.SAMPLER_2D_SHADOW?(yp.compareFunction=i.isReversedDepthBuffer()?Zp:Yp,u=yp):u=iS,i.setTexture2D(t||u,l)}function kR(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||sS,l)}function XR(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||rS,l)}function WR(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||aS,l)}function qR(r){switch(r){case 5126:return RR;case 35664:return CR;case 35665:return wR;case 35666:return DR;case 35674:return UR;case 35675:return LR;case 35676:return NR;case 5124:case 35670:return PR;case 35667:case 35671:return OR;case 35668:case 35672:return IR;case 35669:case 35673:return FR;case 5125:return BR;case 36294:return zR;case 36295:return HR;case 36296:return GR;case 35678:case 36198:case 36298:case 36306:case 35682:return VR;case 35679:case 36299:case 36307:return kR;case 35680:case 36300:case 36308:case 36293:return XR;case 36289:case 36303:case 36311:case 36292:return WR}}function YR(r,t){r.uniform1fv(this.addr,t)}function ZR(r,t){const i=oo(t,this.size,2);r.uniform2fv(this.addr,i)}function KR(r,t){const i=oo(t,this.size,3);r.uniform3fv(this.addr,i)}function QR(r,t){const i=oo(t,this.size,4);r.uniform4fv(this.addr,i)}function JR(r,t){const i=oo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function jR(r,t){const i=oo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function $R(r,t){const i=oo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function tC(r,t){r.uniform1iv(this.addr,t)}function eC(r,t){r.uniform2iv(this.addr,t)}function nC(r,t){r.uniform3iv(this.addr,t)}function iC(r,t){r.uniform4iv(this.addr,t)}function aC(r,t){r.uniform1uiv(this.addr,t)}function sC(r,t){r.uniform2uiv(this.addr,t)}function rC(r,t){r.uniform3uiv(this.addr,t)}function oC(r,t){r.uniform4uiv(this.addr,t)}function lC(r,t,i){const s=this.cache,l=t.length,u=Fc(i,l);Tn(s,u)||(r.uniform1iv(this.addr,u),An(s,u));let f;this.type===r.SAMPLER_2D_SHADOW?f=yp:f=iS;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||f,u[p])}function uC(r,t,i){const s=this.cache,l=t.length,u=Fc(i,l);Tn(s,u)||(r.uniform1iv(this.addr,u),An(s,u));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||sS,u[f])}function cC(r,t,i){const s=this.cache,l=t.length,u=Fc(i,l);Tn(s,u)||(r.uniform1iv(this.addr,u),An(s,u));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||rS,u[f])}function fC(r,t,i){const s=this.cache,l=t.length,u=Fc(i,l);Tn(s,u)||(r.uniform1iv(this.addr,u),An(s,u));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||aS,u[f])}function hC(r){switch(r){case 5126:return YR;case 35664:return ZR;case 35665:return KR;case 35666:return QR;case 35674:return JR;case 35675:return jR;case 35676:return $R;case 5124:case 35670:return tC;case 35667:case 35671:return eC;case 35668:case 35672:return nC;case 35669:case 35673:return iC;case 5125:return aC;case 36294:return sC;case 36295:return rC;case 36296:return oC;case 35678:case 36198:case 36298:case 36306:case 35682:return lC;case 35679:case 36299:case 36307:return uC;case 35680:case 36300:case 36308:case 36293:return cC;case 36289:case 36303:case 36311:case 36292:return fC}}class dC{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=qR(i.type)}}class pC{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=hC(i.type)}}class mC{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let u=0,f=l.length;u!==f;++u){const p=l[u];p.setValue(t,i[p.id],s)}}}const Rd=/(\w+)(\])?(\[|\.)?/g;function Yv(r,t){r.seq.push(t),r.map[t.id]=t}function gC(r,t,i){const s=r.name,l=s.length;for(Rd.lastIndex=0;;){const u=Rd.exec(s),f=Rd.lastIndex;let p=u[1];const m=u[2]==="]",d=u[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){Yv(i,d===void 0?new dC(p,r,t):new pC(p,r,t));break}else{let v=i.map[p];v===void 0&&(v=new mC(p),Yv(i,v)),i=v}}}class gc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const p=t.getActiveUniform(i,f),m=t.getUniformLocation(i,p.name);gC(p,m,this)}const l=[],u=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):u.push(f);l.length>0&&(this.seq=l.concat(u))}setValue(t,i,s,l){const u=this.map[i];u!==void 0&&u.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let u=0,f=i.length;u!==f;++u){const p=i[u],m=s[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,u=t.length;l!==u;++l){const f=t[l];f.id in i&&s.push(f)}return s}}function Zv(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const _C=37297;let vC=0;function xC(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let f=l;f<u;f++){const p=f+1;s.push(`${p===t?">":" "} ${p}: ${i[f]}`)}return s.join(`
`)}const Kv=new ce;function SC(r){ye._getMatrix(Kv,ye.workingColorSpace,r);const t=`mat3( ${Kv.elements.map(i=>i.toFixed(4))} )`;switch(ye.getTransfer(r)){case bc:return[t,"LinearTransferOETF"];case Pe:return[t,"sRGBTransferOETF"];default:return re("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Qv(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),u=(r.getShaderInfoLog(t)||"").trim();if(s&&u==="")return"";const f=/ERROR: 0:(\d+)/.exec(u);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+u+`

`+xC(r.getShaderSource(t),p)}else return u}function MC(r,t){const i=SC(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const yC={[Op]:"Linear",[Ip]:"Reinhard",[Fp]:"Cineon",[Lc]:"ACESFilmic",[zp]:"AgX",[Hp]:"Neutral",[Bp]:"Custom"};function EC(r,t){const i=yC[t];return i===void 0?(re("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const ac=new J;function bC(){ye.getLuminanceCoefficients(ac);const r=ac.x.toFixed(4),t=ac.y.toFixed(4),i=ac.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TC(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fl).join(`
`)}function AC(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function RC(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const u=r.getActiveAttrib(t,l),f=u.name;let p=1;u.type===r.FLOAT_MAT2&&(p=2),u.type===r.FLOAT_MAT3&&(p=3),u.type===r.FLOAT_MAT4&&(p=4),i[f]={type:u.type,location:r.getAttribLocation(t,f),locationSize:p}}return i}function fl(r){return r!==""}function Jv(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const CC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ep(r){return r.replace(CC,DC)}const wC=new Map;function DC(r,t){let i=me[t];if(i===void 0){const s=wC.get(t);if(s!==void 0)i=me[s],re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ep(i)}const UC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $v(r){return r.replace(UC,LC)}function LC(r,t,i,s){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function tx(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const NC={[uc]:"SHADOWMAP_TYPE_PCF",[cl]:"SHADOWMAP_TYPE_VSM"};function PC(r){return NC[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const OC={[Qs]:"ENVMAP_TYPE_CUBE",[$r]:"ENVMAP_TYPE_CUBE",[Nc]:"ENVMAP_TYPE_CUBE_UV"};function IC(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":OC[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const FC={[$r]:"ENVMAP_MODE_REFRACTION"};function BC(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":FC[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const zC={[Lx]:"ENVMAP_BLENDING_MULTIPLY",[yb]:"ENVMAP_BLENDING_MIX",[Eb]:"ENVMAP_BLENDING_ADD"};function HC(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":zC[r.combine]||"ENVMAP_BLENDING_NONE"}function GC(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function VC(r,t,i,s){const l=r.getContext(),u=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=PC(i),d=IC(i),g=BC(i),v=HC(i),_=GC(i),y=TC(i),b=AC(u),C=l.createProgram();let x,S,D=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(fl).join(`
`),x.length>0&&(x+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(fl).join(`
`),S.length>0&&(S+=`
`)):(x=[tx(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fl).join(`
`),S=[tx(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ta?"#define TONE_MAPPING":"",i.toneMapping!==ta?me.tonemapping_pars_fragment:"",i.toneMapping!==ta?EC("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",me.colorspace_pars_fragment,MC("linearToOutputTexel",i.outputColorSpace),bC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(fl).join(`
`)),f=Ep(f),f=Jv(f,i),f=jv(f,i),p=Ep(p),p=Jv(p,i),p=jv(p,i),f=$v(f),p=$v(p),i.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,x=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,S=["#define varying in",i.glslVersion===lv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===lv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const O=D+x+f,w=D+S+p,I=Zv(l,l.VERTEX_SHADER,O),U=Zv(l,l.FRAGMENT_SHADER,w);l.attachShader(C,I),l.attachShader(C,U),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function F(G){if(r.debug.checkShaderErrors){const W=l.getProgramInfoLog(C)||"",ut=l.getShaderInfoLog(I)||"",ct=l.getShaderInfoLog(U)||"",Z=W.trim(),B=ut.trim(),H=ct.trim();let $=!0,_t=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,C,I,U);else{const Et=Qv(l,I,"vertex"),P=Qv(l,U,"fragment");Ae("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+Z+`
`+Et+`
`+P)}else Z!==""?re("WebGLProgram: Program Info Log:",Z):(B===""||H==="")&&(_t=!1);_t&&(G.diagnostics={runnable:$,programLog:Z,vertexShader:{log:B,prefix:x},fragmentShader:{log:H,prefix:S}})}l.deleteShader(I),l.deleteShader(U),T=new gc(l,C),N=RC(l,C)}let T;this.getUniforms=function(){return T===void 0&&F(this),T};let N;this.getAttributes=function(){return N===void 0&&F(this),N};let k=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=l.getProgramParameter(C,_C)),k},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=vC++,this.cacheKey=t,this.usedTimes=1,this.program=C,this.vertexShader=I,this.fragmentShader=U,this}let kC=0;class XC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new WC(t),i.set(t,s)),s}}class WC{constructor(t){this.id=kC++,this.code=t,this.usedTimes=0}}function qC(r){return r===Js||r===Mc||r===yc}function YC(r,t,i,s,l,u){const f=new kx,p=new XC,m=new Set,d=[],g=new Map,v=s.logarithmicDepthBuffer;let _=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(T){return m.add(T),T===0?"uv":`uv${T}`}function C(T,N,k,G,W,ut){const ct=G.fog,Z=W.geometry,B=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,H=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,$=t.get(T.envMap||B,H),_t=$&&$.mapping===Nc?$.image.height:null,Et=y[T.type];T.precision!==null&&(_=s.getMaxPrecision(T.precision),_!==T.precision&&re("WebGLProgram.getParameters:",T.precision,"not supported, using",_,"instead."));const P=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,K=P!==void 0?P.length:0;let Mt=0;Z.morphAttributes.position!==void 0&&(Mt=1),Z.morphAttributes.normal!==void 0&&(Mt=2),Z.morphAttributes.color!==void 0&&(Mt=3);let Tt,Ut,at,yt;if(Et){const kt=Qi[Et];Tt=kt.vertexShader,Ut=kt.fragmentShader}else{Tt=T.vertexShader,Ut=T.fragmentShader;const kt=p.getVertexShaderStage(T),tn=p.getFragmentShaderStage(T);p.update(T,kt,tn),at=kt.id,yt=tn.id}const St=r.getRenderTarget(),Gt=r.state.buffers.depth.getReversed(),se=W.isInstancedMesh===!0,$t=W.isBatchedMesh===!0,Ge=!!T.map,fe=!!T.matcap,Pt=!!$,Yt=!!T.aoMap,Kt=!!T.lightMap,Te=!!T.bumpMap&&T.wireframe===!1,Ve=!!T.normalMap,Qe=!!T.displacementMap,ke=!!T.emissiveMap,Ue=!!T.metalnessMap,$e=!!T.roughnessMap,q=T.anisotropy>0,Le=T.clearcoat>0,be=T.dispersion>0,L=T.iridescence>0,E=T.sheen>0,j=T.transmission>0,st=q&&!!T.anisotropyMap,ht=Le&&!!T.clearcoatMap,At=Le&&!!T.clearcoatNormalMap,Dt=Le&&!!T.clearcoatRoughnessMap,ft=L&&!!T.iridescenceMap,dt=L&&!!T.iridescenceThicknessMap,Ct=E&&!!T.sheenColorMap,zt=E&&!!T.sheenRoughnessMap,Ot=!!T.specularMap,Lt=!!T.specularColorMap,te=!!T.specularIntensityMap,ee=j&&!!T.transmissionMap,oe=j&&!!T.thicknessMap,X=!!T.gradientMap,Rt=!!T.alphaMap,gt=T.alphaTest>0,wt=!!T.alphaHash,Bt=!!T.extensions;let bt=ta;T.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(bt=r.toneMapping);const Zt={shaderID:Et,shaderType:T.type,shaderName:T.name,vertexShader:Tt,fragmentShader:Ut,defines:T.defines,customVertexShaderID:at,customFragmentShaderID:yt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:_,batching:$t,batchingColor:$t&&W._colorsTexture!==null,instancing:se,instancingColor:se&&W.instanceColor!==null,instancingMorph:se&&W.morphTexture!==null,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:ye.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Ge,matcap:fe,envMap:Pt,envMapMode:Pt&&$.mapping,envMapCubeUVHeight:_t,aoMap:Yt,lightMap:Kt,bumpMap:Te,normalMap:Ve,displacementMap:Qe,emissiveMap:ke,normalMapObjectSpace:Ve&&T.normalMapType===Ab,normalMapTangentSpace:Ve&&T.normalMapType===vp,packedNormalMap:Ve&&T.normalMapType===vp&&qC(T.normalMap.format),metalnessMap:Ue,roughnessMap:$e,anisotropy:q,anisotropyMap:st,clearcoat:Le,clearcoatMap:ht,clearcoatNormalMap:At,clearcoatRoughnessMap:Dt,dispersion:be,iridescence:L,iridescenceMap:ft,iridescenceThicknessMap:dt,sheen:E,sheenColorMap:Ct,sheenRoughnessMap:zt,specularMap:Ot,specularColorMap:Lt,specularIntensityMap:te,transmission:j,transmissionMap:ee,thicknessMap:oe,gradientMap:X,opaque:T.transparent===!1&&T.blending===Zr&&T.alphaToCoverage===!1,alphaMap:Rt,alphaTest:gt,alphaHash:wt,combine:T.combine,mapUv:Ge&&b(T.map.channel),aoMapUv:Yt&&b(T.aoMap.channel),lightMapUv:Kt&&b(T.lightMap.channel),bumpMapUv:Te&&b(T.bumpMap.channel),normalMapUv:Ve&&b(T.normalMap.channel),displacementMapUv:Qe&&b(T.displacementMap.channel),emissiveMapUv:ke&&b(T.emissiveMap.channel),metalnessMapUv:Ue&&b(T.metalnessMap.channel),roughnessMapUv:$e&&b(T.roughnessMap.channel),anisotropyMapUv:st&&b(T.anisotropyMap.channel),clearcoatMapUv:ht&&b(T.clearcoatMap.channel),clearcoatNormalMapUv:At&&b(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Dt&&b(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&b(T.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&b(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&b(T.sheenColorMap.channel),sheenRoughnessMapUv:zt&&b(T.sheenRoughnessMap.channel),specularMapUv:Ot&&b(T.specularMap.channel),specularColorMapUv:Lt&&b(T.specularColorMap.channel),specularIntensityMapUv:te&&b(T.specularIntensityMap.channel),transmissionMapUv:ee&&b(T.transmissionMap.channel),thicknessMapUv:oe&&b(T.thicknessMap.channel),alphaMapUv:Rt&&b(T.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Ve||q),vertexNormals:!!Z.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!Z.attributes.uv&&(Ge||Rt),fog:!!ct,useFog:T.fog===!0,fogExp2:!!ct&&ct.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||Z.attributes.normal===void 0&&Ve===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Gt,skinning:W.isSkinnedMesh===!0,hasPositionAttribute:Z.attributes.position!==void 0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Mt,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:ut.length,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:bt,decodeVideoTexture:Ge&&T.map.isVideoTexture===!0&&ye.getTransfer(T.map.colorSpace)===Pe,decodeVideoTextureEmissive:ke&&T.emissiveMap.isVideoTexture===!0&&ye.getTransfer(T.emissiveMap.colorSpace)===Pe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ra,flipSided:T.side===ei,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Bt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&T.extensions.multiDraw===!0||$t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Zt.vertexUv1s=m.has(1),Zt.vertexUv2s=m.has(2),Zt.vertexUv3s=m.has(3),m.clear(),Zt}function x(T){const N=[];if(T.shaderID?N.push(T.shaderID):(N.push(T.customVertexShaderID),N.push(T.customFragmentShaderID)),T.defines!==void 0)for(const k in T.defines)N.push(k),N.push(T.defines[k]);return T.isRawShaderMaterial===!1&&(S(N,T),D(N,T),N.push(r.outputColorSpace)),N.push(T.customProgramCacheKey),N.join()}function S(T,N){T.push(N.precision),T.push(N.outputColorSpace),T.push(N.envMapMode),T.push(N.envMapCubeUVHeight),T.push(N.mapUv),T.push(N.alphaMapUv),T.push(N.lightMapUv),T.push(N.aoMapUv),T.push(N.bumpMapUv),T.push(N.normalMapUv),T.push(N.displacementMapUv),T.push(N.emissiveMapUv),T.push(N.metalnessMapUv),T.push(N.roughnessMapUv),T.push(N.anisotropyMapUv),T.push(N.clearcoatMapUv),T.push(N.clearcoatNormalMapUv),T.push(N.clearcoatRoughnessMapUv),T.push(N.iridescenceMapUv),T.push(N.iridescenceThicknessMapUv),T.push(N.sheenColorMapUv),T.push(N.sheenRoughnessMapUv),T.push(N.specularMapUv),T.push(N.specularColorMapUv),T.push(N.specularIntensityMapUv),T.push(N.transmissionMapUv),T.push(N.thicknessMapUv),T.push(N.combine),T.push(N.fogExp2),T.push(N.sizeAttenuation),T.push(N.morphTargetsCount),T.push(N.morphAttributeCount),T.push(N.numDirLights),T.push(N.numPointLights),T.push(N.numSpotLights),T.push(N.numSpotLightMaps),T.push(N.numHemiLights),T.push(N.numRectAreaLights),T.push(N.numDirLightShadows),T.push(N.numPointLightShadows),T.push(N.numSpotLightShadows),T.push(N.numSpotLightShadowsWithMaps),T.push(N.numLightProbes),T.push(N.shadowMapType),T.push(N.toneMapping),T.push(N.numClippingPlanes),T.push(N.numClipIntersection),T.push(N.depthPacking)}function D(T,N){f.disableAll(),N.instancing&&f.enable(0),N.instancingColor&&f.enable(1),N.instancingMorph&&f.enable(2),N.matcap&&f.enable(3),N.envMap&&f.enable(4),N.normalMapObjectSpace&&f.enable(5),N.normalMapTangentSpace&&f.enable(6),N.clearcoat&&f.enable(7),N.iridescence&&f.enable(8),N.alphaTest&&f.enable(9),N.vertexColors&&f.enable(10),N.vertexAlphas&&f.enable(11),N.vertexUv1s&&f.enable(12),N.vertexUv2s&&f.enable(13),N.vertexUv3s&&f.enable(14),N.vertexTangents&&f.enable(15),N.anisotropy&&f.enable(16),N.alphaHash&&f.enable(17),N.batching&&f.enable(18),N.dispersion&&f.enable(19),N.batchingColor&&f.enable(20),N.gradientMap&&f.enable(21),N.packedNormalMap&&f.enable(22),N.vertexNormals&&f.enable(23),T.push(f.mask),f.disableAll(),N.fog&&f.enable(0),N.useFog&&f.enable(1),N.flatShading&&f.enable(2),N.logarithmicDepthBuffer&&f.enable(3),N.reversedDepthBuffer&&f.enable(4),N.skinning&&f.enable(5),N.morphTargets&&f.enable(6),N.morphNormals&&f.enable(7),N.morphColors&&f.enable(8),N.premultipliedAlpha&&f.enable(9),N.shadowMapEnabled&&f.enable(10),N.doubleSided&&f.enable(11),N.flipSided&&f.enable(12),N.useDepthPacking&&f.enable(13),N.dithering&&f.enable(14),N.transmission&&f.enable(15),N.sheen&&f.enable(16),N.opaque&&f.enable(17),N.pointsUvs&&f.enable(18),N.decodeVideoTexture&&f.enable(19),N.decodeVideoTextureEmissive&&f.enable(20),N.alphaToCoverage&&f.enable(21),N.numLightProbeGrids>0&&f.enable(22),N.hasPositionAttribute&&f.enable(23),T.push(f.mask)}function O(T){const N=y[T.type];let k;if(N){const G=Qi[N];k=gl.clone(G.uniforms)}else k=T.uniforms;return k}function w(T,N){let k=g.get(N);return k!==void 0?++k.usedTimes:(k=new VC(r,N,T,l),d.push(k),g.set(N,k)),k}function I(T){if(--T.usedTimes===0){const N=d.indexOf(T);d[N]=d[d.length-1],d.pop(),g.delete(T.cacheKey),T.destroy()}}function U(T){p.remove(T)}function F(){p.dispose()}return{getParameters:C,getProgramCacheKey:x,getUniforms:O,acquireProgram:w,releaseProgram:I,releaseShaderCache:U,programs:d,dispose:F}}function ZC(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function s(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function u(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:u}}function KC(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function ex(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function nx(){const r=[];let t=0;const i=[],s=[],l=[];function u(){t=0,i.length=0,s.length=0,l.length=0}function f(_){let y=0;return _.isInstancedMesh&&(y+=2),_.isSkinnedMesh&&(y+=1),y}function p(_,y,b,C,x,S){let D=r[t];return D===void 0?(D={id:_.id,object:_,geometry:y,material:b,materialVariant:f(_),groupOrder:C,renderOrder:_.renderOrder,z:x,group:S},r[t]=D):(D.id=_.id,D.object=_,D.geometry=y,D.material=b,D.materialVariant=f(_),D.groupOrder=C,D.renderOrder=_.renderOrder,D.z=x,D.group=S),t++,D}function m(_,y,b,C,x,S){const D=p(_,y,b,C,x,S);b.transmission>0?s.push(D):b.transparent===!0?l.push(D):i.push(D)}function d(_,y,b,C,x,S){const D=p(_,y,b,C,x,S);b.transmission>0?s.unshift(D):b.transparent===!0?l.unshift(D):i.unshift(D)}function g(_,y,b){i.length>1&&i.sort(_||KC),s.length>1&&s.sort(y||ex),l.length>1&&l.sort(y||ex),b&&(i.reverse(),s.reverse(),l.reverse())}function v(){for(let _=t,y=r.length;_<y;_++){const b=r[_];if(b.id===null)break;b.id=null,b.object=null,b.geometry=null,b.material=null,b.group=null}}return{opaque:i,transmissive:s,transparent:l,init:u,push:m,unshift:d,finish:v,sort:g}}function QC(){let r=new WeakMap;function t(s,l){const u=r.get(s);let f;return u===void 0?(f=new nx,r.set(s,[f])):l>=u.length?(f=new nx,u.push(f)):f=u[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function JC(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new J,color:new le};break;case"SpotLight":i={position:new J,direction:new J,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new J,color:new le,distance:0,decay:0};break;case"HemisphereLight":i={direction:new J,skyColor:new le,groundColor:new le};break;case"RectAreaLight":i={color:new le,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=i,i}}}function jC(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let $C=0;function tw(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ew(r){const t=new JC,i=jC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new J);const l=new J,u=new on,f=new on;function p(d){let g=0,v=0,_=0;for(let N=0;N<9;N++)s.probe[N].set(0,0,0);let y=0,b=0,C=0,x=0,S=0,D=0,O=0,w=0,I=0,U=0,F=0;d.sort(tw);for(let N=0,k=d.length;N<k;N++){const G=d[N],W=G.color,ut=G.intensity,ct=G.distance;let Z=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===Js?Z=G.shadow.map.texture:Z=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)g+=W.r*ut,v+=W.g*ut,_+=W.b*ut;else if(G.isLightProbe){for(let B=0;B<9;B++)s.probe[B].addScaledVector(G.sh.coefficients[B],ut);F++}else if(G.isDirectionalLight){const B=t.get(G);if(B.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const H=G.shadow,$=i.get(G);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,s.directionalShadow[y]=$,s.directionalShadowMap[y]=Z,s.directionalShadowMatrix[y]=G.shadow.matrix,D++}s.directional[y]=B,y++}else if(G.isSpotLight){const B=t.get(G);B.position.setFromMatrixPosition(G.matrixWorld),B.color.copy(W).multiplyScalar(ut),B.distance=ct,B.coneCos=Math.cos(G.angle),B.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),B.decay=G.decay,s.spot[C]=B;const H=G.shadow;if(G.map&&(s.spotLightMap[I]=G.map,I++,H.updateMatrices(G),G.castShadow&&U++),s.spotLightMatrix[C]=H.matrix,G.castShadow){const $=i.get(G);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,s.spotShadow[C]=$,s.spotShadowMap[C]=Z,w++}C++}else if(G.isRectAreaLight){const B=t.get(G);B.color.copy(W).multiplyScalar(ut),B.halfWidth.set(G.width*.5,0,0),B.halfHeight.set(0,G.height*.5,0),s.rectArea[x]=B,x++}else if(G.isPointLight){const B=t.get(G);if(B.color.copy(G.color).multiplyScalar(G.intensity),B.distance=G.distance,B.decay=G.decay,G.castShadow){const H=G.shadow,$=i.get(G);$.shadowIntensity=H.intensity,$.shadowBias=H.bias,$.shadowNormalBias=H.normalBias,$.shadowRadius=H.radius,$.shadowMapSize=H.mapSize,$.shadowCameraNear=H.camera.near,$.shadowCameraFar=H.camera.far,s.pointShadow[b]=$,s.pointShadowMap[b]=Z,s.pointShadowMatrix[b]=G.shadow.matrix,O++}s.point[b]=B,b++}else if(G.isHemisphereLight){const B=t.get(G);B.skyColor.copy(G.color).multiplyScalar(ut),B.groundColor.copy(G.groundColor).multiplyScalar(ut),s.hemi[S]=B,S++}}x>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ft.LTC_FLOAT_1,s.rectAreaLTC2=Ft.LTC_FLOAT_2):(s.rectAreaLTC1=Ft.LTC_HALF_1,s.rectAreaLTC2=Ft.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=v,s.ambient[2]=_;const T=s.hash;(T.directionalLength!==y||T.pointLength!==b||T.spotLength!==C||T.rectAreaLength!==x||T.hemiLength!==S||T.numDirectionalShadows!==D||T.numPointShadows!==O||T.numSpotShadows!==w||T.numSpotMaps!==I||T.numLightProbes!==F)&&(s.directional.length=y,s.spot.length=C,s.rectArea.length=x,s.point.length=b,s.hemi.length=S,s.directionalShadow.length=D,s.directionalShadowMap.length=D,s.pointShadow.length=O,s.pointShadowMap.length=O,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=D,s.pointShadowMatrix.length=O,s.spotLightMatrix.length=w+I-U,s.spotLightMap.length=I,s.numSpotLightShadowsWithMaps=U,s.numLightProbes=F,T.directionalLength=y,T.pointLength=b,T.spotLength=C,T.rectAreaLength=x,T.hemiLength=S,T.numDirectionalShadows=D,T.numPointShadows=O,T.numSpotShadows=w,T.numSpotMaps=I,T.numLightProbes=F,s.version=$C++)}function m(d,g){let v=0,_=0,y=0,b=0,C=0;const x=g.matrixWorldInverse;for(let S=0,D=d.length;S<D;S++){const O=d[S];if(O.isDirectionalLight){const w=s.directional[v];w.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(x),v++}else if(O.isSpotLight){const w=s.spot[y];w.position.setFromMatrixPosition(O.matrixWorld),w.position.applyMatrix4(x),w.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(x),y++}else if(O.isRectAreaLight){const w=s.rectArea[b];w.position.setFromMatrixPosition(O.matrixWorld),w.position.applyMatrix4(x),f.identity(),u.copy(O.matrixWorld),u.premultiply(x),f.extractRotation(u),w.halfWidth.set(O.width*.5,0,0),w.halfHeight.set(0,O.height*.5,0),w.halfWidth.applyMatrix4(f),w.halfHeight.applyMatrix4(f),b++}else if(O.isPointLight){const w=s.point[_];w.position.setFromMatrixPosition(O.matrixWorld),w.position.applyMatrix4(x),_++}else if(O.isHemisphereLight){const w=s.hemi[C];w.direction.setFromMatrixPosition(O.matrixWorld),w.direction.transformDirection(x),C++}}}return{setup:p,setupView:m,state:s}}function ix(r){const t=new ew(r),i=[],s=[],l=[];function u(_){v.camera=_,i.length=0,s.length=0,l.length=0}function f(_){i.push(_)}function p(_){s.push(_)}function m(_){l.push(_)}function d(){t.setup(i)}function g(_){t.setupView(i,_)}const v={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:u,state:v,setupLights:d,setupLightsView:g,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function nw(r){let t=new WeakMap;function i(l,u=0){const f=t.get(l);let p;return f===void 0?(p=new ix(r),t.set(l,[p])):u>=f.length?(p=new ix(r),f.push(p)):p=f[u],p}function s(){t=new WeakMap}return{get:i,dispose:s}}const iw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aw=`uniform sampler2D shadow_pass;
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
}`,sw=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],rw=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],ax=new on,ul=new J,Cd=new J;function ow(r,t,i){let s=new jp;const l=new jt,u=new jt,f=new sn,p=new dT,m=new pT,d={},g=i.maxTextureSize,v={[gs]:ei,[ei]:gs,[Ra]:Ra},_=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:iw,fragmentShader:aw}),y=_.clone();y.defines.HORIZONTAL_PASS=1;const b=new Wn;b.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new Sn(b,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uc;let S=this.type;this.render=function(U,F,T){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||U.length===0)return;this.type===Ux&&(re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=uc);const N=r.getRenderTarget(),k=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),W=r.state;W.setBlending($i),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ut=S!==this.type;ut&&F.traverse(function(ct){ct.material&&(Array.isArray(ct.material)?ct.material.forEach(Z=>Z.needsUpdate=!0):ct.material.needsUpdate=!0)});for(let ct=0,Z=U.length;ct<Z;ct++){const B=U[ct],H=B.shadow;if(H===void 0){re("WebGLShadowMap:",B,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;l.copy(H.mapSize);const $=H.getFrameExtents();l.multiply($),u.copy(H.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(u.x=Math.floor(g/$.x),l.x=u.x*$.x,H.mapSize.x=u.x),l.y>g&&(u.y=Math.floor(g/$.y),l.y=u.y*$.y,H.mapSize.y=u.y));const _t=r.state.buffers.depth.getReversed();if(H.camera._reversedDepth=_t,H.map===null||ut===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===cl){if(B.isPointLight){re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new ni(l.x,l.y,{format:Js,type:xi,minFilter:Hn,magFilter:Hn,generateMipmaps:!1}),H.map.texture.name=B.name+".shadowMap",H.map.depthTexture=new to(l.x,l.y,Ji),H.map.depthTexture.name=B.name+".shadowMapDepth",H.map.depthTexture.format=Ua,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Pn,H.map.depthTexture.magFilter=Pn}else B.isPointLight?(H.map=new nS(l.x),H.map.depthTexture=new lT(l.x,na)):(H.map=new ni(l.x,l.y),H.map.depthTexture=new to(l.x,l.y,na)),H.map.depthTexture.name=B.name+".shadowMap",H.map.depthTexture.format=Ua,this.type===uc?(H.map.depthTexture.compareFunction=_t?Zp:Yp,H.map.depthTexture.minFilter=Hn,H.map.depthTexture.magFilter=Hn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Pn,H.map.depthTexture.magFilter=Pn);H.camera.updateProjectionMatrix()}const Et=H.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<Et;P++){if(H.map.isWebGLCubeRenderTarget)r.setRenderTarget(H.map,P),r.clear();else{P===0&&(r.setRenderTarget(H.map),r.clear());const K=H.getViewport(P);f.set(u.x*K.x,u.y*K.y,u.x*K.z,u.y*K.w),W.viewport(f)}if(B.isPointLight){const K=H.camera,Mt=H.matrix,Tt=B.distance||K.far;Tt!==K.far&&(K.far=Tt,K.updateProjectionMatrix()),ul.setFromMatrixPosition(B.matrixWorld),K.position.copy(ul),Cd.copy(K.position),Cd.add(sw[P]),K.up.copy(rw[P]),K.lookAt(Cd),K.updateMatrixWorld(),Mt.makeTranslation(-ul.x,-ul.y,-ul.z),ax.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),H._frustum.setFromProjectionMatrix(ax,K.coordinateSystem,K.reversedDepth)}else H.updateMatrices(B);s=H.getFrustum(),w(F,T,H.camera,B,this.type)}H.isPointLightShadow!==!0&&this.type===cl&&D(H,T),H.needsUpdate=!1}S=this.type,x.needsUpdate=!1,r.setRenderTarget(N,k,G)};function D(U,F){const T=t.update(C);_.defines.VSM_SAMPLES!==U.blurSamples&&(_.defines.VSM_SAMPLES=U.blurSamples,y.defines.VSM_SAMPLES=U.blurSamples,_.needsUpdate=!0,y.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new ni(l.x,l.y,{format:Js,type:xi})),_.uniforms.shadow_pass.value=U.map.depthTexture,_.uniforms.resolution.value=U.mapSize,_.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(F,null,T,_,C,null),y.uniforms.shadow_pass.value=U.mapPass.texture,y.uniforms.resolution.value=U.mapSize,y.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(F,null,T,y,C,null)}function O(U,F,T,N){let k=null;const G=T.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(G!==void 0)k=G;else if(k=T.isPointLight===!0?m:p,r.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const W=k.uuid,ut=F.uuid;let ct=d[W];ct===void 0&&(ct={},d[W]=ct);let Z=ct[ut];Z===void 0&&(Z=k.clone(),ct[ut]=Z,F.addEventListener("dispose",I)),k=Z}if(k.visible=F.visible,k.wireframe=F.wireframe,N===cl?k.side=F.shadowSide!==null?F.shadowSide:F.side:k.side=F.shadowSide!==null?F.shadowSide:v[F.side],k.alphaMap=F.alphaMap,k.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,k.map=F.map,k.clipShadows=F.clipShadows,k.clippingPlanes=F.clippingPlanes,k.clipIntersection=F.clipIntersection,k.displacementMap=F.displacementMap,k.displacementScale=F.displacementScale,k.displacementBias=F.displacementBias,k.wireframeLinewidth=F.wireframeLinewidth,k.linewidth=F.linewidth,T.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const W=r.properties.get(k);W.light=T}return k}function w(U,F,T,N,k){if(U.visible===!1)return;if(U.layers.test(F.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&k===cl)&&(!U.frustumCulled||s.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,U.matrixWorld);const ut=t.update(U),ct=U.material;if(Array.isArray(ct)){const Z=ut.groups;for(let B=0,H=Z.length;B<H;B++){const $=Z[B],_t=ct[$.materialIndex];if(_t&&_t.visible){const Et=O(U,_t,N,k);U.onBeforeShadow(r,U,F,T,ut,Et,$),r.renderBufferDirect(T,null,ut,Et,U,$),U.onAfterShadow(r,U,F,T,ut,Et,$)}}}else if(ct.visible){const Z=O(U,ct,N,k);U.onBeforeShadow(r,U,F,T,ut,Z,null),r.renderBufferDirect(T,null,ut,Z,U,null),U.onAfterShadow(r,U,F,T,ut,Z,null)}}const W=U.children;for(let ut=0,ct=W.length;ut<ct;ut++)w(W[ut],F,T,N,k)}function I(U){U.target.removeEventListener("dispose",I);for(const T in d){const N=d[T],k=U.target.uuid;k in N&&(N[k].dispose(),delete N[k])}}}function lw(r,t){function i(){let X=!1;const Rt=new sn;let gt=null;const wt=new sn(0,0,0,0);return{setMask:function(Bt){gt!==Bt&&!X&&(r.colorMask(Bt,Bt,Bt,Bt),gt=Bt)},setLocked:function(Bt){X=Bt},setClear:function(Bt,bt,Zt,kt,tn){tn===!0&&(Bt*=kt,bt*=kt,Zt*=kt),Rt.set(Bt,bt,Zt,kt),wt.equals(Rt)===!1&&(r.clearColor(Bt,bt,Zt,kt),wt.copy(Rt))},reset:function(){X=!1,gt=null,wt.set(-1,0,0,0)}}}function s(){let X=!1,Rt=!1,gt=null,wt=null,Bt=null;return{setReversed:function(bt){if(Rt!==bt){const Zt=t.get("EXT_clip_control");bt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT),Rt=bt;const kt=Bt;Bt=null,this.setClear(kt)}},getReversed:function(){return Rt},setTest:function(bt){bt?St(r.DEPTH_TEST):Gt(r.DEPTH_TEST)},setMask:function(bt){gt!==bt&&!X&&(r.depthMask(bt),gt=bt)},setFunc:function(bt){if(Rt&&(bt=Ib[bt]),wt!==bt){switch(bt){case Pd:r.depthFunc(r.NEVER);break;case Od:r.depthFunc(r.ALWAYS);break;case Id:r.depthFunc(r.LESS);break;case jr:r.depthFunc(r.LEQUAL);break;case Fd:r.depthFunc(r.EQUAL);break;case Bd:r.depthFunc(r.GEQUAL);break;case zd:r.depthFunc(r.GREATER);break;case Hd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}wt=bt}},setLocked:function(bt){X=bt},setClear:function(bt){Bt!==bt&&(Bt=bt,Rt&&(bt=1-bt),r.clearDepth(bt))},reset:function(){X=!1,gt=null,wt=null,Bt=null,Rt=!1}}}function l(){let X=!1,Rt=null,gt=null,wt=null,Bt=null,bt=null,Zt=null,kt=null,tn=null;return{setTest:function(Oe){X||(Oe?St(r.STENCIL_TEST):Gt(r.STENCIL_TEST))},setMask:function(Oe){Rt!==Oe&&!X&&(r.stencilMask(Oe),Rt=Oe)},setFunc:function(Oe,ii,ai){(gt!==Oe||wt!==ii||Bt!==ai)&&(r.stencilFunc(Oe,ii,ai),gt=Oe,wt=ii,Bt=ai)},setOp:function(Oe,ii,ai){(bt!==Oe||Zt!==ii||kt!==ai)&&(r.stencilOp(Oe,ii,ai),bt=Oe,Zt=ii,kt=ai)},setLocked:function(Oe){X=Oe},setClear:function(Oe){tn!==Oe&&(r.clearStencil(Oe),tn=Oe)},reset:function(){X=!1,Rt=null,gt=null,wt=null,Bt=null,bt=null,Zt=null,kt=null,tn=null}}}const u=new i,f=new s,p=new l,m=new WeakMap,d=new WeakMap;let g={},v={},_={},y=new WeakMap,b=[],C=null,x=!1,S=null,D=null,O=null,w=null,I=null,U=null,F=null,T=new le(0,0,0),N=0,k=!1,G=null,W=null,ut=null,ct=null,Z=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,$=0;const _t=r.getParameter(r.VERSION);_t.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(_t)[1]),H=$>=1):_t.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(_t)[1]),H=$>=2);let Et=null,P={};const K=r.getParameter(r.SCISSOR_BOX),Mt=r.getParameter(r.VIEWPORT),Tt=new sn().fromArray(K),Ut=new sn().fromArray(Mt);function at(X,Rt,gt,wt){const Bt=new Uint8Array(4),bt=r.createTexture();r.bindTexture(X,bt),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<gt;Zt++)X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,wt,0,r.RGBA,r.UNSIGNED_BYTE,Bt):r.texImage2D(Rt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Bt);return bt}const yt={};yt[r.TEXTURE_2D]=at(r.TEXTURE_2D,r.TEXTURE_2D,1),yt[r.TEXTURE_CUBE_MAP]=at(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[r.TEXTURE_2D_ARRAY]=at(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),yt[r.TEXTURE_3D]=at(r.TEXTURE_3D,r.TEXTURE_3D,1,1),u.setClear(0,0,0,1),f.setClear(1),p.setClear(0),St(r.DEPTH_TEST),f.setFunc(jr),Te(!1),Ve(iv),St(r.CULL_FACE),Yt($i);function St(X){g[X]!==!0&&(r.enable(X),g[X]=!0)}function Gt(X){g[X]!==!1&&(r.disable(X),g[X]=!1)}function se(X,Rt){return _[X]!==Rt?(r.bindFramebuffer(X,Rt),_[X]=Rt,X===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Rt),X===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function $t(X,Rt){let gt=b,wt=!1;if(X){gt=y.get(Rt),gt===void 0&&(gt=[],y.set(Rt,gt));const Bt=X.textures;if(gt.length!==Bt.length||gt[0]!==r.COLOR_ATTACHMENT0){for(let bt=0,Zt=Bt.length;bt<Zt;bt++)gt[bt]=r.COLOR_ATTACHMENT0+bt;gt.length=Bt.length,wt=!0}}else gt[0]!==r.BACK&&(gt[0]=r.BACK,wt=!0);wt&&r.drawBuffers(gt)}function Ge(X){return C!==X?(r.useProgram(X),C=X,!0):!1}const fe={[Ws]:r.FUNC_ADD,[sb]:r.FUNC_SUBTRACT,[rb]:r.FUNC_REVERSE_SUBTRACT};fe[ob]=r.MIN,fe[lb]=r.MAX;const Pt={[ub]:r.ZERO,[cb]:r.ONE,[fb]:r.SRC_COLOR,[Ld]:r.SRC_ALPHA,[_b]:r.SRC_ALPHA_SATURATE,[mb]:r.DST_COLOR,[db]:r.DST_ALPHA,[hb]:r.ONE_MINUS_SRC_COLOR,[Nd]:r.ONE_MINUS_SRC_ALPHA,[gb]:r.ONE_MINUS_DST_COLOR,[pb]:r.ONE_MINUS_DST_ALPHA,[vb]:r.CONSTANT_COLOR,[xb]:r.ONE_MINUS_CONSTANT_COLOR,[Sb]:r.CONSTANT_ALPHA,[Mb]:r.ONE_MINUS_CONSTANT_ALPHA};function Yt(X,Rt,gt,wt,Bt,bt,Zt,kt,tn,Oe){if(X===$i){x===!0&&(Gt(r.BLEND),x=!1);return}if(x===!1&&(St(r.BLEND),x=!0),X!==ab){if(X!==S||Oe!==k){if((D!==Ws||I!==Ws)&&(r.blendEquation(r.FUNC_ADD),D=Ws,I=Ws),Oe)switch(X){case Zr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sc:r.blendFunc(r.ONE,r.ONE);break;case av:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case sv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ae("WebGLState: Invalid blending: ",X);break}else switch(X){case Zr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sc:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case av:Ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sv:Ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ae("WebGLState: Invalid blending: ",X);break}O=null,w=null,U=null,F=null,T.set(0,0,0),N=0,S=X,k=Oe}return}Bt=Bt||Rt,bt=bt||gt,Zt=Zt||wt,(Rt!==D||Bt!==I)&&(r.blendEquationSeparate(fe[Rt],fe[Bt]),D=Rt,I=Bt),(gt!==O||wt!==w||bt!==U||Zt!==F)&&(r.blendFuncSeparate(Pt[gt],Pt[wt],Pt[bt],Pt[Zt]),O=gt,w=wt,U=bt,F=Zt),(kt.equals(T)===!1||tn!==N)&&(r.blendColor(kt.r,kt.g,kt.b,tn),T.copy(kt),N=tn),S=X,k=!1}function Kt(X,Rt){X.side===Ra?Gt(r.CULL_FACE):St(r.CULL_FACE);let gt=X.side===ei;Rt&&(gt=!gt),Te(gt),X.blending===Zr&&X.transparent===!1?Yt($i):Yt(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),u.setMask(X.colorWrite);const wt=X.stencilWrite;p.setTest(wt),wt&&(p.setMask(X.stencilWriteMask),p.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),p.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),ke(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?St(r.SAMPLE_ALPHA_TO_COVERAGE):Gt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Te(X){G!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),G=X)}function Ve(X){X!==nb?(St(r.CULL_FACE),X!==W&&(X===iv?r.cullFace(r.BACK):X===ib?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Gt(r.CULL_FACE),W=X}function Qe(X){X!==ut&&(H&&r.lineWidth(X),ut=X)}function ke(X,Rt,gt){X?(St(r.POLYGON_OFFSET_FILL),(ct!==Rt||Z!==gt)&&(ct=Rt,Z=gt,f.getReversed()&&(Rt=-Rt),r.polygonOffset(Rt,gt))):Gt(r.POLYGON_OFFSET_FILL)}function Ue(X){X?St(r.SCISSOR_TEST):Gt(r.SCISSOR_TEST)}function $e(X){X===void 0&&(X=r.TEXTURE0+B-1),Et!==X&&(r.activeTexture(X),Et=X)}function q(X,Rt,gt){gt===void 0&&(Et===null?gt=r.TEXTURE0+B-1:gt=Et);let wt=P[gt];wt===void 0&&(wt={type:void 0,texture:void 0},P[gt]=wt),(wt.type!==X||wt.texture!==Rt)&&(Et!==gt&&(r.activeTexture(gt),Et=gt),r.bindTexture(X,Rt||yt[X]),wt.type=X,wt.texture=Rt)}function Le(){const X=P[Et];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function be(){try{r.compressedTexImage2D(...arguments)}catch(X){Ae("WebGLState:",X)}}function L(){try{r.compressedTexImage3D(...arguments)}catch(X){Ae("WebGLState:",X)}}function E(){try{r.texSubImage2D(...arguments)}catch(X){Ae("WebGLState:",X)}}function j(){try{r.texSubImage3D(...arguments)}catch(X){Ae("WebGLState:",X)}}function st(){try{r.compressedTexSubImage2D(...arguments)}catch(X){Ae("WebGLState:",X)}}function ht(){try{r.compressedTexSubImage3D(...arguments)}catch(X){Ae("WebGLState:",X)}}function At(){try{r.texStorage2D(...arguments)}catch(X){Ae("WebGLState:",X)}}function Dt(){try{r.texStorage3D(...arguments)}catch(X){Ae("WebGLState:",X)}}function ft(){try{r.texImage2D(...arguments)}catch(X){Ae("WebGLState:",X)}}function dt(){try{r.texImage3D(...arguments)}catch(X){Ae("WebGLState:",X)}}function Ct(X){return v[X]!==void 0?v[X]:r.getParameter(X)}function zt(X,Rt){v[X]!==Rt&&(r.pixelStorei(X,Rt),v[X]=Rt)}function Ot(X){Tt.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),Tt.copy(X))}function Lt(X){Ut.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),Ut.copy(X))}function te(X,Rt){let gt=d.get(Rt);gt===void 0&&(gt=new WeakMap,d.set(Rt,gt));let wt=gt.get(X);wt===void 0&&(wt=r.getUniformBlockIndex(Rt,X.name),gt.set(X,wt))}function ee(X,Rt){const wt=d.get(Rt).get(X);m.get(Rt)!==wt&&(r.uniformBlockBinding(Rt,wt,X.__bindingPointIndex),m.set(Rt,wt))}function oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},v={},Et=null,P={},_={},y=new WeakMap,b=[],C=null,x=!1,S=null,D=null,O=null,w=null,I=null,U=null,F=null,T=new le(0,0,0),N=0,k=!1,G=null,W=null,ut=null,ct=null,Z=null,Tt.set(0,0,r.canvas.width,r.canvas.height),Ut.set(0,0,r.canvas.width,r.canvas.height),u.reset(),f.reset(),p.reset()}return{buffers:{color:u,depth:f,stencil:p},enable:St,disable:Gt,bindFramebuffer:se,drawBuffers:$t,useProgram:Ge,setBlending:Yt,setMaterial:Kt,setFlipSided:Te,setCullFace:Ve,setLineWidth:Qe,setPolygonOffset:ke,setScissorTest:Ue,activeTexture:$e,bindTexture:q,unbindTexture:Le,compressedTexImage2D:be,compressedTexImage3D:L,texImage2D:ft,texImage3D:dt,pixelStorei:zt,getParameter:Ct,updateUBOMapping:te,uniformBlockBinding:ee,texStorage2D:At,texStorage3D:Dt,texSubImage2D:E,texSubImage3D:j,compressedTexSubImage2D:st,compressedTexSubImage3D:ht,scissor:Ot,viewport:Lt,reset:oe}}function uw(r,t,i,s,l,u,f){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new jt,g=new WeakMap,v=new Set;let _;const y=new WeakMap;let b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(L,E){return b?new OffscreenCanvas(L,E):Tc("canvas")}function x(L,E,j){let st=1;const ht=be(L);if((ht.width>j||ht.height>j)&&(st=j/Math.max(ht.width,ht.height)),st<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const At=Math.floor(st*ht.width),Dt=Math.floor(st*ht.height);_===void 0&&(_=C(At,Dt));const ft=E?C(At,Dt):_;return ft.width=At,ft.height=Dt,ft.getContext("2d").drawImage(L,0,0,At,Dt),re("WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+At+"x"+Dt+")."),ft}else return"data"in L&&re("WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),L;return L}function S(L){return L.generateMipmaps}function D(L){r.generateMipmap(L)}function O(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function w(L,E,j,st,ht,At=!1){if(L!==null){if(r[L]!==void 0)return r[L];re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Dt;st&&(Dt=t.get("EXT_texture_norm16"),Dt||re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ft=E;if(E===r.RED&&(j===r.FLOAT&&(ft=r.R32F),j===r.HALF_FLOAT&&(ft=r.R16F),j===r.UNSIGNED_BYTE&&(ft=r.R8),j===r.UNSIGNED_SHORT&&Dt&&(ft=Dt.R16_EXT),j===r.SHORT&&Dt&&(ft=Dt.R16_SNORM_EXT)),E===r.RED_INTEGER&&(j===r.UNSIGNED_BYTE&&(ft=r.R8UI),j===r.UNSIGNED_SHORT&&(ft=r.R16UI),j===r.UNSIGNED_INT&&(ft=r.R32UI),j===r.BYTE&&(ft=r.R8I),j===r.SHORT&&(ft=r.R16I),j===r.INT&&(ft=r.R32I)),E===r.RG&&(j===r.FLOAT&&(ft=r.RG32F),j===r.HALF_FLOAT&&(ft=r.RG16F),j===r.UNSIGNED_BYTE&&(ft=r.RG8),j===r.UNSIGNED_SHORT&&Dt&&(ft=Dt.RG16_EXT),j===r.SHORT&&Dt&&(ft=Dt.RG16_SNORM_EXT)),E===r.RG_INTEGER&&(j===r.UNSIGNED_BYTE&&(ft=r.RG8UI),j===r.UNSIGNED_SHORT&&(ft=r.RG16UI),j===r.UNSIGNED_INT&&(ft=r.RG32UI),j===r.BYTE&&(ft=r.RG8I),j===r.SHORT&&(ft=r.RG16I),j===r.INT&&(ft=r.RG32I)),E===r.RGB_INTEGER&&(j===r.UNSIGNED_BYTE&&(ft=r.RGB8UI),j===r.UNSIGNED_SHORT&&(ft=r.RGB16UI),j===r.UNSIGNED_INT&&(ft=r.RGB32UI),j===r.BYTE&&(ft=r.RGB8I),j===r.SHORT&&(ft=r.RGB16I),j===r.INT&&(ft=r.RGB32I)),E===r.RGBA_INTEGER&&(j===r.UNSIGNED_BYTE&&(ft=r.RGBA8UI),j===r.UNSIGNED_SHORT&&(ft=r.RGBA16UI),j===r.UNSIGNED_INT&&(ft=r.RGBA32UI),j===r.BYTE&&(ft=r.RGBA8I),j===r.SHORT&&(ft=r.RGBA16I),j===r.INT&&(ft=r.RGBA32I)),E===r.RGB&&(j===r.UNSIGNED_SHORT&&Dt&&(ft=Dt.RGB16_EXT),j===r.SHORT&&Dt&&(ft=Dt.RGB16_SNORM_EXT),j===r.UNSIGNED_INT_5_9_9_9_REV&&(ft=r.RGB9_E5),j===r.UNSIGNED_INT_10F_11F_11F_REV&&(ft=r.R11F_G11F_B10F)),E===r.RGBA){const dt=At?bc:ye.getTransfer(ht);j===r.FLOAT&&(ft=r.RGBA32F),j===r.HALF_FLOAT&&(ft=r.RGBA16F),j===r.UNSIGNED_BYTE&&(ft=dt===Pe?r.SRGB8_ALPHA8:r.RGBA8),j===r.UNSIGNED_SHORT&&Dt&&(ft=Dt.RGBA16_EXT),j===r.SHORT&&Dt&&(ft=Dt.RGBA16_SNORM_EXT),j===r.UNSIGNED_SHORT_4_4_4_4&&(ft=r.RGBA4),j===r.UNSIGNED_SHORT_5_5_5_1&&(ft=r.RGB5_A1)}return(ft===r.R16F||ft===r.R32F||ft===r.RG16F||ft===r.RG32F||ft===r.RGBA16F||ft===r.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function I(L,E){let j;return L?E===null||E===na||E===pl?j=r.DEPTH24_STENCIL8:E===Ji?j=r.DEPTH32F_STENCIL8:E===dl&&(j=r.DEPTH24_STENCIL8,re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===na||E===pl?j=r.DEPTH_COMPONENT24:E===Ji?j=r.DEPTH_COMPONENT32F:E===dl&&(j=r.DEPTH_COMPONENT16),j}function U(L,E){return S(L)===!0||L.isFramebufferTexture&&L.minFilter!==Pn&&L.minFilter!==Hn?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function F(L){const E=L.target;E.removeEventListener("dispose",F),N(E),E.isVideoTexture&&g.delete(E),E.isHTMLTexture&&v.delete(E)}function T(L){const E=L.target;E.removeEventListener("dispose",T),G(E)}function N(L){const E=s.get(L);if(E.__webglInit===void 0)return;const j=L.source,st=y.get(j);if(st){const ht=st[E.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&k(L),Object.keys(st).length===0&&y.delete(j)}s.remove(L)}function k(L){const E=s.get(L);r.deleteTexture(E.__webglTexture);const j=L.source,st=y.get(j);delete st[E.__cacheKey],f.memory.textures--}function G(L){const E=s.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),s.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(E.__webglFramebuffer[st]))for(let ht=0;ht<E.__webglFramebuffer[st].length;ht++)r.deleteFramebuffer(E.__webglFramebuffer[st][ht]);else r.deleteFramebuffer(E.__webglFramebuffer[st]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[st])}else{if(Array.isArray(E.__webglFramebuffer))for(let st=0;st<E.__webglFramebuffer.length;st++)r.deleteFramebuffer(E.__webglFramebuffer[st]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let st=0;st<E.__webglColorRenderbuffer.length;st++)E.__webglColorRenderbuffer[st]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[st]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const j=L.textures;for(let st=0,ht=j.length;st<ht;st++){const At=s.get(j[st]);At.__webglTexture&&(r.deleteTexture(At.__webglTexture),f.memory.textures--),s.remove(j[st])}s.remove(L)}let W=0;function ut(){W=0}function ct(){return W}function Z(L){W=L}function B(){const L=W;return L>=l.maxTextures&&re("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l.maxTextures),W+=1,L}function H(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function $(L,E){const j=s.get(L);if(L.isVideoTexture&&q(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&j.__version!==L.version){const st=L.image;if(st===null)re("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)re("WebGLRenderer: Texture marked for update but image is incomplete");else{Gt(j,L,E);return}}else L.isExternalTexture&&(j.__webglTexture=L.sourceTexture?L.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,j.__webglTexture,r.TEXTURE0+E)}function _t(L,E){const j=s.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&j.__version!==L.version){Gt(j,L,E);return}else L.isExternalTexture&&(j.__webglTexture=L.sourceTexture?L.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,j.__webglTexture,r.TEXTURE0+E)}function Et(L,E){const j=s.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&j.__version!==L.version){Gt(j,L,E);return}i.bindTexture(r.TEXTURE_3D,j.__webglTexture,r.TEXTURE0+E)}function P(L,E){const j=s.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&j.__version!==L.version){se(j,L,E);return}i.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture,r.TEXTURE0+E)}const K={[Kr]:r.REPEAT,[Ca]:r.CLAMP_TO_EDGE,[Gd]:r.MIRRORED_REPEAT},Mt={[Pn]:r.NEAREST,[bb]:r.NEAREST_MIPMAP_NEAREST,[Pu]:r.NEAREST_MIPMAP_LINEAR,[Hn]:r.LINEAR,[jh]:r.LINEAR_MIPMAP_NEAREST,[Ys]:r.LINEAR_MIPMAP_LINEAR},Tt={[Rb]:r.NEVER,[Lb]:r.ALWAYS,[Cb]:r.LESS,[Yp]:r.LEQUAL,[wb]:r.EQUAL,[Zp]:r.GEQUAL,[Db]:r.GREATER,[Ub]:r.NOTEQUAL};function Ut(L,E){if(E.type===Ji&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Hn||E.magFilter===jh||E.magFilter===Pu||E.magFilter===Ys||E.minFilter===Hn||E.minFilter===jh||E.minFilter===Pu||E.minFilter===Ys)&&re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,K[E.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,K[E.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,K[E.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,Mt[E.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,Mt[E.minFilter]),E.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,Tt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Pn||E.minFilter!==Pu&&E.minFilter!==Ys||E.type===Ji&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const j=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function at(L,E){let j=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",F));const st=E.source;let ht=y.get(st);ht===void 0&&(ht={},y.set(st,ht));const At=H(E);if(At!==L.__cacheKey){ht[At]===void 0&&(ht[At]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,j=!0),ht[At].usedTimes++;const Dt=ht[L.__cacheKey];Dt!==void 0&&(ht[L.__cacheKey].usedTimes--,Dt.usedTimes===0&&k(E)),L.__cacheKey=At,L.__webglTexture=ht[At].texture}return j}function yt(L,E,j){return Math.floor(Math.floor(L/j)/E)}function St(L,E,j,st){const At=L.updateRanges;if(At.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,E.width,E.height,j,st,E.data);else{At.sort((zt,Ot)=>zt.start-Ot.start);let Dt=0;for(let zt=1;zt<At.length;zt++){const Ot=At[Dt],Lt=At[zt],te=Ot.start+Ot.count,ee=yt(Lt.start,E.width,4),oe=yt(Ot.start,E.width,4);Lt.start<=te+1&&ee===oe&&yt(Lt.start+Lt.count-1,E.width,4)===ee?Ot.count=Math.max(Ot.count,Lt.start+Lt.count-Ot.start):(++Dt,At[Dt]=Lt)}At.length=Dt+1;const ft=i.getParameter(r.UNPACK_ROW_LENGTH),dt=i.getParameter(r.UNPACK_SKIP_PIXELS),Ct=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,E.width);for(let zt=0,Ot=At.length;zt<Ot;zt++){const Lt=At[zt],te=Math.floor(Lt.start/4),ee=Math.ceil(Lt.count/4),oe=te%E.width,X=Math.floor(te/E.width),Rt=ee,gt=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,oe),i.pixelStorei(r.UNPACK_SKIP_ROWS,X),i.texSubImage2D(r.TEXTURE_2D,0,oe,X,Rt,gt,j,st,E.data)}L.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,ft),i.pixelStorei(r.UNPACK_SKIP_PIXELS,dt),i.pixelStorei(r.UNPACK_SKIP_ROWS,Ct)}}function Gt(L,E,j){let st=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(st=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(st=r.TEXTURE_3D);const ht=at(L,E),At=E.source;i.bindTexture(st,L.__webglTexture,r.TEXTURE0+j);const Dt=s.get(At);if(At.version!==Dt.__version||ht===!0){if(i.activeTexture(r.TEXTURE0+j),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const gt=ye.getPrimaries(ye.workingColorSpace),wt=E.colorSpace===ps?null:ye.getPrimaries(E.colorSpace),Bt=E.colorSpace===ps||gt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}i.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment);let dt=x(E.image,!1,l.maxTextureSize);dt=Le(E,dt);const Ct=u.convert(E.format,E.colorSpace),zt=u.convert(E.type);let Ot=w(E.internalFormat,Ct,zt,E.normalized,E.colorSpace,E.isVideoTexture);Ut(st,E);let Lt;const te=E.mipmaps,ee=E.isVideoTexture!==!0,oe=Dt.__version===void 0||ht===!0,X=At.dataReady,Rt=U(E,dt);if(E.isDepthTexture)Ot=I(E.format===Zs,E.type),oe&&(ee?i.texStorage2D(r.TEXTURE_2D,1,Ot,dt.width,dt.height):i.texImage2D(r.TEXTURE_2D,0,Ot,dt.width,dt.height,0,Ct,zt,null));else if(E.isDataTexture)if(te.length>0){ee&&oe&&i.texStorage2D(r.TEXTURE_2D,Rt,Ot,te[0].width,te[0].height);for(let gt=0,wt=te.length;gt<wt;gt++)Lt=te[gt],ee?X&&i.texSubImage2D(r.TEXTURE_2D,gt,0,0,Lt.width,Lt.height,Ct,zt,Lt.data):i.texImage2D(r.TEXTURE_2D,gt,Ot,Lt.width,Lt.height,0,Ct,zt,Lt.data);E.generateMipmaps=!1}else ee?(oe&&i.texStorage2D(r.TEXTURE_2D,Rt,Ot,dt.width,dt.height),X&&St(E,dt,Ct,zt)):i.texImage2D(r.TEXTURE_2D,0,Ot,dt.width,dt.height,0,Ct,zt,dt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ee&&oe&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Ot,te[0].width,te[0].height,dt.depth);for(let gt=0,wt=te.length;gt<wt;gt++)if(Lt=te[gt],E.format!==Hi)if(Ct!==null)if(ee){if(X)if(E.layerUpdates.size>0){const Bt=Iv(Lt.width,Lt.height,E.format,E.type);for(const bt of E.layerUpdates){const Zt=Lt.data.subarray(bt*Bt/Lt.data.BYTES_PER_ELEMENT,(bt+1)*Bt/Lt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,gt,0,0,bt,Lt.width,Lt.height,1,Ct,Zt)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,gt,0,0,0,Lt.width,Lt.height,dt.depth,Ct,Lt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,gt,Ot,Lt.width,Lt.height,dt.depth,0,Lt.data,0,0);else re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?X&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,gt,0,0,0,Lt.width,Lt.height,dt.depth,Ct,zt,Lt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,gt,Ot,Lt.width,Lt.height,dt.depth,0,Ct,zt,Lt.data)}else{ee&&oe&&i.texStorage2D(r.TEXTURE_2D,Rt,Ot,te[0].width,te[0].height);for(let gt=0,wt=te.length;gt<wt;gt++)Lt=te[gt],E.format!==Hi?Ct!==null?ee?X&&i.compressedTexSubImage2D(r.TEXTURE_2D,gt,0,0,Lt.width,Lt.height,Ct,Lt.data):i.compressedTexImage2D(r.TEXTURE_2D,gt,Ot,Lt.width,Lt.height,0,Lt.data):re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?X&&i.texSubImage2D(r.TEXTURE_2D,gt,0,0,Lt.width,Lt.height,Ct,zt,Lt.data):i.texImage2D(r.TEXTURE_2D,gt,Ot,Lt.width,Lt.height,0,Ct,zt,Lt.data)}else if(E.isDataArrayTexture)if(ee){if(oe&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Ot,dt.width,dt.height,dt.depth),X)if(E.layerUpdates.size>0){const gt=Iv(dt.width,dt.height,E.format,E.type);for(const wt of E.layerUpdates){const Bt=dt.data.subarray(wt*gt/dt.data.BYTES_PER_ELEMENT,(wt+1)*gt/dt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,wt,dt.width,dt.height,1,Ct,zt,Bt)}E.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,Ct,zt,dt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Ot,dt.width,dt.height,dt.depth,0,Ct,zt,dt.data);else if(E.isData3DTexture)ee?(oe&&i.texStorage3D(r.TEXTURE_3D,Rt,Ot,dt.width,dt.height,dt.depth),X&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,Ct,zt,dt.data)):i.texImage3D(r.TEXTURE_3D,0,Ot,dt.width,dt.height,dt.depth,0,Ct,zt,dt.data);else if(E.isFramebufferTexture){if(oe)if(ee)i.texStorage2D(r.TEXTURE_2D,Rt,Ot,dt.width,dt.height);else{let gt=dt.width,wt=dt.height;for(let Bt=0;Bt<Rt;Bt++)i.texImage2D(r.TEXTURE_2D,Bt,Ot,gt,wt,0,Ct,zt,null),gt>>=1,wt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in r){const gt=r.canvas;if(gt.hasAttribute("layoutsubtree")||gt.setAttribute("layoutsubtree","true"),dt.parentNode!==gt){gt.appendChild(dt),v.add(E),gt.onpaint=wt=>{const Bt=wt.changedElements;for(const bt of v)Bt.includes(bt.image)&&(bt.needsUpdate=!0)},gt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,dt);else{const Bt=r.RGBA,bt=r.RGBA,Zt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Bt,bt,Zt,dt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(te.length>0){if(ee&&oe){const gt=be(te[0]);i.texStorage2D(r.TEXTURE_2D,Rt,Ot,gt.width,gt.height)}for(let gt=0,wt=te.length;gt<wt;gt++)Lt=te[gt],ee?X&&i.texSubImage2D(r.TEXTURE_2D,gt,0,0,Ct,zt,Lt):i.texImage2D(r.TEXTURE_2D,gt,Ot,Ct,zt,Lt);E.generateMipmaps=!1}else if(ee){if(oe){const gt=be(dt);i.texStorage2D(r.TEXTURE_2D,Rt,Ot,gt.width,gt.height)}X&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Ct,zt,dt)}else i.texImage2D(r.TEXTURE_2D,0,Ot,Ct,zt,dt);S(E)&&D(st),Dt.__version=At.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function se(L,E,j){if(E.image.length!==6)return;const st=at(L,E),ht=E.source;i.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+j);const At=s.get(ht);if(ht.version!==At.__version||st===!0){i.activeTexture(r.TEXTURE0+j);const Dt=ye.getPrimaries(ye.workingColorSpace),ft=E.colorSpace===ps?null:ye.getPrimaries(E.colorSpace),dt=E.colorSpace===ps||Dt===ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Ct=E.isCompressedTexture||E.image[0].isCompressedTexture,zt=E.image[0]&&E.image[0].isDataTexture,Ot=[];for(let bt=0;bt<6;bt++)!Ct&&!zt?Ot[bt]=x(E.image[bt],!0,l.maxCubemapSize):Ot[bt]=zt?E.image[bt].image:E.image[bt],Ot[bt]=Le(E,Ot[bt]);const Lt=Ot[0],te=u.convert(E.format,E.colorSpace),ee=u.convert(E.type),oe=w(E.internalFormat,te,ee,E.normalized,E.colorSpace),X=E.isVideoTexture!==!0,Rt=At.__version===void 0||st===!0,gt=ht.dataReady;let wt=U(E,Lt);Ut(r.TEXTURE_CUBE_MAP,E);let Bt;if(Ct){X&&Rt&&i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,oe,Lt.width,Lt.height);for(let bt=0;bt<6;bt++){Bt=Ot[bt].mipmaps;for(let Zt=0;Zt<Bt.length;Zt++){const kt=Bt[Zt];E.format!==Hi?te!==null?X?gt&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt,0,0,kt.width,kt.height,te,kt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt,oe,kt.width,kt.height,0,kt.data):re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?gt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt,0,0,kt.width,kt.height,te,ee,kt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt,oe,kt.width,kt.height,0,te,ee,kt.data)}}}else{if(Bt=E.mipmaps,X&&Rt){Bt.length>0&&wt++;const bt=be(Ot[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,oe,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(zt){X?gt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Ot[bt].width,Ot[bt].height,te,ee,Ot[bt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,oe,Ot[bt].width,Ot[bt].height,0,te,ee,Ot[bt].data);for(let Zt=0;Zt<Bt.length;Zt++){const tn=Bt[Zt].image[bt].image;X?gt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt+1,0,0,tn.width,tn.height,te,ee,tn.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt+1,oe,tn.width,tn.height,0,te,ee,tn.data)}}else{X?gt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,te,ee,Ot[bt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,oe,te,ee,Ot[bt]);for(let Zt=0;Zt<Bt.length;Zt++){const kt=Bt[Zt];X?gt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt+1,0,0,te,ee,kt.image[bt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Zt+1,oe,te,ee,kt.image[bt])}}}S(E)&&D(r.TEXTURE_CUBE_MAP),At.__version=ht.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function $t(L,E,j,st,ht,At){const Dt=u.convert(j.format,j.colorSpace),ft=u.convert(j.type),dt=w(j.internalFormat,Dt,ft,j.normalized,j.colorSpace),Ct=s.get(E),zt=s.get(j);if(zt.__renderTarget=E,!Ct.__hasExternalTextures){const Ot=Math.max(1,E.width>>At),Lt=Math.max(1,E.height>>At);ht===r.TEXTURE_3D||ht===r.TEXTURE_2D_ARRAY?i.texImage3D(ht,At,dt,Ot,Lt,E.depth,0,Dt,ft,null):i.texImage2D(ht,At,dt,Ot,Lt,0,Dt,ft,null)}i.bindFramebuffer(r.FRAMEBUFFER,L),$e(E)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,st,ht,zt.__webglTexture,0,Ue(E)):(ht===r.TEXTURE_2D||ht>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,st,ht,zt.__webglTexture,At),i.bindFramebuffer(r.FRAMEBUFFER,null)}function Ge(L,E,j){if(r.bindRenderbuffer(r.RENDERBUFFER,L),E.depthBuffer){const st=E.depthTexture,ht=st&&st.isDepthTexture?st.type:null,At=I(E.stencilBuffer,ht),Dt=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;$e(E)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ue(E),At,E.width,E.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ue(E),At,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,At,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Dt,r.RENDERBUFFER,L)}else{const st=E.textures;for(let ht=0;ht<st.length;ht++){const At=st[ht],Dt=u.convert(At.format,At.colorSpace),ft=u.convert(At.type),dt=w(At.internalFormat,Dt,ft,At.normalized,At.colorSpace);$e(E)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ue(E),dt,E.width,E.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ue(E),dt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,dt,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function fe(L,E,j){const st=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ht=s.get(E.depthTexture);if(ht.__renderTarget=E,(!ht.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),st){if(ht.__webglInit===void 0&&(ht.__webglInit=!0,E.depthTexture.addEventListener("dispose",F)),ht.__webglTexture===void 0){ht.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,ht.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,E.depthTexture);const Ct=u.convert(E.depthTexture.format),zt=u.convert(E.depthTexture.type);let Ot;E.depthTexture.format===Ua?Ot=r.DEPTH_COMPONENT24:E.depthTexture.format===Zs&&(Ot=r.DEPTH24_STENCIL8);for(let Lt=0;Lt<6;Lt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,Ot,E.width,E.height,0,Ct,zt,null)}}else $(E.depthTexture,0);const At=ht.__webglTexture,Dt=Ue(E),ft=st?r.TEXTURE_CUBE_MAP_POSITIVE_X+j:r.TEXTURE_2D,dt=E.depthTexture.format===Zs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(E.depthTexture.format===Ua)$e(E)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,ft,At,0,Dt):r.framebufferTexture2D(r.FRAMEBUFFER,dt,ft,At,0);else if(E.depthTexture.format===Zs)$e(E)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,ft,At,0,Dt):r.framebufferTexture2D(r.FRAMEBUFFER,dt,ft,At,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Pt(L){const E=s.get(L),j=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){const st=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),st){const ht=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,st.removeEventListener("dispose",ht)};st.addEventListener("dispose",ht),E.__depthDisposeCallback=ht}E.__boundDepthTexture=st}if(L.depthTexture&&!E.__autoAllocateDepthBuffer)if(j)for(let st=0;st<6;st++)fe(E.__webglFramebuffer[st],L,st);else{const st=L.texture.mipmaps;st&&st.length>0?fe(E.__webglFramebuffer[0],L,0):fe(E.__webglFramebuffer,L,0)}else if(j){E.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(i.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[st]),E.__webglDepthbuffer[st]===void 0)E.__webglDepthbuffer[st]=r.createRenderbuffer(),Ge(E.__webglDepthbuffer[st],L,!1);else{const ht=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=E.__webglDepthbuffer[st];r.bindRenderbuffer(r.RENDERBUFFER,At),r.framebufferRenderbuffer(r.FRAMEBUFFER,ht,r.RENDERBUFFER,At)}}else{const st=L.texture.mipmaps;if(st&&st.length>0?i.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),Ge(E.__webglDepthbuffer,L,!1);else{const ht=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,At),r.framebufferRenderbuffer(r.FRAMEBUFFER,ht,r.RENDERBUFFER,At)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Yt(L,E,j){const st=s.get(L);E!==void 0&&$t(st.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),j!==void 0&&Pt(L)}function Kt(L){const E=L.texture,j=s.get(L),st=s.get(E);L.addEventListener("dispose",T);const ht=L.textures,At=L.isWebGLCubeRenderTarget===!0,Dt=ht.length>1;if(Dt||(st.__webglTexture===void 0&&(st.__webglTexture=r.createTexture()),st.__version=E.version,f.memory.textures++),At){j.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(E.mipmaps&&E.mipmaps.length>0){j.__webglFramebuffer[ft]=[];for(let dt=0;dt<E.mipmaps.length;dt++)j.__webglFramebuffer[ft][dt]=r.createFramebuffer()}else j.__webglFramebuffer[ft]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){j.__webglFramebuffer=[];for(let ft=0;ft<E.mipmaps.length;ft++)j.__webglFramebuffer[ft]=r.createFramebuffer()}else j.__webglFramebuffer=r.createFramebuffer();if(Dt)for(let ft=0,dt=ht.length;ft<dt;ft++){const Ct=s.get(ht[ft]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=r.createTexture(),f.memory.textures++)}if(L.samples>0&&$e(L)===!1){j.__webglMultisampledFramebuffer=r.createFramebuffer(),j.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let ft=0;ft<ht.length;ft++){const dt=ht[ft];j.__webglColorRenderbuffer[ft]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,j.__webglColorRenderbuffer[ft]);const Ct=u.convert(dt.format,dt.colorSpace),zt=u.convert(dt.type),Ot=w(dt.internalFormat,Ct,zt,dt.normalized,dt.colorSpace,L.isXRRenderTarget===!0),Lt=Ue(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,Ot,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ft,r.RENDERBUFFER,j.__webglColorRenderbuffer[ft])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(j.__webglDepthRenderbuffer=r.createRenderbuffer(),Ge(j.__webglDepthRenderbuffer,L,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(At){i.bindTexture(r.TEXTURE_CUBE_MAP,st.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,E);for(let ft=0;ft<6;ft++)if(E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)$t(j.__webglFramebuffer[ft][dt],L,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ft,dt);else $t(j.__webglFramebuffer[ft],L,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);S(E)&&D(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Dt){for(let ft=0,dt=ht.length;ft<dt;ft++){const Ct=ht[ft],zt=s.get(Ct);let Ot=r.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ot=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Ot,zt.__webglTexture),Ut(Ot,Ct),$t(j.__webglFramebuffer,L,Ct,r.COLOR_ATTACHMENT0+ft,Ot,0),S(Ct)&&D(Ot)}i.unbindTexture()}else{let ft=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ft=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(ft,st.__webglTexture),Ut(ft,E),E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)$t(j.__webglFramebuffer[dt],L,E,r.COLOR_ATTACHMENT0,ft,dt);else $t(j.__webglFramebuffer,L,E,r.COLOR_ATTACHMENT0,ft,0);S(E)&&D(ft),i.unbindTexture()}L.depthBuffer&&Pt(L)}function Te(L){const E=L.textures;for(let j=0,st=E.length;j<st;j++){const ht=E[j];if(S(ht)){const At=O(L),Dt=s.get(ht).__webglTexture;i.bindTexture(At,Dt),D(At),i.unbindTexture()}}}const Ve=[],Qe=[];function ke(L){if(L.samples>0){if($e(L)===!1){const E=L.textures,j=L.width,st=L.height;let ht=r.COLOR_BUFFER_BIT;const At=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Dt=s.get(L),ft=E.length>1;if(ft)for(let Ct=0;Ct<E.length;Ct++)i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const dt=L.texture.mipmaps;dt&&dt.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Ct=0;Ct<E.length;Ct++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ht|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ht|=r.STENCIL_BUFFER_BIT)),ft){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Dt.__webglColorRenderbuffer[Ct]);const zt=s.get(E[Ct]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,zt,0)}r.blitFramebuffer(0,0,j,st,0,0,j,st,ht,r.NEAREST),m===!0&&(Ve.length=0,Qe.length=0,Ve.push(r.COLOR_ATTACHMENT0+Ct),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Ve.push(At),Qe.push(At),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Qe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ve))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ft)for(let Ct=0;Ct<E.length;Ct++){i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,Dt.__webglColorRenderbuffer[Ct]);const zt=s.get(E[Ct]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,zt,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&m){const E=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function Ue(L){return Math.min(l.maxSamples,L.samples)}function $e(L){const E=s.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function q(L){const E=f.render.frame;g.get(L)!==E&&(g.set(L,E),L.update())}function Le(L,E){const j=L.colorSpace,st=L.format,ht=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||j!==Ec&&j!==ps&&(ye.getTransfer(j)===Pe?(st!==Hi||ht!==vi)&&re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ae("WebGLTextures: Unsupported texture color space:",j)),E}function be(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(d.width=L.naturalWidth||L.width,d.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(d.width=L.displayWidth,d.height=L.displayHeight):(d.width=L.width,d.height=L.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=ut,this.getTextureUnits=ct,this.setTextureUnits=Z,this.setTexture2D=$,this.setTexture2DArray=_t,this.setTexture3D=Et,this.setTextureCube=P,this.rebindTextures=Yt,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=$t,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function cw(r,t){function i(s,l=ps){let u;const f=ye.getTransfer(l);if(s===vi)return r.UNSIGNED_BYTE;if(s===Vp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===kp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Ix)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Fx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Px)return r.BYTE;if(s===Ox)return r.SHORT;if(s===dl)return r.UNSIGNED_SHORT;if(s===Gp)return r.INT;if(s===na)return r.UNSIGNED_INT;if(s===Ji)return r.FLOAT;if(s===xi)return r.HALF_FLOAT;if(s===Bx)return r.ALPHA;if(s===zx)return r.RGB;if(s===Hi)return r.RGBA;if(s===Ua)return r.DEPTH_COMPONENT;if(s===Zs)return r.DEPTH_STENCIL;if(s===Hx)return r.RED;if(s===Xp)return r.RED_INTEGER;if(s===Js)return r.RG;if(s===Wp)return r.RG_INTEGER;if(s===qp)return r.RGBA_INTEGER;if(s===fc||s===hc||s===dc||s===pc)if(f===Pe)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(s===fc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===hc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===dc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===pc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(s===fc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===hc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===dc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===pc)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Vd||s===kd||s===Xd||s===Wd)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(s===Vd)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===kd)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Xd)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Wd)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===qd||s===Yd||s===Zd||s===Kd||s===Qd||s===Mc||s===Jd)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(s===qd||s===Yd)return f===Pe?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(s===Zd)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC;if(s===Kd)return u.COMPRESSED_R11_EAC;if(s===Qd)return u.COMPRESSED_SIGNED_R11_EAC;if(s===Mc)return u.COMPRESSED_RG11_EAC;if(s===Jd)return u.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===jd||s===$d||s===tp||s===ep||s===np||s===ip||s===ap||s===sp||s===rp||s===op||s===lp||s===up||s===cp||s===fp)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(s===jd)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===$d)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===tp)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ep)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===np)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ip)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===ap)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===sp)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===rp)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===op)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===lp)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===up)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===cp)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===fp)return f===Pe?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===hp||s===dp||s===pp)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(s===hp)return f===Pe?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===dp)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===pp)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===mp||s===gp||s===yc||s===_p)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(s===mp)return u.COMPRESSED_RED_RGTC1_EXT;if(s===gp)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===yc)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===_p)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===pl?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const fw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hw=`
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

}`;class dw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new Kx(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new Gn({vertexShader:fw,fragmentShader:hw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Sn(new eo(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pw extends xs{constructor(t,i){super();const s=this;let l=null,u=1,f=null,p="local-floor",m=1,d=null,g=null,v=null,_=null,y=null,b=null;const C=typeof XRWebGLBinding<"u",x=new dw,S={},D=i.getContextAttributes();let O=null,w=null;const I=[],U=[],F=new jt;let T=null;const N=new _i;N.viewport=new sn;const k=new _i;k.viewport=new sn;const G=[N,k],W=new ST;let ut=null,ct=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let yt=I[at];return yt===void 0&&(yt=new sd,I[at]=yt),yt.getTargetRaySpace()},this.getControllerGrip=function(at){let yt=I[at];return yt===void 0&&(yt=new sd,I[at]=yt),yt.getGripSpace()},this.getHand=function(at){let yt=I[at];return yt===void 0&&(yt=new sd,I[at]=yt),yt.getHandSpace()};function Z(at){const yt=U.indexOf(at.inputSource);if(yt===-1)return;const St=I[yt];St!==void 0&&(St.update(at.inputSource,at.frame,d||f),St.dispatchEvent({type:at.type,data:at.inputSource}))}function B(){l.removeEventListener("select",Z),l.removeEventListener("selectstart",Z),l.removeEventListener("selectend",Z),l.removeEventListener("squeeze",Z),l.removeEventListener("squeezestart",Z),l.removeEventListener("squeezeend",Z),l.removeEventListener("end",B),l.removeEventListener("inputsourceschange",H);for(let at=0;at<I.length;at++){const yt=U[at];yt!==null&&(U[at]=null,I[at].disconnect(yt))}ut=null,ct=null,x.reset();for(const at in S)delete S[at];t.setRenderTarget(O),y=null,_=null,v=null,l=null,w=null,Ut.stop(),s.isPresenting=!1,t.setPixelRatio(T),t.setSize(F.width,F.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){u=at,s.isPresenting===!0&&re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){p=at,s.isPresenting===!0&&re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(at){d=at},this.getBaseLayer=function(){return _!==null?_:y},this.getBinding=function(){return v===null&&C&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(at){if(l=at,l!==null){if(O=t.getRenderTarget(),l.addEventListener("select",Z),l.addEventListener("selectstart",Z),l.addEventListener("selectend",Z),l.addEventListener("squeeze",Z),l.addEventListener("squeezestart",Z),l.addEventListener("squeezeend",Z),l.addEventListener("end",B),l.addEventListener("inputsourceschange",H),D.xrCompatible!==!0&&await i.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(F),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Gt=null,se=null;D.depth&&(se=D.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,St=D.stencil?Zs:Ua,Gt=D.stencil?pl:na);const $t={colorFormat:i.RGBA8,depthFormat:se,scaleFactor:u};v=this.getBinding(),_=v.createProjectionLayer($t),l.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),w=new ni(_.textureWidth,_.textureHeight,{format:Hi,type:vi,depthTexture:new to(_.textureWidth,_.textureHeight,Gt,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:D.stencil,colorSpace:t.outputColorSpace,samples:D.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}else{const St={antialias:D.antialias,alpha:!0,depth:D.depth,stencil:D.stencil,framebufferScaleFactor:u};y=new XRWebGLLayer(l,i,St),l.updateRenderState({baseLayer:y}),t.setPixelRatio(1),t.setSize(y.framebufferWidth,y.framebufferHeight,!1),w=new ni(y.framebufferWidth,y.framebufferHeight,{format:Hi,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:D.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),Ut.setContext(l),Ut.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function H(at){for(let yt=0;yt<at.removed.length;yt++){const St=at.removed[yt],Gt=U.indexOf(St);Gt>=0&&(U[Gt]=null,I[Gt].disconnect(St))}for(let yt=0;yt<at.added.length;yt++){const St=at.added[yt];let Gt=U.indexOf(St);if(Gt===-1){for(let $t=0;$t<I.length;$t++)if($t>=U.length){U.push(St),Gt=$t;break}else if(U[$t]===null){U[$t]=St,Gt=$t;break}if(Gt===-1)break}const se=I[Gt];se&&se.connect(St)}}const $=new J,_t=new J;function Et(at,yt,St){$.setFromMatrixPosition(yt.matrixWorld),_t.setFromMatrixPosition(St.matrixWorld);const Gt=$.distanceTo(_t),se=yt.projectionMatrix.elements,$t=St.projectionMatrix.elements,Ge=se[14]/(se[10]-1),fe=se[14]/(se[10]+1),Pt=(se[9]+1)/se[5],Yt=(se[9]-1)/se[5],Kt=(se[8]-1)/se[0],Te=($t[8]+1)/$t[0],Ve=Ge*Kt,Qe=Ge*Te,ke=Gt/(-Kt+Te),Ue=ke*-Kt;if(yt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(Ue),at.translateZ(ke),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),se[10]===-1)at.projectionMatrix.copy(yt.projectionMatrix),at.projectionMatrixInverse.copy(yt.projectionMatrixInverse);else{const $e=Ge+ke,q=fe+ke,Le=Ve-Ue,be=Qe+(Gt-Ue),L=Pt*fe/q*$e,E=Yt*fe/q*$e;at.projectionMatrix.makePerspective(Le,be,L,E,$e,q),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function P(at,yt){yt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(yt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(l===null)return;let yt=at.near,St=at.far;x.texture!==null&&(x.depthNear>0&&(yt=x.depthNear),x.depthFar>0&&(St=x.depthFar)),W.near=k.near=N.near=yt,W.far=k.far=N.far=St,(ut!==W.near||ct!==W.far)&&(l.updateRenderState({depthNear:W.near,depthFar:W.far}),ut=W.near,ct=W.far),W.layers.mask=at.layers.mask|6,N.layers.mask=W.layers.mask&-5,k.layers.mask=W.layers.mask&-3;const Gt=at.parent,se=W.cameras;P(W,Gt);for(let $t=0;$t<se.length;$t++)P(se[$t],Gt);se.length===2?Et(W,N,k):W.projectionMatrix.copy(N.projectionMatrix),K(at,W,Gt)};function K(at,yt,St){St===null?at.matrix.copy(yt.matrixWorld):(at.matrix.copy(St.matrixWorld),at.matrix.invert(),at.matrix.multiply(yt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(yt.projectionMatrix),at.projectionMatrixInverse.copy(yt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=xp*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(_===null&&y===null))return m},this.setFoveation=function(at){m=at,_!==null&&(_.fixedFoveation=at),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=at)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(W)},this.getCameraTexture=function(at){return S[at]};let Mt=null;function Tt(at,yt){if(g=yt.getViewerPose(d||f),b=yt,g!==null){const St=g.views;y!==null&&(t.setRenderTargetFramebuffer(w,y.framebuffer),t.setRenderTarget(w));let Gt=!1;St.length!==W.cameras.length&&(W.cameras.length=0,Gt=!0);for(let fe=0;fe<St.length;fe++){const Pt=St[fe];let Yt=null;if(y!==null)Yt=y.getViewport(Pt);else{const Te=v.getViewSubImage(_,Pt);Yt=Te.viewport,fe===0&&(t.setRenderTargetTextures(w,Te.colorTexture,Te.depthStencilTexture),t.setRenderTarget(w))}let Kt=G[fe];Kt===void 0&&(Kt=new _i,Kt.layers.enable(fe),Kt.viewport=new sn,G[fe]=Kt),Kt.matrix.fromArray(Pt.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(Pt.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),fe===0&&(W.matrix.copy(Kt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Gt===!0&&W.cameras.push(Kt)}const se=l.enabledFeatures;if(se&&se.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){v=s.getBinding();const fe=v.getDepthInformation(St[0]);fe&&fe.isValid&&fe.texture&&x.init(fe,l.renderState)}if(se&&se.includes("camera-access")&&C){t.state.unbindTexture(),v=s.getBinding();for(let fe=0;fe<St.length;fe++){const Pt=St[fe].camera;if(Pt){let Yt=S[Pt];Yt||(Yt=new Kx,S[Pt]=Yt);const Kt=v.getCameraImage(Pt);Yt.sourceTexture=Kt}}}}for(let St=0;St<I.length;St++){const Gt=U[St],se=I[St];Gt!==null&&se!==void 0&&se.update(Gt,yt,d||f)}Mt&&Mt(at,yt),yt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:yt}),b=null}const Ut=new tS;Ut.setAnimationLoop(Tt),this.setAnimationLoop=function(at){Mt=at},this.dispose=function(){}}}const mw=new on,oS=new ce;oS.set(-1,0,0,0,1,0,0,0,1);function gw(r,t){function i(x,S){x.matrixAutoUpdate===!0&&x.updateMatrix(),S.value.copy(x.matrix)}function s(x,S){S.color.getRGB(x.fogColor.value,Qx(r)),S.isFog?(x.fogNear.value=S.near,x.fogFar.value=S.far):S.isFogExp2&&(x.fogDensity.value=S.density)}function l(x,S,D,O,w){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?u(x,S):S.isMeshLambertMaterial?(u(x,S),S.envMap&&(x.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(u(x,S),v(x,S)):S.isMeshPhongMaterial?(u(x,S),g(x,S),S.envMap&&(x.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(u(x,S),_(x,S),S.isMeshPhysicalMaterial&&y(x,S,w)):S.isMeshMatcapMaterial?(u(x,S),b(x,S)):S.isMeshDepthMaterial?u(x,S):S.isMeshDistanceMaterial?(u(x,S),C(x,S)):S.isMeshNormalMaterial?u(x,S):S.isLineBasicMaterial?(f(x,S),S.isLineDashedMaterial&&p(x,S)):S.isPointsMaterial?m(x,S,D,O):S.isSpriteMaterial?d(x,S):S.isShadowMaterial?(x.color.value.copy(S.color),x.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function u(x,S){x.opacity.value=S.opacity,S.color&&x.diffuse.value.copy(S.color),S.emissive&&x.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(x.map.value=S.map,i(S.map,x.mapTransform)),S.alphaMap&&(x.alphaMap.value=S.alphaMap,i(S.alphaMap,x.alphaMapTransform)),S.bumpMap&&(x.bumpMap.value=S.bumpMap,i(S.bumpMap,x.bumpMapTransform),x.bumpScale.value=S.bumpScale,S.side===ei&&(x.bumpScale.value*=-1)),S.normalMap&&(x.normalMap.value=S.normalMap,i(S.normalMap,x.normalMapTransform),x.normalScale.value.copy(S.normalScale),S.side===ei&&x.normalScale.value.negate()),S.displacementMap&&(x.displacementMap.value=S.displacementMap,i(S.displacementMap,x.displacementMapTransform),x.displacementScale.value=S.displacementScale,x.displacementBias.value=S.displacementBias),S.emissiveMap&&(x.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,x.emissiveMapTransform)),S.specularMap&&(x.specularMap.value=S.specularMap,i(S.specularMap,x.specularMapTransform)),S.alphaTest>0&&(x.alphaTest.value=S.alphaTest);const D=t.get(S),O=D.envMap,w=D.envMapRotation;O&&(x.envMap.value=O,x.envMapRotation.value.setFromMatrix4(mw.makeRotationFromEuler(w)).transpose(),O.isCubeTexture&&O.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(oS),x.reflectivity.value=S.reflectivity,x.ior.value=S.ior,x.refractionRatio.value=S.refractionRatio),S.lightMap&&(x.lightMap.value=S.lightMap,x.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,x.lightMapTransform)),S.aoMap&&(x.aoMap.value=S.aoMap,x.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,x.aoMapTransform))}function f(x,S){x.diffuse.value.copy(S.color),x.opacity.value=S.opacity,S.map&&(x.map.value=S.map,i(S.map,x.mapTransform))}function p(x,S){x.dashSize.value=S.dashSize,x.totalSize.value=S.dashSize+S.gapSize,x.scale.value=S.scale}function m(x,S,D,O){x.diffuse.value.copy(S.color),x.opacity.value=S.opacity,x.size.value=S.size*D,x.scale.value=O*.5,S.map&&(x.map.value=S.map,i(S.map,x.uvTransform)),S.alphaMap&&(x.alphaMap.value=S.alphaMap,i(S.alphaMap,x.alphaMapTransform)),S.alphaTest>0&&(x.alphaTest.value=S.alphaTest)}function d(x,S){x.diffuse.value.copy(S.color),x.opacity.value=S.opacity,x.rotation.value=S.rotation,S.map&&(x.map.value=S.map,i(S.map,x.mapTransform)),S.alphaMap&&(x.alphaMap.value=S.alphaMap,i(S.alphaMap,x.alphaMapTransform)),S.alphaTest>0&&(x.alphaTest.value=S.alphaTest)}function g(x,S){x.specular.value.copy(S.specular),x.shininess.value=Math.max(S.shininess,1e-4)}function v(x,S){S.gradientMap&&(x.gradientMap.value=S.gradientMap)}function _(x,S){x.metalness.value=S.metalness,S.metalnessMap&&(x.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,x.metalnessMapTransform)),x.roughness.value=S.roughness,S.roughnessMap&&(x.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,x.roughnessMapTransform)),S.envMap&&(x.envMapIntensity.value=S.envMapIntensity)}function y(x,S,D){x.ior.value=S.ior,S.sheen>0&&(x.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),x.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(x.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,x.sheenColorMapTransform)),S.sheenRoughnessMap&&(x.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,x.sheenRoughnessMapTransform))),S.clearcoat>0&&(x.clearcoat.value=S.clearcoat,x.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(x.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,x.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(x.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===ei&&x.clearcoatNormalScale.value.negate())),S.dispersion>0&&(x.dispersion.value=S.dispersion),S.iridescence>0&&(x.iridescence.value=S.iridescence,x.iridescenceIOR.value=S.iridescenceIOR,x.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(x.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,x.iridescenceMapTransform)),S.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),S.transmission>0&&(x.transmission.value=S.transmission,x.transmissionSamplerMap.value=D.texture,x.transmissionSamplerSize.value.set(D.width,D.height),S.transmissionMap&&(x.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,x.transmissionMapTransform)),x.thickness.value=S.thickness,S.thicknessMap&&(x.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=S.attenuationDistance,x.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(x.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(x.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=S.specularIntensity,x.specularColor.value.copy(S.specularColor),S.specularColorMap&&(x.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,x.specularColorMapTransform)),S.specularIntensityMap&&(x.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,x.specularIntensityMapTransform))}function b(x,S){S.matcap&&(x.matcap.value=S.matcap)}function C(x,S){const D=t.get(S).light;x.referencePosition.value.setFromMatrixPosition(D.matrixWorld),x.nearDistance.value=D.shadow.camera.near,x.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function _w(r,t,i,s){let l={},u={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(w,I){const U=I.program;s.uniformBlockBinding(w,U)}function d(w,I){let U=l[w.id];U===void 0&&(x(w),U=g(w),l[w.id]=U,w.addEventListener("dispose",D));const F=I.program;s.updateUBOMapping(w,F);const T=t.render.frame;u[w.id]!==T&&(_(w),u[w.id]=T)}function g(w){const I=v();w.__bindingPointIndex=I;const U=r.createBuffer(),F=w.__size,T=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,F,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,I,U),U}function v(){for(let w=0;w<p;w++)if(f.indexOf(w)===-1)return f.push(w),w;return Ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(w){const I=l[w.id],U=w.uniforms,F=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,I);for(let T=0,N=U.length;T<N;T++){const k=U[T];if(Array.isArray(k))for(let G=0,W=k.length;G<W;G++)y(k[G],T,G,F);else y(k,T,0,F)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function y(w,I,U,F){if(C(w,I,U,F)===!0){const T=w.__offset,N=w.value;if(Array.isArray(N)){let k=0;for(let G=0;G<N.length;G++){const W=N[G],ut=S(W);b(W,w.__data,k),typeof W!="number"&&typeof W!="boolean"&&!W.isMatrix3&&!ArrayBuffer.isView(W)&&(k+=ut.storage/Float32Array.BYTES_PER_ELEMENT)}}else b(N,w.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,w.__data)}}function b(w,I,U){typeof w=="number"||typeof w=="boolean"?I[0]=w:w.isMatrix3?(I[0]=w.elements[0],I[1]=w.elements[1],I[2]=w.elements[2],I[3]=0,I[4]=w.elements[3],I[5]=w.elements[4],I[6]=w.elements[5],I[7]=0,I[8]=w.elements[6],I[9]=w.elements[7],I[10]=w.elements[8],I[11]=0):ArrayBuffer.isView(w)?I.set(new w.constructor(w.buffer,w.byteOffset,I.length)):w.toArray(I,U)}function C(w,I,U,F){const T=w.value,N=I+"_"+U;if(F[N]===void 0)return typeof T=="number"||typeof T=="boolean"?F[N]=T:ArrayBuffer.isView(T)?F[N]=T.slice():F[N]=T.clone(),!0;{const k=F[N];if(typeof T=="number"||typeof T=="boolean"){if(k!==T)return F[N]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(k.equals(T)===!1)return k.copy(T),!0}}return!1}function x(w){const I=w.uniforms;let U=0;const F=16;for(let N=0,k=I.length;N<k;N++){const G=Array.isArray(I[N])?I[N]:[I[N]];for(let W=0,ut=G.length;W<ut;W++){const ct=G[W],Z=Array.isArray(ct.value)?ct.value:[ct.value];for(let B=0,H=Z.length;B<H;B++){const $=Z[B],_t=S($),Et=U%F,P=Et%_t.boundary,K=Et+P;U+=P,K!==0&&F-K<_t.storage&&(U+=F-K),ct.__data=new Float32Array(_t.storage/Float32Array.BYTES_PER_ELEMENT),ct.__offset=U,U+=_t.storage}}}const T=U%F;return T>0&&(U+=F-T),w.__size=U,w.__cache={},this}function S(w){const I={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(I.boundary=4,I.storage=4):w.isVector2?(I.boundary=8,I.storage=8):w.isVector3||w.isColor?(I.boundary=16,I.storage=12):w.isVector4?(I.boundary=16,I.storage=16):w.isMatrix3?(I.boundary=48,I.storage=48):w.isMatrix4?(I.boundary=64,I.storage=64):w.isTexture?re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(I.boundary=16,I.storage=w.byteLength):re("WebGLRenderer: Unsupported uniform value type.",w),I}function D(w){const I=w.target;I.removeEventListener("dispose",D);const U=f.indexOf(I.__bindingPointIndex);f.splice(U,1),r.deleteBuffer(l[I.id]),delete l[I.id],delete u[I.id]}function O(){for(const w in l)r.deleteBuffer(l[w]);f=[],l={},u={}}return{bind:m,update:d,dispose:O}}const vw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ki=null;function xw(){return Ki===null&&(Ki=new aT(vw,16,16,Js,xi),Ki.name="DFG_LUT",Ki.minFilter=Hn,Ki.magFilter=Hn,Ki.wrapS=Ca,Ki.wrapT=Ca,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}class Sw{constructor(t={}){const{canvas:i=Pb(),context:s=null,depth:l=!0,stencil:u=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:_=!1,outputBufferType:y=vi}=t;this.isWebGLRenderer=!0;let b;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=s.getContextAttributes().alpha}else b=f;const C=y,x=new Set([qp,Wp,Xp]),S=new Set([vi,na,dl,pl,Vp,kp]),D=new Uint32Array(4),O=new Int32Array(4),w=new J;let I=null,U=null;const F=[],T=[];let N=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ta,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const k=this;let G=!1,W=null,ut=null,ct=null,Z=null;this._outputColorSpace=gi;let B=0,H=0,$=null,_t=-1,Et=null;const P=new sn,K=new sn;let Mt=null;const Tt=new le(0);let Ut=0,at=i.width,yt=i.height,St=1,Gt=null,se=null;const $t=new sn(0,0,at,yt),Ge=new sn(0,0,at,yt);let fe=!1;const Pt=new jp;let Yt=!1,Kt=!1;const Te=new on,Ve=new J,Qe=new sn,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function $e(){return $===null?St:1}let q=s;function Le(A,Y){return i.getContext(A,Y)}try{const A={alpha:!0,depth:l,stencil:u,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Pp}`),i.addEventListener("webglcontextlost",tn,!1),i.addEventListener("webglcontextrestored",Oe,!1),i.addEventListener("webglcontextcreationerror",ii,!1),q===null){const Y="webgl2";if(q=Le(Y,A),q===null)throw Le(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw Ae("WebGLRenderer: "+A.message),A}let be,L,E,j,st,ht,At,Dt,ft,dt,Ct,zt,Ot,Lt,te,ee,oe,X,Rt,gt,wt,Bt,bt;function Zt(){be=new xR(q),be.init(),wt=new cw(q,be),L=new fR(q,be,t,wt),E=new lw(q,be),L.reversedDepthBuffer&&_&&E.buffers.depth.setReversed(!0),ut=q.createFramebuffer(),ct=q.createFramebuffer(),Z=q.createFramebuffer(),j=new yR(q),st=new ZC,ht=new uw(q,be,E,st,L,wt,j),At=new vR(k),Dt=new AT(q),Bt=new uR(q,Dt),ft=new SR(q,Dt,j,Bt),dt=new bR(q,ft,Dt,Bt,j),X=new ER(q,L,ht),te=new hR(st),Ct=new YC(k,At,be,L,Bt,te),zt=new gw(k,st),Ot=new QC,Lt=new nw(be),oe=new lR(k,At,E,dt,b,m),ee=new ow(k,dt,L),bt=new _w(q,j,L,E),Rt=new cR(q,be,j),gt=new MR(q,be,j),j.programs=Ct.programs,k.capabilities=L,k.extensions=be,k.properties=st,k.renderLists=Ot,k.shadowMap=ee,k.state=E,k.info=j}Zt(),C!==vi&&(N=new AR(C,i.width,i.height,p,l,u));const kt=new pw(k,q);this.xr=kt,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const A=be.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=be.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return St},this.setPixelRatio=function(A){A!==void 0&&(St=A,this.setSize(at,yt,!1))},this.getSize=function(A){return A.set(at,yt)},this.setSize=function(A,Y,rt=!0){if(kt.isPresenting){re("WebGLRenderer: Can't change size while VR device is presenting.");return}at=A,yt=Y,i.width=Math.floor(A*St),i.height=Math.floor(Y*St),rt===!0&&(i.style.width=A+"px",i.style.height=Y+"px"),N!==null&&N.setSize(i.width,i.height),this.setViewport(0,0,A,Y)},this.getDrawingBufferSize=function(A){return A.set(at*St,yt*St).floor()},this.setDrawingBufferSize=function(A,Y,rt){at=A,yt=Y,St=rt,i.width=Math.floor(A*rt),i.height=Math.floor(Y*rt),this.setViewport(0,0,A,Y)},this.setEffects=function(A){if(C===vi){Ae("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let Y=0;Y<A.length;Y++)if(A[Y].isOutputPass===!0){re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy($t)},this.setViewport=function(A,Y,rt,nt){A.isVector4?$t.set(A.x,A.y,A.z,A.w):$t.set(A,Y,rt,nt),E.viewport(P.copy($t).multiplyScalar(St).round())},this.getScissor=function(A){return A.copy(Ge)},this.setScissor=function(A,Y,rt,nt){A.isVector4?Ge.set(A.x,A.y,A.z,A.w):Ge.set(A,Y,rt,nt),E.scissor(K.copy(Ge).multiplyScalar(St).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(A){E.setScissorTest(fe=A)},this.setOpaqueSort=function(A){Gt=A},this.setTransparentSort=function(A){se=A},this.getClearColor=function(A){return A.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(A=!0,Y=!0,rt=!0){let nt=0;if(A){let it=!1;if($!==null){const It=$.texture.format;it=x.has(It)}if(it){const It=$.texture.type,Vt=S.has(It),Nt=oe.getClearColor(),Wt=oe.getClearAlpha(),Xt=Nt.r,ne=Nt.g,he=Nt.b;Vt?(D[0]=Xt,D[1]=ne,D[2]=he,D[3]=Wt,q.clearBufferuiv(q.COLOR,0,D)):(O[0]=Xt,O[1]=ne,O[2]=he,O[3]=Wt,q.clearBufferiv(q.COLOR,0,O))}else nt|=q.COLOR_BUFFER_BIT}Y&&(nt|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),rt&&(nt|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&q.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),W=A},this.dispose=function(){i.removeEventListener("webglcontextlost",tn,!1),i.removeEventListener("webglcontextrestored",Oe,!1),i.removeEventListener("webglcontextcreationerror",ii,!1),oe.dispose(),Ot.dispose(),Lt.dispose(),st.dispose(),At.dispose(),dt.dispose(),Bt.dispose(),bt.dispose(),Ct.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",hn),kt.removeEventListener("sessionend",wn),qn.stop()};function tn(A){A.preventDefault(),cv("WebGLRenderer: Context Lost."),G=!0}function Oe(){cv("WebGLRenderer: Context Restored."),G=!1;const A=j.autoReset,Y=ee.enabled,rt=ee.autoUpdate,nt=ee.needsUpdate,it=ee.type;Zt(),j.autoReset=A,ee.enabled=Y,ee.autoUpdate=rt,ee.needsUpdate=nt,ee.type=it}function ii(A){Ae("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ai(A){const Y=A.target;Y.removeEventListener("dispose",ai),uo(Y)}function uo(A){co(A),st.remove(A)}function co(A){const Y=st.get(A).programs;Y!==void 0&&(Y.forEach(function(rt){Ct.releaseProgram(rt)}),A.isShaderMaterial&&Ct.releaseShaderCache(A))}this.renderBufferDirect=function(A,Y,rt,nt,it,It){Y===null&&(Y=ke);const Vt=it.isMesh&&it.matrixWorld.determinantAffine()<0,Nt=Ia(A,Y,rt,nt,it);E.setMaterial(nt,Vt);let Wt=rt.index,Xt=1;if(nt.wireframe===!0){if(Wt=ft.getWireframeAttribute(rt),Wt===void 0)return;Xt=2}const ne=rt.drawRange,he=rt.attributes.position;let Jt=ne.start*Xt,Re=(ne.start+ne.count)*Xt;It!==null&&(Jt=Math.max(Jt,It.start*Xt),Re=Math.min(Re,(It.start+It.count)*Xt)),Wt!==null?(Jt=Math.max(Jt,0),Re=Math.min(Re,Wt.count)):he!=null&&(Jt=Math.max(Jt,0),Re=Math.min(Re,he.count));const en=Re-Jt;if(en<0||en===1/0)return;Bt.setup(it,nt,Nt,rt,Wt);let Ze,Ie=Rt;if(Wt!==null&&(Ze=Dt.get(Wt),Ie=gt,Ie.setIndex(Ze)),it.isMesh)nt.wireframe===!0?(E.setLineWidth(nt.wireframeLinewidth*$e()),Ie.setMode(q.LINES)):Ie.setMode(q.TRIANGLES);else if(it.isLine){let Fe=nt.linewidth;Fe===void 0&&(Fe=1),E.setLineWidth(Fe*$e()),it.isLineSegments?Ie.setMode(q.LINES):it.isLineLoop?Ie.setMode(q.LINE_LOOP):Ie.setMode(q.LINE_STRIP)}else it.isPoints?Ie.setMode(q.POINTS):it.isSprite&&Ie.setMode(q.TRIANGLES);if(it.isBatchedMesh)if(be.get("WEBGL_multi_draw"))Ie.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const Fe=it._multiDrawStarts,Ht=it._multiDrawCounts,In=it._multiDrawCount,_e=Wt?Dt.get(Wt).bytesPerElement:1,yn=st.get(nt).currentProgram.getUniforms();for(let si=0;si<In;si++)yn.setValue(q,"_gl_DrawID",si),Ie.render(Fe[si]/_e,Ht[si])}else if(it.isInstancedMesh)Ie.renderInstances(Jt,en,it.count);else if(rt.isInstancedBufferGeometry){const Fe=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Ht=Math.min(rt.instanceCount,Fe);Ie.renderInstances(Jt,en,Ht)}else Ie.render(Jt,en)};function fo(A,Y,rt){A.transparent===!0&&A.side===Ra&&A.forceSinglePass===!1?(A.side=ei,A.needsUpdate=!0,Oa(A,Y,rt),A.side=gs,A.needsUpdate=!0,Oa(A,Y,rt),A.side=Ra):Oa(A,Y,rt)}this.compile=function(A,Y,rt=null){rt===null&&(rt=A),U=Lt.get(rt),U.init(Y),T.push(U),rt.traverseVisible(function(it){it.isLight&&it.layers.test(Y.layers)&&(U.pushLight(it),it.castShadow&&U.pushShadow(it))}),A!==rt&&A.traverseVisible(function(it){it.isLight&&it.layers.test(Y.layers)&&(U.pushLight(it),it.castShadow&&U.pushShadow(it))}),U.setupLights();const nt=new Set;return A.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const It=it.material;if(It)if(Array.isArray(It))for(let Vt=0;Vt<It.length;Vt++){const Nt=It[Vt];fo(Nt,rt,it),nt.add(Nt)}else fo(It,rt,it),nt.add(It)}),U=T.pop(),nt},this.compileAsync=function(A,Y,rt=null){const nt=this.compile(A,Y,rt);return new Promise(it=>{function It(){if(nt.forEach(function(Vt){st.get(Vt).currentProgram.isReady()&&nt.delete(Vt)}),nt.size===0){it(A);return}setTimeout(It,10)}be.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let $s=null;function Vi(A){$s&&$s(A)}function hn(){qn.stop()}function wn(){qn.start()}const qn=new tS;qn.setAnimationLoop(Vi),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(A){$s=A,kt.setAnimationLoop(A),A===null?qn.stop():qn.start()},kt.addEventListener("sessionstart",hn),kt.addEventListener("sessionend",wn),this.render=function(A,Y){if(Y!==void 0&&Y.isCamera!==!0){Ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;W!==null&&W.renderStart(A,Y);const rt=kt.enabled===!0&&kt.isPresenting===!0,nt=N!==null&&($===null||rt)&&N.begin(k,$);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(Y),Y=kt.getCamera()),A.isScene===!0&&A.onBeforeRender(k,A,Y,$),U=Lt.get(A,T.length),U.init(Y),U.state.textureUnits=ht.getTextureUnits(),T.push(U),Te.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),Pt.setFromProjectionMatrix(Te,ji,Y.reversedDepth),Kt=this.localClippingEnabled,Yt=te.init(this.clippingPlanes,Kt),I=Ot.get(A,F.length),I.init(),F.push(I),kt.enabled===!0&&kt.isPresenting===!0){const Vt=k.xr.getDepthSensingMesh();Vt!==null&&Ss(Vt,Y,-1/0,k.sortObjects)}Ss(A,Y,0,k.sortObjects),I.finish(),k.sortObjects===!0&&I.sort(Gt,se,Y.reversedDepth),Ue=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,Ue&&oe.addToRenderList(I,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Yt===!0&&te.beginShadows();const it=U.state.shadowsArray;if(ee.render(it,A,Y),Yt===!0&&te.endShadows(),(nt&&N.hasRenderPass())===!1){const Vt=I.opaque,Nt=I.transmissive;if(U.setupLights(),Y.isArrayCamera){const Wt=Y.cameras;if(Nt.length>0)for(let Xt=0,ne=Wt.length;Xt<ne;Xt++){const he=Wt[Xt];El(Vt,Nt,A,he)}Ue&&oe.render(A);for(let Xt=0,ne=Wt.length;Xt<ne;Xt++){const he=Wt[Xt];yl(I,A,he,he.viewport)}}else Nt.length>0&&El(Vt,Nt,A,Y),Ue&&oe.render(A),yl(I,A,Y)}$!==null&&H===0&&(ht.updateMultisampleRenderTarget($),ht.updateRenderTargetMipmap($)),nt&&N.end(k),A.isScene===!0&&A.onAfterRender(k,A,Y),Bt.resetDefaultState(),_t=-1,Et=null,T.pop(),T.length>0?(U=T[T.length-1],ht.setTextureUnits(U.state.textureUnits),Yt===!0&&te.setGlobalState(k.clippingPlanes,U.state.camera)):U=null,F.pop(),F.length>0?I=F[F.length-1]:I=null,W!==null&&W.renderEnd()};function Ss(A,Y,rt,nt){if(A.visible===!1)return;if(A.layers.test(Y.layers)){if(A.isGroup)rt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Y);else if(A.isLightProbeGrid)U.pushLightProbeGrid(A);else if(A.isLight)U.pushLight(A),A.castShadow&&U.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Pt.intersectsSprite(A)){nt&&Qe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Te);const Vt=dt.update(A),Nt=A.material;Nt.visible&&I.push(A,Vt,Nt,rt,Qe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Pt.intersectsObject(A))){const Vt=dt.update(A),Nt=A.material;if(nt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Qe.copy(A.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),Qe.copy(Vt.boundingSphere.center)),Qe.applyMatrix4(A.matrixWorld).applyMatrix4(Te)),Array.isArray(Nt)){const Wt=Vt.groups;for(let Xt=0,ne=Wt.length;Xt<ne;Xt++){const he=Wt[Xt],Jt=Nt[he.materialIndex];Jt&&Jt.visible&&I.push(A,Vt,Jt,rt,Qe.z,he)}}else Nt.visible&&I.push(A,Vt,Nt,rt,Qe.z,null)}}const It=A.children;for(let Vt=0,Nt=It.length;Vt<Nt;Vt++)Ss(It[Vt],Y,rt,nt)}function yl(A,Y,rt,nt){const{opaque:it,transmissive:It,transparent:Vt}=A;U.setupLightsView(rt),Yt===!0&&te.setGlobalState(k.clippingPlanes,rt),nt&&E.viewport(P.copy(nt)),it.length>0&&Ms(it,Y,rt),It.length>0&&Ms(It,Y,rt),Vt.length>0&&Ms(Vt,Y,rt),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function El(A,Y,rt,nt){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[nt.id]===void 0){const Jt=be.has("EXT_color_buffer_half_float")||be.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[nt.id]=new ni(1,1,{generateMipmaps:!0,type:Jt?xi:vi,minFilter:Ys,samples:Math.max(4,L.samples),stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ye.workingColorSpace})}const It=U.state.transmissionRenderTarget[nt.id],Vt=nt.viewport||P;It.setSize(Vt.z*k.transmissionResolutionScale,Vt.w*k.transmissionResolutionScale);const Nt=k.getRenderTarget(),Wt=k.getActiveCubeFace(),Xt=k.getActiveMipmapLevel();k.setRenderTarget(It),k.getClearColor(Tt),Ut=k.getClearAlpha(),Ut<1&&k.setClearColor(16777215,.5),k.clear(),Ue&&oe.render(rt);const ne=k.toneMapping;k.toneMapping=ta;const he=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),U.setupLightsView(nt),Yt===!0&&te.setGlobalState(k.clippingPlanes,nt),Ms(A,rt,nt),ht.updateMultisampleRenderTarget(It),ht.updateRenderTargetMipmap(It),be.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let Re=0,en=Y.length;Re<en;Re++){const Ze=Y[Re],{object:Ie,geometry:Fe,material:Ht,group:In}=Ze;if(Ht.side===Ra&&Ie.layers.test(nt.layers)){const _e=Ht.side;Ht.side=ei,Ht.needsUpdate=!0,Pa(Ie,rt,nt,Fe,Ht,In),Ht.side=_e,Ht.needsUpdate=!0,Jt=!0}}Jt===!0&&(ht.updateMultisampleRenderTarget(It),ht.updateRenderTargetMipmap(It))}k.setRenderTarget(Nt,Wt,Xt),k.setClearColor(Tt,Ut),he!==void 0&&(nt.viewport=he),k.toneMapping=ne}function Ms(A,Y,rt){const nt=Y.isScene===!0?Y.overrideMaterial:null;for(let it=0,It=A.length;it<It;it++){const Vt=A[it],{object:Nt,geometry:Wt,group:Xt}=Vt;let ne=Vt.material;ne.allowOverride===!0&&nt!==null&&(ne=nt),Nt.layers.test(rt.layers)&&Pa(Nt,Y,rt,Wt,ne,Xt)}}function Pa(A,Y,rt,nt,it,It){A.onBeforeRender(k,Y,rt,nt,it,It),A.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),it.onBeforeRender(k,Y,rt,nt,A,It),it.transparent===!0&&it.side===Ra&&it.forceSinglePass===!1?(it.side=ei,it.needsUpdate=!0,k.renderBufferDirect(rt,Y,nt,it,A,It),it.side=gs,it.needsUpdate=!0,k.renderBufferDirect(rt,Y,nt,it,A,It),it.side=Ra):k.renderBufferDirect(rt,Y,nt,it,A,It),A.onAfterRender(k,Y,rt,nt,it,It)}function Oa(A,Y,rt){Y.isScene!==!0&&(Y=ke);const nt=st.get(A),it=U.state.lights,It=U.state.shadowsArray,Vt=it.state.version,Nt=Ct.getParameters(A,it.state,It,Y,rt,U.state.lightProbeGridArray),Wt=Ct.getProgramCacheKey(Nt);let Xt=nt.programs;nt.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?Y.environment:null,nt.fog=Y.fog;const ne=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;nt.envMap=At.get(A.envMap||nt.environment,ne),nt.envMapRotation=nt.environment!==null&&A.envMap===null?Y.environmentRotation:A.envMapRotation,Xt===void 0&&(A.addEventListener("dispose",ai),Xt=new Map,nt.programs=Xt);let he=Xt.get(Wt);if(he!==void 0){if(nt.currentProgram===he&&nt.lightsStateVersion===Vt)return aa(A,Nt),he}else Nt.uniforms=Ct.getUniforms(A),W!==null&&A.isNodeMaterial&&W.build(A,rt,Nt),A.onBeforeCompile(Nt,k),he=Ct.acquireProgram(Nt,Wt),Xt.set(Wt,he),nt.uniforms=Nt.uniforms;const Jt=nt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Jt.clippingPlanes=te.uniform),aa(A,Nt),nt.needsLights=bl(A),nt.lightsStateVersion=Vt,nt.needsLights&&(Jt.ambientLightColor.value=it.state.ambient,Jt.lightProbe.value=it.state.probe,Jt.directionalLights.value=it.state.directional,Jt.directionalLightShadows.value=it.state.directionalShadow,Jt.spotLights.value=it.state.spot,Jt.spotLightShadows.value=it.state.spotShadow,Jt.rectAreaLights.value=it.state.rectArea,Jt.ltc_1.value=it.state.rectAreaLTC1,Jt.ltc_2.value=it.state.rectAreaLTC2,Jt.pointLights.value=it.state.point,Jt.pointLightShadows.value=it.state.pointShadow,Jt.hemisphereLights.value=it.state.hemi,Jt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,Jt.spotLightMatrix.value=it.state.spotLightMatrix,Jt.spotLightMap.value=it.state.spotLightMap,Jt.pointShadowMatrix.value=it.state.pointShadowMatrix),nt.lightProbeGrid=U.state.lightProbeGridArray.length>0,nt.currentProgram=he,nt.uniformsList=null,he}function ia(A){if(A.uniformsList===null){const Y=A.currentProgram.getUniforms();A.uniformsList=gc.seqWithValue(Y.seq,A.uniforms)}return A.uniformsList}function aa(A,Y){const rt=st.get(A);rt.outputColorSpace=Y.outputColorSpace,rt.batching=Y.batching,rt.batchingColor=Y.batchingColor,rt.instancing=Y.instancing,rt.instancingColor=Y.instancingColor,rt.instancingMorph=Y.instancingMorph,rt.skinning=Y.skinning,rt.morphTargets=Y.morphTargets,rt.morphNormals=Y.morphNormals,rt.morphColors=Y.morphColors,rt.morphTargetsCount=Y.morphTargetsCount,rt.numClippingPlanes=Y.numClippingPlanes,rt.numIntersection=Y.numClipIntersection,rt.vertexAlphas=Y.vertexAlphas,rt.vertexTangents=Y.vertexTangents,rt.toneMapping=Y.toneMapping}function ys(A,Y){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;w.setFromMatrixPosition(Y.matrixWorld);for(let rt=0,nt=A.length;rt<nt;rt++){const it=A[rt];if(it.texture!==null&&it.boundingBox.containsPoint(w))return it}return null}function Ia(A,Y,rt,nt,it){Y.isScene!==!0&&(Y=ke),ht.resetTextureUnits();const It=Y.fog,Vt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?Y.environment:null,Nt=$===null?k.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ye.workingColorSpace,Wt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,Xt=At.get(nt.envMap||Vt,Wt),ne=nt.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,he=!!rt.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Jt=!!rt.morphAttributes.position,Re=!!rt.morphAttributes.normal,en=!!rt.morphAttributes.color;let Ze=ta;nt.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ze=k.toneMapping);const Ie=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Fe=Ie!==void 0?Ie.length:0,Ht=st.get(nt),In=U.state.lights;if(Yt===!0&&(Kt===!0||A!==Et)){const Ne=A===Et&&nt.id===_t;te.setState(nt,A,Ne)}let _e=!1;nt.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==In.state.version||Ht.outputColorSpace!==Nt||it.isBatchedMesh&&Ht.batching===!1||!it.isBatchedMesh&&Ht.batching===!0||it.isBatchedMesh&&Ht.batchingColor===!0&&it.colorTexture===null||it.isBatchedMesh&&Ht.batchingColor===!1&&it.colorTexture!==null||it.isInstancedMesh&&Ht.instancing===!1||!it.isInstancedMesh&&Ht.instancing===!0||it.isSkinnedMesh&&Ht.skinning===!1||!it.isSkinnedMesh&&Ht.skinning===!0||it.isInstancedMesh&&Ht.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&Ht.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&Ht.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&Ht.instancingMorph===!1&&it.morphTexture!==null||Ht.envMap!==Xt||nt.fog===!0&&Ht.fog!==It||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==te.numPlanes||Ht.numIntersection!==te.numIntersection)||Ht.vertexAlphas!==ne||Ht.vertexTangents!==he||Ht.morphTargets!==Jt||Ht.morphNormals!==Re||Ht.morphColors!==en||Ht.toneMapping!==Ze||Ht.morphTargetsCount!==Fe||!!Ht.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(_e=!0):(_e=!0,Ht.__version=nt.version);let yn=Ht.currentProgram;_e===!0&&(yn=Oa(nt,Y,it),W&&nt.isNodeMaterial&&W.onUpdateProgram(nt,yn,Ht));let si=!1,Ui=!1,ri=!1;const Be=yn.getUniforms(),nn=Ht.uniforms;if(E.useProgram(yn.program)&&(si=!0,Ui=!0,ri=!0),nt.id!==_t&&(_t=nt.id,Ui=!0),Ht.needsLights){const Ne=ys(U.state.lightProbeGridArray,it);Ht.lightProbeGrid!==Ne&&(Ht.lightProbeGrid=Ne,Ui=!0)}if(si||Et!==A){E.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Be.setValue(q,"projectionMatrix",A.projectionMatrix),Be.setValue(q,"viewMatrix",A.matrixWorldInverse);const ki=Be.map.cameraPosition;ki!==void 0&&ki.setValue(q,Ve.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&Be.setValue(q,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Be.setValue(q,"isOrthographic",A.isOrthographicCamera===!0),Et!==A&&(Et=A,Ui=!0,ri=!0)}if(Ht.needsLights&&(In.state.directionalShadowMap.length>0&&Be.setValue(q,"directionalShadowMap",In.state.directionalShadowMap,ht),In.state.spotShadowMap.length>0&&Be.setValue(q,"spotShadowMap",In.state.spotShadowMap,ht),In.state.pointShadowMap.length>0&&Be.setValue(q,"pointShadowMap",In.state.pointShadowMap,ht)),it.isSkinnedMesh){Be.setOptional(q,it,"bindMatrix"),Be.setOptional(q,it,"bindMatrixInverse");const Ne=it.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),Be.setValue(q,"boneTexture",Ne.boneTexture,ht))}it.isBatchedMesh&&(Be.setOptional(q,it,"batchingTexture"),Be.setValue(q,"batchingTexture",it._matricesTexture,ht),Be.setOptional(q,it,"batchingIdTexture"),Be.setValue(q,"batchingIdTexture",it._indirectTexture,ht),Be.setOptional(q,it,"batchingColorTexture"),it._colorsTexture!==null&&Be.setValue(q,"batchingColorTexture",it._colorsTexture,ht));const Li=rt.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&X.update(it,rt,yn),(Ui||Ht.receiveShadow!==it.receiveShadow)&&(Ht.receiveShadow=it.receiveShadow,Be.setValue(q,"receiveShadow",it.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&Y.environment!==null&&(nn.envMapIntensity.value=Y.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=xw()),Ui){if(Be.setValue(q,"toneMappingExposure",k.toneMappingExposure),Ht.needsLights&&dn(nn,ri),It&&nt.fog===!0&&zt.refreshFogUniforms(nn,It),zt.refreshMaterialUniforms(nn,nt,St,yt,U.state.transmissionRenderTarget[A.id]),Ht.needsLights&&Ht.lightProbeGrid){const Ne=Ht.lightProbeGrid;nn.probesSH.value=Ne.texture,nn.probesMin.value.copy(Ne.boundingBox.min),nn.probesMax.value.copy(Ne.boundingBox.max),nn.probesResolution.value.copy(Ne.resolution)}gc.upload(q,ia(Ht),nn,ht)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(gc.upload(q,ia(Ht),nn,ht),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Be.setValue(q,"center",it.center),Be.setValue(q,"modelViewMatrix",it.modelViewMatrix),Be.setValue(q,"normalMatrix",it.normalMatrix),Be.setValue(q,"modelMatrix",it.matrixWorld),nt.uniformsGroups!==void 0){const Ne=nt.uniformsGroups;for(let ki=0,Fa=Ne.length;ki<Fa;ki++){const Es=Ne[ki];bt.update(Es,yn),bt.bind(Es,yn)}}return yn}function dn(A,Y){A.ambientLightColor.needsUpdate=Y,A.lightProbe.needsUpdate=Y,A.directionalLights.needsUpdate=Y,A.directionalLightShadows.needsUpdate=Y,A.pointLights.needsUpdate=Y,A.pointLightShadows.needsUpdate=Y,A.spotLights.needsUpdate=Y,A.spotLightShadows.needsUpdate=Y,A.rectAreaLights.needsUpdate=Y,A.hemisphereLights.needsUpdate=Y}function bl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(A,Y,rt){const nt=st.get(A);nt.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),st.get(A.texture).__webglTexture=Y,st.get(A.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:rt,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Y){const rt=st.get(A);rt.__webglFramebuffer=Y,rt.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(A,Y=0,rt=0){$=A,B=Y,H=rt;let nt=null,it=!1,It=!1;if(A){const Nt=st.get(A);if(Nt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(q.FRAMEBUFFER,Nt.__webglFramebuffer),P.copy(A.viewport),K.copy(A.scissor),Mt=A.scissorTest,E.viewport(P),E.scissor(K),E.setScissorTest(Mt),_t=-1;return}else if(Nt.__webglFramebuffer===void 0)ht.setupRenderTarget(A);else if(Nt.__hasExternalTextures)ht.rebindTextures(A,st.get(A.texture).__webglTexture,st.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ne=A.depthTexture;if(Nt.__boundDepthTexture!==ne){if(ne!==null&&st.has(ne)&&(A.width!==ne.image.width||A.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ht.setupDepthRenderbuffer(A)}}const Wt=A.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(It=!0);const Xt=st.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Xt[Y])?nt=Xt[Y][rt]:nt=Xt[Y],it=!0):A.samples>0&&ht.useMultisampledRTT(A)===!1?nt=st.get(A).__webglMultisampledFramebuffer:Array.isArray(Xt)?nt=Xt[rt]:nt=Xt,P.copy(A.viewport),K.copy(A.scissor),Mt=A.scissorTest}else P.copy($t).multiplyScalar(St).floor(),K.copy(Ge).multiplyScalar(St).floor(),Mt=fe;if(rt!==0&&(nt=ut),E.bindFramebuffer(q.FRAMEBUFFER,nt)&&E.drawBuffers(A,nt),E.viewport(P),E.scissor(K),E.setScissorTest(Mt),it){const Nt=st.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Nt.__webglTexture,rt)}else if(It){const Nt=Y;for(let Wt=0;Wt<A.textures.length;Wt++){const Xt=st.get(A.textures[Wt]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Wt,Xt.__webglTexture,rt,Nt)}}else if(A!==null&&rt!==0){const Nt=st.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Nt.__webglTexture,rt)}_t=-1},this.readRenderTargetPixels=function(A,Y,rt,nt,it,It,Vt,Nt=0){if(!(A&&A.isWebGLRenderTarget)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Wt=st.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Vt!==void 0&&(Wt=Wt[Vt]),Wt){E.bindFramebuffer(q.FRAMEBUFFER,Wt);try{const Xt=A.textures[Nt],ne=Xt.format,he=Xt.type;if(A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Nt),!L.textureFormatReadable(ne)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(he)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=A.width-nt&&rt>=0&&rt<=A.height-it&&q.readPixels(Y,rt,nt,it,wt.convert(ne),wt.convert(he),It)}finally{const Xt=$!==null?st.get($).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(A,Y,rt,nt,it,It,Vt,Nt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Wt=st.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Vt!==void 0&&(Wt=Wt[Vt]),Wt)if(Y>=0&&Y<=A.width-nt&&rt>=0&&rt<=A.height-it){E.bindFramebuffer(q.FRAMEBUFFER,Wt);const Xt=A.textures[Nt],ne=Xt.format,he=Xt.type;if(A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Nt),!L.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(he))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Jt=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Jt),q.bufferData(q.PIXEL_PACK_BUFFER,It.byteLength,q.STREAM_READ),q.readPixels(Y,rt,nt,it,wt.convert(ne),wt.convert(he),0);const Re=$!==null?st.get($).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,Re);const en=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await Ob(q,en,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Jt),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,It),q.deleteBuffer(Jt),q.deleteSync(en),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Y=null,rt=0){const nt=Math.pow(2,-rt),it=Math.floor(A.image.width*nt),It=Math.floor(A.image.height*nt),Vt=Y!==null?Y.x:0,Nt=Y!==null?Y.y:0;ht.setTexture2D(A,0),q.copyTexSubImage2D(q.TEXTURE_2D,rt,0,0,Vt,Nt,it,It),E.unbindTexture()},this.copyTextureToTexture=function(A,Y,rt=null,nt=null,it=0,It=0){let Vt,Nt,Wt,Xt,ne,he,Jt,Re,en;const Ze=A.isCompressedTexture?A.mipmaps[It]:A.image;if(rt!==null)Vt=rt.max.x-rt.min.x,Nt=rt.max.y-rt.min.y,Wt=rt.isBox3?rt.max.z-rt.min.z:1,Xt=rt.min.x,ne=rt.min.y,he=rt.isBox3?rt.min.z:0;else{const nn=Math.pow(2,-it);Vt=Math.floor(Ze.width*nn),Nt=Math.floor(Ze.height*nn),A.isDataArrayTexture?Wt=Ze.depth:A.isData3DTexture?Wt=Math.floor(Ze.depth*nn):Wt=1,Xt=0,ne=0,he=0}nt!==null?(Jt=nt.x,Re=nt.y,en=nt.z):(Jt=0,Re=0,en=0);const Ie=wt.convert(Y.format),Fe=wt.convert(Y.type);let Ht;Y.isData3DTexture?(ht.setTexture3D(Y,0),Ht=q.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(ht.setTexture2DArray(Y,0),Ht=q.TEXTURE_2D_ARRAY):(ht.setTexture2D(Y,0),Ht=q.TEXTURE_2D),E.activeTexture(q.TEXTURE0),E.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,Y.flipY),E.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),E.pixelStorei(q.UNPACK_ALIGNMENT,Y.unpackAlignment);const In=E.getParameter(q.UNPACK_ROW_LENGTH),_e=E.getParameter(q.UNPACK_IMAGE_HEIGHT),yn=E.getParameter(q.UNPACK_SKIP_PIXELS),si=E.getParameter(q.UNPACK_SKIP_ROWS),Ui=E.getParameter(q.UNPACK_SKIP_IMAGES);E.pixelStorei(q.UNPACK_ROW_LENGTH,Ze.width),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ze.height),E.pixelStorei(q.UNPACK_SKIP_PIXELS,Xt),E.pixelStorei(q.UNPACK_SKIP_ROWS,ne),E.pixelStorei(q.UNPACK_SKIP_IMAGES,he);const ri=A.isDataArrayTexture||A.isData3DTexture,Be=Y.isDataArrayTexture||Y.isData3DTexture;if(A.isDepthTexture){const nn=st.get(A),Li=st.get(Y),Ne=st.get(nn.__renderTarget),ki=st.get(Li.__renderTarget);E.bindFramebuffer(q.READ_FRAMEBUFFER,Ne.__webglFramebuffer),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Fa=0;Fa<Wt;Fa++)ri&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,st.get(A).__webglTexture,it,he+Fa),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,st.get(Y).__webglTexture,It,en+Fa)),q.blitFramebuffer(Xt,ne,Vt,Nt,Jt,Re,Vt,Nt,q.DEPTH_BUFFER_BIT,q.NEAREST);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(it!==0||A.isRenderTargetTexture||st.has(A)){const nn=st.get(A),Li=st.get(Y);E.bindFramebuffer(q.READ_FRAMEBUFFER,ct),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,Z);for(let Ne=0;Ne<Wt;Ne++)ri?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,nn.__webglTexture,it,he+Ne):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,nn.__webglTexture,it),Be?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Li.__webglTexture,It,en+Ne):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Li.__webglTexture,It),it!==0?q.blitFramebuffer(Xt,ne,Vt,Nt,Jt,Re,Vt,Nt,q.COLOR_BUFFER_BIT,q.NEAREST):Be?q.copyTexSubImage3D(Ht,It,Jt,Re,en+Ne,Xt,ne,Vt,Nt):q.copyTexSubImage2D(Ht,It,Jt,Re,Xt,ne,Vt,Nt);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Be?A.isDataTexture||A.isData3DTexture?q.texSubImage3D(Ht,It,Jt,Re,en,Vt,Nt,Wt,Ie,Fe,Ze.data):Y.isCompressedArrayTexture?q.compressedTexSubImage3D(Ht,It,Jt,Re,en,Vt,Nt,Wt,Ie,Ze.data):q.texSubImage3D(Ht,It,Jt,Re,en,Vt,Nt,Wt,Ie,Fe,Ze):A.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,It,Jt,Re,Vt,Nt,Ie,Fe,Ze.data):A.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,It,Jt,Re,Ze.width,Ze.height,Ie,Ze.data):q.texSubImage2D(q.TEXTURE_2D,It,Jt,Re,Vt,Nt,Ie,Fe,Ze);E.pixelStorei(q.UNPACK_ROW_LENGTH,In),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,_e),E.pixelStorei(q.UNPACK_SKIP_PIXELS,yn),E.pixelStorei(q.UNPACK_SKIP_ROWS,si),E.pixelStorei(q.UNPACK_SKIP_IMAGES,Ui),It===0&&Y.generateMipmaps&&q.generateMipmap(Ht),E.unbindTexture()},this.initRenderTarget=function(A){st.get(A).__webglFramebuffer===void 0&&ht.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ht.setTextureCube(A,0):A.isData3DTexture?ht.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ht.setTexture2DArray(A,0):ht.setTexture2D(A,0),E.unbindTexture()},this.resetState=function(){B=0,H=0,$=null,E.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=ye._getDrawingBufferColorSpace(t),i.unpackColorSpace=ye._getUnpackColorSpace()}}const sx={type:"change"},em={type:"start"},lS={type:"end"},sc=new Jp,rx=new ds,Mw=Math.cos(70*Bb.DEG2RAD),bn=new J,ti=2*Math.PI,Ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},wd=1e-6;class yw extends bT{constructor(t,i=null){super(t,i),this.state=Ye.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yr.ROTATE,MIDDLE:Yr.DOLLY,RIGHT:Yr.PAN},this.touches={ONE:Wr.ROTATE,TWO:Wr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new _s,this._lastTargetPosition=new J,this._quat=new _s().setFromUnitVectors(t.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Pv,this._sphericalDelta=new Pv,this._scale=1,this._panOffset=new J,this._rotateStart=new jt,this._rotateEnd=new jt,this._rotateDelta=new jt,this._panStart=new jt,this._panEnd=new jt,this._panDelta=new jt,this._dollyStart=new jt,this._dollyEnd=new jt,this._dollyDelta=new jt,this._dollyDirection=new J,this._mouse=new jt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=bw.bind(this),this._onPointerDown=Ew.bind(this),this._onPointerUp=Tw.bind(this),this._onContextMenu=Lw.bind(this),this._onMouseWheel=Cw.bind(this),this._onKeyDown=ww.bind(this),this._onTouchStart=Dw.bind(this),this._onTouchMove=Uw.bind(this),this._onMouseDown=Aw.bind(this),this._onMouseMove=Rw.bind(this),this._interceptControlDown=Nw.bind(this),this._interceptControlUp=Pw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sx),this.update(),this.state=Ye.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;bn.copy(i).sub(this.target),bn.applyQuaternion(this._quat),this._spherical.setFromVector3(bn),this.autoRotate&&this.state===Ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=ti:s>Math.PI&&(s-=ti),l<-Math.PI?l+=ti:l>Math.PI&&(l-=ti),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=f!=this._spherical.radius}if(bn.setFromSpherical(this._spherical),bn.applyQuaternion(this._quatInverse),i.copy(this.target).add(bn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const p=bn.length();f=this._clampDistance(p*this._scale);const m=p-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),u=!!m}else if(this.object.isOrthographicCamera){const p=new J(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=m!==this.object.zoom;const d=new J(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(p),this.object.updateMatrixWorld(),f=bn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(sc.origin.copy(this.object.position),sc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(sc.direction))<Mw?this.object.lookAt(this.target):(rx.setFromNormalAndCoplanarPoint(this.object.up,this.target),sc.intersectPlane(rx,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>wd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>wd||this._lastTargetPosition.distanceToSquared(this.target)>wd?(this.dispatchEvent(sx),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ti/60*this.autoRotateSpeed*t:ti/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){bn.setFromMatrixColumn(i,0),bn.multiplyScalar(-t),this._panOffset.add(bn)}_panUp(t,i){this.screenSpacePanning===!0?bn.setFromMatrixColumn(i,1):(bn.setFromMatrixColumn(i,0),bn.crossVectors(this.object.up,bn)),bn.multiplyScalar(t),this._panOffset.add(bn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;bn.copy(l).sub(this.target);let u=bn.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*u/s.clientHeight,this.object.matrix),this._panUp(2*i*u/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,u=i-s.top,f=s.width,p=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(u/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,u=Math.sqrt(s*s+l*l);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),u=.5*(t.pageY+s.y);this._rotateEnd.set(l,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,u=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(f,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new jt,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function Ew(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function bw(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Tw(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lS),this.state=Ye.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function Aw(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Yr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Ye.DOLLY;break;case Yr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Ye.ROTATE}break;case Yr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Ye.PAN}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(em)}function Rw(r){switch(this.state){case Ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Cw(r){this.enabled===!1||this.enableZoom===!1||this.state!==Ye.NONE||(r.preventDefault(),this.dispatchEvent(em),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(lS))}function ww(r){this.enabled!==!1&&this._handleKeyDown(r)}function Dw(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Wr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Ye.TOUCH_ROTATE;break;case Wr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Ye.TOUCH_PAN;break;default:this.state=Ye.NONE}break;case 2:switch(this.touches.TWO){case Wr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Ye.TOUCH_DOLLY_PAN;break;case Wr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Ye.TOUCH_DOLLY_ROTATE;break;default:this.state=Ye.NONE}break;default:this.state=Ye.NONE}this.state!==Ye.NONE&&this.dispatchEvent(em)}function Uw(r){switch(this._trackPointer(r),this.state){case Ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Ye.NONE}}function Lw(r){this.enabled!==!1&&r.preventDefault()}function Nw(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Pw(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const _c={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class lo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ow=new Oc(-1,1,1,-1,0,1);class Iw extends Wn{constructor(){super(),this.setAttribute("position",new Mn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Mn([0,2,0,0,2,0],2))}}const Fw=new Iw;class nm{constructor(t){this._mesh=new Sn(Fw,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ow)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Bw extends lo{constructor(t,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,t instanceof Gn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gl.clone(t.uniforms),this.material=new Gn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new nm(this.material)}render(t,i,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ox extends lo{constructor(t,i){super(),this.scene=t,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,i,s){const l=t.getContext(),u=t.state;u.buffers.color.setMask(!1),u.buffers.depth.setMask(!1),u.buffers.color.setLocked(!0),u.buffers.depth.setLocked(!0);let f,p;this.inverse?(f=0,p=1):(f=1,p=0),u.buffers.stencil.setTest(!0),u.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),u.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),u.buffers.stencil.setClear(p),u.buffers.stencil.setLocked(!0),t.setRenderTarget(s),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),u.buffers.color.setLocked(!1),u.buffers.depth.setLocked(!1),u.buffers.color.setMask(!0),u.buffers.depth.setMask(!0),u.buffers.stencil.setLocked(!1),u.buffers.stencil.setFunc(l.EQUAL,1,4294967295),u.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),u.buffers.stencil.setLocked(!0)}}class zw extends lo{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Hw{constructor(t,i){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),i===void 0){const s=t.getSize(new jt);this._width=s.width,this._height=s.height,i=new ni(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xi}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Bw(_c),this.copyPass.material.blending=$i,this.timer=new MT}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,i){this.passes.splice(i,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const i=this.passes.indexOf(t);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(t){for(let i=t+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const i=this.renderer.getRenderTarget();let s=!1;for(let l=0,u=this.passes.length;l<u;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,s),f.needsSwap){if(s){const p=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(p.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),m.setFunc(p.EQUAL,1,4294967295)}this.swapBuffers()}ox!==void 0&&(f instanceof ox?s=!0:f instanceof zw&&(s=!1))}}this.renderer.setRenderTarget(i)}reset(t){if(t===void 0){const i=this.renderer.getSize(new jt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,i){this._width=t,this._height=i;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let u=0;u<this.passes.length;u++)this.passes[u].setSize(s,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Gw extends lo{constructor(t,i,s=null,l=null,u=null){super(),this.scene=t,this.camera=i,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=u,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new le}render(t,i,s){const l=t.autoClear;t.autoClear=!1;let u,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(u=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(u),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const Vw={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new le(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class io extends lo{constructor(t,i=1,s,l){super(),this.strength=i,this.radius=s,this.threshold=l,this.resolution=t!==void 0?new jt(t.x,t.y):new jt(256,256),this.clearColor=new le(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let u=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);this.renderTargetBright=new ni(u,f,{type:xi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let g=0;g<this.nMips;g++){const v=new ni(u,f,{type:xi});v.texture.name="UnrealBloomPass.h"+g,v.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(v);const _=new ni(u,f,{type:xi});_.texture.name="UnrealBloomPass.v"+g,_.texture.generateMipmaps=!1,this.renderTargetsVertical.push(_),u=Math.round(u/2),f=Math.round(f/2)}const p=Vw;this.highPassUniforms=gl.clone(p.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Gn({uniforms:this.highPassUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader}),this.separableBlurMaterials=[];const m=[6,10,14,18,22];u=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);for(let g=0;g<this.nMips;g++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(m[g])),this.separableBlurMaterials[g].uniforms.invSize.value=new jt(1/u,1/f),u=Math.round(u/2),f=Math.round(f/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gl.clone(_c.uniforms),this.blendMaterial=new Gn({uniforms:this.copyUniforms,vertexShader:_c.vertexShader,fragmentShader:_c.fragmentShader,premultipliedAlpha:!0,blending:Sc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new le,this._oldClearAlpha=1,this._basic=new Ks,this._fsQuad=new nm(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,i){let s=Math.round(t/2),l=Math.round(i/2);this.renderTargetBright.setSize(s,l);for(let u=0;u<this.nMips;u++)this.renderTargetsHorizontal[u].setSize(s,l),this.renderTargetsVertical[u].setSize(s,l),this.separableBlurMaterials[u].uniforms.invSize.value=new jt(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2)}render(t,i,s,l,u){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const f=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),u&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let p=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this._fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=p.texture,this.separableBlurMaterials[m].uniforms.direction.value=io.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[m]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=io.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[m]),t.clear(),this._fsQuad.render(t),p=this.renderTargetsVertical[m];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,u&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=f}_getSeparableBlurMaterial(t){const i=[],s=t/3;for(let l=0;l<t;l++)i.push(.39894*Math.exp(-.5*l*l/(s*s))/s);return new Gn({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new jt(.5,.5)},direction:{value:new jt(.5,.5)},gaussianCoefficients:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Gn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}io.BlurDirectionX=new jt(1,0);io.BlurDirectionY=new jt(0,1);const rc={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class kw extends lo{constructor(){super(),this.isOutputPass=!0,this.uniforms=gl.clone(rc.uniforms),this.material=new Jx({name:rc.name,uniforms:this.uniforms,vertexShader:rc.vertexShader,fragmentShader:rc.fragmentShader}),this._fsQuad=new nm(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,i,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ye.getTransfer(this._outputColorSpace)===Pe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Op?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ip?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Lc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===zp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Hp?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Bp&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function lx(r,t,i=1,s="roughness"){const l=document.createElement("canvas");l.width=r,l.height=t;const u=l.getContext("2d");if(!u)return l;const f=u.createImageData(r,t);for(let p=0;p<t;p++)for(let m=0;m<r;m++){const d=(p*r+m)*4;let g;s==="roughness"?g=100+Math.random()*80+Math.sin(m/i)*20+Math.cos(p/i)*20:s==="normal"?g=128+(Math.random()-.5)*40:s==="metal"?g=Math.sin(m/i)+Math.cos(p/i)>0?220:30:g=Math.random()*255,g=Math.max(0,Math.min(255,g)),f.data[d]=g,f.data[d+1]=s==="normal"?128+(Math.random()-.5)*30:g,f.data[d+2]=s==="normal"?255:g,f.data[d+3]=255}return u.putImageData(f,0,0),l}function Xw(r){const t=document.createElement("canvas");t.width=r,t.height=r;const i=t.getContext("2d");if(!i)return t;i.fillStyle="#0a0a12",i.fillRect(0,0,r,r),i.strokeStyle="#0ff",i.lineWidth=1,i.globalAlpha=.3;const s=r/20;for(let l=0;l<=r;l+=s)i.beginPath(),i.moveTo(l,0),i.lineTo(l,r),i.stroke(),i.beginPath(),i.moveTo(0,l),i.lineTo(r,l),i.stroke();return i.globalAlpha=.6,i.strokeStyle="#f0f",i.lineWidth=2,i.beginPath(),i.moveTo(0,r/2),i.lineTo(r,r/2),i.stroke(),i.strokeStyle="#0ff",i.beginPath(),i.moveTo(r/2,0),i.lineTo(r/2,r),i.stroke(),t}function Ww(){const r=document.createElement("canvas");r.width=512,r.height=512;const t=r.getContext("2d");if(!t)return r;const i=t.createLinearGradient(0,0,0,512);i.addColorStop(0,"#000011"),i.addColorStop(.5,"#0a001a"),i.addColorStop(1,"#000000"),t.fillStyle=i,t.fillRect(0,0,512,512);for(let s=0;s<300;s++)t.fillStyle=Math.random()>.9?"#0ff":"#fff",t.globalAlpha=Math.random()*.8,t.fillRect(Math.random()*512,Math.random()*512,Math.random()*2,Math.random()*2);return t.globalAlpha=1,r}function qw(){const r=mt.useRef(null),[t,i]=mt.useState(0),[s,l]=mt.useState(!1);return mt.useEffect(()=>{const u=r.current;if(!u)return;let f=!1,p=0;const m=Pt=>{f||i(Pt)};m(10);const d=new Sw({antialias:!0,alpha:!1});d.setSize(u.clientWidth,u.clientHeight),d.setPixelRatio(Math.min(window.devicePixelRatio,2)),d.shadowMap.enabled=!0,d.shadowMap.type=Ux,d.toneMapping=Lc,d.toneMappingExposure=1.2,d.outputColorSpace=gi,u.appendChild(d.domElement);const g=new jb;g.fog=new Qp(131589,.015);const v=new _i(45,u.clientWidth/u.clientHeight,.1,1e3);v.position.set(8,5,12);const _=new yw(v,d.domElement);_.enableDamping=!0,_.dampingFactor=.05,_.maxPolarAngle=Math.PI/2-.05,_.minDistance=3,_.maxDistance=30,_.target.set(0,2,0),m(25);const y=new tc(lx(512,512,8,"roughness"));y.wrapS=y.wrapT=Kr,y.repeat.set(4,4);const b=new tc(lx(512,512,8,"normal"));b.wrapS=b.wrapT=Kr,b.repeat.set(4,4);const C=new tc(Xw(512));C.wrapS=C.wrapT=Kr,C.repeat.set(8,8);const x=new tc(Ww());x.mapping=cc,m(40);const S=new Mp(d),D=S.fromEquirectangular(x).texture;g.environment=D,g.background=new le(131589),m(50),g.add(new vT(4210784,.3));const O=new Nv(16755438,2);O.position.set(-5,10,-5),O.castShadow=!0,O.shadow.mapSize.width=2048,O.shadow.mapSize.height=2048,O.shadow.camera.near=.5,O.shadow.camera.far=50,O.shadow.camera.left=-20,O.shadow.camera.right=20,O.shadow.camera.top=20,O.shadow.camera.bottom=-20,O.shadow.bias=-1e-4,g.add(O);const w=new Nv(65535,.5);w.position.set(5,3,5),g.add(w);const I=new gT(16711935,3,20);I.position.set(0,8,-8),g.add(I),m(60);const U=new Xs({map:C,normalMap:b,roughnessMap:y,roughness:.3,metalness:.7,envMap:D,envMapIntensity:.5}),F=new Sn(new eo(60,60),U);F.rotation.x=-Math.PI/2,F.receiveShadow=!0,g.add(F),m(70);const T=new qr,N=new Xs({color:1118488,roughness:.2,metalness:.9,envMap:D,envMapIntensity:1}),k=new Xs({color:65535,emissive:65535,emissiveIntensity:2,roughness:.1,metalness:0}),G=new Xs({color:16711935,emissive:16711935,emissiveIntensity:2,roughness:.1,metalness:0}),W=new eo(.8,1.2);function ut(Pt,Yt,Kt,Te,Ve){const Qe=new js(Kt,Te,Ve),ke=new Sn(Qe,N);ke.position.set(Pt,Te/2,Yt),ke.castShadow=!0,ke.receiveShadow=!0,T.add(ke);const Ue=Math.floor(Te/3),$e=Math.floor(Kt/2);for(let L=1;L<Ue;L++)for(let E=0;E<$e;E++)if(Math.random()>.4){const j=Math.random()>.5?k:G,st=new Sn(W,j);st.position.set(Pt-Kt/2+1+E*2,L*3,Yt+Ve/2+.01),T.add(st)}const q=new js(Kt+.1,Te+.1,Ve+.1),Le=new Ks({color:Math.random()>.5?65535:16711935,wireframe:!0,transparent:!0,opacity:.15}),be=new Sn(q,Le);be.position.set(Pt,Te/2,Yt),T.add(be)}for(let Pt=0;Pt<40;Pt++){const Yt=Math.random()*Math.PI*2,Kt=8+Math.random()*25,Te=Math.cos(Yt)*Kt,Ve=Math.sin(Yt)*Kt,Qe=2+Math.random()*4,ke=5+Math.random()*20,Ue=2+Math.random()*4;ut(Te,Ve,Qe,ke,Ue)}g.add(T),m(80);const ct=new qr,Z=new Xs({color:657930,roughness:.1,metalness:1,envMap:D,envMapIntensity:1.5}),B=new Sn(new Ac(2,2.5,.5,32),Z);B.position.y=.25,B.castShadow=!0,B.receiveShadow=!0,ct.add(B);const H=new hT({color:65535,emissive:65535,emissiveIntensity:3,roughness:0,metalness:.1,transmission:.6,thickness:1,envMap:D}),$=new Sn(new Rc(.8,64,64),H);$.position.y=2.5,ct.add($);const _t=new Xs({color:1118481,roughness:.2,metalness:.95,envMap:D,envMapIntensity:1.2});for(let Pt=0;Pt<8;Pt++){const Yt=Pt/8*Math.PI*2,Kt=new Sn(new Ac(.08,.04,3,8),_t);Kt.position.set(Math.cos(Yt)*1.2,1.5,Math.sin(Yt)*1.2),Kt.rotation.z=Math.cos(Yt)*.5,Kt.rotation.x=Math.sin(Yt)*.5,Kt.castShadow=!0,ct.add(Kt);const Te=new Sn(new Rc(.1,16,16),new Ks({color:Pt%2===0?65535:16711935}));Te.position.set(0,-1.5,0),Kt.add(Te)}const Et=new Sn(new $p(1.2,.05,16,100),new Ks({color:16711935}));Et.position.y=2.5,Et.rotation.x=Math.PI/2,ct.add(Et);const P=Et.clone();P.scale.set(1.5,1.5,1.5),P.rotation.x=Math.PI/3,P.material=new Ks({color:65535}),ct.add(P),g.add(ct);const K=2e3,Mt=new Wn,Tt=new Float32Array(K*3),Ut=new Float32Array(K*3);for(let Pt=0;Pt<K;Pt++){Tt[Pt*3]=(Math.random()-.5)*50,Tt[Pt*3+1]=Math.random()*20,Tt[Pt*3+2]=(Math.random()-.5)*50;const Yt=Math.random()>.5?new le(65535):new le(16711935);Ut[Pt*3]=Yt.r,Ut[Pt*3+1]=Yt.g,Ut[Pt*3+2]=Yt.b}Mt.setAttribute("position",new wi(Tt,3)),Mt.setAttribute("color",new wi(Ut,3));const at=new Yx({size:.05,vertexColors:!0,transparent:!0,opacity:.8,blending:Sc}),yt=new Av(Mt,at);g.add(yt),m(90);const St=new Hw(d);St.addPass(new Gw(g,v));const Gt=new io(new jt(u.clientWidth,u.clientHeight),.6,.4,.85);St.addPass(Gt),St.addPass(new kw),m(100);const se=setTimeout(()=>{f||l(!0)},500),$t=new ET;function Ge(){if(f)return;p=requestAnimationFrame(Ge);const Pt=$t.getElapsedTime();_.update(),Et.rotation.z=Pt*.5,P.rotation.z=-Pt*.3,P.rotation.x=Math.PI/3+Math.sin(Pt)*.1,$.scale.setScalar(1+Math.sin(Pt*2)*.05),H.emissiveIntensity=2+Math.sin(Pt*3)*1;const Yt=Mt.attributes.position.array;for(let Kt=0;Kt<K;Kt++)Yt[Kt*3+1]+=Math.sin(Pt+Yt[Kt*3])*.01,Yt[Kt*3+1]>20&&(Yt[Kt*3+1]=0);Mt.attributes.position.needsUpdate=!0,I.position.x=Math.sin(Pt*.5)*10,I.position.z=Math.cos(Pt*.5)*10,St.render()}Ge();const fe=()=>{const Pt=u.clientWidth,Yt=u.clientHeight;v.aspect=Pt/Yt,v.updateProjectionMatrix(),d.setSize(Pt,Yt),St.setSize(Pt,Yt)};return window.addEventListener("resize",fe),()=>{f=!0,cancelAnimationFrame(p),clearTimeout(se),window.removeEventListener("resize",fe),_.dispose(),St.dispose(),S.dispose(),D.dispose(),g.traverse(Pt=>{if(Pt instanceof Sn||Pt instanceof Av){Pt.geometry?.dispose();const Yt=Pt.material;Array.isArray(Yt)?Yt.forEach(Kt=>Kt.dispose()):Yt?.dispose()}}),[y,b,C,x].forEach(Pt=>Pt.dispose()),d.dispose(),d.domElement.parentElement===u&&u.removeChild(d.domElement)}},[]),xn.jsxs("div",{className:"fixed inset-0 z-40 bg-black",children:[xn.jsx("div",{ref:r,className:"absolute inset-0"}),xn.jsxs("div",{className:"absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000",style:{opacity:s?0:1,pointerEvents:s?"none":"auto"},children:[xn.jsx("h2",{className:"mb-5 animate-pulse text-2xl font-bold tracking-[0.3em] text-cyan-300 md:text-3xl",style:{textShadow:"0 0 20px #0ff",fontFamily:"monospace"},children:"CYBERPUNK REALTIME"}),xn.jsx("div",{className:"h-[3px] w-[300px] overflow-hidden rounded-sm bg-[#111]",children:xn.jsx("div",{className:"h-full transition-all duration-300",style:{width:`${t}%`,background:"linear-gradient(90deg, #0ff, #f0f)",boxShadow:"0 0 10px #0ff"}})}),xn.jsx("p",{className:"mt-4 text-xs text-neutral-500",children:"جاري بناء المشهد الواقعي..."})]}),xn.jsxs("div",{className:"pointer-events-none absolute right-5 top-5 z-10 text-cyan-300",style:{textShadow:"0 0 10px #0ff"},children:[xn.jsx("h1",{className:"mb-2 text-lg font-bold tracking-[0.2em]",style:{fontFamily:"monospace"},children:"CYBERPUNK 3D"}),xn.jsxs("p",{className:"text-xs leading-7 text-neutral-400",dir:"rtl",children:["محرك: Three.js WebGL2",xn.jsx("br",{}),"إضاءة: PBR + HDRi",xn.jsx("br",{}),"تأثير: Bloom + Tone Mapping",xn.jsx("br",{}),"الظلال: PCF Soft Shadows"]})]}),xn.jsx(Np,{to:"/arcade",className:"absolute left-5 top-5 z-10 rounded-full border border-cyan-400/30 bg-black/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 no-underline backdrop-blur transition hover:border-cyan-300 hover:text-white",style:{textShadow:"0 0 10px #0ff"},children:"← Back to Arcade"}),xn.jsx("div",{className:"pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-cyan-400/20 bg-black/50 px-5 py-2 text-center text-[11px] text-neutral-400",children:"🖱️ اسحب للدوران | عجلة الماوس للتقريب | لمس متعدد للجوال"})]})}yy.createRoot(document.getElementById("root")).render(xn.jsx(my.StrictMode,{children:xn.jsx(qE,{children:xn.jsx(yE,{children:xn.jsx(Cx,{path:"*",element:xn.jsx(qw,{})})})})}));
