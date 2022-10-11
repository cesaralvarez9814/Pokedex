var url = 'https://pokeapi.co/api/v2/pokemon/';

async function getPokemones() {
    try {
      console.log(url);
      let response = await axios.get(url);
      url = response.data.next
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  
  async function getPokemonDetails(url) {
    try {
      let response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  