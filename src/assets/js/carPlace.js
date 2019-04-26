var gesturableCanvas = new CanvasZoom({
    canvas: document.getElementById('indoormap'),
    desktop: true
});
function refreshFunc() {
//            if (gesturableCanvas.scale.x > 2.4) {
//                $("#zin-btn").addClass("blue-disable");
//            }
//            if (gesturableCanvas.scale.x < 2.4) {
//                $("#zin-btn").removeClass("blue-disable");
//            }
//            if (gesturableCanvas.scale.x == 1) {
//                $("#zout-btn").addClass("blue-disable");
//            }
//            if (gesturableCanvas.scale.x > 1) {
//                $("#zout-btn").removeClass("blue-disable");
//            }
}
$(document).ready(function () {
    setInterval(refreshFunc, 100);
});

var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;

var zoomScale = 1;
if (clientWidth <= clientHeight) {
    zoomScale = clientWidth / 720;
} else {
    zoomScale = clientHeight / 720;
}

var zoomBtnWidth = $(".zoom-btn").width() * zoomScale;
var zoomBtnHeight = $(".zoom-btn").height() * zoomScale;
var zinFontSize = parseInt($(".zin").css('font-size').substr(0, $(".zin").css('font-size').length - 2)) * zoomScale;
var zoutFontSize = parseInt($(".zout").css('font-size').substr(0, $(".zout").css('font-size').length - 2)) * zoomScale;
var initBtnWidth = $(".init-btn").width() * zoomScale;
var initBtnHeight = $(".init-btn").height() * zoomScale;
var initFontSize = parseInt($(".map-init .init-btn b").css('font-size').substr(0, $(".map-init .init-btn b").css('font-size').length - 2)) * zoomScale;

$(".zoom-btn").width(zoomBtnWidth);
$(".zoom-btn").height(zoomBtnHeight);
$(".zin").css('font-size', zinFontSize);
$(".zout").css('font-size', zoutFontSize);
$(".init-btn").width(initBtnWidth);
$(".init-btn").height(initBtnHeight);
$(".map-init .init-btn b").css('font-size', initFontSize);

$(function () {
    $("#zin-btn").click(function () {
        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;
        var counter = 0;
        a();
        function a() {
            if (gesturableCanvas.scale.x < 2.5) {
                gesturableCanvas.scale.x += 0.05;
                gesturableCanvas.scale.y += 0.05;
                gesturableCanvas.position.x += -(clientWidth / 60);
                gesturableCanvas.position.y += -(clientHeight / 60);
                counter++;
                if (counter < 10) {
                    setTimeout(a, 0.001);
                }
            } else {
                gesturableCanvas.scale.x = 2.5;
                gesturableCanvas.scale.y = 2.5;
                gesturableCanvas.position.x = -(clientWidth / 2);
                gesturableCanvas.position.y = -(clientHeight / 2);
            }
        }
    });

    $("#zout-btn").click(function () {
        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;
        var counter = 0;
        a();
        function a() {
//                    if (gesturableCanvas.scale.x > 1) {
            gesturableCanvas.scale.x -= 0.05;
            gesturableCanvas.scale.y -= 0.05;
            gesturableCanvas.position.x -= -(clientWidth / 60);
            gesturableCanvas.position.y -= -(clientHeight / 60);
            counter++;
//                        if (counter < 10) {
//                            setTimeout(a, 0.001);
//                        }
//                    } else {
//                        gesturableCanvas.scale.x = 1;
//                        gesturableCanvas.scale.y = 1;
//                        gesturableCanvas.position.x = 0;
//                        gesturableCanvas.position.y = 0;
//                    }
        }
    });

    $("#initState").click(function () {
        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;
        a();
        function a() {
            if (gesturableCanvas.scale.x > 1) {
                gesturableCanvas.scale.x -= 0.25;
                gesturableCanvas.scale.y -= 0.25;
                gesturableCanvas.position.x -= -(clientWidth / 12);
                gesturableCanvas.position.y -= -(clientHeight / 12);
                setTimeout(a, 0.001);
            } else {
                gesturableCanvas.scale.x = 1;
                gesturableCanvas.scale.y = 1;
                gesturableCanvas.position.x = 0;
                gesturableCanvas.position.y = 0;
            }
        }
    });
});