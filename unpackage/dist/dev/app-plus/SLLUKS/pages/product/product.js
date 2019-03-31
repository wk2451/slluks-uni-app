
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([[2,1],".",[1],"product-list { display: -webkit-box; display: -webkit-flex; display: flex; width: 100%; -webkit-flex-wrap: wrap; flex-wrap: wrap; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; flex-direction: row; }\n.",[1],"order { display: inline-block; padding: ",[0,10]," ",[0,0]," ",[0,10]," ",[0,20],"; font-size: ",[0,32],"; line-height: ",[0,50],"; height: ",[0,50],"; }\n.",[1],"order wx-image { width: ",[0,35],"; position: relative; top: ",[0,25],"; -webkit-transform: translateY(-50%); transform: translateY(-50%); }\n.",[1],"empty { width: ",[0,500],"; margin-top: 50vh; -webkit-transform: translateY(-60%); transform: translateY(-60%); }\n.",[1],"content_empty { text-align: center; }\n.",[1],"product { padding: ",[0,10]," ",[0,20],"; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; flex-direction: column; }\n.",[1],"product-image { height: ",[0,330],"; width: ",[0,330],"; }\n.",[1],"product-title { width: ",[0,300],"; font-size: ",[0,32],"; word-break: break-all; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }\n.",[1],"product-price { font-size: ",[0,28],"; position: relative; }\n.",[1],"product-price-original { color: #E80080; }\n.",[1],"product-price-favour { color: #888888; text-decoration: line-through; margin-left: ",[0,10],"; }\n.",[1],"product-tip { position: absolute; right: ",[0,10],"; background-color: #FF3333; color: #FFFFFF; padding: 0 ",[0,10],"; border-radius: ",[0,5],"; }\n",],undefined,{path:"./pages/product/product.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/product/product.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      