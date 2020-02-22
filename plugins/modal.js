Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}
function noop(){}
function _createModalFooter(buttons = []) {
  if(buttons.length === 0) {
    return document.createElement('div')
  }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')
    buttons.forEach(btn => {
      const $btn = document.createElement('button')
      $btn.textContent = btn.text
      $btn.classList.add('btn')
      $btn.classList.add(`btn-${btn.type}` || 'secondary')
      $btn.onclick = btn.handler || noop

      wrap.appendChild($btn)
    })
    

    return wrap
}



function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('vmodal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close=true>
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'window'}</span>
          <span class="modal-close" data-close=true>${options.closable ? '&times;' : ""}
          </span>
        </div>
        <div class="modal-body" data-content>
          <p>${options.content || ''}</p>
        </div>
      </div>
    </div>
  `)
  const footer = _createModalFooter(options.footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal)
  return modal
}

/*
* title: string
* closable: boolean
* content: string
* width: string ('400px')
* destroy(): void
* Окно должно закрываться
* --------------
* setContent(html: string): void | PUBLIC
* onClose(): void
* onOpen(): void
* beforeClose(): boolean
* --------------
* animate.css
* */
$.modal = function(options) {
  const ANIMATION_SPEED = 200
  const $modal = _createModal(options)
  let closing = false
  let destroyed = false

  const modal = {
    open(curentItem) {
      if(destroyed){
        return console.log('Modal is destroyed')
      }
      !closing && $modal.classList.add('open')
      options.title = curentItem
      console.log(options.title)
      $modal.querySelector('.modal-window').setAttribute('style', `width:${options.width}`)
    },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
      }, ANIMATION_SPEED)
    }
  }

  const lestener = event => {
    if(event.target.dataset.close){
      modal.close();
    }
  }
  $modal.addEventListener('click',lestener)
  return Object.assign(modal, {
    destroy(){
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', lestener)
      destroyed = true
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}
