import axios from 'axios'

export const resetState = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'RESET_STATE' })        
    }
}

export const uploadDataset = (dataset) => {    

    return (dispatch, getState, { getFirebase, getFirestore }) => {

        dispatch({ type: 'UPLOAD_PROGRESS' })

        const firestore = getFirestore();        
        const storage = getFirebase();

        // upload file ke firebase storage
        storage.uploadFile('dataset', dataset, 'dataset')            
            .then(({uploadTaskSnapshot}) => (uploadTaskSnapshot))
            .then(({ref})=> (ref.getDownloadURL()))
            .then((url) => {                
                // insert data ke firestore
                return firestore.collection('datasets')
                    .add({
                        file : dataset.name,
                        authorId : 12345,
                        url : url,
                        createdAt : new Date()
                    })
                    .then((ref) => {
                        
                        axios({
                            method: 'post',
                            url: 'http://localhost:8000/dataset',
                            data: {
                                url: url,
                                ownerId: '123',
                                datasetId: ref.id
                            }
                        }).then((res) => {                            
                            dispatch({ type: 'UPLOAD_DATASET', dataset })
                        })
                    })
                    .catch((err) => {
                        dispatch({ type: 'UPLOAD_PROJECT_ERROR', err })
                    })
            })
            .catch((err) => {
                dispatch({ type: 'UPLOAD_PROJECT_ERROR', err })
            })
    }
}