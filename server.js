var http = require("http");
var url = require("url");
var fs = require("fs");
var iconv = require('iconv-lite');

var date=new Date().getTime();
var file = date+".log";
function writeFile(str)
{
    // 把中文转换成字节数组
    var arr = iconv.encode(str, 'gbk');
    //console.log(arr);

    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    fs.appendFile(file, arr, function (err)
    {
        if (err)
        {
            console.log("fail " + err);
        }
        else
        {
            console.log("写入文件ok");
        }
    });
}
http.createServer(function (req, res)
{
    var ul = url.parse(req.url);
    var str = ul.query;
    if (str)
    {
        try
        {

            //console.log("url", str);
            //console.log(decodeURIComponent(str));
            //console.log("-----------" + str.length);
            str = decodeURIComponent(str);
            writeFile(str + "\n");
            //console.log("===========" + str.length);
            //console.log(str);
            //console.log(str);
        }
        catch (e)
        {
            console.log(e.stack);
        }
    }
    //writeFile(decodeURIComponent(str));
    //console.log(decodeURIComponent(str));
    //console.log(decodeURIComponent(str).substr(0, 100));
      res.writeHead(500, {"Content-Type" : "text/html"});
    res.end();
}).listen(8081);
console.log(8081);