;
(function(d, log) {

    // 中间继承函数
    function extend(P, C) {
        var F = function() {};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.prototype.constructor = C;
    }

    // A类
    function A(name, age) {
        this.name = name;
        this.age = age;
    }
    // A类getName方法
    A.prototype.getName = function() {
        log('A类getName方法:', this.name);
    }

    var a = new A('iuunhao', 123);
    a.getName();

    // B类
    function B(name, age, type) {
        A.call(this, name, age, type);
        this.type = type;
    }

    // B继承A
    extend(A, B);

    // 重写B类getName方法
    B.prototype.getName = function() {
        log('B类重写getName方法', 'NAME:', this.name, 'AGE:', this.age);
    }

    var b = new B('lisi', 40, 'a');
    b.getName();

    log('b instanceof B && b instanceof A :', b instanceof B && b instanceof A);
    log(b);
    log('b.constructor:', b.constructor.name);

    log(Array(60).join('-'));

})(document, console.log);

;
(function(d, log) {

    // A类
    function A(name, age) {
        this.name = name;
        this.age = age;
    }
    A.prototype.getName = function() {
        log('A类的getName方法', this.name);
    }

    var a = new A('iuunhao', 123);
    a.getName();

    // B类
    function B(name, age, type) {
        A.call(this, name, age, type);
        this.type = type;
    }

    // B类继承A类
    B.prototype = Object.create(A.prototype);
    B.prototype.constructor = B;

    B.prototype.getName = function() {
        log('B类重写getName方法', 'NAME:', this.name, 'AGE:', this.age);
    }

    var b = new B('lisi', 40, 'a');
    b.getName();

    log('b instanceof B && b instanceof A :', b instanceof B && b instanceof A);
    log(b);
    log('b.constructor:', b.constructor.name);

})(document, console.log);
