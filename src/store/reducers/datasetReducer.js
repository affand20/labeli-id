const initialState = {
    item : [
        {id:1, file:'zonasi-merger.csv'},
        {id:2, file:'zonasi-filtered.csv'},
        {id:3, file:'zonasi-labeled.csv'}
    ],
    status: null,
    isUpload: null
}

const datasetReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_PROGRESS':
            state.status = 'uploading'
            state.isUpload = true
            console.log(state)
            return state
            break;
        case 'UPLOAD_DATASET':
            console.log('Upload Dataset', action.dataset)            
            state.status = 'success'
            state.isUpload = false
            console.log('state',state)
            return state
            break;
        case 'UPLOAD_DATASET_ERROR':
            console.log('Upload Dataset Error', action.error)
            state.status = 'failed'
            state.isUpload = false
            return state
            break;
        default:
            return state

    }    
}

export default datasetReducer