<template lang="pug">
.proposal
  Transition(
    name="fade"
    mode="out-in"
  )
    template(v-if="!isUnlocked")
      .unlock__wrapper
        .unlock__box
          .unlock__heading Please prove your identity:
          input.unlock__input(
            :data-style="unlockInputStyle"
            type="password"
            @input="handleChangePassword"
          )
          button.unlock__submit-btn(
            @click="handleSubmitPassword"
            :disabled="!isPasswordChanged"
          ) Submit
    template(v-else)
      .content
        .heading
          .heading__main HEY, IT'S A QUIZ!
          .heading__sub
            | For you, about&nbsp;
            del me
            | &nbsp;us.
        .card(:data-flip="isFlipped")
          .card__quiz(ref="frontCardRef")
            .intro We've been together for quite some time, haven't we?
            .progress(ref="progressRef")
              .progress__text
                | {{ `Submission count: ${submissionCount} times` }}
              .progress__text(v-if="shouldShowHint")
                | {{ `Correct answers: ${correctAnswerCount}/${questions.length}` }}
            .questions
              .question__grid
                template(v-for="(question, index) in questions")
                  ASelect.question__item(
                    :data-style="shouldShowHint ? (getIsAnswerCorrect(index) ? 'correct' : 'wrong') : 'default'"
                    :is-disabled="isPassed"
                    :label="question.label"
                    :items="question.items"
                    @change="handleAnswerChange($event, index)"
                  )
            .submission
              template(v-if="!isPassed")
                button.button(
                  @click="handleAnswerSubmission"
                  :disabled="!canSubmit"
                ) Submit Answers
              template(v-else)
                .button-label Congrats for passing the quiz!
                button.button(@click="handleShowRewards") Show Rewards
          .card__reward
            .reward
              template(v-if="proposalQuestion")
                ASelect.question__item(
                  :data-style="isProposalQuestionAnswerCorrect ? 'correct' : 'default'"
                  :label="proposalQuestion.label"
                  :items="proposalQuestion.items"
                  :is-disabled="isProposalQuestionAnswerCorrect"
                  @change="handleProposalQuestionAnswerChange"
                )
                img.reward__ring-image(
                  :data-shown="isProposalQuestionAnswerCorrect"
                  src="@/assets/images/proposal/ring-sketch.jpeg"
                )
</template>

<script lang="ts" setup>
import ASelect from '~/components/atoms/ASelect.vue'
import type { Question } from '~/types/model/others/daisy/proposal'
import { wait } from '~/utils/wait'

// constants

const MAX_MISS_TO_PASS = 2
const SUBMISSION_COUNT_FOR_HINT = 3

// Unlock Logic

const config = useRuntimeConfig().public

const isUnlocked = ref(false)
const initialPassword = ref('')
const currentPassword = ref('')
const isPasswordChanged = computed(() => initialPassword.value !== currentPassword.value)
const unlockInputStyle = ref<'default' | 'correct' | 'wrong'>('default')

const handleChangePassword = (e: Event) => {
  currentPassword.value = (e.target as HTMLInputElement).value
  // change unlockInputStyle from 'wrong' to 'default'
  unlockInputStyle.value = 'default'
}
const handleSubmitPassword = () => {
  initialPassword.value = currentPassword.value
  const isPasswordCorrect = currentPassword.value === config.proposalPagePassword
  unlockInputStyle.value = isPasswordCorrect ? 'correct' : 'wrong'
  isUnlocked.value = isPasswordCorrect
}

// Answers

const { useProposalQuestions } = useFirestoreCollections()
const proposalQuestionsFirestore = useProposalQuestions()

const questions = ref<Question[]>([])
const answers = ref<Array<number | undefined>>([])
const submittedAnswers = ref<Array<number | undefined>>([])

const unwatchQuestionWatcher = watch(questions, q => {
  const initializeEmptyAnswers = () => new Array<number | undefined>(q.length).fill(undefined)
  answers.value = initializeEmptyAnswers()
  submittedAnswers.value = initializeEmptyAnswers()
  unwatchQuestionWatcher()
})

const proposalQuestion = ref<Question>()
const proposalQuestionAnswer = ref()
const isProposalQuestionAnswerCorrect = computed(
  () => proposalQuestionAnswer.value === proposalQuestion.value?.correctAnswerIndex
)

proposalQuestionsFirestore.loadCollection().then(q => {
  if (!q) return
  const questionItems = Array.from(q.values())
  questions.value = questionItems.filter(q => q.stage === 1).sort((a, b) => a.order - b.order)
  proposalQuestion.value = questionItems.find(q => q.stage === 2)
})

const isAllQuestionAnswered = computed(() => answers.value.every(a => a !== undefined))
const handleAnswerChange = (item: number, index: number) => {
  answers.value[index] = item
}
const correctAnswerCount = ref(0)
const setCorrectAnswerCount = () => {
  correctAnswerCount.value = answers.value.reduce(
    (count: number, answer: number | undefined, index: number) =>
      (count += answer === questions.value[index].correctAnswerIndex ? 1 : 0),
    0
  )
}
const getIsAnswerCorrect = (index: number) =>
  submittedAnswers.value[index] === questions.value[index].correctAnswerIndex

// Submission Logic

const willPass = computed(
  () => correctAnswerCount.value + MAX_MISS_TO_PASS >= questions.value.length
)
const isPassed = ref(false)
const submissionCount = ref(0)

const canSubmit = ref(false)
watch(
  [answers, isAllQuestionAnswered],
  () => {
    if (!isAllQuestionAnswered.value) return
    canSubmit.value = true
  },
  { deep: true }
)

