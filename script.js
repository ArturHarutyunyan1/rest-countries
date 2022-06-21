const switcher      = document.querySelector('#switcher')
const theme         = window.localStorage.getItem('data-theme')
const search        = document.querySelector('.input-value')
const dropBtn       = document.querySelector('.drop-btn')
const dropdownItems = document.querySelectorAll('.item')
const detailsWindow = document.querySelector('.details')
const loader        = document.querySelector('.lds-roller')

async function getCountries(){
    const res  = await fetch(`https://restcountries.com/v2/all`)
    const data = await res.json()
    displayCountries(data)
    hideLoader()
}

function displayCountries(data){
    data.forEach(country => {
        const grid     = document.querySelector('.grid')
        const item     = document.createElement('div')
        item.classList.add('grid-item')
        grid.append(item)
        item.innerHTML = 
        `
        <div class="flag">
            <img src="${country.flags.png}">
        </div>
        <div class="desc">
            <h3 class="name">${country.name}</h3>
            <p><span>Population:</span> ${country.population}</p>
            <p class="region"><span>Region:</span> ${country.region}</p>
            <p><span>Capital:</span> ${country.capital}</p>
        </div>
        `

        item.addEventListener('click', ()=>{
           detailsWindow.classList.add('active')
           countryDetails(country)
           if(detailsWindow.classList.contains('active')){
            document.body.style.overflow = 'hidden'
           }
        })
    })
}

search.addEventListener('input', (e)=>{
    showLoader()
    const {value}       = e.target
    const countryName = document.querySelectorAll('.name')
    countryName.forEach(name => {
        if(name.textContent.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.style.display = 'block'
        }else{
            name.parentElement.parentElement.style.display = 'none'
        }
    })
    hideLoader()
})

dropBtn.addEventListener('click', ()=>{
    const dropdownItems = document.querySelector('.dropdown-items')
    dropdownItems.classList.toggle('active-dropdown')
})

dropdownItems.forEach(item => {
    item.addEventListener('click', ()=>{
        const value  = item.textContent
        const region = document.querySelectorAll('.region')

        region.forEach(reg => {
            showLoader()
            if(reg.textContent.includes(value) || value === 'All'){
                reg.parentElement.parentElement.style.display = 'block'
            }else{
                reg.parentElement.parentElement.style.display = 'none'
            }
            hideLoader()
        })
    })
})

function countryDetails(country){
    showLoader()
    detailsWindow.innerHTML = 
    `
    <button class="close"><i class="fa-solid fa-arrow-left"></i> <span class="text">Back</span></button>
    <div class="row">
        <div class="row-item">
            <img src="${country.flags.svg}" id="flag">
        </div>
        <div class="row-item">
            <div class="col">
                <h1>${country.name}</h1>
                <div class="row">
                    <div class="row-item">
                        <p><span>Native Name:</span> ${country.nativeName}</p>
                        <p><span>Population:</span>  ${country.population}</p>
                        <p><span>Region:</span>      ${country.region}</p>
                        <p><span>Sub Region:</span>  ${country.subregion}</p>
                        <p><span>Capital:</span>     ${country.capital}</p>
                    </div>
                    <div class="row-item">
                        <p><span>Top Level Domain:</span> ${country.topLevelDomain}</p>
                        <p><span>Currencies:</span>       ${country.currencies.map(currency => currency.code)}</p>
                        <p><span>Languages:</span>        ${country.languages.map(languages => languages.name)}</p>
                        <p><span>Border Countries:</span> ${country.borders}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h3 class="author">Challenge by <a href="https://frontendmentor.io" target="_blank">Frontend Mentor</a> Coded by <a href="https://github.com/arturharutyunyan1" target="_blank"> Artur Harutyunyan</a></h3>
    `
    hideLoader()
    const closeButton   = document.querySelector('.close')

    closeButton.addEventListener('click', ()=>{
        detailsWindow.classList.remove('active')
        document.body.style.overflow = 'visible'
    })

}

if(theme){
    document.documentElement.setAttribute('data-theme', theme)
}

switcher.checked = theme == 'dark' ? true : false

switcher.addEventListener('change', function () {
    if(this.checked){
      document.documentElement.setAttribute('data-theme', 'dark')
      window.localStorage.setItem('data-theme', 'dark')
    } else if(!this.checked){
      document.documentElement.setAttribute('data-theme', 'light')
      window.localStorage.setItem('data-theme', 'light')
    }
});

function showLoader(){
    if(loader.classList.contains('loaded')){
        loader.classList.remove('loaded')
    }
}

function hideLoader(){
    loader.classList.add('loaded')
}


getCountries()