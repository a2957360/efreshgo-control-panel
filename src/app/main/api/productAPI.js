import axios from '../../../global/axios'

const productAPI = {
    addNewProductCategory: async () => {
        const dataReceived = {
            "categoryTitle":"test_2",
            "categoryType":"0",
            "categoryParentId":"0",
            "language":"Zh"
        }
        
       const result = await axios.post('/categoryModule.php', dataReceived)
       return result.data
    }
}

export default productAPI