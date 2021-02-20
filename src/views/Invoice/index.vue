<template>
  <div v-if="this.invoice" class="p-10">
    <header>
      <h1 class="text-3xl font-bold">INVOICE</h1>
    </header>

    <section
      class="flex justify-between mt-5 px-2 py-3 border-t border-b border-black"
    >
      <div><span class="mr-5 font-bold">Date:</span> {{ getDate(this.invoice.createdAt) }}</div>
      <div><span class="mr-5 font-bold">Invoice No:</span> {{ this.invoice.id }}</div>
    </section>

    <section class="mt-8">
      <article class="w-1/4">
        <p class="text-lg font-bold mb-1 text-gray-500">Invoiced To</p>
        <p class="text-gray-900">{{ this.invoiceTo.name }}</p>
        <p class="text-gray-900">{{ this.invoiceTo.contact }}</p>
        <p class="text-gray-900">{{ this.invoiceTo.email }}</p>
      </article>
    </section>

    <section class="flex items-center justify-center mt-3">
      <div>
        <table class="table-fixed w-full rounded-lg my-5">
          <thead class="text-white w-full">
            <tr class="w-full bg-gray-100 mb-2 sm:mb-0">
              <th class="w-1/4 p-3 text-gray-500">ID</th>
              <th class="w-1/2 p-3 text-gray-500">Description</th>
              <th class="w-1/2 p-3 text-gray-500">Price</th>
            </tr>
          </thead>
          <tbody class="text-white w-full">
            <tr v-for="(invoice, index) in this.items" :key="invoice.id" class="w-full">
              <td class="w-1/4 text-center p-3 text-gray-900">{{ index + 1 }}</td>
              <td class="w-2/4 text-center p-3 text-gray-900">{{ invoice.item }}</td>
              <td class="w-1/4 text-center p-3 text-gray-900">{{ invoice.price }}</td>
            </tr>

            <tr class="bg-gray-50">
              <td colspan="2" class="w-3/4 text-right text-md font-bold p-3 text-gray-900">Total Price</td>
              <td class="w-1/4 text-center p-3 text-gray-900 font-bold">{{ this.invoice.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Invoice",
  data () {
    return {
      invoice: null,
      invoiceTo: null,
      items: null,

    }
  },
  methods: {
    getDate (data) {
      const date = new Date(data)

      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    },
    ...mapActions(["loadInvoiceDetails"]),
  },
  async mounted() {
    const { id } = this.$route.params;

    if (id) {
      try {
        const invoice = await this.loadInvoiceDetails({ id });

        console.log(invoice);
        this.invoice = invoice.data
        this.invoiceTo = invoice.data.Patient
        this.items = invoice.data.OrderBreakdowns
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
