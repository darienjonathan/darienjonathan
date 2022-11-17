<template lang="pug">
.venue-reception
  .content
    .content__heading {{ 'VENUE' }}
    .content__subheading {{ 'Please join us for the wedding reception, which is going to be held at:' }}
    .content__item
      .location__info
        .location__name {{ 'Sailendra Restaurant - JW Marriott Hotel Jakarta' }}
        .location__date {{ 'Saturday, 6 January 2024, 18:00 WIB' }}
      .location__map(ref="mapElementRef")
  .content
    .content__heading {{ 'RSVP' }}
    .content__item
      .rsvp__info
        .rsvp__description
          span.rsvp__description-text {{ 'Due to limited space, We kindly ask your cooperation confirm your attendance to the dinner reception before ' }}
          span.rsvp__description-text.rsvp__description-text--focus {{ 'November 30, 2023.' }}
        .rsvp__note 
          .rsvp__note-text.rsvp__note-text--focus {{ 'Unconfirmed attendance is considered as not attending.' }}
          .rsvp__note-text {{ ' We kindly thank you for your understanding.' }}
      .rsvp__form
        MInput.input(:label="'Name'") {{ userData.name }}
        MInput.input(:label="'Are you attending?'")
          .radio
            input.radio__item(
              @click="isAttending = true"
              name="attendance"
              :value="isAttending"
              type="radio"
            )
            .radio__label Yes
          .input__item.radio
            input.radio__item(
              @click="isAttending = false"
              name="attendance"
              :value="!isAttending"
              type="radio"
            )
            .radio__label No
        template(v-if="isAttending")
          transition(
            name="fade-top"
            appear
          )
            div
              MInput.input(
                :label="'Phone Number'"
                :error-text="isPhoneNumberError && 'Please input only numbers'"
              )
                select.phone-number__code-select(
                  name="phoneNumber"
                  :value="phoneCodeNumber"
                  @change="handlePhoneCodeChange"
                )
                  option(
                    v-for="phoneCode in phoneCodeList"
                    :value.num="phoneCode.number"
                  ) {{ phoneCode.country }}
                .phone-number__break
                .phone-number__number
                  .phone-number__code {{ `+${phoneCodeNumber}` }}
                  input.phone-number__input(
                    type="text"
                    @change="handlePhoneNumberChange"
                  )
              .input
              MInput.input(
                :label="'Number of Guests'"
                :note-text="'※ over 12 years old, including yourself'"
              )
                select.guest-number__input(
                  name="guestNumber"
                  :value="guestNumber"
                  @change="handleGuestNumberChange"
                )
                  option(
                    v-for="number in userData.maxGuestNumber"
                    :value.num="number"
                  ) {{ number }}
              MInput.input(
                :label="'Number of Children'"
                :note-text="'※ max. 12 years old'"
              )
                select.children-number__input(
                  name="guestNumber"
                  :value="childrenNumber"
                  @change="handleChildrenNumberChange"
                )
                  option(
                    v-for="number in maxChildrenNumber + 1"
                    :value.num="number - 1"
                  ) {{ number - 1 }}
              .input__note {{ '※ Your data will only be used for RSVP purposes. The data will be deleted after the wedding event concludes.' }}
  .matrimony-invitation
    span.matrimony-invitation__text {{ 'We would also like to ask for your blessing by attending the Holy Matrimony' }}
    span.matrimony-invitation__text.matrimony-invitation__text--focus {{ ' (details below):' }}
</template>
<script lang="ts" setup>
import { phoneCodeList } from '~/utils/phone'
import MInput from '~/components/molecules/wedding/MInput.vue'

// --------------------------------------------------
// Maps
// --------------------------------------------------

const mapElementRef = ref<HTMLDivElement>()
const { loader } = useMap()

const loadMap = () => {
  if (!loader.value) return
  loader.value.load().then(() => {
    const position = { lat: -6.2272498, lng: 106.8273196 }

    const infoWindowContent = `
<div class="address">
  <div class="address__title">JW Marriott Hotel Jakarta</div>
  <div class="address__text">Kawasan Mega Kuningan, Jl. Dr. Ide Anak Agung Gde Agung Kav. E.1.2 No 1&2, Jakarta</div>
  <div class="address__link">
    <div class="link__icon material-icons-outlined">map</div>
    <a class="link__href" target="_blank" href="https://goo.gl/maps/EhjPCBC4ENWtDgWeA">Open in Google Maps</a>
  </div>
</div>
    `

    const map = new google.maps.Map(mapElementRef.value, {
      center: position,
      zoom: 16,
      mapTypeControlOptions: {
        mapTypeIds: ['ROADMAP'],
      },
      mapId: '67c94aa1464993bf',
    })
    const marker = new google.maps.Marker({
      position,
      map,
    })
    const infoWindow = new google.maps.InfoWindow({ content: infoWindowContent })

    const openInfoWindow = () => {
      infoWindow.open({
        anchor: marker,
        map,
      })
    }
    marker.addListener('click', openInfoWindow)
    openInfoWindow()
  })
}

watch(loader, loadMap, {
  immediate: true,
})

