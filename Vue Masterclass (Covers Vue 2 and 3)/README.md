Nội dung khoá học:
1.
- Điểm khác biệt giữa vue2 và vue3
  + vue2 dùng option API
  viết gộp các thành phần state, methods, computed, watch riêng
  + vue3 dùng composition API
  viết tách, càng sau dễ phát triển do là các hooks riêng
  hỗ trợ typescript kiểu cho biến
- So sánh react, angular, vue
- vòng đời của vue
  + setup->beforecreate->created->beforemount: diễn ra trước khi cây DOM được tạo
  + mounted-> beforeupdate->updated: quá trình rerender
  + beforeunmount-> unmounted
  ==> dùng mounted: để call api sau khi đã mount DOM để thao tác đúng với màn hình
  ==> beforeupdate or updated: diễn ra với reactivity hoặc dùng để bắt sự thay đổi của props kiểm soát giá trị trc và sau khi đổi: 
  sau dùng watch để biết giá trị thay đổi luôn
  ==> beforeunmounted or unmounted: để clear tài nguyên sau khi dùng ví dụ hàm setinterval
- Mounting app
- Cơ chế prop, emit, provide/inject
+ prop: truyền từ cha -> con 
+ emit: truyền ngc từ con -> cha
+ provide/inject: cung cấp và sử dụng cấp con từ cấp cha bên trên nhiều cấp
- Cấu trúc 1 file .vue 
- Dùng tailwind
- Các cách hiển thị component con trong component cha, hiển thị component(tên cách viết Camel Case và Kebab Case )
- vitest viết test
  + kiểm tra các biến của component: state, props, computed hoặc của store
  + các event khi nào đc gọi
  + kiểm tra các thành phần css, html, class, ... cho mỗi phần tử
- Các thuộc tính gắn với element dùng trong vue
  + v-bind = : (src trong image)
  + v-model: liên kết giá trị trong vue và element (phân biệt v-model và :model-value)
  + v-for: duyệt danh sách kèm :key để vue xác định chính xác phần tử
  + v-if, v-else: true thì có trong cây DOM
  + v-show: chỉ là hiển thị hidden or not
  + v-on: @: add event
  + định nghĩa thêm các directive khác
- Dùng component chung
  + xét các thuộc tính thay đổi
- @apply trong tailwind để viết gộp nhiều class vào làm 1
- Truyền props có thể định nghĩa kiểu
- đăng ký component chung cấp global: inject vào app để bất kì chỗ nào gọi đc luôn: ví dụ fawesome-icon
- vue router
  + vue2 dùng vue router 3
  + vue3 dùng vue router 4
  + dùng useRouter, useRoute
  + các hook:(thứ tự gọi)
    * beforeEach(global): dùng xác thực ngừoi dùng, trước khi điều hướng
    * beforeEnter: gọi khi tạo route riêng
    * beforeResolve(global): Khi pass beforeEach
    * beforeRouteEnter: gọi trước khi component được tạo
    * (created mounted)
    * beforeRouteUpdate: khi đổi route, nhưng component chưa bị xoá đổi
    * beforeRouteLeave: khi component bị xoá
    * afterEach(global): lưu trữ thông tin sau khi điều hướng
- setup get data
- pinia: state, getter, action, module riêng, tương thích với composition API 
- slot: 
  + #default: ko cần tham số
  + #name: thêm name để có thể dùng nhiều slot hoặc chỉ định
  + scope: truyền props từ con sang cha qua giá trị gán cho name
- reactivity trong vue3
- typescript: defineProp
