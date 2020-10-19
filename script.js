const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which property does stack follow?',
    answers: [
      { text: 'LIFO', correct: true },
      { text: 'FIFO', correct: false },
      { text: 'LILO', correct: false },
      { text: 'FILO', correct: false }
    ]
  },
  {
    question: 'Who is the best actor in India?',
    answers: [
      { text: 'Ananya Pandey', correct: true },
      { text: 'Varun Dhawan', correct: true },
      { text: 'Alia Bhatt', correct: true },
      { text: 'Salman Khan', correct: true }
    ]
  },
  {
    question: 'What property does queue follows?',
    answers: [
      { text: 'LILO', correct: false },
      { text: 'FIFO', correct: true },
      { text: 'LIFO', correct: false },
      { text: 'FILO', correct: false }
    ]
  },
  {
    question: 'What is the time complexity for reversing a linked list?',
    answers: [
      { text: 'O(n*n)', correct: false },
      { text: 'O(n)', correct: true },
      { text: 'O(sqrt(n))', correct: false },
      { text: 'O(1)', correct: false }
    ]
  }
]
