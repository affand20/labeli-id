const initialState = {
    // item : [
    //     {id:1, file:'zonasi-merger.csv'},
    //     {id:2, file:'zonasi-filtered.csv'},
    //     {id:3, file:'zonasi-labeled.csv'}
    // ],
    status: null,
    isUpload: null
}

const datasetReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'RESET_STATE':
            state.status = null
            state.isUpload = null
            return state
        case 'UPLOAD_PROGRESS':
            state.status = 'uploading'
            state.isUpload = true            
            return state
        case 'UPLOAD_DATASET':            
            state.status = 'success'
            state.isUpload = false            
            return state            
        case 'UPLOAD_DATASET_ERROR':            
            state.status = 'failed'
            state.isUpload = false
            return state            
        default:
            return state

    }    
}

export default datasetReducer