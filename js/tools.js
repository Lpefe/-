/**
 * Created by Administrator on 2017/9/8 0008.
 */
/**
 * Created by Administrator on 2017/8/16.
 */
function getStyle(el, style) {
    if (window.getComputedStyle) {
        //非IE
        return window.getComputedStyle(el)[style]
    } else {
        //IE
        return el.currentStyle[style]
    }
}

//TODO:
// 1. 透明度
// 2. 一个元素的多个属性(在同一个timer中操作，原因是因为第二次调用动画函数，会将前一个动画的timer清掉)
// 3. 一个动画结束，再开始另一个动画（链式运动）
function animate(el, properties, fn) {
    clearInterval(el.timer);
    el.timer = setInterval(function () {

        var allDone = true;
        for (var style in properties) {
            //改变多个属性
            var current;
            var target = properties[style];

/*            if (style === 'opacity') {
                current = Math.round(parseFloat(getStyle(el, 'opacity')) * 100)
            } else { }*/
                current = parseInt(getStyle(el, style));


            var speed = (target - current) / 10;

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (speed !== 0) {
                allDone = false;
            }
            if (style === 'opacity') {
                el.style.opacity = (current + speed) / 100;
            } else {
                el.style[style] = current + speed + 'px';
            }

        }

        console.log('allDoen=' + allDone);
        if (allDone === true) {
            clearInterval(el.timer);
            if (typeof fn === 'function') {
                fn();
            }
        }
    }, 20)
}
function stop(el) {
    clearInterval(el.timer);
}





