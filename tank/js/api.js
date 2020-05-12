var baseUrl = 'http://47.107.105.199:3000'
var urls = {
    usersAdd: baseUrl + '/tank/users/usersAdd',
    userLogin: baseUrl + '/tank/login/userLogin',
    updateScore: baseUrl + '/tank/score/updateScore',
    getRank: baseUrl + '/tank/score/ranking',
    getLevelList: baseUrl + '/tank/level/levelList'
}
var getAllApi = {
    init: function() {
        getAllApi.getLevelList()
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
            var newRand = rands.join(',').replace(/,/g, "").toUpperCase();
            // alert(newRand.replace(/,/g, "").toUpperCase())
            //下面就是判断是否== 的代码，无需解释
            var oValue = $('#login-verify').val().toUpperCase();
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
                        sessionStorage.setItem('maxLevel', data.result.userInfo.maxLevel)
                        $('.login').css({ 'height': '0', 'top': '-370px' });
                        $('.login-content').css({ display: 'none' });
                        $('.register-content').css({ display: 'none' });
                        $('.zhezhao').css({ display: 'none' });
                        setMessage.loginPlayer()
                        setMessage.setLevel()
                        getAllApi.clearMessage()
                        setMessage.updateVerify()
                    } else {
                        layer.msg(data.message, { icon: 0 });
                    }
                }).catch()
        })
    },
    /**
     * 更新用户分数
     */
    updateScore: (param) => {
        param.username = sessionStorage.getItem('username')
        fetch(urls.updateScore, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(param)
            }).then(response => response.json())
            .then(data => {
                if (data.status == 1) {
                    layer.msg(data.message, { icon: 1 });
                } else if (data.status == 0) {
                    return;
                } else {
                    layer.msg(data.message, { icon: 0 });
                }
            }).catch()
    },
    /**
     * 获取排名列表
     */
    getRank: () => {
        param = { username: sessionStorage.getItem('username') }
        fetch(urls.getRank, {
                method: 'POSt',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(param)
            }).then(response => response.json())
            .then(data => {
                if (data.status == 1) {
                    console.log(data.data)
                    let html = `<tr>
                                <th>排名</th>
                                <th>用户名</th>
                                <th>分数</th>
                                </tr>`
                    data.data.result.forEach((item) => {
                        if (item.username == sessionStorage.getItem('username')) {
                            html = html + `<tr style="color:red;">
                                    <td>${item.rank}</td>
                                    <td>${item.username}</td>
                                    <td>${item.score}</td>
                                </tr>`
                        } else {
                            html = html + `<tr>
                                    <td>${item.rank}</td>
                                    <td>${item.username}</td>
                                    <td>${item.score}</td>
                                </tr>`
                        }

                    })
                    $("#rank-table").html(html)
                    $('#your').html(`<span class="your" id="your">您的当前排名：${data.data.userMessage.rank}<p>分数：${data.data.userMessage.score}</p></span>`)
                        // layer.msg(data.message, { icon: 1 });
                } else {
                    layer.msg(data.message, { icon: 0 });
                }
            }).catch()
    },
    /**
     * 获取关卡信息列表
     */
    getLevelList: function() {
        let level = []
        var opts = {
            method: "GET"
        }
        fetch(urls.getLevelList, opts)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.data.forEach((item) => {
                    var obj = { r: '', b: '', y: '', g: '' }
                    obj.r = parseInt(item.purple);
                    obj.b = parseInt(item.blue);
                    obj.y = parseInt(item.yellow);
                    obj.g = parseInt(item.deepblue);
                    obj.live = parseInt(item.live);
                    obj.theme = item.theme;
                    level.push(obj)
                })
                TankWar.param.enemyNumOfLevel = level
                TankWar.players.p1.lives = TankWar.players.p2.lives = level[0].live + 1
                TankWar.param.scene = level[0].theme
            })
            .catch((error) => {
                // alert(error)
            })
    },
    /**
     * 清除信息，将填写的用户信息清除
     */
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
    /***
     * 设置如果是登录状态，显示用户名和退出登录的按钮，否则只显示登录的按钮
     */
    loginPlayer: function() {
        if (sessionStorage.getItem('username')) {
            $('#player').html(`<img src="./images/player.png" alt="">${sessionStorage.getItem('username')}`)
            $('#player').css({ opacity: 1, 'z-index': 1 })
            $('#login').css({ opacity: 0 })
            $('#exit').css({ display: 'flex', opacity: 1, 'z-index': 0 })
        } else {
            $('#player').css({ opacity: 0, 'z-index': -1 })
            $('#login').css({ opacity: 1 })
            $('#exit').css({ display: 'none', opacity: 0, 'z-index': -1 })
        }
    },
    /**
     * 点击更新验证码
     */
    updateVerify: function() {
        $('#verifyCanvas').remove();
        $('#login-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
        $('#reg-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
        drawCode();
    },
    /**
     * 设关卡，如果没有登录则每一次只能从第一关开始，否则可以从上次完成游戏的最高的以关开始
     */
    setLevel: function() {
        let html = ``
        if (sessionStorage.getItem('maxLevel')) {
            for (let i = 1; i <= 4; i++) {
                let message
                i == 4 ? message = `终极关卡` : message = `第${i}关`
                if (i <= sessionStorage.getItem('maxLevel')) {
                    html = html + `<div class="level_${i}" style="display: none;">
                        <div class="iss"><span class="levelnum">${message}</span></div>
                    </div>`
                } else {
                    html = html + `<div id="level_${i}" style="display: none;">
                        <div class="iss"><span class="levelnum">${message}</span></div>
                    </div>`
                }
            }
        } else {
            html = `<div class="level_1" style="display: none;">
                    <div class="iss"><span class="levelnum">第1关</span></div>
                </div>
                <div id="level_2" style="display: none;">
                    <div class="iss"><span class="levelnum">第2关</span></div>
                </div>
                <div id="level_3" style="display: none;">
                    <div class="iss"><span class="levelnum">第3关</span></div>
                </div>
                <div id="level_4" style="display: none;">
                    <div class="iss"><span class="levelnum">终极关卡</span></div>
                </div>`
        }
        $('#levelWin').html(html)
    }
}