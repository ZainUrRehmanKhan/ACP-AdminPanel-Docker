<template>
  <div style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :title="isUpdate ? 'Edit Supplier' : 'Add New Supplier '"
      :data="formData"
      endpoint="/suppliers"
      return
    >
      <div class="span-2">
        <v-text-field
          v-model="suppliers.companyName"
          :rules="[required]"
          outlined
          dense
          label="Company Name"
        ></v-text-field>
        <v-text-field
          v-model="suppliers.person.name"
          :rules="[required]"
          outlined
          dense
          label="Supplier Name"
        ></v-text-field>
        <v-text-field
          v-model="suppliers.person.phone"
          :rules="[required]"
          outlined
          dense
          label="Mobile"
          hint="ex(XXX)XXX-XXXXX"
        ></v-text-field>
        <v-text-field
          v-model="suppliers.person.username"
          :rules="[required]"
          outlined
          dense
          label="Email"
          hint="Please Enter Your Email here"
        ></v-text-field>
        <v-checkbox v-model="suppliers.status" label="Active"></v-checkbox>
        <v-text-field
          v-model="suppliers.password"
          :rules="[!isUpdate ? required : true]"
          outlined
          dense
          label="Password"
          type="password"
          hint="Please Enter Complex Password here"
        ></v-text-field>
      </div>
      <div class="span-2">
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            id="file1"
            v-model="document1"
            outlined
            dense
            label="CR Paper"
            @change="deleteDoc(0)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate1"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            v-model="document2"
            outlined
            dense
            label="Chamber Card"
            @change="deleteDoc(1)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate2"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            v-model="document3"
            outlined
            dense
            label="Tharkees Baladi"
            @change="deleteDoc(2)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate3"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            v-model="document4"
            outlined
            dense
            label="ID Card of Sponsor"
            @change="deleteDoc(3)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate4"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            v-model="document5"
            outlined
            dense
            label="ID/Passport of Salesman"
            @change="deleteDoc(4)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate5"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            v-model="document6"
            outlined
            dense
            label="Any Other legal Document"
            @change="deleteDoc(5)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate6"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
        <div
          style="display: flex;flex-direction: row;justify-content: space-between"
        >
          <v-file-input
            v-model="document7"
            outlined
            dense
            label="Any other legal document"
            @change="deleteDoc(6)"
            ><template slot="append-outer"
              ><v-icon @click="downloadImage">mdi-download</v-icon>
            </template></v-file-input
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="expiryDate7"
            label="Expiry Date"
            type="date"
            outlined
            dense
          ></v-text-field>
        </div>
      </div>
    </SimpleForm>
  </div>
</template>

