module.exports = function () {

	var ScrollToTop = function () {
		this.$trigger = $('#jsi-scroll-top-link');

	};

	ScrollToTop.prototype.init = function () {
		this.attachEvent();
	};

	ScrollToTop.prototype.attachEvent = function () {
		this.$trigger.on('click', $.proxy(function (e) {
			e.preventDefault();
			this.scroll();
		}, this));
		$(window).on('scroll', $.proxy(function () {
			this.toggleLink();
		}, this));
	};

	ScrollToTop.prototype.scroll = function () {
		$('html, body').animate({
			scrollTop: 0
		}, 100);
	};

	ScrollToTop.prototype.toggleLink = function () {
		this.$trigger.toggleClass('jsc-dn', !this.isNotTop());
	};

	ScrollToTop.prototype.isNotTop = function () {
		return $(window).scrollTop() > 0;
	};

	var scrollToTop = new ScrollToTop();

	scrollToTop.init();

};
