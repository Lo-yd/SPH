<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
  </div>
</template>

<script>
  import ListContainer from '@/views/Home/ListContainer'
  import Recommend from '@/views/Home/Recommend'
  import Rank from '@/views/Home/Rank'
  import Like from '@/views/Home/Like'

  export default {
    name: 'Home',
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like
    }

  }
</script>

<style>
  
</style>