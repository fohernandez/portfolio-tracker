import axios from 'axios';

async function testFmpApi(symbol: string) {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}`, {
      params: {
        apikey: 'demo'
      }
    });

    const quote = response.data[0];
    if (!quote) {
      throw new Error(`No data found for symbol ${symbol}`);
    }

    console.log('Datos obtenidos para:', symbol);
    console.log('Nombre:', quote.name);
    console.log('Precio:', quote.price);
    console.log('Cambio:', quote.change);
    console.log('Cambio %:', quote.changesPercentage);
    console.log('Moneda:', 'USD');
    
    return {
      symbol: quote.symbol,
      name: quote.name,
      price: quote.price,
      change: quote.change,
      changePercent: quote.changesPercentage
    };
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

// Ejecutar la prueba
(async () => {
  try {
    console.log('Iniciando prueba de conexión con Financial Modeling Prep...');
    const result = await testFmpApi('KO');
    console.log('Prueba completada exitosamente!');
    console.log('Resultado:', result);
  } catch (error) {
    console.error('Prueba fallida:', error);
  }
})();
