let fruits = [
  {id: 1, title: 'Apple', price: 20, img: 'https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g='},
  {id: 2, title: 'Orange', price: 30, img: 'https://www.sallyfood1.com/wp-content/uploads/2017/12/istockphoto-494037460-612x612-1.jpg'},
  {id: 3, title: 'Mango', price: 40, img: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-mango.jpg'}
]

/* 
* 1) Dynamically, based on an array, withdraw a list of cards
* 2) Show price in modal window
* 3) Modal window for delete button (with 2 buttons)
*--------------------------------------------------
* Based on $.modal need to create a plagin $.confirm
 */

const toHTML = fruit => `
<div class="col" data-point="${fruit.id}>
  <div class="card">
    <img class="card-img-top"  style="height: 300px;" src=${fruit.img}>
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">View price</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
    </div>
  </div>
</div>
`

const priceModal = $.modal({
  title: 'Product price',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
      priceModal.close()
    }}
  ]
})

function render() {
  const html = fruits.map(toHTML).join('')

  document.querySelector('#fruits').innerHTML = html
}

render()

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id

  if (btnType === 'price') {
    const fruit = fruits.find(f => f.id === id)

    priceModal.setContent(`<p>${fruit.title} costs <strong>$${fruit.price}</strong></p>`)
    priceModal.open()
  } else if (btnType === 'remove') {
    const fruit = fruits.find(f => f.id === id)

    $.confirm({
      title: 'Are you sure?',
      content: `<p>You delete <strong>${fruit.title}</strong></p>`
    }).then(() => {
      fruits = fruits.filter(fruit => fruit.id !== id)
      render()
    }).catch(() => {
      console.log('Canceled')
    })
  }
})
