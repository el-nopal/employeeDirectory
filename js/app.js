const grid = document.querySelector('.grid');
const modal = document.querySelector('.modal');
let employee = [];
let selectedEmp = 0;

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function profileContent(employee)  {
  employee.forEach((element, index) => {
    let flex = document.createElement('div');
    flex.classList.add('flex-item');
    flex.innerHTML = `
        <img id=user-${index} src=${employee[index].picture}>
        <div class="user-info">
          <h4 class="name">${employee[index].name}</h4>
            <p>${employee[index].email}</p>
            <p>${employee[index].city}</p>
        </div>
        `;
    grid.appendChild(flex);
  });
}

function createObject(data) {
  for (let i=0; i<data.results.length; i++) {
  let User = new UserInfo(
    `${data.results[i].name.first} ${data.results[i].name.last}`,
    data.results[i].email, data.results[i].location.city,
    data.results[i].location.street,
    data.results[i].location.state,
    data.results[i].location.postcode,
    data.results[i].dob.date,
    data.results[i].phone,
    data.results[i].picture.large
    );
  employee.push(User);
  }
  return employee;
}

// ------------------------------------------
//  Object Constructor
// ------------------------------------------
class UserInfo {
  constructor(name, email, city, address, state, zip, dob, phone, picture) {
    this.name = name,
    this.email = email,
    this.city = city,
    this.address = address,
    this.state = state,
    this.zip = zip,
    this.dob = dob,
    this.phone = phone,
    this.picture = picture;
}

    fullAddress() {
      return `${this.address} ${this.city} ${this.state} ${this.zip}`;
    }

    set dob(dob) {
      const dobFormatted = dob.substring(5, 10) + '-' + dob.substring(0, 4);
      this._dob = dobFormatted;
    }

    get dob() {
      return this._dob;
    }

    set name(name) {
      const nameCaps = name.replace(/(^|\s)[a-z]/g, (name) => {
        return name.toUpperCase();
      });

      this._name = nameCaps;
    }

    get name() {
      return this._name;
    }

    set address(address) {
      function titleCase(address) {
        address = address.toLowerCase()
        .split(' ')
        .map(function(address) {
        return address.replace(address[0], address[0].toUpperCase());
      });
      return address.join(' ');
      }
      this._address = titleCase(address);
    }

    get address() {
      return this._address;
    }

    set city(city) {
      function titleCase(city) {
        city = city.toLowerCase()
        .split(' ')
        .map(function(city) {
          return city.replace(city[0], city[0].toUpperCase());
      });
      return city.join(' ');
    }

      this._city = titleCase(city);
    }

    get city() {
      return this._city;
    }

    set state(state) {
      const stateCaps = state.replace(/(^|\s)[a-z]/g, (state) => {
        return state.toUpperCase();
      });
      this._state = stateCaps;
    }

    get state() {
      return this._state;
    }
  }

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch('https://randomuser.me/api/?results=12&nat=es')
  .then(response => response.json())
  .then(data => createObject(data))
  .then(data => profileContent(data))
  .then(() => {
      let container = document.querySelectorAll('.flex-item');
        for (let i=0; i<container.length; i++) {
        container[i].addEventListener('click', () => {
          if (modal.className=='modal') {
              selectedEmp = i;
              modal.classList.toggle('show-modal');
              document.querySelector('.modal-content').innerHTML = modalContent(employee, i);
              }
            });
        }
});


// ------------------------------------------
//  MODAL WINDOW
// ------------------------------------------
function modalContent(array, user) {
  return `
    <h2 class ="close-modal">&times;</h2>
    <img class="overlay-image"src='${array[user].picture}'>
    <h4 class="name">${array[user].name}</h4>
    <p>${array[user].email}</p>
    <p>${array[user].city}</p>
    <div class="user-data">
      <p>${array[user].phone}</p>
      <p class="user-address">${array[user].address}, <br> ${array[user].state}, ${array[user].zip}</p>
      <p>${array[user].dob}</p>
    </div>
  `;
}

modal.addEventListener('click', event => {
  if (event.target.className === 'close-modal' || event.target.className === 'modal show-modal') {
    modal.classList.toggle('show-modal');
  }
});
