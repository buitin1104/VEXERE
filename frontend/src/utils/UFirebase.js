import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import {storage} from '../config/firebaseConfig'

export function uploadFirebase(file) {
	return new Promise((resolve, reject) => {
		if (!file) {
			console.log('No file selected.')
			reject(new Error('No file selected.'))
			return
		}

		const uniqueFileName = `${v4()}_${file.name}`
		const imageRef = ref(storage, `avatar/${uniqueFileName}`)

		uploadBytes(imageRef, file)
			.then(snapshot => {
				getDownloadURL(snapshot.ref)
					.then(downloadURL => {
						resolve(downloadURL)
					})
					.catch(error => {
						console.error('Error getting download URL:', error)
						reject(error)
					})
			})
			.catch(error => {
				console.error('Error uploading file:', error)
				reject(error)
			})
	})
}
