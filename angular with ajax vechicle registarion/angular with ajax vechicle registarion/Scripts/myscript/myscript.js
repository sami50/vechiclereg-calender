var app = angular.module('myapp', ['ngRoute']);
//for datatable

app.config(function ($routeProvider) {
    $routeProvider
   .when("/vechicle/aa", {
     return :"ss"
   })
})

app.controller("myctrl", function ($scope, ajaxservice,$http) {
    //$scope.vechicle = null;
        $scope.init = function () {
        getallvechicles();
        getallbrands();
        $scope.isDisabledupdate = true;     
    };

    function getallvechicles() {
        
        ajaxservice.getallfromdb().then(function (response) {
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
    var datee = $('#date01').val();
    //var dateev = Convert.ToDateTime(datee)
    $scope.addvechicle = function () {
        var datee = $('#date01').val();
        var vechiclejson = {
            "vid": $scope.v_id,
            "vbrand": $scope.v_brand,
            "vtype": $scope.v_type,
            "vowner": $scope.v_owner,
            "imagepath": $scope.image_source,
            "date": datee
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
        $scope.image_source = arg.imagepath;

        $scope.isDisabledupdate = false;
        $scope.isDisabledadd = true;
        $scope.isDisabledvid = true;

    };

    $scope.editvechicle2 = function () {

        var vechiclejson = {
            "vid": $scope.v_id,
            "vbrand": $scope.v_brand,
            "vtype": $scope.v_type,
            "vowner": $scope.v_owner,
            "imagepath": $scope.image_source,
            "date": datee
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
        $("#control").val("");
        $("#output").hide();
        $("#date01").val("");
        //angular.element("input[type='file']").val(null);
        //$scope.$apply(function () {
        //    $scope.image_source = ""
        //})
       
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

    //$scope.initDataTable = function () {
    //    $timeout(function () {
    //        $("#t01").dataTable()
    //    })
    //}


    $scope.getFile = function ($files) {
        $scope.imagesrc = [];
        for (var i = 0; i < $files.length; i++) {
            var reader = new FileReader();
            reader.fileName = $files[i].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.fileName;
                image.Size = (event.total / 1024).toFixed(2);
                image.src = event.target.result;
                $scope.$apply();
            }

            reader.readAsDataURL($files[i]);
        }
        angular.forEach($files,function(value,key){
            
        })
    }

    $scope.keyfun = function (keyEvent, e)
    {
        $scope.generateresult = "";
        if (e != "") {
            var sa = $scope.vechicle;
            var inputletter = e;
            var getresults = ajaxservice.autocomplete(inputletter);
            getresults.then(function (res) {
                if (res.data.length===0) {
          
                }
                $scope.generateresult = res.data;
            }, function () {
                alert('Error in auto complete');
            });

        }
        else if(e == "") {
            $scope.generateresult = "";
        }
         
        //angular.forEach(samplejsn, function (value, key) {
        //    if (value.vowner === e) {
        //        alert("username is " + e);
        //    }
        //    return true;
        //},this);

    //    $.each(samplejsn, function(i, item) {
    //        alert(samplejsn[i].vid);
           
    //    });​



    }

    //file upload
    //$scope.fileupload = function (file) {
    //    $scope.SelectedFileForUpload = file[0]
    //}
  
    //function clearform() {
    //    $scope.FileDescription = "";
    //    angular.forEach(angular.element("input[type='file']"), function (inputelem) {
    //    })
    //}
    $scope.form = []
    $scope.insertimg = function () {
        $scope.image1 = $scope.files[0];
        $http({
            method: 'POST',
            url: "/vechicle/checkimg",
            processData: false,
            transFormRequest: function (data) {
                var formData = new FormData();
                formData.append("image1", $scope.image1);
                return formData;
            },
            data: $scope.form,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (data) {
            alert(data);
        });
    };
    //image upload
    $scope.uploadedFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            $("#output").show();
            var output = document.getElementById('output');
            output.src = URL.createObjectURL(element.files[0]);

            $scope.image_source = event.target.result;
            $scope.$apply(function ($scope) {
              $scope.files = element.files;
            });

        }
        reader.readAsDataURL(element.files[0]);
    }


    $scope.customdragstart = function (element) {
        element.dragable = true;
        console.log("from custom" + arg)
    }

    $scope.go = function (aarg) {
        alert("this is ng click"+ aarg.vowner)
    }
    //for drag and drop
    $scope.handleDrop = function (item, bin) {
        alert("sample ea");
    }

    //category report
    $scope.categoryreport = function () {
        
        var catreport = ajaxservice.catreport("PDF",$scope.v_brand_report);
        catreport.then(function (res)
        {
           

            return res;
        }, function () {
            alert('Error in PDF generator');
        });
    }

   $scope.catlistid="PDF"

});

function justalert() {
    alert("just alert");
}

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

    //auto complete
    
    this.autocomplete = function (args) {
        var response = $http({
            method: "post",
            url: "/vechicle/autocom",
            //params: {
            //    arg:JSON.stringify(args)
            //},
            data: { "argmy": args },
            dataType: "json"
        });
        return response;
    }
    
    //PDF report
    this.catreport = function (id ,category) {

        var response = $http({
            method: "post",
            url: "/vechicle/categoriseReport",
            data: {
                "id": id,
                "category": category
            },
            dataType: "json"
        });
        return response;
    }



});



    //dragand drop

    //app.directive('draggable', function () {

    //    return function (scope, element) {

 
    //        // this gives us the native JS object
    //        var el = element[0];

    //        el.draggable = true;

    //        el.addEventListener(
    //          'dragstart',
    //          function (e) {

    //              //e.dataTransfer.effectAllowed = 'move';
    //              e.dataTransfer.setData('Text', e.target.innerText);
    //              //this.classList.add('drag');
    //              //return false;
    //              console.log("draging start"+e)
    //          },
    //          false
    //        );

    //        el.addEventListener(
    //          'dragend',
    //          function (e) {
    //              //this.classList.remove('drag');
    //              return false;
    //          },
    //          false
    //        );
    //    }
    //});

app.directive('draggablem', function () {
    return {
        scope: {
            item: '=',
            data: '=',
            liitem: '='
        },  
        restrict: 'EA',
        link: function (scope, element, attrs) {
            element.bind('dragstart', function (event) {
                console.log(scope.data.vtype + scope.data.vid + scope.data.vowner)
                //dataTransfer.setData('Text', scope.data);
                var send = JSON.stringify(scope.data);
                event.dataTransfer.setData('Text', send);
                console.log("from drag"+send)
            });
        },
    }
});

    //app.directive('droppable', function () {
    //    return {
    //        scope: {

    //        },
    //        restrict: 'EA',
    //        link: function (scope, element)
    //        {
    //                element.bind('drop', function (event) {
               
    //                    event.dataTransfer.effectAllowed = 'move'
    //                event.dataTransfer.dropEffect = "move";
               
    //                var item = event.dataTransfer.getData('Text');
    //                var s = 10
    //                    console.log("item is "+ item)

    //            })
    //        }
    //    }


    //})

    app.directive('droppable', function () {
        return {
            //scope: {
            //    drop: '&',
            //    bin: '=',
            //    testdrag:'='
            //},
            restrict:'EA',
            scope:true,
            link: function (scope, element) {
                // again we need the native object
                var el = element[0];

                el.addEventListener(
                  'dragover',
                  function (e) {
                      e.dataTransfer.dropEffect = 'move';
                      // allows us to drop
                      if (e.preventDefault) e.preventDefault();
                      this.classList.add('over');
                      return false;
                  },
                  false
                );

                el.addEventListener(
                  'dragenter',
                  function (e) {
                      this.classList.add('over');
                      return false;
                  },
                  false
                );

                el.addEventListener(
                  'dragleave',
                  function (e) {
                      this.classList.remove('over');
                      return false;
                  },
                  false
                );

                el.addEventListener(
                  'drop',
                  function (e) {
                      // Stops some browsers from redirecting.
                      if (e.stopPropagation) e.stopPropagation();

                      this.classList.remove('over');

                 
                      //var item = document.getElementById(e.dataTransfer.getData('key'));
                      var item = e.dataTransfer.getData('Text')
                      console.log("item is "+ item)
                      var binId = this.id;
                      //item.classList.remove('drag');
                      //this.appendChild(item);
                      // call the passed drop function
                      scope.$apply(function (scope)
                      {
                          scope.testdrag = item.vowner;
                          alert(scope.testdrag)
                          //var fn = scope.drop();
                          //if ('undefined' !== typeof fn) {
                          //    fn(item.id, binId);
                          //}
                      });

                      return false;
                  },
                  false
                );
            }
        }
    });




    //dragand drop
    //app.directive('ngfiles',['$parse',function($parse){

    //    function fn_link(scope, element, attrs) {
    //        var onchange = $parse(attrs.ngfiles);

    //        element.on('change', function (event) {
    //            onchange(scope, { $files: event.target.files });
    //        })
    //    }
    //        return{
    //            link:fn_link
    //        }

    //    return {
    //        restrict: 'A',
    //        link: function (scope, elem, attrs) {
    //            elem.bind
    //        }
    //    }
    //    }])

    //app.directive('fileModel',['$parse', function ($parse) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            var model = $parse(attrs.fileModel);
    //            var modelSetter = model.assign;
           
    //            element.bind('change', function () {
    //                scope.$apply(function () {
    //                    modelSetter(scope, element[0].files[0]);
    //                });
    //            });
    //            $scope.uploadFile
    //        }
    //    };
    //}]);


    //app.directive('testModel', ['$parse', function ($parse) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            var model = $parse(attrs.fileModel);
    //            var modelSetter = model.assign;
    //            $scope.uploadFile2 = 'came from custom'
       
    //        }
    //    };
    //}]);

    //app.directive('fileModel',  function ($parse) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            var model = $parse(attrs.fileModel);
    //            var modelSetter = model.assign;
    //            var test = scope.name;
    //            //var imgnameis = $parse(attrs.name);
    //            var tt = 10;
        
           
    //        }

    //    };
    //});






        