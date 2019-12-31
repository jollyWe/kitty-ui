<template>
  <div>
    mock
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    // api就是你线上的网址
    axios
      .get("/api/user/getUser", this.listQuery)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
