<script setup>
import ListeMeds from "./components/ListeMeds.vue";
</script>

<template>
  <v-app>
    <header class="header">
      <img src="/src/assets/cathedrale.jpg" alt="Cathédrale de Béziers" class="header-image" />
      <h1 class="titre-principal">La Pharmacie des Allées Paul Riquet</h1>
      <h2 class="titre-secondaire">Gestion de la pharmacie</h2>
    </header>

    
    <div class="background-section">
      <v-container>
        <ListeMeds />
      </v-container>
    </div>
  </v-app>
</template>

<style scoped>
body {
  background-color: #287e4d;
}

.header {
  text-align: center;
  padding: 20px;
  background-color: #287e4d;
}

.header-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.titre-principal {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
}

.titre-secondaire {
  font-size: 1.5rem;
  color: #ffffff;
}


.background-section {
  background-image: url("/src/assets/pharmacie.jpg"); 
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; 
  min-height: 500px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #287e4d; 
}

</style>
