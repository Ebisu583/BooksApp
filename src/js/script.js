{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      book: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
    }
  };
 
  class BooksList {
    constructor() {
      this.templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
      };
      for (let bookData of dataSource.books) {
        bookData.ratingBgc = this.determineRatingBgc(bookData.rating);
        bookData.ratingWidth = bookData.rating*10;
        const generatedHTML = this.templates.book(bookData);
        
        const DOMElement = utils.createDOMFromHTML(generatedHTML);
        const bookList = document.querySelector(select.containerOf.book);
        bookList.appendChild(DOMElement);
      }

      this.favoriteBooks = [];
      this.filters = [];
      this.initData();
      this.getElements();
      this.initActions();
    }
  
    initData() {
      this.data = dataSource.books;
    }
  
    getElements() {
      this.booksList = document.querySelector(select.containerOf.book);
      this.filterContainer = document.querySelector(select.containerOf.filters);
    }
  
    initActions() {
      const thisBookList = this;
      this.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        console.log(event.target.offsetParent.classList, thisBookList);
        const bookImage = event.target.offsetParent;
        if(bookImage.classList.contains('book__image')){
          console.log('Double clicked 2');
          const bookId = bookImage.getAttribute('data-id');
          if(thisBookList.favoriteBooks.includes(bookId)) {
            bookImage.classList.remove('favorite');
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(bookId),1);
          }
          else{
            bookImage.classList.add('favorite');
            thisBookList.favoriteBooks.push(bookId);
          }
        }
      });
      this.filterContainer.addEventListener('change', function(event){
        const checkbox = event.target;
        if(checkbox.tagName == 'INPUT' && checkbox.type == 'checkbox' && checkbox.name == 'filter') {
          console.log(checkbox.value);
          console.log(checkbox.checked);
          if(checkbox.checked){
            thisBookList.filters.push(checkbox.value);
          }
          else{
            thisBookList.filters.splice(thisBookList.filters.indexOf(checkbox.value), 1);
          }
        }
        console.log(thisBookList.filters);
        thisBookList.filterBooks();
      });
    }
  
    filterBooks() {
      this.data.forEach((book)=> {
        let shouldBeHidden = false;
        this.filters.forEach((filter)=>{
          if(!book.details[filter]){
            shouldBeHidden = true; 
            return;
          }
        })
        const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
        if(shouldBeHidden){
          bookImage.classList.add('hidden');
        }
        else{
          bookImage.classList.remove('hidden');
        }
      })
    }
  
    determineRatingBgc(rating) {
      if(rating<6){
        return ` linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);`;
      }
      if(rating>6 && rating<=8){
        return ` linear-gradient(to bottom,  #b4df5b 0%,#b4df5b 100%);`;
      }
      if(rating>8 && rating<=9){
        return ` linear-gradient(to bottom,   #299a0b 0%, #299a0b 100%);`;
      }
      if(rating>9){
        return ` linear-gradient(to bottom,  #ff0084 0%,#ff0084 100%);`;
      }
    }
  
  }
  
  const app = new BooksList();


  //add .filters reference to the select object
  //select the element filter
  //listen to a change in initActions
  //build a callback function 
  //check if the checkbox is clicked
  //show the value in the console
  //add or remove the filter to the array filters

  // function initActions(){
  //   const booksList = document.querySelector(select.containerOf.book);
  //   const imagesList = booksList.querySelectorAll(select.book.image);
  //   for (let image of imagesList) {
  //     image.addEventListener('dblclick', function(event){
  //       event.preventDefault();
  //       const bookId = event.currentTarget.getAttribute('data-id');
  //       if(favoriteBooks.includes(bookId)) {
  //         event.currentTarget.classList.remove('favorite');
  //         favoriteBooks.splice(favoriteBooks.indexOf(bookId),1)
  //       }
  //       else{
  //         event.currentTarget.classList.add('favorite');
  //         favoriteBooks.push(bookId);
  //       }
  //     });
  //   }
  // }
 


}