// --------------------------------------------------
// Form
// --------------------------------------------------

const maxChildrenNumber = 1

const userData = {
  name: 'Darien Jonathan',
  maxGuestNumber: 2,
}

const isAttending = ref(false)
const phoneCodeNumber = ref<number>(phoneCodeList.find(c => c.isDefault)?.number)
const handlePhoneCodeChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  phoneCodeNumber.value = Number(target.value)
}

const phoneNumber = ref<number>()
const isPhoneNumberError = ref(false)
const handlePhoneNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const inputtedPhoneNumber = Number(target.value)
  phoneNumber.value = inputtedPhoneNumber
  isPhoneNumberError.value = isNaN(inputtedPhoneNumber)
}

const guestNumber = ref(1)
const handleGuestNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  guestNumber.value = Number(target.value)
}

const childrenNumber = ref(0)
const handleChildrenNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  childrenNumber.value = Number(target.value)
}
</script>
<script lang="ts">
export default {
  name: 'VenueReception',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.venue-reception {
  background-image: linear-gradient(
    to bottom,
    $wedding_brown 0,
    $wedding_brown calc(100% - 20px),
    transparent
  );
  padding: 60px 20px;
}

.content {
  & {
    margin: 0 auto 40px;
    @include pc {
      max-width: 1200px;
    }
  }

  &__heading,
  &__subheading {
    @include font-family('marcellus');
    text-align: center;
    margin-bottom: 40px;
  }

  &__heading {
    @include pc {
      @include font($size: $font-xhuge);
    }
    @include sp {
      @include font($size: $font-huge);
    }
  }

  &__item {
    width: 100%;
    @include pc {
      @include flex($justify: space-around);
    }
  }
}
.location {
  &__info {
    @include font-family('roboto-slab');
    text-align: right;
    @include pc {
      margin-right: 32px;
    }
  }

  &__name {
    @include pc {
      @include font($size: $font-xxl);
      margin-bottom: 12px;
    }
    @include sp {
      @include font($size: $font-xl);
      margin-bottom: 4px;
    }
  }
  &__date {
    @include sp {
      @include font($size: $font-sm);
      margin-bottom: 16px;
    }
  }

  &__map {
    width: 100%;
    height: 500px;

    :deep(.address) {
      @include font-family('cabin');
      padding: 4px;
    }

    :deep(.address__title),
    :deep(.address__text) {
      @include font($size: $font-sm, $line-height: 1.25, $color: $wedding_brown);
    }

    :deep(.address__title) {
      font-weight: bold;
      padding-bottom: 2px;
    }

    :deep(.address__text) {
      padding-bottom: 4px;
    }

    :deep(.address__link) {
      @include flex($justify: flex-start);
      border-bottom: 1px solid $wedding-brown;
      padding-bottom: 2px;
      width: fit-content;
    }

    :deep(.link__icon) {
      @include font($size: $font-sm, $color: $wedding_brown);
      margin-right: 4px;
    }

    :deep(.link__href) {
      @include font($size: $font-sm, $color: $wedding_brown);
      text-decoration: none;
    }
  }
}

.rsvp {
  $content-margin: 30px;
  &__heading {
    @include font-family('marcellus');
    @include font($size: $font-huge);
    text-align: center;
  }
  &__form {
    width: 100%;
    padding: 12px;
    border: 1px solid $white;
    box-shadow: 0 0 5px $white;
    @include pc {
      max-width: calc(50% - $content-margin);
      margin-right: $content-margin;
      order: 0;
    }
  }
  &__info {
    @include font-family('roboto-slab');
    margin-left: auto;
    @include pc {
      max-width: calc(50% - $content-margin);
      margin-left: $content-margin;
      order: 1;
    }
    @include sp {
      margin-bottom: 20px;
    }
  }
  &__description {
    margin-bottom: 12px;
    &-text--focus {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  &__note {
    @include font($size: $font-sm);
    &-text--focus {
      font-weight: bold;
    }
  }
}

.input {
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &__note {
    @include font($size: $font-xs);
    margin-top: 8px;
  }
}

.radio {
  @include flex($justify: flex-start);
  margin-right: 8px;

  &__item {
    cursor: pointer;
    margin-right: 4px;
  }
}

.phone-number {
  &__code-select,
  &__number {
    min-width: 0;
  }

  &__code-select {
    @include sp {
      width: 100%;
      margin-bottom: 4px;
    }
  }

  &__code {
    margin-right: 4px;
    @include pc {
      margin-left: 4px;
    }
  }

  &__break {
    flex-basis: 100%;
    @include pc {
      display: none;
    }
  }

  &__number {
    @include flex($justify: flex-start);
  }

  &__input {
    min-width: 0;
    @include pc {
      width: 120px;
    }
  }
}

.guest-number {
  &__input {
    @include sp {
      width: 100%;
    }
  }
}

.children-number {
  &__input {
    @include sp {
      width: 100%;
    }
  }
}

.matrimony-invitation {
  &__text {
    @include font($size: $font-sm);
    &--focus {
      font-weight: bold;
    }
  }
}
</style>
