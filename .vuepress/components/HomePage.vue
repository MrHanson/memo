<template>
  <article class="home-page-wrapper">
    <section class="main">
      <ModuleTransition delay="0.12">
        <div>
          <img class="avatar" src="avatar.jpg" jp alt="hero" />
        </div>
      </ModuleTransition>
      <ModuleTransition delay="0.12">
        <div class="contract">
          <a target="_black" herf="https://github.com/mrhanson">
            <i class="iconfont reco-github"></i>
          </a>
          <a target="_black" herf="https://space.bilibili.com/40467270">
            <i class="iconfont reco-bilibili"></i>
          </a>
        </div>
      </ModuleTransition>
    </section>
  </article>
</template>

<script>
import { ModuleTransition } from '@vuepress-reco/core/lib/components'
export default {
  components: { ModuleTransition },

  data() {
    return {
      downloads: 0,
    }
  },

  computed: {
    features() {
      return this.$frontmatter.features
    },
    heroImageStyle() {
      return (
        this.$frontmatter.heroImageStyle || {
          maxHeight: '200px',
          margin: '6rem auto 1.5rem',
        }
      )
    },
  },

  created() {
    console.log('homePage', this.$frontmatter)
  },

  methods: {
    toThousandslsFilter(num) {
      const numStr = String(num)
      if (numStr === '' || numStr == undefined) {
        return ''
      }
      const IntPart = /\./g.test(numStr) ? numStr.slice(0, numStr.indexOf('.')) : numStr
      const FloatPart = /\./g.test(numStr) ? numStr.substring(numStr.indexOf('.')) : ''

      const orderPrice2 =
        (+IntPart || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) +
        FloatPart
      return orderPrice2
    },

    npmPackageDownloads(packages, dateRange) {
      packages = this._handlePackages(packages)
      dateRange = this._handleDateRange(dateRange)
      return this._getDownloadsOfDateRange(packages, dateRange)
    },

    async _getDownloadsOfDateRange(packages, dateRange) {
      let downloads = 0
      if (Array.isArray(dateRange)) {
        let fetchPromise = []
        dateRange.map(item => {
          fetchPromise.push(this._fetch(packages, item))
        })
        const result = await Promise.all(fetchPromise)
        downloads = result.reduce((all, next) => {
          return all + next.downloads
        }, 0)
        return downloads
      }
      const result = await this._fetch(packages, dateRange)
      downloads = result.downloads
      return downloads
    },

    _parseJSON(response) {
      return response.json()
    },

    _handleDateRange(dateRange) {
      const index = dateRange.indexOf(':')
      if (index > -1) {
        const dr = dateRange.split(':')
        const newDateRange = dr
        const YEAR = 365 * 24 * 60 * 60 * 1000
        const DATE_RANGE = new Date(dr[1]).getTime() - new Date(dr[0]).getTime()
        const year = parseInt(DATE_RANGE / YEAR)
        if (year > 0) {
          for (let i = 0; i < year; i++) {
            const date = this._getDate(newDateRange[i])
            newDateRange.splice(i + 1, 0, date)
          }
          for (let i = 0, length = newDateRange.length; i < length - 1; i++) {
            newDateRange[i] = `${newDateRange[i]}:${newDateRange[i + 1]}`
          }
          newDateRange.length = year + 1
          return newDateRange
        }
        return dateRange
      }
      return dateRange
    },

    _getDate(date) {
      const dateArr = date.split('-')
      dateArr[0] = Number(dateArr[0]) + 1
      return dateArr.join('-')
    },

    _handlePackages(packages) {
      if (Array.isArray(packages)) {
        return `-,${packages.join(',')}`
      }
      return packages
    },
  },
}
</script>


<style lang="stylus" scoped>
.home-page-wrapper {
  section {
    &.main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin: 0 auto;
      width: 100%;
      height: calc(100vh - 4.5rem);
      overflow: hidden;
      text-align: center;

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

      .contract {
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
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-page-wrapper {
    section {
      padding: 0 2rem;

      &.main {
        height: 580px;
      }
    }
  }
}
</style>
