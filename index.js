
let fruits = [
{id: 1, title: 'apple', price: 20, img: 'https://images-na.ssl-images-amazon.com/images/I/918YNa3bAaL._SL1500_.jpg'},
{id: 2, title: 'orange', price: 210, img: 'https://previews.123rf.com/images/utima/utima1311/utima131100146/24077398-orange-fruit-isolated-on-white-background.jpg'},
{id: 3, title: 'mango', price: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvQDDpD3Y0NXeI-5kJIRwy4Uyo2R9T9tz6mbtSaIymj_Oq7vsv'}
]

const toHTML = fruit =>`
      <div class="col">
      <img src="${fruit.img}" style='height: 300px;' class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn='price' data-id=${fruit.id}>Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn='remove' data-id=${fruit.id}>Удалить</a>
      </div>
   </div>
      `
function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruit').innerHTML = html
}
render()

const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '450px',
  footerButtons: [
    {text: 'Ok', type: 'primary', handler(){
      console.log('Primary button clicked')
      priceModal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  id = +event.target.dataset.id
  const fruit = fruits.find(el => el.id === id)
  if(btnType === 'price'){
    
    priceModal.setContent(`
    <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    priceModal.open()
  } else if (btnType === 'remove'){
    $.confirm({
      title: 'Are you shure?',
      content: `<p>You are deliting an fruit</p> <strong>${fruit.title}</strong>`
    }).then(()=>{
      fruits = fruits.filter(el => el.id !== id)
      render()
    }).catch(()=> {
      console.log('cancel')
    })
  }
})
