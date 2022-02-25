/*
    Controller written by - Pankaj tanwar
*/
angular.module('userCtrl',['userServices','fileModelDirective','uploadFileService'])

.controller('usersCtrl', function (user) {
    var app = this;

    // get all customers
    user.getUsers().then(function (data) {
        app.users = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = 'Something went wrong, please try again later.'
    })
})

.controller('settingsCtrl', function (user, $timeout) {

    var app = this;

    app.profileData = {};

    // update profile
    app.updateProfile = function (mainData) {
        app.profileData.name = mainData.name;
        user.updateProfile(app.profileData).then(function (data) {
            app.successMsg = 'Your profile has been updated.';
            $timeout(function () {
                app.successMsg = '';
            }, 2000);
        }).catch((error) => {
            app.errorMsg = 'Oops, something went wrong, please try again.';
        })
    };
})

.controller('addPrizeCtrl', function(user) {
    let app             = this;
    app.totalPrizes     = 3;

    app.addNewPrize     = (prizeData) => {
        console.log(app.prizeData)
        // validate the coupon value 
        user.addNewPrize(app.prizeData).then((data) => {
            app.loading = false;
            app.successMsg = 'Prize added successfully!';
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    }
})

.controller('prizesCtrl', function(user) {
    let app             = this;

    user.getPrizes().then((data) => {
        app.loading = false;
        app.prizes = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
    })
})

.controller('prizeCtrl', function(user, $routeParams) {
    let app             = this;

    user.getPrizes({ prizeId : $routeParams.prizeId }).then((data) => {
        app.loading = false;
        app.prize = data.data.response.data[0];
    }).catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
    })

    // purchase
    app.purchaseNow    = () => {
        user.purchase({ prizeId : $routeParams.prizeId }).then((data) => {
            app.loading = false;
            app.purchase = data.data.response;
        }).catch((error) => {
            app.errorMsg = error.data.response.message;
            app.loading = false;
        })
    }
})

.controller('myPurchasesCtrl', function(user) {
    let app             = this;

    user.purchases().then((data) => {
        app.loading = false;
        app.purchases = data.data.response.data;
    }).catch((error) => {
        app.errorMsg = error.data.response.message;
        app.loading = false;
    })
})

