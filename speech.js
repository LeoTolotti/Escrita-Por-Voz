const textArea = document.getElementById('textarea')
const buttonRec = document.getElementById('rec')
const buttonStop = document.getElementById('stop')
const buttonDownload = document.getElementById('download')
const buttonClear = document.getElementById('clear')



class speechApi {
    constructor(){
        const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

        this.speechApi = new SpeechToText()
        this.output = textArea.output
        this.speechApi.continuous = true
        this.speechApi.lang = 'pt-BR'

        this.speechApi.onresult = event => {
            var resultIndex =  event.resultIndex
            var transcript = event.results[resultIndex][0].transcript

            textArea.value = `${textArea.value}\n${transcript}`
        }
    }

    start(){
        this.speechApi.start()
    }

    stop(){
        this.speechApi.stop()
    }
}

var speech = new speechApi()

buttonRec.addEventListener('click', () => {
    buttonRec.disabled = true;
    buttonStop.disabled = false;
    speech.start()
})

buttonStop.addEventListener('click', () => {
    buttonRec.disabled = false;
    buttonStop.disabled = true;
    speech.stop()
})

buttonDownload.addEventListener('click', () => {
    var text = textArea.value
    var filename = 'speech.txt'

    download(text, filename)
})

buttonClear.addEventListener('click', () => {
    textArea.value = ''
    buttonRec.disabled = false;
    buttonStop.disabled = true;
    speech.stop()
})


function download(text, filename) {
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}