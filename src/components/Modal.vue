<template>
  <section :class="show ? 'show' : 'close'" class="modal-container">
    <section class="modal bg-white w-1/3 rounded shadow">
      <section class="modal__header">
        <div>
          <slot name="header" />
        </div>
      </section>
      <section class="modal__body">
        <div>
          <slot />
        </div>
      </section>
      <section class="modal__footer">
        <div>
          <slot name="footer" />
        </div>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  justify-content: center;
  background-color:rgba(0,0,0,0.5);
  align-items: center;
  &.close {
    display: none;
  }
  &.show {
    display: flex;
  }
}
</style>