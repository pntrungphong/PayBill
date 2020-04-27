<template>
  <v-data-table :headers="headers" :items="users"  show-expand sort-by="calories" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>KHÁCH HÀNG</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.name" label="Tên Khách Hàng"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.address" label="Địa Chỉ"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field readonly v-model="editedItem.id" label="Mã Khách Hàng"></v-text-field>
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
      <router-link :to="{name:'dienke-user',params:{id:item.id}}">
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
    idCustomer:'',
    nameCustomer:'',
    dialog: false,
    headers: [
      {
        text: "Tên Khách Hàng",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Địa Chỉ", value: "address" },
      { text: "Phone", value: "phone" },
      { text: "Mã Khách Hàng", value: "id" },
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
    }
  }),
  computed: {
    users() {
      return this.$store.state.users;
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
      this.$store.dispatch('infoUser',itemUser.id),
      this.$store.state.idCustomer=itemUser.id,
      this.$store.state.nameCustomer=itemUser.name,
      console.log(this.$store.state.idCustomer,this.$store.state.nameCustomer)
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
  mounted() {
    this.$store.dispatch("loadUsers");
  }
};
</script>