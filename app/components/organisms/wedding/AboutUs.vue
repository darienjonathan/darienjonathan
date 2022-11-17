<template lang="pug">
.about-us
  .heading__wrapper
    .heading {{ 'BRIDE & GROOM' }}
  .kv
    .kv__main {{ 'So let’s briefly introduce the “why” of marriage to set you up to make a wise choice about the “who.” A home established on Matthew 6:33—“Seek first the kingdom of God and His righteousness, and all these things shall be added to you” (NKJV)—is a glorious thing.' }}
    .kv__sub {{ 'Gary Thomas on "The Sacred Search"' }}
  .biodata
    .biodata__item
      img.biodata__image(src="@/assets/images/wedding/about-us/picture_groom.jpg")
      .biodata__info
        .biodata__name {{ 'DARIEN\nJONATHAN' }}
        .biodata__parents {{ 'Second son of\nPdt. Hasan Winata (✝) &\nHeniwati Suwardi' }}
    .biodata__item(data-order="reverse")
      img.biodata__image(src="@/assets/images/wedding/about-us/picture_groom.jpg")
      .biodata__info
        .biodata__name {{ 'DAISY\nCHRISTINA' }}
        .biodata__parents {{ 'Second daughter of\nSie Manule &\nWilyanti Tjahjana' }}
  .content
    .content__heading {{ 'we both do same things in different ways:' }}
    .content__item
      .content__value {{ 'Idk what I\'m playing' }}
      .content__label {{ 'Play Piano' }}
      .content__value {{ 'Classical' }}
    .content__item
      .content__value {{ 'Natural Science,\nJapanese Language' }}
      .content__label {{ 'Teach' }}
      .content__value {{ 'Classical Piano,\nBasic Coding for Children' }}
    .content__item
      .content__value {{ 'Japan\n(2016 - 2021)' }}
      .content__label {{ 'Lived Abroad\n(Long Live LDR!)' }}
      .content__value {{ 'UK\n(2022 - 2023)' }}
    .content__item
      .content__value {{ 'Anime' }}
      .content__label {{ 'Watch' }}
      .content__value {{ 'K-Drama' }}
</template>
<script lang="ts" setup></script>
<script lang="ts">
export default {
  name: 'AboutUs',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.heading {
  &__wrapper {
    margin-bottom: 60px;
  }

  & {
    @include font-family('marcellus');
    text-align: center;
    margin-bottom: 20px;
    @include pc {
      @include font($size: $font-xhuge);
    }
    @include sp {
      @include font($size: $font-huge);
    }
  }
}

.kv {
  & {
    @include font-family('marcellus');
    text-align: center;
    margin: 0 auto 60px;
    @include pc {
      padding: 0 40px;
      max-width: 1200px;
    }
    @include sp {
      width: 100%;
      padding: 0 20px;
    }
  }

  &__main {
    @include pc {
      margin-bottom: 8px;
    }
    @include sp {
      @include font($size: $font-sm, $line-height: 1.5);
      margin-bottom: 16px;
    }
  }

  &__sub {
    @include pc {
      @include font($size: $font-sm);
    }
    @include sp {
      @include font($size: $font-xs);
    }
  }
}

.biodata {
  & {
    @include flex($justify: space-evenly);
    max-width: 1200px;
    margin: 0 auto 60px;
  }

  &__item {
    @include pc {
      @include flex;
      &[data-order='reverse'] {
        flex-direction: row-reverse;
      }
    }
    @include sp {
      width: 50%;
    }
  }

  &__image {
    @include sp {
      width: 100%;
      margin-bottom: 16px;
      padding: 0 30px;
    }
    @include pc {
      width: 40%;
      padding: 0 30px;
    }
  }

  &__info {
    text-align: center;
  }

  &__name {
    @include font-family('marcellus');
    margin-bottom: 8px;
    font-weight: bold;
    @include pc {
      @include font($size: $font-xl);
    }
    @include sp {
      @include font($size: $font-lg);
      white-space: pre-line;
    }
  }

  &__parents {
    $line-height: 1.5;
    white-space: pre-line;
    @include pc {
      @include font($size: $font-m, $line-height: $line-height);
    }
    @include sp {
      @include font($size: $font-sm, $line-height: $line-height);
    }
  }
}

.content {
  & {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__heading {
    @include font-family('marcellus');
    text-align: center;
    margin-bottom: 20px;
    @include sp {
      @include font($size: $font-sm);
    }
  }

  &__item {
    display: grid;
    padding: 10px 0;
    align-items: center;
    text-align: center;
    @include pc {
      grid-template-columns: 1fr 175px 1fr;
    }
    @include sp {
      grid-template-columns: 1fr 120px 1fr;
    }
    &:nth-child(odd) {
      background-color: rgba($white, 0.15);
      box-shadow: 0 0 5px rgba($white, 0.15);
    }
  }

  &__label {
    white-space: pre-line;
    @include pc {
      padding: 0 12px;
    }
    @include sp {
      padding: 0 10px;
    }
  }

  &__value {
    @include font($size: $font-sm);
    @include pc {
      padding: 0 12px;
    }
    @include sp {
      padding: 0 10px;
      white-space: pre-line;
    }
    &:first-child {
      text-align: right;
    }
    &:last-child {
      text-align: left;
    }
  }
}
</style>
