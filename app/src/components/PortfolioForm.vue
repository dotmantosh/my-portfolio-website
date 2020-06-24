<template>
  <div class="main">
    <div @click="$emit('setComponentToMount', 'main')" class="back--icon">
      <i class="fas fa-long-arrow-alt-left"></i>
    </div>
    <div class="form--title">
      <h1>Upload a Work</h1>
    </div>
    <form @submit.prevent class="form">
      <small v-if="workInfoError" class="danger">{{workInfoError}}</small>
      <div class="form-item-ui">
        <label for="work-ui" class="work-ui-label">
          <input
            @change="onFileChange"
            type="file"
            name="work-ui"
            ref="file"
            id="work-ui"
            class="work-ui"
          />
          <p class="text-center">
            <i class="fas fa-upload work-ui-icon"></i>Click to upload your work ui
          </p>
          <small v-if="workInfoForm.workUi" class="is-uploading">{{workInfoForm.workUi.name}}</small>
        </label>
        <small>upload your work user interface. (e.g. screenshot of your work home page)</small>
      </div>
      <div class="form-item">
        <label for="work-title">Title</label>
        <input
          v-model="workInfoForm.workTitle"
          type="text"
          name="title"
          id="work-title"
          placeholder="Work title"
        />
      </div>
      <div class="form-item">
        <label for="work-link-1">Most important link to your work, preferable home page.</label>
        <input
          v-model="workInfoForm.workLink1"
          type="text"
          name="work-link-1"
          id="work-link-1"
          placeholder="Work link 1  (e.g myportfoliowebsite.com)"
        />
        <small>(optional)</small>
      </div>
      <div class="form-item">
        <label for="work-link-2">Another link you'd like the viewer to see</label>
        <input
          v-model="workInfoForm.workLink2"
          type="text"
          name="work-link-2"
          id="work-link-2"
          placeholder="Work link 2 (e.g github repo, /about, /services etc)"
        />
        <small>(optional)</small>
      </div>
      <div class="form-item">
        <label for="work-link-3">Another link you'd like the viewer to see</label>
        <input
          v-model="workInfoForm.workLink3"
          type="text"
          name="work-link-3"
          id="work-link-3"
          placeholder="Work link 3 (e.g github repo, /about, /services etc)"
        />
        <small>(optional)</small>
      </div>
      <div class="form-item">
        <label for="work-link-4">Another link you'd like the viewer to see</label>
        <input
          v-model="workInfoForm.workLink4"
          type="text"
          name="work-link-4"
          id="work-link-4"
          placeholder="Work link 4 (e.g github repo, /about, /services etc)"
        />
        <small>(optional)</small>
      </div>
      <div class="form-item">
        <label for="work-description">What's your work all about (Describe your work)</label>
        <textarea
          v-model="workInfoForm.workDescription"
          name="work-description"
          id="work-description"
        ></textarea>
      </div>
      <button
        @click.prevent="createWork"
        :disabled="this.isClicked"
        type="button"
        class="work-submit"
      >{{isClicked? 'Uploading work...': 'Submit'}}</button>
    </form>
  </div>
</template>

<script>
import WorkService from "../services/WorkService";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      workInfoForm: {
        workTitle: "",
        workLink1: "",
        workLink2: "",
        workLink3: "",
        workLink4: "",
        workDescription: "",
        workUi: undefined
      },
      workInfoError: null,
      isClicked: false
    };
  },
  computed: {
    ...mapState(["workInfo"])
  },
  methods: {
    ...mapActions(["setWorkInfo"]),
    onFileChange(e) {
      let files = e.target.files[0];
      if (!files) {
        return;
      }
      this.workInfoForm.workUi = files;
    },
    async createWork() {
      this.isClicked = true;
      let formData = new FormData();
      formData.append("files", this.workInfoForm.workUi);
      formData.append("workTitle", this.workInfoForm.workTitle);
      formData.append("workLink1", this.workInfoForm.workLink1);
      formData.append("workLink2", this.workInfoForm.workLink2);
      formData.append("workLink3", this.workInfoForm.workLink3);
      formData.append("workLink4", this.workInfoForm.workLink4);
      formData.append("workDescription", this.workInfoForm.workDescription);

      try {
        await WorkService.setWork(formData);
        const workInfo = (await WorkService.getWorks()).data;
        this.setWorkInfo(workInfo);
        this.$emit("setComponentToMount", "main");
      } catch (error) {
        if (error.response.data.error) {
          this.isClicked = false;
          return (this.workInfoError = error.response.data.error);
        }

        if (error.response.data.message) {
          this.isClicked = false;
          return (this.workInfoError = error.response.data.message);
        }
        if (error.response.data) {
          this.isClicked = false;
          return (this.workInfoError = error.response.data);
        }
        if (error.message) {
          this.isClicked = false;
          return (this.workInfoError = error.message);
        }

        if (error) {
          this.isClicked = false;
          return (this.workInfoError = error);
        }
      }
    }
  }
};
</script>


<style scoped>
.main {
  padding: 2rem 5rem 2rem 2rem;
  width: 95%;
}
.back--icon {
  width: 5rem;
  border: 1px solid transparent;
}
.back--icon i {
  font-size: 4rem;
  text-align: center;
  margin: 0 auto;
  display: block;
}
.back--icon:hover {
  color: #222;
  cursor: pointer;
  border: 1px dashed #222;
}
.back--icon:hover i {
  color: #222;
}
.form--title {
  font-size: 2rem;
  text-align: center;
}

.is-uploading {
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
}

.form {
  margin: 0 auto;
  padding: 1rem 2rem;
  margin-top: 2rem;
  max-width: 50rem;
}

.form-item {
  margin-bottom: 2.5rem;
}

.form-item input {
  width: 100%;
  display: block;
  /* margin: 0 auto; */
  font-size: 1.3rem;
  padding: 1rem 2rem;
  font-family: inherit;
  outline: none;
  /* border: none; */
  letter-spacing: 0.15rem;
}
.form-item textarea {
  width: 100%;
  height: 12rem;
  display: block;
  /* margin: 0 auto; */
  font-size: 1.3rem;
  padding: 1rem 2rem;
  font-family: inherit;
  outline: none;
  /* border: none; */
  letter-spacing: 0.15rem;
}

.form-item input:focus {
  outline: none;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
}

.form-item label {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  display: block;
  font-weight: 500;
  margin-left: 2rem;
}

.work-ui {
  display: block;
  position: absolute;
  top: -9999%;
}
.work-ui-label {
  border: 1px solid rgba(119, 119, 119, 0.75);
  display: block;
  padding: 2rem 0;
  position: relative;
}
.work-ui-label:hover {
  cursor: pointer;
}
.work-ui-label p {
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-grey-dark-2);
}

small {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-left: 2rem;
  display: block;
}

.work-ui-icon {
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 4rem;
  color: var(--color-grey-dark-2);
}
.work-submit {
  display: block;
  text-align: center;
  background-image: linear-gradient(
    to right bottom,
    var(--color-secondary-light),
    var(--color-secondary-dark)
  );
  padding: 1rem 0;
  font-size: 1.5rem;
  width: 100%;
  border: none;
  margin-top: 2rem;
  color: var(--color-grey-light-1);
  border-radius: 2px;
}
.form-item-ui {
  margin-bottom: 2.5rem;
}
</style>