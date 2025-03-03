<template>
  <li class="medicament-item">
    <p><strong>Médicament:</strong> {{ produit.denomination }}</p>
    <p><strong>Type:</strong> {{ produit.formepharmaceutique }}</p>
    <p><strong>Quantité:</strong> {{ produit.qte }}</p>

  
    <div v-if="produit.photo">
      <img :src="getImageUrl(produit.photo)" alt="Image du médicament" class="medicament-photo" />
    </div>

    <div class="button-group">
      <button @click="$emit('supprimer', produit.id)">Supprimer</button>
      <button @click="edition = true">Modifier</button>
    </div>

    <div v-if="edition" class="edit-form">
      <input v-model="nouveauNom" placeholder="Nom" />
      <input v-model="nouveauType" placeholder="Type" />
      <input v-model.number="nouvelleQuantite" type="number" />
      
      
      <label class="file-label">
        Modifier l'image :
        <input type="file" @change="convertirImage" accept="image/*" class="file-input" />
      </label>

      <button @click="validerModifications">Valider</button>
      <button @click="edition = false">Annuler</button>
    </div>
  </li>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["produit"]);
const emit = defineEmits(["supprimer", "modifier"]);

const edition = ref(false);
const nouveauNom = ref(props.produit.denomination);
const nouveauType = ref(props.produit.formepharmaceutique);
const nouvelleQuantite = ref(props.produit.qte);
const nouvellePhoto = ref(null);
const hasNewPhoto = ref(false);


const getImageUrl = (photo) => {
  return photo ? `https://apipharmacie.pecatte.fr/images/${photo}` : "";
};

//Convertir l’image en Base64 avant l’envoi
const convertirImage = (event) => {
  const fichier = event.target.files[0];
  if (fichier) {
    const lecteur = new FileReader();
    lecteur.onload = () => {
      nouvellePhoto.value = lecteur.result.split(",")[1];
      hasNewPhoto.value = true;
    };
    lecteur.readAsDataURL(fichier);
  }
};

const validerModifications = () => {
  emit("modifier", {
    id: props.produit.id,
    denomination: nouveauNom.value,
    formepharmaceutique: nouveauType.value,
    qte: nouvelleQuantite.value,
    photo: hasNewPhoto.value ? nouvellePhoto.value : null, 
  });
  edition.value = false;
  hasNewPhoto.value = false;
};
</script>

<style scoped>
.medicament-item {
  list-style: none;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

p {
  margin: 5px 0;
  font-size: 1rem;
  color: #333;
}

.medicament-photo {
  max-width: 170px;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
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

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 12px;
  background-color: #35914c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}
</style>
