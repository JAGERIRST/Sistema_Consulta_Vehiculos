<template>
  <div class="container">
    <h1 class="title">Buscar Vehículo</h1>
    <div class="search-container">
      <input v-model="plate" placeholder="Ingrese la patente" class="input" />
      <button @click="searchVehicle" class="button is-primary">Buscar por Patente</button>
      <input v-model="vin" placeholder="Ingrese el VIN" class="input" />
      <button @click="searchVehicleByVin" class="button is-info">Buscar por VIN</button>
      <button @click="fetchAllVehicles" class="button is-link">Mostrar todos</button>
    </div> 
 
    <div v-if="vehicle" class="vehicle-details">
      <h2>Detalles del Vehículo</h2>
      <div class="vehicle-info">
        <p><strong>Marca:</strong> {{ vehicle.brand_name }}</p>
        <p><strong>Modelo:</strong> {{ vehicle.model }}</p>
        <p><strong>Versión:</strong> {{ vehicle.version }}</p>
        <p><strong>Patente:</strong> {{ vehicle.plate }}</p>
        <p><strong>Vin:</strong> {{ vehicle.vin }}</p>
        <p><strong>Número Motor:</strong> {{ vehicle.motor_number }}</p>
        <p><strong>Desplazamiento:</strong> {{ vehicle.displacement }}</p>
        <p><strong>Año:</strong> {{ vehicle.year }}</p>
        <p><strong>País:</strong> {{ vehicle.country }}</p>
      </div>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>

    <h1 class="title">Agregar Vehículo</h1>
    <div class="form-container">
      <input v-model="newVehicle.plate" placeholder="Patente" class="input" />
      <input v-model="newVehicle.country" placeholder="País" class="input" />
      <input v-model="newVehicle.model" placeholder="Modelo" class="input" />
      <input v-model="newVehicle.version" placeholder="Versión" class="input" />
      <input v-model="newVehicle.displacement" placeholder="Desplazamiento" class="input" />
      <input v-model="newVehicle.year" type="number" placeholder="Año" class="input" />
      <input v-model="newVehicle.vin" placeholder="VIN" class="input" />
      <input v-model="newVehicle.motor_number" placeholder="Número de motor" class="input" />
      <input v-model="newVehicle.brand_name" placeholder="Marca" class="input" />
      <button @click="addVehicle" class="button is-primary">Agregar</button>
    </div>

    <div v-if="vehicles.length" class="all-vehicles">
      <h2>Todos los Vehículos</h2>
      <ul>
        <li v-for="veh in vehicles" :key="veh.plate" class="vehicle-item">
          <div class="vehicle-info">
            <p><strong>Patente:</strong> {{ veh.plate }}</p>
            <p><strong>Marca:</strong> {{ veh.brand_name }}</p>
            <p><strong>Modelo:</strong> {{ veh.model }}</p>
            <p><strong>Versión:</strong> {{ veh.version }}</p>
            <p><strong>Desplazamiento:</strong> {{ veh.displacement }}</p>
            <p><strong>Vin:</strong> {{ veh.vin }}</p>
            <p><strong>Número Motor:</strong> {{ veh.motor_number }}</p>
            <p><strong>Año:</strong> {{ veh.year }}</p>
            <p><strong>País:</strong> {{ veh.country }}</p>
          </div>
          <hr/>
        </li>
      </ul>
    </div>

    <div v-if="error" class="error-message">
      <p>Error: {{ error }}</p>
    </div>
  </div>



</template>

<script>
import axios from 'axios';
import '@/assets/apparence.css';

export default {
  data() {
    return {
      plate: '',
      vin: '',  
      vehicle: null,
      vehicles: [],
      error: null,
      message: null,
      newVehicle: {
        plate: '',
        country: '',
        model: '',
        version: '',
        displacement: '',
        year: null,
        vin: '',
        motor_number: '',
        brand_name: ''
      }
    };
  },
  
  methods: {
    searchVehicle() {
      axios.get('/api/vehicles/search', {
        params: { plate: this.plate }
      })
      .then(response => {
        this.vehicle = response.data;
        this.error = null;
      })
      .catch(error => {
        this.vehicle = null;
        this.error = error.response && error.response.status === 404 ? 'Vehículo con esa Patente no encontrado' : 'Error sin datos de patente ingresados';
      });
    },
    searchVehicleByVin() {
      axios.get('/api/vehicles/search/vin', {
        params: { vin: this.vin }
      })
      .then(response => {
        this.vehicle = response.data;
        this.error = null;
      })
      .catch(error => {
        this.vehicle = null;
        this.error = error.response && error.response.status === 404 ? 'Vehículo con ese VIN no encontrado' : 'Error sin datos de VIN ingresados';
      });
    },
    fetchAllVehicles() {
      axios.get('/api/vehicles')
        .then(response => {
          this.vehicles = response.data;
          this.error = null;
        })
        .catch(error => {
          this.vehicles = [];
          this.error = error.response ? error.response.data.error : 'Error desconocido';
        });
    },
    resetForm() {
      this.newVehicle = {
        plate: '',
        country: '',
        model: '',
        version: '',
        displacement: '',
        year: null,
        vin: '',
        motor_number: '',
        brand_name: ''
      };
    },
    addVehicle() {
      const vehicleData = {
        plate: this.newVehicle.plate.trim(),
        country: this.newVehicle.country.trim(),
        model: this.newVehicle.model.trim(),
        version: this.newVehicle.version.trim(),
        displacement: this.newVehicle.displacement.trim(),
        year: this.newVehicle.year,
        vin: this.newVehicle.vin.trim(),
        motor_number: this.newVehicle.motor_number.trim(),
        brand_name: this.newVehicle.brand_name.trim()
      };

      // Validaciones
      const errors = [];

      if (!vehicleData.plate || !vehicleData.country || !vehicleData.model || !vehicleData.version || !vehicleData.displacement || !vehicleData.year || !vehicleData.vin || !vehicleData.motor_number || !vehicleData.brand_name) {
        errors.push("Todos los campos son obligatorios.");
      }

      if (vehicleData.plate.length > 6) {
        errors.push("La patente no puede tener más de 6 caracteres.");
      }

      ['country', 'model', 'version', 'displacement', 'vin', 'motor_number', 'brand_name'].forEach(field => {
        if (vehicleData[field].length > 20) {
          errors.push(`El campo ${field} no puede tener más de 20 caracteres.`);
        }
      });

      if (errors.length > 0) {
        this.error = errors.join(" ");
        return;
      }

      axios.post('http://localhost:8080/api/vehicles', vehicleData)
        .then(response => {
          this.message = response.data.message;
          this.error = '';
          this.resetForm();
        })
        .catch(error => {
          this.message = '';
          this.error = error.response ? error.response.data.error : 'Error desconocido';
        });
    }
  }
};
</script>
