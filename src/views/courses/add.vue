<template>
  <div>
    <course-delegate :is-edit="false" />
  </div>
</template>

<script>
  import CourseDelegate from './CourseDelegate.vue'

  export default {
    name: 'CreateForm',
    components: {
      CourseDelegate
    }
  }

</script>
