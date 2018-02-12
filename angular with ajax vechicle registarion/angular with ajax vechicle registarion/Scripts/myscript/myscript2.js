var app = angular.module('myapp', ['ngAnimate']);

app.controller("myctrl", function ($scope, ajaxservice) {

    $scope.init = function () {
        
        getallvechicles();
        getallbrands();
        $scope.isDisabledupdate = true;
        
    };

   
    function getallvechicles() {
        var getall = ajaxservice.getallfromdb();
        getall.then(function (response) {
            $scope.vechicle = response.data;
        },
        function () {
            alert("error in getting book results");
        });
        clearall();
    };

    //get all brands
    function getallbrands() {
        var getall = ajaxservice.getallbrandsfromdb();
        getall.then(function (response) {
            $scope.brands = response.data;
        },
        function () {
            alert("error in getting vechicle brands results");
        });
    }
      
    //initialsie json object for insert
    //add vechicle
    $scope.addvechicle = function () {
        var vechiclejson = {
            "vid": $scope.v_id,
            "vbrand": $scope.v_brand,
            "vtype": $scope.v_type,
            "vowner": $scope.v_owner
        };
        clearall();
        alert(JSON.stringify(vechiclejson))
        var add = ajaxservice.addvechicle(vechiclejson);
        add.then(function (msg)
        {
            
            alert(msg.data);
            getallvechicles();
           
        }, function () {
            alert('Error in adding vechicle record');
        });
       
        
    };
   
    //delete vechicle

    $scope.deletevechicle = function(arg) {
        var deleteData = ajaxservice.Deletevechicle(arg);
        deleteData.then(function (msg) {
            alert(msg.data);
            getallvechicles();
        }, function () {
            alert('Error in deleting vechicle record');
        });
    };

    //update vechicle
    $scope.editvechicle = function (arg)
    {

        alert("update" + arg.vid);
        $scope.v_id = arg.vid;
        $scope.v_brand = arg.vbrand;
        $scope.v_type = arg.vtype;
        $scope.v_owner = arg.vowner;


        $scope.isDisabledupdate = false;
        $scope.isDisabledadd = true;
        $scope.isDisabledvid = true;

    };

    $scope.editvechicle2 = function () {

        var vechiclejson = {
            "vid": $scope.v_id,
            "vbrand": $scope.v_brand,
            "vtype": $scope.v_type,
            "vowner": $scope.v_owner
        };

        var updates = ajaxservice.updatevechicle(vechiclejson);
        updates.then(function (msga) {
            alert("succesfully edited" + msga.data);
            getallvechicles();
            clearall();
            $scope.isDisabledadd = false;
            $scope.isDisabledvid = false;
        },
    function () {
        alert('Error in editing vechicle record');
    });
    };

    //clear all
    function clearall() {
        $scope.v_id = "",
        $scope.v_brand = "",
        $scope.v_type = "",
        $scope.v_owner = ""
$scope.isDisabledupdate = true;
    };

    //for auto complete
    $scope.customlist = [];
    angular.forEach($scope.vechicle, function (value) {
        $scope.customlist.push($scope.vechicle.vowner);
    })

    //$scope.customlist = ["asa", "nmp", "ccsc"];
    $scope.complete = function (string) {
        $scope.hidethis = false;
        var output = [];
        angular.forEach($scope.customlist, function (autocomplete) {
            if (autocomplete.toLowerCase().indexOf(string.toLowerCase()) >= 0)
            {
                output.push(autocomplete);
            }
            });
        $scope.filtercomplete = output;
    }
    $scope.filltextbox = function(string)
    {
        $scope.autocomplete = string;
        $scope.hidethis = true;

    }

    //$scope.mylist =function () {
      
    //    var i = 1;
    //     angular.forEach($scope.vechicle, function (value) {
    //         alert("het" + i);
    //         i = i + 1;
    //     })
    //};


});



app.service("ajaxservice", function ($http) {

    //get all vechicle
    this.getallfromdb = function () {
        return $http.get("/vechicle/getallvechicle");
    };

    //get all brands
    this.getallbrandsfromdb = function () {
        return $http.get("/vechicle/getallbrands");
    };

    //add vechicle
    this.addvechicle = function (vechicle) {
        alert("inside add vechicle"+vechicle);
        var response = $http({
            method: "post",
            url: "/vechicle/Addvechicle",
            data: JSON.stringify(vechicle),
            dataType: "json"
        });
        return response;
    }


//delete vechicle
    this.Deletevechicle = function (vid) {
        alert("id is " + vid);
        var response = $http({
            method: "post",
            url: "/vechicle/deletevechicle",
            data: {"id" :vid},
            dataType: "json"
        });
        return response;
    }

    //update vechicle

    this.updatevechicle = function (arg) {
        var response = $http({
            method: "post",
            url: "/vechicle/editvechicle",
            data: JSON.stringify(arg),
            dataType: "json"
        });
        return response;
    };

});

    


        