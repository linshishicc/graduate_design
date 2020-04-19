var urls = {
    usersAdd: 'http://localhost:3000/tank/users/usersAdd',
    userLogin: 'http://localhost:3000/tank/login/userLogin'
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
        $('#submitLogin').click(() => {
            let username = $("#log-username").val()
            let password = $("#log-password").val()
            if (username.length == 0) {
                layer.msg('用户名不能为空', { icon: 0 });
                return;
            }
            if (password.length == 0) {
                layer.msg('密码不能为空', { icon: 0 });
                return;
            }
            console.log(rands)
            var newRand = rands.join(',').replace(/,/g, "").toUpperCase();
            // alert(newRand.replace(/,/g, "").toUpperCase())
            //下面就是判断是否== 的代码，无需解释
            var oValue = $('#login-verify').val().toUpperCase();
            console.log(newRand)
            console.log(oValue)
            if (newRand !== oValue) {
                layer.msg('验证码错误！', { icon: 0 });
                return;
            }
            let param = { username, password }
            fetch(urls.userLogin, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(param)
                }).then(response => response.json())
                .then(data => {
                    if (data.status == 1) {
                        layer.msg('登录成功！', { icon: 1 });
                        sessionStorage.setItem('username', data.result.userInfo.username)
                        $('.login').css({ 'height': '0', 'top': '-370px' });
                        $('.login-content').css({ display: 'none' });
                        $('.register-content').css({ display: 'none' });
                        $('.zhezhao').css({ display: 'none' });
                        setMessage.loginPlayer()
                        getAllApi.clearMessage()
                        setMessage.updateVerify()
                    } else {
                        layer.msg(data.message, { icon: 0 });
                    }
                }).catch()
        })
    },
    clearMessage: function() {
        $("#log-username").val("")
        $("#log-password").val("")
        $("#reg-username").val("")
        $("#reg-password").val("")
        $("#con-password").val("")
        $('#reg-verify').val("")
        $('#login-verify').val("")
    }
}
var setMessage = {
    loginPlayer: function() {
        if (sessionStorage.getItem('username')) {
            // $('#login').css({ display: 'none' })
            $('#player').html(`<img src="./images/player.png" alt="">${sessionStorage.getItem('username')}`)
            $('#player').css({ opacity: 1, 'z-index': 1 })
            $('#login').css({ opacity: 0 })
            $('#exit').css({ display: 'flex', opacity: 1, 'z-index': 0 })
                // document.getElementById('login').style.opacity = '0'
        } else {
            $('#player').css({ opacity: 0, 'z-index': -1 })
            $('#login').css({ opacity: 1 })
            $('#exit').css({ display: 'none', opacity: 0, 'z-index': -1 })
        }
    },
    updateVerify: function() {
        $('#verifyCanvas').remove();
        $('#login-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
        $('#reg-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
        drawCode();
    }
}