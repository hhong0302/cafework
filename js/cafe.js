$(function()
{
    //search
    $('.search-select').click(function()
    {
        const dp = $('.search-sbox').css('display');
        if(dp == 'none')
        {
            $('.selectbox').find('.fa-solid').removeClass('fa-angle-down').addClass('fa-angle-up');
            $('.search-sbox').show();
        }
        else
        {
            $('.selectbox').find('.fa-solid').removeClass('fa-angle-up').addClass('fa-angle-down');
            $('.search-sbox').hide();
        }
    });

    $('.search-sbox>a').click(function(e)
    {
        e.preventDefault();
        const txt = $(this).text();
        $('.search-select').text(txt);
        $('.selectbox').find('.fa-solid').removeClass('fa-angle-up').addClass('fa-angle-down');
        $('.search-sbox').hide();
        $('#selectbox').val(txt);
        $('#searchtext').focus();
    });

    $('.hero li').mouseenter(function()
    {
        $('.hero li').removeClass('active');
        $(this).addClass('active');
    });

    //slideshow
    
    let slide = setInterval(mySlide, 3000);
    
    $('.next').click(function()
        {
            clearInterval(slide);
            mySlide();
            slide = setInterval(mySlide,3000);
            
        })

    $('.prev').click(function()
        {
            /* mySlide2();
            setInterval(mySlide,5000); */
            clearInterval(slide);
            prevEvent();
            slide = setInterval(mySlide,3000);
        })

    function times()
    {
        $('.thetime').html(myTime());
    }

    setInterval(times,1000);

    //데이터 가져오기
    jQuery.ajax(
        {
            type: "GET",
            url: "../data/data.json",
            dataType: "JSON",
            success: function(data)
            {
                let list = '';
                for(let i = 0 ; i < data.cafelist.length ; i ++)
                {
                    list += '<li><a href=# class="d-flex align-items-center justify-content-between">';
                    list += '<div class="tbox d-flex align-items-center">';
                    list += '<img src="'+data.cafelist[i].img+'" alt="'+data.cafelist[i].num+'">';
                    list += '<h1>'+data.cafelist[i].num+'</h1><p class="ellipsis">'+data.cafelist[i].content+'</p></div>';
                    list += '<div class="cfe d-flex"><p class="ellipsis">'+data.cafelist[i].cafename+'</p><p class="dg">'+data.cafelist[i].comment+'</p></div></a></li>';
                }
                $('.clist').html(list);
            },
            error: function(xhr, status, error)
            {
                console.log(error);
            }
        }
    )

    $(window).on('scroll',function()
    {
        if($(window).scrollTop()>2000)
        {
            $('.angletop').fadeIn();
        }
        else
        {
            $('.angletop').fadeOut();
        }
    });

    $('.angletop').click(function(e)
    {
        e.preventDefault();
        $('html,body').animate(
            {
                scrollTop:'0'
            },300
        );
    });
    

});   //jquery

function mySlide()
{
    const eq0 = $('.hero .new:eq(0)');
    const eq1 = $('.hero .new:eq(1)');
    eq1.addClass('zindex').css('opacity' , 0).animate(
    {
        'opacity' : 1
    }, 500 , function()
    {
        eq1.find('li').eq(randomList()).addClass('active');
        eq0.removeClass('zindex');
        eq0.find('li').removeClass('active');
        $('.hero').append(eq0);
    });
}

function randomList()
{
    return Math.floor(Math.random() * 4);
}

function prevEvent()
{
    $('.new:first-child').removeClass('zindex');
    $('.new:last-child').addClass('zindex').clone().prependTo('.hero');
    $('.new:last-child').remove();
}

function myTime()
{
    let dt = new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth();
    let d = dt.getDate();
    let h = dt.getHours();
    let mm = dt.getMinutes();
    let mt = `${y}.${m+1}.${d}.<strong>${h}:${mm}</strong>` ;
    return mt;
}