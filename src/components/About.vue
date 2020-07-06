<template>
  <div id="about">
    <div class="about-body">
      <div class="about-text">
      <button class="close-btn" @click.prevent="hideAbout">
        &#10006;
      </button>
      <p>
      L’impactomètre est un outil ayant été produit dans le cadre d’un projet de
      l’UTC encadré par Yacine Baouch. Il est le fruit d’un travail réalisé par
      plusieurs groupes d’étudiants que sont Jules Farjas, William Boffy,
      Aurélien Béranger, Clément Brizard, Valentin Le Gauche, Maria Idrissi,
      Elouan Le Bars, Matthieu Glorion et Edmond Giraud.
      </p>
      <p>
       Cet outil a pour
      vocation d’évaluer l’impact environnemental d’une réunion afin que
      l’utilisateur puisse optimiser au mieux sa réunion dans une démarche
      écologique. Cette évaluation est réalisée selon une méthode très inspirée
      de la méthode ACV (Analyse Cycle de Vie d’un produit).
    </p>
      <p>
      En effet ici
      l’impact environnemental d’une réunion est calculé comme étant la somme
      des impacts environnementaux dues aux matériels utilisés, transports
      engendrés et le logiciel de visioconférence. L’utilisateur doit donc juste
      renseigner les informations de ces différents critères pour que
      l’Impactomètre puisse évaluer l’impact environnemental de la réunion selon
      4 catégories : l’impact sur la santé humaine, l’impact sur la qualité de
      l’écosystème, l’impact sur le changement climatique et l’impact sur les
      ressources.
    </p>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideAbout: () => {
      document.getElementById("about").style.display = "none";
    },
  },
};
</script>

<style>
#about {
  position: absolute;
  display: none;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  background-color: rgba(255, 255, 255, 0.6);
}

.about-body {
  position: absolute;
  padding: 8%;
  color: black;
  font-size: 120%;
}
.about-text {
  padding: 4% 2% 2% 2%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 53px -18px rgba(0,0,0,0.75);
  border-radius: 8px;
}
.about-text p {
  margin-bottom: 20px;
}
.about-text .close-btn {
  top: -35px;
  left: 5px;
  margin: 5px;
}
</style>
