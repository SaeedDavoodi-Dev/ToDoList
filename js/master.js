const btn = document.querySelector('._btn')
const inp = document.getElementById('inp')
const task = document.querySelector('.task')
const done = document.querySelector('.done')
const _clear = document.querySelector('._clear')
const _yellow = document.querySelector('._yellow')
const _green = document.querySelector('._green')
const foot = document.querySelector('.footer')
const git = document.querySelector('.git')
let flag = true


let arr = []
let x = JSON.parse(localStorage.getItem('data'))
if (x != undefined) {
    arr = [...x]
    arr.forEach((item) => genLi(item))
}

btn.addEventListener('click', () => {
    let temp = inp.value
    if (inp.value == '') {
        alert('Please Write a Task...')
    } else {
        genLi(temp)
        inp.value = null
        inp.focus()
        arr.push(temp)
        localStorage.setItem('data', JSON.stringify(arr))
    }
})

function isDarkMode() {
    return flag == false
}

function genLi(temp) {
    let _li = document.createElement('li')
    _li.innerHTML = `
    <h3 style= width:'75%'>${temp}</h3>
    <div width:'25%'>
    <i onclick= "_Del(this)" class="_i ri-delete-bin-fill"></i>
    <i onclick= "_Edit(this)" class="_i ri-pencil-fill"></i>
    <input onclick= '_goToDone(this)' type="checkbox" id="tik">
    </div>
    <input type="text" id='inpEdit'>
    <button onclick="_save(this)" id='btnEdit'>save</button>
    `
    if (isDarkMode()) {
        _li.classList.add('darkLi')
    }
    task.appendChild(_li)
}

function _Del(s) {
    (confirm("Are you sure you want to delete this item?")) && (s.parentElement.parentElement.style.display = 'none')
}

function _Edit(s) {
    let txt = s.parentElement.parentElement.children[0].innerText
    s.parentElement.parentElement.children[0].style.display = 'none'
    s.parentElement.style.display = 'none'
    s.parentElement.parentElement.children[2].style.display = 'flex'
    s.parentElement.parentElement.children[2].value = txt
    s.parentElement.parentElement.children[2].focus()
    s.parentElement.parentElement.children[3].style.display = 'flex'
}

function _save(s) {
    let txt = s.previousElementSibling.value
    s.style.display = 'none'
    s.previousElementSibling.style.display = 'none'
    s.previousElementSibling.previousElementSibling.style.display = 'block'
    s.parentElement.children[0].style.display = 'block'
    s.parentElement.children[0].innerText = txt
}

function _goToDone(s) {
    let txt = s.parentElement.parentElement.children[0].innerText
    s.parentElement.parentElement.style.display = 'none'
    let _li = document.createElement('li')
    _li.innerHTML = `
    <h3 style= width:'75%';text-decoration:line-through;>${txt}</h3>
    <div width:'25%';>
    <i onclick= "_Del(this)" class="_i ri-delete-bin-fill"></i>
    <i onclick= '_redo(this)' class="_i ri-arrow-go-back-line"></i>
    </div>
    `
    if (isDarkMode()) {
        _li.classList.add('darkLiDone')
    }
    done.appendChild(_li)
    _li.style.background = '#b7ffb7'
}

function _redo(s) {
    let txt = s.parentElement.previousElementSibling.innerText
    s.parentElement.parentElement.style.display = 'none'
    genLi(txt)
}

_clear.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
        localStorage.clear()
        location.reload()
    }
})


function _dark(s) {

    const liTask = Array.from(document.querySelectorAll('.task>li'))
    const liDone = Array.from(document.querySelectorAll('.done>li'))

    if (flag == true) {
        s.children[0].style.display = 'none'
        s.children[1].style.display = 'flex'
        s.style.background = '#5768ff'
        s.previousElementSibling.classList.add('darkLight')
        s.parentElement.parentElement.classList.add('dark')
        _green.classList.add('dark')
        _yellow.classList.add('dark')
        s.parentElement.nextElementSibling.style.background = '#b1b1b1'
        liTask.forEach((val) => {
            val.classList.add('darkLi')
        })
        liDone.forEach((item) => {
            item.classList.add('darkLiDone')
        })
        foot.classList.add('darkLight')
        git.style.color = '#e7e7e7'
    } else {
        s.children[0].style.display = 'flex'
        s.children[1].style.display = 'none'
        s.style.background = '#aaddff'
        s.previousElementSibling.classList.remove('darkLight')
        s.parentElement.parentElement.classList.remove('dark')
        _green.classList.remove('dark')
        _yellow.classList.remove('dark')
        s.parentElement.nextElementSibling.style.background = 'white'
        liTask.forEach((val) => {
            val.classList.remove('darkLi')
        })
        liDone.forEach((item) => {
            item.classList.remove('darkLiDone')
        })
        foot.classList.remove('darkLight')
        git.style.color = '#4c4c4d'
    }
    flag = !flag
}




