<script>
import CsListItem from '../../../components/CsListItem.vue';
import CsListItems from '../../../components/CsListItems.vue';
import CsStep from '../../../components/CsStep.vue';
import CsSwitch from '../../../components/CsSwitch.vue';
import MainLayout from '../../../layouts/MainLayout.vue';

export default {
  components: {
    MainLayout,
    CsListItem,
    CsListItems,
    CsSwitch,
  },
  extends: CsStep,
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    toggleOnion() {
      this.isLoading = true;
      try {
        this.$account.toggleOnion();
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <MainLayout
    :title="$t('Tor')"
  >
    <CsListItems>
      <CsListItem
        :title="$t('Tor')"
        :description="$t('Route traffic through Tor network. Ensure that your Tor VPN is active.')"
        :arrow="false"
      >
        <template #after>
          <CsSwitch
            :checked="$isOnion"
            :isLoading="isLoading"
            :aria-label="$t('Route traffic through Tor network. Ensure that your Tor VPN is active.')"
            @click="toggleOnion"
          />
        </template>
      </CsListItem>
    </CsListItems>
  </MainLayout>
</template>
