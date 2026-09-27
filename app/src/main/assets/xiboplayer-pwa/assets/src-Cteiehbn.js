const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./__vite-browser-external-Cn0MOYvd.js","./rolldown-runtime-CbXtAM7H.js","./pdf-WMLLqnkL.js","./preload-helper-HclGiUj8.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{t}from"./preload-helper-HclGiUj8.js";import{b as n,h as r,t as i,v as a}from"./src-BEPG2Ffh.js";import{n as o}from"./src-CtnqWMM1.js";import{c as s}from"./src-4wmvE6e0.js";var c={name:`@xiboplayer/renderer`,version:`0.7.24-oidc.0`,description:`RendererLite - Fast, efficient XLF layout rendering engine`,type:`module`,main:`./src/index.js`,types:`./src/index.d.ts`,exports:{".":`./src/index.js`,"./renderer-lite":`./src/renderer-lite.js`,"./layout":`./src/layout.js`},scripts:{test:`vitest run`,"test:watch":`vitest`,"test:coverage":`vitest run --coverage`},dependencies:{"@xiboplayer/cache":`workspace:*`,"@xiboplayer/expr":`workspace:*`,"@xiboplayer/schedule":`workspace:*`,"@xiboplayer/utils":`workspace:*`,"pdfjs-dist":`^6.3.289`},devDependencies:{jsdom:`^30.0.1`,vitest:`^4.1.11`},keywords:[`xibo`,`digital-signage`,`renderer`,`xlf`,`layout`],author:`Pau Aliagas <linuxnow@gmail.com>`,license:`AGPL-3.0-or-later`,repository:{type:`git`,url:`git+https://github.com/xiboplayer/xiboplayer.git`,directory:`packages/renderer`},homepage:`https://xiboplayer.org`},l=class extends Error{constructor(e){super(e),this.name=`ExprOutOfScope`}};function u(e,t,n){let r=String(e),i=f(r);if(i.length===0)throw new l(`empty expression`);let a={tokens:i,pos:0,src:r,warnings:n},o=h(a,t);if(a.pos<a.tokens.length){let e=a.tokens[a.pos];throw new l(`unexpected token "${e.value}" at offset ${e.offset}`)}return o}function d(e){return typeof e==`boolean`?e:typeof e==`number`?e!==0&&!Number.isNaN(e):typeof e==`string`?e.length>0:!!e}function f(e){let t=[],n=e.length,r=0;for(;r<n;){let i=e[r];if(i===` `||i===`	`||i===`
`||i===`\r`){r++;continue}let a=r;if(i===`'`||i===`"`){let n=e.indexOf(i,r+1);if(n<0)throw new l(`unterminated string starting at ${r}`);t.push({type:`str`,value:e.slice(r+1,n),offset:a}),r=n+1;continue}if(i>=`0`&&i<=`9`){let i=r+1;for(;i<n&&e[i]>=`0`&&e[i]<=`9`;)i++;if(i<n&&e[i]===`.`)for(i++;i<n&&e[i]>=`0`&&e[i]<=`9`;)i++;t.push({type:`num`,value:e.slice(r,i),offset:a}),r=i;continue}if(i>=`A`&&i<=`Z`||i>=`a`&&i<=`z`||i===`_`){let i=r+1;for(;i<n;){let t=e[i];if(t>=`A`&&t<=`Z`||t>=`a`&&t<=`z`||t>=`0`&&t<=`9`||t===`_`||t===`.`){i++;continue}if(t===`-`&&i+1<n){let t=e[i+1];if(t>=`A`&&t<=`Z`||t>=`a`&&t<=`z`||t>=`0`&&t<=`9`||t===`_`){i+=2;continue}}break}t.push({type:`ident`,value:e.slice(r,i),offset:a}),r=i;continue}let o=e.slice(r,r+2);if(o===`!=`||o===`<=`||o===`>=`||o===`==`){t.push({type:`op`,value:o,offset:a}),r+=2;continue}if(i===`(`||i===`)`){t.push({type:i===`(`?`lparen`:`rparen`,value:i,offset:a}),r++;continue}if(i===`+`||i===`-`||i===`*`||i===`/`||i===`<`||i===`>`||i===`=`){t.push({type:`op`,value:i,offset:a}),r++;continue}throw new l(`unexpected character "${i}" at offset ${r}`)}return t}function p(e){return e.tokens[e.pos]}function m(e,t,n){let r=e.tokens[e.pos];return!r||r.type!==t||n!==void 0&&r.value!==n?null:(e.pos++,r)}function h(e,t){let n=g(e,t);for(;m(e,`ident`,`or`);){let r=g(e,t);n=d(n)||d(r)}return n}function g(e,t){let n=_(e,t);for(;m(e,`ident`,`and`);){let r=_(e,t);n=d(n)&&d(r)}return n}function _(e,t){let n=v(e,t);for(;;){let r=m(e,`op`,`=`),i=!r&&m(e,`op`,`==`),a=!r&&!i&&m(e,`op`,`!=`);if(!r&&!i&&!a)break;i&&e.warnings&&e.warnings.push({code:`XP_EXPR_JS_ALIAS`,message:`expr= uses JS-style "==" — XPath 1.0 spells equality as "="; evaluator accepts both.`});let o=v(e,t);n=w(n,a?`!=`:`=`,o)}return n}function v(e,t){let n=y(e,t);for(;;){let r=p(e);if(!r||r.type!==`op`||r.value!==`<`&&r.value!==`>`&&r.value!==`<=`&&r.value!==`>=`)break;e.pos++;let i=y(e,t);n=w(n,r.value,i)}return n}function y(e,t){let n=b(e,t);for(;;){let r=m(e,`op`,`+`),i=!r&&m(e,`op`,`-`);if(!r&&!i)break;let a=b(e,t);n=r?T(n,a):E(n,a)}return n}function b(e,t){let n=x(e,t);for(;;){let r=m(e,`op`,`*`),i=!r&&m(e,`op`,`/`),a=!r&&!i&&m(e,`ident`,`mod`);if(!r&&!i&&!a)break;let o=x(e,t);n=r?D(n,o):i?O(n,o):k(n,o)}return n}function x(e,t){if(m(e,`op`,`-`)){let n=x(e,t),r=Number(n);if(!Number.isFinite(r))throw new l(`unary minus applied to non-numeric value "${n}"`);return-r}return S(e,t)}function S(e,t){let n=e.tokens[e.pos];if(!n)throw new l(`unexpected end of expression`);if(n.type===`num`)return e.pos++,parseFloat(n.value);if(n.type===`str`)return e.pos++,n.value;if(n.type===`lparen`){e.pos++;let r=h(e,t);if(!m(e,`rparen`))throw new l(`expected ')' at offset ${n.offset}`);return r}if(n.type===`ident`){if(n.value===`and`||n.value===`or`||n.value===`mod`)throw new l(`unexpected keyword "${n.value}" at offset ${n.offset}`);if(e.pos++,m(e,`lparen`)){if(n.value===`not`){let n=h(e,t);if(!m(e,`rparen`))throw new l(`expected ')' closing not(`);return!d(n)}if(n.value===`smil-language`){let n=e.tokens[e.pos];if(!n||n.type!==`str`)throw new l(`smil-language() expects a string literal argument`);if(e.pos++,!m(e,`rparen`))throw new l(`expected ')' closing smil-language(`);let r=C(`lang`,t,!0);if(r==null)throw new l(`smil-language() called but xp:state-init.lang is unset`);return String(r)===n.value}throw new l(`unknown function: ${n.value}()`)}return C(n.value,t,!1)}throw new l(`unexpected token "${n.value}" at offset ${n.offset}`)}function C(e,t,n){if(t&&typeof t.get==`function`){if(!(typeof t.has==`function`?t.has(e):t.get(e)!==void 0)){if(n)return;throw new l(`unknown identifier: ${e}`)}return t.get(e)}if(t&&Object.hasOwn(t,e))return t[e];if(!n)throw new l(`unknown identifier: ${e}`)}function w(e,t,n){let r=Number(e),i=Number(n),a=Number.isFinite(r)&&Number.isFinite(i),o=a?r:String(e),s=a?i:String(n);switch(t){case`=`:return o===s;case`!=`:return o!==s;case`<`:return o<s;case`<=`:return o<=s;case`>`:return o>s;case`>=`:return o>=s}throw new l(`unknown comparator: ${t}`)}function T(e,t){if(typeof e==`string`||typeof t==`string`)return String(e)+String(t);let n=Number(e),r=Number(t);if(!Number.isFinite(n)||!Number.isFinite(r))throw new l(`"+" applied to non-numeric operand (lhs=${e}, rhs=${t})`);return n+r}function E(e,t){let n=Number(e),r=Number(t);if(!Number.isFinite(n)||!Number.isFinite(r))throw new l(`"-" applied to non-numeric operand (lhs=${e}, rhs=${t})`);return n-r}function D(e,t){let n=Number(e),r=Number(t);if(!Number.isFinite(n)||!Number.isFinite(r))throw new l(`"*" applied to non-numeric operand (lhs=${e}, rhs=${t})`);return n*r}function O(e,t){let n=Number(e),r=Number(t);if(!Number.isFinite(n)||!Number.isFinite(r))throw new l(`"/" applied to non-numeric operand (lhs=${e}, rhs=${t})`);if(r===0)throw new l(`division by zero`);return n/r}function k(e,t){let n=Number(e),r=Number(t);if(!Number.isFinite(n)||!Number.isFinite(r))throw new l(`"mod" applied to non-numeric operand (lhs=${e}, rhs=${t})`);if(r===0)throw new l(`mod by zero`);return n%r}var A=new Set([`document`,`session`,`display`]),j=class{constructor(e={}){let t=e.scope??`session`;if(!A.has(t))throw Error(`XpStateStore: invalid scope "${t}"`);if(this.scope=t,this._storageKey=e.storageKey??`xp:state`,this._storage=t===`display`?e.storage??(typeof globalThis<`u`?globalThis.localStorage:null):null,this._data=new Map,this._listeners=new Map,e.initialState&&typeof e.initialState==`object`)for(let[t,n]of Object.entries(e.initialState))this._data.set(t,M(n));if(this._storage)try{let e=this._storage.getItem(this._storageKey);if(e){let t=JSON.parse(e);if(t&&typeof t==`object`)for(let[e,n]of Object.entries(t))this._data.set(e,M(n))}}catch{}}get(e){let{key:t,rest:n}=N(e);if(!this._data.has(t))return;let r=this._data.get(t);for(let e of n){if(typeof r!=`object`||!r)return;r=r[e]}return r}has(e){return this.get(e)!==void 0}set(e,t){let n=this.get(e),{key:r,rest:i}=N(e);if(i.length===0)this._data.set(r,M(t));else{let e=this._data.get(r);(typeof e!=`object`||!e)&&(e={},this._data.set(r,e));let n=e;for(let e=0;e<i.length-1;e++){let t=i[e];(n[t]==null||typeof n[t]!=`object`)&&(n[t]={}),n=n[t]}n[i[i.length-1]]=M(t)}this._persist(),this._emitChange(e,t,n)}delete(e){let t=this.get(e);if(t===void 0)return;let{key:n,rest:r}=N(e);if(r.length===0)this._data.delete(n);else{let e=this._data.get(n);for(let t=0;t<r.length-1;t++){if(typeof e!=`object`||!e)return;e=e[r[t]]}typeof e==`object`&&e&&delete e[r[r.length-1]]}this._persist(),this._emitChange(e,void 0,t)}evaluate(e,t){return u(e,this,t)}snapshot(){let e={};for(let[t,n]of this._data)e[t]=M(n);return e}on(e,t){return this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(t),()=>{let n=this._listeners.get(e);n&&n.delete(t)}}reset(){let e=this.snapshot();this._data.clear(),this._persist(),this._emit(`change`,{path:`*`,value:void 0,prev:e})}get lang(){return this.get(`lang`)}_persist(){if(this._storage)try{let e=this.snapshot();this._storage.setItem(this._storageKey,JSON.stringify(e))}catch{}}_emitChange(e,t,n){this._emit(`change`,{path:e,value:t,prev:n});let r=e.split(`.`);for(let i=r.length;i>=1;i--){let a=r.slice(0,i).join(`.`);this._emit(`change:${a}`,{path:e,value:t,prev:n})}}_emit(e,t){let n=this._listeners.get(e);if(n&&n.size!==0)for(let r of Array.from(n))try{r(t)}catch(t){typeof console<`u`&&console.error&&console.error(`[XpStateStore] listener error on`,e,t)}}};function M(e){if(typeof e!=`object`||!e)return e;if(Array.isArray(e))return e.map(M);let t={};for(let[n,r]of Object.entries(e))t[n]=M(r);return t}function N(e){let t=String(e),n=t.indexOf(`.`);return n<0?{key:t,rest:[]}:{key:t.slice(0,n),rest:t.slice(n+1).split(`.`)}}var P=ArrayBuffer,F=Uint8Array,ee=Uint16Array,I=Int16Array,L=Int32Array,te=function(e,t,n){if(F.prototype.slice)return F.prototype.slice.call(e,t,n);(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var r=new F(n-t);return r.set(e.subarray(t,n)),r},R=function(e,t,n,r){if(F.prototype.fill)return F.prototype.fill.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;++n)e[n]=t;return e},ne=function(e,t,n,r){if(F.prototype.copyWithin)return F.prototype.copyWithin.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;)e[t++]=e[n++]},re=[`invalid zstd data`,`window size too large (>2046MB)`,`invalid block type`,`FSE accuracy too high`,`match distance too far back`,`unexpected EOF`],z=function(e,t,n){var r=Error(t||re[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,z),!n)throw r;return r},ie=function(e,t,n){for(var r=0,i=0;r<n;++r)i|=e[t++]<<(r<<3);return i},ae=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},oe=function(e,t){var n=e[0]|e[1]<<8|e[2]<<16;if(n==3126568&&e[3]==253){var r=e[4],i=r>>5&1,a=r>>2&1,o=r&3,s=r>>6;r&8&&z(0);var c=6-i,l=o==3?4:o,u=ie(e,c,l);c+=l;var d=s?1<<s:i,f=ie(e,c,d)+(s==1&&256),p=f;if(!i){var m=1<<10+(e[5]>>3);p=m+(m>>3)*(e[5]&7)}p>2145386496&&z(1);var h=new F((t==1?f||p:t?0:p)+12);return h[0]=1,h[4]=4,h[8]=8,{b:c+d,y:0,l:0,d:u,w:t&&t!=1?t:h.subarray(12),e:p,o:new L(h.buffer,0,3),u:f,c:a,m:Math.min(131072,p)}}if((n>>4|e[3]<<20)==25481893)return ae(e,4)+8;z(0)},B=function(e){for(var t=0;1<<t<=e;++t);return t-1},V=function(e,t,n){var r=(t<<3)+4,i=(e[t]&15)+5;i>n&&z(3);for(var a=1<<i,o=a,s=-1,c=-1,l=-1,u=a,d=new P(512+(a<<2)),f=new I(d,0,256),p=new ee(d,0,256),m=new ee(d,512,a),h=512+(a<<1),g=new F(d,h,a),_=new F(d,h+a);s<255&&o>0;){var v=B(o+1),y=r>>3,b=(1<<v+1)-1,x=(e[y]|e[y+1]<<8|e[y+2]<<16)>>(r&7)&b,S=(1<<v)-1,C=b-o-1,w=x&S;if(w<C?(r+=v,x=w):(r+=v+1,x>S&&(x-=C)),f[++s]=--x,x==-1?(o+=x,g[--u]=s):o-=x,!x)do{var T=r>>3;c=(e[T]|e[T+1]<<8)>>(r&7)&3,r+=2,s+=c}while(c==3)}(s>255||o)&&z(0);for(var E=0,D=(a>>1)+(a>>3)+3,O=a-1,k=0;k<=s;++k){var A=f[k];if(A<1){p[k]=-A;continue}for(l=0;l<A;++l){g[E]=k;do E=E+D&O;while(E>=u)}}for(E&&z(0),l=0;l<a;++l){var j=p[g[l]]++,M=_[l]=i-B(j);m[l]=(j<<M)-a}return[r+7>>3,{b:i,s:g,n:_,t:m}]},se=function(e,t){var n=0,r=-1,i=new F(292),a=e[t],o=i.subarray(0,256),s=i.subarray(256,268),c=new ee(i.buffer,268);if(a<128){var l=V(e,t+1,6),u=l[0],d=l[1];t+=a;var f=u<<3,p=e[t];p||z(0);for(var m=0,h=0,g=d.b,_=g,v=(++t<<3)-8+B(p);v-=g,!(v<f);){var y=v>>3;if(m+=(e[y]|e[y+1]<<8)>>(v&7)&(1<<g)-1,o[++r]=d.s[m],v-=_,v<f)break;y=v>>3,h+=(e[y]|e[y+1]<<8)>>(v&7)&(1<<_)-1,o[++r]=d.s[h],g=d.n[m],m=d.t[m],_=d.n[h],h=d.t[h]}++r>255&&z(0)}else{for(r=a-127;n<r;n+=2){var b=e[++t];o[n]=b>>4,o[n+1]=b&15}++t}var x=0;for(n=0;n<r;++n){var S=o[n];S>11&&z(0),x+=S&&1<<S-1}var C=B(x)+1,w=1<<C,T=w-x;for(T&T-1&&z(0),o[r++]=B(T)+1,n=0;n<r;++n){var S=o[n];++s[o[n]=S&&C+1-S]}var E=new F(w<<1),D=E.subarray(0,w),O=E.subarray(w);for(c[C]=0,n=C;n>0;--n){var k=c[n];R(O,n,k,c[n-1]=k+s[n]*(1<<C-n))}for(c[0]!=w&&z(0),n=0;n<r;++n){var A=o[n];if(A){var j=c[A];R(D,n,j,c[A]=j+(1<<C-A))}}return[t,{n:O,b:C,s:D}]},ce=V(new F([81,16,99,140,49,198,24,99,12,33,196,24,99,102,102,134,70,146,4]),0,6)[1],le=V(new F([33,20,196,24,99,140,33,132,16,66,8,33,132,16,66,8,33,68,68,68,68,68,68,68,68,36,9]),0,6)[1],ue=V(new F([32,132,16,66,102,70,68,68,68,68,36,73,2]),0,5)[1],de=function(e,t){for(var n=e.length,r=new L(n),i=0;i<n;++i)r[i]=t,t+=1<<e[i];return r},fe=new F(new L([0,0,0,0,16843009,50528770,134678020,202050057,269422093]).buffer,0,36),pe=de(fe,0),me=new F(new L([0,0,0,0,0,0,0,0,16843009,50528770,117769220,185207048,252579084,16]).buffer,0,53),he=de(me,3),H=function(e,t,n){var r=e.length,i=t.length,a=e[r-1],o=(1<<n.b)-1,s=-n.b;a||z(0);for(var c=0,l=n.b,u=(r<<3)-8+B(a)-l,d=-1;u>s&&d<i;){var f=u>>3,p=(e[f]|e[f+1]<<8|e[f+2]<<16)>>(u&7);c=(c<<l|p)&o,t[++d]=n.s[c],u-=l=n.n[c]}(u!=s||d+1!=i)&&z(0)},ge=function(e,t,n){var r=6,i=t.length+3>>2,a=i<<1,o=i+a;H(e.subarray(r,r+=e[0]|e[1]<<8),t.subarray(0,i),n),H(e.subarray(r,r+=e[2]|e[3]<<8),t.subarray(i,a),n),H(e.subarray(r,r+=e[4]|e[5]<<8),t.subarray(a,o),n),H(e.subarray(r),t.subarray(o),n)},U=function(e,t,n){var r,i=t.b,a=e[i],o=a>>1&3;t.l=a&1;var s=a>>3|e[i+1]<<5|e[i+2]<<13,c=(i+=3)+s;if(o==1)return i>=e.length?void 0:(t.b=i+1,n?(R(n,e[i],t.y,t.y+=s),n):R(new F(s),e[i]));if(!(c>e.length)){if(o==0)return t.b=c,n?(n.set(e.subarray(i,c),t.y),t.y+=s,n):te(e,i,c);if(o==2){var l=e[i],u=l&3,d=l>>2&3,f=l>>4,p=0,m=0;u<2?d&1?f|=e[++i]<<4|(d&2&&e[++i]<<12):f=l>>3:(m=d,d<2?(f|=(e[++i]&63)<<4,p=e[i]>>6|e[++i]<<2):d==2?(f|=e[++i]<<4|(e[++i]&3)<<12,p=e[i]>>2|e[++i]<<6):(f|=e[++i]<<4|(e[++i]&63)<<12,p=e[i]>>6|e[++i]<<2|e[++i]<<10)),++i;var h=n?n.subarray(t.y,t.y+t.m):new F(t.m),g=h.length-f;if(u==0)h.set(e.subarray(i,i+=f),g);else if(u==1)R(h,e[i++],g);else{var _=t.h;if(u==2){var v=se(e,i);p+=i-(i=v[0]),t.h=_=v[1]}else _||z(0);(m?ge:H)(e.subarray(i,i+=p),h.subarray(g),_)}var y=e[i++];if(y){y==255?y=(e[i++]|e[i++]<<8)+32512:y>127&&(y=y-128<<8|e[i++]);var b=e[i++];b&3&&z(0);for(var x=[le,ue,ce],S=2;S>-1;--S){var C=b>>(S<<1)+2&3;if(C==1){var w=new F([0,0,e[i++]]);x[S]={s:w.subarray(2,3),n:w.subarray(0,1),t:new ee(w.buffer,0,1),b:0}}else C==2?(r=V(e,i,9-(S&1)),i=r[0],x[S]=r[1]):C==3&&(t.t||z(0),x[S]=t.t[S])}var T=t.t=x,E=T[0],D=T[1],O=T[2],k=e[c-1];k||z(0);var A=(c<<3)-8+B(k)-O.b,j=A>>3,M=0,N=(e[j]|e[j+1]<<8)>>(A&7)&(1<<O.b)-1;j=(A-=D.b)>>3;var P=(e[j]|e[j+1]<<8)>>(A&7)&(1<<D.b)-1;j=(A-=E.b)>>3;var I=(e[j]|e[j+1]<<8)>>(A&7)&(1<<E.b)-1;for(++y;--y;){var L=O.s[N],ne=O.n[N],re=E.s[I],ie=E.n[I],ae=D.s[P],oe=D.n[P];j=(A-=ae)>>3;var de=1<<ae,U=de+((e[j]|e[j+1]<<8|e[j+2]<<16|e[j+3]<<24)>>>(A&7)&de-1);j=(A-=me[re])>>3;var W=he[re]+((e[j]|e[j+1]<<8|e[j+2]<<16)>>(A&7)&(1<<me[re])-1);j=(A-=fe[L])>>3;var G=pe[L]+((e[j]|e[j+1]<<8|e[j+2]<<16)>>(A&7)&(1<<fe[L])-1);if(j=(A-=ne)>>3,N=O.t[N]+((e[j]|e[j+1]<<8)>>(A&7)&(1<<ne)-1),j=(A-=ie)>>3,I=E.t[I]+((e[j]|e[j+1]<<8)>>(A&7)&(1<<ie)-1),j=(A-=oe)>>3,P=D.t[P]+((e[j]|e[j+1]<<8)>>(A&7)&(1<<oe)-1),U>3)t.o[2]=t.o[1],t.o[1]=t.o[0],t.o[0]=U-=3;else{var K=U-(G!=0);K?(U=K==3?t.o[0]-1:t.o[K],K>1&&(t.o[2]=t.o[1]),t.o[1]=t.o[0],t.o[0]=U):U=t.o[0]}for(var S=0;S<G;++S)h[M+S]=h[g+S];M+=G,g+=G;var q=M-U;if(q<0){var J=-q,_e=t.e+q;J>W&&(J=W);for(var S=0;S<J;++S)h[M+S]=t.w[_e+S];M+=J,W-=J,q=0}for(var S=0;S<W;++S)h[M+S]=h[q+S];M+=W}if(M!=g)for(;g<h.length;)h[M++]=h[g++];else M=h.length;n?t.y+=M:h=te(h,0,M)}else if(n){if(t.y+=f,g)for(var S=0;S<f;++S)h[S]=h[g+S]}else g&&(h=te(h,g));return t.b=c,h}z(2)}},W=function(e,t){if(e.length==1)return e[0];for(var n=new F(t),r=0,i=0;r<e.length;++r){var a=e[r];n.set(a,i),i+=a.length}return n};function G(e,t){for(var n=[],r=+!t,i=0,a=0;e.length;){var o=oe(e,r||t);if(typeof o==`object`){for(r?(t=null,o.w.length==o.u&&(n.push(t=o.w),a+=o.u)):(n.push(t),o.e=0);!o.l;){var s=U(e,o,t);s||z(5),t?o.e=o.y:(n.push(s),a+=s.length,ne(o.w,0,s.length),o.w.set(s,o.w.length-s.length))}i=o.b+o.c*4}else i=o;e=e.subarray(i)}return W(n,a)}function K(e){if(e==null||e===``)throw Error(`parseXpStateInit: empty value`);if(typeof e!=`string`)throw Error(`parseXpStateInit: expected string, got ${typeof e}`);let t=e.trim();if(t===``)throw Error(`parseXpStateInit: empty value`);let n=t.indexOf(`:`);if(n>0){let e=t.slice(0,n),r=t.slice(n+1);if(e===`zstd+b64`)return q(r);if(e===`gzip+b64`)return J(r);if(/^[a-z][a-z0-9+]*$/i.test(e)&&e.includes(`+b64`))throw Error(`parseXpStateInit: unsupported prefix "${e}" — expected zstd+b64 or gzip+b64`)}if(!/^[\[{]/.test(t))throw Error(`parseXpStateInit: value is neither a known compression prefix (zstd+b64:/gzip+b64:) nor a JSON object/array literal`);let r;try{r=JSON.parse(t)}catch(e){throw Error(`parseXpStateInit: invalid JSON payload — ${e.message}`)}return xe(r)}function q(e){let t=ye(e,`zstd+b64`),n;try{n=G(t)}catch(e){throw Error(`parseXpStateInit: zstd decompression failed — ${e.message}`)}return be(n,`zstd+b64`)}function J(e){let t=ye(e,`gzip+b64`),n;try{n=ve(t)}catch(e){throw Error(`parseXpStateInit: gzip decompression failed — ${e.message}`)}return be(n,`gzip+b64`)}var _e=null;try{let n=typeof globalThis<`u`?globalThis.process:null;n&&n.versions&&n.versions.node&&(_e=(await t(()=>import(`./__vite-browser-external-Cn0MOYvd.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1]),import.meta.url)).gunzipSync)}catch{}function ve(e){if(_e)return new Uint8Array(_e(Buffer.from(e)));throw Error(`gzip decompression not supported in this runtime — browser builds currently only support zstd+b64 and plain JSON xp:state-init payloads`)}function ye(e,t){let n=String(e).trim();if(n===``)throw Error(`parseXpStateInit: empty base64 payload after ${t}:`);try{if(typeof atob==`function`){let e=atob(n),t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}if(typeof Buffer<`u`)return new Uint8Array(Buffer.from(n,`base64`));throw Error(`no base64 decoder available (neither atob nor Buffer)`)}catch(e){throw Error(`parseXpStateInit: base64 decode failed for ${t} — ${e.message}`)}}function be(e,t){let n;try{n=new TextDecoder(`utf-8`,{fatal:!0}).decode(e)}catch(e){throw Error(`parseXpStateInit: ${t} payload is not valid UTF-8 — ${e.message}`)}let r;try{r=JSON.parse(n)}catch(e){throw Error(`parseXpStateInit: ${t} payload is not valid JSON — ${e.message}`)}return xe(r)}function xe(e){if(typeof e!=`object`||!e||Array.isArray(e))throw Error(`parseXpStateInit: decoded payload must be a JSON object (got `+(Array.isArray(e)?`array`:typeof e)+`)`);return e}var Y=a(`LayoutPool`),X=class e{constructor(e=2){this.layouts=new Map,this.maxSize=e,this.hotLayoutId=null}has(e){return this.layouts.has(e)}get(e){return this.layouts.get(e)}add(e,t){if(this.layouts.has(e)){let n=this.layouts.get(e);Object.assign(n,t),n.lastAccess=Date.now();return}this.layouts.size>=this.maxSize&&this.evictLRU(),t.status=`warm`,t.lastAccess=Date.now(),this.layouts.set(e,t),Y.info(`Added layout ${e} to pool (size: ${this.layouts.size}/${this.maxSize})`)}setHot(e){if(this.hotLayoutId!==null&&this.layouts.has(this.hotLayoutId)&&(this.layouts.get(this.hotLayoutId).status=`warm`),this.layouts.has(e)){let t=this.layouts.get(e);t.status=`hot`,t.lastAccess=Date.now()}this.hotLayoutId=e}evict(t){let n=this.layouts.get(t);if(n){if(Y.info(`Evicting layout ${t} from pool`),n.regions)for(let[e,t]of n.regions)t.timer&&=(clearTimeout(t.timer),null);if(n.container&&e.releaseMediaElements(n.container),n.blobUrls&&n.blobUrls.size>0&&(n.blobUrls.forEach(e=>{URL.revokeObjectURL(e)}),Y.info(`Revoked ${n.blobUrls.size} blob URLs for layout ${t}`)),n.mediaUrlCache)for(let[e,t]of n.mediaUrlCache)t&&typeof t==`string`&&t.startsWith(`blob:`)&&URL.revokeObjectURL(t);n.container&&n.container.parentNode&&n.container.remove(),this.layouts.delete(t),this.hotLayoutId===t&&(this.hotLayoutId=null)}}static releaseMediaElements(t){requestAnimationFrame(()=>e._releaseMediaElementsSync(t))}static _releaseMediaElementsSync(e){let t=0,n=0;e.querySelectorAll(`video`).forEach(e=>{e._hlsInstance&&(e._hlsInstance.destroy(),e._hlsInstance=null,n++),e._mediaStream&&(e._mediaStream.getTracks().forEach(e=>e.stop()),e._mediaStream=null,e.srcObject=null),e.pause(),e.removeAttribute(`src`),e.load(),t++}),e.querySelectorAll(`audio`).forEach(e=>{e.pause(),e.removeAttribute(`src`),e.load()});let r=0;e.querySelectorAll(`iframe`).forEach(e=>{try{let n=e.contentDocument||e.contentWindow?.document;n&&(n.querySelectorAll(`video`).forEach(e=>{e.pause(),e.removeAttribute(`src`),e.load(),t++}),n.querySelectorAll(`audio`).forEach(e=>{e.pause(),e.removeAttribute(`src`),e.load()}))}catch{}e.src=`about:blank`,r++}),e.querySelectorAll(`.pdf-widget`).forEach(e=>{e._pdfDestroy&&e._pdfDestroy()}),(t>0||r>0)&&Y.info(`Released ${t} video(s)${n?` (${n} HLS)`:``}${r?`, ${r} iframe(s)`:``}`)}evictLRU(){let e=null,t=1/0;for(let[n,r]of this.layouts)r.status===`warm`&&r.lastAccess<t&&(e=n,t=r.lastAccess);e!==null&&this.evict(e)}clearWarm(){let e=0,t=[];for(let[e,n]of this.layouts)n.status===`warm`&&t.push(e);for(let n of t)this.evict(n),e++;return e>0&&Y.info(`Cleared ${e} warm layout(s) from pool`),e}clearWarmNotIn(e){let t=0,n=[];for(let[t,r]of this.layouts)r.status===`warm`&&!e.has(t)&&n.push(t);for(let e of n)this.evict(e),t++;return t>0&&Y.info(`Cleared ${t} warm layout(s) no longer in schedule`),t}getLatest(){let e;for(let t of this.layouts.keys())e=t;return e}clear(){let e=Array.from(this.layouts.keys());for(let t of e)this.evict(t);this.hotLayoutId=null}get size(){return this.layouts.size}},Z={fadeIn(e,t){let n=[{opacity:0},{opacity:1}],r={duration:t,easing:`linear`,fill:`forwards`};return e.animate(n,r)},fadeOut(e,t){let n=[{opacity:1},{opacity:0}],r={duration:t,easing:`linear`,fill:`forwards`};return e.animate(n,r)},getFlyKeyframes(e,t,n,r){let i={N:{x:0,y:r?-n:n},NE:{x:r?t:-t,y:r?-n:n},E:{x:r?t:-t,y:0},SE:{x:r?t:-t,y:r?n:-n},S:{x:0,y:r?n:-n},SW:{x:r?-t:t,y:r?n:-n},W:{x:r?-t:t,y:0},NW:{x:r?-t:t,y:r?-n:n}},a=i[e]||i.N;return r?{from:{transform:`translate(${a.x}px, ${a.y}px)`,opacity:0},to:{transform:`translate(0, 0)`,opacity:1}}:{from:{transform:`translate(0, 0)`,opacity:1},to:{transform:`translate(${a.x}px, ${a.y}px)`,opacity:0}}},flyIn(e,t,n,r,i){let a=this.getFlyKeyframes(n,r,i,!0),o={duration:t,easing:`ease-out`,fill:`forwards`};return e.animate([a.from,a.to],o)},flyOut(e,t,n,r,i){let a=this.getFlyKeyframes(n,r,i,!1),o={duration:t,easing:`ease-in`,fill:`forwards`};return e.animate([a.from,a.to],o)},slideIn(e,t,n,r,i){let a={N:{x:0,y:-i},NE:{x:r,y:-i},E:{x:r,y:0},SE:{x:r,y:i},S:{x:0,y:i},SW:{x:-r,y:i},W:{x:-r,y:0},NW:{x:-r,y:-i}},o=a[n]||a.E;return e.animate([{transform:`translate(${o.x}px, ${o.y}px)`},{transform:`translate(0, 0)`}],{duration:t,easing:`ease-out`,fill:`forwards`})},slideOut(e,t,n,r,i){let a={N:{x:0,y:-i},NE:{x:r,y:-i},E:{x:r,y:0},SE:{x:r,y:i},S:{x:0,y:i},SW:{x:-r,y:i},W:{x:-r,y:0},NW:{x:-r,y:-i}},o=a[n]||a.W;return e.animate([{transform:`translate(0, 0)`},{transform:`translate(${o.x}px, ${o.y}px)`}],{duration:t,easing:`ease-in`,fill:`forwards`})},wipeIn(e,t,n){let r={E:{from:`inset(0 100% 0 0)`,to:`inset(0 0 0 0)`},W:{from:`inset(0 0 0 100%)`,to:`inset(0 0 0 0)`},S:{from:`inset(0 0 100% 0)`,to:`inset(0 0 0 0)`},N:{from:`inset(100% 0 0 0)`,to:`inset(0 0 0 0)`},SE:{from:`inset(0 100% 100% 0)`,to:`inset(0 0 0 0)`},SW:{from:`inset(0 0 100% 100%)`,to:`inset(0 0 0 0)`},NE:{from:`inset(100% 100% 0 0)`,to:`inset(0 0 0 0)`},NW:{from:`inset(100% 0 0 100%)`,to:`inset(0 0 0 0)`}},i=r[n]||r.E;return e.animate([{clipPath:i.from},{clipPath:i.to}],{duration:t,easing:`ease-out`,fill:`forwards`})},apply(e,t,n,r,i){if(!t||!t.type)return null;let a=t.type.toLowerCase(),o=t.duration||1e3,s=t.direction||`N`;switch(a){case`fade`:return n?this.fadeIn(e,o):this.fadeOut(e,o);case`fadein`:return n?this.fadeIn(e,o):null;case`fadeout`:return n?null:this.fadeOut(e,o);case`fly`:return n?this.flyIn(e,o,s,r,i):this.flyOut(e,o,s,r,i);case`flyin`:return n?this.flyIn(e,o,s,r,i):null;case`flyout`:return n?null:this.flyOut(e,o,s,r,i);case`slide`:return n?this.slideIn(e,o,s,r,i):this.slideOut(e,o,s,r,i);case`wipe`:return n?this.wipeIn(e,o,s):null;default:return null}}},Se=class{constructor(e,t,n={}){this.config=e,this.container=t,this.options=n,this.log=a(`RendererLite`,n.logLevel),this.emitter=new r,this.currentLayout=null,this.currentLayoutId=null,this._preloadingLayoutId=null,this._preloadingPromise=null,this.regions=new Map,this.layoutTimer=null,this.layoutEndEmitted=!1,this._deferredTimerLayoutId=null,this._deferredTimerFallback=null,this._paused=!1,this._layoutTimerStartedAt=null,this._layoutTimerDurationMs=null,this.layoutBlobUrls=new Map,this.audioOverlays=new Map,this._stopWidgetBound=(e,t)=>this.stopWidget(e,t),this._renderWidgetBound=(e,t)=>this.renderWidget(e,t),this.scaleFactor=1,this.offsetX=0,this.offsetY=0,this.overlayContainer=null,this.activeOverlays=new Map,this._keydownHandler=null,this._keyboardActions=[],this._subPlaylistCycleIndex=new Map,this._startedWidgets=new Set,this._stateStore=null,this._stateUnsubscribe=null,this.layoutPool=new X(2),this.preloadTimer=null,this._preloadRetryTimer=null,this.layoutTransition=this._normalizeLayoutTransition(n.layoutTransition),this.setupContainer(),this.emitter.on(`interactiveTrigger`,e=>this._handleInteractiveTrigger(e)),this.emitter.on(`widgetExpire`,e=>this._handleWidgetExpire(e)),this.emitter.on(`widgetExtendDuration`,e=>this._handleWidgetExtendDuration(e)),this.emitter.on(`widgetSetDuration`,e=>this._handleWidgetSetDuration(e)),this.log.info(`Initialized`)}setupContainer(){if(this.container.style.position=`relative`,this.container.style.width=`100%`,this.container.style.height=`100vh`,this.container.style.overflow=`hidden`,this._resizeSuppressed=!1,typeof ResizeObserver<`u`){let e=null;this.resizeObserver=new ResizeObserver(()=>{this._resizeSuppressed||(e&&clearTimeout(e),e=setTimeout(()=>this.rescaleRegions(),150))}),this.resizeObserver.observe(this.container)}this.overlayContainer=document.createElement(`div`),this.overlayContainer.id=`overlay-container`,this.overlayContainer.style.position=`absolute`,this.overlayContainer.style.top=`0`,this.overlayContainer.style.left=`0`,this.overlayContainer.style.width=`100%`,this.overlayContainer.style.height=`100%`,this.overlayContainer.style.zIndex=`1000`,this.overlayContainer.style.pointerEvents=`none`,this.container.appendChild(this.overlayContainer)}calculateScale(e){let t=this.container.clientWidth,n=this.container.clientHeight;if(!t||!n)return;let r=t/e.width,i=n/e.height;this.scaleFactor=Math.min(r,i),this.offsetX=(t-e.width*this.scaleFactor)/2,this.offsetY=(n-e.height*this.scaleFactor)/2,this.log.info(`Scale: ${this.scaleFactor.toFixed(3)} (${e.width}x${e.height} → ${t}x${n}, offset ${Math.round(this.offsetX)},${Math.round(this.offsetY)})`)}applyRegionScale(e,t){let n=this.scaleFactor;e.style.left=`${t.left*n+this.offsetX}px`,e.style.top=`${t.top*n+this.offsetY}px`,e.style.width=`${t.width*n}px`,e.style.height=`${t.height*n}px`}rescaleRegions(){if(this.currentLayout){this.calculateScale(this.currentLayout);for(let[e,t]of this.regions)this.applyRegionScale(t.element,t.config),t.width=t.config.width*this.scaleFactor,t.height=t.config.height*this.scaleFactor;for(let[e,t]of this.activeOverlays){this.calculateScale(t.layout);for(let[e,n]of t.regions)this.applyRegionScale(n.element,n.config),n.width=n.config.width*this.scaleFactor,n.height=n.config.height*this.scaleFactor}}}on(e,t){this.emitter.on(e,t)}emit(e,...t){this.emitter.emit(e,...t)}parseActions(e){let t=[];for(let n of e.children)n.tagName===`action`&&t.push({id:n.getAttribute(`id`)||``,actionType:n.getAttribute(`actionType`)||``,triggerType:n.getAttribute(`triggerType`)||``,triggerCode:n.getAttribute(`triggerCode`)||``,source:n.getAttribute(`source`)||``,sourceId:n.getAttribute(`sourceId`)||``,target:n.getAttribute(`target`)||``,targetId:n.getAttribute(`targetId`)||``,widgetId:n.getAttribute(`widgetId`)||``,layoutCode:n.getAttribute(`layoutCode`)||``,commandCode:n.getAttribute(`commandCode`)||``});return t}_normalizeLayoutTransition(e){return{type:e?.type||`instant`,duration:Number.isFinite(e?.duration)?e.duration:500,direction:e?.direction||void 0}}_resolveLayoutTransition(e){let t=e?.layoutTransitionIn;return!t||!t.type?this.layoutTransition:{type:t.type,duration:Number.isFinite(t.duration)?t.duration:this.layoutTransition.duration,direction:t.direction||this.layoutTransition.direction}}parseXlf(e){let t=new DOMParser().parseFromString(e,`text/xml`).querySelector(`layout`);if(!t)throw Error(`Invalid XLF: no <layout> element`);let n=t.getAttribute(`duration`),r=t.getAttribute(`layoutTransitionIn`),i=t.getAttribute(`layoutTransitionInDuration`),a=t.getAttribute(`layoutTransitionInDirection`),o=[];for(let e of t.children)if(e.tagName===`tags`)for(let t of e.children){if(t.tagName!==`tag`)continue;let e=(t.textContent||``).trim();e&&o.push(e)}let c={schemaVersion:parseInt(t.getAttribute(`schemaVersion`)||`1`),width:parseInt(t.getAttribute(`width`)||`1920`),height:parseInt(t.getAttribute(`height`)||`1080`),duration:n?parseInt(n):0,bgcolor:t.getAttribute(`backgroundColor`)||t.getAttribute(`bgcolor`)||`#000000`,background:t.getAttribute(`background`)||null,enableStat:t.getAttribute(`enableStat`)!==`0`,actions:this.parseActions(t),tags:o,layoutTransitionIn:r?{type:r,duration:i?parseInt(i):void 0,direction:a||void 0}:null,regions:[]};c.schemaVersion>1&&this.log.debug(`XLF schema version: ${c.schemaVersion}`),n?this.log.info(`Layout duration from XLF: ${c.duration}s`):this.log.info(`Layout duration NOT in XLF, will calculate from widgets`);let l=t.querySelectorAll(`:scope > region, :scope > drawer`);for(let e of l){let t=e.tagName===`drawer`,n=e.getAttribute(`type`)||null,r={id:e.getAttribute(`id`),width:parseInt(e.getAttribute(`width`)||`0`),height:parseInt(e.getAttribute(`height`)||`0`),top:parseInt(e.getAttribute(`top`)||`0`),left:parseInt(e.getAttribute(`left`)||`0`),zindex:parseInt(e.getAttribute(`zindex`)||(t?`2000`:`0`)),enableStat:e.getAttribute(`enableStat`)!==`0`,actions:this.parseActions(e),exitTransition:null,transitionType:null,transitionDuration:null,transitionDirection:null,loop:!0,isDrawer:t,isCanvas:n===`canvas`,widgets:[]},i=Array.from(e.children).find(e=>e.tagName===`options`);if(i){let e=i.querySelector(`exitTransType`);if(e&&e.textContent){let t=i.querySelector(`exitTransDuration`),n=i.querySelector(`exitTransDirection`);r.exitTransition={type:e.textContent,duration:parseInt(t&&t.textContent||`1000`),direction:n&&n.textContent||`N`}}let t=i.querySelector(`loop`);t&&(r.loop=t.textContent!==`0`);let n=i.querySelector(`transitionType`);if(n&&n.textContent){r.transitionType=n.textContent;let e=i.querySelector(`transitionDuration`),t=i.querySelector(`transitionDirection`);r.transitionDuration=parseInt(e&&e.textContent||`1000`),r.transitionDirection=t&&t.textContent||`N`}}for(let t of e.children){if(t.tagName!==`media`)continue;let e=this.parseWidget(t);if(e.type===`xp-state-init`){c.xpStateInit&&this.log.warn(`Multiple xp-state-init widgets on layout — using widget ${e.id} (last one wins)`),c.xpStateInit={widgetId:e.id,rawValue:e.options.xpStateInit??``,scope:e.options.xpStateScope??`session`,language:e.options.xpLanguage??null,defaultDatasource:e.options.xpDefaultDatasource??null};continue}r.widgets.push(e)}!r.isCanvas&&r.widgets.some(e=>e.type===`global`)&&(r.isCanvas=!0),c.regions.push(r),t&&this.log.info(`Parsed drawer: id=${r.id} with ${r.widgets.length} widgets`),r.isCanvas&&this.log.info(`Parsed canvas region: id=${r.id} with ${r.widgets.length} widgets (all render simultaneously)`)}if(c.duration===0){let{duration:t,isDynamic:n}=s(e);c.duration=t,c.isDynamic=n,this.log.info(`Calculated layout duration: ${c.duration}s (not specified in XLF)${n?` [dynamic — has useDuration=0 video]`:``}`)}return c}parseWidget(e){let t=e.getAttribute(`type`),n=parseInt(e.getAttribute(`duration`)||`10`),r=parseInt(e.getAttribute(`useDuration`)||`1`),i=e.getAttribute(`id`),a=e.getAttribute(`fileId`),o={},s=e.querySelector(`options`);if(s)for(let e of s.children)o[e.tagName]=e.textContent;let c=e.querySelector(`raw`),l=c?c.textContent:``,u={in:null,out:null};o.transIn&&(u.in={type:o.transIn,duration:parseInt(o.transInDuration||`1000`),direction:o.transInDirection||`N`}),o.transOut&&(u.out={type:o.transOut,duration:parseInt(o.transOutDuration||`1000`),direction:o.transOutDirection||`N`});let d=this.parseActions(e),f=[];for(let t of e.children)if(t.tagName.toLowerCase()===`audio`){let e=t.querySelector(`uri`);e?f.push({mediaId:e.getAttribute(`mediaId`)||null,uri:e.textContent||``,volume:parseInt(e.getAttribute(`volume`)||`100`),loop:e.getAttribute(`loop`)===`1`}):f.push({mediaId:t.getAttribute(`mediaId`)||null,uri:t.getAttribute(`uri`)||``,volume:parseInt(t.getAttribute(`volume`)||`100`),loop:t.getAttribute(`loop`)===`1`})}let p=[],m=Array.from(e.children).find(e=>e.tagName===`commands`);if(m)for(let e of m.children)e.tagName===`command`&&p.push({commandCode:e.getAttribute(`commandCode`)||``,commandString:e.getAttribute(`commandString`)||``});let h=e.getAttribute(`parentWidgetId`)||null,g=parseInt(e.getAttribute(`displayOrder`)||`0`),_=e.getAttribute(`cyclePlayback`)===`1`,v=parseInt(e.getAttribute(`playCount`)||`0`),y=e.getAttribute(`isRandom`)===`1`,b=e.getAttribute(`fromDt`)||e.getAttribute(`fromdt`)||null,x=e.getAttribute(`toDt`)||e.getAttribute(`todt`)||null,S=e.getAttribute(`render`)||null,C=o.xpIf??e.getAttribute(`xpIf`)??null,w=o.xpDayPart??e.getAttribute(`xpDayPart`)??null,T=o.xpDatasource??e.getAttribute(`xpDatasource`)??null,E=o.xpJsonpath??e.getAttribute(`xpJsonpath`)??null,D=o.xpMatch??e.getAttribute(`xpMatch`)??null,O=o.xpBegin??e.getAttribute(`xpBegin`)??null,k=o.xpEnd??e.getAttribute(`xpEnd`)??null;return{type:t,duration:n,useDuration:r,id:i,fileId:a,render:S,fromDt:b,toDt:x,enableStat:e.getAttribute(`enableStat`)!==`0`,webhookUrl:o.webhookUrl||null,options:o,raw:l,transitions:u,actions:d,audioNodes:f,commands:p,parentWidgetId:h,displayOrder:g,cyclePlayback:_,playCount:v,isRandom:y,xpIf:C,xpDayPart:w,xpDatasource:T,xpJsonpath:E,xpMatch:D,xpBegin:O,xpEnd:k}}trackBlobUrl(e){let t=this._preloadingLayoutId||this.currentLayoutId||0;t||this.log.warn(`trackBlobUrl called without currentLayoutId, tracking under key 0`),this.layoutBlobUrls.has(t)||this.layoutBlobUrls.set(t,new Set),this.layoutBlobUrls.get(t).add(e)}revokeBlobUrlsForLayout(e){let t=this.layoutBlobUrls.get(e);t&&(t.forEach(e=>{URL.revokeObjectURL(e)}),this.layoutBlobUrls.delete(e),this.log.info(`Revoked ${t.size} blob URLs for layout ${e}`))}updateLayoutDuration(){if(!this.currentLayout)return;let e=0;for(let t of this.currentLayout.regions){if(t.isDrawer)continue;let n=0;for(let e of t.widgets)e.duration>0&&(n+=e.duration);e=Math.max(e,n)}if(e>0&&e!==this.currentLayout.duration){let t=this.currentLayout.duration;this.currentLayout.duration=e,this.currentLayout._durationFromMetadata=!0,this.log.info(`Layout duration updated: ${t}s → ${e}s (based on video metadata)`);let n=!this._hasUnprobedVideos();if(this.emit(`layoutDurationUpdated`,this.currentLayoutId,e,n),this._deferredTimerLayoutId===this.currentLayoutId&&!this.layoutTimer){if(this._hasUnprobedVideos())this.log.info(`Layout duration updated to ${e}s but still has unprobed videos — keeping timer deferred`);else{this._deferredTimerFallback&&=(clearTimeout(this._deferredTimerFallback),null);let t=Date.now()-(this._layoutTimerStartedAt||Date.now()),n=Math.max(1e3,e*1e3-t);this._deferredTimerLayoutId=null,this._layoutTimerDurationMs=n,this.layoutTimer=setTimeout(()=>{this.log.info(`Layout ${this.currentLayoutId} duration expired (${this.currentLayout.duration}s)`),this.currentLayoutId&&(this.layoutEndEmitted=!0,this.emit(`layoutEnd`,this.currentLayoutId))},n),this.log.info(`All video durations resolved — deferred timer started: ${(n/1e3).toFixed(1)}s remaining (waited ${(t/1e3).toFixed(1)}s for metadata)`)}}else if(this.layoutTimer){clearTimeout(this.layoutTimer);let e=Date.now()-(this._layoutTimerStartedAt||Date.now()),t=Math.max(1e3,this.currentLayout.duration*1e3-e);this.layoutTimer=setTimeout(()=>{this.log.info(`Layout ${this.currentLayoutId} duration expired (${this.currentLayout.duration}s)`),this.currentLayoutId&&(this.layoutEndEmitted=!0,this.emit(`layoutEnd`,this.currentLayoutId))},t),this.log.info(`Layout timer adjusted to ${(t/1e3).toFixed(1)}s remaining (elapsed ${(e/1e3).toFixed(1)}s of ${this.currentLayout.duration}s)`)}else this.log.info(`Layout duration updated to ${e}s (timer not yet started, will use new value)`);this._scheduleNextLayoutPreload(this.currentLayout)}}setStateStore(e){if(this._stateUnsubscribe){try{this._stateUnsubscribe()}catch{}this._stateUnsubscribe=null}this._stateStore=e||null,this._stateStore&&typeof this._stateStore.on==`function`&&(this._stateUnsubscribe=this._stateStore.on(`change`,()=>{this.reevaluateXpIf()}))}getStateStore(){return this._stateStore}_evaluateXpIf(e){if(!e||!e.xpIf||!this._stateStore)return!0;try{return d(u(e.xpIf,this._stateStore))}catch(t){return t instanceof l?this.log.warn(`xpIf evaluation failed (widget ${e.id}): ${t.message} — hiding widget`):this.log.error(`xpIf unexpected error (widget ${e.id}):`,t),!1}}reevaluateXpIf(){if(this._stateStore){for(let e of this.regions.values())if(e&&e.widgets)for(let t of e.widgets){if(!t.xpIf)continue;let n=e.widgetElements?.get(t.id);if(!n)continue;let r=this._evaluateXpIf(t);n.dataset.xpIf=r?`true`:`false`,r?(n.style.visibility!==`hidden`||n.dataset.xpIfActive===`1`)&&(n.style.visibility=`visible`,n.style.opacity=`1`):(n.style.visibility=`hidden`,n.style.opacity=`0`)}this.emit(`xpIfReevaluated`)}}_applyXpStateInit(e){if(!e||!e.xpStateInit)return null;let t=e.xpStateInit;if(!t.rawValue)return this.log.warn(`xp-state-init widget ${t.widgetId} has empty xpStateInit option — skipping`),null;let n;try{n=K(t.rawValue)}catch(e){return this.log.error(`xp-state-init widget ${t.widgetId} decode failed: ${e.message} — keeping existing store`),null}t.language&&typeof n==`object`&&!(`lang`in n)&&(n.lang=t.language);let r=t.scope||`session`,i;try{i=new j({scope:r,initialState:n})}catch(e){return this.log.error(`xp-state-init widget ${t.widgetId}: XpStateStore construction failed: ${e.message}`),null}return this.setStateStore(i),this.setupXpStateDispatcher(),this.log.info(`xp-state-init applied: widget=${t.widgetId} scope=${r} keys=${Object.keys(n).length}`),i}attachActionListeners(e){let t=[],n=0;for(let r of e.actions||[])r.triggerType===`touch`?(this.attachTouchAction(this.container,r,null,null),n++):r.triggerType?.startsWith(`keyboard:`)&&t.push(r);for(let r of e.regions){let e=this.regions.get(r.id);if(e){for(let i of r.actions||[])i.triggerType===`touch`?(this.attachTouchAction(e.element,i,r.id,null),n++):i.triggerType.startsWith(`keyboard:`)&&t.push(i);for(let i of r.widgets){if(!i.actions||i.actions.length===0)continue;let a=e.widgetElements.get(i.id);if(a)for(let e of i.actions)e.triggerType===`touch`?(this.attachTouchAction(a,e,r.id,i.id),n++):e.triggerType.startsWith(`keyboard:`)&&t.push(e)}}}this.setupKeyboardListener(t),(n>0||t.length>0)&&this.log.info(`Actions attached: ${n} touch, ${t.length} keyboard`)}attachTouchAction(e,t,n,r){e.style.cursor=`pointer`;let i=e=>{e.stopPropagation();let i=r?`widget ${r}`:`region ${n}`;this.log.info(`Touch action fired on ${i}: ${t.actionType}`),this.emit(`action-trigger`,{actionType:t.actionType,triggerType:`touch`,triggerCode:t.triggerCode,layoutCode:t.layoutCode,targetId:t.targetId,commandCode:t.commandCode,source:{regionId:n,widgetId:r}})};e.addEventListener(`click`,i),e._actionHandlers||=[],e._actionHandlers.push(i)}setupKeyboardListener(e){this.removeKeyboardListener(),this._keyboardActions=e,e.length!==0&&(this._keydownHandler=e=>{let t=e.key;for(let e of this._keyboardActions)if(t===e.triggerType.substring(9)){this.log.info(`Keyboard action (key: ${t}): ${e.actionType}`),this.emit(`action-trigger`,{actionType:e.actionType,triggerType:e.triggerType,triggerCode:e.triggerCode,layoutCode:e.layoutCode,targetId:e.targetId,commandCode:e.commandCode,source:{key:t}});break}},document.addEventListener(`keydown`,this._keydownHandler))}removeKeyboardListener(){this._keydownHandler&&=(document.removeEventListener(`keydown`,this._keydownHandler),null),this._keyboardActions=[]}setupXpStateDispatcher(){this.on(`action-trigger`,e=>{let t=this.getStateStore&&this.getStateStore();if(!t||!e.commandCode)return;let n=e.commandCode;if(n.startsWith(`xp:setState:`)){let e=n.substring(12),r=e.indexOf(`:`);if(r>0){let n=e.substring(0,r),i=e.substring(r+1);t.set(n,i),this.log.info(`xp:setState ${n} = ${i}`)}}else if(n.startsWith(`xp:delState:`)){let e=n.substring(12);e&&(t.delete(e),this.log.info(`xp:delState ${e}`))}else if(n.startsWith(`xp:newState:`)){let e=n.substring(12),r=e.indexOf(`:`);if(r>0){let n=e.substring(0,r),i=e.substring(r+1);t.set(n,i),this.log.info(`xp:newState ${n} = ${i}`)}}})}removeActionListeners(){for(let[,e]of this.regions){this._cleanElementActionHandlers(e.element);for(let[,t]of e.widgetElements)this._cleanElementActionHandlers(t)}this.removeKeyboardListener()}_cleanElementActionHandlers(e){if(e._actionHandlers){for(let t of e._actionHandlers)e.removeEventListener(`click`,t);delete e._actionHandlers,e.style.cursor=``}}_findRegionByWidgetId(e){for(let[t,n]of this.regions){let r=n.widgets.findIndex(t=>t.id===e);if(r!==-1)return{regionId:t,region:n,widget:n.widgets[r],widgetIndex:r,regionMap:this.regions}}for(let t of this.activeOverlays.values())if(t.regions)for(let[n,r]of t.regions){let i=r.widgets.findIndex(t=>t.id===e);if(i!==-1)return{regionId:n,region:r,widget:r.widgets[i],widgetIndex:i,regionMap:t.regions}}return null}_advanceRegion(e,t){let n=t.get(e);if(!n)return;n.currentIndex=(n.currentIndex+1)%n.widgets.length;let r=t===this.regions;this._startRegionCycle(n,e,this._renderWidgetBound,this._stopWidgetBound,r?()=>this.checkLayoutComplete():void 0)}_handleInteractiveTrigger({targetId:e,triggerCode:t}){this.log.info(`XIC interactiveTrigger: target=${e} code=${t}`),this._findRegionByWidgetId(e)?this.navigateToWidget(e):this.log.warn(`XIC interactiveTrigger: widget ${e} not found`)}_handleWidgetExpire({widgetId:e}){let t=this._findRegionByWidgetId(e);if(!t){this.log.warn(`XIC widgetExpire: widget ${e} not found`);return}let{regionId:n,region:r,widgetIndex:i,regionMap:a}=t;this.log.info(`XIC widgetExpire: widget=${e} region=${n}`),r.timer&&=(clearTimeout(r.timer),null),this.stopWidget(n,i),this._advanceRegion(n,a)}_handleWidgetExtendDuration({widgetId:e,duration:t}){let n=this._findRegionByWidgetId(e);if(!n){this.log.warn(`XIC widgetExtendDuration: widget ${e} not found`);return}let{regionId:r,region:i}=n;this.log.info(`XIC widgetExtendDuration: widget=${e} +${t}s`),i.timer&&=(clearTimeout(i.timer),null),i.timer=setTimeout(()=>{this.stopWidget(r,i.currentIndex),this._advanceRegion(r,n.regionMap)},t*1e3)}_handleWidgetSetDuration({widgetId:e,duration:t}){let n=this._findRegionByWidgetId(e);if(!n){this.log.warn(`XIC widgetSetDuration: widget ${e} not found`);return}let{regionId:r,region:i}=n;this.log.info(`XIC widgetSetDuration: widget=${e} ${t}s`),i.timer&&=(clearTimeout(i.timer),null),i.timer=setTimeout(()=>{this.stopWidget(r,i.currentIndex),this._advanceRegion(r,n.regionMap)},t*1e3)}navigateToWidget(e){for(let[t,n]of this.regions){let r=n.widgets.findIndex(t=>t.id===e);if(r!==-1){if(this.log.info(`Navigating to widget ${e} in region ${t} (index ${r})`),n.isDrawer&&n.element.style.display===`none`&&(n.element.style.display=``,this.log.info(`Drawer region ${t} revealed`)),n.timer&&=(clearTimeout(n.timer),null),this.stopWidget(t,n.currentIndex),n.currentIndex=r,this.renderWidget(t,r),n.widgets.length>1){let e=n.widgets[r].duration*1e3;n.timer=setTimeout(()=>{this.stopWidget(t,r);let e=(r+1)%n.widgets.length;n.currentIndex=e,n.isDrawer&&e===0?(n.element.style.display=`none`,this.log.info(`Drawer region ${t} hidden (cycle complete)`)):n.isDrawer?this.navigateToWidget(n.widgets[e].id):this.startRegion(t)},e)}else if(n.isDrawer){let e=n.widgets[r].duration*1e3;n.timer=setTimeout(()=>{this.stopWidget(t,r),n.element.style.display=`none`,this.log.info(`Drawer region ${t} hidden (single widget done)`)},e)}return}}this.log.warn(`Target widget ${e} not found in any region`)}nextWidget(e){let t=e?this.regions.get(e):this.regions.values().next().value;if(!t||t.widgets.length<=1)return;let n=(t.currentIndex+1)%t.widgets.length,r=t.widgets[n];this.log.info(`nextWidget → index ${n} (widget ${r.id})`),this.navigateToWidget(r.id)}previousWidget(e){let t=e?this.regions.get(e):this.regions.values().next().value;if(!t||t.widgets.length<=1)return;let n=(t.currentIndex-1+t.widgets.length)%t.widgets.length,r=t.widgets[n];this.log.info(`previousWidget → index ${n} (widget ${r.id})`),this.navigateToWidget(r.id)}_mediaFileUrl(e){return`${window.location.origin}${i}/media/file/${e}`}_positionWidgetElement(e){Object.assign(e.style,{position:`absolute`,top:`0`,left:`0`,width:`100%`,height:`100%`,visibility:`hidden`,opacity:`0`})}_applyBackgroundImage(e,t){Object.assign(e.style,{backgroundImage:`url(${t})`,backgroundSize:`cover`,backgroundPosition:`center`,backgroundRepeat:`no-repeat`})}_clearRegionTimers(e){for(let[,t]of e)t.timer&&=(clearTimeout(t.timer),null)}async renderLayout(e,t){try{if(this.log.info(`Rendering layout ${t}`),this.currentLayoutId===t){this.log.info(`Replaying layout ${t} - reusing elements (no recreation!)`),this._clearRegionTimers(this.regions),this._stopAllRegionWidgets(this.regions,this._stopWidgetBound);for(let[,e]of this.regions)e.currentIndex=0,e.complete=!1;this.layoutTimer&&=(clearTimeout(this.layoutTimer),null),this.layoutEndEmitted=!1,this._deferredTimerLayoutId=null,this._deferredTimerFallback&&=(clearTimeout(this._deferredTimerFallback),null),this.emit(`layoutStart`,t,this.currentLayout);for(let[e,t]of this.regions)t.isDrawer||this.startRegion(e);this.startLayoutTimerWhenReady(t,this.currentLayout),this.log.info(`Layout ${t} restarted (reused elements)`),this._scheduleNextLayoutPreload(this.currentLayout);return}if(this.layoutPool.has(t)){this.log.info(`Layout ${t} found in preload pool - instant swap!`),await this._swapToPreloadedLayout(t);return}this.log.info(`Switching to new layout ${t}`),this.stopCurrentLayout();let n=this.parseXlf(e);if(this.currentLayout=n,this.currentLayoutId=t,this._applyXpStateInit(n),this.calculateScale(n),this.container.style.backgroundColor=n.bgcolor,this.container.style.backgroundImage=``,n.background){let e=this.options.fileIdToSaveAs?.get(String(n.background))||n.background;this._applyBackgroundImage(this.container,this._mediaFileUrl(e)),this.log.info(`Background image set: ${n.background} → ${e}`)}for(let e of n.regions)await this.createRegion(e);this.log.info(`Pre-creating widget elements for instant transitions...`);for(let[e,t]of this.regions)for(let n=0;n<t.widgets.length;n++){let r=t.widgets[n];r.layoutId=this.currentLayoutId,r.regionId=e;try{let e=await this.createWidgetElement(r,t);this._positionWidgetElement(e),t.element.appendChild(e),t.widgetElements.set(r.id,e)}catch(e){this.log.error(`Failed to pre-create widget ${r.id}:`,e)}}if(this.log.info(`All widget elements pre-created`),this.attachActionListeners(n),this.emit(`layoutStart`,t,n),n.duration>0){let e=!this._hasUnprobedVideos();this.emit(`layoutDurationUpdated`,t,n.duration,e)}for(let[e,t]of this.regions)t.isDrawer||this.startRegion(e);this.startLayoutTimerWhenReady(t,n),this._scheduleNextLayoutPreload(n),this.log.info(`Layout ${t} started`)}catch(e){throw this.log.error(`Error rendering layout:`,e),this.emit(`error`,{type:`layoutError`,error:e,layoutId:t}),e}}_createRegionEntry(e,t,n,r={}){let{className:i=`renderer-lite-region`,...a}=r,o=document.createElement(`div`);o.id=t,o.className=i,o.style.position=`absolute`,o.style.zIndex=String(e.zindex),o.style.overflow=`hidden`,this.applyRegionScale(o,e),n.appendChild(o);let s=this.scaleFactor;return{element:o,config:e,widgets:e.widgets,currentIndex:0,timer:null,width:e.width*s,height:e.height*s,complete:!1,widgetElements:new Map,...a}}async createRegion(e){let t=this._createRegionEntry(e,`region_${e.id}`,this.container,{isDrawer:e.isDrawer||!1,isCanvas:e.isCanvas||!1});e.isDrawer&&(t.element.style.display=`none`);let n=e.widgets.filter(e=>this._isWidgetActive(e));n.some(e=>e.cyclePlayback)&&(n=this._applyCyclePlayback(n)),t.widgets=n,this.regions.set(e.id,t)}startRegion(e){let t=this.regions.get(e);this._startRegionCycle(t,e,this._renderWidgetBound,this._stopWidgetBound,()=>{this.log.info(`Region ${e} completed one full cycle`),this.checkLayoutComplete()})}async createWidgetElement(e,t){if(e.render===`html`&&e.type!==`pdf`)return await this.renderGenericWidget(e,t);switch(e.type){case`image`:return await this.renderImage(e,t);case`video`:return await this.renderVideo(e,t);case`audio`:return await this.renderAudio(e,t);case`text`:case`ticker`:return await this.renderTextWidget(e,t);case`pdf`:return await this.renderPdf(e,t);case`webpage`:return await this.renderWebpage(e,t);case`localvideo`:return await this.renderVideo(e,t);case`videoin`:return await this.renderVideoIn(e,t);case`powerpoint`:case`flash`:return this.log.warn(`Widget type '${e.type}' is not supported on web players (widget ${e.id})`),this._renderUnsupportedPlaceholder(e,t);default:return await this.renderGenericWidget(e,t)}}findMediaElement(e,t){return e.tagName===t?e:e.querySelector(t.toLowerCase())}updateMediaElement(e,t){let n=this.findMediaElement(e,`VIDEO`)||this.findMediaElement(e,`AUDIO`);if(n){if(n.tagName===`VIDEO`&&n._mediaConstraints&&!n._mediaStream){navigator.mediaDevices.getUserMedia(n._mediaConstraints).then(e=>{n.srcObject=e,n._mediaStream=e,this.log.info(`Webcam stream re-acquired for widget ${t.id}`)}).catch(e=>{this.log.warn(`Failed to re-acquire webcam stream:`,e.message)});return}this._restartMediaElement(n),this.log.info(`${n.tagName===`VIDEO`?`Video`:`Audio`} restarted: ${t.fileId||t.id}`)}}_restartMediaElement(e){e.currentTime=0;let t=()=>{e.removeEventListener(`seeked`,t),e.play().catch(()=>{})};e.addEventListener(`seeked`,t),e.play().catch(()=>{})}waitForWidgetReady(e,t){let n=1e4,r=this.findMediaElement(e,`VIDEO`);if(r)return!r.paused&&r.readyState>=3?Promise.resolve():new Promise(e=>{let i=setTimeout(()=>{this.log.warn(`Video ready timeout (${n}ms) for widget ${t.id}`),e()},n),a=()=>{r.removeEventListener(`playing`,a),clearTimeout(i),this.log.info(`Video widget ${t.id} ready (playing)`),e()};r.addEventListener(`playing`,a)});let i=this.findMediaElement(e,`AUDIO`);if(i)return!i.paused&&i.readyState>=3?Promise.resolve():new Promise(e=>{let r=setTimeout(()=>{this.log.warn(`Audio ready timeout (${n}ms) for widget ${t.id}`),e()},n),a=()=>{i.removeEventListener(`playing`,a),clearTimeout(r),this.log.info(`Audio widget ${t.id} ready (playing)`),e()};i.addEventListener(`playing`,a)});let a=this.findMediaElement(e,`IMG`);return a?a.complete&&a.naturalWidth>0?Promise.resolve():new Promise(e=>{let r=()=>{a.removeEventListener(`load`,r),clearTimeout(i),e()},i=setTimeout(()=>{a.removeEventListener(`load`,r),this.log.warn(`Image ready timeout for widget ${t.id}`),e()},n);a.addEventListener(`load`,r)}):Promise.resolve()}async startLayoutTimerWhenReady(e,t){if(!t||t.duration<=0)return;let n=[];for(let[e,t]of this.regions){if(t.widgets.length===0)continue;let e=t.widgets[t.currentIndex||0],r=t.widgetElements.get(e.id);r&&n.push(this.waitForWidgetReady(r,e))}if(n.length>0&&(this.log.info(`Waiting for ${n.length} widget(s) to be ready before starting layout timer...`),await Promise.all(n),this.log.info(`All widgets ready — starting layout timer`)),this.currentLayoutId!==e){this.log.warn(`Layout changed while waiting for widgets — skipping timer for ${e}`);return}if(t.isDynamic&&!t._durationFromMetadata&&this._hasUnprobedVideos()){this._deferredTimerLayoutId=e,this._layoutTimerStartedAt=Date.now(),this.log.info(`Layout ${e} has unprobed videos — deferring timer until metadata loads`),this._deferredTimerFallback=setTimeout(()=>{this._deferredTimerFallback=null,this._deferredTimerLayoutId===e&&!this.layoutTimer&&(this.log.warn(`Layout ${e}: metadata timeout after 30s — starting timer with ${t.duration}s estimate`),this._deferredTimerLayoutId=null,this._startLayoutTimer(e,t))},3e4);return}this._startLayoutTimer(e,t)}_hasUnprobedVideos(){for(let[,e]of this.regions)for(let t of e.widgets)if(t.type===`video`&&t.useDuration===0&&t._probed)return!1;for(let[,e]of this.regions)for(let t of e.widgets)if(t.type===`video`&&t.useDuration===0)return!0;return!1}_startLayoutTimer(e,t){this._deferredTimerLayoutId=null,this._deferredTimerFallback&&=(clearTimeout(this._deferredTimerFallback),null);let n=t.duration*1e3;this.log.info(`Layout ${e} will end after ${t.duration}s`),this._layoutTimerStartedAt=Date.now(),this._layoutTimerDurationMs=n,this.layoutTimer=setTimeout(()=>{this.log.info(`Layout ${e} duration expired (${t.duration}s)`),this.currentLayoutId&&(this.layoutEndEmitted=!0,this.emit(`layoutEnd`,this.currentLayoutId))},n)}async _showWidget(e,t){let n=e.widgets[t];if(!n)return null;let r=e.widgetElements.get(n.id);if(r||(this.log.warn(`Widget ${n.id} not pre-created, creating now`),r=await this.createWidgetElement(n,e),r.style.position=`absolute`,r.style.top=`0`,r.style.left=`0`,r.style.width=`100%`,r.style.height=`100%`,e.widgetElements.set(n.id,r),e.element.appendChild(r)),!e.isCanvas)for(let[t,r]of e.widgetElements)t!==n.id&&(r.getAnimations?.().forEach(e=>e.cancel()),r.style.visibility=`hidden`,r.style.opacity=`0`,r.dataset&&(r.dataset.xpIfActive=`0`));return r.dataset&&(r.dataset.xpIfActive=`1`),this._evaluateXpIf(n)?(r.dataset&&n.xpIf&&(r.dataset.xpIf=`true`),this.updateMediaElement(r,n),r.getAnimations?.().forEach(e=>e.cancel()),r.style.visibility=`visible`,n.transitions.in?Z.apply(r,n.transitions.in,!0,e.width,e.height):r.style.opacity=`1`,r._pdfResume&&r._pdfResume(),this._startAudioOverlays(n),n):(this.updateMediaElement(r,n),r.getAnimations?.().forEach(e=>e.cancel()),r.style.visibility=`hidden`,r.style.opacity=`0`,r.dataset.xpIf=`false`,this.emit(`xpIfHidden`,{widgetId:n.id,regionId:e.config?.id,expr:n.xpIf}),n)}_startAudioOverlays(e){if(!e.audioNodes||e.audioNodes.length===0)return;this._stopAudioOverlays(e.id);let t=[];for(let n of e.audioNodes){if(!n.uri)continue;let r=document.createElement(`audio`);r.autoplay=!0,r.loop=n.loop,r.volume=Math.max(0,Math.min(1,n.volume/100)),r.src=n.uri?this._mediaFileUrl(n.uri):``,r.style.display=`none`,this.container.appendChild(r);let i=r.play();i&&i.catch&&i.catch(()=>{}),t.push(r),this.log.info(`Audio overlay started for widget ${e.id}: ${n.uri} (loop=${n.loop}, vol=${n.volume})`)}t.length>0&&this.audioOverlays.set(e.id,t)}_stopAudioOverlays(e){let t=this.audioOverlays.get(e);if(t){for(let e of t)e.pause(),e.removeAttribute(`src`),e.load(),e.parentNode&&e.parentNode.removeChild(e);this.audioOverlays.delete(e),this.log.info(`Audio overlays stopped for widget ${e}`)}}_hideWidget(e,t){let n=e.widgets[t];if(!n)return{widget:null,animPromise:null};let r=e.widgetElements.get(n.id);if(!r)return{widget:null,animPromise:null};let i=null;if(n.transitions.out){let t=Z.apply(r,n.transitions.out,!1,e.width,e.height);t&&(i=new Promise(e=>{t.onfinish=e}))}let a=r.querySelector(`video`);if(a&&(a.pause(),a._mediaStream&&(a._mediaStream.getTracks().forEach(e=>e.stop()),a._mediaStream=null,a.srcObject=null),a._hlsInstance&&=(a._hlsInstance.destroy(),null),a.removeAttribute(`src`),a.load(),a._eventCleanup)){for(let[e,t]of a._eventCleanup)a.removeEventListener(e,t);a._eventCleanup=null}let o=r.querySelector(`audio`);if(o&&n.options.loop!==`1`&&o.pause(),o?._eventCleanup){for(let[e,t]of o._eventCleanup)o.removeEventListener(e,t);o._eventCleanup=null}this._stopAudioOverlays(n.id),r._pdfCleanup&&r._pdfCleanup();let s=r.querySelectorAll(`iframe`);for(let e of s){try{let t=e.contentDocument||e.contentWindow?.document;t&&(t.querySelectorAll(`video`).forEach(e=>{e.pause(),e.removeAttribute(`src`),e.load()}),t.querySelectorAll(`audio`).forEach(e=>{e.pause(),e.removeAttribute(`src`),e.load()}))}catch{}e.src=`about:blank`}return{widget:n,animPromise:i}}_isWidgetActive(e){let t=new Date;return!(e.fromDt&&t<new Date(e.fromDt)||e.toDt&&t>new Date(e.toDt))}_parseDurationComments(e,t){let n=t.duration,r=e.match(/<!--\s*DURATION=(\d+)\s*-->/);if(r){let e=parseInt(r[1],10);if(e>0){this.log.info(`Widget ${t.id}: DURATION comment overrides duration ${t.duration}→${e}s`),t.duration=e,t.duration!==n&&this.updateLayoutDuration();return}}let i=e.match(/<!--\s*NUMITEMS=(\d+)\s*-->/);if(i){let e=parseInt(i[1],10);if(e>0&&t.duration>0){let n=e*t.duration;this.log.info(`Widget ${t.id}: NUMITEMS=${e} × ${t.duration}s = ${n}s`),t.duration=n}}t.duration!==n&&this.updateLayoutDuration()}_applyCyclePlayback(e){this._subPlaylistCycleIndex||=new Map;let t=new Map,n=[];for(let r of e)r.parentWidgetId&&r.cyclePlayback?(t.has(r.parentWidgetId)||t.set(r.parentWidgetId,[]),t.get(r.parentWidgetId).push(r)):n.push({type:`direct`,widget:r});for(let[e,r]of t){r.sort((e,t)=>e.displayOrder-t.displayOrder);let t;if(r.some(e=>e.isRandom))t=r[Math.floor(Math.random()*r.length)];else{let n=this._subPlaylistCycleIndex.get(e)||{widgetIdx:0,playsDone:0};t=r[n.widgetIdx%r.length];let i=t.playCount||1;n.playsDone++,n.playsDone>=i&&(n.widgetIdx++,n.playsDone=0),this._subPlaylistCycleIndex.set(e,n)}this.log.info(`Sub-playlist cycle: group ${e} selected widget ${t.id} (${r.length} in group)`),n.push({type:`direct`,widget:t})}return n.map(e=>e.widget)}_startRegionCycle(e,t,n,r,i){if(!e||e.widgets.length===0)return;if(e.isCanvas){this._startCanvasRegion(e,t,n,i);return}if(e.widgets.length===1){n(t,0);return}let a=()=>{let o=e.currentIndex,s=e.widgets[o];n(t,o);let c=s.duration*1e3;this.log.info(`Region ${t} widget ${s.id} (${s.type}) playing for ${s.duration}s (useDuration=${s.useDuration}, index ${o}/${e.widgets.length})`),e.timer=setTimeout(()=>{this._handleWidgetCycleEnd(s,e,t,o,n,r,i,a)},c)};a()}_startCanvasRegion(e,t,n,r){for(let r=0;r<e.widgets.length;r++)n(t,r);let i=Math.max(...e.widgets.map(e=>e.duration))*1e3;i>0?e.timer=setTimeout(()=>{e.complete||(e.complete=!0,r?.())},i):(e.complete=!0,r?.())}_handleWidgetCycleEnd(e,t,n,r,i,a,o,s){e.webhookUrl&&this.emit(`widgetAction`,{type:`durationEnd`,widgetId:e.id,layoutId:this.currentLayoutId,regionId:n,url:e.webhookUrl}),a(n,r);let c=(t.currentIndex+1)%t.widgets.length;if(c===0&&!t.complete&&(t.complete=!0,o?.()),c===0&&t.config?.loop===!1&&t.widgets.length===1){i(n,0);return}this.layoutEndEmitted||(t.currentIndex=c,s())}async renderWidget(e,t){let n=this.regions.get(e);if(n)try{let r=await this._showWidget(n,t);if(r&&(this.log.info(`Showing widget ${r.type} (${r.id}) in region ${e}`),this._startedWidgets.add(`${e}:${t}`),this.emit(`widgetStart`,{widgetId:r.id,regionId:e,layoutId:this.currentLayoutId,mediaId:parseInt(r.fileId||r.id)||null,type:r.type,duration:r.duration,enableStat:r.enableStat}),r.commands&&r.commands.length>0))for(let t of r.commands)this.emit(`widgetCommand`,{commandCode:t.commandCode,commandString:t.commandString,widgetId:r.id,regionId:e,layoutId:this.currentLayoutId})}catch(r){this.log.error(`Error rendering widget:`,r),this.emit(`error`,{type:`widgetError`,error:r,widgetId:n.widgets[t]?.id,regionId:e})}}async stopWidget(e,t){let n=`${e}:${t}`;if(!this._startedWidgets.delete(n))return;let r=this.regions.get(e);if(!r)return;let{widget:i,animPromise:a}=this._hideWidget(r,t);i&&this.emit(`widgetEnd`,{widgetId:i.id,regionId:e,layoutId:this.currentLayoutId,mediaId:parseInt(i.fileId||i.id)||null,type:i.type,enableStat:i.enableStat}),a&&await a}_stopAllRegionWidgets(e,t){for(let[n,r]of e)if(r.isCanvas)for(let e=0;e<r.widgets.length;e++)t(n,e);else r.widgets.length>0&&t(n,r.currentIndex)}async renderImage(e,t){let n=document.createElement(`img`);n.className=`renderer-lite-widget`,n.style.width=`100%`,n.style.height=`100%`;let r=e.options.scaleType,i={stretch:`fill`,center:`contain`,fit:`cover`};n.style.objectFit=i[r]||`contain`;let a={left:`left`,center:`center`,right:`right`},o={top:`top`,middle:`center`,bottom:`bottom`},s=a[e.options.alignId]||`center`,c=o[e.options.valignId]||`center`;return n.style.objectPosition=`${s} ${c}`,n.style.opacity=`0`,n.src=e.options.uri?this._mediaFileUrl(e.options.uri):``,n}async renderVideo(e,n){let r=document.createElement(`video`);r.className=`renderer-lite-widget`,r.style.width=`100%`,r.style.height=`100%`;let i=e.options.scaleType,a={stretch:`fill`,center:`none`,fit:`contain`};r.style.objectFit=a[i]||`contain`,r.style.opacity=`1`,r.autoplay=!0,r.preload=`auto`,r.muted=e.options.mute===`1`,r.loop=!1,r.controls=!1,r.playsInline=!0;let o=e.options.uri||``,s=e.fileId||e.id,c=()=>{e.options.loop===`1`?(r.currentTime=0,this.log.info(`Video ${o} ended - reset to start, waiting for widget cycle to replay`)):this.log.info(`Video ${o} ended - paused on last frame`)};r.addEventListener(`ended`,c);let l=o?this._mediaFileUrl(o):``;if(l.includes(`.m3u8`)){if(r.canPlayType(`application/vnd.apple.mpegurl`))this.log.info(`HLS stream (native): ${s}`),r.src=l;else try{let{default:e}=await t(async()=>{let{default:e}=await import(`hls.js`);return{default:e}},[],import.meta.url);if(e.isSupported()){let t=new e({enableWorker:!0,lowLatencyMode:!0});t.loadSource(l),t.attachMedia(r),r._hlsInstance=t,t.on(e.Events.ERROR,(e,n)=>{n.fatal&&(this.log.error(`HLS fatal error: ${n.type}`,n.details),t.destroy(),r._hlsInstance=null)}),this.log.info(`HLS stream (hls.js): ${s}`)}else this.log.warn(`HLS not supported on this browser for ${s}`),r.src=l}catch(e){this.log.warn(`hls.js not available, falling back to native: ${e.message}`),r.src=l}}else r.src=l;let u=this._preloadingLayoutId||this.currentLayoutId,d=()=>{let t=r.duration;this.log.info(`Video ${o} duration detected: ${t}s`),(e.duration===0||e.useDuration===0)&&(e.duration=t,e._probed=!0,this.log.info(`Updated widget ${e.id} duration to ${t}s (useDuration=0)`),this.currentLayoutId===u?this.updateLayoutDuration():this.log.info(`Video ${o} duration set but layout timer not updated (preloaded for layout ${u}, current is ${this.currentLayoutId})`))};r.addEventListener(`loadedmetadata`,d);let f=()=>{this.log.info(`Video loaded and ready:`,o)};r.addEventListener(`loadeddata`,f);let p=()=>{let t=r.error,n=t?.code,i=t?.message||`Unknown error`;this.log.warn(`Video error: ${o}, code: ${n}, time: ${r.currentTime.toFixed(1)}s, message: ${i}`),e.useDuration===0&&e.duration===0&&(e.duration=60,this.log.info(`Set fallback duration 60s for errored widget ${e.id}`),this.currentLayoutId===u&&this.updateLayoutDuration()),this.emit(`videoError`,{storedAs:o,fileId:s,errorCode:n,errorMessage:i,currentTime:r.currentTime})};r.addEventListener(`error`,p);let m=()=>{this.log.info(`Video playing:`,o)};return r.addEventListener(`playing`,m),r._eventCleanup=[[`ended`,c],[`loadedmetadata`,d],[`loadeddata`,f],[`error`,p],[`playing`,m]],this.log.info(`Video element created:`,o,r.src),r}async renderVideoIn(e,t){let n=document.createElement(`video`);n.className=`renderer-lite-widget`,n.style.width=`100%`,n.style.height=`100%`,n.style.objectFit=e.options.showFullScreen===`1`?`cover`:`contain`,n.autoplay=!0,n.playsInline=!0,n.controls=!1,n.muted=e.options.mute!==`0`,e.options.mirror===`1`&&(n.style.transform=`scaleX(-1)`);let r={width:{ideal:t.width},height:{ideal:t.height}},i=e.options.sourceId||e.options.deviceId;i?r.deviceId={exact:i}:r.facingMode=e.options.facingMode||`environment`;let a={video:r,audio:e.options.captureAudio===`1`};n._mediaConstraints=a;try{let t=await navigator.mediaDevices.getUserMedia(a);n.srcObject=t,n._mediaStream=t,this.log.info(`Webcam stream acquired for widget ${e.id} (tracks: ${t.getTracks().length})`)}catch(n){return this.log.warn(`getUserMedia failed for widget ${e.id}: ${n.message}`),this._renderUnsupportedPlaceholder({...e,type:`Camera unavailable`},t)}return n}async renderAudio(e,t){let n=document.createElement(`div`);n.className=`renderer-lite-widget audio-widget`,n.style.width=`100%`,n.style.height=`100%`,n.style.display=`flex`,n.style.flexDirection=`column`,n.style.alignItems=`center`,n.style.justifyContent=`center`,n.style.background=`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,n.style.opacity=`0`;let r=document.createElement(`audio`);r.autoplay=!0,r.loop=e.options.loop===`1`,r.volume=parseFloat(e.options.volume||`100`)/100;let i=e.options.uri||``;e.fileId||e.id,r.src=i?this._mediaFileUrl(i):``;let a=()=>{e.options.loop===`1`?(r.currentTime=0,this.log.info(`Audio ${i} ended - reset to start, waiting for widget cycle to replay`)):this.log.info(`Audio ${i} ended - playback complete`)};r.addEventListener(`ended`,a);let o=this._preloadingLayoutId||this.currentLayoutId,s=()=>{let t=Math.floor(r.duration);this.log.info(`Audio ${i} duration detected: ${t}s`),(e.duration===0||e.useDuration===0)&&(e.duration=t,this.log.info(`Updated widget ${e.id} duration to ${t}s (useDuration=0)`),this.currentLayoutId===o?this.updateLayoutDuration():this.log.info(`Audio ${i} duration set but layout timer not updated (preloaded for layout ${o}, current is ${this.currentLayoutId})`))};r.addEventListener(`loadedmetadata`,s);let c=()=>{let e=r.error;this.log.warn(`Audio error (non-fatal): ${i}, code: ${e?.code}, message: ${e?.message||`Unknown`}`)};r.addEventListener(`error`,c),r._eventCleanup=[[`ended`,a],[`loadedmetadata`,s],[`error`,c]];let l=document.createElement(`div`);l.innerHTML=`♪`,l.style.fontSize=`120px`,l.style.color=`white`,l.style.marginBottom=`20px`;let u=document.createElement(`div`);u.style.color=`white`,u.style.fontSize=`24px`,u.textContent=`Playing Audio`;let d=document.createElement(`div`);return d.style.color=`rgba(255,255,255,0.7)`,d.style.fontSize=`16px`,d.style.marginTop=`10px`,d.textContent=e.options.uri,n.appendChild(r),n.appendChild(l),n.appendChild(u),n.appendChild(d),n}async renderTextWidget(e,t){return await this._renderIframeWidget(e,t)}async renderPdf(e,r){let i=document.createElement(`div`);if(i.className=`renderer-lite-widget pdf-widget`,i.style.width=`100%`,i.style.height=`100%`,i.style.backgroundColor=`transparent`,i.style.opacity=`0`,i.style.position=`relative`,window.pdfjsLib===void 0)try{let e=await t(()=>import(`./pdf-WMLLqnkL.js`),__vite__mapDeps([2,3]),import.meta.url);window.pdfjsLib=e;let n=window.location.pathname.replace(/\/[^/]*$/,`/`);window.pdfjsLib.GlobalWorkerOptions.workerSrc=`${window.location.origin}${n}pdf.worker.min.mjs`}catch(e){return this.log.error(`PDF.js not available:`,e),i.innerHTML=`<div style="color:white;padding:20px;text-align:center;">PDF viewer unavailable</div>`,i.style.opacity=`1`,i}let a=e.options.uri?this._mediaFileUrl(e.options.uri):``;try{let t=await window.pdfjsLib.getDocument(a).promise,o=t.numPages,s=e.duration||60,c=s*1e3/o;this.log.info(`[pdf] PDF loaded: ${o} pages, ${s}s duration, ${(c/1e3).toFixed(1)}s/page`);let l=await t.getPage(1),u=l.getViewport({scale:1}),d=Math.min(r.width/u.width,r.height/u.height);l.cleanup();let f=document.createElement(`canvas`);f.className=`pdf-page`,f.width=Math.floor(u.width*d),f.height=Math.floor(u.height*d),f.style.cssText=`display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);`;let p=f.getContext(`2d`);i.appendChild(f);let m=document.createElement(`div`);m.style.cssText=`position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,0.7);color:white;padding:8px 12px;border-radius:4px;font:14px system-ui;z-index:1;`,n()||(m.style.display=`none`),i.appendChild(m);let h=1,g=null,_=null,v=!1,y=async()=>{if(v)return;m.textContent=`Page ${h} / ${o}`;let e=await t.getPage(h),n=e.getViewport({scale:d});p.clearRect(0,0,f.width,f.height),_=e.render({canvasContext:p,viewport:n});try{await _.promise}catch(e){if(v)return;throw e}_=null,e.cleanup(),o>1&&!v&&(g=setTimeout(()=>{h=h>=o?1:h+1,y()},c))};await y();let b=null;i._pdfCleanup=()=>{if(v=!0,g&&clearTimeout(g),g=null,_){let e=_;_=null,e.cancel(),b=e.promise.catch(()=>{})}},i._pdfResume=async()=>{i._pdfCleanup(),b&&=(await b,null),v=!1,h=1,y()},i._pdfDestroy=()=>{i._pdfCleanup(),f.width=0,f.height=0,t.destroy()}}catch(e){this.log.error(`PDF render failed:`,e),i.innerHTML=`<div style="color:white;padding:20px;text-align:center;">Failed to load PDF</div>`}return i.style.opacity=`1`,i}async renderWebpage(e,t){if(parseInt(e.options.modeId||`1`)===0)return await this.renderGenericWidget(e,t);let n=document.createElement(`iframe`);return n.className=`renderer-lite-widget`,n.style.width=`100%`,n.style.height=`100%`,n.style.border=`none`,n.style.opacity=`0`,n.src=decodeURIComponent(e.options.uri||``),n}async renderGenericWidget(e,t){return await this._renderIframeWidget(e,t)}async _renderIframeWidget(e,t){let n=document.createElement(`iframe`);n.className=`renderer-lite-widget`,n.style.width=`100%`,n.style.height=`100%`,n.style.border=`none`,n.style.opacity=`0`;let r=e.raw;if(this.options.getWidgetHtml){let t=await this.options.getWidgetHtml(e);if(t&&typeof t==`object`&&t.url)return n.src=t.url,t.fallback&&this._parseDurationComments(t.fallback,e),n;r=t}if(r){this._parseDurationComments(r,e);let t=new Blob([r],{type:`text/html`}),i=URL.createObjectURL(t);n.src=i,this.trackBlobUrl(i)}else this.log.warn(`No HTML for widget ${e.id}`),n.srcdoc=`<div style="padding:20px;">Widget content unavailable</div>`;return n}_renderUnsupportedPlaceholder(e,t){let n=document.createElement(`div`);return n.className=`renderer-lite-widget`,n.style.width=`100%`,n.style.height=`100%`,n.style.display=`flex`,n.style.alignItems=`center`,n.style.justifyContent=`center`,n.style.backgroundColor=`#111`,n.style.color=`#666`,n.style.fontSize=`14px`,n.textContent=`Unsupported: ${e.type}`,n}_scheduleNextLayoutPreload(e){this.preloadTimer&&=(clearTimeout(this.preloadTimer),null),this._preloadRetryTimer&&=(clearTimeout(this._preloadRetryTimer),null);let t=e.duration||60,n=t*1e3*.75,r=t*1e3*.9;this.log.info(`Scheduling next layout preload in ${(n/1e3).toFixed(1)}s (75% of ${t}s)`),this.preloadTimer=setTimeout(()=>{this.preloadTimer=null,this.emit(`request-next-layout-preload`)},n),this._preloadRetryTimer=setTimeout(()=>{this._preloadRetryTimer=null,this.emit(`request-next-layout-preload`)},r)}hasPreloadedLayout(e){return this.layoutPool.has(e)}async preloadLayout(e,t){return this.layoutPool.has(t)?(this.log.info(`Layout ${t} already in preload pool, skipping`),!0):this.currentLayoutId===t?(this.log.info(`Layout ${t} is current, skipping preload`),!0):this._preloadingLayoutId===t&&this._preloadingPromise?(this.log.info(`Layout ${t} preload in-flight, waiting for it...`),this._preloadingPromise):(this._preloadingPromise=this._doPreloadLayout(e,t),this._preloadingPromise)}async _doPreloadLayout(e,t){try{this.log.info(`Preloading layout ${t} into pool...`);let n=this.parseXlf(e);this.calculateScale(n);let r=document.createElement(`div`);if(r.id=`preload_layout_${t}`,r.className=`renderer-lite-preload-wrapper`,r.style.position=`absolute`,r.style.top=`0`,r.style.left=`0`,r.style.width=`100%`,r.style.height=`100%`,r.style.visibility=`hidden`,r.style.zIndex=`-1`,r.style.backgroundColor=n.bgcolor,n.background){let e=this.options.fileIdToSaveAs?.get(String(n.background))||n.background;this._applyBackgroundImage(r,this._mediaFileUrl(e))}let i=this.currentLayoutId,a=new Map;for(let e of n.regions){let n=this._createRegionEntry(e,`preload_region_${t}_${e.id}`,r);a.set(e.id,n)}let o=new Set,s=this.layoutBlobUrls;this.layoutBlobUrls=new Map,this.layoutBlobUrls.set(t,o),this._preloadingLayoutId=t;for(let[e,n]of a)for(let r=0;r<n.widgets.length;r++){let i=n.widgets[r];i.layoutId=t,i.regionId=e;try{let e=await this.createWidgetElement(i,n);this._positionWidgetElement(e),n.element.appendChild(e),n.widgetElements.set(i.id,e)}catch(e){this.log.error(`Preload: Failed to create widget ${i.id}:`,e)}}return this.currentLayoutId=i,r.querySelectorAll(`video`).forEach(e=>e.pause()),(this.layoutBlobUrls.get(t)||new Set).forEach(e=>o.add(e)),this.layoutBlobUrls=s,this.container.appendChild(r),this.layoutPool.add(t,{container:r,layout:n,regions:a,blobUrls:o}),this.log.info(`Layout ${t} preloaded into pool (${a.size} regions)`),!0}catch(e){return this.log.error(`Preload failed for layout ${t}:`,e),!1}finally{this._preloadingLayoutId===t&&(this._preloadingLayoutId=null,this._preloadingPromise=null)}}async _swapToPreloadedLayout(e){let t=this.layoutPool.get(e);if(!t){this.log.error(`Cannot swap: layout ${e} not in pool`);return}let n=this._resolveLayoutTransition(t.layout);return n.type===`instant`?this._swapToPreloadedLayoutInstant(e,t):this._swapToPreloadedLayoutWithTransition(e,t,n)}async _swapToPreloadedLayoutInstant(e,t){this.removeActionListeners(),this._clearLayoutTimers();let n=this.currentLayoutId,r=this.layoutEndEmitted;if(this.layoutEndEmitted=!1,n&&this.layoutPool.has(n))this._clearRegionTimers(this.regions),this._stopAllRegionWidgets(this.regions,this._stopWidgetBound),this.layoutPool.evict(n);else{this._clearRegionTimers(this.regions),this._stopAllRegionWidgets(this.regions,this._stopWidgetBound);for(let[,e]of this.regions)if(X.releaseMediaElements(e.element),e.config?.exitTransition){let t=Z.apply(e.element,e.config.exitTransition,!1,e.width,e.height);if(t){let n=e.element;t.onfinish=()=>n.remove()}else e.element.remove()}else e.element.remove();n&&this.revokeBlobUrlsForLayout(n)}this.currentLayout=null,this.currentLayoutId=null,this.regions.clear(),this._activatePreloadedLayout(e,t,n,r),this.log.info(`Swapped to preloaded layout ${e} (instant transition)`),this._logResourceStats(e)}async _swapToPreloadedLayoutWithTransition(e,t,n){this.removeActionListeners(),this._clearLayoutTimers();let r=this.currentLayoutId,i=this.layoutEndEmitted;this.layoutEndEmitted=!1;let a=this.regions,o=r!==null&&this.layoutPool.has(r),s=o?this.layoutPool.get(r).container:null;this._clearRegionTimers(a),this._stopAllRegionWidgets(a,this._stopWidgetBound),this.currentLayout=null,this.currentLayoutId=null,this.regions=new Map,t.container.style.visibility=`visible`,t.container.style.zIndex=`1`,n.type===`fade`&&(t.container.style.opacity=`0`),this._activatePreloadedLayout(e,t,r,i);let c=t.layout.width,l=t.layout.height,u=Z.apply(t.container,n,!0,c,l),d=null;s&&(n.type===`fade`||n.type===`slide`)&&(d=Z.apply(s,n,!1,c,l));let f=()=>{if(t.container.style.zIndex=`0`,t.container.style.opacity=``,this._teardownOldLayoutAfterTransition(r,a,o),d)try{d.cancel()}catch{}this.log.info(`Swapped to preloaded layout ${e} (${n.type} transition, ${n.duration}ms)`),this._logResourceStats(e)};u?(u.onfinish=f,setTimeout(f,Math.ceil(n.duration*1.5))):f()}_activatePreloadedLayout(e,t,n,r){if(t.container.style.visibility=`visible`,t.container.style.zIndex!==`1`&&(t.container.style.zIndex=`0`),this.layoutPool.setHot(e),this.currentLayout=t.layout,this.currentLayoutId=e,this.regions=t.regions,this._applyXpStateInit(t.layout),n&&!r&&this.emit(`layoutEnd`,n),this.container.style.backgroundColor=t.layout.bgcolor,t.container.style.backgroundImage)for(let e of[`backgroundImage`,`backgroundSize`,`backgroundPosition`,`backgroundRepeat`])this.container.style[e]=t.container.style[e];else this.container.style.backgroundImage=``;this.calculateScale(t.layout),this.attachActionListeners(t.layout),this.emit(`layoutStart`,e,t.layout);for(let[e,t]of this.regions)t.currentIndex=0,t.complete=!1,this.startRegion(e);this.updateLayoutDuration(),this.startLayoutTimerWhenReady(e,t.layout),this.preloadTimer||this._scheduleNextLayoutPreload(t.layout)}_teardownOldLayoutAfterTransition(e,t,n){if(n&&e!==null){this.layoutPool.evict(e);return}for(let[,e]of t)if(X.releaseMediaElements(e.element),e.config?.exitTransition){let t=Z.apply(e.element,e.config.exitTransition,!1,e.width,e.height);if(t){let n=e.element;t.onfinish=()=>n.remove()}else e.element.remove()}else e.element.remove();e&&this.revokeBlobUrlsForLayout(e)}_logResourceStats(e){let t=document.querySelectorAll(`*`).length,n=document.querySelectorAll(`video`).length,r=document.querySelectorAll(`video[src]`).length,i=document.querySelectorAll(`canvas`).length,a=document.querySelectorAll(`iframe`).length,o=document.querySelectorAll(`img`).length,s=this.layoutPool?this.layoutPool.size:0,c=this.regions?this.regions.size:0,l=[...this.regions?.values()||[]].reduce((e,t)=>e+(t.widgetElements?.size||0),0),u=performance?.memory?{used:Math.round(performance.memory.usedJSHeapSize/1048576),total:Math.round(performance.memory.totalJSHeapSize/1048576),limit:Math.round(performance.memory.jsHeapSizeLimit/1048576)}:null,d=this._blobUrls?[...this._blobUrls.values()].reduce((e,t)=>e+t.size,0):0,f=this._blobUrls?this._blobUrls.size:0,p=document.querySelectorAll(`.renderer-lite-preload-wrapper`).length,m=document.querySelectorAll(`audio`).length,h=u?`heap=${u.used}/${u.total}MB (limit ${u.limit}MB)`:`heap=N/A`;this.log.info(`[Resources] layout=${e} dom=${t} videos=${n}(src=${r}) canvas=${i} iframe=${a} img=${o} audio=${m} pool=${s} preloadWrappers=${p} regions=${c} widgets=${l} blobs=${d}(${f} layouts) ${h}`)}getCurrentLayoutId(){return this.currentLayoutId}getCurrentLayoutTags(){return!this.currentLayout||!Array.isArray(this.currentLayout.tags)?[]:this.currentLayout.tags.slice()}showLayout(e){if(e===void 0&&(e=this.layoutPool.getLatest(),e===void 0)){this.log.warn(`showLayout: no preloaded layout to show`);return}if(this.currentLayoutId===e){this.log.info(`showLayout: layout ${e} already showing`);return}if(!this.layoutPool.has(e)){this.log.warn(`showLayout: layout ${e} not in preload pool`);return}this._swapToPreloadedLayout(e)}hasActiveLayoutTimer(){return this.layoutTimer!==null||this._deferredTimerLayoutId!==null}checkLayoutComplete(){let e=!0;for(let[t,n]of this.regions)if(n.widgets.length>1&&!n.complete){e=!1;break}e&&this.currentLayoutId&&this.log.info(`All multi-widget regions completed one cycle`)}_clearLayoutTimers(){this.layoutTimer&&=(clearTimeout(this.layoutTimer),null),this.preloadTimer&&=(clearTimeout(this.preloadTimer),null),this._preloadRetryTimer&&=(clearTimeout(this._preloadRetryTimer),null)}stopCurrentLayout(){if(!this.currentLayout)return;this.log.info(`Stopping layout ${this.currentLayoutId}`);let e=this.currentLayoutId,t=e&&!this.layoutEndEmitted;if(this.layoutEndEmitted=!1,this._deferredTimerLayoutId=null,this._deferredTimerFallback&&=(clearTimeout(this._deferredTimerFallback),null),this.currentLayout=null,this.currentLayoutId=null,this._clearLayoutTimers(),this.removeActionListeners(),e&&this.layoutPool.has(e))this.layoutPool.evict(e);else{e&&this.revokeBlobUrlsForLayout(e),this._clearRegionTimers(this.regions),this._stopAllRegionWidgets(this.regions,this._stopWidgetBound);for(let[,e]of this.regions)if(X.releaseMediaElements(e.element),e.config?.exitTransition){let t=Z.apply(e.element,e.config.exitTransition,!1,e.width,e.height);if(t){let n=e.element;t.onfinish=()=>n.remove()}else e.element.remove()}else e.element.remove()}this.regions.clear(),t&&this.emit(`layoutEnd`,e)}async renderOverlay(e,t,n=0){try{if(this.log.info(`Rendering overlay ${t} (priority ${n})`),this.activeOverlays.has(t)){this.log.warn(`Overlay ${t} already active, skipping`);return}let r=this.parseXlf(e),i=document.createElement(`div`);i.id=`overlay_${t}`,i.className=`renderer-lite-overlay`,i.style.position=`absolute`,i.style.top=`0`,i.style.left=`0`,i.style.width=`100%`,i.style.height=`100%`,i.style.zIndex=String(1e3+n),i.style.pointerEvents=`auto`,i.style.backgroundColor=r.bgcolor,this.calculateScale(r);let a=new Map;for(let e of r.regions){let n=this._createRegionEntry(e,`overlay_${t}_region_${e.id}`,i,{className:`renderer-lite-region overlay-region`,isCanvas:e.isCanvas||!1});a.set(e.id,n)}for(let[e,n]of a)for(let r of n.widgets){r.layoutId=t,r.regionId=e;try{let e=await this.createWidgetElement(r,n);this._positionWidgetElement(e),n.element.appendChild(e),n.widgetElements.set(r.id,e)}catch(e){this.log.error(`Failed to pre-create overlay widget ${r.id}:`,e)}}this.overlayContainer.appendChild(i),this.activeOverlays.set(t,{container:i,layout:r,regions:a,timer:null,priority:n}),this.emit(`overlayStart`,t,r);for(let[e,n]of a)this.startOverlayRegion(t,e);if(r.duration>0){let e=r.duration*1e3,n=this.activeOverlays.get(t);n&&(n.timer=setTimeout(()=>{this.log.info(`Overlay ${t} duration expired (${r.duration}s)`),this.emit(`overlayEnd`,t)},e))}this.log.info(`Overlay ${t} started`)}catch(e){throw this.log.error(`Error rendering overlay:`,e),this.emit(`error`,{type:`overlayError`,error:e,layoutId:t}),e}}startOverlayRegion(e,t){let n=this.activeOverlays.get(e);if(!n)return;let r=n.regions.get(t);this._startRegionCycle(r,t,(t,n)=>this.renderOverlayWidget(e,t,n),(t,n)=>this.stopOverlayWidget(e,t,n),()=>this.log.info(`Overlay ${e} region ${t} completed one full cycle`))}async renderOverlayWidget(e,t,n){let r=this.activeOverlays.get(e);if(!r)return;let i=r.regions.get(t);if(i)try{let r=await this._showWidget(i,n);r&&(this.log.info(`Showing overlay widget ${r.type} (${r.id}) in overlay ${e} region ${t}`),this._startedWidgets.add(`overlay:${e}:${t}:${n}`),this.emit(`overlayWidgetStart`,{overlayId:e,widgetId:r.id,regionId:t,type:r.type,duration:r.duration}))}catch(r){this.log.error(`Error rendering overlay widget:`,r),this.emit(`error`,{type:`overlayWidgetError`,error:r,widgetId:i.widgets[n]?.id,regionId:t,overlayId:e})}}async stopOverlayWidget(e,t,n){let r=`overlay:${e}:${t}:${n}`;if(!this._startedWidgets.delete(r))return;let i=this.activeOverlays.get(e);if(!i)return;let a=i.regions.get(t);if(!a)return;let{widget:o,animPromise:s}=this._hideWidget(a,n);o&&this.emit(`overlayWidgetEnd`,{overlayId:e,widgetId:o.id,regionId:t,type:o.type}),s&&await s}stopOverlay(e){let t=this.activeOverlays.get(e);if(!t){this.log.warn(`Overlay ${e} not active`);return}this.log.info(`Stopping overlay ${e}`),t.timer&&=(clearTimeout(t.timer),null);for(let[,e]of t.regions)e.timer&&=(clearTimeout(e.timer),null);this._stopAllRegionWidgets(t.regions,(t,n)=>this.stopOverlayWidget(e,t,n)),t.container&&t.container.remove(),this.revokeBlobUrlsForLayout(e),this.activeOverlays.delete(e),this.emit(`overlayEnd`,e),this.log.info(`Overlay ${e} stopped`)}stopAllOverlays(){let e=Array.from(this.activeOverlays.keys());for(let t of e)this.stopOverlay(t);this.log.info(`All overlays stopped`)}getActiveOverlays(){return Array.from(this.activeOverlays.keys())}pause(){if(!this._paused){this._paused=!0;for(let[,e]of this.regions)e.timer&&=(clearTimeout(e.timer),null);this._forEachMedia(e=>e.pause()),this.emit(`paused`),this.log.info(`Playback paused (layout timer continues)`)}}isPaused(){return this._paused}resume(){if(this._paused){this._paused=!1,this._forEachMedia(e=>e.play().catch(()=>{}));for(let[e]of this.regions)this.startRegion(e);this.emit(`resumed`),this.log.info(`Playback resumed`)}}_forEachMedia(e){for(let[,t]of this.regions)t.element?.querySelectorAll(`video, audio`).forEach(e)}cleanup(){this.stopAllOverlays(),this.stopCurrentLayout(),this._startedWidgets.clear();for(let e of this.audioOverlays.keys())this._stopAudioOverlays(e);if(this.layoutPool.clear(),this.preloadTimer&&=(clearTimeout(this.preloadTimer),null),this._preloadRetryTimer&&=(clearTimeout(this._preloadRetryTimer),null),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),this._stateUnsubscribe){try{this._stateUnsubscribe()}catch{}this._stateUnsubscribe=null}this._stateStore=null,this.container.innerHTML=``,this.log.info(`Cleaned up`)}},Q=a(`Layout`),Ce=/^(#[0-9a-fA-F]{3,8}|rgba?\(\s*[\d.,\s%]+\)|[a-zA-Z]{1,20}|transparent|inherit)$/,we=e=>Ce.test(e)?e:`#000000`,$=e=>JSON.stringify(e),Te=class{constructor(e){this.xmds=e}async translateXLF(e,t){let n=new DOMParser().parseFromString(t,`text/xml`),r=n.querySelector(`layout`);if(!r)throw Error(`Invalid XLF: no <layout> element`);let i=parseInt(r.getAttribute(`width`)||`1920`),a=parseInt(r.getAttribute(`height`)||`1080`),o=we(r.getAttribute(`bgcolor`)||`#000000`),s=[];for(let t of n.querySelectorAll(`region`))s.push(await this.translateRegion(e,t));return this.generateHTML(i,a,o,s)}async translateRegion(e,t){let n=t.getAttribute(`id`),r=parseInt(t.getAttribute(`width`)),i=parseInt(t.getAttribute(`height`)),a=parseInt(t.getAttribute(`top`)),o=parseInt(t.getAttribute(`left`)),s=parseInt(t.getAttribute(`zindex`)||`0`),c=[];for(let r of t.querySelectorAll(`media`))c.push(await this.translateMedia(e,n,r));return{id:n,width:r,height:i,top:a,left:o,zindex:s,media:c}}async translateMedia(e,t,n){let r=n.getAttribute(`type`),a=parseInt(n.getAttribute(`duration`)||`10`),s=n.getAttribute(`id`),c=n.querySelector(`options`),l=n.querySelector(`raw`),u={};if(c)for(let e of c.children)u[e.tagName]=e.textContent;let d={in:null,out:null},f=n.querySelector(`options > transIn`),p=n.querySelector(`options > transOut`),m=n.querySelector(`options > transInDuration`),h=n.querySelector(`options > transOutDuration`),g=n.querySelector(`options > transInDirection`),_=n.querySelector(`options > transOutDirection`);f&&f.textContent&&(d.in={type:f.textContent,duration:parseInt(m?.textContent||`1000`),direction:g?.textContent||`N`}),p&&p.textContent&&(d.out={type:p.textContent,duration:parseInt(h?.textContent||`1000`),direction:_?.textContent||`N`});let v=l?l.textContent:``;if([`clock`,`clock-digital`,`clock-analogue`,`calendar`,`weather`,`currencies`,`stocks`,`twitter`,`global`,`embedded`,`text`,`ticker`].some(e=>r.includes(e))){let n=null;for(let i=1;i<=3;i++)try{Q.info(`Fetching resource for ${r} widget (layout=${e}, region=${t}, media=${s}) - attempt ${i}/3`),v=await this.xmds.getResource(e,t,s),Q.info(`Got resource HTML (${v.length} chars)`),u.widgetCacheKey=await o(e,t,s,v);break}catch(e){if(n=e,Q.warn(`Failed to get resource (attempt ${i}/3):`,e.message),i<3){let e=i*2e3;Q.info(`Retrying in ${e}ms...`),await new Promise(t=>setTimeout(t,e))}}if(!v&&n){Q.warn(`All retries failed, checking for cached widget HTML...`);try{let n=await fetch(`/store${i}/widgets/${e}/${t}/${s}`);n.ok?(v=await n.text(),u.widgetCacheKey=`${i}/widgets/${e}/${t}/${s}`,Q.info(`Using stored widget HTML (${v.length} chars) - CMS update pending`)):(Q.error(`No stored version available for widget ${s}`),v=`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:18px;">Content updating...</div>`)}catch(e){Q.error(`Store fallback failed:`,e),v=`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:18px;">Content updating...</div>`}}}return{type:r,duration:a,id:s,options:u,raw:v,transitions:d}}generateHTML(e,t,n,r){return`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=${e}, height=${t}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    body { background-color: ${n}; }
    .region {
      position: absolute;
      overflow: hidden;
    }
    .media {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
${r.map(e=>this.generateRegionHTML(e)).join(`
`)}
<script>
// Transition utilities
window.Transitions = {
  fadeIn(element, duration) {
    const keyframes = [
      { opacity: 0 },
      { opacity: 1 }
    ];
    const timing = {
      duration: duration,
      easing: 'linear',
      fill: 'forwards'
    };
    return element.animate(keyframes, timing);
  },

  fadeOut(element, duration) {
    const keyframes = [
      { opacity: 1 },
      { opacity: 0 }
    ];
    const timing = {
      duration: duration,
      easing: 'linear',
      fill: 'forwards'
    };
    return element.animate(keyframes, timing);
  },

  getFlyKeyframes(direction, width, height, isIn) {
    const dirMap = {
      'N': { x: 0, y: isIn ? -height : height },
      'NE': { x: isIn ? width : -width, y: isIn ? -height : height },
      'E': { x: isIn ? width : -width, y: 0 },
      'SE': { x: isIn ? width : -width, y: isIn ? height : -height },
      'S': { x: 0, y: isIn ? height : -height },
      'SW': { x: isIn ? -width : width, y: isIn ? height : -height },
      'W': { x: isIn ? -width : width, y: 0 },
      'NW': { x: isIn ? -width : width, y: isIn ? -height : height }
    };

    const offset = dirMap[direction] || dirMap['N'];

    if (isIn) {
      return [
        { transform: \`translate(\${offset.x}px, \${offset.y}px)\`, opacity: 0 },
        { transform: 'translate(0, 0)', opacity: 1 }
      ];
    } else {
      return [
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: \`translate(\${offset.x}px, \${offset.y}px)\`, opacity: 0 }
      ];
    }
  },

  flyIn(element, duration, direction, regionWidth, regionHeight) {
    const keyframes = this.getFlyKeyframes(direction, regionWidth, regionHeight, true);
    const timing = {
      duration: duration,
      easing: 'ease-out',
      fill: 'forwards'
    };
    return element.animate(keyframes, timing);
  },

  flyOut(element, duration, direction, regionWidth, regionHeight) {
    const keyframes = this.getFlyKeyframes(direction, regionWidth, regionHeight, false);
    const timing = {
      duration: duration,
      easing: 'ease-in',
      fill: 'forwards'
    };
    return element.animate(keyframes, timing);
  },

  apply(element, transitionConfig, isIn, regionWidth, regionHeight) {
    if (!transitionConfig || !transitionConfig.type) {
      return null;
    }

    const type = transitionConfig.type.toLowerCase();
    const duration = transitionConfig.duration || 1000;
    const direction = transitionConfig.direction || 'N';

    switch (type) {
      case 'fade':
        return isIn ? this.fadeIn(element, duration) : this.fadeOut(element, duration);
      case 'fadein':
        return isIn ? this.fadeIn(element, duration) : null;
      case 'fadeout':
        return isIn ? null : this.fadeOut(element, duration);
      case 'fly':
        return isIn
          ? this.flyIn(element, duration, direction, regionWidth, regionHeight)
          : this.flyOut(element, duration, direction, regionWidth, regionHeight);
      case 'flyin':
        return isIn ? this.flyIn(element, duration, direction, regionWidth, regionHeight) : null;
      case 'flyout':
        return isIn ? null : this.flyOut(element, duration, direction, regionWidth, regionHeight);
      default:
        return null;
    }
  }
};

const regions = {
${r.map(e=>this.generateRegionJS(e)).join(`,
`)}
};

// Auto-start all regions
Object.keys(regions).forEach(id => {
  playRegion(id);
});

// Track active timers per region so layout teardown can cancel them
const regionTimers = {};

function playRegion(id) {
  const region = regions[id];
  if (!region || region.media.length === 0) return;

  regionTimers[id] = [];

  // If only one media item, just show it and don't cycle (arexibo behavior)
  if (region.media.length === 1) {
    const media = region.media[0];
    if (media.start) media.start();
    return; // Don't schedule stop/restart
  }

  // Multiple media items - cycle normally
  let currentIndex = 0;

  function playNext() {
    const media = region.media[currentIndex];
    if (media.start) media.start();

    const duration = media.duration || 10;
    const timerId = setTimeout(() => {
      if (media.stop) media.stop();
      currentIndex = (currentIndex + 1) % region.media.length;
      playNext();
    }, duration * 1000);
    regionTimers[id].push(timerId);
  }

  playNext();
}

// Cleanup function — called before layout teardown
window._stopAllRegions = function() {
  Object.values(regionTimers).forEach(timers => timers.forEach(t => clearTimeout(t)));
};
<\/script>
</body>
</html>`}generateRegionHTML(e){return`  <div id="region_${e.id}" class="region" style="
    left: ${e.left}px;
    top: ${e.top}px;
    width: ${e.width}px;
    height: ${e.height}px;
    z-index: ${e.zindex};
  "></div>`}generateRegionJS(e){let t=e.media.map(t=>this.generateMediaJS(t,e.id)).join(`,
    `);return`  '${e.id}': {
    media: [
${t}
    ]
  }`}_generateIframeWidgetJS(e,t,n,r,i){let a=`widget_${e}_${t}`;return{startFn:`() => {
        const region = document.getElementById('region_${e}');
        let iframe = document.getElementById('${a}');
        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.id = '${a}';
          iframe.src = ${$(n)};
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.scrolling = 'no';
          iframe.style.opacity = '0';
          region.innerHTML = '';
          region.appendChild(iframe);

          // Apply transition after iframe loads
          iframe.onload = () => {
            const transIn = ${r};
            if (transIn && window.Transitions) {
              const regionRect = region.getBoundingClientRect();
              window.Transitions.apply(iframe, transIn, true, regionRect.width, regionRect.height);
            } else {
              iframe.style.opacity = '1';
            }
          };
        } else {
          iframe.style.display = 'block';
          iframe.style.opacity = '1';
        }
      }`,stopFn:`() => {
        const region = document.getElementById('region_${e}');
        const iframe = document.getElementById('${a}');
        if (iframe) {
          const transOut = ${i};
          if (transOut && window.Transitions) {
            const regionRect = region.getBoundingClientRect();
            const animation = window.Transitions.apply(iframe, transOut, false, regionRect.width, regionRect.height);
            if (animation) {
              animation.onfinish = () => {
                iframe.style.display = 'none';
              };
              return;
            }
          }
          iframe.style.display = 'none';
        }
      }`}}generateMediaJS(e,t){let r=e.duration||10,a=e.transitions?.in?JSON.stringify(e.transitions.in):`null`,o=e.transitions?.out?JSON.stringify(e.transitions.out):`null`,s=`null`,c=`null`;switch(e.type){case`image`:s=`() => {
        const region = document.getElementById('region_${t}');
        const img = document.createElement('img');
        img.className = 'media';
        img.src = ${$(`${window.location.origin}${i}/media/${e.options.uri}`)};
        img.style.opacity = '0';
        region.innerHTML = '';
        region.appendChild(img);

        // Apply transition
        const transIn = ${a};
        if (transIn && window.Transitions) {
          const regionRect = region.getBoundingClientRect();
          window.Transitions.apply(img, transIn, true, regionRect.width, regionRect.height);
        } else {
          img.style.opacity = '1';
        }
      }`;break;case`video`:{let n=`${window.location.origin}${i}/media/${e.options.uri}`,r=e.options.uri;s=`() => {
        const region = document.getElementById('region_${t}');
        const video = document.createElement('video');
        video.className = 'media';
        video.src = ${$(n)};
        video.dataset.filename = ${$(r)};
        video.autoplay = true;
        video.muted = ${e.options.mute===`1`?`true`:`false`};
        video.loop = false;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.opacity = '0';

        // Retry loading if cache completes while video is playing
        const retryOnCache = (event) => {
          if (event.detail.filename === ${$(r)} && video.error) {
            console.log('[Video] Cache complete, reloading:', '${r}');
            video.load();
            video.play();
          }
        };
        video._retryOnCache = retryOnCache;
        window.addEventListener('media-cached', retryOnCache);

        region.innerHTML = '';
        region.appendChild(video);

        // Apply transition
        const transIn = ${a};
        if (transIn && window.Transitions) {
          const regionRect = region.getBoundingClientRect();
          window.Transitions.apply(video, transIn, true, regionRect.width, regionRect.height);
        } else {
          video.style.opacity = '1';
        }

        console.log('[Video] Playing:', '${e.options.uri}');
      }`,c=`() => {
        const region = document.getElementById('region_${t}');
        const video = document.querySelector('#region_${t} video');
        if (video) {
          // Remove global media-cached listener to prevent leak
          if (video._retryOnCache) {
            window.removeEventListener('media-cached', video._retryOnCache);
            video._retryOnCache = null;
          }
          const transOut = ${o};
          if (transOut && window.Transitions) {
            const regionRect = region.getBoundingClientRect();
            const animation = window.Transitions.apply(video, transOut, false, regionRect.width, regionRect.height);
            if (animation) {
              animation.onfinish = () => {
                video.pause();
                video.remove();
              };
              return;
            }
          }
          video.pause();
          video.remove();
        }
      }`;break}case`text`:case`ticker`:if(e.options.widgetCacheKey){let n=`${window.location.origin}${e.options.widgetCacheKey}`,r=this._generateIframeWidgetJS(t,e.id,n,a,o);s=r.startFn,c=r.stopFn;break}case`audio`:{let n=`${window.location.origin}${i}/media/${e.options.uri}`,r=`audio_${t}_${e.id}`,l=e.options.loop===`1`,u=(parseInt(e.options.volume||`100`)/100).toFixed(2);s=`() => {
        const region = document.getElementById('region_${t}');

        // Create audio element
        const audio = document.createElement('audio');
        audio.id = '${r}';
        audio.className = 'media';
        audio.src = ${$(n)};
        audio.autoplay = true;
        audio.loop = ${l};
        audio.volume = ${u};

        // Create visual feedback container
        const visualContainer = document.createElement('div');
        visualContainer.className = 'audio-visual';
        visualContainer.style.cssText = \`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
        \`;

        // Audio icon
        const icon = document.createElement('div');
        icon.innerHTML = '♪';
        icon.style.cssText = \`
          font-size: 120px;
          color: white;
          margin-bottom: 20px;
          animation: pulse 2s ease-in-out infinite;
        \`;

        // Audio info
        const info = document.createElement('div');
        info.style.cssText = \`
          color: white;
          font-size: 24px;
          text-align: center;
          padding: 0 20px;
        \`;
        info.textContent = 'Playing Audio';

        // Filename
        const filename = document.createElement('div');
        filename.style.cssText = \`
          color: rgba(255,255,255,0.7);
          font-size: 16px;
          margin-top: 10px;
        \`;
        filename.textContent = '${e.options.uri}';

        visualContainer.appendChild(icon);
        visualContainer.appendChild(info);
        visualContainer.appendChild(filename);

        region.innerHTML = '';
        region.appendChild(audio);
        region.appendChild(visualContainer);

        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = \`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        \`;
        document.head.appendChild(style);

        // Apply transition
        const transIn = ${a};
        if (transIn && window.Transitions) {
          const regionRect = region.getBoundingClientRect();
          window.Transitions.apply(visualContainer, transIn, true, regionRect.width, regionRect.height);
        } else {
          visualContainer.style.opacity = '1';
        }

        console.log('[Audio] Playing:', '${n}', 'Volume:', ${u}, 'Loop:', ${l});
      }`,c=`() => {
        const audio = document.getElementById('${r}');
        if (audio) {
          audio.pause();
          audio.remove();
        }
        const region = document.getElementById('region_${t}');
        if (region) {
          const visualContainer = region.querySelector('.audio-visual');
          if (visualContainer) {
            const transOut = ${o};
            if (transOut && window.Transitions) {
              const regionRect = region.getBoundingClientRect();
              const animation = window.Transitions.apply(visualContainer, transOut, false, regionRect.width, regionRect.height);
              if (animation) {
                animation.onfinish = () => visualContainer.remove();
                return;
              }
            }
            visualContainer.remove();
          }
        }
      }`;break}case`pdf`:{let l=`${window.location.origin}${i}/media/${e.options.uri}`,u=`pdf_${t}_${e.id}`,d=r;s=`async () => {
        const container = document.createElement('div');
        container.className = 'media pdf-container';
        container.id = '${u}';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.overflow = 'hidden';
        container.style.backgroundColor = '#525659';
        container.style.opacity = '0';
        container.style.position = 'relative';

        const region = document.getElementById('region_${t}');
        region.innerHTML = '';
        region.appendChild(container);

        // Load PDF.js if not already loaded
        if (typeof pdfjsLib === 'undefined') {
          try {
            const pdfjsModule = await import('pdfjs-dist');
            window.pdfjsLib = pdfjsModule;
            pdfjsLib.GlobalWorkerOptions.workerSrc = '${window.location.origin}/player/pdf.worker.min.mjs';
          } catch (error) {
            console.error('[PDF] Failed to load PDF.js:', error);
            container.innerHTML = '<div style="color:white;padding:20px;text-align:center;">PDF viewer unavailable</div>';
            return;
          }
        }

        // Render PDF with multi-page support
        try {
          const loadingTask = pdfjsLib.getDocument(${$(l)});
          const pdf = await loadingTask.promise;
          const totalPages = pdf.numPages;

          // Calculate time per page (distribute total duration across all pages)
          const timePerPage = (${d} * 1000) / totalPages; // milliseconds per page

          console.log(\`[PDF] Loading: \${totalPages} pages, \${timePerPage}ms per page\`);

          const containerWidth = container.offsetWidth || ${width};
          const containerHeight = container.offsetHeight || ${height};

          // Create page indicator
          const pageIndicator = document.createElement('div');
          pageIndicator.className = 'pdf-page-indicator';
          pageIndicator.style.cssText = \`
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10;
            display: ${n()?`block`:`none`};
          \`;
          container.appendChild(pageIndicator);

          let currentPage = 1;
          let pageTimers = [];

          // Function to render a single page
          async function renderPage(pageNum) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1 });

            // Calculate scale to fit page within container
            const scaleX = containerWidth / viewport.width;
            const scaleY = containerHeight / viewport.height;
            const scale = Math.min(scaleX, scaleY);

            const scaledViewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-page';
            const context = canvas.getContext('2d');
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            // Center canvas in container
            canvas.style.cssText = \`
              display: block;
              margin: auto;
              margin-top: \${Math.max(0, (containerHeight - scaledViewport.height) / 2)}px;
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              opacity: 0;
              transition: opacity 0.5s ease-in-out;
            \`;

            container.appendChild(canvas);

            await page.render({
              canvasContext: context,
              viewport: scaledViewport
            }).promise;

            // Fade in new page
            setTimeout(() => canvas.style.opacity = '1', 50);

            return canvas;
          }

          // Function to cycle through pages
          async function cyclePage() {
            // Update page indicator
            pageIndicator.textContent = \`Page \${currentPage} / \${totalPages}\`;

            // Remove old pages
            const oldPages = container.querySelectorAll('.pdf-page');
            oldPages.forEach(oldPage => {
              if (oldPage !== container.lastChild) {
                oldPage.style.opacity = '0';
                setTimeout(() => oldPage.remove(), 500);
              }
            });

            // Render current page
            await renderPage(currentPage);

            console.log(\`[PDF] Showing page \${currentPage}/\${totalPages}\`);

            // Schedule next page
            if (totalPages > 1) {
              const timer = setTimeout(() => {
                currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
                cyclePage();
              }, timePerPage);
              pageTimers.push(timer);
            }
          }

          // Store live timer array on element for cleanup (not JSON — stays current)
          container._pageTimers = pageTimers;

          // Start cycling
          await cyclePage();

          // Apply transition to container
          const transIn = ${a};
          if (transIn && window.Transitions) {
            const regionRect = region.getBoundingClientRect();
            window.Transitions.apply(container, transIn, true, regionRect.width, regionRect.height);
          } else {
            container.style.opacity = '1';
          }

        } catch (error) {
          console.error('[PDF] Render failed:', error);
          container.innerHTML = '<div style="color:white;padding:20px;text-align:center;">Failed to load PDF</div>';
          container.style.opacity = '1';
        }
      }`,c=`() => {
        const region = document.getElementById('region_${t}');
        const container = document.getElementById('${u}');
        if (container) {
          // Clear page cycling timers (live array, always current)
          if (container._pageTimers) {
            container._pageTimers.forEach(t => clearTimeout(t));
            container._pageTimers.length = 0;
          }

          const transOut = ${o};
          if (transOut && window.Transitions) {
            const regionRect = region.getBoundingClientRect();
            const animation = window.Transitions.apply(container, transOut, false, regionRect.width, regionRect.height);
            if (animation) {
              animation.onfinish = () => {
                container.remove();
              };
              return;
            }
          }
          container.remove();
        }
      }`;break}case`webpage`:s=`() => {
        const region = document.getElementById('region_${t}');
        const iframe = document.createElement('iframe');
        iframe.src = ${$(decodeURIComponent(e.options.uri||``))};
        iframe.style.opacity = '0';
        region.innerHTML = '';
        region.appendChild(iframe);

        // Apply transition after iframe loads
        iframe.onload = () => {
          const transIn = ${a};
          if (transIn && window.Transitions) {
            const regionRect = region.getBoundingClientRect();
            window.Transitions.apply(iframe, transIn, true, regionRect.width, regionRect.height);
          } else {
            iframe.style.opacity = '1';
          }
        };
      }`;break;default:if(e.options.widgetCacheKey){let n=`${window.location.origin}${e.options.widgetCacheKey}`,r=this._generateIframeWidgetJS(t,e.id,n,a,o);s=r.startFn,c=r.stopFn}else Q.warn(`Unsupported media type: ${e.type}`),s=`() => console.log('Unsupported media type: ${e.type}')`}return`      {
        start: ${s},
        stop: ${c},
        duration: ${r}
      }`}},Ee=c.version;export{X as i,Te as n,Se as r,Ee as t};
//# sourceMappingURL=src-Cteiehbn.js.map