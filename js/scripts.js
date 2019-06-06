// NAVIGATION PROTOTYPE
var Navigation = function() {
  this.body = document.getElementsByTagName("BODY")[0];
  this.header = document.getElementsByTagName("HEADER")[0];
  this.btnFind = document.getElementById("btnFind");
  this.findPane = document.getElementsByClassName("headerFind")[0];
  this.findDesktop = document.getElementById("findDesktop");
  this.findCloseBtn = document.getElementById("findCloseBtn");
  this.btnMenu = document.getElementById("btnMenu");
  this.navMobile = document.getElementsByClassName("navMobile")[0];
  this.btnMenuClose = document.getElementById("btnMenuClose");
  this.btnNewsltr = document.getElementById("btnNewsltr");
  this.btnNewsltrAlt = document.getElementById("btnNewsltrAlt");
  this.newsLtr = document.getElementsByClassName("newsletter")[0];
  this.btnNltrClose = document.getElementById("btnNltrClose");
  this.wrapper = document.getElementsByClassName("wrapper")[0];
  this.setup();
};

Navigation.prototype = {
  setup: function () {
    this.navMobile.setAttribute('style', 'display:block;');
    this.newsLtr.setAttribute('style', 'display:block;');
    this.btnFind.addEventListener(
      "click",
      function() {
        if (this.btnFind.getAttribute("data-state") === "off") {
          this.btnFind.setAttribute("data-state", "on");
          this.findPane.setAttribute("class", "headerFind active");
          setTimeout(
            function() {
              this.findDesktop.focus();
            }.bind(this),
            500
          );
        } else {
          this.btnFind.setAttribute("data-state", "off");
          this.findPane.setAttribute("class", "headerFind");
        }
      }.bind(this)
    );
    this.findCloseBtn.addEventListener(
      "click",
      function() {
        this.btnFind.setAttribute("data-state", "off");
        this.findPane.setAttribute("class", "headerFind");
      }.bind(this)
    );
    this.btnMenu.addEventListener(
      "click",
      function() {
        if (this.btnMenu.getAttribute("data-state") === "off") {
          this.btnMenu.setAttribute("data-state", "on");
          this.body.setAttribute("class", "hideScroll");
          this.navMobile.setAttribute("class", "navMobile active");
        }
      }.bind(this)
    );
    this.btnMenuClose.addEventListener(
      "click",
      function() {
        this.btnMenu.setAttribute("data-state", "off");
        this.body.removeAttribute("class");
        this.navMobile.setAttribute("class", "navMobile");
      }.bind(this)
    );
    this.btnNewsltr.addEventListener(
      "click",
      function() {
        this.newsLtr.setAttribute("class", "newsletter active");
      }.bind(this)
    );
    this.btnNewsltrAlt.addEventListener(
      "click",
      function () {
        this.btnMenu.setAttribute("data-state", "off");
        this.body.setAttribute("class", "hideScroll");
        this.navMobile.setAttribute("class", "navMobile");
        this.newsLtr.setAttribute("class", "newsletter active");
      }.bind(this)
    );
    this.btnNltrClose.addEventListener(
      "click",
      function () {
        this.newsLtr.setAttribute("class", "newsletter");
        this.wrapper.setAttribute("class", "wrapper");
        this.body.removeAttribute("class");
      }.bind(this)
    );
    this.newsLtr.addEventListener(
      "click",
      function(e) {
        if (
          e.target.getAttribute("class") !== null &&
          e.target.getAttribute("class").includes("newsletter")
        ) {
          this.newsLtr.setAttribute("class", "newsletter");
          this.wrapper.setAttribute("class", "wrapper");
          this.body.removeAttribute("class");
        }
      }.bind(this)
    );
    document.onkeydown = function(e) {
      e = e || window.e;
      if (e.keyCode == 27) {
        this.newsLtr.setAttribute("class", "newsletter");
        this.wrapper.setAttribute("class", "wrapper");
      }
    }.bind(this);

    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function(e) {
        if (window.innerWidth > 800) {
          var st = window.scrollY;
          if (st > lastScrollTop) {
            if (st > 200) this.header.setAttribute("class", "collapsed");
          } else this.header.removeAttribute("class");
          lastScrollTop = st;
        }
      }.bind(this)
    );
  }
};
// NAVIGATION PROTOTYPE END

