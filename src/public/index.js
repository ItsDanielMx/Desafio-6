const socket = io();
let productsForm = document.getElementById('productsForm')
let chatForm = document.getElementById('chatForm')

productsForm.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: productsForm[0].value,
        price: productsForm[1].value,
        thumbnail: productsForm[2].value
    }
    console.log(product)
    socket.emit('newProduct', product);
    productsForm.reset()
})

chatForm.addEventListener('submit', (e) => handleSubmit(e, e.target, '/chat'))

socket.on('history', data => {
    if (data.length > 0) {
        let history = document.getElementById('history')
        let html = `
        <table class="table container">
        <thead>
          <tr>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Thumbnail</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
        `
        data.forEach(product => {
            html += `
            <tr>
                <td><div class=" mt-2">${product.title}</div></td>
                <td><div class=" mt-2">$ ${product.price}</div></td>
                <td><img class=" mt-2" src="${product.thumbnail}" width="150"></td>
            </tr>
            `
        })
        html += `
        </tbody>
        </table>
        `
    history.innerHTML = html
    }
})

socket.on('chatHistory', data => {
    if (data.length > 0) {
        let chatHistory = document.getElementById('chatHistory')
        let html = ''
        data.forEach(message => {
            html += `
            <div class="container">
                <span style="color: blue; font-weight: bold">${message.email}</span>
                <span style="color: red">[${message.timestamp}]: </span>
                <span style="color: green">${message.message}</span>
            </div>
            `
        })
        chatHistory.innerHTML = html
    }
})