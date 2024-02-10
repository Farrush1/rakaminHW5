class Registrant {
    constructor(name, age, allowance) {
      this.name = name;
      this.age = age;
      this.allowance = allowance;
    }
  }
  class RegistrationManager {
    constructor() {
      this.registrants = [];
    }
  
    addRegistrant(registrant) {
      this.registrants.push(registrant);
    }
  
    calculateAverage() {
      let totalAge = 0;
      let totalAllowance = 0;
  
      this.registrants.forEach(registrant => {
        totalAge += registrant.age;
        totalAllowance += registrant.allowance;
      });
  
      const averageAge = totalAge / this.registrants.length;
      const averageAllowance = totalAllowance / this.registrants.length;
  
      return { averageAge, averageAllowance };
    }
  }
  
  const registrationManager = new RegistrationManager();
  
  document.getElementById('form-container').innerHTML = `
    <form id="registration-form">
    <div class="d-grid gap-2 col-6 mx-auto">
      <div class="form floating mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" required minlength="10">
      </div>

      <div class="mb-3">
        <label for="age" class="form-label">Age</label>
        <input type="number" class="form-control" id="age" required min="25">
      </div>

      <div class="mb-3">
        <label for="allowance" class="form-label">Allowance </label>
        <input type="number" class="form-control" id="allowance" required min="100000" max="1000000">
      </div>
      
      <button type="submit" class="btn btn-primary">Submit</button></div>
    </form>
  `;
  
  const form = document.getElementById('registration-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const allowance = parseInt(document.getElementById('allowance').value);
  
    if (name.length < 10 || age < 25 || allowance < 100000 || allowance > 1000000) {
      alert('Please double check your input');
      return;
    }
  
    const registrant = new Registrant(name, age, allowance);
    registrationManager.addRegistrant(registrant);
  
    form.reset();
  });
  
  document.getElementById('listRegist-tab').addEventListener('click', function() {
    const registrants = registrationManager.registrants;
    const { averageAge, averageAllowance } = registrationManager.calculateAverage();
  
    let tableHtml = `
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Allowance</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    registrants.forEach(registrant => {
      tableHtml += `
        <tr>
          <td>${registrant.name}</td>
          <td>${registrant.age}</td>
          <td>${registrant.allowance}</td>
        </tr>
      `;
    });
  
    tableHtml += `
        </tbody>
      </table>
      <p>The average registrant has a financial allowance of Rp${averageAllowance.toFixed(2)} with average age ${averageAge.toFixed(2)} year old</p>
    `;
  
    document.getElementById('table-container').innerHTML = tableHtml;
  });
  