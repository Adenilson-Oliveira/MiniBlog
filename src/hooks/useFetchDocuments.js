import {useState, useEffect} from 'react'
import {db} from '../firebase/config'
import { collection, query, orderby, onSnapshot, where} from 'firebase/firestore'


export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadData() {
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {

                let q

                q = await query(collectionRef, orderby('createdAt', 'desc'))

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => {
                            id: doc.id,
                            doc.data()
                        })
                    )
                })
                
            } catch (error) {
                console.log(error)
                setError(error.message)
            }

        }

        loadData()

    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {documents, loading, error}

}