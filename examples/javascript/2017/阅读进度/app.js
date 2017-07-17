;
~(function(d, log) {

    var ReadBar = ReadBar || function(id, options) {
        this.id = (typeof id === 'string') ? document.getElementById(id) : document.getElementById('readBar');

        if (!(this instanceof ReadBar)) return new ReadBar(id, options);

        this.opts = options || {};
        this.background = this.opts.background || '#f80';
        this.lineW = (this.opts.lineWidth || 4) + 'px';
        this.hasShadow = this.opts.hasShadow || false;
        this.position = this.opts.position || 'top';
        this.hasHideDefault = this.opts.hasHideDefault || false;
        this.setWorH = 'width';

        this.init();
        return true;
    };

    ReadBar.fn = ReadBar.prototype;

    ReadBar.fn.getEl = function() {
        this.els = {};
        return true;
    }

    ReadBar.fn.css = function(el, styles) {
        if (!this.getType(styles, 'object')) return false;
        for (var key in styles) {
            el.style[key] = styles[key]
        }
        return true;
    }

    ReadBar.fn.getType = function(el, target) {
        var _oriType = ({}).toString.call(el).match(/\w+/g)[1].toLowerCase();
        if (target) return _oriType === target.toLowerCase();
        return _oriType;
    }

    ReadBar.fn.baseStyle = function() {
        var _this = this;
        this.css(this.id, {
            background: this.background,
            boxShadow: _this.opts.hasShadow ? '0 0 10px 0 ' + this.background : 'none'
        });
        if (this.hasHideDefault) d.body.classList.add('noScroll');
        return true;
    }

    ReadBar.fn.setPosition = function() {
        var _this = this;
        switch (this.opts.position) {
            case 'right':
                this.setWorH = 'height';
                this.css(this.id, {
                    top: 0,
                    right: _this.lineW,
                    width: _this.lineW
                });
                break;
            case 'left':
                this.setWorH = 'height';
                this.css(this.id, {
                    left: 0,
                    top: 0,
                    width: _this.lineW
                });
                break;
            case 'bottom':
                this.css(this.id, {
                    left: 0,
                    bottom: _this.lineW,
                    height: _this.lineW
                });
                break;
            default:
            case 'top':
                this.css(this.id, {
                    top: 0,
                    left: 0,
                    height: _this.lineW
                });
                break;
        }
        return true;
    }

    ReadBar.fn.init = function() {
        this.getEl();
        this.setPosition();
        this.baseStyle();
        d.addEventListener('scroll', this.scrollFun.bind(this))
    };

    ReadBar.fn.scrollFun = function() {
        var _this = this,
            s = parseInt(document.body.scrollTop / (document.body.scrollHeight - document.documentElement.clientHeight) * 100);
            log(document.body.scrollTop)
        this.css(this.id, {
            [_this.setWorH]: s + '%'
        })
    };

    new ReadBar('readBar', {
        position: 'top',
        hasShadow: true,
        background: '#f5576c',
        lineWidth: 2,
        hasHideDefault: true
    });
}(document, console.log));