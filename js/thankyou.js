// THANKYOU PROTOTYPE
var ThankyouPage = function () {
  if (document.getElementsByClassName("thankyou").length === 1) {
    this.message = document.getElementById('message');
    this.continue = document.getElementById('continue');
    this.setup();
  }
}

ThankyouPage.prototype = {
  setup: function () {
    var urlParams = new URLSearchParams(location.search);
    if (urlParams.has('m')) { 
      console.log('yes');
      this.message.innerHTML = atob(urlParams.get('m'));
    }
    this.continue.addEventListener('click', function () {
      window.history.back();
    }.bind(this));
  }
}
// THANKYOU PROTOTYPE END

//PROTOTYPES INSTANTIATION
document.addEventListener("DOMContentLoaded", function() {
  new ThankyouPage();
});