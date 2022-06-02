const moviesTemplate = document.getElementById('moviesTemplate');
const searchTemplate = document.getElementById('searchTemplate');
const fragment = document.createDocumentFragment();
const moviesRow = document.getElementById('moviesRow');
const serieRow = document.getElementById('serieRow');
searchDiv;
const myListRow = document.getElementById('myListRow');
const searchRow = document.getElementById('searchRow');
const modalTemplate = document.querySelector('.modal__container-all');
const containerModal = document.querySelector('.modalContainer');
const titleModal = document.querySelector('.modal__container-text h3');
const imgModal = document.querySelector('.modal-img');
const yearModal = document.querySelector('#modal__year');
const castModal = document.querySelector('#modal__cast');
const descriptionModal = document.querySelector('#modal__description');
const directionModal = document.querySelector('#modal__direction');
const peopleModal = document.querySelector('#modal__people');
const timeModal = document.querySelector('#modal__time');
const myListIcon = document.querySelector('.bi-plus');
const deleteListIcon = document.querySelector('.bi-x-lg');
const containerIcons = document.querySelector('.modal__container-icons');
const iconSearch = document.getElementById('icon-search');
const iconSearchExit = document.getElementById('icon-search-exit');
const btnSearch = document.getElementById('search-btn');
const btnSearchFalse = document.querySelector('.input-search');
const formSearch = document.querySelector('#form-search');

let userList = [];

(async () => {
	await fetch('../assets/json/movie.json')
		.then((resp) => resp.json())
		.then((data) => {
			data.forEach((item) => {
				const clone = moviesTemplate.content.cloneNode(true);
				clone.getElementById('imgCard').src = item.img;
				clone.getElementById('imgCard').dataset.id = item.id;
				clone.getElementById('imgCard').dataset.imgmodal = item.imgmodal;
				clone.getElementById('imgCard').dataset.title = item.title;
				clone.getElementById('imgCard').dataset.description = item.description;
				clone.getElementById('imgCard').dataset.year = item.year;
				clone.getElementById('imgCard').dataset.cast = item.cast;
				clone.getElementById('imgCard').dataset.direction = item.direction;
				clone.getElementById('imgCard').dataset.time = item.time;
				clone.getElementById('imgCard').dataset.people = item.people;
				fragment.appendChild(clone);
			});
		});
	moviesRow.appendChild(fragment);
})();

(async () => {
	await fetch('../assets/json/serie.json')
		.then((resp) => resp.json())
		.then((data) => {
			data.forEach((item) => {
				const clone = moviesTemplate.content.cloneNode(true);
				clone.getElementById('imgCard').src = item.img;
				clone.getElementById('imgCard').dataset.id = item.id;
				clone.getElementById('imgCard').dataset.imgmodal = item.imgmodal;
				clone.getElementById('imgCard').dataset.title = item.title;
				clone.getElementById('imgCard').dataset.description = item.description;
				clone.getElementById('imgCard').dataset.sesseon = item.sesseon;
				clone.getElementById('imgCard').dataset.year = item.year;
				clone.getElementById('imgCard').dataset.cast = item.cast;
				clone.getElementById('imgCard').dataset.direction = item.direction;
				clone.getElementById('imgCard').dataset.time = item.time;
				clone.getElementById('imgCard').dataset.people = item.people;
				clone.getElementById('imgCard').dataset.mylist = item.mylist;
				fragment.appendChild(clone);
			});
		});
	serieRow.appendChild(fragment);
})();

const showDescriptionMovie = (e) => {
	modalTemplate.style.display = 'flex';
	titleModal.textContent = e.target.dataset.title;
	imgModal.src = e.target.dataset.imgmodal;
	yearModal.textContent = e.target.dataset.year;
	timeModal.textContent = e.target.dataset.time;
	peopleModal.textContent = e.target.dataset.people;
	castModal.textContent = e.target.dataset.cast;
	descriptionModal.textContent = e.target.dataset.description;
	directionModal.textContent = e.target.dataset.direction;
	myListIcon.dataset.id = e.target.dataset.id;
	deleteListIcon.dataset.id = e.target.dataset.id;

	if (e.target.dataset.time === 'undefined') {
		if (e.target.dataset.sesseon === '1') {
			timeModal.textContent = e.target.dataset.sesseon + ' temporada';
		} else {
			timeModal.textContent = e.target.dataset.sesseon + ' temporadas';
		}
	}
};

