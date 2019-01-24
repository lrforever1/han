/*
 Loading 
*/

let _IMGDATA = ["arrow.png", "index_1.png", "index_2.png", "index_3.png", "index_4.png", "index_5.png", "index_6.png"];
let _PUBLIC_PATH = 'http://pkfo626jk.bkt.clouddn.com/image/';

let loadingRender = (function () {
    let $loadingBox = null,
        $current = null,
        $mainBox = null;
    let imgData = _IMGDATA;

    //=>RUN:预加载图片的
    let n = 0,
        len = imgData.length;
    let run = function run(callback) {
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                tempImg = null;
                $current.innerHTML = Math.ceil(((++n) / len) * 100) + '%';
                if (n === len) {
                    clearTimeout(delayTimer);
                    callback && callback();
                }
            };
            tempImg.src = _PUBLIC_PATH + item;
        });
    };

    //=>MAX-DELAY:延迟处理
    let delayTimer = null;
    let maxDelay = function maxDelay(callback) {
        delayTimer = setTimeout(() => {
            clearTimeout(delayTimer);
            if (n / len >= 0.9) {
                $current.innerHTML = '100%';
                callback && callback();
                return;
            }
        }, 600000);
    };

    //=>DONE:完成
    let done = function done() {
        let timer = setTimeout(() => {
            $loadingBox = document.querySelector('#loadingBox');
            $loadingBox.parentNode.removeChild($loadingBox);
            $mainBox.style.display = 'block';
            clearTimeout(timer);
            INIT_ALL();
        }, 1000);
    };

    return {
        init: function () {
            //创建LOADING
            $mainBox = document.querySelector('.mainBox');
            $mainBox.style.display = 'none';
            let $loadingBox = document.createElement('div');
            $loadingBox.id = 'loadingBox';
            $loadingBox.style.position = 'fixed';
            $loadingBox.style.top = '0';
            $loadingBox.style.left = '0';
            $loadingBox.style.zIndex = '999999';
            $loadingBox.style.width = '100%';
            $loadingBox.style.height = '100%';
            $loadingBox.style.background = '#000';
            $loadingBox.style.overflow = 'hidden';
            $loadingBox.innerHTML = '<img src="http://img.zhufengpeixun.cn/loading/loading.gif" alt="" style="position:absolute;width:100%;top: 1rem;left: 0;"><p style="color: #FFF;position:absolute;width:100%;top: 4rem;left: 0;text-align: center;font-size: .16rem;">当前已经加载：<span id="current">0%</span></p>';
            document.body.appendChild($loadingBox);
            $loadingBox = document.querySelector('#loadingBox');
            $current = document.querySelector('#current');

            run(done);
            maxDelay(done);
        }
    }
})();
loadingRender.init();