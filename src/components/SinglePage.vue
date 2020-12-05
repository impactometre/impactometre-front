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
            <b>Impactometre.fr</b> permet de comparer différents scénarios de
             réunions selon des critères environnementaux. Son objectif est de
             vous aider à faire des choix : est-il préférable d’organiser une
             visio-conférence ou de faire déplacer tous les participants ? etc.
          </p>
          <p>
            Impactometre.fr prend en compte les impacts environnementaux du
            matériel utilisé (ordinateurs, vidéoprojecteur…), des transports
            réalisés par les participants à la réunion mais aussi ceux de la
            visioconférence (transfert de données, logiciel…). L’utilisateur
            renseigne donc différentes informations pour décrire
            les scénarios de réunions envisagés.
          </p>
          <p>
            Les résultats sont affichés selon quatre catégories environnementales
            : l’impact sur la santé humaine, la qualité de l’écosystème,
            le changement climatique et les ressources. Pour chaque catégorie,
            le résultat est normalisé par le scénario ayant le plus d’impact,
            c’est-à-dire qu’il sera affiché à 100%. Un équivalent est aussi
            donné en kilomètres parcourus en voiture thermique.
          </p>
          <p>
            La méthode utilisée par Impactometre.fr est fortement inspirée
            d’une Analyse de Cycle de Vie. Les données utilisées proviennent
            de la base de données EcoInvent et l’évaluation est réalisée
            selon Impact2002+. Vous pouvez retrouver l'article qui décrit
            la construction de la méthode d’évaluation
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/uploads/article_impact_environnemental_reunions.pdf"
              >à cette adresse.</a
            >
          </p>
          <p>
            <b>Impactometre.fr</b> est un outil développé dans le cadre
            d’un projet de l’Université de technologie de Compiègne.
            Il est le fruit d’un travail réalisé par Aurélien Béranger,
            William Boffy, Clément Brizard, Jules Farjas, Edmond Giraud,
            Matthieu Glorion, Maria Idrissi, Elouan Le Bars et Valentin
            Le Gauche et encadré par Yacine Baouch, enseignant à l’UTC.
          </p>
          <p>
            Impactometre.fr est hébergé par l’association Picasoft.
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
