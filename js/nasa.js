const API_KEY = 'DEMO_KEY';

async function loadApod() {
    const container = document.getElementById('apod-content');
    try {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        const data = await res.json();
        container.innerHTML = `<h3>${data.title}</h3><img src="${data.url}" alt="${data.title}"><p>${data.explanation}</p>`;
    } catch (err) {
        container.textContent = 'Не удалось загрузить данные';
    }
}

async function loadMarsPhotos(sol, camera) {
    const photosEl = document.getElementById('mars-photos');
    photosEl.textContent = 'Загрузка...';
    try {
        const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${API_KEY}`);
        const data = await res.json();
        if (data.photos && data.photos.length) {
            photosEl.innerHTML = data.photos.slice(0, 3).map(p => `<img src="${p.img_src}" alt="Mars photo">`).join('');
        } else {
            photosEl.innerHTML = '<p>Фото не найдены</p>';
        }
    } catch (err) {
        photosEl.textContent = 'Ошибка загрузки';
    }
}

document.getElementById('mars-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const sol = document.getElementById('sol').value || 1000;
    const camera = document.getElementById('camera').value;
    loadMarsPhotos(sol, camera);
});

loadApod();
loadMarsPhotos(1000, 'fhaz');
