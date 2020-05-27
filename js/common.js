$(document).ready(function () {

	var form_id = '.form';
	var form_ids = '.form-b'
	$(form_ids).submit(function (evt) {//обработчик события submit для формы
		var http = new XMLHttpRequest(), f = this;
		var named;
		evt.preventDefault();
		var check;
		if ($(f).find($('input:checkbox')).prop('checked')) { check = "check"; console.log(check); }
		else { check = "uncheck"; console.log(check); }


		http.open("POST", "intmail.php", true);//загрузка mail.php

		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		http.send("tokenF=" + f.tokenF.value + "&name=" + f.name.value + "&phone=" + f.phone.value + "&email=" + f.email.value + "&site=" + f.site.value + "&check=" + check);
		http.onreadystatechange = function () {//функция, которую запрос вызовет, когда получит ответ с сервера
			if (http.readyState == 4 && http.status == 200) {
				named = http.responseText;// из отправленной формы
				f.phone.removeAttribute('value'); // очистить поле сообщения (две строки)
				f.site.removeAttribute('value');
				f.email.removeAttribute('value');
				f.name.removeAttribute('value');
				f.phone.value = '';
				f.name.value = '';
				f.email.value = '';
				f.site.value = '';
				$(f).magnificPopup('close');
				$.magnificPopup.open({
					items: {
						src: '#modal1_thanks'
					},
					type: 'inline'
				});//открытие окна с благодарностью

			}
		}
		http.onerror = function () {
			alert('Извините, данные не были переданы');
		}
	});//конец

	$(form_id).submit(function (evt) {//обработчик события submit для формы
		var http = new XMLHttpRequest(), f = this;
		var named;
		evt.preventDefault();
		var check;
		if ($(f).find($('input:checkbox')).prop('checked')) { check = "check"; console.log(check); }
		else { check = "uncheck"; console.log(check); }


		http.open("POST", "sendmail.php", true);//загрузка mail.php

		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		http.send("tokenF=" + f.tokenF.value + "&name=" + f.name.value + "&phone=" + f.phone.value + "&check=" + check);
		http.onreadystatechange = function () {//функция, которую запрос вызовет, когда получит ответ с сервера
			if (http.readyState == 4 && http.status == 200) {
				named = http.responseText;// из отправленной формы
				f.phone.removeAttribute('value'); // очистить поле сообщения (две строки)
				f.phone.value = '';
				$(f).magnificPopup('close');
				$.magnificPopup.open({
					items: {
						src: '#modal1_thanks'
					},
					type: 'inline'
				});//открытие окна с благодарностью

			}
		}
		http.onerror = function () {
			alert('Извините, данные не были переданы');
		}
	});//конец

	$(".popup_c").magnificPopup({
		type: 'inline',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('.gallery').each(function () { // the containers for all your galleries
		$(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});

	$(".carousel").owlCarousel({
		navigation: true,
		navigationText: [
			"<i class='icon-chevron-left icon-white'></i>",
			"<i class='icon-chevron-right icon-white'></i>"
		],
		paginationSpeed: 1000,
		goToFirstSpeed: 2000,
		items: 1,//на всю ширину (количество слайдов на экране одновременно?)
		itemsDesktop: [992, 1],
		itemsDesktopSmall: [768, 1],
		itemsTablet: [576, 1],
		itemsMobile: [320, 1]
	});

	$('.mtt_content_block').each(function(i,elem) {
		$(elem).find('li').each(function(i_ch,elem_ch) {
			if(i_ch % 2 != 0){
				$(elem_ch).addClass('even_block');
			};
		});
	});

	// Табы castom
	$('.mtt_title .mtt_tab').on('click', function() {
		$('.mtt_title .mtt_tab').removeClass('activ');
		$('.mtt_body .mtt_content_block').removeClass('activ');
		$(this).addClass('activ');
		var data = $(this).attr('data-itemTab');
		$('.mtt_body #' + data).addClass('activ');
	});



	//Яндекс-карта
	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [53.877232, 27.637954],
			zoom: 13
		}, {
			searchControlProvider: 'yandex#search'

		});

		myMap.geoObjects.add(new ymaps.Placemark([53.877232, 27.637954],
			{
				preset: 'islands#redCircleDotIcon'
			}));
		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');

	});

});
