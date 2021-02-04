<template>
  <v-list
    expand
    nav
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-for="(item, i) in items"
    >
      <template v-if="item.hide === undefined || item.hide === false">
        <default-list-group
          v-if="item.items"
          :key="`group-${i}`"
          :item="item"
        />
        <default-list-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'PrivateList',

    components: {
      DefaultListGroup: () => import('./ListGroup'),
      DefaultListItem: () => import('./ListItem'),
    },

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
