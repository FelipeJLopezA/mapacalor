import dotenv from 'dotenv';

dotenv.config();

const apiToken = process.env.API_TOKEN;
const docId = process.env.DOC_ID;
const tableId = process.env.TABLE_ID;

const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows`;

console.log('URL:', url);
const empresas = 'c-ZWvLDnCt6e'
const reclamos = 'c-l6uWaJebm7'
const fecha = 'c-WCNvtCodyh'

const columnas = [empresas, reclamos, fecha];

async function fetchData() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos completos recibidos:', data);

        const filteredData = data.items.map(row => {
            const filteredRow = {};
            columnas.forEach(columnId => {
                if (row.values.hasOwnProperty(columnId)) {
                    filteredRow[columnId] = row.values[columnId];
                }
            });
            return filteredRow;
        });

        console.log('Datos filtrados:', filteredData);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

fetchData();
