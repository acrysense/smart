document.addEventListener('DOMContentLoaded', function () {
    // SWIPER
    let mySwiperMain = new Swiper('.main__slider .swiper-container', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
        }
    })

    let mySwiperSmartFlat = new Swiper('.smart-flat__slider .swiper-container', {
        effect: 'fade',
        slidesPerView: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    });

    let mySwiperSmartFlatThumbs = new Swiper('.smart-flat__thumbs .swiper-container', {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
        },
        thumbs: {
            swiper: mySwiperSmartFlat
        }
    })

    let mySwiperFlat = new Swiper('.flat__slider .swiper-container', {
        slidesPerView: 1,
        direction: 'vertical',
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
        }
    })

    let mySwiperMortgage = new Swiper('.mortgage-slider .swiper-container', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
        },
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 16
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            992: {
                slidesPerView: 'auto'
            },
            1440: {
                slidesPerView: 1
            }
        }
    })

    let mySwiperInfrastucture = new Swiper('.infrastructure__slider .swiper-container', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
        },
        breakpoints: {
            992: {
                slidesPerView: 'auto'
            },
            1440: {
                slidesPerView: 1
            }
        }
    })

    let mySwiperProjects = new Swiper('.projects__head .swiper-container', {
        preloadImages: false,
        lazy: true,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
        }
    })

    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // ABOUT TABS
    document.querySelectorAll('.tabs__item').forEach((item, i) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('active'))
            document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('active'))

            item.classList.add('active')
            document.querySelectorAll('.tabs__content')[i].classList.add('active')

            if (i < 10) {
                tabCurrent.innerHTML = '0' + (i + 1);
            } else {
                tabCurrent.innerHTML = i + 1;
            }
        })
    })

    let tabCurrent = document.getElementById('tabs-current')
    let tabTotal = document.getElementById('tabs-total')
    let item = document.querySelectorAll('.tabs__item')
    let itemCount = 0

    if (item && tabCurrent && tabTotal) {
        if (item.length < 10) {
            itemCount = '0' + item.length
        } else {
            itemCount = item.length
        }

        tabCurrent.innerHTML = '0' + 1
        tabTotal.innerHTML = itemCount
    }

    // INDEX PEOPLE TABS
    document.querySelectorAll('.main-tabs__item').forEach((item, i) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.main-tabs__item').forEach((child) => child.classList.remove('active'))
            document.querySelectorAll('.main-tabs__content').forEach((child) => child.classList.remove('active'))

            item.classList.add('active')
            document.querySelectorAll('.main-tabs__content')[i].classList.add('active')
        })
    })

    // ACCORDION
    document.querySelectorAll('.accordion__trigger').forEach((item) =>
        item.addEventListener('click', () => {
            const parent = item.parentNode
            const content = document.querySelector('.accordion__content')

            if (parent.classList.contains('accordion__item--active')) {
                parent.classList.remove('accordion__item--active')
            } else {
                document.querySelectorAll('.accordion__item').forEach((child) => {
                    child.classList.remove('accordion__item--active')
                })
                parent.classList.add('accordion__item--active')
            }
        })
    )

    // MODAL
    const modalBtn = document.querySelectorAll('.menu__link--cta.menu__link--people'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('.modal__close'),
        modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalBtn) {
        modalBtn.forEach(function(item){
            item.addEventListener('click', function (event) {
                event.preventDefault();
    
                document.body.classList.add('scroll-disabled');
                modal.classList.add('modal--active');
                modalOverlay.classList.add('modal-overlay--active');
            });
        });
    }

    document.body.addEventListener('keyup', function (event) {
        let key = event.keyCode;

        if (key == 27) {
            document.body.classList.remove('scroll-disabled');
            document.querySelector('.modal.modal--active').classList.remove('modal--active');
            document.querySelector('.modal-overlay').classList.remove('modal-overlay--active');
        };
    }, false);


    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            document.body.classList.remove('scroll-disabled');
            document.querySelector('.modal.modal--active').classList.remove('modal--active');
            this.classList.remove('modal-overlay--active');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            document.body.classList.remove('scroll-disabled');
            document.querySelector('.modal.modal--active').classList.remove('modal--active');
            modalOverlay.classList.remove('modal-overlay--active');
        });
    }

    // JOBS RESUME
    document.querySelectorAll('.jobs-form__inputfile').forEach(function (el) {
        let resumeBtn = document.querySelector('.jobs-form__resume');
        let fileList;

        el.addEventListener('change', function (e) {
            fileList = [];
            for (let i = 0; i < el.files.length; i++) {
                fileList.push(el.files[i]);
            }

            fileList.forEach(file => {
                uploadFile(file);
            });
        });

        const uploadFile = (file) => {
            if (file.size > 5 * 1024 * 1024) {
                alert('Максимальный размер: 5mb.');
                return;
            }

            resumeBtn.textContent = file.name;
            resumeBtn.classList.add('jobs-form__resume--upload');
        }
    });

    // FILTER
    document.querySelectorAll('.filter__checkbox').forEach((item) =>
        item.addEventListener('click', () => {
            if (!item.getAttribute('checked')) {
                item.setAttribute('checked', 'checked');
                item.parentNode.parentNode.parentNode.classList.add('active');
            } else {
                item.removeAttribute('checked', 'checked');
                item.parentNode.parentNode.parentNode.classList.remove('active');
            }
        })
    );

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle'),
        overlay = document.querySelector('.overlay'),
        menuList = document.querySelector('.menu__list')

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('hamburger--active') && overlay.classList.contains('overlay--open')) {
                hamburger.classList.remove('hamburger--active');
                overlay.classList.remove('overlay--open');
                menuList.classList.remove('menu__list--overlay');
                document.body.classList.remove('scroll-disabled');
            } else {
                hamburger.classList.add('hamburger--active');
                overlay.classList.add('overlay--open');
                menuList.classList.add('menu__list--overlay');
                document.body.classList.add('scroll-disabled');
            }
        });
    }

    // SUBMENU
    document.querySelectorAll('.mobile-menu__link--sub').forEach((item) =>
        item.addEventListener('click', (event) => {
            event.preventDefault()
            
            const parent = item.parentNode

            if (parent.classList.contains('mobile-menu__item--active')) {
                parent.classList.remove('mobile-menu__item--active')
            } else {
                document.querySelectorAll('.mobile-menu__item').forEach((child) => {
                    child.classList.remove('mobile-menu__item--active')
                })
                parent.classList.add('mobile-menu__item--active')
            }
        })
    );
});