// CATEGORY SELECT PROTOTYPE
var CategorySelect = function() {
  this.btnCategory = document.getElementById("btnCategory");
  this.setup();
};
CategorySelect.prototype = {
  setup: function() {
    this.btnCategory.addEventListener(
      "click",
      function() {
        if (this.btnCategory.getAttribute("data-state") === "off") {
          this.btnCategory.setAttribute("data-state", "on");
          this.btnCategory.parentNode
            .getElementsByTagName("DIV")[0]
            .removeAttribute("class");
        } else {
          this.btnCategory.setAttribute("data-state", "off");
          this.btnCategory.parentNode
            .getElementsByTagName("DIV")[0]
            .setAttribute("class", "inactive");
        }
      }.bind(this)
    );
  }
};
// CATEGORY SELECT PROTOTYPE END

// SLIDER PROTOTYPE
var Slider = function() {
  if (document.getElementsByClassName("slider").length === 1) {
    this.slider = document.getElementsByClassName("slider")[0];
    this.items = this.slider.getElementsByTagName("A");
    this.cur = 0;
    this.btnPrev = this.slider.getElementsByClassName("prev")[0];
    this.btnNext = this.slider.getElementsByClassName("next")[0];
    this.counter = document.querySelectorAll(".slider > div > span")[0];
    this.touchstartX = 0;
    this.touchstartY = 0;
    this.touchendX = 0;
    this.touchendY = 0;
    this.gestureZone = this.slider;
    this.setup();
  }
};
Slider.prototype = {
  setup: function() {
    this.timer = setTimeout(
      function() {
        this.setNext();
      }.bind(this),
      8000
    );
    this.counter.innerHTML = `1 / ${this.items.length}`;
    this.btnNext.addEventListener("click", this.setNext.bind(this));
    this.btnPrev.addEventListener("click", this.setPrev.bind(this));
    this.gestureZone.addEventListener(
      "touchstart",
      function(event) {
        this.touchstartX = event.changedTouches[0].screenX;
        this.touchstartY = event.changedTouches[0].screenY;
      }.bind(this),
      false
    );
    this.gestureZone.addEventListener(
      "touchend",
      function(event) {
        this.touchendX = event.changedTouches[0].screenX;
        this.touchendY = event.changedTouches[0].screenY;

        var width = this.slider.getBoundingClientRect().width;
        var height = this.slider.getBoundingClientRect().height;
        var ratio_horizontal = (this.touchendX - this.touchstartX) / width;
        var ratio_vertical = (this.touchendY - this.touchstartY) / height;

        if (ratio_horizontal > ratio_vertical && ratio_horizontal > 0.15) {
          this.setPrev();
        }
        if (ratio_horizontal < ratio_vertical && ratio_horizontal < -0.15) {
          this.setNext();
        }
      }.bind(this),
      false
    );
  },
  setItem: function(el) {
    clearTimeout(this.timer);
    this.items[this.cur].setAttribute("class", "inactive");
    this.items[el].setAttribute("class", "active");
    this.cur = el;
    this.counter.innerHTML = `${this.cur + 1} / ${this.items.length}`;

    this.timer = setTimeout(
      function() {
        this.setNext();
      }.bind(this),
      8000
    );
  },
  setNext: function() {
    if (this.cur < this.items.length - 1) this.setItem(this.cur + 1);
    else this.setItem(0);
  },
  setPrev: function() {
    if (this.cur > 0) this.setItem(this.cur - 1);
    else this.setItem(this.items.length - 1);
  }
};
// SLIDER PROTOTYPE END

//PROTOTYPES INSTANTIATION
document.addEventListener("DOMContentLoaded", function() {
  new Navigation();
  new CategorySelect();
  new Slider();
});
