const alertList = {
    listHtml1: '',
    listHtml2: '',
    listHtml3: '',
    navBarSelect: function () {
        $('.nav li').on('touchstart', function () {
            $(this).children('span').addClass('cur').end().siblings().children('span').removeClass('cur');
            $('.taskList').eq($(this).index()).show().siblings('.taskList').hide();
        })
    },
    getAlertList: function () {
        $.ajax({
            type: 'GET',
            url: 'http://ShCommunity.LeanLoop.net:8000/v1/alerts/zte_002/1104',
            data: {
                userId: 'alertuser',
                password: 'alert20180320'
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('.loading').show();
            },
            success: function (data) {
                $('.loading').hide();
                $.each(data, function (i, ele) {
                    if (ele.relieveCode == 0) {
                        let location1 = ele.resultModel.location.pop();
                        this.listHtml1 = `
                            <li data-sequenceNo=${ele.sequenceNo}>
                                <img src="Images/elevator.png" alt="">
                                <div class="info">
                                    <p>
                                        <span>未显示地址</span>
                                    </p>
                                    <p>
                                        <span>${ele.alertText}</span>
                                    </p>
                                    <p>
                                        <span>ID:${ele.alertSourceRefNo}</span>
                                        <span>${Utils.UnixToDate(ele.alertTime, '-')}</span>
                                    </p>
                                </div>
                                <span class="btn">查看详情</span>
                        </li>`;
                        location1 == '' ? this.listHtml1 += this.listHtml1 : this.listHtml1 += this.listHtml1.replace('未显示地址', `${location1}`);
                        $('.taskList').eq(0).append(this.listHtml1);
                    } else if (ele.relieveCode == 904 || ele.relieveCode == 906 || ele.relieveCode == 907 || ele.relieveCode == 908 || ele.relieveCode == 909 || ele.relieveCode == 920) {
                        let location2 = ele.resultModel.location.pop();
                        this.listHtml2 = `
                            <li class="yellow" data-sequenceNo=${ele.sequenceNo}>
                                <img src="Images/old.png" alt="">
                                <div class="info">
                                    <p>
                                        <span>未显示地址</span>
                                    </p>
                                    <p>
                                        <span>${ele.alertText}</span>
                                    </p>
                                    <p>
                                        <span>ID:${ele.alertSourceRefNo}</span>
                                        <span>${Utils.UnixToDate(ele.alertTime, '-')}</span>
                                    </p>
                                </div>
                                <span class="btn">查看详情</span>
                            </li>`;
                        location2 == '' ? this.listHtml2 += this.listHtml2 : this.listHtml2 += this.listHtml2.replace('未显示地址', `${location2}`);
                        $('.taskList').eq(1).append(this.listHtml1);
                    } else if (ele.relieveCode == 901 || ele.relieveCode == 902 || ele.relieveCode == 903 || ele.relieveCode == 905) {
                        let location3 = ele.resultModel.location.pop();
                        this.listHtml3 = `
                            <li class="red" data-sequenceNo=${ele.sequenceNo}>
                                <img src="Images/electricCar.png" alt="">
                                <div class="info">
                                    <p>
                                        <span>未显示地址</span>
                                    </p>
                                    <p>
                                        <span>${ele.alertText}</span>
                                    </p>
                                    <p>
                                        <span>ID:${ele.alertSourceRefNo}</span>
                                        <span>${Utils.UnixToDate(ele.alertTime, '-')}</span>
                                    </p>
                                </div>
                                <span class="btn">查看详情</span>
                            </li>`;
                        location3 == '' ? this.listHtml3 += this.listHtml3 : this.listHtml3 += this.listHtml3.replace('未显示地址', `${location3}`);
                        $('.taskList').eq(2).append(this.listHtml3);
                    }
                });
                $('.taskList li').on('click', function () {
                    var num = $(this).data('sequenceno');
                    window.location.href = 'AlertDetail.html?SequenceNo=' + num + '';
                })
            }
        });
    },
    init: function () {
        this.navBarSelect();
        this.getAlertList();

    }
}
alertList.init();

