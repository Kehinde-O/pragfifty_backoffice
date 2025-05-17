<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="org.ers.utils.*"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>ORAS | BACKOFFICE</title>
<%@ include file="include/includeCSS.jsp"%>
<link href="css/portal/publicPortal/selfAssessment.css" rel="stylesheet"
	type="text/css">
<link rel="icon" type="image/png" sizes="177x106" href="images/.png">
<%
List<String> lga = AppUtils.getAllLga();
int year = Calendar.getInstance().get(Calendar.YEAR);
year = year + 1;
int yearCountTill2017 = year - 2017;

String areaclassAndUse = AppUtils.getAllClassificationAndUse();
%>


<style>
.dnhvtin2, .dnhvtin {
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

.wht-form-group input, .wht-form-group select {
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

#othertaxautocomplete, .othertaxautocomplete {
	position: relative;
}

.loader {
	position: absolute;
	background: rgba(255, 255, 255, .4);
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

#advancedSearch, .regprop {
	background-color: #f3593d;
	color: #fff;
	padding: 8px 32px;
	border: none;
}

#genBillBtn, .peopleButton, .completereg, #registerProperty,
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

.cancelreg, #clearProperty {
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

#billDetails p:not(span), #propertyDetails p:not(span), #billDetails1 p:not(span),
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

#lga, #year {
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

.multi-select-button:after {
	/*content: "";
	display: inline-block;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0.4em 0.4em 0 0.4em;
	border-color: #999 transparent transparent transparent;
	margin-left: 0.4em;
	vertical-align: 0.1em;*/
	
}

.multi-select-container--open .multi-select-menu {
	display: block;
}

.multi-select-container--open .multi-select-button:after {
	/*border-width: 0 0.4em 0.4em 0.4em;
	border-color: transparent transparent #999 transparent;*/
	
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
	<div id="wrapper">

		<!-- Sidebar -->
		<%@ include file="include/includeSidebar.jsp"%>
		<input type="hidden" value="<%=canViewSingleProp%>" id="canview" />

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
						<div class="col-12">
							<h2 class="bold-header ">Consolidated Demand Notice Billing</h2>
							<p>Please select option below to generate bills for printing.</p>
						</div>
						<div class="row custom-bill-form">
							<form class="col-12" id="custom_bill_form">
								<div class="row">
								<!-- 	<div class="form-group col-3">
										<label>Select State</label> <select name="type" id="type"
											class="form-control">
											<option value="0" selected>Please Select</option>
											<option value="1,2,3">All Property Types</option>
											<option value="2">Commercial Properties</option>
											<option value="3">Residential Properties</option>
										</select>
									</div> -->
										<div class="form-group col-2"
										title="Please click 'CTRL+Select' for multiple LGA select">
										<label>Select LGA </label> <select name="lga"
											id="lga" multiple class="form-control">
											<option value="'all'" selected>All Cities</option>
											<%
											for (int i = 0; i < lga.size(); i++) {
											%>
											<option value="'<%=lga.get(i)%>'">
												<%=lga.get(i) == null ? "Unknown LGA" : lga.get(i)%>
											</option>
											<%
											}
											%>
										</select>
									</div>
									<div class="form-group col-2"
										title="Please click 'CTRL+Select' for multiple LGA select">
										<label>Select LGA </label> <select name="lga"
											id="lga" multiple class="form-control">
											<option value="'all'" selected>All LGAs</option>
											<%
											for (int i = 0; i < lga.size(); i++) {
											%>
											<option value="'<%=lga.get(i)%>'">
												<%=lga.get(i) == null ? "Unknown LGA" : lga.get(i)%>
											</option>
											<%
											}
											%>
										</select>
									</div>
								
									<div class="form-group col-3">
										<label>Select CDN Classification</label> <select id="landuse"
											name="landuse" multiple class="form-control">
											<option value="'all'" data-class="'all'" selected>All
												Land Use and Classification</option>
										</select>
									</div>
									<div class="form-group col-3"
										title="Please click 'CTRL+Select' for multiple LGA select">
										<label contenteditable>Select Bill Year </label> <select
											name="year" id="year" contenteditable multiple
											class="form-control">
											<option value="'all'" selected>All Year</option>
											<%
											for (int j = 0; j < yearCountTill2017 + 1; j++) {
											%>
											<option value="<%=year%>">
												<%=year%>
											</option>
											<%
											year--;
											}
											%>
										</select>
									</div>
									<div class="form-group col-2 flex flex-column">
										<label>Action </label>
										<button type="submit" id="generateButton"
											class="btn btn-primary form-control-button">Search
											Bills</button>
									</div>
								</div>
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

	<script type="text/javascript">
		$("#custom_bill_form").submit(
				function(e) {
					e.preventDefault();
					$("#generateButton").html("Please wait...");
					let propertytype = $("#type").val();
					let propertycategory = $("#category").val();
					let selectedLGA = $("#lga option:selected").map(function() {
						return this.value
					}).get().join(",");
					let selectedYear = $("#year option:selected").map(function() {
						return this.value
					}).get().join(",");
					
					let selectedLandUse = $("#landuse option:selected").map(function() {
						return this.value
					}).get().join(",");
					
					let selectedLandUseClass = $("#landuse option:selected").map(function() {
						return this.getAttribute("data-class")
					}).get().join(",");

					//console.log(propertytype, propertycategory, selectedLGA,selectedLandUse,selectedLandUseClass);
					console.log("Property Type:",propertytype);
					console.log("Property Category:",propertycategory);
					console.log("Selected LGA:",selectedLGA);
					console.log("Selected Land Use:",selectedLandUse);
					console.log("Selected Land Use Class:",selectedLandUseClass);
					console.log("Selected Year:",selectedYear);
					
					const xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function() {
						if (xhttp.readyState === 4 && xhttp.status === 200) {
							const json = JSON.parse(xhttp.responseText);
							console.log("XHTTP done", xhttp.responseText);
							$("#generateButton").html("Search Bills");
							Swal.fire({
								icon : json.status,
								title : "Custom Bill Printing",
								text : json.message,
								confirmButtonText : "Print All Bills",
								cancelButtonText : "Close",
								showCancelButton: true,
								showConfirmButton: json.data.trim() !== "0"
							}).then(confirmed=>{
								console.log(confirmed.value);
								if(confirmed.value){
									window.open("./printlucbill?request=customBillPrint&propertyType="
										+ (propertytype || "")
										+ "&propertyCategory="
										+ (propertycategory || "")
										+ "&propertyLga=" + (selectedLGA || "")+ "&selectedYear=" + (selectedYear || "")+"&selectedUse="+(selectedLandUse || "")+"&selectedClass="+(selectedLandUseClass || ""),"_blank");	
									
									/*Swal.fire({
									    title:"Processing",
									    text:"Please wait while bills are being processed for display.",
									    allowEscapeKey: false,
									    allowOutsideClick: false,
									    onOpen: () => {
									      swal.showLoading();
									    }
									  });*/
								}
							});
						}
					};
					xhttp.onerror = function() {
						$("#generateButton").html("Search Bills");
					};
					xhttp.open("GET",
							"./GenericEndpoint?requestType=getCustomBillCount&propertyType="
									+ (propertytype || "")
									+ "&propertyCategory="
									+ (propertycategory || "")
									+ "&propertyLga=" + (selectedLGA || "")+ "&selectedYear=" + (selectedYear || "")+"&selectedUse="+(selectedLandUse || "")+"&selectedClass="+(selectedLandUseClass || ""),
							true);
					xhttp.send(null);

					return false;
				});
		
		$('#year').multiSelect();
		$('#lga').multiSelect();
		
		const areaClassAndUse = JSON.parse('<%=areaclassAndUse%>');
		console.log(areaClassAndUse);
		$("#landuse").html(`<option value="'all'" data-class="'all'" selected>All Land Use</option>`);
		for(let i = 0; i < areaClassAndUse.length; i++){
			const optionGroup = $("<optgroup label='"+areaClassAndUse[i].areaClassification+"'></optgroup>");
			const allLandUse = areaClassAndUse[i].landUse;
			for(let j = 0; j < allLandUse.length; j++){
				//const option = "<option value=\"'"+allLandUse[j]+"'\"" data-class="\"'"+areaClassAndUse[i].areaClassification}+"'\"">+allLandUse[j]+</option>";
				
				const option = '<option value="\''+allLandUse[j]+'\'" data-class="\''+areaClassAndUse[i].areaClassification+'\'">'+allLandUse[j]+'</option>';
				optionGroup.append(option);
			}
			$('#landuse').append(optionGroup);
		}
		$('#landuse').multiSelect();
	</script>


</body>

</html>