;
(function (d, log) {
    /**
     * [NumberAnimation 数字动画构造函数]
     * @param  {[string]} id      [目标元素ID]
     * @param  {[object]} options [配置参数]
     */
    var NumberAnimation = NumberAnimation || function (id, options) {
        this.id = (typeof id === 'string') ? document.getElementById(id) : document.getElementById('numberBox');
        if (!this instanceof NumberAnimation) return NumberAnimation(id, options);

        this.options = options || {};
        this.NUM_HEIGHT = 34;
        this.COMMA_POS = 10;
        this.number = options.number || '1246729';
        this.maxNumber = options.maxNumber || 10;
        this.isRandom = options.isRandom;
        this.isDecimal = options.isDecimal;
        this.isSymboll = options.isSymboll || false;
        this.randomNum = parseInt(Math.random() * (5-1)+1);

        this.init();
    };

    /**
     * [init 初始化]
     */
    NumberAnimation.prototype.init = function () {
        var strRewriteFun = this.strRewrite(this.number);
        this.creatHTML(strRewriteFun);
        this.initAnimations();
    };

    /**
     * [strRewrite 千分位转换]
     * @return {[string]} [strSymboll 符号]
     * @return {[string]} [strNum 整数]
     * @return {[string]} [strDecimal 小数]
     * @return {[string]} [strWhole 全部]
     */
    NumberAnimation.prototype.strRewrite = function (num) {
        var _number = String(num),
            _symboll = '',
            _decimal = '';

        var _numStr = _number.split('.'),
            _splitStr = _numStr[0].replace(/(-|\+)/g, '');

        if (this.isDecimal) _decimal = '.' + _numStr[1];
        if (this.isSymboll && (_number.charAt(0) === '-' || _number.charAt(0) === '+')) _symboll = _number.charAt(0);
        _number = _symboll + _splitStr.replace(/\d(?=(?:\d{3})+\b)/g, '$&,') + _decimal;

        return {
            strSymboll: _symboll,
            strNum: _splitStr.replace(/\d(?=(?:\d{3})+\b)/g, '$&,'),
            strDecimal: _decimal,
            strWhole: _number
        };
    };

    /**
     * [strReset 反转千分位]
     * @param  {[string]} str [千分位字符串]
     * @return {[string]}     [可计算数值(如果带符号及小数则为字符串否则为数值)]
     */
    NumberAnimation.prototype.strReset = function (str) {
        if ((!str.strSymboll && !str.strDecimal) || (!this.isDecimal && !this.isSymboll))
            return Number(str.strWhole.replace(/,/g, ''));
        return str.strWhole.replace(/,/g, '');
    };

    /**
     * [createSubHtml 创建滚动HTML片段]
     */
    NumberAnimation.prototype.createSubHtml = function () {
        this.numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', ',', '-', '+'];
        var oBox = d.createElement('div');
        oBox.classList.add('oBox');

        this.numArr.forEach(function (item, index, arr) {
            var _span = d.createElement('span');
            _span.classList.add('itemSpan');
            _span.classList.add('item_' + index);
            _span.innerText = item;
            oBox.appendChild(_span);
        }, this)
        return oBox;
    };

    /**
     * [cssCalculation 单个字符的偏移值]
     * @param  {[string]} str [数值字符]
     * @return {[type]}     [计算后的值]
     */
    NumberAnimation.prototype.cssCalculation = function (str) {
        var tnumArr = this.numArr,
            NUM_H = this.NUM_HEIGHT;
        var posHeught = str.map(function (item, index, arr) {
            switch (item) {
                case ',':
                    return -parseInt(NUM_H * tnumArr.indexOf(','));
                case '.':
                    return -parseInt(NUM_H * tnumArr.indexOf('.'));
                case '-':
                    return -parseInt(NUM_H * tnumArr.indexOf('-'));
                case '+':
                    return -parseInt(NUM_H * tnumArr.indexOf('+'));
                default:
                    return -parseInt(item * NUM_H);
            }
        }, this);
        return posHeught;
    };

    /**
     * [creatHTML 创建外层HTML片段]
     * @param  {[type]} str [数值字符]
     */
    NumberAnimation.prototype.creatHTML = function (str) {
        var oFragment = d.createDocumentFragment();
        var _str = str.strWhole.split('');
        _str.forEach(function (item, index, arr) {
            var itemBox = d.createElement('div');
            var subHtml = this.createSubHtml();
            itemBox.classList.add('itemBox');
            itemBox.appendChild(subHtml);
            oFragment.appendChild(itemBox);
        }, this);
        this.id.appendChild(oFragment);
    };

    /**
     * [cssAnimations CSS动画]
     * @param  {[string]} num [数值字符]
     */
    NumberAnimation.prototype.cssAnimations = function (num) {
        var oSpan = this.id.querySelectorAll('.oBox'),
            strRewriteFun = this.strRewrite(num).strWhole,
            _str = strRewriteFun.split(''),
            arr = this.cssCalculation(_str);

        _str.forEach(function (item, index) {
            oSpan[index].style.webkitTransform = "translateY(" + arr[index] + "px)";
        }, this);
    };

    /**
     * [initAnimations 初始化动画]
     */
    NumberAnimation.prototype.initAnimations = function () {
        var local = parseInt(this.number);
        this.initTimer = setInterval(function () {
            var len = String(local).length;
            log(this.randomNum);
            this.isRandom ? (local += this.randomNum) : (local += 1);
            var strRewriteFun = this.strRewrite(local);
            if (String(local).length !== len) {
                this.id.innerHTML = '';
                this.creatHTML(strRewriteFun);
            }
            this.cssAnimations(local);
        // }.bind(this), Math.random() * (5000 - 2000) + 2000);
        }.bind(this), 2000);
    };


    new NumberAnimation('numberBox', {
        // 数值
        number: '12347829',
        // 变动最大限制
        maxNumber: 20,
        // 是否随机变化
        isRandom: false,
        // 是否带小数
        isDecimal: false,
        // 是否带单位
        isSymboll: false
    });
     new NumberAnimation('numberBox1', {
        // 数值
        number: '884235',
        // 变动最大限制
        maxNumber: 20,
        // 是否随机变化
        isRandom: false,
        // 是否带小数
        isDecimal: false,
        // 是否带单位
        isSymboll: false
    });
}(document, window.console.log));
