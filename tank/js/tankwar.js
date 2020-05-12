var TankWarMng = {
    init: function() {
        setMessage.loginPlayer() // 调用该方法实现登录与否的显示
        setMessage.setLevel() // 调用该方法来开放关卡数，比如用户上一次最高的关卡是第3关，那么第四关不开放
        $('#progress').fadeIn('slow', function() {
            new PreLoad(TankWar.resources, () => {
                $(this).fadeOut('slow', function() {
                    TankWarMng.initMenu();
                });
            });
        });
    },
    initMenu: function() {
        TankWarMng.clear();
        $('#home').find('*').show().end().fadeIn('slow');
        $('#star,#star2').mouseup(function() {
            TankWar.players.num = $(this).attr('class');
            // alert(TankWar.players.num)
            $('#home > div').hide();
            $('#home').slideUp();
            $('#levelWin').slideDown(function() {
                $('div', $(this)).show();
            });
        });
        $('#help').mouseup(function() {
            $('#home').fadeOut('fast', function() {
                $('#helpCont').fadeIn('fast');
            });
        });
        $('#helpCont .back').mouseup(function() {
            $('#helpCont').fadeOut('fast', function() {
                $('#home').fadeIn('fast');
            });
        });
        $('#optionWin #scene > div').click(function() {
            $(this).siblings().removeClass('checked').end().addClass('checked');
        });
        $('#optionWin .confirm').click(function() {
            TankWar.param.scene = $('#scene > .checked').attr('class').split(' ').shift();
            $('#optionWin').animate({ height: 0, width: 0, top: 588, left: 800 }, '1000').find('*').hide();
        });
        $('#optionWin .cancel').click(function() {
            $('#optionWin').animate({ height: 0, width: 0, top: 588, left: 800 }, '1000').find('*').hide();
        });
        $('#exit').click(function() {
            sessionStorage.setItem('username', '')
            sessionStorage.setItem('maxLevel', '')
            setMessage.loginPlayer()
            setMessage.setLevel()
            layer.msg('退出成功，您仍然可以玩游戏，但分数不计入排行榜', { icon: 1 });
        });
        // 点击出现登录页面
        $('#login').click(function() {
            $('.login').css({ 'height': '370px', 'top': '120px' });
            $('.login-content').css({ display: 'block' });
            $('.zhezhao').css({ display: 'block' });
        });
        $('.to-login').click(function() {
            $('.login-content').css({ display: 'block' });
            $('.register-content').css({ display: 'none' });
            $('#verifyCanvas').remove();
            $('#login-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
            drawCode();
        });
        // 点击出现注册页面
        $('.to-register').click(function() {
            $('.login-content').css({ display: 'none' });
            $('.register-content').css({ display: 'block' });
            $('#verifyCanvas').remove();
            $('#reg-verify').after('<canvas width="80" height="28" id="verifyCanvas"></canvas>')
            drawCode();
        });
        $('.login .close').click(function() {
            $('.login').css({ 'height': '0', 'top': '-370px' });
            $('.login-content').css({ display: 'none' });
            $('.register-content').css({ display: 'none' });
            $('.zhezhao').css({ display: 'none' });
            getAllApi.clearMessage()
        });
        $('.ranking .rank-close').click(function() {
            $('.ranking').css({ display: 'none' });
        });
        $('#option').click(function() {
            if (!sessionStorage.getItem('username')) {
                layer.msg('您还没登录，暂时无法查看排行榜信息。', { icon: 3 });
            } else {
                getAllApi.getRank()
                $('.ranking').css({ display: 'block' });
            }
        });
        $('#levelWin .iss').click(function() {
            TankWar.param.level = $(this).parent().attr('class').split('_')[1];
            $('#levelWin').hide().find(' > div').hide();
            TankWarMng.initGame();
        });
    },
    bombAudio: function() {
        var myAuto = document.getElementById('myaudio');
        myAuto.play();
        setTimeout(function() {
            myAuto.pause();
            myAuto.load();
        }, 1100)
    },
    victoryAudio: function() {
        var myAuto = document.getElementById('victory');
        myAuto.play();
        setTimeout(function() {
            myAuto.pause();
            myAuto.load();
        }, 5000)
    },
    faliAudio: function() {
        var myAuto = document.getElementById('fail');
        myAuto.play();
        setTimeout(function() {
            myAuto.pause();
            myAuto.load();
        }, 5000)
    },
    initGame: function() {
        TankWarMng.clear();
        var init = function() {
                getMap(TankWar.param.level, function(map) {
                    $.each(map, function(i, n) {
                        TankWarFactory.createBlock(n);
                    });
                    setTimeout(function() {
                        $.each(TankWar.enemies.types, function(i, n) {
                            TankWar.enemies[n].leftNum = TankWar.param.enemyNumOfLevel[TankWar.param.level - 1][n];
                            TankWarMng.setTankCount('enemy' + n.toUpperCase(), TankWar.enemies[n].leftNum);
                        });
                        for (var i = 1; i <= TankWar.players.num; i++) {
                            TankWarFactory.createPlayerTank();
                        }
                        for (var j = 0, len = $('.b').length; j < len; j++) {
                            TankWarFactory.createEnemyTank();
                        }
                    }, 1000);
                });
            },
            getMap = function(index, callback) {
                if (TankWar.maps[index - 1])
                    callback(TankWar.maps[index - 1]);
                else
                    $.getJSON('maps/' + index + '.json', function(map) {
                        TankWar.maps[index - 1] = map;
                        callback(map);
                    });
            };
        TankWarMng.initParam();
        $('#container').css('background', 'url(images/bgrnd' + TankWarMng.getScene() + '.bmp) no-repeat');
        $('#ln').css('background', 'url(images/levelnumber.png) ' + TankWar.util.level_bg_pos[TankWar.param.level - 1] + ' no-repeat');
        $('#startGame').show(function() {
            $('#related').show(function() {
                $('#level').css({ 'opacity': 1, 'top': '200px' });
                $('#level').animate({ opacity: 0, top: '100px' }, 1000);
                TankWarMng.setLevel(TankWar.param.level);
                init();
            });
            TankWarMng.initGamePage();
        });
    },
    initParam: function() {
        TankWar.state.pause = false;
        TankWar.state.exit = false;
        TankWar.param.playerDeadNum = 0;
        TankWarMng.getScene('refresh');
    },
    initGamePage: function() {
        var showInfo = function(_s) {
            $('#info').show();
            $('#info .select').removeClass('selected');
            $('#' + _s + ' .select').addClass('selected');
            TankWar.state.pause = true;
        };
        var processInfo = function() {
            $('#info').hide();
            if ($('#info .selected').parent().attr('id') == 'continue') {
                TankWar.state.pause = false;
            } else {
                TankWarMng.backToMenu();
            }
        }
        $('#goHome, #goMenu, #continue').hover(function() {
            $(this).css('background-position', '25%');
        }, function() {
            $(this).css('background-position', '0%');
        });
        $('#goHome, #goMenu, #continue').mousedown(function() {
            $(this).css('background-position', '50%');
        });
        $('#goMenu, #continue').hover(function() {
            $('.select').removeClass('selected');
            $(this).find(' > .select').addClass('selected');
        });
        $('#goHome').mouseup(function() {
            showInfo('goMenu');
        });
        $('#goMenu, #continue').mouseup(function() {
            processInfo();
        });
        $(window).blur(function() {
            if (document.activeElement == document.body)
                showInfo('continue');
        });
    },
    backToMenu: function() {
        location.reload()
    },
    clear: function() {
        TankWar.state.exit = true;
        $(document).unbind();
        $('#container *').remove();
        $('#related').hide();
        $('#tc_p1, #tc_p2, #score_p1, #score_p2, #tc_enemyR, #tc_enemyB, #tc_enemyY, #tc_enemyG').html('');
        var blocks = TankWar.barrier.players.concat(TankWar.barrier.deadPlayers).concat(TankWar.barrier.enemies).concat(TankWar.barrier.normalBlocks).concat(TankWar.barrier.waterBlocks);
        for (var i = 0, len = blocks.length; i < len; i++) {
            blocks[0].clear();
            blocks.remove(blocks[0]);
        }
        TankWar.enemies.posBorn = [];
    },
    /**
     * 玩家死亡，游戏失败
     */
    onePlayerDead: function() {
        if (++TankWar.param.playerDeadNum == TankWar.players.num) {
            setTimeout(function() {
                TankWarMng.gameover('fail');
            }, 1000);
        }
    },
    oneEnemyDead: (function() {
        // alert('5555')
        var isAnyEnemies = function() {
            for (var i = 0, len = TankWar.enemies.types.length; i < len; i++) {
                if (TankWar.enemies[TankWar.enemies.types[i]].leftNum) {
                    return true;
                }
            }
            return false;
        }
        return function(by, type) {
            by.killOne(type);
            TankWarMng.setScore(by, TankWar.util.type_score[type]);
            if (isAnyEnemies()) {
                setTimeout(function() {
                    try { TankWarFactory.createEnemyTank(); } catch (e) { alert('Something goes wrong when create an enemy tank.'); }
                }, 1000);
            } else if (!TankWar.barrier.enemies.length) {
                setTimeout(function() {
                    TankWarMng.gameover('win');
                }, 1000);
            }
        }
    })(),
    kingDead: function() {
        for (var i = 0, len = TankWar.barrier.players.length; i < len; i++) {
            TankWar.barrier.players[0].lives = 1;
            TankWar.barrier.players[0].die(true);
        }
        setTimeout(function() {
            TankWarMng.gameover('fail');
        }, 1000);
    },
    setScore: function(tank, n) {
        var $score, _p, _w, _i;
        if (typeof tank === 'object') {
            $score = $('#score_' + tank.id);
            _n = TankWarMng.getScore(tank) + '';
            // if (TankWar.players.num == 2) {
            //     TankWar.param.total_score += n / 2
            // } else {
            TankWar.param.total_score += n
                // }
            $('#total').html(`${TankWar.param.total_score}`)
        } else {
            $score = $('#' + tank);
            _n = n + '';
        }
        $score.html('');
        for (var i = 0, len = _n.length; i < len; i++) {
            _i = _n.charAt(i);
            _p = TankWar.util.score_bg_pos[_i].p;
            _w = TankWar.util.score_bg_pos[_i].w;
            $('<div></div>')
                .css({
                    'float': 'left',
                    'background': 'url(images/scorenum.png) ' + _p + ' no-repeat',
                    'height': '25px',
                    'width': _w
                })
                .appendTo($score);
        }
    },
    getScore: function(tank) {
        var score = 0,
            type;
        for (var i = 0, len = TankWar.enemies.types.length; i < len; i++) {
            type = TankWar.enemies.types[i];
            score += tank.kills[type] * TankWar.util.type_score[type];
        }
        return score;
    },
    /**
     * 计算坦克剩余生命数
     */
    setTankCount: function(pid, n) {
        var $tankcount = $('#tc_' + pid.split('_')[0]);
        var _n = n + '';
        var _p, _w, _i;
        $tankcount.html('');
        for (var i = 0, len = _n.length; i < _n.length; i++) {
            _i = _n.charAt(i);
            _p = TankWar.util.p_bg_pos[_i].p;
            _w = TankWar.util.p_bg_pos[_i].w;
            $('<div></div>')
                .css({
                    'float': 'left',
                    'background': 'url(images/tankcount.png) ' + _p + ' no-repeat',
                    'height': '25px',
                    'width': _w
                })
                .appendTo($tankcount);
        }
    },
    setLevel: function(n) {
        var $level = $('#round'),
            _n = n + '',
            _p, _w, _i;
        $level.html('');
        for (var i = 0, len = _n.length; i < _n.length; i++) {
            _i = _n.charAt(i);
            _p = TankWar.util.l_bg_pos[_i].p;
            _w = TankWar.util.l_bg_pos[_i].w;
            $('<div></div>').css({
                    'float': 'left',
                    'background': 'url(images/totalnum.png) ' + _p + ' no-repeat',
                    'height': '30px',
                    'width': _w,
                    'left': '750px'
                })
                .appendTo($level);
        }
    },
    getScene: (function() {
        var randomScene;

        function refrsh() {
            randomScene = Math.round(Math.random() * 2 + 1);
        }
        return function(isRfrsh) {
            if (isRfrsh === 'refresh') refrsh(); // 重新进入游戏时，刷新静态私有属性randomScene的值
            switch (TankWar.param.scene) {
                case 'lawn':
                    return 1;
                    break;
                case 'snowfield':
                    return 2;
                    break;
                case 'sandlot':
                    return 3;
                    break;
                case 'random':
                    return randomScene;
                    break;
            }
        }
    })(),
    gameover: function(result) {
        $.each(TankWar.barrier.players.concat(TankWar.barrier.deadPlayers), function(i, n) {
            $.each(TankWar.enemies.types, function(j, m) {
                TankWarMng.setScore(n.id + m, n.kills[m] * TankWar.util.type_score[m]);
            });
            TankWarMng.setScore(n.id + 'Ttl', TankWarMng.getScore(n));
        });
        TankWarMng.clear();
        $('#startGame').slideUp();
        $('#gameover').find('*').hide().end().slideDown(function() {
            if (result === 'win') {
                TankWarMng.victoryAudio()
            } else {
                TankWarMng.faliAudio()
            }
            $('#wOrl').css('background', 'url(images/' + result + '.png) no-repeat');
            $('#gameover *').show();
            $('#anyKey').addClass('presscontinue');
            if ((result === 'fail' && sessionStorage.getItem('username')) || TankWar.param.level == 4) {
                let param
                if (TankWar.players.num == 2) {
                    param = { score: TankWar.param.total_score / 2, level: TankWar.param.level }
                } else {
                    param = { score: TankWar.param.total_score, level: TankWar.param.level }
                }
                sessionStorage.setItem('maxLevel', param.level)
                getAllApi.updateScore(param)
            }
            $(document).keydown(function() {
                $('#gameover *').hide();
                if (result === 'win' && TankWar.param.level++ !== 4) {
                    TankWar.players.p1.lives = TankWar.players.p2.lives = TankWar.param.enemyNumOfLevel[TankWar.param.level - 1].live;
                    TankWar.param.scene = TankWar.param.enemyNumOfLevel[TankWar.param.level - 1].theme;
                    $('#gameover').fadeOut(TankWarMng.initGame);
                } else {
                    setTimeout(() => {
                        history.go(0)
                    }, 500)
                }
            });
        });
    }
};
var PreLoad = (function() {
    // 构造器
    return function(urlObj, callback) {
        this.callback = callback;
        this.progressBar(100);
    }
})();
PreLoad.prototype = {
    error: function(url) {
        throw new Error('load ' + url + ' failed.');
    },
    progressBar: function(percent, url, type) {
        if (url && type) {
            $('#percent span').text(percent);
            $('#loading span').text(type + ': ' + url.substr(url.lastIndexOf('/') + 1, url.length));
        }
        $('#bar').stop().animate({ left: 550 - 550 * percent / 100 }, 200);
        if (percent === 100) this.over();
    },
    over: function() {
        var that = this;
        setTimeout(function() {
            that.callback();
        }, 500);
    }
};