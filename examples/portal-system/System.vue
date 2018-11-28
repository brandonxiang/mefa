<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="goto(item)">{{item.name}}</li>
      </ul>
    </div>
    <main class="main">
      <iframe src="https://baidu.com"></iframe>
    </main>
  </div>
</template>
<script>


export default {

  data() {
    return {
      list: [
        { name: 'System 1 Page 1', app: 1, route: 1 },
        { name: 'System 1 Page 2', app: 1, route: 2 },
        { name: 'System 2 Page 1', app: 2, route: 1 },
        { name: 'System 2 Page 2', app: 2, route: 2 },
        { name: 'System 2 Page 3', app: 2, route: 3 },
        { name: 'System 3 Page 1', app: 3, route: 1 },
        { name: 'System 3 Page 2', app: 3, route: 2 },
      ]
    };
  },

  methods: {
    goto({ app, route }) {

    }
  }
  
}

</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}
ul,li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  width: 100%;
  height: 100%;
  background-color: #eceff1;
  display: flex;
}
.sidebar {
  height: 100vh;
}
.sidebar li {
  background-color: #fff;
  padding: 10px 20px;
  margin: 20px 30px;
}
.main {
  flex: 1;
  height: 100vh;
}
.main > iframe {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>

