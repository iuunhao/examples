;
(function (d) {

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    window.addEventListener('resize', function () {}, false);
    var _canvas = d.getElementById('canvas');
    _canvas.width = d.documentElement.clientWidth;
    _canvas.height = d.documentElement.clientHeight;

    function init() {
        var canvas = document.querySelector('canvas'),
            ctx = canvas.getContext('2d'),
            number = 0,
            cW = canvas.width,
            cH = canvas.height;

        function getPixelRatio(context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        };
        getPixelRatio(ctx);

        function animate(ops) {
            var _canvas = d.getElementById('canvas');
            _canvas.width = d.documentElement.clientWidth;
            _canvas.height = d.documentElement.clientHeight;
            var ops = ops || {},
                _requestAnimFrame = requestAnimFrame(animate.bind(null, ops));
            ops.progress = ops.progress > 100 ? 100 : ops.progress;
            ops.progress = ops.progress < 0 ? 0 : ops.progress;
            ops.speed = ops.speed || 0.5;
            ops.speed = ops.speed > 1 ? 1 : ops.speed;
            ops.speed = ops.speed < 0 ? 0.5 : ops.speed;
            if (number === 0) drawFun(ops);
            if (number < ops.progress) {
                number += ops.speed;
                drawFun(ops, number);
            } else {
                cancelAnimationFrame(_requestAnimFrame);
            }
        }
        // 计算角度
        function d2a(n) {
            return n * Math.PI / 180;
        }

        function drawFun(ops) {
            var c = (number * 0.02 * Math.PI) + d2a(ops.rotate),
                cX = cW / 2,
                cY = cH / 2,
                txt = (ops.fontSize || '14') + "px Arial",
                fontW = ctx.measureText(txt).width,
                _W = parseInt(fontW / 3),
                isMinSize = false,
                fontX,
                fontY;

            ops.size = (ops.size > cW / 2) ? cW / 2.3 : ops.size;
            ops.size = (ops.size < 50) ? 50 : ops.size;

            if (ops.size === 50) {
                _W = _W * 0.8;
                isMinSize = true;
            }

            ctx.font = txt;

            ctx.clearRect(0, 0, 777, 777);
            ctx.lineWidth = ops.lineWidth || '10';
            ctx.beginPath();
            ctx.strokeStyle = '#ccc';
            ctx.arc(cX, cY, ops.size, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = ops.fillColor || '#f80';
            ctx.arc(cX, cY, ops.size, d2a(ops.rotate), c);
            ctx.stroke();

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = ops.fillColor || '#f80';
            ctx.translate(cX, cY);
            ctx.rotate(c);
            ctx.arc(ops.size, 0, _W, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
            ctx.closePath();

            ctx.save();
            fontX = Math.cos(c) * ops.size + cX;
            fontY = Math.sin(c) * ops.size + cY;
            ctx.textAlign = 'center';
            ctx.textBaseline = "middle";
            ctx.fillStyle = ops.fontColor || "#fff";
            ctx.translate(fontX, fontY);
            if (isMinSize) ctx.scale(0.8, 0.8);
            ctx.fillText(~~number + '%', 0, 0);
            ctx.restore();

        };

        animate({
            // 进度数值
            progress: 50,
            // 初始化角度
            rotate: 180,
            // 速度 (0.1-1)
            speed: 1,
            // 线条宽度
            lineWidth: 10,
            // 填充颜色
            fillColor: '#f80',
            // 文字大小
            fontSize: 14,
            // 文字颜色
            fontColor: '#fff',
            // 圆半径
            size: 300
        });
    }
    init();

})(document);
