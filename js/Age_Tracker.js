//==========importent variable==========
const info_holder = document.getElementById("info_holder");
let avrage_death = 64;
//==========all object===========
let all_persone = {
  0: {
    name: "Tonmoy",
    birth: new Date("2006-07-19T12:30:00"),
  },
  1: {
    name: "Mamun",
    birth: new Date("2002-01-01T00:00:00"),
  },
  2: {
    name: "Masum",
    birth: new Date("2011-02-05T00:00:00"),
  },
};

let Main_function = {
  countdown: function (distance) {
    //chack valid number or not
    if (distance == NaN) {
      console.log("Input A Valide Date!");
    }

    //convert to years/days/hours/minets/seconds
    const days = Math.round(distance / (1000 * 60 * 60 * 24));
    const hours = Math.round(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minets = Math.round((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.round((distance % (1000 * 60)) / 1000);

    return {
      days: days,
      hours: hours,
      minets: minets,
      seconds: seconds,
    };
  },

  place_them_into_html: function (Element, countdown_timer) {
    Element.innerHTML = `Days : ${countdown_timer.days} <br /> <br />
              Hours : ${countdown_timer.hours} <br /> <br />
              Minets : ${countdown_timer.minets} <br /> <br />
              Seconds : ${countdown_timer.seconds}`;
  },

  //it can catch your next birthday
  next_birthday: function (birth) {
    const current_year = new Date().getFullYear();
    let next_birthday =
      new Date(birth).setFullYear(current_year) > new Date().getTime()
        ? new Date(birth).setFullYear(current_year)
        : new Date(birth).setFullYear(current_year + 1);

    return next_birthday - new Date().getTime();
  },

  //how old are you really?
  current_Age: function (birth) {
    return new Date().getTime() - new Date(birth).getTime();
  },

  //You can die at this time!
  avrage_Death: function (birth, avrage_death) {
    return (
      1000 * 60 * 60 * 24 * 365 * avrage_death -
      (new Date().getTime() - new Date(birth).getTime())
    );
  },
};

let new_persone = {
  btn: document.getElementById("other_persone_btn"),
  form: document.getElementById("other_persone_form"),
  submit: document.getElementById("other_persone_submit"),

  name: document.getElementById("other_persone_name"),
  year: document.getElementById("other_persone_birth_year"),
  month: document.getElementById("other_persone_birth_month"),
  date: document.getElementById("other_persone_birth_date"),
  hours: document.getElementById("other_persone_birth_hours"),
  minutes: document.getElementById("other_persone_birth_minutes"),
  seconds: document.getElementById("other_persone_birth_seconds"),

  //=======all Mathoad===========

  Show_hide_form: function () {
    if (other_persone_form.classList.contains("close_form")) {
      other_persone_form.classList.replace("close_form", "open_form");
      other_persone_btn.innerText = "Colapes form";
    } else if (other_persone_form.classList.contains("open_form")) {
      other_persone_form.classList.replace("open_form", "close_form");
      other_persone_btn.innerText = "See other persone info";
    }
  },

  add_persone: function () {
    let tracker = 0;
    function valid(Element, messages, condition) {
      if (!Element) {
        console.error("Element is undefined or null");
        return;
      }
      if (Element === new_persone.name) {
        if (Element.value === "") {
          Element.classList.replace("input_normal", "input_empty");
          Element.placeholder = messages;
        } else {
          Element.classList.replace("input_normal", "input_succes");
          tracker += 1;
        }
      } else if (isNaN(Element.value) || condition) {
        Element.value = "";
        Element.placeholder = messages;
        Element.classList.replace("input_normal", "input_empty");
      } else {
        Element.classList.replace("input_normal", "input_succes");
        tracker += 1;
      }
    }

    valid(new_persone.name, "Name is required.", new_persone.name.value === "");
    valid(
      new_persone.year,
      "Please enter a valid birth year.",
      new_persone.year.value < 1900 ||
        new_persone.year.value > new Date().getFullYear()
    );
    valid(
      new_persone.month,
      "Please enter a valid birth month.",
      new_persone.month.value < 1 || new_persone.month.value > 12
    );
    valid(
      new_persone.date,
      "Please enter a valid birth date.",
      new_persone.date.value < 1 ||
        new_persone.date.value >
          new Date(new_persone.year.value, new_persone.month.value, 0).getDate()
    );
    valid(
      new_persone.hours,
      "Please enter valid birth hours (0-23).",
      new_persone.hours.value < 0 || new_persone.hours.value > 23
    );
    valid(
      new_persone.minutes,
      "Please enter valid birth minutes (0-59).",
      new_persone.minutes.value < 0 || new_persone.minutes.value > 59
    );
    valid(
      new_persone.seconds,
      "Please enter valid birth seconds (0-59).",
      new_persone.seconds.value < 0 || new_persone.seconds.value > 59
    );

    function get_birth() {
      let birth = new Date().setFullYear(
        Number(new_persone.year.value),
        Number(new_persone.month.value),
        Number(new_persone.date.value)
      );

      birth = new Date(birth).setHours(
        Number(new_persone.hours.value),
        Number(new_persone.minutes.value),
        Number(new_persone.seconds.value)
      );

      birth = new Date(birth);
      return birth;
    }

    if (tracker == 7) {
      let obj = {
        name: new_persone.name.value,
        birth: get_birth(),
      };

      let all_persone_length = new_persone.all_persone_length();
      all_persone[all_persone_length] = obj;

      new_persone.Show_hide_form();
      new_persone.add_html();
    } else {
      console.log("Error");
    }
  },

  all_persone_length: function () {
    let all_persone_length = 0;
    for (const key in all_persone) {
      all_persone_length = 1 + all_persone_length;
    }
    return all_persone_length;
  },

  caculate_info: function (index, birthday_age_death) {
    let countdownObj = Main_function.countdown(
      Main_function.next_birthday(all_persone[index].birth)
    );
    Main_function.place_them_into_html(birthday_age_death[0], countdownObj);

    countdownObj = Main_function.countdown(
      Main_function.current_Age(all_persone[index].birth)
    );
    Main_function.place_them_into_html(birthday_age_death[1], countdownObj);

    countdownObj = Main_function.countdown(
      Main_function.avrage_Death(all_persone[index].birth, avrage_death)
    );
    Main_function.place_them_into_html(birthday_age_death[2], countdownObj);
  },

  add_html: function () {
    info_holder.innerHTML = "";
    let all_persone_length = new_persone.all_persone_length();
    for (let index = 0; index < all_persone_length; index++) {
      let div = document.createElement("div");
      div.innerHTML = `
            <hr style="border-color: orange"/>
            <h3>
            ${all_persone[index].name}
            <br />
            <span>${all_persone[index].birth}</span>
            </h3>
            <hr style="border-color: orange"/>
            <h3>Time left Befor <span>${all_persone[index].name}</span> Next Birthday is:</h3>
            <hr />
            <h2 style="color: #c9a35e"></h2>
  
            <br />
            <h3><span>${all_persone[index].name}</span> Your Current Age is:</h3>
            <hr />
            <h2 style="color: rgb(147 188 239)"></h2>
  
            <br />
            <h3>
              Avrage human can leave 64 years <br />
              accroding that <span>${all_persone[index].name}</span> You can Live:
            </h3>
            <hr />
            <h2 style="color: #b36dad"></h2>
  
            <br />          
            <br />          
          `;

      info_holder.appendChild(div);
      let birthday_age_death = document.querySelectorAll(
        `#info_holder :nth-child(${index + 1}) > h2`
      );
      all_persone[index].index = index;
      all_persone[index].birthday_age_death = birthday_age_death;
    }
  },
};

//=======current work=========

new_persone.add_html();

//============Events Management=============
new_persone.btn.addEventListener("click", new_persone.Show_hide_form);
new_persone.submit.addEventListener("click", function () {
  new_persone.add_persone();
});

//=======setting algorithem===========

setInterval(function () {
  let all_persone_length = new_persone.all_persone_length();
  for (let index = 0; index < all_persone_length; index++) {
    new_persone.caculate_info(
      all_persone[index].index,
      all_persone[index].birthday_age_death
    );
  }
}, 1000);
