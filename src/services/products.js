import { http } from './config'

export default {

    list:() => {
        return http.get()
    },

    save:(product) => {
        return http.post('', product)
    },

    update:(product) => {
        return http.put('', product)
    },

    delete:(productId) => {
        return http.delete('/' + productId)
    }

}
