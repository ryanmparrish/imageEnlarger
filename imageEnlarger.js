'use strict';

const ImageEnlarger = function($rootScope, $stateParams, Util) {

    var self = this;

    var header = document.querySelectorAll('#header-dip');
    var active = false;
    var currentScroll = null;
    var article = document.querySelector('.story-article');


//    todo: disable listener if view port is less then 1024 +/-
    self.setListeners = function(val){

        var images = [].slice.call(document.querySelectorAll('.img-enlarge:not(.processed)'));

        images.forEach(function (figure) {
            figure.classList.add('processed');
            $(figure).unbind('mouseover').one('mouseover', function () {
                self.hoverHandle(figure);
            }.bind(this));
        }.bind(this));

    }

    self.hoverHandle = function(figure) {
        console.log('figure', figure);

//        let rgx = /\/imagecache\/inline-(large|xlarge)/i;

        let wrapper = figure.querySelector('.image-wrapper') || figure;
        let img = wrapper.querySelector('img');
        let cloneSrc = img.getAttribute('src');
        let overlay = self.createOverlay();
        let newImage = document.createElement('img');

        newImage.setAttribute('src', cloneSrc);

        newImage.onload = function () {
            wrapper.insertBefore(newImage, img);
            wrapper.appendChild(overlay);
            wrapper.removeChild(img);

            figure.addEventListener('click', function () {
                self.clickHandle(newImage);
            }.bind(this));
        }.bind(this);
    }

    self.createOverlay = function(){
        let overlay = document.createElement('div');
        overlay.setAttribute('class', 'overlay');
        return overlay;
    }

    self.clickHandle = function(clone){
        if (active) {
            self.rmHandle(clone);
            return;
        }
        active = true;
        currentScroll = function () { self.scrollHandle(clone); }.bind(this);
        document.addEventListener('scroll', currentScroll);
        self.getAspectRatio(clone);
    }

    self.scrollHandle = function(clone){
        if (active) {
            self.rmHandle(clone);
            return;
        }
        return;
    }

    self.rmHandle = function(clone){
//        let navBar = document.querySelector('.nav-bar-wrapper');
        let figure = clone.parentNode.parentNode;

        document.removeEventListener('scroll', currentScroll);
        clone.style.transform = 'scale(1) translate(0, 0)';
        figure.classList.remove('enlarged');
//        navBar.style.position = 'relative';
        article.style.overflow = 'hidden';
        active = false;
    }

    self.getAspectRatio = function(clone){
        let figure = clone.parentNode.parentNode;

        let scrollTop = document.body.scrollTop;
        let cloneOffset = clone.getBoundingClientRect();

        let viewportCenterX = (window.innerWidth / 2);
        let viewportCenterY = scrollTop + (window.innerHeight / 2);

        let imageCenterX = cloneOffset.left + (clone.width / 2);
        let imageCenterY = (cloneOffset.top + scrollTop) + (clone.height / 2);

        let xTranslate = (viewportCenterX - imageCenterX);
        let yTranslate = (viewportCenterY - imageCenterY);
        let scaleFactor = self.getScaleFactor(clone);

        let cloneTransform = 'translate(' + xTranslate + 'px, ' + yTranslate + 'px) scale(' + scaleFactor + ')';

        clone.style.transform = cloneTransform;
        article.style.overflow = 'visible';
//        self.animateNavs();

        figure.classList.add('enlarged');
    }

    self.animateNavs = function(){   //todo - implement a nav animation when it's visible
        let navBar = document.querySelector('#header-dip');
        let adHeight = navBar.querySelector('.ad-wrapper').offsetHeight;  // no adds here - carryover from http://www.fastcodesign.com/3056993/the-precarious-state-of-logo-design/3
        let currentY = window.scrollY;

        navBar.style.position = 'static';

        if (adHeight < currentY) {
            this.navs.forEach(function (nav) {
                nav.style.top = '-60px';
            });
        }
    }

    self.getScaleFactor = function(clone){
        let imgRatio = (clone.width / clone.height);
        let windowRatio = (window.innerWidth / window.innerHeight);
        let scaleFactor = window.innerHeight / clone.height;

        if ((clone.naturalHeight < window.innerHeight) && (clone.naturalWidth < window.innerWidth)) {
            scaleFactor = clone.naturalWidth / clone.width;
            return scaleFactor;
        }

        if (imgRatio > windowRatio) {
            scaleFactor = window.innerWidth / clone.width;
            return scaleFactor;
        }

        return scaleFactor;
    }

};

export default {
    name: 'ImageEnlarger',
    fn: ImageEnlarger
};
