<script>
import CsPinStep from '../../components/CsPinStep.vue';
import CsSteps from '../../components/CsSteps.vue';

import CsSelectCryptosStep from '../../components/CsSelectCryptosStep.vue';
import UnlockStepIndex from './UnlockStepIndex.vue';
import UnlockStepSynchronization from './UnlockStepSynchronization.vue';

export default {
  components: {
    CsSteps,
  },
  steps: {
    index: UnlockStepIndex,
    synchronization: UnlockStepSynchronization,
    pin: CsPinStep,
    selectCryptos: CsSelectCryptosStep,
  },
};
</script>

<template>
  <CsSteps
    :steps="$options.steps"
  />
</template>
