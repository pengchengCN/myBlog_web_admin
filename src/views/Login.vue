<template>
  <div class="login">
    <h1>myBlog 管理</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.pass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loadingButton" @click="onSubmit">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import util from '../common/util.js'
import dao from '../common/dao.js'
  export default {
    name: 'login',
    props: {
    },
    data () {
      return {
        form: {
          user: 'pengc',
          pass: 'admin'
        },
        loadingButton: false
      }
    },
    watch: {
    },
    methods: {
      async onSubmit () {
        this.loadingButton = true
        let {data: { data } } = await dao.login(this.form)
        sessionStorage.user = this.form.user
        util.messageMethod('success', data)
        this.$router.push('/home/articleList')
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
.login {
  text-align: center
}
</style>
