<template>
  <div>
    活动列表
    <!--<div :key="index" v‐for="(item,index) in items">-->
    <!--{{ item.name }}-->
    <!--</div>-->
    {{ items }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
    asyncData () {
        return axios.get('https://www.easy-mock.com/mock/5c8a5b3058b0022d26205fc9/gathering/1').then((res) => {
            return { items: res.data.data }
        })
    }
}
</script>
