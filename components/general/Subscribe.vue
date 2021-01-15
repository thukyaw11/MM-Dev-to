<template>
<div>
  <div class="btn_parent_container mt-3">
  <div class="button_container px-2 d-flex align-center justify-center normal">
      {{ isSub ? 'Subscribed' : 'Subscribe'}}
  </div>
  </div>

<transition name="fade">
<div class="modal" v-if="modalVisible && !states.isComplete">
  <div class="modal-content">
    <div class="d-flex align-center heading-custom justify-space-between">
      <div class="d-flex align-center">
      <h1>Subscribe</h1><small class="ml-3"> It is free</small>
      </div>
      <div class="close_btn" @click="modalVisible = false">&times;</div>
    </div>
    <div>
  <div class="my-3 mt-10 input-box d-flex align-center">
    <input class="search_container px-3 flex-grow-1" placeholder="Name" autocomplete="off" v-model="payload.name"/>
  </div>
  <div class="my-3 mt-10 input-box d-flex align-center">
    <input class="search_container px-3 flex-grow-1" placeholder="Email" autocomplete="off" v-model="payload.email"/>
  </div>
    </div>

  <small v-if="states.hasError" class="red--text">{{states.errorText}}</small>
    <div class="btn_container mt-3">
     <div class="button_container px-2 d-flex align-center justify-center normal" @click="onSubscribe()">
      {{ states.isLoading ? 'Loading' : 'Subscribe'}}
  </div>
  </div>


  </div>
  </div>


<!-- complete modal -->
  <div class="modal-complete" v-if="states.isComplete">
    <div class="complete-content d-flex justify-space-between align-center">
      <h1 class="green--text">Thanks for subscription!</h1>
      <div class="close_btn" @click="states.isComplete = false">&times;</div>
    </div>
  </div>

</transition>
</div>
</template>

<script>
import Email from '@/api/services/Email'
import Ip from '@/api/services/Ip'
export default {
    data() {
      return {
        payload: {
          name: '',
          email: '',
          ip: ''
        },
        modalVisible: false,
        states: {
          hasError: false,
          errorText: '',
          isLoading: false,
          isComplete: false
        }
      }
    },
    methods: {
      onSubscribe() {
        const { name, email, ip } = this.payload
        if(name == '' || email == '' || ip == '' ) {
          return
        }
        this.setLoading(true);
        Email.subscribe(this.payload).then(({data}) => {
          if(data === 'same ip' || data === 'email exists') {
            this.setError('You have subscribed already!')
            this.setLoading(false);
          }else {
            this.setLoading(false);
            this.setComplete(true);
            this.modalVisible = false;
          }
        }).then(() => {
          if(process.browser){
          localStorage.setItem('subscribed', true);

          }
        }).catch(err => {
            this.setLoading(false);
            this.setComplete(true);
            this.modalVisible = false;
        })
      },
      setError(text){
        this.states.hasError = true;
        this.states.errorText = text
      },
      setLoading(value) {
        this.states.isLoading = value
      },
      setComplete(value) {
        this.states.isComplete =value
      },
      openModal() {
        if(this.isSub) {
          return 
        }

        this.modalVisible = true;
      }
        },
    created() {
      Ip.getIp().then(({data}) => {
        this.payload.ip = data.ip
      }).catch(err => {
        console.log(`err on fetching ip : ${err}`)
      })
      // setTimeout(() => {
      //           if(process.browser){
      //             if(localStorage.getItem('subscribe_alert')){
      //               return
      //             }
      //             else  {
      //             this.modalVisible = true;
      //             localStorage.setItem('subscribe_alert', true)
      //             }

      //           }

      // }, 3000);
    },
    computed: {

      isSub() {
        if(process.browser){
         if(localStorage.getItem('subscribed')) {
        return true
      }
      return false
      }
      
      }   
    },
    
}
</script>

<style scoped>
.btn_parent_container {
  width: 100px;
  float: right;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.heading-custom{
  font-family: 'Poppins';
}
.modal {
  position: fixed; 
  z-index: 10; 
  padding-top: 150px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.btn_container {
  max-width: 90px;
  float: right;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  min-height: 300px
}
.modal-complete {
    position: fixed; 
  z-index: 10; 
  padding-top: 200px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.complete-content {
  height: 100px;
  width: 90%;
    background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
}


.modal-content .search_container {
    border: none;
    outline: none;
    width: 100%;
}
.close_btn{
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  color: white;
  padding: 5px;
  cursor: pointer;
        -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
}
</style>