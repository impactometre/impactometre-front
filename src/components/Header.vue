<template>
  <header>
    <span class="header-logo">
      <h1>Impactomètre</h1>
      <b>Comparaison d'impact environnemental des réunions.</b>
    </span>
    <div class="header-links">
      <a href="#" @click.prevent="showSinglePage('howto')">Utilisation</a>
      <a href="#" @click.prevent="showSinglePage('about')">A propos</a>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    showSinglePage: function (page) {
      this.$root.$emit("show_single_page", page);
    },
  },
};
</script>

<style>
header {
  z-index: 3;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  background-color: #3c3c3c;
  color: #ffffff;
  flex-basis:10%;
}
header .header-logo {
  display: inline-block;
  padding: 5px 30px;
}
header .header-logo h1 {
  font-size: 24px;
  line-height: 30px;
}
header .header-logo b {
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
}
header .header-links {
  display: inline-block;
  float: right;
  padding: 20px;
}
header .header-links a {
  color: white;
  text-decoration-line: none;
  margin-left: 20px;
}
header .header-links a:hover {
  color: gray;
}
</style>
