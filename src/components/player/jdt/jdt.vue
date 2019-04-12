<template>
  <!-- 进度条 总体长度 -->
  <div  class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <!-- 进度条 已播放长度 -->
      <div class="progress" ref="progress"></div>
      <!-- 进度条 按钮 -->
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            btnWidth: {
                type: Number,
                default: 0
                },
                touchInfo: {
                initiated: false
                }

        }
    },
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    methods: {
        progressTouchStart (e) {
        this.touch.initiated = true // 初始化 使用touchu必须先初始化
        this.touch.startX = e.touches[0].pageX // 记录触摸时的位置
        this.touch.left = this.$refs.progress.clientWidth // 记录已经进行的宽度 => 当前进度
        },
        progressTouchMove (e) {
        if (!this.touch.initiated) {
            return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX // 实时得到移动的x位点 减去记录的x坐标  ==偏移量
        const progressWidth = Math.min(Math.max(0, deltaX + this.touch.left), this.$refs.progressBar.clientWidth - progressBtnWidth)
        this.$refs.progress.style.width = `${progressWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${progressWidth}px, 0, 0)`
        },
        progressTouchEnd () {
        this.touch.initiated = false
        this._trgglePercent()
        },
        progressClick (e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this.$refs.progress.style.width = `${offsetWidth}px` // e.offsetX 是点击后的偏移量
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        this._trgglePercent()
        },
        _trgglePercent () {
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 总宽度
        const percent = this.$refs.progress.clientWidth / progressBarWidth
        this.$emit('percentChange', percent) // 派发事件
        }
    },
    watch: {
        percent (newPercent) {
            if (newPercent >= 0 && !this.touch.initiated) {
                const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // 总宽度
                const progressWidth = newPercent * progressBarWidth
                this.$refs.progress.style.width = `${progressWidth}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${progressWidth}px, 0, 0)`
            }
        }
    },
    created () {
        this.touch = {} // 将touch的数据挂在此对象下
    },
}
</script>
<style lang="less" scoped>
@import '~common/style/index.less';
    .progress-bar{
        .w(300);
        .h(30);
        .pan(10,37.5,10,37.5);
        background: #f66;
        .bar-inner{
            .w(240);
            .h(5);
            background: #fff;
            .progress{
                .w(240);
                .h(5);
                background: #f0f;
            }
            .progress-btn-wrapper{
                .w(10);
                .h(10);
                border-radius: 50%;
                background: #a6f;
                .progress-btn{
                    .w(240);
                    .h(6);
                    background: #e88;
                }
            }
        }
    }
</style>

