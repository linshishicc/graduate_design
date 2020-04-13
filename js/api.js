var urls = {
    usersAdd: 'http://localhost:3000/tank/users/usersAdd'
}
var getAllApi = {
    init: function() {
        $('#submitRegister').click(function() {
            let username = $("#reg-username").val()
            let password = $("#reg-password").val()
            let conPassword = $("#con-password").val()
            if (username.length < 4) {
                layer.msg('用户名长度不能小于4个字符', { icon: 0 });
                return;
            }
            if (password.length < 6) {
                layer.msg('密码长度不能小于6个字符', { icon: 0 });
                return;
            }
            if (password !== conPassword) {
                layer.msg('前后密码不一致', { icon: 0 });
                return;
            }
            var newRand = rands.join(',').replace(/,/g, "").toUpperCase();
            // alert(newRand.replace(/,/g, "").toUpperCase())
            //下面就是判断是否== 的代码，无需解释
            console.log(newRand)
            console.log(oValue)
            var oValue = $('#reg-verify').val().toUpperCase();
            if (newRand !== oValue) {
                layer.msg('验证码错误！', { icon: 0 });
                return;
            }
            let param = { username, password, conPassword }
            fetch(urls.usersAdd, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(param), //即传入字符串data={....}
                }).then(response => response.json())
                .then(data => {
                    if (data.status == 1) {
                        layer.msg('注册成功，去登陆吧...', { icon: 1 });
                        setTimeout(() => {
                            $('.login-content').css({ display: 'block' });
                            $('.register-content').css({ display: 'none' });
                            $('#verifyCanvas').remove();
                            $('#reg-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
                            drawCode();
                        }, 500)
                    } else {
                        layer.msg(data.message, { icon: 0 });
                    }
                }).catch()
        })
    }
}