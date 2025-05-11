import axios from 'axios';

const API_KEY = 'OUQLSSEOX5US2OZK';
const API_URL = 'https://www.alphavantage.co/query';

async function testStockData(symbol: string) {
  try {
    console.log(`Obteniendo datos para ${symbol}...`);
    
    // Obtener cotización global
    const quoteResponse = await axios.get(API_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: API_KEY
      }
    });

    const quote = quoteResponse.data['Global Quote'];
    if (!quote) {
      throw new Error(`No se encontraron datos para ${symbol}`);
    }

    console.log('\nDatos de cotización:');
    console.log('Símbolo:', quote['01. symbol']);
    console.log('Precio:', quote['05. price']);
    console.log('Cambio:', quote['09. change']);
    console.log('Cambio %:', quote['10. change percent']);
    
    // Buscar acciones relacionadas
    const searchResponse = await axios.get(API_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: symbol,
        apikey: API_KEY
      }
    });

    const bestMatches = searchResponse.data['bestMatches'] || [];
    console.log('\nResultados de búsqueda:');
    bestMatches.forEach((match: any, index: number) => {
      console.log(`\nResultado ${index + 1}:`);
      console.log('Símbolo:', match['1. symbol']);
      console.log('Nombre:', match['2. name']);
      console.log('Tipo:', match['3. type']);
      console.log('Región:', match['4. region']);
    });

    console.log('\n¡Prueba completada exitosamente!');
    return {
      quote,
      searchResults: bestMatches
    };
  } catch (error) {
    console.error('Error en la prueba:', error);
    throw error;
  }
}

// Ejecutar la prueba con KO (Coca-Cola)
(async () => {
  try {
    console.log('Iniciando prueba de Alpha Vantage...');
    await testStockData('KO');
  } catch (error) {
    console.error('Prueba fallida:', error);
  }
})();
