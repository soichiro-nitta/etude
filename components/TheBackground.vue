<template lang="pug">
  .TheBackground
    canvas#canvas
</template>

<script>
import {TweenMax, Expo} from 'gsap'

export default {
  data () {
    return {
      isMobile: this.$device.isMobile
    }
  },
  mounted () {
    this.canvasAnimation()
    this.spout()
  },
  methods: {
    spout () {
      requestAnimationFrame(() => {
        TweenMax.to('#canvas', 3, {
          scale: 1,
          ease: Expo.easeOut
        })
      })
    },
    canvasAnimation () {
      const isMobile = this.isMobile
      /**
      * Generates random particles using canvas
      *
      * @class Particles
      * @constructor
      */
      class Particles {
        constructor () {
          // particle colors
          this.colors = [
            '100, 100, 100',
            '130, 130, 130',
            '160, 160, 160'
          ]
          // adds gradient to particles on true
          this.blurry = false
          // adds white border
          this.border = false
          // particle radius min/max
          this.minRadius = 10
          this.maxRadius = 35
          // particle opacity min/max
          this.minOpacity = 0.005
          this.maxOpacity = 0.5
          // particle speed min/max
          this.minSpeed = 0.05
          this.maxSpeed = 0.5
          // frames per second
          this.fps = 60
          // number of particles
          this.numParticles = isMobile ? 60 : 120
          // required canvas variables
          this.canvas = document.getElementById('canvas')
          this.ctx = this.canvas.getContext('2d')
        }

        /**
        * Initializes everything
        * @method init
        */
        init () {
          const self = this
          self.render()
          self.createCircle()
        }

        /**
        * generates random number between min and max values
        * @param  {number} min value
        * @param  {number} max malue
        * @return {number} random number between min and max
        * @method _rand
        */
        _rand (min, max) {
          return Math.random() * (max - min) + min
        }

        /**
        * Sets canvas size and updates values on resize
        * @method render
        */
        render () {
          const self = this
          let wHeight = document.getElementById('scrollArea').clientHeight
          let wWidth = document.getElementById('scrollArea').clientWidth
          self.canvas.width = wWidth
          self.canvas.height = wHeight
          window.onresize = () => {
            self.render()
          }
        }

        /**
        * Randomly creates particle attributes
        * @method createCircle
        */
        createCircle () {
          let particle = []
          const self = this

          for (let i = 0; i < this.numParticles; i++) {
            const color = self.colors[~~(self._rand(0, self.colors.length))]
            const vy = self._rand(self.minSpeed, self.maxSpeed)
            // const vx = self._rand(self.minSpeed, self.maxSpeed)
            const r = 1 // Math.sqrt(Math.sqr(vx)+Math.sqr(vy))
            particle[i] = {
              radius: r,
              xPos: self._rand(0, self.canvas.width),
              yPos: self._rand(0, self.canvas.height),
              xVelocity: self._rand(self.minSpeed, self.maxSpeed),
              yVelocity: vy,
              color: 'rgba(' + color + ',' + self._rand(self.minOpacity, self.maxOpacity) + ')'
            }

            // once values are determined, draw particle on canvas
            self.draw(particle, i)
          }
          // ...and once drawn, animate the particle
          self.animate(particle)
        }

        /**
        * Draws particles on canvas
        * @param  {array} Particle array from createCircle method
        * @param  {number} i value from createCircle method
        * @method draw
        */
        draw (particle, i) {
          const self = this
          const ctx = self.ctx

          if (self.blurry === true) {
            // creates gradient if blurry === true
            const grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius / 1.25)

            grd.addColorStop(1.000, particle[i].color)
            grd.addColorStop(0.000, 'rgba(34, 34, 34, 0)')
            ctx.fillStyle = grd
          } else {
            // otherwise sets to solid color w/ opacity value
            ctx.fillStyle = particle[i].color
          }

          if (self.border === true) {
            ctx.strokeStyle = '#fff'
            ctx.stroke()
          }

          ctx.beginPath()
          ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false)
          ctx.fill()
        }

        /**
        * Animates particles
        * @param  {array} particle value from createCircle & draw methods
        * @method animate
        */
        animate (particle) {
          const self = this
          // const ctx = self.ctx

          setInterval(() => {
            // clears canvas
            self.clearCanvas()
            // then redraws particles in new positions based on velocity
            for (let i = 0; i < self.numParticles; i++) {
              particle[i].xPos += particle[i].xVelocity
              particle[i].yPos -= particle[i].yVelocity

              // if particle goes off screen call reset method to place it offscreen to the left/bottom
              if (particle[i].xPos > self.canvas.width + particle[i].radius || particle[i].yPos > self.canvas.height + particle[i].radius) {
                self.resetParticle(particle, i)
              } else {
                self.draw(particle, i)
              }
            }
          }, 1000 / self.fps)
        }

        /**
        * Resets position of particle when it goes off screen
        * @param  {array} particle value from createCircle & draw methods
        * @param  {number} i value from createCircle method
        * @method resetParticle
        */
        resetParticle (particle, i) {
          const self = this

          const random = self._rand(0, 1)

          if (random > 0.5) {
            //  50% chance particle comes from left side of window...
            particle[i].xPos = -particle[i].radius
            particle[i].yPos = self._rand(0, self.canvas.height)
          } else {
            // ... or bottom of window
            particle[i].xPos = self._rand(0, self.canvas.width)
            particle[i].yPos = self.canvas.height + particle[i].radius
          }
          // redraw particle with new values
          self.draw(particle, i)
        }

        /**
        * Clears canvas between animation frames
        * @method clearCanvas
        */
        clearCanvas () {
          this.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
        }
      }

      // go go go!
      const particle = new Particles()
      particle.init()
    }
  }

}
</script>

<style lang="stylus" scoped>
.TheBackground
  display flex
  justify-content center
  align-items center
  position absolute
  top 0
  width 100%
  height 100%
  -webkit-backface-visibility hidden
  backface-visibility hidden
  background #191919
  #canvas
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    margin auto
    width 100%
    height 100%
    transform scale(0)
</style>
