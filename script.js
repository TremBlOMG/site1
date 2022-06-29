function addToCart(price) {
    cartAmount += price;
    updateCart();
    alert("Продукт добавлен в корзину!");
}
let cartAmount = 0;
let allProducts;

let modal = $('#modal');

updateCart();

function updateCart() {
    $('#cartAmount').html(cartAmount + ' <i class="fa-solid fa-dollar-sign"></i>');
}
function showMore(id) {
    for(let item in allProducts) {
        if(allProducts[item].id === id) {
            $('#modtitle').text(allProducts[item].title);
            $('#moddesc').text(allProducts[item].desc);
            $('#modprice').text(allProducts[item].price);
            $('#modprm').text(allProducts[item].prom ? 'На товар действует скидка' : 'Скидки нет');
        }
    }
    $('#modal').css('display', 'flex')
}
function weatherBalloon( cityID ) {
    const key = '8f560b30f6013a00618440fc47328f13';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            $('#temp').text(Math.round(parseFloat(data.main.temp)-273.15));
        });
}
const audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'assets/audio.mp3');
$(document).ready(function(){
    weatherBalloon( 703448 );
    const product_template = (id, title, img, price, isp) => {
        return `<div class="product ${isp ? 'prom' : ''}">
            <div class="title">${title}</div>
            <div class="img">
                <img src="assets/products/${img}" alt="${title}">
            </div>
            <div class="price">${price} <i class="fa-solid fa-dollar-sign"></i></div>
            <div class="btns">
                <button onClick="addToCart(${price})"><i class="fa-solid fa-cart-shopping"></i> Buy</button>
                <button onclick="showMore(${id})"><i class="fa-solid fa-eye"></i> More</button>
            </div>
        </div>`
    }

    const cat0 = $('#cat0');
    const cat1 = $('#cat1');
    const cat2 = $('#cat2');
    const cat3 = $('#cat3');

    fetch('./products.json')
        .then((response) => response.json())
        .then(async (data) => {
            allProducts = data;
            let mediumMark = 0;
            for (let item in data) {
                mediumMark += data[item].rate;
                if (data[item].prom) {
                    cat0.append(product_template(data[item].id, data[item].title, data[item].img, data[item].price, data[item].prom))
                }
                if (data[item].category === 1) {
                    cat1.append(product_template(data[item].id, data[item].title, data[item].img, data[item].price, data[item].prom))
                }
                if (data[item].category === 2) {
                    cat2.append(product_template(data[item].id, data[item].title, data[item].img, data[item].price, data[item].prom))
                }
                if (data[item].category === 3) {
                    cat3.append(product_template(data[item].id, data[item].title, data[item].img, data[item].price, data[item].prom))
                }
            }
            $('#srait').text((mediumMark / data.length).toFixed(2));
        })

    $('.menu-toggle').click(function(){
        $('nav').toggleClass('active')
    })

    $('ul li').click(function(){
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');
    })

    $('#facebook').click(function() {
        window.open('http://facebook.com/', '_blank');
    });

    $('#instagram').click(function() {
        window.open('http://instagram.com/', '_blank');
    });

    $('#ressearch').click(function() {
        $('#search_text').val('');
        $('#search_title').hide();
        $('#cat00').hide();
    });
    $('#search').click(function() {
        if($('#search_text').val() === '') {
            alert("Пустой запрос!");
            return;
        }
        $('#cat00').html('').css('display', 'flex');;
        $('#search_title').show();
        for(let item in allProducts) {
            if(allProducts[item].title.includes($('#search_text').val())) {
                $('#cat00').append(product_template(allProducts[item].id, allProducts[item].title, allProducts[item].img, allProducts[item].price, allProducts[item].prom))
            }
        }
    });

    let slideCount =  $(".slider ul li").length;
    let slideWidth =  $(".slider ul li").width();
    let slideHeight =  $(".slider ul li").height();
    let slideUlWidth =  slideCount * slideWidth;

    $(".slider").css({"max-width":slideWidth, "height": slideHeight});
    $(".slider ul").css({"width":slideUlWidth, "margin-left": - slideWidth });
    $(".slider ul li:last-child").prependTo($(".slider ul"));

    function moveLeft() {
        $(".slider ul").stop().animate({
            left: + slideWidth
        },700, function() {
            $(".slider ul li:last-child").prependTo($(".slider ul"));
            $(".slider ul").css("left","");
        });
    }

    function moveRight() {
        $(".slider ul").stop().animate({
            left: - slideWidth
        },700, function() {
            $(".slider ul li:first-child").appendTo($(".slider ul"));
            $(".slider ul").css("left","");
        });
    }


    $(".next").on("click",function(){
        moveRight();
    });

    $(".prev").on("click",function(){
        moveLeft();
    });

    $('#scroller').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000)
    });

    $(window).scroll(function (event) {
        const scroll = $(window).scrollTop();
        if(350 < scroll) {
            $('#scroller').css('display', 'flex');
        } else {
            $('#scroller').hide();
        }
    });

    $('#audioPlay').click(function() {
        audioElement.play();
    });
    $('#audioStop').click(function() {
        audioElement.pause();
    });

    $('#videoCont').removeAttr('controls');
})