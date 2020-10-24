
<template>
  <div id="FileUpload">
    <vue-dropzone
      ref="imgDropZone"
      id="customdropzone"
      :options="dropzoneOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
    <div v-if="images.length > 0" class="image-div">
      <div v-for="image in images" :key="image.src">
        <img :src="image.src" class="image" />
      </div>
    </div>
  </div>
</template>

<script>
//TODO upload to firebase after submit click and SECURITY THIRD
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import {db} from '@/plugins/firebase'

let uuid = require("uuid");
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  props: ['bucket_path','dbdoc','dbcol'],
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        dictDefaultMessage: `<p class='text-default'><i class='fa fa-cloud-upload mr-2'></i> Drag Images or Click Here</p>
          <p class="form-text">Allowed Files: .jpg, .jpeg, .png</p>
          `
      },
      images: []
    };
  },
  methods: {
    async afterComplete(upload) {
      let imageName = uuid.v1();
      this.isLoading = true;
      try {
        console.log(this.bucket_path)
        //save image
        let file = upload;
        let metadata = {
          contentType: "image/png"
        };
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child(`${this.bucket_path}/${imageName}.png`);

        await imageRef.put(file, metadata);
        let downloadURL = await imageRef.getDownloadURL();

        db.collection(dbcol).doc(dbdoc).update({
          prace_links: [downloadURL, ...prace_links],
        })
        
        this.images.push({ src: downloadURL }); 
      } catch (error) {
        console.log(error);
      }
      this.$refs.imgDropZone.removeFile(upload);
    }
  }
};
</script>

<style>
.image-div {
  display: flex;
  margin: 25px;
}
.image {
  max-width: 250px;
  margin: 15px;
}
</style>

    