'use client'
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import BackArrow from '../components/backArrow'; // ajustá la ruta si es necesario

const dataLine = [
  { name: 'Ene', viajes: 150 },
  { name: 'Feb', viajes: 270 },
  { name: 'Mar', viajes: 200 },
  { name: 'Abr', viajes: 400 },
];

const dataPie = [{ name: 'Completado', value: 65 }, { name: 'Restante', value: 35 }];
const COLORS = ['#22c55e', '#e5e7eb'];

const dataBar = [
  { mes: 'Ene', ganancias: 200 },
  { mes: 'Feb', ganancias: 300 },
  { mes: 'Mar', ganancias: 450 },
  { mes: 'Abr', ganancias: 600 },
];

const destinos = [
  { destino: 'Buenos Aires', porcentaje: 40 },
  { destino: 'Córdoba', porcentaje: 30 },
  { destino: 'Rosario', porcentaje: 30 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header con BackArrow */}
        <div className="flex items-center gap-2 mb-4">
          <BackArrow />
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* GRID de tarjetas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Línea - Picos de viajes */}
          <div className="bg-white p-4 rounded shadow col-span-1 lg:col-span-2">
            <h3 className="text-center text-sm text-gray-600 mb-2">picos de viajes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="viajes" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          'use client'
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import BackArrow from '../components/backArrow'; // Asegurate de ajustar la ruta si es distinta

// Gráfico de picos de viajes
const dataLine = [
  { name: 'Ene', viajes: 150 },
  { name: 'Feb', viajes: 270 },
  { name: 'Mar', viajes: 200 },
  { name: 'Abr', viajes: 400 },
];

// Gráfico circular: viajes por destino en el mes
const dataPie = [
  { name: 'Buenos Aires', value: 10 },
  { name: 'Córdoba', value: 6 },
  { name: 'Rosario', value: 4 },
];

const COLORS = ['#3b82f6', '#22c55e', '#facc15', '#ef4444', '#a855f7'];

// Barras: ganancias por mes
const dataBar = [
  { mes: 'Ene', ganancias: 200 },
  { mes: 'Feb', ganancias: 300 },
  { mes: 'Mar', ganancias: 450 },
  { mes: 'Abr', ganancias: 600 },
];

// % destinos
const destinos = [
  { destino: 'Buenos Aires', porcentaje: 40 },
  { destino: 'Córdoba', porcentaje: 30 },
  { destino: 'Rosario', porcentaje: 30 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <BackArrow />
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* GRID de tarjetas */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Línea - Picos de viajes */}
          <div className="bg-white p-4 rounded shadow col-span-1 lg:col-span-2">
            <h3 className="text-center text-sm text-gray-600 mb-2">picos de viajes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="viajes" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Circular - Viajes por mes por destino */}
          <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
            <h3 className="text-center text-sm text-gray-600 mb-2">Viajes por destino (último mes)</h3>
            <PieChart width={180} height={180}>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Barras - Ganancias por mes */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-center text-sm text-gray-600 mb-2">ganancias por mes</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dataBar}>
                <XAxis dataKey="mes" />
                <Tooltip />
                <Bar dataKey="ganancias" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ganancia total */}
          <div className="bg-gray-200 p-4 rounded shadow flex flex-col items-center justify-center">
            <h3 className="text-sm text-gray-700 mb-2">ganancias totales</h3>
            <p className="text-xl font-bold text-gray-800">100034351$</p>
          </div>

          {/* Porcentaje de destinos */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-600 mb-4">% de destinos</h3>
            {destinos.map((item, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-xs text-gray-700 mb-1">{item.destino}</p>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${item.porcentaje}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Logo */}
          <div className="bg-white p-4 rounded shadow flex items-center justify-center">
            <img
              src="/Assets/logo.png"
              alt="Logo Transportes Maurello"
              className="max-h-28 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


          {/* Barras - Ganancias por mes */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-center text-sm text-gray-600 mb-2">ganancias por mes</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dataBar}>
                <XAxis dataKey="mes" />
                <Tooltip />
                <Bar dataKey="ganancias" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ganancia total */}
          <div className="bg-gray-200 p-4 rounded shadow flex flex-col items-center justify-center">
            <h3 className="text-sm text-gray-700 mb-2">ganancias totales</h3>
            <p className="text-xl font-bold text-gray-800">100034351$</p>
          </div>

          {/* Porcentaje de destinos */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-600 mb-4">% de destinos</h3>
            {destinos.map((item, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-xs text-gray-700 mb-1">{item.destino}</p>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${item.porcentaje}%`,
                      backgroundColor: idx === 0 ? '#3b82f6' : idx === 1 ? '#22c55e' : '#f43f5e',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Logo */}
          <div className="bg-white p-4 rounded shadow flex items-center justify-center">
            <img
              src="/Assets/logo.png"
              alt="Logo Transportes Maurello"
              className="max-h-28 object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
