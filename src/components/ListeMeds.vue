<template>
  <div class="container">
    <input type="text" v-model="recherche" placeholder="Rechercher un médicament" class="search-bar" />
    <Form @ajouter="ajouterNouveauMedicament" />
    <ul class="medicaments">
      <ElementMedicament 
        v-for="produit in stockFiltré" 
        :key="produit.id" 
        :produit="produit"
        @supprimer="supprimerMedicament"
        @modifier="modifierMedicament" />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Form from "./Form.vue";
import ElementMedicament from "./ElementMedicament.vue";

const stock = ref([]);
const recherche = ref("");
const API_URL = "https://apipharmacie.pecatte.fr/api/18/medicaments";

const chargerStock = () => {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => stock.value = data)
    .catch(error => console.error("Erreur de récupération :", error));
};

const ajouterNouveauMedicament = (nom, type, quantite, image = "") => {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      denomination: nom,
      formepharmaceutique: type,
      qte: quantite,
      photo: image,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 1) {
        setTimeout(chargerStock, 1000);
      }
    })
    .catch(error => console.error("Erreur lors de l'ajout :", error));
};

const supprimerMedicament = (id) => {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(() => chargerStock())
    .catch(error => console.error("Erreur lors de la suppression :", error));
};

const modifierMedicament = (nouveauProduit) => {
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nouveauProduit),
  })
    .then(response => response.json())
    .then(() => chargerStock())
    .catch(error => console.error("Erreur lors de la mise à jour :", error));
};

const stockFiltré = computed(() =>
  stock.value.filter(m => 
    m.denomination.toLowerCase().includes(recherche.value.toLowerCase()))
);

onMounted(() => {
  chargerStock();
});
</script>

<style scoped>
.medicaments {
  padding: 0;
  margin: 20px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.search-bar {
  margin-bottom: 20px;
  padding: 10px;
  width: 60%;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>
