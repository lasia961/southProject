$(function () {
    $(document).on('click', '.taskList li', function () {
        var num = $(this).data('sequenceno');
        window.location.href = 'AlertDetail.html?SequenceNo=' + num + '';
    })
    $('#showMenu').hide();
    ViewPie();
})

function ViewList() {
    $('.map').hide();
    $('.taskList').empty();
    var id = $('#stateType-select').attr('val');
    var alertLevel = $('#warnType-select').attr('val');
    if (!alertLevel) alertLevel = '';
    $.ajax({
        type: 'GET',
        url: 'http://ShCommunity.LeanLoop.net:8000/v1/alerts/zte_002/1104?state=' + id + '&alertLevel=' + alertLevel+'',
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

function ViewPie() {
    $.ajax({
        type: 'GET',
        url: 'http://ShCommunity.LeanLoop.net:8000/v1/analysis/zte_002/1104',       
        dataType: 'JSON',
        beforeSend: function () {

        },
        success: function (data) {
            var option = {
                title: {
                    text: '告警概览',
                    x: 'center',
                    textStyle: {
                        fontSize:25
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    bottom: '15%',
                    textStyle: {
                        fontSize: 20
                    },
                    data: ['一级告警', '二级告警', '三级告警']
                },
                series: [
                    {
                        name: '告警级别',
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '40%'],
                        textStyle: {
                            fontSize: 20
                        },
                        label: {
                            normal: {
                                show: false
                            }, textStyle: {
                                fontSize: 20
                            }
                        },
                        data: [
                            { value: data.c1, name: '一级告警' },
                            { value: data.c2, name: '二级告警' },
                            { value: data.c3, name: '三级告警' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById('charts'));
            myChart.setOption(option);
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
                $('#warnType-select').attr('val', $(this).attr('id'));
                ViewList();
            } else if ($(this).parent('ul').is($('.leaderList').eq(0))) {//选择状态
                $('#stateType-select').html($(this).html());
                $('#stateType-select').attr('val', $(this).attr('id'));
                ViewList();
            } else {
                $('#warnDate-select').html($(this).html());
                $('#warnDate-select').attr('val', $(this).attr('id'));

                ViewList();
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


