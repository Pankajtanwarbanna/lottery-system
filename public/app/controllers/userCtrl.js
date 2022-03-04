/*
    Controller written by - Pankaj tanwar
*/
angular
  .module("userCtrl", [
    "userServices",
    "fileModelDirective",
    "uploadFileService",
  ])

  .controller("usersCtrl", function (user) {
    var app = this;

    // get all customers
    user
      .getUsers()
      .then(function (data) {
        app.users = data.data.response.data;
      })
      .catch((error) => {
        app.errorMsg = "Something went wrong, please try again later.";
      });
  })

  .controller("settingsCtrl", function (user, $timeout) {
    var app = this;

    app.profileData = {};

    // update profile
    app.updateProfile = function (mainData) {
      app.profileData.name = mainData.name;
      user
        .updateProfile(app.profileData)
        .then(function (data) {
          app.successMsg = "Your profile has been updated.";
          $timeout(function () {
            app.successMsg = "";
          }, 2000);
        })
        .catch((error) => {
          app.errorMsg = "Oops, something went wrong, please try again.";
        });
    };
  })

  .controller("addPrizeCtrl", function (user) {
    let app = this;
    app.totalPrizes = 0;

    app.addPrizeNow = () => {
      app.totalPrizes += 1;
    };

    app.addNewPrize = (prizeData) => {
      app.errorMsg = false;
      app.loading = true;

      console.log(app.prizeData.prizes);
      if (
        app.prizeData.prizes &&
        Object.keys(app.prizeData.prizes).length > 0
      ) {
        // validate the coupon value
        user
          .addNewPrize(app.prizeData)
          .then((data) => {
            app.loading = false;
            app.successMsg = "Prize added successfully!";
          })
          .catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
          });
      } else {
        app.errorMsg = "Empty prize not allowed.";
        app.loading = false;
        console.log(app.errorMsg);
      }
    };
  })

  .controller("prizesCtrl", function (user) {
    let app = this;

    user
      .getPrizes()
      .then((data) => {
        app.loading = false;
        app.prizes = data.data.response.data;
      })
      .catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
      });
  })

  .controller("prizeCtrl", function (user, $routeParams) {
    let app = this;

    user
      .getPrizes({ prizeId: $routeParams.prizeId })
      .then((data) => {
        app.loading = false;
        app.prize = data.data.response.data[0];
        console.log(app.prize);
      })
      .catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
      });

    // purchase
    app.purchaseNow = () => {
      user
        .purchase({ prizeId: $routeParams.prizeId })
        .then((data) => {
          app.loading = false;
          app.purchase = data.data.response;
        })
        .catch((error) => {
          app.errorMsg = error.data.response.message;
          app.loading = false;
        });
    };
  })

  .controller("resultCtrl", function (user, $routeParams, $timeout) {
    let app = this;
    user
      .purchases({ purchaseId: $routeParams.purchaseId })
      .then((data) => {
        app.loading = false;
        app.purchase = data.data.response.data[0];
      })
      .catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
      });
      app.message = {};

    app.spin = (index, yourCode, winnerCode) => {
      app.showSpin = {};
      
      app.showSpin[index] = true;

      //javascript function
      let value1 = document.getElementById("value1");
      let value2 = document.getElementById("value2");
      let value3 = document.getElementById("value3");
      let value4 = document.getElementById("value4");

      let values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      function getRandomValue() {
        return values[Math.floor(Math.random() * 7)];
      }

      let animationId;

      function updateAnimation(newSpeed) {
        if (animationId) clearInterval(animationId);

        if (newSpeed === "0") {
          value1.innerText = getRandomValue();
          value2.innerText = getRandomValue();
          value3.innerText = getRandomValue();
          value4.innerText = getRandomValue();

          let speed = 5;

          animationId = setInterval(() => {
            value1.innerText = getRandomValue();
            value2.innerText = getRandomValue();
            value3.innerText = getRandomValue();
            value4.innerText = getRandomValue();
            document.documentElement.style.setProperty("--speed", speed);
            speed = parseFloat(speed  - 0.1);
            if (speed <= 0) {
              value1.innerText = yourCode.toString()[0];
              value2.innerText = yourCode.toString()[1];
              value3.innerText = yourCode.toString()[2];
              value4.innerText = yourCode.toString()[3];

              if (yourCode.toString() == winnerCode.toString()) {
                app.message[index] =
                  `Yay! Winner code is ${winnerCode}, you have won the prize. Congratulations!`;
              } else {
                app.message[index] =
                  `Oh, sorry! Winner code is ${winnerCode}, you could not win the prize. Better luck next time.`;
              }
              if (animationId) clearInterval(animationId);
              document.documentElement.style.setProperty("--speed", 0.1);
              $timeout(function() {
                document.documentElement.style.setProperty("--speed", 0);
              }, 1000)
            }
          }, 2000 / speed);
        } else {
          animationId = setInterval(() => {
            value1.innerText = getRandomValue();
            value2.innerText = getRandomValue();
            value3.innerText = getRandomValue();
            value4.innerText = getRandomValue();
          }, 1000 / newSpeed);
        }
      }

      document.documentElement.style.setProperty("--speed", 5);

      updateAnimation(3);
      $timeout(function () {
        updateAnimation("0");
      }, 2000);
    };
  })

  .controller("myPurchasesCtrl", function (user) {
    let app = this;

    user
      .purchases()
      .then((data) => {
        app.loading = false;
        app.purchases = data.data.response.data;
      })
      .catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
      });
  });
