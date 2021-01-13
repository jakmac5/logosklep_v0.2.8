<template>
  <div>
    <section>
      <input id="fileUpload" @change="onFileChange" type="file" hidden />

      <button class="button is-primary" slot="trigger" @click="chooseFiles">
        Prześlij zdjęcie!
      </button>
    </section>
  </div>
</template>

<script>
let uuid = require('uuid')
import { storage } from '@/plugins/firebase'
import { db } from '@/plugins/firebase'
export default {
  data() {
    return {
      image: '',
    }
  },
  props: ['bucket_path', 'dbdoc', 'dbcol', 'dbparam'],
  methods: {
    chooseFiles() {
      document.getElementById('fileUpload').click()
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      let image = new Image()
      let reader = new FileReader()
      let vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
      this.afterComplete(file,this.dbccol,this.dbdoc)
    },
    removeImage: function (e) {
      this.image = ''
    },

    async afterComplete(upload,dbcol,dbdoc) {
      let imageName = uuid.v1()
      this.isLoading = true
      try {
        console.log(this.bucket_path)
        //save image
        let file = upload
        let metadata = {
          contentType: 'image/png',
        }
        let storageRef = storage.ref()
        let imageRef = storageRef.child(`${this.bucket_path}/${imageName}.png`)

        await imageRef.put(file, metadata)
        let downloadURL = await imageRef.getDownloadURL()

if (!this.dbparam.empty) { // istnieje dbparam
console.log("this dbpara: ", this.dbparam)
  const queryref = db.collection('users').where('userId','==',this.dbparam.toString())
  const snapshot = await queryref.get()
  if (snapshot.empty){
    console.log('username profile picture not found')
  }
  else{ 
    snapshot.forEach(doc => {
    //  const userquery = doc.data()
      doc.ref.update({
        profile_picture: downloadURL
      })
}); 
  }
}
else{ 

  const usersRef = db.collection(this.dbcol).doc(this.dbdoc)

usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        db.collection(this.dbcol)
          .doc(this.dbdoc)
          .update({
            prace_links: [downloadURL, ...prace_links],
          })
      });
    } else {
      
      db.collection(this.dbcol)
          .doc(this.dbdoc)
          .set({
            prace_links: [downloadURL],
          })
}
});
            }



//        this.images.push({ src: downloadURL })
      } catch (error) {
        console.log(error)
      }
      console.log('OK')
    },
  },
}
</script>

<style lang="scss" scoped></style>