<script>
// import * as moment from 'moment'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Supplier } from '@/models/supplier'
import { required } from '@/common/lib/validator'
export default {
  name: 'SupplierForm',
  components: { SimpleForm },
  props: {
    suppliers: {
      type: Object,
      default: () => new Supplier()
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deletedData: [],
      date: null,
      document1: null,
      document2: null,
      document3: null,
      document4: null,
      document5: null,
      document6: null,
      document7: null,
      expiryDate1: null,
      expiryDate2: null,
      expiryDate3: null,
      expiryDate4: null,
      expiryDate5: null,
      expiryDate6: null,
      expiryDate7: null
      // documents: ['', '', '', '', '', '', ''],
      // expiryDates: ['', '', '', '', '', '', '']
    }
  },
  mounted() {
    if (this.isUpdate) {
      for (const doc of this.suppliers.documents) {
        switch (parseInt(doc.index)) {
          case 0:
            this.expiryDate1 = doc.expiryDate
            this.document1 = doc
            continue
          case 1:
            this.expiryDate2 = doc.expiryDate
            this.document2 = doc
            continue
          case 2:
            this.expiryDate3 = doc.expiryDate
            this.document3 = doc
            continue
          case 3:
            this.expiryDate4 = doc.expiryDate
            this.document4 = doc
            continue
          case 4:
            this.expiryDate5 = doc.expiryDate
            this.document5 = doc
            continue
          case 5:
            this.expiryDate6 = doc.expiryDate
            this.document6 = doc
            continue
          case 6:
            this.expiryDate7 = doc.expiryDate
            this.document7 = doc
        }
      }
    }
  },
  methods: {
    required,
    formData() {
      const formData = new FormData()
      if (this.isUpdate) {
        formData.append('_id', this.suppliers._id)
      }
      // if (!this.document1 || !this.document1._id) {
      //   formData.append('crPaper', this.document1)
      //   formData.append('expiryDate', this.expiryDate1)
      // } else if (!this.document2 || !this.document2._id) {
      //   formData.append('chamberCard', this.document2)
      //   formData.append('expiryDate', this.expiryDate2)
      // } else if (!this.document3 || !this.document3._id) {
      //   formData.append('tharkeesBaladi', this.document3)
      //   formData.append('expiryDate', this.expiryDate3)
      // } else if (!this.document4 || !this.document4._id) {
      //   formData.append('idCardOfSponsor', this.document4)
      //   formData.append('expiryDate', this.expiryDate4)
      // } else if (!this.document4 || !this.document4._id) {
      //   // formData.append('salesmanId', this.document5)
      //   // formData.append('expiryDate', this.expiryDate5)
      // } else if (!this.document4 || !this.document4._id) {
      //   // formData.append('legal1', this.document6)
      //   // formData.append('expiryDate', this.expiryDate6)
      // } else if (!this.document4 || !this.document4._id) {
      //   formData.append('idCardOfSponsor', this.document4)
      //   formData.append('expiryDate', this.expiryDate4)
      // }

      // patch documets
      if (this.isUpdate) {
        if (this.document1 && !this.document1._id) {
          // crpaper
          formData.append('files', this.document1)
          formData.append('expiryDate', this.expiryDate1)
          formData.append('index', 0)
        }
        if (this.document2 && !this.document2._id) {
          // chambercard
          formData.append('files', this.document2)
          formData.append('expiryDate', this.expiryDate2)
          formData.append('index', 1)
        }
        if (this.document3 && !this.document3._id) {
          // tharkeesbaladi
          formData.append('files', this.document3)
          formData.append('expiryDate', this.expiryDate3)
          formData.append('index', 2)
        }
        if (this.document4 && !this.document4._id) {
          // idcardsponser
          formData.append('files', this.document4)
          formData.append('expiryDate', this.expiryDate4)
          formData.append('index', 3)
        }
        if (this.document5 && !this.document5._id) {
          // salesid
          formData.append('files', this.document5)
          formData.append('expiryDate', this.expiryDate5)
          formData.append('index', 4)
        }
        if (this.document6 && !this.document6._id) {
          // legal1
          formData.append('files', this.document6)
          formData.append('expiryDate', this.expiryDate6)
          formData.append('index', 5)
        }
        if (this.document7 && !this.document7._id) {
          // legal2
          formData.append('files', this.document7)
          formData.append('expiryDate', this.expiryDate7)
          formData.append('index', 6)
        }
        if (this.deletedData) {
          for (const item of this.deletedData) {
            formData.append('deletedIndex', item)
          }
        }
      }

      // post documents
      if (!this.isUpdate) {
        if (this.document1) {
          // crpaper
          formData.append('files', this.document1)
          formData.append('expiryDate', this.expiryDate1)
          formData.append('index', 0)
        }
        if (this.document2) {
          // chambercard
          formData.append('files', this.document2)
          formData.append('expiryDate', this.expiryDate2)
          formData.append('index', 1)
        }
        if (this.document3) {
          // tharkeesbaladi
          formData.append('files', this.document3)
          formData.append('expiryDate', this.expiryDate3)
          formData.append('index', 2)
        }
        if (this.document4) {
          // idcardsponser
          formData.append('files', this.document4)
          formData.append('expiryDate', this.expiryDate4)
          formData.append('index', 3)
        }
        if (this.document5) {
          // salesid
          formData.append('files', this.document5)
          formData.append('expiryDate', this.expiryDate5)
          formData.append('index', 4)
        }
        if (this.document6) {
          // legal1
          formData.append('files', this.document6)
          formData.append('expiryDate', this.expiryDate6)
          formData.append('index', 5)
        }
        if (this.document7) {
          // legal2
          formData.append('files', this.document7)
          formData.append('expiryDate', this.expiryDate7)
          formData.append('index', 6)
        }
      }

      // supplier info
      formData.append('name', this.suppliers.person.name)
      formData.append('companyName', this.suppliers.companyName)
      formData.append('phone', this.suppliers.person.phone)
      formData.append('username', this.suppliers.person.username)
      formData.append('password', this.suppliers.password)
      formData.append('status', this.suppliers.status)
      // formData.append('name', 'nabeel')
      // formData.forEach((item) => console.log(item))
      return formData
    },
    downloadImage() {
      window.open(
        this.$axios.defaults.baseURL +
          '/uploads/' +
          this.suppliers.documents[0].name
      )
    },
    deleteDoc(i) {
      for (const item of this.suppliers.documents) {
        if (parseInt(item.index) === i) {
          this.deletedData.push(item.index)
          break
        }
      }
    }
  }
}
</script>

<style scoped></style>
