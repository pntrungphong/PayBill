<template>
<div>
    <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions">
    </video-player>
      <h1>{{video.name}}</h1>
      <h1>{{video.description}}</h1>
</div>
  
</template>

<script>
import 'video.js/dist/video-js.css'
 
import { videoPlayer } from 'vue-video-player'
export default {
      components: {
    videoPlayer
    },
    computed:{
        video(){
            return this.$store.state.videos.find(vid=>vid.id==this.$route.params.id)
        },
        playerOptions(){
            return {
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0,2.5],
                sources: [{
                type: "video/mp4",
                src: this.video.videoUrl
          }],
          poster: this.video.thumbnail,
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    img{
        max-width: 60%;
    }
</style>