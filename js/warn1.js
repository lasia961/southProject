$(function () {
    $(document).on('click', '.taskList li', function () {
        var num = $(this).data('sequenceno');
        window.location.href = 'AlertDetail.html?SequenceNo=' + num + '';
    })
    $('#showMenu').hide();

})

function ViewList() {
    $('.taskList').empty();
    var id = $('#stateType-select').attr('val');
    $.ajax({
        type: 'GET',
        url: 'http://ShCommunity.LeanLoop.net:8000/v1/alerts/zte_002/1104?state=' + id + '',
        data: {
            userId: 'alertuser',
            password: 'alert20180320'
        },
        dataType: 'JSON',
        beforeSend: function () {

        },
        success: function (data) {
            console.log(data);
            $.each(data, function (i, ele) {
                var location = ele.resultModel.location.pop();
                if (location == '') {
                    location = '未显示地址';
                }
                var img = 'Images/elevator.png';
                switch (ele.relieveCode) {
                    case (902):
                    case (905):
                        img = 'Images/electricCar.png';
                        break;
                    case (906):
                    case (907):
                    case (908):
                    case (909):
                        img = 'Images/old.png';
                        break;
                }
                var listHtml = `<li data-sequenceNo=${ele.sequenceNo}>
        							<img src="${img}" alt="">
        							<div class="info">
                                        <p><span>${ele.alertText}</span></p>
        								<p>
        									<span>${location}</span>
        								</p>

        								<p>
        									<span>ID:${ele.alertSourceRefNo}</span>

        									<span>${ele.alertTime.substring(0, ele.alertTime.length - 1).replace('T', ' ')}</span>
        								</p>
        							</div>
        							<span class="btn">查看详情</span>
        				</li> `;
                $('.taskList').append(listHtml);
            });


        }
    });
}


var iScale = 1;
iScale = iScale / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width, initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + ',user-scalable=no" />')
var iWidth = document.documentElement.clientWidth;
document.getElementsByTagName('html')[0].style.fontSize = iWidth / 7.5 + 'px';

var areaWarn = {
    footerTabIcon: ["Images/footer-icon1.png", "Images/footer-icon2.png", "Images/footer-icon3.png"],
    footerTabIconOn: ["Images/footer-icon1-on.png", "Images/footer-icon2-on.png", "Images/footer-icon3-on.png"],
    infoList: function () {
        var flag = true;
        $(".infoList dt").on('touchstart', function () {
            if (flag) {
                $(this).siblings().hide().end().find('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
                flag = false;
            } else {
                $(this).siblings().show().end().find('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
                flag = true;
            }
        })
    },
    footerTab: function () {

        $('footer li').on('touchstart', function () {
            if ($("#showMenu").is(':hidden')) {
                $('#showMenu').show();
            } else {
                $('#showMenu').hide();
            }
            //    $(this).children('em').addClass('active').end().siblings().children('em').removeClass('active');
            //    $('footer img').each(function (i, ele) {
            //        $(ele).attr('src', areaWarn.footerTabIcon[i]);
            //    })
            //    $(this).find('img').attr('src', areaWarn.footerTabIconOn[$(this).index()]);
            //    $('.tab').eq($(this).index()).show().siblings('.tab').hide();


        })
    },
    navBarSelect: function () {
        $('.nav li').on('touchstart', function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            if ($(".mask").is(':hidden')) {
                $(".mask").show();
                $('.leaderList').eq($(this).index()).show().siblings('.leaderList').hide();
            } else {
                $(".mask").hide()
                $('.leaderList').hide();
            }
        })
        $('.mask').on('touchstart', function () {
            $(".mask").hide();
            $('.leaderList').hide();
        })
        $('.leaderList li').on('touchstart', function (ev) {
            ev.preventDefault();
            $(".mask, .leaderList, .pic").hide();
            $('.taskList1-1').show().siblings('.warnTask').hide();
            // 选择 告警级别
            if ($(this).parent('ul').attr('id') == 'warnTypes-ul') {
                $('#warnType-select').html($(this).html());
            } else if ($(this).parent('ul').is($('.leaderList').eq(0))) {//选择状态
                $('#stateType-select').html($(this).html());
                $('#stateType-select').attr('val', $(this).attr('id'));
                ViewList();
            } else {
                $('#leader-select').html($(this).html());
            }

        })

    },
    selectState: function () {
        $('.abnormalDes dl em').on('touchstart', function () {
            $('.abnormalDes dl em').removeClass('active');
            $(this).addClass('active');
        })
    },
    perSubmit: function () {
        $('.sub').on('touchstart', function () {
            $('.pop').show();
            setTimeout(function () {
                $('.pop').hide();
            }, 3000);
        })

    }
}
areaWarn.infoList();
areaWarn.footerTab();
areaWarn.navBarSelect();
areaWarn.selectState();
areaWarn.perSubmit();


