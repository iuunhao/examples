;
~(function (d) {
    function Modal(id, options) {
        this.id = (typeof id === 'string') ? d.getElementById(id) : d.getElementById('modal');
        if (!this instanceof Modal) return new Modal(id, options);
        this.tpl = {};
        this.opts = options || {};
        this.opts.hasClose = this.opts.hasClose || false;
        this.opts.title = this.opts.title || '温馨提示';
        this.opts.titleAlign = this.opts.titleAlign || 'left';
        this.opts.msg = this.opts.msg || 'msg！';
        this.opts.hasConfirm = this.opts.hasConfirm || false;
        this.opts.confirmCallback = this.opts.confirmCallback || function () {};
        this.opts.hasCancel = this.opts.hasCancel || false;
        this.opts.cancelCallback = this.opts.cancelCallback || function () {};

        this.init();
    }
    Modal.fn = Modal.prototype;

    Modal.fn.getElements = function () {
        this.els = {};
        this.els.close = this.id.querySelector('.modal__close');
        this.els.title = this.id.querySelector('.modal__title');
        this.els.msg = this.id.querySelector('.modal__main');
        this.els.confirm = this.id.querySelector('[confirm=true]');
        this.els.cancel = this.id.querySelector('[cancel=true]');
        this.els.blurId = d.getElementById(this.opts.blurId || 'wrap');
    }
    Modal.fn.getType = function (el, target) {
        var _type = ({}).toString.call(el).match(/\w+/g)[1].toLowerCase();
        if (target) return _type === target.toLowerCase();
        return _type;
    }
    Modal.fn.createEl = function (opt) {
        if (!this.getType(opt, 'object')) return false;
        this.tpl[opt.name] = d.createElement(opt.tagName);
        this.tpl[opt.name].className = opt.className;
        if (this.opts.titleAlign === 'center') this.tpl[opt.name].classList.add('tc');
        if (opt.html) this.tpl[opt.name].innerHTML = opt.html;
        if (opt.tagName.toLowerCase() === 'a') this.tpl[opt.name].href = "javascript:;";
        if (opt.arrt) {
            opt.arrt.forEach(function (item) {
                this.tpl[opt.name].setAttribute(item[0], item[1]);
            }, this);
        }
        opt.parent.appendChild(this.tpl[opt.name]);
        return true;
    }
    Modal.fn.baseCreate = function () {
        var _this = this;
        this.tpl.root = d.createDocumentFragment();
        this.tpl.content = d.createElement('div');
        this.tpl.content.className = 'modal__content';
        this.tpl.root.appendChild(this.tpl.content);
        this.createEl({
            name: 'title',
            tagName: 'h3',
            html: _this.opts.title,
            parent: _this.tpl.content,
            className: 'modal__title'
        });
        if (this.opts.hasClose) {
            this.createEl({
                name: 'close',
                tagName: 'a',
                html: '✕',
                parent: _this.tpl.content,
                className: 'modal__close'
            });
        }
        this.createEl({
            name: 'msg',
            tagName: 'div',
            html: _this.opts.msg,
            parent: _this.tpl.content,
            className: 'modal__main'
        });
        this.createEl({
            name: 'btns',
            tagName: 'div',
            parent: _this.tpl.content,
            className: 'modal__btns'
        });
        if (this.opts.hasConfirm) {
            this.createEl({
                name: 'confirm',
                tagName: 'a',
                className: 'modal__btn',
                html: _this.opts.confirmTxt,
                arrt: [
                    ['confirm', true]
                ],
                parent: _this.tpl.btns
            });
        }
        if (this.opts.hasCancel) {
            this.createEl({
                name: 'cancel',
                tagName: 'a',
                className: 'modal__btn',
                html: _this.opts.cancelTxt,
                arrt: [
                    ['cancel', true]
                ],
                parent: _this.tpl.btns
            });
        }
        this.id.appendChild(this.tpl.root);
    }
    Modal.fn.init = function () {
        var _this = this;
        this.baseCreate();
        this.getElements();
        if (this.opts.hasBlur) this.els.blurId.classList.toggle('blur');
        this.id.classList.toggle('none');
        this.id.addEventListener('click', function (ev) {
            var e = ev || window.event;
            switch (e.target) {
                case _this.els.close:
                case _this.id:
                    _this.closeEvent(_this.els.close);
                    break;
                case _this.els.cancel:
                    _this.cancelEvent(_this.els.cancel);
                    break;
                case _this.els.confirm:
                    _this.confirmEvent(_this.els.confirm);
                    break;
            }
            e.stopPropagation();
        }, false)
    }
    Modal.fn.closeEvent = function ($this) {
        if (this.opts.hasBlur) this.els.blurId.classList.remove('blur');
        this.id.innerHTML = null;
        this.id.classList.add('none');
    }
    Modal.fn.cancelEvent = function ($this) {
        this.opts.cancelCallback.call(this, $this);
        this.closeEvent();
    }
    Modal.fn.confirmEvent = function ($this) {
        this.opts.confirmCallback.call(this, $this);
        this.closeEvent();
    }
    window.Modal = Modal;
}(document));