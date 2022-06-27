
const switcher        = document.querySelector('#switcher')
const theme           = window.localStorage.getItem('data-theme')
const search          = document.querySelector('.searchValue')
const dropBtn         = document.querySelector('.dropBtn')
const dropdownItems   = document.querySelectorAll('.item')
const detailWindow    = document.querySelector('.details')
const loader          = document.querySelector('.lds-roller')
const dropdownContent = document.querySelector('.dropdown-items')

async function getCountries(){
    try {
        const res  = await fetch(`https://restcountries.com/v2/all`)
        const data = await res.json()
        displayCountries(data)
        hideLoader()
    } catch (error) {
        console.error(error);
    }
}

function displayCountries(data){
    data.forEach(result => {
        const grid     = document.querySelector('.grid')
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        grid.append(gridItem)
        gridItem.innerHTML = 
        `
        <div class="flag">
            <img src="${result.flags.png}" alt="${result.name}">
        </div>
        <div class="desc">

        <h3 class="name">${result.name}</h3>
            <p><span>Population: </span>${result.population}</p>
            <p class="region"><span>Region: </span>${result.region}</p>
            <p><span>Capital: </span>${result.capital}</p>
        </div>
        `
        gridItem.addEventListener('click', ()=>{
            detailWindow.classList.add('active')
            showDetails(result)
            if(detailWindow.classList.contains('active')){
             document.body.style.overflow = 'hidden'
            }
        })
    })
}

function showDetails(result){
    detailWindow.innerHTML = 
    `
    <div class="content">
    <button class="close"><i class="fa-solid fa-arrow-left"></i> <span class="text">Back</span></button>
        <div class="row">
            <div class="row-item">
                <img src="${result.flags.png}" id="flag" alt="${result.name}">
            </div>
            <div class="row-item">
                <div class="col">
                <h1>${result.name}</h1>
                    <div class="row">
                        <div class="row-item">
                            <p><span>Native Name: </span>${result.nativeName}</p>
                            <p><span>Population: </span>${result.population}</p>
                            <p><span>Region: </span>${result.region}</p>
                            <p><span>Sub Region: </span>${result.subRegion}</p>
                            <p><span>Capital: </span>${result.capital}</p>
                        </div>
                        <div class="row-item">
                            <p><span>Top Level Domain: </span>${result.topLevelDomain}</p>
                            <p><span>Currencies:</span>       ${result.currencies.map(currency => currency.code)}</p>
                            <p><span>Languages:</span>        ${result.languages.map(languages => languages.name)}</p>
                            <p><span>Border Countries:</span> ${result.borders}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    const closeBtn = document.querySelector('.close')

    closeBtn.addEventListener('click', ()=>{
        if(detailWindow.classList.contains('active')){
            detailWindow.classList.remove('active')
            document.body.style.overflow = 'visible'
        }
    })
}

search.addEventListener('input', (e)=>{
    const {value} = e.target
    const countryName    = document.querySelectorAll('.name')

    countryName.forEach(name=>{
        if(name.textContent.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.style.display = 'block'
        }else{
            name.parentElement.parentElement.style.display = 'none'
        }
    })
})

dropBtn.addEventListener('click', ()=>{
    dropdownContent.classList.toggle('active-dropdown')
})

dropdownItems.forEach(item => {
    item.addEventListener('click', ()=>{
        const value  = item.textContent
        const region = document.querySelectorAll('.region')

        region.forEach(reg => {
            if(reg.textContent.includes(value) || value === 'All'){
                reg.parentElement.parentElement.style.display = 'block'
            }else{
                reg.parentElement.parentElement.style.display = 'none'
            }
            dropdownContent.classList.remove('active-dropdown')
        })
    })
})

if(theme){
    document.documentElement.setAttribute('data-theme', theme)
}

switcher.checked = theme == 'dark' ? true : false

switcher.addEventListener('change', function(){
    if(this.checked){
        window.localStorage.setItem('data-theme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
    }else if(!this.checked){
        window.localStorage.setItem('data-theme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

function hideLoader(){
    loader.classList.add('loaded')
}


getCountries()