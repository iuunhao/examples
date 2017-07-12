;
(function(d) {
    var main = d.querySelector('.sMain')
    document.addEventListener('click', function(ev) {
        var e = ev || window.event;
        if (e.target.className === 'sBtn1') {
            main.style.height = '100px';
        }
        if (e.target.className === 'sBtn2') {
            main.style.height = document.documentElement.clientHeight + 'px';
        }
    })
})(document);
