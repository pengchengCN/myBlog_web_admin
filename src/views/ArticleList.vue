<template>
  <div class="articleList">
    <h4>文章列表:</h4>
      <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="600"
      >
      <el-table-column
        fixed
        prop="title"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="article_id"
        label="文章ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="category_id"
        label="所属分类">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.category_id }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="label_id"
        label="所属标签"
        width="120">
      </el-table-column>
      <el-table-column
        prop="commentsNumber"
        label="评论条数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="introduce_img"
        label="介绍图片">
      </el-table-column>
      <el-table-column
        prop="introduce_text"
        label="介绍文本"
        width="400"
        >
      </el-table-column>
      <!-- <el-table-column
        prop="text"
        label="内容"
        width="600"
        >
      </el-table-column> -->
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import util from '../common/util.js'
import dao from '../common/dao.js'
  export default {
    name: 'articleList',
    props: {
    },
    data () {
      return {
        tableData: []
      }
    },
    watch: {
    },
    methods: {
      async initArticle () {
        let {data: { articleList } } = await dao.articleAll()
        this.tableData = articleList
      },
      handleClick(row) {
        console.log(row);
      }
    },
    mounted () {
      this.initArticle()
    }
  }
</script>

<style lang="scss">
.articleList {
  h4 {
    line-height: 40px
  }
}
</style>
