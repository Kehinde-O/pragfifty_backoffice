<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="org.ers.utils.*"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>ORAS | BACKOFFICE</title>
        <%@ include file="include/includeCSS.jsp"%>
        <link href="css/portal/publicPortal/selfAssessment.css" rel="stylesheet" type="text/css">
        <link
        rel="icon" type="image/png" sizes="177x106" href="images/.png">

        <!-- BEGIN: Vendor CSS-->

        <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.5/css/buttons.dataTables.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/css/dataTables.bootstrap4.min.css">

        <link rel="stylesheet" type="text/css" href="css/api/form-flat-pickr.min.css">
        <link rel="stylesheet" type="text/css" href="css/api/form-pickadate.min.css">
        <link rel="stylesheet" type="text/css" href="css/api/pickadate.css">
        <link rel="stylesheet" type="text/css" href="css/api/flatpickr.min.css">

        <link rel="stylesheet" type="text/css" href="css/api/bs-stepper.min.css">
        <link
        rel="stylesheet" type="text/css" href="css/api/select2.min.css">
        <!-- END: Vendor CSS-->


        <%
List<String> lga = AppUtils.getAllLga();
int year = Calendar.getInstance().get(Calendar.YEAR);
year = year + 1;
int yearCountTill2017 = year - 2017;
String sectors = AppUtils.getCDNSectors();
%>


        <style>
            .dnhvtin2,
            .dnhvtin {
                display: none;
            }

            .paid {
                background: green;
                color: #fff;
                border: none;
                padding: 4px 10px;
                border-radius: 6px;
            }

            .unpaid {
                background: red;
                color: #fff;
                border: none;
                padding: 4px 10px;
                border-radius: 6px;
            }

            .part {
                background: yellow;
                color: #000;
                border: none;
                padding: 4px 10px;
                border-radius: 6px;
            }

            .withholdingtax {
                display: flex;
                background: #134E5E;
                padding: 35px 20px;
                flex-direction: column;
                width: 500px;
                justify-content: center;
                align-items: center;
                color: #f9f9f9;
            }

            .wht-form {
                display: flex;
                width: 100%;
                max-width: 70%;
                flex-direction: column;
                margin-top: 30px;
            }

            .notpd {
                display: inline-block;
                background: red;
                border-radius: 7px;
                padding: 9px 10px;
                color: #fff;
            }

            .wht-form-group {
                display: flex;
                width: 100%;
                margin-bottom: 15px;
            }

            .wht-form-group input,
            .wht-form-group select {
                display: flex;
                flex: 1;
                padding: 10px;
                max-width: 100% !important;
            }

            .classy-button {
                padding: 8px;
            }

            .flex-end {
                display: flex;
                justify-content: flex-end;
            }

            #othertaxautocomplete,
            .othertaxautocomplete {
                position: relative;
            }

            .loader {
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                width: 100%;
                height: 100%;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
            }

            #othertaxdescriptionParent {
                display: none;
                width: 100%;
            }

            #othertaxdescription {
                width: 100%;
            }

            .space-between {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }

            #amountInsertParent {
                display: none;
            }

            #go-button {
                display: none;
            }

            .btn {
                font-size: x-small !important;
            }

            .payBtn {
                background: #2ec4b6;
                border: 1px #2ec4b6 solid;
            }

            .table-button {
                padding: 5px 8px;
                background: #f3593d;
                color: #f9f9f9;
                border: 1px #f3593d solid;
                cursor: pointer;
            }

            .pay-button-db {
                background: #2a9d8f;
                border: 1px #2a9d8f solid;
            }

            #advancedSearch,
            .regprop {
                background-color: #f3593d;
                color: #fff;
                padding: 8px 32px;
                border: none;
            }

            #genBillBtn,
            .peopleButton,
            .completereg,
            #registerProperty,
            #nextProperty {
                background-color: #f3593d;
                color: #fff;
                padding: 8px 32px;
                border: none;
            }

            #updateProperty {
                color: #71B280;
                background-color: #fff;
                padding: 8px 32px;
                border: 1px solid #f3593d;
            }

            .cancelreg,
            #clearProperty {
                background-color: #fff;
                color: rgba(235, 74, 46, 0.829);
                padding: 8px 32px;
                border: 1px solid rgba(235, 74, 46, 0.829);
            }

            label {
                font-weight: 300;
                color: #858796;
            }

            .clear {
                background-color: #fff;
                /* color: rgb(63,43,150); */
                padding: 8px 32px;
                border: 1px solid rgb(63, 43, 150);
            }

            #yearFeeTable input:focus {
                outline: none;
                border: 1px solid #71B280;
            }

            #yearFeeTable thead {
                background: #71B280;
                color: #fff;
            }

            #yearFeeTable tbody tr td:first-child {
                color: #aaa;
            }

            #propertyDetails p {
                font-size: 16px;
                color: #555;
            }

            .hide {
                display: none;
            }

            .blueBtn {
                box-shadow: -5px 5px 14px -4px #276873;
                /* background:linear-gradient(to bottom, #29668f 5%, #147e8c 100%); */
                background-color: #134E5E;
                border: none;
                border-radius: 3px;
                display: inline-block;
                cursor: pointer;
                color: #ffffff;
                font-family: Arial;
                font-size: 13px;
                font-weight: 300;
                padding: 10px 32px;
                text-decoration: none;
            }

            .redBtn {
                box-shadow: -5px 5px 14px -4px #276873;
                /* background:linear-gradient(to bottom, #29668f 5%, #147e8c 100%); */
                background-color: #134E5E;
                border: none;
                border-radius: 3px;
                display: inline-block;
                cursor: pointer;
                color: #ffffff;
                font-family: Arial;
                font-size: 13px;
                font-weight: 300;
                padding: 6px 22px;
                text-decoration: none;
            }

            .greenBtn {
                background-color: #71B280;
                color: #fff;
                box-shadow: -1px 3px 14px -4px #276873;
                border: none;
                border-radius: 3px;
                display: inline-block;
                cursor: pointer;
                font-family: Arial;
                font-size: 13px;
                font-weight: 300;
                padding: 10px 32px;
                text-decoration: none;
            }

            #myTab .nav-link.active {
                text-align: center;
                width: 100%;
                color: #fff;
                background: rgba(235, 74, 46, 0.829);
            }

            #myTab .nav-link {
                text-align: center;
                color: rgb(235, 74, 46);
                padding: 15px;
                font-family: 'Roboto', 'Sans-serif';
            }

            #billDetails p:not(span),
            #propertyDetails p:not(span),
            #billDetails1 p:not(span),
            #propertyDetails1 p:not(span) {
                font-weight: 500;
                font-family: 'Roboto', 'Sans-serif';
            }

            .bold-header {
                font-weight: bold;
            }

            .custom-bill-container {
                margin-top: 20px;
            }

            .underline-text {
                text-decoration: underline;
            }

            .custom-bill-form {
                margin-top: 25px;
                padding: 12px;
            }

            #lga,
            #year {
                min-height: 200px;
            }

            .multi-select-container {
                display: block;
                position: relative;
                width: 100% !important;
            }

            .multi-select-menu {
                position: absolute;
                left: 0;
                top: 0.8em;
                z-index: 1;
                float: left;
                min-width: 100%;
                background: #fff;
                margin: 1em 0;
                border: 1px solid #aaa;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                max-height: 200px;
                overflow-y: auto;
            }

            .multi-select-menuitem {
                display: block;
                font-size: 0.875em;
                padding: 0.6em 1em 0.6em 30px;
                white-space: nowrap;
            }

            .multi-select-menuitem--titled:before {
                display: block;
                font-weight: bold;
                content: attr(data-group-title);
                margin: 0 0 0.25em -20px;
            }

            .multi-select-menuitem--titledsr:before {
                display: block;
                font-weight: bold;
                content: attr(data-group-title);
                border: 0;
                clip: rect(0, 0, 0, 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            .multi-select-menuitem+.multi-select-menuitem {
                padding-top: 0;
            }

            .multi-select-presets {
                border-bottom: 1px solid #ddd;
            }

            .multi-select-menuitem input {
                position: absolute;
                margin-top: 0.25em;
                margin-left: -20px;
            }

            .multi-select-button {
                display: block;
                font-size: 0.875em;
                padding: 0.2em 0.6em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: -0.5em;
                background-color: #fff;
                border: 1px solid #aaa;
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                cursor: default;
            }

            .multi-select-container--open .multi-select-menu {
                display: block;
            }

            .multi-select-container--positioned .multi-select-menu {
                /* Avoid border/padding on menu messing with JavaScript width calculation */
                box-sizing: border-box;
            }

            .multi-select-container--positioned .multi-select-menu label {
                /* Allow labels to line wrap when menu is artificially narrowed */
                white-space: normal;
            }

            .position-menu-within {
                width: 18em;
                height: 15em;
                background: #eee;
                overflow: auto;
                padding: 2em 0 0 2em;
            }

            .modal-example .multi-select-menu {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-height: 50%;
                min-width: 0;
                overflow: auto;
                border: none;
                border-radius: 0.3em;
                box-shadow: 0 1em 3em rgba(0, 0, 0, 0.4);
            }

            .newMargin {
                margin-left: 0 !important;
                margin-right: 0 !important;
            }

            .card-header {
                padding: 0.75rem 1.25rem;
                background-color: rgba(235, 74, 46, 0.829) !important;
                border-bottom: 1px solid rgba(235, 74, 46, 0.829) !important;
            }

            .newPadding {
                padding-left: 1.5rem !important;
                padding-right: 1.5rem !important;
            }

            .finalPadding {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .coveringStyle {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .modal-example .multi-select-menuitem {
                font-size: 1em;
                padding: 1.5em 2.5em 1.5em 3.5em;
            }

            .modal-example .multi-select-menuitem+.multi-select-menuitem {
                padding-top: 0;
            }

            .modal-example .multi-select-menuitem input {
                margin-left: -2.5em;
            }

            .multi-select-modal {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                background: rgba(0, 0, 0, 0.4);
                display: none;
            }

            .multi-select-container--open .multi-select-modal {
                display: block;
            }

            .unclassified_header_form {
                display: block;
                width: 100%;
                padding: 12px 0;
            }

            .search_record_title {
                font-weight: bold;
                color: #fff !important;
                margin-bottom: 10px;
            }

            .form-control {
                background-color: #fff !important;
                border-radius: 5px;
            }

            label {
                color: #fff !important;
            }
        </style>

    </head>

    <body id="page-top">

        <div id="loading" class="hide1">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <!-- Page Wrapper -->
        <div
            id="wrapper">

            <!-- Sidebar -->
            <%@ include file="include/includeSidebar.jsp"%>
            <input type="hidden" value="<%=canViewSingleProp%>" id="canview"/>

            <script type="text/javascript">
                var canView = document.querySelector('#canview').value;

                if (canView == "false") {
                    window.location.href = "dashboard.jsp";
                }
            </script>

            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">
                <%@ include file="include/includeHeaderMenu.jsp"%>
                <!-- Main Content -->
                <div id="row">
                    <div class="col-12">
                        <div class="custom-bill-container">
                            <div class="col-sm-12">
                                <h2 class="bold-header ">Consolidated Demand Notice
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            								Classification</h2>
                                <p>Please select option below to generate bills for printing.</p>
                            </div>
                            <div class="row custom-bill-form">
                                <form class="col-12" id="custom_bill_form">
                                    <section class="modern-horizontal-wizard border-style-stepper">
                                        <div class="bs-stepper wizard-modern modern-wizard-example newPadding">
                                            <div class="bs-stepper-header">
                                                <div class="step" data-target="#unclassified_tab" id="unclassified_tab_hook">
                                                    <button type="button" class="step-trigger">
                                                        <span class="bs-stepper-box">
                                                            <i data-feather="file-text" class="font-medium-3"></i>
                                                        </span>
                                                        <span class="bs-stepper-label">
                                                            <span class="bs-stepper-title">Unclassified Entities</span>
                                                            <span class="bs-stepper-subtitle"></span>
                                                        </span>
                                                    </button>
                                                </div>

                                                <div class="step" data-target="#classified_tab" id="classified_tab_hook">
                                                    <button type="button" class="step-trigger">
                                                        <span class="bs-stepper-box">
                                                            <i data-feather="user" class="font-medium-3"></i>
                                                        </span>
                                                        <span class="bs-stepper-label">
                                                            <span class="bs-stepper-title">Classified Entities</span>
                                                            <span class="bs-stepper-subtitle"></span>
                                                        </span>
                                                    </button>
                                                </div>

                                            </div>

                                            <div class="bs-stepper-content coveringStyle">
                                                <div id="unclassified_tab" class="content">
                                                    <div class="content-header"></div>
                                                    <div class="col-xl-12 finalPadding">
                                                        <div class="card">
                                                            <div class="card-header pb-0">
                                                                <form class="unclassified_header_form">
                                                                    <div class="row">
                                                                        <div class="col-sm-12">
                                                                            <h5 class="search_record_title">Search Record</h5>
                                                                        </div>
                                                                        <div class="col-sm-2">
                                                                            <div class="form-group">
                                                                                <label>ODTIN</label>
                                                                                <input type="text" class="form-control" placeholder="ODTIN" id="searchODTIN"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-3">
                                                                            <div class="form-group">
                                                                                <label>Organization Name</label>
                                                                                <input type="text" class="form-control" placeholder="Organization Name" id="searchOrgName"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-3">
                                                                            <div class="form-group">
                                                                                <label>Phone Number</label>
                                                                                <input type="text" class="form-control" placeholder="Phone Number" id="searchPhone"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-2 pull-right">
                                                                            <div class="form-group">
                                                                                <label>Action</label>
                                                                                <button type="button" class="btn searchDataBTN" style="display: block;min-width: 120px;font-size: large;padding: 12px 8px !important;background-color: #134E5E;color: #f9f9f9;">Search</button>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-2 pull-right">
                                                                            <div class="form-group">
                                                                                <label>Reset</label>
                                                                                <button type="reset" id="resetUnClassified" class="btn" style="display: block; min-width: 120px;font-size: large;padding: 12px 8px !important;background-color: #2ec4b6;color: #f9f9f9;">Reset Data</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>

                                                            </div>
                                                            <div class="card-body">
                                                                <table class="table table-striped table-sm my-0 mydatatable" style="width: 100%" id="unClassifiedTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>NAME</th>
                                                                            <th>PHONE</th>
                                                                            <th>EMAIL</th>
                                                                            <th>ODTIN</th>
                                                                            <th>ADDRESS</th>
                                                                            <th>CITY</th>
                                                                            <th>LGA</th>
                                                                            <th>CLASSIFICATION</th>
                                                                            <th>VALUE CATEGORY</th>
                                                                            <th>ACTION</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody></tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div id="classified_tab" class="content">
                                                    <div class="content-header"></div>
                                                    <div class="col-xl-12 finalPadding">
                                                        <div class="card">
                                                            <div class="card-header pb-0">
                                                                <form class="unclassified_header_form">
                                                                    <div class="row">
                                                                        <div class="col-sm-12">
                                                                            <h5 class="search_record_title">Search Record</h5>
                                                                        </div>
                                                                        <div class="col-sm-2">
                                                                            <div class="form-group">
                                                                                <label>ODTIN</label>
                                                                                <input type="text" class="form-control" placeholder="ODTIN" id="searchODTIN2"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-3">
                                                                            <div class="form-group">
                                                                                <label>Organization Name</label>
                                                                                <input type="text" class="form-control" placeholder="Organization Name" id="searchOrgName2"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-3">
                                                                            <div class="form-group">
                                                                                <label>Phone Number</label>
                                                                                <input type="text" class="form-control" placeholder="Phone Number" id="searchPhone2"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-2 pull-right">
                                                                            <div class="form-group">
                                                                                <label>Action</label>
                                                                                <button type="button" class="btn searchDataBTN2" style="display: block;min-width: 120px;font-size: large;padding: 12px 8px !important;background-color: #134E5E;color: #f9f9f9;">Search</button>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-sm-2 pull-right">
                                                                            <div class="form-group">
                                                                                <label>Reset</label>
                                                                                <button type="reset" id="resetClassified" class="btn" style="display: block; min-width: 120px;font-size: large;padding: 12px 8px !important;background-color: #2ec4b6;color: #f9f9f9;">Reset Data</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="card-body">
                                                                <table class="table table-striped table-sm my-0 mydatatable" style="width: 100%" id="classifiedCDN">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>NAME</th>
                                                                            <th>PHONE</th>
                                                                            <th>EMAIL</th>
                                                                            <th>ODTIN</th>
                                                                            <th>ADDRESS</th>
                                                                            <th>CITY</th>
                                                                            <th>LGA</th>
                                                                            <th>CLASSIFICATION</th>
                                                                            <th>VALUE CATEGORY</th>
                                                                            <th>ACTION</th>
                                                                            <th>PRINT CDN</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody></tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of main content -->
            </div>
            <!-- End of Content Wrapper -->
        </div>


        <%@ include file="include/includeFooter.jsp"%>

        <%@ include file="include/includeJS.jsp"%>

        <!-- Custom scripts for all pages-->
        <script src="js/portal/sb-admin-2.min.js"></script>


        <!-- BEGIN: Page Vendor JS-->
        <script src="js/api/picker.js"></script>
        <script src="js/api/picker.date.js"></script>
        <script src="js/api/picker.time.js"></script>
        <script src="js/api/legacy.js"></script>
        <script src="js/api/flatpickr.min.js"></script>
        <script src="js/api/form-pickers.min.js"></script>


        <script src="js/api/bootstrap.js"></script>
        <script src="js/api/index.js"></script>

        <!-- BEGIN: Vendor JS-->
        <script src="js/api/vendors.min.js"></script>
        <!-- BEGIN Vendor JS-->

        <!-- BEGIN: Page Vendor JS-->
        <script src="js/api/bs-stepper.min.js"></script>
        <script src="js/api/select2.full.min.js"></script>
        <script src="js/api/jquery.validate.min.js"></script>
        <!-- END: Page Vendor JS-->

        <!-- BEGIN: Theme JS-->
        <script src="js/api/app-menu.min.js"></script>
        <script src="js/api/app.min.js"></script>
        <script src="js/api/customizer.min.js"></script>
        <!-- END: Theme JS-->

        <!-- BEGIN: Page JS-->
        <script src="js/api/form-wizard.min.js"></script>
        <!-- END: Page JS-->


        <!-- END:  Datatables JS-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.6.0/umd/popper.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/jquery.dataTables.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/js/dataTables.bootstrap4.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.flash.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
        <script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.print.min.js"></script>


        <script>
            $(window).on('load', function () {
                if (feather) {
                    feather.replace({width: 14, height: 14});
                }
            });

            window.currentlyProcessingButtons = [];

            $(".searchDataBTN").click(function () {
                const searchODTIN = $("#searchODTIN").val();
                const searchOrgName = $("#searchOrgName").val();
                const searchPhone = $("#searchPhone").val();

                if (searchODTIN.length < 1 && searchOrgName.length < 1 && searchPhone.length < 1) {
                    Swal.fire({icon: "error", text: "Please enter a search parameter."});
                    return false;
                } else {
                    $(this).html("Searching...");
                    $(this).attr("disabled", true);
                    loadUnclassifiedData();
                    // alert("Called search by BTN");
                }
            });

            $(".searchDataBTN2").click(function () {
                const searchODTIN = $("#searchODTIN2").val();
                const searchOrgName = $("#searchOrgName2").val();
                const searchPhone = $("#searchPhone2").val();

                if (searchODTIN.length < 1 && searchOrgName.length < 1 && searchPhone.length < 1) {
                    Swal.fire({icon: "error", text: "Please enter a search parameter."});
                    return false;
                } else {
                    $(this).html("Searching...");
                    $(this).attr("disabled", true);
                    loadClassifiedData();
                    // alert("Called search by BTN 2");
                }
            });

            $("#unclassified_tab_hook").click(function () {
                loadUnclassifiedData();
            });

            $("#classified_tab_hook").click(function () {
                loadClassifiedData();
            });

            $("#resetUnClassified").click(function () {
                loadUnclassifiedData();
                $("#searchODTIN").val("");
                $("#searchOrgName").val("");
                $("#searchPhone").val("");
            });

            $("#resetClassified").click(function () {
                loadClassifiedData();
                $("#searchODTIN2").val("");
                $("#searchOrgName2").val("");
                $("#searchPhone2").val("");
            });


            function loadUnclassifiedData() {

                // alert("Loading Unclassified");
                // console.error("Unclassified Fired");

                const searchODTIN = $("#searchODTIN").val();
                const searchOrgName = $("#searchOrgName").val();
                const searchPhone = $("#searchPhone").val();

                // $('#unClassifiedTable').dataTable().fnClearTable();
                $('#unClassifiedTable').dataTable().fnDestroy();
                $("#unClassifiedTable").DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copy',
                        'csv',
                        'excel',
                        'pdf',
                        'print'
                    ],
                    searching: false,
                    processing: true,
                    serverSide: true,
                    ajax: "GenericEndpoint?requestType=getCDNRecords&classified=false&odtin=" + searchODTIN + "&orgname=" + searchOrgName + "&phone=" + searchPhone,
                    columnDefs: [
                        {
                            className: "control",
                            orderable: !1,
                            responsivePriority: 2,
                            targets: 0
                        }
                    ],
                    responsive: false,
                    columns: [
                        {
                            title: "NAME"
                        },
                        {
                            title: "PHONE"
                        },
                        {
                            title: "EMAIL"
                        },
                        {
                            title: "ODTIN"
                        }, {
                            title: "ADDRESS",
                            render: function (data, type, row) { // console.log("ADDRESS__________",data,type,row);
                                return `<input type="text" class="form-control" id="addressInput_` + row[8] + `" value="` + row[4] + `"/>`;
                            }
                        }, {
                            title: "CITY",
                            render: function (data, type, row) { // console.log("ADDRESS__________", data, type, row);
                                return `<input type="text" class="form-control" id="cityInput_` + row[8] + `" value="` + row[5] + `"/>`;
                            }
                        }, {
                            title: "LGA",
                            render: function (data, type, row) { // console.log("ADDRESS__________", data, type, row);
                                return `<input type="text" disabled class="form-control" id="lgaInput_` + row[8] + `" value="` + row[6] + `"/>`;
								// return data;
                            }
                        }, {
                            title: "CLASSIFICATION",
                            render: function (data, type, row) { // console.log("Classification Column Data",data,type,row);
                                return `<select class="form-control sector_Select" id="sector_` + row[8] + `" name="sector_` + row[8] + `">
									<option>Please Select Classification</option>
								</select>`;
                            }
                        }, {
                            title: "VALUE CATEGORY",
                            render: function (data, type, row) { // console.log("Category Column Data",data,type,row);
                                return `<select class="form-control value_Select" id="sectorValue_` + row[8] + `" name="sectorValue_` + row[8] + `">
									<option value="">Please Select Category</option>
									<option value="URBAN HIGH VALUE">URBAN HIGH VALUE</option>
									<option value="URBAN MEDIUM VALUE">URBAN MEDIUM VALUE</option>
									<option value="URBAN LOW VALUE">URBAN LOW VALUE</option>
									<option value="RURAL HIGH VALUE">RURAL HIGH VALUE</option>
									<option value="RURAL MEDIUM VALUE">RURAL MEDIUM VALUE</option>
									<option value="RURAL LOW VALUE">RURAL LOW VALUE</option>
								</select>`;
                            }
                        }, {
                            title: "ACTION",
                            render: function (data, type, row) { // console.log("Delete Data",data);
                                try {
                                    data = JSON.parse(data);
                                } catch (e) {}
                                return `<button disabled id="actionButtonFor_` + row[8] + `" type="button" class="btn btn-danger classifyButton">Save Classification</button>`;
                            }
                        }
                    ],
                    initComplete: function (settings, json) {
                        $(".searchDataBTN").attr("disabled", false);
                        $(".searchDataBTN").html("Search");
                        // console.log("Unclassified INIT.....", settings, json);
                        generateClassificationDropDown();
                        $("#searchODTIN").val("");
                        $("#searchOrgName").val("");
                        $("#searchPhone").val("");
                    }
                });

                // ///Listen to events and update table accordingly
                $('#unClassifiedTable').on('order.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    generateClassificationDropDown();
                });
                $('#unClassifiedTable').on('search.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    generateClassificationDropDown();
                });
                $('#unClassifiedTable').on('page.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    generateClassificationDropDown();
                });
                $('#unClassifiedTable').on('draw.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    generateClassificationDropDown();
                });
                // //////////////
            }
            loadUnclassifiedData();

            function loadClassifiedData() {

                const searchODTIN = $("#searchODTIN2").val();
                const searchOrgName = $("#searchOrgName2").val();
                const searchPhone = $("#searchPhone2").val();

                // $('#classifiedCDN').dataTable().fnClearTable();
                $('#classifiedCDN').dataTable().fnDestroy();
                $("#classifiedCDN").DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copy',
                        'csv',
                        'excel',
                        'pdf',
                        'print'
                    ],
                    searching: false,
                    processing: true,
                    serverSide: true,
                    ajax: "GenericEndpoint?requestType=getCDNRecords&classified=true&odtin=" + searchODTIN + "&orgname=" + searchOrgName + "&phone=" + searchPhone,
                    columnDefs: [
                        {
                            className: "control",
                            orderable: !1,
                            responsivePriority: 2,
                            targets: 0
                        }
                    ],
                    responsive: false,
                    columns: [
                        {
                            title: "NAME"
                        },
                        {
                            title: "PHONE"
                        },
                        {
                            title: "EMAIL"
                        },
                        {
                            title: "ODTIN"
                        }, {
                            title: "ADDRESS"
                        }, {
                            title: "CITY"
                        }, {
                            title: "LGA"
                        }, {
                            title: "CLASSIFICATION"
                        }, {
                            title: "VALUE CATEGORY"
                        }, {
                            title: "ACTION",
                            render: function (data, type, row) {
                                // console.log("Delete Data",data);
                                // console.log("UNCLASIFY_________", data, type, row);
                                return `<button class="btn btn-danger unClassify" id="unclassifyButtonFor_` + row[10] + `" type="button">Remove Classification</button>`;
                            }
                        }, {
                            title: "PRINT CDN",
                            render: function (data, type, row) { // console.log("Delete Data",data);
                                try {
                                    data = JSON.parse(data);
                                } catch (e) {}
                                return `<a href="./printlucbill?request=singleCDN&peoplersn=` + data + `" class="btn btn-danger" target="_blank">Print</a>`;
                            }
                        }
                    ],
                    initComplete: function (settings, json) {
                        $(".searchDataBTN2").attr("disabled", false);
                        $(".searchDataBTN2").html("Search");
                        refreshUnclassify();
                        $("#searchODTIN2").val("");
                        $("#searchOrgName2").val("");
                        $("#searchPhone2").val("");
                        console.log("_________________CLASSIFIED COMPLETED");
                    }
                });

                // ///Listen to events and update table accordingly
                $('#classifiedCDN').on('order.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    refreshUnclassify()
                });
                $('#classifiedCDN').on('search.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    refreshUnclassify()
                });
                $('#classifiedCDN').on('page.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    refreshUnclassify()
                });
                $('#classifiedCDN').on('draw.dt', function () { // This will show: "Ordering on column 1 (asc)", for example
                    refreshUnclassify()
                });
                // //////////////
            }

            $(document).ready(function () {
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                    $(this).toggleClass('active');
                });
            });

            function refreshUnclassify() { // alert("refreshing...")
                $(".unClassify").click(function (e) { // alert("Working....");
                    const triggerID = $(this).attr("id").split("_")[1];
                    $(this).html("Unclassifying...")
                    $(this).attr("disabled", true);
                    const anchor = $(this);

                    if (window["window_cliked_unclassify" + triggerID]) {
                        return false;
                    }
                    // alert("Clicked Unclassify");

                    window["window_cliked_unclassify" + triggerID] = true;
                    $.ajax({
                        url: "GenericEndpoint?requestType=unClassifyPeople&peoplersn=" + triggerID,
                        success: function (result) {
                            // console.log("AJAX RESULT_______", result, anchor);
                            // window[working+"_"+triggerID] = false;

                            anchor.html("Remove Classification")
                            anchor.attr("disabled", false);

                            anchor.parent().parent().remove();
                            window["window_cliked_unclassify" + triggerID] = false;
                        },
                        error: function (error) {
                            // window[working+"_"+triggerID] = false;
                            // console.log("AJAX ERROR__________", error);
                            Swal.fire({icon: "error", title: "Something went wrong, your changes were not saved. please try again."})
                            anchor.html("Remove Classification")
                            anchor.attr("disabled", false);
                            window["window_cliked_unclassify" + triggerID] = false;
                        }
                    })
                });
            }

            function generateClassificationDropDown() {
                const sectorsAndCategory = JSON.parse('<%=sectors%>');
                // console.log("Sectors", sectorsAndCategory);
                $(".sector_Select").html(`<option value="">Please Select Classification</option>`);
                // for (let i = 0; i < sectorsAndCategory.length; i++) {
                //     const optionGroup = $("<optgroup label='" + sectorsAndCategory[i].sector + "'></optgroup>");
                //     const subcategories = sectorsAndCategory[i].subcategories;
                //     for (let j = 0; j < subcategories.length; j++) {
                //         const option = '<option value="' + subcategories[j].sectorSubCategory + '" data-sector="' + sectorsAndCategory[i].sector + '">' + subcategories[j].sectorSubCategory + '</option>';
                //         optionGroup.append(option);
                //     }
                //     $('.sector_Select').append(optionGroup);
                // }

                for (let i = 0; i < sectorsAndCategory.length; i++) {
                    const optionGroup = $("<option value='" + sectorsAndCategory[i].sector + "'>" + sectorsAndCategory[i].sector + "</option>");
                    const subcategories = sectorsAndCategory[i].subcategories;
                    // for (let j = 0; j < subcategories.length; j++) {
                    //     const option = '<option value="' + subcategories[j].sectorSubCategory + '" data-sector="' + sectorsAndCategory[i].sector + '">' + subcategories[j].sectorSubCategory + '</option>';
                    //     optionGroup.append(option);
                    // }
                    $('.sector_Select').append(optionGroup);
                }
                // $('.sector_Select').multiSelect();


                $(".sector_Select,.value_Select").change(function (e) {
                    let selectorID = $(this).attr("id");
                    selectorID = selectorID.split("_")[1];

                    // console.log("Sector & Value change fired..........", $(this));

                    const selectedSector = $("#sector_" + selectorID).val().trim();
                    const selectedSectorValue = $("#sectorValue_" + selectorID).val().trim();

                    // console.log("__________", selectedSector, selectedSectorValue);
                    // ////Enable or disable button
                    if (selectedSector.length > 0 && selectedSectorValue.length > 0) {
                        $("#actionButtonFor_" + selectorID).attr("disabled", false);
                    } else {
                        $("#actionButtonFor_" + selectorID).attr("disabled", true);
                    }
                });

                $(".classifyButton").click(function (e) { // window[working+"_"+triggerID] = true;
                    const triggerID = $(this).attr("id").split("_")[1];

                    const anchor = $(this);

                    const sector = $("#sector_" + triggerID).val();
                    const sectorCat = $("#sectorValue_" + triggerID).val();
                    const sectorValue = "";

                    const phoneInput = $("#phoneInput_" + triggerID).val();
                    const addressInput = $("#addressInput_" + triggerID).val();
                    const cityInput = $("#cityInput_" + triggerID).val();
                    const lgaInput = $("#lgaInput_" + triggerID).val();

                    if (window["window_cliked_classify" + triggerID]) {
                        return false;
                    }

                    // alert("Clicked Classify");

                    // if(window[working+"_"+triggerID]){
                    // return false;
                    // }

                    window["window_cliked_classify" + triggerID] = true;
                    $(this).html("Processing...")
                    $(this).attr("disabled", true);
                    $.ajax({
                        url: "GenericEndpoint?requestType=classifyPeople&sector=" + sector + "&sectorCat=" + sectorCat + "&sectorValue=" + sectorValue + "&peoplersn=" + triggerID + "&phone=" + phoneInput + "&address=" + addressInput + "&city=" + cityInput + "&lga=" + lgaInput,
                        success: function (result) {
                            console.log("AJAX RESULT_______", result, anchor);
                            // window[working+"_"+triggerID] = false;

                            anchor.html("Save Classification")
                            anchor.attr("disabled", false);

                            anchor.parent().parent().remove();
                            window["window_cliked_classify" + triggerID] = false;
                        },
                        error: function (error) { // window[working+"_"+triggerID] = false;
                            console.log("AJAX ERROR__________", error);
                            Swal.fire({icon: "error", title: "Something went wrong, your changes were not saved. please try again."})
                            anchor.html("Save Classification")
                            anchor.attr("disabled", false);
                            window["window_cliked_classify" + triggerID] = false;
                        }
                    })
                });
            }
        </script>


        <!-- end -->


    </body>

</html>
