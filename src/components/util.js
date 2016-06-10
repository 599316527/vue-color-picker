
/**
 * drag
 *
 * @param  {function} move
 * @param  {function} end
 */
export const startDrag = function (move, end) {
  let dargMove = (evt) => {
    evt.preventDefault()
    // console.log('move', evt.which, evt.offsetLeft)
    if (evt.which) {
      move(evt)
    } else {
      dragEnd({
        preventDefault() {}
      })
    }
  }
  let dragEnd = (evt) => {
    evt.preventDefault()
    end()

    document.body.removeEventListener('mousemove', dargMove)
    document.body.removeEventListener('mouseup', dragEnd)
  }

  // console.log('start')
  document.body.addEventListener('mousemove', dargMove)
  document.body.addEventListener('mouseup', dragEnd)
}


export function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max))
}
