<template>
  <el-container>
    <el-header ref="header">
      <el-button plain style="" @click="$router.push('/login')">退出</el-button>
    </el-header>
    <el-row>
      <el-col :span="3">
        <el-aside style="width: 100%" :style="{height: navHeight + 'px'}">
          <MenuComp :menuData="menuData"></MenuComp>  
        </el-aside>
      </el-col>
      <el-col :span="21">
        <el-main>
          <router-view />
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import util from '../common/util.js'
import dao from '../common/dao.js'
import MenuComp from '../components/MenuComp'
  export default {
    name: 'home',
    components: {
      MenuComp
    },
    props: {
    },
    data () {
      return {
        navHeight: 0,
        menuData: [
          {
            name: '文章管理',
            icon: 'el-icon-location',
            href: 'articleList'
          },
          {
            name: '写文章',
            icon: 'el-icon-menu',
            href: 'articleWrite'
          },
          {
            name: '类型管理',
            icon: 'el-icon-document',
            href: 'categoryList'
          },
          {
            name: '标签管理',
            icon: 'el-icon-setting',
            href: 'labelList'
          },
          {
            name: '用户管理',
            icon: 'el-icon-setting',
            href: 'userList'
          }
        ]
      }
    },
    watch: {
    },
    methods: {
    },
    mounted () {
      this.navHeight = document.body.clientHeight - this.$refs.header.$el.offsetHeight
    }
  }
</script>

<style lang="scss">
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
