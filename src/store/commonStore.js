import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            codeContent: ''
        }
    },
    actions: {
        setCodeContent(content) {
            this.codeContent = content
        }
    }
})