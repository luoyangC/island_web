<template>
  <v-flex column>

    <v-layout column justify-center mb-5>
      <v-img :height="parallaxHeight" :src="currentImage">
        <v-layout column align-center justify-end dark-back fill-height pt-5>
          <v-layout wrap justify-center align-content-end>
            <h1 class="title-text mb-3">Luoyang's Blog</h1>
          </v-layout>
          <v-layout wrap justify-center align-content-start class="css20c6b945e5204ff sentence-text">
            {{ sentence.lines[0] }} , {{ sentence.lines[1] }}
          </v-layout>
        </v-layout>
      </v-img>
    </v-layout>

    <v-layout wrap justify-center>
      <v-flex v-for="article in articles" :key="article.id" xs12 sm10 md8 lg6 xl6 ml-3 mr-3>
        <article-card :article="article" :article-height="articleHeight" />
      </v-flex>
      <v-flex v-if="articles.length === 0" xs12 sm10 md8 lg6 xl6 ml-3 mr-3>
        <v-card>
          <v-img class="white--text" :height="articleHeight" :src="currentImage">
            <v-container dark-background fill-height fluid>
              <v-layout column fill-height justify-center align-center>
                <h1 class="display-2 font-weight-medium mb-3">抱歉，没有更多内容</h1>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-layout justify-space-between>
          <v-btn v-show="prev" rounded outlined @click="changePage(prev)">上一页</v-btn>
          <v-spacer />
          <v-btn v-show="next" rounded outlined @click="changePage(next)">下一页</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleCard from '@/components/ArticleCard'
export default {

  components: {
    ArticleCard
  },

  asyncData: async({ app, store }) => {
    const imageId = app.store.getters['app/randomImage'][0] || 100
    const { data: sentence } = await app.$api.getSentence(Math.floor(Math.random() * 20) + 1)
    const { data: articles } = await app.$api.getArticles(store.getters['article/params'])
    return {
      articles: articles,
      sentence: sentence,
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`
    }
  },

  data: () => ({
    articles: [],
    sentence: []
  }),

  computed: {
    ...mapGetters('app', [
      'parallaxHeight',
      'windowSize'
    ]),
    ...mapGetters('article', [
      'params'
    ]),
    articleHeight() {
      if (this.windowSize.x < 960) return 200
      else return 250
    },
    prev() {
      return this.params.page - 1
    },
    next() {
      if (this.articles.length < 10) {
        return false
      }
      return this.params.page + 1
    }
  },

  watch: {
    async params(value) {
      const { data: articles } = await this.$api.getArticles(value)
      this.articles = articles
    }
  },

  methods: {
    async changePage(page) {
      this.$vuetify.goTo(this.parallaxHeight + 5, { duration: 1000, offset: 0, easing: 'easeInOutCubic' })
      this.$store.dispatch('article/setParams', { ...this.params, page })
    }
  }

}
</script>

<style lang="stylus">
.sentence-text
  padding 0 20px
  font-size 26px
  color white
</style>
