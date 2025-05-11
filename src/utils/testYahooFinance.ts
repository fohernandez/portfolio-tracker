import axios from 'axios';

async function testYahooFinance(symbol: string) {
  try {
    const response = await axios.get('https://query1.finance.yahoo.com/v7/finance/quote', {
      params: {
        symbols: symbol,
        fields: 'symbol,shortName,longName,regularMarketPrice,regularMarketChange,regularMarketChangePercent,currency'
      }
    });

    const quote = response.data.quoteResponse.result[0];
    if (!quote) {
      throw new Error(`No data found for symbol ${symbol}`);
    }

    console.log('Datos obtenidos para:', symbol);
    console.log('Nombre:', quote.shortName || quote.longName || symbol);
    console.log('Precio:', quote.regularMarketPrice);
    console.log('Cambio:', quote.regularMarketChange);
    console.log('Cambio %:', quote.regularMarketChangePercent);
    console.log('Moneda:', quote.currency);
    
    return {
      symbol: quote.symbol,
      name: quote.shortName || quote.longName || symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      currency: quote.currency
    };
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

// Ejecutar la prueba
(async () => {
  try {
    console.log('Iniciando prueba de conexión con Yahoo Finance...');
    const result = await testYahooFinance('KO');
    console.log('Prueba completada exitosamente!');
  } catch (error) {
    console.error('Prueba fallida:', error);
  }
})();
