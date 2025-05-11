import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config/api';

const TestApi: React.FC = () => {
  const [symbol, setSymbol] = useState('KO');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: API_CONFIG.alphaVantage.apiKey
          }
        });
        setData(response.data);
      } catch (err) {
        setError('Error al obtener datos de la API');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Prueba de API Alpha Vantage</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Ingresa símbolo (ej: KO)"
          className="w-full p-2 border rounded"
        />
      </div>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Datos obtenidos:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestApi;
