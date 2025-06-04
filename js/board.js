(function () {
    const board = document.getElementById('board');
    const addListBtn = document.getElementById('addListBtn');
    const listTemplate = document.getElementById('list-template');
    const cardTemplate = document.getElementById('card-template');

    function save() {
        const data = Array.from(board.children).map(list => ({
            title: list.querySelector('.list-title').value,
            cards: Array.from(list.querySelectorAll('.card-text')).map(c => c.textContent)
        }));
        localStorage.setItem('simple-trello-data', JSON.stringify(data));
    }

    function load() {
        const data = JSON.parse(localStorage.getItem('simple-trello-data') || '[]');
        data.forEach(listData => {
            const listEl = createList(listData.title);
            listData.cards.forEach(text => addCard(listEl, text));
        });
    }

    function createList(title = 'Новый список') {
        const listEl = listTemplate.content.firstElementChild.cloneNode(true);
        listEl.querySelector('.list-title').value = title;
        listEl.querySelector('.add-card').addEventListener('click', () => {
            const text = prompt('Название карточки');
            if (text) addCard(listEl, text);
        });
        listEl.querySelector('.delete-list').addEventListener('click', () => {
            listEl.remove();
            save();
        });
        listEl.addEventListener('dragover', e => e.preventDefault());
        listEl.addEventListener('drop', e => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const card = document.getElementById(id);
            listEl.querySelector('.cards').appendChild(card);
            save();
        });
        board.appendChild(listEl);
        return listEl;
    }

    function addCard(listEl, text) {
        const cardEl = cardTemplate.content.firstElementChild.cloneNode(true);
        cardEl.id = 'card-' + Math.random().toString(36).substr(2, 9);
        cardEl.querySelector('.card-text').textContent = text;
        cardEl.querySelector('.delete-card').addEventListener('click', () => {
            cardEl.remove();
            save();
        });
        cardEl.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', cardEl.id);
        });
        listEl.querySelector('.cards').appendChild(cardEl);
        save();
    }

    addListBtn.addEventListener('click', () => {
        createList();
        save();
    });

    load();
})();
