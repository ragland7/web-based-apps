<!-- https://play.vuejs.org/#eNp9Vdtu1DAQ/ZVpJLSFbnZ7A6SQRVzEAyBx7QtqeHCTycbUawfbyXap9t8Z27mprfri2DPj4zNzxs5t9LauF22DURKlB3EMEMevM5nJ1OKmFswirQDSgrd+EqbQxrxcZdFBySU3FRZZ1HnJX0MumDHkrpAVqMn3SzUa8kZrlBZMrjQmcHsbZrDfg2osqJJMfxs0litpFgLl2lb7fbqsH4X+3u1weH+lgiM4IUQPP4BdkuM3WQPWgBYSKZUmvMO8UjzHOXBZ4M1T+kCwmCyC5Bp3FONdk0wJgsuaqNtdjeTXrODKhbdMNM4QEMjSxhtVoCBTY1C/lWbruMPytaMZoojeQGzpqp1e6SnZq8ZayvJNLnh+TUASb2yfO3H6+jldhpBeJg/SA1Dl2hiFwaGApBwT8QaNYWuiOCRFUkHFWgpUpD9aLMBWSLXk/w4o3yBlEG7LzMMqjpXvZPS15wOzoGjPMF1OWo2WJte8tjTHm1ppCwWWrBEWbt2mgll2+DTMATTaRpP0PXnSOYHjeb/sOm009O2aQMmoGIN9VCUB2QgxOIZEEricvYBn8BJWsznMzk5dox2Hxck5Oc5mQNMLKhXzQGAVYIt6Zysu18ANzH6PsCHGo56fOow74xjadaGLPPaH+eHMk/Cjiw7B+1fuu/dbN2grVdC2rjbTdhnrB8BLOCSGZjGWAFarFWlOtp7mZVjRJZrshBDja3x05I/2JO4hu1uZdoB3+yKGk/uQtGEC2Bmn/LxG44ngG/suSq81hVvd4F2C/kODK1q6HHrO9Z/dCdeKi/DGBOBSSRtvka8rm8CVEoXH81bD/1GTnZwePxltJdtwsUtm7+m2cML4glvSqlvNYaOkMjXLHSvi4LiOlzEcmCuhqBvXGlHew4UsuuAU7nDhh9owegLm4E1zoELx8h69554eHUbJ+gSjeWRJPFny9eKPUZJ+AP5gerbo5nOB+mvttcqioYuyiAmhtp+8zVW1a1P31GF+/YD9j6EX0/H9ppGItfTUDD7L9BptcH/4+YU6dOKkB7MRFP2I8wcaJZrwALqwd40siPYkzrP9uHHPCF3CC/PhxqI0fVKO6Hhjsoj+gu8fSX2ke7Y477sn2v8HhjRNQQ== -->

<template>
  <div>
    <div v-if="!finished">
      <p class="header">Your current score: {{ score }} out of {{questions.length}}</p>
      <p class="header">Question {{ qno + 1 }}: {{ questions[qno] }}</p>

      <div v-for="(choice, index) in choices" :key="index">
        <input type="radio" :value="choice" v-model="userAnswer" /> {{ choice }}
      </div><br>

      <button @click="nextQuestion">OK</button>
    </div>

    <p v-else class="final-message">
      You have completed the quiz! <i>Your score was {{ score }} out of {{ questions.length }}</i>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qno: 0,
      score: 0,
      finished: false,
      userAnswer: null,
      questions: ['6 * 7 =', '32 + 10 =', '14 * 3' , 'The answer to everything is '],
      qanswers: ['42', '42', '42', '42'],
      choices: ['0', '1', '13', '33', '42']
    };
  },
  methods: {
    nextQuestion() {
      if (this.userAnswer === this.qanswers[this.qno]) {
        this.score++;
      }
      if (this.qno < this.questions.length - 1) {
        this.qno++;
        this.userAnswer = null;
      } else {
        this.finished = true;
      }
    }
  }
};
</script>

<style>
.header {
  font-weight: bold;
  font-size: 120%;
  font-family:'Courier New', Courier, monospace;
}
.final-message {
  color: green;
  font-family: "Times New Roman", Times, serif;
  font-size: 150%;
}
</style>