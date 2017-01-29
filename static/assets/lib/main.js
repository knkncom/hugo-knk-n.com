$(function() {

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-23009516-2']);
	_gaq.push(['_trackPageview']);
	
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
  
    $.autopager({
        autoLoad: false,
        content: '.recentPost,.relatedPost',
        link: '.ajaxLoad a',
    });
    $('.ajaxLoad a').click(function() {
        $.autopager('load');
        return false;
    });
});

$(function() {
	var tab = $('.adsSidebarFixed'),
    offset = tab.offset();

	$(window).scroll(function () {
	  if($(window).scrollTop() > offset.top) {
	    tab.addClass('fixed');
	  } else {
	    tab.removeClass('fixed');
	  }
	});
});

//Twitterのシェア数を取得
function getSocialCountTwitter(url, selcter) {
  $.ajax({
    url:'http://jsoon.digitiminimi.com/twitter/count.json',
    dataType:'jsonp',
    timeout: 10000, //10sec
    data:{
      url:url
  },
  success:function(res){
    $( selcter ).html( res.count || '' );
  },
  error:function(){
    $( selcter ).html('error');
  }
  });
}

//Facebookのシェア数を取得
function getSocialCountFacebook(url, selcter) {
  $.ajax({
    url:'https://graph.facebook.com/',
    dataType:'jsonp',
    data:{
      id:url
    },
    success:function(res){
      if (res.share && res.share.share_count) {
        $(selcter).text( res.share.share_count );
      } else {
        $(selcter).text( '' );
      }
    },
    error:function(){
      $(selcter).text('');
    }
  });
}

//Google＋のシェア数を取得
function getSocialCountGooglePlus(url, selcter) {
  $.ajax({
    type: "get", dataType: "xml",
    url: "http://query.yahooapis.com/v1/public/yql",
    data: {
      q: "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
      format: "xml",
      env: "http://datatables.org/alltables.env"
    },
    success: function (data) {
      var content = $(data).find("content").text();
      var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
      var count = (match != null) ? match[1] : '';
 
      $(selcter).text(count);
    }
  });
}

//はてなブックマークではてブ勝を取得
function getSocialCountHatebu(url, selcter) {
  jQuery.ajax({
    url:'http://api.b.st-hatena.com/entry.count?callback=?',
    dataType:'jsonp',
    data:{
      url:url
    },
    success:function(res){
      $(selcter).text( res || '' );
    },
    error:function(){
      $(selcter).text('');
    }
  });
}

//ポケットのストック数を取得
function getSocialCountPocket(url, selcter) {
  $.ajax({
    type: "get", dataType: "xml",
    url: "http://query.yahooapis.com/v1/public/yql",
    data: {
      q: "SELECT content FROM data.headers WHERE url='https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
      format: "xml",
      env: "http://datatables.org/alltables.env"
    },
    success: function (data) {
      var content = jQuery(data).find("content").text();
      var match = content.match(/<em id="cnt">(\d+)<\/em>/i);
      var count = (match != null) ? match[1] : '';
 
      $( selcter ).text(count);
    }
  });
}

// 現在の年を出力
$(function() {
    $(".currentYear").text(new Date().getFullYear());
});
