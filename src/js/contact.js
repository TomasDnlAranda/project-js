const formContact = document.getElementById('form-contact');
const nameDangerAlert = document.getElementById('name-danger');
const nameSuccessAlert = document.getElementById('name-success');
const emailDangerAlert = document.getElementById('correo-danger');
const emailSuccessAlert = document.getElementById('correo-success');
const commentDangerAlert = document.getElementById('comment-danger');
const commentSuccessAlert = document.getElementById('comment-success');
const formSuccess = document.getElementById('form-success');

formContact.addEventListener('submit', (e) => {
	const regExpOnlyLetters = /^[a-zA-Z ]*$/;
	const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	e.preventDefault();
	const data = new FormData(formContact);
	const [name, email, textarea] = [...data.values()];

	if (!name.trim() || !regExpOnlyLetters.test(name)) {
		nameDangerAlert.classList.remove('d-none');
		nameSuccessAlert.classList.add('d-none');
	} else {
		nameDangerAlert.classList.add('d-none');
		nameSuccessAlert.classList.remove('d-none');
	}

	if (!email.trim()) {
		emailDangerAlert.classList.remove('d-none');
		emailSuccessAlert.classList.add('d-none');
	} else {
		emailDangerAlert.classList.add('d-none');
		emailSuccessAlert.classList.remove('d-none');
	}

	if (!textarea.trim()) {
		commentDangerAlert.classList.remove('d-none');
		commentSuccessAlert.classList.add('d-none');
	} else {
		commentDangerAlert.classList.add('d-none');
		commentSuccessAlert.classList.remove('d-none');
	}

	if (!name.trim() || !regExpOnlyLetters.test(name) || !textarea.trim() || !email.trim()) {
		formSuccess.classList.add('d-none');
		return;
	}

	nameSuccessAlert.classList.add('d-none');
	emailSuccessAlert.classList.add('d-none');
	commentSuccessAlert.classList.add('d-none');
	formSuccess.classList.remove('d-none');
});
