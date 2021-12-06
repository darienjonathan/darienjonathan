import useStorage from '~/composables/firebase/storage/useStorage'

const BASE_PATH = '/assets'

const useStorageItems = () => {
  const usePosts = () => useStorage(`${BASE_PATH}/posts`)
  const useImages = () => useStorage(`${BASE_PATH}/images`, ['image/jpeg', 'image/png'])
  const useVideos = () => useStorage(`${BASE_PATH}/videos`)
  return {
    usePosts,
    useImages,
    useVideos,
  }
}

export default useStorageItems
