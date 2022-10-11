var url = 'https://pokeapi.co/api/v2/pokemon/';

//Funcion para cargar las imagenes al inicio
function loadImagesInit(){
  let $imagenes = document.querySelectorAll("img.lazy-loading");
  if($imagenes.length===20){
    for (const element of $imagenes) {
      element.src = element.dataset.src;
    }
  }
  
}

function loadLazyLoading() {
  
  let options = {
    root: document.querySelector('#contenido'),
    rootMargin: '10px',
    threshold: 0
  }
  let $imagenes = document.querySelectorAll('img.lazy-loading')

  if ('undefined' !== typeof IntersectionObserver) {
    let observador = new IntersectionObserver(function (entradas) {

      entradas.forEach((element) => {
         if (element.intersectionRatio > 0) {
          element.target.src = element.target.dataset.src
          element.target.dataset.src = ''
          observador.unobserve(element.target)
        }
      })},options)
    for (const element of $imagenes) {
      if (element.dataset.src != '')
        observador.observe(element)
    }
  } else {
    //En caso de que no exista la API
    for (const element of $imagenes) {
      element.src = element.dataset.src
    }
  }
}


 let elm =document.querySelector('.contenido');
 const spinner = document.getElementById('spinner');
 let flag=true;
addEventListener('scroll', function(){
    if ((window.innerHeight + window.scrollY) >= elm.offsetHeight){
      if(flag){
        flag=false;
        spinner.style.display = 'block'
        setTimeout(() => {
          spinner.style.display = 'none';
          ArregloPokemones()
        }, 3000);
        this.setTimeout(() =>{
          loadLazyLoading();
        })
      }
    }else{
      flag=true;
    }
});

async function getPokemones() {
  return axios.get(url)
}

async function getPokemonDetails(url) {
  return axios.get(url)
}

function ArregloPokemones() {
  getPokemones().then((resp) => {
    url = resp.data.next;
    let _arrayPromesas = resp.data.results.map((element) => getPokemonDetails(element.url))
    Promise.all(_arrayPromesas).then((response) => cargarData(response)).then(loadImagesInit)
  })
}


async function cargarData(pokemones) {
  for (let index1 = 0; index1 < pokemones.length; index1++){
    var getParentElement = document.getElementById('pokemones')

    const createPokeCard = document.createElement('div')
    createPokeCard.classList.add('card', 'col-md-3', 'p-2')

    const imgPokeCard = document.createElement('img');
    imgPokeCard.classList.add('lazy-loading')
    imgPokeCard.setAttribute("data-src",pokemones[index1].data.sprites.other['official-artwork'].front_default)
    imgPokeCard.addEventListener('click', function (e) {
      modal.open(pokemones[index1].data)
    })
    createPokeCard.appendChild(imgPokeCard)

    const bodyPokeCard = document.createElement('div')
    bodyPokeCard.classList.add('card-body')
    createPokeCard.appendChild(bodyPokeCard)

    const numIdPokeCard = document.createElement('h5')
    numIdPokeCard.classList.add('card-title')
    numIdPokeCard.textContent = `n.° ${pokemones[index1].data.id}`;
    bodyPokeCard.appendChild(numIdPokeCard)

    const namePokeCard = document.createElement('h4')
    namePokeCard.classList.add('card-title')
    namePokeCard.textContent = capitalizarPrimeraLetra(pokemones[index1].data.name);
    bodyPokeCard.appendChild(namePokeCard)

    for (let index2 = 0; index2 < pokemones[index1].data.types.length; index2++) {
      let typePokeCard = document.createElement('p')
      let type = pokemones[index1].data.types[index2].type['name']
      typePokeCard.classList.add('badge', 'm-1', type)
      typePokeCard.textContent = pokemones[index1].data.types[index2].type['name'];
      bodyPokeCard.appendChild(typePokeCard)
    }
    getParentElement.appendChild(createPokeCard)
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}

ArregloPokemones( );