<template>
  <div>
    <course-delegate :is-edit="true" />
  </div>
</template>

<script>
  import CourseDelegate from './CourseDelegate.vue'

  export default {
    name: 'EditForm',
    components: {
      CourseDelegate
    }
  }

</script>
