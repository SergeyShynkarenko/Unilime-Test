// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll(".list__item");
	const contents = document.querySelectorAll(".content__item");
	const tab = document.querySelector(".tabs__content");

	//Select

	// Полифилл для метода forEach для NodeList
	if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
	}

	document.querySelectorAll('.select__dropdown').forEach(function (dropDownWrapper) {

		const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
		const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
		const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
		const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
		

		// Клик по кнопке. Открыть/Закрыть select
		dropDownBtn.addEventListener('click', function () {
			dropDownList.classList.toggle('dropdown__list--visible');
			this.classList.toggle('dropdown__button--active');
		});

		// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
		dropDownListItems.forEach(function(listItem) {
			listItem.addEventListener('click', function (e) {
				e.stopPropagation();
				dropDownBtn.innerText = this.innerText;
				dropDownBtn.focus();
				dropDownInput.value = this.dataset.value;
				dropDownList.classList.remove('dropdown__list--visible');
				dropDownBtn.classList.remove('dropdown__button--active');

			})
		})

		// Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			if (e.target !== dropDownBtn) {
				dropDownBtn.classList.remove('dropdown__button--active')
				dropDownList.classList.remove('dropdown__list--visible');
			}
		})

		// Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		})
	});

	//Tabs
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", () => {
			for (let j = 0; j < contents.length; j++) {
				contents[j].classList.remove("content--active");
			}
			for (let j = 0; j < tab.length; j++) {
				tab[j].classList.remove("tab--active");
			}
			for (let jj = 0; jj < tabs.length; jj++) {
				tabs[jj].classList.remove("item--active");
			}
			contents[i].classList.add("content--active");
			tabs[i].classList.add("item--active");
			tab.classList.toggle('tab--active')
		});
	}

	const accordionBtns = document.querySelectorAll(".info__arrow");
	accordionBtns.forEach((accordion) => {
		accordion.onclick = function () {
			this.classList.toggle("is-open");

			let content = this.nextElementSibling;

			let content2 = this.previousElementSibling;

			if (content2.style.display === 'none') {
				content2.style.display = 'flex'
				content.style.display = 'none'
			} else {
				content.style.display = 'flex'
				content2.style.display = 'none'
			}
		};
	});
});
