<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="goto(item)">{{item.name}}</li>
      </ul>
    </div>
    <main class="main">
      <iframe ref="subsystem"></iframe>
    </main>
  </div>
</template>
<script>
import { Mefa } from '../mefa.es.js'

export default {

  data() {
    return {
      list: [
        { name: 'System 1 Page 1', app: '1', route: '/' },
        { name: 'System 1 Page 2', app: '1', route: '/1' },
        { name: 'System 2 Page 1', app: '2', route: '/' },
        { name: 'System 2 Page 2', app: '2', route: '/1' },
        { name: 'System 2 Page 3', app: '2', route: '/2' },
        { name: 'System 3 Page 1', app: '3', route: '/' },
        { name: 'System 3 Page 2', app: '3', route: '/1' },
        { name: 'baidu', app: 'baidu' },

      ]
    };
  },

  mounted() {
    this.mefa = new Mefa(this.$refs.subsystem)
    this.mefa.registerApplication({app: '1', route: '/', link: 'http://localhost:4002/'})
    this.mefa.registerApplication({app: '1', route: '/1', link: 'http://localhost:4002/'})
    this.mefa.registerApplication({app: '2', route: '/', link: 'http://localhost:4003/'})
    this.mefa.registerApplication({app: '2', route: '/1', link: 'http://localhost:4003/'})
    this.mefa.registerApplication({app: '2', route: '/2', link: 'http://localhost:4003/'})
    this.mefa.registerApplication({app: '3', route: '/', link: 'http://localhost:4004/'})
    this.mefa.registerApplication({app: '3', route: '/1', link: 'http://localhost:4004/'})
    this.mefa.registerApplication({app: 'baidu', link: 'http://baidu.com/'})
  },

  methods: {
    goto({ app, route }) {
      this.mefa.navigateTo({app, route})
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
  cursor: pointer;
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

