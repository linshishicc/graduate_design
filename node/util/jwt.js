const jwt = require("jsonwebtoken");

//用es6的语法对生成Token和验证Token方法进行函数的封装
class tokenObj {
    createToken(userInfo,time){
        let payload = userInfo;  // Token 数据
        let secret = 'gys.com'; // 这是加密的key（密钥或私钥）
        let token = jwt.sign(payload, secret, {
            expiresIn: time // 24小时过期,以秒作为单位
        });
        return token;
    }
    checkToken(token, fn) {
        let secret = 'gys.com'; // 这是加密的key（密钥或私钥）
        jwt.verify(token, secret, function (err, decode) {
            if (err) { // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑
                console.log(err);
                fn(false);
            } else {
                console.log(decode);
                fn(true);
            }
        })
    }
}
module.exports = tokenObj;
