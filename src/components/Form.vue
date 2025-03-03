<template>
  <form @submit.prevent="envoyerMedicament" class="form-container">
    <h2>Ajouter un médicament</h2>
    
    <input v-model="nom" placeholder="Nom du médicament" required class="input-field" />
    <input v-model="type" placeholder="Type pharmaceutique" required class="input-field" />
    <input v-model.number="quantite" type="number" placeholder="Quantité" required class="input-field" />
    
    <label class="file-label">
      Ajouter une image :
      <input type="file" @change="convertirImage" accept="image/*" class="file-input" />
    </label>
    
    <button type="submit" class="submit-button">Ajouter</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const nom = ref("");
const type = ref("");
const quantite = ref(0);
const imageBase64 = ref(null);

const emit = defineEmits(["ajouter"]);

const convertirImage = (event) => {
  const fichier = event.target.files[0];
  if (fichier) {
    const lecteur = new FileReader();
    lecteur.onload = () => {
      imageBase64.value = lecteur.result.split(",")[1];
    };
    lecteur.readAsDataURL(fichier);
  }
};

const envoyerMedicament = () => {
  emit("ajouter", nom.value, type.value, quantite.value, imageBase64.value);
  nom.value = "";
  type.value = "";
  quantite.value = 1;
  imageBase64.value = null;
};
</script>

<style scoped>
.form-container {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 15px;
  font-size: 1.4rem;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.file-label {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}

.file-input {
  display: block;
  margin-top: 5px;
  width: 100%;
}

.submit-button {
  padding: 10px;
  width: 100%;
  background-color: #35914c; 
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
