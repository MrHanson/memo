<template>
  <article class="home-page-wrapper">
    <section class="main">
      <ModuleTransition delay="0.12">
        <div>
          <div>
            <img class="avatar" src="avatar.jpg" jp alt="hero" />
          </div>
          <p class="title">Hansonの备忘录</p>
          <code class="motto"> Who wanna bet us that we don' t touch lettuce </code>
        </div>
      </ModuleTransition>
      <ModuleTransition delay="0.12">
        <div class="contract">
          <a target="_black" href="https://github.com/mrhanson">
            <i class="iconfont reco-github"></i>
          </a>
          <a target="_black" href="https://space.bilibili.com/40467270">
            <i class="iconfont reco-bilibili"></i>
          </a>
        </div>
      </ModuleTransition>
    </section>

    <ModuleTransition delay="0.24" v-if="articleList.length">
      <section class="home-article-wrapper">
        <div class="article-list">
          <h4>
            <i class="iconfont reco-blog"></i>
            最近活跃
          </h4>
          <ul>
            <li class="article-item" v-for="article in articleList" :key="article.key">
              <a :href="$withBase(article.path)">
                <div class="article-item--title">{{ article.title }}</div>
                <div>
                  <i class="iconfont reco-date" v-if="article.lastUpdated">
                    {{ article.frontmatter && article.frontmatter.date | time }}
                  </i>
                  <i
                    class="tags iconfont reco-tag"
                    style="margin-left: 8px"
                    v-if="article.frontmatter && article.frontmatter.tags"
                  >
                    <span class="article-tag" v-for="tag in article.frontmatter.tags" :key="tag">
                      {{ tag }}
                    </span>
                  </i>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="info-wrapper">
          <div class="info-item">
            <h4>
              <i class="iconfont reco-category"></i>
              分类
            </h4>
            <ul class="category-wrapper">
              <li v-for="(category, idx) in categoryList" :key="category.key" class="category-item">
                <a :href="$withBase(category.path)">
                  <span>{{ category.key }}</span>
                  <span
                    class="category-item--count"
                    :style="{
                      background: getRandomColor(
                        (categoryList.length - idx + 3) / categoryList.length,
                      ),
                    }"
                  >
                    {{ category.count }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="info-item">
            <h4>
              <i class="iconfont reco-tag"></i>
              标签
            </h4>
            <ul class="tag-wrapper">
              <li
                v-for="(tag, idx) in tagList"
                :key="tag.key"
                class="tag-item"
                :style="{ background: getRandomColor((tagList.length - idx + 3) / tagList.length) }"
              >
                <a :href="$withBase(tag.path)">{{ tag.key }}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </ModuleTransition>
  </article>
</template>

<script>
import { ModuleTransition } from '@vuepress-reco/core/lib/components'
import dayjs from 'dayjs'

export default {
  components: { ModuleTransition },

  filters: {
    time(val) {
      return dayjs(val).format('YYYY/MM/DD')
    },
  },

  computed: {
    articleList() {
      let result = JSON.parse(JSON.stringify(this.$recoPosts))
      if (!Array.isArray(result)) result = []
      result.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))

      return result.filter((_, index) => index <= 2) || []
    },
    categoryList() {
      const hashTbl = (this.$categories && this.$categories._metaMap) || {}

      const ret = Object.entries(hashTbl).map(([k, v]) => ({
        key: k,
        path: v.path,
        count: (v.pages && v.pages.length) || 0,
      }))

      // 按分类个数降序排列
      ret.sort((a, b) => b.count - a.count)
      return ret
    },
    tagList() {
      const hashTbl = (this.$tags && this.$tags._metaMap) || {}

      return Object.entries(hashTbl).map(([k, v]) => ({ key: k, path: v.path }))
    },
  },

  methods: {
    getRandomColor(apha) {
      const themeColor = `22, 44, 90`
      console.log(apha)
      return `rgba(${themeColor}, ${apha})`
    },
  },
}
</script>


