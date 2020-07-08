import { createStoreWithThis } from '@mpxjs/core'
import state from './state'
import getters from './getters'
import actions from './getters'
import mutations from './getters'

export default createStoreWithThis({
    state,
    getters,
    mutations,
    actions
})