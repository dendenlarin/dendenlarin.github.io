document.getElementById('send').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const method = document.getElementById('method').value;
    const body = document.getElementById('body').value;
    const resEl = document.getElementById('result');
    resEl.textContent = 'Запрос...';
    try {
        const response = await fetch('/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, method, body })
        });
        const data = await response.json();
        resEl.textContent = JSON.stringify(data, null, 2);
    } catch (e) {
        resEl.textContent = 'Ошибка';
    }
});
