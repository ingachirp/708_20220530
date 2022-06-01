alert("labas");

// const resultPromise = fetch("http://localhost:9000/knygos");

// const responsePromise = resultPromise.then(function(response) {
//     return response.json();
// });

// responsePromise.then(function(result) {
//     console.log(result);
// });

async function fetchCount() {
    const result = await fetch('http://localhost:9000/knygos');
    const json = await result.json();
    const newTable = document.createElement('table')

json.forEach(element => {
    const {title, pageCount, price, author} = element;
    const tr = document.createElement('tr');
    const tdAuthor = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdPageCount = document.createElement('td');
    const tdPrice = document.createElement('td');
    const table = document.querySelector('table');

    table.appendChild(tr);
    tr.appendChild(tdAuthor).innerText = author;
    tr.appendChild(tdTitle).innerText = title;
    tr.appendChild(tdPageCount).innerText = pageCount;
    tr.appendChild(tdPrice).innerText = price;
});
}

fetchCount();