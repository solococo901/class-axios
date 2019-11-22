var nguoiDungService = new NguoiDungService();

getListUser();

getEle("btnThemNguoiDung").addEventListener("click", function() {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người dùng";

  var footer = `
        <button class="btn btn-success" onclick="ThemNguoiDung()">Thêm</button>
    `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 * Them nguoi dung
 */
function ThemNguoiDung() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .themNguoiDung(nguoiDung)
    .then(function(result) {
      //Load lại trang nếu thêm thành công
      // location.reload();
      getListUser();
      alert("Thêm người dùng thành công");
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Xoa nguoi dung
 */
function xoaNguoiDung(id) {
  console.log(id);
  nguoiDungService
    .xoaNguoiDung(id)
    .then(function(result) {
      alert("Xoa nguoi dung thanh cong");
      getListUser();
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Sua nguoi dung
 */
function suaNguoiDung(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa người dùng";

  var footer = `
    <button class="btn btn-success" onclick="capNhatNguoiDung(${id})">Cập nhật</button>
  `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  nguoiDungService
    .layThongTinNguoiDung(id)
    .then(function(result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("SoDienThoai").value = result.data.soDT;
      getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Cap nhat nguoi dung
 */
function capNhatNguoiDung(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .capNhatNguoiDung(id, nguoiDung)
    .then(function(result) {
      alert("Cap nhat thanh cong");
      getListUser();
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Tim kiem nguoi dung
 */
getEle("txtSearch").addEventListener("keyup", function() {
  var chuoiTimKiem = getEle("txtSearch").value;

  var danhSachNguoiDung = getLocalStorage();

  var mangTimKiem = nguoiDungService.timKiemNguoiDung(
    chuoiTimKiem,
    danhSachNguoiDung
  );
  renderTable(mangTimKiem);
});

function setLocalStorage(danhSachNguoiDung) {
  localStorage.setItem("DSND", JSON.stringify(danhSachNguoiDung));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("DSND"));
}

function getListUser() {
  nguoiDungService
    .layDanhSachNguoiDung()
    .then(function(result) {
      renderTable(result.data);

      //Luu danh sach xuong localStorage
      setLocalStorage(result.data);
    })
    .catch(function(errors) {
      console.log(errors);
    });
}

function renderTable(mangNguoiDung) {
  var contentHTML = "";

  mangNguoiDung.map(function(item, index) {
    contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.soDT}</td>
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${
                        item.id
                      })">Sửa</button>
                      <button class="btn btn-danger" onclick="xoaNguoiDung(${
                        item.id
                      })">Xóa</button>
                    </td>
                </tr>
            `;
  });

  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getEle(id) {
  return document.getElementById(id);
}
