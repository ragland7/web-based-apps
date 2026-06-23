<script>
export default {
  name: 'Balance',
  props: {
    balance: Number,
    denomination: String,
  },
  emits: ['update-balance'],
  data() {
    return {
      amount: 25,
    };
  },
  computed: {
    balanceString() {
      return `Account Balance: ${this.balance} ${this.denomination}`;
    },
    amountString() {
      return `Amount: ${this.amount} ${this.denomination}`;
    },
  },
  methods: {
    addBalance() {
      const newBalance = this.balance + this.amount;
      this.$emit('update-balance', newBalance);
    },
    subtractBalance() {
      if (this.balance >= this.amount) {
        const newBalance = this.balance - this.amount;
        this.$emit('update-balance', newBalance);
      }
    },
  },
};
</script>

<template>
    <h3>{{ balanceString }} {{ amountString }}</h3>

    <input type="range" v-model.number="amount" min="5" max="100" step="5"/>

    <div>
      <button @click="addBalance">Add</button>
      <button @click="subtractBalance">Subtract</button>
    </div>
</template>