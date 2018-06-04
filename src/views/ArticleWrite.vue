<template>
  <div id="articleWrite">
    <el-form class="form-container" :model="form" :rules="rules" ref="form">
      <el-form-item 
        class="marginB40"
        label-width="60px" 
        :maxlength="100"
        prop="title" 
        label="标题:">
        <el-input type="textarea" class="article-textarea" :rows="1" placeholder="请输入内容" v-model="form.title">
        </el-input>
      </el-form-item>

      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item 
            label="作者:" 
            prop="author"
            class="marginB40"
            label-width="60px">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item 
            label="分类:"
            prop="category_id"
            class="marginB40"
            label-width="60px">
            <el-select v-model="form.category_id" multiple collapse-tags>
              <el-option 
                v-for="(item, index) in getCatList"
                :key="index"
                :label="item.name"
                :value="item.category_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item 
            label="标签:"
            prop="label_id"
            class="marginB40"
            label-width="80px">
            <el-select v-model="form.label_id" multiple collapse-tags>
              <el-option 
                v-for="(item, index) in getLabList"
                :key="index"
                :label="item.name" 
                :value="item.label_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item 
            label="发布日期:"
            class="marginB40"
            label-width="100px">
            <el-date-picker
              v-model="form.release_date"
              :editable="clearable"
              :clearable="clearable"
              :picker-options="pickerOptions"
              type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item 
            label="介绍图片:"
            class="marginB40"
            label-width="100px">
            <el-upload
              class="upload_img"
              name="upload_img"
              :action="actionUrl"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              accept="image/*"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :on-error="handleError"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip upload_hint">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item 
        class="marginB40"
        label-width="60px" 
        :maxlength="100"
        prop="introduce_text" 
        label="摘要:">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.introduce_text">
        </el-input>
      </el-form-item>
    
      <!-- 内容 -->
      <div class="marginB40 app-container calendar-list-container">  
        <editor 
          class="editor"  
          v-model="content"  
          :setting="editorSetting"  
          :url="Url"
          :max-size="MaxSize"  
          :accept="Accept"  
          :with-credentials="withCredentials"  
          @on-upload-fail="onEditorReady"  
          @on-upload-success="onEditorUploadComplete">
        </editor>
        <!-- <div v-html='content'></div> -->
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import editor from "../components/editor";
import util from "../common/util.js";
import dao from "../common/dao.js";

export default {
  name: "articleWrite",
  components: {
    editor
  },
  props: {},
  data() {
    const titleRequire = (rule, value, callback) => {
      if (value === '') {
        util.messageMethod('error', `${rule.field}为必传项`)
      } else {
        callback()
      }
    }
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`不能为空`))
      } else {
        callback()
      }
    }
    const aryRequire = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(`分类不能为空`))
      } else {
        callback()
      }
    }
    return {
      form: {
        title: '',
        author: '',
        category_id: [],
        label_id: [],
        introduce_img: '',
        release_date: new Date(),
        introduce_text: ''
      },
      // 日期相关
      clearable: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 3600 * 1000 * 24);
        }
      },
      // 介绍图片相关
      actionUrl: `${window.nodeHref}articleImg`,
      fileList: [],
      // 内容相关
      content: "我是富文本编辑器的内容",
      //tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/
      editorSetting: {
        height: 300
      },
      Url: "/insertArticle", // 图片对应的上传地址
      MaxSize: 2097152, // 文件大小
      Accept: "image/jpeg, image/png", // 文件格式
      withCredentials: true,
      // 验证
      rules: {
        title: [{ validator: titleRequire, trigger: 'blur'}],
        author: [{ validator: validateRequire, trigger: 'blur'}],
        introduce_text: [{ validator: validateRequire, trigger: 'blur'}],
        category_id: [{ validator: aryRequire, trigger: 'change'}],
        label_id: [{ type:"array", required: true, message: '请至少选择一个标签', trigger: 'change'}]
      }
    };
  },
  watch: {
    "getCatList" () {
      this.initCatAndLab()
    },
    "getLabList" () {
      this.initCatAndLab()
    }
  },
  computed: {
    ...mapGetters(["getUser", "getCatList", "getLabList"])
  },
  methods: {
    ...mapActions(["setUser", "setCatList", "setLabList"]),
    initWrite () {
      this.initCatAndLab()
    },
    // 初始化分类、标签
    initCatAndLab () {
      let cat = this.form.category_id.length,
          getCat = this.getCatList.length,
          lab = this.form.label_id.length,
          getLab = this.getLabList.length;
      if ( cat === 0 && getCat !== 0) this.form.category_id.push(this.getCatList[0].category_id)
      if (lab === 0 && getLab !== 0) this.form.label_id.push(this.getLabList[0].label_id)
    },
    // 限制图片个数
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 图片删除提示
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    // 图片上传成功
    handleSuccess(esponse, file, fileList) {},
    // 图片上传失败
    handleError(err, file, fileList) {
      console.log(err)
    },
    onEditorReady(data) {
      // 上传失败的函数
      console.log('失败=', data);
    },
    onEditorUploadComplete(data) {
      // 处理上传图片后返回数据，添加img标签到编辑框内
      // this.content = this.content + "<img src=" + `${window.nodeHref}${data.href}` + ">";
    },
    onSubmit () {
      console.log('form=', this.form)
    }
  },
  mounted() {
    this.initWrite()
  }
};
</script>

<style scoped lang="scss">
.upload_hint {
  padding: 0 10px;
  display: inline;
}
</style>
