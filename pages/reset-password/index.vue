<template>
  <div class="main-container">
    <img src="~/assets/acp_logo.png" width="540" alt="image.jpg" />
    <v-card class="login-container">
      <v-text-field v-model="email" label="Enter Email" outlined></v-text-field>
      <v-btn
        elevation="0"
        width="100%"
        height="50px"
        color="#F9610C"
        style="color: white"
        @click="sendEmail"
        >Reset Password</v-btn
      >
    </v-card>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog1" persistent max-width="400">
          <v-card>
            <v-card-text class="headline grey lighten-4"
              >this email doesn't exist</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                to="/login"
                @click="dialog1 = false"
                >Ok</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">
              Reset Password
            </v-card-title>
            <v-card-text
              >Please check your email to reset your password</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                to="/login"
                @click="dialog = false"
                >Ok</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'none',
  data() {
    return {
      email: '',
      dialog: false,
      dialog1: false
    }
  },
  methods: {
    async sendEmail() {
      try {
        const res = await this.$axios.post('/persons/forgotpassword', {
          email: this.email
        })
        this.dialog = true
        // this.$router.push('/login')
        return res
      } catch (e) {
        this.dialog1 = true
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.main-container
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  background: #343a40
  flex-direction: column
  justify-content: center

.login-container
  width: 560px
  padding: 30px
</style>
