function beforeSubmit() {
  var company = document.getElementById("company");
  var lastname = document.getElementById("last_name");

  if (!company.value) {
    company.value = lastname.value;
  }
}