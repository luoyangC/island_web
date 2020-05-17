<template>
  <v-layout column>

    <v-layout wrap justify-center>

      <v-flex xs12 sm10 md8 lg8 xl6 mb-5 mt-10 ml-2 mr-2>
        <no-ssr>
          <div class="article-image" @click="handleAddImage">
            <v-img v-if="image" class="article-image__image" :src="image" aspect-ratio="1.7" />
            <v-icon v-else class="article-image__icon" large>mdi-camera</v-icon>
          </div>
          <v-text-field v-model="title" placeholder="请输入标题" solo flat dense autofocus hide-details height="44" class="article-title" />
          <v-layout justify-space-between align-center>
            <v-layout align-center class="article-tag-list">
              <v-fade-transition group origin="center center">
                <v-chip v-for="tag in tags" :key="tag" close class="article-tag-item" @click:close="handleCloseTag(tag)">{{ tag }}</v-chip>
              </v-fade-transition>
              <v-text-field
                v-if="showInput"
                v-model="newTag"
                solo
                flat
                outlined
                autofocus
                hide-details
                height="32"
                class="article-tag-input"
                @blur="handleInputTag"
                @keyup.enter="handleInputTag"
              />
              <v-btn v-else outlined height="32" width="108" color="#757575" class="article-tag-btn" @click="handleAddTag">
                <v-icon left>mdi-plus</v-icon>添加标签
              </v-btn>
            </v-layout>
            <v-select
              v-model="category"
              label="选择分类"
              :items="categories"
              item-text="title"
              item-value="id"
              solo
              flat
              outlined
              hide-details
              height="32"
              class="article-category-select"
            />
          </v-layout>
          <mavon-editor v-model="content" :box-shadow="false" class="article-editor" @save="handleSave" />
          <v-dialog v-model="showDialog" persistent max-width="420">
            <v-card>
              <v-card-title class="headline mb-5">添加题图</v-card-title>
              <v-card-text>
                <v-text-field v-model="imageUrl" label="添加链接" solo flat outlined dense prepend-icon="link" />
                <v-file-input v-model="imageFile" label="上传文件" solo flat outlined dense prepend-icon="image" accept="image/png, image/jpeg, image/jpg" />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="green darken-1" text @click="showDialog = false">取消</v-btn>
                <v-btn color="green darken-1" text @click="handleSaveImage">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </no-ssr>

      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  asyncData: async({ params, app, store }) => {
    if (params.editId) {
      const { data: article } = await app.$api.getArticleInfo(params.editId)
      const category = store.getters['article/categories'].find(item => item.title === article.category)
      return {
        id: params.editId,
        title: article.title,
        image: article.image,
        category: category.id,
        tags: article.tags ? article.tags.split(',') : [],
        content: article.content
      }
    }
  },

  data: () => ({
    title: '',
    image: '',
    category: '',
    imageUrl: '',
    imageFile: null,
    content: '',
    newTag: '',
    tags: [],
    showInput: false,
    showDialog: false
  }),

  computed: {
    ...mapGetters('app', [
      'parallaxHeight',
      'windowSize'
    ]),
    ...mapGetters('user', [
      'currentUser'
    ]),
    ...mapGetters('article', [
      'categories'
    ])
  },
  methods: {
    async handleSaveImage() {
      if (this.imageUrl) {
        this.image = this.imageUrl
      } else if (this.imageFile) {
        this.image = await this.$upload(this.imageFile)
      } else {
        this.image = ''
      }
      this.showDialog = false
    },
    handleInputTag() {
      if (this.newTag) {
        this.addTag()
      } else {
        this.showInput = false
      }
    },
    handleAddImage() {
      this.showDialog = true
    },
    handleAddTag() {
      this.showInput = true
    },
    handleCloseTag(tag) {
      const index = this.tags.findIndex((item) => item === tag)
      this.tags.splice(index, 1)
    },
    handleSave(content) {
      const title = this.extractTitle(content)
      const image = this.extractImage(content)
      const profile = this.extractProfile(content)
      const category = this.extractCategory()
      if (!title || !image || !profile || !category) {
        return
      } else {
        const data = { image, profile, title, category, content, tags: this.tags.join(',') }
        if (!this.id) {
          this.addArticle(data)
        } else {
          this.updateArticle(this.id, data)
        }
      }
    },
    extractCategory() {
      const category = this.category
      !category && this.$message.warning('请选择分类')
      return category
    },
    extractTitle(val) {
      const titleRe = /\#\s([^]*?)\n/
      const title = this.title || (val.match(titleRe) && val.match(titleRe)[1])
      !title && this.$message.warning('请输入标题')
      return title
    },
    extractImage(val) {
      const imageRe = /\!\[.+\]\(([^]*?)\)/
      const image = this.image || (val.match(imageRe) && val.match(imageRe)[1])
      !image && this.$message.warning('请插入一张图片')
      return image
    },
    extractProfile(val) {
      const profileRe = /\*([^]*?)\*/
      const profile = val.match(profileRe) && val.match(profileRe)[1]
      !profile && this.$message.warning('请输入一段简介')
      return profile
    },
    async addArticle(article) {
      await this.$api.addArticle(article)
      this.$message.success('添加成功！')
    },
    async updateArticle(id, article) {
      await this.$api.updateArticle(id, article)
      this.$message.success('修改成功！')
    },
    addTag() {
      const tag = this.newTag
      const index = this.tags.findIndex((item) => item === tag)
      if (index !== -1) {
        this.$message.warning('标签已存在')
      } else {
        this.tags.push(tag)
        this.newTag = ''
        this.showInput = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-image
  position relative
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  height 180px
  background-color #F5F4F5
  &__image
    position: absolute;
    height: 100%;
    width: 100%;

.article-title
  margin 12px 0
  >>>.v-input
    &__slot
      padding 0 !important
  >>>.v-text-field
    &__slot
      input
        padding: 0
        min-height: 44px
        font-size: 32px
        line-height: 1.4
        font-weight: 600

.article-tag
  &-list
    margin 12px 0
  &-item
    margin-right 6px
  &-input
    display inline-block
    width 108px
    flex none
    margin-right 6px
    >>>.v-input
      &__slot
      &__control
        min-height 32px !important

.article-category-select
  width 158px
  flex none
  >>>.v-input
      &__slot
      &__control
        min-height 32px !important

.article-editor
  z-index 1
  min-height 400px
  border none
</style>

<style lang="stylus">
.markdown-content
  line-height 1.5
  img
    width auto
    height auto
    max-width 100%
    max-height 100%
  h1,h2,h3
    margin-bottom 16px
    border-bottom 1px solid #eaecef
  ul
    margin-bottom 16px
  blockquote
    padding 0 1em
    color #6a737d
    border-left .25em solid #dfe2e5
  code
    padding 0 10px
    border solid 1px #e1e4e5
    font-size 0.95em
    font-family SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",Courier,monospace !important
    box-shadow none !important
    background-color #f8f8f8
  code:before, code:after
      content ''
  pre
    overflow-x auto
    padding 0 !important
    border solid 1px #e1e4e5
    background-color #f8f8f8 !important
    margin-bottom: 16px
    code
      margin 0 !important
      padding 6px 12px !important
      border none !important
      white-space pre !important
      word-break keep-all !important
      text-overflow ellipsis !important
      background-color rgba(0,0,0,0) !important
</style>

