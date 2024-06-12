import { Component } from '@angular/core';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent {
  departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}]

  jobDescription:string = "<div class=\"job-description__item\">\n" +
      "<h3>M&ocirc; tả c&ocirc;ng việc</h3>\n" +
      "<div class=\"job-description__item--content\">\n" +
      "<p>- Ch&agrave;o đ&oacute;n kh&aacute;ch h&agrave;ng</p>\n" +
      "<p>- Giới thiệu, tư vấn v&agrave; b&aacute;n sản phẩm thời trang.</p>\n" +
      "<p>- Trưng b&agrave;y v&agrave; sắp xếp sản phẩm.</p>\n" +
      "<p>- Kiểm k&ecirc; h&agrave;ng ho&aacute; sản phẩm li&ecirc;n tục.</p>\n" +
      "<p>- Thực hiện c&aacute;c c&ocirc;ng việc li&ecirc;n quan theo sự ph&acirc;n c&ocirc;ng của cấp tr&ecirc;n</p>\n" +
      "</div>\n" +
      "</div>\n" +
      "<div class=\"job-description__item\">\n" +
      "<h3>Y&ecirc;u cầu ứng vi&ecirc;n</h3>\n" +
      "<div class=\"job-description__item--content\">\n" +
      "<p>- C&oacute; kỹ năng tự sắp xếp;</p>\n" +
      "<p>- Sử dụng th&agrave;nh thạo c&aacute;c phần mềm vi t&iacute;nh v&agrave; điện thoai.</p>\n" +
      "<p>- Ngăn nắp, kĩ t&iacute;nh, trung thực, tr&aacute;ch nhiệm;</p>\n" +
      "<p>- C&oacute; khả năng research, tr&iacute; nhớ tốt;</p>\n" +
      "<p>- C&oacute; khả năng tự tổ chức, x&acirc;y dựng kế hoạch để thực hiện nhiệm vụ được ph&acirc;n c&ocirc;ng.</p>\n" +
      "</div>\n" +
      "</div>\n" +
      "<div class=\"job-description__item\">\n" +
      "<h3>Quyền lợi</h3>\n" +
      "<div class=\"job-description__item--content\">\n" +
      "<p>Lương Cơ Bản: 5.250.000đ</p>\n" +
      "<p>Phụ Cấp Cơm: 25.000đ/ Ca</p>\n" +
      "<p>Tr&aacute;ch Nhiệm: 500.000đ/Th&aacute;ng</p>\n" +
      "<p>Hoa Hồng: Đạt Doanh Thu</p>\n" +
      "<p>=&gt;Tổng Thu Nhập: đến 10.000.000đ</p>\n" +
      "<p>- Được l&agrave;m việc trong m&ocirc;i trường chuy&ecirc;n nghiệp, năng động</p>\n" +
      "<p>- Được đ&agrave;o tạo li&ecirc;n tục để ph&aacute;t triển.</p>\n" +
      "</div>\n" +
      "</div>\n" +
      "<div class=\"job-description__item\">\n" +
      "<h3>Địa điểm l&agrave;m việc</h3>\n" +
      "<div class=\"job-description__item--content\">\n" +
      "<div>- Hồ Ch&iacute; Minh: 85 Nguyễn Hữu Cầu, Quận 1</div>\n" +
      "<div>- Hồ Ch&iacute; Minh: 46A Xu&acirc;n Thủy, Quận 2</div>\n" +
      "</div>\n" +
      "</div>\n" +
      "<div class=\"job-description__item\">\n" +
      "<h3>C&aacute;ch thức ứng tuyển</h3>\n" +
      "<div class=\"job-description__item--content\">Ứng vi&ecirc;n nộp hồ sơ trực tuyến bằng c&aacute;ch bấm&nbsp;<strong>Ứng tuyển</strong>&nbsp;ngay dưới đ&acirc;y.</div>\n" +
      "</div>"
}
