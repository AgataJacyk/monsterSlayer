function getRandomValue(min, max) { 
 return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
data() {
    return {
            playerHP: 100,
            monsterHP: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
    };
},
computed: {
monsterBarStyles() {
    if (this.monsterHP < 0) {
        return {width: '0%'}
    }
    return {width: this.monsterHP + '%'}
},
playerBarStyles() {
    if (this.playerHP < 0) {
        return {width: '0%'}
    }
    return {width: this.playerHP + '%'}
},
mayUseSpecialAttack(){
    return this.currentRound % 3 !== 0;
}
},
watch: {
    playerHP(value) { 
        if(value <=0 && this.monsterHP <= 0){
            this.winner = 'draw!';
        } else if ( value <= 0) {
            this.winner = 'monster';
        }
    },
    monsterHP(value) {
        if (value <= 0 && this.playerHP <= 0){
            this.winner = 'draw';
        } else if (value <= 0){
            this.winner = 'player'
        }
    }
},
methods: {
    startGame(){
        this.playerHP = 100;
        this.monsterHP = 100;
        this.winner = null;
        this.currentRound = 0;
        this.logMesseges = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue =  getRandomValue(5, 12);
      this.monsterHP -= attackValue;
      this.addLogMessage('player', 'attack', attackValue)
      this.attackPlayer();
    },
    attackPlayer(){
        const attackValue =  getRandomValue(8, 15);
        this.addLogMessage('monster', 'attack', attackValue)
        this.playerHP -= attackValue;
    },
    specialAttackMonster(){
        this.currentRound++;
        const attackValue = getRandomValue(10,25);
        this.monsterHP -= attackValue;
        this.addLogMessage('player', 'special-attack', attackValue)
        this.attackPlayer();
    },
    healPlayer() {
        this.currentRound++;
        const healValue = getRandomValue(8,20);
        if ( this.playerHP + healValue > 100){
            this.playerHP = 100;
        } else {
            this.playerHP += healValue;
        }
        this.addLogMessage('player', 'heal', healValue)
        this.attackPlayer();
    },
    surrender() {
        this.winner = 'monster';
    },
    addLogMessage(who, what, value){
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        });
    }
}
});

app.mount('#game');

