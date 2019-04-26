(function(window){var svgSprite='<svg><symbol id="icon-fujin2" viewBox="0 0 1110 1024"><path d="M554.666667 1002.666667C283.669333 1002.666667 64 782.997333 64 512S283.669333 21.333333 554.666667 21.333333s490.666667 219.669333 490.666667 490.666667S825.664 1002.666667 554.666667 1002.666667zM554.666667 85.333333C307.242667 85.333333 128 264.576 128 512c0 247.424 179.242667 426.666667 426.666667 426.666667 247.424 0 426.666667-179.242667 426.666667-426.666667C981.333333 264.576 802.090667 85.333333 554.666667 85.333333zM309.333333 757.333333l128-362.666667 362.666667-128-128 362.666667L309.333333 757.333333zM490.666667 448l-106.666667 234.666667 234.666667-106.666667 106.666667-234.666667L490.666667 448zM554.666667 554.666667c-23.573333 0-42.666667-19.093333-42.666667-42.666667 0-23.573333 19.093333-42.666667 42.666667-42.666667 23.573333 0 42.666667 19.093333 42.666667 42.666667C597.333333 535.573333 578.24 554.666667 554.666667 554.666667z"  ></path></symbol><symbol id="icon-wode2" viewBox="0 0 1024 1024"><path d="M944.756 952.134c0 0-3.743 32.64-53.282 26.997-15.766-1.792-32.56-26.997-32.56-26.997C830.177 768.165 686.677 628.17 513.515 628.17c-173.16 0-316.661 139.995-345.398 323.964 0 0-6.618 24.836-32.56 26.997-60.585 5.063-53.282-26.997-53.282-26.997 5.563-168.889 114.183-312.547 267.043-373.555-79.989-53.229-132.771-144.106-132.771-247.375 0-164.012 132.955-296.967 296.967-296.967s296.967 132.955 296.967 296.967c0 103.269-52.78 194.146-132.77 247.375C830.572 639.587 939.192 783.245 944.756 952.134zM729.492 331.203c0-119.272-96.704-215.976-215.977-215.976-119.271 0-215.976 96.704-215.976 215.976s96.704 215.975 215.976 215.975C632.788 547.178 729.492 450.475 729.492 331.203z"  ></path></symbol><symbol id="icon-shouyekuozhan" viewBox="0 0 1024 1024"><path d="M578.202 66.6c-27.304-27.31-53.564-31.612-70.816-30.424-32.108 2.228-53.116 24.084-59.404 31.558L0.51 515.208l45.134 45.132L494.25 111.734l1.566-1.564 1.334-1.766c0.06-0.08 7.194-8.034 14.654-8.55 7.662-0.498 16.602 7.216 21.266 11.88 47.264 47.264 440.68 441.824 444.648 445.802l45.2-45.068C1018.948 508.488 625.498 113.896 578.202 66.6z"  ></path><path d="M817.688 856.872c0 52.358-24.72 59.572-51.436 59.572l-122.32 0 0-186.368c0-101.926-48.84-160.382-133.998-160.382-84.02 0-136.214 62.234-136.214 162.422l0 184.328-106.458 0c-29.54 0-49.212-9.95-49.212-58.51L218.05 466.448 154.222 466.448l0 391.486c0 10.71 0 39.16 13.492 66.23 18.034 36.184 53.388 56.11 99.548 56.11l498.99 0c72.176 0 115.266-46.132 115.266-123.402L881.518 466.448l-63.83 0L817.688 856.872zM437.55 732.116c0-29.476 6.05-54.964 17.036-71.768 11.964-18.302 29.55-26.826 55.348-26.826 20.998 0 70.168 0 70.168 96.554l0 184.24-142.554 0L437.548 732.116z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)