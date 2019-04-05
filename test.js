const middle = document.getElementsByClassName('middle')[0]
const left = document.getElementsByClassName('left')[0]
const right = document.getElementsByClassName('right')[0]
window.addEventListener('keydown', (e) => {
    if(e.keyCode === 37){
        console.log('left')
        middle.className += " s"
        left.className += " d"
        right.className = "t right"
    } else if (e.keyCode === 39){
        console.log('right')
        right.className += " p"
        middle.className += " s"
        left.className = "t left" 
    }
})