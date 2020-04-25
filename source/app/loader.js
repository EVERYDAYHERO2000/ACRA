export default class Loader {

    constructor() {

        this.message = 'Loading'
        this.tpl = `<div class="spinner"><div class="spinner__inner"></div><div class="spinner__text">${this.message}</div></div>`;
        this.container = document.getElementById('loading');

    }

    start (message) {

        this.message = message || this.message;
        this.container.innerHTML =  this.tpl;

    }

    finish (timer) {

        const _this = this;
        
        timer = timer || 500;

        setTimeout(function(){
            _this.container.innerHTML = '';
        }, timer);
        

    }
    
}    