'use strict';

/* Controllers */
angular.module("question.controllers")
    .controller("DeptController",function($scope,CarCreditRestangular,$mdDialog,$mdToast){
        $scope.initList=function(){
            $scope.items=CarCreditRestangular.all("/question/dept").getList().$object;
        };
        $scope.addDept=function(){
            $mdDialog.show(
                $mdDialog.prompt({
                    title:'增加部门',
                    placeholder:'请输入部门名称',
                    ok: '确认',
                    cancel:'取消'
                })
            ).then(function(response){
                    CarCreditRestangular.all('/question/dept').post(response).then(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('增加部门成功')
                                .position('right')
                                .parent('section')
                                .hideDelay(3000)
                        );
                        $scope.initList();
                    })
                })
        };
        $scope.modifyDept=function(item){
            $mdDialog.show(
                $mdDialog.prompt({
                    title:'编辑部门:'+item.deptname,
                    placeholder:'请输入新部门名称',
                    ok: '确认',
                    cancel:'取消'
                })
            ).then(function(response){
                    item.deptname=response;
                    item.save().then(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('修改部门成功')
                                .position('right')
                                .parent('section')
                                .hideDelay(3000)
                        );
                        $scope.initList();
                    })
                })
        };
        $scope.deleteDept=function(item){
            item.remove().then(function(){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('删除部门成功')
                        .position('right')
                        .parent('section')
                        .hideDelay(3000)
                );
                $scope.initList();
            })
        }
    })
;