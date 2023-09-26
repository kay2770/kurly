$(function () {
	const $visual = $('#visual');
	const $header = $('header');
	const $aside = $('aside');

	const $mnus = $('header > .container > nav > .gnb > li > a');

	const arrTopVal = [];

	$(window).on('load resize', function () {
		$visual.height($(this).height());

		$('article').each(function (idx) {
			arrTopVal[idx] = $(this).offset().top;
		});
	});

	$mnus.on('click', function (evt) {
		evt.preventDefault();

		const index = $mnus.index(this);

		$('html,body').stop().animate({
			scrollTop: arrTopVal[index],
		});
	});

	$(window).on({
		scroll: function () {
			const scrollTop = Math.ceil($(this).scrollTop());

			if (scrollTop > $visual.height()) {
				$header.addClass('fixed');
				$header.next().css({
					marginTop: 66,
				});
			} else {
				$header.removeClass('fixed');
				$header.next().css({
					marginTop: 0,
				});
			}

			for (let i = 0; i < $mnus.length; i++) {
				if (scrollTop >= arrTopVal[i] - 200) {
					$mnus.eq(i).parent().addClass('on').siblings().removeClass('on');
				} else if (scrollTop < arrTopVal[0] - 200) {
					$mnus.parent().removeClass('on');
				}
			}

			if (scrollTop > 120) {
				$aside.fadeIn();
			} else {
				$aside.fadeOut();
			}
		},
		load: function () {
			$('.logo').trigger('click');
		},
	});

	$('.logo, .top').on('click', function (evt) {
		evt.preventDefault();

		$('html,body').stop().animate({
			scrollTop: 0,
		});
	});
});
