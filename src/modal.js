'use strict'

const modal = (function () {
  let modal = document.getElementById('myModal')
  modal.innerHTML = `
  <div class="modal-content pb-3">
      <div class="card-body m-2">
          <div class="text-end">
              <button class="btn btn-lg btn-link" aria-label="close modal" data-close>✕</button>
          </div>
          <div class="row">
              <div class="col-lg-3 img-detalle">
              <img id="imgPokemonDetalle" alt="" />
              </div>
              <div class="col">
                  <table class="table table-responsive table-borderless my-3">
                      <tbody>
                          <tr>
                              <th class="">Nombre :</th>
                              <td id="datellePokemonNombre" class=""></td>
                          </tr>
                          <tr>
                              <th class="">Id :</th>
                              <td id="datellePokemonId" class=""></td>
                          </tr>
                          <tr>
                              <th scope="row" class="">Tipo :</th>
                              <td id="datellePokemonTipo" class=""></td>
                          </tr>
                          <tr>
                              <th scope="row" class="">Habilidades :</th>
                              <td id="datellePokemonHabilidades" class=""></td>
                          </tr>
                          <tr>
                              <th class="">Peso :</th>
                              <td id="datellePokemonPeso" class=""></td>
                          </tr>
                          <tr>
                              <th scope="row" class="">Altura :</th>
                              <td id="datellePokemonAltura" class=""></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
  `;
  document.addEventListener('keyup', (e) => e.key == 'Escape' ? close() : null)
  document.querySelectorAll('button.btn-link')[0].onclick = () => close()


  function consultarPropiedad(_data, _propiedad) {
    let _aPromesas = _data.map((element) => axios.get(element[_propiedad].url))
    return new Promise((resolve) => {
        Promise.all(_aPromesas).then((r) => {
        let respuesta = r
            .map((e) => e.data.names.filter((elem) => elem.language.name == 'es'))
            .map((e) => e[0].name)
            .join(', ')
        resolve(respuesta)
        })
    })
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function cargarDatos(dataPokemon) {
    document.getElementById('imgPokemonDetalle').src = dataPokemon.sprites.other['official-artwork'].front_default
    document.getElementById('datellePokemonNombre').textContent = capitalizarPrimeraLetra(dataPokemon.name)
    document.getElementById('datellePokemonId').textContent = `${dataPokemon.id}`
    document.getElementById('datellePokemonPeso').textContent = `${dataPokemon.weight} kg`
    document.getElementById('datellePokemonAltura').textContent = `${dataPokemon.height} ft`
    const aPromesas = [
      consultarPropiedad(dataPokemon.abilities, 'ability'),
      consultarPropiedad(dataPokemon.types, 'type')
    ]
    Promise.all(aPromesas).then((r) => {
      document.getElementById('datellePokemonHabilidades').textContent = r[0]
      document.getElementById('datellePokemonTipo').textContent = r[1]
    })
    modal.style.display = 'block'
  }

  function open(_data) {
    cargarDatos(_data)
  }

  function close() {
    modal.style.display = 'none'
  }

  return {
    open,
    close,
  }
})()
