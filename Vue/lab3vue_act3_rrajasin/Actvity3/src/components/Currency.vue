<script>
export default {
   props: {
      balance: Number,
   },
   data() {
      return {
         name: 'DB',
         currencyfrom: [
            { name: "USD", desc: "US Dollar" },
            { name: "EUR", desc: "Euro" },
            { name: "INR", desc: "Indian Rupee" },
            { name: "BHD", desc: "Bahraini Dinar" },
         ],
         convertfrom: "USD",
         convertto: "INR",
         amount: this.balance || "",
      };
   },
   watch: {
      balance(newBalance) {
         this.amount = newBalance;
      },
   },
   computed: {
      finalamount() {
         let to = this.convertto;
         let from = this.convertfrom;
         let final = 0;

         switch (from) {
            case "INR":
               if (to === "USD") final = this.amount * 0.016;
               if (to === "EUR") final = this.amount * 0.013;
               if (to === "INR") final = this.amount;
               if (to === "BHD") final = this.amount * 0.0059;
               break;
            case "USD":
               if (to === "INR") final = this.amount * 63.88;
               if (to === "EUR") final = this.amount * 0.84;
               if (to === "USD") final = this.amount;
               if (to === "BHD") final = this.amount * 0.38;
               break;
            case "EUR":
               if (to === "INR") final = this.amount * 76.22;
               if (to === "USD") final = this.amount * 1.19;
               if (to === "EUR") final = this.amount;
               if (to === "BHD") final = this.amount * 0.45;
               break;
            case "BHD":
               if (to === "INR") final = this.amount * 169.44;
               if (to === "USD") final = this.amount * 2.65;
               if (to === "EUR") final = this.amount * 2.22;
               if (to === "BHD") final = this.amount;
               break;
         }
         return final;
      },
   },
};
</script>

<template>
   <div id="databinding">
      <h1>Currency Converter</h1>

      <span>Enter Amount:</span>
      <input 
         type="number" 
         v-model.number="amount" 
         placeholder="Enter Amount" 
      /><br /><br />

      <span>Convert From:</span>
      <select v-model="convertfrom" style="width:150px; font-size:15px;">
         <option v-for="(a, index) in currencyfrom" :key="index" :value="a.name">
            {{ a.desc }}
         </option>
      </select>

      <span>Convert To:</span>
      <select v-model="convertto" style="width:150px; font-size:15px;">
         <option v-for="(a, index) in currencyfrom" :key="index" :value="a.name">
            {{ a.desc }}
         </option>
      </select><br /><br />

      <span>{{ amount }} {{ convertfrom }} equals {{ finalamount }} {{ convertto }}</span><br /><br />
   </div>
</template>