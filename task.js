class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__clock');
    this.timerID = null;


    this.reset();

    this.registerEvents();
    
  }

  reset() {
    this.setNewWord();   
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

/*   wordLength() {
    let wordLength = Array.from(document.querySelectorAll('.symbol')).length; 
    console.log(wordLength);     
    return wordLength;
    
  } */

/*   сountdownTimer() {    
    let sec = this.wordLength();    
    let timerId = setInterval(() => {
      if (sec >= 0) {
        document.getElementById('status-clock').innerHTML = 'До завершения ввода слова осталось: ' + sec;
        sec--;        
        }        
      if (sec == -1) { 
        clearInterval(timerId);
        this.setNewWord();                
      }
    }, 1000);
    
  } */


  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */

    // для игнорироания ввода букв в верхнем регистре - keypress, и браузер перестает слушать
    // вспомогательные кнопки (shift, ctrl, caps) + toLowerCase вводимый символ 
    document.addEventListener('keypress', (event) => {
      if (event.key.toLowerCase() === this.currentSymbol.textContent) {
        this.success();
      }
      else {
        this.fail();
      };     
    }); 
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
      
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();      
    }
    this.setNewWord();
    
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.renderTimer(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;   
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    //console.log(word.length);
  }

  renderTimer(word) {
    this.timerElement.textContent = word.length;
    this.stopTimer();
    this.startTimer();
  }

  startTimer() {
    this.timerId = setInterval(this.countdownTimer.bind(this), 1000);
  };

  countdownTimer() {
    --this.timerElement.textContent;
    if (this.timerElement.textContent == 0) {
      this.stopTimer();
      this.fail();
    }
  };

  stopTimer() {
    clearInterval(this.timerId);
  };

}

new Game(document.getElementById('game'))

