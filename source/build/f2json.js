const path = require('path');
const fs = require('fs');
const rd = require('rd');
// 存放文件列表
const json = {
    list: [],
    category: {},
    total: 0
};
// examples遍历跟目录
const PATHS = {
    src: path.join(process.cwd(), '../examples')
};
// 只遍历目录下的index.html
rd.eachFileFilterSync(PATHS.src, /index\.html$/, function(f, s) {
    var url = path.relative(PATHS.src, f), // 获取index.html相对于examples目录的相对路径
        thu = path.join(path.dirname(f), 'thumbnail.png'), //是否包含缩略图
        category = url.split(path.sep)[0]; // 获取分类
    json.total++;// example总数计算
    json.category[category] = category;// 分类收集
    json.list.push({
        birthtime: Date.parse(s.birthtime), //example创建时间
        ctime: Date.parse(s.ctime),  //example最后修改时间
        type: url.split(path.sep)[0], //example所属分类
        name: path.basename(path.dirname(f)), //example的名称
        url: url, //example的相对路径，也是唯一标识
        year: url.split(path.sep)[1], //example所属年份
        thumbnail: fs.existsSync(thu, exists => exists ? true : false) //example是否包含缩略图
    })
});
// 写入文件
fs.writeFile(path.join(process.cwd(), 'src/data/files.json'), JSON.stringify(json), function(err) {
    if (!err) console.log("写入成功！");
})