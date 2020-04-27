<template>
  <v-data-table :headers="headers" :items="users"  show-expand sort-by="calories" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="mr-5">Mã Khách Hàng:  {{idCustomer}}          </v-toolbar-title>
        <v-toolbar-title >Tên Khách Hàng: {{nameCustomer}}  </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="Mã Điện Kế"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.cscu" label="Chỉ số cũ"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.csmoi" label="Chỉ số mới"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field readonly v-model="editedItem.thang" label="Tháng"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field readonly v-model="editedItem.trangthai" label="Trạng thái"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save(editedItem)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      <router-link to="/dienke/customer/:id">
        <v-icon small class="mr-2"  large color="blue darken-2" @click="infoUser(item)">mdi-message-text</v-icon>
      </router-link>
    </template>
    
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Mã Điện Kế",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Chỉ số cũ", value: "cscu" },
      { text: "Chỉ số mới", value: "csmoi" },
      { text: "Tháng", value: "thang" },
      { text: "Trạng thái", value: "trangthai" },
      { text: "Actions", value: "actions", sortable: false },
       { text: '', value: 'data-table-expand' }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      address: 0,
      phone: 0,
      id: 0
    },
    defaultItem: {
      name: "",
      address: 0,
      phone: 0,
      id: 0
    },
  }),
  computed: {
    users() {
      return this.$store.state.infoUser;
    },
    idCustomer(){
      return this.$store.state.idCustomer
    },
    nameCustomer(){
      return this.$store.state.nameCustomer
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {},
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      //  const index = this.users.indexOf(item);
      // console.log(item.id)
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteUser", item);
    },
    infoUser(itemUser){
      this.$store.dispatch('infoUser',itemUser.id)
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save(editItem) {
      if (
        editItem.name == "" ||
        editItem.address == "" ||
        editItem.phone == ""
      ) {
        alert("Vui lòng điền đầy đủ thông tin");
      } else {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem),
            this.$store.dispatch("updateUser", editItem);
        } else {
          this.users.push(this.editedItem);
        }
        this.close();
      }
    }
  },
  
};
</script>

