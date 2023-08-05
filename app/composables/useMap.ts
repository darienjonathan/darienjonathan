import { Loader } from '@googlemaps/js-api-loader'

const useMap = () => {
  const config = useRuntimeConfig().public
  const loader = ref<Loader>()

  const initializeLoader = () => {
    loader.value = new Loader({
      apiKey: config.googleApiKey,
      version: 'weekly',
    })
  }
  initializeLoader()

  return {
    loader,
  }
}

export default useMap
