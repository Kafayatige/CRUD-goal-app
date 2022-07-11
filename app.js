

class Goal {
    constructor(title, term, habits, start ) {
            this.title = title;
            this.term  = term;
            this.habits = habits;
            this.start = start;
         
    }
}

/
class UI {
    static displayGoals() {
      const goals = Save.getGoals();
  
      goals.forEach((goal) => UI.addGoalToList(goal));
    }
  
    static addGoalToList(goal) {
      const list = document.querySelector('#goal-details');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${goal.title}</td>
        <td>${goal.term}</td>
        <td>${goal.habits}</td>
        <td>${goal.start}</td>
        
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteGoal(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#fill-goal');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#term').value = '';
      document.querySelector('#habits').value = '';
      document.querySelector('#start').value = '';
     
    }
  }
  
  // Handles Storage
  class Store {
    static getgoals() {
      let goals;
      if(localStorage.getItem('goals') === null) {
        goals = [];
      } else {
        goals = JSON.parse(localStorage.getItem('goals'));
      }
  
      return goals;
    }
  
    static addGoal(goal) {
      const goals = Store.goals();
      goals.push(goal);
      localStorage.setItem('goals', JSON.stringify(goals));
    }
  
    static removeGoal(start) {
      const goals = Store.goals();
  
      goals.forEach((goal, index) => {
        if(goal.start === start) {
          goals.splice(index, 1);
        }
      });
  
      localStorage.setItem('goals', JSON.stringify(goals));
    }
  }
  

  document.addEventListener('DOMContentLoaded', UI.displayGoals);
  

  document.querySelector('#fill-goals').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  

    const title = document.querySelector('#title').value;
    const term = document.querySelector('#term').value;
    const habits = document.querySelector('#habits').value;
    const start = document.querySelector('#start').value;
    


    if(title === '' || term === '' || habits === '' || start === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate Goal
      const goal = new Goal(title, term, habits, start);
  
      // Add Book to UI
      UI.addGoalToList(goal);
  
      // Add book to store
      Store.addGoal(goal);
  
      // Show success message
      UI.showAlert('Goal Created', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  

  document.querySelector('#goal-details').addEventListener('click', (e) => {

    UI.deleteGoal(e.target);
  

    Store.removeGoal(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Goal deleted', 'success');
  });