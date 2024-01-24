import { menuList } from '../config/index'

import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            currentSrc: menuList[0].children[0].url,
            codeContent: ''
        }
    },
    actions: {
        setCodeContent(content) {
            this.codeContent = content
        },
        setCuurentSrc(src) {
            this.currentSrc = src
        }
    }
})