<%@page import="ers.utils.*, ers.models.*, java.util.*"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page errorPage="ShowError.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="CSDC SYSTEMS">

<title>ORAS | TAX CLEARANCE CERTIFICATE</title>
<%@ include file="include/common/includeCss.jsp"%>
<link href="css/portal/selfAssessment.css" rel="stylesheet"
	type="text/css">
<link href="css/portal/tccregistration.css" rel="stylesheet"
	type="text/css">
<link rel="icon" type="image/png" sizes="177x106" href="images/ers.png">

<style>
label span {
	color: inherit !important;
}

.selectedDocumentType {
	color: #736e6e;
	font-weight: bold;
}

.selectedDocumentName {
	color: green;
	font-weight: bold;
}
</style>

</head>

<%
	AppUtils util = new AppUtils();

	List<ValidDataDesc> sourcesOfIncome = util.getSourcesOfIncome();
	//List<ValidDataDesc> tccPurpose = util.getTCCPurpose();
%>

<body id="page-top">

	<!-- Page Wrapper -->
	<div id="wrapper">

		<!-- Sidebar -->
		<%@ include file="include/includeSidebar.jsp"%>
		<!-- End of Sidebar -->

		<!-- Content Wrapper -->
		<div id="content-wrapper"
			class="auth-content-wrapper d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<!--  START OF SELF ASSESSMET -->
				<div class="container-fluid">
					<div class="col-md-12 mx-auto">
						<div class="row ">
							<div class="col-md-12 ">
								<input type="hidden" id="tin" value="<%=userID%>">
								<h4 class="tcc-header">Tax Clearance Certificate</h4>
								<!-- <hr
								style="color: blue; width: 8%; border: 2px solid blue; margin-left: 0px; margin-top: -5px;"> -->
							</div>
							<div class="col-md-12">
								<div class="row p-t-30 p-b-30 p-l-30 p-r-30" id="mainDiv">
									<div class="col-md-12">
										<div class="row">
											<div class="col-md-6">
												<button class="dabtn" id="tabtn" style="display: none">TCC
													HISTORY</button>
												<button class="dabtn" id="dabtn">APPLY FOR TCC</button>
											</div>
										</div>

									</div>
									<div class="col-md-12 m-t-40 " id="form-container">
										<table id="assessmentTable"
											class="table table-striped table-bordered display nowrap"
											cellspacing="0" style="width: 100%">
											<thead>
												<tr>
													<th>Year</th>
													<th>Application Number</th>
													<th>Application Date</th>
													<th>Application Status</th>
													<th>Comment</th>
													<th>TCC Number</th>
													<th></th>
												</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>


								</div>
							</div>
							<div class="col-md-12 ">
								<input type="hidden" id="tin" value="<%=userID%>">


								<form class="row m-b-20 hide" id="form-container2">
									<div class="col-md-11 mx-auto">
										<div class="row">
											<div class="col-md-12">
												<p style="font-size: 13px; color: red;">** If any
													payment is made, 'Receipt No.' and 'Receipt Date' are
													required.</p>
												<p style="font-size: 13px; color: red;">** All 'Amount'
													fields are compulsory. Enter 0 if no payment was made for
													the specified year</p>
											</div>
										</div>

										<div class="row m-t-30">
											<input type="hidden" id="tcctin" value="<%=tin%>" /> <input
												type="hidden" id="peopleCode" value="<%=userID%>" />
											<div class="col-md-4">
												<label>* Source of Income</label> <select id="trade1"
													class="form-control" name="trade" required>
													<option value="">-- Select Source of Income --</option>

													<%
														for (ValidDataDesc soi : sourcesOfIncome) {
													%>
													<option value="<%=soi.getCode()%>"><%=soi.getDescription()%></option>
													<%
														}
													%>

												</select>
											</div>
											<%-- <div class="col-md-4">
												<label>* Purpose of TCC</label> <select id="purpose"
													class="form-control" name="trade" required>
													<option value="">-- Select TCC Purpose --</option>


													<%
														for (ValidDataDesc purpose : tccPurpose) {
													%>
													<option value="<%=purpose.getCode()%>"><%=purpose.getDescription()%></option>
													<%
														}
													%>

												</select>
											</div> --%>
										</div>
										<div class="row m-t-30">
											<div class="col-md-12">
												<p>
													Total Income<sup class="text-danger"></sup>
												</p>
											</div>
										</div>
										<div class="row">
											<div class="col-md-4">
												<label for="income-1" id="year1">* Income <span
													class="year1"></span></label> <input type="text" id="income-1"
													class="form-control validDecimalNumber income year1" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="income-2" id="year2">* Income <span
													class="year2"></span></label> <input type="text" id="income-2"
													class="form-control validDecimalNumber income year2" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="income-3" id="year3">* Income <span
													class="year3"></span></label> <input type="text" id="income-3"
													class="form-control validDecimalNumber income year3" value="0"/>
											</div>

										</div>
										<div class="row m-t-20">
											<div class="col-md-4">
												<label for="eraspayment1" style="color:#05668d;">  Was payment made on ORAS? </label>
												Yes <input type="radio" name="eraspayment" id="eraspayment1" value="Y" checked />
												No <input type="radio" name="eraspayment" id="eraspayment0" value="N"  />
											</div>
											<div class="col-md-12">
												<p style="color:red;font-size:13px;"> If no, kindly provide us with your evidence of payment by uploading the receipt below. </p>
											</div>
										</div>
										<div class="row m-t-7">
											<div class="col-md-12">
												<p>
													Assessment Tax Paid<sup class="text-danger"></sup>
												</p>
											</div>
											
										</div>
										<div class="row m-t-18">
											
											<div class="col-md-4">
												<label for="tax-rctno-1">* Receipt No. <span
													class="year1"></span>
												</label> <input type="text" id="tax-rctno-1"
													class="form-control validNumber assessment rctNo year1" />
													<span class="hide receiptmessage"
													
													style="font-size: 13px; margin-top: 8px;"> </span>
											</div>
											<div class="col-md-4">
												<label for="tax-rctno-2">* Receipt No. <span
													class="year2"></span>
												</label> <input type="text" id="tax-rctno-2"
													class="form-control validNumber assessment rctNo  year2" />
											</div>
											<div class="col-md-4">
												<label for="tax-rctno-3">* Receipt No. <span
													class="year3"></span>
												</label> <input type="text" id="tax-rctno-3"
													class="form-control validNumber assessment rctNo  year3" />
											</div>
										</div>
										<div class="row m-t-15">
											<div class="col-md-4">
												<label for="tax-paid-1"> Amount <span class="year1"></span></label>
												<input type="text" id="tax-paid-1"
													class="form-control validDecimalNumber assessment amount year1 tax-rctno-1" disabled="disabled"  value="0"/>
											</div>
											<div class="col-md-4">
												<label for="tax-paid-2"> Amount <span class="year2"></span></label>
												<input type="text" id="tax-paid-2"
													class="form-control validDecimalNumber assessment amount year2" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="tax-paid-3"> Amount <span class="year3"></span></label>
												<input type="text" id="tax-paid-3"
													class="form-control validDecimalNumber assessment amount year3" value="0"/>
											</div>

										</div>
										
										<div class="row m-t-30">
											<div class="col-md-4">
												<label for="tax-rctdt-1"> Receipt Date <span
													class="year1"></span>
												</label> <input type="date" id="tax-rctdt-1"
													class="form-control assessment rctDt year1 tax-rctno-1_date"  disabled="disabled"  />
											</div>
											<div class="col-md-4">
												<label for="tax-rctdt-2"> Receipt Date <span
													class="year2"></span>
												</label> <input type="date" id="tax-rctdt-2"
													class="form-control assessment rctDt year2" />
											</div>
											<div class="col-md-4">
												<label for="tax-rctdt-3"> Receipt Date <span
													class="year3"></span>
												</label> <input type="date" id="tax-rctdt-3"
													class="form-control assessment rctDt year3" />
											</div>
										</div>
										<div class="row m-t-30">
											<div class="col-md-12">
												<p>
													Total Outstanding Tax<sup class="text-danger"></sup>
												</p>
											</div>
										</div>
										<div class="row">
											<div class="col-md-4">
												<label for="outstanding-1">* Outstanding <span
													class="year1"></span></label> <input type="text" id="outstanding-1"
													class="form-control validDecimalNumber outstanding year1" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="outstanding-2">* Outstanding <span
													class="year2"></span></label> <input type="text" id="outstanding-2"
													class="form-control validDecimalNumber outstanding year2" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="outstanding-3">* Outstanding <span
													class="year3"></span></label> <input type="text" id="outstanding-3"
													class="form-control validDecimalNumber outstanding year3" value="0"/>
											</div>

										</div>
										<div class="row m-t-30">
											<div class="col-md-12">
												<p>
													Development Levy Paid<sup class="text-danger"></sup>
												</p>
											</div>
										</div>
										
											<div class="row m-t-30">
											<div class="col-md-4">
												<label for="dl-rctno-1">* Receipt No. <span
													class="year1"></span>
												</label> <input type="text" id="dl-rctno-1"
													class="form-control validNumber devlevy rctNo year1" />
													<span class="hide receiptmessage"
						
													style="font-size: 13px; margin-top: 8px;"> </span>
											</div>
											<div class="col-md-4">
												<label for="dl-rctno-2">* Receipt No. <span
													class="year2"></span>
												</label> <input type="text" id="dl-rctno-2"
													class="form-control validNumber devlevy rctNo year2" />
											</div>
											<div class="col-md-4">
												<label for="dl-rctno-3">* Receipt No. <span
													class="year3"></span>
												</label> <input type="text" id="dl-rctno-3"
													class="form-control validNumber devlevy rctNo year3" />
											</div>
										</div>
										
										<div class="row">
											<div class="col-md-4">
												<label for="dl-paid-1"> Amount <span class="year1"></span>
												</label> <input type="text" id="dl-paid-1"
													class="form-control validDecimalNumber devlevy amount year1 dl-rctno-1"  disabled="disabled"  value="0"/>
											</div>
											<div class="col-md-4">
												<label for="dl-paid-2"> Amount <span class="year2"></span>
												</label> <input type="text" id="dl-paid-2"
													class="form-control validDecimalNumber devlevy amount year2" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="dl-paid-3"> Amount <span class="year3"></span>
												</label> <input type="text" id="dl-paid-3"
													class="form-control validDecimalNumber devlevy amount year3" value="0"/>
											</div>

										</div>
									
										<div class="row m-t-30">
											<div class="col-md-4">
												<label for="dl-rctdt-1"> Receipt Date <span
													class="year1"></span>
												</label> <input type="date" id="dl-rctdt-1"
													class="form-control devlevy rctDt year1 dl-rctno-1_date" disabled="disabled" />
											</div>
											<div class="col-md-4">
												<label for="dl-rctdt-2"> Receipt Date <span
													class="year2"></span>
												</label> <input type="date" id="dl-rctdt-2"
													class="form-control devlevy rctDt year2" />
											</div>
											<div class="col-md-4">
												<label for="dl-rctdt-3"> Receipt Date <span
													class="year3"></span>
												</label> <input type="date" id="dl-rctdt-3"
													class="form-control devlevy rctDt year3" />
											</div>
										</div>
										<div class="row m-t-30">
											<div class="col-md-12">
												<p>
													LUC (Land Use Charge)<sup class="text-danger"></sup>
												</p>
											</div>
										</div>

										<div class="row m-t-30">
											<div class="col-md-4">
												<label for="luc-rctno-1">* Receipt No. <span
														class="year1"></span>
												</label> <input type="text" id="luc-rctno-1"
																class="form-control validNumber lucc rctNo year1" />
												<span class="hide receiptmessage"

													  style="font-size: 13px; margin-top: 8px;"> </span>
											</div>
											<div class="col-md-4">
												<label for="luc-rctno-2">* Receipt No. <span
														class="year2"></span>
												</label> <input type="text" id="luc-rctno-2"
																class="form-control validNumber lucc rctNo year2" />
											</div>
											<div class="col-md-4">
												<label for="luc-rctno-3">* Receipt No. <span
														class="year3"></span>
												</label> <input type="text" id="luc-rctno-3"
																class="form-control validNumber lucc rctNo year3" />
											</div>
										</div>

										<div class="row">
											<div class="col-md-4">
												<label for="luc-paid-1"> Amount <span class="year1"></span>
												</label> <input type="text" id="luc-paid-1"
																class="form-control validDecimalNumber lucc amount year1 luc-rctno-1"  disabled="disabled"  value="0"/>
											</div>
											<div class="col-md-4">
												<label for="luc-paid-2"> Amount <span class="year2"></span>
												</label> <input type="text" id="luc-paid-2"
																class="form-control validDecimalNumber lucc amount year2" value="0"/>
											</div>
											<div class="col-md-4">
												<label for="luc-paid-3"> Amount <span class="year3"></span>
												</label> <input type="text" id="luc-paid-3"
																class="form-control validDecimalNumber lucc amount year3" value="0"/>
											</div>

										</div>

										<div class="row m-t-30">
											<div class="col-md-4">
												<label for="luc-rctdt-1"> Receipt Date <span
														class="year1"></span>
												</label> <input type="date" id="luc-rctdt-1"
																class="form-control lucc rctDt year1 luc-rctno-1_date" disabled="disabled" />
											</div>
											<div class="col-md-4">
												<label for="luc-rctdt-2"> Receipt Date <span
														class="year2"></span>
												</label> <input type="date" id="luc-rctdt-2"
																class="form-control lucc rctDt year2" />
											</div>
											<div class="col-md-4">
												<label for="luc-rctdt-3"> Receipt Date <span
														class="year3"></span>
												</label> <input type="date" id="luc-rctdt-3"
																class="form-control lucc rctDt year3" />
											</div>
										</div>
										<div class="row m-t-30">
											<div class="col-md-12">
												<p>
													TCC For Previous Years (if any)<sup class="text-danger"></sup>
												</p>
											</div>
										</div>
										<div class="row">
											<div class="col-md-4">
												<label for="tcc-1">TCC Number <span class="year1"></span>
												</label> <input type="text" id="tcc-1"
													class="form-control validNumber tcc no year1" />
											</div>
											<div class="col-md-4">
												<label for="tcc-2">TCC Number <span class="year2"></span>
												</label> <input type="text" id="tcc-2"
													class="form-control validNumber tcc no year2" />
											</div>
											<div class="col-md-4">
												<label for="tcc-3">TCC Number <span class="year3"></span>
												</label> <input type="text" id="tcc-3"
													class="form-control validNumber tcc no year3" />
											</div>

										</div>
										<div class="row m-t-30">
											<div class="col-md-4">
												<label for="tcc-dt-1">Issue Date <span class="year1"></span>
												</label> <input type="date" id="tcc-dt-1"
													class="form-control tcc issueDt year1" />
											</div>
											<div class="col-md-4">
												<label for="tcc-dt-2">Issue Date <span class="year2"></span>
												</label> <input type="date" id="tcc-dt-2"
													class="form-control tcc issueDt year2" />
											</div>
											<div class="col-md-4">
												<label for="tcc-dt-3">Issue Date <span class="year3"></span>
												</label> <input type="date" id="tcc-dt-3"
													class="form-control tcc issueDt year3" />
											</div>
										</div>
										<div class="row m-t-40">
											<div class="col-md-12">
												<p>
													Support Documents (if any)<sup class="text-danger"></sup>
												</p>
											</div>
										</div>
										<div class="row">
											<div class="col-md-4">
												<label>Document Type</label> <select id="docType"
													class="form-control" name="docType" required>
													<option value="">-- Select Document Type --</option>

													<%
														for (ValidDataDesc type : util.getTCCSupportDocsTypes()) {
													%>
													<option value="<%=type.getCode()%>"><%=type.getDescription()%></option>
													<%
														}
													%>

												</select>
											</div>
											<div class="col-md-4">
												<input type="file" id="supportDoc" class="form-control"
													style="display: none" />
												<button class="btn btn-primary upload-btn uploadBtn"
													style="margin-top: 25px;" type="button" id="selectFile">Select
													File</button>

											</div>
										</div>
										<div class="row m-t-20" id="namesDisplay"
											style="border: 1.5px dashed #05668d; border-radius: 5px; padding-top: 15px; padding-bottom: 15px;">

											<div class="col-md-12" style="background-color: grey; display: block"> 
												<span>No Document Selected</span>
											 </div>

										</div>

										<div class="row m-t-20">
											<div class="col-md-12 m-t-20">
												<button class="btn btn-primary nxtBtn ml-3 dabtn"
													id="TCCApply">Submit</button>
											</div>
										</div>


									</div>


								</form>


							</div>
						</div>
					</div>
				</div>


				<!-- END OF SELF ASSESSMENT -->

			</div>
			<!-- End of main content -->
		</div>
		<!-- End of Content Wrapper -->
	</div>


	<!-- Modal -->
	<div class="modal fade" id="exampleModalCenter" tabindex="-1"
		role="dialog" aria-labelledby="exampleModalCenterTitle"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">TCC
						Application</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="col-md-12">
						<div class="alert alert-warning alert-dismissible fade hide"
							role="alert" id="errorAlertMe">
							<strong id="errMessage"></strong>
						</div>
						<div class="alert alert-success alert-dismissible fade hide"
							role="alert" id="succAlertMe">
							<strong id="succMessage"></strong>
						</div>
					</div>
					<div class="col-md-12" id="billNumDiv">
						<label>Application Number: &nbsp;</label><span id="billnumber">
						</span>

					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal" id="errorCloseBtn">Close</button>
					<button type="button" class="btn btn-secondary"
						onclick="location.reload()" data-dismiss="modal"
						id="successCloseBtn" style="display: none">Close</button>
					&nbsp;&nbsp;&nbsp;&nbsp;

				</div>
			</div>
		</div>
	</div>


	<%@ include file="include/common/includeJs.jsp"%>
	<script src="js/app/tccregistration.js"></script>
	<script src="js/app/validation.js"></script>
	<script type="text/javascript">
		var currYear = new Date().getFullYear();

		$('span.year1').text((currYear - 1));
		$('span.year2').text((currYear - 2));
		$('span.year3').text((currYear - 3));

		//receipt1
		/* $('#receipt1').text('Receipt No. ' + (currYear - 1));
		$('#receipt2').text('Receipt No. ' + (currYear - 2));
		$('#receipt3').text('Receipt No. ' + (currYear - 3));

		$('#dl-year1').text('Development Levy Amount ' + (currYear - 1) + ' *');
		$('#dl-year2').text('Development Levy Amount ' + (currYear - 2) + ' *');
		$('#dl-year3').text('Development Levy Amount ' + (currYear - 3) + ' *');

		//receipt1
		$('#dl-receipt1')
				.text('Development Levy Receipt No. ' + (currYear - 1));
		$('#dl-receipt2')
				.text('Development Levy Receipt No. ' + (currYear - 2));
		$('#dl-receipt3')
				.text('Development Levy Receipt No. ' + (currYear - 3)); */
	</script>
</body>

</html>