const progressRef = ref<HTMLDivElement>()

const handleAnswerSubmission = () => {
  const progressElement: HTMLDivElement | undefined = progressRef.value
  if (!progressElement) return
  submissionCount.value += 1
  submittedAnswers.value = JSON.parse(JSON.stringify(answers.value)) as number[]
  setCorrectAnswerCount()
  if (willPass.value) {
    isPassed.value = true
    progressElement.dataset.status = 'passed'
  } else {
    canSubmit.value = false
    progressElement.dataset.status = 'failed'
  }
  setTimeout(() => {
    delete progressElement.dataset.status
  }, 1000)
}

// Hint logic

const shouldShowHint = computed(
  () => submissionCount.value >= SUBMISSION_COUNT_FOR_HINT || isPassed.value
)

// Rewards Logic

const frontCardRef = ref<HTMLDivElement>()

const isFlipped = ref(false)
const handleShowRewards = async () => {
  if (!frontCardRef.value) return
  window.scrollTo(0, 0)
  await wait(1000)
  isFlipped.value = true
  // flip animation lasts for 2 seconds. wait for half the time since the animation timing is linear
  await wait(1000)
  frontCardRef.value.style.display = 'none'
}

const handleProposalQuestionAnswerChange = (item: number) => {
  proposalQuestionAnswer.value = item
}

definePageMeta({
  layout: 'base',
})
</script>
<script lang="ts">
export default {
  name: 'ProposalPage',
  components: { ASelect },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

$max-width: 1200px;
$hr-padding: 32px;

.proposal {
  .content {
    padding-top: 48px;
    perspective: 6000px;
  }

  .heading {
    margin-bottom: 48px;
    text-align: center;
    @include font-family('roboto-slab');
    &__main {
      @include font($font-xxhuge, normal, normal, $black);
    }
    &__sub {
      @include font($font-xxxl, normal, normal, $black);
    }
  }

  .card {
    position: relative;
    transition: transform 2s;
    transform-style: preserve-3d;

    &[data-flip='true'] {
      transform: rotateY(180deg);
    }

    &__quiz,
    &__reward {
      position: absolute;
      height: fit-content;
      width: 100%;
      padding-bottom: 48px;
      backface-visibility: hidden;
      background-color: white;
    }

    &__reward {
      transform: rotateY(180deg);
    }
  }

  .intro {
    @include font($font-lg, normal, normal, $black);
    max-width: $max-width;
    margin: 0 auto 48px;
    padding: 0 $hr-padding;
  }

  .progress {
    @include font($font-m, 1.5, normal, $black);
    position: sticky;
    top: 0;
    background-color: white;
    padding: 20px 0;
    text-align: right;
    transition: background-color 0.5s, color 0.5s;
    transition-timing-function: ease-in-out;
    &[data-status='passed'] {
      background-color: green;
      color: white;
    }
    &[data-status='failed'] {
      background-color: red;
      color: white;
    }

    &__text {
      max-width: $max-width;
      margin: 0 auto;
      padding: 0 $hr-padding;
    }
  }

  .question {
    &s {
      width: 100%;
      max-width: $max-width;
      margin: 0 auto 24px;
      padding: 0 $hr-padding;
    }

    &__grid {
      display: grid;
      justify-content: center;
      gap: 16px;
      @include pc {
        grid-template-columns: repeat(3, minmax(auto, 400px));
      }
    }

    &__item {
      min-height: 220px;
      border: 2px solid $black;
      padding: 16px;
      min-width: 0;
      overflow-y: auto;
      transition: border-color 1s;
      &[data-style='correct'] {
        border-color: greenyellow;
      }
      &[data-style='wrong'] {
        border-color: red;
      }
    }
  }

  .submission {
    @include flex($direction: column);
    margin: 0 auto;
    height: 70px;
  }

  .button {
    @include button($bg-color: transparent, $font-size: $font-sm);
    @include font($color: $black);
    display: block;
    margin: 0 auto;
    border: 2px solid $black;
    &:disabled {
      background-color: rgba($black, 0.25);
    }
    &:not(:disabled) {
      &:hover {
        background-color: rgba($black, 0.1);
      }
    }
  }
  .button-label {
    @include font($color: $black);
    text-align: center;
    margin-bottom: 8px;
  }

  .reward {
    padding: 0 $hr-padding;

    &__ring-image {
      width: 100%;
      padding-top: $hr-padding;
      transition: opacity 6s, filter 12s;
      &[data-shown='false'] {
        opacity: 0;
        filter: blur(10rem);
      }
      &[data-shown='true'] {
        opacity: 1;
        filter: none;
      }
    }
  }

  .unlock {
    &__wrapper {
      @include flex;
      width: 100vw;
      height: 100vh;
    }

    &__box {
      padding: 24px;
      border: 4px solid $black;
    }

    &__heading {
      @include font($color: $black);
      margin-bottom: 16px;
    }

    &__input {
      @include font($color: $black);
      border: 2px solid $black;
      margin-bottom: 16px;
      &[data-style='correct'] {
        border-color: greenyellow;
      }
      &[data-style='wrong'] {
        border-color: red;
      }
    }

    &__submit-btn {
      @include button($bg-color: transparent, $font-size: $font-sm);
      @include font($color: $black);
      display: block;
      margin: 0 auto;
      border: 2px solid $black;
      &:disabled {
        background-color: rgba($black, 0.25);
      }
      &:not(:disabled) {
        &:hover {
          background-color: rgba($black, 0.1);
        }
      }
    }
  }
}
</style>
