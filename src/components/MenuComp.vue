<template>
  <div class="menu">
    <router-link 
      v-for="(item, index) in menuData" 
      :key="index" 
      tag="a" 
      :to="`/home/${item.href}`"
      class="menuLink"
      :class="`${$route.name === item.href ? 'is-active':''}`"
      >
      <i :class="item.icon"></i>
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'menuComp',
  props: {
    menuData: Array
  },
  watch: {
  },
  methods: {
  },
  mounted () {
    console.log(this.$route.name)
  }
}
</script>

<style scoped lang="scss">
.menuLink {
  display: block;
  padding: 0 40px;
  line-height: 60px;
  color: #333;
  text-align: left;
  &:hover {
    background-color: #ecf5ff
  }
  i {
    padding-right: 10px
  }
}
.is-active {
  color: #409eff;
  background-color: #ecf5ff
}
</style>
