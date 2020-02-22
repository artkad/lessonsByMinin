const fruits = [
{id: 1, title: 'apple', price: 20, img: 'https://images-na.ssl-images-amazon.com/images/I/918YNa3bAaL._SL1500_.jpg'},
{id: 2, title: 'orange', price: 20, img: 'https://previews.123rf.com/images/utima/utima1311/utima131100146/24077398-orange-fruit-isolated-on-white-background.jpg'},
{id: 3, title: 'mango', price: 20, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvQDDpD3Y0NXeI-5kJIRwy4Uyo2R9T9tz6mbtSaIymj_Oq7vsv'}
]

function _createFruit(fruits) {
  fruits.forEach(element => {

    const item = document.getElementById('fruit')
    const lestener = event => {
      if(event.target.dataset.open){
        modal.open();
      }
    }
    item.addEventListener('click',lestener)
    item.insertAdjacentHTML('beforeend', `
      <div class="col">
      <img src="${element.img}" style='height: 300px;' class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <a href="#" class="btn btn-primary" data-open=true>Посмотреть цену</a>
        <a href="#" class="btn btn-danger">Удалить</a>
      </div>
   </div>
      `
    )
  });
  
  return fruits
}
const fruit = _createFruit(fruits)



const modal = $.modal({
  title: 'Это заголовок модального окна!',
  closable: true,
  width: '450px',
  content: `
  <h4>Modal is working</h4>
  <p>Выбор фруктов</p>
  `,
  footerButtons: [
    {text: 'Ok', type: 'primary', handler(){
      console.log('Primary button clicked')
      modal.close()
    }},
    {text: 'Cancel', type: 'danger', handler(){
      console.log('Danger button clicked')
      modal.close()
    }}
  ]
})
