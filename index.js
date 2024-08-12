const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'api', 'datos.json');

// Función para recargar datos desde el archivo JSON
function loadVehiclesData(callback) {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const vehicles = JSON.parse(data);
      callback(null, vehicles);
    }
  });
}

// Endpoint para obtener todos los vehículos
app.get('/vehicles', (req, res) => {
  loadVehiclesData((err, vehicles) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo' });
    }
    res.json(vehicles);
  });
});

// Endpoint para buscar vehículos por patente
app.get('/vehicles/search', (req, res) => {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: 'Patente es requerida' });
  }

  loadVehiclesData((err, vehicles) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo' });
    }
    const vehicle = vehicles.find(v => v.plate === plate);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  });
});

// Endpoint para buscar vehículos por VIN
app.get('/vehicles/search/vin', (req, res) => {
  const { vin } = req.query;

  if (!vin) {
    return res.status(400).json({ error: 'VIN es requerido' });
  }

  loadVehiclesData((err, vehicles) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo' });
    }
    const vehicle = vehicles.find(v => v.vin === vin);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  });
});

// Endpoint para agregar un nuevo vehículo
app.post('/vehicles', (req, res) => {
  const newVehicle = req.body;

  loadVehiclesData((err, vehicles) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo' });
    }

    vehicles.push(newVehicle);

    fs.writeFile(dataFilePath, JSON.stringify(vehicles, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error escribiendo en el archivo' });
      }

      res.status(201).json({ message: 'Vehículo agregado con éxito', vehicle: newVehicle });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
