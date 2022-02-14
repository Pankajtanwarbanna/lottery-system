/*
    Services written by - Pankaj tanwar
*/
angular
  .module("userServices", [])

  .factory("user", function ($http) {
    var userFactory = {};

    // get addNewPrize
    userFactory.addNewPrize = function (prizes) {
      return $http.post("/api/prize", prizes);
    };

    userFactory.getPrizes = function (data) {
      return $http.get("/api/prize" + (data?.prizeId ? '?prizeId=' + data.prizeId : ''));
    };

    // get users
    userFactory.getUsers = function () {
      return $http.get("/api/user");
    };

    // update user details
    userFactory.updateProfile = function (profileData) {
      return $http.patch("/api/user", profileData);
    };

    return userFactory;
  });
