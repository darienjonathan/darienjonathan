import { Loader } from '@googlemaps/js-api-loader'

const useMap = () => {
  const config = useRuntimeConfig()
  const loader = ref<Loader>()

  const initializeLoader = () => {
    loader.value = new Loader({
      apiKey: config.googleApiKey as string,
      version: 'weekly',
    })
  }
  initializeLoader()

  return {
    loader,
  }
}

export default useMap
