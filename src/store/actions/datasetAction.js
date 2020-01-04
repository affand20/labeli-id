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

        const file = dataset.file        

        // upload file ke firebase storage
        storage.uploadFile('dataset', file, 'dataset')            
            .then(({uploadTaskSnapshot}) => (uploadTaskSnapshot))
            .then(({ref})=> (ref.getDownloadURL()))
            .then((url) => {                
                // insert data ke firestore
                return firestore.collection('datasets')
                    .add({
                        file : file.name,
                        authorId : dataset.uid,
                        nama : dataset.nama,
                        url : url,
                        createdAt : new Date()
                    })
                    .then((ref) => {
                        
                        axios({
                            method: 'post',
                            url: 'https://labeli.himsiunair.com/dataset',
                            data: {
                                url: url,
                                ownerId: dataset.uid,
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