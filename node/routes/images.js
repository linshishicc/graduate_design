const express = require('express');
let router = express.Router();
const formidable = require('formidable');

router.post('/', function(req, res, next) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/';  //设置上传目录文件会自动保存在这里
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;  //文件大小2M
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.send({errCode:-9999,message:'上传失败：'+err});
        }
        let extName = 'png';  //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if(extName.length == 0){
            return res.send({errCode:9,message:'只支持png和jpg格式图片'});
        }
        //显示地址:
        let showUrl = files.file.path;
        let result = {
            errorCode:0,
            message:'图片上传成功',
            newPath:showUrl
        };
        res.json(result);
    })
});

module.exports = router;
