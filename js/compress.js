var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
// 瓦片canvas  
var tCanvas = document.createElement("canvas");
var tctx = tCanvas.getContext("2d");
var maxsize = 100 * 1024;
function filechooser(file, id) {
    var file = file.files[0];
    var maxsize = 200 * 1024;
    if (window.FileReader) {
        var reader = new FileReader();

        reader.onload = function () {
            var result = this.result;
            var img = new Image();
            img.src = result;


            //                图片加载完毕之后进行压缩，然后上传
            if (img.complete) {
                callback();
            } else {
                img.onload = callback;
            }

            function callback() {
                var data = compress(img);
                img = null;
                upload(data, file.type, id);
            }

        };

        reader.readAsDataURL(file);
    }
    else {
        alert("Not supported by your browser!");
    }

};

//使用canvas对大图片进行压缩  
function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    var bili = 1;

    if (width > 480) {
        bili = 480 / width;
    } else {
        if (height > 640) {
            bili = 640 / height;
        } else {
            bili = 1;
        }
    }
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    // 铺底色  
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //如果图片像素大于100万则使用瓦片绘制  
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
        //计算每块瓦片的宽和高  
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩  
    var ndata = canvas.toDataURL('image/jpeg', 0.3);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}

//图片上传，将base64的图片转成二进制对象，塞进formdata上传
function upload(basestr, type, id) {
    var nowDate = new Date();
    var str = nowDate.getFullYear() + NumToString(nowDate.getMonth() + 1) + NumToString(nowDate.getDate()) + NumToString(nowDate.getHours()) + NumToString(nowDate.getMinutes()) + NumToString(nowDate.getSeconds());
    var filename = id + '_' + str + '.jpg';
    var json = {};
    json.fileName = filename;
    json.title = filename;
    json.content = basestr;
    console.log(JSON.stringify(json));

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        async: false,
        url: 'http://ShCommunity.LeanLoop.net:8000/v1/files/base64',
        data: JSON.stringify(json),
        success: function (data) {
            console.log(data);
            //sequenceno = data.sequenceNo;
            //alert("提交成功");
            //self.html("您已提交").unbind();
            //window.location.href = 'Alert.html';
            // window.location = 'Alert.html';
            $('#uploads').show();
            $('#uploads').append('<div style="width:100%;padding-bottom:0.3rem"><div style="font-size:0.2rem;float:right" class="delPic">X</div><img src="' + data.url.replace(':1080', ':8000') + '" id="' + data.fileName+'" style="width:100%"></div>');
        }
    });


    //$('#show_pic').html('<img src="' + basestr+'" width="80%">');
    //$('#pic').val(basestr);

    //xhr.send(basestr);
}
