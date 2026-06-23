<template>
  <div>
    <HelloRagland :name="userName" />

    <Balance 
      :amount="amount" 
      :balance="balanceAmount" 
      :denomination="denomination" 
      @update-balance="updateBalanceAmount" 
    />

    <Currency 
      :balance="balanceAmount" 
      :denomination="denomination" 
      @update-denomination="updateDenomination" 
      @change-amount="setAmount" 
    />
  </div>
</template>

<script>
import HelloRagland from './components/HelloRagland.vue';
import Balance from './components/Balance.vue';
import Currency from './components/Currency.vue';

export default {
  data() {
    return {
      userName: 'Ragland',
      balanceAmount: 100,
      amount: 25,
      denomination: 'USD',
    };
  },
  methods: {
    updateDenomination(newDenomination) {
      this.denomination = newDenomination;
    },
    updateBalanceAmount(newBalance) {
      this.balanceAmount = newBalance;
    },
    setAmount(newAmount) {
      this.amount = newAmount;
    },
  },
  components: {
    HelloRagland,
    Balance,
    Currency,
  },
};
</script>