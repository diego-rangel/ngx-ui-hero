(self.webpackChunkngx_ui_hero_app=self.webpackChunkngx_ui_hero_app||[]).push([[859],{80859:()=>{!function(o,s){"use strict";var N="hljs-ln",j="hljs-ln-line",g="hljs-ln-code",M="hljs-ln-numbers",m="hljs-ln-n",d="data-line-number",p=/\r\n|\r|\n/g;function b(e){try{var n=s.querySelectorAll("code.hljs,code.nohighlight");for(var r in n)n.hasOwnProperty(r)&&(F(n[r])||E(n[r],e))}catch(t){o.console.error("LineNumbers error: ",t)}}function F(e){return e.classList.contains("nohljsln")}function E(e,n){"object"==typeof e&&function V(e){o.setTimeout(e,0)}(function(){e.innerHTML=L(e,n)})}function L(e,n){var r=function H(e,n){return{singleLine:I(n=n||{}),startFrom:R(e,n)}}(e,n);return A(e),function w(e,n){var r=_(e);if(""===r[r.length-1].trim()&&r.pop(),r.length>1||n.singleLine){for(var t="",a=0,i=r.length;a<i;a++)t+=c('<tr><td class="{0} {1}" {3}="{5}"><div class="{2}" {3}="{5}"></div></td><td class="{0} {4}" {3}="{5}">{6}</td></tr>',[j,M,m,d,g,a+n.startFrom,r[a].length>0?r[a]:" "]);return c('<table class="{0}">{1}</table>',[N,t])}return e}(e.innerHTML,r)}function I(e){return!!e.singleLine&&e.singleLine}function R(e,n){var t=1;isFinite(n.startFrom)&&(t=n.startFrom);var a=function K(e,n){return e.hasAttribute(n)?e.getAttribute(n):null}(e,"data-ln-start-from");return null!==a&&(t=function T(e,n){if(!e)return n;var r=Number(e);return isFinite(r)?r:n}(a,1)),t}function A(e){var n=e.childNodes;for(var r in n)if(n.hasOwnProperty(r)){var t=n[r];P(t.textContent)>0&&(t.childNodes.length>0?A(t):k(t.parentNode))}}function k(e){var n=e.className;if(/hljs-/.test(n)){for(var r=_(e.innerHTML),t=0,a="";t<r.length;t++)a+=c('<span class="{0}">{1}</span>\n',[n,r[t].length>0?r[t]:" "]);e.innerHTML=a.trim()}}function _(e){return 0===e.length?[]:e.split(p)}function P(e){return(e.trim().match(p)||[]).length}function c(e,n){return e.replace(/\{(\d+)\}/g,function(r,t){return void 0!==n[t]?n[t]:r})}o.hljs?(o.hljs.initLineNumbersOnLoad=function S(e){"interactive"===s.readyState||"complete"===s.readyState?b(e):o.addEventListener("DOMContentLoaded",function(){b(e)})},o.hljs.lineNumbersBlock=E,o.hljs.lineNumbersValue=function D(e,n){if("string"==typeof e){var r=document.createElement("code");return r.innerHTML=e,L(r,n)}},function B(){var e=s.createElement("style");e.type="text/css",e.innerHTML=c(".{0}{border-collapse:collapse}.{0} td{padding:0}.{1}:before{content:attr({2})}",[N,m,d]),s.getElementsByTagName("head")[0].appendChild(e)}()):o.console.error("highlight.js not detected!"),document.addEventListener("copy",function(e){var r,n=window.getSelection();(function y(e){for(var n=e;n;){if(n.className&&-1!==n.className.indexOf("hljs-ln-code"))return!0;n=n.parentNode}return!1})(n.anchorNode)&&(r=-1!==window.navigator.userAgent.indexOf("Edge")?function C(e){for(var n=e.toString(),r=e.anchorNode;"TD"!==r.nodeName;)r=r.parentNode;for(var t=e.focusNode;"TD"!==t.nodeName;)t=t.parentNode;var a=parseInt(r.dataset.lineNumber),i=parseInt(t.dataset.lineNumber);if(a!=i){var l=r.textContent,u=t.textContent;if(a>i){var f=a;a=i,i=f,f=l,l=u,u=f}for(;0!==n.indexOf(l);)l=l.slice(1);for(;-1===n.lastIndexOf(u);)u=u.slice(0,-1);for(var h=l,q=function O(e){for(var n=e;"TABLE"!==n.nodeName;)n=n.parentNode;return n}(r),v=a+1;v<i;++v){var G=c('.{0}[{1}="{2}"]',[g,d,v]);h+="\n"+q.querySelector(G).textContent}return h+"\n"+u}return n}(n):n.toString(),e.clipboardData.setData("text/plain",r),e.preventDefault())})}(window,document)}}]);