const fetchData = async (e) => {
	const all = '../assets/json/allmovieandserie.json';
	try {
		const res = await fetch(all);
		const data = await res.json();
		addMyList(data, e);
	} catch (err) {
		console.log(err);
	}
};

const dataAllMovieAndSerie = (e) => {
	fetchData(e);
};

const addMyList = (data, e) => {
	console.log(data);
	console.log(e.target.dataset.id);

	const filter = data.filter((item) => item.id === parseInt(e.target.dataset.id));
	const index = userList.findIndex((item) => item.id === filter[0].id);

	if (index === -1) {
		userList.push(filter[0]);
	}
	showMyList();
};

const showMyList = () => {
	myListRow.textContent = '';
	localStorage.setItem('mylist', JSON.stringify(userList));
	userList.forEach((item) => {
		const clone = moviesTemplate.content.cloneNode(true);
		clone.getElementById('imgCard').src = item.img;
		clone.getElementById('imgCard').dataset.id = item.id;
		clone.getElementById('imgCard').dataset.imgmodal = item.imgmodal;
		clone.getElementById('imgCard').dataset.title = item.title;
		clone.getElementById('imgCard').dataset.description = item.description;
		clone.getElementById('imgCard').dataset.sesseon = item.sesseon;
		clone.getElementById('imgCard').dataset.year = item.year;
		clone.getElementById('imgCard').dataset.cast = item.cast;
		clone.getElementById('imgCard').dataset.direction = item.direction;
		clone.getElementById('imgCard').dataset.time = item.time;
		clone.getElementById('imgCard').dataset.people = item.people;
		clone.getElementById('imgCard').dataset.mylist = true;
		fragment.appendChild(clone);
	});
	myListRow.appendChild(fragment);
};

const deleteListMovieAndSerie = (e) => {
	userList = userList.filter((item) => item.id !== parseInt(e.target.dataset.id));
	showMyList();
};

const showInputSearch = () => {
	btnSearchFalse.style.display = 'flex';
};

const showDeleteInputSearch = () => {
	btnSearchFalse.style.display = 'none';
};

const resultsSearch = async (name) => {
	const all = '../assets/json/allmovieandserie.json';
	try {
		const res = await fetch(all);
		const data = await res.json();
		showResultsSearch(data, name);
	} catch (err) {
		console.log(err);
	}
};

const showResultsSearch = (arr, name) => {
	searchRow.textContent = '';
	const filterSearch = arr.filter((item) => item.title.toLowerCase().includes(name));
	filterSearch.forEach((item) => {
		const clone = searchTemplate.content.cloneNode(true);
		clone.getElementById('imgCard').src = item.img;
		clone.getElementById('imgCard').dataset.id = item.id;
		clone.getElementById('imgCard').dataset.imgmodal = item.imgmodal;
		clone.getElementById('imgCard').dataset.title = item.title;
		clone.getElementById('imgCard').dataset.description = item.description;
		clone.getElementById('imgCard').dataset.sesseon = item.sesseon;
		clone.getElementById('imgCard').dataset.year = item.year;
		clone.getElementById('imgCard').dataset.cast = item.cast;
		clone.getElementById('imgCard').dataset.direction = item.direction;
		clone.getElementById('imgCard').dataset.time = item.time;
		clone.getElementById('imgCard').dataset.people = item.people;
		clone.getElementById('imgCard').dataset.mylist = true;
		fragment.appendChild(clone);
	});
	searchRow.appendChild(fragment);
};

document.addEventListener('click', (e) => {
	if (e.target.matches('.img-fluid')) {
		showDescriptionMovie(e);
	}
	if (e.target.matches('.icon-exit')) {
		modalTemplate.style.display = 'none';
	}

	if (e.target.matches('.bi-plus')) {
		dataAllMovieAndSerie(e);
	}

	if (e.target.matches('.bi-x-lg')) {
		deleteListMovieAndSerie(e);
	}

	if (e.target.matches('.bi-search')) {
		iconSearch.style.display = 'none';
		iconSearchExit.style.display = 'flex';
		showInputSearch();
	}

	if (e.target.matches('.bi-x-circle-fill')) {
		iconSearch.style.display = 'flex';
		iconSearchExit.style.display = 'none';
		showDeleteInputSearch();
	}
});

document.addEventListener('DOMContentLoaded', (e) => {
	if (localStorage.getItem('mylist')) {
		userList = JSON.parse(localStorage.getItem('mylist'));
		showMyList();
	}
});

formSearch.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = new FormData(formSearch);
	const [name] = [...data.values()];

	if (!name.trim()) return;
	resultsSearch(name.toLowerCase());
});
