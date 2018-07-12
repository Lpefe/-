/**
 * Created by Administrator on 2017/9/8 0008.
 */
(function () {
    var currentIndex;
    var liWidth;
    var list;
    var count;
    var id;
    var isStopped;
    var imgs;
    init();

    function init() {
        isStopped = false;
        //初始化开始位置
        currentIndex = 1;


        //设定ul的宽度，使li能够浮动
        list = document.querySelector('.list');
        liWidth = list.children[0].offsetWidth;


        list.style.left = -currentIndex * liWidth + 'px';


        //克隆第一张，放到最后
        var dummy0 = list.children[0].cloneNode(true);
        var dummyLast = list.lastElementChild.cloneNode(true);

        list.appendChild(dummy0);
        list.insertBefore(dummyLast, list.firstElementChild);

        imgs = document.querySelectorAll('.slider .list img');

        count = list.childElementCount;
        list.style.width = liWidth * count + 'px';

        document.querySelector('.next').onclick = function () {
            stopAuto();
            slideNext();
        }

        document.querySelector('.prev').onclick = function () {
            stopAuto();
            slidePrev();
        }

        var bullets = document.querySelectorAll('.bullet');
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].index = i;
            bullets[i].onclick = function () {
                currentIndex = this.index + 1;
                slideTo(currentIndex);
            }
        }

//            var imgs = document.querySelectorAll('.slider img');
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onmouseover = function () {
                isStopped = true;
                stopAuto();
            }

            imgs[i].onmouseout = function () {
                isStopped = false;
                autoPlay();
            }
        }
        autoPlay();
    }

    function slideNext() {
//            currentIndex++;
        slideTo(++currentIndex);
    }

    function slidePrev() {
//            currentIndex--;
        slideTo(--currentIndex);
    }

    function slideTo(index) {

        if (index === count) {
            //目前已经是假0图片了，应该闪现到真0，然后向1轮播
            currentIndex = index = 2;
            list.style.left = -liWidth + 'px';
        }

        if (index === -1) {
            //目前已经是假0图片了，应该闪现到真0，然后向1轮播
            currentIndex = index = count - 3;
            list.style.left = -liWidth * (count - 2) + 'px';
        }

        //
        var focusIndex;
        var bullets = document.querySelectorAll('.bullet');
        if (index === 0) {
            focusIndex = bullets.length - 1;
        } else if (index === count - 1) {
            focusIndex = 0;
        } else {
            focusIndex = index - 1;
        }
        document.querySelector('.focus').className = 'bullet';
        bullets[focusIndex].className += ' focus';


        var left = -index * liWidth;
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            animate(img, {
                //opacity:100
            })
        }

        animate(imgs[index], {
            //opacity: 100
        })

        animate(list, {
            left: left
        }, function () {
            if (!isStopped) {
                autoPlay();
            }
        })
    }

    function autoPlay() {
        clearInterval(id);
        id = setInterval(function () {
            slideNext();
        }, 3000)
    }

    function stopAuto() {
        clearInterval(id);
    }
})()