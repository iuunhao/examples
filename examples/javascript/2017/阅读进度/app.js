;
~(function (d, log) {
	/**
	 * ReadBar 构造函数
	 * @param  {string} id      [id]
	 * @param  {object} options [setting]
	 */
    var ReadBar = ReadBar || function (id, options) {
    	//查找滚元素
        this.id = (typeof id === 'string') ? document.getElementById(id) : document.getElementById('readBar');

        // 无new调用
        if (!(this instanceof ReadBar)) return new ReadBar(id, options);

        // 获取外部参数
        this.opts = options || {};
        this.background = this.opts.background || '#f80';
        this.lineW = (this.opts.lineWidth || 4) + 'px';
        this.hasShadow = this.opts.hasShadow || false;
        this.position = this.opts.position || 'top';
        this.hasHideDefault = this.opts.hasHideDefault || false;
        this.setWorH = 'width';

        // 初始化调用
        this.init();
        return true;
    };
    /**
     * ReadBar.fn 重命名prototype
     */
    ReadBar.fn = ReadBar.prototype;
    /**
     * getEl 获取需要元素
     */
    ReadBar.fn.getEl = function () {
        this.els = {};
        return true;
    }
    /**
     * css 设置 css
     * @param  {element} el    要操作的元素
     * @param  {object} styles css
     */
    ReadBar.fn.css = function (el, styles) {
        if (!this.getType(styles, 'object')) return false;
        for (var key in styles) {
            el.style[key] = styles[key]
        }
        return true;
    }
    /**
     * getType 判断类型
     * @param  {str} el     	原始值
     * @param  {str} target 	目标类型（如果有此参数返回布尔，如果没有返回类型）
     */
    ReadBar.fn.getType = function (el, target) {
        var _oriType = ({}).toString.call(el).match(/\w+/g)[1].toLowerCase();
        if (target) return _oriType === target.toLowerCase();
        return _oriType;
    }
    /**
     * baseStyle 设置基本样式
     */
    ReadBar.fn.baseStyle = function () {
        var _this = this;
        this.css(this.id, {
            position: 'fixed',
            background: this.background,
            boxShadow: _this.opts.hasShadow ? '0 0 10px 0 ' + this.background : 'none',
            transition: 'all .5s ease-in-out'
        });
        //如果hasHideDefault为true隐藏页面滚动条
        if (this.hasHideDefault) d.body.classList.add('noScroll');
        return true;
    }
    /**
     * setPosition 设置readBar位置
     */
    ReadBar.fn.setPosition = function () {
        var _this = this;
        switch (this.opts.position) {
            case 'right':
                this.setWorH = 'height';
                this.css(this.id, {
                    top: 0,
                    bottom: 0,
                    right: _this.lineW,
                    width: _this.lineW
                });
                break;
            case 'left':
                this.setWorH = 'height';
                this.css(this.id, {
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: _this.lineW
                });
                break;
            case 'bottom':
                this.css(this.id, {
                    left: 0,
                    right: 0,
                    bottom: _this.lineW,
                    height: _this.lineW
                });
                break;
            default:
            case 'top':
                this.css(this.id, {
                    top: 0,
                    left: 0,
                    right: 0,
                    height: _this.lineW
                });
                break;
        }
      	return true;
    }
    /**
     * init 初始化
     */
    ReadBar.fn.init = function () {
        this.getEl();
        this.setPosition();
        this.baseStyle();
        // 滚动事件
        d.addEventListener('scroll', this.scrollFun.bind(this))
    };
    /**
     * scrollFun 滚动回调
     */
    ReadBar.fn.scrollFun = function () {
        var _this = this,
            s = parseInt(document.body.scrollTop / (document.body.clientHeight - document.documentElement.clientHeight) * 100);
        this.css(this.id, {
            [_this.setWorH]: s + '%'
        })
    }

    ReadBar('readBar', {
        position: 'top',
        hasShadow: true,
        background: '#f80',
        lineWidth: 2,
        hasHideDefault: true
    });
}(document, console.log));