function t(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}let e=null;const n={startBtnRef:document.querySelector("button[data-start]"),stopBtnRef:document.querySelector("button[data-stop]"),bodyRef:document.querySelector("body")};n.startBtnRef.addEventListener("click",(function(){n.bodyRef.style.backgroundColor=t(),e=setInterval((()=>{n.bodyRef.style.backgroundColor=t()}),1e3),n.startBtnRef.disabled=!0})),n.stopBtnRef.addEventListener("click",(function(){clearInterval(e),n.startBtnRef.disabled=!1}));
//# sourceMappingURL=01-color-switcher.ea0c0b77.js.map
