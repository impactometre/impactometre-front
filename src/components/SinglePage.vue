<template>
  <div id="single-page">
    <div class="single-page-body">
      <div class="single-page-text">
        <button class="close-btn" @click.prevent="hidePage">
          &#10006;
        </button>
        <div v-if="page == 'about'">
          <h2>A propos</h2>
          <br />
          <p>
            <b>L’Impactomètre</b> est un outil ayant été produit dans le cadre
            d’un projet de l’UTC encadré par Yacine Baouch. Il est le fruit d’un
            travail réalisé par plusieurs groupes d’étudiants que sont Jules
            Farjas, William Boffy, Aurélien Béranger, Clément Brizard, Valentin
            Le Gauche, Maria Idrissi, Elouan Le Bars, Matthieu Glorion et Edmond
            Giraud.
          </p>
          <p>
            Cet outil a pour vocation d’évaluer l’impact environnemental d’une
            réunion afin que l’utilisateur puisse l’optimiser au mieux, dans une
            démarche écologique. L’évaluation de cet impact est réalisée selon
            une méthode fortement inspirée de la méthode ACV (Analyse Cycle de
            Vie d’un produit). L’impact environnemental d’une réunion est en
            effet calculé comme la somme des impacts environnementaux des
            matériels utilisés, des transports réalisés et du logiciel de
            visioconférence.
          </p>
          <p>
            L’utilisateur doit renseigner ces différents critères pour que
            l’application puisse évaluer l’impact environnemental de la réunion,
            selon quatre catégories : l’impact sur la santé humaine, sur la
            qualité de l’écosystème, sur le changement climatique et sur les
            ressources. Le résultat est calculé dans une unité adaptée pour
            chacune de ces catégories et affiché en pourcentages. Il est
            normalisé sur le scénario ayant le plus d’impact, celui-ci étant à
            100%.
          </p>
          <p>
            Vous pouvez retrouver l'article sur lequel se basent les calculs
            réalisés dans le code
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/uploads/article_impact_environnemental_reunions.pdf"
              >à cette adresse.</a
            >
          </p>
          <p id="licence">
            Licence libre GNU GPL V3 -
            <a href="https://gitlab.utc.fr/tx-techno-num/impactometre"
              >Dépôt gitlab</a
            >
          </p>
        </div>

        <div v-if="page == 'howto'" class="howto">
          <h2>Utilisation</h2>
          <br />
          <div class="video">
            <iframe
              src="https://player.vimeo.com/video/436047872"
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              "
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["page"],
  methods: {
    hidePage() {
      this.$root.$emit("hide_single_page");
    },
  },
};
</script>

<style>
#single-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
}

.single-page-body {
  padding: 6%;
  color: black;
  font-size: 16px;
}
.single-page-text {
  padding: 2%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 53px -18px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
}
.single-page-text p {
  margin-bottom: 20px;
}
.single-page-text a {
  text-decoration: none;
  color: #262626;
  font-weight: bold;
}
.single-page-text a:hover {
  color: black;
}
.single-page-text .close-btn {
  top: -15px;
  left: 5px;
  margin: 5px;
}
#licence {
  color: gray;
  text-align: right;
}
/*
 * HOWTO
 */
.video {
  padding: 30% 0 0 0;
  position: relative;
}
</style>
