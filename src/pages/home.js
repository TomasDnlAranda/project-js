const moviesDiv = document.getElementById('moviesDiv');
const moviesTemplate = document.getElementById('moviesTemplate');
const fragment = document.createDocumentFragment();

(async () => {
    await fetch("json/movie.json")
    .then(resp => resp.json())
    .then(data => {
        data.forEach((item) => {
            const clone = moviesTemplate.content.cloneNode(true);
            clone.getElementById('imgCard').src = item.img;
            clone.getElementById('cardTitle').textContent = item.title;
            clone.getElementById('movieYear').textContent = item.year;
            clone.getElementById('movieDescription').textContent = item.description;
            fragment.appendChild(clone)
        })
    })
    moviesDiv.appendChild(fragment)
})();