<style lang="stylus" scoped>
.home-page-wrapper {
  p, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  section {
    &.main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin: 0 auto;
      width: 100%;
      margin-top: 8rem;
      overflow: hidden;
      text-align: center;
      user-select: none;

      ；, h1 {
        margin-top: 8rem;
      }

      p {
        font-size: 20px;
        margin-bottom: 2rem;
      }

      .avatar {
        border-radius: 50%;
        max-width: 200px;
        margin: 0 auto 2rem;

        &:hover {
          transform: rotate(666turn);
          transition-delay: 1s;
          transition-property: all;
          transition-duration: 59s;
          transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
        }
      }

      .title {
        margin: 1rem;
      }

      .motto {
        color: #505050;
        padding: 0.25rem 0.5rem;
        margin: 0;
        font-size: 0.85em;
        background-color: var(--code-color);
        border-radius: 3px;
      }

      .contract {
        margin: 1rem;

        .iconfont {
          margin: 0 0.5rem;
          font-size: 30px;
          cursor: pointer;
          user-select: none;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    &.home-article-wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin: 20px auto;
      padding: 0 20px;
      max-width: 70vw;

      .article {
        &-list {
          flex: auto;
          margin: 0;
          padding: 16px 20px;
          border-radius: 0.25rem;
          box-shadow: var(--box-shadow);
          transition: all 0.3s;

          &:hover {
            box-shadow: var(--box-shadow-hover);
          }
        }

        &-item {
          position: relative;
          margin: 0 auto 20px;
          padding: 16px 20px;
          width: 100%;
          overflow: hidden;
          border-radius: 0.25rem;
          box-shadow: var(--box-shadow);
          box-sizing: border-box;
          transition: all 0.3s;
          background-color: var(--background-color);
          cursor: pointer;

          &:hover {
            box-shadow: var(--box-shadow-hover);
          }

          &--title {
            position: relative;
            font-size: 1.28rem;
            line-height: 46px;
            display: inline-block;

            &:after {
              content: '';
              position: absolute;
              width: 100%;
              height: 2px;
              bottom: 0;
              left: 0;
              background-color: #16305a;
              visibility: hidden;
              transform: scaleX(0);
              transition: 0.3s ease-in-out;
            }

            &:hover {
              &:after {
                visibility: visible;
                transform: scaleX(1);
              }
            }
          }
        }

        &-tag {
          margin-left: 8px;
        }
      }

      .info-wrapper {
        position: -webkit-sticky;
        position: sticky;
        top: 70px;
        overflow: hidden;
        transition: all 0.3s;
        margin-left: 15px;
        flex: 0 0 300px;
        height: auto;
        box-shadow: var(--box-shadow);
        border-radius: 0.25rem;
        box-sizing: border-box;
        padding: 0 15px;
        background: var(--background-color);

        &:hover {
          box-shadow: var(--box-shadow-hover);
        }

        .category {
          &-item {
            margin-bottom: 0.4rem;
            padding: 0.4rem 0.8rem;
            transition: all 0.3s;
            border-radius: 0.25rem;
            box-shadow: var(--box-shadow);
            background-color: var(--background-color);

            a {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: var(--text-color);
            }

            &--count {
              width: 1.6rem;
              height: 1.6rem;
              text-align: center;
              line-height: 1.6rem;
              border-radius: 0.25rem;
              background: #eee;
              font-size: 13px;
              color: #fff;
            }

            &:hover {
              transform: scale(1.04);
            }
          }
        }

        .tag {
          &-item {
            vertical-align: middle;
            margin: 4px 4px 10px;
            padding: 4px 8px;
            display: inline-block;
            cursor: pointer;
            border-radius: 0.25rem;
            background: #fff;
            color: #fff;
            line-height: 13px;
            font-size: 13px;
            box-shadow: var(--box-shadow);
            transition: all 0.3s;

            a {
              color: #fff;
            }

            &:hover {
              transform: scale(1.04);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 719px) {
  .home-page-wrapper {
    section {
      padding: 0 2rem;

      &.main {
        height: 580px;
      }
    }

    .home-article-wrapper {
      display: block !important;

      .info-wrapper {
        margin-left: 0 !important;
        margin-top: 15px;
      }
    }
  }
}
</style>
