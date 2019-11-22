function NguoiDungService() {
  this.layDanhSachNguoiDung = function() {
    return axios({
      method: "GET",
      url: "http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung"
    });
  };

  this.themNguoiDung = function(nguoiDung) {
    return axios({
      method: "POST",
      url: "http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung",
      data: nguoiDung
    });
  };

  this.xoaNguoiDung = function(id) {
    return axios({
      method: "DELETE",
      url: `http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung/${id}`
    });
  };

  this.layThongTinNguoiDung = function(id) {
    return axios({
      method: "GET",
      url: `http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung/${id}`
    });
  };

  this.capNhatNguoiDung = function(id, user) {
    return axios({
      method: "PUT",
      url: `http://5a6451dcf2bae00012ca1a6a.mockapi.io/api/NguoiDung/${id}`,
      data: user
    });
  };

  this.timKiemNguoiDung = function(chuoiTimKiem, danhSachNguoiDung) {
    var mangTimKiem = danhSachNguoiDung.filter(function(item) {
      return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
    });
    return mangTimKiem;
  };
}
