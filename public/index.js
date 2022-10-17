function downLoadExcel() {
  let url = `http://xxxx:5004/downloadExcel`; //xxxx代表本地ip
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.responseType = 'blob';
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (this.status === 200) {
        console.log(this.response);
        var blob = new Blob([this.response], {
          type: 'application/vnd.ms-excel',
        });
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          var link = document.createElement('a');
          link.download = 'report.xlsx';
          link.href = window.URL.createObjectURL(blob);
          document.body.append(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
        };
      }
    }
  };
  xhr.send(); //发送请求 将json写入send中
}

downLoadExcel();
