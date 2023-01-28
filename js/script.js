const swiper = new Swiper('.swiper', {
  loop: false,
  spaceBetween: 500,
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevNext: false,
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  });




  // попапы

// получаем классы
// открывает все обекты с данным классом
const popupLinks = document.querySelectorAll('.popup-link'); 
// получаем боди для блокировки скрола
const body = document.querySelector('body');

const lockPadding = document.querySelectorAll(".lock-padding");

// для того чтобы небыло двойных нажатий 
let unlock = true;

// блокировка скрола
const timeout = 300;

// проверка
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        // вешаем событие
        popupLink.addEventListener("click", function(e) {
            // берем значение href, убираем значение хэш и получаем чистое имя
            const popupName = popupLink.getAttribute('href').replace('#', ''); 
            // получаем элемент ид которого равен popupName
            const curentPopup = document.getElementById(popupName);
            // полученный обьект отправляем в функцию
            popupOpen(curentPopup);
            // запрещаем перезагружать страницу
            e.preventDefault();
        });
    }
}

// функция для обьектов которая будет закрывать попапы
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e){
            // отправляем в функцию обьект который является ближайшим родителем нажатой ссылки 
            popupClose(el.closest('.popup'));
              // запрещаем перезагружать страницу
            e.preventDefault();
        });
      }
}


// функция открытия попапа
// передаем в функцию готовый обьект
function popupOpen(curentPopup) {
    // проверяем есть ли обьект и открыта ли переменная онлок
    if(curentPopup && unlock) {
        // получить открытый попап 
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            // если он существует то закрыть его
            popupClose(popupActive, false);
        } else {
            // иначе блочим скролл боди
            bodyLock();
        }
        // добавляем попапу класс опен
        curentPopup.classList.add('open');
        // открытому попапу вешаем событие
        curentPopup.addEventListener("click", function (e){
            // если у нажатого обьекта нету в родителе обьекта с классом попап тогда попап закрываем
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}


// чтобы небыло сдвига контента выщитываем ширину экрана и добавляем ширину полосы прокрутки при активации попапа
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.header').offsetWidth + 'px';
if (lockPadding.length > 0){
     for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
     }
 }
// присваиваем значение ширины прокрутки ввиде паддинга для боди
     body.style.paddingRight = lockPaddingValue;
     body.classList.add('lock');

     unlock = false;
     setTimeout(function(){
        unlock = true;
     }, timeout);
}


function bodyUnLock() {
    setTimeout( function(){
        if (lockPadding.length > 0){
             for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
             }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e){
    if (e.which === 27){
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


(function(){
    if(!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    if(!Element.prototype.matches) { 

        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();



jQuery(document).ready(function () {
     
    $(".phone").mask("+380 (99) 999-99-99"); 
   
  
   jQuery('.send-form').click( function() {
       var form = jQuery(this).closest('form');
       
       if ( form.valid() ) {
           form.css('opacity','.5');
           var actUrl = form.attr('action');

           jQuery.ajax({
               url: actUrl,
               type: 'post',
               dataType: 'html',
               data: form.serialize(),
               success: function(data) {
                   form.html(data);
                   form.css('opacity','1');
                   //form.find('.status').html('форма отправлена успешно');
                   //$('#myModal').modal('show') // для бутстрапа
               },
               error:	 function() {
                    form.find('.status').html('серверная ошибка');
               }
           });
       }
   });


});


// клик бургер меню  
document.addEventListener("DOMContentLoaded", function(){
	"use strict";
	let theBody = document.querySelector(".header_burger");
  let menu = document.querySelector(".menu");
  let element = document.querySelectorAll('.title-nav_li');
	  function toggleClass() {
        document.body.classList.toggle('lock');
		    theBody.classList.toggle("activ");
        menu.classList.toggle("activ");
        for(let i = 0; i < element.length; i++) {
            element[i].classList.toggle("activ");
          };
       
	};
	document.querySelector(".header_burger").addEventListener("click", toggleClass );
  document.querySelector(".prise_li").addEventListener("click", toggleClass);
  document.querySelector(".reviews_li").addEventListener("click", toggleClass);
});