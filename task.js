class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    //this.timer = container.querySelector('.status-clock');
    this.Array = Array.from(document.querySelectorAll('.symbol'))
    this.sec = this.Array.length;

    this.reset();

    this.registerEvents();
    

    setInterval(this.CountdownTimer, 1000);
    
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  CountdownTimer() {
    
    //let duration = document.querySelectorAll('.symbol');    
       
  
    console.log(this.sec);
    document.getElementById('status-clock').innerHTML = 'До завершения ввода слова осталось: ' + this.sec;

    sec--;    
  
    if (sec === 0) { 
      clearInterval(timer);
      this.reset();
      return
    }     
  }


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
  }

}

new Game(document.getElementById('game'))
