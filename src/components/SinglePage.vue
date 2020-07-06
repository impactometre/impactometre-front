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
            L’impactomètre est un outil ayant été produit dans le cadre d’un
            projet de l’UTC encadré par Yacine Baouch. Il est le fruit d’un
            travail réalisé par plusieurs groupes d’étudiants que sont Jules
            Farjas, William Boffy, Aurélien Béranger, Clément Brizard, Valentin
            Le Gauche, Maria Idrissi, Elouan Le Bars, Matthieu Glorion et Edmond
            Giraud.
          </p>
          <p>
            Cet outil a pour vocation d’évaluer l’impact environnemental d’une
            réunion afin que l’utilisateur puisse optimiser au mieux sa réunion
            dans une démarche écologique. Cette évaluation est réalisée selon
            une méthode inspirée de la méthode ACV (Analyse Cycle de Vie d’un
            produit).
          </p>
          <p>
            L’impact environnemental d’une réunion est calculé comme étant la
            somme des impacts environnementaux dues aux matériels utilisés,
            transports engendrés et le logiciel de visioconférence.
            L’utilisateur doit donc juste renseigner les informations de ces
            différents critères pour que l’Impactomètre puisse évaluer l’impact
            environnemental de la réunion selon 4 catégories : l’impact sur la
            santé humaine, l’impact sur la qualité de l’écosystème, l’impact sur
            le changement climatique et l’impact sur les ressources.
          </p>
          <p>
            Vous pouvez retrouver l'article sur lequel se basent les calculs
            effectués dans le code
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/uploads/article_impact_environnemental_reunions.pdf"
              >à cette adresse.</a
            >
          </p>
        </div>
        <div v-if="page == 'howto'" class="howto">
          <h2>Utilisation</h2>
          <br />
          <div class="video">
            <iframe
              src="https://player.vimeo.com/video/431704870?title=0&byline=0&portrait=0"
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
  box-shadow: 0px 0px 53px -18px rgba(0, 0, 0, 0.75);
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

/*
 * HOWTO
 */
.video {
  padding: 30% 0 0 0;
  position: relative;
}
</style>
